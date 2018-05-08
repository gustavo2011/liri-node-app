console.log("this is boomin");
require("dotenv").config();
var Twitter = require('twitter');
var keys = require("./keys.js");
var client = new Twitter(keys.twitter);
console.log(client);
