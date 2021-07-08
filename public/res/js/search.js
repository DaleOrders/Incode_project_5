
 const image_url = ' https://image.tmdb.org/t/p/w500'
 $(function() {

    $("#findMovie").autocomplete({
      source: function(request, response) {
        $.ajax({
          url: "https://api.themoviedb.org/3/search/movie?api_key=15c2759fb6b0cbc335f8f0632d652dc9&query=" + request.term,
          dataType: "json",
          data: {
            term: request.term
          },
          success: function(data) {
              console.log(data)
            var transformed = data.results.map(function(movie) {
              return {
                title: movie.original_title,
                image: movie.poster_path,
                movieId: movie.id
              };
            });
            response(transformed);
          }
        });
      }
    }).autocomplete("instance")._renderItem = function(ul, item) {
      return $("<li></li>")
        .data("item.autocomplete", item)
        .append("<a href='/details/" + item.movieId + "'>" + "<img src=\"" +`${image_url}/`+item.image  + "\" style=\"width:5%;\" /><br />" + item.title + "</a>")
        .appendTo(ul);
    };
  });