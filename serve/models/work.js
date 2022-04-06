const mongoose = require('mongoose');
const {Schema} = mongoose;

const workSchema = new Schema({
  // basic
  // _id
  // createAt
  // updateAt

  // artist
  userId: {
    type: Number,
    required: true,
  },

  // work
  image: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  tags: {
    type: Array,
  },

  // others
  viewNum: {
    type: Number,
  },
  likeNum: {
    type: Number,
  },
  comments: [
    {
      userId: Number,
      text: String,
      postTime: {
        type: Date,
        default: Date.now,
      },
      replyTo: Number,
    }
  ],
}, {
  timestamps: {
    createAt: 'createAt',
    updateAt: 'updateAt',
  },
});

const WorkModel = mongoose.model('Work', workSchema);

module.exports = WorkModel;