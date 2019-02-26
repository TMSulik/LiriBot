require("dotenv").config();

const Spotify = require('node-spotify-api');
const keys = require("./keys.js");
const axios = require("axios");

var query = process.argv[3];

var spotify = new Spotify(keys.spotify);
var command = process.argv[2];

// TODO: get moment to work
// var moment = require("moment");

switch(command) {
  case "movie-this":
    movieThis(query);
    break;
  case "spotify-this-song":
    spotifyThis(query);
    break;
  case "concert-this":
    concertThis(query);
    break;
  default:
    doThis(query);   
    break;
}

function spotifyThis(query) {
  var track = "The Sign Ace of Base";
  if(query !== undefined) {
    track = query;
  }
  spotify.search({ 
    type: 'track', 
    query: track 
  }).then(function(response) {

    var artist = JSON.stringify(response.tracks.items[1].album.artists[0].name);
    var album = JSON.stringify(response.tracks.items[1].album.name);
    var link = JSON.stringify(response.tracks.items[1].external_urls.spotify);

    console.log("Song title: " +  track);
    console.log("Artist: " +  artist);
    console.log("Album: " +  album);
    console.log("Link: " +  link);
  })
  .catch(function(err) {
    console.log(err);
  });
}

function movieThis(query) {
  var movieName = "Mr. Nobody";
  if(query !== undefined) {
    movieName = query;
  }
  var OMDBUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
  
  axios.get(OMDBUrl).then(
    function (response) {
      console.log("Title: " + response.data.Title);
      console.log("Year: " + response.data.Year);
      console.log("Rating: " + response.data.Rated);
      console.log("Country: " + response.data.Country);
      console.log("Language: " + response.data.Language);
      console.log("Summary: " + response.data.Plot);
      console.log("Actors: " + response.data.Actors);
    }
  );
}

function concertThis(artist) {
  // Many bands come back as undefined
  var bandsUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
  axios.get(bandsUrl).then(
    function (response) {
      console.log("Artist: " + artist);
      console.log("Venue: " + response.data[0].venue.name);console.log("Location: " + response.data[0].venue.country);
      // TODO: use moment to format this as "MM/DD/YYYY"
      console.log("Date: " + response.data[0].datatime);

    });
}

function doThis() {
  /*
  node liri.js do-what-it-says
  Using the fs Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.
  It should run spotify-this-song for "I Want it That Way," as follows the text in random.txt.
  Edit the text in random.txt to test out the feature for movie-this and concert-this.
  */
}  

/*
Commands that liri.js should accept:
concert-this
spotify-this-song
movie-this
do-what-it-says
*/