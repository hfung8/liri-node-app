//Declare the API
var Twitter = require('twitter');
var keys = require('./keys.js');
var spotify = require('spotify');
var request = require('request');

//Setup variable
var tweets = process.argv[2];
var spotifysong = process.argv[2];
var movie = process.argv[2];
var whatItSays = process.argv[2];


//Get twitterkeys from key.js 
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

//Main process
if (tweets === 'my-tweets'){
	getTweets();
};
if (spotifysong === 'spotify-this-song'){
	getSong();
}; 
if (movie === 'movie-this'){
	getMovie();
};
if (whatItSays === 'do-what-it-says'){
	doWhatItSays();
}

//Functions
function getTweets(){	
var params = {screen_name: 'hfunger8'} && {count:20};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
    console.log("test");
    for (var i = 0; i < tweets.length; i++){
    console.log(tweets[i].text);
    console.log("<=======================>");
				}
			}	
		})
	}
 
function getSong(){
var song = process.argv;
var title = "";
for (var i = 3; i< song.length; i++){
	title = title + " " + song[i];
}
spotify.search({ type: 'track', query: title }, function(err, data) {
    if ( err ) {
        console.log('Error occurred: ' + err);
        return;
    };    
    if (title === ""){
    	console.log('Artist :Ace of Base');
    	console.log('Preview Link :https://p.scdn.co/mp3-preview/4c463359f67dd3546db7294d236dd0ae9918 ');
    	console.log('Name:The Sign ');
    	console.log('Album:The Sign (US Album [Remastered]');
    } else {
    for (var i = 0; i < data.tracks.items.length; i++){
    var get = data.tracks.items[i];
    // console.log(JSON.stringify(data, null, 2));
    for (var a = 0; a < data.tracks.items[i].artists.length ; a++){
    console.log('Artist :' + get.artists[a].name);
}
    console.log('Preview Link :' + get.preview_url);
    console.log('Name :' + get.name);
    console.log('Album :' + data.tracks.items[i].album.name)
    console.log ("<-------------------------------->");
}
}
})
}

function getMovie(){
var movie = process.argv;
var title = movie.slice(3).join("+");
// console.log(title);
request('http://www.omdbapi.com/?t=' + title + '&y=&plot=short&r=json', function (error, response, body) {
  if (!error && response.statusCode == 200) {
    console.log('Title: ' + JSON.parse(body).Title);
  }
})
}

function doWhatItSays(){

}
