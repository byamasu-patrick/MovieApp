const mongoose = require("mongoose");

const { MONGO_URI } = process.env;

exports.connect = () => {
    mongoose.connect("mongodb://localhost:27017/moviedb", {

    })
    .then(() => {
        console.log("Successfully connected to Movie Database !!!");
    })
    .catch((error) => {
        console.log("Database connection failed...Exiting Now");
        console.log(error);
        process.exit(1);
    });
}