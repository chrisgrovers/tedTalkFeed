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

var Entry = function(feed) {
  // console.log('creating feed entry', feed)
  // debugger;
  this.class = 'feedEntry';
  this.title = feed.title;
  this.link = feed.link;
  this.date = feed.publishedDate;
  this.author = feed.author;
  this.categories = feed.catagories;
  this.content = feed.content;
  this.contentSnippet = feed.contentSnippet;
  this.mediaGroups = feed.mediaGroups;
  console.log('this is', feed);
  this.createEntry = function() {
    var $entry = $('<li>', {
      class: this.class,
    })
    var $title = $('<div>', {
      class: 'title',
      text: this.title
    }).appendTo($entry);
    return  $entry;
  }
  return this;
}

  $(function() {
    var feedUrl = 'http://feeds.feedburner.com/tedtalks_video';


    // load feeds api
    // callback function prevents google.load from wiping page clean
    google.load("feeds", "1", {
      callback: function() {}
    });


    // should create a list for the feed
    var init = function() {
      console.log('initiating new feed');
      var feed = new google.feeds.Feed(feedUrl);

      feed.load(function(result) {
        console.log('result is', result);
        if (!result.error) {
          console.log('all systems go!');
          var $list = $('<ul>', {

          })

          for (var i = 0; i < result.feed.entries.length; i++) {
            var $newEntry = new Entry(result.feed.entries[i]);
            $list.append($newEntry.createEntry());
          }
          console.log('appending to body');
          $('body').append($list);
        }
        if (result.error) {
          console.log('oh no! We have an error!');
        }
      })    
    }
    // doesn't work every time when I refresh my page...
    // console gives this error: Uncaught TypeError: google.feeds.Feed is not a function
    google.setOnLoadCallback(init);
  })