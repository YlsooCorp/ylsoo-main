// ======================================
// Ylsoo Corporation Website
// Built with Node.js + Express + EJS
// ======================================

const express = require('express');
const path = require('path');

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

// Industries Page
app.get('/industries', (req, res) => {
  res.render('industries', { title: 'Industries - Ylsoo Corporation' });
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
  res.render('contact', { title: 'Contact - Ylsoo Corporation' });
});

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
app.post('/contact', (req, res) => {
  console.log('New contact form submission:');
  console.log(req.body);

  // In production, you could send an email or store this in a database here.
  res.render('contact', {
    title: 'Contact - Ylsoo Corporation',
    message: 'Thank you for reaching out! We will get back to you shortly.'
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
