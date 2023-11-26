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
/* harmony export */   CANVAS_HEIGHT: () => (/* binding */ CANVAS_HEIGHT),
/* harmony export */   CANVAS_WIDTH: () => (/* binding */ CANVAS_WIDTH),
/* harmony export */   STATES: () => (/* binding */ STATES)
/* harmony export */ });
var CANVAS_WIDTH = 768;
var CANVAS_HEIGHT = 432;
var STATES = {
    STILL: 0,
    RUNNING: 1,
    JUMPING: 2,
    FALLING: 3,
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
        var layer1 = new _Layer__WEBPACK_IMPORTED_MODULE_1__.Layer(this, this.imageLayer1, 0.2);
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
            // context.strokeRect(this.x, this.y, this.width, this.height);
            context.beginPath();
            context.arc(this.x + this.width / 2, this.y + this.height / 2, this.hitboxRadius, 0, Math.PI * 2);
            context.stroke();
        }
        context.drawImage(this.images[this.animation][this.facing], this.frameCol * this.sourceWidth, //sx
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
        this.x -= this.speedX * this.game.speed;
        this.checkForDeletion();
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
            if (_this.gameOver) {
                _this.grayscaleCanvas();
                _this.handleVictory();
            }
            else
                requestAnimationFrame(_this.animate);
        };
        this.context = context;
        this.height = _const_const__WEBPACK_IMPORTED_MODULE_0__.CANVAS_HEIGHT;
        this.width = _const_const__WEBPACK_IMPORTED_MODULE_0__.CANVAS_WIDTH;
        this.lastTime = 0;
        this.enemyInterval = 1000;
        this.randomEnemyInterval = Math.random() * 1000 + 500;
        this.enemyTimer = 0;
        this.enemies = [];
        this.input = new _InputHandler__WEBPACK_IMPORTED_MODULE_3__.InputHandler(this);
        this.background = new _Background__WEBPACK_IMPORTED_MODULE_1__.Background();
        this.player = new _Player__WEBPACK_IMPORTED_MODULE_4__.Player(this);
        this.debug = false;
        this.score = 0;
        this.speed = 1;
        this.gameOver = false;
        this.victory = false;
        this.spanScore = document.getElementById("spanScore");
        this.spanVictory = document.getElementById("spanVictory");
        this.body = document.body;
    }
    Game.prototype.handleEnemies = function (deltaTime) {
        var _this = this;
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
        if (this.score >= 20) {
            this.body.style.color = "green";
            var message = "Bravo ! A bientôt pour ton anniversaire !";
            this.spanVictory.innerHTML = message;
        }
        else {
            this.body.style.color = "darkred";
            var message = "Perdu ! Essaye encore !";
            this.spanVictory.innerHTML = message;
        }
    };
    Game.prototype.grayscaleCanvas = function () {
        var imageData = this.context.getImageData(0, 0, this.width, this.height);
        var data = imageData.data;
        for (var i = 0; i < data.length; i += 4) {
            var luminance = (0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2]);
            data[i] = luminance;
            data[i + 1] = luminance;
            data[i + 2] = luminance;
        }
        this.context.putImageData(imageData, 0, 0);
    };
    Game.prototype.displayStatusText = function () {
        this.spanScore.innerHTML = this.score.toString();
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
/* harmony import */ var _States__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./States */ "./model/States.ts");

