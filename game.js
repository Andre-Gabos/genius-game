var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;


function nextSequence() {
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    for (i = 0; i <= gamePattern.length; i++) {
        (function(i){
        setTimeout(function() {
            $('#' + gamePattern[i]).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
            playSound(gamePattern[i]);
        }, 500 * (i + 1));
    })(i);
          
    }
    level++
    $('h1').text("Level " + level)
}

$(".btn").click(function () {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkResults(level)
});

function playSound (name) {
    var playAudio = new Audio("sounds/" + name + ".mp3");
    playAudio.play();
}

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function() {
        $("#" + currentColour).removeClass("pressed");
    });
}

$(document).keydown(function() {
    if (gamePattern.length === 0) {
        nextSequence()
    }
})

function checkResults() {

    var currentIndex = userClickedPattern.length - 1

    if (userClickedPattern[currentIndex] !== gamePattern[currentIndex]) {

        var wrongSound = new Audio("sounds/wrong.mp3")
        wrongSound.play();

        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over")
        }, 200)
        
        $("h1").text("Game Over, Press Any Key To Restart")

        startOver();

    } else if (userClickedPattern.length === gamePattern.length) {
        userClickedPattern = [];
        setTimeout(function () {
            nextSequence();
        }, 1000);
    }
}

function startOver() {
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
}