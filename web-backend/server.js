const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const favicon = require('serve-favicon');
const logger = require('morgan');
const passport = require('passport');
const cookieSession = require('cookie-session');
const session = require('express-session');
//add favicon.ico in this directory
//add env file, tableName, session_secret is just a random integer

const userRouter = require('./controllers/user');
const homepageRouter = require('./controllers/homepage');
const initializePassport = require('./utils/passport-config');
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
  origin: ['http://localhost:3000'],
  credentials: true,
}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// app.use(favicon(`${__dirname}/favicon.ico`));
app.use(logger('dev'));
app.use(session({ secret: 'SECRET' }));
app.use(passport.initialize());
// app.use(
//   cookieSession({
//     secret: secrets.sessionSecret,
//     name: 'BookLog',
//     maxAge: 5 * 24 * 60 * 60 * 1000, // 5 days
//   }),
// );
app.use(passport.session());

const apiRouter = express.Router();
apiRouter.use('/user', userRouter);

app.use('/', apiRouter);
apiRouter.use('/user', userRouter);

app.use('/', apiRouter);
apiRouter.use('/homepage', homepageRouter);

app.listen(app.get('port'), () => {
  console.log('Started listening on port', app.get('port'));
});

