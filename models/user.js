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
  },
  bio: {
    type: String,
    maxlength: 128,
  },
  backgroundImage: {
    type: String,
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

userSchema.pre('save', async function(next) {
  this.avatar = this.avatar || '';
  this.bio = this.bio || '';
  this.backgroundImage = this.backgroundImage || '';
  next();
});

const UserModel = mongoose.model('user', userSchema);

module.exports = UserModel;