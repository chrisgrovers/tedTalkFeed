// Please refer to the Media RSS feed at this URL:
// http://feeds.feedburner.com/tedtalks_video

// Please use the Google Feeds API to consume this feed entirely in the web
// browser. See documentation here:

// https://developers.google.com/feed/

// Create a single web page which consumes this feed and presents it as an
// attractive list of well-formatted feed entries, including item metadata.
// When the user clicks on a particular feed entry in the list, they should be
// presented with a "detail view" for that entry including more complete
// metadata. Use your judgment to come up with a usable solution.

// Do not write any server-side code. Use only HTML, CSS, and JavaScript for
// this exercise. Feel free to make use of JavaScript libraries, etc. Be
// advised that your code will be graded based on simplicity, maintainability,
// and use of appropriate markup. Your design will also be graded based on
// look and feel and overall user experience. Please produce a polished result
// ready to be released to users.

  $(function() {
    var feedUrl = 'http://feeds.feedburner.com/tedtalks_video';


    // load feeds api
    google.load("feeds", "1");



    var init = function() {
      console.log('hello');
      var feed = new google.feeds.Feed(feedUrl);
      
      console.log('1')
      feed.load(function(result) {
        console.log('result is', result);
      })
      console.log('yo');    
    }
    google.setOnLoadCallback(init);

    // console.log('my feed is ')
  })