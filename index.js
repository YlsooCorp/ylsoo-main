// ======================================
// Ylsoo Corporation Website
// Built with Node.js + Express + EJS
// ======================================

const express = require('express');
const path = require('path');
const http = require('node:http');
const https = require('node:https');

let fetch = globalThis.fetch ? globalThis.fetch.bind(globalThis) : null;

if (!fetch) {
  fetch = (url, options = {}) =>
    new Promise((resolve, reject) => {
      const requestUrl = typeof url === 'string' ? new URL(url) : url;
      const { method = 'GET', headers = {}, body } = options;
      const normalizedHeaders = { ...headers };
      const requestBody =
        typeof body === 'string' || Buffer.isBuffer(body) ? body : body ? JSON.stringify(body) : undefined;

      if (requestBody && !normalizedHeaders['content-length'] && !normalizedHeaders['Content-Length']) {
        normalizedHeaders['Content-Length'] = Buffer.byteLength(requestBody);
      }

      const protocol = requestUrl.protocol === 'http:' ? http : https;

      const requestOptions = {
        method,
        headers: normalizedHeaders,
        hostname: requestUrl.hostname,
        port:
          requestUrl.port || (requestUrl.protocol === 'http:' ? 80 : 443),
        path: `${requestUrl.pathname}${requestUrl.search}`
      };

      const req = protocol.request(requestOptions, (res) => {
        const chunks = [];
        res.on('data', (chunk) => chunks.push(chunk));
        res.on('end', () => {
          const buffer = Buffer.concat(chunks);
          const responseText = buffer.toString('utf8');

          resolve({
            ok: res.statusCode >= 200 && res.statusCode < 300,
            status: res.statusCode,
            statusText: res.statusMessage,
            headers: res.headers,
            text: async () => responseText,
            json: async () => {
              if (!responseText) {
                return {};
              }
              try {
                return JSON.parse(responseText);
              } catch (error) {
                throw new Error(`Unable to parse JSON response: ${error.message}`);
              }
            }
          });
        });
      });

      req.on('error', reject);

      if (requestBody) {
        req.write(requestBody);
      }

      req.end();
    });
}

const RESEND_API_URL = 'https://api.resend.com/emails';
const resendApiKey = process.env.RESEND_API_KEY;

async function sendEmailThroughResend(payload) {
  if (!resendApiKey) {
    throw new Error('Resend API key is not configured.');
  }

  const response = await fetch(RESEND_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${resendApiKey}`
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    const errorDetails = await response.text();
    throw new Error(`Resend API request failed: ${errorDetails}`);
  }

  return response.json();
}

const fetch = globalThis.fetch ? globalThis.fetch.bind(globalThis) : null;

const RESEND_API_URL = 'https://api.resend.com/emails';
const resendApiKey = process.env.RESEND_API_KEY;

async function sendEmailThroughResend(payload) {
  if (!fetch) {
    throw new Error('Fetch API is not available in this runtime.');
  }
  if (!resendApiKey) {
    throw new Error('Resend API key is not configured.');
  }

  const response = await fetch(RESEND_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${resendApiKey}`
    },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    const errorDetails = await response.text();
    throw new Error(`Resend API request failed: ${errorDetails}`);
  }

  return response.json();
}

const app = express();
const PORT = process.env.PORT || 3000;

// ========================
// MIDDLEWARE
// ========================
app.use(express.static(path.join(__dirname, 'public'))); // Serve static assets (CSS, JS, images)
app.use(express.urlencoded({ extended: true })); // For parsing form data

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// ========================
// ROUTES
// ========================

// Home Page
app.get('/', (req, res) => {
  res.render('index', { title: 'Home - Ylsoo Corporation' });
});

// About Page
app.get('/about', (req, res) => {
  res.render('about', { title: 'About - Ylsoo Corporation' });
});

// Products Page
app.get('/products', (req, res) => {
  res.render('products', { title: 'Products - Ylsoo Corporation' });
});

// Solutions Page
app.get('/solutions', (req, res) => {
  res.render('solutions', { title: 'Solutions - Ylsoo Corporation' });
});

// Services Page
app.get('/services', (req, res) => {
  res.render('services', { title: 'Professional Services - Ylsoo Corporation' });
});

