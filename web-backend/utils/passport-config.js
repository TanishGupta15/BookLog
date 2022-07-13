const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

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

  passport.use(new LocalStrategy({usernameField: 'email'}, authenticateUser));
  passport.serializeUser((user, done) => {
    process.nextTick(() => {return done(null, user.email);} );
  });

  passport.deserializeUser(async (email, done) => {
    console.log('desearlise');
    try {
      const user = await getUserByEmail(email);
      process.nextTick(() => {return done(null, user);});
    } catch (err) {
      return done(err, null);
    }
  });
}

module.exports = initialize;
