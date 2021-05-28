{
  'use strict';

  const loginForm = document.getElementById('welcome-form');
  const messagesSection = document.getElementById('messages-section');
  const messagesList = document.getElementById('messages-list');
  const addMessageForm = document.getElementById('add-messages-form');
  const userNameInput = document.getElementById('username');
  const messageContentInput = document.getElementById('message-content');

  let userName = '';

  const socket = io();

  socket.on('message', ({ author, content }) => {
    addMessage(author, content);
  });

  loginForm.addEventListener('submit', login);

  function login(event) {
    event.preventDefault();
    
    let userName = userNameInput.value;

    if(userName.length) {
      messagesSection.classList.add('show');
      loginForm.classList.remove('show');  
    }
    else alert('You must enter your login');
  }

  addMessageForm.addEventListener('submit', sendMessage);

  function sendMessage(event) {
    event.preventDefault();

    let messageContent = messageContentInput.value

    if(messageContent.length) {
      addMessage(userName, messageContent);
      socket.emit('message', { author: userName, content: messageContent });
      messageContent = '';
    } 
    else alert('You have to type something');
  }

  function addMessage(author, content) {
    const message = document.createElement('li');
    message.classList.add('message');
    message.classList.add('message--received');
    if(author === userName) message.classList.add('message--self');
    message.innerHTML = `
      <h3 class='message__author'>${userName === author ? 'You' : author }</h3>
      <div class='message__content'>
        ${content}
      </div>
    `;
    messagesList.appendChild(message);
  }

}