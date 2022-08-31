// Flags and game memory
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var gameOver = false;
// Listeners
$("document").ready($(".Btn").on("click", function() {
  if (started == false && gameOver == false) {
    setTimeout(() => {
      started = true;
    }, 100);
    SimonGame();
  }
}));
$(".Btn").on("click", function() {
  if (started == true && gameOver == false) {
    var userChosenColour = $(this).attr("class").split(' ')[0];
    userClickedPattern.push(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
  } else {}
});
$(".Btn").on("click", function() {
  if (started == true && gameOver == true) {
    StartOver();
  }
});
// Controller Function
function SimonGame() {
  userClickedPattern = [];
  $(".Text").text('Level ' + (gamePattern.length + 1));
  gamePattern.push(NextButton(4));
  Animate(gamePattern[gamePattern.length - 1]);
  playSound(buttonColor(gamePattern[gamePattern.length - 1]));
}

function checkAnswer(currentLevel) {
  if (buttonColor(gamePattern[currentLevel]) != userClickedPattern[currentLevel]) {
    GameOver();
  } else {
    if (userClickedPattern.length === gamePattern.length) {
      SimonGame();
    }
  }
}

function GameOver() {
  $("body").addClass("game-over");
  $(".Text").addClass("game-over-title");
  $(".Text").text("Game Over!");
  playSound("Wrong");
  setTimeout(() => {
    gameOver = true;
  }, 100);

}

function StartOver() {
  gamePattern = [];
  $("body").removeClass("game-over");
  $(".Text").removeClass("game-over-title");
  $(".Text").text("Press a button to start!");
  started = false;
  gameOver = false;
}
//Animation and Sound
function Animate(int) {
  $("." + buttonColor(int)).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
}

function playSound(color) {
  $("#audio" + color)[0].play();
}
//Auxiliary Functions
function buttonColor(int) {
  switch (int) {
    case 0:
      return "Green"
    case 1:
      return "Red"
    case 2:
      return "Yellow"
    case 3:
      return "Blue"
  }
}

function NextButton(noOfPatterns) {
  return Math.floor(noOfPatterns * Math.random());
}
