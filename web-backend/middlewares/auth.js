// Add auth code here.
// Export function that can be used as middlewares
require('dotenv').config();
const express = require('express');
// const bodyParser = require('body-parser');
// const secrets = require('../secrets');

const app = express();
app.use(express.static('public'));
// app.set('view engine', 'ejs');
// app.use(bodyParser.urlencoded({extended: true}));


function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  return res.sendStatus(401);
}

module.exports = {
  checkAuthenticated,
};
