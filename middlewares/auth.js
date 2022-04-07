const jwt = require('jsonwebtoken');
const AuthModel = require('../models/auth');

const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;
  
  if (token) {
    jwt.verify(token, 'yuu huang is the handsomest', (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.send('jwt invalid');
      } else {
        console.log(decodedToken);
        next();
      }
    });
  } else {
    res.send('jwt invalid');
  }
};

const checkUser = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, 'yuu huang is the handsomest', async (err, decodedToken) => {
      if (err) {
        res.locals.user = null;
        next();
      } else {
        const user = await AuthModel.findById(decodedToken.id);
        res.locals.user = user;
        next();
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
};


module.exports = { requireAuth, checkUser };