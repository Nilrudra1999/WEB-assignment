// Importing the required frameworks and modules
require('dotenv').config();
const cors = require('cors');
const express = require('express');
const MoviesDB = require("./modules/moviesDB.js");


const app = express();
app.use(cors());    // declared before the routes
app.use(express.json());
const db = new MoviesDB();


// Initializing the database connection using the environment variables file 
db.initialize(process.env.MONGODB_CONN_STRING)
    .then(() => { 
        console.log("Database connection successful!"); 
    })
    .catch((err) => {
        console.error("Database connection failed:", err); 
        process.exit(1); 
    });


app.get('/', (req, res) => {
    res.json({message: "API Listening"});
});

// Using this as a fallback when the .env file is not working or not being read properly
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});