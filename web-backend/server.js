//node-modules

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const favicon = require('serve-favicon');
const logger = require('morgan');
const passport = require('passport');
const cookieSession = require('cookie-session');
const session = require('express-session');

//routers
const userRouter = require('./controllers/user');
const homepageRouter = require('./controllers/homepage');
const booksRouter = require('./controllers/bookControllers/searchBooks'); //This route is for getting search results of a string
const bookRouter = require('./controllers/bookControllers/book'); //This route is to get info of a particular book
const authorRouter = require('./controllers/bookControllers/searchBooksByAuthor'); //This route is for getting all (upto 10) books by the specified author
const genreRouter = require('./controllers/bookControllers/searchBookByGenre'); //This route is for getting all (upto 10) books by the specified Genre
const bookSettingsRouter = require('./controllers/bookControllers/bookSettings'); //This route is for setting book variables, like is_favorite, read, purchased, etc
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0'
//middlewares etc
const initializePassport = require('./utils/passport-config');
const secrets = require('./secrets');

//add env file, tableName, session_secret is just a random integer
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

//TODO: look for cookies, how to set, 
// Try removing some boiler plate code, and understanding it
app.use(cors({
  origin: ['http://localhost:3000'],
  credentials: true,
}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// app.use(favicon(`${__dirname}/favicon.ico`));
app.use(logger('dev'));
app.use(session({
  secret: 'SECRET',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
  }));
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
app.use('/', apiRouter);
apiRouter.use('/user', userRouter);
apiRouter.use('/homepage', homepageRouter);
apiRouter.use('/books', booksRouter);
apiRouter.use('', bookRouter);
apiRouter.use('/genres', genreRouter);
apiRouter.use('/authors', authorRouter);
apiRouter.use('', bookSettingsRouter);

app.listen(app.get('port'), () => {
  console.log('Started listening on port', app.get('port'));
});