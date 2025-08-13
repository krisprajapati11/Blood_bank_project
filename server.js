const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Mock Blood Inventory Data
const bloodInventory = [
    { bloodType: 'A+', units: 10, center: 'Red Cross Center' },
    { bloodType: 'O-', units: 5, center: 'City Hospital' },
    { bloodType: 'B+', units: 7, center: 'LifeCare Blood Bank' }
];

// Define the API Route
app.get('/api/blood-inventory', (req, res) => {
    res.json(bloodInventory);
});

// Start the Server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
