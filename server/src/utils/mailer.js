const nodemailer = require('nodemailer');

async function maybeSendEmail({ name, email, subject, body }) {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, EMAIL_TO } = process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS || !EMAIL_TO) return { sent: false };

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT || 587),
    secure: false,
    auth: { user: SMTP_USER, pass: SMTP_PASS }
  });

  const info = await transporter.sendMail({
    from: `"Portfolio" <${SMTP_USER}>`,
    to: EMAIL_TO,
    subject: subject ? `[URGENT - Portfolio] ${subject}` : '[Portfolio] New message',
    replyTo: email,
    text: `From: ${name} <${email}>\n\n${body}`
  });

  return { sent: true, id: info.messageId };
}

module.exports = { maybeSendEmail };
