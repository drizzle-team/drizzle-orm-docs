import { mapSnake, gameSegments } from "./mapSnake";

export class SnakeGame {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  snake: { x: number; y: number }[];
  food: { x: number; y: number };
  tileSize: number;
  isPaused: boolean;
  scale: number;
  gridWidth: number;
  gridHeight: number;
  eatenFood: { x: number; y: number }[];
  gameOver: boolean;
  directionQueue: string[];

  constructor() {
    this.isPaused = false;
    this.canvas = document.getElementById("gameCanvas") as HTMLCanvasElement;
    this.ctx = this.canvas.getContext("2d")!;
    this.tileSize = 16;
    this.gridHeight = 10;
    this.gridWidth = 19;
    this.snake = this.createInitialSnake(5);
    this.directionQueue = ["RIGHT"];
    this.scale = window.devicePixelRatio * 2;
    this.food = { x: 4, y: 4 };
    this.eatenFood = [];
    this.gameOver = false;
    this.resizeCanvas();
    this.clearCanvas();
    this.drawSnake();
    this.drawFood();
    document.addEventListener("keydown", this.changeDirection.bind(this));
  }

  createInitialSnake(length: number) {
    const initialSnake = [];
    for (let i = 0; i < length; i++) {
      initialSnake.push({ x: length - i, y: 3 });
    }
    return initialSnake;
  }

  resizeCanvas() {
    const headerRight = document.querySelector(".header-right")!;
    const gameArea = document.getElementById("gameArea");

    this.isPaused = window.getComputedStyle(headerRight).display === "none";

    if (gameArea) {
      const rect = gameArea.getBoundingClientRect();
      this.canvas.width = rect.width * this.scale;
      this.canvas.height = rect.height * this.scale;
      this.canvas.style.width = `${rect.width}px`;
      this.canvas.style.height = `${rect.height}px`;

      this.ctx.scale(this.scale, this.scale);
    }
  }

  redraw() {
    this.clearCanvas();
    this.drawSnake();
    this.drawFood();
  }

  generateFood() {
    let foodPosition: { x: number; y: number };
    let isFoodOnSnake;

    do {
      foodPosition = {
        x: Math.floor(Math.random() * this.gridWidth),
        y: Math.floor(Math.random() * this.gridHeight),
      };

      isFoodOnSnake = this.snake.some(
        ({ x, y }) => x === foodPosition.x && y === foodPosition.y,
      );
    } while (isFoodOnSnake);

    return foodPosition;
  }

  changeDirection(event: KeyboardEvent) {
    const key = event.keyCode;
    const lastDirection = this.directionQueue[this.directionQueue.length - 1];

    if (key === 37 && lastDirection !== "RIGHT") {
      this.enqueueDirection("LEFT");
    } else if (key === 38 && lastDirection !== "DOWN") {
      this.enqueueDirection("UP");
    } else if (key === 39 && lastDirection !== "LEFT") {
      this.enqueueDirection("RIGHT");
    } else if (key === 40 && lastDirection !== "UP") {
      this.enqueueDirection("DOWN");
    }
  }

  enqueueDirection(newDirection: string) {
    if (this.directionQueue.length < 3) {
      this.directionQueue.push(newDirection);
    }
  }

  gameLoop() {
    setTimeout(() => {
      if (!this.isPaused && !this.gameOver) {
        this.moveSnake();
        this.redraw();
        this.checkGameOver();
      }
      this.gameLoop();
    }, 120);
  }

  clearCanvas() {
    this.ctx.fillStyle = "white";
    this.ctx.fillRect(
      0,
      0,
      this.canvas.width / this.scale,
      this.canvas.height / this.scale,
    );
  }

  drawFood() {
    this.drawSegment("food", { ...this.food });
  }

  moveSnake() {
    const currentDirection = this.directionQueue[0];
    const head = { x: this.snake[0].x, y: this.snake[0].y };
    if (currentDirection === "RIGHT") head.x += 1;
    else if (currentDirection === "LEFT") head.x -= 1;
    else if (currentDirection === "UP") head.y -= 1;
    else if (currentDirection === "DOWN") head.y += 1;

    if (head.x === this.gridWidth) {
      head.x = 0;
    } else if (head.x < 0) {
      head.x = this.gridWidth - 1;
    }

    if (head.y === this.gridHeight) {
      head.y = 0;
    } else if (head.y < 0) {
      head.y = this.gridHeight - 1;
    }

    this.snake.unshift(head);

    this.eatenFood = [
      ...this.eatenFood.filter((eatenFood) =>
        this.snake.some(({ x, y }) => x === eatenFood.x && y === eatenFood.y),
      ),
    ];

    if (head.x === this.food.x && head.y === this.food.y) {
      this.eatenFood.unshift({ ...this.food });
      this.food = this.generateFood();
    } else {
      this.snake.pop();
    }

    if (this.directionQueue.length > 1) {
      this.directionQueue.shift();
    }
  }

  drawSnake() {
    mapSnake({
      snake: this.snake,
      gridHeight: this.gridHeight,
      gridWidth: this.gridWidth,
      food: this.food,
      eatenFood: this.eatenFood,
    }).forEach(({ x, y, type }) => {
      this.drawSegment(type, { x, y });
    });
  }

  drawSegment(
    gameSegment: keyof typeof gameSegments,
    segment: { x: number; y: number },
  ) {
    const smallSquareCount = 4;
    const gapSize = 0.5;
    const borderSize = 0.25;
    const smallSquareSize =
      (this.tileSize - (smallSquareCount - 1) * gapSize - 2 * borderSize) /
      smallSquareCount;

    this.ctx.fillStyle = "white";
    this.ctx.fillRect(
      segment.x * 16,
      segment.y * 16,
      this.tileSize,
      this.tileSize,
    );

    this.ctx.fillStyle = "#777";
    for (let i = 0; i < smallSquareCount; i++) {
      for (let j = 0; j < smallSquareCount; j++) {
        if (gameSegments[gameSegment][i][j]) {
          const x =
            segment.x * 16 + borderSize + i * (smallSquareSize + gapSize);
          const y =
            segment.y * 16 + borderSize + j * (smallSquareSize + gapSize);
          this.ctx.fillRect(x, y, smallSquareSize, smallSquareSize);
        }
      }
    }
  }

  checkGameOver() {
    const head = this.snake[0];

    for (let i = 1; i < this.snake.length; i++) {
      if (head.x === this.snake[i].x && head.y === this.snake[i].y) {
        this.gameOver = true;
        this.blinkSnake();
      }
    }
  }

  blinkSnake() {
    let blinkCount = 0;
    const blinkInterval = setInterval(() => {
      if (blinkCount < 10) {
        this.clearCanvas();
        this.drawFood();
        if (blinkCount % 2 === 0) {
          this.drawSnake();
        }
        blinkCount++;
      } else {
        clearInterval(blinkInterval);
        this.resetGame();
      }
    }, 200);
  }

  resetGame() {
    this.snake = this.createInitialSnake(5);
    this.directionQueue = ["RIGHT"];
    this.eatenFood = [];
    this.food = this.generateFood();
    this.gameOver = false;
  }
}
