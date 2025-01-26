const express = require('express');
const path = require('path');
const app = express();

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Form submission endpoint
app.post('/submit-form', (req, res) => {
  const { firstName, lastName, email } = req.body;
  
  // Log submission to console 
  console.log('Form Submission:', {
    firstName,
    lastName,
    email,
    timestamp: new Date().toISOString()
  });

  // Optional: Add validation
  if (!firstName || !lastName || !email) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  // Explicitly send JSON response
  res.status(200).json({ 
    status: 'success', 
    message: 'Form submitted successfully' 
  });
});

// Default route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'form.html'));
});

// Start server
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});