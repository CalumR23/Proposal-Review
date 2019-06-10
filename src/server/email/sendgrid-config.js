//First Email Via SendGrid
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

//Message: Please Review these Emails
function createAdminEmails(reviewers, applicant) {
  let emails = [];

  //Parse Through Reviewers to create Emails
  for (let i=0; i<reviewers.length; i++) {
    let reviewer = reviewers[i];
    let msg = {
      to: reviewer.email,
      from: 'test@example.com',
      templateId: process.env.SENDGRID_TEMPLATE_ADMIN,
      dynamic_template_data: {
        "reviewer_name": reviewer.name,
        "applicant": applicant,
      }
    }
    emails.push(msg);
  }

  return emails;
}

//Message: Will You be Willing to Review?
function createProposalEmails(reviewers, applicant, attachment) {
  let emails = [];

  //Parse through Reviewers to create Emails
  for (let i=0; i<reviewers.length; i++) {
    let reviewer = reviewers[i];
    let msg = {
      to: reviewer.email,
      from: 'test@example.com',
      templateId: process.env.SENDGRID_TEMPLATE_PROPOSAL,
      dynamic_template_data: {
        "reviewer_name": reviewer.name,
        "applicant": applicant,
      },
      attachments: [attachment]
    }
    emails.push(msg);
  }

  return emails;
}

function sendEmails(emails, cb) {
  return sgMail.send(emails).then(cb).catch((err)=> {
    console.log(err); //Full Error
    console.log(err.response.body.errors); //Specify What Errors
  });
}

module.exports = {
  sendEmails,
  createAdminEmails,
  createProposalEmails
}
