const image_url = " https://image.tmdb.org/t/p/w500";
$(function () {
  $("#findMovie")
    .autocomplete({
      source: function (request, response) {
        $.ajax({
          url:
            "https://api.themoviedb.org/3/search/movie?api_key=15c2759fb6b0cbc335f8f0632d652dc9&query=" +
            request.term,
          dataType: "json",
          data: {
            term: request.term,
          },
          success: function (data) {
            console.log(data);
            var transformed = data.results.map(function (movie) {
              return {
                title: movie.original_title,
                image: movie.poster_path,
                movieId: movie.id,
              };
            });
            response(transformed);
          },
        });
      },
    })
    .autocomplete("instance")._renderItem = function (ul, item) {
    return $("<li></li>")
      .data("item.autocomplete", item)
      .append(
        "<a href='/details/" +
          item.movieId +
          "'>" +
          '<img src="' +
          `${image_url}/` +
          item.image +
          '" style="width:5%;" /><br />' +
          item.title +
          "</a>"
      )
      .appendTo(ul);
  };
});

//search by genre
$.getJSON(
  "https://api.themoviedb.org/3/genre/movie/list?api_key=15c2759fb6b0cbc335f8f0632d652dc9&language=en-US",
  function (data) {
    data.genres.forEach((genre) => {
      const id = genre.id;
      const name = genre.name;
      $("#genreDropdown").append(`<a id="${id}" href="#${name}">${name}</a>`);
      $(`#${id}`).attr("onClick", "getMovieByGenre(this);");
    });
  }
);

$("#genreBtn").click(function () {
  document.getElementById("genreDropdown").classList.toggle("show");
});

let getMovieByGenre = (genre) => {
  let genreId = genre.id
  $.getJSON(
    `https://api.themoviedb.org/3/discover/movie?api_key=15c2759fb6b0cbc335f8f0632d652dc9&with_genres=${genreId}&sort_by=popularity.desc`,
    function (data) {
      data.results.forEach((genre) => {
        console.log(genre.original_title)
      });
    }
  );
};


$("#genreSearch").keyup(function () {
  let input, filter, ul, li, a, i;
  input = document.getElementById("genreSearch");
  filter = input.value.toUpperCase();
  div = document.getElementById("genreDropdown");
  a = div.getElementsByTagName("a");
  for (i = 0; i < a.length; i++) {
    txtValue = a[i].textContent || a[i].innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      a[i].style.display = "";
    } else {
      a[i].style.display = "none";
    }
  }
});
