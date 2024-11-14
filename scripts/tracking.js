
let timeSpent = 0;
const startTime = Date.now();

const sendUserActivity = async () => {
    const timeOnPage = Math.floor((Date.now() - startTime) / 1000); // Time in seconds

    try {
        await axios.post('http://localhost/test/server/trackUserActivity.php', {
            movie_id: movieId,
            user_id: userId,
            time_spent: timeOnPage
        });
    } catch (error) {
        console.error('Error tracking user activity:', error);
    }
};

window.addEventListener('beforeunload', sendUserActivity);