const AuthModel = require('../models/auth');
const UserModel = require('../models/user');
const WorkModel = require('../models/work');
const jwt = require('jsonwebtoken');

module.exports.getWork = async (req, res) => {
  try {
    const { image } = req.body;

    const token = req.cookies.jwt;
    jwt.verify(token, 'yuu huang is the handsomest', async (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.status(400).json({err});
      } else {
        const auth = await AuthModel.findById(decodedToken.id);
        const work = await WorkModel.findOne({image});
        const { title, description, tags, viewUsers, likeUsers, comments, userId, updatedAt} = work;
        const user = await UserModel.findById(userId);
        res.status(200).json({
          image,
          title, description, tags, comments,
          viewNum: viewUsers.length,
          likeNum: likeUsers.length,
          uploadTime: updatedAt,
          nickname: user.nickname,
          avatar: user.avatar,
          liked: likeUsers.includes(auth.userId),
        })
      }
    })
  } catch (err) {
    res.status(400).json({err});
  }
}

module.exports.getAllWorks = async (req, res) => {
  try {
    const token = req.cookies.jwt;
    jwt.verify(token, 'yuu huang is the handsomest', async (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.status(400).json({err});
      } else {
        const auth = await AuthModel.findById(decodedToken.id);
        const works = await WorkModel.find();
        const result = [];
        await Promise.all(works.map(async item => {
          const artist = await UserModel.findById(item.userId);
          result.push({
            image: item.image,
            title: item.title,
            description: item.description,
            tags: item.tags,
            comments: item.comments,
            viewNum: item.viewUsers.length,
            likeNum: item.likeUsers.length,
            uploadTime: item.updatedAt,
            nickname: artist.nickname,
            avatar: artist.avatar,
            liked: item.likeUsers.includes(auth.userId),
          })
        }))
        res.status(200).json({worksList: result});
      }
    })
  } catch (err) {
    res.status(400).json({err});
  }
}

module.exports.postWork = async (req, res) => {
  try {
    const { image, title, description, tags } = req.body;

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

module.exports.viewWork = async (req, res) => {
  try {
    const { image } = req.body;
  
    const token = req.cookies.jwt;
    jwt.verify(token, 'yuu huang is the handsomest', async (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.status(400).json({err});
      } else {
        const auth = await AuthModel.findById(decodedToken.id);
        const work = await WorkModel.findOne({image});
        let viewNum = work.viewUsers.length;
        if (!work.viewUsers.includes(auth.userId)) {
          viewNum++;
          await WorkModel.updateOne({_id: work._id}, {viewUsers: [auth.userId, ...work.viewUsers]});
        }
        res.status(200).json({success: true, viewNum});
      }
    })
  } catch (err) {
    console.log(err);
    res.status(400).json({err});
  }
}

module.exports.likeWork = async (req, res) => {
  try {
    const { image } = req.body;
    
    const token = req.cookies.jwt;
    jwt.verify(token, 'yuu huang is the handsomest', async (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.status(400).json({err});
      } else {
        const auth = await AuthModel.findById(decodedToken.id);
        const work = await WorkModel.findOne({image});
        let likeNum = work.likeUsers.length, liked;
        if (work.likeUsers.includes(auth.userId)) {
          liked = false;
          likeNum--;
          const newLikeUsers = work.likeUsers;
          newLikeUsers.splice(newLikeUsers.indexOf(auth.userId), 1);
          await WorkModel.updateOne({_id: work._id}, {likeUsers: [...newLikeUsers]});
        } else {
          liked = true;
          likeNum++;
          await WorkModel.updateOne({_id: work._id}, {likeUsers: [auth.userId, ...work.likeUsers]});
        }
        res.status(200).json({success: true, likeNum, liked});
      }
    })
  } catch (err) {
    console.log(err);
    res.status(400).json({err});
  }
}