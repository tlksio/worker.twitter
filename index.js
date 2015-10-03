var Twit = require('twit');

var config = require('./config.json');
var talks = require('libtlks').talk;

var T = new Twit({
    consumer_key: config.twitterConsumerKey,
    consumer_secret: config.twitterConsumerSecret,
    access_token: config.workers.twitter.token,
    access_token_secret: config.workers.twitter.secret
});

function getUrl(talk) {
    return "http://tlks.io/talk/" + talk.slug;
};

talks.getRandom(config.mongodb, function(err, docs) {
    if (err) {
        throw new Error(err);
    }

    var talk = docs[0];
    var username = talk.author.username;
    var tweet = talk.title;
    tweet = tweet + ' ' + getUrl(talk) + ' by @' + username;

    T.post('statuses/update', {
        status: tweet
    }, function(err, data, response) {
        if (err) {
            console.log(err);
        }
    });
});
