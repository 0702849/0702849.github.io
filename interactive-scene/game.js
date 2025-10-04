let Score = 0;
let Timer = 60;
let time = 0;
//game version
let timerOn = false;

//timer settings
let gameStarted = 0;
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
  let timeLeft;
  if(timerOn === true){

    let timeSince = millis() - gameStarted;
    timeLeft = Timer * 1000 - timeSince;
    
    if(timeLeft < 0){
      timeLeft = 0;
    }
  }
  time = timeLeft / 1000;
  console.log(time);
  
  if(timeLeft === 0) {
    timerOn = false;
    gameState = "start";
    target.hide();
  }


  text(`Time Left: ${nf(time, 1, 1)} sec`, 5, 50, 90);
  text(`Score: ${nf(Score, 1, 0)}`, 10, 100, 90);

}

