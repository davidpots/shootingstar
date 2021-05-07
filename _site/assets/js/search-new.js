// via https://learn.cloudcannon.com/jekyll/jekyll-search-using-lunr-js/

function getQueryVariable(variable) {
  var query = window.location.search.substring(1);
  query = query.replace('&',"%26");
  var vars = query.split('&');
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split('=');

    if (pair[0] === variable) {
      return decodeURIComponent(pair[1].replace(/\+/g, '%20'));
    }
  }
}
var searchTerm = getQueryVariable('query');

function updateSearchHeading() {
  // $('#numResultsFound').html( $('#search-results li').length);
  // $('#searchQuery').text("\"" + searchQueryText + "\"");
  // $('#yesQueryPrompt').show();
}

function runSearch(searchTerm) {

  // Get search query term...
  searchQueryText = searchTerm;

  // Go through all items...
  $('.content-area .tile').each(function() {

    // - See if the search query exists in either the caption, post recommendation, author, category, vertical, etc

        // The \\b is a RegExp thing that means "word boundary" on either end of the search term.
        //     This ensures that a query for "20" will NOT be true for the tag "2000s", etc
        // The "i" means case insensitive, I believe
        // https://stackoverflow.com/questions/2232934/how-can-i-match-a-whole-word-in-javascript

    var currentQuery = $(this).find('.caption').text();
    if ( ($(this).find('.caption').text().search(new RegExp("\\b" + searchQueryText + "\\b", 'i')) >= 0) ||
         ($(this).find('.tile_meta__tag').text().search(new RegExp("\\b" + searchQueryText + "\\b", 'i')) >= 0) || ($(this).find('.flyout_content').text().search(new RegExp("\\b" + searchQueryText + "\\b", 'i')) >= 0) ||
         ($(this).find('.tile_meta__author').text().search(new RegExp("\\b" + searchQueryText + "\\b", 'i')) >= 0) ) {
      // - If the query does exist in an item, add a class XXX to the post tile
      $(this).addClass('hasSearchMatch').removeClass('noSearchMatch');
    } else {
      // - If the query does not exist in an item, add class YYY to hide that item
      $(this).removeClass('hasSearchMatch').addClass('noSearchMatch');
    }

  });

  // - Count of all the items with class XXX
  // - If there's 1+ items with XXX, display the "X results found" text above all the results
  // - If there's 0 items with XXX, display "no items found matching your search"
  $('#searchSummaryNumberFound').text($('.hasSearchMatch').length);




      // if (
      //     (lessons[i].title.search(new RegExp("\\b" + searchQueryText + "\\b", 'i')) >= 0) ||
      //     (lessons[i].category.search(new RegExp("\\b" + searchQueryText + "\\b", 'i')) >= 0) ||
      //     (lessons[i].slug.search(new RegExp("\\b" + searchQueryText + "\\b")) >= 0) ||
      //     (lessons[i].tags.search(new RegExp("\\b" + searchQueryText + "\\b", 'i')) >= 0) ||
      //     (lessons[i].hidden_tags.search(new RegExp("\\b" + searchQueryText + "\\b", 'i')) >= 0)
      //   )

}

// var searchQueryText;

$(document).ready(function(){
  if (searchTerm && searchTerm != "") {
    runSearch(searchTerm);
    setTimeout(function(){
      // updateSearchHeading();
      $('#searchSummary').show();
      $('#searchSummary #searchSummaryTerm').text(searchTerm);
      document.getElementById('search-box').setAttribute("value", searchTerm);
    }, 10);
  }
});
