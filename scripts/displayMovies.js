const getUserIdFromUrl = () => {
    const params = new URLSearchParams(window.location.search);
    return params.get('user_id');
};
const fetchMovies = async () => {
    try {
        const response = await axios.get('http://localhost/test/server/displayMovies.php')
        const movies = response.data;
        displayMovies(movies);
    } catch (error) {
        console.error('Error fetching movies:', error);
    }
};

const displayMovies = (movies) => {
    const container = document.getElementById('movies-container');
    container.innerHTML = ''; 
    const userId = getUserIdFromUrl();

    movies.forEach((movie) => {
        const movieCard = document.createElement('div');
        movieCard.classList.add('movie-card');

        movieCard.innerHTML = `
            <img src="${movie.image_url}" alt="${movie.title}">
            <h2>${movie.title}</h2>
             `;
        movieCard.addEventListener('click', () => {
            window.location.href = `movieDetails.html?movie_id=${movie.id}&user_id=${userId}`;
        });
        container.appendChild(movieCard);


    });
};

window.addEventListener('load', fetchMovies);
