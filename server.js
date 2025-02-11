const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();

// Define CORS options
const corsOptions = {
    origin: ['https://openai.codeonion.net', 'https://whichaiisthat.onrender.com'],
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
    credentials: true,
    optionsSuccessStatus: 200
};

// Enable CORS with options and JSON parsing
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the current directory
app.use(express.static(__dirname));

// Enhanced request logging middleware
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} ${req.method} ${req.url}`);
    console.log('Origin:', req.get('origin'));
    console.log('Headers:', req.headers);
    if (req.body) console.log('Body:', req.body);
    next();
});

// Pre-flight request handling for submit-form
app.options('/submit-form', cors(corsOptions));

// Test endpoint with enhanced error handling
app.get('/test', cors(corsOptions), (req, res) => {
    try {
        console.log('Test endpoint hit from:', req.get('origin'));
        res.json({ message: 'Server is working!' });
    } catch (error) {
        console.error('Test endpoint error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Serve the HTML file for the root route
app.get('/', cors(corsOptions), (req, res) => {
    try {
        res.sendFile(path.join(__dirname, 'form.html'));
    } catch (error) {
        console.error('Error serving HTML:', error);
        res.status(500).send('Error loading page');
    }
});

// Enhanced form submission endpoint
app.post('/submit-form', cors(corsOptions), (req, res) => {
    console.log('Form submission received from:', req.get('origin'));
    console.log('Request body:', req.body);
    
    try {
        const { firstName, lastName, email } = req.body;
        
        // Input validation
        if (!firstName || !lastName || !email) {
            console.log('Validation failed:', { firstName, lastName, email });
            return res.status(400).json({ 
                error: 'Missing required fields',
                received: { firstName, lastName, email }
            });
        }

        // Email format validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                error: 'Invalid email format',
                received: { email }
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
        res.status(500).json({ 
            error: 'Internal server error',
            message: error.message 
        });
    }
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Global error handler:', err);
    res.status(500).json({ 
        error: 'Internal server error',
        message: err.message 
    });
});

const port = process.env.PORT || 10000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
    console.log('CORS enabled for:', corsOptions.origin);
});