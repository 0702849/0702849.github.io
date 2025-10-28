// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let grid;
let rows;
let cols;
const CELL_SIZE = 50;

function setup() {
  createCanvas(windowWidth, windowHeight);
  cols = Math.floor(width/CELL_SIZE);
  rows = Math.floor(height/CELL_SIZE);
  grid = generateRandomGrid(cols,rows);
}

function draw() {
  background(200);
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
  //make sure cell exists

if(x >= 0 && x < cols && y >= 0 && y < rows) {
  if(grid[y][x] === 0){
    grid[y][x] = 1;
  }
  else if(grid[y][x] === 1){
    grid[y][x] = 0;
  }
}
}

function keyPressed() {
  if (key === 'r'){
    grid = generateRandomGrid(cols,rows);
  }
  else if (key === 'e'){
    grid = generateEmptyGrid(cols,rows);
  }
}

function displayGrid() {
  for (let y = 0; y < rows; y++){
    for(let x = 0; y < close; x++){
      if (grid[y][x] === 0){
        fill("white");
      }
      else if(grid[y][x] === 1) {
        fill("black");
      }
      square(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE);
    }
  }
}

function generateEmptyGrid() {
  let newGrid = [];
  for(let y = 0; y < rows; y++){
    for(let x = 0; y < cols; x++){
      newGrid[y].push(0);
    }
  }
}

function generateRandomGrid() {
  let newGrid = [];
  for(let y = 0; y < rows; y++){
    for(let x = 0; y < cols; x++){
      newGrid[y].push(0);
    }
  }
  return newGrid;
}