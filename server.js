const express = require('express');
const app = express();

// Middleware to parse JSON
app.use(express.json());

// POST endpoint to handle form submission
app.post('/submit-form', (req, res) => {
    const { firstName, lastName, email } = req.body;

    // Validation
    if (!firstName || !lastName || !email) {
        console.error('Validation Error: Missing required fields');
        return res.status(400).json({ error: 'Missing required fields' }); // JSON error response
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

// Bind to the correct port
const port = process.env.PORT || 10000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
