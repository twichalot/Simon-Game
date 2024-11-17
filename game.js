
const buttonColours = ["red", "blue", "green", "yellow"];
const gamePattern = [];
const userClickedPattern = [];
var level = 0;
var started = false;

// Dectect only the first keypress by using the "one" function.  Using the "one" function won't 
// work in this case because when the game ends, I need to reset the game by havign the user press a key.
// To do this, need to use a "started" variable to only detect a keypress if the game has not started.
/*
$(document).one("keypress", function() {
    $("h1").text("Level " + level);
    nextSequence();
    
})
*/

$(document).keypress(function() {
    if (!started) {
      $("#level-title").text("Level " + level);
      nextSequence();
      started = true;
    }
  });
  


// Detect button click and store chosen colour in userClickedPattern array
$(".btn").on("click", function(event) {
    var userChosenColour = event.target.id;
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);
    
    // Pass the last index position of the user clicked pattern array to the check answer function
    var lastAnswerIndex = userClickedPattern.length - 1;
        
    // console.log("User Clicked Pattern: " + userClickedPattern);
    // console.log("Index of last answer: " + lastAnswerIndex);

    checkAnswer(lastAnswerIndex);

})



function checkAnswer(currentLevel) {
    
    // console.log("Check Answer: " + userClickedPattern[currentLevel]);

    // Check if user has finished sequence by comparing the last index colour
    // in the user clicked pattern array to the last index colour of the game pattern array.
    // If they match, check that the user has completed the sequence by  comparing the length
    // of the user clicked pattern array to the length of the game patter array.  If they are equal,
    // call nextSequence to add another colour to Game Pattern

    if (userClickedPattern[currentLevel] === gamePattern[currentLevel] ) {
        
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function() {
                nextSequence();
            } ,1000);
            // Note that there is no "else" statement here.  
            // If above isn't true, then do nothing and wait for next user selection
        
        } 

    } else {
        $("h1").text("Game Over, Press Any Key to Restart");
        
        playSound("wrong");

        // Flash background to "game-over" css class
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        } ,500);

        startOver();

    }
}


function nextSequence() {
    // Reset user clicked pattern array
    userClickedPattern.length = 0;
    
    // Generate Random number between 0 and 3
    var randomNumber = Math.floor((Math.random() * 4));

    // Assign colour based on the random number
    var randomChosenColour = buttonColours[randomNumber];
    
    // add chosen colour to the end of the game pattern array
    gamePattern.push(randomChosenColour);
    // console.log("Game Pattern: " + gamePattern);

    // Flash the chosen colour
    $("#" + randomChosenColour).fadeOut(50).fadeIn(50);

    // Play sound for Random Chosen Colour
    playSound(randomChosenColour);

    // Increase Level by 1
    level++;

    // Update Level text to new level
    $("h1").text("Level " + level);

}


function playSound(name) {
    var audio = new Audio('./sounds/' + name + '.mp3');
    audio.play();
}

 
function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function() {
        $("#" + currentColour).removeClass("pressed");
    } ,100);
}

function startOver() {
    level = 0;
    started = false;
    gamePattern.length = 0;
}