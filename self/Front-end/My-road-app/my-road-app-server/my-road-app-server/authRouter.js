const express = require('express');
const router = express.Router();
const controller = require('./authController');
const { check } = require('express-validator');

router.post('/registration', [
    check('username', 'Username must be not empty').notEmpty(),
    check('email', 'Email must be not empty').notEmpty(),
    check('password', 'Password must be longer than 4 characters and less than 10').isLength({min:4, max:10})
], controller.registration);
router.post('/login', controller.login);
module.exports = router;