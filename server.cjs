require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const path = require('path');

async function startServer() {
  const app = express();
  const PORT = process.env.PORT || 8080;

  app.use(express.json());

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

    // 2. Re-create transporter INSIDE the request handler for Serverless state isolation
    // Optimized strictly for Port 587 / Vercel Serverless environment
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: 587, 
      secure: false, // CRITICAL: Must be false for port 587. It forces STARTTLS upgrade.
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      connectionTimeout: 10000, // 10 seconds timeout max
      greetingTimeout: 5000,
      socketTimeout: 15000,
      dnsTimeout: 5000,
      debug: false, // Turn to true if checking Vercel function logs
      logger: false
    });

    const htmlTemplate = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: sans-serif; background-color: #f6f9fc; margin: 0; padding: 0; }
    .wrapper { width: 100%; background-color: #f6f9fc; padding: 40px 0; }
    .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; border: 1px solid #e2e8f0; }
    .header { background-color: #0f172a; color: #ffffff; padding: 32px 40px; text-align: center; }
    .content { padding: 40px; }
    .card { background-color: #f8fafc; border: 1px solid #e2e8f0; padding: 24px; }
    .button-container { text-align: center; margin-top: 30px; }
    .btn { display: inline-block; background-color: #0f172a; color: #ffffff !important; text-decoration: none; padding: 12px 28px; border-radius: 6px; }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="container">
      <div class="header"><h1>New Diagnostic Request</h1></div>
      <div class="content">
        <p>Hello HR Team,<br><br>A prospective client has requested a network diagnostic brief.</p>
        <div class="card"><strong>Client Work Email:</strong> ${trimmedEmail}</div>
        <div class="button-container"><a href="mailto:${trimmedEmail}" class="btn">Reply to Lead</a></div>
      </div>
    </div>
  </div>
</body>
</html>`;

    const mailOptions = {
      from: `"OmniTensors Leads" <${process.env.SMTP_USER}>`,
      to: process.env.RECIPIENT_EMAIL || 'hr@omnitensors.in',
      replyTo: trimmedEmail,
      subject: `New Optimization Diagnostic Request - ${trimmedEmail}`,
      text: `A new client has requested a 30-minute network diagnostic brief. Contact Email: ${trimmedEmail}`,
      html: htmlTemplate,
    };

    // 3. Send Email and close connection immediately
    try {
      const info = await transporter.sendMail(mailOptions);
      console.log('Email sent:', info.messageId);
      
      // Forcefully destroy connection pool so serverless function can terminate instantly
      transporter.close(); 
      
      return res.status(200).json({ success: true, message: 'Request submitted successfully!' });
    } catch (error) {
      console.error('SMTP sending error:', error.message);
      transporter.close();
      return res.status(500).json({ error: `SMTP Failure: ${error.message}` });
    }
  });

  const isProd = process.env.NODE_ENV === 'production' || process.argv.includes('--prod');
  if (!isProd) {
    const { createServer: createViteServer } = require('vite');
    const vite = await createViteServer({ server: { middlewareMode: true }, appType: 'spa' });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(distPath));
    app.use('*', (req, res) => { res.sendFile(path.join(distPath, 'index.html')); });
  }

  app.listen(PORT, '127.0.0.1', () => {
    console.log(`[Server] Running on http://127.0.0.1:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start unified server:', err);
});
