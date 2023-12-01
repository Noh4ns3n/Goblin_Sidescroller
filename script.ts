// Game is being sent everywhere + I don't want more than one instance -> make it a Singleton ?
// Add player stats / spritesheet props as classes

import { CANVAS2_HEIGHT, CANVAS2_WIDTH, CANVAS_HEIGHT, CANVAS_WIDTH } from "./const/const";
import { Game } from "./model/Game";

window.addEventListener("load", function () {
  // canvas1 = game area
  const canvas = document.getElementById("canvas1") as HTMLCanvasElement;
  const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
  canvas.width = CANVAS_WIDTH;
  canvas.height = CANVAS_HEIGHT;
  // canvas2 = HUD
  const canvas2 = document.getElementById("canvas2") as HTMLCanvasElement;
  const ctx2 = canvas2.getContext("2d") as CanvasRenderingContext2D;
  canvas2.width = CANVAS2_WIDTH;
  canvas2.height = CANVAS2_HEIGHT;
  const game = new Game(ctx, ctx2);
  game.animatePreparation(0);
});
