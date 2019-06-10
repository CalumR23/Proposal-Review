const express = require('express');
const sendEmailRouter = express.Router();
const sendGrid = require('../email/sendgrid-config.js');
const multer = require('multer');
const upload = multer({dest: '/tmp/uploads'});
const fs = require('fs');

sendEmailRouter.post("/proposer", upload.single('file'), (req, res)=> {

  if (!req.file) {
    return res.status(404).json({
      success: false,
      status: "NO_FILE"
    });
  }

  let peopleList = req.body.emails.split(','); //People List

  //Clean peopleList into parsable objects for
  let reviewers = [];
  for (let i=0; i<peopleList.length; i++) {
    let reviewer = peopleList[i].split(";");
    let personObj = {
      name: reviewer[1],
      email: reviewer[0]
    };
    reviewers.push(personObj);
  }

  //Create Email Attachment
  let attachment = {
    content: fs.readFileSync(req.file.path).toString('base64'), //convert to base64
    filename: req.file.originalname,
    type: req.file.mimetype,
    disposition: 'attachment',
    contentId: 'proposal_' + req.file.filename
  };

  //Set Applicant Name
  let applicantName = req.body.name;

  //Create Emails from cleanedPeopleList, applicant, and new attachment
  let emails = sendGrid.createProposalEmails(reviewers, applicantName, attachment);

  //Send Emails
  sendGrid.sendEmails(emails, ()=> {
    console.log('Emails sent successfully ' + Date.now());
    res.status(200).send({success: true});
  });

});

sendEmailRouter.post('/admin', (req,res)=> {
  let peopleList = req.body.reviewers;
  let applicant = req.body.applicant;

  //Create Emails
  let emails = sendGrid.createAdminEmails(peopleList, applicant);

  //Send Emails
  sendGrid.sendEmails(emails, ()=> {
    res.status(200).send({
      success: true
    })
  })
})

module.exports = sendEmailRouter;
