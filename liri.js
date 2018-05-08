console.log("this is boomin");
require("dotenv").config();
var Twitter = require('twitter');
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var request = require("request");

var action = process.argv[2];

var argument = "";

magicMaker (action, argument);

function magicMaker(action, argument){
    switch (action) {
        case 'my-tweets':
        getTweets();
        break;

    }
}

//get twitter status
function getTweets() {
var client = new Twitter(keys.twitter);
var params = {screen_name: 'fadez510'};

// Shows up to last 20 tweets and when created in terminal.
client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {

      // Loops through tweets and prints out tweet text and creation date.
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

