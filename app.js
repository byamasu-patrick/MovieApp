require("dotenv").config();

require('./config/database').connect();

const express = require("express");
const jwt = require("jsonwebtoken");

const app = express();

app.use(express.json());

const User = require("./models/user");
const Movie = require("./models/movie");
const movie = require("./models/movie");

let TOKEN_KEY = "hilaa_jwt_secret_key";

app.post("/movie", async (req, res) => {
    try {
        const {
            movieId,
            movieName,
            yearReleased
        } = req.body;

        if (movieId && movieName && yearReleased) {
            res.status(400).send("All input are required");
        }
        const existingMovie = await Movie.findOne({movieId});
        if(existingMovie){
            return res.status(400).send("Movie already exists");
        }
        const movie = await Movie.create({
            movieId: movieId,
            movieName: movieName,
            yearReleased: yearReleased
        });
        res.status(201).send("Movie Saved");
    } catch (error) { 
        console.log(error);
    }
});

app.route("/movies").get((req, res) => {
    Movie.find({}, (err, result) => {
        if(err){
            res.send(err);
        }
        else{
            res.send(result);
        }
    })
});

app.post("/user", async (req, res) => {
    try {
        const {
            email,
            username,
            password,
            watchList
        } = req.body;
        if (email && username && password && watchList) {
            res.status(400).send("All input are required");
        }
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).send("User already exists");
        }
        const user = await User.create({
            email: email,
            username: username,
            password: password,
            watchList: watchList
        });
        let data = {
            time: Date(),
            userId: 12,
        };

        const token = jwt.sign(data, TOKEN_KEY);
        user.token = token;        

        res.status(201).send(token);

    } catch (error) {
        
    }
});

app.route("/users").get((req, res) => {
    User.find({}, (err, result) => {
        if(err){
            res.send(err);
        }
        else{
            res.send(result);
        }
    })
});