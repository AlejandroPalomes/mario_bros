/* The keyDownUp handler was moved to the main file. */

function Controller() {

    this.left = new Controller.ButtonInput(); //with this, we say that left is a property of Controller
    this.right = new Controller.ButtonInput();
    this.up = new Controller.ButtonInput();

    this.keyDownUp = function (type, key_code) {

        //while user keeps pressing a key, this turns true, because type is returning keydown
        //When user releases the key, it returns keyup, so downkeyDownUp returns false.
        var downKeyDownUp = (type == "keydown") ? true : false;

        //we check which key is being presed, and dpending on each, perform an action
        switch (key_code) {

            case 37:    //"left arrow"
            case 65:    //A
                this.left.getInput(downKeyDownUp);
                // console.log("working on A");
                break;
                case 38:    //"up arrow"
                case 87:    //W
                this.up.getInput(downKeyDownUp);
                break;
                case 39:    //"right-arrow"
                case 68:    //D
                this.right.getInput(downKeyDownUp);
        }
    };


};

Controller.prototype = {

    constructor: Controller

};

Controller.ButtonInput = function () {

    this.active = this.downButtonInput = false;
    // console.log(active)


};

Controller.ButtonInput.prototype = {

    constructor: Controller.ButtonInput,

    getInput: function (downX) { //if keydown, this down receives true as attribute

        if (this.down != downX) this.active = downX; //this active is called in general
        // console.log("buttonInput achieved!")
        this.down = downX;

        // console.log(this.active + " --> this.down en controller prototype");

    }

};