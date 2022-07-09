const AWS = require('aws-sdk');
//  const utils = require('../utils');
const secrets = require('../secrets');

const SES = new AWS.SES({
  accessKeyId: secrets.AWSAcccessKeyId,
  secretAccessKey: secrets.AWSSecretKey,
  region: secrets.awsRegion,
  endpoint: secrets.endpoint,
});

async function sendMail(email, otp) {
  const params = {
    Destination: {
      ToAddresses: [email],
    },
    Message: {
      // Body: {
      //   Html: {
      //     Data:
      //       'Hey! <br/><br/>' +
      //       `The OTP for completing your password reset process is:
      //          <b>${otp}</b>.` +
      //       'Hope you have a great reading experience! :)
      //         <br/><br/>Regards,<br/>Team BookLog',
      //   },
    },
    Subject: {
      Data: 'OTP for BookLog Password Reset',
    },
    // },
    Source: 'BookLog Password Reset <passwordreset@noreply.booklog.com>',
  };

  try {
    await SES.sendEmail(params).promise();
    console.log('%s: OTP sent to %s', '12', email);
    return true;
  } catch (err) {
    console.error('Error in sending OTP to %s\n', email, err);
    return false;
  }
}

module.exports = {
  sendMail,
};
