// Tile Tower Defense
// Rylan Hamel Chan
// October 30, 2025
//
// Extra for Experts:
// - use of classes and controllers  - https://cs30.wmcicompsci.ca/oop/overview.html
//      -https://p5js.org/reference/p5/class/
// - 


// --constants--

// --global variables-

function setup() {
  createCanvas(WIDTH, HEIGHT);
}

function draw() {
  background(220);
  drawHUD();
  drawLawn();
  hoveringLawn();
}


// == lawn stuff ==

function drawLawn(){
  //generate the lawns array/grid/board
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