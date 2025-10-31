// Tile Tower Defense
// Rylan Hamel Chan
// October 30, 2025
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

// --constants--
const SQUARE_DIMENSIONS = 9;

// --global variables-
let cellSize;
let theLawn = [[0, 0, 0, 0, 0, 0, 0, 0, 0],
               [0, 0, 0, 0, 0, 0, 0, 0, 0],
               [0, 0, 0, 0, 0, 0, 0, 0, 0],
               [0, 0, 0, 0, 0, 0, 0, 0, 0],
               [0, 0, 0, 0, 0, 0, 0, 0, 0]];



function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
  showLawn();
}




function setup() {
  createCanvas(windowWidth, windowHeight);
  if (width < height) {
    cellSize = width/SQUARE_DIMENSIONS;
  }
  else {
    cellSize = height/SQUARE_DIMENSIONS;
  }
  // theGrid = generateRandomGrid(SQUARE_DIMENSIONS, SQUARE_DIMENSIONS);
}

function draw() {
  background(220);
  showLawn();
}


function showLawn() {
  for (let y = 0; y < SQUARE_DIMENSIONS; y++) {
    for (let x = 0; x < SQUARE_DIMENSIONS; x++) {
      if (theLawn[y][x] === 1) {
        fill("black");
      }
      else if (theLawn[y][x] === 0) {
        fill("green");
      }
      square(x * cellSize, y * cellSize, cellSize);
    }
  }
}


function mousePressed() {
  let x = Math.floor(mouseX/cellSize);
  let y = Math.floor(mouseY/cellSize);

  toggleCell(x, y);
}

function toggleCell(x, y) {
  if (theLawn[y][x] === 1) {
    theLawn[y][x] = 0;
  }
  else if (theLawn[y][x] === 0) {
    theLawn[y][x] = 1;
  }
}
