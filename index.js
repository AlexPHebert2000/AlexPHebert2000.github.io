const DEBUG = true;

/* eslint-disable no-use-before-define */
/* eslint-disable func-style */

$(document).ready(() => {
  /*FUNCTIONS*/
  function createTweet(tweet) {
    const $tweet = $('<div class=tweet></div>');
    const $user = $(`<div class='user-name tweet-body' data-name=${tweet.user}>@${tweet.user}:</div>`);
    $user.on('click', userNameClickEventHelper );
    const $message = $(`<div class='message tweet-body'>${tweet.message}</div>`);
    const $timestamp = $(`<div class='timestamp tweet-body' data-timestamp=${tweet.created_at.toISOString()}>Posted: ${moment(tweet.created_at).fromNow()}</div>`);
    $tweet.append($user, $message, $timestamp);
    return $tweet;
  }

  function addTweets(tweets) {
    const $tweets = tweets.map(createTweet);
    $feedDiv.prepend($tweets);
  }

  function updateFeed() {
    const newTweets = streams.home.slice(currentTweetCount).filter(tweet => filter ? tweet.user === filter : true);
    currentTweetCount = streams.home.length;
    addTweets(newTweets);
    $('.timestamp').each(function(index, element) { $(element).text(`${moment($(element).attr('data-timestamp')).fromNow()}`); });

    if (DEBUG) { debug(); }

    setTimeout(updateFeed, 500);
  }

  function userNameClickEventHelper(event) {
    filter = $(this).attr('data-name');
    $feedDiv.html('');
    filteredTweets = streams.home.filter(tweet => tweet.user === filter).toReversed();
    addTweets(filteredTweets);
    $filterClearDiv.show();
  }

  function filterClearClickEventHelper(event) {
    filter = void 0;
    $feedDiv.html('');
    addTweets(streams.home.toReversed());
    $filterClearDiv.hide();
  }

  function submitUserTweet(event) {
    event.preventDefault();
    const userTweet = {
      user: $('#input-username').val(),
      message: $('#input-tweet').val(),
      created_at: new Date()
    };
    if (!streams.users[userTweet.user]) { streams.users[userTweet.user] = []; }
    streams.home.push(userTweet);
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

  //create filter clear button
  $filterClearDiv = $('<div id=filter-clear-div></div>');
  $filterClearButton = $('<button id=filter-clear-button>Clear Filter</button>');
  $filterClearButton.on('click', filterClearClickEventHelper);
  $filterClearDiv.append($filterClearButton);
  $body.prepend($filterClearDiv);
  $filterClearDiv.hide();

  //create tweet input form
  $userTweetInputDiv = $('<div id=user-tweet-input-div></div>');
  $userTweetForm = $('<form><label for=username>Username</label><input value=user type=text id=input-username></input><input value="What\'s on your mind" type=text id=input-tweet></input><input id=submit-button type=submit value="Let us know!"></form>');
  $userTweetForm.on('submit', submitUserTweet);
  $userTweetInputDiv.append($userTweetForm);
  $body.prepend($userTweetInputDiv);

  //create header
  $body.prepend('<h1 id=header>Twiddler</h1>')

  //start update feed
  updateFeed();

});
