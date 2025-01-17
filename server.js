/*********************************************************************************
*  WEB422 – Assignment 1
*  I declare that this assignment is my own work in accordance with Seneca Academic Policy.  
*  No part of this assignment has been copied manually or electronically from any other source
*  (including web sites) or distributed to other students.
* 
*  Name: Nilrudra Mukhopadhyay Student ID: 134061175 Date: 16/01/2025
*  Vercel Link: _______________________________________________________________
*
********************************************************************************/


// Importing the required frameworks, modules, and init global variables -----------------------------
require('dotenv').config();
const cors = require('cors');
const express = require('express');
const MoviesDB = require("./modules/moviesDB.js");

const app = express();
app.use(cors());
app.use(express.json());
const db = new MoviesDB();
// Using fallback values for important variables in cases where the .env file cannot being read correctly
const HTTP_PORT = process.env.PORT || 3000;


// DataBase connection -------------------------------------------------------------------------------
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


// Routes --------------------------------------------------------------------------------------------
// Basic GET route for testing
app.get('/', (req, res) => {
    res.json({message: "API Listening"});
});

// All necessary routes for the web API to work correctly
app.post('/api/movies', (req, res) => {
    const movieData = req.body;
    db.addNewMovie(movieData)
    .then((newMovie) => {
        res.status(201).json(newMovie);
    })
    .catch((err) => {
        console.error(err);
        res.status(500).json({ message: "Failed to add movie", error: err.message });
    });
});

// Get route with page and optional title filtering
app.get('/api/movies', (req, res) => {
    const pg = parseInt(req.query.page) || 1;
    const perPg = parseInt(req.query.perPage) || 5;
    const title = req.query.title || "";
    db.getAllMovies(pg, perPg, title)
    .then((movies) => {
        res.status(200).json(movies);
    })
    .catch((err) => {
        console.error(err);
        res.status(500).json({ message: "Failed to retrieve movies", error: err.message });
    });
});

// Get route by movie ID
app.get('/api/movies/:id', (req, res) => {
    const movieID = req.params.id;
    db.getMovieById(movieID)
    .then((movies) => {
        res.status(200).json(movies);
    })
    .catch((err) => {
        console.error(err);
        res.status(500).json({ message: "Failed to retrieve movie", error: err.message });
    });
});

// Put route to update an existing movie by ID
app.put('/api/movies/:id', (req, res) => {
    const movieID = req.params.id;
    const updatedData = req.body;
    db.updateMovieById(updatedData, movieID)
    .then(() => {
        res.status(200).send();
    })
    .catch((err) => {
        console.error(err);
        res.status(500).json({ message: "Failed to update movie", error: err.message });
    });
});

// Delete route to delete a movie by its ID
app.delete('/api/movies/:id', (req, res) => {
    const movieID = req.params.id;
    db.deleteMovieById(movieID)
    .then(() => {
        res.status(204).send();
    })
    .catch((err) => {
        console.error(err);
        res.status(500).json({ message: "Failed to delete movie", error: err.message });
    });
});

module.exports = app;