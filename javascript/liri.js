// Requiring and configuring dotenv
require("dotenv").config();

// Use Spotify API to get keys from keys.js
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
// console.log(keys);
var spotify = new Spotify(keys.spotify);

// Moment.js
var moment = require("moment");
moment().format();

// Using Axios to get information from APIs for OMDB and concert-this
var axios = require("axios");

// Read random.txt file for the do-what-it-says
var fs = require("fs");

// Option represents the function being called
var option = process.argv[2];

// Takes user's search term
var input = process.argv.slice(3).join(" ");

// Trying the switch statement instead of if/else statements
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

function concertThis(input) {
   axios
      .get(
         "https://rest.bandsintown.com/artists/" +
         input +
         "/events?app_id=codingbootcamp"
      )
      .then(function (response) {
         console.log("concertThis ran!");
         console.log(input);
         // // Create loop to run through response.data
         // console.log(response.data)
         for (var i = 0; i < response.data.length; i++) {
            var concertResults =
               "\n------------------------------" +
               "\nVenue Name: " +
               response.data[i].venue.name +
               "\nVenue Location: " +
               response.data[i].venue.city +
               "\nEvent Date: " +
               moment(response.data[i].datetime).format("DD-MM-YYYY") +
               "\n------------------------------";
            console.log(concertResults);
         }
      })
      .catch(function (error) {
         console.log(error);
      });
}

function spotifySong(input) {
   if (!input) {
      input = "The Sign";
   }
   spotify
      .search({
         type: "track",
         query: input,
         limit: 5
      })
      .then(function (response) {
         // console.log(response.tracks.items[0].album.artists[0].name)
         for (var i = 0; i < response.tracks.items.length; i++) {
            // console.log(response.tracks.items[i].album.artists);
            var spotifyResponse = response.tracks.items[i];
            var spotifyResults =
               "\n------------------------------" +
               "\nArtist's Name: " + spotifyResponse.artists[0].name +
               "\nSong Name: " + spotifyResponse.name +
               "\nPreview Link on Spotify: " + spotifyResponse.external_urls.spotify +
               "\nAlbum: " + spotifyResponse.album.name +
               "\n------------------------------"
            console.log(spotifyResults);
         }

      }).catch(function (error) {
         console.log(error);
      });
}


function movieThis(input) {
   if (!input) {
      input = "Mr Nobody";
   }
   axios
      .get(
         "https://www.omdbapi.com/?t=" +
         input +
         "&y=&plot=short&apikey=trilogy"
      )
      .then(function (response) {
         // console.log(response);
         var movieResponse = response.data;
         var movieResults =
            "\n------------------------------" +
            "\nMovie Title: " +
            movieResponse.Title +
            "\nRelease Year: " +
            movieResponse.Year +
            "\nIMDB Rating: " +
            movieResponse.imdbRating +
            "\nRotten Tomatoes Rating: " +
            movieResponse.Ratings[1].Value +
            "\nCountry: " +
            movieResponse.Country +
            "\nLanguage " +
            movieResponse.Language +
            "\nPlot: " +
            movieResponse.Plot +
            "\nActors/Actresses: " +
            movieResponse.Actors +
            "\n------------------------------";
         console.log(movieResults);
      })
      .catch(function (error) {
         console.log(error);
      });
}

function doThis(input) {
   fs.readFile("random.txt", "utf8", function (error, data) {
      if (error) {
         return console.log(error);
      } else
         var dataArr = data.split(",");
      // console.log(dataArr[0]);
      // console.log(dataArr[1]);
      spotifySong(dataArr[1])
   });
}