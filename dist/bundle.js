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
    PREPARING: 5
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
        var layer2 = new _Layer__WEBPACK_IMPORTED_MODULE_1__.Layer(this, this.imageLayer2, 0.3);
        this.imageLayer3 = new Image(60, 40);
        this.imageLayer3.src = "assets/img/background/plx-3.png";
        var layer3 = new _Layer__WEBPACK_IMPORTED_MODULE_1__.Layer(this, this.imageLayer3, 0.4);
        this.imageLayer4 = new Image(60, 40);
        this.imageLayer4.src = "assets/img/background/plx-4.png";
        var layer4 = new _Layer__WEBPACK_IMPORTED_MODULE_1__.Layer(this, this.imageLayer4, 0.6);
        this.imageLayer5 = new Image(60, 40);
        this.imageLayer5.src = "assets/img/background/plx-5.png";
        var layer5 = new _Layer__WEBPACK_IMPORTED_MODULE_1__.Layer(this, this.imageLayer5, 0.9);
        this.imageGround = new Image(60, 40);
        this.imageGround.src = "assets/img/background/ground.png";
        var layerGround = new _Layer__WEBPACK_IMPORTED_MODULE_1__.Layer(this, this.imageGround, 1);
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
/* harmony export */   Enemy: () => (/* binding */ Enemy),
/* harmony export */   RedBoar: () => (/* binding */ RedBoar)
/* harmony export */ });
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
var Enemy = /** @class */ (function () {
    function Enemy(game) {
        this.game = game;
        this.width = 60; // displayed width
        this.height = 60; // displayed height
        this.x = this.game.width;
        this.yOffset = -17; // account for character offset on sprite
        this.y = this.game.height - this.height + this.yOffset;
        this.speedX = 2;
        this.weight = 0.2;
        this.hurt = false;
        this.hurtTimer = 0;
        this.deathTimer = 700;
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
        this.hitboxYOffset = 1.6;
        this.markedForDeletion = false;
        this.animation = "running";
        this.facing = "L";
        this.hasGrunted = false;
        this.deathSounds = this.game.boarDeathSounds;
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
        this.prepareImages();
    }
    Enemy.prototype.prepareImages = function () {
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
    };
    Enemy.prototype.playSound = function () {
        if (!this.hasGrunted) {
            this.hasGrunted = true;
            var sound = Math.floor(Math.random() * this.deathSounds.length);
            this.deathSounds[sound].play();
        }
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
            this.game.player.checkGainLife();
        }
    };
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
    Enemy.prototype.animateSpritesheet = function (deltaTime) {
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
    };
    Enemy.prototype.movement = function () {
        // horizontal movement
        if (this.game.player.x === this.game.player.rightLimit &&
            this.game.player.speedX !== 0) {
            this.x -=
                (this.speedX + this.game.player.speedX) *
                    this.game.speed *
                    (this.game.deltaTime / 8);
        }
        else {
            this.x -= this.speedX * this.game.speed * (this.game.deltaTime / 6);
        }
    };
    Enemy.prototype.update = function (deltaTime) {
        this.movement();
        this.animateSpritesheet(deltaTime);
        this.checkForCoward();
        if (this.hurt) {
            this.hurtTimer += this.game.deltaTime;
            if (this.hurtTimer >= this.deathTimer) {
                this.markedForDeletion = true;
            }
        }
        this.checkForDeletion();
    };
    return Enemy;
}());

