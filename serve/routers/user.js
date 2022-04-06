const express = require('express');
const userControllers = require('../controllers/user');

const router = express.Router();


router.get('/getUserById', userControllers.getUserById);

module.exports = router;