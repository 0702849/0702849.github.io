// Arrays and Objects
// Rylan Hamel Chan
//
//  -- Scuff Labs 3d --
//
// Extra for Experts:
// i did it in 3d.

var rover;

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  rover = createRoverCam();
  rover.usePointerLock();    // optional; default is keyboard control only
  rover.setState({           // optional
    position: [-400,-200,-200],
    rotation: [0.4,0.3,0],
    sensitivity: 0.01,
    speed: 0.5
  });
}

function draw() {
  background(0);
  box(200);
}
