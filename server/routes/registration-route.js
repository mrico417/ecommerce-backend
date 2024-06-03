const express = require('express');
const router = express.Router();
const { addRegistration } = require('../controllers/registration-controller');
const { authenticate } = require('../controllers/auth-controller')


router.post('/', addRegistration, authenticate);

module.exports = router;
