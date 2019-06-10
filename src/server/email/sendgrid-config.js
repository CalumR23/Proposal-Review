//First Email Via SendGrid
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

//Please Review
function createAdminEmails(recipients = [], reviewerName, applicantName) {
  let emails = [];

  for (let i=0; i<recipients.length; i++) {
    let msg = {
      to: recipients[i],
      from: 'test@example.com',
      templateId: process.env.SENDGRID_TEMPLATE_ADMIN,
      dynamic_template_data: {
        "reviewer_name": reviewerName,
        "applicant": applicantName,
      }
    }
    emails.push(msg);
  }

  return emails;
}

//Will You be Willing to Review?
function createProposalEmails(cleanedPeopleList, applicantName, attachment) {
  let emails = [];

  for (let i=0; i<cleanedPeopleList.length; i++) {
    let msg = {
      to: cleanedPeopleList[i].email,
      from: 'test@example.com',
      templateId: process.env.SENDGRID_TEMPLATE_PROPOSAL,
      dynamic_template_data: {
        "reviewer_name": cleanedPeopleList[i].name,
        "applicant": applicantName,
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
