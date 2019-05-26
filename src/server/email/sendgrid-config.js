//First Email Via SendGrid
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey('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');

function createEmails(recipients = [], subject, message) {
  let cleanedMessage = message + "";
  let cleanedSubject = subject + "";
  let email = [];

  for (let i=0; i<recipients.length; i++) {
    let msg = {
      to: recipients[i],
      from: 'test@example.com',
      subject: cleanedSubject,
      text: cleanedMessage,
      html: `<p>${message}</p>`
    }
    email.push(msg);
  }

  return email;
}

function sendEmails(emails, cb) {
  sgMail.send(emails);
  cb();
}

module.exports = {
  sendEmails, createEmails
}
