const express = require('express');
const cors = require('cors');
const app = express();

// Enable CORS and JSON parsing
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Add request logging middleware
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} ${req.method} ${req.url}`);
    console.log('Headers:', req.headers);
    if (req.body) console.log('Body:', req.body);
    next();
});

// Test endpoint
app.get('/test', (req, res) => {
    console.log('Test endpoint hit');
    res.json({ message: 'Server is working!' });
});

// Form submission endpoint
app.post('/submit-form', (req, res) => {
    console.log('Form submission received');
    console.log('Request body:', req.body);
    
    try {
        const { firstName, lastName, email } = req.body;
        
        // Validate required fields
        if (!firstName || !lastName || !email) {
            console.log('Validation failed:', { firstName, lastName, email });
            return res.status(400).json({ 
                error: 'Missing required fields',
                received: { firstName, lastName, email }
            });
        }

        const response = {
            status: 'success',
            message: 'Form submitted successfully!',
            data: { firstName, lastName, email }
        };

        console.log('Sending response:', response);
        res.status(200).json(response);

    } catch (error) {
        console.error('Server error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

const port = process.env.PORT || 10000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});