// Managed Services Page
app.get('/managed-services', (req, res) => {
  res.render('managed-services', { title: 'Managed Services - Ylsoo Corporation' });
});

// Training & Certification Page
app.get('/training', (req, res) => {
  res.render('training', { title: 'Training & Certification - Ylsoo Corporation' });
});

// Ylsoo Academy Page
app.get('/academy', (req, res) => {
  res.render('academy', { title: 'Ylsoo Academy - Ylsoo Corporation' });
});

// Customer Success Page
app.get('/customer-success', (req, res) => {
  res.render('customer-success', { title: 'Customer Success - Ylsoo Corporation' });
});

// Industries Page
app.get('/industries', (req, res) => {
  res.render('industries', { title: 'Industries - Ylsoo Corporation' });
});

// Public Sector Page
app.get('/public-sector', (req, res) => {
  res.render('public-sector', { title: 'Public Sector Solutions - Ylsoo Corporation' });
});

// SonaOS Page
app.get('/sonaos', (req, res) => {
  res.render('sonaos', { title: 'SonaOS - Ylsoo Corporation' });
});

// Aivory Page
app.get('/aivory', (req, res) => {
  res.render('aivory', { title: 'Aivory - Ylsoo Corporation' });
});

// Contact Page
app.get('/contact', (req, res) => {
  res.render('contact', {
    title: 'Contact - Ylsoo Corporation',
    message: null,
    error: null,
    formData: {}
  });
});

// Case Studies Page
app.get('/case-studies', (req, res) => {
  res.render('case-studies', { title: 'Case Studies - Ylsoo Corporation' });
});

// Community Impact Page
app.get('/community', (req, res) => {
  res.render('community', { title: 'Community Impact - Ylsoo Corporation' });
});

// Ylsoo Foundation Page
app.get('/foundation', (req, res) => {
  res.render('foundation', { title: 'Ylsoo Foundation - Ylsoo Corporation' });
});

// Global Offices Page
app.get('/global-offices', (req, res) => {
  res.render('global-offices', { title: 'Global Offices - Ylsoo Corporation' });
});

// Research Page
app.get('/research', (req, res) => {
  res.render('research', { title: 'Research & Insights - Ylsoo Corporation' });
});

// Innovation Labs Page
app.get('/innovation-labs', (req, res) => {
  res.render('innovation-labs', { title: 'Innovation Labs - Ylsoo Corporation' });
});

// Leadership Page
app.get('/leadership', (req, res) => {
  res.render('leadership', { title: 'Leadership - Ylsoo Corporation' });
});

// Careers Page
app.get('/careers', (req, res) => {
  res.render('careers', { title: 'Careers - Ylsoo Corporation' });
});

// Compliance Page
app.get('/compliance', (req, res) => {
  res.render('compliance', { title: 'Compliance & Governance - Ylsoo Corporation' });
});

// Corporate Governance Page
app.get('/governance', (req, res) => {
  res.render('governance', { title: 'Corporate Governance - Ylsoo Corporation' });
});

// Ethics & Conduct Page
app.get('/ethics', (req, res) => {
  res.render('ethics', { title: 'Ethics & Conduct - Ylsoo Corporation' });
});

// Developers Page
app.get('/developers', (req, res) => {
  res.render('developers', { title: 'Developers - Ylsoo Corporation' });
});

// Events Page
app.get('/events', (req, res) => {
  res.render('events', { title: 'Events - Ylsoo Corporation' });
});

// Newsroom Page
app.get('/newsroom', (req, res) => {
  res.render('newsroom', { title: 'Newsroom - Ylsoo Corporation' });
});

// Investor Relations Page
app.get('/investors', (req, res) => {
  res.render('investors', { title: 'Investor Relations - Ylsoo Corporation' });
});

// Accessibility Page
app.get('/accessibility', (req, res) => {
  res.render('accessibility', { title: 'Accessibility - Ylsoo Corporation' });
});

// Brand & Media Page
app.get('/brand', (req, res) => {
  res.render('brand', { title: 'Brand & Media - Ylsoo Corporation' });
});

// Partners Page
app.get('/partners', (req, res) => {
  res.render('partners', { title: 'Partners - Ylsoo Corporation' });
});

// Marketplace Page
app.get('/marketplace', (req, res) => {
  res.render('marketplace', { title: 'Marketplace - Ylsoo Corporation' });
});

