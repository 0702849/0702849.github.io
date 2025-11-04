// Tile Tower Defense
// Rylan Hamel Chan
// October 30, 2025
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

// --constants--

// --global variables-

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
  showLawn();
}


// == lawn stuff ==

function drawLawn(){
    for(let y = 0; y <= COLS; y++){
        lawn.push([]);
        for(let x = 0; x <= ROWS; x++){
            lawn.push(0);     
        }
    }
}

function showLawn(){
    for(let y = 0; y < LAWN_DIMENSIONS; y++){
        for(let x = 0; x < LAWN_DIMENSIONS; x++){
            fill("green");
            square(x, y, 50);
        }
    }
}

function drawHUD(){
    //hud goes above lawn and holds seed packets/towers
}

function hoveringLawn(){
    //let me know if i can plant here by using a visual indicator like changing the color of the tiles or making a ghost tower
}