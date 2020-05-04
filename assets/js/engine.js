function engine(){
    update();
    rest = setTimeout(engine, 30);
    if(!alive){
        clearTimeout(rest);
    }
}