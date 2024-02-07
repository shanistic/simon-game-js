
var buttonClr = ["red",  "blue" , "green" , "yellow"];

var gamePattern = [];

var userClickedPattern = [];

var started = false;

var level=0;



$(document).keypress( function(){
    if(!started){
        $("#level-title").text("Level "+ level);
        nextSequence();
        started=true;
    }
});



$(".btn").click( function(){
    
    var userChosenClr = $(this).attr("id");
    
    userClickedPattern.push(userChosenClr);
    
    console.log(userClickedPattern);
    
    playSound(userChosenClr);
    
    animatePress(userChosenClr);

    checkAnswer(userClickedPattern.length-1);

});


function checkAnswer(currentLevel){

    if(userClickedPattern[currentLevel]===gamePattern[currentLevel]){
        console.log("Success");

        if(userClickedPattern.length===gamePattern.length){
          setTimeout(function(){
            nextSequence()
          },1000)
        }

    }else{
        console.log("Wrong");
        var audio2 = new Audio("./sounds/wrong.mp3")
        audio2.play();
        $("body").addClass("game-over")
        setTimeout(function() {
            
            $("body").removeClass("game-over")
        }, 200);
        $("#level-title").text("Game Over, Press Any Key to Restart")

        startOver();
    }

};



function nextSequence(){

    userClickedPattern =[];

    level++;

    $("#level-title").text("Level " + level);
    
    var randomNumber= Math.floor(Math.random()*4);
    
    var randomChosenClr = buttonClr[randomNumber];
    
    gamePattern.push(randomChosenClr);
    
    $("#" + randomChosenClr).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    
    playSound(randomChosenClr);

    
};


function playSound(name){
    
    var audio = new Audio("./sounds/" + name + ".mp3");
    audio.play();
    
};

function animatePress(currentClr){
    
    $("#" + currentClr).addClass("pressed");

    setTimeout(function(){
    $("#" + currentClr).removeClass("pressed");
    }, 100);

};

function startOver(){
        level =0;
        gamePattern = [];
        started = false;
    }