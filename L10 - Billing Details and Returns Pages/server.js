// =====================================================
// IST 256 - Project L10 Web Storefront (Backend Server)
// Group Members:
// - Isaiah Ukih – HTML Structure & Integration
// - Logan VonGuden – CSS Styling & Visual Design
// - Alexander Tysak – JavaScript Logic, JSON Handling, AJAX
// - Daniel Weeks – Bootstrap Layout, AngularJS, jQuery Behaviors
// =====================================================

const express = require('express');
const cors = require('cors');
const app = express();

// Middleware setup
app.use(cors());
app.use(express.json());

// Route for Billing Details
app.post('/api/billing', (req, res) => {
  console.log("Billing details received:", req.body);
  res.json({ message: "Billing data processed successfully!" });
});

// Route for Returns
app.post('/api/returns', (req, res) => {
  console.log("Return request received:", req.body);
  res.json({ message: "Return request processed successfully!" });
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));
