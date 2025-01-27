const express = require('express');
const cors = require('cors');
const app = express();

// Enable CORS and JSON parsing
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Test endpoint
app.get('/test', (req, res) => {
    console.log('Test endpoint hit');
    res.json({ message: 'Server is working!' });
});

// Form submission endpoint
app.post('/submit-form', (req, res) => {
    console.log('Received form submission:', req.body);
    
    try {
        const { firstName, lastName, email } = req.body;
        
        // Validate required fields
        if (!firstName || !lastName || !email) {
            console.log('Missing required fields');
            return res.status(400).json({ 
                error: 'Missing required fields',
                received: { firstName, lastName, email }
            });
        }

        // Log successful submission
        console.log('Successful submission:', { firstName, lastName, email });
        
        // Send success response
        res.status(200).json({
            status: 'success',
            message: 'Form submitted successfully!',
            data: { firstName, lastName, email }
        });

    } catch (error) {
        console.error('Server error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Start server
const port = process.env.PORT || 10000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
    console.log('Available endpoints:');
    console.log('- GET /test');
    console.log('- POST /submit-form');
});