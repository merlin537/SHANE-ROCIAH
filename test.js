let currentUser = null;

function login() {
    let username = document.getElementById("username").value.trim();
    let password = document.getElementById("password").value.trim();

    // Normalize input to prevent case sensitivity issues
    username = username.charAt(0).toUpperCase() + username.slice(1).toLowerCase();

    if ((username === "Rociah" && password === "red") || (username === "Merlin" && password === "pink")) {
        currentUser = username;
        document.getElementById("loginBox").style.display = "none";
        document.getElementById("messageBox").style.display = "block";
        document.getElementById("chatBox").style.display = "flex";
        displayMessages();
        setInterval(displayMessages, 2000); // Refresh messages every 2 seconds
    } else {
        alert("Invalid username or password!"); // Shows error if login fails
    }
}

function sendMessage() {
    if (!currentUser) return;
    let input = document.getElementById("messageInput");
    let message = input.value.trim();
    if (message === "") return;
    
    let messages = JSON.parse(localStorage.getItem("messages")) || [];
    let time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    messages.push({ sender: currentUser, text: message, time });
    localStorage.setItem("messages", JSON.stringify(messages));
    
    displayMessages();
    input.value = "";
}

function deleteMessage(index) {
    let messages = JSON.parse(localStorage.getItem("messages")) || [];
    if (messages[index].sender === currentUser) {
        let deleteOption = prompt("Delete for: (1) Yourself, (2) Everyone");

        if (deleteOption === "1") {
            messages[index].text = "[Message deleted by user]";
        } else if (deleteOption === "2") {
            messages.splice(index, 1);
        }

        localStorage.setItem("messages", JSON.stringify(messages));
        displayMessages();
    } else {
        alert("You can only delete your own messages!");
    }
}

function displayMessages() {
    let messages = JSON.parse(localStorage.getItem("messages")) || [];
    let messageBox = document.getElementById("messageBox");
    messageBox.innerHTML = messages.map((msg, index) => 
        `<div class='message'>
            <div class='profile-pic'></div>
            <div class='message-content'>
                <strong>${msg.sender}</strong> <br>
                ${msg.text}
                <div class='message-time'>${msg.time}</div>
            </div>
            ${msg.sender === currentUser ? `<button class='delete-btn' onclick='deleteMessage(${index})'>🗑</button>` : ''}
        </div>`
    ).join('');
}
