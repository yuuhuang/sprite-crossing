const AuthModel = require('../models/auth');
const UserModel = require('../models/user');
const WorkModel = require('../models/work');
const jwt = require('jsonwebtoken');

module.exports.getWork = async (req, res) => {
  const { image } = req.body;
  try {
    const token = req.cookies.jwt;
    jwt.verify(token, 'yuu huang is the handsomest', async (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.status(400).json({err});
      } else {
        const auth = await AuthModel.findById(decodedToken.id);
        const work = await WorkModel.find({image});
        const { title, description, tags, viewUsers, likeUsers, comments, userId, updatedAt} = work[0];
        const user = await UserModel.findById(userId);
        res.status(200).json({
          image,
          title, description, tags, comments,
          viewNum: viewUsers.length,
          likeNum: likeUsers.length,
          uploadTime: updatedAt,
          nickname: user.nickname,
          avatar: user.avatar,
          liked: likeUsers.includes(auth._id),
        })
      }
    })
  } catch (err) {
    res.status(400).json({err});
  }
}

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