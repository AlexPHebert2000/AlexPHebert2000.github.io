/* eslint-disable no-use-before-define */
/* eslint-disable func-style */
$(document).ready(() => {
  /*FUNCTIONS*/
  function createTweet(tweet) {
    const $tweet = $('<div class=tweet></div>');
    const text = `@${tweet.user}: ${tweet.message}`;
    $tweet.text(text);
    return $tweet;
  }

  function addTweets(tweets) {
    const $tweets = tweets.map(createTweet);
    $feedDiv.prepend($tweets);
  }

  function updateFeed() {
    const newTweets = streams.home.slice(currentTweetCount + 1);
    currentTweetCount = streams.home.length;
    addTweets(newTweets.map(createTweet));
    setTimeout(updateFeed, 500);
  }
  /*VARIABLES*/
  //initialize current tweet count
  let currentTweetCount = 10;
  //save body tag
  const $body = $('body');

  /*BODY*/
  //reset body
  $body.html('');

  //create feed div
  $feedDiv = $('<div id=feed></div>');
  //add feed div to body
  $body.prepend($feedDiv);

  //add initial 10 tweets to body
  addTweets(streams.home);

});
