const axios = require('axios');
const express = require('express');
const utilsError = require('../../utils/error');

const {checkAuthenticated} = require('../../middlewares/auth');
const secrets = require('../../secrets');

const router = express.Router();

const mapping = {
    "Favorites": 0,
    "Purchased": 1,
    "To Read": 2,
    "Reading Now": 3,
    "Have Read": 4,
    "Reviewed": 5,
    "Recently Viewed": 6,
    "My eBooks": 7,
    "Books For You": 8 //If we have no recommendations for the user, this shelf does not exist.
};

//TODO: If access token is expired?
async function getAccessToken(email, res){
    const queryParams = {
        TableName: secrets.tableName,
        KeyConditionExpression: 'email = :value',
        ExpressionAttributeValues: {
            ':value': email,
        },
    };

    let data;
    try {
        data = await secrets.dynamoDB.query(queryParams).promise();
    } catch (err) {
        console.log(err);
        return utilsError.error(res, 500, 'Internal Server Error');
    }

    return data.googleCreds.access_token;
}

//website.com/myBooks/favorites
router.get('/favorites', checkAuthenticated, (req, res) => {
    console.log("Here");
    const email = req.user.email;
    const accessToken = getAccessToken(email, res);
    console.log(email);
    const options = {
        method: 'GET',
        url: `GET https://www.googleapis.com/books/v1/mylibrary/bookshelves/${mappings[Favorites]}/volumes?key=${secrets.googleBooksAPI}`,
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

});



module.exports = router;