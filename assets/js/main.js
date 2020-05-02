var mario = document.querySelector(".mario");
var goompa = document.querySelectorAll(".goompa");
// var goompa2 = document.querySelector(".goompa2");
var screen = document.querySelector("#main-container");
var screenX = parseInt(getComputedStyle(screen).width);
var speedX = 0;
var speedY = 0;
var posX = 0;
var posY = 0;
var jumping = false;
var falling = false;
var posXe = 0;
var posYe = 0;
var eTop = 0;
// var posXe2 = parseInt(getComputedStyle(goompa2).left);
// var posYe2 = parseInt(getComputedStyle(goompa2).bottom);
var eTop2 = 0;
var coinCount = 0;
var score = 0;
var time = 400;

var alive = true;

var goompaY = [];

goompa.forEach(function(element){
    goompaY.push(parseInt(element.style.bottom));
})


var solidBlocks = document.querySelectorAll(".collider");
var coins = document.querySelectorAll(".coin");
var tubes = document.querySelectorAll(".tube");


function keyDownUp(event) {
    controller.keyDownUp(event.type, event.keyCode);
};

var restTime = setInterval(() => {
    time--;
    document.querySelector("#time").innerHTML = time;
}, 1000);

function update() {

    if (controller.left.active) {
        moveLeft();
    }
    if (controller.right.active) {
        moveRight();
    }
    if (controller.up.active) {
        jump();
    }
    if(alive){
        game.update();
    }

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
    if (!jumping){
        console.log("jump() called")
        jumping = true;
        speedY =  80;
        mario.src = "assets/img/mario-jump-01.png"
        document.querySelector(".theme").play();
        document.querySelector(".sounds").currentTime = 0.5;
        document.querySelector(".sounds").volume = 0.3;
        document.querySelector(".sounds").play();
        document.querySelector(".theme").loop = true;
    }

}