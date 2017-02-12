var Twitter = require('twitter');
var keys = require('./keys.js');

var tweets = process.argv[2];

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

if (tweets === 'my-tweets'){

function getTweets(){	
var params = {screen_name: 'hfunger8'};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
    console.log("test");
    for (var i = 0; i < tweets.length; i++){
    console.log(tweets[i].text);
				}
			}	
		})
	}
	getTweets();
};



