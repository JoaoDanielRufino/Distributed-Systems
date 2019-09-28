const express = require('express');
const cors = require('cors');
const fs = require('fs');

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

app.use(express.json());
app.use(cors());

io.on('connection', socket => {
  console.log('Connection');

  if(fs.existsSync('DrawPixels/data.json')) {
    const pixels = fs.readFileSync('DrawPixels/data.json');
    socket.emit('update data', { image: JSON.parse(pixels) });
  }

  socket.on('draw', data => {
    socket.broadcast.emit('update data', { image: data.data });
  });

  socket.on('save', data => {
    //console.log(data);
    fs.writeFile('DrawPixels/data.json', JSON.stringify(data.data), (err) => {
      if(err)
        console.log(err);
    });
  });

  socket.on('disconnect', () =>{
    console.log('Disconnection');
  });
});


server.listen(3333, () => {
  console.log('Server on port 3333');
});