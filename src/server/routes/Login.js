const express = require('express');

const LoginRouter = express.Router();

LoginRouter.get('/success', (req, res)=> {
  if (req.user) {
    res.json({
      success: true,
      user: req.user
    })
  } else {
    res.json({
      success: false
    })
  }
})

module.exports = LoginRouter;
