const axios = require('axios');
const express = require('express');
const utilsError = require('../../utils/error');

const router = express.Router();

//This route returns books of specific genre

// The url for this page should look like - 
// website.com/genres/genre-name
// example: website.com/genres/fiction

router.post('/:genre', async (req, res) => {
  const genre = req.params.genre;
  let books;
  try {
    books = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=subject:"${genre}"&maxResults=10`);
    console.log("Fetching books!");
    let bookItems = books.data.items;
    let book_titles = [];
    let book_images = [];
    let book_ids = [];
    for (let i = 0; i < 10; i++) {
      let image;
      let title = bookItems[i].volumeInfo.title;
      let id = bookItems[i].id;

      if (!bookItems[i].volumeInfo.imageLinks || !bookItems[i].volumeInfo.imageLinks.thumbnail) {
        image = "icons/logo.svg";
      } else {
        image = await axios.get(bookItems[i].volumeInfo.imageLinks.thumbnail);
      }
      book_titles.push(title);
      book_images.push(image);
      book_ids.push(id);
    }
    let obj = {
      titles: book_titles,
      images: book_images,
      ids: book_ids
    }
    // res.status(200).send(bookItems);
    res.status(200);
    console.log(obj);
    // return obj;
  } catch (err) {
    console.log(err);
    return utilsError.error(res, 500, 'Internal Server Error');
  }
});

module.exports = router;