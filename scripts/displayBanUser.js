const fetchUsers = async () => {
    try {
        const response = await axios.get('http://localhost/test/server/getUsers.php');
        const users = response.data;
        const userList = document.getElementById('user-list');
        userList.innerHTML = '';

        users.forEach(user => {
            const userDiv = document.createElement('div');
            userDiv.innerHTML = `
                <p>${user.username} - Status: ${user.status} 
                ${user.status=== "active" ? `<button onclick="banUser(${user.id})">Ban</button>` : ''}
                </p>
            `;
            userList.appendChild(userDiv);
        });
    } catch (error) {
        console.error('Error fetching users:', error);
    }
};


const banUser = async (userId) => {
    try {
        const response = await axios.post('http://localhost/test/server/banUser.php', { user_id: userId });
        alert(response.data.message);
        fetchUsers(); 
    } catch (error) {
        console.error('Error banning user:', error);
    }
};


window.addEventListener('load', fetchUsers);