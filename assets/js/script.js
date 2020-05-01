let mario = document.querySelector(".mario");
let enemy = document.querySelector(".enemy");
// let marioX =   mario.style.left
let enemyX =   enemy.style.left
const marioStyles = getComputedStyle(document.querySelector(".mario"));
let speedX = 20;
let positionX = 0;
var keyState = {};
var antiSpam = false;
let play = true;
enemyX = 1100;
enemy.style.left = enemyX + "px";
let enemySpeed = 5;

document.addEventListener('keydown', function (e) {
    keyState[e.keyCode || e.which] = true;
    console.log(keyState)
}, true);
document.addEventListener('keyup', function (e) {
    keyState[e.keyCode || e.which] = false;
    console.log(keyState);
}, true);

document.addEventListener("keydown", () => {
    if (event.key == "w" && marioStyles.bottom == "0px" && play) {
        jump();
    }
    if (event.key == "p") {
        play = !play;
        if (play) {
            gameLoop();
        }
    };
});

function gameLoop() {

    if (keyState[37] || keyState[65] && positionX >= 0 && positionX < 960) {
        positionX -= speedX;
    }
    if (keyState[39] || keyState[68] && positionX >= 0 && positionX < 960) {
        positionX += speedX;
    }
    if (positionX > 951) {
        positionX = 950;
    } else if (positionX < 0) {
        positionX = 0;
    }

    enemyX -= enemySpeed;

    console.log("marioX " + mario.style.left)
    enemy.style.left = enemyX + "px";
    mario.style.left = positionX + "px";

    var marioY = parseInt(marioStyles.bottom);
    console.log(parseInt(marioStyles.bottom))
    // var enemyY = parseInt(enemy.style.bottom);

    if ((positionX + 100) >= enemyX && positionX <= (enemyX + 75) &&
            (marioY+100) >= 0 && (marioY <= 60)) {
        console.log("Working")
    }else if((positionX + 100) >= enemyX && positionX <= (enemyX + 75) &&
    (marioY+100) >= 61 && (marioY <= 75)){
        console.log("killed")
        jump();
        killEnemy();
    }

    if (play) {
        setTimeout(gameLoop, 30);
    }
}

gameLoop();

var walkin = setInterval(() => {
    enemy.classList.toggle("walk")
}, 500);


function jump() {
    document.querySelector(".sounds").currentTime = 0.5;
    document.querySelector(".sounds").play();

    mario.classList.toggle("jump");
    mario.classList.toggle("jump-image");

    let ret = setTimeout(() => {
        mario.classList.toggle("jump-image")
        mario.classList.toggle("jump")
    }, 500);
}
function killEnemy() {
    var main = document.querySelector("#main-container");
    document.querySelector(".sounds").currentTime = 0;
    document.querySelector(".kill").play();
    enemySpeed = 0;
    clearInterval(walkin);
    enemy.classList.add("dead");
    const remove = setTimeout(() => {
        document.querySelector("#main-container").removeChild(enemy);
    }, 1000);
}