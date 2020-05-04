function User(name){
    this.name = name;
    this.score = 0;
    this.maxScore = 0;

    this.getMaxScore = function(){
        if(score > maxScore){
            maxScore = score;
        }
    }
}