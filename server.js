// Importing the required frameworks and modules
require('dotenv').config();
const cors = require('cors');
const express = require('express');

const app = express();
app.use(cors());    // declared before the routes
app.use(express.json());

app.get('/', (req, res) => {
    res.json({message: "API Listening"});
});

// Using this as a fallback when the .env file is not working or not being read properly
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});