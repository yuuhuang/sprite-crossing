const AuthModel = require('../models/auth');
const UserModel = require('../models/user');
const DiscussModel = require('../models/discuss');
const jwt = require('jsonwebtoken');

module.exports.getDiscuss = async (req, res) => {
  try {
    const {id} = req.body;
    const discuss = await DiscussModel.findById(id);
    const user = await UserModel.findById(discuss.userId);
    let formatComments = [];
    formatComments = await Promise.all(discuss.comments.map(async comment => {
      const poster = await UserModel.findById(comment.userId);
      let formatSubComments = [];
      formatSubComments = await Promise.all(comment.subcomments.map(async subcomment => {
        const replier = await UserModel.findById(subcomment.userId);
        let replyToName = '';
        if (subcomment.replyTo) {
          const replyToUser = await UserModel.findById(subcomment.replyTo);
          replyToName = replyToUser.nickname;
        }
        return {
          avatar: replier.avatar,
          nickname: replier.nickname,
          uploadTime: subcomment.uploadTime,
          text: subcomment.text,
          replyTo: replyToName,
        }
      }))
      return {
        avatar: poster.avatar,
        nickname: poster.nickname,
        uploadTime: comment.uploadTime,
        text: comment.text,
        subcomments: formatSubComments
      };
    }));
    const result = {
      title: discuss.title,
      description: discuss.description,
      avatar: user.avatar,
      nickname: user.nickname,
      uploadTime: discuss.createdAt,
      viewNum: Array.isArray(discuss.viewUsers) ? discuss.viewUsers.length : 0,
      commentNum: Array.isArray(discuss.comments) ? discuss.comments.length : 0,
      comments: formatComments
    };
    res.status(200).json(result);
  } catch(err) {
    console.log(err);
    res.status(400).json({err});
  }
}

module.exports.getDiscussList = async (req, res) => {
  try {
    const discusses = await DiscussModel.find();
    let discussList = [];
    await Promise.all(discusses.map(async discuss => {
      const user = await UserModel.findById(discuss.userId);
      discussList.push({
        id: discuss._id,
        title: discuss.title,
        description: discuss.description,
        avatar: user.avatar,
        nickname: user.nickname,
        uploadTime: discuss.createdAt,
        viewNum: Array.isArray(discuss.viewUsers) ? discuss.viewUsers.length : 0,
        commentNum: Array.isArray(discuss.comments) ? discuss.comments.length : 0,
      });
    }));
    res.status(200).json({discussList});
  } catch(err) {
    console.log(err);
    res.status(400).json({err});
  }
}

module.exports.postDiscuss = async (req, res) => {
  try {
    const { title, description } = req.body;
  
    const token = req.cookies.jwt;
    jwt.verify(token, 'yuu huang is the handsomest', async (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.status(400).json({notLogged: true, err});
      } else {
        const auth = await AuthModel.findById(decodedToken.id);
        await DiscussModel.create({userId: auth.userId, title, description});
        res.status(200).json({success: true});
      }
    })
  } catch (err) {
    console.log(err);
    res.status(400).json({err});
  }
}

module.exports.postComment = async (req, res) => {
  try {
    const { text, uploadTime, id } = req.body;
    
    const token = req.cookies.jwt;
    jwt.verify(token, 'yuu huang is the handsomest', async (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.status(400).json({notLogged: true, err});
      } else {
        const auth = await AuthModel.findById(decodedToken.id);
        const discuss = await DiscussModel.findById(id);
        await DiscussModel.updateOne({_id: id}, {
          comments: [{
            userId: auth.userId,
            uploadTime: uploadTime,
            text: text,
            subcomments: [],
          }, ...discuss.comments],
        }, err => {
          console.log(err)
        }).clone();
        res.status(200).json({success: true});
      }
    })
  } catch (err) {
    console.log(err);
    // res.status(400).json({err});
  }
}

module.exports.postReply = async (req, res) => {
  try {
    const { id, commentIndex, text, uploadTime, replyTo } = req.body;
    
    const token = req.cookies.jwt;
    jwt.verify(token, 'yuu huang is the handsomest', async (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.status(400).json({notLogged: true, err});
      } else {
        const auth = await AuthModel.findById(decodedToken.id);
        const discuss = await DiscussModel.findById(id);
        let replyToId = '';
        if (replyTo) {
          const replyToUser = await UserModel.findOne({nickname: replyTo});
          replyToId = replyToUser._id;
        }
        await DiscussModel.updateOne({_id: id}, {
          comments: [...discuss.comments.slice(0, commentIndex), {
            userId: discuss.comments[commentIndex].userId,
            uploadTime: discuss.comments[commentIndex].uploadTime,
            text: discuss.comments[commentIndex].text,
            subcomments: [{
              userId: auth.userId,
              text,
              uploadTime,
              replyTo: replyToId,
            }, ...discuss.comments[commentIndex].subcomments],
          }, ...discuss.comments.slice(commentIndex + 1, discuss.comments.length)],
        }, err => {
          console.log(err)
        }).clone();
        res.status(200).json({success: true});
      }
    })
  } catch (err) {
    console.log(err);
    // res.status(400).json({err});
  }
}

module.exports.viewDiscuss = async (req, res) => {
  try {
    const { id } = req.body;
    
    const token = req.cookies.jwt;
    jwt.verify(token, 'yuu huang is the handsomest', async (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.status(400).json({notLogged: true, err});
      } else {
        const auth = await AuthModel.findById(decodedToken.id);
        const discuss = await DiscussModel.findById(id);
        let viewNum = discuss.viewUsers.length;
        if (!discuss.viewUsers.includes(auth.userId)) {
          viewNum++;
          await DiscussModel.updateOne({_id: discuss._id}, {viewUsers: [auth.userId, ...discuss.viewUsers]});
        }
        res.status(200).json({success: true, viewNum});
      }
    })
  } catch (err) {
    console.log(err);
    // res.status(400).json({err});
  }
}