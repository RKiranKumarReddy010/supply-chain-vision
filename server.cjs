require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const path = require('path');

const app = express();
app.use(express.json());

// Strict enterprise-grade Email Regex matching common domain structures
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// API Route optimized for high reliability under serverless architectures
app.post('/api/send-email', async (req, res) => {
  const { email } = req.body;
  const timestamp = new Date().toISOString();

  console.log(`[${timestamp}] Inbound diagnostic request received.`);

  // 1. Input Validation
  if (!email || typeof email !== 'string') {
    console.warn(`[${timestamp}] Validation rejected: Missing or invalid body type.`);
    return res.status(400).json({ error: 'Email address is required.' });
  }

  const trimmedEmail = email.trim().toLowerCase();
  if (trimmedEmail.length > 254 || !EMAIL_REGEX.test(trimmedEmail)) {
    console.warn(`[${timestamp}] Validation rejected: Formatted entry standard mismatch -> "${trimmedEmail}"`);
    return res.status(400).json({ error: 'Please enter a valid business email address.' });
  }

  // 2. Transporter Isolation Configured For Port 587 / TLS Start
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: 587,
    secure: false, // Must remain false on 587 to properly issue STARTTLS
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
    // Serverless-specific optimizations to keep handshakes tight and lean
    connectionTimeout: 8000, 
    greetingTimeout: 5000,
    socketTimeout: 8000,
    dnsTimeout: 4000,
    pool: false // Avoid pooling over cold-starting micro-containers
  });

  // 3. Premium High-Conversion HTML Template (Modern Dark & Minimalist Theme)
  const htmlTemplate = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>OmniTensors Diagnostic Request</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      background-color: #0b0f19;
      margin: 0;
      padding: 0;
      -webkit-font-smoothing: antialiased;
    }
    .wrapper {
      width: 100%;
      background-color: #0b0f19;
      padding: 40px 0;
    }
    .container {
      max-width: 560px;
      margin: 0 auto;
      background-color: #121827;
      border-radius: 12px;
      overflow: hidden;
      border: 1px solid #1f293d;
      box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.2);
    }
    .header {
      background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
      padding: 35px 40px;
      text-align: left;
      border-bottom: 1px solid #1f293d;
    }
    .brand {
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 0.2em;
      color: #38bdf8;
      text-transform: uppercase;
      margin-bottom: 6px;
    }
    .header h1 {
      margin: 0;
      font-size: 24px;
      font-weight: 600;
      letter-spacing: -0.02em;
      color: #ffffff;
    }
    .content {
      padding: 40px;
    }
    .lead-text {
      font-size: 15px;
      line-height: 1.6;
      color: #94a3b8;
      margin: 0 0 28px 0;
    }
    .card {
      background-color: #1e293b;
      border: 1px solid #334155;
      border-radius: 8px;
      padding: 20px 24px;
      margin-bottom: 28px;
    }
    .card-label {
      font-size: 10px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      color: #64748b;
      margin-bottom: 6px;
    }
    .card-value {
      font-size: 16px;
      font-weight: 500;
      color: #f8fafc;
      word-break: break-all;
    }
    .action-container {
      text-align: center;
      margin: 32px 0 12px 0;
    }
    .btn {
      display: inline-block;
      background-color: #38bdf8;
      color: #020617 !important;
      text-decoration: none;
      padding: 14px 32px;
      font-size: 14px;
      font-weight: 600;
      border-radius: 6px;
      box-shadow: 0 4px 6px -1px rgba(56, 189, 248, 0.2);
    }
    .footer {
      background-color: #0f172a;
      border-top: 1px solid #1f293d;
      padding: 24px 40px;
      text-align: center;
      font-size: 11px;
      color: #475569;
      line-height: 1.5;
    }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="container">
      <div class="header">
        <div class="brand">OmniTensors Engine</div>
        <h1>New Optimization Request</h1>
      </div>
      <div class="content">
        <p class="lead-text">
          Hello Team,<br><br>
          An inbound prospective client has requested an exclusive <strong>30-minute network diagnostic brief</strong> via the digital consultation terminal.
        </p>
        <div class="card">
          <div class="card-label">Client Routing & Work Email</div>
          <div class="card-value">${trimmedEmail}</div>
        </div>
        <p class="lead-text" style="font-size: 13px; color: #475569; margin-bottom: 0;">
          Select the interface link below to directly launch your communication client and follow up with this inbound account record.
        </p>
        <div class="action-container">
          <a href="mailto:${trimmedEmail}" class="btn">Initiate Connection</a>
        </div>
      </div>
      <div class="footer">
        Automated message dispatched via the OmniTensors System Infrastructure.<br>
        Origin Relay Node: ${process.env.SMTP_USER}
      </div>
    </div>
  </div>
</body>
</html>`;

  const mailOptions = {
    from: `"OmniTensors Signal" <${process.env.SMTP_USER}>`,
    to: process.env.RECIPIENT_EMAIL || 'hr@omnitensors.in',
    replyTo: trimmedEmail,
    subject: `⚡ [Diagnostic Brief Request] Inbound Lead - ${trimmedEmail}`,
    text: `OmniTensors Notification: A new lead has scheduled a network diagnostic session. Review details via client contact point: ${trimmedEmail}`,
    html: htmlTemplate,
  };

  // 4. Secure Transporter Execution Execution Window
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(`[${timestamp}] Dispatch successful! Message-ID: ${info.messageId}`);
    
    // Explicit teardown prevents execution hanging on serverless threads
    transporter.close();
    return res.status(200).json({ 
      success: true, 
      message: 'Your brief request has been processed successfully.' 
    });
  } catch (error) {
    console.error(`[${timestamp}] Critical Core SMTP Exception:`, error.message);
    transporter.close();
    return res.status(500).json({ 
      error: 'The internal gateway timed out handling your request. Please try again shortly.' 
    });
  }
});

// Production asset static serving logic
const isProd = process.env.NODE_ENV === 'production' || process.argv.includes('--prod');
if (!isProd) {
  console.log('[Server] Starting in DEVELOPMENT mode with Vite Middleware...');
  const { createServer: createViteServer } = require('vite');
  createViteServer({
    server: { middlewareMode: true },
    appType: 'spa',
  }).then((vite) => {
    app.use(vite.middlewares);
  });
} else {
  console.log('[Server] Running in production static fallback mode...');
  const distPath = path.join(__dirname, 'dist');
  app.use(express.static(distPath));
  app.use('*', (req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
  });
}

// Ensure listeners don't create blockages inside runtime environments
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 8080;
  app.listen(PORT, '127.0.0.1', () => {
    console.log(`[Server] Live localized loop: http://127.0.0.1:${PORT}`);
  });
}

module.exports = app;