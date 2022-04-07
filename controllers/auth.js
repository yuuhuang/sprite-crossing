const AuthModel = require('../models/auth');
const UserModel = require('../models/user');
const jwt = require('jsonwebtoken');

const handleErrors = (err) => {
  console.log(err.message, err.code);
  let errors = { email: '', password: '' };

  if (err.message.includes('email invalid')) {
    errors.email = 'email invalid';
  }
  
  if (err.message === 'email incorrect') {
    errors.email = 'email not registered';
  }
  
  if (err.message === 'password incorrect') {
    errors.password = 'password incorrect';
  }
  
  if (err.code === 11000 && err.message.includes('email')) {
    errors.email = 'email is already registered';
    return errors;
  }
  
  if (err.code === 11000 && err.message.includes('nickname')) {
    errors.nickname = 'nickname is already registered';
    return errors;
  }
  
  if (err.message.includes('user validation failed')) {
    // console.log(err);
    Object.values(err.errors).forEach(({ properties }) => {
      // console.log(val);
      // console.log(properties);
      errors[properties.path] = properties.message;
    });
  }
  
  return errors;
}

const maxAge = 7 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, 'yuu huang is the handsomest', {
    expiresIn: maxAge
  });
};

module.exports.checkUser = async (req, res) => {
  const token = req.cookies.jwt;
  
  if (token) {
    jwt.verify(token, 'yuu huang is the handsomest', (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.json({loginStatus: false});
      } else {
        console.log(decodedToken);
        res.json({loginStatus: true})
      }
    });
  } else {
    res.json({loginStatus: false});
  }
}

module.exports.postSignup = async (req, res) => {
  const { email, password, nickname } = req.body;
  
  try {
    const user = await UserModel.create({ nickname });
    const auth = await AuthModel.create({ email, password, userId: user._id });
    const token = createToken(auth._id);
    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(201).json({ auth: auth._id });
  }
  catch(err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
  
}

module.exports.postLogin = async (req, res) => {
  const { email, password } = req.body;
  
  try {
    const auth = await AuthModel.login(email, password);
    const token = createToken(auth._id);
    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(200).json({ auth: auth._id });
  }
  catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
  
}

module.exports.getLogout = (req, res) => {
  res.cookie('jwt', '', { maxAge: 1 });
  res.send();
}