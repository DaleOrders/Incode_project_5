document.addEventListener("DOMContentLoaded", () => {
const ratingStars = [...document.getElementsByClassName("rating__star")];
const ratingResult = document.querySelector(".rating__result");

//printRatingResult(ratingResult);

function executeRating(stars, result) {
   //get stars
   const starClassActive = "rating__star fas fa-star";
   const starClassUnactive = "rating__star far fa-star";
   const starsLength = stars.length;
   let i;
   //map and add click event
   stars.map((star) => {
      star.onclick = () => {
         //get rating and highlight star
         i = stars.indexOf(star);
         if (star.className.indexOf(starClassUnactive) !== -1) {

            makeRequest(result, i + 1);
            for (i; i >= 0; --i) stars[i].className = starClassActive;
         } else {
            
            makeRequest(result, i);
            for (i; i < starsLength; ++i) stars[i].className = starClassUnactive;
         }
      };
   });
}

function makeRequest(result, num = 0) {

    $.ajax({
      type: "POST",
      url: "/details",
      data: { rating: num},
      success: function(data) {
      // send alert message when success   
      $("#alert").removeClass()
      $('#alert').addClass("alert alert-success")
      $('#alert').text(data.message)
      window.scrollBy(0, -window.innerHeight)
     },
      error: function(data) {
      // send alert message when error      
      $("#alert").removeClass()
      $('#alert').addClass("alert alert-danger")
      $('#alert').text(data.message)
      window.scrollBy(0, -window.innerHeight)   
      },
      dataType: "json"
    });

   
}

executeRating(ratingStars, ratingResult);
})