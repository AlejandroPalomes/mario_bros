
function World(){
    

}
var previousY = Boolean;

function Game() {

    this.world = { //with this, we say that world is an object of Game

        background_color: "rgba(40,48,56,1)",

        friction: 0.8,
        gravity: 8,

        collideObject: function () {

            if (posX < 0) {
                posX = 0;
                speedX = 0;
            } else if (posX + mario.width > screenX) {
                posX = screenX-mario.width;
                speedX = 0;
            }

            if (posY < 0) {
                posY = 0;
                speedY = 0;
                mario.src = "assets/img/mario-stand-01.png"
                jumping = false;
                falling = false;
            }else if(posY > 0 && posY <= eTop && posX < posXe+goompa.width && posX+mario.width > posXe){
                posY = eTop;
                speedY = 0;
                mario.src = "assets/img/mario-stand-01.png"
                // jumping = false;
                falling = false;
            }else if(posY > posYe2-11 && posY <= eTop2 && posX < posXe2+goompa2.width && posX+mario.width > posXe2){
                console.log("collision")
                if (posY == -8){
                    console.log("dead")
                    mario.src = "assets/img/mario-out.jpg"
                }
                posY = eTop2;
                speedY = 0;
                if(falling){
                    posYe2 = -100
                    speedY = 80;
                    goompa2.src = "assets/img/goompa3.png"
                    document.querySelector(".kill").play();
                    var removeEnemy = setTimeout(function(){
                        goompa2.style.bottom = "-150px";}, 1000);
                }
                falling = false;
            }

            solidBlocks.forEach(element => {

                var posXB = parseInt(element.style.left);
                var posYB = parseInt(element.style.bottom);
                var eTopB = posYB + element.height;

                if(posY > posYB && posY <= eTopB && posX < posXB+element.width && posX+mario.width > posXB){
                    posY = eTopB;
                    speedY = 0;
                    mario.src = "assets/img/mario-stand-01.png"
                    // jumping = false;
                    falling = false;
                }else if (posY + mario.height > posYB && posY < eTopB && posX < posXB+element.width && posX+mario.width > posXB) {
                        // object.jumping = false;
                        // object.y = this.height - object.height;
                        console.log("border-top")
                        posY = posYB - mario.height;
                        speedY = 0;
                    }
            });
            // else if (object.y + object.height > this.height) {
            //     jumping = false;
                // object.jumping = false;
                // object.y = this.height - object.height;
                // object.velocity_y = 0;
            // }

            coins.forEach(element => {

                var posXC = parseInt(element.style.left);
                var posYC = parseInt(element.style.bottom);
                var eTopC = posYC + element.height;

                if(posY > posYC-11 && posY <= eTopC && posX < posXC+element.width && posX+mario.width > posXC){
                    element.style.bottom = -200 + "px";
                    document.querySelector(".coinSound").currentTime = 0;
                    document.querySelector(".coinSound").play();
                    coinCount++
                }
            });



        },

        update: function () {



            if(previousY > posY){
                falling = true;
            }else if (previousY < posY){
                falling = false;
            }else if(previousY == posY){
                jumping = false;
            }

            previousY = posY;

            speedY -= this.gravity;
            //!UPDATE
            posX += speedX;
            posY += speedY;
            //!UPDATE
            speedX *= this.friction;
            speedY *= this.friction;

            mario.style.left = posX + "px";
            mario.style.bottom = posY + "px";

            eTop = posYe + goompa.clientHeight;
            eTop2 = posYe2 + parseInt(goompa2.height);

            console.log(posYe2);


            // this.player.velocity_y += this.gravity;
            // this.player.update();

            // this.player.velocity_x *= this.friction;
            // this.player.velocity_y *= this.friction;


            // this.collideObject(this.player);
            this.collideObject();

        }

    };

    this.update = function () {

        this.world.update();

    };

};

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