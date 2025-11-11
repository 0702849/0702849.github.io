//create only normal zombies unless theres enough time.


//==EXTRA==
//endless - add 10 zombies per wave
//wave one(10), wave two(20), wave three(30)......
//after every wave give 300 sun and give a 30 seconds countdown
//during this period plants have no cooldown
//this does not happen at the start of the game
//keep track of flags passed and display on main menu

// --state variables--
let spawningEnabled = true;
let zombies = [];

// --global variables--

// --constants--

// -- levels and wave plans --

                            //increase amount of zombies depending on level difficulty
                            // level one - one flag, 20 zombies
                            // ----------flag----------

                            //level two - one flag, 30 zombies
                            // ----------flag--------------------

                            //level three - two flags, 45 zombies
                            // ----------flag---------------flag---------------
const LEVELS = {
    1:{
        total: 20, spawnEvery: 90
    },
    2:{
        total: 30, spawnEvery: 75
    },
    3:{
        total: 45, spawnEvery: 60
    }
}

let levelSpawn = {
    level: 1,
    remaining: 0,
    spawnEvery: 90,
};

// == FUNCTIONS ==
function startLevel(levelNumber = 1){
    const LVL = LEVELS[levelNumber] || LEVELS[1];
    levelSpawn.level = levelNumber;
    levelSpawn.remaining = LVL.total;
    levelSpawn.spawnEvery = LVL.spawnEvery;
}



// == CORE OBJECTS ==                                                   :p
class Zombie {
    constructor(){
        this.speed = 5;
        this.size = 10;
        this.color = "green";
    }

    display(){
        fill(this.color);
        stroke(this.color);
    }

    spawn(){
        let num = random(120);
        if(num <= 20){
        }
        else if(20 < num <= 40){
        }
        else if(40 < num <= 60){
        }
        else if(60 < num <= 80){
        }
        else if(80 < num <= 100){
        }
        else if(100 < num <= 120){
        }
    }
    move(){

    }
}