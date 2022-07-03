const yup = require('yup');

const userSchema = yup.object().shape({
  firstName: yup.string().min(3).required(),
  lastName: yup.string(),
  email: yup.string().email().required(),
  password: yup.string().min(8).max(64).required(),
  confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match').required(),
});

const loginSchema = yup.object().shape({
  email: yup.string().email().required(),
});

module.exports = { userSchema, loginSchema };