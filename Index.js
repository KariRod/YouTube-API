'use strict';

var YOUTUBE_SEARCH_URL = 'https://www.googleapis.com/youtube/v3/search';


function getOutput(item){
  var videoId = item.id.videoId;
  var title = item.snippet.title;
  var description = item.snippet.description;
  var thumb = item.snippet.thumbnails.high.url;
  var channelTitle = item.snippet.channelTitle;
  var videoDate = item.snippet.publishedAt;
  
  // Build Output String
  var output = '<li>' +
  '<div class="list-left">' +
  '<img src="'+thumb+'">' +
  '</div>' +
  '<div class="list-right">' +
  '<h3>'+title+'</h3>' +
  '<small>By <span class="cTitle">'+channelTitle+'</span> on '+videoDate+'</small>' +
  '<p>'+description+'</p>' +
  '</div>' +
  '</li>';
  
  return output;
}

var q = $('#js-query').val();


function search(q, callback) {
  
  $('.js-search-results').html('');
  $('.js-query').html('');

  

  var settings = {
    url: YOUTUBE_SEARCH_URL,
    part: 'snippet, id'
    q:q,
    dataType: 'json',
    type: 'GET',
    key:'AIzaSyCQd2MY6h1edXhD0edauCGvqgRpuUtx1TA',
    success: callback
  };
  $.ajax(settings);
}
console.log(search);


function renderResult(result) {
  var template = $(getOutput);
  template.find(".list-left").text(result.name).attr("href", result.html_url);
  template.find(".list-right").text(result.owner.login).attr("href", result.owner.html_url);
  return template;
}

function displayYouTubeSearchData(data) {
  var results = data.items.map(function(item, index) {
    return renderResult(item);
  });
  $('.js-search-results').html(results);
}

function watchSubmit() {
  $('.js-search-form').submit(function(event) {
    event.preventDefault();
    var queryTarget = $(event.currentTarget).find('.js-query');
    var query = queryTarget.val();
    // clear out the input
    queryTarget.val("");
    getDataFromApi(query, displayYouTubeSearchData);
  });
}

$(watchSubmit);
