const axios = require('axios');
const express = require('express');
const utilsError = require('../../utils/error');
const bookProcess = require('./bookProcess');

const router = express.Router();

// This url will look like website.com/books/<book-name>
// Base url already contains website.com/books

// Send the book name with a plus instead of spaces
// For example, the request for "Atomic Habits" will look like
// website.com/boooks/Atomic+Habits

// returns an obj of 3 arrays, check code
// if image doesnt exist, it will contain a string,
// then display the default image

router.post('/:bookName', async (req, res) => {
  const bookName = req.params.bookName;
  let data;
  try {
    data = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=intitle:${bookName}&maxResults=10`,
    );
    console.log(data.data.items[0]);
  } catch (err) {
    console.log(err);
    return utilsError.error(res, 500, 'Internal Server Error');
  }
  const bookItems = data.data.items;
  bookProcess.booksProcess(res, bookItems);
});

module.exports = router;


/*
    data.data looks like this -
    {
  kind: 'books#volumes',
  totalItems: 1991,
  items: [
    {
      kind: 'books#volume',
      id: 'XfFvDwAAQBAJ',
      etag: 'FcsGl2UliBI',
      selfLink: 'https://www.googleapis.com/books/v1/volumes/XfFvDwAAQBAJ',
      volumeInfo: [Object],
      saleInfo: [Object],
      accessInfo: [Object]
    },
    {
      kind: 'books#volume',
      id: 'fFCjDQAAQBAJ',
      etag: 'zyKuL+nWFhk',
      selfLink: 'https://www.googleapis.com/books/v1/volumes/fFCjDQAAQBAJ',
      volumeInfo: [Object],
      saleInfo: [Object],
      accessInfo: [Object],
      searchInfo: [Object]
    }
  ]
}

  data.data.items[0] looks like this -

    {
  kind: 'books#volume',
  id: 'XfFvDwAAQBAJ',
  etag: 'vFdgq/9Pux8',
  selfLink: 'https://www.googleapis.com/books/v1/volumes/XfFvDwAAQBAJ',
  volumeInfo: {
    title: 'Atomic Habits',
    subtitle: 'An Easy & Proven Way to Build Good Habits & Break Bad Ones',
    authors: [ 'James Clear' ],
    publisher: 'Penguin',
    publishedDate: '2018-10-16',
    description: "This is some desc",
    industryIdentifiers: [ [Object], [Object] ],
    readingModes: { text: false, image: false },
    pageCount: 320,
    printType: 'BOOK',
    categories: [ 'Business & Economics' ],
    averageRating: 4,
    ratingsCount: 30,
    maturityRating: 'NOT_MATURE',
    allowAnonLogging: false,
    contentVersion: '0.10.0.0.preview.0',
    panelizationSummary: { containsEpubBubbles: false, containsImageBubbles: false },
    imageLinks: {
    smallThumbnail:'http://books.google.com/books/content?id=XfFvDwAAQBAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api',
      thumbnail: 'http://books.google.com/books/content?id=XfFvDwAAQBAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api'
    },
    language: 'en',
    previewLink: 'http://books.google.co.in/books?id=XfFvDwAAQBAJ&pg=PP1&dq=atomic+habits&hl=&cd=1&source=gbs_api',
    infoLink: 'http://books.google.co.in/books?id=XfFvDwAAQBAJ&dq=atomic+habits&hl=&source=gbs_api',
    canonicalVolumeLink: 'https://books.google.com/books/about/Atomic_Habits.html?hl=&id=XfFvDwAAQBAJ'
  },
  saleInfo: { country: 'IN', saleability: 'NOT_FOR_SALE', isEbook: false },
  accessInfo: {
    country: 'IN',
    viewability: 'NO_PAGES',
    embeddable: false,
    publicDomain: false,
    textToSpeechPermission: 'ALLOWED',
    epub: { isAvailable: false },
    pdf: { isAvailable: false },
    webReaderLink: 'http://play.google.com/books/reader?id=XfFvDwAAQBAJ&hl=&printsec=frontcover&source=gbs_api',
    accessViewStatus: 'NONE',
    quoteSharingAllowed: false
  }
}


*/
