document.getElementById('sendbtn').addEventListener('click',function(){
    const UserInput=document.getElementById('userInput').ariaValueMax;
    if (UserInput.trim() !==""){

    }
})




function appendMessage(sender, message) {
    const chatBox = document.getElementById('chatBox');
    const msgDiv = document.createElement('div');
    msgDiv.className = 'chat-message ' + (sender === 'user' ? 'user-message' : 'bot-message');
    msgDiv.textContent = message;
    chatBox.appendChild(msgDiv);
    chatBox.scrollTop = chatBox.scrollHeight; 
}