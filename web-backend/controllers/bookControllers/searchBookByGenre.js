const axios = require('axios');
const express = require('express');
const utilsError = require('../../utils/error');
const bookProcess = require('./bookProcess');

const router = express.Router();

// This route returns books of specific genre

// The url for this page should look like -
// website.com/genres/genre-name
// example: website.com/genres/fiction

// TODO -> add fields option to get better performace
router.post('/:genre', async (req, res) => {
  const genre = req.params.genre;
  try {
    const books = await axios.
        get(`https://www.googleapis.com/books/v1/volumes?q=subject:"${genre}"&maxResults=15&orderBy=newest`);
    const bookItems = books.data.items;
    bookProcess.booksProcess(res, bookItems);
  } catch (err) {
    console.log(err);
    return utilsError.error(res, 500, 'Internal Server Error');
  }
});

module.exports = router;
