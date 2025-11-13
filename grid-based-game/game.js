// Tile Tower Defense
// Rylan Hamel Chan
// October 30, 2025
//
// Extra for Experts:
// - use of classes and controllers  - https://cs30.wmcicompsci.ca/oop/overview.html
//      -https://p5js.org/reference/p5/class/
// I used classes and controllers way before they were shown in a demo you can check my commits

// - ternary operators - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_operator
//      - https://www.w3schools.com/c/c_conditions_short_hand.php
//      - (game.js line 113)

// - Math.max -https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/max

// - Array Filters -https://www.w3schools.com/jsref/jsref_filter.asp



// --constants--

// --global variables-
let plantsGrid;
let peas = [];


function setup() {
  createCanvas(WIDTH, HEIGHT);
  

  // create the 2d grid for the plants to be placed on
  plantsGrid = [];
  for(let rows = 0; rows < ROWS; rows++){
    const _row = Array(COLS).fill(null);
    plantsGrid.push(_row);
  }


  //start zombies after grid exists
  startLevel(1);
}

function draw() {
  background(220);
  //lawn stuff
  drawHUD();
  drawLawn();
  hoveringLawn();
  
  //zombie stuff
  spawnTick(); // spawn the zombies
  updateZombies(); // move the zombies
  drawZombies(); // draw the zombies
  
  //the lose condition *dramatic nosies*
  if(zombieEatsBrains()){
    noLoop();
    textSize(20);
    fill("red");
    textAlign(CENTER, CENTER);
    text("THE ZOMBIES HAVE EATEN YOUR BRAINS or something", width/2, height/2);
  }
  
  //the plant stuff
  updatePlants();
  updateProjectile();
  drawPlant();
  drawProjectile();
}

// -- the plant placing function using mouse pressed --
function mousePressed(){
  const CELL = gridFromXY(mouseX, mouseY)
    if(!CELL){
      return;
    }
    spawnPlant(CELL.row, CELL.col);
}

// == lawn stuff ==

function drawLawn(){
  //generate the lawns array/grid/board
  rectMode(CORNER);
  for(let y = 0; y < ROWS; y++){
    for(let x = 0; x < COLS; x++){
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
  rectMode(CORNER);
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
  const cell = gridFromXY(mouseX, mouseY);

  if(!cell){
    return;
  }

  const {x, y} = gridToXY(cell.row, cell.col);
  noFill();
  stroke(255, 255, 255, 150);
  strokeWeight(2);
  rect(x+2, y+2, CELLSIZE-4, CELLSIZE-4, 6);
  strokeWeight(1);
}

// -- little helpers --

function inBounds(rows, cols){
  //dont allow me to click outside of the lawn/tiles/play area
  //return true if inside lawn return false if outside
  return rows >= 0 && rows < ROWS && cols >= 0 && cols < COLS;
}

function gridFromXY(x, y){
  //translate the mouse position(pixel) into a specific spot in the grid
  if (y < HUDHEIGHT){
    return null; // ignore clicks above grid height
  }

  //find row and colomn that the pixel belongs to
  const col = Math.floor(x / CELLSIZE);
  const row = Math.floor((y - HUDHEIGHT) / CELLSIZE);

  //return cell if its inside the lawn
  return inBounds(row, col) ? {row, col} : null;
}

function gridToXY(row, col){
  //convert grid position(rows and column) to the pixel position
  return{
    x: col * CELLSIZE,
    y: HUDHEIGHT + row * CELLSIZE
  };
}
