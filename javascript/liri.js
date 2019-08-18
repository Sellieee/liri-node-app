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