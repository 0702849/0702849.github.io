//I want a working game loop as well as a restart button in here. I am trying my best to use rover cam to my fullest ability and understanding with some help from youtube, links listed below.


// -- constants --
const TARGET_RADIUS = 18;
const TARGET_DISTANCE = 100;

// -- state variables --
let targetPos = null;


// -- actual code --

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
    ambientMaterial(255, 120, 120);
    translate(targetPos.x, targetPos.y, targetPos.z);
    sphere(TARGET_RADIUS, 18, 12);
    pop();

}

function startRound(){

}

function drawHUD(){

}