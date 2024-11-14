document.getElementById("registrationForm").addEventListener("submit", function(event) {
    event.preventDefault();
    
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    
    if (password !== confirmPassword) {
        document.getElementById("response").innerText = "Passwords do not match!";
        return;
    }

    fetch("./../server/register.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById("response").innerText = data.message;
        
    })
    .catch(error => {
        document.getElementById("response").innerText = "An error occurred. Please try again.";
    });
});
