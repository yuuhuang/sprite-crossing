const { Router } = require('express');
const workController = require('../controllers/work');

const router = Router();

router.post('/work/publish', workController.postWork);
router.post('/work', workController.getWork);

module.exports = router;