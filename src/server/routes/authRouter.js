const express = require('express');
const passport = require('passport');
const authRouter = express.Router();

const auth = require('../auth/index.js');

authRouter.get('/google', passport.authenticate('google', {
  scope: ['profile']
}));

authRouter.get('/google/cb', passport.authenticate('google'), (req,res)=> {
  console.log('You have reached callback URI');
})

module.exports = authRouter;
