import {
  CANVAS2_HEIGHT,
  CANVAS2_WIDTH,
  CANVAS_HEIGHT,
  CANVAS_WIDTH,
  IMG_HEARTS,
} from "../const/const";
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
  enemyIntervalReduction: number;
  enemyTimer: number;
  enemies: Enemy[];
  context: CanvasRenderingContext2D;
  context2: CanvasRenderingContext2D;
  debug: boolean;
  score: number;
  speed: number;
  gameOver: boolean;
  victory: boolean;
  spanScore: HTMLSpanElement;
  heartImages: HTMLImageElement[];
  framerate: number;
  lastFrame: number;
  playerLastHealth: number;
  lastScore:number;

  constructor(
    context: CanvasRenderingContext2D,
    context2: CanvasRenderingContext2D
  ) {
    this.context = context;
    this.context2 = context2;
    this.height = CANVAS_HEIGHT;
    this.width = CANVAS_WIDTH;
    this.lastTime = 0;
    this.deltaTime = 0;
    this.enemyIntervalReduction = 0;
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
    this.heartImages = this.prepareHUDImages("heart");
    this.framerate = 200;
    this.lastFrame = 0;
    this.playerLastHealth = this.player.startingHealthpoints;
    this.lastScore = 0;

  }

  prepareHUDImages(keyword: string): HTMLImageElement[] {
    if (keyword === "heart") {
      const imagesHUD = [new Image(), new Image(), new Image()];
      imagesHUD[0].src = "assets/img/display/heart_full.png";
      imagesHUD[0].width = 50;
      imagesHUD[1].src = "assets/img/display/heart_half.png";
      imagesHUD[1].width = 50;
      imagesHUD[2].src = "assets/img/display/heart_empty.png";
      imagesHUD[2].width = 50;
      return imagesHUD;
    }
  }

  handleEnemies(deltaTime: number) {
    // enemyInterval 10% reduction every 20 score points
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
    const pVictory2: HTMLElement = document.getElementById("pVictory2");
    const message: string = "Bravo !";

    if (this.score >= 20) {
      document.body.style.color = "green";
      pVictory.style.top = "-25%";
      pVictory.style.fontSize = "80px";
      spanVictory.innerHTML = message;
    } else {
      this.grayscaleCanvas();
      const message: string = "Perdu !";
      document.body.style.color = "darkred";
      pVictory.style.top = "-25%";
      pVictory.style.fontSize = "80px";
      spanVictory.innerHTML = message;
    }
  }

  displayHearts() {
    const updateHearts : boolean = this.playerLastHealth !== this.player.healthpoints;
    if (updateHearts || this.player.healthpoints === 0 || this.lastTime < 1000) {
      this.playerLastHealth = this.player.healthpoints;
      this.context2.clearRect(0, 0, CANVAS2_WIDTH, CANVAS2_HEIGHT);
      let fullHearts: number = Math.floor(this.player.healthpoints / 2);
      let halfHeart: number = this.player.healthpoints % 2 === 1 ? 1 : 0;
      let emptyHearts: number =
        this.player.startingHealthpoints / 2 - fullHearts - halfHeart;
      const imgWidth: number = this.heartImages[IMG_HEARTS.FULL].width;
      const positionY: number = CANVAS2_HEIGHT / 2 - imgWidth / 2;

      for (let i: number = 0; i < this.player.startingHealthpoints / 2; i++) {
        // positionX = ( sizeCanvas - ( sizeImage * numberImages ) / 2 ) + ( indexImage * sizeImage )
        let positionX: number =
          (CANVAS2_WIDTH - (imgWidth * this.player.startingHealthpoints) / 2) /
            2 +
          i * imgWidth;
        if (fullHearts > 0) {
          fullHearts--;
          this.context2.drawImage(
            this.heartImages[IMG_HEARTS.FULL],
            positionX,
            positionY,
            50,
            50
          );
        } else if (halfHeart > 0) {
          halfHeart--;
          this.context2.drawImage(
            this.heartImages[IMG_HEARTS.HALF],
            positionX,
            positionY,
            50,
            50
          );
        } else if (emptyHearts > 0) {
          emptyHearts--;
          this.context2.drawImage(
            this.heartImages[IMG_HEARTS.EMPTY],
            positionX,
            positionY,
            50,
            50
          );
        }
      }
    }
  }

  reduceEnemyInterval() {
    if(this.score > this.lastScore + 20) {
      this.lastScore = this.score;
      // this.enemyIntervalReduction = Math.floor(this.score / 20) * 10;
      // this.enemyInterval = this.enemyInterval * (1 - this.enemyIntervalReduction / 100);
      this.enemyInterval *= 0.9;
      console.log('this.enemyInterval :>> ', this.enemyInterval);
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
    this.lastFrame += this.deltaTime;
    if (this.lastFrame > 1000 / this.framerate) {
      this.context.clearRect(0, 0, this.width, this.height);
      this.background.draw(this.context);
      this.background.update();
      this.handleEnemies(this.deltaTime);
      this.player.draw(this.context);
      this.player.update(this.input, this.deltaTime);
      this.displayStatusText();
      this.lastFrame = 0;
    }
    this.displayHearts();
    if (this.gameOver) {
      this.handleVictory();
    } else requestAnimationFrame(this.animate);
  };

  displayStatusText() {
    this.spanScore.innerHTML = `${this.score.toString()} ${
      this.debug
        ? "</br> FPS : " +
          Math.floor(1000 / this.deltaTime) +
          " maxUpdate/s : " +
          this.framerate
        : ""
    }`;
  }
}
