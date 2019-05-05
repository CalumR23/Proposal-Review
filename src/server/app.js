const express = require('express');
const errorhandler = require('errorhandler');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const dotenv = require('dotenv');
const os = require('os');

dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('tiny'));
app.use(errorhandler());

app.use(express.static('dist'));
app.get('/api/getUsername', (req, res, next) => {
  res.send({
    username: os.userInfo().username,
  });
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}`);
});
