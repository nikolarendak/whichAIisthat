const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Form submission endpoint
app.post('/submit-form', (req, res) => {
  console.log('Request body:', req.body); // Debug log
  
  const { firstName, lastName, email } = req.body;

  // Check for missing fields
  if (!firstName || !lastName || !email) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  console.log('Form Submission:', {
    firstName,
    lastName,
    email,
    timestamp: new Date().toISOString(),
  });

  res.status(200).json({ 
    status: 'success', 
    message: 'Form submitted successfully',
    data: { firstName, lastName, email }
  });
});

// Serve the form HTML
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'form.html'));
});

// Handle invalid routes
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Start the server
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
