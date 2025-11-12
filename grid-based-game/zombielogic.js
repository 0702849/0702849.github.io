//create only normal zombies unless theres enough time.


//==EXTRA==
//endless - add 10 zombies per wave
//wave one(10), wave two(20), wave three(30)......
//after every wave give 300 sun and give a 30 seconds countdown
//during this period plants have no cooldown
//this does not happen at the start of the game
//keep track of flags passed and display on main menu

// --zombie types--         normal for now
const ZOMBIE_TYPES = {
    normal: {
        hp: 5,
        speed: 0.6,
        bodyW: 40,
        bodyH: CELLSIZE * 0.7,
        head: CELLSIZE * 0.4,
        bodyColor: [170, 180, 170], //a nice visible greyish green chosen by yours truly
    },
    //cone
    //bucket
};

// --state variables--
let spawningEnabled = true;
let zombies = [];

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
function startLevel(levelNumber){
    //begin the level using a level based spawn sequence from the levels object
    const LVL = LEVELS[levelNumber] || LEVELS[1];
    levelSpawn.level = levelNumber;
    levelSpawn.remaining = LVL.total;
    levelSpawn.spawnEvery = LVL.spawnEvery;
}

function spawnTick() {
    //handles the timing of which zombies spawn for the current level using framecount % spawnEvery to determine the timing
    //when remaining = 0 it stops spawning zombies
    if (!spawningEnabled) {
        return;
    }

    if(levelSpawn.remaining > 0 && frameCount % levelSpawn.spawnEvery === 0){
        spawnZombie();
        levelSpawn.remaining = levelSpawn.remaining - 1;
    }
}

function spawnZombie(type = "normal"){
    //create a new zombie at a random row of the grid when called automatically by spawnTick()
    const row = floor(random(ROWS)); //constant to pick a lane to go down
    zombies.push(new Zombie(type, row));
}

function updateZombies() {
    //called to move the zombies towards the left of the lawn while removing dead zombies as well
    for (const z of zombies){
        z.update();
    }
    //dead zombies linger slightly longer after death
    zombies = zombies.filter( z => z.alive || z.x >= -100);
}

function drawZombies(){
    //draw every zombie currently on screen
    for(const z of zombies){
        z.draw();
    }
}
function zombieEatsBrains() {                               //WHHAAAAAT
    //call this function if you lose the game / fell under the lose condition
  for (const z of zombies) {
    if (z.pastLeft()) return true;
  }
  return false;
}

function firstInTheLane(row) {
    // return the closest alive zombie to the left in the lane AKA smallest x position
    // use for peashooter bullet tracking
    let best = null;
    for(const z of zombies){
        if(!z.alive || z.row !== row){
            continue;
        }
        if(best === null || z.x < best.x){
            best = z;
        }
    }
    return best;
}

// == CORE OBJECTS ==                                                   :p
class Zombie {
    constructor(type = "normal", row = 0){
        const spec = ZOMBIE_TYPES[type] || ZOMBIE_TYPES.normal;
        this.type = type;
        this.row = row;


        //spawning basics
        this.x = WIDTH + 30; //start off screen
        this.y = HUDHEIGHT + row * CELLSIZE + CELLSIZE / 2;
        
        //zombie stats
        this.hp = spec.hp;
        this.speed = spec.speed;
        this.bodyW = spec.bodyW;
        this.bodyH = spec.bodyH;
        this.head = spec.head;
        this.bodyColor = spec.bodyColor;

        this.alive = true;
    }

    draw(){
        //renders a simple rectangle as the zombie
        if (!this.alive){
            return;
        }

        push();
        translate(this.x, this.y);
        rectMode(CENTER);

        // thee bodey
        noStroke();
        fill(...this.bodyColor);
        rect(0, 0, this.bodyW, this.bodyH, 6);
        circle(0, -35, this.head);

        pop();
    }

    update(){
        if(!this.alive) {
            return;
        }
        this.x -= this.speed;
        if(this.x < -this.bodyW - 50){
            this.alive = false;
        }
    }

    hit(amount = 1){
        //reduce hp and tell me if they are dead when hp is less than or equal to 0
        if(!this.alive){
            return;
        }
        this.hp -= amount;
        if(this.hp <= 0){
            this.alive = false;
        }
    }

    pastLeft(){
        //return true if the zombie made it to the house :()
        return this.alive && this.x < -this.bodyW / 2;
    }
}