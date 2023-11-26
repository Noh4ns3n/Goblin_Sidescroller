// WIP : add vertical movement to jumping state
// add possibility to change animation for a specified duration (ex: enemy turning)
// add jump cooldown for player
// add sound

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
