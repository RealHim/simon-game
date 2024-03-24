var colors=["red", "blue", "green", "yellow"];
var gamePattern=[];
var userPattern=[];
var started=false;
var level=0;

$(".btn").click(function() {
    var userClickedButton=$(this).attr("id");
    userPattern.push(userClickedButton);
    $("#"+userClickedButton).fadeIn(100).fadeOut(100).fadeIn(100); 
    animatePress(userClickedButton);
    playSound(userClickedButton);
    checkAnswer(userPattern.length-1)
    
});

function nextSequence() {
    userPattern=[];
    level++;
    $("#level-title").text("Level "+level);
    var random=Math.random();
    var randomNum=Math.floor(random*4);
    var randomChosenColor=colors[randomNum];
    gamePattern.push(randomChosenColor);
    for(var i=0; i<gamePattern.length; i++) {
        (function(index) {
            setTimeout(function(){   
                $("#"+gamePattern[index]).fadeIn(100).fadeOut(100).fadeIn(100);         
                playSound(gamePattern[index]);                    
            }, (1000*index));
        })(i);
    }
}

function checkAnswer(currentLevel) {
    if(gamePattern[currentLevel]===userPattern[currentLevel]) {
        console.log("Success");
        if(userPattern.length===gamePattern.length) {
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }
    }
    else {
        console.log("Wrong");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startAgain();
    }
}

$(document).keypress((function() {
    if(!started) {
      $("#level-title").text("Level "+level);
      setTimeout(function() {
        nextSequence();
      }, 750);
      started=true;
    }
}));

function playSound(name) {
    var audio=new Audio("sounds/"+name+".mp3");
    audio.play(); 
}

function animatePress(currentColor) {
       $('#'+currentColor).addClass("pressed");
       setTimeout(function() {
        $('#'+currentColor).removeClass("pressed");
       }, 100);
}

function startAgain() {
    level=0;
    gamePattern=[];
    started=false;
}