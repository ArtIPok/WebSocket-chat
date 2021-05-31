const express = require('express');
const path = require('path');
const socket = require('socket.io');

const app = express();

const messages = [];
const users = [];

const server = app.listen(8000, () => {
  console.log('Server is running on Port:', 8000)
});
const io = socket(server);

io.on('connection', (socket) => {
  console.log('New client! Its id – ' + socket.id);

  socket.on('join', (userName) => {
    let id = socket.id;
    let name = userName;

    console.log(`${name} has joined the conversation!`);
    users.push({id, name});
    console.log(users);
    socket.broadcast.emit('join', name);
  });

  socket.on('message', (message) => {
    console.log('Oh, I\'ve got something from ' + socket.id);
    messages.push(message);
    socket.broadcast.emit('message', message);
  });
  socket.on('disconnect', () => { 
    const indexOfUser = users.indexOf(socket.id);
    const { name } = users.find(users => users.id === socket.id);
    
    console.log('Oh, socket ' + socket.id + ' has left');
    
    users.splice(indexOfUser, 1);
    console.log(users);
    socket.broadcast.emit('removeUser', name);
  });
  console.log('I\'ve added a listener on message and disconnect events \n');
});

app.use(express.static(path.join(__dirname, '/client')));

app.get('/', (req, res) => {
  res.render('index.html');
});

app.get('/style.css', (req, res) => {
  res.sendFile(path.join(__dirname, '/style.css'));
});

app.get('/app.js', (req, res) => {
  res.sendFile(path.join(__dirname, '/app.js'));
});

app.use((req, res) => {
  res.status(404).send('404 not found...');
})
