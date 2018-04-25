/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// submit new tweets in POST function. Ajax success load new tweets
$(document).ready(function() {
  //hide compose tweet on load
  $(".new-tweet").hide();
  //implement a slider to hide compse new tweet form
  $("button").click(function() {
    $(".new-tweet").slideToggle(600);
    $('textarea').focus()
  })

  loadTweets()

  //Submit new tweets and call a new instance of loadtweets
  $("form").submit(function() {
    event.preventDefault();

    var length = $('.new-tweet textarea').val().length;

    if (length > 140) {
      alert('Too Long')
      return;
    } else if (length == 0) {
      alert('Too Short')
      return;
    } else

      $.ajax({
        url: '/tweets',
        data: $('form').serialize(),
        method: 'POST',
        success: function() {
          $('#tweetscontainer').empty()
          $('form')[0].reset()
          $('.counter').text('140')
          loadTweets()
        }
      });
  });
});

//GET JSON tweets
function loadTweets() {
  $.ajax({
    url: '/tweets',
    method: 'GET',
    success: function(data) {
      renderTweets(data)
    }
  })
}

//iterate through JSON data and apply function to each element
function renderTweets(data) {
  for (var keys in data) {
    var newTweet = createTweetElement(data[keys])
    $('#tweetscontainer').prepend(newTweet);
  }
};

//format each object into new article in HTML
function createTweetElement(input) {
  var newHTML =
    `<article>
        <header>
        <img src ="${input.user.avatars.small}" class='pic'>
        <span class='handle'> ${input.user.handle}  </span>
        <span class='userName'> ${input.user.name} </span>
        </header>
        <span class='tweetcontent'> ${input.content.text} </span>
        <footer> ${input.created_at} <span class='icons'>
        <i class="fas fa-flag"> </i>
        <i class="fas fa-heart"></i>
        <i class="fas fa-retweet"></i>
        </span>
        </footer>
        </article>`
  return newHTML;
};
