const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const bcrypt = require('bcrypt');
const secrets = require('../secrets');
const userUtils = require('./userUtils');

function initialize(passport, getUserByEmail) {
  const authenticateUser = async (email, password, done) => {
    console.log('inside authenticateUser');
    const user = await getUserByEmail(email);
    if (user == null) {
      return done(null, false, {message: 'No user with that email'});
    }

    try {
      if (await bcrypt.compare(password, user.password)) {
        return done(null, user);
      } else {
        return done(null, false, {message: 'Password Incorrect'});
      }
    } catch (e) {
      return done(e);
    }
  };

  passport.use(new GoogleStrategy({
    clientID: secrets.clientID,
    clientSecret: secrets.clientSecret,
    callbackURL: 'http://localhost:3001/user/oauth2callback',
    scope: ['email', 'profile'],
    passReqToCallback: true,
  },
  async function valid(request, accessToken, refreshToken, params, profile, done) {
    const user = {};
    user.email = profile.email;
    user.password = null;
    user.googleCreds = {
      'access_token': accessToken,
      'refresh_token': refreshToken,
      'expires_in': params.expires_in,
    };
    user.reg_time = new Date().toString();
    user.firstName = profile.name.givenName;
    user.lastName = profile.name.familyName;
    user.dp = profile.photos[0].value;
    const email = user.email;
    const alreadyExists = await userUtils.checkAlreadyExists(user);
    console.log(alreadyExists);
    if (alreadyExists) return done(null, user);

    const addParams = {
      TableName: secrets.tableName,
      Item: user,
      ConditionExpression: `attribute_not_exists(email)`,
      // This condition is already checked so doesnt matter
    };
    try {
      await secrets.dynamoDB.put(addParams).promise();
    } catch (err) {
      return done(err);
    }
    return done(null, user);
  },
  ));

  passport.use(new LocalStrategy({usernameField: 'email'}, authenticateUser));
  passport.serializeUser((user, done) => {
    done(null, user.email);
  });
  passport.deserializeUser(async (email, done) => {
    console.log('desearlise');
    try {
      const user = await getUserByEmail(email);
      return done(null, user);
    } catch (err) {
      return done(err, null);
    }
  });
}

module.exports = initialize;
