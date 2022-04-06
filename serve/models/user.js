const mongoose = require('mongoose');
const {Schema} = mongoose;

const userSchema = new Schema({
  // _id
  // createAt
  // updateAt

  nickname: {
    type: String,
    required: true,
  },
  avatar: String,
  bio: String,
  backgroundImage: String,
  worksList: [Number],

  // foreign
  authId: Number,
}, {
  timestamps: {
    createAt: 'createAt',
    updateAt: 'updateAt',
  },
});

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;