let lineGap = 30;
let offset = 5;

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background("#2f343f");
  stroke("white");

  for (let offset = mouseX; offset < width; offset += lineGap) {
    line(offset, 0, width, offset);
    line(width, offset, width - offset, height);
    line(width - offset, height, 0, height - offset);
    line(0, height - offset, offset, 0);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
