// Importing the required frameworks and modules
require('dotenv').config();
const cors = require('cors');
const express = require('express');
const MoviesDB = require("./modules/moviesDB.js");


const app = express();
app.use(cors());    // declared before the routes
app.use(express.json());
const db = new MoviesDB();
// Using 3000 as a fallback when the .env file is not working or not being read properly
const HTTP_PORT = process.env.PORT || 3000;


// Initializing the database connection using the environment variables file 
db.initialize(process.env.MONGODB_CONN_STRING)
    .then(() => { 
        app.listen(HTTP_PORT, () => {
            console.log(`Server listening on: ${HTTP_PORT}`);
        });
    })
    .catch((err) => {
        console.error(err); 
        process.exit(1);    // db initialization failed
    });

// Basic GET route for testing
app.get('/', (req, res) => {
    res.json({message: "API Listening"});
});