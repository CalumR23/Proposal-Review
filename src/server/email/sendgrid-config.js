//First Email Via SendGrid
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

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
  return sgMail.send(emails, cb);
}

module.exports = {
  sendEmails, createEmails
}
