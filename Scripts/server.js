const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const path = require('path');

// Configure dotenv to look for .env in the project root
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files
// Serve project root so index.html at '/'
app.use(express.static(path.join(__dirname, '..')));
// Also expose 'templates' explicitly for direct links
app.use('/templates', express.static(path.join(__dirname, '../templates')));
// Serve 'Scripts' folder (for script.js)
app.use('/Scripts', express.static(path.join(__dirname, '../Scripts')));
// Serve 'Images' folder
app.use('/Images', express.static(path.join(__dirname, '../Images')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'index.html'));
});

// Nodemailer Transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Route to handle email sending
app.post('/send-email', (req, res) => {
    const { name, email, message } = req.body;

    const mailOptions = {
        from: email, // Sender address (will be your authenticated email, but we can set 'from' to show user's email or put it in the body)
        // Note: Gmail rewrite the "From" header to the authenticated user.
        to: process.env.EMAIL_USER, // Your email
        subject: `Portfolio Contact Form: Message from ${name}`,
        text: `You have received a new message from your portfolio contact form.\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
        replyTo: email
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            let errorMessage = 'Failed to send email';
            if (error.code === 'EAUTH') {
                errorMessage = 'Authentication failed. Please check your email and password in .env file.';
            }
            return res.status(500).json({ success: false, message: errorMessage });
        }
        console.log('Email sent:', info.response);
        res.status(200).json({ success: true, message: 'Email sent successfully' });
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
