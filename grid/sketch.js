// 2d Array grid
// Rylan Hamel Chan
// October 27, 2025

let theGrid = [[1, 0, 1, 0],
              [0, 0, 1, 1],
              [1, 1, 0, 0],  //=== HARD CODE ONLY === 
              [0, 1, 0, 1]];
const SQUARE_DIMENSION = theGrid.length;

// let theGrid;
// const SQUARE_DIMENSION = 4;  // == RANDOM GRID ==  
// let cellSize;


function setup() {
  createCanvas(windowWidth, windowHeight);
  if(width < height){
    cellsize = width/SQUARE_DIMENSION
  }
  else{
  cellSize = height/SQUARE_DIMENSION;
  }

  theGrid = generateRandomGrid(SQUARE_DIMENSION, SQUARE_DIMENSION); // == RANDOM GRID ==
}

function draw() {
  background(220);

  showGrid();
  mousePressed();
}

function showGrid() {
  for(let y = 0; y < SQUARE_DIMENSION; y++){
    for(let x = 0; x < SQUARE_DIMENSION; x++){
      if(theGrid[y][x] === 1) {
        fill("black");
      }
      else if(theGrid[y][x] === 0){
        fill("white");
      }
      square(x * cellSize, y * cellSize, cellSize);
    }
  }
}


function mousePressed() {
  let x = Math.floor(mouthX/cellSize);
  let y = Math.floor(mouthY/cellSize);

  toggleCell(x, y);
}

function toggleCell(x, y){
  if(theGrid[y][x] === 1) {
    theGrid[y][x] = 0;
  }
  else if(theGrid[y][x] === 0){
    theGrid[y][x] = 1;
  }
}

function generateRandomGrid(cols, rows) {
  let newGrid = [];

  for(let y = 0; y < rows; y++){
    newGrid.push([]);
    for(let x = 0; x < cols; x++){
      if(random(100) < 50){
        newGrid[y].push(0)
      }
      else{
        newGrid[y].push(1);
      }
    }
  }
  return newGrid;
}