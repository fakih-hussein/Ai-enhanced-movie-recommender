const userId = new URLSearchParams(window.location.search).get('user_id');

const fetchRecommendedMovies = async () => {
    try {
        const response = await axios.get(`http://localhost/test/server/getRecommendedMovies.php?user_id=${userId}`);
        const recommendedMovies = response.data;

        const container = document.getElementById('recommended-movies');
        container.innerHTML = '';

        recommendedMovies.forEach(movie => {
            const movieCard = document.createElement('div');
            movieCard.classList.add('movie-card');
            movieCard.innerHTML = `
                <img src="${movie.image_url}" alt="${movie.title}">
                <h3>${movie.title}</h3>
            `;
            movieCard.addEventListener('click', () => {
                window.location.href = `movieDetails.html?movie_id=${movie.id}&user_id=${userId}`;
            });
            container.appendChild(movieCard);
        });
    } catch (error) {
        console.error('Error fetching recommended movies:', error);
    }
};

window.addEventListener('load', fetchRecommendedMovies);
