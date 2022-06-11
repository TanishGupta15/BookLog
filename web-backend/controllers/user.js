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
    const user = req.body;
    if (!user) return utilsError.error(res, 400, 'Invalid Data');
    if (!user.email) {
      return utilsError.error(res, 400, 'Please enter Email Address');
    }
    user.email = user.email.toLowerCase().trim();
    if (
      !user.email.match(
        /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/,
      )
    ) {
      return utilsError.error(res, 400, 'Please enter a valid Email Address');
    }
  
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
      return utilsError.error(res, 500, 'Internal Server Error');
    }
  
    if (data.Items.length !== 0) {
      return utilsError.error(
        res,
        400,
        'Member with Email Address already exists',
      );
    }

    if (!user.first_name) {
      return utilsError.error(res, 400, 'Please enter First Name');
    }
  
    user.first_name = user.first_name
      .trim()
      .split(' ')
      .map((w) => (w ? w[0].toUpperCase() + w.substr(1).toLowerCase() : ''))
      .join(' ');
    if (!user.first_name.match(/^[A-Za-z. ]+$/)) {
      return utilsError.error(res, 400, 'Name cannot contain special characters');
    }
  
    if (user.last_name) {
      user.last_name = user.last_name
        .trim()
        .split(' ')
        .map((w) => (w ? w[0].toUpperCase() + w.substr(1).toLowerCase() : ''))
        .join(' ');
      if (!user.last_name.match(/^[A-Za-z. ]+$/)) {
        return utilsError.error(
          res,
          400,
          'Name cannot contain special characters',
        );
      }
    } else {
      user.last_name = '';
    }

    if (!user.password || user.password.length < 8) {
      return utilsError.error(
        res,
        400,
        'Please enter password with minimum 8 characters',
      );
    }

    return addUser(res, user);

  });
  