import { Background } from "./Background";
import { Game } from "./Game";
import { State, Running, Jumping, Falling, Still } from "./States";

export   class Player {
  image: HTMLImageElement | null;
  facing: string;
  animation: string;
  width: number;
  height: number;
  leftLimit: number;
  rightLimit: number;
  yOffset: number;
  groundLimit: number;
  traveledX: number;
  x: number;
  y: number;
  speedX: number;
  speedXModifier: number;
  speedY: number;
  weight: number;
  sourceWidth: number;
  sourceHeight: number;
  maxFrameCol: number;
  maxFrameRow: number;
  frame: number;
  frameCol: number;
  frameRow: number;
  fps: number;
  frameTimer: number;
  background: Background;
  game: Game;
  states: State[];
  currentState: any;
  hitboxRadius : number;

  constructor(game) {
    this.game = game;
    this.states = [
      new Still(this),
      new Running(this),
      new Jumping(this),
      new Falling(this),
    ];
    this.currentState = this.states[0];
    this.currentState.enter();
    this.image = document.getElementById("imgGoblin-still-R") as HTMLImageElement;
    this.facing = "R"; // R = right, L = left
    this.animation = "still";
    this.width = 66; // displayed width
    this.height = 61; // displayed height
    this.leftLimit = 0;
    this.rightLimit = this.game.width - this.width;
    this.yOffset = 4; // account for character position offset on spritesheet
    this.groundLimit = this.game.height - this.height + this.yOffset;
    this.x = 0;
    this.y = this.groundLimit;
    this.speedX = 0;
    this.speedXModifier = 3;
    this.traveledX = 0;
    this.speedY = 0;
    this.weight = 1.2;
    this.sourceWidth = 66; // width of each sprite on spritesheet
    this.sourceHeight = 61; // height of each sprite on spritesheet
    this.maxFrameCol = 6; // number of columns on spritesheet
    this.maxFrameRow = 4; // number or rows on spritesheet
    this.frame = 0;
    this.frameCol = this.frame % this.maxFrameCol;
    this.frameRow = Math.floor(this.frame / this.maxFrameCol);
    this.fps = 15;
    this.frameTimer = 0;
    this.hitboxRadius = this.width / 2.7;
  }

  draw(context) {
    // see https://www.youtube.com/watch?v=7JtLHJbm0kA&t=830s
    if (this.game.debug) {
      // context.strokeRect(this.x, this.y, this.width, this.height);
      context.beginPath();
      context.arc(
        this.x + this.width / 2.1,
        this.y + this.height / 1.8,
        this.hitboxRadius,
        0,
        Math.PI * 2
      );
      context.stroke();
    }
    context.drawImage(
      this.image,
      this.frameCol * this.sourceWidth, // sx
      this.frameRow * this.sourceHeight, // sy
      this.width, // sw
      this.height, // sh
      this.x,
      this.y,
      this.width,
      this.height
    );
  }

  update(input, deltaTime) {
    this.checkCollision();
    if (this.game.debug) {
      console.log("this.currentState :>> ", this.currentState);
    }
    // ----- MOVEMENT
    // horizontal movement
    if (input.keys.includes("ArrowRight")) {
      this.speedX = (this.speedXModifier * this.game.speed);
      this.facing = "R";
    } else if (input.keys.includes("ArrowLeft")) {
      this.speedX = (-this.speedXModifier * this.game.speed);
      this.facing = "L";
    } else {
      this.speedX = 0;
    }
    this.x += this.speedX;
    this.traveledX += this.speedX;
    this.currentState.handleInput(input);

    // horizontal boundaries
    if (this.x < this.leftLimit) {
      this.x = 0;
      this.game.background.speedX = (-this.speedX * this.game.speed);
    } else if (this.x > this.rightLimit) {
      this.x = this.game.width - this.width;
      this.game.background.speedX = (-this.speedX * this.game.speed);
    } else {
      this.game.background.speedX = 0;
    }
    // vertical movement
    if (input.keys.includes("ArrowUp") && this.onGround()) {
      this.speedY -= 20;
    }
    this.y += this.speedY;

    if (!this.onGround()) {
      this.speedY += this.weight;
    } else {
      this.speedY = 0;
    }
    // vertical boundaries
    if (this.y > this.groundLimit) this.y = this.groundLimit;

    // ----- ANIMATION
    // update player frame only when above fps interval
    if (this.frameTimer > 1000 / this.fps) {
      this.frameTimer = 0;
      // if reached end of spritesheet, repositions to start of spritesheet
      if (this.frame === this.maxFrameRow * this.maxFrameCol - 1) {
        this.frame = 0;
      } else {
        this.frame++;
      }
      // cycle through spritesheet rows/columns
      this.frameCol = this.frame % this.maxFrameCol;
      this.frameRow = Math.floor(this.frame / this.maxFrameCol);
    } else {
      this.frameTimer += deltaTime;
    }
  }

  changeSpritesheet() {
    if (this.image) {
      // this.image.src = `assets/img/characters/goblin/goblin_${this.animation}_${this.facing}_spritesheet.png`;
      this.image = document.getElementById(`imgGoblin-${this.animation}-${this.facing}`) as HTMLImageElement;
    }
  }

  setState(state) {
    this.currentState = this.states[state];
    this.currentState.enter();
  }

  checkCollision() {
    this.game.enemies.forEach((enemy) => {
      const dx = enemy.x - this.x;
      const dy = enemy.y - this.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      if(distance < enemy.hitboxRadius + this.hitboxRadius) {
        this.game.gameOver = true;
      }
    });
  }

  onGround() {
    return this.y >= this.game.height - this.height;
  }
}