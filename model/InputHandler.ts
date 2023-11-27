import { Game } from "./Game";

export  class InputHandler {
  keys: any[];
  game: Game;
  listenedKeys: string[];
  constructor(game) {
    this.game = game;
    this.keys = [];
    this.listenedKeys = ["ArrowDown","ArrowUp", "ArrowLeft", "ArrowRight", "a"]
    
    window.addEventListener("keydown", (e) => {
      if (
        this.listenedKeys.includes(e.key) &&
        !this.keys.includes(e.key)
        ) {
          this.keys.push(e.key);
        } else if (e.key === "d") {
          this.game.debug = !this.game.debug;
        }
    });

    window.addEventListener("keyup", (e) => {
      if (
        this.listenedKeys.includes(e.key)
      ) {
        this.keys.splice(this.keys.indexOf(e.key), 1);
      }
    });
  }
}