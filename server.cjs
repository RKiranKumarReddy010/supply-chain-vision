require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const path = require('path');

async function startServer() {
  const app = express();
  const PORT = process.env.PORT || 8080;

  // Middleware to parse JSON bodies
  app.use(express.json());

  // Configure Nodemailer Transporter
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '465', 10),
    secure: process.env.SMTP_PORT === '465', // true for 465, false for 587
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  // Email Regex for basic input validation
  const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // API Route to handle diagnostic/contact requests
  app.post('/api/send-email', async (req, res) => {
    const { email } = req.body;

    // 1. Input Validation
    if (!email || typeof email !== 'string') {
      return res.status(400).json({ error: 'Email address is required.' });
    }

    const trimmedEmail = email.trim();
    if (trimmedEmail.length > 254 || !EMAIL_REGEX.test(trimmedEmail)) {
      return res.status(400).json({ error: 'Please enter a valid work email address.' });
    }

    // 2. Email Template
    const htmlTemplate = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      background-color: #f6f9fc;
      margin: 0;
      padding: 0;
      -webkit-font-smoothing: antialiased;
    }
    .wrapper {
      width: 100%;
      background-color: #f6f9fc;
      padding: 40px 0;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
      border: 1px solid #e2e8f0;
    }
    .header {
      background-color: #0f172a;
      color: #ffffff;
      padding: 32px 40px;
      text-align: center;
    }
    .header h1 {
      margin: 0;
      font-size: 22px;
      font-weight: 700;
      letter-spacing: -0.02em;
    }
    .header .subtitle {
      margin: 0 0 8px 0;
      font-size: 12px;
      font-weight: 600;
      letter-spacing: 0.15em;
      text-transform: uppercase;
      color: #94a3b8;
    }
    .content {
      padding: 40px;
    }
    .lead-text {
      font-size: 15px;
      line-height: 1.6;
      color: #334155;
      margin: 0 0 24px 0;
    }
    .card {
      background-color: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 6px;
      padding: 24px;
      margin-bottom: 24px;
    }
    .card-label {
      font-size: 11px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: #64748b;
      margin-bottom: 6px;
    }
    .card-value {
      font-size: 18px;
      font-weight: 600;
      color: #0f172a;
      word-break: break-all;
    }
    .button-container {
      text-align: center;
      margin-top: 30px;
      margin-bottom: 10px;
    }
    .btn {
      display: inline-block;
      background-color: #0f172a;
      color: #ffffff !important;
      text-decoration: none;
      padding: 12px 28px;
      font-size: 14px;
      font-weight: 500;
      border-radius: 6px;
      transition: background-color 0.2s;
    }
    .footer {
      background-color: #f8fafc;
      border-top: 1px solid #e2e8f0;
      padding: 20px 40px;
      text-align: center;
      font-size: 11px;
      color: #64748b;
      line-height: 1.5;
    }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="container">
      <div class="header">
        <div class="subtitle">OMNITENSORS</div>
        <h1>New Diagnostic Request</h1>
      </div>
      <div class="content">
        <p class="lead-text">
          Hello HR Team,<br><br>
          A prospective client has requested a <strong>30-minute network diagnostic brief</strong> on the house.
        </p>
        <div class="card">
          <div class="card-label">Client Work Email</div>
          <div class="card-value">${trimmedEmail}</div>
        </div>
        <p class="lead-text" style="font-size: 13px; color: #64748b; margin-top: 16px;">
          To initiate contact, click the button below to compose a direct response.
        </p>
        <div class="button-container">
          <a href="mailto:${trimmedEmail}" class="btn">Reply to Lead</a>
        </div>
      </div>
      <div class="footer">
        This automated notification was dispatched by the OmniTensors System.<br>
        SMTP Relay: ${process.env.SMTP_USER}
      </div>
    </div>
  </div>
</body>
</html>
    `;

    // 3. Define Email Options
    const mailOptions = {
      from: `"OmniTensors Leads" <${process.env.SMTP_USER}>`,
      to: process.env.RECIPIENT_EMAIL || 'hr@omnitensors.in',
      replyTo: trimmedEmail,
      subject: `New Optimization Diagnostic Request - ${trimmedEmail}`,
      text: `A new client has requested a 30-minute network diagnostic brief. Contact Email: ${trimmedEmail}`,
      html: htmlTemplate,
    };

    // 4. Send Email
    try {
      const info = await transporter.sendMail(mailOptions);
      console.log('Email sent successfully. Message ID:', info.messageId);
      return res.status(200).json({ success: true, message: 'Request submitted successfully!' });
    } catch (error) {
      console.error('SMTP sending error:', error.message);
      return res.status(500).json({ error: 'Unable to send request. Please try again later.' });
    }
  });

  // Check running mode
  const isProd = process.env.NODE_ENV === 'production' || process.argv.includes('--prod');

  if (!isProd) {
    console.log('[Server] Starting in DEVELOPMENT mode with Vite Middleware...');
    const { createServer: createViteServer } = require('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    // Use vite's connect instance as middleware
    app.use(vite.middlewares);
  } else {
    console.log('[Server] Starting in PRODUCTION mode...');
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(distPath));
    app.use('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '127.0.0.1', () => {
    console.log(`[Server] Running on http://127.0.0.1:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start unified server:', err);
});
