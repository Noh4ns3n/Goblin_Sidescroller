// WIP : add hitbox ; add score
window.addEventListener("load", function () {
    var canvas = document.getElementById("canvas1");
    var ctx = canvas.getContext("2d");
    var CANVAS_WIDTH = (canvas.width = 768);
    var CANVAS_HEIGHT = (canvas.height = 432);
    var backgroundSpeed = 0;
    var enemies = [];
    var InputHandler = /** @class */ (function () {
        function InputHandler() {
            var _this = this;
            this.keys = [];
            window.addEventListener("keydown", function (e) {
                if ((e.key === "ArrowDown" ||
                    e.key === "ArrowUp" ||
                    e.key === "ArrowLeft" ||
                    e.key === "ArrowRight") &&
                    !_this.keys.includes(e.key)) {
                    _this.keys.push(e.key);
                }
            });
            window.addEventListener("keyup", function (e) {
                if (e.key === "ArrowDown" ||
                    e.key === "ArrowUp" ||
                    e.key === "ArrowLeft" ||
                    e.key === "ArrowRight") {
                    _this.keys.splice(_this.keys.indexOf(e.key), 1);
                }
            });
        }
        return InputHandler;
    }());
    var Player = /** @class */ (function () {
        function Player(gameWidth, gameHeight) {
            this.image = document.getElementById("imgGoblin");
            this.facing = "R"; // R = right, L = left
            this.animation = "still";
            this.gameWidth = gameWidth;
            this.gameHeight = gameHeight;
            this.width = 66; // displayed width
            this.height = 61; // displayed height
            this.leftLimit = 0;
            this.rightLimit = this.gameWidth - this.width;
            this.yOffset = 4; // account for character position offset on spritesheet
            this.groundLimit = this.gameHeight - this.height + this.yOffset;
            this.x = 0;
            this.y = this.groundLimit;
            this.speedX = 0;
            this.speedXModifier = 3;
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
        }
        Player.prototype.draw = function (context) {
            // see https://www.youtube.com/watch?v=7JtLHJbm0kA&t=830s
            context.drawImage(this.image, this.frameCol * this.sourceWidth, // sx
            this.frameRow * this.sourceHeight, // sy
            this.width, // sw
            this.height, // sh
            this.x, this.y, this.width, this.height);
        };
        Player.prototype.update = function (input, deltaTime) {
            // ----- MOVEMENT
            // horizontal movement
            if (input.keys.includes("ArrowRight")) {
                this.speedX = this.speedXModifier;
                this.facing = "R";
                this.changeSpritesheet("running");
            }
            else if (input.keys.includes("ArrowLeft")) {
                this.speedX = -this.speedXModifier;
                this.facing = "L";
                this.changeSpritesheet("running");
            }
            else {
                this.speedX = 0;
                this.changeSpritesheet("still");
            }
            this.x += this.speedX;
            // horizontal boundaries
            if (this.x < this.leftLimit) {
                this.x = 0;
                backgroundSpeed = -this.speedX;
            }
            else if (this.x > this.rightLimit) {
                this.x = this.gameWidth - this.width;
                backgroundSpeed = -this.speedX;
            }
            else {
                backgroundSpeed = 0;
            }
            // vertical movement
            if (input.keys.includes("ArrowUp") && this.onGround()) {
                this.speedY -= 20;
            }
            this.y += this.speedY;
            if (!this.onGround()) {
                this.speedY += this.weight;
                this.changeSpritesheet("running");
            }
            else {
                this.speedY = 0;
            }
            // vertical boundaries
            if (this.y > this.groundLimit)
                this.y = this.groundLimit;
            // ----- ANIMATION
            // update player frame only when above fps interval
            if (this.frameTimer > 1000 / this.fps) {
                this.frameTimer = 0;
                // if reached end of spritesheet, repositions to start of spritesheet
                if (this.frame === this.maxFrameRow * this.maxFrameCol - 1) {
                    this.frame = 0;
                }
                else {
                    this.frame++;
                }
                // cycle through spritesheet rows/columns
                this.frameCol = this.frame % this.maxFrameCol;
                this.frameRow = Math.floor(this.frame / this.maxFrameCol);
            }
            else {
                this.frameTimer += deltaTime;
            }
        };
        Player.prototype.changeSpritesheet = function (animation) {
            this.animation = animation;
            if (this.image) {
                this.image.src = "assets/img/characters/goblin/goblin_".concat(this.animation, "_").concat(this.facing, "_spritesheet.png");
            }
        };
        Player.prototype.onGround = function () {
            return this.y >= this.gameHeight - this.height;
        };
        return Player;
    }());
    var Layer = /** @class */ (function () {
        function Layer(image, speedModifier) {
            this.width = CANVAS_WIDTH;
            this.height = CANVAS_HEIGHT;
            this.image = image;
            this.speedModifier = speedModifier;
            this.x = 0;
            this.x2 = 0;
            this.y = 0;
            this.speed = backgroundSpeed * this.speedModifier;
        }
        Layer.prototype.update = function () {
            this.speed = backgroundSpeed * this.speedModifier;
            this.x = this.x + this.speed;
            // reset image1 position if off-limits
            if (this.x < 0 - this.width) {
                this.x = 0;
            }
            else if (this.x > this.width) {
                this.x = 0;
            }
            // positions image2 to left or right
            if (this.x <= 0) {
                this.x2 = this.x + this.width;
            }
            else {
                this.x2 = this.x - this.width;
            }
        };
        Layer.prototype.draw = function (context) {
            context.drawImage(this.image, this.x, this.y, this.width, this.height);
            context.drawImage(this.image, this.x2, this.y, this.width, this.height);
        };
        return Layer;
    }());
    var Background = /** @class */ (function () {
        function Background(gameWidth, gameHeight, layers) {
            this.gameWidth = gameWidth;
            this.gameHeight = gameHeight;
            this.layers = LAYERS;
            this.x = 0;
            this.y = 0;
            this.speedX = 1;
            this.width = CANVAS_WIDTH;
            this.height = CANVAS_HEIGHT;
        }
        Background.prototype.draw = function (context) {
            this.layers.forEach(function (layer) {
                layer.draw(context);
            });
        };
        Background.prototype.update = function () {
            this.layers.forEach(function (layer) {
                layer.update();
            });
        };
        return Background;
    }());
    var Enemy = /** @class */ (function () {
        function Enemy(gameWidth, gameHeight) {
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
        Enemy.prototype.draw = function (context) {
            context.drawImage(this.image, this.frameCol * this.sourceWidth, //sx
            this.frameRow * this.sourceHeight, //sy
            this.sourceWidth, //sw
            this.sourceHeight, //sh
            this.x, this.y, this.width, this.height);
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
            this.x -= this.speedX;
        };
        return Enemy;
    }());
    function handleEnemies(deltaTime) {
        if (enemyTimer > enemyInterval + randomEnemyInterval) {
            enemies.push(new Enemy(CANVAS_WIDTH, CANVAS_HEIGHT));
            randomEnemyInterval = Math.random() * 1000;
            enemyTimer = 0;
        }
        else {
            enemyTimer += deltaTime;
        }
        enemies.forEach(function (enemy) {
            enemy.draw(ctx);
            enemy.update(deltaTime);
        });
    }
    function displayStatusText() { }
    var input = new InputHandler();
    var player = new Player(CANVAS_WIDTH, CANVAS_HEIGHT);
    var lastTime = 0;
    var enemyInterval = 1000;
    var randomEnemyInterval = Math.random() * 1000 + 500;
    var enemyTimer = 0;
    var layer1 = new Layer(document.getElementById("imgPlx1"), 0.2);
    var layer2 = new Layer(document.getElementById("imgPlx2"), 0.4);
    var layer3 = new Layer(document.getElementById("imgPlx3"), 0.6);
    var layer4 = new Layer(document.getElementById("imgPlx4"), 0.8);
    var layer5 = new Layer(document.getElementById("imgPlx5"), 1.0);
    var LAYERS = [layer1, layer2, layer3, layer4, layer5];
    var background = new Background(CANVAS_WIDTH, CANVAS_HEIGHT, LAYERS);
    function animate(timeStamp) {
        var deltaTime = timeStamp - lastTime;
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
