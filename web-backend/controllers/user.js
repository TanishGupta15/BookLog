// Controller for users
const express = require('express');
const crypto = require('crypto');
const passport = require('passport');
const bcrypt = require('bcrypt');

const secret = require('../secrets');
const utilsError = require('../utils/error');

const router = express.Router({ mergeParams: true });

router.post('/login', passport.authenticate('local'), (req, res) => {
    res.sendStatus(200);
});

//add welcome mailer, getUserProfile

async function addUser(res, user) {

    user.reg_time = new Date().toString();
  
    user.password = await bcrypt.hash(user.password, 10);
  
    const addParams = {
      TableName: secrets.tableName,
      Item: user,
      ConditionExpression: 'attribute_not_exists(email)',
    };
    try {
      await secrets.dynamoDB.put(addParams).promise();
  
      await welcomeMailer.sendMail(
        user.email,
        `${user.first_name} ${user.last_name}`,
      );
  
      return res.json(getUserProfile(user));
    } catch (err) {
      if (err.statusCode >= 500) {
        return utilsError.error(res, 500, 'Please try again');
      }
      console.log(err);
      return null;
    }
  }
  
  router.post('/register', async (req, res) => {
    //Add the code for register here!
  });
  