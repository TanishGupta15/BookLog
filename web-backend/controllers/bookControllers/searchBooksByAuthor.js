const axios = require('axios');
const express = require('express');
const utilsError = require('../../utils/error');
const bookProcess = require('./bookProcess');

const router = express.Router();

// This route returns all books (upto 10) by the specific authors

// The url for this page should look like -
// website.com/authors/author-name
// example: website.com/authors/Richard+Moreno

router.post('/:author', async (req, res) => {
  const author = req.params.author;
  let books;
  try {
    books = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=inauthor:"${author}"`);

    const bookItems = books.data.items;
    bookProcess.booksProcess(res, bookItems);
  } catch (err) {
    console.log(err);
    return utilsError.error(res, 500, 'Internal Server Error');
  }
});


module.exports = router;
