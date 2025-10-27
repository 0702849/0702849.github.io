// Arrays and Objects
// Rylan Hamel Chan
//
//  -- Scuff Labs 3d --
//
// Extra for Experts:
// - i did it in 3d
// - use of constants
// - potentially library editing and changing
// - made a fun game (:

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
  // boomStick();   ---  Create gun model that follows camera

  // -- HUD --

  drawCrosshair({distance: 50,
     size: 1,
      color: [0, 250, 250], // - thought this might look better sorry if its confusing
       occludable: true
      });

  
}


function drawCrosshair(options = {}) {
  const {
    distance = 50,
    size = 2.5,
    color = [0, 255, 255],
    occludable = true,
  } = options;


  //attempt to access current p5 camera
  const cam = _renderer._curCamera;
  const eye = createVector(cam.eyeX, cam.eyeY, cam.eyeZ);
  const ctr = createVector(cam.centerX, cam.centerY, cam.centerZ);

  //fwd direction
  const fwd = p5.Vector.sub(ctr, eye).normalize();

  //position of crosshair
  const pos = p5.Vector.add(eye, p5.Vector.mult(fwd, distance));

  push();
  if (!occludable) hint(DISABLE_DEPTH_TEST);
  translate(pos.x, pos.y, pos.z);

  noStroke();
  ambientMaterial(...color);
  sphere(size, 12, 8);

  if (!occludable) hint(ENABLE_DEPTH_TEST);
  pop();
}