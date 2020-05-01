// this.test = window.addEventListener("load", function (event) {

///////////////////
//// FUNCTIONS ////
///////////////////

var mario = document.querySelector(".mario");
var goompa = document.querySelector(".goompa");
var goompa2 = document.querySelector(".goompa2");
var speedX = 0;
var speedY = 0;
var posX = 0;
var posY = 0;
var jumping = false;
var falling = false;
var posXe = 0;
var posYe = 0;
var eTop = 0;
var posXe2 = parseInt(goompa2.style.left);
var posYe2 = parseInt(goompa2.style.bottom);
var eTop2 = 0;

function keyDownUp(event) {
    // console.log(event.type) //keydown - keyup
    // keyState[event.keyCode || event.which] = true;
    controller.keyDownUp(event.type, event.keyCode);

};

function update() {

    if (controller.left.active) {
        // game.world.player.moveLeft();
        moveLeft();
        // mario.style.left +=10;

    }
    if (controller.right.active) {
        // game.world.player.moveRight();
        moveRight();
    }
    if (controller.up.active) {
        // game.world.player.jump();
        // controller.up.active = false;
        jump();
    }

    game.update();

};

/////////////////
//// OBJECTS ////
/////////////////

var controller = new Controller();
//var display = new Display(document.querySelector("canvas"));
var game = new Game();
// var engine = new Engine(1000 / 30, update);

engine();

////////////////////
//// INITIALIZE ////
////////////////////0

document.addEventListener("keydown", keyDownUp);
document.addEventListener("keyup", keyDownUp);
//document.addEventListener("resize", resize);

//engine.start();

// });

function moveRight() {
    speedX = 20;
}

function moveLeft() {
    speedX = -20;
}

function jump() {
    // speedY = 150;
    if (!jumping){
        console.log("jump() called")
        jumping = true;
        speedY =  80;
        mario.src = "assets/img/mario-jump-01.png"
        document.querySelector(".sounds").currentTime = 0.5;
        document.querySelector(".sounds").play();
    }

    // if (!this.jumping) {
    //     this.jumping = true;
    //     speedY = 20;
    // }
}