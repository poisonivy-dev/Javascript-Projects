"use strict";
//Generate a Random Number
let number = Math.trunc(Math.random() * 20) + 1;
let highScore = Number(document.querySelector(".high-score").textContent);
let score = Number(document.querySelector(".score").textContent);
//FETCHING THE ELEMENTS
//Decrease the score
const decreaseScore = function (score) {
  if (score !== 0) score--;
  else {
    document.querySelector(".message").textContent = "💣 You lost the game!";
  }
  document.querySelector(".score").textContent = score;
  return score;
};

//LISTENING TO THE CHECK EVENT
document.querySelector(".check").addEventListener("click", function () {
  const guess = Number(document.querySelector(".guess-input").value);

  // No number
  if (!guess) {
    document.querySelector(".message").textContent = "⛔ No Number";
  } else if (guess < number) {
    document.querySelector(".message").textContent = "📉 Too Low!";
    score = decreaseScore(score);
  } else if (guess > number) {
    document.querySelector(".message").textContent = "📈 Too High!";
    score = decreaseScore(score);
  } else if (guess === number) {
    //set the message
    document.querySelector(".message").textContent = "🎉 Correct Number!";
    //set the high score
    if (highScore < score) {
      highScore = score;
      document.querySelector(".high-score").textContent = highScore;
    }
    //set the number div
    document.querySelector(".number").textContent = number;
    //set background
    document.querySelector("body").style.backgroundColor = "#60b347";
    document.querySelector(".number").style.width = "30rem";
  } else {
    console.error("Error while handling guess number");
  }
});

//LISTENING TO THE AGAIN BUTTON
document.querySelector(".again").addEventListener("click", function () {
  //set a new random number
  number = Math.trunc(Math.random() * 20) + 1;
  //set the number div
  document.querySelector(".number").textContent = "?";
  //set the input field
  document.querySelector(".guess-input").value = "";
  //set the background
  document.querySelector("body").style.backgroundColor = "#222";
  document.querySelector(".number").style.width = "15rem";
  //set the score
  score = 20;
  document.querySelector(".score").textContent = score;
  //set the message
  document.querySelector(".message").textContent = "Start guessing...";
});
