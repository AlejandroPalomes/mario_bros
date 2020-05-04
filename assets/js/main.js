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
// var posXe = 0;
// var posYe = 0;
var coinCount = 0;
var score = 0;
var currentUser = undefined;
var users = [];
var usersName = [];
var time = 400;
var floor = document.querySelectorAll(".floor__section");
var goombaPositions = [];
var floorPositions = [];
var coinsPositionsX = [];
var coinsPositionsY = [];

var restTime;
var pause = false;

var windowSize = window.innerWidth;
var resizeContainer = document.querySelector(".resize");

var worldSpeed = 3;

var alive = true;

var solidBlocks = document.querySelectorAll(".collider");
var coins = document.querySelectorAll(".coin");
var tubes = document.querySelectorAll(".tube");

var walkingGoomba = setInterval(function(){
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

users.forEach(function(element){
    usersName.push(element.name);
})

goomba.forEach(function(element){
    goombaPositions.push(element.style.left);
})

floor.forEach(function(element){
    floorPositions.push(element.style.left);
})

coins.forEach(function(element){
    coinsPositionsX.push(element.style.left);
})

coins.forEach(function(element){
    coinsPositionsY.push(element.style.bottom);
})



/////////////////
//// CONTROLS ///
/////////////////


function keyDownUp(event) {
    controller.keyDownUp(event.type, event.keyCode);
};
function touchLeft() {
    controller.keyDownUp("keydown", 37);
};
function touchUp() {
    controller.keyDownUp("keydown", 38);
};
function touchRight() {
    controller.keyDownUp("keydown", 39);
};
function touchLeftOut() {
    controller.keyDownUp("keyup", 37);
};
function touchUpOut() {
    controller.keyDownUp("keyup", 38);
};
function touchRightOut() {
    controller.keyDownUp("keyup", 39);
};


// var restTime = setInterval(() => {
//     time--;
//     document.querySelector("#time").innerHTML = time;
// }, 1000);

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
        game.world.update();
    }

    //display()

};


/////////////////
//// OBJECTS ////
/////////////////

var controller = new Controller();
var game = new Game();

////////////////////
//// INITIALIZE ////
////////////////////0
// engine();
display();
document.addEventListener("keydown", keyDownUp);
document.addEventListener("keyup", keyDownUp);
document.querySelector("#touchLeft").addEventListener("touchstart", touchLeft);
document.querySelector("#touchUp").addEventListener("touchstart", touchUp);
document.querySelector("#touchRight").addEventListener("touchstart", touchRight);
document.querySelector("#touchLeft").addEventListener("touchend", touchLeftOut);
document.querySelector("#touchUp").addEventListener("touchend", touchUpOut);
document.querySelector("#touchRight").addEventListener("touchend", touchRightOut);
document.querySelector(".start__button").addEventListener("click", checkUsername);

document.querySelector("#restart").addEventListener("click", function(){
    game.world.restart()
});

document.querySelector("#start-submit").addEventListener("click", function(){

    event.preventDefault();

    document.querySelector(".login__container").classList.add("hidden");
    document.querySelector(".stats").classList.remove("hidden");
    document.querySelector("#screen").classList.remove("hidden");
    document.querySelector("#floor").classList.remove("hidden");
    if (!alive){
        alive = true;
    }
    restTime = setInterval(() => {
        time--;
        document.querySelector("#time").innerHTML = time;
    }, 1000);
    engine();
})


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


function checkUsername(){
    event.preventDefault();
    var inputValue = document.querySelector("#player").value;
    var regexp = new RegExp('^[a-zA-Z]+$');

    if(inputValue.match(regexp)){
        if (usersName.includes(inputValue)){
            console.log("User registered!")
            document.querySelector("#start-submit").click();
        } else{
            currentUser = new User(inputValue);
            console.log("New User!")
            users.push(currentUser);
            usersName.push(currentUser.name);
            document.querySelector("#start-submit").click();
        }
    }else{}
 
}