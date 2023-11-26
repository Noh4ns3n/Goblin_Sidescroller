"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Background = void 0;
var const_1 = require("../const/const");
var Layer_1 = require("./Layer");
var Background = /** @class */ (function () {
    function Background() {
        this.x = 0;
        this.y = 0;
        this.width = const_1.CANVAS_WIDTH;
        this.height = const_1.CANVAS_HEIGHT;
        this.speedX = 0;
        var layer1 = new Layer_1.Layer(this, document.getElementById("imgPlx1"), 0.2);
        var layer2 = new Layer_1.Layer(this, document.getElementById("imgPlx2"), 0.4);
        var layer3 = new Layer_1.Layer(this, document.getElementById("imgPlx3"), 0.6);
        var layer4 = new Layer_1.Layer(this, document.getElementById("imgPlx4"), 0.8);
        var layer5 = new Layer_1.Layer(this, document.getElementById("imgPlx5"), 1.0);
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
exports.Background = Background;
