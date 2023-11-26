"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Falling = exports.Jumping = exports.Running = exports.Still = exports.State = void 0;
var const_1 = require("../const/const");
var State = /** @class */ (function () {
    function State(state) {
        this.state = state;
    }
    return State;
}());
exports.State = State;
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
            this.player.setState(const_1.STATES.RUNNING);
        }
        else if (input.keys.includes("ArrowLeft")) {
            this.player.facing = "L";
            this.player.setState(const_1.STATES.RUNNING);
        }
        if (input.keys.includes("ArrowUp"))
            this.player.setState(const_1.STATES.JUMPING);
    };
    return Still;
}(State));
exports.Still = Still;
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
            this.player.setState(const_1.STATES.JUMPING);
        if (this.player.speedX === 0)
            this.player.setState(const_1.STATES.STILL);
    };
    return Running;
}(State));
exports.Running = Running;
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
            this.player.setState(const_1.STATES.FALLING);
        }
    };
    return Jumping;
}(State));
exports.Jumping = Jumping;
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
            this.player.setState(const_1.STATES.STILL);
        }
    };
    return Falling;
}(State));
exports.Falling = Falling;
