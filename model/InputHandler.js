"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InputHandler = void 0;
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
exports.InputHandler = InputHandler;
