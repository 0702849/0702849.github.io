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
  showLawn();
  drawHUD();
}


// == lawn stuff ==

function drawLawn(){
  //generate the lawns array/grid/board
    for(let y = 0; y <= COLS; y++){
        lawn.push([]);
        for(let x = 0; x <= ROWS; x++){
            lawn.push(0);     
        }
    }
    console.log(lawn);
}

function showLawn(){
  //display the lawn with color
    for(let y = 0; y < LAWN_DIMENSIONS; y++){
        for(let x = 0; x < LAWN_DIMENSIONS; x++){
          if(lawn[y][x] === 0){
            fill("green");
          }
          square(x * 50, y * 50, 50);
        }
    }
    //add different color tiles for clarity
    //might not need this function keep in mind
}

function drawHUD(){
  //hud goes above lawn and holds seed packets/towers and title
  noStroke();
  fill(150, 75, 0);
  rect(0, 0, width, HUDHEIGHT);

  fill(255);
  textAlign(CENTER, TOP);
  textSize(22);
  text("Tile Tower Defense", width - (width/4), HUDHEIGHT / 2);
}

function hoveringLawn(){
    //let me know if i can plant here by using a visual indicator like changing the color of the tiles or making a ghost tower
}