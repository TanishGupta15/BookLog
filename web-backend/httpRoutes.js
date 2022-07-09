const express = require('express');

const userRouter = require('./controllers/user');
const homepageRouter = require('./controllers/homepage');

const booksRouter = require('./controllers/bookControllers/searchBooks');
// This route is for getting search results of a string

const bookRouter = require('./controllers/bookControllers/book');
// This route is to get info of a particular book

const authorRouter = require('./controllers/bookControllers/searchBooksByAuthor');
// This route is for getting all (upto 10) books by the specified author

const genreRouter = require('./controllers/bookControllers/searchBookByGenre');
// This route is for getting all (upto 10) books by the specified Genre

const bookSettingsRouter = require('./controllers/bookControllers/bookSettings');
// This route is for setting book variables, like is_favorite, read, purchased, etc


module.exports.router = (app) => {
  const apiRouter = express.Router();
  app.use('/', apiRouter);
  apiRouter.use('/user', userRouter);
  apiRouter.use('/homepage', homepageRouter);
  apiRouter.use('/books', booksRouter);
  apiRouter.use('', bookRouter);
  apiRouter.use('/genres', genreRouter);
  apiRouter.use('/authors', authorRouter);
  apiRouter.use('', bookSettingsRouter);
};
