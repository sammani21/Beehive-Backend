const nodemailer = require('nodemailer');

const sendEmail = async (to, subject, text, html = null) => {
  try {
    // Configure the transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: "rajasooriyakavindhya@gmail.com",
        pass: "hvom zpcn ywku mljl",
      }
    });

    // Configure the email options
    const mailOptions = {
      from: 'rajasooriyakavindhya@gmail.com',
      to: to,
      subject: subject,
      text: text
    };

    // Add HTML content if provided
    if (html) {
      mailOptions.html = html;
    }

    // Send the email
    const result = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', result.messageId);
    return { success: true, messageId: result.messageId };
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error(`Failed to send email: ${error.message}`);
  }
};

module.exports = sendEmail;