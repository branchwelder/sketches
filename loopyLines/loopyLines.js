let t = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 100);
}

function draw() {
  translate(width / 2, height / 2);
  background("#2f343f");
  stroke("white");

  siz = min(width / 1.2, height / 1.2);
  let lineGap = siz / 15;

  push();
  translate(-siz / 2, -siz / 2);
  for (let coord = 0; coord < siz; coord += lineGap) {
    let offset = (coord + t) % siz;
    let currentHue = map(offset, 0, siz, 0, 100);

    stroke(currentHue, 80, 80);
    fill(currentHue, 80, 80);

    // Draw points and lines to make a square
    drawPoint(offset, 0);
    line(offset, 0, siz, offset);
    drawPoint(siz, offset);
    line(siz, offset, siz - offset, siz);
    drawPoint(siz - offset, siz);
    line(siz - offset, siz, 0, siz - offset);
    drawPoint(0, siz - offset);
    line(0, siz - offset, offset, 0);
  }
  pop();

  t += 1;
}

function drawPoint(px, py, hu) {
  circle(px, py, 5);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
