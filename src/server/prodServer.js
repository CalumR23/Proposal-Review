const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const errorhandler = require('errorhandler');
const path = require('path');
const dotenv = require('dotenv');
const passport = require('passport');
const cookieSession = require('cookie-session');
const cors = require('cors');
const multer = require('multer');

//Set up ENV config
dotenv.config();

// Instantiate express
const app = express();
app.use(morgan('tiny'));
app.use(errorhandler());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Set up CORS
let corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

//Serve Statics
app.use(express.static('dist'));
app.use(express.static('public'));

//Set Up Cookie session
app.use(cookieSession({
  maxAge: 24 * 60 * 60 * 1000,
  keys: [process.env.cookieKey],
  httpOnly: false
}));

//Initialize passport
app.use(passport.initialize());
app.use(passport.session());

//Connect MongoDB
const mongoose = require('mongoose');
mongoose.connect(
  `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PW}@ds261486.mlab.com:61486/heroku_04fps406`,
  {useNewUrlParser: true}
);
const db = mongoose.connection;
db.on('error', ()=> {
  console.error.bind(console, 'connection error:');
})
db.once('open', ()=> {
  console.log('Connected to MongoDB');
})

//Import & Mount Routes
const authRouter = require('./routes/authRouter.js');
const loginRouter = require('./routes/Login.js');
const userRouter = require('./routes/User.js');
const sendEmailRouter = require('./routes/sendEmail.js');

app.use('/auth', authRouter);
app.use('/login', loginRouter);
app.use('/user', userRouter);
app.use('/sendEmail', sendEmailRouter);

//Serve Index on Client Call for History Redirect
app.get("*", (req,res)=> {
  res.sendFile(path.join(__dirname, '..', '..', 'dist', 'index.html'));
});


const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}`);
});
