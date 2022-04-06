const express = require('express');
const workController = require('../controllers/work');

const router = express.Router();


router.get('/getAllWorks', workController.getAllWorks);

router.post('/postWork', workController.postWork);

module.exports = router;