// Import necessary modules
const express = require('express');
const bodyParser = require('body-parser');
const AWS = require('aws-sdk'); 

// Configure AWS using environment variables
AWS.config.update({
    region: 'us-west-2' // Update to your AWS region
    // AWS credentials are now set through environment variables
});

// Debugging to verify if credentials are being picked up
console.log("AWS Access Key:", process.env.AWS_ACCESS_KEY_ID ? "Found" : "Not Found");
console.log("AWS Secret Access Key:", process.env.AWS_SECRET_ACCESS_KEY ? "Found" : "Not Found");

// Initialize DynamoDB Document Client
const dynamoDB = new AWS.DynamoDB.DocumentClient();

const app = express();
app.use(bodyParser.json());

// Middleware to clean up incoming request URLs
app.use((req, res, next) => {
    req.url = req.url.trim(); // Remove any leading/trailing whitespace
    next();
});

// Root Route
app.get('/', (req, res) => {
    console.log("GET / request received");
    res.send('Welcome to the Affiliate Tracker API');
});

// Login Endpoint (GET for testing purposes)
app.get('/login', (req, res) => {
    res.send('This is the login page. Please use POST to submit credentials.');
});

// Login Endpoint (POST)
app.post('/login', (req, res) => {
    console.log("POST /login request received");
    const { username, password } = req.body;

    if (!username || !password) {
        console.error("Error: Missing username or password in request body");
        return res.status(400).send('Username and password are required');
    }

    const params = {
        TableName: 'Affiliates',
        Key: {
            'username': username
        }
    };

    console.log("Attempting to get user with username:", username);

    dynamoDB.get(params, (err, data) => {
        if (err) {
            console.error("Error fetching login data from DynamoDB:", err);
            if (err.code === 'ValidationException') {
                res.status(400).send('Validation error: The provided key element does not match the schema. Please check the key attributes.');
            } else {
                res.status(500).send('Server error while fetching login data');
            }
        } else if (data.Item) {
            if (data.Item.password === password) {
                console.log("Login successful for user:", username);
                res.json({ success: true, affiliateId: data.Item.affiliateId });
            } else {
                console.warn("Invalid password for user:", username);
                res.status(401).send('Invalid credentials');
            }
        } else {
            console.warn("User not found with username:", username);
            res.status(404).send('User not found');
        }
    });
});

// Dashboard Data Endpoint
app.get('/affiliate/dashboard/:affiliateId', (req, res) => {
    console.log("GET /affiliate/dashboard/:affiliateId request received");
    const affiliateId = req.params.affiliateId;

    if (!affiliateId) {
        console.error("Affiliate ID missing from request");
        return res.status(400).send('Affiliate ID is required');
    }

    const params = {
        TableName: 'AffiliateData',
        Key: {
            'affiliateId': affiliateId
        }
    };

    console.log("Attempting to get dashboard data for affiliateId:", affiliateId);

    dynamoDB.get(params, (err, data) => {
        if (err) {
            console.error("Error fetching affiliate data from DynamoDB:", err);
            if (err.code === 'ResourceNotFoundException') {
                res.status(404).send('The specified table was not found. Please verify the table name and region.');
            } else if (err.code === 'AccessDeniedException') {
                res.status(403).send('Access denied. Please check IAM permissions.');
            } else {
                res.status(500).send('Server error while fetching affiliate data');
            }
        } else if (data.Item) {
            res.json(data.Item);
        } else {
            console.warn("Affiliate data not found for ID:", affiliateId);
            res.status(404).send('Affiliate data not found');
        }
    });
});

// Example Endpoint for Mass Payouts (Placeholder)
app.post('/affiliate/mass-payouts', (req, res) => {
    console.log("POST /affiliate/mass-payouts request received");
    try {
        console.log('Processing mass payouts...');
        res.send('Mass payouts processed successfully');
    } catch (error) {
        console.error("Unexpected error in /affiliate/mass-payouts:", error);
        res.status(500).send('Unexpected server error');
    }
});

// Start the server
app.listen(3000, '0.0.0.0', () => {
    console.log('Server running on port 3000 and listening on all network interfaces');
});
