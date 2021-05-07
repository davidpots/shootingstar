function checkBrowserWidth() {
  if ( $(window).width() < 1100 ) {
    $('body').addClass('viewport-small');
  } else {
    $('body').removeClass('viewport-small');
  }
}

function prepArticles() {
  // Loop through each <article> and add the height as inline CSS
  $('article').each(function(){
    var primaryHeight = $(this).find('.primary').height() + 'px';
    var bottomMargin = "120px";
    $(this).css('height', primaryHeight);
    $(this).css('margin-bottom', bottomMargin);
  });
  // Prime each <article> .primary by adding absolute positioning
  $('article .primary').each(function(){
    $(this).css('position', 'absolute');
  });
  // Prime each <article> .secondary by adding absolute positioning
  $('article .secondary').each(function(){
    $(this).css('position', 'absolute');
  });
}

function unPrepArticles() {
  // If screen is smaller, remove any inline styles for absolute positioning, etc
  $('article .primary').each(function(){
    $(this).css('position', 'static');
  });
  $('article .secondary').each(function(){
    $(this).css('position', 'static');
  });
  $('article').each(function(){
    // $(this).css('height', primaryHeight);
    // $(this).css('margin-bottom', bottomMargin);
  });
}

$(document).ready(function(){

  checkBrowserWidth();

  if ( $('body').hasClass('viewport-small') ) {

  } else {
    prepArticles();
  }

});


    // Prime the loop that checks the position of each article
    var $articles = $('article'), i, len = $articles.length;


// On scroll, check the position of each article
$(window).scroll(function(){

  checkBrowserWidth();

  if ( $('body').hasClass('viewport-small') ) {

  } else {

    for(i = 0; i < len; i++) {
      // Set the article that is being examined for this loop
      var $article = $($articles[i]);

      // These control the position of the fixed secondary column
      function secondaryFixTop() {
        $article.find('.secondary').css('position','fixed').css('top', '0px'); // .css('left','20px')
      }
      function secondaryUnFix() {
        $article.find('.secondary').css('position','absolute').css('top','0px').css('bottom','auto'); // .css('left','0px')
      }
      function secondaryFixBottom() {
        $article.find('.secondary').css('position','absolute').css('bottom','0px').css('top','auto'); //.css('left','0px')
      }

      // Calculate the distance of an element from the top of the browser window
      var scrollTop     = $(window).scrollTop(),
          elementOffset = $article.offset().top,
          distance      = (elementOffset - scrollTop);
      // Calculate the height of desired element (so you can determine its bottom)
      var itemHeight     = $article.height();
      // Calculate the distance of bottom of element to top of window
      var bottomDistance = (distance + itemHeight);

      // If the element is below the window, remove class "fixed"
      if (distance > 0) {
        $article.removeClass('fixed');
        secondaryUnFix();
      } else {
        // If the element is below the top of the window, add class "fixed"
        if (distance < 0) {
          $article.addClass('fixed');
          secondaryFixTop();
        }
        // This is when the secondary column should become bottom-ized
        if (bottomDistance > $article.find('.secondary').height()) {
          secondaryFixTop();
        } else if (bottomDistance < $article.find('.secondary').height()) {
          $article.addClass('bottomized');
          secondaryFixBottom();
        }
        // If the element is WAY below the top of the window, remove class "fixed"
        if (bottomDistance < 0) {
          $article.removeClass('fixed');
          secondaryUnFix();
        }
      }
    }

  }

});

$(window).resize(function(){
  checkBrowserWidth();
  if ( $('body').hasClass('viewport-small') ) {
    // small window, do nothing
    unPrepArticles();
  } else {
    // large window
    prepArticles();
  }
});
