window.addEventListener("load", function () {
    const canvas = document.getElementById("canvas1")  as HTMLCanvasElement;
    const ctx = canvas?.getContext("2d");
    const CANVAS_WIDTH = canvas.width = 768;
    const CANVAS_HEIGHT = canvas.height = 432;
    let backgroundSpeed = 0;
  
    class InputHandler {
      constructor() {
        this.keys as KeyboardEvent[] = [];
  
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
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.width = 66;
        this.height = 61;
        this.x = 0;
        this.y = this.gameHeight - this.height;
        this.frameX = 0;
        this.frameY = 0;
        this.speedX = 0;
        this.speedY = 0;
        this.weight = 1;
        this.image = document.getElementById("imgGoblin");
      }
  
      draw(context) {
        context.fillStyle = "white";
        //   context.fillRect(this.x, this.y, this.width, this.height);
        context.drawImage(
          this.image,
          this.frameX * this.width, // sx
          this.frameY * this.height, // sy
          this.width, // sw
          this.height, // sh
          this.x,
          this.y,
          this.width,
          this.height
        );
        // see https://www.youtube.com/watch?v=7JtLHJbm0kA&t=830s
      }
  
      update(input) {
        if (input.keys.includes("ArrowRight")) {
          this.speedX = 5;
        } else if (input.keys.includes("ArrowLeft")) {
          this.speedX = -5;
        }
        else if (input.keys.includes("ArrowUp") && this.onGround()) {
          this.speedY -= 20;
        } else {
          this.speedX = 0;
        }
  
        // horizontal movement
        this.x += this.speedX;
        // horizontal boundaries
        if (this.x < 0) {
          this.x = 0;
          backgroundSpeed = -this.speedX;
        }
        else if (this.x > this.gameWidth - this.width) {
          this.x = this.gameWidth - this.width;
          backgroundSpeed = -this.speedX;
        }
        else {
          backgroundSpeed = 0;
        }
        // vertical movement
        this.y += this.speedY;
        if (!this.onGround()) {
          this.speedY += this.weight;
          this.frameX = 1;
        } else {
          this.speedY = 0;
          this.frameX = 0;
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
          }
          else if(this.x > this.width) {
              this.x = 0;
          }
          // positions image2 to left or right 
          if(this.x <= 0) {
              this.x2 = this.x+this.width;
          }
          else {
              this.x2 = this.x-this.width;
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
          this.layers.forEach(layer => {
              layer.draw(context);
          })
      }
      update() {
        this.layers.forEach(layer => {
          layer.update();
        })
      }
    }
  
    class Enemy {}
  
    function handleEnemies() {}
  
    function displayStatusText() {}
  
    const input = new InputHandler();
    const player = new Player(CANVAS_WIDTH, CANVAS_HEIGHT,);
  
    const layer1 = new Layer(document.getElementById('imgPlx1'), 0.2);
    const layer2 = new Layer(document.getElementById('imgPlx2'), 0.4);
    const layer3 = new Layer(document.getElementById('imgPlx3'), 0.6);
    const layer4 = new Layer(document.getElementById('imgPlx4'), 0.8);
    const layer5 = new Layer(document.getElementById('imgPlx5'), 1.0);
    const LAYERS = [layer1, layer2, layer3, layer4, layer5];
  
    const background = new Background(CANVAS_WIDTH, CANVAS_HEIGHT, LAYERS);
  
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      background.draw(ctx);
      background.update();
      player.draw(ctx);
      player.update(input);
      requestAnimationFrame(animate);
    }
    animate();
  });
  