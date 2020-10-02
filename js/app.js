
const searchElement = document.querySelector('#search')
const inputElement = document.querySelector('#inputValue')

// Modal info
const iframe = document.querySelector('#iframe')
const title = document.querySelector('#title')
const overview = document.querySelector('#overview')
const genre = document.querySelector('#genre')
const release_date = document.querySelector(`#release_date`)
const vote_average = document.querySelector(`#vote_average`)

// Movie sections
const movieSearch = document.querySelector('#searchResult')
const upcoming = document.querySelector(`#upcoming`)
const popular = document.querySelector(`#popular`)
const topRated = document.querySelector(`#topRated`)
const trending = document.querySelector(`#trending`)

const movieDiv = document.getElementsByClassName('movie')

const endpoint = 'https://api.themoviedb.org/3/search/movie/?api_key=61b3b3cf371ec07e8bfd52975b1b5106'
const imgURL = 'https://image.tmdb.org/t/p/w500'

searchElement.onclick = function(event){
    event.preventDefault()
    const input = inputElement.value
    const path = '/search/movie'
    const url = newURL(path) + '&query=' + input
    
    fetch(url)
        .then((res) => res.json())
        .then(renderSearch)
        .catch((error) => console.log(error))

    inputElement.value = '' //clean previous search
    document.getElementById('sRb').style.display = 'inline'
    document.getElementById('sLb').style.display = 'inline'
}

function renderSearch(data){
    movieSearch.innerHTML = '' // clean previous search
    movieSearch.innerHTML = movieSection(data.results)
}

function movieContainer(movies) {
    const movieElement = document.createElement('div')
    movieElement.setAttribute('class','movie')
    movieElement.innerHTML = movieSection(movies)
    return movieElement
}

function movieSection(movies){
    return movies.map((movie) => {
        // To avoid display null poster img
        if (movie.poster_path){
            return `
            <div class='img-box'>
                <img src=${imgURL + movie.poster_path}  data-movie-id=${movie.id}/>
                <div data-toggle="modal" data-target="#modalYT" data-movie-id=${movie.id} id='modal' class='transparent-box'></div>
            </div>
            `
        }
    })
}

function newURL (path){
    const url = `https://api.themoviedb.org/3${path}?api_key=61b3b3cf371ec07e8bfd52975b1b5106&language=en-US`
    return url
}

// Event Delegation
document.onclick = function(event){
    const target = event.target
    if(target.id === 'modal'){
        const movieID = target.dataset.movieId
        const pathVideos = `/movie/${movieID}/videos`
        const pathDetails = `/movie/${movieID}`
        const videoURL = newURL(pathVideos)
        const detailsURL = newURL(pathDetails)
        iframe.src=''
        title.innerHTML=''
        overview.innerHTML=''
        genre.innerHTML=''
        release_date.innerHTML=''
        vote_average.innerHTML=''

        fetch(videoURL)
            .then((res) => res.json())
            .then((data) => {
                
                const video = data.results[0].key
                iframe.src = `https://www.youtube.com/embed/${video}`
            })
            .catch((error) => console.log(error))

        fetch(detailsURL)
            .then((res) => res.json())
            .then((data) => {
                title.innerHTML = data.original_title
                overview.innerHTML = data.overview
                genre.innerHTML = data.genres[0].name + '  ' + data.genres[1].name + '  ' + data.genres[2].name
                release_date.innerHTML = 'Release Date: ' + data.release_date
                vote_average.innerHTML = 'User score: ' + data.vote_average
            })
            .catch((error) => console.log(error))
    }
    
}


function movieSections(path, element){
    const url = newURL(path)
    fetch(url)
        .then((res) => res.json())
        .then((data) =>{
            const movieBlock = movieContainer(data.results)
            element.appendChild(movieBlock)
        })
        .catch((error) => console.log(error))
}

movieSections('/movie/popular', popular)
movieSections('/movie/upcoming', upcoming)
movieSections('/movie/top_rated', topRated)
movieSections('/trending/movie/week', trending)

function returnTop(){
    document.documentElement.scrollTop = 0;
}

function hScroll(array,scrollValue){
    movieDiv[array].scrollLeft += scrollValue;
}


// Change iframe background or display none when theres no video

// Problem: error when search for nothing and give some answer

// Add: Display text when seach doesn't find any results

// style scroll buttons

// finish style

// add mediaquery for navbar and change movie overflow-x:auto to allow scroll with touch