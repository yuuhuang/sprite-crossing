const mongoose = require('mongoose');
const {isEmail} = require('validator');
const bcrypt = require('bcrypt');

const {Schema} = mongoose;


const authSchema = new Schema({
  // _id
  // createAt
  // updateAt
  email: {
    type: String,
    unique: [true, 'email has been registered'],
    required: [true, 'email required'],
    validate: [isEmail, 'email invalid'],
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, 'password required'],
    minlength: [12, 'password length not less than 12'],
  },
  // foreign
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'user',
  }
}, {
  timestamps: {
    createAt: 'createAt',
    updateAt: 'updateAt',
  },
});

authSchema.pre('save', async function(next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

authSchema.statics.login = async function(email, password) {
  const authCollection = await this.findOne({email});
  if (authCollection) {
    const valid = await bcrypt.compare(password, authCollection.password);
    if (valid) {
      return authCollection;
    }
    throw Error('password incorrect');
  }
  throw Error('email incorrect');
}


const AuthModel = mongoose.model('Auth', authSchema);

module.exports = AuthModel;