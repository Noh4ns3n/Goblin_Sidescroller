"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Enemy = void 0;
var Enemy = /** @class */ (function () {
    function Enemy(game) {
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
    Enemy.prototype.draw = function (context) {
        if (this.game.debug) {
            // context.strokeRect(this.x, this.y, this.width, this.height);
            context.beginPath();
            context.arc(this.x + this.width / 2, this.y + this.height / 2, this.hitboxRadius, 0, Math.PI * 2);
            context.stroke();
        }
        context.drawImage(this.image, this.frameCol * this.sourceWidth, //sx
        this.frameRow * this.sourceHeight, //sy
        this.sourceWidth, //sw
        this.sourceHeight, //sh
        this.x, this.y, this.width, this.height);
    };
    Enemy.prototype.checkForDeletion = function () {
        if (this.x < 0 - this.width) {
            this.markedForDeletion = true;
            this.game.score++;
        }
    };
    Enemy.prototype.update = function (deltaTime) {
        // animation
        // update enemy frame only when above fps interval
        if (this.frameTimer > 1000 / this.fps) {
            // if reached end of spritesheet, repositions to start of spritesheet
            if (this.frame === this.maxFrameRow * this.maxFrameCol - 1) {
                this.frame = 0;
            }
            else {
                this.frame++;
            }
            this.frameTimer = 0;
            // cycle through spritesheet rows/columns
            this.frameCol = this.frame % this.maxFrameCol;
            this.frameRow = Math.floor(this.frame / this.maxFrameCol);
        }
        else {
            this.frameTimer += deltaTime;
        }
        // horizontal movement
        this.x -= (this.speedX * this.game.speed);
        this.checkForDeletion();
    };
    return Enemy;
}());
exports.Enemy = Enemy;
