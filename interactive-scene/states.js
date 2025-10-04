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
    textAlign(CENTER, CENTER);
    text("scuff labs", width / 2, width / 2 - width / 4);
  }
  else if (gameState === "multishot") {
    scoreTimer();
    }
  }
