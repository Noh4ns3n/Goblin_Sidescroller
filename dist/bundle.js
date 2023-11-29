/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./const/const.ts":
/*!************************!*\
  !*** ./const/const.ts ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CANVAS2_HEIGHT: () => (/* binding */ CANVAS2_HEIGHT),
/* harmony export */   CANVAS2_WIDTH: () => (/* binding */ CANVAS2_WIDTH),
/* harmony export */   CANVAS_HEIGHT: () => (/* binding */ CANVAS_HEIGHT),
/* harmony export */   CANVAS_WIDTH: () => (/* binding */ CANVAS_WIDTH),
/* harmony export */   IMG_HEARTS: () => (/* binding */ IMG_HEARTS),
/* harmony export */   STATES: () => (/* binding */ STATES)
/* harmony export */ });
var CANVAS_WIDTH = 768;
var CANVAS_HEIGHT = 432;
var CANVAS2_WIDTH = 768;
var CANVAS2_HEIGHT = 108;
var STATES = {
    STILL: 0,
    RUNNING: 1,
    JUMPING: 2,
    FALLING: 3,
    ATTACKING: 4,
};
var IMG_HEARTS = {
    FULL: 0,
    HALF: 1,
    EMPTY: 2,
};



/***/ }),

/***/ "./model/Background.ts":
/*!*****************************!*\
  !*** ./model/Background.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Background: () => (/* binding */ Background)
/* harmony export */ });
/* harmony import */ var _const_const__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../const/const */ "./const/const.ts");
/* harmony import */ var _Layer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Layer */ "./model/Layer.ts");


var Background = /** @class */ (function () {
    function Background() {
        this.x = 0;
        this.y = 0;
        this.width = _const_const__WEBPACK_IMPORTED_MODULE_0__.CANVAS_WIDTH;
        this.height = _const_const__WEBPACK_IMPORTED_MODULE_0__.CANVAS_HEIGHT;
        this.speedX = 0;
        this.imageLayer1 = new Image(60, 40);
        this.imageLayer1.src = "assets/img/background/plx-1.png";
        var layer1 = new _Layer__WEBPACK_IMPORTED_MODULE_1__.Layer(this, this.imageLayer1, 0.0);
        this.imageLayer2 = new Image(60, 40);
        this.imageLayer2.src = "assets/img/background/plx-2.png";
        var layer2 = new _Layer__WEBPACK_IMPORTED_MODULE_1__.Layer(this, this.imageLayer2, 0.4);
        this.imageLayer3 = new Image(60, 40);
        this.imageLayer3.src = "assets/img/background/plx-3.png";
        var layer3 = new _Layer__WEBPACK_IMPORTED_MODULE_1__.Layer(this, this.imageLayer3, 0.6);
        this.imageLayer4 = new Image(60, 40);
        this.imageLayer4.src = "assets/img/background/plx-4.png";
        var layer4 = new _Layer__WEBPACK_IMPORTED_MODULE_1__.Layer(this, this.imageLayer4, 0.8);
        this.imageLayer5 = new Image(60, 40);
        this.imageLayer5.src = "assets/img/background/plx-5.png";
        var layer5 = new _Layer__WEBPACK_IMPORTED_MODULE_1__.Layer(this, this.imageLayer5, 1.0);
        this.imageGround = new Image(60, 40);
        this.imageGround.src = "assets/img/background/ground.png";
        var layerGround = new _Layer__WEBPACK_IMPORTED_MODULE_1__.Layer(this, this.imageGround, 1.1);
        this.layers = [layer1, layer2, layer3, layer4, layer5, layerGround];
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



/***/ }),

/***/ "./model/Enemy.ts":
/*!************************!*\
  !*** ./model/Enemy.ts ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Enemy: () => (/* binding */ Enemy)
/* harmony export */ });
var Enemy = /** @class */ (function () {
    function Enemy(game) {
        this.game = game;
        this.image = document.getElementById("imgBoar");
        this.width = 60; // displayed width
        this.height = 60; // displayed height
        this.x = this.game.width;
        this.yOffset = -17; // account for character offset on sprite
        this.y = this.game.height - this.height + this.yOffset;
        this.speedX = 2;
        this.weight = 0.2;
        this.hurt = false;
        this.hurtTimer = 0;
        this.deathTimer = 850;
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
        this.hitboxXOffset = 2;
        this.hitboxYOffset = 2;
        this.markedForDeletion = false;
        this.animation = "running";
        this.facing = "L";
        this.images = {
            still: {
                L: null,
                R: null,
            },
            running: {
                L: null,
                R: null,
            },
            turning: {
                L: null,
                R: null,
            },
            attacking: {
                L: null,
                R: null,
            },
            hurt: {
                L: null,
                R: null,
            },
            dying: {
                L: null,
                R: null,
            },
        };
        this.images.still.L = new Image(60, 45);
        this.images.still.L.src =
            "assets/img/characters/boar/boar_still_L_spritesheet.png";
        this.images.still.R = new Image(60, 45);
        this.images.still.R.src =
            "assets/img/characters/boar/boar_still_R_spritesheet.png";
        this.images.running.L = new Image(60, 45);
        this.images.running.L.src =
            "assets/img/characters/boar/boar_running_L_spritesheet.png";
        this.images.running.R = new Image(60, 45);
        this.images.running.R.src =
            "assets/img/characters/boar/boar_running_R_spritesheet.png";
        this.images.turning.L = new Image(60, 45);
        this.images.turning.L.src =
            "assets/img/characters/boar/boar_turning_L_spritesheet.png";
        this.images.turning.R = new Image(60, 45);
        this.images.turning.R.src =
            "assets/img/characters/boar/boar_turning_R_spritesheet.png";
        this.images.attacking.L = new Image(60, 45);
        this.images.attacking.L.src =
            "assets/img/characters/boar/boar_attacking_L_spritesheet.png";
        this.images.attacking.R = new Image(60, 45);
        this.images.attacking.R.src =
            "assets/img/characters/boar/boar_attacking_R_spritesheet.png";
        this.images.hurt.L = new Image(60, 45);
        this.images.hurt.L.src =
            "assets/img/characters/boar/boar_hurt_L_spritesheet.png";
        this.images.hurt.R = new Image(60, 45);
        this.images.hurt.R.src =
            "assets/img/characters/boar/boar_hurt_R_spritesheet.png";
        this.images.dying.L = new Image(60, 45);
        this.images.dying.L.src =
            "assets/img/characters/boar/boar_dying_L_spritesheet.png";
        this.images.dying.R = new Image(60, 45);
        this.images.dying.R.src =
            "assets/img/characters/boar/boar_dying_R_spritesheet.png";
    }
    Enemy.prototype.draw = function (context) {
        if (this.game.debug) {
            context.beginPath();
            context.arc(this.x + this.width / this.hitboxXOffset, this.y + this.height / this.hitboxYOffset, this.hitboxRadius, 0, Math.PI * 2);
            context.stroke();
        }
        context.drawImage(this.images[this.animation][this.facing], this.frameCol * this.sourceWidth, //sx
        this.frameRow * this.sourceHeight, //sy
        this.sourceWidth, //sw
        this.sourceHeight, //sh
        this.x, this.y, this.width, this.height);
    };
    Enemy.prototype.checkForCoward = function () {
        if (this.game.player.x === this.game.player.leftLimit) {
            this.fps = 22;
        }
        else {
            this.fps = 13;
        }
    };
    Enemy.prototype.checkForDeletion = function () {
        this.game.reduceEnemyInterval();
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
        if (this.hurt) {
            this.hurtTimer += this.game.deltaTime;
            if (this.hurtTimer >= this.deathTimer) {
                this.markedForDeletion = true;
            }
        }
        // horizontal movement
        this.x -= this.speedX * this.game.speed;
        this.checkForDeletion();
        this.checkForCoward();
    };
    return Enemy;
}());



/***/ }),

/***/ "./model/Game.ts":
/*!***********************!*\
  !*** ./model/Game.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Game: () => (/* binding */ Game)
/* harmony export */ });
/* harmony import */ var _const_const__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../const/const */ "./const/const.ts");
/* harmony import */ var _Background__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Background */ "./model/Background.ts");
/* harmony import */ var _Enemy__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Enemy */ "./model/Enemy.ts");
/* harmony import */ var _InputHandler__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./InputHandler */ "./model/InputHandler.ts");
/* harmony import */ var _Player__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Player */ "./model/Player.ts");





// import "../scripts/require.js";
var Game = /** @class */ (function () {
    function Game(context, context2) {
        var _this = this;
        this.animate = function (timeStamp) {
            _this.deltaTime = timeStamp - _this.lastTime;
            _this.lastTime = timeStamp;
            _this.lastFrame += _this.deltaTime;
            if (_this.lastFrame > 1000 / _this.framerate) {
                _this.context.clearRect(0, 0, _this.width, _this.height);
                _this.background.draw(_this.context);
                _this.background.update();
                _this.handleEnemies(_this.deltaTime);
                _this.player.draw(_this.context);
                _this.player.update(_this.input, _this.deltaTime);
                _this.displayStatusText();
                _this.lastFrame = 0;
            }
            _this.displayHearts();
            if (_this.gameOver) {
                _this.handleVictory();
            }
            else
                requestAnimationFrame(_this.animate);
        };
        this.context = context;
        this.context2 = context2;
        this.height = _const_const__WEBPACK_IMPORTED_MODULE_0__.CANVAS_HEIGHT;
        this.width = _const_const__WEBPACK_IMPORTED_MODULE_0__.CANVAS_WIDTH;
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
        this.input = new _InputHandler__WEBPACK_IMPORTED_MODULE_3__.InputHandler(this);
        this.background = new _Background__WEBPACK_IMPORTED_MODULE_1__.Background();
        this.player = new _Player__WEBPACK_IMPORTED_MODULE_4__.Player(this);
        this.heartImages = this.prepareHUDImages("heart");
        this.framerate = 200;
        this.lastFrame = 0;
        this.playerLastHealth = this.player.startingHealthpoints;
        this.lastScore = 0;
    }
    Game.prototype.prepareHUDImages = function (keyword) {
        if (keyword === "heart") {
            var imagesHUD = [new Image(), new Image(), new Image()];
            imagesHUD[0].src = "assets/img/display/heart_full.png";
            imagesHUD[0].width = 50;
            imagesHUD[1].src = "assets/img/display/heart_half.png";
            imagesHUD[1].width = 50;
            imagesHUD[2].src = "assets/img/display/heart_empty.png";
            imagesHUD[2].width = 50;
            return imagesHUD;
        }
    };
    Game.prototype.handleEnemies = function (deltaTime) {
        var _this = this;
        // enemyInterval 10% reduction every 20 score points
        if (this.enemyTimer > this.enemyInterval + this.randomEnemyInterval) {
            this.enemies.push(new _Enemy__WEBPACK_IMPORTED_MODULE_2__.Enemy(this));
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
    Game.prototype.handleVictory = function () {
        var spanVictory = document.getElementById("spanVictory");
        var spanVictory2 = document.getElementById("spanVictory");
        var pVictory = document.getElementById("pVictory");
        var pVictory2 = document.getElementById("pVictory2");
        var message = "Bravo !";
        if (this.score >= 20) {
            document.body.style.color = "green";
            pVictory.style.top = "-25%";
            pVictory.style.fontSize = "80px";
            spanVictory.innerHTML = message;
        }
        else {
            this.grayscaleCanvas();
            var message_1 = "Perdu !";
            document.body.style.color = "darkred";
            pVictory.style.top = "-25%";
            pVictory.style.fontSize = "80px";
            spanVictory.innerHTML = message_1;
        }
    };
    Game.prototype.displayHearts = function () {
        var updateHearts = this.playerLastHealth !== this.player.healthpoints;
        if (updateHearts || this.player.healthpoints === 0 || this.lastTime < 1000) {
            this.playerLastHealth = this.player.healthpoints;
            this.context2.clearRect(0, 0, _const_const__WEBPACK_IMPORTED_MODULE_0__.CANVAS2_WIDTH, _const_const__WEBPACK_IMPORTED_MODULE_0__.CANVAS2_HEIGHT);
            var fullHearts = Math.floor(this.player.healthpoints / 2);
            var halfHeart = this.player.healthpoints % 2 === 1 ? 1 : 0;
            var emptyHearts = this.player.startingHealthpoints / 2 - fullHearts - halfHeart;
            var imgWidth = this.heartImages[_const_const__WEBPACK_IMPORTED_MODULE_0__.IMG_HEARTS.FULL].width;
            var positionY = _const_const__WEBPACK_IMPORTED_MODULE_0__.CANVAS2_HEIGHT / 2 - imgWidth / 2;
            for (var i = 0; i < this.player.startingHealthpoints / 2; i++) {
                // positionX = ( sizeCanvas - ( sizeImage * numberImages ) / 2 ) + ( indexImage * sizeImage )
                var positionX = (_const_const__WEBPACK_IMPORTED_MODULE_0__.CANVAS2_WIDTH - (imgWidth * this.player.startingHealthpoints) / 2) /
                    2 +
                    i * imgWidth;
                if (fullHearts > 0) {
                    fullHearts--;
                    this.context2.drawImage(this.heartImages[_const_const__WEBPACK_IMPORTED_MODULE_0__.IMG_HEARTS.FULL], positionX, positionY, 50, 50);
                }
                else if (halfHeart > 0) {
                    halfHeart--;
                    this.context2.drawImage(this.heartImages[_const_const__WEBPACK_IMPORTED_MODULE_0__.IMG_HEARTS.HALF], positionX, positionY, 50, 50);
                }
                else if (emptyHearts > 0) {
                    emptyHearts--;
                    this.context2.drawImage(this.heartImages[_const_const__WEBPACK_IMPORTED_MODULE_0__.IMG_HEARTS.EMPTY], positionX, positionY, 50, 50);
                }
            }
        }
    };
    Game.prototype.reduceEnemyInterval = function () {
        if (this.score > this.lastScore + 20) {
            this.lastScore = this.score;
            // this.enemyIntervalReduction = Math.floor(this.score / 20) * 10;
            // this.enemyInterval = this.enemyInterval * (1 - this.enemyIntervalReduction / 100);
            this.enemyInterval *= 0.9;
            console.log('this.enemyInterval :>> ', this.enemyInterval);
        }
    };
    Game.prototype.grayscaleCanvas = function () {
        var imageData = this.context.getImageData(0, 0, this.width, this.height);
        var data = imageData.data;
        for (var i = 0; i < data.length; i += 4) {
            var luminance = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
            data[i] = luminance;
            data[i + 1] = luminance;
            data[i + 2] = luminance;
        }
        this.context.putImageData(imageData, 0, 0);
    };
    Game.prototype.displayStatusText = function () {
        this.spanScore.innerHTML = "".concat(this.score.toString(), " ").concat(this.debug
            ? "</br> FPS : " +
                Math.floor(1000 / this.deltaTime) +
                " maxUpdate/s : " +
                this.framerate
            : "");
    };
    return Game;
}());



/***/ }),

/***/ "./model/InputHandler.ts":
/*!*******************************!*\
  !*** ./model/InputHandler.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   InputHandler: () => (/* binding */ InputHandler)
/* harmony export */ });
var InputHandler = /** @class */ (function () {
    function InputHandler(game) {
        var _this = this;
        this.game = game;
        this.keys = [];
        this.listenedKeys = ["ArrowDown", "ArrowUp", "ArrowLeft", "ArrowRight", "a"];
        window.addEventListener("keydown", function (e) {
            if (_this.listenedKeys.includes(e.key) &&
                !_this.keys.includes(e.key)) {
                _this.keys.push(e.key);
            }
            else if (e.key === "d") {
                _this.game.debug = !_this.game.debug;
            }
        });
        window.addEventListener("keyup", function (e) {
            if (_this.listenedKeys.includes(e.key)) {
                _this.keys.splice(_this.keys.indexOf(e.key), 1);
            }
        });
    }
    return InputHandler;
}());



