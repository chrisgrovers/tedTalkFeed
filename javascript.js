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

// TODO: should be an object that that has attributes with a loadMore function, a numLoaded var, a getDom function

function Entry(feed) {
  this.class = 'feedEntry';
  this.title = feed.title;
  this.link = feed.link;
  this.date = feed.pubDate;
  this.author = feed.author;
  this.category = feed.category;
  this.content = feed['itunes:summary'];
  this.contentSnippet = feed.contentSnippet;
  this.mediaGroups = feed.mediaGroups;
  this.thumbnail = feed['media:thumbnail'];
}

Entry.prototype.createEntry = function() {
  var $entryContainer = $('<li>', {
    class: this.class + ' row-fluid',
  })

  var $entry = $('<li>', {
    class: this.class + ' span6',
  }).appendTo($entryContainer);

  var $title = $('<h1>', {
    class: 'title span8',
    text: this.title
  }).appendTo($entry);

  var $details = $('<div>', {
    class: 'details row-fluid',
  }).appendTo($entry)

  var $thumbnail = $('<img>', {
    class: 'span4',
    src: this.thumbnail['@url']
  }).appendTo($details);

  var $category = $('<div>', {
    class: 'category span7',
    text: 'Category: ' + this.category
  }).appendTo($details);

  var $date = $('<div>', {
    class: 'date span7',
    html: 'Posted on <time>' + this.date + '</time>' 
  }).appendTo($details);

  var $snippet = $('<div>', {
    class: 'snippet span7',
    text: this.contentSnippet
  }).appendTo($details);

  var $content = $('<div>', {
    class: 'content hidden span12',
    html: this.content
  }).appendTo($details);

  var $link = $('<a>', {
    class: 'link',
    text: 'Watch Now',
    href: this.link
  }).prependTo($content)

  return  $entry;
}

function FeedObj(data) {
  this.end = false;
  this.data = data;
  this.numFeeds = 0;
}


// should create a list for the feed to be appended to body
FeedObj.prototype.addList = function() {
  if (this.numFeeds > this.data.items.length) {
    if (!this.end) {
      console.log('you have reached the end!');
      this.end = true;

      return $('<div>', {
        class: 'theEnd span12',
        text: 'End'
      })
    }
  } else {
    console.log('returning a list!');

    var $listContainer = $('<div>', {
      class: 'listContainer list-group container-fluid'
    })

    var $list = $('<ul>', {
      class: 'feedList span12',
      //  onclick display 'detail view' with more info
      click: function(e) {
        console.log("i've been clicked!", e.target)
        var parent = $(e.target).closest('.feedEntry');
        parent.find('.snippet').toggleClass('hidden');
        parent.find('.content').toggleClass('hidden');
      }
    }).appendTo($listContainer);

    for (var i = this.numFeeds; i < this.numFeeds + 10 && i <  this.data.items.length; i++) {
      var $newEntry = new Entry(this.data.items[i]);
      $list.append($newEntry.createEntry());
    }

    this.numFeeds += 10;
    return $listContainer;
  }
}

FeedObj.prototype.appendList = function() {
  var $list = this.addList();
  $('body').append($list);
}


$(function() {

  var makeNewFeed = function(data) {
    var newFeed = new FeedObj(data);
    newFeed.appendList();

    // autoload entries on scroll
    $(window).scroll(function() {
      if($(window).scrollTop() == $(document).height() - $(window).height()) {
        // load more items
        newFeed.appendList();
      }
    });
  }

  $.ajax({
    url: 'https://agile-thicket-5774.herokuapp.com/feed',
    type: 'get',
    dataType: 'json',
    success: makeNewFeed,
    error: function() {
      console.log('Oh no! Error!');
    },
    complete: function() {
      console.log('done');
    }
  })
})