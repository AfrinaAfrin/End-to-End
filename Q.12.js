 

const API_KEY = 'api_key';  
const API_URL = 'http://www.omdbapi.com/';

 
function debounce(func, delay) {
    let timeout;
    return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), delay);
    };
}

 
async function fetchMovies(query) {
    if (!query) return [];
    const response = await fetch(`${API_URL}?s=${query}&apikey=${API_KEY}`);
    const data = await response.json();
    return data.Search || [];
}

 
async function fetchMovieDetails(imdbID) {
    const response = await fetch(`${API_URL}?i=${imdbID}&apikey=${API_KEY}`);
    return await response.json();
}

 
function updateMovieList(movies) {
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = '';

    movies.forEach((movie) => {
        const movieItem = document.createElement('div');
        movieItem.className = 'movie-item';
        movieItem.textContent = movie.Title;
        movieItem.addEventListener('click', async () => {
            const movieDetails = await fetchMovieDetails(movie.imdbID);
            displayMovieDetails(movieDetails);
        });
        resultsContainer.appendChild(movieItem);
    });
}

 
function displayMovieDetails(details) {
    const detailsContainer = document.getElementById('movie-details');
    detailsContainer.innerHTML = `
        <h2>${details.Title}</h2>
        <p><strong>Year:</strong> ${details.Year}</p>
        <p><strong>Genre:</strong> ${details.Genre}</p>
        <p><strong>Plot:</strong> ${details.Plot}</p>
        <img src="${details.Poster}" alt="${details.Title} Poster" />
    `;
}

 
const handleSearch = debounce(async (event) => {
    const query = event.target.value.trim();
    const movies = await fetchMovies(query);
    updateMovieList(movies);
}, 300);

 
function setupMovieSearchApp() {
    const searchInput = document.getElementById('search-input');
    searchInput.addEventListener('input', handleSearch);
}

 
document.addEventListener('DOMContentLoaded', setupMovieSearchApp);
