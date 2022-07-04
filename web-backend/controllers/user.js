// Controller for users

//required modules
const express = require('express');
const crypto = require('crypto');
const passport = require('passport');
const bcrypt = require('bcrypt');

//modules self writtem
const secrets = require('../secrets');
const utilsError = require('../utils/error');
const generateOTP = require('../utils/generateOTP');

//middlewares
const schema = require('../validations/userValidation');
const validation = require('../middlewares/validationMiddleware');
const { checkAuthenticated } = require('../middlewares/auth');

//mailers 
const welcomeMailer = require('../mailers/welcome');
const forgotPasswordMailer = require('../mailers/mail_forgotPassword');


const router = express.Router({ mergeParams: true });


function getUserProfile(user) {
  return {
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email
  }
}

async function addUser(res, user) {
  
  user.reg_time = new Date().toString();
  
  user.password = await bcrypt.hash(user.password, 10);
  
  const email = user.email;
  const addParams = {
    TableName: secrets.tableName,
    Item: user,
    ConditionExpression: 'attribute_not_exists(email)',
  };
  try {
    await secrets.dynamoDB.put(addParams).promise();
    
    // await welcomeMailer.sendMail(
    //   user.email,
    //   `${user.first_name} ${user.last_name}`,
    // );

    return utilsError.error(res, 200, 'User added successfully');
  } catch (err) {
    if (err.statusCode >= 500) {
      return utilsError.error(res, 500, 'Please try again');
    }
    console.log(err);
    return null;
  }
}

async function updatePassword(pass, email, res) {
  if (!pass || pass.length < 8) {
    return utilsError.error(
      res,
      400,
      'Please enter password with minimum 8 characters',
    );
  }

  pass = await bcrypt.hash(pass, secrets.saltRounds);

  const refParams = {
    TableName: secret.tableName,
    Key: {
      email,
    },
    ConditionExpression: 'attribute_exists(email)',
    UpdateExpression: 'SET password = :value REMOVE otp, otpTime',
    ExpressionAttributeValues: {
      ':value': pass,
    },
  };
  try {
    await secrets.dynamoDB.update(refParams).promise();
  } catch (err) {
    return utilsError.error(res, 400, 'Invalid email address given');
  }
  return res.json({
    message: 'Password reset successfully!',
  });
}


router.post('/login', validation.validate(schema.loginSchema), passport.authenticate('local', { failureMessage: false }),
  (req, res) => {
    res.status(200).send('User logged in successfully');
  });

router.post('/register', validation.validate(schema.userSchema), async (req, res) => {
  
  const { confirmPassword, ...user } = req.body;
  
  const queryParams = {
    TableName: secrets.tableName,
    KeyConditionExpression: 'email = :value',
    ExpressionAttributeValues: {
      ':value': user.email,
    },
  };
  
  let data;
  try {
    data = await secrets.dynamoDB.query(queryParams).promise();
  } catch (err) {
    console.log(err);
    return utilsError.error(res, 500, 'Internal Server Error');
  }
  if (data.Items.length !== 0) {
    return utilsError.error(
      res,
      400,
      'Member with Email Address already exists',
    )
  }
  return addUser(res, user);
});


router.get('/profile', checkAuthenticated, (req, res) => {
  res.send(getUserProfile(req.user));
});


router.post('/forgotPassword', async (req, res) => {
  const user = req.body;
  if (!user) return utilsError.error(res, 400, 'Invalid Data');
  if (!user.email) {
    return utilsError.error(res, 400, 'Please enter Email Address');
  }

  const { email } = user;

  const queryParams = {
    TableName: secret.tableName,
    KeyConditionExpression: 'email = :value',
    ExpressionAttributeValues: {
      ':value': user.email,
    },
  };

  let data;
  try {
    data = await secrets.dynamoDB.query(queryParams).promise();
  } catch (err) {
    return utilsError.error(res, 500, 'Internal Server Error');
  }

  if (data.Items.length === 0) {
    console.log(`[PASSWORD RESET] User with email ${user.email} not found`);
    return res.json({
      message: 'Please enter the OTP to proceed further!',
    });
    // Even when the user with given email address doesn't exist, we show this message,
    // so that they don't know which all emails are registered in db.
  }
  const existingUser = data.Items[0];

  if (!user.otp) {
    const generatedOTP = generateOTP.generateOTP();

    // TODO: Enable this!
    // if (!(await forgotPasswordMailer.sendMail(email, generatedOTP))) {
    //   return utilsError.error(res, 426, `Unable to send OTP to ${email}`);
    // }

    const refParams = {
      TableName: secret.tableName,
      Key: {
        email: existingUser.email,
      },
      ConditionExpression: 'attribute_exists(email)',
      UpdateExpression: 'SET otp = :value, otpTime = :dateTime',
      ExpressionAttributeValues: {
        ':value': generatedOTP,
        ':dateTime': new Date().getTime(),
      },
    };
    try {
      await secrets.dynamoDB.update(refParams).promise();
    } catch (err) {
      return utilsError.error(res, 400, 'Invalid email address given');
    }

    return res.json({
      message: 'Please enter the OTP to proceed further!',
    });
  }
  user.otp = user.otp.toLowerCase();

  const curTime = new Date();
  if (curTime.getTime() - existingUser.otpTime > secrets.otpExpiryTime) {
    return utilsError.error(res, 400, 'OTP expired! Please retry!');
  }
  if (user.otp !== existingUser.otp) {
    return utilsError.error(res, 400, 'Incorrect OTP! Try again!');
  }
  return updatePassword(user.password, email, res);
});

router.post('/changePassword', checkAuthenticated, async (req, res) => {
  const { email } = req.user;
  if (!email) {
    return utilsError.error(
      res,
      400,
      'Please enter the email address whose password needs to be changed!',
    );
  }

  const { oldPassword } = req.body;
  if (!oldPassword) {
    return utilsError.error(res, 400, 'Please enter your Old Password!');
  }

  if (!(await bcrypt.compare(oldPassword, req.user.password))) {
    return utilsError.error(res, 400, 'Old Password is incorrect!');
  }

  return updatePassword(req.body.newPassword, email, res);
});


module.exports = router;