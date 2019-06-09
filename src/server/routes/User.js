const User = require('../models/User.js');
const express = require('express');
const middleware = require('../middleware/loginAuth.js');
const UserRouter = express.Router();

UserRouter.get('/all', middleware.loginAuth, (req,res)=> {
  User.find({}).then((users)=> {
    res.json({
      success: true,
      users
    })
  }).catch((err)=> {
    res.json({
      success: false
    })
  })
})

UserRouter.get('/current', middleware.loginAuth, (req, res)=> {
  let paramsId = req.query.id;
  User.findOne({_id: paramsId}).then((response)=> {
    res.json({
      success: true,
      user: response
    })
  }).catch((err)=> {
    res.status(404).json({
      success: false
    })
  });
});

module.exports = UserRouter;
