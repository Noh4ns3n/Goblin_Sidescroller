import { CANVAS_HEIGHT, CANVAS_WIDTH, IMG_HEARTS } from "../const/const";
import { Background } from "./Background";
import { Enemy } from "./Enemy";
import { InputHandler } from "./InputHandler";
import { Player } from "./Player";
// import "../scripts/require.js";

export class Game {
  input: InputHandler;
  background: Background;
  player: Player;
  height: number;
  width: number;
  lastTime: number;
  deltaTime: number;
  enemyInterval: number;
  randomEnemyInterval: number;
  enemyTimer: number;
  enemies: Enemy[];
  context: CanvasRenderingContext2D;
  debug: boolean;
  score: number;
  speed: number;
  gameOver: boolean;
  victory: boolean;
  spanScore: HTMLSpanElement;
  heartImages: HTMLImageElement[];

  constructor(context: CanvasRenderingContext2D) {
    this.context = context;
    this.height = CANVAS_HEIGHT;
    this.width = CANVAS_WIDTH;
    this.lastTime = 0;
    this.deltaTime = 0;
    this.enemyInterval = 1000;
    this.randomEnemyInterval = Math.random() * 1000 + 500;
    this.enemyTimer = 0;
    this.enemies = [];
    this.debug = false;
    this.score = 0;
    this.speed = 1;
    this.gameOver = false;
    this.victory = false;
    this.spanScore = document.getElementById("spanScore");
    this.input = new InputHandler(this);
    this.background = new Background();
    this.player = new Player(this);
    this.heartImages = [new Image(), new Image(), new Image()];
    this.heartImages[0].src = "assets/img/display/heart_full.png";
    this.heartImages[0].width = 50;
    this.heartImages[1].src = "assets/img/display/heart_half.png";
    this.heartImages[1].width = 50;
    this.heartImages[2].src = "assets/img/display/heart_empty.png";
    this.heartImages[2].width = 50;
  }

  handleEnemies(deltaTime: number) {
    if (this.enemyTimer > this.enemyInterval + this.randomEnemyInterval) {
      this.enemies.push(new Enemy(this));
      this.randomEnemyInterval = Math.random() * 1000;
      this.enemyTimer = 0;
    } else {
      this.enemyTimer += deltaTime;
    }
    this.enemies.forEach((enemy) => {
      enemy.draw(this.context);
      enemy.update(deltaTime);
      this.enemies = this.enemies.filter((enemy) => !enemy.markedForDeletion);
    });
  }

  handleVictory() {
    const spanVictory: HTMLSpanElement = document.getElementById("spanVictory");
    const spanVictory2: HTMLSpanElement =
      document.getElementById("spanVictory");
    const pVictory: HTMLElement = document.getElementById("pVictory");
    const pVictory2: HTMLElement = document.getElementById("pVictory");
    const message: string = "Bravo !";

    if (this.score >= 20) {
      document.body.style.color = "green";
      spanVictory.innerHTML = message;
    } else {
      this.grayscaleCanvas();
      const message: string = "Perdu !";
      document.body.style.color = "darkred";
      pVictory.style.top = "25%";
      pVictory.style.fontSize = "80px";
      pVictory2.style.top = "25%";
      pVictory2.style.fontSize = "80px";
      spanVictory.innerHTML = message;
      spanVictory2.innerHTML = message;
    }
  }

  updateHearts() {
    const divHearts: HTMLElement = document.getElementById("containerHearts");
    divHearts.innerHTML = "";
    const fullHearts: number = Math.floor(this.player.healthpoints / 2);
    const halfHeart: boolean = this.player.healthpoints % 2 === 1;
    for (let i: number = 0; i < fullHearts; i++) {
      divHearts.appendChild(this.heartImages[IMG_HEARTS.FULL].cloneNode(true));
    }
    if (halfHeart) {
      divHearts.appendChild(this.heartImages[IMG_HEARTS.HALF]);
    }
    
    for (let occupiedSlots: number = (halfHeart ? 1 : 0)+fullHearts;
      occupiedSlots < this.player.startingHealthpoints / 2;
      occupiedSlots++
    ) {
      divHearts.appendChild(this.heartImages[IMG_HEARTS.EMPTY].cloneNode(true));
    }
  }

  grayscaleCanvas() {
    const imageData: ImageData = this.context.getImageData(
      0,
      0,
      this.width,
      this.height
    ) as ImageData;
    const data: Uint8ClampedArray = imageData.data as Uint8ClampedArray;
    for (let i = 0; i < data.length; i += 4) {
      const luminance: number =
        0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
      data[i] = luminance;
      data[i + 1] = luminance;
      data[i + 2] = luminance;
    }
    this.context.putImageData(imageData, 0, 0);
  }

  animate = (timeStamp: number) => {
    this.deltaTime = timeStamp - this.lastTime;
    this.lastTime = timeStamp;
    this.context.clearRect(0, 0, this.width, this.height);
    this.background.draw(this.context);
    this.background.update();
    this.player.draw(this.context);
    this.player.update(this.input, this.deltaTime);
    this.handleEnemies(this.deltaTime);
    this.displayStatusText();
    this.updateHearts();
    if (this.gameOver) {
      this.handleVictory();
    } else requestAnimationFrame(this.animate);
  };

  displayStatusText() {
    this.spanScore.innerHTML = this.score.toString();
  }
}
