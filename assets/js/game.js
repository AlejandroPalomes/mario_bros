function World() {

}

function Game() {
    var screenDisplacement = 200;
    var previousY = Boolean;
    var worldMove = 200;
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
            console.log(screenX - (screenXInitial - 800))

            if (posX < borderLeft) {
                posX = borderLeft;
                speedX = 0;
            } else if (posX + mario.width > screenX - screenDisplacement - (screenXInitial - 800)) {
                posX = screenX - screenDisplacement - (screenXInitial - 800) - mario.width;
                speedX = 0;
            }

            if (posY < 0) {
                posY = 0;
                speedY = 0;
                mario.src = "assets/img/mario-stand-01.png"
                jumping = false;
                falling = false;
            } else if (posY > 0 && posY <= eTop && posX < posXe + goompa.width && posX + mario.width > posXe) {
                posY = eTop;
                speedY = 0;
                mario.src = "assets/img/mario-stand-01.png"
                // jumping = false;
                falling = false;
            } else if (posY > posYe2 - 11 && posY <= eTop2 && posX < posXe2 + goompa2.width && posX + mario.width > posXe2) {
                console.log("collision")
                if (posY == -8) {
                    console.log("dead")
                    mario.src = "assets/img/mario-out.jpg"
                }
                posY = eTop2;
                speedY = 0;
                if (falling) {
                    posYe2 = -100
                    speedY = 80;
                    goompa2.src = "assets/img/goompa3.png"
                    document.querySelector(".kill").play();
                    score += 10;
                    document.querySelector("#score").innerHTML = ('00000' + score).slice(-6);
                    var removeEnemy = setTimeout(function () {
                        // goompa2.style.bottom = "-150px";
                        goompa2.classList.add("hidden");
                    }, 1000);
                }
                falling = false;
            }

            solidBlocks.forEach(element => {

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
                        // console.log("border-top")
                        posY = posYB - mario.height;
                        speedY = 0;
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
                        // console.log("entro por izquierda")
                        speedX = 0;
                        posX = posXB - mario.width;
                    } else if (posX > posXB + element.width / 2) {
                        // console.log("entro por derecha")
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

            eTop = posYe + goompa.clientHeight;
            eTop2 = posYe2 + parseInt(goompa2.height);

            //console.log(posYe2);

            posXe2 -= 4;
            goompa2.style.left = posXe2 + "px";

            worldMove -= 1;
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
/*
Game.Player = function (x, y) {

     //mine
    //  var img = document.getElementById("mario");
    //  var pat = this.buffer.createPattern(img, no-repeat);

     //mine
     this.mario = document.querySelector(".mario");

    this.color = "#ff0000";
    // this.color = testing.testing;
    //this.height = 16;
    // this.width = 16;
    this.jumping = true;
    this.velocity_x = 0;
    this.velocity_y = 0;
    this.x = 10;
    this.y = 50;

};

Game.Player.prototype = {

    constructor: Game.Player,

    jump: function () {

        if (!this.jumping) {


            this.jumping = true;
            this.velocity_y -= 20;

        }

    },

    moveLeft: function () {
        this.velocity_x -= 0.5;
    },
    moveRight: function () {
        this.velocity_x += 0.5;
    },

    update: function () {

        this.x += this.velocity_x;
        this.y += this.velocity_y;

    }

};*/