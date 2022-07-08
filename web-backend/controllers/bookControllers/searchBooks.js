const axios = require('axios');
const express = require('express');
const utilsError = require('../../utils/error');

const router = express.Router();

//This url will look like website.com/books/<book-name>
//Base url already contains website.com/books

//Send the book name with a plus instead of spaces
//For example, the request for "Atomic Habits" will look like
//website.com/boooks/Atomic+Habits

//returns an obj of 3 arrays, check code
//if image doesnt exist, it will contain a string, then display the default image

router.post('/:book_name', async (req, res) => {
    const book_name = req.params.book_name;
    let data;
    try {
        data = await axios.get(
            `https://www.googleapis.com/books/v1/volumes?q=${book_name}&maxResults=10`
        );
        console.log(data.data.items[0]);
    }
    catch(err){
        console.log(err);
        return utilsError.error(res, 500, 'Internal Server Error');
    }

    let book_titles = []
    let book_images = []
    let book_ids = []
    for (let i  = 0; i < 10; i++) {
        let image;
        let title;
        let id;
        try{
            title = data.data.items[i].volumeInfo.title;
            
            if(!data.data.items[i].volumeInfo.imageLinks || !data.data.items[i].volumeInfo.imageLinks.thumbnail){
                image = "icons/logo.svg";
            }else{
                image = await axios.get(data.data.items[i].volumeInfo.imageLinks.thumbnail);
            }
    
            id = data.data.items[i].id;
        }
        catch(err){
            console.log(err);
            continue;
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
  res.status(200).send(data);
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
    description: "The #1 New York Times bestseller. Over 4 million copies sold! Tiny Changes, Remarkable Results No matter your goals, Atomic Habits offers a proven framework for improving--every day. James Clear, one of the world's leading experts on habit formation, reveals practical strategies that will teach you exactly how to form good habits, break bad ones, and master the tiny behaviors that lead to remarkable results. If you're having trouble changing your habits, the problem isn't you. The problem is your system. Bad habits repeat themselves again and again not because you don't want to change, but because you have the wrong system for change. You do not rise to the level of your goals. You fall to the level of your systems. Here, you'll get a proven system that can take you to new heights. Clear is known for his ability to distill complex topics into simple behaviors that can be easily applied to daily life and work. Here, he draws on the most proven ideas from biology, psychology, and neuroscience to create an easy-to-understand guide for making good habits inevitable and bad habits impossible. Along the way, readers will be inspired and entertained with true stories from Olympic gold medalists, award-winning artists, business leaders, life-saving physicians, and star comedians who have used the science of small habits to master their craft and vault to the top of their field. Learn how to: • make time for new habits (even when life gets crazy); • overcome a lack of motivation and willpower; • design your environment to make success easier; • get back on track when you fall off course; ...and much more. Atomic Habits will reshape the way you think about progress and success, and give you the tools and strategies you need to transform your habits--whether you are a team looking to win a championship, an organization hoping to redefine an industry, or simply an individual who wishes to quit smoking, lose weight, reduce stress, or achieve any other goal.",
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
      smallThumbnail: 'http://books.google.com/books/content?id=XfFvDwAAQBAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api',
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