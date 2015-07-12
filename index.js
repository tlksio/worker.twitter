var Twit = require('twit');

var config = require('./config.json');
var talks = require('libtlks').talk;

var T = new Twit({
    consumer_key: 'geLmqBbnxszuEZzgB7AaafKiB',
    consumer_secret: '7CdedM2kEWQ4cG9meth3pK7RPOn16HmE2cnXxW1pCrx0lOUCB6',
    access_token: '13088482-yWgE087lyZKHMpXMyUk5Plco6PB45mam4t9yAQ9jl',
    access_token_secret: 'jrEJNxOdLSVTwURfI40TZiIEVKbp49x7zMfewNm7upLfU'
});

function getUrl(talk) {
    return "http://tlks.io/talk/" + talk.slug;
};

talks.getRandom(config.mongodb, function(err, docs) {
    if (err) {
        throw new Error(err);
    }

    var talk = docs[0];

    var tweet = talk.title;
    var size = tweet.length;
    tweet = tweet + getUrl(talk);
    size = size + 23;

    T.post('statuses/update', { status: tweet }, function(err, data, response) {
          console.log(err);
    });
});
