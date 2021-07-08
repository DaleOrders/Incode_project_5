

<script type="module" src="../../database.js"></script>



const api_key = '78e561bb82b175c2b8721122491f631b'
const tmdb_base_url = 'https://api.themoviedb.org/3'
const api_query = `?api_key=${api_key}`
const image_url = ' https://image.tmdb.org/t/p/w92'

const popular=document.getElementById('popular')
const top_rated=document.getElementById('top_rated')
const upcoming=document.getElementById('upcoming')

popular.addEventListener("click", function(){ 
$.getJSON(`${tmdb_base_url}/discover/movie${api_query}`)
    .then(data => {
        $('.movies').empty()
        data.results.forEach(movie => {
            db.any('SELECT rating FROM ratings WHERE movie_id=$1;', movie.id)
                .then((rating)=>{
                    const score=0
                    for(let i=0; i<rating.length;i++){
                        score+=rating[i]
                    }
                    const average_rate=(score/(rating.length))
                    return average_rate
                })
                .catch((err)=>{
                    console.log(err)
                })
            const posterImage = movie.poster_path
            const title = movie.title
            const movieEntry = $("<div class='card'>").append(`<img class="poster" src="${image_url}${posterImage}"> <h3 class="title">${title}</h3><h3 class="rating">${average_rate}</h3>`)
            $(".movies").append(movieEntry)
        })

    })
    .catch(err => {
        console.log(err.responseJSON.status_message)
        $(".movies").append("<div>Could not retrieve movies</div>")
    })

});


top_rated.addEventListener("click", function(){ 

    $.getJSON(`${tmdb_base_url}/movie/top_rated${api_query}`)
        .then(data => {
            $('.movies').empty()
            data.results.forEach(movie => {
                const posterImage = movie.poster_path
                const title = movie.title
                const movieEntry = $("<div class='card'>").append(`<img src="${image_url}${posterImage}"> <h3 class="title">${title}</h3>`)
                $(".movies").append(movieEntry)
            })
    
        })
        .catch(err => {
            console.log(err.responseJSON.status_message)
            $(".movies").append("<div>Could not retrieve movies</div>")
        })
    
});

upcoming.addEventListener("click", function(){ 

    $.getJSON(`${tmdb_base_url}/movie/latest${api_query}`)
        .then(data => {
            $('.movies').empty()
            data.results.forEach(movie => {
                const posterImage = movie.poster_path
                const title = movie.title
                const movieEntry = $("<div class='card'>").append(`<img src="${image_url}${posterImage}"> <h3 class="title">${title}</h3>`)
                $(".movies").append(movieEntry)
            })
    
        })
        .catch(err => {
            console.log(err.responseJSON.status_message)
            $(".movies").append("<div>Could not retrieve movies</div>")
        })
    
});
    
const modal = document.getElementById("myModal");

// Get the button that opens the modal
const poster = document.getElementsByClassName("poster");

// Get the <span> element that closes the modal
const span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
poster.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}


                // $.getJSON(`https://api.themoviedb.org/3/genre/movie/list?api_key=78e561bb82b175c2b8721122491f631b`)
            //     .then(data => {
            //         data.forEach(item => {
            //             if (item.genres.id === id) {
            //                 const movieGenre = $(".card").append(`<h5 class="genre">${item.genres.name}</h5>`)
            //             }
            //             else {
            //                 const movieGenre = $(".card").append("")
            //             }
            //         })
            //     })
            //     .catch(err => {
            //         console.log(err)
            //     })


           // $(".movies").append(movieEntry)
            //$(".movies").append(movieGenre)


