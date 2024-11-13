document.getElementById('sendBtn').addEventListener('click',function(){
    const UserInput=document.getElementById('userInput').ariaValueMax;
    if (UserInput.trim() !==""){

        appendMessage('user', userInput);
        document.getElementById('userInput').value = '';

        fetch('chatbot.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `query=${encodeURIComponent(userInput)}`
        })
        .then(response => response.json())
        .then(data => {
            appendMessage('bot', data.response);
        })
        .catch(error => {
            console.error('Error:', error);
        });

    }
});

function appendMessage(sender, message) {
    const chatBox = document.getElementById('chatBox');
    const msgDiv = document.createElement('div');
    msgDiv.className = 'chat-message ' + (sender === 'user' ? 'user-message' : 'bot-message');
    msgDiv.textContent = message;
    chatBox.appendChild(msgDiv);
    chatBox.scrollTop = chatBox.scrollHeight; 
}