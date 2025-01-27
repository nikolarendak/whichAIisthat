const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const app = express();

// Security headers
app.use(helmet());

// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// CORS configuration - specify your frontend domain
app.use(cors({
    origin: ['https://gpt5hub.onrender.com/form.html', 'http://localhost:10000'],
    methods: ['POST']
}));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
});

app.post('/submit-form', (req, res) => {
    try {
        const { firstName, lastName, email } = req.body;
        
        // Input validation
        if (!firstName || !lastName || !email) {
            console.error('Validation Error: Missing required fields');
            return res.status(400).json({ error: 'Missing required fields' });
        }

        if (!email.includes('@')) {
            return res.status(400).json({ error: 'Invalid email format' });
        }

        // Log the form data
        console.log('Form submitted:', { firstName, lastName, email });
        
        // Respond with success
        res.status(200).json({
            status: 'success',
            message: 'Form submitted successfully!',
            data: { firstName, lastName, email },
        });
    } catch (error) {
        console.error('Server Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

const port = process.env.PORT || 10000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});