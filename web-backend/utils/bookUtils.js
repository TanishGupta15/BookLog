const utilsError = require('./error.js');
const secrets = require('../secrets');

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
    console.log(data);
    return data.Items[0].googleCreds.access_token;
}

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

module.exports = {
    mapping,
    getAccessToken,
}