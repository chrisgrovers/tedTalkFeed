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
  console.dir(feed);

  this.class = 'feedEntry';
  this.title = feed.title;
  this.link = feed.link;
  this.date = feed.pubDate;
  this.author = feed.author;
  this.categories = feed.catagory;
  this.content = feed.description;
  this.contentSnippet = feed.contentSnippet;
  this.mediaGroups = feed.mediaGroups;

  this.createEntry = function() {
    var $entry = $('<li>', {
      class: this.class,
    })
    $('<h1>', {
      class: 'title',
      text: this.title
    }).appendTo($entry);
    $('<div>', {
      class: 'date',
      html: 'Posted on <time>' + this.date + '</time>' 
    }).appendTo($entry);
    $('<div>', {
      class: 'snippet',
      text: this.contentSnippet
    }).appendTo($entry);
    $('<div>', {
      class: 'content hidden',
      text: this.content
    }).appendTo($entry);


    return  $entry;
  }

  return this;
}

$(function() {
  // cross domain unblocked by using cors.io http://cors.io/?u=
  var feedUrl = 'https://agile-thicket-5774.herokuapp.com/feed';
  var numFeed = 0;


  // load feeds api
  // callback function prevents google.load from wiping page clean

  // should create a list for the feed
  var init = function(data) {
    console.log('initiating new feed', data.items);

    // load 10 entries instead of default 4
    // TODO: autoload entries on scroll


      console.log('all systems go!');

      var $list = $('<ul>', {
        class: 'feedList',
        // TODO: onclick display 'detail view' with more info
        click: function(e) {
          // console.log("i've been clicked!", e.target)
          // if (e.target.parent('.feedEntry') !== false) {
          // console.log('entry is', e.target.parent('.feedEntry'))
          var parent = $(e.target).parent('.feedEntry');
          parent.children('.snippet').toggleClass('hidden');
          parent.children('.content').toggleClass('hidden');
        }
      })

      for (var i = 0; i < data.items.length; i++) {
        var $newEntry = new Entry(data.items[i]);
        $list.append($newEntry.createEntry());
      }
      console.log('appending to body');
      $('body').append($list);
    }

  $.ajax({
    url: feedUrl,
    type: 'get',
    dataType: 'json',
    success: init,
    error: function() {
      console.log('Oh no! Error!');
    },
    complete: function() {
      console.log('done');
    }
  })

})