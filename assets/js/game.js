/* The Game class has been updated with a new Player class and given a new world
object that controls the virtual game world. Players, NPCs, world dimensions, collision
maps, and everything to do with the game world are stored in the world object. */

function World(){
    

}
var previousY = Boolean;

function Game() {

    this.world = { //with this, we say that world is an object of Game

        background_color: "rgba(40,48,56,1)",

        friction: 0.8,
        gravity: 8,

        //player: new Game.Player(), //create instance player inside de object world

        //height: 72, //world height
        //width: 128, //world width

        collideObject: function () {

            if (posX < 0) {
                posX = 0;
                speedX = 0;
            } else if (posX + mario.width > 1000) {
                posX = 1000-mario.width;
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
            }else if(posY > posYe2 && posY <= eTop2 && posX < posXe2+goompa2.width && posX+mario.width > posXe2){
                posY = eTop2;
                speedY = 0;
                mario.src = "assets/img/mario-stand-01.png"
                // jumping = false;
                falling = false;
            }
            // else if (object.y + object.height > this.height) {
            //     jumping = false;
                // object.jumping = false;
                // object.y = this.height - object.height;
                // object.velocity_y = 0;
            // }



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