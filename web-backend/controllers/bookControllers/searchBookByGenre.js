const axios = require('axios');
const express = require('express');
const utilsError = require('../../utils/error');

const router = express.Router();

//This route returns books of specific genre

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
    const book_ids = [];
    const book_titles = [];
    const book_images = [];

    bookItems.forEach(book => {
      book_ids.push(book.id);
      book_titles.push(book.volumeInfo.title);
      {
        (book.volumeInfo.imageLinks || book.volumeInfo.imageLinks.thumbnail) ?
          book_images.push(book.volumeInfo.imageLinks.thumbnail) : book_images.push('icons/logo.svg');
      }
    })
    const obj = {
      titles: book_titles,
      images: book_images,
      ids: book_ids
    }
    res.status(200).send(obj);
  } catch (err) {
    console.log(err);
    return utilsError.error(res, 500, 'Internal Server Error');
  }
});

module.exports = router;