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

            borderLeft+= worldSpeed;
            screenX+= worldSpeed;

            if (posX < borderLeft) {
                posX = borderLeft;
                speedX = 0;
            } else if (posX + mario.width > screenX - (screenXInitial - 800)) {
                posX = screenX - (screenXInitial - 800) - mario.width;
                speedX = 0;
            }

            if((posX+(mario.width/2)>3080 && posX+(mario.width/2)<3160)||(posX+(mario.width/2)>3760 && posX+(mario.width/2)<3880)||(posX+(mario.width/2)>6440 && posX+(mario.width/2)<6520)){
                if (posY < -80){
                    dead();
                }
            }else {
                if (posY < 0) {
                    posY = 0;
                    speedY = 0;
                    mario.src = "assets/img/mario-stand-01.png"
                    jumping = false;
                    falling = false;
                }

                if(posX+mario.width > 8255){
                    win();
                }
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
                        score += 100 * document.querySelector("#difficulty").value;
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
                        if (element.classList.contains("question") && !falling && !element.classList.contains("empty")) {
                            element.src = "assets/img/question2.png"
                            var rand = Math.random();
                            if(rand > 0.5 && rand < 0.7){
                                score += 200;
                            }else {
                                score += 50;
                            }
                            document.querySelector("#score").innerHTML = ('00000' + score).slice(-6);
                            element.classList.add("empty");
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
                    var tube3 = parseInt(document.querySelector("#tube3").style.left);
                    var tube3W = document.querySelector("#tube3").width;
                    var tube4 = parseInt(document.querySelector("#tube4").style.left);
                    var tube5 = parseInt(document.querySelector("#tube5").style.left);
                    var tube5W = document.querySelector("#tube3").width;
                    var tube6 = parseInt(document.querySelector("#tube6").style.left);
                    //var rightTubeW = element.nextElementSibling.width;


                    if(element.id == "goomba2" || element.id == "goomba3"){

                        if (posXG < tube3 + tube3W) {
                            element.classList.remove("moveLeft")
                        }else if(posXG+element.width > tube4){
                            element.classList.add("moveLeft")
                        }

                        if (element.classList.contains("moveLeft")) {
                            posXG--;
                            element.style.left = posXG + "px";
                        } else {
                            posXG += worldSpeed;
                            element.style.left = posXG + "px";
                        }

                    }else if(element.id == "goomba13" || element.id == "goomba14"){

                        if (posXG < tube5 + tube5W) {
                            element.classList.remove("moveLeft")
                        }else if(posXG+element.width > tube6){
                            element.classList.add("moveLeft")
                        }

                        if (element.classList.contains("moveLeft")) {
                            posXG--;
                            element.style.left = posXG + "px";
                        } else {
                            posXG += worldSpeed;
                            element.style.left = posXG + "px";
                        }

                    }
                    else{
                        if (element.previousElementSibling.classList.contains("tube")) {
                            if (posXG < leftTube + leftTubeW) {
                                element.classList.remove("moveLeft")
                            }
                            if (element.classList.contains("moveLeft")) {
                                posXG--;
                                element.style.left = posXG + "px";
                            } else {
                                posXG += worldSpeed;
                                element.style.left = posXG + "px";
                            }
                        }
    
                        if (element.nextElementSibling.classList.contains("tube")) {
                            if (posXG + element.width > rightTube) {
                                element.classList.add("moveLeft")
                            }
    
                            if (element.classList.contains("moveLeft")) {
                                posXG--;
                                element.style.left = posXG + "px";
                            } else {
                                posXG += worldSpeed;
                                element.style.left = posXG + "px";
                            }
    
                        }
                    }

                    posXG += speed;
                    element.style.left = posXG + "px";
                }
            });

            //screenX += worldSpeed;

            worldMove -= worldSpeed;
            document.querySelector("#main-container").style.left = worldMove + "px";

            floor.forEach(function(element){
                prevPos = parseInt(element.style.left);
                prevPos -= worldSpeed;
                element.style.left = prevPos + "px";
            })

            this.collideObject();

            checkTime();

        },

        restart: function(){
            //Reset all parameters, remove positions, remove listeners.. etc
            document.querySelector(".stats").classList.remove("dispel");
            document.querySelector("#screen").classList.remove("dispel");
            document.querySelector("#floor").classList.remove("dispel");
            document.querySelector("#gameoverScreen").classList.add("hidden");
            document.querySelector("#winScreen").classList.add("hidden");
            document.querySelector(".gameOver").pause();
            document.querySelector("#main-container").style.left = 0;
            document.querySelector(".login__container").classList.remove("hidden");
            document.querySelector("#screen").removeEventListener("transitionend", removeWin);
            document.querySelector(".stats").removeEventListener("transitionend", removeLose);
            mario.removeEventListener("animationend", marioWinMove);
            mario.removeEventListener("animationend", marioLoseMove);
            document.querySelector("#player").value = "";
            document.querySelector("#player").classList.remove("hidden");
            document.querySelector(".start__button").classList.remove("hidden");
            document.querySelector("#difficulty").value = "";
            document.querySelector("#difficulty").classList.add("hidden");
            document.querySelector(".difficulty__button").classList.add("hidden");
            mario.src = "assets/img/mario-stand-01.png";
            mario.style.left = 0 + "px";
            mario.style.bottom = 0 + "px";
            mario.classList.remove("hidden");
            mario.classList.remove("mario__dead");
            mario.classList.remove("mario__win");
            worldMove = 0;
            worldSpeed = 3;
            coinCount = 0;
            document.querySelector(".coinCounter").innerHTML = ('0' + coinCount).slice(-2);
            score = 0;
            document.querySelector("#score").innerHTML = ('00000' + score).slice(-6);
            borderLeft = 0;
            screenX = screenXInitial;
            speedX = 0;
            speedY = 0;
            posX = 0;
            posY = 0;
            jumping = false;
            falling = false;
            time = 400;
            document.querySelector("#time").innerHTML = time;

            //restTime;


            var index = 0;
            goomba.forEach(function(element){
                element.style.left = goombaPositions[index];
                element.style.bottom = 0 + "px";
                element.src = "assets/img/goomba1.png";
                element.classList.add("alive");
                element.classList.add("moveLeft");
                element.classList.remove("hidden");
                index++
            })

            index = 0;
            floor.forEach(function(element){
                element.style.left = floorPositions[index];
                index++
            })

            index=0;
            coins.forEach(function(element){
                element.style.left = coinsPositionsX[index];
                element.style.bottom = coinsPositionsY[index];
                element.classList.remove("hidden");
                index++
            })
            
            solidBlocks.forEach(function(element){
                if (element.classList.contains("question")) {
                    element.src = "assets/img/question.gif";
                    element.classList.remove("empty");
                }
            })

        
        }

    };

};

