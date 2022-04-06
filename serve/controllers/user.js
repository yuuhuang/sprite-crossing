const UserModel = require('../models/user');

const getUserById = (req, res) => {
  UserModel.findById(req.query.id)
    .then(result => {
      res.send(result);
    })
    .catch(err => {
      console.log(err);
    })
};

module.exports = {
  getUserById,
};