// Procurement Page
app.get('/procurement', (req, res) => {
  res.render('procurement', { title: 'Supplier & Procurement - Ylsoo Corporation' });
});

// Resource Center Page
app.get('/resources', (req, res) => {
  res.render('resources', { title: 'Resource Center - Ylsoo Corporation' });
});

// Cloud Platform Page
app.get('/cloud-platform', (req, res) => {
  res.render('cloud-platform', { title: 'Cloud Platform - Ylsoo Corporation' });
});

// Global Infrastructure Page
app.get('/infrastructure', (req, res) => {
  res.render('infrastructure', { title: 'Global Infrastructure - Ylsoo Corporation' });
});

// Data & Analytics Page
app.get('/data-analytics', (req, res) => {
  res.render('data-analytics', { title: 'Data & Analytics - Ylsoo Corporation' });
});

// Security Page
app.get('/security', (req, res) => {
  res.render('security', { title: 'Security - Ylsoo Corporation' });
});

// Responsible AI Page
app.get('/responsible-ai', (req, res) => {
  res.render('responsible-ai', { title: 'Responsible AI - Ylsoo Corporation' });
});

// Edge & IoT Page
app.get('/edge-iot', (req, res) => {
  res.render('edge-iot', { title: 'Edge & IoT - Ylsoo Corporation' });
});

// Sustainability Page
app.get('/sustainability', (req, res) => {
  res.render('sustainability', { title: 'Sustainability - Ylsoo Corporation' });
});

// Supply Chain Responsibility Page
app.get('/supply-chain', (req, res) => {
  res.render('supply-chain', { title: 'Supply Chain Responsibility - Ylsoo Corporation' });
});

// Support Page
app.get('/support', (req, res) => {
  res.render('support', { title: 'Support - Ylsoo Corporation' });
});

