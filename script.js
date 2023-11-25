// WIP : add hitbox ; add score

window.addEventListener("load", function () {
  const canvas = document.getElementById("canvas1");
  const ctx = canvas.getContext("2d");
  const CANVAS_WIDTH = (canvas.width = 768);
  const CANVAS_HEIGHT = (canvas.height = 432);
  let backgroundSpeed = 0;
  let enemies = [];

  class InputHandler {
    constructor() {
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

  class Player {
    constructor(gameWidth, gameHeight) {
      this.image = document.getElementById("imgGoblin");
      this.facing = "R"; // R = right, L = left
      this.animation = "still";
      this.gameWidth = gameWidth;
      this.gameHeight = gameHeight;
      this.width = 66; // displayed width
      this.height = 61; // displayed height
      this.leftLimit = 0;
      this.rightLimit = this.gameWidth - this.width;
      this.x = 0;
      this.y = this.gameHeight - this.height;
      this.speedX = 0;
      this.speedY = 0;
      this.weight = 1;

      this.sourceWidth = 66; // width of each sprite on spritesheet
      this.sourceHeight = 61; // height of each sprite on spritesheet
      this.maxFrameCol = 6; // number of columns on spritesheet
      this.maxFrameRow = 4; // number or rows on spritesheet
      this.frame = 0;
      this.frameCol = this.frame % this.maxFrameCol;
      this.frameRow = Math.floor(this.frame / this.maxFrameCol);
      this.fps = 10;
      this.frameTimer = 0;
    }

    changeSpritesheet(animation) {
      this.animation = animation;
      this.image.src = `assets/img/characters/goblin/goblin_${this.animation}_${this.facing}_spritesheet.png`;
    }

    draw(context) {
      // see https://www.youtube.com/watch?v=7JtLHJbm0kA&t=830s
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
      if (input.keys.includes("ArrowRight")) {
        this.speedX = 3;
        this.facing = "R";
        this.changeSpritesheet("running");
      } else if (input.keys.includes("ArrowLeft")) {
        this.speedX = -3;
        this.facing = "L";
        this.changeSpritesheet("running");
      } else if (input.keys.includes("ArrowUp") && this.onGround()) {
        this.speedY -= 20;
      } else {
        this.speedX = 0;
        this.changeSpritesheet("still");
      }

      // animation
      // update player frame only when above fps interval
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
      this.x += this.speedX;
      // horizontal boundaries
      if (this.x < this.leftLimit) {
        this.x = 0;
        backgroundSpeed = -this.speedX;
      } else if (this.x > this.rightLimit) {
        this.x = this.gameWidth - this.width;
        backgroundSpeed = -this.speedX;
      } else {
        backgroundSpeed = 0;
      }
      // vertical movement
      this.y += this.speedY;
      if (!this.onGround()) {
        this.speedY += this.weight;
        this.changeSpritesheet("running");
      } else {
        this.speedY = 0;
      }
      // vertical boundaries
      if (this.y > this.gameHeight - this.height)
        this.y = this.gameHeight - this.height;
    }

    onGround() {
      return this.y >= this.gameHeight - this.height;
    }
  }

  class Layer {
    constructor(image, speedModifier) {
      this.width = CANVAS_WIDTH;
      this.height = CANVAS_HEIGHT;
      this.image = image;
      this.speedModifier = speedModifier;
      this.x = 0;
      this.x2 = 0;
      this.y = 0;
      this.speed = backgroundSpeed * this.speedModifier;
    }
    update() {
      this.speed = backgroundSpeed * this.speedModifier;
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
    constructor(gameWidth, gameHeight, layers) {
      this.gameWidth = gameWidth;
      this.gameHeight = gameHeight;
      this.layers = LAYERS;
      this.x = 0;
      this.y = 0;
      this.speedX = 1;
      this.width = CANVAS_WIDTH;
      this.height = CANVAS_HEIGHT;
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
    constructor(gameWidth, gameHeight) {
      this.image = document.getElementById("imgBoar");
      this.gameWidth = gameWidth;
      this.gameHeight = gameHeight;
      this.width = 60; // displayed width
      this.height = 60; // displayed height
      this.x = this.gameWidth;
      this.y = this.gameHeight - this.height + 8;
      this.speedX = 2;

      this.maxFrameCol = 4; // number of columns on spritesheet
      this.maxFrameRow = 2; // number or rows on spritesheet
      this.sourceWidth = 124; // width of each sprite on spritesheet
      this.sourceHeight = 124; // height of each sprite on spritesheet
      this.frame = 0;
      this.frameCol = this.frame % this.maxFrameCol;
      this.frameRow = Math.floor(this.frame / this.maxFrameCol);
      this.fps = 10;
      this.frameTimer = 0;
    }

    draw(context) {
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
      this.x -= this.speedX;
    }
  }

  function handleEnemies(deltaTime) {
    if (enemyTimer > enemyInterval + randomEnemyInterval) {
      enemies.push(new Enemy(CANVAS_WIDTH, CANVAS_HEIGHT));
      randomEnemyInterval = Math.random() * 1000;
      enemyTimer = 0;
    } else {
      enemyTimer += deltaTime;
    }
    enemies.forEach((enemy) => {
      enemy.draw(ctx);
      enemy.update(deltaTime);
    });
  }

  function displayStatusText() {}

  const input = new InputHandler();
  const player = new Player(CANVAS_WIDTH, CANVAS_HEIGHT);

  let lastTime = 0;
  let enemyInterval = 1000;
  let randomEnemyInterval = Math.random() * 1000 + 500;
  let enemyTimer = 0;

  const layer1 = new Layer(document.getElementById("imgPlx1"), 0.2);
  const layer2 = new Layer(document.getElementById("imgPlx2"), 0.4);
  const layer3 = new Layer(document.getElementById("imgPlx3"), 0.6);
  const layer4 = new Layer(document.getElementById("imgPlx4"), 0.8);
  const layer5 = new Layer(document.getElementById("imgPlx5"), 1.0);
  const LAYERS = [layer1, layer2, layer3, layer4, layer5];

  const background = new Background(CANVAS_WIDTH, CANVAS_HEIGHT, LAYERS);

  function animate(timeStamp) {
    const deltaTime = timeStamp - lastTime;
    lastTime = timeStamp;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    background.draw(ctx);
    background.update();
    player.draw(ctx);
    player.update(input, deltaTime);

    handleEnemies(deltaTime);

    requestAnimationFrame(animate);
  }
  animate(0);
});
