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
        var layer1 = new _Layer__WEBPACK_IMPORTED_MODULE_1__.Layer(this, document.getElementById("imgPlx1"), 0.2);
        var layer2 = new _Layer__WEBPACK_IMPORTED_MODULE_1__.Layer(this, document.getElementById("imgPlx2"), 0.4);
        var layer3 = new _Layer__WEBPACK_IMPORTED_MODULE_1__.Layer(this, document.getElementById("imgPlx3"), 0.6);
        var layer4 = new _Layer__WEBPACK_IMPORTED_MODULE_1__.Layer(this, document.getElementById("imgPlx4"), 0.8);
        var layer5 = new _Layer__WEBPACK_IMPORTED_MODULE_1__.Layer(this, document.getElementById("imgPlx5"), 1.0);
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
            if (!_this.gameOver)
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
        this.spanScore = document.getElementById('spanScore');
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
        this.player.changeSpritesheet();
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
        this.player.changeSpritesheet();
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
        this.player.changeSpritesheet();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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REFBYTtBQUNqQyxtQkFBbUIsNkNBQUk7QUFDdkI7QUFDQSxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vR29ibGluX1NpZGVzY3JvbGxlci8uL2NvbnN0L2NvbnN0LnRzIiwid2VicGFjazovL0dvYmxpbl9TaWRlc2Nyb2xsZXIvLi9tb2RlbC9CYWNrZ3JvdW5kLnRzIiwid2VicGFjazovL0dvYmxpbl9TaWRlc2Nyb2xsZXIvLi9tb2RlbC9FbmVteS50cyIsIndlYnBhY2s6Ly9Hb2JsaW5fU2lkZXNjcm9sbGVyLy4vbW9kZWwvR2FtZS50cyIsIndlYnBhY2s6Ly9Hb2JsaW5fU2lkZXNjcm9sbGVyLy4vbW9kZWwvSW5wdXRIYW5kbGVyLnRzIiwid2VicGFjazovL0dvYmxpbl9TaWRlc2Nyb2xsZXIvLi9tb2RlbC9MYXllci50cyIsIndlYnBhY2s6Ly9Hb2JsaW5fU2lkZXNjcm9sbGVyLy4vbW9kZWwvUGxheWVyLnRzIiwid2VicGFjazovL0dvYmxpbl9TaWRlc2Nyb2xsZXIvLi9tb2RlbC9TdGF0ZXMudHMiLCJ3ZWJwYWNrOi8vR29ibGluX1NpZGVzY3JvbGxlci93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9Hb2JsaW5fU2lkZXNjcm9sbGVyL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9Hb2JsaW5fU2lkZXNjcm9sbGVyL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vR29ibGluX1NpZGVzY3JvbGxlci93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL0dvYmxpbl9TaWRlc2Nyb2xsZXIvLi9zY3JpcHQudHMiXSwic291cmNlc0NvbnRlbnQiOlsidmFyIENBTlZBU19XSURUSCA9IDc2ODtcbnZhciBDQU5WQVNfSEVJR0hUID0gNDMyO1xudmFyIFNUQVRFUyA9IHtcbiAgICBTVElMTDogMCxcbiAgICBSVU5OSU5HOiAxLFxuICAgIEpVTVBJTkc6IDIsXG4gICAgRkFMTElORzogMyxcbn07XG5leHBvcnQgeyBDQU5WQVNfV0lEVEgsIENBTlZBU19IRUlHSFQsIFNUQVRFUyB9O1xuIiwiaW1wb3J0IHsgQ0FOVkFTX1dJRFRILCBDQU5WQVNfSEVJR0hUIH0gZnJvbSBcIi4uL2NvbnN0L2NvbnN0XCI7XG5pbXBvcnQgeyBMYXllciB9IGZyb20gXCIuL0xheWVyXCI7XG52YXIgQmFja2dyb3VuZCA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBCYWNrZ3JvdW5kKCkge1xuICAgICAgICB0aGlzLnggPSAwO1xuICAgICAgICB0aGlzLnkgPSAwO1xuICAgICAgICB0aGlzLndpZHRoID0gQ0FOVkFTX1dJRFRIO1xuICAgICAgICB0aGlzLmhlaWdodCA9IENBTlZBU19IRUlHSFQ7XG4gICAgICAgIHRoaXMuc3BlZWRYID0gMDtcbiAgICAgICAgdmFyIGxheWVyMSA9IG5ldyBMYXllcih0aGlzLCBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImltZ1BseDFcIiksIDAuMik7XG4gICAgICAgIHZhciBsYXllcjIgPSBuZXcgTGF5ZXIodGhpcywgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJpbWdQbHgyXCIpLCAwLjQpO1xuICAgICAgICB2YXIgbGF5ZXIzID0gbmV3IExheWVyKHRoaXMsIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaW1nUGx4M1wiKSwgMC42KTtcbiAgICAgICAgdmFyIGxheWVyNCA9IG5ldyBMYXllcih0aGlzLCBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImltZ1BseDRcIiksIDAuOCk7XG4gICAgICAgIHZhciBsYXllcjUgPSBuZXcgTGF5ZXIodGhpcywgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJpbWdQbHg1XCIpLCAxLjApO1xuICAgICAgICB0aGlzLmxheWVycyA9IFtsYXllcjEsIGxheWVyMiwgbGF5ZXIzLCBsYXllcjQsIGxheWVyNV07XG4gICAgfVxuICAgIEJhY2tncm91bmQucHJvdG90eXBlLmRyYXcgPSBmdW5jdGlvbiAoY29udGV4dCkge1xuICAgICAgICB0aGlzLmxheWVycy5mb3JFYWNoKGZ1bmN0aW9uIChsYXllcikge1xuICAgICAgICAgICAgbGF5ZXIuZHJhdyhjb250ZXh0KTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBCYWNrZ3JvdW5kLnByb3RvdHlwZS51cGRhdGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMubGF5ZXJzLmZvckVhY2goZnVuY3Rpb24gKGxheWVyKSB7XG4gICAgICAgICAgICBsYXllci51cGRhdGUoKTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICByZXR1cm4gQmFja2dyb3VuZDtcbn0oKSk7XG5leHBvcnQgeyBCYWNrZ3JvdW5kIH07XG4iLCJ2YXIgRW5lbXkgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gRW5lbXkoZ2FtZSkge1xuICAgICAgICB0aGlzLmdhbWUgPSBnYW1lO1xuICAgICAgICB0aGlzLmltYWdlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJpbWdCb2FyXCIpO1xuICAgICAgICB0aGlzLndpZHRoID0gNjA7IC8vIGRpc3BsYXllZCB3aWR0aFxuICAgICAgICB0aGlzLmhlaWdodCA9IDYwOyAvLyBkaXNwbGF5ZWQgaGVpZ2h0XG4gICAgICAgIHRoaXMueCA9IHRoaXMuZ2FtZS53aWR0aDtcbiAgICAgICAgdGhpcy55T2Zmc2V0ID0gODsgLy8gYWNjb3VudCBmb3IgY2hhcmFjdGVyIG9mZnNldCBvbiBzcHJpdGVcbiAgICAgICAgdGhpcy55ID0gdGhpcy5nYW1lLmhlaWdodCAtIHRoaXMuaGVpZ2h0ICsgdGhpcy55T2Zmc2V0O1xuICAgICAgICB0aGlzLnNwZWVkWCA9IDI7XG4gICAgICAgIHRoaXMubWF4RnJhbWVDb2wgPSA0OyAvLyBudW1iZXIgb2YgY29sdW1ucyBvbiBzcHJpdGVzaGVldFxuICAgICAgICB0aGlzLm1heEZyYW1lUm93ID0gMjsgLy8gbnVtYmVyIG9yIHJvd3Mgb24gc3ByaXRlc2hlZXRcbiAgICAgICAgdGhpcy5zb3VyY2VXaWR0aCA9IDEyNDsgLy8gd2lkdGggb2YgZWFjaCBzcHJpdGUgb24gc3ByaXRlc2hlZXRcbiAgICAgICAgdGhpcy5zb3VyY2VIZWlnaHQgPSAxMjQ7IC8vIGhlaWdodCBvZiBlYWNoIHNwcml0ZSBvbiBzcHJpdGVzaGVldFxuICAgICAgICB0aGlzLmZyYW1lID0gMDtcbiAgICAgICAgdGhpcy5mcmFtZUNvbCA9IHRoaXMuZnJhbWUgJSB0aGlzLm1heEZyYW1lQ29sO1xuICAgICAgICB0aGlzLmZyYW1lUm93ID0gTWF0aC5mbG9vcih0aGlzLmZyYW1lIC8gdGhpcy5tYXhGcmFtZUNvbCk7XG4gICAgICAgIHRoaXMuZnBzID0gMTU7XG4gICAgICAgIHRoaXMuZnJhbWVUaW1lciA9IDA7XG4gICAgICAgIHRoaXMuaGl0Ym94UmFkaXVzID0gdGhpcy53aWR0aCAvIDIuMzU7XG4gICAgICAgIHRoaXMubWFya2VkRm9yRGVsZXRpb24gPSBmYWxzZTtcbiAgICB9XG4gICAgRW5lbXkucHJvdG90eXBlLmRyYXcgPSBmdW5jdGlvbiAoY29udGV4dCkge1xuICAgICAgICBpZiAodGhpcy5nYW1lLmRlYnVnKSB7XG4gICAgICAgICAgICAvLyBjb250ZXh0LnN0cm9rZVJlY3QodGhpcy54LCB0aGlzLnksIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0KTtcbiAgICAgICAgICAgIGNvbnRleHQuYmVnaW5QYXRoKCk7XG4gICAgICAgICAgICBjb250ZXh0LmFyYyh0aGlzLnggKyB0aGlzLndpZHRoIC8gMiwgdGhpcy55ICsgdGhpcy5oZWlnaHQgLyAyLCB0aGlzLmhpdGJveFJhZGl1cywgMCwgTWF0aC5QSSAqIDIpO1xuICAgICAgICAgICAgY29udGV4dC5zdHJva2UoKTtcbiAgICAgICAgfVxuICAgICAgICBjb250ZXh0LmRyYXdJbWFnZSh0aGlzLmltYWdlLCB0aGlzLmZyYW1lQ29sICogdGhpcy5zb3VyY2VXaWR0aCwgLy9zeFxuICAgICAgICB0aGlzLmZyYW1lUm93ICogdGhpcy5zb3VyY2VIZWlnaHQsIC8vc3lcbiAgICAgICAgdGhpcy5zb3VyY2VXaWR0aCwgLy9zd1xuICAgICAgICB0aGlzLnNvdXJjZUhlaWdodCwgLy9zaFxuICAgICAgICB0aGlzLngsIHRoaXMueSwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQpO1xuICAgIH07XG4gICAgRW5lbXkucHJvdG90eXBlLmNoZWNrRm9yRGVsZXRpb24gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh0aGlzLnggPCAwIC0gdGhpcy53aWR0aCkge1xuICAgICAgICAgICAgdGhpcy5tYXJrZWRGb3JEZWxldGlvbiA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLmdhbWUuc2NvcmUrKztcbiAgICAgICAgfVxuICAgIH07XG4gICAgRW5lbXkucHJvdG90eXBlLnVwZGF0ZSA9IGZ1bmN0aW9uIChkZWx0YVRpbWUpIHtcbiAgICAgICAgLy8gYW5pbWF0aW9uXG4gICAgICAgIC8vIHVwZGF0ZSBlbmVteSBmcmFtZSBvbmx5IHdoZW4gYWJvdmUgZnBzIGludGVydmFsXG4gICAgICAgIGlmICh0aGlzLmZyYW1lVGltZXIgPiAxMDAwIC8gdGhpcy5mcHMpIHtcbiAgICAgICAgICAgIC8vIGlmIHJlYWNoZWQgZW5kIG9mIHNwcml0ZXNoZWV0LCByZXBvc2l0aW9ucyB0byBzdGFydCBvZiBzcHJpdGVzaGVldFxuICAgICAgICAgICAgaWYgKHRoaXMuZnJhbWUgPT09IHRoaXMubWF4RnJhbWVSb3cgKiB0aGlzLm1heEZyYW1lQ29sIC0gMSkge1xuICAgICAgICAgICAgICAgIHRoaXMuZnJhbWUgPSAwO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5mcmFtZSsrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5mcmFtZVRpbWVyID0gMDtcbiAgICAgICAgICAgIC8vIGN5Y2xlIHRocm91Z2ggc3ByaXRlc2hlZXQgcm93cy9jb2x1bW5zXG4gICAgICAgICAgICB0aGlzLmZyYW1lQ29sID0gdGhpcy5mcmFtZSAlIHRoaXMubWF4RnJhbWVDb2w7XG4gICAgICAgICAgICB0aGlzLmZyYW1lUm93ID0gTWF0aC5mbG9vcih0aGlzLmZyYW1lIC8gdGhpcy5tYXhGcmFtZUNvbCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmZyYW1lVGltZXIgKz0gZGVsdGFUaW1lO1xuICAgICAgICB9XG4gICAgICAgIC8vIGhvcml6b250YWwgbW92ZW1lbnRcbiAgICAgICAgdGhpcy54IC09ICh0aGlzLnNwZWVkWCAqIHRoaXMuZ2FtZS5zcGVlZCk7XG4gICAgICAgIHRoaXMuY2hlY2tGb3JEZWxldGlvbigpO1xuICAgIH07XG4gICAgcmV0dXJuIEVuZW15O1xufSgpKTtcbmV4cG9ydCB7IEVuZW15IH07XG4iLCJpbXBvcnQgeyBDQU5WQVNfSEVJR0hULCBDQU5WQVNfV0lEVEggfSBmcm9tIFwiLi4vY29uc3QvY29uc3RcIjtcbmltcG9ydCB7IEJhY2tncm91bmQgfSBmcm9tIFwiLi9CYWNrZ3JvdW5kXCI7XG5pbXBvcnQgeyBFbmVteSB9IGZyb20gXCIuL0VuZW15XCI7XG5pbXBvcnQgeyBJbnB1dEhhbmRsZXIgfSBmcm9tIFwiLi9JbnB1dEhhbmRsZXJcIjtcbmltcG9ydCB7IFBsYXllciB9IGZyb20gXCIuL1BsYXllclwiO1xuLy8gaW1wb3J0IFwiLi4vc2NyaXB0cy9yZXF1aXJlLmpzXCI7XG52YXIgR2FtZSA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBHYW1lKGNvbnRleHQpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdGhpcy5hbmltYXRlID0gZnVuY3Rpb24gKHRpbWVTdGFtcCkge1xuICAgICAgICAgICAgdmFyIGRlbHRhVGltZSA9IHRpbWVTdGFtcCAtIF90aGlzLmxhc3RUaW1lO1xuICAgICAgICAgICAgX3RoaXMubGFzdFRpbWUgPSB0aW1lU3RhbXA7XG4gICAgICAgICAgICBfdGhpcy5jb250ZXh0LmNsZWFyUmVjdCgwLCAwLCBfdGhpcy53aWR0aCwgX3RoaXMuaGVpZ2h0KTtcbiAgICAgICAgICAgIF90aGlzLmJhY2tncm91bmQuZHJhdyhfdGhpcy5jb250ZXh0KTtcbiAgICAgICAgICAgIF90aGlzLmJhY2tncm91bmQudXBkYXRlKCk7XG4gICAgICAgICAgICBfdGhpcy5wbGF5ZXIuZHJhdyhfdGhpcy5jb250ZXh0KTtcbiAgICAgICAgICAgIF90aGlzLnBsYXllci51cGRhdGUoX3RoaXMuaW5wdXQsIGRlbHRhVGltZSk7XG4gICAgICAgICAgICBfdGhpcy5oYW5kbGVFbmVtaWVzKGRlbHRhVGltZSk7XG4gICAgICAgICAgICBfdGhpcy5kaXNwbGF5U3RhdHVzVGV4dCgpO1xuICAgICAgICAgICAgaWYgKCFfdGhpcy5nYW1lT3ZlcilcbiAgICAgICAgICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoX3RoaXMuYW5pbWF0ZSk7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuY29udGV4dCA9IGNvbnRleHQ7XG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gQ0FOVkFTX0hFSUdIVDtcbiAgICAgICAgdGhpcy53aWR0aCA9IENBTlZBU19XSURUSDtcbiAgICAgICAgdGhpcy5sYXN0VGltZSA9IDA7XG4gICAgICAgIHRoaXMuZW5lbXlJbnRlcnZhbCA9IDEwMDA7XG4gICAgICAgIHRoaXMucmFuZG9tRW5lbXlJbnRlcnZhbCA9IE1hdGgucmFuZG9tKCkgKiAxMDAwICsgNTAwO1xuICAgICAgICB0aGlzLmVuZW15VGltZXIgPSAwO1xuICAgICAgICB0aGlzLmVuZW1pZXMgPSBbXTtcbiAgICAgICAgdGhpcy5pbnB1dCA9IG5ldyBJbnB1dEhhbmRsZXIodGhpcyk7XG4gICAgICAgIHRoaXMuYmFja2dyb3VuZCA9IG5ldyBCYWNrZ3JvdW5kKCk7XG4gICAgICAgIHRoaXMucGxheWVyID0gbmV3IFBsYXllcih0aGlzKTtcbiAgICAgICAgdGhpcy5kZWJ1ZyA9IGZhbHNlO1xuICAgICAgICB0aGlzLnNjb3JlID0gMDtcbiAgICAgICAgdGhpcy5zcGVlZCA9IDE7XG4gICAgICAgIHRoaXMuZ2FtZU92ZXIgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5zcGFuU2NvcmUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3BhblNjb3JlJyk7XG4gICAgfVxuICAgIEdhbWUucHJvdG90eXBlLmhhbmRsZUVuZW1pZXMgPSBmdW5jdGlvbiAoZGVsdGFUaW1lKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIGlmICh0aGlzLmVuZW15VGltZXIgPiB0aGlzLmVuZW15SW50ZXJ2YWwgKyB0aGlzLnJhbmRvbUVuZW15SW50ZXJ2YWwpIHtcbiAgICAgICAgICAgIHRoaXMuZW5lbWllcy5wdXNoKG5ldyBFbmVteSh0aGlzKSk7XG4gICAgICAgICAgICB0aGlzLnJhbmRvbUVuZW15SW50ZXJ2YWwgPSBNYXRoLnJhbmRvbSgpICogMTAwMDtcbiAgICAgICAgICAgIHRoaXMuZW5lbXlUaW1lciA9IDA7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmVuZW15VGltZXIgKz0gZGVsdGFUaW1lO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZW5lbWllcy5mb3JFYWNoKGZ1bmN0aW9uIChlbmVteSkge1xuICAgICAgICAgICAgZW5lbXkuZHJhdyhfdGhpcy5jb250ZXh0KTtcbiAgICAgICAgICAgIGVuZW15LnVwZGF0ZShkZWx0YVRpbWUpO1xuICAgICAgICAgICAgX3RoaXMuZW5lbWllcyA9IF90aGlzLmVuZW1pZXMuZmlsdGVyKGZ1bmN0aW9uIChlbmVteSkgeyByZXR1cm4gIWVuZW15Lm1hcmtlZEZvckRlbGV0aW9uOyB9KTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBHYW1lLnByb3RvdHlwZS5kaXNwbGF5U3RhdHVzVGV4dCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5zcGFuU2NvcmUuaW5uZXJIVE1MID0gdGhpcy5zY29yZS50b1N0cmluZygpO1xuICAgIH07XG4gICAgcmV0dXJuIEdhbWU7XG59KCkpO1xuZXhwb3J0IHsgR2FtZSB9O1xuIiwidmFyIElucHV0SGFuZGxlciA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBJbnB1dEhhbmRsZXIoZ2FtZSkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB0aGlzLmdhbWUgPSBnYW1lO1xuICAgICAgICB0aGlzLmtleXMgPSBbXTtcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICBpZiAoKGUua2V5ID09PSBcIkFycm93RG93blwiIHx8XG4gICAgICAgICAgICAgICAgZS5rZXkgPT09IFwiQXJyb3dVcFwiIHx8XG4gICAgICAgICAgICAgICAgZS5rZXkgPT09IFwiQXJyb3dMZWZ0XCIgfHxcbiAgICAgICAgICAgICAgICBlLmtleSA9PT0gXCJBcnJvd1JpZ2h0XCIpICYmXG4gICAgICAgICAgICAgICAgIV90aGlzLmtleXMuaW5jbHVkZXMoZS5rZXkpKSB7XG4gICAgICAgICAgICAgICAgX3RoaXMua2V5cy5wdXNoKGUua2V5KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGUua2V5ID09PSBcImRcIikge1xuICAgICAgICAgICAgICAgIF90aGlzLmdhbWUuZGVidWcgPSAhX3RoaXMuZ2FtZS5kZWJ1ZztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwia2V5dXBcIiwgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgIGlmIChlLmtleSA9PT0gXCJBcnJvd0Rvd25cIiB8fFxuICAgICAgICAgICAgICAgIGUua2V5ID09PSBcIkFycm93VXBcIiB8fFxuICAgICAgICAgICAgICAgIGUua2V5ID09PSBcIkFycm93TGVmdFwiIHx8XG4gICAgICAgICAgICAgICAgZS5rZXkgPT09IFwiQXJyb3dSaWdodFwiKSB7XG4gICAgICAgICAgICAgICAgX3RoaXMua2V5cy5zcGxpY2UoX3RoaXMua2V5cy5pbmRleE9mKGUua2V5KSwgMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gSW5wdXRIYW5kbGVyO1xufSgpKTtcbmV4cG9ydCB7IElucHV0SGFuZGxlciB9O1xuIiwidmFyIExheWVyID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIExheWVyKGJhY2tncm91bmQsIGltYWdlLCBzcGVlZE1vZGlmaWVyKSB7XG4gICAgICAgIHRoaXMuYmFja2dyb3VuZCA9IGJhY2tncm91bmQ7XG4gICAgICAgIHRoaXMud2lkdGggPSB0aGlzLmJhY2tncm91bmQud2lkdGg7XG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gdGhpcy5iYWNrZ3JvdW5kLmhlaWdodDtcbiAgICAgICAgdGhpcy5pbWFnZSA9IGltYWdlO1xuICAgICAgICB0aGlzLnNwZWVkTW9kaWZpZXIgPSBzcGVlZE1vZGlmaWVyO1xuICAgICAgICB0aGlzLnggPSAwO1xuICAgICAgICB0aGlzLngyID0gMDtcbiAgICAgICAgdGhpcy55ID0gMDtcbiAgICAgICAgdGhpcy5zcGVlZCA9IHRoaXMuYmFja2dyb3VuZC5zcGVlZFggKiB0aGlzLnNwZWVkTW9kaWZpZXI7XG4gICAgfVxuICAgIExheWVyLnByb3RvdHlwZS51cGRhdGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuc3BlZWQgPSB0aGlzLmJhY2tncm91bmQuc3BlZWRYICogdGhpcy5zcGVlZE1vZGlmaWVyO1xuICAgICAgICB0aGlzLnggPSB0aGlzLnggKyB0aGlzLnNwZWVkO1xuICAgICAgICAvLyByZXNldCBpbWFnZTEgcG9zaXRpb24gaWYgb2ZmLWxpbWl0c1xuICAgICAgICBpZiAodGhpcy54IDwgMCAtIHRoaXMud2lkdGgpIHtcbiAgICAgICAgICAgIHRoaXMueCA9IDA7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodGhpcy54ID4gdGhpcy53aWR0aCkge1xuICAgICAgICAgICAgdGhpcy54ID0gMDtcbiAgICAgICAgfVxuICAgICAgICAvLyBwb3NpdGlvbnMgaW1hZ2UyIHRvIGxlZnQgb3IgcmlnaHRcbiAgICAgICAgaWYgKHRoaXMueCA8PSAwKSB7XG4gICAgICAgICAgICB0aGlzLngyID0gdGhpcy54ICsgdGhpcy53aWR0aDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMueDIgPSB0aGlzLnggLSB0aGlzLndpZHRoO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBMYXllci5wcm90b3R5cGUuZHJhdyA9IGZ1bmN0aW9uIChjb250ZXh0KSB7XG4gICAgICAgIGNvbnRleHQuZHJhd0ltYWdlKHRoaXMuaW1hZ2UsIHRoaXMueCwgdGhpcy55LCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCk7XG4gICAgICAgIGNvbnRleHQuZHJhd0ltYWdlKHRoaXMuaW1hZ2UsIHRoaXMueDIsIHRoaXMueSwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQpO1xuICAgIH07XG4gICAgcmV0dXJuIExheWVyO1xufSgpKTtcbmV4cG9ydCB7IExheWVyIH07XG4iLCJpbXBvcnQgeyBSdW5uaW5nLCBKdW1waW5nLCBGYWxsaW5nLCBTdGlsbCB9IGZyb20gXCIuL1N0YXRlc1wiO1xudmFyIFBsYXllciA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBQbGF5ZXIoZ2FtZSkge1xuICAgICAgICB0aGlzLmdhbWUgPSBnYW1lO1xuICAgICAgICB0aGlzLnN0YXRlcyA9IFtcbiAgICAgICAgICAgIG5ldyBTdGlsbCh0aGlzKSxcbiAgICAgICAgICAgIG5ldyBSdW5uaW5nKHRoaXMpLFxuICAgICAgICAgICAgbmV3IEp1bXBpbmcodGhpcyksXG4gICAgICAgICAgICBuZXcgRmFsbGluZyh0aGlzKSxcbiAgICAgICAgXTtcbiAgICAgICAgdGhpcy5jdXJyZW50U3RhdGUgPSB0aGlzLnN0YXRlc1swXTtcbiAgICAgICAgdGhpcy5jdXJyZW50U3RhdGUuZW50ZXIoKTtcbiAgICAgICAgdGhpcy5pbWFnZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaW1nR29ibGluXCIpO1xuICAgICAgICB0aGlzLmZhY2luZyA9IFwiUlwiOyAvLyBSID0gcmlnaHQsIEwgPSBsZWZ0XG4gICAgICAgIHRoaXMuYW5pbWF0aW9uID0gXCJzdGlsbFwiO1xuICAgICAgICB0aGlzLndpZHRoID0gNjY7IC8vIGRpc3BsYXllZCB3aWR0aFxuICAgICAgICB0aGlzLmhlaWdodCA9IDYxOyAvLyBkaXNwbGF5ZWQgaGVpZ2h0XG4gICAgICAgIHRoaXMubGVmdExpbWl0ID0gMDtcbiAgICAgICAgdGhpcy5yaWdodExpbWl0ID0gdGhpcy5nYW1lLndpZHRoIC0gdGhpcy53aWR0aDtcbiAgICAgICAgdGhpcy55T2Zmc2V0ID0gNDsgLy8gYWNjb3VudCBmb3IgY2hhcmFjdGVyIHBvc2l0aW9uIG9mZnNldCBvbiBzcHJpdGVzaGVldFxuICAgICAgICB0aGlzLmdyb3VuZExpbWl0ID0gdGhpcy5nYW1lLmhlaWdodCAtIHRoaXMuaGVpZ2h0ICsgdGhpcy55T2Zmc2V0O1xuICAgICAgICB0aGlzLnggPSAwO1xuICAgICAgICB0aGlzLnkgPSB0aGlzLmdyb3VuZExpbWl0O1xuICAgICAgICB0aGlzLnNwZWVkWCA9IDA7XG4gICAgICAgIHRoaXMuc3BlZWRYTW9kaWZpZXIgPSAzO1xuICAgICAgICB0aGlzLnRyYXZlbGVkWCA9IDA7XG4gICAgICAgIHRoaXMuc3BlZWRZID0gMDtcbiAgICAgICAgdGhpcy53ZWlnaHQgPSAxLjI7XG4gICAgICAgIHRoaXMuc291cmNlV2lkdGggPSA2NjsgLy8gd2lkdGggb2YgZWFjaCBzcHJpdGUgb24gc3ByaXRlc2hlZXRcbiAgICAgICAgdGhpcy5zb3VyY2VIZWlnaHQgPSA2MTsgLy8gaGVpZ2h0IG9mIGVhY2ggc3ByaXRlIG9uIHNwcml0ZXNoZWV0XG4gICAgICAgIHRoaXMubWF4RnJhbWVDb2wgPSA2OyAvLyBudW1iZXIgb2YgY29sdW1ucyBvbiBzcHJpdGVzaGVldFxuICAgICAgICB0aGlzLm1heEZyYW1lUm93ID0gNDsgLy8gbnVtYmVyIG9yIHJvd3Mgb24gc3ByaXRlc2hlZXRcbiAgICAgICAgdGhpcy5mcmFtZSA9IDA7XG4gICAgICAgIHRoaXMuZnJhbWVDb2wgPSB0aGlzLmZyYW1lICUgdGhpcy5tYXhGcmFtZUNvbDtcbiAgICAgICAgdGhpcy5mcmFtZVJvdyA9IE1hdGguZmxvb3IodGhpcy5mcmFtZSAvIHRoaXMubWF4RnJhbWVDb2wpO1xuICAgICAgICB0aGlzLmZwcyA9IDE1O1xuICAgICAgICB0aGlzLmZyYW1lVGltZXIgPSAwO1xuICAgICAgICB0aGlzLmhpdGJveFJhZGl1cyA9IHRoaXMud2lkdGggLyAyLjc7XG4gICAgfVxuICAgIFBsYXllci5wcm90b3R5cGUuZHJhdyA9IGZ1bmN0aW9uIChjb250ZXh0KSB7XG4gICAgICAgIC8vIHNlZSBodHRwczovL3d3dy55b3V0dWJlLmNvbS93YXRjaD92PTdKdExISmJtMGtBJnQ9ODMwc1xuICAgICAgICBpZiAodGhpcy5nYW1lLmRlYnVnKSB7XG4gICAgICAgICAgICAvLyBjb250ZXh0LnN0cm9rZVJlY3QodGhpcy54LCB0aGlzLnksIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0KTtcbiAgICAgICAgICAgIGNvbnRleHQuYmVnaW5QYXRoKCk7XG4gICAgICAgICAgICBjb250ZXh0LmFyYyh0aGlzLnggKyB0aGlzLndpZHRoIC8gMi4xLCB0aGlzLnkgKyB0aGlzLmhlaWdodCAvIDEuOCwgdGhpcy5oaXRib3hSYWRpdXMsIDAsIE1hdGguUEkgKiAyKTtcbiAgICAgICAgICAgIGNvbnRleHQuc3Ryb2tlKCk7XG4gICAgICAgIH1cbiAgICAgICAgY29udGV4dC5kcmF3SW1hZ2UodGhpcy5pbWFnZSwgdGhpcy5mcmFtZUNvbCAqIHRoaXMuc291cmNlV2lkdGgsIC8vIHN4XG4gICAgICAgIHRoaXMuZnJhbWVSb3cgKiB0aGlzLnNvdXJjZUhlaWdodCwgLy8gc3lcbiAgICAgICAgdGhpcy53aWR0aCwgLy8gc3dcbiAgICAgICAgdGhpcy5oZWlnaHQsIC8vIHNoXG4gICAgICAgIHRoaXMueCwgdGhpcy55LCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCk7XG4gICAgfTtcbiAgICBQbGF5ZXIucHJvdG90eXBlLnVwZGF0ZSA9IGZ1bmN0aW9uIChpbnB1dCwgZGVsdGFUaW1lKSB7XG4gICAgICAgIHRoaXMuY2hlY2tDb2xsaXNpb24oKTtcbiAgICAgICAgaWYgKHRoaXMuZ2FtZS5kZWJ1Zykge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJ0aGlzLmN1cnJlbnRTdGF0ZSA6Pj4gXCIsIHRoaXMuY3VycmVudFN0YXRlKTtcbiAgICAgICAgfVxuICAgICAgICAvLyAtLS0tLSBNT1ZFTUVOVFxuICAgICAgICAvLyBob3Jpem9udGFsIG1vdmVtZW50XG4gICAgICAgIGlmIChpbnB1dC5rZXlzLmluY2x1ZGVzKFwiQXJyb3dSaWdodFwiKSkge1xuICAgICAgICAgICAgdGhpcy5zcGVlZFggPSAodGhpcy5zcGVlZFhNb2RpZmllciAqIHRoaXMuZ2FtZS5zcGVlZCk7XG4gICAgICAgICAgICB0aGlzLmZhY2luZyA9IFwiUlwiO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGlucHV0LmtleXMuaW5jbHVkZXMoXCJBcnJvd0xlZnRcIikpIHtcbiAgICAgICAgICAgIHRoaXMuc3BlZWRYID0gKC10aGlzLnNwZWVkWE1vZGlmaWVyICogdGhpcy5nYW1lLnNwZWVkKTtcbiAgICAgICAgICAgIHRoaXMuZmFjaW5nID0gXCJMXCI7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnNwZWVkWCA9IDA7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy54ICs9IHRoaXMuc3BlZWRYO1xuICAgICAgICB0aGlzLnRyYXZlbGVkWCArPSB0aGlzLnNwZWVkWDtcbiAgICAgICAgdGhpcy5jdXJyZW50U3RhdGUuaGFuZGxlSW5wdXQoaW5wdXQpO1xuICAgICAgICAvLyBob3Jpem9udGFsIGJvdW5kYXJpZXNcbiAgICAgICAgaWYgKHRoaXMueCA8IHRoaXMubGVmdExpbWl0KSB7XG4gICAgICAgICAgICB0aGlzLnggPSAwO1xuICAgICAgICAgICAgdGhpcy5nYW1lLmJhY2tncm91bmQuc3BlZWRYID0gKC10aGlzLnNwZWVkWCAqIHRoaXMuZ2FtZS5zcGVlZCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodGhpcy54ID4gdGhpcy5yaWdodExpbWl0KSB7XG4gICAgICAgICAgICB0aGlzLnggPSB0aGlzLmdhbWUud2lkdGggLSB0aGlzLndpZHRoO1xuICAgICAgICAgICAgdGhpcy5nYW1lLmJhY2tncm91bmQuc3BlZWRYID0gKC10aGlzLnNwZWVkWCAqIHRoaXMuZ2FtZS5zcGVlZCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmdhbWUuYmFja2dyb3VuZC5zcGVlZFggPSAwO1xuICAgICAgICB9XG4gICAgICAgIC8vIHZlcnRpY2FsIG1vdmVtZW50XG4gICAgICAgIGlmIChpbnB1dC5rZXlzLmluY2x1ZGVzKFwiQXJyb3dVcFwiKSAmJiB0aGlzLm9uR3JvdW5kKCkpIHtcbiAgICAgICAgICAgIHRoaXMuc3BlZWRZIC09IDIwO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMueSArPSB0aGlzLnNwZWVkWTtcbiAgICAgICAgaWYgKCF0aGlzLm9uR3JvdW5kKCkpIHtcbiAgICAgICAgICAgIHRoaXMuc3BlZWRZICs9IHRoaXMud2VpZ2h0O1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5zcGVlZFkgPSAwO1xuICAgICAgICB9XG4gICAgICAgIC8vIHZlcnRpY2FsIGJvdW5kYXJpZXNcbiAgICAgICAgaWYgKHRoaXMueSA+IHRoaXMuZ3JvdW5kTGltaXQpXG4gICAgICAgICAgICB0aGlzLnkgPSB0aGlzLmdyb3VuZExpbWl0O1xuICAgICAgICAvLyAtLS0tLSBBTklNQVRJT05cbiAgICAgICAgLy8gdXBkYXRlIHBsYXllciBmcmFtZSBvbmx5IHdoZW4gYWJvdmUgZnBzIGludGVydmFsXG4gICAgICAgIGlmICh0aGlzLmZyYW1lVGltZXIgPiAxMDAwIC8gdGhpcy5mcHMpIHtcbiAgICAgICAgICAgIHRoaXMuZnJhbWVUaW1lciA9IDA7XG4gICAgICAgICAgICAvLyBpZiByZWFjaGVkIGVuZCBvZiBzcHJpdGVzaGVldCwgcmVwb3NpdGlvbnMgdG8gc3RhcnQgb2Ygc3ByaXRlc2hlZXRcbiAgICAgICAgICAgIGlmICh0aGlzLmZyYW1lID09PSB0aGlzLm1heEZyYW1lUm93ICogdGhpcy5tYXhGcmFtZUNvbCAtIDEpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmZyYW1lID0gMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuZnJhbWUrKztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIGN5Y2xlIHRocm91Z2ggc3ByaXRlc2hlZXQgcm93cy9jb2x1bW5zXG4gICAgICAgICAgICB0aGlzLmZyYW1lQ29sID0gdGhpcy5mcmFtZSAlIHRoaXMubWF4RnJhbWVDb2w7XG4gICAgICAgICAgICB0aGlzLmZyYW1lUm93ID0gTWF0aC5mbG9vcih0aGlzLmZyYW1lIC8gdGhpcy5tYXhGcmFtZUNvbCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmZyYW1lVGltZXIgKz0gZGVsdGFUaW1lO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBQbGF5ZXIucHJvdG90eXBlLmNoYW5nZVNwcml0ZXNoZWV0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAodGhpcy5pbWFnZSkge1xuICAgICAgICAgICAgdGhpcy5pbWFnZS5zcmMgPSBcImFzc2V0cy9pbWcvY2hhcmFjdGVycy9nb2JsaW4vZ29ibGluX1wiLmNvbmNhdCh0aGlzLmFuaW1hdGlvbiwgXCJfXCIpLmNvbmNhdCh0aGlzLmZhY2luZywgXCJfc3ByaXRlc2hlZXQucG5nXCIpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBQbGF5ZXIucHJvdG90eXBlLnNldFN0YXRlID0gZnVuY3Rpb24gKHN0YXRlKSB7XG4gICAgICAgIHRoaXMuY3VycmVudFN0YXRlID0gdGhpcy5zdGF0ZXNbc3RhdGVdO1xuICAgICAgICB0aGlzLmN1cnJlbnRTdGF0ZS5lbnRlcigpO1xuICAgIH07XG4gICAgUGxheWVyLnByb3RvdHlwZS5jaGVja0NvbGxpc2lvbiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgdGhpcy5nYW1lLmVuZW1pZXMuZm9yRWFjaChmdW5jdGlvbiAoZW5lbXkpIHtcbiAgICAgICAgICAgIHZhciBkeCA9IGVuZW15LnggLSBfdGhpcy54O1xuICAgICAgICAgICAgdmFyIGR5ID0gZW5lbXkueSAtIF90aGlzLnk7XG4gICAgICAgICAgICB2YXIgZGlzdGFuY2UgPSBNYXRoLnNxcnQoZHggKiBkeCArIGR5ICogZHkpO1xuICAgICAgICAgICAgaWYgKGRpc3RhbmNlIDwgZW5lbXkuaGl0Ym94UmFkaXVzICsgX3RoaXMuaGl0Ym94UmFkaXVzKSB7XG4gICAgICAgICAgICAgICAgX3RoaXMuZ2FtZS5nYW1lT3ZlciA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgUGxheWVyLnByb3RvdHlwZS5vbkdyb3VuZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMueSA+PSB0aGlzLmdhbWUuaGVpZ2h0IC0gdGhpcy5oZWlnaHQ7XG4gICAgfTtcbiAgICByZXR1cm4gUGxheWVyO1xufSgpKTtcbmV4cG9ydCB7IFBsYXllciB9O1xuIiwidmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCAoZnVuY3Rpb24gKCkge1xuICAgIHZhciBleHRlbmRTdGF0aWNzID0gZnVuY3Rpb24gKGQsIGIpIHtcbiAgICAgICAgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxuICAgICAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxuICAgICAgICAgICAgZnVuY3Rpb24gKGQsIGIpIHsgZm9yICh2YXIgcCBpbiBiKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGIsIHApKSBkW3BdID0gYltwXTsgfTtcbiAgICAgICAgcmV0dXJuIGV4dGVuZFN0YXRpY3MoZCwgYik7XG4gICAgfTtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGQsIGIpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBiICE9PSBcImZ1bmN0aW9uXCIgJiYgYiAhPT0gbnVsbClcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDbGFzcyBleHRlbmRzIHZhbHVlIFwiICsgU3RyaW5nKGIpICsgXCIgaXMgbm90IGEgY29uc3RydWN0b3Igb3IgbnVsbFwiKTtcbiAgICAgICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcbiAgICAgICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbiAgICB9O1xufSkoKTtcbmltcG9ydCB7IFNUQVRFUyB9IGZyb20gXCIuLi9jb25zdC9jb25zdFwiO1xudmFyIFN0YXRlID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFN0YXRlKHN0YXRlKSB7XG4gICAgICAgIHRoaXMuc3RhdGUgPSBzdGF0ZTtcbiAgICB9XG4gICAgcmV0dXJuIFN0YXRlO1xufSgpKTtcbnZhciBTdGlsbCA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoU3RpbGwsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gU3RpbGwocGxheWVyKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMsIFwiU1RJTExcIikgfHwgdGhpcztcbiAgICAgICAgX3RoaXMucGxheWVyID0gcGxheWVyO1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIFN0aWxsLnByb3RvdHlwZS5lbnRlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5wbGF5ZXIuYW5pbWF0aW9uID0gXCJzdGlsbFwiO1xuICAgICAgICB0aGlzLnBsYXllci5jaGFuZ2VTcHJpdGVzaGVldCgpO1xuICAgIH07XG4gICAgU3RpbGwucHJvdG90eXBlLmhhbmRsZUlucHV0ID0gZnVuY3Rpb24gKGlucHV0KSB7XG4gICAgICAgIGlmIChpbnB1dC5rZXlzLmluY2x1ZGVzKFwiQXJyb3dSaWdodFwiKSkge1xuICAgICAgICAgICAgdGhpcy5wbGF5ZXIuZmFjaW5nID0gXCJSXCI7XG4gICAgICAgICAgICB0aGlzLnBsYXllci5zZXRTdGF0ZShTVEFURVMuUlVOTklORyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoaW5wdXQua2V5cy5pbmNsdWRlcyhcIkFycm93TGVmdFwiKSkge1xuICAgICAgICAgICAgdGhpcy5wbGF5ZXIuZmFjaW5nID0gXCJMXCI7XG4gICAgICAgICAgICB0aGlzLnBsYXllci5zZXRTdGF0ZShTVEFURVMuUlVOTklORyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGlucHV0LmtleXMuaW5jbHVkZXMoXCJBcnJvd1VwXCIpKVxuICAgICAgICAgICAgdGhpcy5wbGF5ZXIuc2V0U3RhdGUoU1RBVEVTLkpVTVBJTkcpO1xuICAgICAgICB0aGlzLnBsYXllci5jaGFuZ2VTcHJpdGVzaGVldCgpO1xuICAgIH07XG4gICAgcmV0dXJuIFN0aWxsO1xufShTdGF0ZSkpO1xudmFyIFJ1bm5pbmcgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKFJ1bm5pbmcsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gUnVubmluZyhwbGF5ZXIpIHtcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcywgXCJSVU5OSU5HXCIpIHx8IHRoaXM7XG4gICAgICAgIF90aGlzLnBsYXllciA9IHBsYXllcjtcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICBSdW5uaW5nLnByb3RvdHlwZS5lbnRlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5wbGF5ZXIuYW5pbWF0aW9uID0gXCJydW5uaW5nXCI7XG4gICAgICAgIHRoaXMucGxheWVyLmNoYW5nZVNwcml0ZXNoZWV0KCk7XG4gICAgfTtcbiAgICBSdW5uaW5nLnByb3RvdHlwZS5oYW5kbGVJbnB1dCA9IGZ1bmN0aW9uIChpbnB1dCkge1xuICAgICAgICBpZiAoaW5wdXQua2V5cy5pbmNsdWRlcyhcIkFycm93UmlnaHRcIikpIHtcbiAgICAgICAgICAgIHRoaXMucGxheWVyLmZhY2luZyA9IFwiUlwiO1xuICAgICAgICAgICAgdGhpcy5wbGF5ZXIuY2hhbmdlU3ByaXRlc2hlZXQoKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChpbnB1dC5rZXlzLmluY2x1ZGVzKFwiQXJyb3dMZWZ0XCIpKSB7XG4gICAgICAgICAgICB0aGlzLnBsYXllci5mYWNpbmcgPSBcIkxcIjtcbiAgICAgICAgICAgIHRoaXMucGxheWVyLmNoYW5nZVNwcml0ZXNoZWV0KCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGlucHV0LmtleXMuaW5jbHVkZXMoXCJBcnJvd1VwXCIpKVxuICAgICAgICAgICAgdGhpcy5wbGF5ZXIuc2V0U3RhdGUoU1RBVEVTLkpVTVBJTkcpO1xuICAgICAgICBpZiAodGhpcy5wbGF5ZXIuc3BlZWRYID09PSAwKVxuICAgICAgICAgICAgdGhpcy5wbGF5ZXIuc2V0U3RhdGUoU1RBVEVTLlNUSUxMKTtcbiAgICB9O1xuICAgIHJldHVybiBSdW5uaW5nO1xufShTdGF0ZSkpO1xudmFyIEp1bXBpbmcgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKEp1bXBpbmcsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gSnVtcGluZyhwbGF5ZXIpIHtcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcywgXCJKVU1QSU5HXCIpIHx8IHRoaXM7XG4gICAgICAgIF90aGlzLnBsYXllciA9IHBsYXllcjtcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICBKdW1waW5nLnByb3RvdHlwZS5lbnRlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5wbGF5ZXIuYW5pbWF0aW9uID0gXCJydW5uaW5nXCI7XG4gICAgICAgIHRoaXMucGxheWVyLmNoYW5nZVNwcml0ZXNoZWV0KCk7XG4gICAgfTtcbiAgICBKdW1waW5nLnByb3RvdHlwZS5oYW5kbGVJbnB1dCA9IGZ1bmN0aW9uIChpbnB1dCkge1xuICAgICAgICBpZiAodGhpcy5wbGF5ZXIuc3BlZWRZID4gdGhpcy5wbGF5ZXIud2VpZ2h0KSB7XG4gICAgICAgICAgICB0aGlzLnBsYXllci5zZXRTdGF0ZShTVEFURVMuRkFMTElORyk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHJldHVybiBKdW1waW5nO1xufShTdGF0ZSkpO1xudmFyIEZhbGxpbmcgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKEZhbGxpbmcsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gRmFsbGluZyhwbGF5ZXIpIHtcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcywgXCJGQUxMSU5HXCIpIHx8IHRoaXM7XG4gICAgICAgIF90aGlzLnBsYXllciA9IHBsYXllcjtcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICBGYWxsaW5nLnByb3RvdHlwZS5lbnRlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5wbGF5ZXIuYW5pbWF0aW9uID0gXCJydW5uaW5nXCI7XG4gICAgICAgIHRoaXMucGxheWVyLmNoYW5nZVNwcml0ZXNoZWV0KCk7XG4gICAgfTtcbiAgICBGYWxsaW5nLnByb3RvdHlwZS5oYW5kbGVJbnB1dCA9IGZ1bmN0aW9uIChpbnB1dCkge1xuICAgICAgICBpZiAodGhpcy5wbGF5ZXIub25Hcm91bmQoKSkge1xuICAgICAgICAgICAgdGhpcy5wbGF5ZXIuc2V0U3RhdGUoU1RBVEVTLlNUSUxMKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgcmV0dXJuIEZhbGxpbmc7XG59KFN0YXRlKSk7XG5leHBvcnQgeyBTdGF0ZSwgU3RpbGwsIFJ1bm5pbmcsIEp1bXBpbmcsIEZhbGxpbmcgfTtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiLy8gV0lQIDogYWRkIGhpdGJveCA7IGFkZCBzY29yZVxuaW1wb3J0IHsgQ0FOVkFTX0hFSUdIVCwgQ0FOVkFTX1dJRFRIIH0gZnJvbSBcIi4vY29uc3QvY29uc3RcIjtcbmltcG9ydCB7IEdhbWUgfSBmcm9tIFwiLi9tb2RlbC9HYW1lXCI7XG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRcIiwgZnVuY3Rpb24gKCkge1xuICAgIHZhciBjYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNhbnZhczFcIik7XG4gICAgdmFyIGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XG4gICAgY2FudmFzLndpZHRoID0gQ0FOVkFTX1dJRFRIO1xuICAgIGNhbnZhcy5oZWlnaHQgPSBDQU5WQVNfSEVJR0hUO1xuICAgIHZhciBnYW1lID0gbmV3IEdhbWUoY3R4KTtcbiAgICBnYW1lLmFuaW1hdGUoMCk7XG59KTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==