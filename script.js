"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// WIP : add hitbox ; add score
var const_1 = require("./const/const");
var Game_1 = require("./model/Game");
window.addEventListener("load", function () {
    var canvas = document.getElementById("canvas1");
    var ctx = canvas.getContext("2d");
    canvas.width = const_1.CANVAS_WIDTH;
    canvas.height = const_1.CANVAS_HEIGHT;
    var game = new Game_1.Game(ctx);
    game.animate(0);
});
