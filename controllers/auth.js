const AuthModel = require("../models/auth");
const jwt = require('jsonwebtoken');

const handleErrors = (err) => {
  console.log(err.message, err.code);
  let errors = { email: '', password: '' };
  
  if (err.message === 'incorrect email') {
    errors.email = 'email not registered';
  }
  
  if (err.message === 'incorrect password') {
    errors.password = 'password incorrect';
  }
  
  if (err.code === 11000) {
    errors.email = 'email is already registered';
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

module.exports.postSignup = async (req, res) => {
  const { email, password } = req.body;
  
  try {
    const auth = await AuthModel.create({ email, password });
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
}