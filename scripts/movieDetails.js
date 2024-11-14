const getMovieIdFromUrl = () => {
    const params = new URLSearchParams(window.location.search);
    return params.get('movie_id');
};
const getUserIdFromUrl = () => {
    const params = new URLSearchParams(window.location.search);
    return params.get('user_id');
};

const userId = getUserIdFromUrl();
const movieId = getMovieIdFromUrl();

const fetchMovieDetails = async () => {


    if (movieId) {
        try {
            const response = await axios.get(`http://localhost/test/server/getMovieDetails.php?movie_id=${movieId}`);
            const movie = response.data;

            const container = document.getElementById('movie-details-container');
            container.innerHTML = `
                <img src="${movie.image_url}" alt="${movie.title}">
                <h2>${movie.title}</h2>
                <p>${movie.description}</p>
                <p>Duration: ${movie.duration}</p>
                <p>Genre: ${movie.genre}</p>
                <div class="star-rating">
                    <span class="star" data-value="1">&#9733;</span>
                    <span class="star" data-value="2">&#9733;</span>
                    <span class="star" data-value="3">&#9733;</span>
                    <span class="star" data-value="4">&#9733;</span>
                    <span class="star" data-value="5">&#9733;</span>
                </div>
                <p id="rating-value">Rating: 0</p>
            `;
        } catch (error) {
            console.error('Error fetching movie details:', error);
        }
    } else {
        document.getElementById('movie-details-container').innerText = "Movie not found.";
    }
};

const bookmarkMovie = async () => {
    try {
        const response = await axios.post('http://localhost/test/server/bookmarkMovie.php', {
            movie_id: movieId,
            user_id: userId
        });
        alert("already bookmarked");
    } catch (error) {
        console.error('Error bookmarking movie:', error);
        alert("Failed to bookmark the movie. Please try again.");
    }
};

document.getElementById('bookmark-button').addEventListener('click', bookmarkMovie);
window.addEventListener('load', fetchMovieDetails);