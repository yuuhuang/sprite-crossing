const { Router } = require('express');
const workController = require('../controllers/work');

const router = Router();

router.post('/work/publish', workController.postWork);
router.post('/work', workController.getWork);
router.get('/workslist', workController.getAllWorks);
router.post('/work/view', workController.viewWork);
router.post('/work/like', workController.likeWork);
router.post('/work/comment', workController.postWorkComment);

module.exports = router;