/***/ }),

/***/ "./model/Layer.ts":
/*!************************!*\
  !*** ./model/Layer.ts ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Layer: () => (/* binding */ Layer)
/* harmony export */ });
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



/***/ }),

/***/ "./model/Player.ts":
/*!*************************!*\
  !*** ./model/Player.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Player: () => (/* binding */ Player)
/* harmony export */ });
/* harmony import */ var _const_const__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../const/const */ "./const/const.ts");
/* harmony import */ var _States__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./States */ "./model/States.ts");


var Player = /** @class */ (function () {
    function Player(game) {
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
        this.x = this.game.width / 2 - this.width / 2;
        this.y = this.groundLimit;
        this.speedX = 0;
        this.speedXModifier = 3;
        this.speedXAirModifier = 5;
        this.traveledX = 0;
        this.speedY = 0;
        this.jumpCooldown = 400;
        this.lastJump = this.jumpCooldown;
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
        this.lastAttack = 0;
        this.attackCooldown = 1000;
        this.attackDuration = 500;
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
            new _States__WEBPACK_IMPORTED_MODULE_1__.Still(this.game),
            new _States__WEBPACK_IMPORTED_MODULE_1__.Running(this.game),
            new _States__WEBPACK_IMPORTED_MODULE_1__.Jumping(this.game),
            new _States__WEBPACK_IMPORTED_MODULE_1__.Falling(this.game),
            new _States__WEBPACK_IMPORTED_MODULE_1__.Attacking(this.game),
        ];
        this.currentState = this.states[0];
    }
    Player.prototype.draw = function (context) {
        // see https://www.youtube.com/watch?v=7JtLHJbm0kA&t=830s
        if (this.game.debug) {
            context.beginPath();
            context.arc(this.hitboxXCenter, this.hitboxYCenter, this.hitboxRadius, 0, Math.PI * 2);
            context.stroke();
        }
        context.drawImage(this.images[this.animation][this.facing], this.frameCol * this.sourceWidth, // sx
        this.frameRow * this.sourceHeight, // sy
        this.width, // sw
        this.height, // sh
        this.x, this.y, this.width, this.height);
    };
    Player.prototype.update = function (input, deltaTime) {
        this.lastAttack += deltaTime;
        this.lastJump += deltaTime;
        if (this.healthpoints === 0)
            this.game.gameOver = true;
        if (this.game.debug) {
            console.log("this.currentState :>> ", this.currentState);
            console.log("this.speedX :>> ", this.speedX);
            console.log("this.speedY :>> ", this.speedY);
        }
        // ----- MOVEMENT
        // horizontal movement
        if (input.keys.includes("ArrowRight")) {
            this.facing = "R";
        }
        else if (input.keys.includes("ArrowLeft")) {
            this.facing = "L";
        }
        else {
            this.speedX = 0;
        }
        this.checkCollision();
        this.x += this.speedX;
        this.traveledX += this.speedX;
        this.currentState.handleInput(input);
        // horizontal boundaries
        if (this.x < this.leftLimit) {
            this.x = 0;
            this.game.background.speedX = -this.speedX * this.game.speed;
        }
        else if (this.x > this.rightLimit) {
            this.x = this.game.width - this.width;
            this.game.background.speedX = -this.speedX * this.game.speed;
        }
        else {
            this.game.background.speedX = 0;
        }
        // vertical movement
        if (input.keys.includes("ArrowUp") &&
            this.onGround() &&
            this.lastJump > this.jumpCooldown) {
            this.speedY -= 20;
            this.lastJump = 0;
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
    Player.prototype.setState = function (state) {
        this.currentState = this.states[state];
        this.currentState.enter();
    };
    Player.prototype.checkCollision = function () {
        var _this = this;
        // change hitbox position depending on where player is facing
        if (this.facing === "R") {
            this.hitboxXCenter = this.x + this.width / this.hitboxXOffset;
            this.hitboxYCenter = this.y + this.height / this.hitboxYOffset;
        }
        else {
            this.hitboxXCenter = this.x + 12 + this.width / this.hitboxXOffset;
            this.hitboxYCenter = this.y + this.height / this.hitboxYOffset;
        }
        this.game.enemies.forEach(function (enemy) {
            var dx = enemy.x + enemy.width / enemy.hitboxXOffset - _this.hitboxXCenter;
            var dy = enemy.y + enemy.height / enemy.hitboxYOffset - _this.hitboxYCenter;
            var distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < enemy.hitboxRadius + _this.hitboxRadius) {
                if (_this.currentState !== _this.states[_const_const__WEBPACK_IMPORTED_MODULE_0__.STATES.ATTACKING] &&
                    !enemy.hurt) {
                    _this.healthpoints--;
                    _this.speedX = -10;
                    _this.speedY = -15;
                    _this.game.displayHearts();
                }
                else if (_this.currentState === _this.states[_const_const__WEBPACK_IMPORTED_MODULE_0__.STATES.ATTACKING]) {
                    if (!enemy.hurt)
                        _this.game.score += 2;
                    enemy.hurt = true;
                    enemy.frame = 0;
                    enemy.animation = "dying";
                    while (enemy.speedX > enemy.weight) {
                        enemy.speedX -= (enemy.weight * 0.9);
                    }
                }
            }
        });
    };
    Player.prototype.onGround = function () {
        return this.y >= this.game.height - this.height + this.yOffset;
    };
    return Player;
}());



/***/ }),

/***/ "./model/States.ts":
/*!*************************!*\
  !*** ./model/States.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Attacking: () => (/* binding */ Attacking),
/* harmony export */   Falling: () => (/* binding */ Falling),
/* harmony export */   Jumping: () => (/* binding */ Jumping),
/* harmony export */   Running: () => (/* binding */ Running),
/* harmony export */   State: () => (/* binding */ State),
/* harmony export */   Still: () => (/* binding */ Still)
/* harmony export */ });
/* harmony import */ var _const_const__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../const/const */ "./const/const.ts");
var __extends = (undefined && undefined.__extends) || (function () {
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

var State = /** @class */ (function () {
    function State(state) {
        this.state = state;
    }
    return State;
}());
var Still = /** @class */ (function (_super) {
    __extends(Still, _super);
    function Still(game) {
        var _this = _super.call(this, "STILL") || this;
        _this.game = game;
        return _this;
    }
    Still.prototype.enter = function () {
        this.game.player.animation = "still";
    };
    Still.prototype.handleInput = function (input) {
        if (input.keys.includes("ArrowRight")) {
            this.game.player.facing = "R";
            this.game.player.speedX =
                this.game.player.speedXModifier * this.game.speed;
            this.game.player.setState(_const_const__WEBPACK_IMPORTED_MODULE_0__.STATES.RUNNING);
        }
        else if (input.keys.includes("ArrowLeft")) {
            this.game.player.facing = "L";
            this.game.player.speedX =
                -this.game.player.speedXModifier * this.game.speed;
            this.game.player.setState(_const_const__WEBPACK_IMPORTED_MODULE_0__.STATES.RUNNING);
        }
        if (input.keys.includes("ArrowUp") &&
            this.game.player.lastJump > this.game.player.jumpCooldown) {
            this.game.player.setState(_const_const__WEBPACK_IMPORTED_MODULE_0__.STATES.JUMPING);
        }
        if (input.keys.includes("a") &&
            this.game.player.lastAttack > this.game.player.attackCooldown) {
            this.game.player.lastAttack = 0;
            this.game.player.setState(_const_const__WEBPACK_IMPORTED_MODULE_0__.STATES.ATTACKING);
        }
    };
    return Still;
}(State));
var Running = /** @class */ (function (_super) {
    __extends(Running, _super);
    function Running(game) {
        var _this = _super.call(this, "RUNNING") || this;
        _this.game = game;
        return _this;
    }
    Running.prototype.enter = function () {
        this.game.player.animation = "running";
    };
    Running.prototype.handleInput = function (input) {
        if (input.keys.includes("ArrowRight")) {
            this.game.player.facing = "R";
            this.game.player.speedX =
                this.game.player.speedXModifier * this.game.speed;
        }
        else if (input.keys.includes("ArrowLeft")) {
            this.game.player.facing = "L";
            this.game.player.speedX =
                -this.game.player.speedXModifier * this.game.speed;
        }
        if (input.keys.includes("ArrowUp") &&
            this.game.player.lastJump > this.game.player.jumpCooldown)
            this.game.player.setState(_const_const__WEBPACK_IMPORTED_MODULE_0__.STATES.JUMPING);
        if (this.game.player.speedX === 0)
            this.game.player.setState(_const_const__WEBPACK_IMPORTED_MODULE_0__.STATES.STILL);
    };
    return Running;
}(State));
var Jumping = /** @class */ (function (_super) {
    __extends(Jumping, _super);
    function Jumping(game) {
        var _this = _super.call(this, "JUMPING") || this;
        _this.game = game;
        return _this;
    }
    Jumping.prototype.enter = function () {
        this.game.player.animation = "running";
        // this.game.player.speedY -= 20;
        // ???? Why doing this here instead of Player.ts:211 makes character jump twice as high ????
    };
    Jumping.prototype.handleInput = function (input) {
        if (this.game.player.speedY > this.game.player.weight) {
            this.game.player.setState(_const_const__WEBPACK_IMPORTED_MODULE_0__.STATES.FALLING);
        }
        if (input.keys.includes("ArrowRight")) {
            this.game.player.facing = "R";
            this.game.player.speedX =
                this.game.player.speedXAirModifier * this.game.speed;
        }
        else if (input.keys.includes("ArrowLeft")) {
            this.game.player.facing = "L";
            this.game.player.speedX =
                -this.game.player.speedXAirModifier * this.game.speed;
        }
    };
    return Jumping;
}(State));
var Falling = /** @class */ (function (_super) {
    __extends(Falling, _super);
    function Falling(game) {
        var _this = _super.call(this, "FALLING") || this;
        _this.game = game;
        return _this;
    }
    Falling.prototype.enter = function () {
        this.game.player.animation = "running";
    };
    Falling.prototype.handleInput = function (input) {
        if (input.keys.includes("ArrowRight")) {
            this.game.player.facing = "R";
            this.game.player.speedX =
                this.game.player.speedXAirModifier * this.game.speed;
        }
        else if (input.keys.includes("ArrowLeft")) {
            this.game.player.facing = "L";
            this.game.player.speedX =
                -this.game.player.speedXAirModifier * this.game.speed;
        }
        if (this.game.player.onGround()) {
            this.game.player.setState(_const_const__WEBPACK_IMPORTED_MODULE_0__.STATES.STILL);
        }
    };
    return Falling;
}(State));
var Attacking = /** @class */ (function (_super) {
    __extends(Attacking, _super);
    function Attacking(game) {
        var _this = _super.call(this, "ATTACKING") || this;
        _this.game = game;
        return _this;
    }
    Attacking.prototype.enter = function () {
        this.game.player.frame = 0;
        this.game.player.animation = "attacking";
        this.attackTimer = this.game.player.attackDuration;
    };
    Attacking.prototype.handleInput = function (input) {
        this.attackTimer -= this.game.deltaTime;
        if (input.keys.includes("ArrowRight")) {
            this.game.player.facing = "R";
            this.game.player.speedX =
                this.game.player.speedXModifier * this.game.speed;
        }
        else if (input.keys.includes("ArrowLeft")) {
            this.game.player.facing = "L";
            this.game.player.speedX =
                -this.game.player.speedXModifier * this.game.speed;
        }
        if (this.attackTimer <= 0) {
            this.game.player.setState(_const_const__WEBPACK_IMPORTED_MODULE_0__.STATES.STILL);
            if (input.keys.includes("ArrowUp") &&
                this.game.player.lastJump > this.game.player.jumpCooldown)
                this.game.player.setState(_const_const__WEBPACK_IMPORTED_MODULE_0__.STATES.JUMPING);
            if (this.game.player.speedX === 0)
                this.game.player.setState(_const_const__WEBPACK_IMPORTED_MODULE_0__.STATES.STILL);
        }
    };
    return Attacking;
}(State));



/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*******************!*\
  !*** ./script.ts ***!
  \*******************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _const_const__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./const/const */ "./const/const.ts");
/* harmony import */ var _model_Game__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./model/Game */ "./model/Game.ts");
// WIP : add vertical movement to jumping state --- ??? why is velocity increased twice ???
// add possibility to change animation for a specified duration (ex: enemy turning)
// add jump cooldown for player
// add sound
// Game is being sent everywhere + I don't want more than one instance -> make it a Singleton


