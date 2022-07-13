const express = require('express');
const passport = require('passport');
const router = express.Router();
const axios = require('axios');

const utilsError = require('../../utils/error');
const bookUtils = require('../../utils/bookUtils');
const secrets = require('../../secrets');

const schema = require('../../validations/userValidation');
const validation = require('../../middlewares/validationMiddleware');
const {checkAuthenticated} = require('../../middlewares/auth');

router.post('/:id/addFavorite',
    checkAuthenticated,
    async (req, res) => {
        const id = req.params.id;
        const email = req.user.email;
        const accessToken = await bookUtils.getAccessToken(email, res);
        
        const options = {
            method: 'POST',
            url: `https://www.googleapis.com/books/v1/mylibrary/bookshelves/${bookUtils.mapping["Favorites"]}/addVolume?volumeId=${id}&key=${secrets.googleBooksAPI}`,
            headers: {
              'content-type': 'application/json',
              'Authorization': `Bearer ${accessToken}`,
            },
        };

        axios.request(options).then((response) => {
            console.log(response);
          }).catch((error) => {
            console.error(error);
            return null;
          });
          res.sendStatus(200);
});


module.exports = router;
