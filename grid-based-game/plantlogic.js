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
        shotInterval: 60,
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
        this.bodyH = seed.bodySizeH;
        this.bodyW = seed.bodySizeW;
        this.bodyColor = seed.bodyColor;

        //plant positioning
        const pos = gridToXY(row, col);
        this.x = pos.x + CELLSIZE / 2;
        this.y = pos.y + CELLSIZE / 2;
    }

    update(){
        if(frameCount - this.lastShotAt >= this.shotInterval){
            peas.push(new Pea(this.row, this.x + this.bodyW * 0.6, this.y, this.damage));
            this.lastShotAt = frameCount;
        }
    }

    draw() {
    // everything inside push/pop so rectMode doesn't leak
        push();
        noStroke();
        rectMode(CENTER);

        // stem
        fill(60, 170, 80);
        rect(this.x - 6, this.y + 6, 6, 18, 4);

        // head
        fill(this.bodyColor);
        circle(this.x, this.y - 6, this.bodyW);

        // weird little snout nozzle thing
        fill(40, 110, 50);
        ellipse(this.x + this.bodyW * 0.35, this.y - 8, 10, 10);
        pop();

        // HP bar (explicitly use CORNER math and the correct health fields)
        const BARW = CELLSIZE - 8;
        const HPRATIO = Math.max(0, this.health) / PLANTTYPE[this.type].health;  // was this.hp
        noStroke();
        // make sure bars are drawn as CORNER rects
        rectMode(CORNER);
        fill(0, 0, 0, 120);
        rect(this.x - BARW / 2, this.y + CELLSIZE * 0.35, BARW, 6, 4);
        fill(60, 220, 60);
        rect(this.x - BARW / 2, this.y + CELLSIZE * 0.35, BARW * HPRATIO, 6, 4);
    }


}

//projectile class AKA peas
class Pea {
    constructor(row, x, y, damage = 1){
        this.row = row;
        this.x = x;
        this.y = y;
        this.speed = 6;
        this.damage = damage;
        this.alive = true;
    }

    update(){
        if(!this.alive){
            return;
        }
        this.x += this.speed;

        for(const z of zombies){
            if(!z.alive || z.row !== this.row){
                continue;
            }
            const hit = this.x >= z.x - z.bodyW / 2 && this.x <= z.x + z.bodyW / 2;
            if(hit){
                z.hit(this.damage);
                this.alive = false;
                break;
            }
        }
        if(this.x > WIDTH + 30) {
        this.alive = false;
        }
    }

    draw(){
        if(!this.alive){
            return;
        }
        noStroke();
        fill(160, 255, 90);
        circle(this.x, this.y -8, 10);
    }
}

function drawPlant(){
    for(let rows = 0; rows < ROWS; rows++){
        for(let cols = 0; cols < COLS; cols++){
            const p = plantsGrid[rows][cols];
            if(p){
                p.draw();
            }
        }
    }
}

function updatePlants(){
    for(let rows = 0; rows < ROWS; rows++){
        for(let cols = 0; cols < COLS; cols++){
            const p = plantsGrid[rows][cols];
            if(p){
                p.update();
            }
        }
    }
}

function drawProjectile(){
    for(const pea of peas){
        pea.draw();
    }
}

function updateProjectile(){
    for(const pea of peas){
        pea.update();
    }
    peas = peas.filter(p => p.alive);
}