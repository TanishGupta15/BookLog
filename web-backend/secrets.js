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

  const myAWSAccessKeyId = process.env.AWSAccessKeyId;
  const myAWSSecretKey = process.env.AWSSecretKey;
  const awsRegion = process.env.region;
  const { tableName } = process.env;

  const dynamoDB = new AWS.DynamoDB.DocumentClient({
    region: awsRegion,
    accessKeyId: myAWSAccessKeyId,
    secretAccessKey: myAWSSecretKey,
  });

  module.exports = {
    AWSAcccessKeyId: myAWSAccessKeyId,
    AWSSecretKey: myAWSSecretKey,
    awsRegion,
    tableName
  };