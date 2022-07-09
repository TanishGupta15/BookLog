const AWS = require('aws-sdk');
const secrets = require('../secrets');

const SES = new AWS.SES({
  accessKeyId: secrets.AWSAcccessKeyId,
  secretAccessKey: secrets.AWSSecretKey,
  region: secrets.awsRegion,
  endpoint: secrets.endpoint,
});

async function sendMail(email, name) {
  const params = {
    Destination: {
      ToAddresses: [email],
    },
    Message: {
      Body: {
        Html: {
          Data:
            `<p>Greetings ${name}`,
        //     `, <br /><br />
        //       This is a dummy email that is being sent for testing purposes.` +
        //     '</strong><br /><br /><strong>
        //       Pleae ignore the email if you receive it by mistake.' +
        //     '<p><br><strong>
        //       Thanks for your cooperation!</p>' +
        //     // + '<p><img src="https://assets.rdviitd.org/logos/rendezvous.png" alt="" height="60px" align="left" />'
        //     '<strong>BookLog | Let\'s Read It! </strong><br /></p>',
        },
      },
      Subject: {
        Data: 'Welcome to BookLog!',
      },
    },
    Source: 'Booklog Registration <registration@noreply.booklog.com>', // TODO: Register this email ID with AWS
  };

  try {
    await SES.sendEmail(params).promise();
    console.log('%s: Welcome Mailer sent to %s', '12', email);
    return true;
  } catch (err) {
    console.error('Error in sending welcome mail to %s\n', email, err);
    return false;
  }
}

module.exports = {
  sendMail,
};
