// == 2-3 plants/towers are being made. ==
// - sunflower/economy
// - peashooter/offense
// - walnut/defense

let produceSun = false;

// -- plant types/seeds --
const PLANTTYPE = {
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
    peashooter: {
        name: "peashooter",
        health: 6,
        bodySizeH: 20,
        bodySizeW: 30,
        bodyColor: [95, 160, 82], //https://colors.artyclick.com/color-names-dictionary/color-names/muted-green-color
        damage: 1,
        //shot interval = 1.2 seconds
    }
};

let seed = PLANTTYPE["walnut"];


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

function spawnPlant(seed) {

}

class Plant{
    constructor(seedling = ""){
        const seed = PLANTTYPE[seedling];
        
        //stats
        this.health = seed.health;
        this.damage = seed.damage;

        //drawing the plant
        this.bodySizeH = seed.bodySizeH;
        this.bodySizeW = seed.bodySizeW;
        this.bodyColor = seed.boyColor;
    }
    draw(){
        noStroke();
        fill(this.bodyColor);
        ellipse(mouseX, mouseY, this.bodySizeW, this.bodySizeH);
    }


}