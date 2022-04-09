const express = require('express')
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const { requireAuth, checkUser } = require('./middlewares/auth');

const authRoutes = require('./routes/auth');
const imageRoutes = require('./routes/image');
const userRoutes = require('./routes/user');
const workRoutes = require('./routes/work');
const discussRoutes = require('./routes/discuss');

const app = express();


// Connect to MongoDB

// eslint-disable-next-line max-len
// const dbUrl = 'mongodb+srv://yuuhuang:x4tDcuvCQ2rNSmK@sprite-crossing.8roz9.mongodb.net/sprite-crossing?retryWrites=true&w=majority';
// const dbUrl = 'mongodb://localhost:27017/sprite-crossing';
const dbUrl = 'mongodb://localhost:27017/sprite-crossing-test';
mongoose.connect(dbUrl, {useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => {
    console.log('connect to mongodb');
    app.listen(3001, () => {
      console.log(`http://localhost:3001/home`);
    });
  })
  .catch(err => {
    console.log(err);
  });


// Middlewares

app.use(express.static('uploads'));
app.use(morgan('dev'));
app.use(cors({credentials: true, origin: true}));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cookieParser());

// app.get('*', checkUser);
// app.get('/profile', requireAuth, (req, res) => {
//   res.send('open profile');
// });

app.use(authRoutes);
app.use(imageRoutes);
app.use(userRoutes);
app.use(workRoutes);
app.use(discussRoutes);

app.use('/home', express.static(__dirname + '/ui/dist'));