function checkTime() {
    if (time == 0) {
        alert("GAME OVER");
    }
}

this.pause = function (){
    if (!pause){
        pause = true;
    }else{
        pause = false;
        engine();
    }
}

function dead() {
    mario.src = "assets/img/mario-out.png";
    alive = false;
    document.querySelector(".theme").pause();
    document.querySelector(".dead").currentTime = 0.3;
    document.querySelector(".dead").play();
    var deadAnimation = setTimeout(function(){
        mario.classList.add("mario__dead");
    },750);
    mario.addEventListener("animationend", marioLoseMove);
    document.querySelector(".stats").addEventListener("transitionend", removeLose);
    // document.querySelector("#winScreen").classList.add("hidden");


    clearTimeout(restTime);

}

function marioLoseMove(){
    mario.classList.add("hidden");
    document.querySelector(".gameOver").currentTime = 0;
    document.querySelector(".gameOver").play();
    document.querySelector(".stats").classList.add("dispel");
    document.querySelector("#screen").classList.add("dispel");
    document.querySelector("#floor").classList.add("dispel");
}

function removeLose(){
    document.querySelector(".stats").classList.add("hidden");
    document.querySelector("#screen").classList.add("hidden");
    document.querySelector("#floor").classList.add("hidden");
    document.querySelector("#gameoverScreen").classList.remove("hidden");
}

function win(){
    clearTimeout(restTime)
    currentUser.score = obtainResult();
    var currentMax = currentUser.getMaxScore();
    if (currentMax > maxScore){
        maxScore = currentMax;
        topScore.innerHTML = ('00000' + maxScore).slice(-6);
        topUser.innerHTML = currentUser.name;
    }
    if(winners.includes(currentUser.name)){
        saveScore(currentMax);
    }else{
        winners.push(currentUser.name);
        addToScores(currentMax);
    }

    alive = false;
    document.querySelector(".theme").pause();
    document.querySelector(".win").currentTime = 0;
    document.querySelector(".win").play();
    mario.classList.add("mario__win");
    var standMario = setTimeout(function(){
        mario.src = "assets/img/mario-stand-02.png";
    });

    mario.addEventListener("animationend", marioWinMove);

    var rCoins = document.querySelector("#currentCoins");
    var rTime = document.querySelector("#currentTime");
    var rScore = document.querySelector("#currentScore");
    var rResult = document.querySelector("#currentResult");

    rCoins.innerHTML = coinCount;
    rTime.innerHTML = time;
    rScore.innerHTML = score;
    rResult.innerHTML = obtainResult();

    document.querySelector("#screen").addEventListener("transitionend", removeWin);
}

function marioWinMove(){
    mario.style.bottom = -8 +"px";
    mario.style.left = 8500 +"px";
    document.querySelector(".stats").classList.add("dispel");
    document.querySelector("#screen").classList.add("dispel");
    document.querySelector("#floor").classList.add("dispel");
}

function removeWin(){
    document.querySelector(".stats").classList.add("hidden");
    document.querySelector("#screen").classList.add("hidden");
    document.querySelector("#floor").classList.add("hidden");
    document.querySelector("#winScreen").classList.remove("hidden");
}

function obtainResult(){
    return coinCount*4 + time + score;
}


function addToScores(currentMaxx) {
    usersScores = document.querySelector("#topUsers")
    var liUsername = document.createElement("li");
    liUsername.innerText = currentUser.name + " - " + currentMaxx;
    liUsername.setAttribute("id", currentUser.name);
    usersScores.appendChild(liUsername);
    saveScore(currentMaxx);
}

function saveScore(currentMaxx) {

    //with this function we compare the maxScores of the users, reordering the array
    users.sort(compare);

    function compare(a, b) {

        const scoreA = a.maxScore;
        const scoreB = b.maxScore;

        let comparison = 0;
        if (scoreA < scoreB) {
            comparison = 1;
        } else if (scoreA > scoreB) {
            comparison = -1;
        }
        return comparison;
    }

    //clear top Users
    var liElements = document.getElementsByClassName("liElement");
    var ulMain = document.getElementById("topUsers");
    for(var i = 0; i < users.length; i++){
        ulMain.removeChild(ulMain.lastChild)
    }

    //add new Top Users
    for(var i = 0; i < users.length; i++){
        var liUsername = document.createElement("li");
        liUsername.innerText = users[i].name + " - " + users[i].maxScore;
        ulMain.appendChild(liUsername);
    }

}

Game.prototype = {
    constructor: Game
};