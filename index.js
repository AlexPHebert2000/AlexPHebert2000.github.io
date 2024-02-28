const DEBUG = true;

/* eslint-disable no-use-before-define */
/* eslint-disable func-style */

$(document).ready(() => {
  /*FUNCTIONS*/
  function createTweet(tweet) {
    const $tweet = $('<div class=tweet></div>');
    const $user = $(`<div class=user-name data-name=${tweet.user}>@${tweet.user}:</div>`);
    $('.user-name').on('click', userNameClickEventHelper );
    const $message = $(`<div class=message>${tweet.message}</div>`);
    const $timestamp = $(`<div class=timestamp data-timestamp=${tweet.created_at.toISOString()}>Posted: ${moment(tweet.created_at).fromNow()}</div>`);
    $tweet.append($user, $message, $timestamp);
    return $tweet;
  }

  function addTweets(tweets) {
    const $tweets = tweets.map(createTweet);
    $feedDiv.prepend($tweets);
  }

  function updateFeed() {
    const newTweets = streams.home.slice(currentTweetCount + 1).filter(tweet => filter ? tweet.user === filter : true);
    currentTweetCount = streams.home.length;
    addTweets(newTweets);
    $('.timestamp').each(function(index, element) { $(element).text(`Posted: ${moment($(element).attr('data-timestamp')).fromNow()}`); });

    if (DEBUG) { debug(); }

    setTimeout(updateFeed, 500);
  }

  function userNameClickEventHelper(event) {
    filter = $(this).attr('data-name');
    $feedDiv.html('');
    filteredTweets = streams.home.filter(tweet => tweet.user === filter);
    addTweets(filteredTweets);
  }

  function debug() {
    console.log(filter);
  }

  let filter = void 0;

  //initialize current tweet count
  let currentTweetCount = 0;
  //save body tag
  const $body = $('body');
  //reset body
  $body.html('');

  //create feed div
  $feedDiv = $('<div id=feed></div>');
  //add feed div to body
  $body.prepend($feedDiv);

  //start update feed
  updateFeed();

});
