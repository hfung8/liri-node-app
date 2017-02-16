//Declare the API
var Twitter = require('twitter');
var keys = require('./keys.js');
var spotify = require('spotify');
var request = require('request');
var fs = require('fs');

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
if (title){
spotify.search({ type: 'track', query: title }, function(err, data) {
    if ( err ) {
        console.log('Error occurred: ' + err);
        return;
};    
    console.log('Artist: ' + data.tracks.items[0].artists[0].name);
    console.log('Preview Link :' + data.tracks.items[0].preview_url);
    console.log('Song Name :' + data.tracks.items[0].name);
    console.log('Album :' + data.tracks.items[0].album.name);
    })

}else{
    spotify.search({ type: 'track', query: 'The Sign'}, function (err,data){
        console.log("No input, let's go with Ace of Base");
        console.log('Artist: ' + data.tracks.items[4].artists[0].name);
        console.log('Preview Link: ' + data.tracks.items[4].preview_url);
        console.log('Song Name: ' + data.tracks.items[4].name);
        console.log('Album :' + data.tracks.items[4].album.name);
        })
    }
}

function getMovie(){
var movie = process.argv;
var title = movie.slice(3).join("+");
// console.log(title);
if (title){
request('http://www.omdbapi.com/?t=' + title + '&y=&plot=short&r=json&tomatoes=true', function (error, response, body) {
  if (!error && response.statusCode == 200) {
    // console.log(body);
    console.log('Title: ' + JSON.parse(body).Title);
    console.log('Year: ' + JSON.parse(body).Year);
    console.log('IMDB rating: ' + JSON.parse(body).imdbRating);
    console.log('Country: ' + JSON.parse(body).Country);
    console.log('Language: ' + JSON.parse(body).Language);
    console.log('Plot: ' + JSON.parse(body).Plot);
    console.log('Actors: ' + JSON.parse(body).Actors);
    console.log('Rotten Tomatoes Rating: ' + JSON.parse(body).tomatoUserRating);
    console.log('Rotten Tomatoes URL: ' + JSON.parse(body).tomatoURL);
            }
        })
    }else{
        console.log("No input, let's go with Mr. Nobody");
request('http://www.omdbapi.com/?t=Mr.Nobody&y=&plot=short&r=json&tomatoes=true', function (error, response, body) {
    if (!error && response.statusCode == 200){
    console.log('Title: ' + JSON.parse(body).Title);
    console.log('Year: ' + JSON.parse(body).Year);
    console.log('IMDB rating: ' + JSON.parse(body).imdbRating);
    console.log('Country: ' + JSON.parse(body).Country);
    console.log('Language: ' + JSON.parse(body).Language);
    console.log('Plot: ' + JSON.parse(body).Plot);
    console.log('Actors: ' + JSON.parse(body).Actors);
    console.log('Rotten Tomatoes Rating: ' + JSON.parse(body).tomatoUserRating);
    console.log('Rotten Tomatoes URL: ' + JSON.parse(body).tomatoURL);
            }
        })
    }
}

function doWhatItSays(){

fs.readFile("random.txt", "utf8", function(err,data) {
    if (err) throw err;
    var dataArray = data.split(",");
    var songFromFile = dataArray[1];

    spotify.search({ type: 'track', query: songFromFile}, function (err,data){
    console.log('Artist: ' + data.tracks.items[0].artists[0].name);
    console.log('Preview Link :' + data.tracks.items[0].preview_url);
    console.log('Song Name :' + data.tracks.items[0].name);
    console.log('Album :' + data.tracks.items[0].album.name);
        
            if ( err ) {
            console.log('Error occurred: ' + err);
            console.log("");
            return;
            }
        })
    })
}



