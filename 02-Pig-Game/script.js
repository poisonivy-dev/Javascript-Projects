"use strict";
const score0El = document.getElementById("score--0");
const score1El = document.querySelector("#score--1");
const dice = document.querySelector(".dice");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");
const btnNew = document.querySelector(".btn--new");

//-------------Hide the dice--------------------------------//
const hideDice = function () {
  dice.classList.add("hidden");
};
//----------Set the current score of the active player-----//
const updateCurrentScore = function (currentScore, playerActive) {
  document.querySelector(`#current--${playerActive}`).textContent =
    currentScore;
};
//---------Set the final score of the active player--------//
const updateFinalScore = function (finalScore, playerActive) {
  document.querySelector(`#score--${playerActive}`).textContent = finalScore;
};
//------------Set the active player----------------------//
const updateActivePlayer = function (playerActive) {
  //remove the class from current player
  document
    .querySelector(`.player--${playerActive}`)
    .classList.remove("player--active");
  //update the active player
  playerActive = playerActive === 0 ? 1 : 0;
  document
    .querySelector(`.player--${playerActive}`)
    .classList.add("player--active");
  return playerActive;
};
//------------------Starting  Conditions -----------------//
// change the scores to zero
let currentScore = 0;
let totalScore = 0;
let playerActive = 0;
score0El.textContent = 0;
score1El.textContent = 0;
//Now hiding the dice
hideDice();
//----------------Start Rolling-------------------------//
btnRoll.addEventListener("click", function () {
  // Generate a random number
  const randomNumber = Math.trunc(Math.random() * 6) + 1;
  // Fetch the image according to the number
  const imgSrc = `./dice-${randomNumber}.png`;
  //set the image
  dice.setAttribute("src", imgSrc);
  //make it visible if not
  if (dice.classList.contains("hidden")) dice.classList.remove("hidden");
  //check for the condition
  if (randomNumber !== 1) {
    //Add it to the score
    currentScore += randomNumber;
    updateCurrentScore(currentScore, playerActive);
  } else {
    //set the score to zero
    currentScore = 0;
    updateCurrentScore(currentScore, playerActive);
    playerActive = updateActivePlayer(playerActive);
  }
});

//------------------Hold Button---------------------------//
btnHold.addEventListener("click", function () {
  //calculate the final score
  totalScore = Number(
    document.querySelector(`#score--${playerActive}`).textContent
  );
  totalScore += currentScore;
  //Update the final score
  updateFinalScore(totalScore, playerActive);
  //reset the current score
  currentScore = 0;
  updateCurrentScore(currentScore, playerActive);
  //switch the player
  playerActive = updateActivePlayer(playerActive);
});

//-----------------new game---------------------------------//
btnNew.addEventListener("click", function () {
  //reset the current score
  currentScore = 0;
  updateCurrentScore(currentScore, playerActive);
  //reset the total scores of both players
  totalScore = 0;
  updateFinalScore(totalScore, 0);
  updateFinalScore(totalScore, 1);
  // set the active player to player1
  playerActive = 1;
  playerActive = updateActivePlayer(playerActive);
  //hide the dice
  hideDice();
});
