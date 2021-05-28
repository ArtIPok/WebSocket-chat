const express = require('express');
const path = require('path');
const socket = require('socket.io');

const app = express();

const server = app.listen(8000, () => {
  console.log('Server is running on Port:', 8000)
});
const io = socket(server);

io.on('connection', (socket) => {
  console.log('New client! Its id – ' + socket.id);
  socket.on('message', (message) => {
    console.log('Oh, I\'ve got something from ' + socket.id) });
    // messages.push(message);
    // socket.broadcast.emit('message', message);
  socket.on('disconnect', () => { console.log('Oh, socket ' + socket.id + ' has left') });
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

app.post('/messages', (req, res) => {
  const { author, message } = req.body;

  if(author && message) {
    messages.push({
      author,
      message,
    });
    res.send({message: OK});
    res.render('messages');
  }
  else {
    res.json({ error: 'some data missing' });
  }
});

app.use((req, res) => {
  res.status(404).send('404 not found...');
})

// app.listen(8000, () => {
//   console.log('Server is running on port: 8000');
// });