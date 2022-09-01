
buttonColours = ["red", "blue", "green", "yellow"];
gamePattern = [];
userClickedPattern = [];
level = 0;
let started = false;

function nextSequence() {
    userClickedPattern = [];
    let updatedLevelCount = level++;
    $("#level-title").text("Level " + updatedLevelCount)
    let randomNumber = Math.floor(Math.random() * 3) + 1;
    let randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour); 
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    let animatedColor = $("."+randomChosenColour);
    animatePress(animatedColor);
}

$(".btn").click(function() {
    let userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    let currentColor = $("."+userChosenColour)
    animatePress(currentColor);
    checkAnswer(userClickedPattern.length-1);
}); 

function playSound(name) {
    let audio = new Audio("sounds/"+name+".mp3");
    audio.play();
}

function animatePress(currentColour) {
    currentColour.addClass("pressed");
    setTimeout(() => {
        currentColour.removeClass("pressed");
    }, 1000);
}

$(document).on("keypress", function() {
    if(!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});    

function checkAnswer(currentLevel) {
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("success");
        if(userClickedPattern.length === gamePattern.length) {
            setTimeout(() => {
                nextSequence();
            },1000)
        }
    } else {
        console.log("wrong");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(() => {
            $("body").removeClass("game-over");
        },200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}


function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}