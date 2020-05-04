function display(){
    windowSize = window.innerWidth;

    if (windowSize < 800){
        resizeContainer.style.transform = "scale(" + windowSize/800 +")";
        if (windowSize < 520){
            document.querySelector("#touchControls").classList.remove("hidden");
        }else{
            document.querySelector("#touchControls").classList.add("hidden");
        }
    }else {
        resizeContainer.style.transform = "scale(1)";
    }


}