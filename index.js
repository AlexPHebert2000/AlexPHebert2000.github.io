
$(document).ready(() => {
  const $body = $('body');
  $body.html('');

  $feedDiv = $('<div id=feed></div>');
  $body.append($feedDiv);

  const $tweets = streams.home.map((tweet) => {
    const $tweet = $('<div class=tweet></div>');
    const text = `@${tweet.user}: ${tweet.message}`;

    $tweet.text(text);

    return $tweet;
  });
  $feedDiv.append($tweets);

  $('div.tweet').css('padding', '10px 20px')
});
