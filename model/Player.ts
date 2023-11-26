import { Background } from "./Background";
import { Enemy } from "./Enemy";
import { Game } from "./Game";
import { InputHandler } from "./InputHandler";
import { State, Running, Jumping, Falling, Still } from "./States";

type Animations = "alerted" | "still" | "running" | "attacking";
type Facings = "L" | "R";

type AnimationSide = {
  [Animation in Animations]: {
    [Facing in Facings]: HTMLImageElement;
  };
};

export class Player {
  facing: Facings;
  animation: Animations;
  healthpoints: number;
  startingHealthpoints: number;
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
  speedXAirModifier: number;
  speedY: number;
  jumpCooldown: number;
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
  hitboxRadius: number;
  hitboxXOffset: number;
  hitboxYOffset: number;
  hitboxXCenter: number;
  hitboxYCenter: number;
  images: AnimationSide | null;

  constructor(game : Game) {
    this.game = game;
    this.facing = "R"; // R = right, L = left
    this.animation = "still";
    this.startingHealthpoints = 6;
    this.healthpoints = this.startingHealthpoints;
    this.width = 66; // displayed width
    this.height = 61; // displayed height
    this.leftLimit = 0;
    this.rightLimit = this.game.width - this.width;
    this.yOffset = -22; // account for character position offset on spritesheet
    this.groundLimit = this.game.height - this.height + this.yOffset;
    this.x = 0;
    this.y = this.groundLimit;
    this.speedX = 0;
    this.speedXModifier = 3;
    this.speedXAirModifier = 5;
    this.traveledX = 0;
    this.speedY = 0;
    this.jumpCooldown = 1000;
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
    this.hitboxRadius = this.width / 3;
    this.hitboxXOffset = 2.6;
    this.hitboxYOffset = 1.8;
    this.hitboxXCenter = this.x + this.width / this.hitboxXOffset;
    this.hitboxYCenter = this.y + this.height / this.hitboxYOffset;
    
    this.images = {
      alerted: {
        L: null,
        R: null,
      },
      attacking: {
        L: null,
        R: null,
      },
      running: {
        L: null,
        R: null,
      },
      still: {
        L: null,
        R: null,
      },
    };
    
    this.images.alerted.L = new Image(60, 45);
    this.images.alerted.L.src =
    "assets/img/characters/goblin/goblin_alerted_L_spritesheet.png";
    
    this.images.alerted.R = new Image(60, 45);
    this.images.alerted.R.src =
    "assets/img/characters/goblin/goblin_alerted_R_spritesheet.png";
    
    this.images.attacking.L = new Image(60, 45);
    this.images.attacking.L.src =
    "assets/img/characters/goblin/goblin_attacking_L_spritesheet.png";
    
    this.images.attacking.R = new Image(60, 45);
    this.images.attacking.R.src =
    "assets/img/characters/goblin/goblin_attacking_R_spritesheet.png";
    
    this.images.running.L = new Image(60, 45);
    this.images.running.L.src =
    "assets/img/characters/goblin/goblin_running_L_spritesheet.png";
    
    this.images.running.R = new Image(60, 45);
    this.images.running.R.src =
    "assets/img/characters/goblin/goblin_running_R_spritesheet.png";
    
    this.images.still.L = new Image(60, 45);
    this.images.still.L.src =
    "assets/img/characters/goblin/goblin_still_L_spritesheet.png";
    
    this.images.still.R = new Image(60, 45);
    this.images.still.R.src =
    "assets/img/characters/goblin/goblin_still_R_spritesheet.png";

    this.states = [
      new Still(this.game),
      new Running(this.game),
      new Jumping(this.game),
      new Falling(this.game),
    ];
    this.currentState = this.states[0];
  }

  draw(context:CanvasRenderingContext2D) {
    // see https://www.youtube.com/watch?v=7JtLHJbm0kA&t=830s
    if (this.game.debug) {
      context.beginPath();
      context.arc(
        this.hitboxXCenter,
        this.hitboxYCenter,
        this.hitboxRadius,
        0,
        Math.PI * 2
      );
      context.stroke();
    }
    context.drawImage(
      this.images[this.animation][this.facing],
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

  update(input: InputHandler, deltaTime: number) {
    this.checkCollision();
    if(this.healthpoints === 0) this.game.gameOver = true;
    if (this.game.debug) {
      
      console.log("this.currentState :>> ", this.currentState);
                console.log('this.speedX :>> ', this.speedX);
            console.log('this.speedY :>> ', this.speedY);
    }
    // ----- MOVEMENT
    // horizontal movement
    if (input.keys.includes("ArrowRight")) {
      // this.speedX = this.speedXModifier * this.game.speed;
      this.facing = "R";
    } else if (input.keys.includes("ArrowLeft")) {
      // this.speedX = -this.speedXModifier * this.game.speed;
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
      this.game.background.speedX = -this.speedX * this.game.speed;
    } else if (this.x > this.rightLimit) {
      this.x = this.game.width - this.width;
      this.game.background.speedX = -this.speedX * this.game.speed;
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

  setState(state : number) {
    this.currentState = this.states[state];
    this.currentState.enter();
  }

  checkCollision() {

    if(this.facing === "R") {
      this.hitboxXCenter = this.x + this.width / this.hitboxXOffset;
      this.hitboxYCenter = this.y + this.height / this.hitboxYOffset;
    }
    else {
      this.hitboxXCenter = (this.x + 12) + this.width / this.hitboxXOffset; 
      this.hitboxYCenter = this.y + this.height / this.hitboxYOffset;
    }
    this.game.enemies.forEach((enemy : Enemy) => {
      const dx = (enemy.x + enemy.width / enemy.hitboxXOffset) - (this.hitboxXCenter);
      const dy = (enemy.y + enemy.height / enemy.hitboxYOffset) - (this.hitboxYCenter);
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < enemy.hitboxRadius + this.hitboxRadius) {
        this.healthpoints--;
        this.speedY = -(this.speedY + 3);
      }
    });
  }

  onGround() {
    return this.y >= this.game.height - this.height + this.yOffset;
  }
}
