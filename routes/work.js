const { Router } = require('express');
const workController = require('../controllers/work');

const router = Router();

router.post('/work/publish', workController.postWork);

module.exports = router;