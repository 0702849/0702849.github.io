//I want a working game loop as well as a restart button in here. I am trying my best to use rover cam to my fullest ability and understanding with some help from youtube, links listed below.

// console.log('drawHUD running', window.hud2d && window.hud2d.width, window.hud2d && window.hud2d.height);

// alert('[game.js] LOADED');                // should pop once on reload
// console.error('[GM] loaded at', Date.now());


// -- constants --
const TARGET_RADIUS = 18;
const TARGET_DISTANCE = 200;
const HIT_TOLERANCE = 14;
const ROUND_SECONDS = 60;

// -- state variables --
let targetPos = null;

// -- normal variables --
let hits = 0;
let misses = 0;
let score = 0;
let roundEndsAt = 0;
let playing = false;
let hudFont;


// == actual code ==

function spawnTarget() {
    // read the current camera position
    const cam = _renderer._curCamera;
    const eye = createVector(cam.eyeX, cam.eyeY, cam.eyeZ);    // camera position
    const ctr = createVector(cam.centerX, cam.centerY, cam.centerZ); // look-at point
    const up  = createVector(cam.upX, cam.upY, cam.upZ).normalize();

    //the camera basis
    const fwd   = p5.Vector.sub(ctr, eye).normalize(); // forward
    const right = p5.Vector.cross(fwd, up).normalize(); // right (perp to forward & up)

    //pick a small random cone around forward(plus minus 25 degrees (I cant find the symbols))
    const maxAngle = radians(25);
    const theta = random(-maxAngle, maxAngle); // horizontal angle
    const phi   = random(-maxAngle, maxAngle); // vertical angle

    //approximate the smaller angle rotation using a tangent offset in the camera basis
    const dir = p5.Vector.add(
    p5.Vector.add(fwd, p5.Vector.mult(right, Math.tan(theta))),
    p5.Vector.mult(up, Math.tan(phi))
  ).normalize();
   
    // final world position at fixed distance
    targetPos = p5.Vector.add(eye, p5.Vector.mult(dir, TARGET_DISTANCE));
}

function drawTarget() {
    if (!targetPos){
        return;
    }

    push();
    noStroke();

    emissiveMaterial(255, 0, 0, 50)

    translate(targetPos.x, targetPos.y, targetPos.z);
    sphere(TARGET_RADIUS, 18, 12);
    pop();

}


function isUnderCrosshair(worldPos, radius) {

    const cam = _renderer._curCamera;
    const eye = createVector(cam.eyeX, cam.eyeY, cam.eyeZ);
    const ctr = createVector(cam.centerX, cam.centerY, cam.centerZ);
    const fwd = p5.Vector.sub(ctr, eye).normalize();

    //vector camera -> target
    const toTarget = p5.Vector.sub(worldPos, eye).normalize();

    //find the angle between forwards and the target
    const angle = degrees(fwd.angleBetween(toTarget));

    //if its smaller its closer to the center;
    return angle < 2;
}

function aimMousePressed(btn){
      // only left click and only if a target exists
      if (btn !== LEFT || !targetPos) return;
    
      if (isUnderCrosshair(targetPos, TARGET_RADIUS)) {
        // if hit update stats and clear the current target and spawna new one
        hits++;
        score += 100;
        targetPos = null;
        spawnTarget();
      } 
      else {
        misses++;
      }
}
function startRound(){
    playing = true;
    score = 0;
    hits = 0;
    misses = 0;
    roundEndsAt = millis() + ROUND_SECONDS * 1000;

    targetPos = null;
    spawnTarget();
}

function roundIsOver(){
    return playing && millis() >= roundEndsAt;
}

function drawHUD() {
  const el = window.hudEl;
  if (!el) return;  // safety: only after setup() created it

  if (!playing) {
    el.html('Press <b>R</b> to start');
  } else {
    const t = Math.max(0, Math.ceil((roundEndsAt - millis()) / 1000));
    el.html(`Time: <b>${t}s</b> &nbsp; Score: <b>${score}</b> &nbsp; H:${hits} &nbsp; M:${misses}`);
  }
}


function updateAimTrainer() {
  // if the round ended, stop drawing targets (but keep HUD visible)
  if (roundIsOver && roundIsOver()) {
    playing = false;
    targetPos = null;
    return;
  }

  // while playing, ensure we have a target to show
  if (playing && !targetPos) {
    spawnTarget();
  }
  // draw the target if it exists
  if (targetPos){
    drawTarget();
  }
}
