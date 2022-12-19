let userClickedPattern = [];

let buttonColors = ["red", "blue", "green", "yellow"];

let gamePattern = [];

let started = false;

let level = 0;

function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  randomNumber = Math.floor(Math.random() * 4);
  randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  $("#" + randomChosenColor)
    .fadeOut(100)
    .fadeIn(100);
  playSound(randomChosenColor);
}

$(".btn").click(function () {
  userChosenColor = $(this).attr("id");
  playSound(userChosenColor);
  animatePress(userChosenColor);
  if (started == true) {
    userClickedPattern.push(userChosenColor);
    checkAnswer(userClickedPattern.length - 1);
  }
});

function playSound(name) {
  audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  $("." + currentColor).addClass("pressed");
  setTimeout(function () {
    $("." + currentColor).removeClass("pressed");
  }, 100);
}

$(document).keypress(function () {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] == gamePattern[currentLevel]) {
    if (userClickedPattern.length == gamePattern.length) {
      setTimeout(nextSequence, 1000);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}

function startOver() {
  userClickedPattern = [];
  gamePattern = [];
  level = 0;
  started = false;
}
