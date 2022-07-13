const axios = require('axios');
const express = require('express');
const utilsError = require('../../utils/error');
const bookUtils = require('../../utils/bookUtils');

const {checkAuthenticated} = require('../../middlewares/auth');
const secrets = require('../../secrets');

const router = express.Router();

// website.com/myBooks/favorites
router.get('/favorites', checkAuthenticated, async (req, res) => {
  const email = req.user.email;
  const accessToken = await bookUtils.getAccessToken(email, res);
  const options = {
    method: 'GET',
    url: `https://www.googleapis.com/books/v1/mylibrary/bookshelves/${bookUtils.mapping['Favorites']}/volumes?key=${secrets.googleBooksAPI}`,
    headers: {
      'content-type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    },
  };

  axios.request(options).then((response) => {
    console.log(response.data.items);
  }).catch((error) => {
    console.error(error);
    return null;
  });
  res.sendStatus(200);
});


module.exports = router;
