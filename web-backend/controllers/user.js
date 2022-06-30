// Controller for users
const express = require('express');
const crypto = require('crypto');
const passport = require('passport');
const bcrypt = require('bcrypt');

const secrets = require('../secrets');
const utilsError = require('../utils/error');

const schema = require('../validations/userValidation');
const validation = require('../middlewares/validationMiddleware');

const router = express.Router({ mergeParams: true });

router.post('/login', validation.validate(schema.loginSchema), passport.authenticate('local'), (req, res) => {
  res.sendStatus(200);
});

//add welcome mailer, getUserProfile

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
      );
    }
    
    return addUser(res, user);
    
  });

  function getUserProfile(user){
    return {
      firstName : user.firstName,
      lastName : user.lastName,
      email : user.email
    }
  }
  
  
  router.get('/profile', checkAuthenticated, (req, res) => {
    res.send(getUserProfile(req.user));
  });


module.exports = router;