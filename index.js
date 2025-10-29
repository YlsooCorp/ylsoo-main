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
