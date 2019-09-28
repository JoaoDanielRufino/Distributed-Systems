let socket;

let data;

let resetButton;
let loadDataButton;
let saveButton;

function setup() {
  createCanvas(640, 400).parent('container');
  background(255);

  data = [];

  socket = io('http://localhost:3333');

  socket.on('update data', res => {
    res.image.forEach(({ mouseX, mouseY, pmouseX, pmouseY }) => {
      line(mouseX, mouseY, pmouseX, pmouseY);
    });
    data = res.image;
  });

  saveButton = document.getElementById('saveButton');
  saveButton.addEventListener('click', () => {
    socket.emit('save', { data });
  });

  resetButton = document.getElementById('resetButton');
  resetButton.addEventListener('click', () => {
    background(255);
    data = [];
  });
}

function draw() {
  stroke(0);
  strokeWeight(2);
  if (mouseIsPressed) {
    line(mouseX, mouseY, pmouseX, pmouseY);
    data.push({
      mouseX,
      mouseY,
      pmouseX,
      pmouseY
    });
    socket.emit('draw', { data });
  }
}