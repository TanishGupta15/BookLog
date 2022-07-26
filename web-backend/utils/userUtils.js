const secrets = require('../secrets');

function getUserProfile(user) {
  return {
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    regTime: user.regTime,
    dp: user.dp,
  };
}


async function addUser(res, user) {
  user.reg_time = new Date().toString();

  if (user.password !== null) {
    user.password = await bcrypt.hash(user.password, 10);
  }

  // const email = user.email;
  const addParams = {
    TableName: secrets.tableName,
    Item: user,
    ConditionExpression: `attribute_not_exists(email)`,
    // This condition is already checked so doesnt matter
  };
  try {
    await secrets.dynamoDB.put(addParams).promise();
    // await welcomeMailer.sendMail(
    //   user.email,
    //   `${user.first_name} ${user.last_name}`,
    // );
    return utilsError.error(res, 200, 'User added successfully');
  } catch (err) {
    if (err.statusCode >= 500) {
      return utilsError.error(res, 500, 'Please try again');
    }
    // console.log(err);
    return null;
  }
}

async function updatePassword(pass, email, res) {
  if (!pass || pass.length < 8) {
    return utilsError.error(res, 400, 'Please enter password with minimum 8 characters');
  }

  pass = await bcrypt.hash(pass, secrets.saltRounds);

  const refParams = {
    TableName: secrets.tableName,
    Key: {
      email,
    },
    ConditionExpression: 'attribute_exists(email)',
    UpdateExpression: 'SET password = :value REMOVE otp, otpTime',
    ExpressionAttributeValues: {
      ':value': pass,
    },
  };
  try {
    await secrets.dynamoDB.update(refParams).promise();
  } catch (err) {
    return utilsError.error(res, 400, 'Invalid email address given');
  }
  return res.status(200).json({
    message: 'Password reset successfully!',
  });
}

async function checkAlreadyExists(user) {
  const queryParams = {
    TableName: secrets.tableName,
    KeyConditionExpression: 'email = :value',
    ExpressionAttributeValues: {
      ':value': user.email,
    },
  };

  let data;
  try {
    data = await secrets.dynamoDB.query(queryParams).promise();
  } catch (err) {
    return true;
  }
  if (data.Items.length !== 0) {
    return true;
  }
  return false;
}

module.exports = {
  getUserProfile,
  checkAlreadyExists,
  updatePassword,
  addUser,
};
