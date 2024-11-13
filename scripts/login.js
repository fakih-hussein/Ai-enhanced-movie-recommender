const loginForm = document.getElementById('login-form');
console.log(loginForm);
loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const email = document.getElementById('email').value;
    console.log(email)
    const password = document.getElementById('password').value;

    if (!email || !password) {
        return;
    }

    try {
        const response = await fetch('./server/login.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })

        });

        const result = await response.json();
        if (result.sucess){
            window.location.href='chatbot.html'
        }else{
            alert(result.message);
        }


    } catch(error){
        console.error('error:',error);
        alert('An error occureed.Please try again')

    }


});

