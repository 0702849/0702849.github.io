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

//dont consider the hud for extra for experts i used ai to help me find a way to make it work.
//turns out you cant paste 2d onto 3d in webgl so its rendered as normal HTML

// alert('[cameramap.js] LOADED');           // should pop once on reload
// console.error('[CM] loaded at', Date.now());

var hud2d;
let sphereAttributes = [];
var rover;

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);


  // -- 2d hud --
  window.hudEl = createDiv('');
  hudEl.id('hud');
  hudEl.style('position', 'fixed');
  hudEl.style('top', '8px');
  hudEl.style('left', '8px');
  hudEl.style('z-index', '9999');
  hudEl.style('color', '#fff');
  hudEl.style('font', '16px monospace');
  hudEl.style('background', 'rgba(0,0,0,0.6)');
  hudEl.style('padding', '8px 12px');
  hudEl.style('border-radius', '8px');

  if(window.hudFont){
    textFont(hudFont);
    textSize(14);
    textAlign(LEFT, TOP);
  }

  //  -- rovercam settings --
  rover = createRoverCam();
  rover.usePointerLock();
  rover.setState({
    position: [0,0,0],
    rotation: [0,0,0],
    sensitivity: 0.01,
    fov: 2,
    speed: 0.5
  });

  //stoping use of movement in the box map thing
  rover.keyMap.mx1 = [];
  rover.keyMap.mx2 = [];
  rover.keyMap.my1 = [];
  rover.keyMap.my2 = [];
  rover.keyMap.mz1 = [];
  rover.keyMap.mz2 = [];

  if (typeof spawnTarget === 'function'){
    spawnTarget();
  }
}



function keyPressed() {
  if (typeof startRound === 'function' && (key === 'r' || key === 'R')){
    startRound();
  }
}

let spawnedOnce = false;
function draw() {
  // -- map settings --
  background(0);
  fill(140);
  box(500, 500, 500, 0, 0);

    // -- HUD --
  drawCrosshair({
    distance: 50,
    size: 1,
    color: [0, 250, 250], // - thought this might look better sorry if its confusing
    occludable: true
    });

  // -- game stuff --
    // per-frame game update & render
  if (typeof updateAimTrainer === 'function') {
    updateAimTrainer();
  } 
  else {
  // fallback if you didn't add updateAimTrainer():
  if (typeof drawTarget === 'function' && targetPos){
    drawTarget();
  }
}
  if (typeof drawHUD === 'function'){
    console.log('about to draw HUD');
    drawHUD();
  }
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
  emissiveMaterial(...color);
  sphere(size, 12, 8);
  
  if (!occludable) hint(ENABLE_DEPTH_TEST);
  pop();
}

function mousePressed(){
  if (typeof aimMousePressed === 'function'){
    aimMousePressed(mouseButton);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  hud2d = createGraphics(windowWidth, windowHeight);
  hud2d.textSize(14);
  hud2d.fill(255);
  hud2d.textAlign(LEFT, TOP);
  window.hud2d = hud2d;
}