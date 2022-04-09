const { Router } = require('express');
const discussController = require('../controllers/discuss');


const router = Router();

router.post('/discuss', discussController.getDiscuss);
router.get('/discuss/list', discussController.getDiscussList);
router.post('/discuss/post', discussController.postDiscuss);
router.post('/discuss/comment', discussController.postComment);
router.post('/discuss/reply', discussController.postReply);
router.post('/discuss/view', discussController.viewDiscuss);

module.exports = router;