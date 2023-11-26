import { STATES } from "../const/const";
import { Player } from "./Player";

class State {
    state: String;
    constructor(state) {
      this.state = state;
    }
  }

class Still extends State {
    player: Player;

    constructor(player) {
      super("STILL");
      this.player = player;
    }
    enter() {
      this.player.animation = "still";
    }
    handleInput(input) {
      if (input.keys.includes("ArrowRight")) {
        this.player.facing = "R";
        this.player.setState(STATES.RUNNING);
      } else if (input.keys.includes("ArrowLeft")) {
        this.player.facing = "L";
        this.player.setState(STATES.RUNNING);
      }
      if (input.keys.includes("ArrowUp")) this.player.setState(STATES.JUMPING);
    }
  }
class Running extends State {
    player: Player;

    constructor(player) {
      super("RUNNING");
      this.player = player;
    }
    enter() {
      this.player.animation = "running";
    }
    handleInput(input) {
      if (input.keys.includes("ArrowRight")) {
        this.player.facing = "R";
      } else if (input.keys.includes("ArrowLeft")) {
        this.player.facing = "L";
      }
      if (input.keys.includes("ArrowUp")) this.player.setState(STATES.JUMPING);
      if (this.player.speedX === 0) this.player.setState(STATES.STILL);
    }
  }

class Jumping extends State {
    player: Player;

    constructor(player) {
      super("JUMPING");
      this.player = player;
    }
    enter() {
      this.player.animation = "running";
    }
    handleInput(input) {
      if (this.player.speedY > this.player.weight) {
        this.player.setState(STATES.FALLING);
      }
    }
  }
class Falling extends State {
    player: Player;

    constructor(player) {
      super("FALLING");
      this.player = player;
    }
    enter() {
      this.player.animation = "running";
    }
    handleInput(input) {
      if (this.player.onGround()) {
        this.player.setState(STATES.STILL);
      }
    }
  }

  export { State, Still, Running, Jumping, Falling }