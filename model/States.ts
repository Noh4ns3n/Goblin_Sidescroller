import { STATES } from "../const/const";
import { Game } from "./Game";
import { InputHandler } from "./InputHandler";
import { Player } from "./Player";

class State {
    state: String;
    constructor(state) {
      this.state = state;
    }
  }

class Still extends State {
    game: Game;
    constructor(game) {
      super("STILL");
      this.game = game;
    }
    enter() {
      this.game.player.animation = "still";
    }
    handleInput(input : InputHandler) {
      if (input.keys.includes("ArrowRight")) {
        this.game.player.facing = "R";
        this.game.player.speedX = this.game.player.speedXModifier * this.game.speed;
        this.game.player.setState(STATES.RUNNING);
      } else if (input.keys.includes("ArrowLeft")) {
        this.game.player.facing = "L";
        this.game.player.speedX = -this.game.player.speedXModifier * this.game.speed;
        this.game.player.setState(STATES.RUNNING);
      }
      if (input.keys.includes("ArrowUp")) this.game.player.setState(STATES.JUMPING);
    }
  }
class Running extends State {
    game: Game;
    constructor(game) {
      super("RUNNING");
      this.game = game;
    }
    enter() {
      this.game.player.animation = "running";
    }
    handleInput(input) {
      if (input.keys.includes("ArrowRight")) {
        this.game.player.facing = "R";
        this.game.player.speedX = this.game.player.speedXModifier * this.game.speed;
      } else if (input.keys.includes("ArrowLeft")) {
        this.game.player.facing = "L";
        this.game.player.speedX = -this.game.player.speedXModifier * this.game.speed;
      }
      if (input.keys.includes("ArrowUp")) this.game.player.setState(STATES.JUMPING);
      if (this.game.player.speedX === 0) this.game.player.setState(STATES.STILL);
    }
  }

class Jumping extends State {
    game: Game;
    constructor(game) {
      super("JUMPING");
      this.game = game;
    }
    enter() {
      this.game.player.animation = "running";
    }
    handleInput(input : InputHandler) {
      if (this.game.player.speedY > this.game.player.weight) {
        this.game.player.setState(STATES.FALLING);
      }
      if (input.keys.includes("ArrowRight")) {
        this.game.player.facing = "R";
        this.game.player.speedX = this.game.player.speedXAirModifier * this.game.speed;
      } else if (input.keys.includes("ArrowLeft")) {
        this.game.player.facing = "L";
        this.game.player.speedX = -this.game.player.speedXAirModifier * this.game.speed;
      }
    }
  }
class Falling extends State {
    game: Game;
    constructor(game : Game) {
      super("FALLING");
      this.game = game;
    }
    enter() {
      this.game.player.animation = "running";
    }
    handleInput(input : InputHandler) {
      if (input.keys.includes("ArrowRight")) {
        this.game.player.facing = "R";
        this.game.player.speedX = this.game.player.speedXAirModifier * this.game.speed;
      } else if (input.keys.includes("ArrowLeft")) {
        this.game.player.facing = "L";
        this.game.player.speedX = -this.game.player.speedXAirModifier * this.game.speed;
      }
      if (this.game.player.onGround()) {
        this.game.player.setState(STATES.STILL);
      }
    }
  }

  export { State, Still, Running, Jumping, Falling }