{
  'use strict';

  const loginForm = document.getElementById('welcome-form');
  const messagesSection = document.getElementById('messages-section');
  const messagesList = document.getElementById('messages-list');
  const addMessageForm = document.getElementById('add-messages-form');
  const userNameInput = document.getElementById('username');
  const messageContentInput = document.getElementById('message-content');

  let userName = '';

  loginForm.addEventListener('submit', login);

  function login(event) {
    event.preventDefault();
    
    userName = userNameInput.value;

    if(userName){
      messagesSection.classList.add('show');
      loginForm.classList.remove('show');
    }
    else alert('You must enter your login');
  }

  addMessageForm.addEventListener('submit', sendMessage);

  function sendMessage(event) {
    event.preventDefault();

    if(messageContentInput.value) {
      addMessage(userName, messageContentInput.value);
      messageContentInput.value = '';
    } 
    else alert('You must write message');
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