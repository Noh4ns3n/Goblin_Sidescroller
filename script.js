// WIP : add hitbox ; add score
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
window.addEventListener("load", function () {
    var canvas = document.getElementById("canvas1");
    var ctx = canvas.getContext("2d");
    var CANVAS_WIDTH = (canvas.width = 768);
    var CANVAS_HEIGHT = (canvas.height = 432);
    var STATES = {
        STILL: 0,
        RUNNING: 1,
        JUMPING: 2,
        FALLING: 3,
    };
    var InputHandler = /** @class */ (function () {
        function InputHandler(game) {
            var _this = this;
            this.game = game;
            this.keys = [];
            window.addEventListener("keydown", function (e) {
                if ((e.key === "ArrowDown" ||
                    e.key === "ArrowUp" ||
                    e.key === "ArrowLeft" ||
                    e.key === "ArrowRight") &&
                    !_this.keys.includes(e.key)) {
                    _this.keys.push(e.key);
                }
                else if (e.key === "d") {
                    _this.game.debug = !_this.game.debug;
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
    var State = /** @class */ (function () {
        function State(state) {
            this.state = state;
        }
        return State;
    }());
    var Still = /** @class */ (function (_super) {
        __extends(Still, _super);
        function Still(player) {
            var _this = _super.call(this, "STILL") || this;
            _this.player = player;
            return _this;
        }
        Still.prototype.enter = function () {
            this.player.animation = "still";
            this.player.changeSpritesheet();
        };
        Still.prototype.handleInput = function (input) {
            if (input.keys.includes("ArrowRight")) {
                this.player.facing = "R";
                this.player.setState(STATES.RUNNING);
            }
            else if (input.keys.includes("ArrowLeft")) {
                this.player.facing = "L";
                this.player.setState(STATES.RUNNING);
            }
            if (input.keys.includes("ArrowUp"))
                this.player.setState(STATES.JUMPING);
            this.player.changeSpritesheet();
        };
        return Still;
    }(State));
    var Running = /** @class */ (function (_super) {
        __extends(Running, _super);
        function Running(player) {
            var _this = _super.call(this, "RUNNING") || this;
            _this.player = player;
            return _this;
        }
        Running.prototype.enter = function () {
            this.player.animation = "running";
            this.player.changeSpritesheet();
        };
        Running.prototype.handleInput = function (input) {
            if (input.keys.includes("ArrowRight")) {
                this.player.facing = "R";
                this.player.changeSpritesheet();
            }
            else if (input.keys.includes("ArrowLeft")) {
                this.player.facing = "L";
                this.player.changeSpritesheet();
            }
            if (input.keys.includes("ArrowUp"))
                this.player.setState(STATES.JUMPING);
            if (this.player.speedX === 0)
                this.player.setState(STATES.STILL);
        };
        return Running;
    }(State));
    var Jumping = /** @class */ (function (_super) {
        __extends(Jumping, _super);
        function Jumping(player) {
            var _this = _super.call(this, "JUMPING") || this;
            _this.player = player;
            return _this;
        }
        Jumping.prototype.enter = function () {
            this.player.animation = "running";
            this.player.changeSpritesheet();
        };
        Jumping.prototype.handleInput = function (input) {
            if (this.player.speedY > this.player.weight) {
                this.player.setState(STATES.FALLING);
            }
        };
        return Jumping;
    }(State));
    var Falling = /** @class */ (function (_super) {
        __extends(Falling, _super);
        function Falling(player) {
            var _this = _super.call(this, "FALLING") || this;
            _this.player = player;
            return _this;
        }
        Falling.prototype.enter = function () {
            this.player.animation = "running";
            this.player.changeSpritesheet();
        };
        Falling.prototype.handleInput = function (input) {
            if (this.player.onGround()) {
                this.player.setState(STATES.STILL);
            }
        };
        return Falling;
    }(State));
    var Player = /** @class */ (function () {
        function Player(game) {
            this.game = game;
            this.states = [
                new Still(this),
                new Running(this),
                new Jumping(this),
                new Falling(this),
            ];
            this.currentState = this.states[0];
            this.currentState.enter();
            this.image = document.getElementById("imgGoblin");
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
        Player.prototype.draw = function (context) {
            // see https://www.youtube.com/watch?v=7JtLHJbm0kA&t=830s
            if (this.game.debug) {
                // context.strokeRect(this.x, this.y, this.width, this.height);
                context.beginPath();
                context.arc(this.x + this.width / 2.1, this.y + this.height / 1.8, this.hitboxRadius, 0, Math.PI * 2);
                context.stroke();
            }
            context.drawImage(this.image, this.frameCol * this.sourceWidth, // sx
            this.frameRow * this.sourceHeight, // sy
            this.width, // sw
            this.height, // sh
            this.x, this.y, this.width, this.height);
        };
        Player.prototype.update = function (input, deltaTime) {
            this.checkCollision();
            if (this.game.debug) {
                console.log("this.currentState :>> ", this.currentState);
                console.log('this.speedX :>> ', this.speedX);
            console.log('this.speedY :>> ', this.speedY);
            }
            // ----- MOVEMENT
            // horizontal movement
            if (input.keys.includes("ArrowRight")) {
                this.speedX = (this.speedXModifier * this.game.speed);
                this.facing = "R";
            }
            else if (input.keys.includes("ArrowLeft")) {
                this.speedX = (-this.speedXModifier * this.game.speed);
                this.facing = "L";
            }
            else {
                this.speedX = 0;
            }
            this.x += this.speedX;
            this.traveledX += this.speedX;
            this.currentState.handleInput(input);
            // horizontal boundaries
            if (this.x < this.leftLimit) {
                this.x = 0;
                this.game.background.speedX = (-this.speedX * this.game.speed);
            }
            else if (this.x > this.rightLimit) {
                this.x = this.game.width - this.width;
                this.game.background.speedX = (-this.speedX * this.game.speed);
            }
            else {
                this.game.background.speedX = 0;
            }
            // vertical movement
            if (input.keys.includes("ArrowUp") && this.onGround()) {
                this.speedY -= 20;
            }
            this.y += this.speedY;
            if (!this.onGround()) {
                this.speedY += this.weight;
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
        Player.prototype.changeSpritesheet = function () {
            if (this.image) {
                this.image.src = "assets/img/characters/goblin/goblin_".concat(this.animation, "_").concat(this.facing, "_spritesheet.png");
            }
        };
        Player.prototype.setState = function (state) {
            this.currentState = this.states[state];
            this.currentState.enter();
        };
        Player.prototype.checkCollision = function () {
            var _this = this;
            this.game.enemies.forEach(function (enemy) {
                var dx = enemy.x - _this.x;
                var dy = enemy.y - _this.y;
                var distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < enemy.hitboxRadius + _this.hitboxRadius) {
                    _this.game.gameOver = true;
                }
            });
        };
        Player.prototype.onGround = function () {
            return this.y >= this.game.height - this.height;
        };
        return Player;
    }());
    var Layer = /** @class */ (function () {
        function Layer(background, image, speedModifier) {
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
        Layer.prototype.update = function () {
            this.speed = this.background.speedX * this.speedModifier;
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
        function Background() {
            this.x = 0;
            this.y = 0;
            this.width = CANVAS_WIDTH;
            this.height = CANVAS_HEIGHT;
            this.speedX = 0;
            var layer1 = new Layer(this, document.getElementById("imgPlx1"), 0.2);
            var layer2 = new Layer(this, document.getElementById("imgPlx2"), 0.4);
            var layer3 = new Layer(this, document.getElementById("imgPlx3"), 0.6);
            var layer4 = new Layer(this, document.getElementById("imgPlx4"), 0.8);
            var layer5 = new Layer(this, document.getElementById("imgPlx5"), 1.0);
            this.layers = [layer1, layer2, layer3, layer4, layer5];
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
    var Game = /** @class */ (function () {
        function Game(context) {
            var _this = this;
            this.animate = function (timeStamp) {
                var deltaTime = timeStamp - _this.lastTime;
                _this.lastTime = timeStamp;
                _this.context.clearRect(0, 0, _this.width, _this.height);
                _this.background.draw(_this.context);
                _this.background.update();
                _this.player.draw(_this.context);
                _this.player.update(_this.input, deltaTime);
                _this.handleEnemies(deltaTime);
                _this.displayStatusText();
                if (!_this.gameOver)
                    requestAnimationFrame(_this.animate);
            };
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
        Game.prototype.handleEnemies = function (deltaTime) {
            var _this = this;
            if (this.enemyTimer > this.enemyInterval + this.randomEnemyInterval) {
                this.enemies.push(new Enemy(this));
                this.randomEnemyInterval = Math.random() * 1000;
                this.enemyTimer = 0;
            }
            else {
                this.enemyTimer += deltaTime;
            }
            this.enemies.forEach(function (enemy) {
                enemy.draw(_this.context);
                enemy.update(deltaTime);
                _this.enemies = _this.enemies.filter(function (enemy) { return !enemy.markedForDeletion; });
            });
        };
        Game.prototype.displayStatusText = function () {
            this.spanScore.innerHTML = this.score.toString();
        };
        return Game;
    }());
    var game = new Game(ctx);
    game.animate(0);
});
