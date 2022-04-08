const { Router } = require('express');
const path = require('path');

const router = Router();

router.get('/image/:class/:img', (req, res) => {
  res.sendFile(path.resolve(`uploads/${req.params.class}s/${req.params.img}`));
});
  
module.exports = router;