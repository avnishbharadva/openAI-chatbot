const chatBox = document.querySelector('.chat-box')
const inputField = document.querySelector('input[type="text"]')
const button = document.querySelector('button')
const chatBoxBody = document.querySelector('.chat-box-body')

const sendMessage = () => {
    const message = inputField.value
    // console.log(msg)
    inputField.value = ''
    chatBoxBody.innerHTML += `<div class="message">${message}</div>`
    scrollToBottom()

    fetch('http://localhost:3000/message', {
        method: 'POST',
        headers: {
            accept: 'application.json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message })
    }).then(response => {
        return response.json();
    }).then(data => {
        // document.getElementById("loading").remove();
        chatBoxBody.innerHTML += `<div class="response"><p>${data.message}</p></div>`;
        scrollToBottom();
    })
}

const scrollToBottom = () => {
    chatBoxBody.scrollTop = chatBoxBody.scrollHeight;
}

button.addEventListener('click', sendMessage)
inputField.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        sendMessage()
    }
})