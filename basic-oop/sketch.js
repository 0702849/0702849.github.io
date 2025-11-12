//Basic OOP Syntax demo

class Dog {
  constructor(name){
    this.age = 0;
    this.name = name;
  }
  bark(){
    console.log(this.name + " barked!");
  }
}

// let fido = new Dog("Fido");
// let snoopy = new Dog("Snoopy");

const DOGTYPES = {
  fido: {
    age: 3,
    name: "Fido",
  },
  snoopy: {
    age: 4,
    name: "Snoopy"
  }
};

let puppy = new Dog(DOGTYPES[1]);

function setup() {
  createCanvas(windowWidth, windowHeight);
  puppy.bark();
}

function draw() {
  background(220);
}
