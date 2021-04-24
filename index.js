//Declare Variables
const MOVIES_URL = 'https://api.themoviedb.org/3/movie/popular?api_key=f3f08c027c288ebf1a09b168451ce353&language=en-US&page=1';

const form = document.querySelector('form');
form.id = 'form'
const searchQuery =  document.querySelector('input').value;


const main = document.querySelector('#main');



class Movie {
  constructor(movie) {
    this.card = document.createElement('div');
    const posterContainer = document.createElement('div');
    posterContainer.className = 'poster-container'
    const img =  document.createElement('img');
    img.src = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
    img.alt = `poster_of_{movie.title}`;
    img.className = 'poster';
    img.style.height = '200px';
    posterContainer.append(img);
    const movieTitleAndOverview = document.createElement('div');
    movieTitleAndOverview.className = 'title-overview-wrapper'
    const movieTitle = document.createElement('h3');
    movieTitle.textContent = movie.title;
    movieTitle.className = 'movie-title'
    movieTitleAndOverview.append(movieTitle);
    const movieOverview = document.createElement('p');
    movieOverview.className = 'para'
    movieOverview.textContent = truncate(movie.overview);    
    movieTitleAndOverview.append(movieOverview);
    const readMoreLink = document.createElement('p');
    readMoreLink.innerHTML = '<a href="#" class="read-more-link ">READ MORE</a>';
    movieTitleAndOverview.append(readMoreLink);
    

    
    this.card.append(posterContainer);
    this.card.append(movieTitleAndOverview);
    this.card.className = 'flex-item';
  } 
}


const fetchApi = async (url) => {
  try {
    const request = await fetch(url);
    return request.json();
      
  }catch(error) {
    throw new Error(error.message);
  }
}

fetchApi(MOVIES_URL)
  .then(data => {
  console.log(data.results);
  data.results.forEach(movie => {
    let newMovie = new Movie(movie);
    main.append(newMovie.card)
    })
  })
  .catch(err => {
    const para = document.createElement('p');
    para.textContent = err.message;
    para.style.textAlign = 'center';
    para.style.color = 'white';
    main.append(para)
  })



const truncate = (str) => {
  const arr = str.split(' ');
  return arr.slice(0, 15).join(' ') + '...'
}