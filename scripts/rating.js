// script.js
const stars = document.querySelectorAll('.star');
const ratingValue = document.getElementById('rating-value');
let selectedRating = 0;

stars.forEach(star => {
    star.addEventListener('mouseover', function() {
        resetStars();
        highlightStars(this.dataset.value);
    });

    star.addEventListener('click', function() {
        selectedRating = this.dataset.value;
        highlightStars(selectedRating);
        ratingValue.textContent = `Rating: ${selectedRating}`;
        
    });

    star.addEventListener('mouseout', function() {
        resetStars();
        if (selectedRating) highlightStars(selectedRating);
    });
});

function resetStars() {
    stars.forEach(star => star.classList.remove('selected'));
}

function highlightStars(count) {
    for (let i = 0; i < count; i++) {
        stars[i].classList.add('selected');
    }
}


