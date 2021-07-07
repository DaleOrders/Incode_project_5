//for key and url 
const api_key = '15c2759fb6b0cbc335f8f0632d652dc9'
const tmdb_base_url = ' https://api.themoviedb.org/3'
const api_query = `?api_key=${api_key}`
const movieId = $('#movieId').val()
const image_url = ' https://image.tmdb.org/t/p/w500'

//make request for a movie and its video
$.getJSON(`${tmdb_base_url}/movie/${movieId}${api_query}&append_to_response=videos`, function(data) {
    
    const video = data.videos.results[0]
    //get youtube key and append to youtube with autoplay and mute option
    const youtubeKey = video.key
    const videoSrc = "https://www.youtube.com/embed/" + youtubeKey + "?autoplay=1&mute=1" 
    const posterImage = data.poster_path
    const movieTitle = data.original_title
    const releaseDate = data.release_date
    const d = new Date(releaseDate);
    const genre = data.genres[0].name
    //put content to html page
    $('#genre').text(genre)
    $('#movietext').text(movieTitle+ " (" + d.getFullYear()+")")
    const posterContent = $("<div>").append(`<img src="${image_url}/${posterImage}">`)
    const overviewContent = $('#overview').text(data.overview)
    $("#poster").append(posterContent)
    $("iframe").attr('src', videoSrc)
})