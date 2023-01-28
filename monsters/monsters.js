const maxDepth = 60;
const centerRadius = 100;
const startNumChildren = 20;
const centerHue = 65;
const jitter = 1.2;
const minRadius = 1;
const skip = 1.4;

let button;

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSL, 100);
  strokeWeight(0.5);
  // button = createButton("regen");
  // button.position(0, 0);
  // button.mousePressed(drawMonster);
  drawMonster();
}

function drawMonster() {
  clear();
  background("#1c1c1c");
  translate(windowWidth / 2, windowHeight / 2);
  growMonster(centerRadius, startNumChildren, startNumChildren, 1);
}

function growMonster(parentR, possibleChildren, numChildren, currentDepth) {
  if (currentDepth == maxDepth) return;

  fill(
    (centerHue + currentDepth * 2) % 100,
    50 + currentDepth / 4,
    45 + currentDepth * 1.3
  );
  circle(0, 0, parentR * 2);

  rotate(random(-jitter, jitter));

  let childR = max(minRadius, childRadius(parentR, possibleChildren));
  let angle = TWO_PI / possibleChildren;
  let initialAngle = -((numChildren / 2) * angle) + angle / 2;
  let skipChance = 1 / (currentDepth * skip); // Chance to skip spawn decreases as depth increases

  for (let i = 0; i < numChildren; i++) {
    if (random() < skipChance) continue;
    push();
    rotate(initialAngle + i * angle);
    translate(0, parentR + childR);

    let possibleGrandchildren = max(6.3, (possibleChildren * childR) / parentR);

    let numGrandChildren = random() < 1 / (currentDepth * 1.5) ? 2 : 1; // less likely to branch as depth increases

    growMonster(
      childR,
      possibleGrandchildren,
      numGrandChildren,
      currentDepth + 1
    );
    pop();
  }
}

function childRadius(parentRadius, numChildren) {
  return (sin(PI / numChildren) / (1 - sin(PI / numChildren))) * parentRadius;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  drawMonster();
}

function draw() {}
