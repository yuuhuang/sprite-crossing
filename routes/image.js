const {Router} = require('express');
const imageController = require('../controllers/image');
const path = require('path');

const router = Router();

router.post('/upload/avatar', imageController.avatarUpload, (req, res) => {
  if (req.file) {
    res.status(200).json({success: true, filename: req.file.filename})
  } else {
    res.status(400).json({error: 'no file'})
  }
})

router.post('/upload/background', imageController.backgroundUpload, (req, res) => {
  if (req.file) {
    res.status(200).json({success: true, filename: req.file.filename})
  } else {
    res.status(400).json({error: 'no file'})
  }
})

router.post('/upload/work', imageController.workUpload, (req, res) => {
  if (req.file) {
    res.status(200).json({success: true, filename: req.file.filename})
  } else {
    res.status(400).json({error: 'no file'})
  }
})

router.get('/image/:class/:img', (req, res) => {
  res.sendFile(path.resolve(`uploads/${req.params.class}s/${req.params.img}`));
});

module.exports = router;