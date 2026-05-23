const express = require('express');
const nodemailer = require('nodemailer');

const router = express.Router();

router.post('/contact', async (req, res, next) => {
  try {
    const { name, email, subject, message } = req.body;

    // Check if email credentials are provided
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.error('Email credentials not configured in .env');
      return res.status(500).json({ message: 'Server email configuration is missing.' });
    }

    // Configure the transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail', // You can change this if using another provider
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Setup email data
    const mailOptions = {
      from: `"${name}" <${process.env.EMAIL_USER}>`, // Send from the authenticated user to avoid spam filters
      replyTo: email,
      to: process.env.EMAIL_USER, // Send to yourself
      subject: `Portfolio Contact: ${subject || 'No Subject'}`,
      text: `You have received a new message from your portfolio contact form.\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    res.status(200).json({
      message: 'Message sent successfully!',
    });
  } catch (error) {
    console.error('Nodemailer error:', error);
    res.status(500).json({ message: 'Failed to send message. Please try again later.' });
  }
});

module.exports = router;