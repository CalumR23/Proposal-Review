const express = require('express');
const sendEmailRouter = express.Router();
const sendGrid = require('../email/sendgrid-config.js');
const multer = require('multer');
const upload = multer({dest: '/tmp/uploads'});
const fs = require('fs');

sendEmailRouter.post("/", upload.single('file'), (req, res)=> {

  let peopleList = req.body.emails.split(','); //People List

  //Clean peopleList into parsable objects
  let cleanedPeopleList = [];
  for (let i=0; i<peopleList.length; i++) {
    let person = peopleList[i].split(";");
    let personObj = {
      name: person[1],
      email: person[0]
    };
    console.log(personObj);
    cleanedPeopleList.push(personObj);
  }

  //Create Email Attachment
  let attachment = {
    content: fs.readFileSync(req.file.path).toString('base64'), //convert to base64
    filename: req.file.originalname,
    type: req.file.mimetype,
    disposition: 'attachment',
    contentId: 'proposal_' + req.file.filename
  };
  //
  let applicantName = req.body.name;

  //Create Emails
  let emails = sendGrid.createProposalEmails(cleanedPeopleList, applicantName, attachment);
  sendGrid.sendEmails(emails, ()=> {
    console.log('Emails sent successfully ' + Date.now());
  });

});

module.exports = sendEmailRouter;
