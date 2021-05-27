const express = require('express');
const path = require('path');

const app = express();

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
    res.render('contact', { name: file.name, isSent: true });
  }
  else {
    res.render('contact', { isError: true });
  }
});

app.use((req, res) => {
  res.status(404).send('404 not found...');
})

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});