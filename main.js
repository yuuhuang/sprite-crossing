const express = require('express')
const cors = require('cors');
const morgan = require('morgan');

const app = express()


app.use(cors());
app.use(morgan('dev'));

app.use('/home', express.static(__dirname + '/ui/dist'));

app.listen(3001, () => {
  console.log(`listening at http://localhost:3001/home`);
});