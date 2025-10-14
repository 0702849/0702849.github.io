// Camera / 3d model test
// Rylan Hamel Chan

let angle = 0;

function setup() {
  createCanvas(400, 300, WEBGL);
}

function draw() {

  background(175);

  rectMode(CENTER)
  // noStroke();
  fill(0,0,255);
  rotateX(angle);
  rotateY(angle * 0.3);
  rotateZ(angle * 1.2);
  // rect(0, 0, 150, 100);
  box(100, 100, 100);

  angle += 0.07;
}
