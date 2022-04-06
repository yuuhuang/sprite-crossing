const express = require('express');
const authControllers = require('../controllers/auth');

const router = express.Router();


router.post('/postSignup', authControllers.postSignup);

router.post('/postLogin', authControllers.postLogin);

module.exports = router;