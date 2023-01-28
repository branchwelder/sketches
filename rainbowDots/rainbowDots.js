const circleOffset = 20;
const minSize = 5;
const maxSize = 20;

function setup() {
  createCanvas(windowWidth, windowHeight); // Make a canvas the size of our window
  colorMode(HSB); // Try commenting this line out to switch back to RGB mode!
  noStroke(); // Draw our circles without a stroke
}

function draw() {
  clear();
  background(0);

  for (let yPos = 0; yPos < windowHeight; yPos += circleOffset) {
    for (let xPos = 0; xPos < windowWidth; xPos += circleOffset) {
      // Get the distance from the mouse x and y to the current circle position
      let mouseDist = dist(mouseX, mouseY, xPos, yPos);

      // Make the circle's hue depend on the distance to the mouse: map
      // the current distance so it falls between the min/max hue
      let currentHue = map(mouseDist, 0, windowWidth, 0, 360);

      // Make the circle's size depend on the distance to the mouse: map
      // the current distance so it falls between the max/min circle size
      let circleSize = map(mouseDist, 0, windowWidth, maxSize, minSize);

      // Set our fill color to the current hue
      fill(currentHue, 30, 90);
      circle(xPos, yPos, circleSize); // Draw the circle!
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
