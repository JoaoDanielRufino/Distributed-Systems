const express = require('express');

const app = express();

app.use(express.static(__dirname + '/public'));

app.get('/room', (req, res) => {
  res.sendFile(__dirname + '/views/room.html');
});

app.listen(3000, () => {
  console.log('Client on port 3000');
});