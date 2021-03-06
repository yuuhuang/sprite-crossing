const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  nickname: {
    type: String,
    required: true,
    unique: true,
    maxlength: 12,
  },
  avatar: {
    type: String,
    default: '',
  },
  bio: {
    type: String,
    default: '',
    maxlength: 128,
  },
  backgroundImage: {
    type: String,
    default: '',
  },

  // foreign
  worksList: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'work',
    }
  ],
}, {
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
  },
});

const UserModel = mongoose.model('user', userSchema);

module.exports = UserModel;