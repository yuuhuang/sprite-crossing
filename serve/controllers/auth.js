const AuthModel = require('../models/auth');
const jwt = require('jsonwebtoken');


// jsonwebtoken
const maxAge = 7 * 24 * 60 * 60;
const createToken = id => {
  return jwt.sign({id}, 'afdsf%^&*g&*ggersg&*&Ggwogi', {
    expiresIn: maxAge,
  });
};

const postSignup = (req, res) => {
  const {nickname, password} = req.body;

  try {
    const auth = AuthModel.create({nickname, password});
    res.status(201).json(auth);
  } catch (err) {
    console.log(err);
  }
};

const postLogin = (req, res) => {
  console.log(req.body);
};

module.exports = {
  postSignup,
  postLogin,
};