var RedBoar = /** @class */ (function (_super) {
    __extends(RedBoar, _super);
    function RedBoar(game) {
        var _this = _super.call(this, game) || this;
        _this.speedX = 3;
        return _this;
    }
    RedBoar.prototype.checkForDeletion = function () {
        this.game.reduceEnemyInterval();
        if (this.x < 0 - this.width) {
            this.markedForDeletion = true;
            this.game.score++;
        }
    };
    RedBoar.prototype.update = function (deltaTime) {
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
        if (this.game.player.x !== this.game.player.rightLimit) {
            this.x -= this.speedX * this.game.speed;
        }
        else {
            this.x -= (this.speedX + this.game.player.speedX) * this.game.speed;
        }
        this.checkForDeletion();
        this.checkForCoward();
    };
    return RedBoar;
}(Enemy));



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
        this.animateGameOver = function (timeStamp) {
            _this.deltaTime = timeStamp - _this.lastTime;
            _this.lastTime = timeStamp;
            _this.lastFrame += _this.deltaTime;
            if (_this.player.currentState.state !== "PREPARING") {
                _this.player.setState(_const_const__WEBPACK_IMPORTED_MODULE_0__.STATES.PREPARING);
            }
            _this.player.update(_this.input, _this.deltaTime);
            _this.grayscaleCanvas();
            _this.animateHUD();
            if (_this.gameOver && _this.gameStarted)
                requestAnimationFrame(_this.animateGameOver);
        };
        this.animatePreparation = function (timeStamp) {
            _this.deltaTime = timeStamp - _this.lastTime;
            _this.lastTime = timeStamp;
            if (!_this.musicStarted && _this.player.traveledX !== 0) {
                _this.playMusic();
                _this.musicStarted = true;
            }
            _this.context.clearRect(0, 0, _this.width, _this.height);
            _this.background.draw(_this.context);
            _this.background.update();
            _this.player.draw(_this.context);
            _this.player.update(_this.input, _this.deltaTime);
            _this.animateHUD();
            if (!_this.gameStarted) {
                requestAnimationFrame(_this.animatePreparation);
            }
            else {
                _this.animate(0);
            }
        };
        this.animate = function (timeStamp) {
            _this.deltaTime = timeStamp - _this.lastTime;
            _this.lastTime = timeStamp;
            _this.lastFrame += _this.deltaTime;
            if (!_this.musicStarted && _this.player.traveledX !== 0) {
                _this.playMusic();
                _this.musicStarted = true;
            }
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
            _this.animateHUD();
            if (_this.gameOver) {
                _this.animateGameOver(0);
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
        this.gameStarted = false;
        this.victory = false;
        this.spanScore = document.getElementById("spanScore");
        this.heartImages = this.prepareHUDImages("heart");
        this.framerate = 200;
        this.lastFrame = 0;
        this.lastScore = 0;
        this.musicStarted = false;
        this.music = new Audio("assets/audio/background/ambient_forest.mp3");
        this.boarDeathSounds = [
            new Audio("assets/audio/boar/boar_grunt1.mp3"),
            new Audio("assets/audio/boar/boar_grunt2.mp3"),
            new Audio("assets/audio/boar/boar_grunt3.mp3"),
            new Audio("assets/audio/boar/boar_grunt4.mp3"),
            new Audio("assets/audio/boar/boar_grunt5.mp3"),
            new Audio("assets/audio/boar/boar_death1.mp3"),
            new Audio("assets/audio/boar/boar_death2.mp3"),
            new Audio("assets/audio/boar/boar_death3.mp3"),
            new Audio("assets/audio/boar/boar_death4.mp3"),
        ];
        this.input = new _InputHandler__WEBPACK_IMPORTED_MODULE_3__.InputHandler(this);
        this.background = new _Background__WEBPACK_IMPORTED_MODULE_1__.Background();
        this.player = new _Player__WEBPACK_IMPORTED_MODULE_4__.Player(this);
        this.playerLastHealth = this.player.startingHealthpoints;
    }
    Game.prototype.resetGame = function () {
        this.context.clearRect(0, 0, this.width, this.height);
        this.enemies = [];
        this.input = new _InputHandler__WEBPACK_IMPORTED_MODULE_3__.InputHandler(this);
        this.background = new _Background__WEBPACK_IMPORTED_MODULE_1__.Background();
        this.player.healthpoints = 6;
        this.player.x = this.player.game.width / 3 - this.player.width / 2;
        this.player.y = this.player.groundLimit;
        this.player.lastJump = this.player.jumpCooldown;
        this.player.lastAttack = 0;
        this.player.attackIndicated = true;
        this.player.currentState = this.player.states[_const_const__WEBPACK_IMPORTED_MODULE_0__.STATES.PREPARING];
        this.player.facing = "R"; // R = right, L = left
        this.player.animation = "still";
        this.gameOver = false;
        this.gameStarted = false;
        this.enemyInterval = 1000;
        this.score = 0;
        this.animatePreparation(0);
    };
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
    Game.prototype.playMusic = function () {
        this.music.play();
        this.music.addEventListener("ended", function () {
            this.currentTime = 0;
            this.play();
        }, false);
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
    Game.prototype.reduceEnemyInterval = function () {
        if (this.score > this.lastScore + 5) {
            this.lastScore = this.score;
            this.enemyInterval *= 0.9;
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
    Game.prototype.displayGameOver = function () {
        this.context2.clearRect(_const_const__WEBPACK_IMPORTED_MODULE_0__.CANVAS2_WIDTH / 3, 0, _const_const__WEBPACK_IMPORTED_MODULE_0__.CANVAS2_WIDTH, _const_const__WEBPACK_IMPORTED_MODULE_0__.CANVAS2_HEIGHT);
        this.context2.font = "40px silkscreen";
        this.context2.fillStyle = "darkred";
        this.context2.fillText("GAME OVER !", _const_const__WEBPACK_IMPORTED_MODULE_0__.CANVAS2_WIDTH * 0.5 - 50, _const_const__WEBPACK_IMPORTED_MODULE_0__.CANVAS2_HEIGHT * 0.33);
        this.context2.fillText("PRESS R TO RESTART", _const_const__WEBPACK_IMPORTED_MODULE_0__.CANVAS2_WIDTH * 0.5 - 150, _const_const__WEBPACK_IMPORTED_MODULE_0__.CANVAS2_HEIGHT * 0.9);
    };
    Game.prototype.displayHearts = function () {
        var updateHearts = this.playerLastHealth !== this.player.healthpoints;
        if (updateHearts ||
            this.player.healthpoints === 0 ||
            this.lastTime < 1000) {
            this.playerLastHealth = this.player.healthpoints;
            this.context2.clearRect(_const_const__WEBPACK_IMPORTED_MODULE_0__.CANVAS2_WIDTH / 3, 0, _const_const__WEBPACK_IMPORTED_MODULE_0__.CANVAS2_WIDTH, _const_const__WEBPACK_IMPORTED_MODULE_0__.CANVAS2_HEIGHT);
            var fullHearts = Math.floor(this.player.healthpoints / 2);
            var halfHeart = this.player.healthpoints % 2 === 1 ? 1 : 0;
            var emptyHearts = this.player.startingHealthpoints / 2 - fullHearts - halfHeart;
            var imgWidth = 40;
            var imgHeight = 40;
            var drawnHearts = 0;
            for (var i = 0; i < this.player.startingHealthpoints / 2; i++) {
                var index = drawnHearts <= 8 ? i : i - 9;
                var positionY = drawnHearts > 8
                    ? _const_const__WEBPACK_IMPORTED_MODULE_0__.CANVAS2_HEIGHT / 1.5 - imgWidth / 2
                    : _const_const__WEBPACK_IMPORTED_MODULE_0__.CANVAS2_HEIGHT / 3 - imgWidth / 2;
                // positionX = ( sizeCanvas - ( sizeImage * numberImages ) / 2 ) + ( indexImage * sizeImage )
                var positionX = _const_const__WEBPACK_IMPORTED_MODULE_0__.CANVAS2_WIDTH - imgWidth * 10 + index * imgWidth;
                if (fullHearts > 0) {
                    fullHearts--;
                    this.context2.drawImage(this.heartImages[_const_const__WEBPACK_IMPORTED_MODULE_0__.IMG_HEARTS.FULL], positionX, positionY, imgWidth, imgHeight);
                    drawnHearts++;
                }
                else if (halfHeart > 0) {
                    halfHeart--;
                    this.context2.drawImage(this.heartImages[_const_const__WEBPACK_IMPORTED_MODULE_0__.IMG_HEARTS.HALF], positionX, positionY, imgWidth, imgHeight);
                    drawnHearts++;
                }
                else if (emptyHearts > 0) {
                    emptyHearts--;
                    this.context2.drawImage(this.heartImages[_const_const__WEBPACK_IMPORTED_MODULE_0__.IMG_HEARTS.EMPTY], positionX, positionY, imgWidth, imgHeight);
                    drawnHearts++;
                }
            }
        }
    };
    Game.prototype.displayCommands = function () {
        this.context2.clearRect(0, 0, this.width, this.height);
        this.context2.font = "40px silkscreen";
        this.context2.fillStyle = "green";
        this.context2.fillText("MOVE WITH ARROWS", _const_const__WEBPACK_IMPORTED_MODULE_0__.CANVAS2_WIDTH * 0.5 - 230, _const_const__WEBPACK_IMPORTED_MODULE_0__.CANVAS2_HEIGHT * 0.75);
        this.context2.fillText("ATTACK WITH A", _const_const__WEBPACK_IMPORTED_MODULE_0__.CANVAS2_WIDTH * 0.5 - 180, _const_const__WEBPACK_IMPORTED_MODULE_0__.CANVAS2_HEIGHT * 0.25);
        this.context.font = "40px silkscreen";
        this.context.fillStyle = "black";
        this.context.fillText("PRESS R TO START", _const_const__WEBPACK_IMPORTED_MODULE_0__.CANVAS_WIDTH * 0.5 - 210, _const_const__WEBPACK_IMPORTED_MODULE_0__.CANVAS_HEIGHT * 0.25);
    };
    Game.prototype.displayStatusText = function () {
        this.context2.clearRect(0, 0, this.width / 3, this.height);
        this.context2.font = "40px silkscreen";
        if (this.score >= 400) {
            this.context2.fillStyle = "deeppink";
        }
        else if (this.score >= 300) {
            this.context2.fillStyle = "darkorange";
        }
        else if (this.score >= 200) {
            this.context2.fillStyle = "darkmagenta";
        }
        else if (this.score >= 100) {
            this.context2.fillStyle = "dodgerblue";
        }
        else if (this.score >= 50) {
            this.context2.fillStyle = "forestgreen";
        }
        else {
            this.context2.fillStyle = "white";
        }
        this.context2.fillText("".concat(this.score.toString()), _const_const__WEBPACK_IMPORTED_MODULE_0__.CANVAS2_WIDTH / 6 - 70, _const_const__WEBPACK_IMPORTED_MODULE_0__.CANVAS2_HEIGHT / 3 + 13);
        this.context2.font = "25px silkscreen";
        this.context2.fillText("score", _const_const__WEBPACK_IMPORTED_MODULE_0__.CANVAS2_WIDTH / 6 - 70, _const_const__WEBPACK_IMPORTED_MODULE_0__.CANVAS2_HEIGHT * 0.75 + 13);
    };
    Game.prototype.animateHUD = function () {
        if (this.gameOver) {
            this.displayGameOver();
        }
        else if (this.player.currentState.state === "PREPARING") {
            this.displayCommands();
        }
        else {
            this.displayHearts();
            this.displayStatusText();
        }
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
        this.listenedKeys = ["ArrowDown", "ArrowUp", "ArrowLeft", "ArrowRight", "a", "r"];
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
        this.readyToGainLife = true;
        this.width = 66; // displayed width
        this.height = 61; // displayed height
        this.leftLimit = this.game.width / 5;
        this.rightLimit = this.game.width - this.game.width / 5 - this.width;
        this.yOffset = -22; // account for character position offset on spritesheet
        this.groundLimit = this.game.height - this.height + this.yOffset;
        this.x = this.game.width / 3 - this.width / 2;
        this.y = this.groundLimit;
        this.speedX = 0;
        this.speedXModifier = 4;
        this.speedXAirModifier = 5;
        this.traveledX = 0;
        this.speedY = 0;
        this.jumpCooldown = 500;
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
        this.attackCooldown = 1500;
        this.lastAttack = 0;
        this.attackDuration = 500;
        this.soundAxeReady = new Audio("assets/audio/axe/axe_unsheath.mp3");
        this.soundAxeHit = new Audio("assets/audio/axe/axe_hit.mp3");
        this.attackIndicated = true;
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
            new _States__WEBPACK_IMPORTED_MODULE_1__.Preparing(this.game),
        ];
        this.currentState = this.states[_const_const__WEBPACK_IMPORTED_MODULE_0__.STATES.PREPARING];
        this.specialStates = ["JUMPING", "ATTACKING", "FALLING", "PREPARING"];
    }
    Player.prototype.draw = function (context) {
        // see https://www.youtube.com/watch?v=7JtLHJbm0kA&t=830s
        if (this.game.debug) {
            context.beginPath();
            context.arc(this.hitboxXCenter, this.hitboxYCenter, this.hitboxRadius, 0, Math.PI * 2);
            context.stroke();
            context.beginPath();
            context.moveTo(this.rightLimit + 48, 0);
            context.lineTo(this.rightLimit + 48, this.game.height);
            context.moveTo(this.leftLimit + 15, 0);
            context.lineTo(this.leftLimit + 15, this.game.height);
            context.stroke();
        }
        context.drawImage(this.images[this.animation][this.facing], this.frameCol * this.sourceWidth, // sx
        this.frameRow * this.sourceHeight, // sy
        this.width, // sw
        this.height, // sh
        this.x, this.y, this.width, this.height);
    };
    Player.prototype.handleInput = function (input) {
        // ----- MOVEMENT
        // horizontal movement
        if (input.keys.includes("ArrowRight")) {
            if (this.onGround())
                this.game.player.setState(_const_const__WEBPACK_IMPORTED_MODULE_0__.STATES.RUNNING);
            this.game.player.facing = "R";
            this.game.player.speedX =
                this.game.player.speedXModifier * this.game.speed;
        }
        else if (input.keys.includes("ArrowLeft")) {
            if (this.onGround())
                this.game.player.setState(_const_const__WEBPACK_IMPORTED_MODULE_0__.STATES.RUNNING);
            this.game.player.facing = "L";
            this.game.player.speedX =
                -this.game.player.speedXModifier * this.game.speed;
        }
        else {
            this.speedX = 0;
        }
        // vertical movement
        if (input.keys.includes("ArrowUp") &&
            this.onGround() &&
            this.lastJump > this.jumpCooldown) {
            this.game.player.setState(_const_const__WEBPACK_IMPORTED_MODULE_0__.STATES.JUMPING);
            this.lastJump = 0;
            this.speedY -= 20;
        }
        this.x += this.speedX * (this.game.deltaTime / 8);
        this.y += this.speedY * (this.game.deltaTime / 10);
        if (!this.onGround()) {
            this.speedY += this.weight * (this.game.deltaTime / 10);
        }
        else {
            this.speedY = 0;
        }
        // ----- STATES
        if (this.currentState.state === "JUMPING" && this.speedY > this.weight) {
            this.setState(_const_const__WEBPACK_IMPORTED_MODULE_0__.STATES.FALLING);
        }
        if ((input.keys.includes("a") || input.keys.includes("ArrowDown")) &&
            this.lastAttack <= this.game.deltaTime) {
            this.setState(_const_const__WEBPACK_IMPORTED_MODULE_0__.STATES.ATTACKING);
        }
        if (this.onGround() &&
            this.currentState.state !== "ATTACKING" &&
            this.speedX === 0) {
            this.setState(_const_const__WEBPACK_IMPORTED_MODULE_0__.STATES.STILL);
        }
    };
    Player.prototype.checkBoundaries = function () {
        // horizontal boundaries
        if (this.x < this.leftLimit) {
            this.x = this.leftLimit;
            this.game.background.speedX =
                -(this.speedX * this.game.speed) * (this.game.deltaTime / 10);
        }
        else if (this.x > this.rightLimit) {
            this.x = this.rightLimit;
            this.game.background.speedX =
                -this.speedX * this.game.speed * (this.game.deltaTime / 10);
        }
        else {
            this.game.background.speedX = 0;
        }
        // vertical boundaries
        if (this.y > this.groundLimit)
            this.y = this.groundLimit;
    };
    Player.prototype.animateSpritesheet = function (deltaTime) {
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
    Player.prototype.update = function (input, deltaTime) {
        if (this.game.debug) {
            console.log("this.currentState :>> ", this.currentState);
            console.log("this.speedX :>> ", this.speedX);
            console.log("this.speedY :>> ", this.speedY);
            console.log("this.traveledX :>> ", this.traveledX);
        }
        this.lastAttack -= deltaTime;
        this.lastJump += deltaTime;
        this.traveledX += this.speedX;
        // if not in special state (attacking, jumping), using generic inputs from player
        if (this.specialStates.includes(this.currentState.state)) {
            this.currentState.handleInput(input);
        }
        else {
            this.handleInput(input);
        }
        if (!this.attackIndicated && this.lastAttack - 200 <= this.game.deltaTime) {
            this.soundAxeReady.play();
            this.attackIndicated = true;
        }
        this.checkCollision();
        this.checkBoundaries();
        this.animateSpritesheet(deltaTime);
        if (this.healthpoints <= 0 && this.game.gameStarted)
            this.game.gameOver = true;
    };
    Player.prototype.checkGainLife = function () {
        if (this.readyToGainLife &&
            this.game.score >= 10 &&
            (this.game.score % 10 === 0 || this.game.score % 10 === 1)) {
            this.healthpoints += 1;
            this.readyToGainLife = false;
            if (this.healthpoints > this.startingHealthpoints) {
                this.startingHealthpoints = this.healthpoints;
            }
            this.game.displayHearts();
        }
        else {
            this.readyToGainLife = true;
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
                    if (!enemy.hurt) {
                        _this.game.score += 2;
                        _this.checkGainLife();
                    }
                    enemy.hurt = true;
                    enemy.frame = 0;
                    enemy.animation = "dying";
                    enemy.playSound();
                    while (enemy.speedX > enemy.weight) {
                        enemy.speedX -= enemy.weight * 0.9;
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
/* harmony export */   Preparing: () => (/* binding */ Preparing),
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
    Still.prototype.handleInput = function (input) { };
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
    Running.prototype.handleInput = function (input) { };
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
    };
    Jumping.prototype.handleInput = function (input) {
        // when jumping : attack allowed, horizontal speed increased
        // horizontal movement
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
        else {
            this.game.player.speedX = 0;
        }
        // update position
        this.game.player.x += this.game.player.speedX * (this.game.deltaTime / 8);
        this.game.player.y += this.game.player.speedY * (this.game.deltaTime / 10);
        if ((input.keys.includes("a") || input.keys.includes("ArrowDown")) &&
            this.game.player.lastAttack <= this.game.deltaTime) {
            this.game.player.setState(_const_const__WEBPACK_IMPORTED_MODULE_0__.STATES.ATTACKING);
        }
        // adding weight gradually
        if (!this.game.player.onGround()) {
            this.game.player.speedY +=
                this.game.player.weight * (this.game.deltaTime / 10);
        }
        // switch to falling state
        if (this.game.player.speedY > this.game.player.weight) {
            this.game.player.setState(_const_const__WEBPACK_IMPORTED_MODULE_0__.STATES.FALLING);
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
        // when falling : attack allowed, horizontal speed increased
        // horizontal movement (speedXAirModifier)
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
        else {
            this.game.player.speedX = 0;
        }
        // update position
        this.game.player.x += this.game.player.speedX * (this.game.deltaTime / 8);
        this.game.player.y += this.game.player.speedY * (this.game.deltaTime / 10);
        if ((input.keys.includes("a") || input.keys.includes("ArrowDown")) &&
            this.game.player.lastAttack <= this.game.deltaTime) {
            this.game.player.setState(_const_const__WEBPACK_IMPORTED_MODULE_0__.STATES.ATTACKING);
        }
        // adding weight gradually, stop on ground
        if (!this.game.player.onGround()) {
            this.game.player.speedY +=
                this.game.player.weight * (this.game.deltaTime / 10);
        }
        else {
            this.game.player.speedY = 0;
        }
        // return to still state
        if (this.game.player.onGround() &&
            this.game.player.currentState.state !== "ATTACKING") {
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
        this.game.player.lastAttack = this.game.player.attackCooldown;
        this.game.player.attackIndicated = false;
        this.game.player.soundAxeHit.play();
        this.attackTimer = this.game.player.attackDuration;
    };
    Attacking.prototype.handleInput = function (input) {
        // remains in attacking state for duration = attackTimer
        this.attackTimer -= this.game.deltaTime;
        if (this.attackTimer <= this.game.deltaTime) {
            this.game.player.setState(_const_const__WEBPACK_IMPORTED_MODULE_0__.STATES.STILL);
        }
        // horizontal movement
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
        else {
            this.game.player.speedX = 0;
        }
        // vertical movement
        if (!this.game.player.onGround()) {
            this.game.player.speedY +=
                this.game.player.weight * (this.game.deltaTime / 10);
        }
        else {
            this.game.player.speedY = 0;
        }
        if (input.keys.includes("ArrowUp") &&
            this.game.player.lastJump > this.game.player.jumpCooldown) {
            this.game.player.lastJump = 0;
            this.game.player.speedY -= 20;
        }
        // update position
        this.game.player.x += this.game.player.speedX * (this.game.deltaTime / 8);
        this.game.player.y += this.game.player.speedY * (this.game.deltaTime / 10);
    };
    return Attacking;
}(State));
var Preparing = /** @class */ (function (_super) {
    __extends(Preparing, _super);
    function Preparing(game) {
        var _this = _super.call(this, "PREPARING") || this;
        _this.game = game;
        return _this;
    }
    Preparing.prototype.enter = function () {
        this.game.player.animation = "still";
    };
    Preparing.prototype.handleInput = function (input) {
        this.attackTimer -= this.game.deltaTime;
        // special state before game starts
        if (input.keys.includes("r")) {
            if (this.game.gameOver === true) {
                this.game.resetGame();
            }
            else {
                this.game.context.clearRect(0, 0, this.game.width, this.game.height);
                this.game.gameStarted = true;
                this.game.player.setState(_const_const__WEBPACK_IMPORTED_MODULE_0__.STATES.STILL);
            }
        }
        // horizontal movement (speedXAirModifier)
        if (input.keys.includes("ArrowRight")) {
            this.game.player.facing = "R";
            this.game.player.animation = "running";
            this.game.player.speedX =
                this.game.player.speedXModifier * this.game.speed;
        }
        else if (input.keys.includes("ArrowLeft")) {
            this.game.player.facing = "L";
            this.game.player.animation = "running";
            this.game.player.speedX =
                -this.game.player.speedXModifier * this.game.speed;
        }
        else {
            this.game.player.speedX = 0;
        }
        // jump
        if (input.keys.includes("ArrowUp") &&
            this.game.player.lastJump > this.game.player.jumpCooldown) {
            this.game.player.lastJump = 0;
            this.game.player.speedY -= 20;
        }
        // update position
        this.game.player.x += this.game.player.speedX * (this.game.deltaTime / 8);
        this.game.player.y += this.game.player.speedY * (this.game.deltaTime / 10);
        if (!this.game.player.onGround()) {
            this.game.player.speedY +=
                this.game.player.weight * (this.game.deltaTime / 10);
        }
        else {
            this.game.player.speedY = 0;
        }
        // attack
        if ((input.keys.includes("a") || input.keys.includes("ArrowDown")) &&
            this.game.player.lastAttack <= this.game.deltaTime &&
            this.game.player.animation !== "attacking") {
            this.game.player.frame = 0;
            this.game.player.animation = "attacking";
            this.game.player.lastAttack = this.game.player.attackCooldown;
            this.game.player.attackIndicated = false;
            this.game.player.soundAxeHit.play();
            this.attackTimer = this.game.player.attackDuration;
        }
        if (this.attackTimer <= this.game.deltaTime) {
            this.game.player.animation = "still";
            this.attackTimer = this.game.player.attackDuration;
        }
        if (this.game.player.speedX === 0 &&
            this.game.player.animation !== "attacking") {
            this.game.player.animation = "still";
        }
    };
    return Preparing;
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
    game.animatePreparation(0);
});

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQzBGOzs7Ozs7Ozs7Ozs7Ozs7OztBQ2pCN0I7QUFDN0I7QUFDaEM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsc0RBQVk7QUFDakMsc0JBQXNCLHVEQUFhO0FBQ25DO0FBQ0E7QUFDQTtBQUNBLHlCQUF5Qix5Q0FBSztBQUM5QjtBQUNBO0FBQ0EseUJBQXlCLHlDQUFLO0FBQzlCO0FBQ0E7QUFDQSx5QkFBeUIseUNBQUs7QUFDOUI7QUFDQTtBQUNBLHlCQUF5Qix5Q0FBSztBQUM5QjtBQUNBO0FBQ0EseUJBQXlCLHlDQUFLO0FBQzlCO0FBQ0E7QUFDQSw4QkFBOEIseUNBQUs7QUFDbkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsQ0FBQztBQUNxQjs7Ozs7Ozs7Ozs7Ozs7OztBQ3pDdEIsaUJBQWlCLFNBQUksSUFBSSxTQUFJO0FBQzdCO0FBQ0E7QUFDQSxlQUFlLGdCQUFnQixzQ0FBc0Msa0JBQWtCO0FBQ3ZGLDhCQUE4QjtBQUM5QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0I7QUFDeEI7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSx5QkFBeUI7QUFDekIsMEJBQTBCO0FBQzFCO0FBQ0EsNEJBQTRCO0FBQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhCQUE4QjtBQUM5Qiw4QkFBOEI7QUFDOUIsZ0NBQWdDO0FBQ2hDLGlDQUFpQztBQUNqQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ2dCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FB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LENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQ0FBc0MsZ0RBQU07QUFDNUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNDQUFzQyxnREFBTTtBQUM1QztBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQ0FBc0MsZ0RBQU07QUFDNUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0NBQXNDLGdEQUFNO0FBQzVDO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNDQUFzQyxnREFBTTtBQUM1QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBDQUEwQyxnREFBTTtBQUNoRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDd0U7Ozs7Ozs7VUNqUnpFO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7O0FDTkE7QUFDQTtBQUNBO0FBQzJGO0FBQ3ZEO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLHNEQUFZO0FBQy9CLG9CQUFvQix1REFBYTtBQUNqQztBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsdURBQWE7QUFDakMscUJBQXFCLHdEQUFjO0FBQ25DLG1CQUFtQiw2Q0FBSTtBQUN2QjtBQUNBLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9Hb2JsaW5fU2lkZXNjcm9sbGVyLy4vY29uc3QvY29uc3QudHMiLCJ3ZWJwYWNrOi8vR29ibGluX1NpZGVzY3JvbGxlci8uL21vZGVsL0JhY2tncm91bmQudHMiLCJ3ZWJwYWNrOi8vR29ibGluX1NpZGVzY3JvbGxlci8uL21vZGVsL0VuZW15LnRzIiwid2VicGFjazovL0dvYmxpbl9TaWRlc2Nyb2xsZXIvLi9tb2RlbC9HYW1lLnRzIiwid2VicGFjazovL0dvYmxpbl9TaWRlc2Nyb2xsZXIvLi9tb2RlbC9JbnB1dEhhbmRsZXIudHMiLCJ3ZWJwYWNrOi8vR29ibGluX1NpZGVzY3JvbGxlci8uL21vZGVsL0xheWVyLnRzIiwid2VicGFjazovL0dvYmxpbl9TaWRlc2Nyb2xsZXIvLi9tb2RlbC9QbGF5ZXIudHMiLCJ3ZWJwYWNrOi8vR29ibGluX1NpZGVzY3JvbGxlci8uL21vZGVsL1N0YXRlcy50cyIsIndlYnBhY2s6Ly9Hb2JsaW5fU2lkZXNjcm9sbGVyL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL0dvYmxpbl9TaWRlc2Nyb2xsZXIvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL0dvYmxpbl9TaWRlc2Nyb2xsZXIvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9Hb2JsaW5fU2lkZXNjcm9sbGVyL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vR29ibGluX1NpZGVzY3JvbGxlci8uL3NjcmlwdC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgQ0FOVkFTX1dJRFRIID0gNzY4O1xudmFyIENBTlZBU19IRUlHSFQgPSA0MzI7XG52YXIgQ0FOVkFTMl9XSURUSCA9IDc2ODtcbnZhciBDQU5WQVMyX0hFSUdIVCA9IDEwODtcbnZhciBTVEFURVMgPSB7XG4gICAgU1RJTEw6IDAsXG4gICAgUlVOTklORzogMSxcbiAgICBKVU1QSU5HOiAyLFxuICAgIEZBTExJTkc6IDMsXG4gICAgQVRUQUNLSU5HOiA0LFxuICAgIFBSRVBBUklORzogNVxufTtcbnZhciBJTUdfSEVBUlRTID0ge1xuICAgIEZVTEw6IDAsXG4gICAgSEFMRjogMSxcbiAgICBFTVBUWTogMixcbn07XG5leHBvcnQgeyBDQU5WQVNfV0lEVEgsIENBTlZBU19IRUlHSFQsIENBTlZBUzJfV0lEVEgsIENBTlZBUzJfSEVJR0hULCBTVEFURVMsIElNR19IRUFSVFMgfTtcbiIsImltcG9ydCB7IENBTlZBU19XSURUSCwgQ0FOVkFTX0hFSUdIVCB9IGZyb20gXCIuLi9jb25zdC9jb25zdFwiO1xuaW1wb3J0IHsgTGF5ZXIgfSBmcm9tIFwiLi9MYXllclwiO1xudmFyIEJhY2tncm91bmQgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gQmFja2dyb3VuZCgpIHtcbiAgICAgICAgdGhpcy54ID0gMDtcbiAgICAgICAgdGhpcy55ID0gMDtcbiAgICAgICAgdGhpcy53aWR0aCA9IENBTlZBU19XSURUSDtcbiAgICAgICAgdGhpcy5oZWlnaHQgPSBDQU5WQVNfSEVJR0hUO1xuICAgICAgICB0aGlzLnNwZWVkWCA9IDA7XG4gICAgICAgIHRoaXMuaW1hZ2VMYXllcjEgPSBuZXcgSW1hZ2UoNjAsIDQwKTtcbiAgICAgICAgdGhpcy5pbWFnZUxheWVyMS5zcmMgPSBcImFzc2V0cy9pbWcvYmFja2dyb3VuZC9wbHgtMS5wbmdcIjtcbiAgICAgICAgdmFyIGxheWVyMSA9IG5ldyBMYXllcih0aGlzLCB0aGlzLmltYWdlTGF5ZXIxLCAwLjApO1xuICAgICAgICB0aGlzLmltYWdlTGF5ZXIyID0gbmV3IEltYWdlKDYwLCA0MCk7XG4gICAgICAgIHRoaXMuaW1hZ2VMYXllcjIuc3JjID0gXCJhc3NldHMvaW1nL2JhY2tncm91bmQvcGx4LTIucG5nXCI7XG4gICAgICAgIHZhciBsYXllcjIgPSBuZXcgTGF5ZXIodGhpcywgdGhpcy5pbWFnZUxheWVyMiwgMC4zKTtcbiAgICAgICAgdGhpcy5pbWFnZUxheWVyMyA9IG5ldyBJbWFnZSg2MCwgNDApO1xuICAgICAgICB0aGlzLmltYWdlTGF5ZXIzLnNyYyA9IFwiYXNzZXRzL2ltZy9iYWNrZ3JvdW5kL3BseC0zLnBuZ1wiO1xuICAgICAgICB2YXIgbGF5ZXIzID0gbmV3IExheWVyKHRoaXMsIHRoaXMuaW1hZ2VMYXllcjMsIDAuNCk7XG4gICAgICAgIHRoaXMuaW1hZ2VMYXllcjQgPSBuZXcgSW1hZ2UoNjAsIDQwKTtcbiAgICAgICAgdGhpcy5pbWFnZUxheWVyNC5zcmMgPSBcImFzc2V0cy9pbWcvYmFja2dyb3VuZC9wbHgtNC5wbmdcIjtcbiAgICAgICAgdmFyIGxheWVyNCA9IG5ldyBMYXllcih0aGlzLCB0aGlzLmltYWdlTGF5ZXI0LCAwLjYpO1xuICAgICAgICB0aGlzLmltYWdlTGF5ZXI1ID0gbmV3IEltYWdlKDYwLCA0MCk7XG4gICAgICAgIHRoaXMuaW1hZ2VMYXllcjUuc3JjID0gXCJhc3NldHMvaW1nL2JhY2tncm91bmQvcGx4LTUucG5nXCI7XG4gICAgICAgIHZhciBsYXllcjUgPSBuZXcgTGF5ZXIodGhpcywgdGhpcy5pbWFnZUxheWVyNSwgMC45KTtcbiAgICAgICAgdGhpcy5pbWFnZUdyb3VuZCA9IG5ldyBJbWFnZSg2MCwgNDApO1xuICAgICAgICB0aGlzLmltYWdlR3JvdW5kLnNyYyA9IFwiYXNzZXRzL2ltZy9iYWNrZ3JvdW5kL2dyb3VuZC5wbmdcIjtcbiAgICAgICAgdmFyIGxheWVyR3JvdW5kID0gbmV3IExheWVyKHRoaXMsIHRoaXMuaW1hZ2VHcm91bmQsIDEpO1xuICAgICAgICB0aGlzLmxheWVycyA9IFtsYXllcjEsIGxheWVyMiwgbGF5ZXIzLCBsYXllcjQsIGxheWVyNSwgbGF5ZXJHcm91bmRdO1xuICAgIH1cbiAgICBCYWNrZ3JvdW5kLnByb3RvdHlwZS5kcmF3ID0gZnVuY3Rpb24gKGNvbnRleHQpIHtcbiAgICAgICAgdGhpcy5sYXllcnMuZm9yRWFjaChmdW5jdGlvbiAobGF5ZXIpIHtcbiAgICAgICAgICAgIGxheWVyLmRyYXcoY29udGV4dCk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgQmFja2dyb3VuZC5wcm90b3R5cGUudXBkYXRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLmxheWVycy5mb3JFYWNoKGZ1bmN0aW9uIChsYXllcikge1xuICAgICAgICAgICAgbGF5ZXIudXBkYXRlKCk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgcmV0dXJuIEJhY2tncm91bmQ7XG59KCkpO1xuZXhwb3J0IHsgQmFja2dyb3VuZCB9O1xuIiwidmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCAoZnVuY3Rpb24gKCkge1xuICAgIHZhciBleHRlbmRTdGF0aWNzID0gZnVuY3Rpb24gKGQsIGIpIHtcbiAgICAgICAgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxuICAgICAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxuICAgICAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGIsIHApKSBkW3BdID0gYltwXTsgfTtcbiAgICAgICAgcmV0dXJuIGV4dGVuZFN0YXRpY3MoZCwgYik7XG4gICAgfTtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBiICE9PSBcImZ1bmN0aW9uXCIgJiYgYiAhPT0gbnVsbClcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDbGFzcyBleHRlbmRzIHZhbHVlIFwiICsgU3RyaW5nKGIpICsgXCIgaXMgbm90IGEgY29uc3RydWN0b3Igb3IgbnVsbFwiKTtcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbiAgICB9O1xufSkoKTtcbnZhciBFbmVteSA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBFbmVteShnYW1lKSB7XG4gICAgICAgIHRoaXMuZ2FtZSA9IGdhbWU7XG4gICAgICAgIHRoaXMud2lkdGggPSA2MDsgLy8gZGlzcGxheWVkIHdpZHRoXG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gNjA7IC8vIGRpc3BsYXllZCBoZWlnaHRcbiAgICAgICAgdGhpcy54ID0gdGhpcy5nYW1lLndpZHRoO1xuICAgICAgICB0aGlzLnlPZmZzZXQgPSAtMTc7IC8vIGFjY291bnQgZm9yIGNoYXJhY3RlciBvZmZzZXQgb24gc3ByaXRlXG4gICAgICAgIHRoaXMueSA9IHRoaXMuZ2FtZS5oZWlnaHQgLSB0aGlzLmhlaWdodCArIHRoaXMueU9mZnNldDtcbiAgICAgICAgdGhpcy5zcGVlZFggPSAyO1xuICAgICAgICB0aGlzLndlaWdodCA9IDAuMjtcbiAgICAgICAgdGhpcy5odXJ0ID0gZmFsc2U7XG4gICAgICAgIHRoaXMuaHVydFRpbWVyID0gMDtcbiAgICAgICAgdGhpcy5kZWF0aFRpbWVyID0gNzAwO1xuICAgICAgICB0aGlzLm1heEZyYW1lQ29sID0gNDsgLy8gbnVtYmVyIG9mIGNvbHVtbnMgb24gc3ByaXRlc2hlZXRcbiAgICAgICAgdGhpcy5tYXhGcmFtZVJvdyA9IDI7IC8vIG51bWJlciBvciByb3dzIG9uIHNwcml0ZXNoZWV0XG4gICAgICAgIHRoaXMuc291cmNlV2lkdGggPSAxMjQ7IC8vIHdpZHRoIG9mIGVhY2ggc3ByaXRlIG9uIHNwcml0ZXNoZWV0XG4gICAgICAgIHRoaXMuc291cmNlSGVpZ2h0ID0gMTI0OyAvLyBoZWlnaHQgb2YgZWFjaCBzcHJpdGUgb24gc3ByaXRlc2hlZXRcbiAgICAgICAgdGhpcy5mcmFtZSA9IDA7XG4gICAgICAgIHRoaXMuZnJhbWVDb2wgPSB0aGlzLmZyYW1lICUgdGhpcy5tYXhGcmFtZUNvbDtcbiAgICAgICAgdGhpcy5mcmFtZVJvdyA9IE1hdGguZmxvb3IodGhpcy5mcmFtZSAvIHRoaXMubWF4RnJhbWVDb2wpO1xuICAgICAgICB0aGlzLmZwcyA9IDE1O1xuICAgICAgICB0aGlzLmZyYW1lVGltZXIgPSAwO1xuICAgICAgICB0aGlzLmhpdGJveFJhZGl1cyA9IHRoaXMud2lkdGggLyAyLjM1O1xuICAgICAgICB0aGlzLmhpdGJveFhPZmZzZXQgPSAyO1xuICAgICAgICB0aGlzLmhpdGJveFlPZmZzZXQgPSAxLjY7XG4gICAgICAgIHRoaXMubWFya2VkRm9yRGVsZXRpb24gPSBmYWxzZTtcbiAgICAgICAgdGhpcy5hbmltYXRpb24gPSBcInJ1bm5pbmdcIjtcbiAgICAgICAgdGhpcy5mYWNpbmcgPSBcIkxcIjtcbiAgICAgICAgdGhpcy5oYXNHcnVudGVkID0gZmFsc2U7XG4gICAgICAgIHRoaXMuZGVhdGhTb3VuZHMgPSB0aGlzLmdhbWUuYm9hckRlYXRoU291bmRzO1xuICAgICAgICB0aGlzLmltYWdlcyA9IHtcbiAgICAgICAgICAgIHN0aWxsOiB7XG4gICAgICAgICAgICAgICAgTDogbnVsbCxcbiAgICAgICAgICAgICAgICBSOiBudWxsLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHJ1bm5pbmc6IHtcbiAgICAgICAgICAgICAgICBMOiBudWxsLFxuICAgICAgICAgICAgICAgIFI6IG51bGwsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdHVybmluZzoge1xuICAgICAgICAgICAgICAgIEw6IG51bGwsXG4gICAgICAgICAgICAgICAgUjogbnVsbCxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBhdHRhY2tpbmc6IHtcbiAgICAgICAgICAgICAgICBMOiBudWxsLFxuICAgICAgICAgICAgICAgIFI6IG51bGwsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgaHVydDoge1xuICAgICAgICAgICAgICAgIEw6IG51bGwsXG4gICAgICAgICAgICAgICAgUjogbnVsbCxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBkeWluZzoge1xuICAgICAgICAgICAgICAgIEw6IG51bGwsXG4gICAgICAgICAgICAgICAgUjogbnVsbCxcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMucHJlcGFyZUltYWdlcygpO1xuICAgIH1cbiAgICBFbmVteS5wcm90b3R5cGUucHJlcGFyZUltYWdlcyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5pbWFnZXMuc3RpbGwuTCA9IG5ldyBJbWFnZSg2MCwgNDUpO1xuICAgICAgICB0aGlzLmltYWdlcy5zdGlsbC5MLnNyYyA9XG4gICAgICAgICAgICBcImFzc2V0cy9pbWcvY2hhcmFjdGVycy9ib2FyL2JvYXJfc3RpbGxfTF9zcHJpdGVzaGVldC5wbmdcIjtcbiAgICAgICAgdGhpcy5pbWFnZXMuc3RpbGwuUiA9IG5ldyBJbWFnZSg2MCwgNDUpO1xuICAgICAgICB0aGlzLmltYWdlcy5zdGlsbC5SLnNyYyA9XG4gICAgICAgICAgICBcImFzc2V0cy9pbWcvY2hhcmFjdGVycy9ib2FyL2JvYXJfc3RpbGxfUl9zcHJpdGVzaGVldC5wbmdcIjtcbiAgICAgICAgdGhpcy5pbWFnZXMucnVubmluZy5MID0gbmV3IEltYWdlKDYwLCA0NSk7XG4gICAgICAgIHRoaXMuaW1hZ2VzLnJ1bm5pbmcuTC5zcmMgPVxuICAgICAgICAgICAgXCJhc3NldHMvaW1nL2NoYXJhY3RlcnMvYm9hci9ib2FyX3J1bm5pbmdfTF9zcHJpdGVzaGVldC5wbmdcIjtcbiAgICAgICAgdGhpcy5pbWFnZXMucnVubmluZy5SID0gbmV3IEltYWdlKDYwLCA0NSk7XG4gICAgICAgIHRoaXMuaW1hZ2VzLnJ1bm5pbmcuUi5zcmMgPVxuICAgICAgICAgICAgXCJhc3NldHMvaW1nL2NoYXJhY3RlcnMvYm9hci9ib2FyX3J1bm5pbmdfUl9zcHJpdGVzaGVldC5wbmdcIjtcbiAgICAgICAgdGhpcy5pbWFnZXMudHVybmluZy5MID0gbmV3IEltYWdlKDYwLCA0NSk7XG4gICAgICAgIHRoaXMuaW1hZ2VzLnR1cm5pbmcuTC5zcmMgPVxuICAgICAgICAgICAgXCJhc3NldHMvaW1nL2NoYXJhY3RlcnMvYm9hci9ib2FyX3R1cm5pbmdfTF9zcHJpdGVzaGVldC5wbmdcIjtcbiAgICAgICAgdGhpcy5pbWFnZXMudHVybmluZy5SID0gbmV3IEltYWdlKDYwLCA0NSk7XG4gICAgICAgIHRoaXMuaW1hZ2VzLnR1cm5pbmcuUi5zcmMgPVxuICAgICAgICAgICAgXCJhc3NldHMvaW1nL2NoYXJhY3RlcnMvYm9hci9ib2FyX3R1cm5pbmdfUl9zcHJpdGVzaGVldC5wbmdcIjtcbiAgICAgICAgdGhpcy5pbWFnZXMuYXR0YWNraW5nLkwgPSBuZXcgSW1hZ2UoNjAsIDQ1KTtcbiAgICAgICAgdGhpcy5pbWFnZXMuYXR0YWNraW5nLkwuc3JjID1cbiAgICAgICAgICAgIFwiYXNzZXRzL2ltZy9jaGFyYWN0ZXJzL2JvYXIvYm9hcl9hdHRhY2tpbmdfTF9zcHJpdGVzaGVldC5wbmdcIjtcbiAgICAgICAgdGhpcy5pbWFnZXMuYXR0YWNraW5nLlIgPSBuZXcgSW1hZ2UoNjAsIDQ1KTtcbiAgICAgICAgdGhpcy5pbWFnZXMuYXR0YWNraW5nLlIuc3JjID1cbiAgICAgICAgICAgIFwiYXNzZXRzL2ltZy9jaGFyYWN0ZXJzL2JvYXIvYm9hcl9hdHRhY2tpbmdfUl9zcHJpdGVzaGVldC5wbmdcIjtcbiAgICAgICAgdGhpcy5pbWFnZXMuaHVydC5MID0gbmV3IEltYWdlKDYwLCA0NSk7XG4gICAgICAgIHRoaXMuaW1hZ2VzLmh1cnQuTC5zcmMgPVxuICAgICAgICAgICAgXCJhc3NldHMvaW1nL2NoYXJhY3RlcnMvYm9hci9ib2FyX2h1cnRfTF9zcHJpdGVzaGVldC5wbmdcIjtcbiAgICAgICAgdGhpcy5pbWFnZXMuaHVydC5SID0gbmV3IEltYWdlKDYwLCA0NSk7XG4gICAgICAgIHRoaXMuaW1hZ2VzLmh1cnQuUi5zcmMgPVxuICAgICAgICAgICAgXCJhc3NldHMvaW1nL2NoYXJhY3RlcnMvYm9hci9ib2FyX2h1cnRfUl9zcHJpdGVzaGVldC5wbmdcIjtcbiAgICAgICAgdGhpcy5pbWFnZXMuZHlpbmcuTCA9IG5ldyBJbWFnZSg2MCwgNDUpO1xuICAgICAgICB0aGlzLmltYWdlcy5keWluZy5MLnNyYyA9XG4gICAgICAgICAgICBcImFzc2V0cy9pbWcvY2hhcmFjdGVycy9ib2FyL2JvYXJfZHlpbmdfTF9zcHJpdGVzaGVldC5wbmdcIjtcbiAgICAgICAgdGhpcy5pbWFnZXMuZHlpbmcuUiA9IG5ldyBJbWFnZSg2MCwgNDUpO1xuICAgICAgICB0aGlzLmltYWdlcy5keWluZy5SLnNyYyA9XG4gICAgICAgICAgICBcImFzc2V0cy9pbWcvY2hhcmFjdGVycy9ib2FyL2JvYXJfZHlpbmdfUl9zcHJpdGVzaGVldC5wbmdcIjtcbiAgICB9O1xuICAgIEVuZW15LnByb3RvdHlwZS5wbGF5U291bmQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICghdGhpcy5oYXNHcnVudGVkKSB7XG4gICAgICAgICAgICB0aGlzLmhhc0dydW50ZWQgPSB0cnVlO1xuICAgICAgICAgICAgdmFyIHNvdW5kID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogdGhpcy5kZWF0aFNvdW5kcy5sZW5ndGgpO1xuICAgICAgICAgICAgdGhpcy5kZWF0aFNvdW5kc1tzb3VuZF0ucGxheSgpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBFbmVteS5wcm90b3R5cGUuY2hlY2tGb3JDb3dhcmQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh0aGlzLmdhbWUucGxheWVyLnggPT09IHRoaXMuZ2FtZS5wbGF5ZXIubGVmdExpbWl0KSB7XG4gICAgICAgICAgICB0aGlzLmZwcyA9IDIyO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5mcHMgPSAxMztcbiAgICAgICAgfVxuICAgIH07XG4gICAgRW5lbXkucHJvdG90eXBlLmNoZWNrRm9yRGVsZXRpb24gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuZ2FtZS5yZWR1Y2VFbmVteUludGVydmFsKCk7XG4gICAgICAgIGlmICh0aGlzLnggPCAwIC0gdGhpcy53aWR0aCkge1xuICAgICAgICAgICAgdGhpcy5tYXJrZWRGb3JEZWxldGlvbiA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLmdhbWUuc2NvcmUrKztcbiAgICAgICAgICAgIHRoaXMuZ2FtZS5wbGF5ZXIuY2hlY2tHYWluTGlmZSgpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBFbmVteS5wcm90b3R5cGUuZHJhdyA9IGZ1bmN0aW9uIChjb250ZXh0KSB7XG4gICAgICAgIGlmICh0aGlzLmdhbWUuZGVidWcpIHtcbiAgICAgICAgICAgIGNvbnRleHQuYmVnaW5QYXRoKCk7XG4gICAgICAgICAgICBjb250ZXh0LmFyYyh0aGlzLnggKyB0aGlzLndpZHRoIC8gdGhpcy5oaXRib3hYT2Zmc2V0LCB0aGlzLnkgKyB0aGlzLmhlaWdodCAvIHRoaXMuaGl0Ym94WU9mZnNldCwgdGhpcy5oaXRib3hSYWRpdXMsIDAsIE1hdGguUEkgKiAyKTtcbiAgICAgICAgICAgIGNvbnRleHQuc3Ryb2tlKCk7XG4gICAgICAgIH1cbiAgICAgICAgY29udGV4dC5kcmF3SW1hZ2UodGhpcy5pbWFnZXNbdGhpcy5hbmltYXRpb25dW3RoaXMuZmFjaW5nXSwgdGhpcy5mcmFtZUNvbCAqIHRoaXMuc291cmNlV2lkdGgsIC8vc3hcbiAgICAgICAgdGhpcy5mcmFtZVJvdyAqIHRoaXMuc291cmNlSGVpZ2h0LCAvL3N5XG4gICAgICAgIHRoaXMuc291cmNlV2lkdGgsIC8vc3dcbiAgICAgICAgdGhpcy5zb3VyY2VIZWlnaHQsIC8vc2hcbiAgICAgICAgdGhpcy54LCB0aGlzLnksIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0KTtcbiAgICB9O1xuICAgIEVuZW15LnByb3RvdHlwZS5hbmltYXRlU3ByaXRlc2hlZXQgPSBmdW5jdGlvbiAoZGVsdGFUaW1lKSB7XG4gICAgICAgIC8vIHVwZGF0ZSBlbmVteSBmcmFtZSBvbmx5IHdoZW4gYWJvdmUgZnBzIGludGVydmFsXG4gICAgICAgIGlmICh0aGlzLmZyYW1lVGltZXIgPiAxMDAwIC8gdGhpcy5mcHMpIHtcbiAgICAgICAgICAgIC8vIGlmIHJlYWNoZWQgZW5kIG9mIHNwcml0ZXNoZWV0LCByZXBvc2l0aW9ucyB0byBzdGFydCBvZiBzcHJpdGVzaGVldFxuICAgICAgICAgICAgaWYgKHRoaXMuZnJhbWUgPT09IHRoaXMubWF4RnJhbWVSb3cgKiB0aGlzLm1heEZyYW1lQ29sIC0gMSkge1xuICAgICAgICAgICAgICAgIHRoaXMuZnJhbWUgPSAwO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5mcmFtZSsrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5mcmFtZVRpbWVyID0gMDtcbiAgICAgICAgICAgIC8vIGN5Y2xlIHRocm91Z2ggc3ByaXRlc2hlZXQgcm93cy9jb2x1bW5zXG4gICAgICAgICAgICB0aGlzLmZyYW1lQ29sID0gdGhpcy5mcmFtZSAlIHRoaXMubWF4RnJhbWVDb2w7XG4gICAgICAgICAgICB0aGlzLmZyYW1lUm93ID0gTWF0aC5mbG9vcih0aGlzLmZyYW1lIC8gdGhpcy5tYXhGcmFtZUNvbCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmZyYW1lVGltZXIgKz0gZGVsdGFUaW1lO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBFbmVteS5wcm90b3R5cGUubW92ZW1lbnQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIC8vIGhvcml6b250YWwgbW92ZW1lbnRcbiAgICAgICAgaWYgKHRoaXMuZ2FtZS5wbGF5ZXIueCA9PT0gdGhpcy5nYW1lLnBsYXllci5yaWdodExpbWl0ICYmXG4gICAgICAgICAgICB0aGlzLmdhbWUucGxheWVyLnNwZWVkWCAhPT0gMCkge1xuICAgICAgICAgICAgdGhpcy54IC09XG4gICAgICAgICAgICAgICAgKHRoaXMuc3BlZWRYICsgdGhpcy5nYW1lLnBsYXllci5zcGVlZFgpICpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5nYW1lLnNwZWVkICpcbiAgICAgICAgICAgICAgICAgICAgKHRoaXMuZ2FtZS5kZWx0YVRpbWUgLyA4KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMueCAtPSB0aGlzLnNwZWVkWCAqIHRoaXMuZ2FtZS5zcGVlZCAqICh0aGlzLmdhbWUuZGVsdGFUaW1lIC8gNik7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIEVuZW15LnByb3RvdHlwZS51cGRhdGUgPSBmdW5jdGlvbiAoZGVsdGFUaW1lKSB7XG4gICAgICAgIHRoaXMubW92ZW1lbnQoKTtcbiAgICAgICAgdGhpcy5hbmltYXRlU3ByaXRlc2hlZXQoZGVsdGFUaW1lKTtcbiAgICAgICAgdGhpcy5jaGVja0ZvckNvd2FyZCgpO1xuICAgICAgICBpZiAodGhpcy5odXJ0KSB7XG4gICAgICAgICAgICB0aGlzLmh1cnRUaW1lciArPSB0aGlzLmdhbWUuZGVsdGFUaW1lO1xuICAgICAgICAgICAgaWYgKHRoaXMuaHVydFRpbWVyID49IHRoaXMuZGVhdGhUaW1lcikge1xuICAgICAgICAgICAgICAgIHRoaXMubWFya2VkRm9yRGVsZXRpb24gPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuY2hlY2tGb3JEZWxldGlvbigpO1xuICAgIH07XG4gICAgcmV0dXJuIEVuZW15O1xufSgpKTtcbmV4cG9ydCB7IEVuZW15IH07XG52YXIgUmVkQm9hciA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoUmVkQm9hciwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBSZWRCb2FyKGdhbWUpIHtcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcywgZ2FtZSkgfHwgdGhpcztcbiAgICAgICAgX3RoaXMuc3BlZWRYID0gMztcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICBSZWRCb2FyLnByb3RvdHlwZS5jaGVja0ZvckRlbGV0aW9uID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLmdhbWUucmVkdWNlRW5lbXlJbnRlcnZhbCgpO1xuICAgICAgICBpZiAodGhpcy54IDwgMCAtIHRoaXMud2lkdGgpIHtcbiAgICAgICAgICAgIHRoaXMubWFya2VkRm9yRGVsZXRpb24gPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5nYW1lLnNjb3JlKys7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIFJlZEJvYXIucHJvdG90eXBlLnVwZGF0ZSA9IGZ1bmN0aW9uIChkZWx0YVRpbWUpIHtcbiAgICAgICAgaWYgKHRoaXMuZnJhbWVUaW1lciA+IDEwMDAgLyB0aGlzLmZwcykge1xuICAgICAgICAgICAgLy8gaWYgcmVhY2hlZCBlbmQgb2Ygc3ByaXRlc2hlZXQsIHJlcG9zaXRpb25zIHRvIHN0YXJ0IG9mIHNwcml0ZXNoZWV0XG4gICAgICAgICAgICBpZiAodGhpcy5mcmFtZSA9PT0gdGhpcy5tYXhGcmFtZVJvdyAqIHRoaXMubWF4RnJhbWVDb2wgLSAxKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5mcmFtZSA9IDA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmZyYW1lKys7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmZyYW1lVGltZXIgPSAwO1xuICAgICAgICAgICAgLy8gY3ljbGUgdGhyb3VnaCBzcHJpdGVzaGVldCByb3dzL2NvbHVtbnNcbiAgICAgICAgICAgIHRoaXMuZnJhbWVDb2wgPSB0aGlzLmZyYW1lICUgdGhpcy5tYXhGcmFtZUNvbDtcbiAgICAgICAgICAgIHRoaXMuZnJhbWVSb3cgPSBNYXRoLmZsb29yKHRoaXMuZnJhbWUgLyB0aGlzLm1heEZyYW1lQ29sKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZnJhbWVUaW1lciArPSBkZWx0YVRpbWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuaHVydCkge1xuICAgICAgICAgICAgdGhpcy5odXJ0VGltZXIgKz0gdGhpcy5nYW1lLmRlbHRhVGltZTtcbiAgICAgICAgICAgIGlmICh0aGlzLmh1cnRUaW1lciA+PSB0aGlzLmRlYXRoVGltZXIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm1hcmtlZEZvckRlbGV0aW9uID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvLyBob3Jpem9udGFsIG1vdmVtZW50XG4gICAgICAgIGlmICh0aGlzLmdhbWUucGxheWVyLnggIT09IHRoaXMuZ2FtZS5wbGF5ZXIucmlnaHRMaW1pdCkge1xuICAgICAgICAgICAgdGhpcy54IC09IHRoaXMuc3BlZWRYICogdGhpcy5nYW1lLnNwZWVkO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy54IC09ICh0aGlzLnNwZWVkWCArIHRoaXMuZ2FtZS5wbGF5ZXIuc3BlZWRYKSAqIHRoaXMuZ2FtZS5zcGVlZDtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmNoZWNrRm9yRGVsZXRpb24oKTtcbiAgICAgICAgdGhpcy5jaGVja0ZvckNvd2FyZCgpO1xuICAgIH07XG4gICAgcmV0dXJuIFJlZEJvYXI7XG59KEVuZW15KSk7XG5leHBvcnQgeyBSZWRCb2FyIH07XG4iLCJpbXBvcnQgeyBDQU5WQVMyX0hFSUdIVCwgQ0FOVkFTMl9XSURUSCwgQ0FOVkFTX0hFSUdIVCwgQ0FOVkFTX1dJRFRILCBJTUdfSEVBUlRTLCBTVEFURVMsIH0gZnJvbSBcIi4uL2NvbnN0L2NvbnN0XCI7XG5pbXBvcnQgeyBCYWNrZ3JvdW5kIH0gZnJvbSBcIi4vQmFja2dyb3VuZFwiO1xuaW1wb3J0IHsgRW5lbXkgfSBmcm9tIFwiLi9FbmVteVwiO1xuaW1wb3J0IHsgSW5wdXRIYW5kbGVyIH0gZnJvbSBcIi4vSW5wdXRIYW5kbGVyXCI7XG5pbXBvcnQgeyBQbGF5ZXIgfSBmcm9tIFwiLi9QbGF5ZXJcIjtcbi8vIGltcG9ydCBcIi4uL3NjcmlwdHMvcmVxdWlyZS5qc1wiO1xudmFyIEdhbWUgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gR2FtZShjb250ZXh0LCBjb250ZXh0Mikge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB0aGlzLmFuaW1hdGVHYW1lT3ZlciA9IGZ1bmN0aW9uICh0aW1lU3RhbXApIHtcbiAgICAgICAgICAgIF90aGlzLmRlbHRhVGltZSA9IHRpbWVTdGFtcCAtIF90aGlzLmxhc3RUaW1lO1xuICAgICAgICAgICAgX3RoaXMubGFzdFRpbWUgPSB0aW1lU3RhbXA7XG4gICAgICAgICAgICBfdGhpcy5sYXN0RnJhbWUgKz0gX3RoaXMuZGVsdGFUaW1lO1xuICAgICAgICAgICAgaWYgKF90aGlzLnBsYXllci5jdXJyZW50U3RhdGUuc3RhdGUgIT09IFwiUFJFUEFSSU5HXCIpIHtcbiAgICAgICAgICAgICAgICBfdGhpcy5wbGF5ZXIuc2V0U3RhdGUoU1RBVEVTLlBSRVBBUklORyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBfdGhpcy5wbGF5ZXIudXBkYXRlKF90aGlzLmlucHV0LCBfdGhpcy5kZWx0YVRpbWUpO1xuICAgICAgICAgICAgX3RoaXMuZ3JheXNjYWxlQ2FudmFzKCk7XG4gICAgICAgICAgICBfdGhpcy5hbmltYXRlSFVEKCk7XG4gICAgICAgICAgICBpZiAoX3RoaXMuZ2FtZU92ZXIgJiYgX3RoaXMuZ2FtZVN0YXJ0ZWQpXG4gICAgICAgICAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKF90aGlzLmFuaW1hdGVHYW1lT3Zlcik7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuYW5pbWF0ZVByZXBhcmF0aW9uID0gZnVuY3Rpb24gKHRpbWVTdGFtcCkge1xuICAgICAgICAgICAgX3RoaXMuZGVsdGFUaW1lID0gdGltZVN0YW1wIC0gX3RoaXMubGFzdFRpbWU7XG4gICAgICAgICAgICBfdGhpcy5sYXN0VGltZSA9IHRpbWVTdGFtcDtcbiAgICAgICAgICAgIGlmICghX3RoaXMubXVzaWNTdGFydGVkICYmIF90aGlzLnBsYXllci50cmF2ZWxlZFggIT09IDApIHtcbiAgICAgICAgICAgICAgICBfdGhpcy5wbGF5TXVzaWMoKTtcbiAgICAgICAgICAgICAgICBfdGhpcy5tdXNpY1N0YXJ0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgX3RoaXMuY29udGV4dC5jbGVhclJlY3QoMCwgMCwgX3RoaXMud2lkdGgsIF90aGlzLmhlaWdodCk7XG4gICAgICAgICAgICBfdGhpcy5iYWNrZ3JvdW5kLmRyYXcoX3RoaXMuY29udGV4dCk7XG4gICAgICAgICAgICBfdGhpcy5iYWNrZ3JvdW5kLnVwZGF0ZSgpO1xuICAgICAgICAgICAgX3RoaXMucGxheWVyLmRyYXcoX3RoaXMuY29udGV4dCk7XG4gICAgICAgICAgICBfdGhpcy5wbGF5ZXIudXBkYXRlKF90aGlzLmlucHV0LCBfdGhpcy5kZWx0YVRpbWUpO1xuICAgICAgICAgICAgX3RoaXMuYW5pbWF0ZUhVRCgpO1xuICAgICAgICAgICAgaWYgKCFfdGhpcy5nYW1lU3RhcnRlZCkge1xuICAgICAgICAgICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShfdGhpcy5hbmltYXRlUHJlcGFyYXRpb24pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgX3RoaXMuYW5pbWF0ZSgwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5hbmltYXRlID0gZnVuY3Rpb24gKHRpbWVTdGFtcCkge1xuICAgICAgICAgICAgX3RoaXMuZGVsdGFUaW1lID0gdGltZVN0YW1wIC0gX3RoaXMubGFzdFRpbWU7XG4gICAgICAgICAgICBfdGhpcy5sYXN0VGltZSA9IHRpbWVTdGFtcDtcbiAgICAgICAgICAgIF90aGlzLmxhc3RGcmFtZSArPSBfdGhpcy5kZWx0YVRpbWU7XG4gICAgICAgICAgICBpZiAoIV90aGlzLm11c2ljU3RhcnRlZCAmJiBfdGhpcy5wbGF5ZXIudHJhdmVsZWRYICE9PSAwKSB7XG4gICAgICAgICAgICAgICAgX3RoaXMucGxheU11c2ljKCk7XG4gICAgICAgICAgICAgICAgX3RoaXMubXVzaWNTdGFydGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChfdGhpcy5sYXN0RnJhbWUgPiAxMDAwIC8gX3RoaXMuZnJhbWVyYXRlKSB7XG4gICAgICAgICAgICAgICAgX3RoaXMuY29udGV4dC5jbGVhclJlY3QoMCwgMCwgX3RoaXMud2lkdGgsIF90aGlzLmhlaWdodCk7XG4gICAgICAgICAgICAgICAgX3RoaXMuYmFja2dyb3VuZC5kcmF3KF90aGlzLmNvbnRleHQpO1xuICAgICAgICAgICAgICAgIF90aGlzLmJhY2tncm91bmQudXBkYXRlKCk7XG4gICAgICAgICAgICAgICAgX3RoaXMuaGFuZGxlRW5lbWllcyhfdGhpcy5kZWx0YVRpbWUpO1xuICAgICAgICAgICAgICAgIF90aGlzLnBsYXllci5kcmF3KF90aGlzLmNvbnRleHQpO1xuICAgICAgICAgICAgICAgIF90aGlzLnBsYXllci51cGRhdGUoX3RoaXMuaW5wdXQsIF90aGlzLmRlbHRhVGltZSk7XG4gICAgICAgICAgICAgICAgX3RoaXMuZGlzcGxheVN0YXR1c1RleHQoKTtcbiAgICAgICAgICAgICAgICBfdGhpcy5sYXN0RnJhbWUgPSAwO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgX3RoaXMuYW5pbWF0ZUhVRCgpO1xuICAgICAgICAgICAgaWYgKF90aGlzLmdhbWVPdmVyKSB7XG4gICAgICAgICAgICAgICAgX3RoaXMuYW5pbWF0ZUdhbWVPdmVyKDApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShfdGhpcy5hbmltYXRlKTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5jb250ZXh0ID0gY29udGV4dDtcbiAgICAgICAgdGhpcy5jb250ZXh0MiA9IGNvbnRleHQyO1xuICAgICAgICB0aGlzLmhlaWdodCA9IENBTlZBU19IRUlHSFQ7XG4gICAgICAgIHRoaXMud2lkdGggPSBDQU5WQVNfV0lEVEg7XG4gICAgICAgIHRoaXMubGFzdFRpbWUgPSAwO1xuICAgICAgICB0aGlzLmRlbHRhVGltZSA9IDA7XG4gICAgICAgIHRoaXMuZW5lbXlJbnRlcnZhbFJlZHVjdGlvbiA9IDA7XG4gICAgICAgIHRoaXMuZW5lbXlJbnRlcnZhbCA9IDEwMDA7XG4gICAgICAgIHRoaXMucmFuZG9tRW5lbXlJbnRlcnZhbCA9IE1hdGgucmFuZG9tKCkgKiAxMDAwICsgNTAwO1xuICAgICAgICB0aGlzLmVuZW15VGltZXIgPSAwO1xuICAgICAgICB0aGlzLmVuZW1pZXMgPSBbXTtcbiAgICAgICAgdGhpcy5kZWJ1ZyA9IGZhbHNlO1xuICAgICAgICB0aGlzLnNjb3JlID0gMDtcbiAgICAgICAgdGhpcy5zcGVlZCA9IDE7XG4gICAgICAgIHRoaXMuZ2FtZU92ZXIgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5nYW1lU3RhcnRlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLnZpY3RvcnkgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5zcGFuU2NvcmUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNwYW5TY29yZVwiKTtcbiAgICAgICAgdGhpcy5oZWFydEltYWdlcyA9IHRoaXMucHJlcGFyZUhVREltYWdlcyhcImhlYXJ0XCIpO1xuICAgICAgICB0aGlzLmZyYW1lcmF0ZSA9IDIwMDtcbiAgICAgICAgdGhpcy5sYXN0RnJhbWUgPSAwO1xuICAgICAgICB0aGlzLmxhc3RTY29yZSA9IDA7XG4gICAgICAgIHRoaXMubXVzaWNTdGFydGVkID0gZmFsc2U7XG4gICAgICAgIHRoaXMubXVzaWMgPSBuZXcgQXVkaW8oXCJhc3NldHMvYXVkaW8vYmFja2dyb3VuZC9hbWJpZW50X2ZvcmVzdC5tcDNcIik7XG4gICAgICAgIHRoaXMuYm9hckRlYXRoU291bmRzID0gW1xuICAgICAgICAgICAgbmV3IEF1ZGlvKFwiYXNzZXRzL2F1ZGlvL2JvYXIvYm9hcl9ncnVudDEubXAzXCIpLFxuICAgICAgICAgICAgbmV3IEF1ZGlvKFwiYXNzZXRzL2F1ZGlvL2JvYXIvYm9hcl9ncnVudDIubXAzXCIpLFxuICAgICAgICAgICAgbmV3IEF1ZGlvKFwiYXNzZXRzL2F1ZGlvL2JvYXIvYm9hcl9ncnVudDMubXAzXCIpLFxuICAgICAgICAgICAgbmV3IEF1ZGlvKFwiYXNzZXRzL2F1ZGlvL2JvYXIvYm9hcl9ncnVudDQubXAzXCIpLFxuICAgICAgICAgICAgbmV3IEF1ZGlvKFwiYXNzZXRzL2F1ZGlvL2JvYXIvYm9hcl9ncnVudDUubXAzXCIpLFxuICAgICAgICAgICAgbmV3IEF1ZGlvKFwiYXNzZXRzL2F1ZGlvL2JvYXIvYm9hcl9kZWF0aDEubXAzXCIpLFxuICAgICAgICAgICAgbmV3IEF1ZGlvKFwiYXNzZXRzL2F1ZGlvL2JvYXIvYm9hcl9kZWF0aDIubXAzXCIpLFxuICAgICAgICAgICAgbmV3IEF1ZGlvKFwiYXNzZXRzL2F1ZGlvL2JvYXIvYm9hcl9kZWF0aDMubXAzXCIpLFxuICAgICAgICAgICAgbmV3IEF1ZGlvKFwiYXNzZXRzL2F1ZGlvL2JvYXIvYm9hcl9kZWF0aDQubXAzXCIpLFxuICAgICAgICBdO1xuICAgICAgICB0aGlzLmlucHV0ID0gbmV3IElucHV0SGFuZGxlcih0aGlzKTtcbiAgICAgICAgdGhpcy5iYWNrZ3JvdW5kID0gbmV3IEJhY2tncm91bmQoKTtcbiAgICAgICAgdGhpcy5wbGF5ZXIgPSBuZXcgUGxheWVyKHRoaXMpO1xuICAgICAgICB0aGlzLnBsYXllckxhc3RIZWFsdGggPSB0aGlzLnBsYXllci5zdGFydGluZ0hlYWx0aHBvaW50cztcbiAgICB9XG4gICAgR2FtZS5wcm90b3R5cGUucmVzZXRHYW1lID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLmNvbnRleHQuY2xlYXJSZWN0KDAsIDAsIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0KTtcbiAgICAgICAgdGhpcy5lbmVtaWVzID0gW107XG4gICAgICAgIHRoaXMuaW5wdXQgPSBuZXcgSW5wdXRIYW5kbGVyKHRoaXMpO1xuICAgICAgICB0aGlzLmJhY2tncm91bmQgPSBuZXcgQmFja2dyb3VuZCgpO1xuICAgICAgICB0aGlzLnBsYXllci5oZWFsdGhwb2ludHMgPSA2O1xuICAgICAgICB0aGlzLnBsYXllci54ID0gdGhpcy5wbGF5ZXIuZ2FtZS53aWR0aCAvIDMgLSB0aGlzLnBsYXllci53aWR0aCAvIDI7XG4gICAgICAgIHRoaXMucGxheWVyLnkgPSB0aGlzLnBsYXllci5ncm91bmRMaW1pdDtcbiAgICAgICAgdGhpcy5wbGF5ZXIubGFzdEp1bXAgPSB0aGlzLnBsYXllci5qdW1wQ29vbGRvd247XG4gICAgICAgIHRoaXMucGxheWVyLmxhc3RBdHRhY2sgPSAwO1xuICAgICAgICB0aGlzLnBsYXllci5hdHRhY2tJbmRpY2F0ZWQgPSB0cnVlO1xuICAgICAgICB0aGlzLnBsYXllci5jdXJyZW50U3RhdGUgPSB0aGlzLnBsYXllci5zdGF0ZXNbU1RBVEVTLlBSRVBBUklOR107XG4gICAgICAgIHRoaXMucGxheWVyLmZhY2luZyA9IFwiUlwiOyAvLyBSID0gcmlnaHQsIEwgPSBsZWZ0XG4gICAgICAgIHRoaXMucGxheWVyLmFuaW1hdGlvbiA9IFwic3RpbGxcIjtcbiAgICAgICAgdGhpcy5nYW1lT3ZlciA9IGZhbHNlO1xuICAgICAgICB0aGlzLmdhbWVTdGFydGVkID0gZmFsc2U7XG4gICAgICAgIHRoaXMuZW5lbXlJbnRlcnZhbCA9IDEwMDA7XG4gICAgICAgIHRoaXMuc2NvcmUgPSAwO1xuICAgICAgICB0aGlzLmFuaW1hdGVQcmVwYXJhdGlvbigwKTtcbiAgICB9O1xuICAgIEdhbWUucHJvdG90eXBlLnByZXBhcmVIVURJbWFnZXMgPSBmdW5jdGlvbiAoa2V5d29yZCkge1xuICAgICAgICBpZiAoa2V5d29yZCA9PT0gXCJoZWFydFwiKSB7XG4gICAgICAgICAgICB2YXIgaW1hZ2VzSFVEID0gW25ldyBJbWFnZSgpLCBuZXcgSW1hZ2UoKSwgbmV3IEltYWdlKCldO1xuICAgICAgICAgICAgaW1hZ2VzSFVEWzBdLnNyYyA9IFwiYXNzZXRzL2ltZy9kaXNwbGF5L2hlYXJ0X2Z1bGwucG5nXCI7XG4gICAgICAgICAgICBpbWFnZXNIVURbMF0ud2lkdGggPSA1MDtcbiAgICAgICAgICAgIGltYWdlc0hVRFsxXS5zcmMgPSBcImFzc2V0cy9pbWcvZGlzcGxheS9oZWFydF9oYWxmLnBuZ1wiO1xuICAgICAgICAgICAgaW1hZ2VzSFVEWzFdLndpZHRoID0gNTA7XG4gICAgICAgICAgICBpbWFnZXNIVURbMl0uc3JjID0gXCJhc3NldHMvaW1nL2Rpc3BsYXkvaGVhcnRfZW1wdHkucG5nXCI7XG4gICAgICAgICAgICBpbWFnZXNIVURbMl0ud2lkdGggPSA1MDtcbiAgICAgICAgICAgIHJldHVybiBpbWFnZXNIVUQ7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIEdhbWUucHJvdG90eXBlLnBsYXlNdXNpYyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5tdXNpYy5wbGF5KCk7XG4gICAgICAgIHRoaXMubXVzaWMuYWRkRXZlbnRMaXN0ZW5lcihcImVuZGVkXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRoaXMuY3VycmVudFRpbWUgPSAwO1xuICAgICAgICAgICAgdGhpcy5wbGF5KCk7XG4gICAgICAgIH0sIGZhbHNlKTtcbiAgICB9O1xuICAgIEdhbWUucHJvdG90eXBlLmhhbmRsZUVuZW1pZXMgPSBmdW5jdGlvbiAoZGVsdGFUaW1lKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIC8vIGVuZW15SW50ZXJ2YWwgMTAlIHJlZHVjdGlvbiBldmVyeSAyMCBzY29yZSBwb2ludHNcbiAgICAgICAgaWYgKHRoaXMuZW5lbXlUaW1lciA+IHRoaXMuZW5lbXlJbnRlcnZhbCArIHRoaXMucmFuZG9tRW5lbXlJbnRlcnZhbCkge1xuICAgICAgICAgICAgdGhpcy5lbmVtaWVzLnB1c2gobmV3IEVuZW15KHRoaXMpKTtcbiAgICAgICAgICAgIHRoaXMucmFuZG9tRW5lbXlJbnRlcnZhbCA9IE1hdGgucmFuZG9tKCkgKiAxMDAwO1xuICAgICAgICAgICAgdGhpcy5lbmVteVRpbWVyID0gMDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZW5lbXlUaW1lciArPSBkZWx0YVRpbWU7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5lbmVtaWVzLmZvckVhY2goZnVuY3Rpb24gKGVuZW15KSB7XG4gICAgICAgICAgICBlbmVteS5kcmF3KF90aGlzLmNvbnRleHQpO1xuICAgICAgICAgICAgZW5lbXkudXBkYXRlKGRlbHRhVGltZSk7XG4gICAgICAgICAgICBfdGhpcy5lbmVtaWVzID0gX3RoaXMuZW5lbWllcy5maWx0ZXIoZnVuY3Rpb24gKGVuZW15KSB7IHJldHVybiAhZW5lbXkubWFya2VkRm9yRGVsZXRpb247IH0pO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIEdhbWUucHJvdG90eXBlLnJlZHVjZUVuZW15SW50ZXJ2YWwgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh0aGlzLnNjb3JlID4gdGhpcy5sYXN0U2NvcmUgKyA1KSB7XG4gICAgICAgICAgICB0aGlzLmxhc3RTY29yZSA9IHRoaXMuc2NvcmU7XG4gICAgICAgICAgICB0aGlzLmVuZW15SW50ZXJ2YWwgKj0gMC45O1xuICAgICAgICB9XG4gICAgfTtcbiAgICBHYW1lLnByb3RvdHlwZS5ncmF5c2NhbGVDYW52YXMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBpbWFnZURhdGEgPSB0aGlzLmNvbnRleHQuZ2V0SW1hZ2VEYXRhKDAsIDAsIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0KTtcbiAgICAgICAgdmFyIGRhdGEgPSBpbWFnZURhdGEuZGF0YTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBkYXRhLmxlbmd0aDsgaSArPSA0KSB7XG4gICAgICAgICAgICB2YXIgbHVtaW5hbmNlID0gMC4yOTkgKiBkYXRhW2ldICsgMC41ODcgKiBkYXRhW2kgKyAxXSArIDAuMTE0ICogZGF0YVtpICsgMl07XG4gICAgICAgICAgICBkYXRhW2ldID0gbHVtaW5hbmNlO1xuICAgICAgICAgICAgZGF0YVtpICsgMV0gPSBsdW1pbmFuY2U7XG4gICAgICAgICAgICBkYXRhW2kgKyAyXSA9IGx1bWluYW5jZTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmNvbnRleHQucHV0SW1hZ2VEYXRhKGltYWdlRGF0YSwgMCwgMCk7XG4gICAgfTtcbiAgICBHYW1lLnByb3RvdHlwZS5kaXNwbGF5R2FtZU92ZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuY29udGV4dDIuY2xlYXJSZWN0KENBTlZBUzJfV0lEVEggLyAzLCAwLCBDQU5WQVMyX1dJRFRILCBDQU5WQVMyX0hFSUdIVCk7XG4gICAgICAgIHRoaXMuY29udGV4dDIuZm9udCA9IFwiNDBweCBzaWxrc2NyZWVuXCI7XG4gICAgICAgIHRoaXMuY29udGV4dDIuZmlsbFN0eWxlID0gXCJkYXJrcmVkXCI7XG4gICAgICAgIHRoaXMuY29udGV4dDIuZmlsbFRleHQoXCJHQU1FIE9WRVIgIVwiLCBDQU5WQVMyX1dJRFRIICogMC41IC0gNTAsIENBTlZBUzJfSEVJR0hUICogMC4zMyk7XG4gICAgICAgIHRoaXMuY29udGV4dDIuZmlsbFRleHQoXCJQUkVTUyBSIFRPIFJFU1RBUlRcIiwgQ0FOVkFTMl9XSURUSCAqIDAuNSAtIDE1MCwgQ0FOVkFTMl9IRUlHSFQgKiAwLjkpO1xuICAgIH07XG4gICAgR2FtZS5wcm90b3R5cGUuZGlzcGxheUhlYXJ0cyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHVwZGF0ZUhlYXJ0cyA9IHRoaXMucGxheWVyTGFzdEhlYWx0aCAhPT0gdGhpcy5wbGF5ZXIuaGVhbHRocG9pbnRzO1xuICAgICAgICBpZiAodXBkYXRlSGVhcnRzIHx8XG4gICAgICAgICAgICB0aGlzLnBsYXllci5oZWFsdGhwb2ludHMgPT09IDAgfHxcbiAgICAgICAgICAgIHRoaXMubGFzdFRpbWUgPCAxMDAwKSB7XG4gICAgICAgICAgICB0aGlzLnBsYXllckxhc3RIZWFsdGggPSB0aGlzLnBsYXllci5oZWFsdGhwb2ludHM7XG4gICAgICAgICAgICB0aGlzLmNvbnRleHQyLmNsZWFyUmVjdChDQU5WQVMyX1dJRFRIIC8gMywgMCwgQ0FOVkFTMl9XSURUSCwgQ0FOVkFTMl9IRUlHSFQpO1xuICAgICAgICAgICAgdmFyIGZ1bGxIZWFydHMgPSBNYXRoLmZsb29yKHRoaXMucGxheWVyLmhlYWx0aHBvaW50cyAvIDIpO1xuICAgICAgICAgICAgdmFyIGhhbGZIZWFydCA9IHRoaXMucGxheWVyLmhlYWx0aHBvaW50cyAlIDIgPT09IDEgPyAxIDogMDtcbiAgICAgICAgICAgIHZhciBlbXB0eUhlYXJ0cyA9IHRoaXMucGxheWVyLnN0YXJ0aW5nSGVhbHRocG9pbnRzIC8gMiAtIGZ1bGxIZWFydHMgLSBoYWxmSGVhcnQ7XG4gICAgICAgICAgICB2YXIgaW1nV2lkdGggPSA0MDtcbiAgICAgICAgICAgIHZhciBpbWdIZWlnaHQgPSA0MDtcbiAgICAgICAgICAgIHZhciBkcmF3bkhlYXJ0cyA9IDA7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMucGxheWVyLnN0YXJ0aW5nSGVhbHRocG9pbnRzIC8gMjsgaSsrKSB7XG4gICAgICAgICAgICAgICAgdmFyIGluZGV4ID0gZHJhd25IZWFydHMgPD0gOCA/IGkgOiBpIC0gOTtcbiAgICAgICAgICAgICAgICB2YXIgcG9zaXRpb25ZID0gZHJhd25IZWFydHMgPiA4XG4gICAgICAgICAgICAgICAgICAgID8gQ0FOVkFTMl9IRUlHSFQgLyAxLjUgLSBpbWdXaWR0aCAvIDJcbiAgICAgICAgICAgICAgICAgICAgOiBDQU5WQVMyX0hFSUdIVCAvIDMgLSBpbWdXaWR0aCAvIDI7XG4gICAgICAgICAgICAgICAgLy8gcG9zaXRpb25YID0gKCBzaXplQ2FudmFzIC0gKCBzaXplSW1hZ2UgKiBudW1iZXJJbWFnZXMgKSAvIDIgKSArICggaW5kZXhJbWFnZSAqIHNpemVJbWFnZSApXG4gICAgICAgICAgICAgICAgdmFyIHBvc2l0aW9uWCA9IENBTlZBUzJfV0lEVEggLSBpbWdXaWR0aCAqIDEwICsgaW5kZXggKiBpbWdXaWR0aDtcbiAgICAgICAgICAgICAgICBpZiAoZnVsbEhlYXJ0cyA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgZnVsbEhlYXJ0cy0tO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnRleHQyLmRyYXdJbWFnZSh0aGlzLmhlYXJ0SW1hZ2VzW0lNR19IRUFSVFMuRlVMTF0sIHBvc2l0aW9uWCwgcG9zaXRpb25ZLCBpbWdXaWR0aCwgaW1nSGVpZ2h0KTtcbiAgICAgICAgICAgICAgICAgICAgZHJhd25IZWFydHMrKztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoaGFsZkhlYXJ0ID4gMCkge1xuICAgICAgICAgICAgICAgICAgICBoYWxmSGVhcnQtLTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb250ZXh0Mi5kcmF3SW1hZ2UodGhpcy5oZWFydEltYWdlc1tJTUdfSEVBUlRTLkhBTEZdLCBwb3NpdGlvblgsIHBvc2l0aW9uWSwgaW1nV2lkdGgsIGltZ0hlaWdodCk7XG4gICAgICAgICAgICAgICAgICAgIGRyYXduSGVhcnRzKys7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGVtcHR5SGVhcnRzID4gMCkge1xuICAgICAgICAgICAgICAgICAgICBlbXB0eUhlYXJ0cy0tO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnRleHQyLmRyYXdJbWFnZSh0aGlzLmhlYXJ0SW1hZ2VzW0lNR19IRUFSVFMuRU1QVFldLCBwb3NpdGlvblgsIHBvc2l0aW9uWSwgaW1nV2lkdGgsIGltZ0hlaWdodCk7XG4gICAgICAgICAgICAgICAgICAgIGRyYXduSGVhcnRzKys7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbiAgICBHYW1lLnByb3RvdHlwZS5kaXNwbGF5Q29tbWFuZHMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuY29udGV4dDIuY2xlYXJSZWN0KDAsIDAsIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0KTtcbiAgICAgICAgdGhpcy5jb250ZXh0Mi5mb250ID0gXCI0MHB4IHNpbGtzY3JlZW5cIjtcbiAgICAgICAgdGhpcy5jb250ZXh0Mi5maWxsU3R5bGUgPSBcImdyZWVuXCI7XG4gICAgICAgIHRoaXMuY29udGV4dDIuZmlsbFRleHQoXCJNT1ZFIFdJVEggQVJST1dTXCIsIENBTlZBUzJfV0lEVEggKiAwLjUgLSAyMzAsIENBTlZBUzJfSEVJR0hUICogMC43NSk7XG4gICAgICAgIHRoaXMuY29udGV4dDIuZmlsbFRleHQoXCJBVFRBQ0sgV0lUSCBBXCIsIENBTlZBUzJfV0lEVEggKiAwLjUgLSAxODAsIENBTlZBUzJfSEVJR0hUICogMC4yNSk7XG4gICAgICAgIHRoaXMuY29udGV4dC5mb250ID0gXCI0MHB4IHNpbGtzY3JlZW5cIjtcbiAgICAgICAgdGhpcy5jb250ZXh0LmZpbGxTdHlsZSA9IFwiYmxhY2tcIjtcbiAgICAgICAgdGhpcy5jb250ZXh0LmZpbGxUZXh0KFwiUFJFU1MgUiBUTyBTVEFSVFwiLCBDQU5WQVNfV0lEVEggKiAwLjUgLSAyMTAsIENBTlZBU19IRUlHSFQgKiAwLjI1KTtcbiAgICB9O1xuICAgIEdhbWUucHJvdG90eXBlLmRpc3BsYXlTdGF0dXNUZXh0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLmNvbnRleHQyLmNsZWFyUmVjdCgwLCAwLCB0aGlzLndpZHRoIC8gMywgdGhpcy5oZWlnaHQpO1xuICAgICAgICB0aGlzLmNvbnRleHQyLmZvbnQgPSBcIjQwcHggc2lsa3NjcmVlblwiO1xuICAgICAgICBpZiAodGhpcy5zY29yZSA+PSA0MDApIHtcbiAgICAgICAgICAgIHRoaXMuY29udGV4dDIuZmlsbFN0eWxlID0gXCJkZWVwcGlua1wiO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHRoaXMuc2NvcmUgPj0gMzAwKSB7XG4gICAgICAgICAgICB0aGlzLmNvbnRleHQyLmZpbGxTdHlsZSA9IFwiZGFya29yYW5nZVwiO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHRoaXMuc2NvcmUgPj0gMjAwKSB7XG4gICAgICAgICAgICB0aGlzLmNvbnRleHQyLmZpbGxTdHlsZSA9IFwiZGFya21hZ2VudGFcIjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0aGlzLnNjb3JlID49IDEwMCkge1xuICAgICAgICAgICAgdGhpcy5jb250ZXh0Mi5maWxsU3R5bGUgPSBcImRvZGdlcmJsdWVcIjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0aGlzLnNjb3JlID49IDUwKSB7XG4gICAgICAgICAgICB0aGlzLmNvbnRleHQyLmZpbGxTdHlsZSA9IFwiZm9yZXN0Z3JlZW5cIjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuY29udGV4dDIuZmlsbFN0eWxlID0gXCJ3aGl0ZVwiO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuY29udGV4dDIuZmlsbFRleHQoXCJcIi5jb25jYXQodGhpcy5zY29yZS50b1N0cmluZygpKSwgQ0FOVkFTMl9XSURUSCAvIDYgLSA3MCwgQ0FOVkFTMl9IRUlHSFQgLyAzICsgMTMpO1xuICAgICAgICB0aGlzLmNvbnRleHQyLmZvbnQgPSBcIjI1cHggc2lsa3NjcmVlblwiO1xuICAgICAgICB0aGlzLmNvbnRleHQyLmZpbGxUZXh0KFwic2NvcmVcIiwgQ0FOVkFTMl9XSURUSCAvIDYgLSA3MCwgQ0FOVkFTMl9IRUlHSFQgKiAwLjc1ICsgMTMpO1xuICAgIH07XG4gICAgR2FtZS5wcm90b3R5cGUuYW5pbWF0ZUhVRCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHRoaXMuZ2FtZU92ZXIpIHtcbiAgICAgICAgICAgIHRoaXMuZGlzcGxheUdhbWVPdmVyKCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodGhpcy5wbGF5ZXIuY3VycmVudFN0YXRlLnN0YXRlID09PSBcIlBSRVBBUklOR1wiKSB7XG4gICAgICAgICAgICB0aGlzLmRpc3BsYXlDb21tYW5kcygpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5kaXNwbGF5SGVhcnRzKCk7XG4gICAgICAgICAgICB0aGlzLmRpc3BsYXlTdGF0dXNUZXh0KCk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHJldHVybiBHYW1lO1xufSgpKTtcbmV4cG9ydCB7IEdhbWUgfTtcbiIsInZhciBJbnB1dEhhbmRsZXIgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gSW5wdXRIYW5kbGVyKGdhbWUpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdGhpcy5nYW1lID0gZ2FtZTtcbiAgICAgICAgdGhpcy5rZXlzID0gW107XG4gICAgICAgIHRoaXMubGlzdGVuZWRLZXlzID0gW1wiQXJyb3dEb3duXCIsIFwiQXJyb3dVcFwiLCBcIkFycm93TGVmdFwiLCBcIkFycm93UmlnaHRcIiwgXCJhXCIsIFwiclwiXTtcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICBpZiAoX3RoaXMubGlzdGVuZWRLZXlzLmluY2x1ZGVzKGUua2V5KSAmJlxuICAgICAgICAgICAgICAgICFfdGhpcy5rZXlzLmluY2x1ZGVzKGUua2V5KSkge1xuICAgICAgICAgICAgICAgIF90aGlzLmtleXMucHVzaChlLmtleSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChlLmtleSA9PT0gXCJkXCIpIHtcbiAgICAgICAgICAgICAgICBfdGhpcy5nYW1lLmRlYnVnID0gIV90aGlzLmdhbWUuZGVidWc7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImtleXVwXCIsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICBpZiAoX3RoaXMubGlzdGVuZWRLZXlzLmluY2x1ZGVzKGUua2V5KSkge1xuICAgICAgICAgICAgICAgIF90aGlzLmtleXMuc3BsaWNlKF90aGlzLmtleXMuaW5kZXhPZihlLmtleSksIDEpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIElucHV0SGFuZGxlcjtcbn0oKSk7XG5leHBvcnQgeyBJbnB1dEhhbmRsZXIgfTtcbiIsInZhciBMYXllciA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBMYXllcihiYWNrZ3JvdW5kLCBpbWFnZSwgc3BlZWRNb2RpZmllcikge1xuICAgICAgICB0aGlzLmJhY2tncm91bmQgPSBiYWNrZ3JvdW5kO1xuICAgICAgICB0aGlzLndpZHRoID0gdGhpcy5iYWNrZ3JvdW5kLndpZHRoO1xuICAgICAgICB0aGlzLmhlaWdodCA9IHRoaXMuYmFja2dyb3VuZC5oZWlnaHQ7XG4gICAgICAgIHRoaXMuaW1hZ2UgPSBpbWFnZTtcbiAgICAgICAgdGhpcy5zcGVlZE1vZGlmaWVyID0gc3BlZWRNb2RpZmllcjtcbiAgICAgICAgdGhpcy54ID0gMDtcbiAgICAgICAgdGhpcy54MiA9IDA7XG4gICAgICAgIHRoaXMueSA9IDA7XG4gICAgICAgIHRoaXMuc3BlZWQgPSB0aGlzLmJhY2tncm91bmQuc3BlZWRYICogdGhpcy5zcGVlZE1vZGlmaWVyO1xuICAgIH1cbiAgICBMYXllci5wcm90b3R5cGUudXBkYXRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLnNwZWVkID0gdGhpcy5iYWNrZ3JvdW5kLnNwZWVkWCAqIHRoaXMuc3BlZWRNb2RpZmllcjtcbiAgICAgICAgdGhpcy54ID0gdGhpcy54ICsgdGhpcy5zcGVlZDtcbiAgICAgICAgLy8gcmVzZXQgaW1hZ2UxIHBvc2l0aW9uIGlmIG9mZi1saW1pdHNcbiAgICAgICAgaWYgKHRoaXMueCA8IDAgLSB0aGlzLndpZHRoKSB7XG4gICAgICAgICAgICB0aGlzLnggPSAwO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHRoaXMueCA+IHRoaXMud2lkdGgpIHtcbiAgICAgICAgICAgIHRoaXMueCA9IDA7XG4gICAgICAgIH1cbiAgICAgICAgLy8gcG9zaXRpb25zIGltYWdlMiB0byBsZWZ0IG9yIHJpZ2h0XG4gICAgICAgIGlmICh0aGlzLnggPD0gMCkge1xuICAgICAgICAgICAgdGhpcy54MiA9IHRoaXMueCArIHRoaXMud2lkdGg7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLngyID0gdGhpcy54IC0gdGhpcy53aWR0aDtcbiAgICAgICAgfVxuICAgIH07XG4gICAgTGF5ZXIucHJvdG90eXBlLmRyYXcgPSBmdW5jdGlvbiAoY29udGV4dCkge1xuICAgICAgICBjb250ZXh0LmRyYXdJbWFnZSh0aGlzLmltYWdlLCB0aGlzLngsIHRoaXMueSwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQpO1xuICAgICAgICBjb250ZXh0LmRyYXdJbWFnZSh0aGlzLmltYWdlLCB0aGlzLngyLCB0aGlzLnksIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0KTtcbiAgICB9O1xuICAgIHJldHVybiBMYXllcjtcbn0oKSk7XG5leHBvcnQgeyBMYXllciB9O1xuIiwiaW1wb3J0IHsgU1RBVEVTIH0gZnJvbSBcIi4uL2NvbnN0L2NvbnN0XCI7XG5pbXBvcnQgeyBSdW5uaW5nLCBKdW1waW5nLCBGYWxsaW5nLCBTdGlsbCwgQXR0YWNraW5nLCBQcmVwYXJpbmcsIH0gZnJvbSBcIi4vU3RhdGVzXCI7XG52YXIgUGxheWVyID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFBsYXllcihnYW1lKSB7XG4gICAgICAgIHRoaXMuZ2FtZSA9IGdhbWU7XG4gICAgICAgIHRoaXMuZmFjaW5nID0gXCJSXCI7IC8vIFIgPSByaWdodCwgTCA9IGxlZnRcbiAgICAgICAgdGhpcy5hbmltYXRpb24gPSBcInN0aWxsXCI7XG4gICAgICAgIHRoaXMuc3RhcnRpbmdIZWFsdGhwb2ludHMgPSA2O1xuICAgICAgICB0aGlzLmhlYWx0aHBvaW50cyA9IHRoaXMuc3RhcnRpbmdIZWFsdGhwb2ludHM7XG4gICAgICAgIHRoaXMucmVhZHlUb0dhaW5MaWZlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy53aWR0aCA9IDY2OyAvLyBkaXNwbGF5ZWQgd2lkdGhcbiAgICAgICAgdGhpcy5oZWlnaHQgPSA2MTsgLy8gZGlzcGxheWVkIGhlaWdodFxuICAgICAgICB0aGlzLmxlZnRMaW1pdCA9IHRoaXMuZ2FtZS53aWR0aCAvIDU7XG4gICAgICAgIHRoaXMucmlnaHRMaW1pdCA9IHRoaXMuZ2FtZS53aWR0aCAtIHRoaXMuZ2FtZS53aWR0aCAvIDUgLSB0aGlzLndpZHRoO1xuICAgICAgICB0aGlzLnlPZmZzZXQgPSAtMjI7IC8vIGFjY291bnQgZm9yIGNoYXJhY3RlciBwb3NpdGlvbiBvZmZzZXQgb24gc3ByaXRlc2hlZXRcbiAgICAgICAgdGhpcy5ncm91bmRMaW1pdCA9IHRoaXMuZ2FtZS5oZWlnaHQgLSB0aGlzLmhlaWdodCArIHRoaXMueU9mZnNldDtcbiAgICAgICAgdGhpcy54ID0gdGhpcy5nYW1lLndpZHRoIC8gMyAtIHRoaXMud2lkdGggLyAyO1xuICAgICAgICB0aGlzLnkgPSB0aGlzLmdyb3VuZExpbWl0O1xuICAgICAgICB0aGlzLnNwZWVkWCA9IDA7XG4gICAgICAgIHRoaXMuc3BlZWRYTW9kaWZpZXIgPSA0O1xuICAgICAgICB0aGlzLnNwZWVkWEFpck1vZGlmaWVyID0gNTtcbiAgICAgICAgdGhpcy50cmF2ZWxlZFggPSAwO1xuICAgICAgICB0aGlzLnNwZWVkWSA9IDA7XG4gICAgICAgIHRoaXMuanVtcENvb2xkb3duID0gNTAwO1xuICAgICAgICB0aGlzLmxhc3RKdW1wID0gdGhpcy5qdW1wQ29vbGRvd247XG4gICAgICAgIHRoaXMud2VpZ2h0ID0gMS4yO1xuICAgICAgICB0aGlzLnNvdXJjZVdpZHRoID0gNjY7IC8vIHdpZHRoIG9mIGVhY2ggc3ByaXRlIG9uIHNwcml0ZXNoZWV0XG4gICAgICAgIHRoaXMuc291cmNlSGVpZ2h0ID0gNjE7IC8vIGhlaWdodCBvZiBlYWNoIHNwcml0ZSBvbiBzcHJpdGVzaGVldFxuICAgICAgICB0aGlzLm1heEZyYW1lQ29sID0gNjsgLy8gbnVtYmVyIG9mIGNvbHVtbnMgb24gc3ByaXRlc2hlZXRcbiAgICAgICAgdGhpcy5tYXhGcmFtZVJvdyA9IDQ7IC8vIG51bWJlciBvciByb3dzIG9uIHNwcml0ZXNoZWV0XG4gICAgICAgIHRoaXMuZnJhbWUgPSAwO1xuICAgICAgICB0aGlzLmZyYW1lQ29sID0gdGhpcy5mcmFtZSAlIHRoaXMubWF4RnJhbWVDb2w7XG4gICAgICAgIHRoaXMuZnJhbWVSb3cgPSBNYXRoLmZsb29yKHRoaXMuZnJhbWUgLyB0aGlzLm1heEZyYW1lQ29sKTtcbiAgICAgICAgdGhpcy5mcHMgPSAxNTtcbiAgICAgICAgdGhpcy5mcmFtZVRpbWVyID0gMDtcbiAgICAgICAgdGhpcy5oaXRib3hSYWRpdXMgPSB0aGlzLndpZHRoIC8gMztcbiAgICAgICAgdGhpcy5oaXRib3hYT2Zmc2V0ID0gMi42O1xuICAgICAgICB0aGlzLmhpdGJveFlPZmZzZXQgPSAxLjg7XG4gICAgICAgIHRoaXMuaGl0Ym94WENlbnRlciA9IHRoaXMueCArIHRoaXMud2lkdGggLyB0aGlzLmhpdGJveFhPZmZzZXQ7XG4gICAgICAgIHRoaXMuaGl0Ym94WUNlbnRlciA9IHRoaXMueSArIHRoaXMuaGVpZ2h0IC8gdGhpcy5oaXRib3hZT2Zmc2V0O1xuICAgICAgICB0aGlzLmF0dGFja0Nvb2xkb3duID0gMTUwMDtcbiAgICAgICAgdGhpcy5sYXN0QXR0YWNrID0gMDtcbiAgICAgICAgdGhpcy5hdHRhY2tEdXJhdGlvbiA9IDUwMDtcbiAgICAgICAgdGhpcy5zb3VuZEF4ZVJlYWR5ID0gbmV3IEF1ZGlvKFwiYXNzZXRzL2F1ZGlvL2F4ZS9heGVfdW5zaGVhdGgubXAzXCIpO1xuICAgICAgICB0aGlzLnNvdW5kQXhlSGl0ID0gbmV3IEF1ZGlvKFwiYXNzZXRzL2F1ZGlvL2F4ZS9heGVfaGl0Lm1wM1wiKTtcbiAgICAgICAgdGhpcy5hdHRhY2tJbmRpY2F0ZWQgPSB0cnVlO1xuICAgICAgICB0aGlzLmltYWdlcyA9IHtcbiAgICAgICAgICAgIGFsZXJ0ZWQ6IHtcbiAgICAgICAgICAgICAgICBMOiBudWxsLFxuICAgICAgICAgICAgICAgIFI6IG51bGwsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYXR0YWNraW5nOiB7XG4gICAgICAgICAgICAgICAgTDogbnVsbCxcbiAgICAgICAgICAgICAgICBSOiBudWxsLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHJ1bm5pbmc6IHtcbiAgICAgICAgICAgICAgICBMOiBudWxsLFxuICAgICAgICAgICAgICAgIFI6IG51bGwsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc3RpbGw6IHtcbiAgICAgICAgICAgICAgICBMOiBudWxsLFxuICAgICAgICAgICAgICAgIFI6IG51bGwsXG4gICAgICAgICAgICB9LFxuICAgICAgICB9O1xuICAgICAgICB0aGlzLmltYWdlcy5hbGVydGVkLkwgPSBuZXcgSW1hZ2UoNjAsIDQ1KTtcbiAgICAgICAgdGhpcy5pbWFnZXMuYWxlcnRlZC5MLnNyYyA9XG4gICAgICAgICAgICBcImFzc2V0cy9pbWcvY2hhcmFjdGVycy9nb2JsaW4vZ29ibGluX2FsZXJ0ZWRfTF9zcHJpdGVzaGVldC5wbmdcIjtcbiAgICAgICAgdGhpcy5pbWFnZXMuYWxlcnRlZC5SID0gbmV3IEltYWdlKDYwLCA0NSk7XG4gICAgICAgIHRoaXMuaW1hZ2VzLmFsZXJ0ZWQuUi5zcmMgPVxuICAgICAgICAgICAgXCJhc3NldHMvaW1nL2NoYXJhY3RlcnMvZ29ibGluL2dvYmxpbl9hbGVydGVkX1Jfc3ByaXRlc2hlZXQucG5nXCI7XG4gICAgICAgIHRoaXMuaW1hZ2VzLmF0dGFja2luZy5MID0gbmV3IEltYWdlKDYwLCA0NSk7XG4gICAgICAgIHRoaXMuaW1hZ2VzLmF0dGFja2luZy5MLnNyYyA9XG4gICAgICAgICAgICBcImFzc2V0cy9pbWcvY2hhcmFjdGVycy9nb2JsaW4vZ29ibGluX2F0dGFja2luZ19MX3Nwcml0ZXNoZWV0LnBuZ1wiO1xuICAgICAgICB0aGlzLmltYWdlcy5hdHRhY2tpbmcuUiA9IG5ldyBJbWFnZSg2MCwgNDUpO1xuICAgICAgICB0aGlzLmltYWdlcy5hdHRhY2tpbmcuUi5zcmMgPVxuICAgICAgICAgICAgXCJhc3NldHMvaW1nL2NoYXJhY3RlcnMvZ29ibGluL2dvYmxpbl9hdHRhY2tpbmdfUl9zcHJpdGVzaGVldC5wbmdcIjtcbiAgICAgICAgdGhpcy5pbWFnZXMucnVubmluZy5MID0gbmV3IEltYWdlKDYwLCA0NSk7XG4gICAgICAgIHRoaXMuaW1hZ2VzLnJ1bm5pbmcuTC5zcmMgPVxuICAgICAgICAgICAgXCJhc3NldHMvaW1nL2NoYXJhY3RlcnMvZ29ibGluL2dvYmxpbl9ydW5uaW5nX0xfc3ByaXRlc2hlZXQucG5nXCI7XG4gICAgICAgIHRoaXMuaW1hZ2VzLnJ1bm5pbmcuUiA9IG5ldyBJbWFnZSg2MCwgNDUpO1xuICAgICAgICB0aGlzLmltYWdlcy5ydW5uaW5nLlIuc3JjID1cbiAgICAgICAgICAgIFwiYXNzZXRzL2ltZy9jaGFyYWN0ZXJzL2dvYmxpbi9nb2JsaW5fcnVubmluZ19SX3Nwcml0ZXNoZWV0LnBuZ1wiO1xuICAgICAgICB0aGlzLmltYWdlcy5zdGlsbC5MID0gbmV3IEltYWdlKDYwLCA0NSk7XG4gICAgICAgIHRoaXMuaW1hZ2VzLnN0aWxsLkwuc3JjID1cbiAgICAgICAgICAgIFwiYXNzZXRzL2ltZy9jaGFyYWN0ZXJzL2dvYmxpbi9nb2JsaW5fc3RpbGxfTF9zcHJpdGVzaGVldC5wbmdcIjtcbiAgICAgICAgdGhpcy5pbWFnZXMuc3RpbGwuUiA9IG5ldyBJbWFnZSg2MCwgNDUpO1xuICAgICAgICB0aGlzLmltYWdlcy5zdGlsbC5SLnNyYyA9XG4gICAgICAgICAgICBcImFzc2V0cy9pbWcvY2hhcmFjdGVycy9nb2JsaW4vZ29ibGluX3N0aWxsX1Jfc3ByaXRlc2hlZXQucG5nXCI7XG4gICAgICAgIHRoaXMuc3RhdGVzID0gW1xuICAgICAgICAgICAgbmV3IFN0aWxsKHRoaXMuZ2FtZSksXG4gICAgICAgICAgICBuZXcgUnVubmluZyh0aGlzLmdhbWUpLFxuICAgICAgICAgICAgbmV3IEp1bXBpbmcodGhpcy5nYW1lKSxcbiAgICAgICAgICAgIG5ldyBGYWxsaW5nKHRoaXMuZ2FtZSksXG4gICAgICAgICAgICBuZXcgQXR0YWNraW5nKHRoaXMuZ2FtZSksXG4gICAgICAgICAgICBuZXcgUHJlcGFyaW5nKHRoaXMuZ2FtZSksXG4gICAgICAgIF07XG4gICAgICAgIHRoaXMuY3VycmVudFN0YXRlID0gdGhpcy5zdGF0ZXNbU1RBVEVTLlBSRVBBUklOR107XG4gICAgICAgIHRoaXMuc3BlY2lhbFN0YXRlcyA9IFtcIkpVTVBJTkdcIiwgXCJBVFRBQ0tJTkdcIiwgXCJGQUxMSU5HXCIsIFwiUFJFUEFSSU5HXCJdO1xuICAgIH1cbiAgICBQbGF5ZXIucHJvdG90eXBlLmRyYXcgPSBmdW5jdGlvbiAoY29udGV4dCkge1xuICAgICAgICAvLyBzZWUgaHR0cHM6Ly93d3cueW91dHViZS5jb20vd2F0Y2g/dj03SnRMSEpibTBrQSZ0PTgzMHNcbiAgICAgICAgaWYgKHRoaXMuZ2FtZS5kZWJ1Zykge1xuICAgICAgICAgICAgY29udGV4dC5iZWdpblBhdGgoKTtcbiAgICAgICAgICAgIGNvbnRleHQuYXJjKHRoaXMuaGl0Ym94WENlbnRlciwgdGhpcy5oaXRib3hZQ2VudGVyLCB0aGlzLmhpdGJveFJhZGl1cywgMCwgTWF0aC5QSSAqIDIpO1xuICAgICAgICAgICAgY29udGV4dC5zdHJva2UoKTtcbiAgICAgICAgICAgIGNvbnRleHQuYmVnaW5QYXRoKCk7XG4gICAgICAgICAgICBjb250ZXh0Lm1vdmVUbyh0aGlzLnJpZ2h0TGltaXQgKyA0OCwgMCk7XG4gICAgICAgICAgICBjb250ZXh0LmxpbmVUbyh0aGlzLnJpZ2h0TGltaXQgKyA0OCwgdGhpcy5nYW1lLmhlaWdodCk7XG4gICAgICAgICAgICBjb250ZXh0Lm1vdmVUbyh0aGlzLmxlZnRMaW1pdCArIDE1LCAwKTtcbiAgICAgICAgICAgIGNvbnRleHQubGluZVRvKHRoaXMubGVmdExpbWl0ICsgMTUsIHRoaXMuZ2FtZS5oZWlnaHQpO1xuICAgICAgICAgICAgY29udGV4dC5zdHJva2UoKTtcbiAgICAgICAgfVxuICAgICAgICBjb250ZXh0LmRyYXdJbWFnZSh0aGlzLmltYWdlc1t0aGlzLmFuaW1hdGlvbl1bdGhpcy5mYWNpbmddLCB0aGlzLmZyYW1lQ29sICogdGhpcy5zb3VyY2VXaWR0aCwgLy8gc3hcbiAgICAgICAgdGhpcy5mcmFtZVJvdyAqIHRoaXMuc291cmNlSGVpZ2h0LCAvLyBzeVxuICAgICAgICB0aGlzLndpZHRoLCAvLyBzd1xuICAgICAgICB0aGlzLmhlaWdodCwgLy8gc2hcbiAgICAgICAgdGhpcy54LCB0aGlzLnksIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0KTtcbiAgICB9O1xuICAgIFBsYXllci5wcm90b3R5cGUuaGFuZGxlSW5wdXQgPSBmdW5jdGlvbiAoaW5wdXQpIHtcbiAgICAgICAgLy8gLS0tLS0gTU9WRU1FTlRcbiAgICAgICAgLy8gaG9yaXpvbnRhbCBtb3ZlbWVudFxuICAgICAgICBpZiAoaW5wdXQua2V5cy5pbmNsdWRlcyhcIkFycm93UmlnaHRcIikpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLm9uR3JvdW5kKCkpXG4gICAgICAgICAgICAgICAgdGhpcy5nYW1lLnBsYXllci5zZXRTdGF0ZShTVEFURVMuUlVOTklORyk7XG4gICAgICAgICAgICB0aGlzLmdhbWUucGxheWVyLmZhY2luZyA9IFwiUlwiO1xuICAgICAgICAgICAgdGhpcy5nYW1lLnBsYXllci5zcGVlZFggPVxuICAgICAgICAgICAgICAgIHRoaXMuZ2FtZS5wbGF5ZXIuc3BlZWRYTW9kaWZpZXIgKiB0aGlzLmdhbWUuc3BlZWQ7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoaW5wdXQua2V5cy5pbmNsdWRlcyhcIkFycm93TGVmdFwiKSkge1xuICAgICAgICAgICAgaWYgKHRoaXMub25Hcm91bmQoKSlcbiAgICAgICAgICAgICAgICB0aGlzLmdhbWUucGxheWVyLnNldFN0YXRlKFNUQVRFUy5SVU5OSU5HKTtcbiAgICAgICAgICAgIHRoaXMuZ2FtZS5wbGF5ZXIuZmFjaW5nID0gXCJMXCI7XG4gICAgICAgICAgICB0aGlzLmdhbWUucGxheWVyLnNwZWVkWCA9XG4gICAgICAgICAgICAgICAgLXRoaXMuZ2FtZS5wbGF5ZXIuc3BlZWRYTW9kaWZpZXIgKiB0aGlzLmdhbWUuc3BlZWQ7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnNwZWVkWCA9IDA7XG4gICAgICAgIH1cbiAgICAgICAgLy8gdmVydGljYWwgbW92ZW1lbnRcbiAgICAgICAgaWYgKGlucHV0LmtleXMuaW5jbHVkZXMoXCJBcnJvd1VwXCIpICYmXG4gICAgICAgICAgICB0aGlzLm9uR3JvdW5kKCkgJiZcbiAgICAgICAgICAgIHRoaXMubGFzdEp1bXAgPiB0aGlzLmp1bXBDb29sZG93bikge1xuICAgICAgICAgICAgdGhpcy5nYW1lLnBsYXllci5zZXRTdGF0ZShTVEFURVMuSlVNUElORyk7XG4gICAgICAgICAgICB0aGlzLmxhc3RKdW1wID0gMDtcbiAgICAgICAgICAgIHRoaXMuc3BlZWRZIC09IDIwO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMueCArPSB0aGlzLnNwZWVkWCAqICh0aGlzLmdhbWUuZGVsdGFUaW1lIC8gOCk7XG4gICAgICAgIHRoaXMueSArPSB0aGlzLnNwZWVkWSAqICh0aGlzLmdhbWUuZGVsdGFUaW1lIC8gMTApO1xuICAgICAgICBpZiAoIXRoaXMub25Hcm91bmQoKSkge1xuICAgICAgICAgICAgdGhpcy5zcGVlZFkgKz0gdGhpcy53ZWlnaHQgKiAodGhpcy5nYW1lLmRlbHRhVGltZSAvIDEwKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc3BlZWRZID0gMDtcbiAgICAgICAgfVxuICAgICAgICAvLyAtLS0tLSBTVEFURVNcbiAgICAgICAgaWYgKHRoaXMuY3VycmVudFN0YXRlLnN0YXRlID09PSBcIkpVTVBJTkdcIiAmJiB0aGlzLnNwZWVkWSA+IHRoaXMud2VpZ2h0KSB7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKFNUQVRFUy5GQUxMSU5HKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoKGlucHV0LmtleXMuaW5jbHVkZXMoXCJhXCIpIHx8IGlucHV0LmtleXMuaW5jbHVkZXMoXCJBcnJvd0Rvd25cIikpICYmXG4gICAgICAgICAgICB0aGlzLmxhc3RBdHRhY2sgPD0gdGhpcy5nYW1lLmRlbHRhVGltZSkge1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZShTVEFURVMuQVRUQUNLSU5HKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5vbkdyb3VuZCgpICYmXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRTdGF0ZS5zdGF0ZSAhPT0gXCJBVFRBQ0tJTkdcIiAmJlxuICAgICAgICAgICAgdGhpcy5zcGVlZFggPT09IDApIHtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoU1RBVEVTLlNUSUxMKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgUGxheWVyLnByb3RvdHlwZS5jaGVja0JvdW5kYXJpZXMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIC8vIGhvcml6b250YWwgYm91bmRhcmllc1xuICAgICAgICBpZiAodGhpcy54IDwgdGhpcy5sZWZ0TGltaXQpIHtcbiAgICAgICAgICAgIHRoaXMueCA9IHRoaXMubGVmdExpbWl0O1xuICAgICAgICAgICAgdGhpcy5nYW1lLmJhY2tncm91bmQuc3BlZWRYID1cbiAgICAgICAgICAgICAgICAtKHRoaXMuc3BlZWRYICogdGhpcy5nYW1lLnNwZWVkKSAqICh0aGlzLmdhbWUuZGVsdGFUaW1lIC8gMTApO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHRoaXMueCA+IHRoaXMucmlnaHRMaW1pdCkge1xuICAgICAgICAgICAgdGhpcy54ID0gdGhpcy5yaWdodExpbWl0O1xuICAgICAgICAgICAgdGhpcy5nYW1lLmJhY2tncm91bmQuc3BlZWRYID1cbiAgICAgICAgICAgICAgICAtdGhpcy5zcGVlZFggKiB0aGlzLmdhbWUuc3BlZWQgKiAodGhpcy5nYW1lLmRlbHRhVGltZSAvIDEwKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZ2FtZS5iYWNrZ3JvdW5kLnNwZWVkWCA9IDA7XG4gICAgICAgIH1cbiAgICAgICAgLy8gdmVydGljYWwgYm91bmRhcmllc1xuICAgICAgICBpZiAodGhpcy55ID4gdGhpcy5ncm91bmRMaW1pdClcbiAgICAgICAgICAgIHRoaXMueSA9IHRoaXMuZ3JvdW5kTGltaXQ7XG4gICAgfTtcbiAgICBQbGF5ZXIucHJvdG90eXBlLmFuaW1hdGVTcHJpdGVzaGVldCA9IGZ1bmN0aW9uIChkZWx0YVRpbWUpIHtcbiAgICAgICAgLy8gLS0tLS0gQU5JTUFUSU9OXG4gICAgICAgIC8vIHVwZGF0ZSBwbGF5ZXIgZnJhbWUgb25seSB3aGVuIGFib3ZlIGZwcyBpbnRlcnZhbFxuICAgICAgICBpZiAodGhpcy5mcmFtZVRpbWVyID4gMTAwMCAvIHRoaXMuZnBzKSB7XG4gICAgICAgICAgICB0aGlzLmZyYW1lVGltZXIgPSAwO1xuICAgICAgICAgICAgLy8gaWYgcmVhY2hlZCBlbmQgb2Ygc3ByaXRlc2hlZXQsIHJlcG9zaXRpb25zIHRvIHN0YXJ0IG9mIHNwcml0ZXNoZWV0XG4gICAgICAgICAgICBpZiAodGhpcy5mcmFtZSA9PT0gdGhpcy5tYXhGcmFtZVJvdyAqIHRoaXMubWF4RnJhbWVDb2wgLSAxKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5mcmFtZSA9IDA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmZyYW1lKys7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBjeWNsZSB0aHJvdWdoIHNwcml0ZXNoZWV0IHJvd3MvY29sdW1uc1xuICAgICAgICAgICAgdGhpcy5mcmFtZUNvbCA9IHRoaXMuZnJhbWUgJSB0aGlzLm1heEZyYW1lQ29sO1xuICAgICAgICAgICAgdGhpcy5mcmFtZVJvdyA9IE1hdGguZmxvb3IodGhpcy5mcmFtZSAvIHRoaXMubWF4RnJhbWVDb2wpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5mcmFtZVRpbWVyICs9IGRlbHRhVGltZTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgUGxheWVyLnByb3RvdHlwZS51cGRhdGUgPSBmdW5jdGlvbiAoaW5wdXQsIGRlbHRhVGltZSkge1xuICAgICAgICBpZiAodGhpcy5nYW1lLmRlYnVnKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcInRoaXMuY3VycmVudFN0YXRlIDo+PiBcIiwgdGhpcy5jdXJyZW50U3RhdGUpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJ0aGlzLnNwZWVkWCA6Pj4gXCIsIHRoaXMuc3BlZWRYKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwidGhpcy5zcGVlZFkgOj4+IFwiLCB0aGlzLnNwZWVkWSk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcInRoaXMudHJhdmVsZWRYIDo+PiBcIiwgdGhpcy50cmF2ZWxlZFgpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMubGFzdEF0dGFjayAtPSBkZWx0YVRpbWU7XG4gICAgICAgIHRoaXMubGFzdEp1bXAgKz0gZGVsdGFUaW1lO1xuICAgICAgICB0aGlzLnRyYXZlbGVkWCArPSB0aGlzLnNwZWVkWDtcbiAgICAgICAgLy8gaWYgbm90IGluIHNwZWNpYWwgc3RhdGUgKGF0dGFja2luZywganVtcGluZyksIHVzaW5nIGdlbmVyaWMgaW5wdXRzIGZyb20gcGxheWVyXG4gICAgICAgIGlmICh0aGlzLnNwZWNpYWxTdGF0ZXMuaW5jbHVkZXModGhpcy5jdXJyZW50U3RhdGUuc3RhdGUpKSB7XG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRTdGF0ZS5oYW5kbGVJbnB1dChpbnB1dCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmhhbmRsZUlucHV0KGlucHV0KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIXRoaXMuYXR0YWNrSW5kaWNhdGVkICYmIHRoaXMubGFzdEF0dGFjayAtIDIwMCA8PSB0aGlzLmdhbWUuZGVsdGFUaW1lKSB7XG4gICAgICAgICAgICB0aGlzLnNvdW5kQXhlUmVhZHkucGxheSgpO1xuICAgICAgICAgICAgdGhpcy5hdHRhY2tJbmRpY2F0ZWQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuY2hlY2tDb2xsaXNpb24oKTtcbiAgICAgICAgdGhpcy5jaGVja0JvdW5kYXJpZXMoKTtcbiAgICAgICAgdGhpcy5hbmltYXRlU3ByaXRlc2hlZXQoZGVsdGFUaW1lKTtcbiAgICAgICAgaWYgKHRoaXMuaGVhbHRocG9pbnRzIDw9IDAgJiYgdGhpcy5nYW1lLmdhbWVTdGFydGVkKVxuICAgICAgICAgICAgdGhpcy5nYW1lLmdhbWVPdmVyID0gdHJ1ZTtcbiAgICB9O1xuICAgIFBsYXllci5wcm90b3R5cGUuY2hlY2tHYWluTGlmZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHRoaXMucmVhZHlUb0dhaW5MaWZlICYmXG4gICAgICAgICAgICB0aGlzLmdhbWUuc2NvcmUgPj0gMTAgJiZcbiAgICAgICAgICAgICh0aGlzLmdhbWUuc2NvcmUgJSAxMCA9PT0gMCB8fCB0aGlzLmdhbWUuc2NvcmUgJSAxMCA9PT0gMSkpIHtcbiAgICAgICAgICAgIHRoaXMuaGVhbHRocG9pbnRzICs9IDE7XG4gICAgICAgICAgICB0aGlzLnJlYWR5VG9HYWluTGlmZSA9IGZhbHNlO1xuICAgICAgICAgICAgaWYgKHRoaXMuaGVhbHRocG9pbnRzID4gdGhpcy5zdGFydGluZ0hlYWx0aHBvaW50cykge1xuICAgICAgICAgICAgICAgIHRoaXMuc3RhcnRpbmdIZWFsdGhwb2ludHMgPSB0aGlzLmhlYWx0aHBvaW50cztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuZ2FtZS5kaXNwbGF5SGVhcnRzKCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnJlYWR5VG9HYWluTGlmZSA9IHRydWU7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIFBsYXllci5wcm90b3R5cGUuc2V0U3RhdGUgPSBmdW5jdGlvbiAoc3RhdGUpIHtcbiAgICAgICAgdGhpcy5jdXJyZW50U3RhdGUgPSB0aGlzLnN0YXRlc1tzdGF0ZV07XG4gICAgICAgIHRoaXMuY3VycmVudFN0YXRlLmVudGVyKCk7XG4gICAgfTtcbiAgICBQbGF5ZXIucHJvdG90eXBlLmNoZWNrQ29sbGlzaW9uID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICAvLyBjaGFuZ2UgaGl0Ym94IHBvc2l0aW9uIGRlcGVuZGluZyBvbiB3aGVyZSBwbGF5ZXIgaXMgZmFjaW5nXG4gICAgICAgIGlmICh0aGlzLmZhY2luZyA9PT0gXCJSXCIpIHtcbiAgICAgICAgICAgIHRoaXMuaGl0Ym94WENlbnRlciA9IHRoaXMueCArIHRoaXMud2lkdGggLyB0aGlzLmhpdGJveFhPZmZzZXQ7XG4gICAgICAgICAgICB0aGlzLmhpdGJveFlDZW50ZXIgPSB0aGlzLnkgKyB0aGlzLmhlaWdodCAvIHRoaXMuaGl0Ym94WU9mZnNldDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuaGl0Ym94WENlbnRlciA9IHRoaXMueCArIDEyICsgdGhpcy53aWR0aCAvIHRoaXMuaGl0Ym94WE9mZnNldDtcbiAgICAgICAgICAgIHRoaXMuaGl0Ym94WUNlbnRlciA9IHRoaXMueSArIHRoaXMuaGVpZ2h0IC8gdGhpcy5oaXRib3hZT2Zmc2V0O1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZ2FtZS5lbmVtaWVzLmZvckVhY2goZnVuY3Rpb24gKGVuZW15KSB7XG4gICAgICAgICAgICB2YXIgZHggPSBlbmVteS54ICsgZW5lbXkud2lkdGggLyBlbmVteS5oaXRib3hYT2Zmc2V0IC0gX3RoaXMuaGl0Ym94WENlbnRlcjtcbiAgICAgICAgICAgIHZhciBkeSA9IGVuZW15LnkgKyBlbmVteS5oZWlnaHQgLyBlbmVteS5oaXRib3hZT2Zmc2V0IC0gX3RoaXMuaGl0Ym94WUNlbnRlcjtcbiAgICAgICAgICAgIHZhciBkaXN0YW5jZSA9IE1hdGguc3FydChkeCAqIGR4ICsgZHkgKiBkeSk7XG4gICAgICAgICAgICBpZiAoZGlzdGFuY2UgPCBlbmVteS5oaXRib3hSYWRpdXMgKyBfdGhpcy5oaXRib3hSYWRpdXMpIHtcbiAgICAgICAgICAgICAgICBpZiAoX3RoaXMuY3VycmVudFN0YXRlICE9PSBfdGhpcy5zdGF0ZXNbU1RBVEVTLkFUVEFDS0lOR10gJiZcbiAgICAgICAgICAgICAgICAgICAgIWVuZW15Lmh1cnQpIHtcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMuaGVhbHRocG9pbnRzLS07XG4gICAgICAgICAgICAgICAgICAgIF90aGlzLnNwZWVkWCA9IC0xMDtcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMuc3BlZWRZID0gLTE1O1xuICAgICAgICAgICAgICAgICAgICBfdGhpcy5nYW1lLmRpc3BsYXlIZWFydHMoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoX3RoaXMuY3VycmVudFN0YXRlID09PSBfdGhpcy5zdGF0ZXNbU1RBVEVTLkFUVEFDS0lOR10pIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFlbmVteS5odXJ0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5nYW1lLnNjb3JlICs9IDI7XG4gICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5jaGVja0dhaW5MaWZlKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZW5lbXkuaHVydCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIGVuZW15LmZyYW1lID0gMDtcbiAgICAgICAgICAgICAgICAgICAgZW5lbXkuYW5pbWF0aW9uID0gXCJkeWluZ1wiO1xuICAgICAgICAgICAgICAgICAgICBlbmVteS5wbGF5U291bmQoKTtcbiAgICAgICAgICAgICAgICAgICAgd2hpbGUgKGVuZW15LnNwZWVkWCA+IGVuZW15LndlaWdodCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZW5lbXkuc3BlZWRYIC09IGVuZW15LndlaWdodCAqIDAuOTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBQbGF5ZXIucHJvdG90eXBlLm9uR3JvdW5kID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy55ID49IHRoaXMuZ2FtZS5oZWlnaHQgLSB0aGlzLmhlaWdodCArIHRoaXMueU9mZnNldDtcbiAgICB9O1xuICAgIHJldHVybiBQbGF5ZXI7XG59KCkpO1xuZXhwb3J0IHsgUGxheWVyIH07XG4iLCJ2YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBmdW5jdGlvbiAoZCwgYikge1xuICAgICAgICBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XG4gICAgICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XG4gICAgICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoYiwgcCkpIGRbcF0gPSBiW3BdOyB9O1xuICAgICAgICByZXR1cm4gZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICB9O1xuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xuICAgICAgICBpZiAodHlwZW9mIGIgIT09IFwiZnVuY3Rpb25cIiAmJiBiICE9PSBudWxsKVxuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNsYXNzIGV4dGVuZHMgdmFsdWUgXCIgKyBTdHJpbmcoYikgKyBcIiBpcyBub3QgYSBjb25zdHJ1Y3RvciBvciBudWxsXCIpO1xuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xuICAgIH07XG59KSgpO1xuaW1wb3J0IHsgU1RBVEVTIH0gZnJvbSBcIi4uL2NvbnN0L2NvbnN0XCI7XG52YXIgU3RhdGUgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gU3RhdGUoc3RhdGUpIHtcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHN0YXRlO1xuICAgIH1cbiAgICByZXR1cm4gU3RhdGU7XG59KCkpO1xudmFyIFN0aWxsID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhTdGlsbCwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBTdGlsbChnYW1lKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMsIFwiU1RJTExcIikgfHwgdGhpcztcbiAgICAgICAgX3RoaXMuZ2FtZSA9IGdhbWU7XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgU3RpbGwucHJvdG90eXBlLmVudGVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLmdhbWUucGxheWVyLmFuaW1hdGlvbiA9IFwic3RpbGxcIjtcbiAgICB9O1xuICAgIFN0aWxsLnByb3RvdHlwZS5oYW5kbGVJbnB1dCA9IGZ1bmN0aW9uIChpbnB1dCkgeyB9O1xuICAgIHJldHVybiBTdGlsbDtcbn0oU3RhdGUpKTtcbnZhciBSdW5uaW5nID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhSdW5uaW5nLCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIFJ1bm5pbmcoZ2FtZSkge1xuICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIuY2FsbCh0aGlzLCBcIlJVTk5JTkdcIikgfHwgdGhpcztcbiAgICAgICAgX3RoaXMuZ2FtZSA9IGdhbWU7XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgUnVubmluZy5wcm90b3R5cGUuZW50ZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuZ2FtZS5wbGF5ZXIuYW5pbWF0aW9uID0gXCJydW5uaW5nXCI7XG4gICAgfTtcbiAgICBSdW5uaW5nLnByb3RvdHlwZS5oYW5kbGVJbnB1dCA9IGZ1bmN0aW9uIChpbnB1dCkgeyB9O1xuICAgIHJldHVybiBSdW5uaW5nO1xufShTdGF0ZSkpO1xudmFyIEp1bXBpbmcgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKEp1bXBpbmcsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gSnVtcGluZyhnYW1lKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMsIFwiSlVNUElOR1wiKSB8fCB0aGlzO1xuICAgICAgICBfdGhpcy5nYW1lID0gZ2FtZTtcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICBKdW1waW5nLnByb3RvdHlwZS5lbnRlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5nYW1lLnBsYXllci5hbmltYXRpb24gPSBcInJ1bm5pbmdcIjtcbiAgICB9O1xuICAgIEp1bXBpbmcucHJvdG90eXBlLmhhbmRsZUlucHV0ID0gZnVuY3Rpb24gKGlucHV0KSB7XG4gICAgICAgIC8vIHdoZW4ganVtcGluZyA6IGF0dGFjayBhbGxvd2VkLCBob3Jpem9udGFsIHNwZWVkIGluY3JlYXNlZFxuICAgICAgICAvLyBob3Jpem9udGFsIG1vdmVtZW50XG4gICAgICAgIGlmIChpbnB1dC5rZXlzLmluY2x1ZGVzKFwiQXJyb3dSaWdodFwiKSkge1xuICAgICAgICAgICAgdGhpcy5nYW1lLnBsYXllci5mYWNpbmcgPSBcIlJcIjtcbiAgICAgICAgICAgIHRoaXMuZ2FtZS5wbGF5ZXIuc3BlZWRYID1cbiAgICAgICAgICAgICAgICB0aGlzLmdhbWUucGxheWVyLnNwZWVkWEFpck1vZGlmaWVyICogdGhpcy5nYW1lLnNwZWVkO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGlucHV0LmtleXMuaW5jbHVkZXMoXCJBcnJvd0xlZnRcIikpIHtcbiAgICAgICAgICAgIHRoaXMuZ2FtZS5wbGF5ZXIuZmFjaW5nID0gXCJMXCI7XG4gICAgICAgICAgICB0aGlzLmdhbWUucGxheWVyLnNwZWVkWCA9XG4gICAgICAgICAgICAgICAgLXRoaXMuZ2FtZS5wbGF5ZXIuc3BlZWRYQWlyTW9kaWZpZXIgKiB0aGlzLmdhbWUuc3BlZWQ7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmdhbWUucGxheWVyLnNwZWVkWCA9IDA7XG4gICAgICAgIH1cbiAgICAgICAgLy8gdXBkYXRlIHBvc2l0aW9uXG4gICAgICAgIHRoaXMuZ2FtZS5wbGF5ZXIueCArPSB0aGlzLmdhbWUucGxheWVyLnNwZWVkWCAqICh0aGlzLmdhbWUuZGVsdGFUaW1lIC8gOCk7XG4gICAgICAgIHRoaXMuZ2FtZS5wbGF5ZXIueSArPSB0aGlzLmdhbWUucGxheWVyLnNwZWVkWSAqICh0aGlzLmdhbWUuZGVsdGFUaW1lIC8gMTApO1xuICAgICAgICBpZiAoKGlucHV0LmtleXMuaW5jbHVkZXMoXCJhXCIpIHx8IGlucHV0LmtleXMuaW5jbHVkZXMoXCJBcnJvd0Rvd25cIikpICYmXG4gICAgICAgICAgICB0aGlzLmdhbWUucGxheWVyLmxhc3RBdHRhY2sgPD0gdGhpcy5nYW1lLmRlbHRhVGltZSkge1xuICAgICAgICAgICAgdGhpcy5nYW1lLnBsYXllci5zZXRTdGF0ZShTVEFURVMuQVRUQUNLSU5HKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBhZGRpbmcgd2VpZ2h0IGdyYWR1YWxseVxuICAgICAgICBpZiAoIXRoaXMuZ2FtZS5wbGF5ZXIub25Hcm91bmQoKSkge1xuICAgICAgICAgICAgdGhpcy5nYW1lLnBsYXllci5zcGVlZFkgKz1cbiAgICAgICAgICAgICAgICB0aGlzLmdhbWUucGxheWVyLndlaWdodCAqICh0aGlzLmdhbWUuZGVsdGFUaW1lIC8gMTApO1xuICAgICAgICB9XG4gICAgICAgIC8vIHN3aXRjaCB0byBmYWxsaW5nIHN0YXRlXG4gICAgICAgIGlmICh0aGlzLmdhbWUucGxheWVyLnNwZWVkWSA+IHRoaXMuZ2FtZS5wbGF5ZXIud2VpZ2h0KSB7XG4gICAgICAgICAgICB0aGlzLmdhbWUucGxheWVyLnNldFN0YXRlKFNUQVRFUy5GQUxMSU5HKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgcmV0dXJuIEp1bXBpbmc7XG59KFN0YXRlKSk7XG52YXIgRmFsbGluZyA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoRmFsbGluZywgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBGYWxsaW5nKGdhbWUpIHtcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcywgXCJGQUxMSU5HXCIpIHx8IHRoaXM7XG4gICAgICAgIF90aGlzLmdhbWUgPSBnYW1lO1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIEZhbGxpbmcucHJvdG90eXBlLmVudGVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLmdhbWUucGxheWVyLmFuaW1hdGlvbiA9IFwicnVubmluZ1wiO1xuICAgIH07XG4gICAgRmFsbGluZy5wcm90b3R5cGUuaGFuZGxlSW5wdXQgPSBmdW5jdGlvbiAoaW5wdXQpIHtcbiAgICAgICAgLy8gd2hlbiBmYWxsaW5nIDogYXR0YWNrIGFsbG93ZWQsIGhvcml6b250YWwgc3BlZWQgaW5jcmVhc2VkXG4gICAgICAgIC8vIGhvcml6b250YWwgbW92ZW1lbnQgKHNwZWVkWEFpck1vZGlmaWVyKVxuICAgICAgICBpZiAoaW5wdXQua2V5cy5pbmNsdWRlcyhcIkFycm93UmlnaHRcIikpIHtcbiAgICAgICAgICAgIHRoaXMuZ2FtZS5wbGF5ZXIuZmFjaW5nID0gXCJSXCI7XG4gICAgICAgICAgICB0aGlzLmdhbWUucGxheWVyLnNwZWVkWCA9XG4gICAgICAgICAgICAgICAgdGhpcy5nYW1lLnBsYXllci5zcGVlZFhBaXJNb2RpZmllciAqIHRoaXMuZ2FtZS5zcGVlZDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChpbnB1dC5rZXlzLmluY2x1ZGVzKFwiQXJyb3dMZWZ0XCIpKSB7XG4gICAgICAgICAgICB0aGlzLmdhbWUucGxheWVyLmZhY2luZyA9IFwiTFwiO1xuICAgICAgICAgICAgdGhpcy5nYW1lLnBsYXllci5zcGVlZFggPVxuICAgICAgICAgICAgICAgIC10aGlzLmdhbWUucGxheWVyLnNwZWVkWEFpck1vZGlmaWVyICogdGhpcy5nYW1lLnNwZWVkO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5nYW1lLnBsYXllci5zcGVlZFggPSAwO1xuICAgICAgICB9XG4gICAgICAgIC8vIHVwZGF0ZSBwb3NpdGlvblxuICAgICAgICB0aGlzLmdhbWUucGxheWVyLnggKz0gdGhpcy5nYW1lLnBsYXllci5zcGVlZFggKiAodGhpcy5nYW1lLmRlbHRhVGltZSAvIDgpO1xuICAgICAgICB0aGlzLmdhbWUucGxheWVyLnkgKz0gdGhpcy5nYW1lLnBsYXllci5zcGVlZFkgKiAodGhpcy5nYW1lLmRlbHRhVGltZSAvIDEwKTtcbiAgICAgICAgaWYgKChpbnB1dC5rZXlzLmluY2x1ZGVzKFwiYVwiKSB8fCBpbnB1dC5rZXlzLmluY2x1ZGVzKFwiQXJyb3dEb3duXCIpKSAmJlxuICAgICAgICAgICAgdGhpcy5nYW1lLnBsYXllci5sYXN0QXR0YWNrIDw9IHRoaXMuZ2FtZS5kZWx0YVRpbWUpIHtcbiAgICAgICAgICAgIHRoaXMuZ2FtZS5wbGF5ZXIuc2V0U3RhdGUoU1RBVEVTLkFUVEFDS0lORyk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gYWRkaW5nIHdlaWdodCBncmFkdWFsbHksIHN0b3Agb24gZ3JvdW5kXG4gICAgICAgIGlmICghdGhpcy5nYW1lLnBsYXllci5vbkdyb3VuZCgpKSB7XG4gICAgICAgICAgICB0aGlzLmdhbWUucGxheWVyLnNwZWVkWSArPVxuICAgICAgICAgICAgICAgIHRoaXMuZ2FtZS5wbGF5ZXIud2VpZ2h0ICogKHRoaXMuZ2FtZS5kZWx0YVRpbWUgLyAxMCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmdhbWUucGxheWVyLnNwZWVkWSA9IDA7XG4gICAgICAgIH1cbiAgICAgICAgLy8gcmV0dXJuIHRvIHN0aWxsIHN0YXRlXG4gICAgICAgIGlmICh0aGlzLmdhbWUucGxheWVyLm9uR3JvdW5kKCkgJiZcbiAgICAgICAgICAgIHRoaXMuZ2FtZS5wbGF5ZXIuY3VycmVudFN0YXRlLnN0YXRlICE9PSBcIkFUVEFDS0lOR1wiKSB7XG4gICAgICAgICAgICB0aGlzLmdhbWUucGxheWVyLnNldFN0YXRlKFNUQVRFUy5TVElMTCk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHJldHVybiBGYWxsaW5nO1xufShTdGF0ZSkpO1xudmFyIEF0dGFja2luZyA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoQXR0YWNraW5nLCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIEF0dGFja2luZyhnYW1lKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMsIFwiQVRUQUNLSU5HXCIpIHx8IHRoaXM7XG4gICAgICAgIF90aGlzLmdhbWUgPSBnYW1lO1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIEF0dGFja2luZy5wcm90b3R5cGUuZW50ZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuZ2FtZS5wbGF5ZXIuZnJhbWUgPSAwO1xuICAgICAgICB0aGlzLmdhbWUucGxheWVyLmFuaW1hdGlvbiA9IFwiYXR0YWNraW5nXCI7XG4gICAgICAgIHRoaXMuZ2FtZS5wbGF5ZXIubGFzdEF0dGFjayA9IHRoaXMuZ2FtZS5wbGF5ZXIuYXR0YWNrQ29vbGRvd247XG4gICAgICAgIHRoaXMuZ2FtZS5wbGF5ZXIuYXR0YWNrSW5kaWNhdGVkID0gZmFsc2U7XG4gICAgICAgIHRoaXMuZ2FtZS5wbGF5ZXIuc291bmRBeGVIaXQucGxheSgpO1xuICAgICAgICB0aGlzLmF0dGFja1RpbWVyID0gdGhpcy5nYW1lLnBsYXllci5hdHRhY2tEdXJhdGlvbjtcbiAgICB9O1xuICAgIEF0dGFja2luZy5wcm90b3R5cGUuaGFuZGxlSW5wdXQgPSBmdW5jdGlvbiAoaW5wdXQpIHtcbiAgICAgICAgLy8gcmVtYWlucyBpbiBhdHRhY2tpbmcgc3RhdGUgZm9yIGR1cmF0aW9uID0gYXR0YWNrVGltZXJcbiAgICAgICAgdGhpcy5hdHRhY2tUaW1lciAtPSB0aGlzLmdhbWUuZGVsdGFUaW1lO1xuICAgICAgICBpZiAodGhpcy5hdHRhY2tUaW1lciA8PSB0aGlzLmdhbWUuZGVsdGFUaW1lKSB7XG4gICAgICAgICAgICB0aGlzLmdhbWUucGxheWVyLnNldFN0YXRlKFNUQVRFUy5TVElMTCk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gaG9yaXpvbnRhbCBtb3ZlbWVudFxuICAgICAgICBpZiAoaW5wdXQua2V5cy5pbmNsdWRlcyhcIkFycm93UmlnaHRcIikpIHtcbiAgICAgICAgICAgIHRoaXMuZ2FtZS5wbGF5ZXIuZmFjaW5nID0gXCJSXCI7XG4gICAgICAgICAgICB0aGlzLmdhbWUucGxheWVyLnNwZWVkWCA9XG4gICAgICAgICAgICAgICAgdGhpcy5nYW1lLnBsYXllci5zcGVlZFhNb2RpZmllciAqIHRoaXMuZ2FtZS5zcGVlZDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChpbnB1dC5rZXlzLmluY2x1ZGVzKFwiQXJyb3dMZWZ0XCIpKSB7XG4gICAgICAgICAgICB0aGlzLmdhbWUucGxheWVyLmZhY2luZyA9IFwiTFwiO1xuICAgICAgICAgICAgdGhpcy5nYW1lLnBsYXllci5zcGVlZFggPVxuICAgICAgICAgICAgICAgIC10aGlzLmdhbWUucGxheWVyLnNwZWVkWE1vZGlmaWVyICogdGhpcy5nYW1lLnNwZWVkO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5nYW1lLnBsYXllci5zcGVlZFggPSAwO1xuICAgICAgICB9XG4gICAgICAgIC8vIHZlcnRpY2FsIG1vdmVtZW50XG4gICAgICAgIGlmICghdGhpcy5nYW1lLnBsYXllci5vbkdyb3VuZCgpKSB7XG4gICAgICAgICAgICB0aGlzLmdhbWUucGxheWVyLnNwZWVkWSArPVxuICAgICAgICAgICAgICAgIHRoaXMuZ2FtZS5wbGF5ZXIud2VpZ2h0ICogKHRoaXMuZ2FtZS5kZWx0YVRpbWUgLyAxMCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmdhbWUucGxheWVyLnNwZWVkWSA9IDA7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGlucHV0LmtleXMuaW5jbHVkZXMoXCJBcnJvd1VwXCIpICYmXG4gICAgICAgICAgICB0aGlzLmdhbWUucGxheWVyLmxhc3RKdW1wID4gdGhpcy5nYW1lLnBsYXllci5qdW1wQ29vbGRvd24pIHtcbiAgICAgICAgICAgIHRoaXMuZ2FtZS5wbGF5ZXIubGFzdEp1bXAgPSAwO1xuICAgICAgICAgICAgdGhpcy5nYW1lLnBsYXllci5zcGVlZFkgLT0gMjA7XG4gICAgICAgIH1cbiAgICAgICAgLy8gdXBkYXRlIHBvc2l0aW9uXG4gICAgICAgIHRoaXMuZ2FtZS5wbGF5ZXIueCArPSB0aGlzLmdhbWUucGxheWVyLnNwZWVkWCAqICh0aGlzLmdhbWUuZGVsdGFUaW1lIC8gOCk7XG4gICAgICAgIHRoaXMuZ2FtZS5wbGF5ZXIueSArPSB0aGlzLmdhbWUucGxheWVyLnNwZWVkWSAqICh0aGlzLmdhbWUuZGVsdGFUaW1lIC8gMTApO1xuICAgIH07XG4gICAgcmV0dXJuIEF0dGFja2luZztcbn0oU3RhdGUpKTtcbnZhciBQcmVwYXJpbmcgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKFByZXBhcmluZywgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBQcmVwYXJpbmcoZ2FtZSkge1xuICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIuY2FsbCh0aGlzLCBcIlBSRVBBUklOR1wiKSB8fCB0aGlzO1xuICAgICAgICBfdGhpcy5nYW1lID0gZ2FtZTtcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICBQcmVwYXJpbmcucHJvdG90eXBlLmVudGVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLmdhbWUucGxheWVyLmFuaW1hdGlvbiA9IFwic3RpbGxcIjtcbiAgICB9O1xuICAgIFByZXBhcmluZy5wcm90b3R5cGUuaGFuZGxlSW5wdXQgPSBmdW5jdGlvbiAoaW5wdXQpIHtcbiAgICAgICAgdGhpcy5hdHRhY2tUaW1lciAtPSB0aGlzLmdhbWUuZGVsdGFUaW1lO1xuICAgICAgICAvLyBzcGVjaWFsIHN0YXRlIGJlZm9yZSBnYW1lIHN0YXJ0c1xuICAgICAgICBpZiAoaW5wdXQua2V5cy5pbmNsdWRlcyhcInJcIikpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmdhbWUuZ2FtZU92ZXIgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmdhbWUucmVzZXRHYW1lKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmdhbWUuY29udGV4dC5jbGVhclJlY3QoMCwgMCwgdGhpcy5nYW1lLndpZHRoLCB0aGlzLmdhbWUuaGVpZ2h0KTtcbiAgICAgICAgICAgICAgICB0aGlzLmdhbWUuZ2FtZVN0YXJ0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRoaXMuZ2FtZS5wbGF5ZXIuc2V0U3RhdGUoU1RBVEVTLlNUSUxMKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvLyBob3Jpem9udGFsIG1vdmVtZW50IChzcGVlZFhBaXJNb2RpZmllcilcbiAgICAgICAgaWYgKGlucHV0LmtleXMuaW5jbHVkZXMoXCJBcnJvd1JpZ2h0XCIpKSB7XG4gICAgICAgICAgICB0aGlzLmdhbWUucGxheWVyLmZhY2luZyA9IFwiUlwiO1xuICAgICAgICAgICAgdGhpcy5nYW1lLnBsYXllci5hbmltYXRpb24gPSBcInJ1bm5pbmdcIjtcbiAgICAgICAgICAgIHRoaXMuZ2FtZS5wbGF5ZXIuc3BlZWRYID1cbiAgICAgICAgICAgICAgICB0aGlzLmdhbWUucGxheWVyLnNwZWVkWE1vZGlmaWVyICogdGhpcy5nYW1lLnNwZWVkO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGlucHV0LmtleXMuaW5jbHVkZXMoXCJBcnJvd0xlZnRcIikpIHtcbiAgICAgICAgICAgIHRoaXMuZ2FtZS5wbGF5ZXIuZmFjaW5nID0gXCJMXCI7XG4gICAgICAgICAgICB0aGlzLmdhbWUucGxheWVyLmFuaW1hdGlvbiA9IFwicnVubmluZ1wiO1xuICAgICAgICAgICAgdGhpcy5nYW1lLnBsYXllci5zcGVlZFggPVxuICAgICAgICAgICAgICAgIC10aGlzLmdhbWUucGxheWVyLnNwZWVkWE1vZGlmaWVyICogdGhpcy5nYW1lLnNwZWVkO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5nYW1lLnBsYXllci5zcGVlZFggPSAwO1xuICAgICAgICB9XG4gICAgICAgIC8vIGp1bXBcbiAgICAgICAgaWYgKGlucHV0LmtleXMuaW5jbHVkZXMoXCJBcnJvd1VwXCIpICYmXG4gICAgICAgICAgICB0aGlzLmdhbWUucGxheWVyLmxhc3RKdW1wID4gdGhpcy5nYW1lLnBsYXllci5qdW1wQ29vbGRvd24pIHtcbiAgICAgICAgICAgIHRoaXMuZ2FtZS5wbGF5ZXIubGFzdEp1bXAgPSAwO1xuICAgICAgICAgICAgdGhpcy5nYW1lLnBsYXllci5zcGVlZFkgLT0gMjA7XG4gICAgICAgIH1cbiAgICAgICAgLy8gdXBkYXRlIHBvc2l0aW9uXG4gICAgICAgIHRoaXMuZ2FtZS5wbGF5ZXIueCArPSB0aGlzLmdhbWUucGxheWVyLnNwZWVkWCAqICh0aGlzLmdhbWUuZGVsdGFUaW1lIC8gOCk7XG4gICAgICAgIHRoaXMuZ2FtZS5wbGF5ZXIueSArPSB0aGlzLmdhbWUucGxheWVyLnNwZWVkWSAqICh0aGlzLmdhbWUuZGVsdGFUaW1lIC8gMTApO1xuICAgICAgICBpZiAoIXRoaXMuZ2FtZS5wbGF5ZXIub25Hcm91bmQoKSkge1xuICAgICAgICAgICAgdGhpcy5nYW1lLnBsYXllci5zcGVlZFkgKz1cbiAgICAgICAgICAgICAgICB0aGlzLmdhbWUucGxheWVyLndlaWdodCAqICh0aGlzLmdhbWUuZGVsdGFUaW1lIC8gMTApO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5nYW1lLnBsYXllci5zcGVlZFkgPSAwO1xuICAgICAgICB9XG4gICAgICAgIC8vIGF0dGFja1xuICAgICAgICBpZiAoKGlucHV0LmtleXMuaW5jbHVkZXMoXCJhXCIpIHx8IGlucHV0LmtleXMuaW5jbHVkZXMoXCJBcnJvd0Rvd25cIikpICYmXG4gICAgICAgICAgICB0aGlzLmdhbWUucGxheWVyLmxhc3RBdHRhY2sgPD0gdGhpcy5nYW1lLmRlbHRhVGltZSAmJlxuICAgICAgICAgICAgdGhpcy5nYW1lLnBsYXllci5hbmltYXRpb24gIT09IFwiYXR0YWNraW5nXCIpIHtcbiAgICAgICAgICAgIHRoaXMuZ2FtZS5wbGF5ZXIuZnJhbWUgPSAwO1xuICAgICAgICAgICAgdGhpcy5nYW1lLnBsYXllci5hbmltYXRpb24gPSBcImF0dGFja2luZ1wiO1xuICAgICAgICAgICAgdGhpcy5nYW1lLnBsYXllci5sYXN0QXR0YWNrID0gdGhpcy5nYW1lLnBsYXllci5hdHRhY2tDb29sZG93bjtcbiAgICAgICAgICAgIHRoaXMuZ2FtZS5wbGF5ZXIuYXR0YWNrSW5kaWNhdGVkID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLmdhbWUucGxheWVyLnNvdW5kQXhlSGl0LnBsYXkoKTtcbiAgICAgICAgICAgIHRoaXMuYXR0YWNrVGltZXIgPSB0aGlzLmdhbWUucGxheWVyLmF0dGFja0R1cmF0aW9uO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmF0dGFja1RpbWVyIDw9IHRoaXMuZ2FtZS5kZWx0YVRpbWUpIHtcbiAgICAgICAgICAgIHRoaXMuZ2FtZS5wbGF5ZXIuYW5pbWF0aW9uID0gXCJzdGlsbFwiO1xuICAgICAgICAgICAgdGhpcy5hdHRhY2tUaW1lciA9IHRoaXMuZ2FtZS5wbGF5ZXIuYXR0YWNrRHVyYXRpb247XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuZ2FtZS5wbGF5ZXIuc3BlZWRYID09PSAwICYmXG4gICAgICAgICAgICB0aGlzLmdhbWUucGxheWVyLmFuaW1hdGlvbiAhPT0gXCJhdHRhY2tpbmdcIikge1xuICAgICAgICAgICAgdGhpcy5nYW1lLnBsYXllci5hbmltYXRpb24gPSBcInN0aWxsXCI7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHJldHVybiBQcmVwYXJpbmc7XG59KFN0YXRlKSk7XG5leHBvcnQgeyBTdGF0ZSwgU3RpbGwsIFJ1bm5pbmcsIEp1bXBpbmcsIEZhbGxpbmcsIEF0dGFja2luZywgUHJlcGFyaW5nIH07XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIi8vIFdJUCA6IGFkZCB2ZXJ0aWNhbCBtb3ZlbWVudCB0byBqdW1waW5nIHN0YXRlIC0tLSA/Pz8gd2h5IGlzIHZlbG9jaXR5IGluY3JlYXNlZCB0d2ljZSA/Pz9cbi8vIGFkZCBzb3VuZFxuLy8gR2FtZSBpcyBiZWluZyBzZW50IGV2ZXJ5d2hlcmUgKyBJIGRvbid0IHdhbnQgbW9yZSB0aGFuIG9uZSBpbnN0YW5jZSAtPiBtYWtlIGl0IGEgU2luZ2xldG9uXG5pbXBvcnQgeyBDQU5WQVMyX0hFSUdIVCwgQ0FOVkFTMl9XSURUSCwgQ0FOVkFTX0hFSUdIVCwgQ0FOVkFTX1dJRFRIIH0gZnJvbSBcIi4vY29uc3QvY29uc3RcIjtcbmltcG9ydCB7IEdhbWUgfSBmcm9tIFwiLi9tb2RlbC9HYW1lXCI7XG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRcIiwgZnVuY3Rpb24gKCkge1xuICAgIC8vIGNhbnZhczEgPSBnYW1lIGFyZWFcbiAgICB2YXIgY2FudmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjYW52YXMxXCIpO1xuICAgIHZhciBjdHggPSBjYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xuICAgIGNhbnZhcy53aWR0aCA9IENBTlZBU19XSURUSDtcbiAgICBjYW52YXMuaGVpZ2h0ID0gQ0FOVkFTX0hFSUdIVDtcbiAgICAvLyBjYW52YXMyID0gSFVEXG4gICAgdmFyIGNhbnZhczIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNhbnZhczJcIik7XG4gICAgdmFyIGN0eDIgPSBjYW52YXMyLmdldENvbnRleHQoXCIyZFwiKTtcbiAgICBjYW52YXMyLndpZHRoID0gQ0FOVkFTMl9XSURUSDtcbiAgICBjYW52YXMyLmhlaWdodCA9IENBTlZBUzJfSEVJR0hUO1xuICAgIHZhciBnYW1lID0gbmV3IEdhbWUoY3R4LCBjdHgyKTtcbiAgICBnYW1lLmFuaW1hdGVQcmVwYXJhdGlvbigwKTtcbn0pO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9