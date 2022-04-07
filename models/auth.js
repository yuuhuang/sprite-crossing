const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');

const authSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate: [isEmail, 'email invalid'],
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },

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

authSchema.pre('save', async function(next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

authSchema.statics.login = async function(email, password) {
  const auth = await this.findOne({ email });
  if (auth) {
    const valid = await bcrypt.compare(password, auth.password);
    if (valid) {
      return auth;
    }
    throw Error('password incorrect');
  }
  throw Error('email incorrect');
};

const AuthModel = mongoose.model('auth', authSchema);

module.exports = AuthModel;