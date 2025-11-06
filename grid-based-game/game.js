// Tile Tower Defense
// Rylan Hamel Chan
// October 30, 2025
//
// Extra for Experts:
// - use of classes and controllers  - https://cs30.wmcicompsci.ca/oop/overview.html
// - 


// --constants--

// --global variables-

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
  drawHUD();
  drawLawn();
}


// == lawn stuff ==

function drawLawn(){
  //generate the lawns array/grid/board
  for(let y = 0; y < COLS; y++){
    for(let x = 0; x < ROWS; x++){
      const _x = x * CELLSIZE;
      const _y = HUDHEIGHT + y * CELLSIZE;

      if((y + x) % 2 === 0){
        fill(95, 160, 95);
      }
      else{
        fill(105, 170, 105);
      }
      rect(_x, _y, CELLSIZE, CELLSIZE)
    }
  }
}

function drawHUD(){
  //hud goes above lawn and holds seed packets/towers and title
  noStroke();
  fill(150, 75, 0);
  rect(0, 0, width, HUDHEIGHT);

  fill(255);
  textAlign(CENTER, TOP);
  textSize(22);
  text("Tile Tower Defense", width - (width / 2), HUDHEIGHT / 2);
}

function hoveringLawn(){
  //let me know if i can plant here by using a visual indicator like changing the color of the tiles or making a ghost tower
  
}

// -- little helpers --

function inBounds(rows, cols){
  //dont allow me to click outside of the lawn/tiles/play area
}

function gridXY(x, y){
  //translate the mouse position on the screen into a specific spot in the grid
  const col = Math.floor(x / CELLSIZE);
  const row = Math.floor((y - HUDHEIGHT) / CELLSIZE);
}