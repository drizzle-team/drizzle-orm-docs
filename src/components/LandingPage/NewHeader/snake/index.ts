import {
  difficulties,
  SnakeGame,
} from "@components/LandingPage/NewHeader/snake/SnakeGame";

const snakeGame = new SnakeGame();

const changeDifficulty = () => {
  switch (snakeGame.difficulty) {
    case 1:
      document.getElementById("game-difficulty")!.innerText = `Normal`;
      snakeGame.difficulty = 2;
      break;
    case 2:
      document.getElementById("game-difficulty")!.innerText = `Hard`;
      snakeGame.difficulty = 3;
      break;
    case 3:
      document.getElementById("game-difficulty")!.innerText = `Easy`;
      snakeGame.difficulty = 1;
      break;
  }
};
const startGame = () => {
  document.querySelector(".game-start-screen")!.classList.add("hidden");
  document.getElementById("right-image")!.classList.add("right-image-moved");
  document.getElementById("score")!.classList.remove("hidden");
  document.querySelector(".board")!.classList.add("board-moved");
  snakeGame.startGame();
};

window.addEventListener(
  "keydown",
  (e) => {
    if (
      ["Space", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].indexOf(
        e.code,
      ) > -1
    ) {
      e.preventDefault();
    }
  },
  false,
);

document.querySelector("main")!.addEventListener(
  "scroll",
  () => {
    const rightImage = document.getElementById("right-image")!;
    const board = document.querySelector(".board")!;
    const score = document.querySelector("#score")!;
    const countdown = document.querySelector(".countdown")!;

    board.classList.remove("board-moved");
    rightImage.classList.remove("right-image-moved");
    score.classList.add("hidden");
    countdown.classList.add("hidden");
  },
  false,
);

document.getElementById("start-game")!.addEventListener("click", startGame);

document
  .getElementById("change-difficulty")!
  .addEventListener("click", changeDifficulty);
