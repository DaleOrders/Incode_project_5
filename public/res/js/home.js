
$.getJSON(
    `https://api.themoviedb.org/3/discover/movie?api_key=15c2759fb6b0cbc335f8f0632d652dc9&sort_by=popularity.desc`,
     function (data) {
      $(".Moviegrid").empty();
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