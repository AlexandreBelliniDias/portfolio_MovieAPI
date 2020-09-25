
const searchElement = document.querySelector('#search')
const inputElement = document.querySelector('#inputValue')
const movieSearch = document.querySelector('#searchResult')
const modal = document.querySelector('#test')

const endpoint = 'https://api.themoviedb.org/3/search/movie/?api_key=61b3b3cf371ec07e8bfd52975b1b5106'
const imgURL = 'https://image.tmdb.org/t/p/w500'

function renderSearch(data){
    movieSearch.innerHTML = '' // clean previous search
    const movieBlock = movieContainer(data.results)
    movieSearch.appendChild(movieBlock)
}

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
}

function newURL (path){
    const url = `https://api.themoviedb.org/3${path}?api_key=61b3b3cf371ec07e8bfd52975b1b5106&language=en-US`
    return url
}


function movieSection(movies){
    return movies.map((movie) => {
        // To avoid display null poster img
        if (movie.poster_path){
            return `
            <div class='img-box'>
                <img src=${imgURL + movie.poster_path}  data-movie-id=${movie.id}/>
                <div data-toggle="modal" data-target="#modalYT" data-movie-id=${movie.id} id='test' class='transparent-box'>
                    <h1 id='movieTitle' data-movie-id=${movie.id}>${movie.title}</h1>
                    <p id='userScore' data-movie-id=${movie.id}>User Score: ${movie.vote_average}</p>
                </div>
            </div>
            
            `
        }
    })
}

function movieContainer(movies) {
    const movieElement = document.createElement('div')
    movieElement.setAttribute('class','movie')

    const template = `
    <section class="section">
        ${movieSection(movies)}
    </section>
    <div class="content">
        <p id="content-close">X</p>
    </div>
    `

    movieElement.innerHTML = template
    return movieElement
}

// Event Delegation
document.onclick = function(event){
    const target = event.target




    if(target.id === 'test' ||target.id === 'movieTitle' ||target.id === 'userScore'){
        const movieID = target.dataset.movieId
        const path = `/movie/${movieID}/videos`
        const videoURL = newURL(path)

        fetch(videoURL)
            .then((res) => res.json())
            .then((data) => {
                const video = data.results[0].key
                console.log(video)
                const newIframe = createIframe(video)
                console.log(newIframe)
                modal.appendChild(newIframe)
            })
            .catch((error) => console.log(error))
        
    }
    
}

function createIframe(video){
    const iframe = document.createElement('iframe')
    iframe.src = `https://www.youtube.com/embed/${video}`
    iframe.className = `embed-responsive-item`
    iframe.allowFullscreen = true
    return iframe
}

// 1:11:20
// 53:23