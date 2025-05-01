"use strict";
// CLASS ELEMENTS----------------------------------------------------
const CLASS_HIDDEN = "hidden";
const CLASS_ACTIVE_PLAYER = "game_player_active";
// DOM ELEMENTS----------------------------------------------------
const backgroundOverlay = document.querySelector(".background_overlay");
const popOverlay = document.querySelectorAll(".game_pop_up_overlay");
const gameContainer = document.querySelector(".main_container");
const gamePlayerBox = document.querySelectorAll(".game_player");
// CUSTOM TEXT
const errorMessage = document.querySelector(".game_error_message");
let playerOneCurrent = document.querySelector(".game_player_one_current");
let playerOneScore = document.querySelector(".game_player_one_score");
let playerScores = document.querySelectorAll(".game_player_score");
let playerCurrents = document.querySelectorAll(".game_player_current");

// BUTTONS
const closeButton = document.querySelector(".game_button_close");
const startButton = document.querySelector(".game_button_start");
const rulesButton = document.querySelector(".game_button_rules");
const againButton = document.querySelector(".game_button_again");
const rollButton = document.querySelector(".game_button_roll");
const holdButton = document.querySelector(".game_button_hold");
const playerOneDiceRoll = document.querySelectorAll(".game_player_one_dice");
const playerTwoDiceRoll = document.querySelectorAll(".game_player_two_dice");
// PLAYER VALUES
let playerNameValue = document.querySelectorAll(".player_name_value");
let playerOneName;
let playerTwoName;
let number;
let scores = [0, 0];
let current = 0;
let names = document.querySelectorAll(".game_player_name_value");
let currentScores = [0, 0];
let activePlayerIndex = 0; // 0 = player 1, 1 = player 2

const switchPlayer = function () {
  gamePlayerBox[activePlayerIndex].classList.remove(CLASS_ACTIVE_PLAYER);
  current = 0;
  playerCurrents[activePlayerIndex].textContent = 0;
  activePlayerIndex = 1 - activePlayerIndex;
  gamePlayerBox[activePlayerIndex].classList.add(CLASS_ACTIVE_PLAYER);
};
// FUNCTIONS FOR BUTTONS----------------------------------------------------

//START BUTTON LOGIC
const startButtonEvent = function () {
  playerOneName = playerNameValue[0].value;
  playerTwoName = playerNameValue[1].value;
  if (playerOneName && playerTwoName) {
    closeButtonEvent();
  } else {
    errorMessage.classList.remove(CLASS_HIDDEN);
  }
  names[0].textContent = playerOneName;
  names[1].textContent = playerTwoName;
  gamePlayerBox[0].classList.add(CLASS_ACTIVE_PLAYER);
};
//CLOSE BUTTON LOGIC
const closeButtonEvent = function () {
  popOverlay.forEach((overlay) => {
    overlay.classList.add(CLASS_HIDDEN);
  });
  backgroundOverlay.classList.add(CLASS_HIDDEN);
  gameContainer.classList.remove(CLASS_HIDDEN);
  popOverlay[0].classList.add(CLASS_HIDDEN);
};
//RULES BUTTON LOGIC
const rulesButtonEvent = function () {
  popOverlay.forEach((overlay) => {
    overlay.classList.add(CLASS_HIDDEN);
  });

  backgroundOverlay.classList.remove(CLASS_HIDDEN);
  popOverlay[1].classList.remove(CLASS_HIDDEN);
};
//AGAIN BUTTON LOGIC
const againButtonEvent = function () {
  popOverlay.forEach((overlay) => {
    overlay.classList.add(CLASS_HIDDEN);
  });
  gameContainer.classList.add(CLASS_HIDDEN);
  popOverlay[0].classList.remove(CLASS_HIDDEN);
  scores = [0, 0];
  current = 0;
  playerCurrents[0].textContent = 0;
  playerCurrents[1].textContent = 0;
  playerScores[0].textContent = 0;
  playerScores[1].textContent = 0;
};
//ROLL BUTTON LOGIC
const rollButtonEvent = function () {
  number = Math.floor(Math.random() * 6);
  //dice logic
  let dice = number;

  if (activePlayerIndex === 0) {
    playerOneDiceRoll.forEach((dice) => {
      dice.classList.add(CLASS_HIDDEN);
    });
  } else {
    playerTwoDiceRoll.forEach((dice) => {
      dice.classList.add(CLASS_HIDDEN);
    });
  }
  //dice losic

  if (activePlayerIndex === 0) {
    playerOneDiceRoll[number].classList.remove(CLASS_HIDDEN);
  } else {
    playerTwoDiceRoll[number].classList.remove(CLASS_HIDDEN);
  }
  if (number === 0) {
    switchPlayer();
    return;
  }

  if (current <= 0) {
    current = number + 1;
  } else {
    current = current + number + 1;
  }

  playerCurrents[activePlayerIndex].textContent = current;

  //score logic
};

const holdButtonEvent = function () {
  scores[activePlayerIndex] += current;
  playerScores[activePlayerIndex].textContent = scores[activePlayerIndex];
  playerCurrents[activePlayerIndex].textContent = 0;
  if (activePlayerIndex === 0) {
    playerOneDiceRoll.forEach((dice) => {
      dice.classList.add(CLASS_HIDDEN);
    });
  } else {
    playerTwoDiceRoll.forEach((dice) => {
      dice.classList.add(CLASS_HIDDEN);
    });
  }
  if (scores[0] >= 100 || scores[1] >= 100) {
    winningLogic();
    return;
  }
  current = 0;
  if (activePlayerIndex === 0) {
    playerOneDiceRoll[0].classList.remove(CLASS_HIDDEN);
  } else {
    playerTwoDiceRoll[0].classList.remove(CLASS_HIDDEN);
  }
  switchPlayer();
};

const winningLogic = function () {
  playerOneDiceRoll.forEach((dice) => {
    dice.classList.add(CLASS_HIDDEN);
  });
  playerOneDiceRoll[0].classList.remove(CLASS_HIDDEN);

  popOverlay.forEach((overlay) => {
    overlay.classList.add(CLASS_HIDDEN);
  });

  backgroundOverlay.classList.remove(CLASS_HIDDEN);
  popOverlay[2].classList.remove(CLASS_HIDDEN);
};

//EVENT LISTENERS----------------------------------------------------
startButton.addEventListener("click", startButtonEvent);
rulesButton.addEventListener("click", rulesButtonEvent);
closeButton.addEventListener("click", closeButtonEvent);
againButton.addEventListener("click", againButtonEvent);
rollButton.addEventListener("click", rollButtonEvent);
holdButton.addEventListener("click", holdButtonEvent);
//GAME LOGIC LISTENERS----------------------------------------------------
