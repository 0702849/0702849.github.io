// Camera / 3d model test
// Rylan Hamel Chan

let angle = 0;

function setup() {
  createCanvas(400, 300, WEBGL);
}

function draw() {

  background(175);

  rectMode(CENTER)
  noStroke();
  fill(0,0,255);
  rotateX(angle);
  rect(0, 0, 150, 100);

   angle += 0.07;
}
