const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/submit-form', (req, res) => {
    // Log incoming request
    console.log('Request received:', {
        headers: req.headers,
        body: req.body
    });

    try {
        const { firstName, lastName, email } = req.body;
        
        // Log parsed data
        console.log('Parsed data:', { firstName, lastName, email });

        if (!firstName || !lastName || !email) {
            console.log('Validation failed');
            return res.status(400).json({ error: 'Missing required fields' });
        }

        // Log success
        console.log('Sending success response');
        return res.status(200).json({
            status: 'success',
            message: 'Form submitted successfully!',
            data: { firstName, lastName, email }
        });
    } catch (error) {
        // Log error
        console.error('Server error:', error);
        return res.status(500).json({ error: 'Server error' });
    }
});

const port = process.env.PORT || 10000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});