const express = require('express');
const router = express.Router();

//controller
const { register } = require('../controller/register.controller');

//middleware
const { checkRegisterData } = require('../midleware/register.middleware');

router.post('/register', checkRegisterData, register);

module.exports = { router };