// node-modules

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const favicon = require('serve-favicon');
const logger = require('morgan');
const passport = require('passport');
const cookieSession = require('cookie-session');
const session = require('express-session');

// routers
const httpRouter = require('./httpRoutes');

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0'

// middlewares etc
const initializePassport = require('./utils/passport-config.js');
const secrets = require('./secrets');

initializePassport(passport, async (email) => {
  console.log('inside initializePassport callback');
  try {
    const params = {
      TableName: secrets.tableName,
      Key: {
        email,
      },
    };
    const data = await secrets.dynamoDB.get(params).promise();
    console.log('Dynamodb get called');
    if (data.Item) {
      return data.Item;
    }

    console.log('User with the given credential does not exist');
  } catch (err) {
    console.log(err);
  }
  return null;
});

const app = express();
app.set('port', process.env.PORT || 3001);
app.use(helmet());
app.use(
    helmet.hsts({
      maxAge: 31536000,
      includeSubDomains: true,
      preload: true,
    }),
);
// if (process.env.NODE_ENV === 'production') {
//   const corsOption = {
//     origin: ['https://website_name.com',
//               /^http:\/\/localhost:[0-9]*$/,
//             ], //Fill the website name here
//     methods: 'GET,POST,DELETE',
//     credentials: true,
//     exposedHeaders: ['x-auth-token'],
//   };
//   app.use(cors.cors(corsOption));
// }

app.use(cors({
  origin: [process.env.url],
  credentials: true,
}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(favicon(`${__dirname}/favicon.ico`));
app.use(logger('dev'));
app.use(session({
  secret: 'SECRET',
  resave: false,
  saveUninitialized: false,
  cookie: {_expires: 60000000},
}));
// This is a bug in passport itself, while using cookie secure true, it doesnt save login session
app.set('trust proxy', true);
app.use(passport.initialize());

const cookieParams = {
  secret: secrets.sessionSecret,
  name: 'BookLog',
  keys: ['a'],
  maxAge: 5 * 24 * 60 * 60 * 1000, // 5 days
};

// app.use(
//   cookieSession(cookieParams),
// );
app.use(passport.session());
app.use(passport.authenticate('session'));
httpRouter.router(app);

app.listen(app.get('port'), () => {
  console.log('Started listening on port', app.get('port'));
});
