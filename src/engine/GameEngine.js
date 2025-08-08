//TODO: filter out entities that are not "alive" or "out of render distance"
import EventBus from "../utils/EventBus.js";
import CollisionChecker from "../utils/CollisionChecker.js";
export default class GameEngine extends CollisionChecker {
  constructor(canvas) {
    super();
    this.currentTime = 0;
    this.lastTime = 0;
    this.deltaTime = 0;
    this.canvas = canvas;
    this.checkCompatible(this.canvas);
    this.animationId = null;
    this.ctx = this.canvas.getContext("2d");
    this.entities = [];
    this.isRunning = false;
    this.frameCounter = 0;
    this.events = new EventBus();
  }
  changeCanvasSize({ canvas = this.canvas, height = 250, width = 400 } = {}) {
    canvas.setAttribute("width", width);
    canvas.setAttribute("height", height);
  }

  addEntity(entity) {
    entity.ctx = this.ctx;
    entity.events = this.events;
    this.entities.push(entity);
  }

  checkCollision() {
    for (let i = 0; i < this.entities.length; i++) {
      for (let j = i + 1; j < this.entities.length; j++) {
        const entity1 = this.entities[i];
        const entity2 = this.entities[j];
        if (this.checkEntityCollision(entity1, entity2)) {
          this.handleCollision(entity1, entity2);
        }
      }
    }
  }
  handleCollision(entity1, entity2) {
    this.events.emit("collision", { entity1, entity2 });
    console.log(`Collision between ${entity1} and ${entity2} `);
  }

  gameLoop = () => {
    if (this.isRunning) {
      this.frameCounter++;
      this.currentTime = this.getTime();
      const deltaTime = this.getDelta(this.currentTime, this.lastTime);
      this.lastTime = this.currentTime;
      this.clearCanvas();

      this.entities.forEach((entity) => {
        entity.update(deltaTime, this.frameCounter);
        entity.render({ frameCounter: this.frameCounter });
      });
      this.checkCollision();
      this.animationId = window.requestAnimationFrame(this.gameLoop);
    } else {
      if (this.animationId) {
        window.cancelAnimationFrame(this.animationId);
        this.animationId = null;
      }
      this.clearCanvas();
      console.log("Game is really over");
    }
  };

  getTime() {
    const date = Date.now();
    return date;
  }

  checkCompatible({ canvas = this.canvas } = {}) {
    if (canvas.getContext) {
      console.log("Compatible Canvas Found");
    } else {
      console.error(
        canvas.outerHTML,
        "Not Compatible with Canvas Operations \nPlease use tag <canvas>"
      );
      window.alert("DID NOT FIND CANVAS ");
    }
  }

  getDelta(currentTime, lastTime) {
    return currentTime - lastTime;
  }

  clearCanvas() {
    return this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
  //TODO: IMPLEMENT A WAY TO END THE GAME/REMOVE AN ENTITY

  gameEnd = () => {
    console.log("Game Over");
    this.isRunning = false;
  };

  gameStart() {
    this.isRunning = true;
    this.frameCounter = 0;
    return this.gameLoop();
  }
}
