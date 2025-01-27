const express = require('express');
const app = express();

// Middleware to parse incoming JSON data
app.use(express.json());

// Health check endpoint (optional)
app.get('/', (req, res) => {
    res.send('Server is running. Welcome to GPT-5 Hub!');
});

// POST endpoint to handle form submission
app.post('/submit-form', (req, res) => {
  const { firstName, lastName, email } = req.body;

  // Validation
  if (!firstName || !lastName || !email) {
      console.error('Validation Error: Missing required fields');
      return res.status(400).json({ error: 'Missing required fields' }); // Always return JSON
  }

  // Log the form data
  console.log('Form submitted:', { firstName, lastName, email });

  // Respond with success
  res.status(200).json({
      status: 'success',
      message: 'Form submitted successfully!',
      data: { firstName, lastName, email },
  });
});

// Fallback for undefined routes (optional)
app.use((req, res) => {
    res.status(404).send('404: Not Found');
});

// Bind to the correct port
const port = process.env.PORT || 10000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
