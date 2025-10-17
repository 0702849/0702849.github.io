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
    position: [0,0,0],
    rotation: [0.4,0.3,0],
    sensitivity: 0.01,
    fov: 2,
    speed: 0.5
  });
}

function draw() {
  background(0);
  fill(140);
  box(500);

  // -- crosshair --
  circle(width/2, height/2, 4);
}
