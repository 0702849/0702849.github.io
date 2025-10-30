// --lawn settings--
let lawn = [[0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0]];

// --state variables--

// --global variables--

// --constants--
const LAWN_DIMENSION = lawn.length;


// == FUNCTIONS ==
function showLawn() {
    let cellSize;
    if(width < height){
        cellSize = width/LAWN_DIMENSION
    }
    else{
        cellSize = height/LAWN_DIMENSION;
    }


    for(let y = 0; y < LAWN_DIMENSION; y++){
        for(let x = 0; x < LAWN_DIMENSION; x++){
        if(lawn[y][x] === 1) {
            fill("black");
        }
        else if(lawn[y][x] === 0){
            fill("white");
        }
        square(x * cellSize, y * cellSize, cellSize);
        }
    }
}
