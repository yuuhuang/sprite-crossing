const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');

const workRouter = require('./routers/work');
const userRouter = require('./routers/user');

const app = express();


// Connect to MongoDB

// eslint-disable-next-line max-len
const dbUrl = 'mongodb+srv://yuuhuang:x4tDcuvCQ2rNSmK@sprite-crossing.8roz9.mongodb.net/sprite-crossing?retryWrites=true&w=majority';
mongoose.connect(dbUrl, {useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => {
    console.log('connect to mongodb');
    app.listen(3000);
  })
  .catch(err => {
    console.log(err);
  });


// MiddleWares

app.use(morgan('dev'));
app.use(express.urlencoded({extended: true}));
app.use(express.json({inflate: true}));
app.use(express.text());

app.use(workRouter);
app.use(userRouter);
