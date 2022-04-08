const { Router } = require('express');
const userController = require('../controllers/user');


const router = Router();

router.post('/userinfo', userController.getUser);
router.post('/update/profile', userController.postUser),

module.exports = router;