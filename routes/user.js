const { Router } = require('express');
const userController = require('../controllers/user');


const router = Router();

router.post('/user/info', userController.getUser);
router.post('/update/profile', userController.postUser);
router.post('/user/works', userController.getUserWorks);

module.exports = router;