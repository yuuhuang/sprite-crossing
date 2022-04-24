const AuthModel = require('../models/auth');
const UserModel = require('../models/user');
const WorkModel = require('../models/work');
const jwt = require('jsonwebtoken');

module.exports.getWork = async (req, res) => {
  let auth;

  const token = req.cookies.jwt;
  jwt.verify(token, 'yuu huang is the handsomest', async (err, decodedToken) => {
    if (err) {
      console.log(err.message);
      // res.status(400).json({err});
    } else {
      auth = await AuthModel.findById(decodedToken.id);
    }
  });
  
  try {
    const { image } = req.body;

    const work = await WorkModel.findOne({image});
    const { title, description, tags, viewUsers, likeUsers, comments, userId, createdAt} = work;
    const user = await UserModel.findById(userId);
    const formatComments = await Promise.all(comments.map(async comment => {
      const replier = await UserModel.findById(comment.userId);
      let replyToName = '';
      if (comment.replyTo) {
        const replyToUser = await UserModel.findById(comment.replyTo);
        replyToName = replyToUser.nickname;
      }
      return {
        avatar: replier.avatar,
        nickname: replier.nickname,
        text: comment.text,
        uploadTime: comment.uploadTime,
        replyTo: replyToName,
      }
    }));
  
    res.status(200).json({
      image,
      title, description, tags,
      comments: formatComments,
      viewNum: viewUsers.length,
      likeNum: likeUsers.length,
      uploadTime: createdAt,
      nickname: user.nickname,
      avatar: user.avatar,
      liked: auth && auth.userId ? likeUsers.includes(auth.userId) : false,
    })
  } catch (err) {
    res.status(400).json({err});
  }
}

module.exports.getAllWorks = async (req, res) => {
  let auth;
  const token = req.cookies.jwt;
  jwt.verify(token, 'yuu huang is the handsomest', async (err, decodedToken) => {
    if (!err) {
      auth = await AuthModel.findById(decodedToken.id);
    }
  });

  try {
    const works = await WorkModel.find();
    const result = [];
    await Promise.all(works.map(async item => {
      const artist = await UserModel.findById(item.userId);
      const formatComments = await Promise.all(item.comments.map(async comment => {
        const replier = await UserModel.findById(comment.userId);
        let replyToName = '';
        if (comment.replyTo) {
          const replyToUser = await UserModel.findById(comment.replyTo);
          replyToName = replyToUser.nickname;
        }
        return {
          avatar: replier.avatar,
          nickname: replier.nickname,
          text: comment.text,
          uploadTime: comment.uploadTime,
          replyTo: replyToName,
        }
      }));
      result.push({
        image: item.image,
        title: item.title,
        description: item.description,
        tags: item.tags,
        comments: formatComments,
        viewNum: item.viewUsers.length,
        likeNum: item.likeUsers.length,
        uploadTime: item.createdAt,
        nickname: artist.nickname,
        avatar: artist.avatar,
        liked: auth && auth.userId ? item.likeUsers.includes(auth.userId) : false,
      })
    }))
    res.status(200).json({worksList: result});
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
        res.status(400).json({notLogged: false, err});
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
    // res.status(400).json({err});
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
        res.status(400).json({notLogged: true, err});
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
    // res.status(400).json({err});
  }
}

module.exports.postWorkComment = (req, res) => {
  try {
    const { image, text, uploadTime, replyTo } = req.body;
    
    const token = req.cookies.jwt;
    jwt.verify(token, 'yuu huang is the handsomest', async (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.status(400).json({notLogged: true, err});
      } else {
        const auth = await AuthModel.findById(decodedToken.id);
        const user = await UserModel.findById(auth.userId);
        const work = await WorkModel.findOne({image});
        let replyToId = '';
        if (replyTo) {
          const replyToUser = await UserModel.findOne({nickname: replyTo});
          replyToId = replyToUser._id;
        }
        const oldComments = work.comments;
        await WorkModel.updateOne({image}, {comments: [{
            userId: user._id,
            text, uploadTime,
            replyTo: replyToId,
          }, ...oldComments]});
        res.status(200).json({success: true});
      }
    })
  } catch (err) {
    console.log(err);
    // res.status(400).json({err});
  }
}