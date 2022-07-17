// Controller for users

// required modules
const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');
const axios = require('axios');

// modules self writtem
const secrets = require('../secrets');
const utilsError = require('../utils/error');
const generateOTP = require('../utils/generateOTP');
const userUtils = require('../utils/userUtils');

// middlewares
const schema = require('../validations/userValidation');
const validation = require('../middlewares/validationMiddleware');
const {checkAuthenticated} = require('../middlewares/auth');

// mailers
const welcomeMailer = require('../mailers/welcome');
const forgotPasswordMailer = require('../mailers/mail_forgotPassword');
const {use} = require('passport');


const router = express.Router({mergeParams: true});


router.get('/login', validation.validate(schema.loginSchema),
    passport.authenticate('local', {failureMessage: false}),
    (req, res) => {
      res.status(200).send('User logged in successfully');
    });


router.get('/login/google', passport.authenticate('google'));


router.get('/oauth2callback',
    passport.authenticate('google', {failureRedirect: `${process.env.corsUrl}/login`, failureMessage: true}),
    (req, res) => {
      res.redirect(`${process.env.corsUrl}/home`);
    });


router.post('/register', validation.validate(schema.userSchema), async (req, res) => {
  const {confirmPassword, ...user} = req.body;
  const alreadyExists = await userUtils.checkAlreadyExists(user);
  if (alreadyExists) {
    return utilsError.error(
        res,
        400,
        'Member with Email Address already exists',
    );
  }
  return userUtils.addUser(res, user);
});


router.get('/profile', checkAuthenticated, (req, res) => {
  res.send(userUtils.getUserProfile(req.user));
});


router.post('/forgotPassword', async (req, res) => {
  const user = req.body;
  if (!user) return utilsError.error(res, 400, 'Invalid Data');
  if (!user.email) {
    return utilsError.error(res, 400, 'Please enter Email Address');
  }

  const {email} = user;

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
  return UserUtils.updatePassword(user.password, email, res);
});


router.post('/changePassword', checkAuthenticated, async (req, res) => {
  const {email} = req.user;
  if (!email) {
    return utilsError.error(
        res,
        400,
        'Please enter the email address whose password needs to be changed!',
    );
  }

  const {oldPassword} = req.body;
  if (!oldPassword) {
    return utilsError.error(res, 400, 'Please enter your Old Password!');
  }

  if (!(await bcrypt.compare(oldPassword, req.user.password))) {
    return utilsError.error(res, 400, 'Old Password is incorrect!');
  }

  return UserUtils.updatePassword(req.body.newPassword, email, res);
});


module.exports = router;
