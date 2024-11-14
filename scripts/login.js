document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();
    
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    fetch("./../server/login.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            window.location.href = `${data.redirect}?username=${encodeURIComponent(data.username)}&user_id=${data.user_id}`;
        } else {
            document.getElementById("response").innerText = data.message;
        }
    })
    .catch(error => {
        document.getElementById("response").innerText = "An error occurred. Please try again.";
    });
});