var Player = /** @class */ (function () {
    function Player(game) {
        this.game = game;
        this.states = [
            new _States__WEBPACK_IMPORTED_MODULE_0__.Still(this),
            new _States__WEBPACK_IMPORTED_MODULE_0__.Running(this),
            new _States__WEBPACK_IMPORTED_MODULE_0__.Jumping(this),
            new _States__WEBPACK_IMPORTED_MODULE_0__.Falling(this),
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
        this.yOffset = -22; // account for character position offset on spritesheet
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
    }
    Player.prototype.draw = function (context) {
        // see https://www.youtube.com/watch?v=7JtLHJbm0kA&t=830s
        if (this.game.debug) {
            // context.strokeRect(this.x, this.y, this.width, this.height);
            context.beginPath();
            context.arc(this.x + this.width / 2.1, this.y + this.height / 1.8, this.hitboxRadius, 0, Math.PI * 2);
            context.stroke();
        }
        context.drawImage(this.images[this.animation][this.facing], this.frameCol * this.sourceWidth, // sx
        this.frameRow * this.sourceHeight, // sy
        this.width, // sw
        this.height, // sh
        this.x, this.y, this.width, this.height);
    };
    Player.prototype.update = function (input, deltaTime) {
        this.checkCollision();
        if (this.game.debug) {
            console.log("this.currentState :>> ", this.currentState);
        }
        // ----- MOVEMENT
        // horizontal movement
        if (input.keys.includes("ArrowRight")) {
            this.speedX = this.speedXModifier * this.game.speed;
            this.facing = "R";
        }
        else if (input.keys.includes("ArrowLeft")) {
            this.speedX = -this.speedXModifier * this.game.speed;
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
    function Still(player) {
        var _this = _super.call(this, "STILL") || this;
        _this.player = player;
        return _this;
    }
    Still.prototype.enter = function () {
        this.player.animation = "still";
    };
    Still.prototype.handleInput = function (input) {
        if (input.keys.includes("ArrowRight")) {
            this.player.facing = "R";
            this.player.setState(_const_const__WEBPACK_IMPORTED_MODULE_0__.STATES.RUNNING);
        }
        else if (input.keys.includes("ArrowLeft")) {
            this.player.facing = "L";
            this.player.setState(_const_const__WEBPACK_IMPORTED_MODULE_0__.STATES.RUNNING);
        }
        if (input.keys.includes("ArrowUp"))
            this.player.setState(_const_const__WEBPACK_IMPORTED_MODULE_0__.STATES.JUMPING);
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
    };
    Running.prototype.handleInput = function (input) {
        if (input.keys.includes("ArrowRight")) {
            this.player.facing = "R";
        }
        else if (input.keys.includes("ArrowLeft")) {
            this.player.facing = "L";
        }
        if (input.keys.includes("ArrowUp"))
            this.player.setState(_const_const__WEBPACK_IMPORTED_MODULE_0__.STATES.JUMPING);
        if (this.player.speedX === 0)
            this.player.setState(_const_const__WEBPACK_IMPORTED_MODULE_0__.STATES.STILL);
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
    };
    Jumping.prototype.handleInput = function (input) {
        if (this.player.speedY > this.player.weight) {
            this.player.setState(_const_const__WEBPACK_IMPORTED_MODULE_0__.STATES.FALLING);
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
    };
    Falling.prototype.handleInput = function (input) {
        if (this.player.onGround()) {
            this.player.setState(_const_const__WEBPACK_IMPORTED_MODULE_0__.STATES.STILL);
        }
    };
    return Falling;
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
// WIP : add hitbox ; add score


window.addEventListener("load", function () {
    var canvas = document.getElementById("canvas1");
    var ctx = canvas.getContext("2d");
    canvas.width = _const_const__WEBPACK_IMPORTED_MODULE_0__.CANVAS_WIDTH;
    canvas.height = _const_const__WEBPACK_IMPORTED_MODULE_0__.CANVAS_HEIGHT;
    var game = new _model_Game__WEBPACK_IMPORTED_MODULE_1__.Game(ctx);
    game.animate(0);
});

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0EsaUNBQWlDLGdEQUFNO0FBQ3ZDO0FBQ0E7QUFDQSxpQ0FBaUMsZ0RBQU07QUFDdkM7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQ0FBaUMsZ0RBQU07QUFDdkM7QUFDQSxpQ0FBaUMsZ0RBQU07QUFDdkM7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQ0FBaUMsZ0RBQU07QUFDdkM7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlDQUFpQyxnREFBTTtBQUN2QztBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ2tEOzs7Ozs7O1VDeEduRDtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7OztBQ05BLHNCQUFzQjtBQUNzQztBQUN4QjtBQUNwQztBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsc0RBQVk7QUFDL0Isb0JBQW9CLHVEQUFhO0FBQ2pDLG1CQUFtQiw2Q0FBSTtBQUN2QjtBQUNBLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9Hb2JsaW5fU2lkZXNjcm9sbGVyLy4vY29uc3QvY29uc3QudHMiLCJ3ZWJwYWNrOi8vR29ibGluX1NpZGVzY3JvbGxlci8uL21vZGVsL0JhY2tncm91bmQudHMiLCJ3ZWJwYWNrOi8vR29ibGluX1NpZGVzY3JvbGxlci8uL21vZGVsL0VuZW15LnRzIiwid2VicGFjazovL0dvYmxpbl9TaWRlc2Nyb2xsZXIvLi9tb2RlbC9HYW1lLnRzIiwid2VicGFjazovL0dvYmxpbl9TaWRlc2Nyb2xsZXIvLi9tb2RlbC9JbnB1dEhhbmRsZXIudHMiLCJ3ZWJwYWNrOi8vR29ibGluX1NpZGVzY3JvbGxlci8uL21vZGVsL0xheWVyLnRzIiwid2VicGFjazovL0dvYmxpbl9TaWRlc2Nyb2xsZXIvLi9tb2RlbC9QbGF5ZXIudHMiLCJ3ZWJwYWNrOi8vR29ibGluX1NpZGVzY3JvbGxlci8uL21vZGVsL1N0YXRlcy50cyIsIndlYnBhY2s6Ly9Hb2JsaW5fU2lkZXNjcm9sbGVyL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL0dvYmxpbl9TaWRlc2Nyb2xsZXIvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL0dvYmxpbl9TaWRlc2Nyb2xsZXIvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9Hb2JsaW5fU2lkZXNjcm9sbGVyL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vR29ibGluX1NpZGVzY3JvbGxlci8uL3NjcmlwdC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgQ0FOVkFTX1dJRFRIID0gNzY4O1xudmFyIENBTlZBU19IRUlHSFQgPSA0MzI7XG52YXIgU1RBVEVTID0ge1xuICAgIFNUSUxMOiAwLFxuICAgIFJVTk5JTkc6IDEsXG4gICAgSlVNUElORzogMixcbiAgICBGQUxMSU5HOiAzLFxufTtcbmV4cG9ydCB7IENBTlZBU19XSURUSCwgQ0FOVkFTX0hFSUdIVCwgU1RBVEVTIH07XG4iLCJpbXBvcnQgeyBDQU5WQVNfV0lEVEgsIENBTlZBU19IRUlHSFQgfSBmcm9tIFwiLi4vY29uc3QvY29uc3RcIjtcbmltcG9ydCB7IExheWVyIH0gZnJvbSBcIi4vTGF5ZXJcIjtcbnZhciBCYWNrZ3JvdW5kID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIEJhY2tncm91bmQoKSB7XG4gICAgICAgIHRoaXMueCA9IDA7XG4gICAgICAgIHRoaXMueSA9IDA7XG4gICAgICAgIHRoaXMud2lkdGggPSBDQU5WQVNfV0lEVEg7XG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gQ0FOVkFTX0hFSUdIVDtcbiAgICAgICAgdGhpcy5zcGVlZFggPSAwO1xuICAgICAgICB0aGlzLmltYWdlTGF5ZXIxID0gbmV3IEltYWdlKDYwLCA0MCk7XG4gICAgICAgIHRoaXMuaW1hZ2VMYXllcjEuc3JjID0gXCJhc3NldHMvaW1nL2JhY2tncm91bmQvcGx4LTEucG5nXCI7XG4gICAgICAgIHZhciBsYXllcjEgPSBuZXcgTGF5ZXIodGhpcywgdGhpcy5pbWFnZUxheWVyMSwgMC4yKTtcbiAgICAgICAgdGhpcy5pbWFnZUxheWVyMiA9IG5ldyBJbWFnZSg2MCwgNDApO1xuICAgICAgICB0aGlzLmltYWdlTGF5ZXIyLnNyYyA9IFwiYXNzZXRzL2ltZy9iYWNrZ3JvdW5kL3BseC0yLnBuZ1wiO1xuICAgICAgICB2YXIgbGF5ZXIyID0gbmV3IExheWVyKHRoaXMsIHRoaXMuaW1hZ2VMYXllcjIsIDAuNCk7XG4gICAgICAgIHRoaXMuaW1hZ2VMYXllcjMgPSBuZXcgSW1hZ2UoNjAsIDQwKTtcbiAgICAgICAgdGhpcy5pbWFnZUxheWVyMy5zcmMgPSBcImFzc2V0cy9pbWcvYmFja2dyb3VuZC9wbHgtMy5wbmdcIjtcbiAgICAgICAgdmFyIGxheWVyMyA9IG5ldyBMYXllcih0aGlzLCB0aGlzLmltYWdlTGF5ZXIzLCAwLjYpO1xuICAgICAgICB0aGlzLmltYWdlTGF5ZXI0ID0gbmV3IEltYWdlKDYwLCA0MCk7XG4gICAgICAgIHRoaXMuaW1hZ2VMYXllcjQuc3JjID0gXCJhc3NldHMvaW1nL2JhY2tncm91bmQvcGx4LTQucG5nXCI7XG4gICAgICAgIHZhciBsYXllcjQgPSBuZXcgTGF5ZXIodGhpcywgdGhpcy5pbWFnZUxheWVyNCwgMC44KTtcbiAgICAgICAgdGhpcy5pbWFnZUxheWVyNSA9IG5ldyBJbWFnZSg2MCwgNDApO1xuICAgICAgICB0aGlzLmltYWdlTGF5ZXI1LnNyYyA9IFwiYXNzZXRzL2ltZy9iYWNrZ3JvdW5kL3BseC01LnBuZ1wiO1xuICAgICAgICB2YXIgbGF5ZXI1ID0gbmV3IExheWVyKHRoaXMsIHRoaXMuaW1hZ2VMYXllcjUsIDEuMCk7XG4gICAgICAgIHRoaXMuaW1hZ2VHcm91bmQgPSBuZXcgSW1hZ2UoNjAsIDQwKTtcbiAgICAgICAgdGhpcy5pbWFnZUdyb3VuZC5zcmMgPSBcImFzc2V0cy9pbWcvYmFja2dyb3VuZC9ncm91bmQucG5nXCI7XG4gICAgICAgIHZhciBsYXllckdyb3VuZCA9IG5ldyBMYXllcih0aGlzLCB0aGlzLmltYWdlR3JvdW5kLCAxLjEpO1xuICAgICAgICB0aGlzLmxheWVycyA9IFtsYXllcjEsIGxheWVyMiwgbGF5ZXIzLCBsYXllcjQsIGxheWVyNSwgbGF5ZXJHcm91bmRdO1xuICAgIH1cbiAgICBCYWNrZ3JvdW5kLnByb3RvdHlwZS5kcmF3ID0gZnVuY3Rpb24gKGNvbnRleHQpIHtcbiAgICAgICAgdGhpcy5sYXllcnMuZm9yRWFjaChmdW5jdGlvbiAobGF5ZXIpIHtcbiAgICAgICAgICAgIGxheWVyLmRyYXcoY29udGV4dCk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgQmFja2dyb3VuZC5wcm90b3R5cGUudXBkYXRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLmxheWVycy5mb3JFYWNoKGZ1bmN0aW9uIChsYXllcikge1xuICAgICAgICAgICAgbGF5ZXIudXBkYXRlKCk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgcmV0dXJuIEJhY2tncm91bmQ7XG59KCkpO1xuZXhwb3J0IHsgQmFja2dyb3VuZCB9O1xuIiwidmFyIEVuZW15ID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIEVuZW15KGdhbWUpIHtcbiAgICAgICAgdGhpcy5nYW1lID0gZ2FtZTtcbiAgICAgICAgdGhpcy5pbWFnZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaW1nQm9hclwiKTtcbiAgICAgICAgdGhpcy53aWR0aCA9IDYwOyAvLyBkaXNwbGF5ZWQgd2lkdGhcbiAgICAgICAgdGhpcy5oZWlnaHQgPSA2MDsgLy8gZGlzcGxheWVkIGhlaWdodFxuICAgICAgICB0aGlzLnggPSB0aGlzLmdhbWUud2lkdGg7XG4gICAgICAgIHRoaXMueU9mZnNldCA9IC0xNzsgLy8gYWNjb3VudCBmb3IgY2hhcmFjdGVyIG9mZnNldCBvbiBzcHJpdGVcbiAgICAgICAgdGhpcy55ID0gdGhpcy5nYW1lLmhlaWdodCAtIHRoaXMuaGVpZ2h0ICsgdGhpcy55T2Zmc2V0O1xuICAgICAgICB0aGlzLnNwZWVkWCA9IDI7XG4gICAgICAgIHRoaXMubWF4RnJhbWVDb2wgPSA0OyAvLyBudW1iZXIgb2YgY29sdW1ucyBvbiBzcHJpdGVzaGVldFxuICAgICAgICB0aGlzLm1heEZyYW1lUm93ID0gMjsgLy8gbnVtYmVyIG9yIHJvd3Mgb24gc3ByaXRlc2hlZXRcbiAgICAgICAgdGhpcy5zb3VyY2VXaWR0aCA9IDEyNDsgLy8gd2lkdGggb2YgZWFjaCBzcHJpdGUgb24gc3ByaXRlc2hlZXRcbiAgICAgICAgdGhpcy5zb3VyY2VIZWlnaHQgPSAxMjQ7IC8vIGhlaWdodCBvZiBlYWNoIHNwcml0ZSBvbiBzcHJpdGVzaGVldFxuICAgICAgICB0aGlzLmZyYW1lID0gMDtcbiAgICAgICAgdGhpcy5mcmFtZUNvbCA9IHRoaXMuZnJhbWUgJSB0aGlzLm1heEZyYW1lQ29sO1xuICAgICAgICB0aGlzLmZyYW1lUm93ID0gTWF0aC5mbG9vcih0aGlzLmZyYW1lIC8gdGhpcy5tYXhGcmFtZUNvbCk7XG4gICAgICAgIHRoaXMuZnBzID0gMTU7XG4gICAgICAgIHRoaXMuZnJhbWVUaW1lciA9IDA7XG4gICAgICAgIHRoaXMuaGl0Ym94UmFkaXVzID0gdGhpcy53aWR0aCAvIDIuMzU7XG4gICAgICAgIHRoaXMubWFya2VkRm9yRGVsZXRpb24gPSBmYWxzZTtcbiAgICAgICAgdGhpcy5hbmltYXRpb24gPSBcInJ1bm5pbmdcIjtcbiAgICAgICAgdGhpcy5mYWNpbmcgPSBcIkxcIjtcbiAgICAgICAgdGhpcy5pbWFnZXMgPSB7XG4gICAgICAgICAgICBzdGlsbDoge1xuICAgICAgICAgICAgICAgIEw6IG51bGwsXG4gICAgICAgICAgICAgICAgUjogbnVsbCxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBydW5uaW5nOiB7XG4gICAgICAgICAgICAgICAgTDogbnVsbCxcbiAgICAgICAgICAgICAgICBSOiBudWxsLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHR1cm5pbmc6IHtcbiAgICAgICAgICAgICAgICBMOiBudWxsLFxuICAgICAgICAgICAgICAgIFI6IG51bGwsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYXR0YWNraW5nOiB7XG4gICAgICAgICAgICAgICAgTDogbnVsbCxcbiAgICAgICAgICAgICAgICBSOiBudWxsLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGh1cnQ6IHtcbiAgICAgICAgICAgICAgICBMOiBudWxsLFxuICAgICAgICAgICAgICAgIFI6IG51bGwsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZHlpbmc6IHtcbiAgICAgICAgICAgICAgICBMOiBudWxsLFxuICAgICAgICAgICAgICAgIFI6IG51bGwsXG4gICAgICAgICAgICB9LFxuICAgICAgICB9O1xuICAgICAgICB0aGlzLmltYWdlcy5zdGlsbC5MID0gbmV3IEltYWdlKDYwLCA0NSk7XG4gICAgICAgIHRoaXMuaW1hZ2VzLnN0aWxsLkwuc3JjID1cbiAgICAgICAgICAgIFwiYXNzZXRzL2ltZy9jaGFyYWN0ZXJzL2JvYXIvYm9hcl9zdGlsbF9MX3Nwcml0ZXNoZWV0LnBuZ1wiO1xuICAgICAgICB0aGlzLmltYWdlcy5zdGlsbC5SID0gbmV3IEltYWdlKDYwLCA0NSk7XG4gICAgICAgIHRoaXMuaW1hZ2VzLnN0aWxsLlIuc3JjID1cbiAgICAgICAgICAgIFwiYXNzZXRzL2ltZy9jaGFyYWN0ZXJzL2JvYXIvYm9hcl9zdGlsbF9SX3Nwcml0ZXNoZWV0LnBuZ1wiO1xuICAgICAgICB0aGlzLmltYWdlcy5ydW5uaW5nLkwgPSBuZXcgSW1hZ2UoNjAsIDQ1KTtcbiAgICAgICAgdGhpcy5pbWFnZXMucnVubmluZy5MLnNyYyA9XG4gICAgICAgICAgICBcImFzc2V0cy9pbWcvY2hhcmFjdGVycy9ib2FyL2JvYXJfcnVubmluZ19MX3Nwcml0ZXNoZWV0LnBuZ1wiO1xuICAgICAgICB0aGlzLmltYWdlcy5ydW5uaW5nLlIgPSBuZXcgSW1hZ2UoNjAsIDQ1KTtcbiAgICAgICAgdGhpcy5pbWFnZXMucnVubmluZy5SLnNyYyA9XG4gICAgICAgICAgICBcImFzc2V0cy9pbWcvY2hhcmFjdGVycy9ib2FyL2JvYXJfcnVubmluZ19SX3Nwcml0ZXNoZWV0LnBuZ1wiO1xuICAgICAgICB0aGlzLmltYWdlcy50dXJuaW5nLkwgPSBuZXcgSW1hZ2UoNjAsIDQ1KTtcbiAgICAgICAgdGhpcy5pbWFnZXMudHVybmluZy5MLnNyYyA9XG4gICAgICAgICAgICBcImFzc2V0cy9pbWcvY2hhcmFjdGVycy9ib2FyL2JvYXJfdHVybmluZ19MX3Nwcml0ZXNoZWV0LnBuZ1wiO1xuICAgICAgICB0aGlzLmltYWdlcy50dXJuaW5nLlIgPSBuZXcgSW1hZ2UoNjAsIDQ1KTtcbiAgICAgICAgdGhpcy5pbWFnZXMudHVybmluZy5SLnNyYyA9XG4gICAgICAgICAgICBcImFzc2V0cy9pbWcvY2hhcmFjdGVycy9ib2FyL2JvYXJfdHVybmluZ19SX3Nwcml0ZXNoZWV0LnBuZ1wiO1xuICAgICAgICB0aGlzLmltYWdlcy5hdHRhY2tpbmcuTCA9IG5ldyBJbWFnZSg2MCwgNDUpO1xuICAgICAgICB0aGlzLmltYWdlcy5hdHRhY2tpbmcuTC5zcmMgPVxuICAgICAgICAgICAgXCJhc3NldHMvaW1nL2NoYXJhY3RlcnMvYm9hci9ib2FyX2F0dGFja2luZ19MX3Nwcml0ZXNoZWV0LnBuZ1wiO1xuICAgICAgICB0aGlzLmltYWdlcy5hdHRhY2tpbmcuUiA9IG5ldyBJbWFnZSg2MCwgNDUpO1xuICAgICAgICB0aGlzLmltYWdlcy5hdHRhY2tpbmcuUi5zcmMgPVxuICAgICAgICAgICAgXCJhc3NldHMvaW1nL2NoYXJhY3RlcnMvYm9hci9ib2FyX2F0dGFja2luZ19SX3Nwcml0ZXNoZWV0LnBuZ1wiO1xuICAgICAgICB0aGlzLmltYWdlcy5odXJ0LkwgPSBuZXcgSW1hZ2UoNjAsIDQ1KTtcbiAgICAgICAgdGhpcy5pbWFnZXMuaHVydC5MLnNyYyA9XG4gICAgICAgICAgICBcImFzc2V0cy9pbWcvY2hhcmFjdGVycy9ib2FyL2JvYXJfaHVydF9MX3Nwcml0ZXNoZWV0LnBuZ1wiO1xuICAgICAgICB0aGlzLmltYWdlcy5odXJ0LlIgPSBuZXcgSW1hZ2UoNjAsIDQ1KTtcbiAgICAgICAgdGhpcy5pbWFnZXMuaHVydC5SLnNyYyA9XG4gICAgICAgICAgICBcImFzc2V0cy9pbWcvY2hhcmFjdGVycy9ib2FyL2JvYXJfaHVydF9SX3Nwcml0ZXNoZWV0LnBuZ1wiO1xuICAgICAgICB0aGlzLmltYWdlcy5keWluZy5MID0gbmV3IEltYWdlKDYwLCA0NSk7XG4gICAgICAgIHRoaXMuaW1hZ2VzLmR5aW5nLkwuc3JjID1cbiAgICAgICAgICAgIFwiYXNzZXRzL2ltZy9jaGFyYWN0ZXJzL2JvYXIvYm9hcl9keWluZ19MX3Nwcml0ZXNoZWV0LnBuZ1wiO1xuICAgICAgICB0aGlzLmltYWdlcy5keWluZy5SID0gbmV3IEltYWdlKDYwLCA0NSk7XG4gICAgICAgIHRoaXMuaW1hZ2VzLmR5aW5nLlIuc3JjID1cbiAgICAgICAgICAgIFwiYXNzZXRzL2ltZy9jaGFyYWN0ZXJzL2JvYXIvYm9hcl9keWluZ19SX3Nwcml0ZXNoZWV0LnBuZ1wiO1xuICAgIH1cbiAgICBFbmVteS5wcm90b3R5cGUuZHJhdyA9IGZ1bmN0aW9uIChjb250ZXh0KSB7XG4gICAgICAgIGlmICh0aGlzLmdhbWUuZGVidWcpIHtcbiAgICAgICAgICAgIC8vIGNvbnRleHQuc3Ryb2tlUmVjdCh0aGlzLngsIHRoaXMueSwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQpO1xuICAgICAgICAgICAgY29udGV4dC5iZWdpblBhdGgoKTtcbiAgICAgICAgICAgIGNvbnRleHQuYXJjKHRoaXMueCArIHRoaXMud2lkdGggLyAyLCB0aGlzLnkgKyB0aGlzLmhlaWdodCAvIDIsIHRoaXMuaGl0Ym94UmFkaXVzLCAwLCBNYXRoLlBJICogMik7XG4gICAgICAgICAgICBjb250ZXh0LnN0cm9rZSgpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnRleHQuZHJhd0ltYWdlKHRoaXMuaW1hZ2VzW3RoaXMuYW5pbWF0aW9uXVt0aGlzLmZhY2luZ10sIHRoaXMuZnJhbWVDb2wgKiB0aGlzLnNvdXJjZVdpZHRoLCAvL3N4XG4gICAgICAgIHRoaXMuZnJhbWVSb3cgKiB0aGlzLnNvdXJjZUhlaWdodCwgLy9zeVxuICAgICAgICB0aGlzLnNvdXJjZVdpZHRoLCAvL3N3XG4gICAgICAgIHRoaXMuc291cmNlSGVpZ2h0LCAvL3NoXG4gICAgICAgIHRoaXMueCwgdGhpcy55LCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCk7XG4gICAgfTtcbiAgICBFbmVteS5wcm90b3R5cGUuY2hlY2tGb3JEZWxldGlvbiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHRoaXMueCA8IDAgLSB0aGlzLndpZHRoKSB7XG4gICAgICAgICAgICB0aGlzLm1hcmtlZEZvckRlbGV0aW9uID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuZ2FtZS5zY29yZSsrO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBFbmVteS5wcm90b3R5cGUudXBkYXRlID0gZnVuY3Rpb24gKGRlbHRhVGltZSkge1xuICAgICAgICAvLyBhbmltYXRpb25cbiAgICAgICAgLy8gdXBkYXRlIGVuZW15IGZyYW1lIG9ubHkgd2hlbiBhYm92ZSBmcHMgaW50ZXJ2YWxcbiAgICAgICAgaWYgKHRoaXMuZnJhbWVUaW1lciA+IDEwMDAgLyB0aGlzLmZwcykge1xuICAgICAgICAgICAgLy8gaWYgcmVhY2hlZCBlbmQgb2Ygc3ByaXRlc2hlZXQsIHJlcG9zaXRpb25zIHRvIHN0YXJ0IG9mIHNwcml0ZXNoZWV0XG4gICAgICAgICAgICBpZiAodGhpcy5mcmFtZSA9PT0gdGhpcy5tYXhGcmFtZVJvdyAqIHRoaXMubWF4RnJhbWVDb2wgLSAxKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5mcmFtZSA9IDA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmZyYW1lKys7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmZyYW1lVGltZXIgPSAwO1xuICAgICAgICAgICAgLy8gY3ljbGUgdGhyb3VnaCBzcHJpdGVzaGVldCByb3dzL2NvbHVtbnNcbiAgICAgICAgICAgIHRoaXMuZnJhbWVDb2wgPSB0aGlzLmZyYW1lICUgdGhpcy5tYXhGcmFtZUNvbDtcbiAgICAgICAgICAgIHRoaXMuZnJhbWVSb3cgPSBNYXRoLmZsb29yKHRoaXMuZnJhbWUgLyB0aGlzLm1heEZyYW1lQ29sKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZnJhbWVUaW1lciArPSBkZWx0YVRpbWU7XG4gICAgICAgIH1cbiAgICAgICAgLy8gaG9yaXpvbnRhbCBtb3ZlbWVudFxuICAgICAgICB0aGlzLnggLT0gdGhpcy5zcGVlZFggKiB0aGlzLmdhbWUuc3BlZWQ7XG4gICAgICAgIHRoaXMuY2hlY2tGb3JEZWxldGlvbigpO1xuICAgIH07XG4gICAgcmV0dXJuIEVuZW15O1xufSgpKTtcbmV4cG9ydCB7IEVuZW15IH07XG4iLCJpbXBvcnQgeyBDQU5WQVNfSEVJR0hULCBDQU5WQVNfV0lEVEggfSBmcm9tIFwiLi4vY29uc3QvY29uc3RcIjtcbmltcG9ydCB7IEJhY2tncm91bmQgfSBmcm9tIFwiLi9CYWNrZ3JvdW5kXCI7XG5pbXBvcnQgeyBFbmVteSB9IGZyb20gXCIuL0VuZW15XCI7XG5pbXBvcnQgeyBJbnB1dEhhbmRsZXIgfSBmcm9tIFwiLi9JbnB1dEhhbmRsZXJcIjtcbmltcG9ydCB7IFBsYXllciB9IGZyb20gXCIuL1BsYXllclwiO1xuLy8gaW1wb3J0IFwiLi4vc2NyaXB0cy9yZXF1aXJlLmpzXCI7XG52YXIgR2FtZSA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBHYW1lKGNvbnRleHQpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdGhpcy5hbmltYXRlID0gZnVuY3Rpb24gKHRpbWVTdGFtcCkge1xuICAgICAgICAgICAgdmFyIGRlbHRhVGltZSA9IHRpbWVTdGFtcCAtIF90aGlzLmxhc3RUaW1lO1xuICAgICAgICAgICAgX3RoaXMubGFzdFRpbWUgPSB0aW1lU3RhbXA7XG4gICAgICAgICAgICBfdGhpcy5jb250ZXh0LmNsZWFyUmVjdCgwLCAwLCBfdGhpcy53aWR0aCwgX3RoaXMuaGVpZ2h0KTtcbiAgICAgICAgICAgIF90aGlzLmJhY2tncm91bmQuZHJhdyhfdGhpcy5jb250ZXh0KTtcbiAgICAgICAgICAgIF90aGlzLmJhY2tncm91bmQudXBkYXRlKCk7XG4gICAgICAgICAgICBfdGhpcy5wbGF5ZXIuZHJhdyhfdGhpcy5jb250ZXh0KTtcbiAgICAgICAgICAgIF90aGlzLnBsYXllci51cGRhdGUoX3RoaXMuaW5wdXQsIGRlbHRhVGltZSk7XG4gICAgICAgICAgICBfdGhpcy5oYW5kbGVFbmVtaWVzKGRlbHRhVGltZSk7XG4gICAgICAgICAgICBfdGhpcy5kaXNwbGF5U3RhdHVzVGV4dCgpO1xuICAgICAgICAgICAgaWYgKF90aGlzLmdhbWVPdmVyKSB7XG4gICAgICAgICAgICAgICAgX3RoaXMuZ3JheXNjYWxlQ2FudmFzKCk7XG4gICAgICAgICAgICAgICAgX3RoaXMuaGFuZGxlVmljdG9yeSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShfdGhpcy5hbmltYXRlKTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5jb250ZXh0ID0gY29udGV4dDtcbiAgICAgICAgdGhpcy5oZWlnaHQgPSBDQU5WQVNfSEVJR0hUO1xuICAgICAgICB0aGlzLndpZHRoID0gQ0FOVkFTX1dJRFRIO1xuICAgICAgICB0aGlzLmxhc3RUaW1lID0gMDtcbiAgICAgICAgdGhpcy5lbmVteUludGVydmFsID0gMTAwMDtcbiAgICAgICAgdGhpcy5yYW5kb21FbmVteUludGVydmFsID0gTWF0aC5yYW5kb20oKSAqIDEwMDAgKyA1MDA7XG4gICAgICAgIHRoaXMuZW5lbXlUaW1lciA9IDA7XG4gICAgICAgIHRoaXMuZW5lbWllcyA9IFtdO1xuICAgICAgICB0aGlzLmlucHV0ID0gbmV3IElucHV0SGFuZGxlcih0aGlzKTtcbiAgICAgICAgdGhpcy5iYWNrZ3JvdW5kID0gbmV3IEJhY2tncm91bmQoKTtcbiAgICAgICAgdGhpcy5wbGF5ZXIgPSBuZXcgUGxheWVyKHRoaXMpO1xuICAgICAgICB0aGlzLmRlYnVnID0gZmFsc2U7XG4gICAgICAgIHRoaXMuc2NvcmUgPSAwO1xuICAgICAgICB0aGlzLnNwZWVkID0gMTtcbiAgICAgICAgdGhpcy5nYW1lT3ZlciA9IGZhbHNlO1xuICAgICAgICB0aGlzLnZpY3RvcnkgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5zcGFuU2NvcmUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNwYW5TY29yZVwiKTtcbiAgICAgICAgdGhpcy5zcGFuVmljdG9yeSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic3BhblZpY3RvcnlcIik7XG4gICAgICAgIHRoaXMuYm9keSA9IGRvY3VtZW50LmJvZHk7XG4gICAgfVxuICAgIEdhbWUucHJvdG90eXBlLmhhbmRsZUVuZW1pZXMgPSBmdW5jdGlvbiAoZGVsdGFUaW1lKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIGlmICh0aGlzLmVuZW15VGltZXIgPiB0aGlzLmVuZW15SW50ZXJ2YWwgKyB0aGlzLnJhbmRvbUVuZW15SW50ZXJ2YWwpIHtcbiAgICAgICAgICAgIHRoaXMuZW5lbWllcy5wdXNoKG5ldyBFbmVteSh0aGlzKSk7XG4gICAgICAgICAgICB0aGlzLnJhbmRvbUVuZW15SW50ZXJ2YWwgPSBNYXRoLnJhbmRvbSgpICogMTAwMDtcbiAgICAgICAgICAgIHRoaXMuZW5lbXlUaW1lciA9IDA7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmVuZW15VGltZXIgKz0gZGVsdGFUaW1lO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZW5lbWllcy5mb3JFYWNoKGZ1bmN0aW9uIChlbmVteSkge1xuICAgICAgICAgICAgZW5lbXkuZHJhdyhfdGhpcy5jb250ZXh0KTtcbiAgICAgICAgICAgIGVuZW15LnVwZGF0ZShkZWx0YVRpbWUpO1xuICAgICAgICAgICAgX3RoaXMuZW5lbWllcyA9IF90aGlzLmVuZW1pZXMuZmlsdGVyKGZ1bmN0aW9uIChlbmVteSkgeyByZXR1cm4gIWVuZW15Lm1hcmtlZEZvckRlbGV0aW9uOyB9KTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBHYW1lLnByb3RvdHlwZS5oYW5kbGVWaWN0b3J5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAodGhpcy5zY29yZSA+PSAyMCkge1xuICAgICAgICAgICAgdGhpcy5ib2R5LnN0eWxlLmNvbG9yID0gXCJncmVlblwiO1xuICAgICAgICAgICAgdmFyIG1lc3NhZ2UgPSBcIkJyYXZvICEgQSBiaWVudMO0dCBwb3VyIHRvbiBhbm5pdmVyc2FpcmUgIVwiO1xuICAgICAgICAgICAgdGhpcy5zcGFuVmljdG9yeS5pbm5lckhUTUwgPSBtZXNzYWdlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5ib2R5LnN0eWxlLmNvbG9yID0gXCJkYXJrcmVkXCI7XG4gICAgICAgICAgICB2YXIgbWVzc2FnZSA9IFwiUGVyZHUgISBFc3NheWUgZW5jb3JlICFcIjtcbiAgICAgICAgICAgIHRoaXMuc3BhblZpY3RvcnkuaW5uZXJIVE1MID0gbWVzc2FnZTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgR2FtZS5wcm90b3R5cGUuZ3JheXNjYWxlQ2FudmFzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgaW1hZ2VEYXRhID0gdGhpcy5jb250ZXh0LmdldEltYWdlRGF0YSgwLCAwLCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCk7XG4gICAgICAgIHZhciBkYXRhID0gaW1hZ2VEYXRhLmRhdGE7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZGF0YS5sZW5ndGg7IGkgKz0gNCkge1xuICAgICAgICAgICAgdmFyIGx1bWluYW5jZSA9ICgwLjI5OSAqIGRhdGFbaV0gKyAwLjU4NyAqIGRhdGFbaSArIDFdICsgMC4xMTQgKiBkYXRhW2kgKyAyXSk7XG4gICAgICAgICAgICBkYXRhW2ldID0gbHVtaW5hbmNlO1xuICAgICAgICAgICAgZGF0YVtpICsgMV0gPSBsdW1pbmFuY2U7XG4gICAgICAgICAgICBkYXRhW2kgKyAyXSA9IGx1bWluYW5jZTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmNvbnRleHQucHV0SW1hZ2VEYXRhKGltYWdlRGF0YSwgMCwgMCk7XG4gICAgfTtcbiAgICBHYW1lLnByb3RvdHlwZS5kaXNwbGF5U3RhdHVzVGV4dCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5zcGFuU2NvcmUuaW5uZXJIVE1MID0gdGhpcy5zY29yZS50b1N0cmluZygpO1xuICAgIH07XG4gICAgcmV0dXJuIEdhbWU7XG59KCkpO1xuZXhwb3J0IHsgR2FtZSB9O1xuIiwidmFyIElucHV0SGFuZGxlciA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBJbnB1dEhhbmRsZXIoZ2FtZSkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB0aGlzLmdhbWUgPSBnYW1lO1xuICAgICAgICB0aGlzLmtleXMgPSBbXTtcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICBpZiAoKGUua2V5ID09PSBcIkFycm93RG93blwiIHx8XG4gICAgICAgICAgICAgICAgZS5rZXkgPT09IFwiQXJyb3dVcFwiIHx8XG4gICAgICAgICAgICAgICAgZS5rZXkgPT09IFwiQXJyb3dMZWZ0XCIgfHxcbiAgICAgICAgICAgICAgICBlLmtleSA9PT0gXCJBcnJvd1JpZ2h0XCIpICYmXG4gICAgICAgICAgICAgICAgIV90aGlzLmtleXMuaW5jbHVkZXMoZS5rZXkpKSB7XG4gICAgICAgICAgICAgICAgX3RoaXMua2V5cy5wdXNoKGUua2V5KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGUua2V5ID09PSBcImRcIikge1xuICAgICAgICAgICAgICAgIF90aGlzLmdhbWUuZGVidWcgPSAhX3RoaXMuZ2FtZS5kZWJ1ZztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwia2V5dXBcIiwgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgIGlmIChlLmtleSA9PT0gXCJBcnJvd0Rvd25cIiB8fFxuICAgICAgICAgICAgICAgIGUua2V5ID09PSBcIkFycm93VXBcIiB8fFxuICAgICAgICAgICAgICAgIGUua2V5ID09PSBcIkFycm93TGVmdFwiIHx8XG4gICAgICAgICAgICAgICAgZS5rZXkgPT09IFwiQXJyb3dSaWdodFwiKSB7XG4gICAgICAgICAgICAgICAgX3RoaXMua2V5cy5zcGxpY2UoX3RoaXMua2V5cy5pbmRleE9mKGUua2V5KSwgMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gSW5wdXRIYW5kbGVyO1xufSgpKTtcbmV4cG9ydCB7IElucHV0SGFuZGxlciB9O1xuIiwidmFyIExheWVyID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIExheWVyKGJhY2tncm91bmQsIGltYWdlLCBzcGVlZE1vZGlmaWVyKSB7XG4gICAgICAgIHRoaXMuYmFja2dyb3VuZCA9IGJhY2tncm91bmQ7XG4gICAgICAgIHRoaXMud2lkdGggPSB0aGlzLmJhY2tncm91bmQud2lkdGg7XG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gdGhpcy5iYWNrZ3JvdW5kLmhlaWdodDtcbiAgICAgICAgdGhpcy5pbWFnZSA9IGltYWdlO1xuICAgICAgICB0aGlzLnNwZWVkTW9kaWZpZXIgPSBzcGVlZE1vZGlmaWVyO1xuICAgICAgICB0aGlzLnggPSAwO1xuICAgICAgICB0aGlzLngyID0gMDtcbiAgICAgICAgdGhpcy55ID0gMDtcbiAgICAgICAgdGhpcy5zcGVlZCA9IHRoaXMuYmFja2dyb3VuZC5zcGVlZFggKiB0aGlzLnNwZWVkTW9kaWZpZXI7XG4gICAgfVxuICAgIExheWVyLnByb3RvdHlwZS51cGRhdGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuc3BlZWQgPSB0aGlzLmJhY2tncm91bmQuc3BlZWRYICogdGhpcy5zcGVlZE1vZGlmaWVyO1xuICAgICAgICB0aGlzLnggPSB0aGlzLnggKyB0aGlzLnNwZWVkO1xuICAgICAgICAvLyByZXNldCBpbWFnZTEgcG9zaXRpb24gaWYgb2ZmLWxpbWl0c1xuICAgICAgICBpZiAodGhpcy54IDwgMCAtIHRoaXMud2lkdGgpIHtcbiAgICAgICAgICAgIHRoaXMueCA9IDA7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodGhpcy54ID4gdGhpcy53aWR0aCkge1xuICAgICAgICAgICAgdGhpcy54ID0gMDtcbiAgICAgICAgfVxuICAgICAgICAvLyBwb3NpdGlvbnMgaW1hZ2UyIHRvIGxlZnQgb3IgcmlnaHRcbiAgICAgICAgaWYgKHRoaXMueCA8PSAwKSB7XG4gICAgICAgICAgICB0aGlzLngyID0gdGhpcy54ICsgdGhpcy53aWR0aDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMueDIgPSB0aGlzLnggLSB0aGlzLndpZHRoO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBMYXllci5wcm90b3R5cGUuZHJhdyA9IGZ1bmN0aW9uIChjb250ZXh0KSB7XG4gICAgICAgIGNvbnRleHQuZHJhd0ltYWdlKHRoaXMuaW1hZ2UsIHRoaXMueCwgdGhpcy55LCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCk7XG4gICAgICAgIGNvbnRleHQuZHJhd0ltYWdlKHRoaXMuaW1hZ2UsIHRoaXMueDIsIHRoaXMueSwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQpO1xuICAgIH07XG4gICAgcmV0dXJuIExheWVyO1xufSgpKTtcbmV4cG9ydCB7IExheWVyIH07XG4iLCJpbXBvcnQgeyBSdW5uaW5nLCBKdW1waW5nLCBGYWxsaW5nLCBTdGlsbCB9IGZyb20gXCIuL1N0YXRlc1wiO1xudmFyIFBsYXllciA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBQbGF5ZXIoZ2FtZSkge1xuICAgICAgICB0aGlzLmdhbWUgPSBnYW1lO1xuICAgICAgICB0aGlzLnN0YXRlcyA9IFtcbiAgICAgICAgICAgIG5ldyBTdGlsbCh0aGlzKSxcbiAgICAgICAgICAgIG5ldyBSdW5uaW5nKHRoaXMpLFxuICAgICAgICAgICAgbmV3IEp1bXBpbmcodGhpcyksXG4gICAgICAgICAgICBuZXcgRmFsbGluZyh0aGlzKSxcbiAgICAgICAgXTtcbiAgICAgICAgdGhpcy5jdXJyZW50U3RhdGUgPSB0aGlzLnN0YXRlc1swXTtcbiAgICAgICAgdGhpcy5jdXJyZW50U3RhdGUuZW50ZXIoKTtcbiAgICAgICAgdGhpcy5pbWFnZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaW1nR29ibGluXCIpO1xuICAgICAgICB0aGlzLmZhY2luZyA9IFwiUlwiOyAvLyBSID0gcmlnaHQsIEwgPSBsZWZ0XG4gICAgICAgIHRoaXMuYW5pbWF0aW9uID0gXCJzdGlsbFwiO1xuICAgICAgICB0aGlzLndpZHRoID0gNjY7IC8vIGRpc3BsYXllZCB3aWR0aFxuICAgICAgICB0aGlzLmhlaWdodCA9IDYxOyAvLyBkaXNwbGF5ZWQgaGVpZ2h0XG4gICAgICAgIHRoaXMubGVmdExpbWl0ID0gMDtcbiAgICAgICAgdGhpcy5yaWdodExpbWl0ID0gdGhpcy5nYW1lLndpZHRoIC0gdGhpcy53aWR0aDtcbiAgICAgICAgdGhpcy55T2Zmc2V0ID0gLTIyOyAvLyBhY2NvdW50IGZvciBjaGFyYWN0ZXIgcG9zaXRpb24gb2Zmc2V0IG9uIHNwcml0ZXNoZWV0XG4gICAgICAgIHRoaXMuZ3JvdW5kTGltaXQgPSB0aGlzLmdhbWUuaGVpZ2h0IC0gdGhpcy5oZWlnaHQgKyB0aGlzLnlPZmZzZXQ7XG4gICAgICAgIHRoaXMueCA9IDA7XG4gICAgICAgIHRoaXMueSA9IHRoaXMuZ3JvdW5kTGltaXQ7XG4gICAgICAgIHRoaXMuc3BlZWRYID0gMDtcbiAgICAgICAgdGhpcy5zcGVlZFhNb2RpZmllciA9IDM7XG4gICAgICAgIHRoaXMudHJhdmVsZWRYID0gMDtcbiAgICAgICAgdGhpcy5zcGVlZFkgPSAwO1xuICAgICAgICB0aGlzLndlaWdodCA9IDEuMjtcbiAgICAgICAgdGhpcy5zb3VyY2VXaWR0aCA9IDY2OyAvLyB3aWR0aCBvZiBlYWNoIHNwcml0ZSBvbiBzcHJpdGVzaGVldFxuICAgICAgICB0aGlzLnNvdXJjZUhlaWdodCA9IDYxOyAvLyBoZWlnaHQgb2YgZWFjaCBzcHJpdGUgb24gc3ByaXRlc2hlZXRcbiAgICAgICAgdGhpcy5tYXhGcmFtZUNvbCA9IDY7IC8vIG51bWJlciBvZiBjb2x1bW5zIG9uIHNwcml0ZXNoZWV0XG4gICAgICAgIHRoaXMubWF4RnJhbWVSb3cgPSA0OyAvLyBudW1iZXIgb3Igcm93cyBvbiBzcHJpdGVzaGVldFxuICAgICAgICB0aGlzLmZyYW1lID0gMDtcbiAgICAgICAgdGhpcy5mcmFtZUNvbCA9IHRoaXMuZnJhbWUgJSB0aGlzLm1heEZyYW1lQ29sO1xuICAgICAgICB0aGlzLmZyYW1lUm93ID0gTWF0aC5mbG9vcih0aGlzLmZyYW1lIC8gdGhpcy5tYXhGcmFtZUNvbCk7XG4gICAgICAgIHRoaXMuZnBzID0gMTU7XG4gICAgICAgIHRoaXMuZnJhbWVUaW1lciA9IDA7XG4gICAgICAgIHRoaXMuaGl0Ym94UmFkaXVzID0gdGhpcy53aWR0aCAvIDIuNztcbiAgICAgICAgdGhpcy5pbWFnZXMgPSB7XG4gICAgICAgICAgICBhbGVydGVkOiB7XG4gICAgICAgICAgICAgICAgTDogbnVsbCxcbiAgICAgICAgICAgICAgICBSOiBudWxsLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGF0dGFja2luZzoge1xuICAgICAgICAgICAgICAgIEw6IG51bGwsXG4gICAgICAgICAgICAgICAgUjogbnVsbCxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBydW5uaW5nOiB7XG4gICAgICAgICAgICAgICAgTDogbnVsbCxcbiAgICAgICAgICAgICAgICBSOiBudWxsLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHN0aWxsOiB7XG4gICAgICAgICAgICAgICAgTDogbnVsbCxcbiAgICAgICAgICAgICAgICBSOiBudWxsLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5pbWFnZXMuYWxlcnRlZC5MID0gbmV3IEltYWdlKDYwLCA0NSk7XG4gICAgICAgIHRoaXMuaW1hZ2VzLmFsZXJ0ZWQuTC5zcmMgPVxuICAgICAgICAgICAgXCJhc3NldHMvaW1nL2NoYXJhY3RlcnMvZ29ibGluL2dvYmxpbl9hbGVydGVkX0xfc3ByaXRlc2hlZXQucG5nXCI7XG4gICAgICAgIHRoaXMuaW1hZ2VzLmFsZXJ0ZWQuUiA9IG5ldyBJbWFnZSg2MCwgNDUpO1xuICAgICAgICB0aGlzLmltYWdlcy5hbGVydGVkLlIuc3JjID1cbiAgICAgICAgICAgIFwiYXNzZXRzL2ltZy9jaGFyYWN0ZXJzL2dvYmxpbi9nb2JsaW5fYWxlcnRlZF9SX3Nwcml0ZXNoZWV0LnBuZ1wiO1xuICAgICAgICB0aGlzLmltYWdlcy5hdHRhY2tpbmcuTCA9IG5ldyBJbWFnZSg2MCwgNDUpO1xuICAgICAgICB0aGlzLmltYWdlcy5hdHRhY2tpbmcuTC5zcmMgPVxuICAgICAgICAgICAgXCJhc3NldHMvaW1nL2NoYXJhY3RlcnMvZ29ibGluL2dvYmxpbl9hdHRhY2tpbmdfTF9zcHJpdGVzaGVldC5wbmdcIjtcbiAgICAgICAgdGhpcy5pbWFnZXMuYXR0YWNraW5nLlIgPSBuZXcgSW1hZ2UoNjAsIDQ1KTtcbiAgICAgICAgdGhpcy5pbWFnZXMuYXR0YWNraW5nLlIuc3JjID1cbiAgICAgICAgICAgIFwiYXNzZXRzL2ltZy9jaGFyYWN0ZXJzL2dvYmxpbi9nb2JsaW5fYXR0YWNraW5nX1Jfc3ByaXRlc2hlZXQucG5nXCI7XG4gICAgICAgIHRoaXMuaW1hZ2VzLnJ1bm5pbmcuTCA9IG5ldyBJbWFnZSg2MCwgNDUpO1xuICAgICAgICB0aGlzLmltYWdlcy5ydW5uaW5nLkwuc3JjID1cbiAgICAgICAgICAgIFwiYXNzZXRzL2ltZy9jaGFyYWN0ZXJzL2dvYmxpbi9nb2JsaW5fcnVubmluZ19MX3Nwcml0ZXNoZWV0LnBuZ1wiO1xuICAgICAgICB0aGlzLmltYWdlcy5ydW5uaW5nLlIgPSBuZXcgSW1hZ2UoNjAsIDQ1KTtcbiAgICAgICAgdGhpcy5pbWFnZXMucnVubmluZy5SLnNyYyA9XG4gICAgICAgICAgICBcImFzc2V0cy9pbWcvY2hhcmFjdGVycy9nb2JsaW4vZ29ibGluX3J1bm5pbmdfUl9zcHJpdGVzaGVldC5wbmdcIjtcbiAgICAgICAgdGhpcy5pbWFnZXMuc3RpbGwuTCA9IG5ldyBJbWFnZSg2MCwgNDUpO1xuICAgICAgICB0aGlzLmltYWdlcy5zdGlsbC5MLnNyYyA9XG4gICAgICAgICAgICBcImFzc2V0cy9pbWcvY2hhcmFjdGVycy9nb2JsaW4vZ29ibGluX3N0aWxsX0xfc3ByaXRlc2hlZXQucG5nXCI7XG4gICAgICAgIHRoaXMuaW1hZ2VzLnN0aWxsLlIgPSBuZXcgSW1hZ2UoNjAsIDQ1KTtcbiAgICAgICAgdGhpcy5pbWFnZXMuc3RpbGwuUi5zcmMgPVxuICAgICAgICAgICAgXCJhc3NldHMvaW1nL2NoYXJhY3RlcnMvZ29ibGluL2dvYmxpbl9zdGlsbF9SX3Nwcml0ZXNoZWV0LnBuZ1wiO1xuICAgIH1cbiAgICBQbGF5ZXIucHJvdG90eXBlLmRyYXcgPSBmdW5jdGlvbiAoY29udGV4dCkge1xuICAgICAgICAvLyBzZWUgaHR0cHM6Ly93d3cueW91dHViZS5jb20vd2F0Y2g/dj03SnRMSEpibTBrQSZ0PTgzMHNcbiAgICAgICAgaWYgKHRoaXMuZ2FtZS5kZWJ1Zykge1xuICAgICAgICAgICAgLy8gY29udGV4dC5zdHJva2VSZWN0KHRoaXMueCwgdGhpcy55LCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCk7XG4gICAgICAgICAgICBjb250ZXh0LmJlZ2luUGF0aCgpO1xuICAgICAgICAgICAgY29udGV4dC5hcmModGhpcy54ICsgdGhpcy53aWR0aCAvIDIuMSwgdGhpcy55ICsgdGhpcy5oZWlnaHQgLyAxLjgsIHRoaXMuaGl0Ym94UmFkaXVzLCAwLCBNYXRoLlBJICogMik7XG4gICAgICAgICAgICBjb250ZXh0LnN0cm9rZSgpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnRleHQuZHJhd0ltYWdlKHRoaXMuaW1hZ2VzW3RoaXMuYW5pbWF0aW9uXVt0aGlzLmZhY2luZ10sIHRoaXMuZnJhbWVDb2wgKiB0aGlzLnNvdXJjZVdpZHRoLCAvLyBzeFxuICAgICAgICB0aGlzLmZyYW1lUm93ICogdGhpcy5zb3VyY2VIZWlnaHQsIC8vIHN5XG4gICAgICAgIHRoaXMud2lkdGgsIC8vIHN3XG4gICAgICAgIHRoaXMuaGVpZ2h0LCAvLyBzaFxuICAgICAgICB0aGlzLngsIHRoaXMueSwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQpO1xuICAgIH07XG4gICAgUGxheWVyLnByb3RvdHlwZS51cGRhdGUgPSBmdW5jdGlvbiAoaW5wdXQsIGRlbHRhVGltZSkge1xuICAgICAgICB0aGlzLmNoZWNrQ29sbGlzaW9uKCk7XG4gICAgICAgIGlmICh0aGlzLmdhbWUuZGVidWcpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwidGhpcy5jdXJyZW50U3RhdGUgOj4+IFwiLCB0aGlzLmN1cnJlbnRTdGF0ZSk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gLS0tLS0gTU9WRU1FTlRcbiAgICAgICAgLy8gaG9yaXpvbnRhbCBtb3ZlbWVudFxuICAgICAgICBpZiAoaW5wdXQua2V5cy5pbmNsdWRlcyhcIkFycm93UmlnaHRcIikpIHtcbiAgICAgICAgICAgIHRoaXMuc3BlZWRYID0gdGhpcy5zcGVlZFhNb2RpZmllciAqIHRoaXMuZ2FtZS5zcGVlZDtcbiAgICAgICAgICAgIHRoaXMuZmFjaW5nID0gXCJSXCI7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoaW5wdXQua2V5cy5pbmNsdWRlcyhcIkFycm93TGVmdFwiKSkge1xuICAgICAgICAgICAgdGhpcy5zcGVlZFggPSAtdGhpcy5zcGVlZFhNb2RpZmllciAqIHRoaXMuZ2FtZS5zcGVlZDtcbiAgICAgICAgICAgIHRoaXMuZmFjaW5nID0gXCJMXCI7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnNwZWVkWCA9IDA7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy54ICs9IHRoaXMuc3BlZWRYO1xuICAgICAgICB0aGlzLnRyYXZlbGVkWCArPSB0aGlzLnNwZWVkWDtcbiAgICAgICAgdGhpcy5jdXJyZW50U3RhdGUuaGFuZGxlSW5wdXQoaW5wdXQpO1xuICAgICAgICAvLyBob3Jpem9udGFsIGJvdW5kYXJpZXNcbiAgICAgICAgaWYgKHRoaXMueCA8IHRoaXMubGVmdExpbWl0KSB7XG4gICAgICAgICAgICB0aGlzLnggPSAwO1xuICAgICAgICAgICAgdGhpcy5nYW1lLmJhY2tncm91bmQuc3BlZWRYID0gLXRoaXMuc3BlZWRYICogdGhpcy5nYW1lLnNwZWVkO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHRoaXMueCA+IHRoaXMucmlnaHRMaW1pdCkge1xuICAgICAgICAgICAgdGhpcy54ID0gdGhpcy5nYW1lLndpZHRoIC0gdGhpcy53aWR0aDtcbiAgICAgICAgICAgIHRoaXMuZ2FtZS5iYWNrZ3JvdW5kLnNwZWVkWCA9IC10aGlzLnNwZWVkWCAqIHRoaXMuZ2FtZS5zcGVlZDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZ2FtZS5iYWNrZ3JvdW5kLnNwZWVkWCA9IDA7XG4gICAgICAgIH1cbiAgICAgICAgLy8gdmVydGljYWwgbW92ZW1lbnRcbiAgICAgICAgaWYgKGlucHV0LmtleXMuaW5jbHVkZXMoXCJBcnJvd1VwXCIpICYmIHRoaXMub25Hcm91bmQoKSkge1xuICAgICAgICAgICAgdGhpcy5zcGVlZFkgLT0gMjA7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy55ICs9IHRoaXMuc3BlZWRZO1xuICAgICAgICBpZiAoIXRoaXMub25Hcm91bmQoKSkge1xuICAgICAgICAgICAgdGhpcy5zcGVlZFkgKz0gdGhpcy53ZWlnaHQ7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnNwZWVkWSA9IDA7XG4gICAgICAgIH1cbiAgICAgICAgLy8gdmVydGljYWwgYm91bmRhcmllc1xuICAgICAgICBpZiAodGhpcy55ID4gdGhpcy5ncm91bmRMaW1pdClcbiAgICAgICAgICAgIHRoaXMueSA9IHRoaXMuZ3JvdW5kTGltaXQ7XG4gICAgICAgIC8vIC0tLS0tIEFOSU1BVElPTlxuICAgICAgICAvLyB1cGRhdGUgcGxheWVyIGZyYW1lIG9ubHkgd2hlbiBhYm92ZSBmcHMgaW50ZXJ2YWxcbiAgICAgICAgaWYgKHRoaXMuZnJhbWVUaW1lciA+IDEwMDAgLyB0aGlzLmZwcykge1xuICAgICAgICAgICAgdGhpcy5mcmFtZVRpbWVyID0gMDtcbiAgICAgICAgICAgIC8vIGlmIHJlYWNoZWQgZW5kIG9mIHNwcml0ZXNoZWV0LCByZXBvc2l0aW9ucyB0byBzdGFydCBvZiBzcHJpdGVzaGVldFxuICAgICAgICAgICAgaWYgKHRoaXMuZnJhbWUgPT09IHRoaXMubWF4RnJhbWVSb3cgKiB0aGlzLm1heEZyYW1lQ29sIC0gMSkge1xuICAgICAgICAgICAgICAgIHRoaXMuZnJhbWUgPSAwO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5mcmFtZSsrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gY3ljbGUgdGhyb3VnaCBzcHJpdGVzaGVldCByb3dzL2NvbHVtbnNcbiAgICAgICAgICAgIHRoaXMuZnJhbWVDb2wgPSB0aGlzLmZyYW1lICUgdGhpcy5tYXhGcmFtZUNvbDtcbiAgICAgICAgICAgIHRoaXMuZnJhbWVSb3cgPSBNYXRoLmZsb29yKHRoaXMuZnJhbWUgLyB0aGlzLm1heEZyYW1lQ29sKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZnJhbWVUaW1lciArPSBkZWx0YVRpbWU7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIFBsYXllci5wcm90b3R5cGUuc2V0U3RhdGUgPSBmdW5jdGlvbiAoc3RhdGUpIHtcbiAgICAgICAgdGhpcy5jdXJyZW50U3RhdGUgPSB0aGlzLnN0YXRlc1tzdGF0ZV07XG4gICAgICAgIHRoaXMuY3VycmVudFN0YXRlLmVudGVyKCk7XG4gICAgfTtcbiAgICBQbGF5ZXIucHJvdG90eXBlLmNoZWNrQ29sbGlzaW9uID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB0aGlzLmdhbWUuZW5lbWllcy5mb3JFYWNoKGZ1bmN0aW9uIChlbmVteSkge1xuICAgICAgICAgICAgdmFyIGR4ID0gZW5lbXkueCAtIF90aGlzLng7XG4gICAgICAgICAgICB2YXIgZHkgPSBlbmVteS55IC0gX3RoaXMueTtcbiAgICAgICAgICAgIHZhciBkaXN0YW5jZSA9IE1hdGguc3FydChkeCAqIGR4ICsgZHkgKiBkeSk7XG4gICAgICAgICAgICBpZiAoZGlzdGFuY2UgPCBlbmVteS5oaXRib3hSYWRpdXMgKyBfdGhpcy5oaXRib3hSYWRpdXMpIHtcbiAgICAgICAgICAgICAgICBfdGhpcy5nYW1lLmdhbWVPdmVyID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBQbGF5ZXIucHJvdG90eXBlLm9uR3JvdW5kID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy55ID49IHRoaXMuZ2FtZS5oZWlnaHQgLSB0aGlzLmhlaWdodCArIHRoaXMueU9mZnNldDtcbiAgICB9O1xuICAgIHJldHVybiBQbGF5ZXI7XG59KCkpO1xuZXhwb3J0IHsgUGxheWVyIH07XG4iLCJ2YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGV4dGVuZFN0YXRpY3MgPSBmdW5jdGlvbiAoZCwgYikge1xuICAgICAgICBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XG4gICAgICAgICAgICAoeyBfX3Byb3RvX186IFtdIH0gaW5zdGFuY2VvZiBBcnJheSAmJiBmdW5jdGlvbiAoZCwgYikgeyBkLl9fcHJvdG9fXyA9IGI7IH0pIHx8XG4gICAgICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoYiwgcCkpIGRbcF0gPSBiW3BdOyB9O1xuICAgICAgICByZXR1cm4gZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICB9O1xuICAgIHJldHVybiBmdW5jdGlvbiAoZCwgYikge1xuICAgICAgICBpZiAodHlwZW9mIGIgIT09IFwiZnVuY3Rpb25cIiAmJiBiICE9PSBudWxsKVxuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNsYXNzIGV4dGVuZHMgdmFsdWUgXCIgKyBTdHJpbmcoYikgKyBcIiBpcyBub3QgYSBjb25zdHJ1Y3RvciBvciBudWxsXCIpO1xuICAgICAgICBleHRlbmRTdGF0aWNzKGQsIGIpO1xuICAgICAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cbiAgICAgICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xuICAgIH07XG59KSgpO1xuaW1wb3J0IHsgU1RBVEVTIH0gZnJvbSBcIi4uL2NvbnN0L2NvbnN0XCI7XG52YXIgU3RhdGUgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gU3RhdGUoc3RhdGUpIHtcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHN0YXRlO1xuICAgIH1cbiAgICByZXR1cm4gU3RhdGU7XG59KCkpO1xudmFyIFN0aWxsID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhTdGlsbCwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBTdGlsbChwbGF5ZXIpIHtcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcywgXCJTVElMTFwiKSB8fCB0aGlzO1xuICAgICAgICBfdGhpcy5wbGF5ZXIgPSBwbGF5ZXI7XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgU3RpbGwucHJvdG90eXBlLmVudGVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLnBsYXllci5hbmltYXRpb24gPSBcInN0aWxsXCI7XG4gICAgfTtcbiAgICBTdGlsbC5wcm90b3R5cGUuaGFuZGxlSW5wdXQgPSBmdW5jdGlvbiAoaW5wdXQpIHtcbiAgICAgICAgaWYgKGlucHV0LmtleXMuaW5jbHVkZXMoXCJBcnJvd1JpZ2h0XCIpKSB7XG4gICAgICAgICAgICB0aGlzLnBsYXllci5mYWNpbmcgPSBcIlJcIjtcbiAgICAgICAgICAgIHRoaXMucGxheWVyLnNldFN0YXRlKFNUQVRFUy5SVU5OSU5HKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChpbnB1dC5rZXlzLmluY2x1ZGVzKFwiQXJyb3dMZWZ0XCIpKSB7XG4gICAgICAgICAgICB0aGlzLnBsYXllci5mYWNpbmcgPSBcIkxcIjtcbiAgICAgICAgICAgIHRoaXMucGxheWVyLnNldFN0YXRlKFNUQVRFUy5SVU5OSU5HKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaW5wdXQua2V5cy5pbmNsdWRlcyhcIkFycm93VXBcIikpXG4gICAgICAgICAgICB0aGlzLnBsYXllci5zZXRTdGF0ZShTVEFURVMuSlVNUElORyk7XG4gICAgfTtcbiAgICByZXR1cm4gU3RpbGw7XG59KFN0YXRlKSk7XG52YXIgUnVubmluZyA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoUnVubmluZywgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBSdW5uaW5nKHBsYXllcikge1xuICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIuY2FsbCh0aGlzLCBcIlJVTk5JTkdcIikgfHwgdGhpcztcbiAgICAgICAgX3RoaXMucGxheWVyID0gcGxheWVyO1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIFJ1bm5pbmcucHJvdG90eXBlLmVudGVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLnBsYXllci5hbmltYXRpb24gPSBcInJ1bm5pbmdcIjtcbiAgICB9O1xuICAgIFJ1bm5pbmcucHJvdG90eXBlLmhhbmRsZUlucHV0ID0gZnVuY3Rpb24gKGlucHV0KSB7XG4gICAgICAgIGlmIChpbnB1dC5rZXlzLmluY2x1ZGVzKFwiQXJyb3dSaWdodFwiKSkge1xuICAgICAgICAgICAgdGhpcy5wbGF5ZXIuZmFjaW5nID0gXCJSXCI7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoaW5wdXQua2V5cy5pbmNsdWRlcyhcIkFycm93TGVmdFwiKSkge1xuICAgICAgICAgICAgdGhpcy5wbGF5ZXIuZmFjaW5nID0gXCJMXCI7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGlucHV0LmtleXMuaW5jbHVkZXMoXCJBcnJvd1VwXCIpKVxuICAgICAgICAgICAgdGhpcy5wbGF5ZXIuc2V0U3RhdGUoU1RBVEVTLkpVTVBJTkcpO1xuICAgICAgICBpZiAodGhpcy5wbGF5ZXIuc3BlZWRYID09PSAwKVxuICAgICAgICAgICAgdGhpcy5wbGF5ZXIuc2V0U3RhdGUoU1RBVEVTLlNUSUxMKTtcbiAgICB9O1xuICAgIHJldHVybiBSdW5uaW5nO1xufShTdGF0ZSkpO1xudmFyIEp1bXBpbmcgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKEp1bXBpbmcsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gSnVtcGluZyhwbGF5ZXIpIHtcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcywgXCJKVU1QSU5HXCIpIHx8IHRoaXM7XG4gICAgICAgIF90aGlzLnBsYXllciA9IHBsYXllcjtcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICBKdW1waW5nLnByb3RvdHlwZS5lbnRlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5wbGF5ZXIuYW5pbWF0aW9uID0gXCJydW5uaW5nXCI7XG4gICAgfTtcbiAgICBKdW1waW5nLnByb3RvdHlwZS5oYW5kbGVJbnB1dCA9IGZ1bmN0aW9uIChpbnB1dCkge1xuICAgICAgICBpZiAodGhpcy5wbGF5ZXIuc3BlZWRZID4gdGhpcy5wbGF5ZXIud2VpZ2h0KSB7XG4gICAgICAgICAgICB0aGlzLnBsYXllci5zZXRTdGF0ZShTVEFURVMuRkFMTElORyk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHJldHVybiBKdW1waW5nO1xufShTdGF0ZSkpO1xudmFyIEZhbGxpbmcgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKEZhbGxpbmcsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gRmFsbGluZyhwbGF5ZXIpIHtcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcywgXCJGQUxMSU5HXCIpIHx8IHRoaXM7XG4gICAgICAgIF90aGlzLnBsYXllciA9IHBsYXllcjtcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICBGYWxsaW5nLnByb3RvdHlwZS5lbnRlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5wbGF5ZXIuYW5pbWF0aW9uID0gXCJydW5uaW5nXCI7XG4gICAgfTtcbiAgICBGYWxsaW5nLnByb3RvdHlwZS5oYW5kbGVJbnB1dCA9IGZ1bmN0aW9uIChpbnB1dCkge1xuICAgICAgICBpZiAodGhpcy5wbGF5ZXIub25Hcm91bmQoKSkge1xuICAgICAgICAgICAgdGhpcy5wbGF5ZXIuc2V0U3RhdGUoU1RBVEVTLlNUSUxMKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgcmV0dXJuIEZhbGxpbmc7XG59KFN0YXRlKSk7XG5leHBvcnQgeyBTdGF0ZSwgU3RpbGwsIFJ1bm5pbmcsIEp1bXBpbmcsIEZhbGxpbmcgfTtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiLy8gV0lQIDogYWRkIGhpdGJveCA7IGFkZCBzY29yZVxuaW1wb3J0IHsgQ0FOVkFTX0hFSUdIVCwgQ0FOVkFTX1dJRFRIIH0gZnJvbSBcIi4vY29uc3QvY29uc3RcIjtcbmltcG9ydCB7IEdhbWUgfSBmcm9tIFwiLi9tb2RlbC9HYW1lXCI7XG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRcIiwgZnVuY3Rpb24gKCkge1xuICAgIHZhciBjYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNhbnZhczFcIik7XG4gICAgdmFyIGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XG4gICAgY2FudmFzLndpZHRoID0gQ0FOVkFTX1dJRFRIO1xuICAgIGNhbnZhcy5oZWlnaHQgPSBDQU5WQVNfSEVJR0hUO1xuICAgIHZhciBnYW1lID0gbmV3IEdhbWUoY3R4KTtcbiAgICBnYW1lLmFuaW1hdGUoMCk7XG59KTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==