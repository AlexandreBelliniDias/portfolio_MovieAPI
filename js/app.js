
const searchElement = document.querySelector('#search')
const inputElement = document.querySelector('#inputValue')
const movieSearch = document.querySelector('#searchResult')

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
    const url = endpoint + '&query=' + input
    
    fetch(url)
        .then((res) => res.json())
        .then(renderSearch)
        .catch((error) => console.log(error))


    inputElement.value = '' //clean previous search
}

function movieSection(movies){
    return movies.map((movie) => {
        // To avoid display null poster img
        if (movie.poster_path){
            console.log(movie.id)
            return `
            <div class='img-box'>
                <img src=${imgURL + movie.poster_path}  data-movie-id=${movie.id}/>
                <div data-toggle="modal" data-target="#modalYT" class='transparent-box'>
                    <h1 id='movieTitle'>${movie.title}</h1>
                    <p id='userScore'>User Score: ${movie.vote_average}</p>
                    <p id='movieID'>Movie ID: ${movie.id}</p>
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

// event delegation
document.onclick = function(event){
    const target = event.target;

    if(target.id === 'btn'){
        console.log('hi')
    }

}


// https://api.themoviedb.org/3/movie/49453/videos?api_key=61b3b3cf371ec07e8bfd52975b1b5106&language=en-US