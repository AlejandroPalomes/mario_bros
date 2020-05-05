function display(){
    windowSize = window.innerWidth;

    if (windowSize < 800){
        resizeContainer.style.transform = "scale(" + windowSize/800 +")";
        if (windowSize < 520){
            document.querySelector("#touchControls").classList.remove("hidden");
            // document.querySelector("#main-container").style.transform = "translate(0, -60px)";
            var deviceAgent = navigator.userAgent.toLowerCase();
            var agentID = deviceAgent.match(/(iphone|ipod|ipad)/);
            if (agentID) {
                document.querySelector("#main-container").style.transform = "translate(0, -60px)";
            }
        }else{
            document.querySelector("#touchControls").classList.add("hidden");
            //document.querySelector("#main-container").style.transform = ""
        }
        console.log(deviceAgent)
    }else {
        resizeContainer.style.transform = "scale(1)";
    }


}