export class Enemy {
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

  constructor(gameWidth, gameHeight) {
    this.image = document.getElementById("imgBoar");
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.width = 60; // displayed width
    this.height = 60; // displayed height
    this.x = this.gameWidth;
    this.yOffset = 8; // account for character offset on sprite
    this.y = this.gameHeight - this.height + this.yOffset;
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
