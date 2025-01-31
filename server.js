/*********************************************************************************
*  WEB422 – Assignment 1
*  I declare that this assignment is my own work in accordance with Seneca Academic Policy.  
*  No part of this assignment has been copied manually or electronically from any other source
*  (including web sites) or distributed to other students.
* 
*  Name: Nilrudra Mukhopadhyay Student ID: 134061175 Date: 16/01/2025
*  Vercel Link: https://web-assignment1-ceb6-wptfbyec4-nilrudra-mukhopadhyays-projects.vercel.app/api/movies
*
********************************************************************************/

// Importing the required frameworks, modules, and init global variables -----------------------------
const express = require('express');
const app = express();

const cors = require("cors");
require('dotenv').config();

const MoviesDB = require("./modules/moviesDB.js");
const db = new MoviesDB();
const HTTP_PORT = 8080;

app.use(cors());
app.use(express.json());



// Routes --------------------------------------------------------------------------------------------
app.get('/', (req, res) => {
    res.redirect('/api/movies');
});

// All necessary routes for the web API to work correctly
app.post("/api/movies", (req,res) => {
db.addNewMovie(req.body)
    .then((movie) => {
        res.status(201).json(movie);
    })
    .catch((err) => {
        res.status(500).json({message: `an error occurred: ${err}`});
    });
});

// Get route with page and optional title filtering
app.get("/api/movies", (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const perPage = parseInt(req.query.perPage) || 5;
    const title = req.query.title || "";
    db.getAllMovies(page, perPage, title)
    .then(data => {
        res.json(data);
    })
    .catch((err) => {
        res.status(500).json({ message: `an error occurred: ${err}` });
    });
});

// Get route by movie ID
app.get("/api/movies/:id",(req,res) => {
    db.getMovieById(req.params.id)
    .then(data => {
        res.json(data);
    }).catch((err)=>{
        res.status(500).json({message: `an error occurred: ${err}`});
    });
});

// Put route to update an existing movie by ID
app.put("/api/movies/:id", (req,res) => {
    const id = req.params.id;
    db.updateMovieById(req.body, id)
    .then(() => {
        res.json({message: `movie ${id} successfully updated`});
    }).catch((err)=>{
        res.status(500).json({message: `an error occurred: ${err}`});
    });
});

// Delete route to delete a movie by its ID
app.delete("/api/movies/:id", (req,res)=>{
    db.deleteMovieById(req.params.id)
    .then(() => {
        res.status(204).end();
    }).catch((err)=>{
        res.status(500).json({message: `an error occurred: ${err}`});
    });
});



// DataBase connection -------------------------------------------------------------------------------
// Initializing the database connection using the environment variables file 
db.initialize("mongodb+srv://nmukhopadhyay:iu6euH9cZuUabHqA@sample-data.geyjw.mongodb.net/sample_mflix?retryWrites=true&w=majority&appName=Sample-Data")
.then(()=>{
    app.listen(HTTP_PORT, ()=>{
        console.log(`server listening on: ${HTTP_PORT}`);
    });
})
.catch((err) => {
    console.error(err);
});