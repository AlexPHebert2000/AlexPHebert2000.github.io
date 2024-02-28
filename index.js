/* eslint-disable func-style */
$(document).ready(() => {

  function createTweet(tweet) {
    const $tweet = $('<div class=tweet></div>');
    const text = `@${tweet.user}: ${tweet.message}`;
    $tweet.text(text);
    return $tweet;
  }

  function addTweets(tweets) {
    const $tweets = tweets.map(createTweet);
    $feedDiv.append($tweets);
  }

  let currentTweetCount = 10;

  //save body tag
  const $body = $('body');
  //reset body
  $body.html('');

  //create feed div
  $feedDiv = $('<div id=feed></div>');
  //add feed div to body
  $body.append($feedDiv);

  //add initial 10 tweets to body
  addTweets(streams.home);

});
