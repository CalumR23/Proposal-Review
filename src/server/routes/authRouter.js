const express = require('express');
const passport = require('passport');
const authRouter = express.Router();

const auth = require('../auth/OAuth.js');

authRouter.get('/google', passport.authenticate('google', {
  scope: ['profile', 'email']
}));

authRouter.get('/google/cb', passport.authenticate('google'), (req, res)=> {
  res.redirect('/home');
})

module.exports = authRouter;
