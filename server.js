const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Add a test endpoint
app.get('/test', (req, res) => {
    console.log('Test endpoint hit');
    res.json({ message: 'Server is working!' });
});

app.post('/submit-form', (req, res) => {
    // Log every request
    console.log('Form submission received at:', new Date().toISOString());
    console.log('Headers:', req.headers);
    console.log('Body:', req.body);

    try {
        const { firstName, lastName, email } = req.body;
        
        if (!firstName || !lastName || !email) {
            console.log('Validation failed:', { firstName, lastName, email });
            return res.json({ error: 'Missing required fields' });
        }

        // Log successful submission
        console.log('Successful submission:', { firstName, lastName, email });
        
        return res.json({
            status: 'success',
            message: 'Form submitted successfully!',
            data: { firstName, lastName, email }
        });
    } catch (error) {
        console.error('Server error:', error);
        return res.json({ error: error.message });
    }
});

const port = process.env.PORT || 10000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
    console.log('Available endpoints:');
    console.log('- GET /test');
    console.log('- POST /submit-form');
});