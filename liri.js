console.log("this is boomin");
require("dotenv").config();
var Twitter = require('twitter');
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var request = require("request");




var action = process.argv[2];

var value = process.argv[3];


    switch (action) {
        case 'my-tweets':
        getTweets();
        break;

        case 'spotify-this-song':
        spotifySearch();
        
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

    if(!value) {
        value = "The Sign";
    }
    var client = new Spotify(keys.spotify);
    spotify.search({ type: 'track', query: song}, function(error, data) {
        if (!error) {
            for(var i= 0; i<data.tracks.items.length; i++) {
             var songInfo = data.tracks.items[i];
             console.log("Artist: " + songInfo.artits[0].name);
        
            }
          
        } else {
            return console.log('Error occurred: ' + error);
        }
    });
} 


function defaultSong() {
    var client = new Spotify(keys.spotify);
    spotify.lookup({ type: 'track', id: '3DYVWvPh3kGwPasp7yjahc'}, function(error, data){
        if(!error){
            return console.log('Error occurred: ' + error);
        } else {
            console.log("Artist: "+ songInfo.artits[0].name);
        }
    });
}