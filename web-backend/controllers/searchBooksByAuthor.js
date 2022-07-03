const axios = require('axios');
const express = require('express');
const utilsError = require('../utils/error');

const router = express.Router();

//This route returns all books (upto 10) by the specific authors

// The url for this page should look like - 
// website.com/authors/author-name
// example: website.com/authors/Richard+Moreno

router.post('/:author', async (req, res) => {

    const author = req.params.author;
    let books;
    try {
        books = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=inauthor:"${author}"`);
        console.log("Fetched books!");
        let bookItems = books.data.items;
        let book_titles = [];
        let book_images = [];
        let book_ids = [];
        for (let i = 0; i < Math.min(books.data.totalItems, 10); i++) {
            console.log(bookItems[i]);
            let image;
            let title = bookItems[i].volumeInfo.title;
            let id = bookItems[i].id;
            
            if(!bookItems[i].volumeInfo.imageLinks || !bookItems[i].volumeInfo.imageLinks.thumbnail){
                image = "icons/logo.svg";
            }else{
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
        
        res.send(200);
        return obj;
        
    }catch(err){
        console.log(err);
        return utilsError.error(res, 500, 'Internal Server Error');
    }
});




module.exports = router;