var mario = document.querySelector(".mario");
var goomba = document.querySelectorAll(".goomba");
// var goomba2 = document.querySelector(".goomba2");
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
// var posXe2 = parseInt(getComputedStyle(goomba2).left);
// var posYe2 = parseInt(getComputedStyle(goomba2).bottom);
var eTop2 = 0;
var coinCount = 0;
var score = 0;
var time = 400;
var floor = document.querySelectorAll(".floor__section");

var windowSize = window.innerWidth;
var resizeContainer = document.querySelector(".resize");

var worldSpeed = 3;

var alive = true;


var solidBlocks = document.querySelectorAll(".collider");
var coins = document.querySelectorAll(".coin");
var tubes = document.querySelectorAll(".tube");

var walkigGoomba = setInterval(function(){
    goomba.forEach(function(element){
        if (element.classList.contains("alive") && element.classList.contains("walk")){
            element.src = "assets/img/goomba1.png";
            element.classList.toggle("walk");
        }else if(element.classList.contains("alive") && !element.classList.contains("walk")){
            element.src = "assets/img/goomba2.png";
            element.classList.toggle("walk");
        }
    })
    
}, 300);

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

    //display()

};


/////////////////
//// OBJECTS ////
/////////////////

var controller = new Controller();
//var display = new Display(document.querySelector("canvas"));
var game = new Game();
// var engine = new Engine(1000 / 30, update);


////////////////////
//// INITIALIZE ////
////////////////////0
//engine();
display();
document.addEventListener("keydown", keyDownUp);
document.addEventListener("keyup", keyDownUp);
window.addEventListener("touchstart", function(){
    document.querySelector("body").style.backgroundColor = "red"
})
window.addEventListener("resize", display)

// });

function moveRight() {
    speedX = 20;
}

function moveLeft() {
    speedX = -20;
}

function jump() {
    if (!jumping){
        jumping = true;
        speedY =  70;
        mario.src = "assets/img/mario-jump-01.png"
        //document.querySelector(".theme").play();
        document.querySelector(".sounds").currentTime = 0.5;
        document.querySelector(".sounds").volume = 0.3;
        document.querySelector(".sounds").play();
        document.querySelector(".theme").loop = true;
    }

}