const mongoose = require('mongoose');

const discussSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    maxlength: 32,
  },
  description: {
    type: String,
    default: '',
    maxlength: 512,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  comments: {
    type: Array,
    default: [],
    // user uploadTime text(maxlength 128) subcomments
    // // user uploadTime text(maxlength 128) replyTo
  },
  viewUsers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
    },
  ],
}, {
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
  },
});

const DiscussModel = mongoose.model('discuss', discussSchema);

module.exports = DiscussModel;