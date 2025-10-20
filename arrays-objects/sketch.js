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

  //  -- rovercam settings --
  rover.usePointerLock();
  rover.setState({
    position: [0,0,0],
    rotation: [0.4,0.3,0],
    sensitivity: 0.01,
    fov: 2,
    speed: 0.5
  });

  rover.keyMap.mx1 = [];
  rover.keyMap.mx2 = [];
  rover.keyMap.my1 = [];
  rover.keyMap.my2 = [];
  rover.keyMap.mz1 = [];
  rover.keyMap.mz2 = [];
}

function draw() {

  // -- map settings --
  background(0);
  fill(140);
  box(500);

  // -- game stuff --
}
