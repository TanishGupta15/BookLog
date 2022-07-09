const AWS = require('aws-sdk');
require('dotenv').config();

if (process.env.AWSAccessKeyId === undefined) {
  throw new Error('AWSAccessKeyId needed');
}
if (process.env.AWSSecretKey === undefined) {
  throw new Error('AWSSecretKey needed');
}
if (process.env.region === undefined) {
  throw new Error('Region needed');
}
if (process.env.clientID === undefined) {
  throw new Error('ClientId needed');
}
if (process.env.clientSecret === undefined) {
  throw new Error('ClientSecret needed');
}
if (process.env.googleBooksAPI === undefined) {
  throw new Error('GoogleBooks API needed');
}

const myAWSAccessKeyId = process.env.AWSAccessKeyId;
const myAWSSecretKey = process.env.AWSSecretKey;
const awsRegion = process.env.region;
const endpoint = new AWS.Endpoint('https://email.ap-south-1.amazonaws.com');
const {tableName, clientID, clientSecret, googleBooksAPI} = process.env;

const dynamoDB = new AWS.DynamoDB.DocumentClient({
  region: awsRegion,
  accessKeyId: myAWSAccessKeyId,
  secretAccessKey: myAWSSecretKey,
});

module.exports = {
  AWSAcccessKeyId: myAWSAccessKeyId,
  AWSSecretKey: myAWSSecretKey,
  awsRegion,
  endpoint,
  tableName,
  dynamoDB,
  clientID,
  clientSecret,
  googleBooksAPI,
};
