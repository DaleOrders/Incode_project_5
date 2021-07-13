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

let getMovieByGenre =  async (genre) => {
  $(".Moviegrid").empty();
  document.getElementById("genreDropdown").classList.toggle("show");
  let genreId = genre.id


   $.getJSON(
    `https://api.themoviedb.org/3/discover/movie?api_key=15c2759fb6b0cbc335f8f0632d652dc9&with_genres=${genreId}&sort_by=popularity.desc`,
     function (data) {
      
      let rowBreak = 1
      let startingPoint = 1
      data.results.forEach((genre) => {
        let movieScore = 0
        let movieId = genre.id
        let dataFromServer = getScoreById(movieId)
        var addMovieGrid = dataFromServer.then(function(result) {
           let ratingStars = ""
           movieScore = result
        
        for(let i=0;i<5;i++){
          
          if(movieScore >= 1){
            
            ratingStars += '<i class="rating__star fas fa-star"></i>'
            movieScore-- 
          }else if (movieScore >0 && movieScore <1){
            
            ratingStars += '<i class="rating__star fas fa-star-half-alt "></i>'
            movieScore-- 
          }else{
            
            ratingStars += '<i class="rating__star far fa-star"></i>'
            movieScore--
            
          }
        }
        let  starsDiv = $('<div class="rating">').append(ratingStars)
        let posterImage = genre.poster_path
        let movieTitle = genre.original_title
        const posterContent = $("<div>").append(`<a href="/details/${movieId}"><img src="https://image.tmdb.org/t/p/w500/${posterImage}"></a><div>${movieTitle}</div><h4>Community rating:</h4>`)
        posterContent.append(starsDiv)
        let content = $('<div class="col">').append(posterContent)
        
        if(startingPoint == 8){
          rowBreak = 2
        }
        if(startingPoint == 15){
          rowBreak = 3
        }
        if(rowBreak == 1 )
        {
          if(startingPoint == 1){
            
            $('.Moviegrid').append('<div id="moviecard1" class="moviecard">')
            $('#moviecard1').append('<div id="moviecardRow1" class="row1">')
            $('#moviecardRow1').append(content)
          }else{
            $('#moviecardRow1').append(content)
          } 
        }
        if(rowBreak == 2 )
        {
          if(startingPoint == 8){
            $('.Moviegrid').append('<div id="moviecard2" class="moviecard">')
            $('#moviecard2').append('<div id="moviecardRow2" class="row1">')
            $('#moviecardRow2').append(content)
          }else{
            $('#moviecardRow2').append(content)
          } 
        }
        if(rowBreak == 3 )
        {
          if(startingPoint == 15){
            $('.Moviegrid').append('<div id="moviecard3" class="moviecard">')
            $('#moviecard3').append('<div id="moviecardRow3" class="row1">')
            $('#moviecardRow3').append(content)
          }else{
            $('#moviecardRow3').append(content)
          } 
        }
      startingPoint ++ 
       });
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

async function getScoreById(movieId){
  let data = await fromServer(movieId);
  return data.avgScore
}
function fromServer(movieId){
  return new Promise((resolve, reject) => {
    $.ajax({
      type: "GET",
      url: "/get-star",
      data: { 
         movieId: movieId
      },
      success: function(data) {
        //movieScore = data.avgScore
        resolve(data)
     },
      error: function(data) {
      console.log("Error")  
      },
      dataType: "json"
    });
  })
}
