const express = require('express')
// const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');

const app = express();


// Connect to MongoDB

// eslint-disable-next-line max-len
const dbUrl = 'mongodb+srv://yuuhuang:x4tDcuvCQ2rNSmK@sprite-crossing.8roz9.mongodb.net/sprite-crossing?retryWrites=true&w=majority';
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

app.use(morgan('dev'));
// app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use('/home', express.static(__dirname + '/ui/dist'));
