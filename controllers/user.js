const UserModel = require('../models/user');
const AuthModel = require('../models/auth');
const jwt = require('jsonwebtoken');

module.exports.getUser = async (req, res) => {
  const { nickname } = req.body;
  const token = req.cookies.jwt;
  
  let user;
  try {
    if (nickname) {
      user = await UserModel.find({nickname});
      const { avatar, bio, backgroundImage, worksList } = user;
      res.status(200).json({ nickname, avatar, bio, backgroundImage, worksList });
    } else {
      jwt.verify(token, 'yuu huang is the handsomest', async (err, decodedToken) => {
        if (err) {
          console.log(err.message);
          res.status(400).json({err});
        } else {
          const auth = await AuthModel.findById(decodedToken.id);
          user = await UserModel.findById(auth.userId);
        }
        const { nickname, avatar, bio, backgroundImage, worksList } = user;
        res.status(200).json({ nickname, avatar, bio, backgroundImage, worksList });
      })
    }
  } catch (err) {
    res.status(400).json({err});
  }
}