const utilsError = require('../utils/error');
const validate = (schema) => async (req, res, next) => {
  const user = req.body;
  try {
    await schema.validate(user, {abortEarly: false});
    next;
    return next();
  } catch (err) {
    console.log(err);
    const errors = {};
    err.inner.forEach((error) => {
      const name = error.path;
      const message = error.message;
      errors[name] = message;
    });
    return utilsError.error(res, 400, errors);
  }
};

module.exports = {validate};
