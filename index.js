/* eslint-disable func-style */
$(document).ready(() => {

  function createTweet(tweet) {
    const $tweet = $('<div class=tweet></div>');
    const text = `@${tweet.user}: ${tweet.message}`;
    $tweet.text(text);
    return $tweet;
  }

  let currentTweetCount = 10;


  const $body = $('body');
  $body.html('');

  $feedDiv = $('<div id=feed></div>');
  $body.append($feedDiv);

  const $tweets = streams.home.map(createTweet);
  $feedDiv.append($tweets);

  $('div.tweet').css('padding', '10px 20px');
});
