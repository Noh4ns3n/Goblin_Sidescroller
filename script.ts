// WIP : add hitbox ; add score

window.addEventListener("load", function () {
  const canvas = document.getElementById("canvas1") as HTMLCanvasElement;
  const ctx = canvas.getContext("2d");
  const CANVAS_WIDTH = (canvas.width = 768);
  const CANVAS_HEIGHT = (canvas.height = 432);
  const STATES = {
    STILL: 0,
    RUNNING: 1,
    JUMPING: 2,
    FALLING: 3,
  };
 
  

  class InputHandler {
    keys: any[];
    game: Game;
    constructor(game) {
      this.game = game;
      this.keys = [];

      window.addEventListener("keydown", (e) => {
        if (
          (e.key === "ArrowDown" ||
            e.key === "ArrowUp" ||
            e.key === "ArrowLeft" ||
            e.key === "ArrowRight") &&
          !this.keys.includes(e.key)
        ) {
          this.keys.push(e.key);
        } else if (e.key === "d") {
          this.game.debug = !this.game.debug;
        }
      });

      window.addEventListener("keyup", (e) => {
        if (
          e.key === "ArrowDown" ||
          e.key === "ArrowUp" ||
          e.key === "ArrowLeft" ||
          e.key === "ArrowRight"
        ) {
          this.keys.splice(this.keys.indexOf(e.key), 1);
        }
      });
    }
  }

  class State {
    state: String;
    constructor(state) {
      this.state = state;
    }
  }

  class Still extends State {
    player: Player;

    constructor(player) {
      super("STILL");
      this.player = player;
    }
    enter() {
      this.player.animation = "still";
      this.player.changeSpritesheet();
    }
    handleInput(input) {
      if (input.keys.includes("ArrowRight")) {
        this.player.facing = "R";
        this.player.setState(STATES.RUNNING);
      } else if (input.keys.includes("ArrowLeft")) {
        this.player.facing = "L";
        this.player.setState(STATES.RUNNING);
      }
      if (input.keys.includes("ArrowUp")) this.player.setState(STATES.JUMPING);
      this.player.changeSpritesheet();
    }
  }
  class Running extends State {
    player: Player;

    constructor(player) {
      super("RUNNING");
      this.player = player;
    }
    enter() {
      this.player.animation = "running";
      this.player.changeSpritesheet();
    }
    handleInput(input) {
      if (input.keys.includes("ArrowRight")) {
        this.player.facing = "R";
        this.player.changeSpritesheet();
      } else if (input.keys.includes("ArrowLeft")) {
        this.player.facing = "L";
        this.player.changeSpritesheet();
      }
      if (input.keys.includes("ArrowUp")) this.player.setState(STATES.JUMPING);
      if (this.player.speedX === 0) this.player.setState(STATES.STILL);
    }
  }

  class Jumping extends State {
    player: Player;

    constructor(player) {
      super("JUMPING");
      this.player = player;
    }
    enter() {
      this.player.animation = "running";
      this.player.changeSpritesheet();
    }
    handleInput(input) {
      if (this.player.speedY > this.player.weight) {
        this.player.setState(STATES.FALLING);
      }
    }
  }
  class Falling extends State {
    player: Player;

    constructor(player) {
      super("FALLING");
      this.player = player;
    }
    enter() {
      this.player.animation = "running";
      this.player.changeSpritesheet();
    }
    handleInput(input) {
      if (this.player.onGround()) {
        this.player.setState(STATES.STILL);
      }
    }
  }
  class Player {
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
      this.image = document.getElementById("imgGoblin") as HTMLImageElement;
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
        this.image.src = `assets/img/characters/goblin/goblin_${this.animation}_${this.facing}_spritesheet.png`;
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

  class Layer {
    background: Background;
    width: number;
    height: number;
    image: any;
    speedModifier: any;
    x: number;
    x2: number;
    y: number;
    speed: number;
    constructor(background, image, speedModifier) {
      this.background = background;
      this.width = this.background.width;
      this.height = this.background.height;
      this.image = image;
      this.speedModifier = speedModifier;
      this.x = 0;
      this.x2 = 0;
      this.y = 0;
      this.speed = this.background.speedX * this.speedModifier;
    }
    update() {
      this.speed = this.background.speedX * this.speedModifier;
      this.x = this.x + this.speed;
      // reset image1 position if off-limits
      if (this.x < 0 - this.width) {
        this.x = 0;
      } else if (this.x > this.width) {
        this.x = 0;
      }
      // positions image2 to left or right
      if (this.x <= 0) {
        this.x2 = this.x + this.width;
      } else {
        this.x2 = this.x - this.width;
      }
    }
    draw(context) {
      context.drawImage(this.image, this.x, this.y, this.width, this.height);
      context.drawImage(this.image, this.x2, this.y, this.width, this.height);
    }
  }

  class Background {
    layers: Layer[];
    x: number;
    y: number;
    width: number;
    height: number;
    speedX: number;

    constructor() {
      this.x = 0;
      this.y = 0;
      this.width = CANVAS_WIDTH;
      this.height = CANVAS_HEIGHT;
      this.speedX = 0;

      const layer1 = new Layer(this, document.getElementById("imgPlx1"), 0.2);
      const layer2 = new Layer(this, document.getElementById("imgPlx2"), 0.4);
      const layer3 = new Layer(this, document.getElementById("imgPlx3"), 0.6);
      const layer4 = new Layer(this, document.getElementById("imgPlx4"), 0.8);
      const layer5 = new Layer(this, document.getElementById("imgPlx5"), 1.0);
      this.layers = [layer1, layer2, layer3, layer4, layer5];
    }
    draw(context) {
      this.layers.forEach((layer) => {
        layer.draw(context);
      });
    }
    update() {
      this.layers.forEach((layer) => {
        layer.update();
      });
    }
  }

  class Enemy {
    image: HTMLElement | null;
    gameWidth: any;
    gameHeight: any;
    width: number;
    height: number;
    yOffset: number;
    x: any;
    y: number;
    speedX: number;
    maxFrameCol: number;
    maxFrameRow: number;
    sourceWidth: number;
    sourceHeight: number;
    frame: number;
    frameCol: number;
    frameRow: number;
    fps: number;
    frameTimer: number;
    game: Game;
    hitboxRadius : number;
    markedForDeletion : boolean;

    constructor(game) {
      this.game = game;
      this.image = document.getElementById("imgBoar");
      this.width = 60; // displayed width
      this.height = 60; // displayed height
      this.x = this.game.width;
      this.yOffset = 8; // account for character offset on sprite
      this.y = this.game.height - this.height + this.yOffset;
      this.speedX = 2;
      this.maxFrameCol = 4; // number of columns on spritesheet
      this.maxFrameRow = 2; // number or rows on spritesheet
      this.sourceWidth = 124; // width of each sprite on spritesheet
      this.sourceHeight = 124; // height of each sprite on spritesheet
      this.frame = 0;
      this.frameCol = this.frame % this.maxFrameCol;
      this.frameRow = Math.floor(this.frame / this.maxFrameCol);
      this.fps = 15;
      this.frameTimer = 0;
      this.hitboxRadius = this.width / 2.35;
      this.markedForDeletion = false;
    }

    draw(context) {
      if (this.game.debug) {
        // context.strokeRect(this.x, this.y, this.width, this.height);
        context.beginPath();
        context.arc(
          this.x + this.width / 2,
          this.y + this.height / 2,
          this.hitboxRadius,
          0,
          Math.PI * 2
        );
        context.stroke();
      }
      context.drawImage(
        this.image,
        this.frameCol * this.sourceWidth, //sx
        this.frameRow * this.sourceHeight, //sy
        this.sourceWidth, //sw
        this.sourceHeight, //sh
        this.x,
        this.y,
        this.width,
        this.height
      );
    }

    checkForDeletion() {
      if (this.x < 0 - this.width) {
        this.markedForDeletion = true;
        this.game.score++;
      }
    }

    update(deltaTime) {
      // animation
      // update enemy frame only when above fps interval
      if (this.frameTimer > 1000 / this.fps) {
        // if reached end of spritesheet, repositions to start of spritesheet
        if (this.frame === this.maxFrameRow * this.maxFrameCol - 1) {
          this.frame = 0;
        } else {
          this.frame++;
        }
        this.frameTimer = 0;
        // cycle through spritesheet rows/columns
        this.frameCol = this.frame % this.maxFrameCol;
        this.frameRow = Math.floor(this.frame / this.maxFrameCol);
      } else {
        this.frameTimer += deltaTime;
      }

      // horizontal movement
      this.x -= (this.speedX * this.game.speed);
      this.checkForDeletion();
    }
  }

  class Game {
    input: InputHandler;
    background: Background;
    player: Player;
    height: number;
    width: number;
    lastTime: number;
    enemyInterval: number;
    randomEnemyInterval: number;
    enemyTimer: number;
    enemies: Enemy[];
    context: any;
    debug: boolean;
    score:number;
    speed:number;
    gameOver:boolean;
    spanScore : HTMLSpanElement;

    constructor(context) {
      this.context = context;
      this.height = CANVAS_HEIGHT;
      this.width = CANVAS_WIDTH;
      this.lastTime = 0;
      this.enemyInterval = 1000;
      this.randomEnemyInterval = Math.random() * 1000 + 500;
      this.enemyTimer = 0;
      this.enemies = [];
      this.input = new InputHandler(this);
      this.background = new Background();
      this.player = new Player(this);
      this.debug = false;
      this.score = 0;
      this.speed = 1;
      this.gameOver = false;
      this.spanScore = document.getElementById('spanScore');
    }

    handleEnemies(deltaTime) {
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
        this.enemies = this.enemies.filter(enemy => !enemy.markedForDeletion);
      });
      
    }

    animate = (timeStamp) => {
      const deltaTime = timeStamp - this.lastTime;
      this.lastTime = timeStamp;

      this.context.clearRect(0, 0, this.width, this.height);
      this.background.draw(this.context);
      this.background.update();
      this.player.draw(this.context);
      this.player.update(this.input, deltaTime);

      this.handleEnemies(deltaTime);
      this.displayStatusText();
      if(!this.gameOver) requestAnimationFrame(this.animate);
    };

    displayStatusText() {
      this.spanScore.innerHTML = this.score.toString();
    }
  }

  const game = new Game(ctx);
  game.animate(0);
});
