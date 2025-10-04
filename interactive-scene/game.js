//epic score variables
let Score = 0;
let highScore = 0;

//timer variables/settings
let Timer = 60;
let time = 0;
let timerOn = false;
let gameStarted = 0;
//NEW target amounts / settings
let targetAmount = [];


//game mode: multishot
function multiShotEasy() {
    timerOn = true;
    gameStarted = millis();

    // if (!target) {
    //   target = createButton("");
    //   target.mouseClicked(targetHit);
    //   target.size(100 / (width / 200), 100 / (width / 200));
    // }
    // target.show();
    // target.position(width / 2, width / 2);
  
    targetAppear(25);
}



//TARGET SETTINGS



//if a target is hit move to a random position within width by width
function targetHit(targets) {
  if (!timerOn){
    return;
  }
  targets.position(random(40, width-40), random(40, width-40));
  Score += 25;
  console.log(Score);
}


//create this many(n) targets
function targetAppear(n){
  let i = 0;
  while(i < n) {
    let targets = createButton("");
    targets.size(100 / (width / 200), 100 / (width/200));

    targets.mouseClicked(function() { targetHit(targets); });

    targets.position(random(40, width - 40), random(40, width - 40));

    targetAmount.push(targets);
    i += 1;
  }
}


//remove all of the targets
function clearTargets() {

  let i = 0;
  while(i < targetAmount.length){
    if(targetAmount[i]) {
      targetAmount[i].hide();
      targetAmount[i].remove();
    }
    i += 1;
  }
  targetAmount = [];
}



//TIMER SETTINGS


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
    clearTargets();
  }

  textAlign(CENTER);
  textSize(width/ 10)
  text(`Time Left: ${nf(time, 1, 1)} sec`, width / 2, width /2);

  textAlign(LEFT, TOP);
  textSize(width / 30);
  text(`Score: ${nf(Score, 1, 0)}`, width * 0.02, width * 0.02);
  text(`High Score: ${highScore}`, width * 0.02, width * 0.08);
}

