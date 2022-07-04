const axios = require('axios');
const express = require('express');
const utilsError = require('../../utils/error');
const secrets = require('../../secrets');

const router = express.Router();

const schema = require('../../validations/userValidation');
const validation = require('../../middlewares/validationMiddleware');
const { checkAuthenticated } = require('../../middlewares/auth');

router.get('/:id/addFavorite', 
            validation.validate(schema.loginSchema), 
            passport.authenticate('local', { failureMessage: false }), 
            (req, res) => {
    //Add book favorite Here
    //Check how to know if a user is logged in, and how to get its access token
});


module.exports = router;