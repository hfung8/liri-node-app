var Twitter = require('twitter');
var keys = require('./keys.js');

process.env.TWITTER_CONSUMER_KEY = keys.twitterKeys.consumer_key;
process.env.TWITTER_CONSUMER_SECRET = keys.twitterKeys.consumer_secret;
process.env.TWITTER_ACCESS_TOKEN_KEY = keys.twitterKeys.access_token_key;
process.env.TWITTER_ACCESS_TOKEN_SECRET = keys.twitterKeys.access_token_secret;

var client = new Twitter({
	consumer_key: process.env.TWITTER_CONSUMER_KEY,
	consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
	access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
	access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});


var params = {screen_name: 'nodejs'};
client.get('search/tweets', params, function(error, tweets, response) {
  if (!error) {
  	console.log("test");
    console.log(tweets);
  }
});
