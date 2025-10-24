// Arrays and Objects
// Rylan Hamel Chan
//
//  -- Scuff Labs 3d --
//
// Extra for Experts:
// i did it in 3d.

let sphereAttributes = [];
var rover;

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  rover = createRoverCam();

  //  -- rovercam settings --
  rover.usePointerLock();
  rover.setState({
    position: [0,0,0],
    rotation: [0,0,0],
    sensitivity: 0.01,
    fov: 2,
    speed: 0.5
  });
  

  // rover.keyMap.mx1 = [];
  // rover.keyMap.mx2 = [];
  // rover.keyMap.my1 = [];
  // rover.keyMap.my2 = [];
  // rover.keyMap.mz1 = [];
  // rover.keyMap.mz2 = [];
}

function draw() {

  // -- map settings --
  background(0);
  fill(140);
  box(500, 500, 500, 0, 0);



  // -- game stuff --
  boomStick();
}

function boomStick(){
  //stick color / size
  strokeWeight(2);
  fill("green");
  translate(200,0,0);
  box(3,4,5,1,1);


}