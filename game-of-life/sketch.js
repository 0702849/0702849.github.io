// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let autoPlayIsOn = false;
let grid;
let rows;
let cols;
const CELL_SIZE = 20;
const RENDER_ON_FRAME = 4;

function setup() {
  createCanvas(windowWidth, windowHeight);
  cols = Math.floor(width/CELL_SIZE);
  rows = Math.floor(height/CELL_SIZE);
  grid = generateRandomGrid(cols,rows);
}

function draw() {
  background(200);
  if(autoPlayIsOn && frameCount % RENDER_ON_FRAME === 0){
  grid = updateGrid();
  }
  displayGrid();
}

function mousePressed(){
  let x = Math.floor(mouseX/CELL_SIZE);
  let y = Math.floor(mouseY/CELL_SIZE);

  toggleCell(x, y);

  toggleCell(x + 1, y + 1)
  toggleCell(x - 1, y - 1);
  toggleCell(x, y - 1);
  toggleCell(x, y + 1);
}


function toggleCell(x, y) {
  //make sure the cell you're toggling actually exists!
  if (x >= 0 && x < cols && y >= 0 && y < rows) {
    if (grid[y][x] === 0) {
      grid[y][x] = 1;
    }
    else if (grid[y][x] === 1) {
      grid[y][x] = 0;
    }
  }
}

function keyPressed() {
  if (key === "r"){
    grid = generateRandomGrid(cols,rows);
  }
  else if (key === "e"){
    grid = generateEmptyGrid(cols,rows);
  }
  else if (key === " "){
    grid = updateGrid();
  }
  else if(key === "a"){
    autoPlayIsOn = !autoPlayIsOn;
  }
}

function updateGrid() {
  let nextTurn = generateEmptyGrid(cols, rows);

  //look at every cell
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      let neighbours = 0;

      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          //don't fall off edge of grid
          if (x+j >= 0 && x+j < cols && y+i >= 0 && y+i < rows) {
            neighbours += grid[y+i][x+j];
          }
        }
      }

      //don't count self as neighbour
      neighbours -= grid[y][x];

      //apply the rules
      if (grid[y][x] === 1) {
        //currently alive
        if (neighbours === 2 || neighbours === 3) {
          nextTurn[y][x] = 1;
        }
        else {
          nextTurn[y][x] = 0;
        }
      }

      if (grid[y][x] === 0) {
        //currently dead
        if (neighbours === 3) {
          nextTurn[y][x] = 1;
        }
        else {
          nextTurn[y][x] = 0;
        }
      }
    }
  }
  return nextTurn;
}

function displayGrid() {
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      if (grid[y][x] === 0) {
        fill("white");
      }
      else if (grid[y][x] === 1) {
        fill("black");
      }
      square(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE);
    }
  }
}

function generateEmptyGrid(cols, rows) {
  let newGrid = [];
  for (let y = 0; y < rows; y++) {
    newGrid.push([]);
    for (let x = 0; x < cols; x++) {
      newGrid[y].push(0);
    }
  }
  return newGrid;
}

function generateRandomGrid(cols, rows) {
  let newGrid = [];
  for (let y = 0; y < rows; y++) {
    newGrid.push([]);
    for (let x = 0; x < cols; x++) {
      //pick 0 or 1 randomly
      if (random(100) < 50) {
        newGrid[y].push(0);
      }
      else {
        newGrid[y].push(1);
      }
    }
  }
  return newGrid;
}
