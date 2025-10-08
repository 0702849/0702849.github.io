// multishot
// Rylan Hamel Chan
// october 3rd, 2025
//
// Extra for Experts:
// createButton function, nf used to create constantly changing numbers as strings


function setup() {
  if (windowWidth > windowHeight) {
    createCanvas(windowHeight, windowHeight);
  } else {
    createCanvas(windowWidth, windowWidth);
  }
  buttons();
}

function draw() {
  background(180);
  screenState();
}
