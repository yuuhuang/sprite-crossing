const {Router} = require('express');
const imageController = require('../controllers/image');
const UserModel = require('../models/user');
const AuthModel = require('../models/auth');
const path = require('path');
const jwt = require('jsonwebtoken');

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


router.get('/image/myavatar', (req, res) => {
  try {
    const token = req.cookies.jwt;
    jwt.verify(token, 'yuu huang is the handsomest', async (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.status(400).json({err});
      } else {
        const auth = await AuthModel.findById(decodedToken.id);
        const user = await UserModel.findById(auth.userId);
        res.status(200).sendFile(path.resolve(`uploads/avatars/${user.avatar}`));
      }
    })
  } catch (err) {
    res.status(400).json({err});
  }
})

module.exports = router;