// Pricing & Licensing Page
app.get('/pricing', (req, res) => {
  res.render('pricing', { title: 'Pricing & Licensing - Ylsoo Corporation' });
// Case Studies Page
app.get('/case-studies', (req, res) => {
  res.render('case-studies', { title: 'Case Studies - Ylsoo Corporation' });
});

// Community Impact Page
app.get('/community', (req, res) => {
  res.render('community', { title: 'Community Impact - Ylsoo Corporation' });
});

// Leadership Page
app.get('/leadership', (req, res) => {
  res.render('leadership', { title: 'Leadership - Ylsoo Corporation' });
});

// Careers Page
app.get('/careers', (req, res) => {
  res.render('careers', { title: 'Careers - Ylsoo Corporation' });
});

// Compliance Page
app.get('/compliance', (req, res) => {
  res.render('compliance', { title: 'Compliance & Governance - Ylsoo Corporation' });
});

// Developers Page
app.get('/developers', (req, res) => {
  res.render('developers', { title: 'Developers - Ylsoo Corporation' });
});

// Events Page
app.get('/events', (req, res) => {
  res.render('events', { title: 'Events - Ylsoo Corporation' });
});

// Newsroom Page
app.get('/newsroom', (req, res) => {
  res.render('newsroom', { title: 'Newsroom - Ylsoo Corporation' });
});

// Investor Relations Page
app.get('/investors', (req, res) => {
  res.render('investors', { title: 'Investor Relations - Ylsoo Corporation' });
});

// Accessibility Page
app.get('/accessibility', (req, res) => {
  res.render('accessibility', { title: 'Accessibility - Ylsoo Corporation' });
});

// Brand & Media Page
app.get('/brand', (req, res) => {
  res.render('brand', { title: 'Brand & Media - Ylsoo Corporation' });
});

// Partners Page
app.get('/partners', (req, res) => {
  res.render('partners', { title: 'Partners - Ylsoo Corporation' });
});

// Procurement Page
app.get('/procurement', (req, res) => {
  res.render('procurement', { title: 'Supplier & Procurement - Ylsoo Corporation' });
});

// Resource Center Page
app.get('/resources', (req, res) => {
  res.render('resources', { title: 'Resource Center - Ylsoo Corporation' });
});

// Security Page
app.get('/security', (req, res) => {
  res.render('security', { title: 'Security - Ylsoo Corporation' });
});

// Sustainability Page
app.get('/sustainability', (req, res) => {
  res.render('sustainability', { title: 'Sustainability - Ylsoo Corporation' });
});

// Support Page
app.get('/support', (req, res) => {
  res.render('support', { title: 'Support - Ylsoo Corporation' });
});

// Contact Form Submission (simple handler)
app.post('/contact', async (req, res) => {
  const { name, email, subject, message } = req.body;

  const trimmedName = name ? name.trim() : '';
  const trimmedEmail = email ? email.trim() : '';
  const trimmedSubject = subject ? subject.trim() : '';
  const trimmedMessage = message ? message.trim() : '';

  const formData = { name: trimmedName, email: trimmedEmail, subject: trimmedSubject, message: trimmedMessage };

  let successMessage = null;
  let errorMessage = null;

  console.log('New contact form submission received:', formData);

  try {
    await sendEmailThroughResend({
      from: 'Ylsoo Concierge <p.mails@ylsoo.com>',
      to: trimmedEmail ? [trimmedEmail] : ['info@ylsoo.com'],
      subject: trimmedSubject ? `We received your message: ${trimmedSubject}` : 'We received your message',
      html: `
        <p>Hi ${trimmedName || 'there'},</p>
        <p>Thank you for contacting Ylsoo Corporation. A member of our team will review your request shortly.</p>
        <p><strong>Summary of your request</strong></p>
        <ul>
          <li><strong>Name:</strong> ${trimmedName || 'Not provided'}</li>
          <li><strong>Email:</strong> ${trimmedEmail || 'Not provided'}</li>
          <li><strong>Subject:</strong> ${trimmedSubject || 'General inquiry'}</li>
        </ul>
        <p><strong>Message:</strong></p>
        <p>${trimmedMessage.replace(/\n/g, '<br />') || 'No additional details were included.'}</p>
        <p>If you need immediate assistance, reply to this email or call us at +1 415 555 0182.</p>
        <p>— The Ylsoo Team</p>
      `,
      text: `Hi ${trimmedName || 'there'},\n\nThank you for contacting Ylsoo Corporation. A member of our team will review your request shortly.\n\nName: ${trimmedName || 'Not provided'}\nEmail: ${trimmedEmail || 'Not provided'}\nSubject: ${trimmedSubject || 'General inquiry'}\n\nMessage:\n${trimmedMessage || 'No additional details were included.'}\n\nIf you need immediate assistance, reply to this email or call us at +1 415 555 0182.\n\n— The Ylsoo Team`,
      reply_to: 'info@ylsoo.com',
      bcc: ['info@ylsoo.com']
    });

    successMessage = 'Thank you for reaching out! We have emailed a confirmation and will get back to you shortly.';
  } catch (error) {
    console.error('Unable to send contact confirmation email:', error.message);
    errorMessage = 'We received your message, but we were unable to send a confirmation email at this time.';
  }

  res.render('contact', {
    title: 'Contact - Ylsoo Corporation',
    message: successMessage,
    error: errorMessage,
    formData: successMessage ? {} : formData
  });
});

// Terms of Service Page
app.get('/terms', (req, res) => {
  res.render('terms', { title: 'Terms of Service - Ylsoo Corporation' });
});

// Privacy Policy Page
app.get('/privacy', (req, res) => {
  res.render('privacy', { title: 'Privacy Policy - Ylsoo Corporation' });
});

// ========================
// 404 PAGE (OPTIONAL)
// ========================
app.use((req, res) => {
  res.status(404).send(`
    <html>
      <head>
        <title>404 - Page Not Found | Ylsoo Corporation</title>
        <style>
          body {
            font-family: "Segoe UI", sans-serif;
            background: #fafafa;
            color: #333;
            text-align: center;
            padding: 10%;
          }
          h1 {
            font-size: 3rem;
            margin-bottom: 1rem;
          }
          a {
            color: #000;
            text-decoration: underline;
          }
        </style>
      </head>
      <body>
        <h1>404 - Page Not Found</h1>
        <p>The page you’re looking for doesn’t exist or has been moved.</p>
        <p><a href="/">Return to Homepage</a></p>
      </body>
    </html>
  `);
});

// ========================
// START SERVER
// ========================
app.listen(PORT, () => {
  console.log(`✅ Ylsoo Corporation website running at http://localhost:${PORT}`);
});
