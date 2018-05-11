console.log("this is boomin");
require("dotenv").config();
var Twitter = require('twitter');
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var request = require("request");
var fs = require('fs');




var action = process.argv[2];

var value = process.argv[3];


    switch (action) {
        case 'my-tweets':
        getTweets();
        break;

        case 'spotify-this-song':
        spotifySearch();
        break;

        case 'movie-this':
        movieSearch(value);
        break;

        case 'do-what-it-says':
        doThis();
        break;

        
  } 




//get twitter status
function getTweets() {
var client = new Twitter(keys.twitter);
var params = {screen_name: 'fadez510'};
console.log("initializing function");

client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
    
    
      for (var i = 0; i < tweets.length; i++) {
          var tweetText = tweets[i].text;
          console.log("Tweet Text: " + tweetText);
          var tweetCreationDate = tweets[i].created_at;
          console.log("Tweet Creation Date: " + tweetCreationDate);
      }
  } else {
      console.log(error);
  }
  });
}



//get spotify song searches
function spotifySearch() {

    console.log("initializing funciton");
    var spotify = new Spotify(keys.spotify);

    if(!value) {
        value = "The Sign by Ace of Base";
    }

    

    spotify.search({ type: 'track', query: value }, function(error, data, response) {
        if (error) {

            console.log('Error occurred: ' + error);
             return;
        }
        var songInfo = data.tracks.items[0];
        var songData =
            "\r\n Artist: " + songInfo.artists[0].name +
            "\r\n Song Title: " + songInfo.name +
            "\r\n Song Preview: " + songInfo.preview_url ;

        console.log(songData);
        }); 
     
    }

    function movieSearch() {

        console.log("initializing function")
        if (!value) {
            value = 'Black Panther';
        }
        request("http://www.omdbapi.com/?t=" + value + "&y=&plot=short&apikey=trilogy", function (error, response, data) {
    
            if (!error && response.statusCode === 200) {
    
                var movieData = JSON.parse(data);
                var movieInfo =
                    "\r\n Title: " + movieData.Title +
                    "\r\n Year: " + movieData.Year +
                    "\r\n IMDB Rating: " + movieData.imdbRating +
                    "\r\n Rotten Tomatoes Rating: " + movieData.Ratings[1].Value +
                    "\r\n Country of Origin: " + movieData.Country +
                    "\r\n Language: " + movieData.Language +
                    "\r\n Plot: " + movieData.Plot +
                    "\r\n Actors: " + movieData.Actors ;
    
                console.log(movieInfo)
    
    
            } else {
                console.log("Error Occured: " + error);
            }
        });
    
    }
 
    
function doThis() {

    fs.readFile('random.txt', 'utf8', function (error, data) {
        var randomArray = data.split(',');
        value = randomArray[1];

        if (error) {
            console.log(error);
        } else {
            if (randomArray[0] === 'spotify-this-song') {
                spotifySearch();
            }
        }
    });
} 

