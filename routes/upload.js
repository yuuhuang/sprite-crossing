const {Router} = require('express');
const uploadController = require('../controllers/upload');

const router = Router();

router.post('/upload/avatar', uploadController.avatarUpload, (req, res) => {
  if (req.file) {
    res.status(200).json({success: true, filename: req.file.filename})
  } else {
    res.status(400).json({error: 'no file'})
  }
})

router.post('/upload/background', uploadController.backgroundUpload, (req, res) => {
  if (req.file) {
    res.status(200).json({success: true, filename: req.file.filename})
  } else {
    res.status(400).json({error: 'no file'})
  }
})

module.exports = router;