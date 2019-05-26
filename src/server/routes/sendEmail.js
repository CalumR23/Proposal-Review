const express = require('express');
const sendEmailRouter = express.Router();
const sendGrid = require('../email/sendgrid-config.js');
const multer = require('multer');
const upload = multer({dest: '/tmp/uploads'});

sendEmailRouter.post("/", upload.single('file'), (req, res)=> {
  let emailList = req.body.emails.split(',');

  try {
    //Generate Emails
    let emails = sendGrid.createEmails(emailList, 'Please Review this Proposal', req.body.emailBody);
    sendGrid.sendEmails(emails, (done)=> {
      res.status(200).json({
        success: true,
        message: 'Your Email has been sent!'
      });
    })
  } catch(err) {
    res.status(404).json({
      success:false,
      message: 'Your email was not sent. Please try again later.'
    })
  }
});

module.exports = sendEmailRouter;
