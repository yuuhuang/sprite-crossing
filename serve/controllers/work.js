const WorkModel = require('../models/work');

const getAllWorks = (req, res) => {
  WorkModel.find()
    .then(result => {
      res.send(result);
    })
    .catch(err => {
      console.log(err);
    })
};

const postWork = (req, res) => {
  console.log(req.payload);
};

module.exports = {
  getAllWorks,
  postWork,
};