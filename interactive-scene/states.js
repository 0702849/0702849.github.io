//state variables

let gameState = "start";
let version = "none";
let startButton;


//buttons to choose game mode
function buttons() {
  startButton = createButton("start");
  startButton.position(width / 2, width / 2);
  startButton.mousePressed(stateUpdate);
}

//when a button is clicked do this
function stateUpdate() {
  // if (startButton.mouseClicked) {
  //   gameState = "multishot";
  //   startButton.hide();
  //   console.log(gameState);
  // }
  gameState = "multishot";
  startButton.hide();
  console.log(gameState);
  multiShotEasy();
}


//what should be happening right now
function screenState() {
  if (gameState === "start") {
    startButton.show();

    textAlign(CENTER);
    textSize(width / 12);
    text("scuff labs", width / 2, width / 2 - width * 0.22);

    textSize(width/ 24);
    text("High Score: " + highScore, width /2, width * 0.12)
  }
  else if (gameState === "multishot") {
    scoreTimer();

    textAlign(RIGHT, BOTTOM);
    textSize(width / 40);
    text("Press R to reset", width * 0.96, height * 0.96);
    }
  }


//when r key pressed reset game
function keyPressed(){
  if (keyCode === 82){
    gameRestarted();
  }
}
function gameRestarted(){
  Score = 0;
  clearTargets();
  gameState = "start";
  timerOn = false;
}