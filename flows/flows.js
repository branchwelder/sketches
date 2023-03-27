// Resources
// https://web.cs.ucdavis.edu/~ma/SIGGRAPH02/course23/notes/papers/Jobard.pdf
// https://tylerxhobbs.com/essays/2020/flow-fields
// https://thecodingtrain.com/challenges/24-perlin-noise-flow-field

let cols, rows, flowField, sampleGrid;

let streamlineQueue = [];
let perlinInc = 0.01;
let cellSize = 15;
let zoff = 0;
let d_sep = 5; // Minimum distance between two adjacent streamlines
let step_length = 4; // length of a step in the streamline, must be smaller than d_step

let isSVG = false;

function setup() {
  background(255);
  if (isSVG) {
    createCanvas(windowWidth, windowHeight, SVG);
    button = createButton("Save SVG");
    button.position(0, 0);
    button.mousePressed(() => save());
  } else {
    createCanvas(windowWidth, windowHeight);
  }
  cols = floor(width / d_sep);
  rows = floor(height / d_sep);
  flowField = new Array(cols * rows);
  sampleGrid = Array.from(Array(rows), () => new Array(cols));
}

function makeFlowField() {
  let yoff = 0;
  for (let y = 0; y < rows; y++) {
    let xoff = 0;
    for (let x = 0; x < cols; x++) {
      let angle = noise(xoff, yoff, zoff) * TWO_PI;
      flowField[x + y * cols] = angle;
      xoff += perlinInc;
    }
    yoff += perlinInc;
  }
}

function drawFlowField() {
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      push();
      translate(x * cellSize, y * cellSize);
      rotate(flowField[x + y * cols]);
      strokeWeight(1);
      stroke(0, 50);
      line(0, 0, cellSize, 0);
      pop();
    }
  }
}

// function drawStreamline(xSeed, ySeed) {
//   beginShape();
//   let x = xSeed * cellSize;
//   let y = ySeed * cellSize;
//   for (let step = 0; step < num_steps; step++) {
//     vertex(x, y);
//     let x_offset = x;
//     let y_offset = y;
//     let column_index = int(x_offset / d_sep);
//     let row_index = int(y_offset / d_sep);

//     let grid_angle = flowField[column_index + row_index * cols];
//     let x_step = step_length * cos(grid_angle);
//     let y_step = step_length * sin(grid_angle);

//     x = x + x_step;
//     y = y + y_step;
//   }
//   endShape();
// }

function drawStreamline(xSeed, ySeed) {
  let x = xSeed;
  let y = ySeed;
  let pts = [];
  while (true) {
    if (x < 0 || y < 0 || x > windowWidth || y > windowHeight) {
      break;
    }
    pts.push([x, y]);
    let x_offset = x;
    let y_offset = y;
    let column_index = int(x_offset / d_sep);
    let row_index = int(y_offset / d_sep);

    let grid_angle = flowField[column_index + row_index * cols];
    let x_step = step_length * cos(grid_angle);
    let y_step = step_length * sin(grid_angle);

    x = x + x_step;
    y = y + y_step;
  }
  return pts;
}

function drawStreamlines() {
  for (let streamline of streamlineQueue) {
    beginShape();
    for (let vert of streamline) {
      vertex(vert[0], vert[1]);
    }
    endShape();
  }
}

function draw() {
  noLoop();
  makeFlowField();
  drawFlowField();
  noFill();

  let initialLine = drawStreamline(windowWidth / 2, windowHeight / 2);
  streamlineQueue.push(initialLine);
  // let currentStreamline = 0;
  // let finished = false;
  // while (true) {
  //   let candidateSeed = 0;
  //   while (true) {
  //     let seedpoint = currentStreamline[candidateSeed];
  //   }
  // }

  // for (let yStart = 0; yStart < rows; yStart++) {
  //   for (let xStart = 0; xStart < cols; xStart++) {
  // drawStreamline(xStart * cellSize, yStart * cellSize);
  //   }
  // }
  drawStreamlines();
}
