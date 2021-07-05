const api_key = '15c2759fb6b0cbc335f8f0632d652dc9'
const tmdb_base_url = ' https://api.themoviedb.org/3'
const api_query = `?api_key=${api_key}`
const image_url = ' https://image.tmdb.org/t/p/w500'// dynamically add 20 most popular movie posters to #movies
$.getJSON(`${tmdb_base_url}/movie/550${api_query}&append_to_response=videos`, function(data) {
    console.log(data)
    console.log(data.videos.results[0])
    const video = data.videos.results[0]
    const youtubeKey = video.key
    const videoSrc = "https://www.youtube.com/embed/" + youtubeKey + "?autoplay=1&mute=1" 
    const posterImage = data.poster_path
    const posterContent = $("<div>").append(`<img src="${image_url}/${posterImage}">`)
    const overviewContent = $('#overview').text(data.overview)
    $("#poster").append(posterContent)
    $("iframe").attr('src', videoSrc)
/* data.results.forEach(movie => {
const posterImage = movie.poster_path
const movieEntry = $("<div>").append(`<img src="${image_url}/6RGiA5BfhelU9zoD0b1GAG4GWWf.jpg">`)
$("#poster").append(movieEntry)
}) */



})