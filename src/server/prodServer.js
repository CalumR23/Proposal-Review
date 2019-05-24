const express = require('express');
const errorhandler = require('errorhandler');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const dotenv = require('dotenv');
const os = require('os');
const path = require('path');

dotenv.config();

const app = express();

//Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('tiny'));
app.use(errorhandler());

//Serve Statics
app.use(express.static('dist'));
app.use(express.static('public'));

//Serve Index on Client Call for History Redirect
app.get("*", (req,res)=> {
  res.sendFile(path.join(__dirname, '..', '..', 'dist', 'index.html'));
});


const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}`);
});
