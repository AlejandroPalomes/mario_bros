function display(){
    windowSize = window.innerWidth;

    if (windowSize < 800){
        resizeContainer.style.transform = "scale(" + windowSize/800 +")"
    }

}