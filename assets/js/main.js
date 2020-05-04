var mario = document.querySelector(".mario");
var goomba = document.querySelectorAll(".goomba");
var topScore = document.querySelector("#topScore").innerHTML;
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
var currentUser = undefined;
var users = [];
var time = 400;
var floor = document.querySelectorAll(".floor__section");

var pause = false;

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
function touchLeft() {
    controller.keyDownUp("a", 37);
};
function touchUp() {
    controller.keyDownUp("w", 38);
};
function touchRight() {
    controller.keyDownUp("d", 39);
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

// engine();

////////////////////
//// INITIALIZE ////
////////////////////0
display();
document.addEventListener("keydown", keyDownUp);
document.addEventListener("keyup", keyDownUp);
document.querySelector("#touchLeft").addEventListener("touchstart", touchLeft);
document.querySelector("#touchUp").addEventListener("touchstart", touchUp);
document.querySelector("#touchRight").addEventListener("touchstart", touchRight);
document.querySelector(".start__button").addEventListener("click", checkUsername);
document.querySelector("#restart").addEventListener("click", function(){
    game.restart()
});

document.querySelector("#start-submit").addEventListener("click", function(){

    event.preventDefault();

    document.querySelector(".login__container").classList.add("hidden");
    document.querySelector(".stats").classList.remove("hidden");
    document.querySelector("#screen").classList.remove("hidden");
    document.querySelector("#floor").classList.remove("hidden");
    engine();
})
// window.addEventListener("touchstart", function(){
//     document.querySelector("body").style.backgroundColor = "red";
//     jump()
// })
window.addEventListener("resize", display)
// document.querySelector(".theme").play();
document.querySelector(".theme").loop = true;

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
    
        document.querySelector(".sounds").currentTime = 0.5;
        document.querySelector(".sounds").volume = 0.3;
        document.querySelector(".sounds").play();
    }
}
var tet = undefined;
function checkUsername(){
    event.preventDefault();
    var userValue = document.querySelector("#player").value;
    var regexp = new RegExp('^[a-zA-Z]+$');

    if(userValue.match(regexp)){
        // if (currentUser === undefined){
            console.log(User.name);
            if (users){
                currentUser = new User(userValue);
                document.querySelector("#start-submit").click();
                console.log(tet)
                tet = currentUser;
                console.log(currentUser)
                console.log(User.currentUser)
                console.log("New User")
                console.log(User[name])
        } else{
            console.log("User registered!")
            currentUser = User(userValue)
        }
    }else{}
 
}