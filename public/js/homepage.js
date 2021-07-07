const db = require("../../database")

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
                })
                .catch((err)=>{
                    console.log(err)
                })
            const posterImage = movie.poster_path
            const title = movie.title
            const movieEntry = $("<div class='card'>").append(`<img src="${image_url}${posterImage}"> <h3 class="title">${title}</h3><h3 class="rating">${average_rate}</h3>`)
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


