const {Router} = require('express');
const multer  = require('multer');

const uploadWork = multer({ dest: 'uploads/works' });
const router = Router();


router.post('/upload/work', uploadWork.single('avatar'), (req, res, next) => {
});

module.exports = router;