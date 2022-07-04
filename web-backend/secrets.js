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
  if(process.env.client_id === undefined) {
    throw new Error('ClientId needed');
  }
  if(process.env.client_secret === undefined) {
    throw new Error('ClientSecret needed');
  }
  if(process.env.google_books_api === undefined) {
    throw new Error('GoogleBooks API needed');
  }

  const myAWSAccessKeyId = process.env.AWSAccessKeyId;
  const myAWSSecretKey = process.env.AWSSecretKey;
  const awsRegion = process.env.region;
  const { tableName, client_id, client_secret, google_books_api } = process.env;

  const dynamoDB = new AWS.DynamoDB.DocumentClient({
    region: awsRegion,
    accessKeyId: myAWSAccessKeyId,
    secretAccessKey: myAWSSecretKey,
  });

  module.exports = {
    AWSAcccessKeyId: myAWSAccessKeyId,
    AWSSecretKey: myAWSSecretKey,
    awsRegion,
    tableName,
    dynamoDB,
    client_id,
    client_secret,
    google_books_api,
  };