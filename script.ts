// WIP : add hitbox ; add score
import { CANVAS_HEIGHT, CANVAS_WIDTH } from "./const/const";
import { Game } from "./model/Game";

window.addEventListener("load", function () {
  const canvas = document.getElementById("canvas1") as HTMLCanvasElement;
  const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
  canvas.width = CANVAS_WIDTH;
  canvas.height = CANVAS_HEIGHT;
  const game = new Game(ctx);
  game.animate(0);
});
