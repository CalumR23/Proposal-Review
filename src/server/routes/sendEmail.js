const express = require('express');
const sendEmailRouter = express.Router();
const sendGrid = require('../email/sendgrid-config.js');
const multer = require('multer');
const upload = multer({dest: '/tmp/uploads'});

sendEmailRouter.post("/", upload.single('file'), (req, res)=> {
  let emailList = req.body.emails.split(',');
  console.log(emailList)
  console.log(req.body);
  console.log(req.file);

  //Generate Emails
  let emails = sendGrid.createEmails(emailList, 'Please Review this Proposal', req.body.emailBody);
  sendGrid.sendEmails(emails, (done)=> {
    res.status(200).json({
      success: true,
      message: 'Your Email has been sent!'
    });
  }).catch((err)=> {
    console.log(err);
  });
});

module.exports = sendEmailRouter;
