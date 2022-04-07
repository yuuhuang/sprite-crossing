const { Router } = require('express');
const authController = require('../controllers/auth');

const router = Router();

router.post('/signup', authController.postSignup);
router.post('/login', authController.postLogin);
router.get('/logout', authController.getLogout);

module.exports = router;