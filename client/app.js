{
  'use strict';

  const loginForm = document.getElementById('welcome-form');
  const messagesSection = document.getElementById('messages-section');
  const messagesList = document.getElementById('messages-list');
  const addMessageForm = document.getElementById('add-messages-form');
  const userNameInput = document.getElementById('username');
  const messageContentInput = document.getElementById('message-content');

  const userName = userNameInput;

  console.log(userName);

  loginForm.addEventListener('submit', login);

  function login(event) {
    event.preventDefault();
    
    if(userNameInput){
      userName = userNameInput;
      messagesSection.classList.add('show');
      loginForm.classList.remove('show');
    }
    else alert();
  }

  addMessageForm.addEventListener('submit', sendMessage);

  function sendMessage(event) {
    event.preventDefault();
    if(messageContentInput) {
      addMessageForm(userName, messageContentInput.value);
      // clear this text field
    } 
    else alert();
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