let Score;
let Timer;
let time;
//game version
let timerOn = false;

//timer settings
let gameStarted = 0;
Timer = 60;
Score = 0;


//game mode: multishot
function multiShotEasy() {
    timerOn = true;
    scoreTimer();
    target = createButton("");
    target.mouseClicked(targetHit);
    target.position(width / 2, width / 2);
    target.size(100 / (width / 200), 100 / (width / 200));
}

//if a target is hit move to a random position within width by width
function targetHit() {
  target.position(random(40, width-40), random(40, width-40));
  Score += 25;
  console.log(Score);
}

//timer counts down while keeping score using nf
function scoreTimer() {
  if(timerOn === true){
    time = gameStarted + Timer - millis() / 1000;
    console.log(time);
    if(millis() > time){
        gameState = "start";
        console.log(gameState);
  }
  text(`Time Left: ${nf(time, 1, 1)} sec`, 5, 50, 90);
  text(`Score: ${nf(Score, 1, 0)}`, 10, 100, 90);
  }
  else if(timerOn === false){
    gameStarted = millis();
  }
}

