const UserModel = require('../models/user');
const WorkModel = require('../models/work');
const AuthModel = require('../models/auth');
const jwt = require('jsonwebtoken');
const fs = require('fs');

module.exports.getUser = async (req, res) => {
  const { nickname } = req.body;
  let user;

  try {
    const token = req.cookies.jwt;

    if (nickname) {
      user = await UserModel.find({nickname});
      const { avatar, bio, backgroundImage, worksList } = user[0];
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

module.exports.postUser = async (req, res) => {
  const { nickname, avatar, bio, backgroundImage } = req.body;
  let user;

  try {
    const token = req.cookies.jwt;
    jwt.verify(token, 'yuu huang is the handsomest', async (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.status(400).json({err});
      } else {
        const auth = await AuthModel.findById(decodedToken.id);
        user = await UserModel.findById(auth.userId);
      }

      if (avatar !== '') {
        const oldAvatar = user.avatar;
        await UserModel.updateOne({_id: user._id}, {avatar}, (err, raw) => {
          console.log(err);
        }).clone();
        await fs.unlink(`uploads/avatars/${oldAvatar}`, err => {
          console.log(err);
        });
      }
      if (backgroundImage !== '') {
        const oldBackgroundImage = user.backgroundImage;
        await UserModel.updateOne({_id: user._id}, {backgroundImage}, (err, raw) => {
          console.log(err);
        }).clone();
        await fs.unlink(`uploads/backgrounds/${oldBackgroundImage}`, err => {
          console.log(err);
        });
      }
      await UserModel.updateOne({_id: user._id}, {nickname, bio}, err => {
        if (err) {
          const errors = {message: err.message};
          if (err.code === 11000 && err.message.includes('nickname')) {
            errors.nickname = 'nickname is already used by others';
          }
          res.status(400).json({errors});
        }
      }).clone();
      res.status(200).json({ success: true, nickname, avatar, bio, backgroundImage });
    })
  } catch (err) {
    res.status(400).json({err});
  }
}

module.exports.getUserWorks = async (req, res) => {
  const { nickname } = req.body;
  let user;
  
  try {
    const token = req.cookies.jwt;
    
    if (nickname) {
      user = await UserModel.find({nickname});
      const works = [];
      let likeNum = 0;
      await Promise.all(user[0].worksList.map(async item => {
        const work = await WorkModel.findById(item);
        likeNum += work.likeUsers.length;
        works.push({image: work.image, createTime: work.createdAt});
      }))
      res.status(200).json({ works, likeNum });
    } else {
      jwt.verify(token, 'yuu huang is the handsomest', async (err, decodedToken) => {
        if (err) {
          console.log(err.message);
          res.status(400).json({err});
        } else {
          const auth = await AuthModel.findById(decodedToken.id);
          user = await UserModel.findById(auth.userId);
        }
        const works = [];
        let likeNum = 0;
        await Promise.all(user.worksList.map(async item => {
          const work = await WorkModel.findById(item);
          likeNum += work.likeUsers.length;
          works.push({image: work.image, createTime: work.createdAt});
        }))
        res.status(200).json({ works, likeNum });
      })
    }
  } catch (err) {
    res.status(400).json({err});
  }
}