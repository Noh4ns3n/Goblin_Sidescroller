import { CANVAS_WIDTH, CANVAS_HEIGHT } from "../const/const";
import { Layer } from "./Layer";

export class Background {
  layers: Layer[];
  x: number;
  y: number;
  width: number;
  height: number;
  speedX: number;

  constructor() {
    this.x = 0;
    this.y = 0;
    this.width = CANVAS_WIDTH;
    this.height = CANVAS_HEIGHT;
    this.speedX = 0;

    const layer1 = new Layer(this, document.getElementById("imgPlx1"), 0.2);
    const layer2 = new Layer(this, document.getElementById("imgPlx2"), 0.4);
    const layer3 = new Layer(this, document.getElementById("imgPlx3"), 0.6);
    const layer4 = new Layer(this, document.getElementById("imgPlx4"), 0.8);
    const layer5 = new Layer(this, document.getElementById("imgPlx5"), 1.0);
    this.layers = [layer1, layer2, layer3, layer4, layer5];
  }
  draw(context) {
    this.layers.forEach((layer) => {
      layer.draw(context);
    });
  }
  update() {
    this.layers.forEach((layer) => {
      layer.update();
    });
  }
}