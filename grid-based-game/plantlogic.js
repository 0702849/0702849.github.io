// == 2-3 plants/towers are being made. ==
// - sunflower/economy
// - peashooter/offense
// - walnut/defense

// -- plant types/seeds --
const PLANTTYPE = {
    peashooter: {
        name: "peashooter",
        health: 6,
        bodySizeH: 20,
        bodySizeW: 30,
        bodyColor: [95, 160, 82], //https://colors.artyclick.com/color-names-dictionary/color-names/muted-green-color
        damage: 1,
        //shot interval = 1.2 seconds
    },
    walnut: {
        name: "walnut",
        health: 20,
        bodySizeH: 40,
        bodySizeW: 20,
        bodyColor: [178, 137, 101], //https://www.color-name.com/walnut-brown.color
        damage: 0,
    },
    sunflower: {
        name: "sunflower",
        health: 6,
        bodySizeH: 20,
        bodySizeW: 20,
        bodyColor: [238, 198, 31], //https://www.color-name.com/warm-golden-yellow.color
        damage: 0
    },
};

let currentSeed = "peashooter";


// --placing plants--
function keyPressed(){
    if(keyCode === 49){
        seed = PLANTTYPE["sunflower"];
    }
    if(keyCode === 50){
        seed = PLANTTYPE["peashooter"];
    }
    if(keyCode === 51){
        seed = PLANTTYPE["walnut"];
    }
    console.log(seed);
}

function spawnPlant(row, col, type = currentSeed) {
    if(!PLANTTYPE[type]){
        return false;
    }
    if(plantsGrid[row][col]){
        return false;
    }
    plantsGrid[row][col] = new Plant(type, row, col);
    return true;
}

// --plants functionality(damage and such)--

function blockingPlantAt(row, x){
    //return the plant occupying the cell at the x coord or null
    //used by zombies to know when to attack
    const col = Mathl.floor(x / CELLSIZE);
    const p = (plantsGrid[row] && plantsGrid[row][col]) || null;
    return p;
}

// == CORE OBJECTS ==

//plant class
class Plant{
    constructor(type, row, col){
        const seed = PLANTTYPE[type];
        this.type = type;
        this.row = row;
        this.col = col;
        
        //stats
        this.health = seed.health;
        this.damage = seed.damage;
        this.shotInterval = seed.shotInterval;
        this.lastShotAt = 0;

        //drawing the plant
        this.bodySizeH = seed.bodySizeH;
        this.bodySizeW = seed.bodySizeW;
        this.bodyColor = seed.boyColor;

        //plant positioning
        const pos = gridFromXY(row, col);
        this.x = pos.x + CELLSIZE / 2;
        this.y = pos.y + CELLSIZE / 2;
    }

    update(){
        if(frameCount = this.lastShotAt >= this.shootEvery){
            peas.push(new Pea(this.row, this.x + this.bodyW * 0.6, this.y, this.damage));
            this.lastShotAt = frameCount;
        }
    }

    draw(){
        //body, stem and head
        noStroke();
        fill(60, 170, 80);
        rectMode(CENTER);
        rect(this.x - 6, this.y + 6, 6, 18, 4);
        fill(this.bodyColor);
        circle(this.x, this.y - 6, this.bodyW);
        fill(40, 110, 50);
        ellipse(this.x + this.bodyW * 0.35, this.y - 8, 10, 10);

        //HP bar
        const BARW = CELLSIZE - 8;
        const HPRATIO = Math.max(0, this.hp) / PLANTTYPE[this.type].hp;
        noStroke();
        fill(0, 0, 0, 120);
        rect(this.x - BARW / 2, this.y + CELLSIZE * 0.35, BARW, 6, 4);
        fill(60, 220, 60);
        rect(this.x - BARW / 2, this.y + CELLSIZE * 0.35, BARW * HPRATIO, 6, 4)

    }


}

//projectile class AKA peas
class Pea {
    constructor(row, x, y, dmg = 1){

    }
}