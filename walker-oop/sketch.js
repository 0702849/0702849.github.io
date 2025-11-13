// walker OOP demo

let theWalkers = [];

class Walker {
  constructor(x, y, color){
    this.x = x;
    this.y = y;
    this.color = color;
    this.box = 10;
    this.speed = 10;
  }
  
  display(){
    noStroke();
    fill(this.color);
    rect(this.x, this.y, this.box, this.box);
  }
  
  move(){
    let choice = random(0, 100);
    
    if(choice < 25){
      //up
      this.y -= this.speed;
    }
    else if(choice < 50){
      //down
      this.y += this.speed;
    }
    else if(choice < 75){
      //left
      this.x -= this.speed;
    }
    else{
      //right
      this.x += this.speed;
    }
  }
}

let ro = new Walker(200, 400, "green");
let noor = new Walker(400, 200, "red");


function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  // ro.move();
  // noor.move();
  // ro.display();
  // noor.display();

  for(let myWalker of theWalkers){
    myWalker.move();
    myWalker.display();
  }

}

function spawnWalker(x, y){
  let r = random(255);
  let g = random(255);
  let b = random(255);
  let someColor = color(r, g, b);
  let someWalker = new Walker(x, y, someColor);
  theWalkers.push(someWalker);
}

function mousePressed(){
  spawnWalker(mouseX, mouseY);
}