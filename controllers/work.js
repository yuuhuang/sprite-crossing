const AuthModel = require('../models/auth');
const UserModel = require('../models/user');
const WorkModel = require('../models/work');
const jwt = require('jsonwebtoken');

module.exports.postWork = async (req, res) => {
  const { image, title, description, tags } = req.body;

  try {
    const token = req.cookies.jwt;
    jwt.verify(token, 'yuu huang is the handsomest', async (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.status(400).json({err});
      } else {
        const auth = await AuthModel.findById(decodedToken.id);
        const work = await WorkModel.create({userId: auth.userId, image, title, description, tags});
        const user = await UserModel.findById(auth.userId);
        await UserModel.updateOne({_id: auth.userId}, {worksList: [work._id, ...user.worksList]});
        res.status(200).json({success: true});
      }
    })
  } catch (err) {
    console.log(err);
    res.status(400).json({err});
  }
}