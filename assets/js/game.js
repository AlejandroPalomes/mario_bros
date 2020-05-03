function World() {

}

function Game() {
    var screenDisplacement = 0;
    var previousY = Boolean;
    var worldMove = 0;
    var borderLeft = 0 - screenDisplacement;
    var screenXInitial = screenX;

    this.world = { //with this, we say that world is an object of Game

        background_color: "rgba(40,48,56,1)",

        friction: 0.7,
        gravity: 8,
        gravityFriction: 0.8,

        collideObject: function () {

            borderLeft++;
            screenX++;

            if (posX < borderLeft) {
                posX = borderLeft;
                speedX = 0;
            } else if (posX + mario.width > screenX - (screenXInitial - 800)) {
                posX = screenX - (screenXInitial - 800) - mario.width;
                speedX = 0;
            }

            if (posY < 0) {
                posY = 0;
                speedY = 0;
                mario.src = "assets/img/mario-stand-01.png"
                jumping = false;
                falling = false;
            }


            //!GOOMBA PHYSICS\\

            goomba.forEach(function (element) {
                var posXG = parseInt(element.style.left);
                var posYG = parseInt(element.style.bottom);
                var eTopG = posYG + element.height;

                if (posY > posYG - 11 && posY <= eTopG && posX < posXG + element.width && posX + mario.width > posXG && element.classList.contains("alive")) {
                    if (!falling) {
                        console.log("dead")
                        dead()
                        mario.src = "assets/img/mario-out.png"
                    }
                    posY = eTopG;
                    speedY = 0;
                    if (falling) {
                        //alive = false;
                        posYG = -100;
                        speedY = 80;
                        element.src = "assets/img/goomba3.png"
                        document.querySelector(".kill").play();
                        score += 10;
                        document.querySelector("#score").innerHTML = ('00000' + score).slice(-6);
                        element.classList.remove("alive");
                        var removeEnemy = setTimeout(function () {
                            element.style.bottom = "-150px";
                            element.classList.add("hidden");
                        }, 1000);
                    }
                    falling = false;
                }
            });

            //!BLOCKS PHYSICS\\

            solidBlocks.forEach(function (element) {

                var posXB = parseInt(element.style.left);
                var posYB = parseInt(element.style.bottom);
                var eTopB = posYB + element.height;

                if (posY > posYB && posY <= eTopB && posX < posXB + element.width && posX + mario.width > posXB) {
                    var onTop = false;
                    if (falling) {
                        posY = eTopB;
                        speedY = 0;
                        mario.src = "assets/img/mario-stand-01.png"
                        onTop = true;
                    }

                    if (!onTop) {
                        posY = posYB - mario.height;
                        speedY = 0;
                        if (element.classList.contains("question")) {
                            element.src = "assets/img/question2.png"
                        }
                    }
                }
            });

            tubes.forEach(element => {

                var posXB = parseInt(element.style.left);
                var posYB = parseInt(element.style.bottom);
                var eTopB = posYB + element.height;

                if (posY > posYB && posY <= eTopB && posX < posXB + element.width && posX + mario.width > posXB) {
                    var onTop = false;
                    if (falling) {
                        posY = eTopB;
                        speedY = 0;
                        mario.src = "assets/img/mario-stand-01.png"
                        onTop = true;
                    } else if (posX + mario.width <= (posXB + element.width / 2)) {
                        if (posY < 10 && speedX == 0 && posX < borderLeft + 10) {
                            // alert("gameover")
                            dead();
                        }
                        speedX = 0;
                        posX = posXB - mario.width;
                    } else if (posX > posXB + element.width / 2) {
                        speedX = 0;
                        posX = posXB + element.width;
                    }
                }
            });

            coins.forEach(element => {

                var posXC = parseInt(element.style.left);
                var posYC = parseInt(element.style.bottom);
                var eTopC = posYC + element.height;

                if (posY > posYC - 11 && posY <= eTopC && posX < posXC + element.width && posX + mario.width > posXC) {
                    element.style.bottom = -200 + "px";
                    element.classList.add("hidden");
                    document.querySelector(".coinSound").currentTime = 0;
                    document.querySelector(".coinSound").volume = 0.7;
                    document.querySelector(".coinSound").play();
                    coinCount++
                    document.querySelector(".coinCounter").innerHTML = ('0' + coinCount).slice(-2);
                }
            });



        },

        update: function () {
            if (previousY > posY) {
                falling = true;
            } else if (previousY < posY) {
                falling = false;
            } else if (previousY == posY) {
                jumping = false;
            }

            previousY = posY;

            speedY -= this.gravity;
            //!UPDATE
            posX += speedX;
            posY += speedY;
            //!UPDATE
            speedX *= this.friction;
            speedY *= this.gravityFriction;

            mario.style.left = posX + "px";
            mario.style.bottom = posY + "px";

            //!goomba movement\\
            goomba.forEach(function (element) {

                if (posX > parseInt(element.style.left) - 900) {

                    speed = -1;
                    posXG = parseInt(element.style.left);

                    //? AI in Goomba Collider
                    var leftTube = parseInt(element.previousElementSibling.style.left);
                    var leftTubeW = element.previousElementSibling.width;
                    var rightTube = parseInt(element.nextElementSibling.style.left);
                    var rightTubeW = element.nextElementSibling.width;

                    if (element.previousElementSibling.classList.contains("tube")) {
                        if (posXG < leftTube + leftTubeW) {
                            element.classList.remove("moveLeft")
                        }

                        if (element.classList.contains("moveLeft")) {
                            element.style.left = posXG + "px";
                            posXG--;
                        } else {
                            posXG += 2;
                            element.style.left = posXG + "px";
                        }
                    }

                    if (element.nextElementSibling.classList.contains("tube")) {
                        if (posXG + element.width > rightTube) {
                            element.classList.add("moveLeft")
                        }

                        if (element.classList.contains("moveLeft")) {
                            element.style.left = posXG + "px";
                            posXG--;
                        } else {
                            posXG += 2;
                            element.style.left = posXG + "px";
                        }
                    } else if (element.nextElementSibling.nextElementSibling.classList.contains("tube")) {
                        if (posXG + element.width > parseInt(element.nextElementSibling.nextElementSibling.style.left)) {
                            element.classList.add("remove")
                        }
                    }

                    posXG += speed;
                    element.style.left = posXG + "px";
                }
            })

            //screenX += worldSpeed;


            worldMove -= worldSpeed;
            document.querySelector("#main-container").style.left = worldMove + "px";

            this.collideObject();

            checkTime();

        }

    };

    this.update = function () {

        this.world.update();

    };

};

function checkTime() {
    if (time == 0) {
        alert("GAME OVER");
    }
}

function dead() {
    mario.src = "assets/img/mario-out.png"
    alive = false;
    document.querySelector(".theme").pause();
}

Game.prototype = {
    constructor: Game
};