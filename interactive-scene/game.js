//epic score variables
let Score = 0;
let highScore = 0;

//timer variables/settings
let Timer = 60;
let time = 0;
let timerOn = false;
let gameStarted = 0;
//target button
let target;


//game mode: multishot
function multiShotEasy() {
    timerOn = true;
    gameStarted = millis();

    if (!target) {
      target = createButton("hit me");
      target.mouseClicked(targetHit);
      target.size(100 / (width / 200), 100 / (width / 200));
    }
    target.show();
    target.position(width / 2, width / 2);
}

//if a target is hit move to a random position within width by width
function targetHit() {
  if (!timerOn){
    return;
  }
  target.position(random(40, width-40), random(40, width-40));
  Score += 25;
  console.log(Score);
}

//timer counts down while keeping score using nf
function scoreTimer() {
  let timeSince;
  let timeLeft = Timer * 1000;


  //if game is running start the timer
  if(timerOn === true){
    timeSince = millis() - gameStarted;
    timeLeft = Timer * 1000 - timeSince;
    
    if(timeLeft < 0){
      timeLeft = 0;
    }
    time = timeLeft / 1000;
    // console.log(time);
  }

  
  if(timeLeft === 0 && timerOn) {
    timerOn = false;
  
  //change high score value
  if(Score > highScore) {
    let timeLeft = Timer * 1000 - timeSince;
    highScore = Score;
    // console.log(highScore);
  }

    gameState = "start";
    target.hide();
  }


  text(`Time Left: ${nf(time, 1, 1)} sec`, 5, 50, 100);
  text(`Score: ${nf(Score, 1, 0)}`, 10, 100, 90);
  text(`High Score: ${highScore}`, 5, 110, 90);
}