window.addEventListener("load", function () {
    // canvas1 = game area
    var canvas = document.getElementById("canvas1");
    var ctx = canvas.getContext("2d");
    canvas.width = _const_const__WEBPACK_IMPORTED_MODULE_0__.CANVAS_WIDTH;
    canvas.height = _const_const__WEBPACK_IMPORTED_MODULE_0__.CANVAS_HEIGHT;
    // canvas2 = HUD
    var canvas2 = document.getElementById("canvas2");
    var ctx2 = canvas2.getContext("2d");
    canvas2.width = _const_const__WEBPACK_IMPORTED_MODULE_0__.CANVAS2_WIDTH;
    canvas2.height = _const_const__WEBPACK_IMPORTED_MODULE_0__.CANVAS2_HEIGHT;
    var game = new _model_Game__WEBPACK_IMPORTED_MODULE_1__.Game(ctx, ctx2);
    game.animate(0);
});

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUMwRjs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNoQjdCO0FBQzdCO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLHNEQUFZO0FBQ2pDLHNCQUFzQix1REFBYTtBQUNuQztBQUNBO0FBQ0E7QUFDQSx5QkFBeUIseUNBQUs7QUFDOUI7QUFDQTtBQUNBLHlCQUF5Qix5Q0FBSztBQUM5QjtBQUNBO0FBQ0EseUJBQXlCLHlDQUFLO0FBQzlCO0FBQ0E7QUFDQSx5QkFBeUIseUNBQUs7QUFDOUI7QUFDQTtBQUNBLHlCQUF5Qix5Q0FBSztBQUM5QjtBQUNBO0FBQ0EsOEJBQThCLHlDQUFLO0FBQ25DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLENBQUM7QUFDcUI7Ozs7Ozs7Ozs7Ozs7OztBQ3pDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUI7QUFDekIsMEJBQTBCO0FBQzFCO0FBQ0EsNEJBQTRCO0FBQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhCQUE4QjtBQUM5Qiw4QkFBOEI7QUFDOUIsZ0NBQWdDO0FBQ2hDLGlDQUFpQztBQUNqQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ2dCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3ZKd0Y7QUFDL0Q7QUFDVjtBQUNjO0FBQ1o7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCLHVEQUFhO0FBQ25DLHFCQUFxQixzREFBWTtBQUNqQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUF5Qix1REFBWTtBQUNyQyw4QkFBOEIsbURBQVU7QUFDeEMsMEJBQTBCLDJDQUFNO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0NBQWtDLHlDQUFLO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9FQUFvRSxrQ0FBa0M7QUFDdEcsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQ0FBMEMsdURBQWEsRUFBRSx3REFBYztBQUN2RTtBQUNBO0FBQ0E7QUFDQSw0Q0FBNEMsb0RBQVU7QUFDdEQsNEJBQTRCLHdEQUFjO0FBQzFDLDRCQUE0QiwwQ0FBMEM7QUFDdEU7QUFDQSxpQ0FBaUMsdURBQWE7QUFDOUM7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2REFBNkQsb0RBQVU7QUFDdkU7QUFDQTtBQUNBO0FBQ0EsNkRBQTZELG9EQUFVO0FBQ3ZFO0FBQ0E7QUFDQTtBQUNBLDZEQUE2RCxvREFBVTtBQUN2RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixpQkFBaUI7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ2U7Ozs7Ozs7Ozs7Ozs7OztBQ3RLaEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsQ0FBQztBQUN1Qjs7Ozs7Ozs7Ozs7Ozs7O0FDdkJ4QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNnQjs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNwQ3VCO0FBQytCO0FBQ3ZFO0FBQ0E7QUFDQTtBQUNBLDJCQUEyQjtBQUMzQjtBQUNBO0FBQ0E7QUFDQSx5QkFBeUI7QUFDekIsMEJBQTBCO0FBQzFCO0FBQ0E7QUFDQSw0QkFBNEI7QUFDNUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtCQUErQjtBQUMvQixnQ0FBZ0M7QUFDaEMsOEJBQThCO0FBQzlCLDhCQUE4QjtBQUM5QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0IsMENBQUs7QUFDckIsZ0JBQWdCLDRDQUFPO0FBQ3ZCLGdCQUFnQiw0Q0FBTztBQUN2QixnQkFBZ0IsNENBQU87QUFDdkIsZ0JBQWdCLDhDQUFTO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0RBQXdELGdEQUFNO0FBQzlEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZEQUE2RCxnREFBTTtBQUNuRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNpQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDaE9sQixpQkFBaUIsU0FBSSxJQUFJLFNBQUk7QUFDN0I7QUFDQTtBQUNBLGVBQWUsZ0JBQWdCLHNDQUFzQyxrQkFBa0I7QUFDdkYsOEJBQThCO0FBQzlCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QjtBQUN4QjtBQUNBO0FBQ0EsQ0FBQztBQUN1QztBQUN4QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNDQUFzQyxnREFBTTtBQUM1QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0NBQXNDLGdEQUFNO0FBQzVDO0FBQ0E7QUFDQTtBQUNBLHNDQUFzQyxnREFBTTtBQUM1QztBQUNBO0FBQ0E7QUFDQTtBQUNBLHNDQUFzQyxnREFBTTtBQUM1QztBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNDQUFzQyxnREFBTTtBQUM1QztBQUNBLHNDQUFzQyxnREFBTTtBQUM1QztBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQ0FBc0MsZ0RBQU07QUFDNUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQ0FBc0MsZ0RBQU07QUFDNUM7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0NBQXNDLGdEQUFNO0FBQzVDO0FBQ0E7QUFDQSwwQ0FBMEMsZ0RBQU07QUFDaEQ7QUFDQSwwQ0FBMEMsZ0RBQU07QUFDaEQ7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUM2RDs7Ozs7OztVQ2pMOUQ7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQzJGO0FBQ3ZEO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLHNEQUFZO0FBQy9CLG9CQUFvQix1REFBYTtBQUNqQztBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsdURBQWE7QUFDakMscUJBQXFCLHdEQUFjO0FBQ25DLG1CQUFtQiw2Q0FBSTtBQUN2QjtBQUNBLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9Hb2JsaW5fU2lkZXNjcm9sbGVyLy4vY29uc3QvY29uc3QudHMiLCJ3ZWJwYWNrOi8vR29ibGluX1NpZGVzY3JvbGxlci8uL21vZGVsL0JhY2tncm91bmQudHMiLCJ3ZWJwYWNrOi8vR29ibGluX1NpZGVzY3JvbGxlci8uL21vZGVsL0VuZW15LnRzIiwid2VicGFjazovL0dvYmxpbl9TaWRlc2Nyb2xsZXIvLi9tb2RlbC9HYW1lLnRzIiwid2VicGFjazovL0dvYmxpbl9TaWRlc2Nyb2xsZXIvLi9tb2RlbC9JbnB1dEhhbmRsZXIudHMiLCJ3ZWJwYWNrOi8vR29ibGluX1NpZGVzY3JvbGxlci8uL21vZGVsL0xheWVyLnRzIiwid2VicGFjazovL0dvYmxpbl9TaWRlc2Nyb2xsZXIvLi9tb2RlbC9QbGF5ZXIudHMiLCJ3ZWJwYWNrOi8vR29ibGluX1NpZGVzY3JvbGxlci8uL21vZGVsL1N0YXRlcy50cyIsIndlYnBhY2s6Ly9Hb2JsaW5fU2lkZXNjcm9sbGVyL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL0dvYmxpbl9TaWRlc2Nyb2xsZXIvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL0dvYmxpbl9TaWRlc2Nyb2xsZXIvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9Hb2JsaW5fU2lkZXNjcm9sbGVyL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vR29ibGluX1NpZGVzY3JvbGxlci8uL3NjcmlwdC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgQ0FOVkFTX1dJRFRIID0gNzY4O1xudmFyIENBTlZBU19IRUlHSFQgPSA0MzI7XG52YXIgQ0FOVkFTMl9XSURUSCA9IDc2ODtcbnZhciBDQU5WQVMyX0hFSUdIVCA9IDEwODtcbnZhciBTVEFURVMgPSB7XG4gICAgU1RJTEw6IDAsXG4gICAgUlVOTklORzogMSxcbiAgICBKVU1QSU5HOiAyLFxuICAgIEZBTExJTkc6IDMsXG4gICAgQVRUQUNLSU5HOiA0LFxufTtcbnZhciBJTUdfSEVBUlRTID0ge1xuICAgIEZVTEw6IDAsXG4gICAgSEFMRjogMSxcbiAgICBFTVBUWTogMixcbn07XG5leHBvcnQgeyBDQU5WQVNfV0lEVEgsIENBTlZBU19IRUlHSFQsIENBTlZBUzJfV0lEVEgsIENBTlZBUzJfSEVJR0hULCBTVEFURVMsIElNR19IRUFSVFMgfTtcbiIsImltcG9ydCB7IENBTlZBU19XSURUSCwgQ0FOVkFTX0hFSUdIVCB9IGZyb20gXCIuLi9jb25zdC9jb25zdFwiO1xuaW1wb3J0IHsgTGF5ZXIgfSBmcm9tIFwiLi9MYXllclwiO1xudmFyIEJhY2tncm91bmQgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gQmFja2dyb3VuZCgpIHtcbiAgICAgICAgdGhpcy54ID0gMDtcbiAgICAgICAgdGhpcy55ID0gMDtcbiAgICAgICAgdGhpcy53aWR0aCA9IENBTlZBU19XSURUSDtcbiAgICAgICAgdGhpcy5oZWlnaHQgPSBDQU5WQVNfSEVJR0hUO1xuICAgICAgICB0aGlzLnNwZWVkWCA9IDA7XG4gICAgICAgIHRoaXMuaW1hZ2VMYXllcjEgPSBuZXcgSW1hZ2UoNjAsIDQwKTtcbiAgICAgICAgdGhpcy5pbWFnZUxheWVyMS5zcmMgPSBcImFzc2V0cy9pbWcvYmFja2dyb3VuZC9wbHgtMS5wbmdcIjtcbiAgICAgICAgdmFyIGxheWVyMSA9IG5ldyBMYXllcih0aGlzLCB0aGlzLmltYWdlTGF5ZXIxLCAwLjApO1xuICAgICAgICB0aGlzLmltYWdlTGF5ZXIyID0gbmV3IEltYWdlKDYwLCA0MCk7XG4gICAgICAgIHRoaXMuaW1hZ2VMYXllcjIuc3JjID0gXCJhc3NldHMvaW1nL2JhY2tncm91bmQvcGx4LTIucG5nXCI7XG4gICAgICAgIHZhciBsYXllcjIgPSBuZXcgTGF5ZXIodGhpcywgdGhpcy5pbWFnZUxheWVyMiwgMC40KTtcbiAgICAgICAgdGhpcy5pbWFnZUxheWVyMyA9IG5ldyBJbWFnZSg2MCwgNDApO1xuICAgICAgICB0aGlzLmltYWdlTGF5ZXIzLnNyYyA9IFwiYXNzZXRzL2ltZy9iYWNrZ3JvdW5kL3BseC0zLnBuZ1wiO1xuICAgICAgICB2YXIgbGF5ZXIzID0gbmV3IExheWVyKHRoaXMsIHRoaXMuaW1hZ2VMYXllcjMsIDAuNik7XG4gICAgICAgIHRoaXMuaW1hZ2VMYXllcjQgPSBuZXcgSW1hZ2UoNjAsIDQwKTtcbiAgICAgICAgdGhpcy5pbWFnZUxheWVyNC5zcmMgPSBcImFzc2V0cy9pbWcvYmFja2dyb3VuZC9wbHgtNC5wbmdcIjtcbiAgICAgICAgdmFyIGxheWVyNCA9IG5ldyBMYXllcih0aGlzLCB0aGlzLmltYWdlTGF5ZXI0LCAwLjgpO1xuICAgICAgICB0aGlzLmltYWdlTGF5ZXI1ID0gbmV3IEltYWdlKDYwLCA0MCk7XG4gICAgICAgIHRoaXMuaW1hZ2VMYXllcjUuc3JjID0gXCJhc3NldHMvaW1nL2JhY2tncm91bmQvcGx4LTUucG5nXCI7XG4gICAgICAgIHZhciBsYXllcjUgPSBuZXcgTGF5ZXIodGhpcywgdGhpcy5pbWFnZUxheWVyNSwgMS4wKTtcbiAgICAgICAgdGhpcy5pbWFnZUdyb3VuZCA9IG5ldyBJbWFnZSg2MCwgNDApO1xuICAgICAgICB0aGlzLmltYWdlR3JvdW5kLnNyYyA9IFwiYXNzZXRzL2ltZy9iYWNrZ3JvdW5kL2dyb3VuZC5wbmdcIjtcbiAgICAgICAgdmFyIGxheWVyR3JvdW5kID0gbmV3IExheWVyKHRoaXMsIHRoaXMuaW1hZ2VHcm91bmQsIDEuMSk7XG4gICAgICAgIHRoaXMubGF5ZXJzID0gW2xheWVyMSwgbGF5ZXIyLCBsYXllcjMsIGxheWVyNCwgbGF5ZXI1LCBsYXllckdyb3VuZF07XG4gICAgfVxuICAgIEJhY2tncm91bmQucHJvdG90eXBlLmRyYXcgPSBmdW5jdGlvbiAoY29udGV4dCkge1xuICAgICAgICB0aGlzLmxheWVycy5mb3JFYWNoKGZ1bmN0aW9uIChsYXllcikge1xuICAgICAgICAgICAgbGF5ZXIuZHJhdyhjb250ZXh0KTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBCYWNrZ3JvdW5kLnByb3RvdHlwZS51cGRhdGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMubGF5ZXJzLmZvckVhY2goZnVuY3Rpb24gKGxheWVyKSB7XG4gICAgICAgICAgICBsYXllci51cGRhdGUoKTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICByZXR1cm4gQmFja2dyb3VuZDtcbn0oKSk7XG5leHBvcnQgeyBCYWNrZ3JvdW5kIH07XG4iLCJ2YXIgRW5lbXkgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gRW5lbXkoZ2FtZSkge1xuICAgICAgICB0aGlzLmdhbWUgPSBnYW1lO1xuICAgICAgICB0aGlzLmltYWdlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJpbWdCb2FyXCIpO1xuICAgICAgICB0aGlzLndpZHRoID0gNjA7IC8vIGRpc3BsYXllZCB3aWR0aFxuICAgICAgICB0aGlzLmhlaWdodCA9IDYwOyAvLyBkaXNwbGF5ZWQgaGVpZ2h0XG4gICAgICAgIHRoaXMueCA9IHRoaXMuZ2FtZS53aWR0aDtcbiAgICAgICAgdGhpcy55T2Zmc2V0ID0gLTE3OyAvLyBhY2NvdW50IGZvciBjaGFyYWN0ZXIgb2Zmc2V0IG9uIHNwcml0ZVxuICAgICAgICB0aGlzLnkgPSB0aGlzLmdhbWUuaGVpZ2h0IC0gdGhpcy5oZWlnaHQgKyB0aGlzLnlPZmZzZXQ7XG4gICAgICAgIHRoaXMuc3BlZWRYID0gMjtcbiAgICAgICAgdGhpcy53ZWlnaHQgPSAwLjI7XG4gICAgICAgIHRoaXMuaHVydCA9IGZhbHNlO1xuICAgICAgICB0aGlzLmh1cnRUaW1lciA9IDA7XG4gICAgICAgIHRoaXMuZGVhdGhUaW1lciA9IDg1MDtcbiAgICAgICAgdGhpcy5tYXhGcmFtZUNvbCA9IDQ7IC8vIG51bWJlciBvZiBjb2x1bW5zIG9uIHNwcml0ZXNoZWV0XG4gICAgICAgIHRoaXMubWF4RnJhbWVSb3cgPSAyOyAvLyBudW1iZXIgb3Igcm93cyBvbiBzcHJpdGVzaGVldFxuICAgICAgICB0aGlzLnNvdXJjZVdpZHRoID0gMTI0OyAvLyB3aWR0aCBvZiBlYWNoIHNwcml0ZSBvbiBzcHJpdGVzaGVldFxuICAgICAgICB0aGlzLnNvdXJjZUhlaWdodCA9IDEyNDsgLy8gaGVpZ2h0IG9mIGVhY2ggc3ByaXRlIG9uIHNwcml0ZXNoZWV0XG4gICAgICAgIHRoaXMuZnJhbWUgPSAwO1xuICAgICAgICB0aGlzLmZyYW1lQ29sID0gdGhpcy5mcmFtZSAlIHRoaXMubWF4RnJhbWVDb2w7XG4gICAgICAgIHRoaXMuZnJhbWVSb3cgPSBNYXRoLmZsb29yKHRoaXMuZnJhbWUgLyB0aGlzLm1heEZyYW1lQ29sKTtcbiAgICAgICAgdGhpcy5mcHMgPSAxNTtcbiAgICAgICAgdGhpcy5mcmFtZVRpbWVyID0gMDtcbiAgICAgICAgdGhpcy5oaXRib3hSYWRpdXMgPSB0aGlzLndpZHRoIC8gMi4zNTtcbiAgICAgICAgdGhpcy5oaXRib3hYT2Zmc2V0ID0gMjtcbiAgICAgICAgdGhpcy5oaXRib3hZT2Zmc2V0ID0gMjtcbiAgICAgICAgdGhpcy5tYXJrZWRGb3JEZWxldGlvbiA9IGZhbHNlO1xuICAgICAgICB0aGlzLmFuaW1hdGlvbiA9IFwicnVubmluZ1wiO1xuICAgICAgICB0aGlzLmZhY2luZyA9IFwiTFwiO1xuICAgICAgICB0aGlzLmltYWdlcyA9IHtcbiAgICAgICAgICAgIHN0aWxsOiB7XG4gICAgICAgICAgICAgICAgTDogbnVsbCxcbiAgICAgICAgICAgICAgICBSOiBudWxsLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHJ1bm5pbmc6IHtcbiAgICAgICAgICAgICAgICBMOiBudWxsLFxuICAgICAgICAgICAgICAgIFI6IG51bGwsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdHVybmluZzoge1xuICAgICAgICAgICAgICAgIEw6IG51bGwsXG4gICAgICAgICAgICAgICAgUjogbnVsbCxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBhdHRhY2tpbmc6IHtcbiAgICAgICAgICAgICAgICBMOiBudWxsLFxuICAgICAgICAgICAgICAgIFI6IG51bGwsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgaHVydDoge1xuICAgICAgICAgICAgICAgIEw6IG51bGwsXG4gICAgICAgICAgICAgICAgUjogbnVsbCxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBkeWluZzoge1xuICAgICAgICAgICAgICAgIEw6IG51bGwsXG4gICAgICAgICAgICAgICAgUjogbnVsbCxcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuaW1hZ2VzLnN0aWxsLkwgPSBuZXcgSW1hZ2UoNjAsIDQ1KTtcbiAgICAgICAgdGhpcy5pbWFnZXMuc3RpbGwuTC5zcmMgPVxuICAgICAgICAgICAgXCJhc3NldHMvaW1nL2NoYXJhY3RlcnMvYm9hci9ib2FyX3N0aWxsX0xfc3ByaXRlc2hlZXQucG5nXCI7XG4gICAgICAgIHRoaXMuaW1hZ2VzLnN0aWxsLlIgPSBuZXcgSW1hZ2UoNjAsIDQ1KTtcbiAgICAgICAgdGhpcy5pbWFnZXMuc3RpbGwuUi5zcmMgPVxuICAgICAgICAgICAgXCJhc3NldHMvaW1nL2NoYXJhY3RlcnMvYm9hci9ib2FyX3N0aWxsX1Jfc3ByaXRlc2hlZXQucG5nXCI7XG4gICAgICAgIHRoaXMuaW1hZ2VzLnJ1bm5pbmcuTCA9IG5ldyBJbWFnZSg2MCwgNDUpO1xuICAgICAgICB0aGlzLmltYWdlcy5ydW5uaW5nLkwuc3JjID1cbiAgICAgICAgICAgIFwiYXNzZXRzL2ltZy9jaGFyYWN0ZXJzL2JvYXIvYm9hcl9ydW5uaW5nX0xfc3ByaXRlc2hlZXQucG5nXCI7XG4gICAgICAgIHRoaXMuaW1hZ2VzLnJ1bm5pbmcuUiA9IG5ldyBJbWFnZSg2MCwgNDUpO1xuICAgICAgICB0aGlzLmltYWdlcy5ydW5uaW5nLlIuc3JjID1cbiAgICAgICAgICAgIFwiYXNzZXRzL2ltZy9jaGFyYWN0ZXJzL2JvYXIvYm9hcl9ydW5uaW5nX1Jfc3ByaXRlc2hlZXQucG5nXCI7XG4gICAgICAgIHRoaXMuaW1hZ2VzLnR1cm5pbmcuTCA9IG5ldyBJbWFnZSg2MCwgNDUpO1xuICAgICAgICB0aGlzLmltYWdlcy50dXJuaW5nLkwuc3JjID1cbiAgICAgICAgICAgIFwiYXNzZXRzL2ltZy9jaGFyYWN0ZXJzL2JvYXIvYm9hcl90dXJuaW5nX0xfc3ByaXRlc2hlZXQucG5nXCI7XG4gICAgICAgIHRoaXMuaW1hZ2VzLnR1cm5pbmcuUiA9IG5ldyBJbWFnZSg2MCwgNDUpO1xuICAgICAgICB0aGlzLmltYWdlcy50dXJuaW5nLlIuc3JjID1cbiAgICAgICAgICAgIFwiYXNzZXRzL2ltZy9jaGFyYWN0ZXJzL2JvYXIvYm9hcl90dXJuaW5nX1Jfc3ByaXRlc2hlZXQucG5nXCI7XG4gICAgICAgIHRoaXMuaW1hZ2VzLmF0dGFja2luZy5MID0gbmV3IEltYWdlKDYwLCA0NSk7XG4gICAgICAgIHRoaXMuaW1hZ2VzLmF0dGFja2luZy5MLnNyYyA9XG4gICAgICAgICAgICBcImFzc2V0cy9pbWcvY2hhcmFjdGVycy9ib2FyL2JvYXJfYXR0YWNraW5nX0xfc3ByaXRlc2hlZXQucG5nXCI7XG4gICAgICAgIHRoaXMuaW1hZ2VzLmF0dGFja2luZy5SID0gbmV3IEltYWdlKDYwLCA0NSk7XG4gICAgICAgIHRoaXMuaW1hZ2VzLmF0dGFja2luZy5SLnNyYyA9XG4gICAgICAgICAgICBcImFzc2V0cy9pbWcvY2hhcmFjdGVycy9ib2FyL2JvYXJfYXR0YWNraW5nX1Jfc3ByaXRlc2hlZXQucG5nXCI7XG4gICAgICAgIHRoaXMuaW1hZ2VzLmh1cnQuTCA9IG5ldyBJbWFnZSg2MCwgNDUpO1xuICAgICAgICB0aGlzLmltYWdlcy5odXJ0Lkwuc3JjID1cbiAgICAgICAgICAgIFwiYXNzZXRzL2ltZy9jaGFyYWN0ZXJzL2JvYXIvYm9hcl9odXJ0X0xfc3ByaXRlc2hlZXQucG5nXCI7XG4gICAgICAgIHRoaXMuaW1hZ2VzLmh1cnQuUiA9IG5ldyBJbWFnZSg2MCwgNDUpO1xuICAgICAgICB0aGlzLmltYWdlcy5odXJ0LlIuc3JjID1cbiAgICAgICAgICAgIFwiYXNzZXRzL2ltZy9jaGFyYWN0ZXJzL2JvYXIvYm9hcl9odXJ0X1Jfc3ByaXRlc2hlZXQucG5nXCI7XG4gICAgICAgIHRoaXMuaW1hZ2VzLmR5aW5nLkwgPSBuZXcgSW1hZ2UoNjAsIDQ1KTtcbiAgICAgICAgdGhpcy5pbWFnZXMuZHlpbmcuTC5zcmMgPVxuICAgICAgICAgICAgXCJhc3NldHMvaW1nL2NoYXJhY3RlcnMvYm9hci9ib2FyX2R5aW5nX0xfc3ByaXRlc2hlZXQucG5nXCI7XG4gICAgICAgIHRoaXMuaW1hZ2VzLmR5aW5nLlIgPSBuZXcgSW1hZ2UoNjAsIDQ1KTtcbiAgICAgICAgdGhpcy5pbWFnZXMuZHlpbmcuUi5zcmMgPVxuICAgICAgICAgICAgXCJhc3NldHMvaW1nL2NoYXJhY3RlcnMvYm9hci9ib2FyX2R5aW5nX1Jfc3ByaXRlc2hlZXQucG5nXCI7XG4gICAgfVxuICAgIEVuZW15LnByb3RvdHlwZS5kcmF3ID0gZnVuY3Rpb24gKGNvbnRleHQpIHtcbiAgICAgICAgaWYgKHRoaXMuZ2FtZS5kZWJ1Zykge1xuICAgICAgICAgICAgY29udGV4dC5iZWdpblBhdGgoKTtcbiAgICAgICAgICAgIGNvbnRleHQuYXJjKHRoaXMueCArIHRoaXMud2lkdGggLyB0aGlzLmhpdGJveFhPZmZzZXQsIHRoaXMueSArIHRoaXMuaGVpZ2h0IC8gdGhpcy5oaXRib3hZT2Zmc2V0LCB0aGlzLmhpdGJveFJhZGl1cywgMCwgTWF0aC5QSSAqIDIpO1xuICAgICAgICAgICAgY29udGV4dC5zdHJva2UoKTtcbiAgICAgICAgfVxuICAgICAgICBjb250ZXh0LmRyYXdJbWFnZSh0aGlzLmltYWdlc1t0aGlzLmFuaW1hdGlvbl1bdGhpcy5mYWNpbmddLCB0aGlzLmZyYW1lQ29sICogdGhpcy5zb3VyY2VXaWR0aCwgLy9zeFxuICAgICAgICB0aGlzLmZyYW1lUm93ICogdGhpcy5zb3VyY2VIZWlnaHQsIC8vc3lcbiAgICAgICAgdGhpcy5zb3VyY2VXaWR0aCwgLy9zd1xuICAgICAgICB0aGlzLnNvdXJjZUhlaWdodCwgLy9zaFxuICAgICAgICB0aGlzLngsIHRoaXMueSwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQpO1xuICAgIH07XG4gICAgRW5lbXkucHJvdG90eXBlLmNoZWNrRm9yQ293YXJkID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAodGhpcy5nYW1lLnBsYXllci54ID09PSB0aGlzLmdhbWUucGxheWVyLmxlZnRMaW1pdCkge1xuICAgICAgICAgICAgdGhpcy5mcHMgPSAyMjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZnBzID0gMTM7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIEVuZW15LnByb3RvdHlwZS5jaGVja0ZvckRlbGV0aW9uID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLmdhbWUucmVkdWNlRW5lbXlJbnRlcnZhbCgpO1xuICAgICAgICBpZiAodGhpcy54IDwgMCAtIHRoaXMud2lkdGgpIHtcbiAgICAgICAgICAgIHRoaXMubWFya2VkRm9yRGVsZXRpb24gPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5nYW1lLnNjb3JlKys7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIEVuZW15LnByb3RvdHlwZS51cGRhdGUgPSBmdW5jdGlvbiAoZGVsdGFUaW1lKSB7XG4gICAgICAgIC8vIGFuaW1hdGlvblxuICAgICAgICAvLyB1cGRhdGUgZW5lbXkgZnJhbWUgb25seSB3aGVuIGFib3ZlIGZwcyBpbnRlcnZhbFxuICAgICAgICBpZiAodGhpcy5mcmFtZVRpbWVyID4gMTAwMCAvIHRoaXMuZnBzKSB7XG4gICAgICAgICAgICAvLyBpZiByZWFjaGVkIGVuZCBvZiBzcHJpdGVzaGVldCwgcmVwb3NpdGlvbnMgdG8gc3RhcnQgb2Ygc3ByaXRlc2hlZXRcbiAgICAgICAgICAgIGlmICh0aGlzLmZyYW1lID09PSB0aGlzLm1heEZyYW1lUm93ICogdGhpcy5tYXhGcmFtZUNvbCAtIDEpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmZyYW1lID0gMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuZnJhbWUrKztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuZnJhbWVUaW1lciA9IDA7XG4gICAgICAgICAgICAvLyBjeWNsZSB0aHJvdWdoIHNwcml0ZXNoZWV0IHJvd3MvY29sdW1uc1xuICAgICAgICAgICAgdGhpcy5mcmFtZUNvbCA9IHRoaXMuZnJhbWUgJSB0aGlzLm1heEZyYW1lQ29sO1xuICAgICAgICAgICAgdGhpcy5mcmFtZVJvdyA9IE1hdGguZmxvb3IodGhpcy5mcmFtZSAvIHRoaXMubWF4RnJhbWVDb2wpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5mcmFtZVRpbWVyICs9IGRlbHRhVGltZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5odXJ0KSB7XG4gICAgICAgICAgICB0aGlzLmh1cnRUaW1lciArPSB0aGlzLmdhbWUuZGVsdGFUaW1lO1xuICAgICAgICAgICAgaWYgKHRoaXMuaHVydFRpbWVyID49IHRoaXMuZGVhdGhUaW1lcikge1xuICAgICAgICAgICAgICAgIHRoaXMubWFya2VkRm9yRGVsZXRpb24gPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vIGhvcml6b250YWwgbW92ZW1lbnRcbiAgICAgICAgdGhpcy54IC09IHRoaXMuc3BlZWRYICogdGhpcy5nYW1lLnNwZWVkO1xuICAgICAgICB0aGlzLmNoZWNrRm9yRGVsZXRpb24oKTtcbiAgICAgICAgdGhpcy5jaGVja0ZvckNvd2FyZCgpO1xuICAgIH07XG4gICAgcmV0dXJuIEVuZW15O1xufSgpKTtcbmV4cG9ydCB7IEVuZW15IH07XG4iLCJpbXBvcnQgeyBDQU5WQVMyX0hFSUdIVCwgQ0FOVkFTMl9XSURUSCwgQ0FOVkFTX0hFSUdIVCwgQ0FOVkFTX1dJRFRILCBJTUdfSEVBUlRTLCB9IGZyb20gXCIuLi9jb25zdC9jb25zdFwiO1xuaW1wb3J0IHsgQmFja2dyb3VuZCB9IGZyb20gXCIuL0JhY2tncm91bmRcIjtcbmltcG9ydCB7IEVuZW15IH0gZnJvbSBcIi4vRW5lbXlcIjtcbmltcG9ydCB7IElucHV0SGFuZGxlciB9IGZyb20gXCIuL0lucHV0SGFuZGxlclwiO1xuaW1wb3J0IHsgUGxheWVyIH0gZnJvbSBcIi4vUGxheWVyXCI7XG4vLyBpbXBvcnQgXCIuLi9zY3JpcHRzL3JlcXVpcmUuanNcIjtcbnZhciBHYW1lID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIEdhbWUoY29udGV4dCwgY29udGV4dDIpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdGhpcy5hbmltYXRlID0gZnVuY3Rpb24gKHRpbWVTdGFtcCkge1xuICAgICAgICAgICAgX3RoaXMuZGVsdGFUaW1lID0gdGltZVN0YW1wIC0gX3RoaXMubGFzdFRpbWU7XG4gICAgICAgICAgICBfdGhpcy5sYXN0VGltZSA9IHRpbWVTdGFtcDtcbiAgICAgICAgICAgIF90aGlzLmxhc3RGcmFtZSArPSBfdGhpcy5kZWx0YVRpbWU7XG4gICAgICAgICAgICBpZiAoX3RoaXMubGFzdEZyYW1lID4gMTAwMCAvIF90aGlzLmZyYW1lcmF0ZSkge1xuICAgICAgICAgICAgICAgIF90aGlzLmNvbnRleHQuY2xlYXJSZWN0KDAsIDAsIF90aGlzLndpZHRoLCBfdGhpcy5oZWlnaHQpO1xuICAgICAgICAgICAgICAgIF90aGlzLmJhY2tncm91bmQuZHJhdyhfdGhpcy5jb250ZXh0KTtcbiAgICAgICAgICAgICAgICBfdGhpcy5iYWNrZ3JvdW5kLnVwZGF0ZSgpO1xuICAgICAgICAgICAgICAgIF90aGlzLmhhbmRsZUVuZW1pZXMoX3RoaXMuZGVsdGFUaW1lKTtcbiAgICAgICAgICAgICAgICBfdGhpcy5wbGF5ZXIuZHJhdyhfdGhpcy5jb250ZXh0KTtcbiAgICAgICAgICAgICAgICBfdGhpcy5wbGF5ZXIudXBkYXRlKF90aGlzLmlucHV0LCBfdGhpcy5kZWx0YVRpbWUpO1xuICAgICAgICAgICAgICAgIF90aGlzLmRpc3BsYXlTdGF0dXNUZXh0KCk7XG4gICAgICAgICAgICAgICAgX3RoaXMubGFzdEZyYW1lID0gMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF90aGlzLmRpc3BsYXlIZWFydHMoKTtcbiAgICAgICAgICAgIGlmIChfdGhpcy5nYW1lT3Zlcikge1xuICAgICAgICAgICAgICAgIF90aGlzLmhhbmRsZVZpY3RvcnkoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoX3RoaXMuYW5pbWF0ZSk7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuY29udGV4dCA9IGNvbnRleHQ7XG4gICAgICAgIHRoaXMuY29udGV4dDIgPSBjb250ZXh0MjtcbiAgICAgICAgdGhpcy5oZWlnaHQgPSBDQU5WQVNfSEVJR0hUO1xuICAgICAgICB0aGlzLndpZHRoID0gQ0FOVkFTX1dJRFRIO1xuICAgICAgICB0aGlzLmxhc3RUaW1lID0gMDtcbiAgICAgICAgdGhpcy5kZWx0YVRpbWUgPSAwO1xuICAgICAgICB0aGlzLmVuZW15SW50ZXJ2YWxSZWR1Y3Rpb24gPSAwO1xuICAgICAgICB0aGlzLmVuZW15SW50ZXJ2YWwgPSAxMDAwO1xuICAgICAgICB0aGlzLnJhbmRvbUVuZW15SW50ZXJ2YWwgPSBNYXRoLnJhbmRvbSgpICogMTAwMCArIDUwMDtcbiAgICAgICAgdGhpcy5lbmVteVRpbWVyID0gMDtcbiAgICAgICAgdGhpcy5lbmVtaWVzID0gW107XG4gICAgICAgIHRoaXMuZGVidWcgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5zY29yZSA9IDA7XG4gICAgICAgIHRoaXMuc3BlZWQgPSAxO1xuICAgICAgICB0aGlzLmdhbWVPdmVyID0gZmFsc2U7XG4gICAgICAgIHRoaXMudmljdG9yeSA9IGZhbHNlO1xuICAgICAgICB0aGlzLnNwYW5TY29yZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic3BhblNjb3JlXCIpO1xuICAgICAgICB0aGlzLmlucHV0ID0gbmV3IElucHV0SGFuZGxlcih0aGlzKTtcbiAgICAgICAgdGhpcy5iYWNrZ3JvdW5kID0gbmV3IEJhY2tncm91bmQoKTtcbiAgICAgICAgdGhpcy5wbGF5ZXIgPSBuZXcgUGxheWVyKHRoaXMpO1xuICAgICAgICB0aGlzLmhlYXJ0SW1hZ2VzID0gdGhpcy5wcmVwYXJlSFVESW1hZ2VzKFwiaGVhcnRcIik7XG4gICAgICAgIHRoaXMuZnJhbWVyYXRlID0gMjAwO1xuICAgICAgICB0aGlzLmxhc3RGcmFtZSA9IDA7XG4gICAgICAgIHRoaXMucGxheWVyTGFzdEhlYWx0aCA9IHRoaXMucGxheWVyLnN0YXJ0aW5nSGVhbHRocG9pbnRzO1xuICAgICAgICB0aGlzLmxhc3RTY29yZSA9IDA7XG4gICAgfVxuICAgIEdhbWUucHJvdG90eXBlLnByZXBhcmVIVURJbWFnZXMgPSBmdW5jdGlvbiAoa2V5d29yZCkge1xuICAgICAgICBpZiAoa2V5d29yZCA9PT0gXCJoZWFydFwiKSB7XG4gICAgICAgICAgICB2YXIgaW1hZ2VzSFVEID0gW25ldyBJbWFnZSgpLCBuZXcgSW1hZ2UoKSwgbmV3IEltYWdlKCldO1xuICAgICAgICAgICAgaW1hZ2VzSFVEWzBdLnNyYyA9IFwiYXNzZXRzL2ltZy9kaXNwbGF5L2hlYXJ0X2Z1bGwucG5nXCI7XG4gICAgICAgICAgICBpbWFnZXNIVURbMF0ud2lkdGggPSA1MDtcbiAgICAgICAgICAgIGltYWdlc0hVRFsxXS5zcmMgPSBcImFzc2V0cy9pbWcvZGlzcGxheS9oZWFydF9oYWxmLnBuZ1wiO1xuICAgICAgICAgICAgaW1hZ2VzSFVEWzFdLndpZHRoID0gNTA7XG4gICAgICAgICAgICBpbWFnZXNIVURbMl0uc3JjID0gXCJhc3NldHMvaW1nL2Rpc3BsYXkvaGVhcnRfZW1wdHkucG5nXCI7XG4gICAgICAgICAgICBpbWFnZXNIVURbMl0ud2lkdGggPSA1MDtcbiAgICAgICAgICAgIHJldHVybiBpbWFnZXNIVUQ7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIEdhbWUucHJvdG90eXBlLmhhbmRsZUVuZW1pZXMgPSBmdW5jdGlvbiAoZGVsdGFUaW1lKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIC8vIGVuZW15SW50ZXJ2YWwgMTAlIHJlZHVjdGlvbiBldmVyeSAyMCBzY29yZSBwb2ludHNcbiAgICAgICAgaWYgKHRoaXMuZW5lbXlUaW1lciA+IHRoaXMuZW5lbXlJbnRlcnZhbCArIHRoaXMucmFuZG9tRW5lbXlJbnRlcnZhbCkge1xuICAgICAgICAgICAgdGhpcy5lbmVtaWVzLnB1c2gobmV3IEVuZW15KHRoaXMpKTtcbiAgICAgICAgICAgIHRoaXMucmFuZG9tRW5lbXlJbnRlcnZhbCA9IE1hdGgucmFuZG9tKCkgKiAxMDAwO1xuICAgICAgICAgICAgdGhpcy5lbmVteVRpbWVyID0gMDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZW5lbXlUaW1lciArPSBkZWx0YVRpbWU7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5lbmVtaWVzLmZvckVhY2goZnVuY3Rpb24gKGVuZW15KSB7XG4gICAgICAgICAgICBlbmVteS5kcmF3KF90aGlzLmNvbnRleHQpO1xuICAgICAgICAgICAgZW5lbXkudXBkYXRlKGRlbHRhVGltZSk7XG4gICAgICAgICAgICBfdGhpcy5lbmVtaWVzID0gX3RoaXMuZW5lbWllcy5maWx0ZXIoZnVuY3Rpb24gKGVuZW15KSB7IHJldHVybiAhZW5lbXkubWFya2VkRm9yRGVsZXRpb247IH0pO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIEdhbWUucHJvdG90eXBlLmhhbmRsZVZpY3RvcnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBzcGFuVmljdG9yeSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic3BhblZpY3RvcnlcIik7XG4gICAgICAgIHZhciBzcGFuVmljdG9yeTIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNwYW5WaWN0b3J5XCIpO1xuICAgICAgICB2YXIgcFZpY3RvcnkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInBWaWN0b3J5XCIpO1xuICAgICAgICB2YXIgcFZpY3RvcnkyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwVmljdG9yeTJcIik7XG4gICAgICAgIHZhciBtZXNzYWdlID0gXCJCcmF2byAhXCI7XG4gICAgICAgIGlmICh0aGlzLnNjb3JlID49IDIwKSB7XG4gICAgICAgICAgICBkb2N1bWVudC5ib2R5LnN0eWxlLmNvbG9yID0gXCJncmVlblwiO1xuICAgICAgICAgICAgcFZpY3Rvcnkuc3R5bGUudG9wID0gXCItMjUlXCI7XG4gICAgICAgICAgICBwVmljdG9yeS5zdHlsZS5mb250U2l6ZSA9IFwiODBweFwiO1xuICAgICAgICAgICAgc3BhblZpY3RvcnkuaW5uZXJIVE1MID0gbWVzc2FnZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZ3JheXNjYWxlQ2FudmFzKCk7XG4gICAgICAgICAgICB2YXIgbWVzc2FnZV8xID0gXCJQZXJkdSAhXCI7XG4gICAgICAgICAgICBkb2N1bWVudC5ib2R5LnN0eWxlLmNvbG9yID0gXCJkYXJrcmVkXCI7XG4gICAgICAgICAgICBwVmljdG9yeS5zdHlsZS50b3AgPSBcIi0yNSVcIjtcbiAgICAgICAgICAgIHBWaWN0b3J5LnN0eWxlLmZvbnRTaXplID0gXCI4MHB4XCI7XG4gICAgICAgICAgICBzcGFuVmljdG9yeS5pbm5lckhUTUwgPSBtZXNzYWdlXzE7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIEdhbWUucHJvdG90eXBlLmRpc3BsYXlIZWFydHMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciB1cGRhdGVIZWFydHMgPSB0aGlzLnBsYXllckxhc3RIZWFsdGggIT09IHRoaXMucGxheWVyLmhlYWx0aHBvaW50cztcbiAgICAgICAgaWYgKHVwZGF0ZUhlYXJ0cyB8fCB0aGlzLnBsYXllci5oZWFsdGhwb2ludHMgPT09IDAgfHwgdGhpcy5sYXN0VGltZSA8IDEwMDApIHtcbiAgICAgICAgICAgIHRoaXMucGxheWVyTGFzdEhlYWx0aCA9IHRoaXMucGxheWVyLmhlYWx0aHBvaW50cztcbiAgICAgICAgICAgIHRoaXMuY29udGV4dDIuY2xlYXJSZWN0KDAsIDAsIENBTlZBUzJfV0lEVEgsIENBTlZBUzJfSEVJR0hUKTtcbiAgICAgICAgICAgIHZhciBmdWxsSGVhcnRzID0gTWF0aC5mbG9vcih0aGlzLnBsYXllci5oZWFsdGhwb2ludHMgLyAyKTtcbiAgICAgICAgICAgIHZhciBoYWxmSGVhcnQgPSB0aGlzLnBsYXllci5oZWFsdGhwb2ludHMgJSAyID09PSAxID8gMSA6IDA7XG4gICAgICAgICAgICB2YXIgZW1wdHlIZWFydHMgPSB0aGlzLnBsYXllci5zdGFydGluZ0hlYWx0aHBvaW50cyAvIDIgLSBmdWxsSGVhcnRzIC0gaGFsZkhlYXJ0O1xuICAgICAgICAgICAgdmFyIGltZ1dpZHRoID0gdGhpcy5oZWFydEltYWdlc1tJTUdfSEVBUlRTLkZVTExdLndpZHRoO1xuICAgICAgICAgICAgdmFyIHBvc2l0aW9uWSA9IENBTlZBUzJfSEVJR0hUIC8gMiAtIGltZ1dpZHRoIC8gMjtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5wbGF5ZXIuc3RhcnRpbmdIZWFsdGhwb2ludHMgLyAyOyBpKyspIHtcbiAgICAgICAgICAgICAgICAvLyBwb3NpdGlvblggPSAoIHNpemVDYW52YXMgLSAoIHNpemVJbWFnZSAqIG51bWJlckltYWdlcyApIC8gMiApICsgKCBpbmRleEltYWdlICogc2l6ZUltYWdlIClcbiAgICAgICAgICAgICAgICB2YXIgcG9zaXRpb25YID0gKENBTlZBUzJfV0lEVEggLSAoaW1nV2lkdGggKiB0aGlzLnBsYXllci5zdGFydGluZ0hlYWx0aHBvaW50cykgLyAyKSAvXG4gICAgICAgICAgICAgICAgICAgIDIgK1xuICAgICAgICAgICAgICAgICAgICBpICogaW1nV2lkdGg7XG4gICAgICAgICAgICAgICAgaWYgKGZ1bGxIZWFydHMgPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGZ1bGxIZWFydHMtLTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb250ZXh0Mi5kcmF3SW1hZ2UodGhpcy5oZWFydEltYWdlc1tJTUdfSEVBUlRTLkZVTExdLCBwb3NpdGlvblgsIHBvc2l0aW9uWSwgNTAsIDUwKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoaGFsZkhlYXJ0ID4gMCkge1xuICAgICAgICAgICAgICAgICAgICBoYWxmSGVhcnQtLTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb250ZXh0Mi5kcmF3SW1hZ2UodGhpcy5oZWFydEltYWdlc1tJTUdfSEVBUlRTLkhBTEZdLCBwb3NpdGlvblgsIHBvc2l0aW9uWSwgNTAsIDUwKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoZW1wdHlIZWFydHMgPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGVtcHR5SGVhcnRzLS07XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29udGV4dDIuZHJhd0ltYWdlKHRoaXMuaGVhcnRJbWFnZXNbSU1HX0hFQVJUUy5FTVBUWV0sIHBvc2l0aW9uWCwgcG9zaXRpb25ZLCA1MCwgNTApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG4gICAgR2FtZS5wcm90b3R5cGUucmVkdWNlRW5lbXlJbnRlcnZhbCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHRoaXMuc2NvcmUgPiB0aGlzLmxhc3RTY29yZSArIDIwKSB7XG4gICAgICAgICAgICB0aGlzLmxhc3RTY29yZSA9IHRoaXMuc2NvcmU7XG4gICAgICAgICAgICAvLyB0aGlzLmVuZW15SW50ZXJ2YWxSZWR1Y3Rpb24gPSBNYXRoLmZsb29yKHRoaXMuc2NvcmUgLyAyMCkgKiAxMDtcbiAgICAgICAgICAgIC8vIHRoaXMuZW5lbXlJbnRlcnZhbCA9IHRoaXMuZW5lbXlJbnRlcnZhbCAqICgxIC0gdGhpcy5lbmVteUludGVydmFsUmVkdWN0aW9uIC8gMTAwKTtcbiAgICAgICAgICAgIHRoaXMuZW5lbXlJbnRlcnZhbCAqPSAwLjk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygndGhpcy5lbmVteUludGVydmFsIDo+PiAnLCB0aGlzLmVuZW15SW50ZXJ2YWwpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBHYW1lLnByb3RvdHlwZS5ncmF5c2NhbGVDYW52YXMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBpbWFnZURhdGEgPSB0aGlzLmNvbnRleHQuZ2V0SW1hZ2VEYXRhKDAsIDAsIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0KTtcbiAgICAgICAgdmFyIGRhdGEgPSBpbWFnZURhdGEuZGF0YTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBkYXRhLmxlbmd0aDsgaSArPSA0KSB7XG4gICAgICAgICAgICB2YXIgbHVtaW5hbmNlID0gMC4yOTkgKiBkYXRhW2ldICsgMC41ODcgKiBkYXRhW2kgKyAxXSArIDAuMTE0ICogZGF0YVtpICsgMl07XG4gICAgICAgICAgICBkYXRhW2ldID0gbHVtaW5hbmNlO1xuICAgICAgICAgICAgZGF0YVtpICsgMV0gPSBsdW1pbmFuY2U7XG4gICAgICAgICAgICBkYXRhW2kgKyAyXSA9IGx1bWluYW5jZTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmNvbnRleHQucHV0SW1hZ2VEYXRhKGltYWdlRGF0YSwgMCwgMCk7XG4gICAgfTtcbiAgICBHYW1lLnByb3RvdHlwZS5kaXNwbGF5U3RhdHVzVGV4dCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5zcGFuU2NvcmUuaW5uZXJIVE1MID0gXCJcIi5jb25jYXQodGhpcy5zY29yZS50b1N0cmluZygpLCBcIiBcIikuY29uY2F0KHRoaXMuZGVidWdcbiAgICAgICAgICAgID8gXCI8L2JyPiBGUFMgOiBcIiArXG4gICAgICAgICAgICAgICAgTWF0aC5mbG9vcigxMDAwIC8gdGhpcy5kZWx0YVRpbWUpICtcbiAgICAgICAgICAgICAgICBcIiBtYXhVcGRhdGUvcyA6IFwiICtcbiAgICAgICAgICAgICAgICB0aGlzLmZyYW1lcmF0ZVxuICAgICAgICAgICAgOiBcIlwiKTtcbiAgICB9O1xuICAgIHJldHVybiBHYW1lO1xufSgpKTtcbmV4cG9ydCB7IEdhbWUgfTtcbiIsInZhciBJbnB1dEhhbmRsZXIgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gSW5wdXRIYW5kbGVyKGdhbWUpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdGhpcy5nYW1lID0gZ2FtZTtcbiAgICAgICAgdGhpcy5rZXlzID0gW107XG4gICAgICAgIHRoaXMubGlzdGVuZWRLZXlzID0gW1wiQXJyb3dEb3duXCIsIFwiQXJyb3dVcFwiLCBcIkFycm93TGVmdFwiLCBcIkFycm93UmlnaHRcIiwgXCJhXCJdO1xuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgIGlmIChfdGhpcy5saXN0ZW5lZEtleXMuaW5jbHVkZXMoZS5rZXkpICYmXG4gICAgICAgICAgICAgICAgIV90aGlzLmtleXMuaW5jbHVkZXMoZS5rZXkpKSB7XG4gICAgICAgICAgICAgICAgX3RoaXMua2V5cy5wdXNoKGUua2V5KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGUua2V5ID09PSBcImRcIikge1xuICAgICAgICAgICAgICAgIF90aGlzLmdhbWUuZGVidWcgPSAhX3RoaXMuZ2FtZS5kZWJ1ZztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwia2V5dXBcIiwgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgIGlmIChfdGhpcy5saXN0ZW5lZEtleXMuaW5jbHVkZXMoZS5rZXkpKSB7XG4gICAgICAgICAgICAgICAgX3RoaXMua2V5cy5zcGxpY2UoX3RoaXMua2V5cy5pbmRleE9mKGUua2V5KSwgMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gSW5wdXRIYW5kbGVyO1xufSgpKTtcbmV4cG9ydCB7IElucHV0SGFuZGxlciB9O1xuIiwidmFyIExheWVyID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIExheWVyKGJhY2tncm91bmQsIGltYWdlLCBzcGVlZE1vZGlmaWVyKSB7XG4gICAgICAgIHRoaXMuYmFja2dyb3VuZCA9IGJhY2tncm91bmQ7XG4gICAgICAgIHRoaXMud2lkdGggPSB0aGlzLmJhY2tncm91bmQud2lkdGg7XG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gdGhpcy5iYWNrZ3JvdW5kLmhlaWdodDtcbiAgICAgICAgdGhpcy5pbWFnZSA9IGltYWdlO1xuICAgICAgICB0aGlzLnNwZWVkTW9kaWZpZXIgPSBzcGVlZE1vZGlmaWVyO1xuICAgICAgICB0aGlzLnggPSAwO1xuICAgICAgICB0aGlzLngyID0gMDtcbiAgICAgICAgdGhpcy55ID0gMDtcbiAgICAgICAgdGhpcy5zcGVlZCA9IHRoaXMuYmFja2dyb3VuZC5zcGVlZFggKiB0aGlzLnNwZWVkTW9kaWZpZXI7XG4gICAgfVxuICAgIExheWVyLnByb3RvdHlwZS51cGRhdGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuc3BlZWQgPSB0aGlzLmJhY2tncm91bmQuc3BlZWRYICogdGhpcy5zcGVlZE1vZGlmaWVyO1xuICAgICAgICB0aGlzLnggPSB0aGlzLnggKyB0aGlzLnNwZWVkO1xuICAgICAgICAvLyByZXNldCBpbWFnZTEgcG9zaXRpb24gaWYgb2ZmLWxpbWl0c1xuICAgICAgICBpZiAodGhpcy54IDwgMCAtIHRoaXMud2lkdGgpIHtcbiAgICAgICAgICAgIHRoaXMueCA9IDA7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodGhpcy54ID4gdGhpcy53aWR0aCkge1xuICAgICAgICAgICAgdGhpcy54ID0gMDtcbiAgICAgICAgfVxuICAgICAgICAvLyBwb3NpdGlvbnMgaW1hZ2UyIHRvIGxlZnQgb3IgcmlnaHRcbiAgICAgICAgaWYgKHRoaXMueCA8PSAwKSB7XG4gICAgICAgICAgICB0aGlzLngyID0gdGhpcy54ICsgdGhpcy53aWR0aDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMueDIgPSB0aGlzLnggLSB0aGlzLndpZHRoO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBMYXllci5wcm90b3R5cGUuZHJhdyA9IGZ1bmN0aW9uIChjb250ZXh0KSB7XG4gICAgICAgIGNvbnRleHQuZHJhd0ltYWdlKHRoaXMuaW1hZ2UsIHRoaXMueCwgdGhpcy55LCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCk7XG4gICAgICAgIGNvbnRleHQuZHJhd0ltYWdlKHRoaXMuaW1hZ2UsIHRoaXMueDIsIHRoaXMueSwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQpO1xuICAgIH07XG4gICAgcmV0dXJuIExheWVyO1xufSgpKTtcbmV4cG9ydCB7IExheWVyIH07XG4iLCJpbXBvcnQgeyBTVEFURVMgfSBmcm9tIFwiLi4vY29uc3QvY29uc3RcIjtcbmltcG9ydCB7IFJ1bm5pbmcsIEp1bXBpbmcsIEZhbGxpbmcsIFN0aWxsLCBBdHRhY2tpbmcgfSBmcm9tIFwiLi9TdGF0ZXNcIjtcbnZhciBQbGF5ZXIgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gUGxheWVyKGdhbWUpIHtcbiAgICAgICAgdGhpcy5nYW1lID0gZ2FtZTtcbiAgICAgICAgdGhpcy5mYWNpbmcgPSBcIlJcIjsgLy8gUiA9IHJpZ2h0LCBMID0gbGVmdFxuICAgICAgICB0aGlzLmFuaW1hdGlvbiA9IFwic3RpbGxcIjtcbiAgICAgICAgdGhpcy5zdGFydGluZ0hlYWx0aHBvaW50cyA9IDY7XG4gICAgICAgIHRoaXMuaGVhbHRocG9pbnRzID0gdGhpcy5zdGFydGluZ0hlYWx0aHBvaW50cztcbiAgICAgICAgdGhpcy53aWR0aCA9IDY2OyAvLyBkaXNwbGF5ZWQgd2lkdGhcbiAgICAgICAgdGhpcy5oZWlnaHQgPSA2MTsgLy8gZGlzcGxheWVkIGhlaWdodFxuICAgICAgICB0aGlzLmxlZnRMaW1pdCA9IDA7XG4gICAgICAgIHRoaXMucmlnaHRMaW1pdCA9IHRoaXMuZ2FtZS53aWR0aCAtIHRoaXMud2lkdGg7XG4gICAgICAgIHRoaXMueU9mZnNldCA9IC0yMjsgLy8gYWNjb3VudCBmb3IgY2hhcmFjdGVyIHBvc2l0aW9uIG9mZnNldCBvbiBzcHJpdGVzaGVldFxuICAgICAgICB0aGlzLmdyb3VuZExpbWl0ID0gdGhpcy5nYW1lLmhlaWdodCAtIHRoaXMuaGVpZ2h0ICsgdGhpcy55T2Zmc2V0O1xuICAgICAgICB0aGlzLnggPSB0aGlzLmdhbWUud2lkdGggLyAyIC0gdGhpcy53aWR0aCAvIDI7XG4gICAgICAgIHRoaXMueSA9IHRoaXMuZ3JvdW5kTGltaXQ7XG4gICAgICAgIHRoaXMuc3BlZWRYID0gMDtcbiAgICAgICAgdGhpcy5zcGVlZFhNb2RpZmllciA9IDM7XG4gICAgICAgIHRoaXMuc3BlZWRYQWlyTW9kaWZpZXIgPSA1O1xuICAgICAgICB0aGlzLnRyYXZlbGVkWCA9IDA7XG4gICAgICAgIHRoaXMuc3BlZWRZID0gMDtcbiAgICAgICAgdGhpcy5qdW1wQ29vbGRvd24gPSA0MDA7XG4gICAgICAgIHRoaXMubGFzdEp1bXAgPSB0aGlzLmp1bXBDb29sZG93bjtcbiAgICAgICAgdGhpcy53ZWlnaHQgPSAxLjI7XG4gICAgICAgIHRoaXMuc291cmNlV2lkdGggPSA2NjsgLy8gd2lkdGggb2YgZWFjaCBzcHJpdGUgb24gc3ByaXRlc2hlZXRcbiAgICAgICAgdGhpcy5zb3VyY2VIZWlnaHQgPSA2MTsgLy8gaGVpZ2h0IG9mIGVhY2ggc3ByaXRlIG9uIHNwcml0ZXNoZWV0XG4gICAgICAgIHRoaXMubWF4RnJhbWVDb2wgPSA2OyAvLyBudW1iZXIgb2YgY29sdW1ucyBvbiBzcHJpdGVzaGVldFxuICAgICAgICB0aGlzLm1heEZyYW1lUm93ID0gNDsgLy8gbnVtYmVyIG9yIHJvd3Mgb24gc3ByaXRlc2hlZXRcbiAgICAgICAgdGhpcy5mcmFtZSA9IDA7XG4gICAgICAgIHRoaXMuZnJhbWVDb2wgPSB0aGlzLmZyYW1lICUgdGhpcy5tYXhGcmFtZUNvbDtcbiAgICAgICAgdGhpcy5mcmFtZVJvdyA9IE1hdGguZmxvb3IodGhpcy5mcmFtZSAvIHRoaXMubWF4RnJhbWVDb2wpO1xuICAgICAgICB0aGlzLmZwcyA9IDE1O1xuICAgICAgICB0aGlzLmZyYW1lVGltZXIgPSAwO1xuICAgICAgICB0aGlzLmhpdGJveFJhZGl1cyA9IHRoaXMud2lkdGggLyAzO1xuICAgICAgICB0aGlzLmhpdGJveFhPZmZzZXQgPSAyLjY7XG4gICAgICAgIHRoaXMuaGl0Ym94WU9mZnNldCA9IDEuODtcbiAgICAgICAgdGhpcy5oaXRib3hYQ2VudGVyID0gdGhpcy54ICsgdGhpcy53aWR0aCAvIHRoaXMuaGl0Ym94WE9mZnNldDtcbiAgICAgICAgdGhpcy5oaXRib3hZQ2VudGVyID0gdGhpcy55ICsgdGhpcy5oZWlnaHQgLyB0aGlzLmhpdGJveFlPZmZzZXQ7XG4gICAgICAgIHRoaXMubGFzdEF0dGFjayA9IDA7XG4gICAgICAgIHRoaXMuYXR0YWNrQ29vbGRvd24gPSAxMDAwO1xuICAgICAgICB0aGlzLmF0dGFja0R1cmF0aW9uID0gNTAwO1xuICAgICAgICB0aGlzLmltYWdlcyA9IHtcbiAgICAgICAgICAgIGFsZXJ0ZWQ6IHtcbiAgICAgICAgICAgICAgICBMOiBudWxsLFxuICAgICAgICAgICAgICAgIFI6IG51bGwsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYXR0YWNraW5nOiB7XG4gICAgICAgICAgICAgICAgTDogbnVsbCxcbiAgICAgICAgICAgICAgICBSOiBudWxsLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHJ1bm5pbmc6IHtcbiAgICAgICAgICAgICAgICBMOiBudWxsLFxuICAgICAgICAgICAgICAgIFI6IG51bGwsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc3RpbGw6IHtcbiAgICAgICAgICAgICAgICBMOiBudWxsLFxuICAgICAgICAgICAgICAgIFI6IG51bGwsXG4gICAgICAgICAgICB9LFxuICAgICAgICB9O1xuICAgICAgICB0aGlzLmltYWdlcy5hbGVydGVkLkwgPSBuZXcgSW1hZ2UoNjAsIDQ1KTtcbiAgICAgICAgdGhpcy5pbWFnZXMuYWxlcnRlZC5MLnNyYyA9XG4gICAgICAgICAgICBcImFzc2V0cy9pbWcvY2hhcmFjdGVycy9nb2JsaW4vZ29ibGluX2FsZXJ0ZWRfTF9zcHJpdGVzaGVldC5wbmdcIjtcbiAgICAgICAgdGhpcy5pbWFnZXMuYWxlcnRlZC5SID0gbmV3IEltYWdlKDYwLCA0NSk7XG4gICAgICAgIHRoaXMuaW1hZ2VzLmFsZXJ0ZWQuUi5zcmMgPVxuICAgICAgICAgICAgXCJhc3NldHMvaW1nL2NoYXJhY3RlcnMvZ29ibGluL2dvYmxpbl9hbGVydGVkX1Jfc3ByaXRlc2hlZXQucG5nXCI7XG4gICAgICAgIHRoaXMuaW1hZ2VzLmF0dGFja2luZy5MID0gbmV3IEltYWdlKDYwLCA0NSk7XG4gICAgICAgIHRoaXMuaW1hZ2VzLmF0dGFja2luZy5MLnNyYyA9XG4gICAgICAgICAgICBcImFzc2V0cy9pbWcvY2hhcmFjdGVycy9nb2JsaW4vZ29ibGluX2F0dGFja2luZ19MX3Nwcml0ZXNoZWV0LnBuZ1wiO1xuICAgICAgICB0aGlzLmltYWdlcy5hdHRhY2tpbmcuUiA9IG5ldyBJbWFnZSg2MCwgNDUpO1xuICAgICAgICB0aGlzLmltYWdlcy5hdHRhY2tpbmcuUi5zcmMgPVxuICAgICAgICAgICAgXCJhc3NldHMvaW1nL2NoYXJhY3RlcnMvZ29ibGluL2dvYmxpbl9hdHRhY2tpbmdfUl9zcHJpdGVzaGVldC5wbmdcIjtcbiAgICAgICAgdGhpcy5pbWFnZXMucnVubmluZy5MID0gbmV3IEltYWdlKDYwLCA0NSk7XG4gICAgICAgIHRoaXMuaW1hZ2VzLnJ1bm5pbmcuTC5zcmMgPVxuICAgICAgICAgICAgXCJhc3NldHMvaW1nL2NoYXJhY3RlcnMvZ29ibGluL2dvYmxpbl9ydW5uaW5nX0xfc3ByaXRlc2hlZXQucG5nXCI7XG4gICAgICAgIHRoaXMuaW1hZ2VzLnJ1bm5pbmcuUiA9IG5ldyBJbWFnZSg2MCwgNDUpO1xuICAgICAgICB0aGlzLmltYWdlcy5ydW5uaW5nLlIuc3JjID1cbiAgICAgICAgICAgIFwiYXNzZXRzL2ltZy9jaGFyYWN0ZXJzL2dvYmxpbi9nb2JsaW5fcnVubmluZ19SX3Nwcml0ZXNoZWV0LnBuZ1wiO1xuICAgICAgICB0aGlzLmltYWdlcy5zdGlsbC5MID0gbmV3IEltYWdlKDYwLCA0NSk7XG4gICAgICAgIHRoaXMuaW1hZ2VzLnN0aWxsLkwuc3JjID1cbiAgICAgICAgICAgIFwiYXNzZXRzL2ltZy9jaGFyYWN0ZXJzL2dvYmxpbi9nb2JsaW5fc3RpbGxfTF9zcHJpdGVzaGVldC5wbmdcIjtcbiAgICAgICAgdGhpcy5pbWFnZXMuc3RpbGwuUiA9IG5ldyBJbWFnZSg2MCwgNDUpO1xuICAgICAgICB0aGlzLmltYWdlcy5zdGlsbC5SLnNyYyA9XG4gICAgICAgICAgICBcImFzc2V0cy9pbWcvY2hhcmFjdGVycy9nb2JsaW4vZ29ibGluX3N0aWxsX1Jfc3ByaXRlc2hlZXQucG5nXCI7XG4gICAgICAgIHRoaXMuc3RhdGVzID0gW1xuICAgICAgICAgICAgbmV3IFN0aWxsKHRoaXMuZ2FtZSksXG4gICAgICAgICAgICBuZXcgUnVubmluZyh0aGlzLmdhbWUpLFxuICAgICAgICAgICAgbmV3IEp1bXBpbmcodGhpcy5nYW1lKSxcbiAgICAgICAgICAgIG5ldyBGYWxsaW5nKHRoaXMuZ2FtZSksXG4gICAgICAgICAgICBuZXcgQXR0YWNraW5nKHRoaXMuZ2FtZSksXG4gICAgICAgIF07XG4gICAgICAgIHRoaXMuY3VycmVudFN0YXRlID0gdGhpcy5zdGF0ZXNbMF07XG4gICAgfVxuICAgIFBsYXllci5wcm90b3R5cGUuZHJhdyA9IGZ1bmN0aW9uIChjb250ZXh0KSB7XG4gICAgICAgIC8vIHNlZSBodHRwczovL3d3dy55b3V0dWJlLmNvbS93YXRjaD92PTdKdExISmJtMGtBJnQ9ODMwc1xuICAgICAgICBpZiAodGhpcy5nYW1lLmRlYnVnKSB7XG4gICAgICAgICAgICBjb250ZXh0LmJlZ2luUGF0aCgpO1xuICAgICAgICAgICAgY29udGV4dC5hcmModGhpcy5oaXRib3hYQ2VudGVyLCB0aGlzLmhpdGJveFlDZW50ZXIsIHRoaXMuaGl0Ym94UmFkaXVzLCAwLCBNYXRoLlBJICogMik7XG4gICAgICAgICAgICBjb250ZXh0LnN0cm9rZSgpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnRleHQuZHJhd0ltYWdlKHRoaXMuaW1hZ2VzW3RoaXMuYW5pbWF0aW9uXVt0aGlzLmZhY2luZ10sIHRoaXMuZnJhbWVDb2wgKiB0aGlzLnNvdXJjZVdpZHRoLCAvLyBzeFxuICAgICAgICB0aGlzLmZyYW1lUm93ICogdGhpcy5zb3VyY2VIZWlnaHQsIC8vIHN5XG4gICAgICAgIHRoaXMud2lkdGgsIC8vIHN3XG4gICAgICAgIHRoaXMuaGVpZ2h0LCAvLyBzaFxuICAgICAgICB0aGlzLngsIHRoaXMueSwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQpO1xuICAgIH07XG4gICAgUGxheWVyLnByb3RvdHlwZS51cGRhdGUgPSBmdW5jdGlvbiAoaW5wdXQsIGRlbHRhVGltZSkge1xuICAgICAgICB0aGlzLmxhc3RBdHRhY2sgKz0gZGVsdGFUaW1lO1xuICAgICAgICB0aGlzLmxhc3RKdW1wICs9IGRlbHRhVGltZTtcbiAgICAgICAgaWYgKHRoaXMuaGVhbHRocG9pbnRzID09PSAwKVxuICAgICAgICAgICAgdGhpcy5nYW1lLmdhbWVPdmVyID0gdHJ1ZTtcbiAgICAgICAgaWYgKHRoaXMuZ2FtZS5kZWJ1Zykge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJ0aGlzLmN1cnJlbnRTdGF0ZSA6Pj4gXCIsIHRoaXMuY3VycmVudFN0YXRlKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwidGhpcy5zcGVlZFggOj4+IFwiLCB0aGlzLnNwZWVkWCk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcInRoaXMuc3BlZWRZIDo+PiBcIiwgdGhpcy5zcGVlZFkpO1xuICAgICAgICB9XG4gICAgICAgIC8vIC0tLS0tIE1PVkVNRU5UXG4gICAgICAgIC8vIGhvcml6b250YWwgbW92ZW1lbnRcbiAgICAgICAgaWYgKGlucHV0LmtleXMuaW5jbHVkZXMoXCJBcnJvd1JpZ2h0XCIpKSB7XG4gICAgICAgICAgICB0aGlzLmZhY2luZyA9IFwiUlwiO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGlucHV0LmtleXMuaW5jbHVkZXMoXCJBcnJvd0xlZnRcIikpIHtcbiAgICAgICAgICAgIHRoaXMuZmFjaW5nID0gXCJMXCI7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnNwZWVkWCA9IDA7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jaGVja0NvbGxpc2lvbigpO1xuICAgICAgICB0aGlzLnggKz0gdGhpcy5zcGVlZFg7XG4gICAgICAgIHRoaXMudHJhdmVsZWRYICs9IHRoaXMuc3BlZWRYO1xuICAgICAgICB0aGlzLmN1cnJlbnRTdGF0ZS5oYW5kbGVJbnB1dChpbnB1dCk7XG4gICAgICAgIC8vIGhvcml6b250YWwgYm91bmRhcmllc1xuICAgICAgICBpZiAodGhpcy54IDwgdGhpcy5sZWZ0TGltaXQpIHtcbiAgICAgICAgICAgIHRoaXMueCA9IDA7XG4gICAgICAgICAgICB0aGlzLmdhbWUuYmFja2dyb3VuZC5zcGVlZFggPSAtdGhpcy5zcGVlZFggKiB0aGlzLmdhbWUuc3BlZWQ7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodGhpcy54ID4gdGhpcy5yaWdodExpbWl0KSB7XG4gICAgICAgICAgICB0aGlzLnggPSB0aGlzLmdhbWUud2lkdGggLSB0aGlzLndpZHRoO1xuICAgICAgICAgICAgdGhpcy5nYW1lLmJhY2tncm91bmQuc3BlZWRYID0gLXRoaXMuc3BlZWRYICogdGhpcy5nYW1lLnNwZWVkO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5nYW1lLmJhY2tncm91bmQuc3BlZWRYID0gMDtcbiAgICAgICAgfVxuICAgICAgICAvLyB2ZXJ0aWNhbCBtb3ZlbWVudFxuICAgICAgICBpZiAoaW5wdXQua2V5cy5pbmNsdWRlcyhcIkFycm93VXBcIikgJiZcbiAgICAgICAgICAgIHRoaXMub25Hcm91bmQoKSAmJlxuICAgICAgICAgICAgdGhpcy5sYXN0SnVtcCA+IHRoaXMuanVtcENvb2xkb3duKSB7XG4gICAgICAgICAgICB0aGlzLnNwZWVkWSAtPSAyMDtcbiAgICAgICAgICAgIHRoaXMubGFzdEp1bXAgPSAwO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMueSArPSB0aGlzLnNwZWVkWTtcbiAgICAgICAgaWYgKCF0aGlzLm9uR3JvdW5kKCkpIHtcbiAgICAgICAgICAgIHRoaXMuc3BlZWRZICs9IHRoaXMud2VpZ2h0O1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5zcGVlZFkgPSAwO1xuICAgICAgICB9XG4gICAgICAgIC8vIHZlcnRpY2FsIGJvdW5kYXJpZXNcbiAgICAgICAgaWYgKHRoaXMueSA+IHRoaXMuZ3JvdW5kTGltaXQpXG4gICAgICAgICAgICB0aGlzLnkgPSB0aGlzLmdyb3VuZExpbWl0O1xuICAgICAgICAvLyAtLS0tLSBBTklNQVRJT05cbiAgICAgICAgLy8gdXBkYXRlIHBsYXllciBmcmFtZSBvbmx5IHdoZW4gYWJvdmUgZnBzIGludGVydmFsXG4gICAgICAgIGlmICh0aGlzLmZyYW1lVGltZXIgPiAxMDAwIC8gdGhpcy5mcHMpIHtcbiAgICAgICAgICAgIHRoaXMuZnJhbWVUaW1lciA9IDA7XG4gICAgICAgICAgICAvLyBpZiByZWFjaGVkIGVuZCBvZiBzcHJpdGVzaGVldCwgcmVwb3NpdGlvbnMgdG8gc3RhcnQgb2Ygc3ByaXRlc2hlZXRcbiAgICAgICAgICAgIGlmICh0aGlzLmZyYW1lID09PSB0aGlzLm1heEZyYW1lUm93ICogdGhpcy5tYXhGcmFtZUNvbCAtIDEpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmZyYW1lID0gMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuZnJhbWUrKztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIGN5Y2xlIHRocm91Z2ggc3ByaXRlc2hlZXQgcm93cy9jb2x1bW5zXG4gICAgICAgICAgICB0aGlzLmZyYW1lQ29sID0gdGhpcy5mcmFtZSAlIHRoaXMubWF4RnJhbWVDb2w7XG4gICAgICAgICAgICB0aGlzLmZyYW1lUm93ID0gTWF0aC5mbG9vcih0aGlzLmZyYW1lIC8gdGhpcy5tYXhGcmFtZUNvbCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmZyYW1lVGltZXIgKz0gZGVsdGFUaW1lO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBQbGF5ZXIucHJvdG90eXBlLnNldFN0YXRlID0gZnVuY3Rpb24gKHN0YXRlKSB7XG4gICAgICAgIHRoaXMuY3VycmVudFN0YXRlID0gdGhpcy5zdGF0ZXNbc3RhdGVdO1xuICAgICAgICB0aGlzLmN1cnJlbnRTdGF0ZS5lbnRlcigpO1xuICAgIH07XG4gICAgUGxheWVyLnByb3RvdHlwZS5jaGVja0NvbGxpc2lvbiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgLy8gY2hhbmdlIGhpdGJveCBwb3NpdGlvbiBkZXBlbmRpbmcgb24gd2hlcmUgcGxheWVyIGlzIGZhY2luZ1xuICAgICAgICBpZiAodGhpcy5mYWNpbmcgPT09IFwiUlwiKSB7XG4gICAgICAgICAgICB0aGlzLmhpdGJveFhDZW50ZXIgPSB0aGlzLnggKyB0aGlzLndpZHRoIC8gdGhpcy5oaXRib3hYT2Zmc2V0O1xuICAgICAgICAgICAgdGhpcy5oaXRib3hZQ2VudGVyID0gdGhpcy55ICsgdGhpcy5oZWlnaHQgLyB0aGlzLmhpdGJveFlPZmZzZXQ7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmhpdGJveFhDZW50ZXIgPSB0aGlzLnggKyAxMiArIHRoaXMud2lkdGggLyB0aGlzLmhpdGJveFhPZmZzZXQ7XG4gICAgICAgICAgICB0aGlzLmhpdGJveFlDZW50ZXIgPSB0aGlzLnkgKyB0aGlzLmhlaWdodCAvIHRoaXMuaGl0Ym94WU9mZnNldDtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmdhbWUuZW5lbWllcy5mb3JFYWNoKGZ1bmN0aW9uIChlbmVteSkge1xuICAgICAgICAgICAgdmFyIGR4ID0gZW5lbXkueCArIGVuZW15LndpZHRoIC8gZW5lbXkuaGl0Ym94WE9mZnNldCAtIF90aGlzLmhpdGJveFhDZW50ZXI7XG4gICAgICAgICAgICB2YXIgZHkgPSBlbmVteS55ICsgZW5lbXkuaGVpZ2h0IC8gZW5lbXkuaGl0Ym94WU9mZnNldCAtIF90aGlzLmhpdGJveFlDZW50ZXI7XG4gICAgICAgICAgICB2YXIgZGlzdGFuY2UgPSBNYXRoLnNxcnQoZHggKiBkeCArIGR5ICogZHkpO1xuICAgICAgICAgICAgaWYgKGRpc3RhbmNlIDwgZW5lbXkuaGl0Ym94UmFkaXVzICsgX3RoaXMuaGl0Ym94UmFkaXVzKSB7XG4gICAgICAgICAgICAgICAgaWYgKF90aGlzLmN1cnJlbnRTdGF0ZSAhPT0gX3RoaXMuc3RhdGVzW1NUQVRFUy5BVFRBQ0tJTkddICYmXG4gICAgICAgICAgICAgICAgICAgICFlbmVteS5odXJ0KSB7XG4gICAgICAgICAgICAgICAgICAgIF90aGlzLmhlYWx0aHBvaW50cy0tO1xuICAgICAgICAgICAgICAgICAgICBfdGhpcy5zcGVlZFggPSAtMTA7XG4gICAgICAgICAgICAgICAgICAgIF90aGlzLnNwZWVkWSA9IC0xNTtcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMuZ2FtZS5kaXNwbGF5SGVhcnRzKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKF90aGlzLmN1cnJlbnRTdGF0ZSA9PT0gX3RoaXMuc3RhdGVzW1NUQVRFUy5BVFRBQ0tJTkddKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghZW5lbXkuaHVydClcbiAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLmdhbWUuc2NvcmUgKz0gMjtcbiAgICAgICAgICAgICAgICAgICAgZW5lbXkuaHVydCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIGVuZW15LmZyYW1lID0gMDtcbiAgICAgICAgICAgICAgICAgICAgZW5lbXkuYW5pbWF0aW9uID0gXCJkeWluZ1wiO1xuICAgICAgICAgICAgICAgICAgICB3aGlsZSAoZW5lbXkuc3BlZWRYID4gZW5lbXkud2VpZ2h0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbmVteS5zcGVlZFggLT0gKGVuZW15LndlaWdodCAqIDAuOSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgUGxheWVyLnByb3RvdHlwZS5vbkdyb3VuZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMueSA+PSB0aGlzLmdhbWUuaGVpZ2h0IC0gdGhpcy5oZWlnaHQgKyB0aGlzLnlPZmZzZXQ7XG4gICAgfTtcbiAgICByZXR1cm4gUGxheWVyO1xufSgpKTtcbmV4cG9ydCB7IFBsYXllciB9O1xuIiwidmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCAoZnVuY3Rpb24gKCkge1xuICAgIHZhciBleHRlbmRTdGF0aWNzID0gZnVuY3Rpb24gKGQsIGIpIHtcbiAgICAgICAgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxuICAgICAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxuICAgICAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGIsIHApKSBkW3BdID0gYltwXTsgfTtcbiAgICAgICAgcmV0dXJuIGV4dGVuZFN0YXRpY3MoZCwgYik7XG4gICAgfTtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBiICE9PSBcImZ1bmN0aW9uXCIgJiYgYiAhPT0gbnVsbClcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDbGFzcyBleHRlbmRzIHZhbHVlIFwiICsgU3RyaW5nKGIpICsgXCIgaXMgbm90IGEgY29uc3RydWN0b3Igb3IgbnVsbFwiKTtcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbiAgICB9O1xufSkoKTtcbmltcG9ydCB7IFNUQVRFUyB9IGZyb20gXCIuLi9jb25zdC9jb25zdFwiO1xudmFyIFN0YXRlID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFN0YXRlKHN0YXRlKSB7XG4gICAgICAgIHRoaXMuc3RhdGUgPSBzdGF0ZTtcbiAgICB9XG4gICAgcmV0dXJuIFN0YXRlO1xufSgpKTtcbnZhciBTdGlsbCA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoU3RpbGwsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gU3RpbGwoZ2FtZSkge1xuICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIuY2FsbCh0aGlzLCBcIlNUSUxMXCIpIHx8IHRoaXM7XG4gICAgICAgIF90aGlzLmdhbWUgPSBnYW1lO1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIFN0aWxsLnByb3RvdHlwZS5lbnRlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5nYW1lLnBsYXllci5hbmltYXRpb24gPSBcInN0aWxsXCI7XG4gICAgfTtcbiAgICBTdGlsbC5wcm90b3R5cGUuaGFuZGxlSW5wdXQgPSBmdW5jdGlvbiAoaW5wdXQpIHtcbiAgICAgICAgaWYgKGlucHV0LmtleXMuaW5jbHVkZXMoXCJBcnJvd1JpZ2h0XCIpKSB7XG4gICAgICAgICAgICB0aGlzLmdhbWUucGxheWVyLmZhY2luZyA9IFwiUlwiO1xuICAgICAgICAgICAgdGhpcy5nYW1lLnBsYXllci5zcGVlZFggPVxuICAgICAgICAgICAgICAgIHRoaXMuZ2FtZS5wbGF5ZXIuc3BlZWRYTW9kaWZpZXIgKiB0aGlzLmdhbWUuc3BlZWQ7XG4gICAgICAgICAgICB0aGlzLmdhbWUucGxheWVyLnNldFN0YXRlKFNUQVRFUy5SVU5OSU5HKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChpbnB1dC5rZXlzLmluY2x1ZGVzKFwiQXJyb3dMZWZ0XCIpKSB7XG4gICAgICAgICAgICB0aGlzLmdhbWUucGxheWVyLmZhY2luZyA9IFwiTFwiO1xuICAgICAgICAgICAgdGhpcy5nYW1lLnBsYXllci5zcGVlZFggPVxuICAgICAgICAgICAgICAgIC10aGlzLmdhbWUucGxheWVyLnNwZWVkWE1vZGlmaWVyICogdGhpcy5nYW1lLnNwZWVkO1xuICAgICAgICAgICAgdGhpcy5nYW1lLnBsYXllci5zZXRTdGF0ZShTVEFURVMuUlVOTklORyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGlucHV0LmtleXMuaW5jbHVkZXMoXCJBcnJvd1VwXCIpICYmXG4gICAgICAgICAgICB0aGlzLmdhbWUucGxheWVyLmxhc3RKdW1wID4gdGhpcy5nYW1lLnBsYXllci5qdW1wQ29vbGRvd24pIHtcbiAgICAgICAgICAgIHRoaXMuZ2FtZS5wbGF5ZXIuc2V0U3RhdGUoU1RBVEVTLkpVTVBJTkcpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpbnB1dC5rZXlzLmluY2x1ZGVzKFwiYVwiKSAmJlxuICAgICAgICAgICAgdGhpcy5nYW1lLnBsYXllci5sYXN0QXR0YWNrID4gdGhpcy5nYW1lLnBsYXllci5hdHRhY2tDb29sZG93bikge1xuICAgICAgICAgICAgdGhpcy5nYW1lLnBsYXllci5sYXN0QXR0YWNrID0gMDtcbiAgICAgICAgICAgIHRoaXMuZ2FtZS5wbGF5ZXIuc2V0U3RhdGUoU1RBVEVTLkFUVEFDS0lORyk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHJldHVybiBTdGlsbDtcbn0oU3RhdGUpKTtcbnZhciBSdW5uaW5nID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhSdW5uaW5nLCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIFJ1bm5pbmcoZ2FtZSkge1xuICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIuY2FsbCh0aGlzLCBcIlJVTk5JTkdcIikgfHwgdGhpcztcbiAgICAgICAgX3RoaXMuZ2FtZSA9IGdhbWU7XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgUnVubmluZy5wcm90b3R5cGUuZW50ZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuZ2FtZS5wbGF5ZXIuYW5pbWF0aW9uID0gXCJydW5uaW5nXCI7XG4gICAgfTtcbiAgICBSdW5uaW5nLnByb3RvdHlwZS5oYW5kbGVJbnB1dCA9IGZ1bmN0aW9uIChpbnB1dCkge1xuICAgICAgICBpZiAoaW5wdXQua2V5cy5pbmNsdWRlcyhcIkFycm93UmlnaHRcIikpIHtcbiAgICAgICAgICAgIHRoaXMuZ2FtZS5wbGF5ZXIuZmFjaW5nID0gXCJSXCI7XG4gICAgICAgICAgICB0aGlzLmdhbWUucGxheWVyLnNwZWVkWCA9XG4gICAgICAgICAgICAgICAgdGhpcy5nYW1lLnBsYXllci5zcGVlZFhNb2RpZmllciAqIHRoaXMuZ2FtZS5zcGVlZDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChpbnB1dC5rZXlzLmluY2x1ZGVzKFwiQXJyb3dMZWZ0XCIpKSB7XG4gICAgICAgICAgICB0aGlzLmdhbWUucGxheWVyLmZhY2luZyA9IFwiTFwiO1xuICAgICAgICAgICAgdGhpcy5nYW1lLnBsYXllci5zcGVlZFggPVxuICAgICAgICAgICAgICAgIC10aGlzLmdhbWUucGxheWVyLnNwZWVkWE1vZGlmaWVyICogdGhpcy5nYW1lLnNwZWVkO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpbnB1dC5rZXlzLmluY2x1ZGVzKFwiQXJyb3dVcFwiKSAmJlxuICAgICAgICAgICAgdGhpcy5nYW1lLnBsYXllci5sYXN0SnVtcCA+IHRoaXMuZ2FtZS5wbGF5ZXIuanVtcENvb2xkb3duKVxuICAgICAgICAgICAgdGhpcy5nYW1lLnBsYXllci5zZXRTdGF0ZShTVEFURVMuSlVNUElORyk7XG4gICAgICAgIGlmICh0aGlzLmdhbWUucGxheWVyLnNwZWVkWCA9PT0gMClcbiAgICAgICAgICAgIHRoaXMuZ2FtZS5wbGF5ZXIuc2V0U3RhdGUoU1RBVEVTLlNUSUxMKTtcbiAgICB9O1xuICAgIHJldHVybiBSdW5uaW5nO1xufShTdGF0ZSkpO1xudmFyIEp1bXBpbmcgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKEp1bXBpbmcsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gSnVtcGluZyhnYW1lKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMsIFwiSlVNUElOR1wiKSB8fCB0aGlzO1xuICAgICAgICBfdGhpcy5nYW1lID0gZ2FtZTtcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICBKdW1waW5nLnByb3RvdHlwZS5lbnRlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5nYW1lLnBsYXllci5hbmltYXRpb24gPSBcInJ1bm5pbmdcIjtcbiAgICAgICAgLy8gdGhpcy5nYW1lLnBsYXllci5zcGVlZFkgLT0gMjA7XG4gICAgICAgIC8vID8/Pz8gV2h5IGRvaW5nIHRoaXMgaGVyZSBpbnN0ZWFkIG9mIFBsYXllci50czoyMTEgbWFrZXMgY2hhcmFjdGVyIGp1bXAgdHdpY2UgYXMgaGlnaCA/Pz8/XG4gICAgfTtcbiAgICBKdW1waW5nLnByb3RvdHlwZS5oYW5kbGVJbnB1dCA9IGZ1bmN0aW9uIChpbnB1dCkge1xuICAgICAgICBpZiAodGhpcy5nYW1lLnBsYXllci5zcGVlZFkgPiB0aGlzLmdhbWUucGxheWVyLndlaWdodCkge1xuICAgICAgICAgICAgdGhpcy5nYW1lLnBsYXllci5zZXRTdGF0ZShTVEFURVMuRkFMTElORyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGlucHV0LmtleXMuaW5jbHVkZXMoXCJBcnJvd1JpZ2h0XCIpKSB7XG4gICAgICAgICAgICB0aGlzLmdhbWUucGxheWVyLmZhY2luZyA9IFwiUlwiO1xuICAgICAgICAgICAgdGhpcy5nYW1lLnBsYXllci5zcGVlZFggPVxuICAgICAgICAgICAgICAgIHRoaXMuZ2FtZS5wbGF5ZXIuc3BlZWRYQWlyTW9kaWZpZXIgKiB0aGlzLmdhbWUuc3BlZWQ7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoaW5wdXQua2V5cy5pbmNsdWRlcyhcIkFycm93TGVmdFwiKSkge1xuICAgICAgICAgICAgdGhpcy5nYW1lLnBsYXllci5mYWNpbmcgPSBcIkxcIjtcbiAgICAgICAgICAgIHRoaXMuZ2FtZS5wbGF5ZXIuc3BlZWRYID1cbiAgICAgICAgICAgICAgICAtdGhpcy5nYW1lLnBsYXllci5zcGVlZFhBaXJNb2RpZmllciAqIHRoaXMuZ2FtZS5zcGVlZDtcbiAgICAgICAgfVxuICAgIH07XG4gICAgcmV0dXJuIEp1bXBpbmc7XG59KFN0YXRlKSk7XG52YXIgRmFsbGluZyA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoRmFsbGluZywgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBGYWxsaW5nKGdhbWUpIHtcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcywgXCJGQUxMSU5HXCIpIHx8IHRoaXM7XG4gICAgICAgIF90aGlzLmdhbWUgPSBnYW1lO1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIEZhbGxpbmcucHJvdG90eXBlLmVudGVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLmdhbWUucGxheWVyLmFuaW1hdGlvbiA9IFwicnVubmluZ1wiO1xuICAgIH07XG4gICAgRmFsbGluZy5wcm90b3R5cGUuaGFuZGxlSW5wdXQgPSBmdW5jdGlvbiAoaW5wdXQpIHtcbiAgICAgICAgaWYgKGlucHV0LmtleXMuaW5jbHVkZXMoXCJBcnJvd1JpZ2h0XCIpKSB7XG4gICAgICAgICAgICB0aGlzLmdhbWUucGxheWVyLmZhY2luZyA9IFwiUlwiO1xuICAgICAgICAgICAgdGhpcy5nYW1lLnBsYXllci5zcGVlZFggPVxuICAgICAgICAgICAgICAgIHRoaXMuZ2FtZS5wbGF5ZXIuc3BlZWRYQWlyTW9kaWZpZXIgKiB0aGlzLmdhbWUuc3BlZWQ7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoaW5wdXQua2V5cy5pbmNsdWRlcyhcIkFycm93TGVmdFwiKSkge1xuICAgICAgICAgICAgdGhpcy5nYW1lLnBsYXllci5mYWNpbmcgPSBcIkxcIjtcbiAgICAgICAgICAgIHRoaXMuZ2FtZS5wbGF5ZXIuc3BlZWRYID1cbiAgICAgICAgICAgICAgICAtdGhpcy5nYW1lLnBsYXllci5zcGVlZFhBaXJNb2RpZmllciAqIHRoaXMuZ2FtZS5zcGVlZDtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5nYW1lLnBsYXllci5vbkdyb3VuZCgpKSB7XG4gICAgICAgICAgICB0aGlzLmdhbWUucGxheWVyLnNldFN0YXRlKFNUQVRFUy5TVElMTCk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHJldHVybiBGYWxsaW5nO1xufShTdGF0ZSkpO1xudmFyIEF0dGFja2luZyA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoQXR0YWNraW5nLCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIEF0dGFja2luZyhnYW1lKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMsIFwiQVRUQUNLSU5HXCIpIHx8IHRoaXM7XG4gICAgICAgIF90aGlzLmdhbWUgPSBnYW1lO1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIEF0dGFja2luZy5wcm90b3R5cGUuZW50ZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuZ2FtZS5wbGF5ZXIuZnJhbWUgPSAwO1xuICAgICAgICB0aGlzLmdhbWUucGxheWVyLmFuaW1hdGlvbiA9IFwiYXR0YWNraW5nXCI7XG4gICAgICAgIHRoaXMuYXR0YWNrVGltZXIgPSB0aGlzLmdhbWUucGxheWVyLmF0dGFja0R1cmF0aW9uO1xuICAgIH07XG4gICAgQXR0YWNraW5nLnByb3RvdHlwZS5oYW5kbGVJbnB1dCA9IGZ1bmN0aW9uIChpbnB1dCkge1xuICAgICAgICB0aGlzLmF0dGFja1RpbWVyIC09IHRoaXMuZ2FtZS5kZWx0YVRpbWU7XG4gICAgICAgIGlmIChpbnB1dC5rZXlzLmluY2x1ZGVzKFwiQXJyb3dSaWdodFwiKSkge1xuICAgICAgICAgICAgdGhpcy5nYW1lLnBsYXllci5mYWNpbmcgPSBcIlJcIjtcbiAgICAgICAgICAgIHRoaXMuZ2FtZS5wbGF5ZXIuc3BlZWRYID1cbiAgICAgICAgICAgICAgICB0aGlzLmdhbWUucGxheWVyLnNwZWVkWE1vZGlmaWVyICogdGhpcy5nYW1lLnNwZWVkO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGlucHV0LmtleXMuaW5jbHVkZXMoXCJBcnJvd0xlZnRcIikpIHtcbiAgICAgICAgICAgIHRoaXMuZ2FtZS5wbGF5ZXIuZmFjaW5nID0gXCJMXCI7XG4gICAgICAgICAgICB0aGlzLmdhbWUucGxheWVyLnNwZWVkWCA9XG4gICAgICAgICAgICAgICAgLXRoaXMuZ2FtZS5wbGF5ZXIuc3BlZWRYTW9kaWZpZXIgKiB0aGlzLmdhbWUuc3BlZWQ7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuYXR0YWNrVGltZXIgPD0gMCkge1xuICAgICAgICAgICAgdGhpcy5nYW1lLnBsYXllci5zZXRTdGF0ZShTVEFURVMuU1RJTEwpO1xuICAgICAgICAgICAgaWYgKGlucHV0LmtleXMuaW5jbHVkZXMoXCJBcnJvd1VwXCIpICYmXG4gICAgICAgICAgICAgICAgdGhpcy5nYW1lLnBsYXllci5sYXN0SnVtcCA+IHRoaXMuZ2FtZS5wbGF5ZXIuanVtcENvb2xkb3duKVxuICAgICAgICAgICAgICAgIHRoaXMuZ2FtZS5wbGF5ZXIuc2V0U3RhdGUoU1RBVEVTLkpVTVBJTkcpO1xuICAgICAgICAgICAgaWYgKHRoaXMuZ2FtZS5wbGF5ZXIuc3BlZWRYID09PSAwKVxuICAgICAgICAgICAgICAgIHRoaXMuZ2FtZS5wbGF5ZXIuc2V0U3RhdGUoU1RBVEVTLlNUSUxMKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgcmV0dXJuIEF0dGFja2luZztcbn0oU3RhdGUpKTtcbmV4cG9ydCB7IFN0YXRlLCBTdGlsbCwgUnVubmluZywgSnVtcGluZywgRmFsbGluZywgQXR0YWNraW5nIH07XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIi8vIFdJUCA6IGFkZCB2ZXJ0aWNhbCBtb3ZlbWVudCB0byBqdW1waW5nIHN0YXRlIC0tLSA/Pz8gd2h5IGlzIHZlbG9jaXR5IGluY3JlYXNlZCB0d2ljZSA/Pz9cbi8vIGFkZCBwb3NzaWJpbGl0eSB0byBjaGFuZ2UgYW5pbWF0aW9uIGZvciBhIHNwZWNpZmllZCBkdXJhdGlvbiAoZXg6IGVuZW15IHR1cm5pbmcpXG4vLyBhZGQganVtcCBjb29sZG93biBmb3IgcGxheWVyXG4vLyBhZGQgc291bmRcbi8vIEdhbWUgaXMgYmVpbmcgc2VudCBldmVyeXdoZXJlICsgSSBkb24ndCB3YW50IG1vcmUgdGhhbiBvbmUgaW5zdGFuY2UgLT4gbWFrZSBpdCBhIFNpbmdsZXRvblxuaW1wb3J0IHsgQ0FOVkFTMl9IRUlHSFQsIENBTlZBUzJfV0lEVEgsIENBTlZBU19IRUlHSFQsIENBTlZBU19XSURUSCB9IGZyb20gXCIuL2NvbnN0L2NvbnN0XCI7XG5pbXBvcnQgeyBHYW1lIH0gZnJvbSBcIi4vbW9kZWwvR2FtZVwiO1xud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAvLyBjYW52YXMxID0gZ2FtZSBhcmVhXG4gICAgdmFyIGNhbnZhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY2FudmFzMVwiKTtcbiAgICB2YXIgY3R4ID0gY2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcbiAgICBjYW52YXMud2lkdGggPSBDQU5WQVNfV0lEVEg7XG4gICAgY2FudmFzLmhlaWdodCA9IENBTlZBU19IRUlHSFQ7XG4gICAgLy8gY2FudmFzMiA9IEhVRFxuICAgIHZhciBjYW52YXMyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjYW52YXMyXCIpO1xuICAgIHZhciBjdHgyID0gY2FudmFzMi5nZXRDb250ZXh0KFwiMmRcIik7XG4gICAgY2FudmFzMi53aWR0aCA9IENBTlZBUzJfV0lEVEg7XG4gICAgY2FudmFzMi5oZWlnaHQgPSBDQU5WQVMyX0hFSUdIVDtcbiAgICB2YXIgZ2FtZSA9IG5ldyBHYW1lKGN0eCwgY3R4Mik7XG4gICAgZ2FtZS5hbmltYXRlKDApO1xufSk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=