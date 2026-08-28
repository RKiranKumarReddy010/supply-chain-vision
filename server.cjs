require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const path = require('path');

const app = express();
app.use(express.json());

// Strict enterprise-grade Email Regex matching common domain structures
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// API Route for lead capture & consultation brief requests
app.post('/api/send-email', async (req, res) => {
  const { email, name, company, role, challenge, scope } = req.body || {};
  const timestamp = new Date().toISOString();

  console.log(`\n======================================================`);
  console.log(`[${timestamp}] ⚡ INBOUND CONSULTATION REQUEST`);
  console.log(`------------------------------------------------------`);
  console.log(`Client Email  : ${email}`);
  console.log(`Full Name     : ${name || 'N/A'}`);
  console.log(`Company       : ${company || 'N/A'}`);
  console.log(`Role          : ${role || 'N/A'}`);
  console.log(`Focus Area    : ${scope || 'Demand Planning & Forecasting'}`);
  console.log(`Scope Details : ${challenge || 'N/A'}`);
  console.log(`======================================================\n`);

  // 1. Input Validation
  if (!email || typeof email !== 'string') {
    console.warn(`[${timestamp}] Validation rejected: Missing or invalid email.`);
    return res.status(400).json({ error: 'Email address is required.' });
  }

  const trimmedEmail = email.trim().toLowerCase();
  if (trimmedEmail.length > 254 || !EMAIL_REGEX.test(trimmedEmail)) {
    console.warn(`[${timestamp}] Validation rejected: Formatted entry standard mismatch -> "${trimmedEmail}"`);
    return res.status(400).json({ error: 'Please enter a valid business email address.' });
  }

  const clientName = (name || '').trim() || 'Prospective Client';
  const clientCompany = (company || '').trim() || 'Enterprise Account';
  const clientRole = (role || '').trim() || 'Commercial / Supply Chain Lead';
  const clientScope = (scope || '').trim() || 'Demand Planning & Forecasting';
  const clientChallenge = (challenge || '').trim() || 'Direct Consultation Request';

  // 2. Check if live SMTP credentials are configured
  const smtpUser = process.env.SMTP_USER ? process.env.SMTP_USER.trim() : '';
  const smtpPass = process.env.SMTP_PASS ? process.env.SMTP_PASS.trim() : '';

  if (!smtpUser || !smtpPass) {
    console.log(`ℹ️ [SMTP Status] Live SMTP credentials (SMTP_USER / SMTP_PASS) not configured in .env.`);
    console.log(`✅ [Lead Logged] Lead successfully captured and recorded to server log.`);
    return res.status(200).json({
      success: true,
      message: 'Your brief request has been recorded. Our team will follow up within 24 hours.',
    });
  }

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
      max-width: 580px;
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
      font-size: 22px;
      font-weight: 600;
      letter-spacing: -0.02em;
      color: #ffffff;
    }
    .content {
      padding: 36px 40px;
    }
    .lead-text {
      font-size: 14px;
      line-height: 1.6;
      color: #94a3b8;
      margin: 0 0 24px 0;
    }
    .card {
      background-color: #1e293b;
      border: 1px solid #334155;
      border-radius: 8px;
      padding: 20px 24px;
      margin-bottom: 24px;
    }
    .row {
      margin-bottom: 14px;
    }
    .row:last-child {
      margin-bottom: 0;
    }
    .card-label {
      font-size: 10px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      color: #64748b;
      margin-bottom: 4px;
    }
    .card-value {
      font-size: 15px;
      font-weight: 500;
      color: #f8fafc;
      word-break: break-word;
    }
    .action-container {
      text-align: center;
      margin: 28px 0 12px 0;
    }
    .btn {
      display: inline-block;
      background-color: #38bdf8;
      color: #020617 !important;
      text-decoration: none;
      padding: 13px 30px;
      font-size: 13px;
      font-weight: 700;
      border-radius: 6px;
      letter-spacing: 0.05em;
      text-transform: uppercase;
      box-shadow: 0 4px 6px -1px rgba(56, 189, 248, 0.2);
    }
    .footer {
      background-color: #0f172a;
      border-top: 1px solid #1f293d;
      padding: 20px 40px;
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
        <div class="brand">OmniTensors Commercial Engine</div>
        <h1>New Diagnostic Brief Request</h1>
      </div>
      <div class="content">
        <p class="lead-text">
          Hello Team,<br><br>
          An inbound client has requested a <strong>30-minute diagnostic session</strong> via the OmniTensors digital platform.
        </p>

        <div class="card">
          <div class="row">
            <div class="card-label">Client Name</div>
            <div class="card-value">${clientName}</div>
          </div>
          <div class="row">
            <div class="card-label">Work Email</div>
            <div class="card-value">${trimmedEmail}</div>
          </div>
          <div class="row">
            <div class="card-label">Company & Role</div>
            <div class="card-value">${clientCompany} · ${clientRole}</div>
          </div>
          <div class="row">
            <div class="card-label">Primary Focus Area</div>
            <div class="card-value">${clientScope}</div>
          </div>
          <div class="row">
            <div class="card-label">Scope & Bottleneck Notes</div>
            <div class="card-value">${clientChallenge}</div>
          </div>
        </div>

        <div class="action-container">
          <a href="mailto:${trimmedEmail}?subject=OmniTensors%20Consultation%20Brief%20-%20${encodeURIComponent(clientCompany)}" class="btn">Reply to Lead</a>
        </div>
      </div>
      <div class="footer">
        Automated notification dispatched via the OmniTensors System Infrastructure.<br>
        Relay Sender: ${smtpUser}
      </div>
    </div>
  </div>
</body>
</html>`;

  const mailOptions = {
    from: `"OmniTensors Signal" <${smtpUser}>`,
    to: process.env.RECIPIENT_EMAIL || 'kiran.kumar@omnitensors.in',
    replyTo: trimmedEmail,
    subject: `⚡ [Consultation Request] ${clientCompany} - ${clientName} (${trimmedEmail})`,
    text: `OmniTensors Inbound Lead: ${clientName} (${trimmedEmail}) from ${clientCompany} requested a diagnostic session for: ${clientScope}. Notes: ${clientChallenge}`,
    html: htmlTemplate,
  };

  // 4. Send via Nodemailer
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '587', 10),
      secure: process.env.SMTP_PORT === '465',
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
      connectionTimeout: 8000,
      greetingTimeout: 5000,
      socketTimeout: 8000,
      pool: false,
    });

    const info = await transporter.sendMail(mailOptions);
    console.log(`[${timestamp}] 🚀 Dispatch successful! Message-ID: ${info.messageId}`);
    transporter.close();

    return res.status(200).json({
      success: true,
      message: 'Your brief request has been processed and delivered successfully.',
    });
  } catch (error) {
    console.error(`[${timestamp}] SMTP Dispatch Error:`, error.message);
    // Graceful fallback so lead is preserved
    return res.status(200).json({
      success: true,
      message: 'Your request was recorded. Our team will reach out shortly.',
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
  app.use((req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
  });
}

// Ensure listeners don't create blockages inside runtime environments
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, '127.0.0.1', () => {
    console.log(`[Server] Live localized loop: http://127.0.0.1:${PORT}`);
  });
}

module.exports = app;