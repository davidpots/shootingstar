$(window).scroll(function(){

  // Calculate the distance of an element from the top of the browser window
  var scrollTop     = $(window).scrollTop();
  if ( $('.feed-controls').length ) {
    var elementOffset = $('.feed-controls').offset().top;
    var distance      = (elementOffset - scrollTop);
    console.log(scrollTop);

    if ( scrollTop > 125 ) {
      $('.feed-controls').addClass('fixed');
    } else {
      $('.feed-controls').removeClass('fixed');
    }
  }




 });

$(document).ready(function(){

  // Post firehose stuff
  $('.filter-item-wrapper .filter-item').click(function(){

    $('.filter-item--active').removeClass('filter-item--active');
    $(this).addClass('filter-item--active');
    var clickedFilter = $(this).attr('data-filterName');
    if ( $(this).hasClass('filter-item--all') ) {
      $('.filter-items--category .tile').show();
    } else {
      $('.filter-items--category .tile').each(function() {
        if ( $(this).attr('data-category') == clickedFilter ) {
          $(this).show();
        } else {
          $(this).hide();
        }
      });
    }
    return false;
  });

  // Post Gallery - side filters

  var activeVertical = "All";
  var activeCategory = "All";
  $('.post-filter-link').click(function(){

    // If there are search results being shown, clear/reset them
    $('#searchSummary').hide();
    document.getElementById('search-box').setAttribute("value", "");

    if ( $(this).hasClass('post-filter-link--vertical') ) {
      activeVertical = $(this).data('vertical');
      $('.post-filter-link--vertical').removeClass('post-filter-link--active');
      $('.post-filter-link--vertical[data-vertical="' + activeVertical + '"]').addClass("post-filter-link--active");

      if ( activeVertical == "All" ) {
        $('.tile').show();
        $('.post-filter-link--category').removeClass('post-filter-link--active');
        $('.post-filter-link--category[data-category="All"]').addClass('post-filter-link--active');
      } else {
        $('.tile').hide();
        $('.tile[data-vertical="' + activeVertical + '"]').show();

        // make the OTHER filter go back to "All"
        $('.post-filter-link--category').removeClass('post-filter-link--active');
        $('.post-filter-link--category[data-category="All"]').addClass('post-filter-link--active');

        // if (activeCategory != "All") {
        //   $('.tile').hide();
        //   $('.tile[data-category="' + activeCategory + '"]').show();
        // }
      }

    }
    if ( $(this).hasClass('post-filter-link--category') ) {
      activeCategory = $(this).data('category');
      $('.post-filter-link--category').removeClass('post-filter-link--active');
      $('.post-filter-link--category[data-category="' + activeCategory + '"]').addClass("post-filter-link--active");

      if ( activeCategory == "All" ) {
        $('.tile').show();
        $('.post-filter-link--vertical').removeClass('post-filter-link--active');
        $('.post-filter-link--vertical[data-vertical="All"]').addClass('post-filter-link--active');
      } else {
        $('.tile').hide();
        $('.tile[data-category="' + activeCategory + '"]').show();

        // make the OTHER filter go back to "All"
        $('.post-filter-link--vertical').removeClass('post-filter-link--active');
        $('.post-filter-link--vertical[data-vertical="All"]').addClass('post-filter-link--active');

        // if (activeVertical != "All") {
        //   $('.tile').hide();
        //   $('.tile[data-vertical="' + activeVertical + '"]').show();
        // }
      }

    }
    return false;
  });


  // Post Gallery - adding counts to each category and vertical

  $('.post-gallery-aside .post-filter-link--vertical').each(function() {
    var numInThatVertical = 0;
    var currentVertical = $(this).attr('data-vertical');
    numInThatVertical = $('.content-area .tile[data-vertical="'+currentVertical+'"]').length;
    $(this).append(" <span class='numberOfThings'>" + numInThatVertical + "</span>");
  });

  $('.post-gallery-aside .post-filter-link--category').each(function() {
    var numInThatCategory = 0;
    var currentCategory = $(this).attr('data-category');
    numInThatCategory = $('.content-area .tile[data-category="'+currentCategory+'"]').length;
    $(this).append(" <span class='numberOfThings'>" + numInThatCategory + "</span>");
  });

  // For each link in the side bar...
      // Fetch the data-attr/name of that link
      // Look how many matching items exist in the main feed
      // Put that number next to the side bar link

  $('.numberTotalPosts').text( $('.content-area .tile').length );

});
