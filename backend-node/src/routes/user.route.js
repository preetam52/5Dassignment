const express = require('express');
const { signup, signin } = require('../controller/user.controller');
const { signupValidation, signinValidation } = require('../services/user.validation.service');
const router = express.Router();

router.post('/signup', signupValidation, signup)
router.post('/signin', signinValidation, signin)

module.exports = router;