const multer  = require('multer');

const avatarStorage = multer.diskStorage({
  destination: 'uploads/avatars/',
  filename: function (req, file, cb) {
    cb(null, Date.now() + '_' + file.originalname);
  }
});
module.exports.avatarUpload = multer({storage: avatarStorage}).single('avatar');


const backgroundStorage = multer.diskStorage({
  destination: 'uploads/backgrounds/',
  filename: function (req, file, cb) {
    cb(null, Date.now() + '_' + file.originalname);
  }
});
module.exports.backgroundUpload = multer({storage: backgroundStorage}).single('background');


const workStorage = multer.diskStorage({
  destination: 'uploads/works/',
  filename: function (req, file, cb) {
    cb(null, Date.now() + '_' + file.originalname);
  }
});
module.exports.workUpload = multer({storage: workStorage}).single('work');
