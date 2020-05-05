function display(){
    windowSize = window.innerWidth;

    if (windowSize < 800){
        resizeContainer.style.transform = "scale(" + windowSize/800 +")";
        if (windowSize < 520){
            document.querySelector("#touchControls").classList.remove("hidden");
            document.querySelector("#main-container").style.transform = "translate(0, -80px)"
        }else{
            document.querySelector("#touchControls").classList.add("hidden");
            document.querySelector("#main-container").style.transform = ""
        }
    }else {
        resizeContainer.style.transform = "scale(1)";
    }


}