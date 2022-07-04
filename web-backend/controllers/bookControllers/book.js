const axios = require('axios');
const express = require('express');
const utilsError = require('../../utils/error');

const router = express.Router();


// This route returns specific details about a book

//This url will look like: website.com/<book-id>

router.post('/:id', async (req, res) => {

    const id = req.params.id;
    let book;
    try {
        book = await axios.get(`https://www.googleapis.com/books/v1/volumes/${id}`);
        console.log(book);
        //This is a javascript object
        if(!book.data.volumeInfo){
            return utilsError.error(res, 400, 'No information could be retrieved :(');
        } 
        bookData = book.data;
        bookVolume = bookData.volumeInfo;

        let obj = {
            title: bookVolume.title,
            subtitle: bookVolume.subtitle,
            authors: bookVolume.authors,
            publisher: bookVolume.publisher,
            publishedDate: bookVolume.publishedDate,
            description: bookVolume.description,
            pageCount: bookVolume.pageCount,
            dimensions: bookVolume.dimensions,
            categories: bookVolume.categories,
            averageRating: bookVolume.averageRating,
            ratingsCount: bookVolume.ratingsCount,
            maturityRating: bookVolume.maturityRating,
            language: bookVolume.language,
        };
        res.send(obj);
    }catch(err) {
        console.log(err);
        return utilsError.error(res, 500, 'Internal Server Error');
    }

});



module.exports = router;