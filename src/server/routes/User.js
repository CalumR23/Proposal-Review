const User = require('../models/User.js');
const express = require('express');

const UserRouter = express.Router();

UserRouter.get('/all', (req,res)=> {
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

UserRouter.get('/current', (req, res)=> {
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
