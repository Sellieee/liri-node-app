// Requiring and configuring dotenv
require("dotenv").config();

// Use Spotify API to get keys from keys.js
var keys = require("./javascript/keys.js");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);

// Moment.js
var moment = require("moment")
moment().format();

// Using Axios to get information from APIs for OMDB and concert-this
var axios = require("axios");

// Read random.txt file for the do-what-it-says
var fs = require("fs");

// To avoid writing process.argv[2] constantly and to make my code cleaner!
var option = process.argv[2];

// Takes user's search term
var input = process.argv[3];

switch (option) {
   case "concert-this":
      concertThis(input);
      break;
   case "spotify-this-song":
      spotifySong(input);
      break;
   case "movie-this":
      movieThis(input);
      break;
   case "do-what-it-says":
      doThis(input);
      break;
}