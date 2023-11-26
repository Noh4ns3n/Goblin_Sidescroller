"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = void 0;
var const_1 = require("../const/const");
var Background_1 = require("./Background");
var Enemy_1 = require("./Enemy");
var InputHandler_1 = require("./InputHandler");
var Player_1 = require("./Player");
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
        this.height = const_1.CANVAS_HEIGHT;
        this.width = const_1.CANVAS_WIDTH;
        this.lastTime = 0;
        this.enemyInterval = 1000;
        this.randomEnemyInterval = Math.random() * 1000 + 500;
        this.enemyTimer = 0;
        this.enemies = [];
        this.input = new InputHandler_1.InputHandler(this);
        this.background = new Background_1.Background();
        this.player = new Player_1.Player(this);
        this.debug = false;
        this.score = 0;
        this.speed = 1;
        this.gameOver = false;
        this.spanScore = document.getElementById('spanScore');
    }
    Game.prototype.handleEnemies = function (deltaTime) {
        var _this = this;
        if (this.enemyTimer > this.enemyInterval + this.randomEnemyInterval) {
            this.enemies.push(new Enemy_1.Enemy(this));
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
exports.Game = Game;
