const mongoose = require('mongoose');

const workSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
    maxlength: 32,
  },
  description: {
    type: String,
    default: '',
    maxlength: 128,
  },
  tags: {
    type: Array,
  },
  viewUsers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
    },
  ],
  likeUsers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
    },
  ],
  comments: [
    {
      // user  uploadTime  text(maxlength 128)  replyTo
      type: Object,
    }
  ],

  // foreign
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
}, {
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
  },
});

const WorkModel = mongoose.model('work', workSchema);

module.exports = WorkModel;