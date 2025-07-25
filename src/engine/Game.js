import Entity from "./Entities.js";
//TODO: Find a way to implement a way to end the game
export default class Game {
  constructor(canvas) {
    this.currentTime = 0;
    this.lastTime = 0;
    this.deltaTime = 0;
    this.canavas = canvas;
    this.checkCompatible(this.canavas);
    this.ctx = this.canavas.getContext("2d");
    this.entities = [];
    this.isRunning = true;
  }
  changeCanvasSize({ canvas = this.canavas, height = 250, width = 400 } = {}) {
    canvas.setAttribute("width", width);
    canvas.setAttribute("height", height);
  }

  addEntity(entity) {
    entity.ctx = this.ctx;
    this.entities.push(entity);
  }

  gameLoop() {
    if (this.isRunning) {
      this.currentTime = this.getTime();
      var deltaTime = this.getDelta(this.currentTime, this.lastTime);
      this.lastTime = this.currentTime;
      this.clearCanvas();
      this.entities.forEach(function update(entity) {
        entity.update(deltaTime);
        entity.render();
      });
      window.requestAnimationFrame(this.gameLoop.bind(this));
    } else {
      window.cancelAnimationFrame(this);
    }
  }

  getTime() {
    const date = Date.now();
    return date;
  }

  checkCompatible({ canavas = this.canavas } = {}) {
    if (canavas.getContext) {
      console.log("Compatible Canvas Found");
    } else {
      console.error(
        canavas.outerHTML,
        "Not Compatible with Canvas Operations \nPlease use tag <canvas>"
      );
      window.alert("DID NOT FIND CANVAS ");
    }
  }

  getDelta(currentTime, lastTime) {
    return currentTime - lastTime;
  }

  clearCanvas() {
    return this.ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
  //TODO: IMPLEMENT A WAY TO END THE GAME/REMOVE AN ENTITY
  gameEnd() {
    console.log("Called");
    return false;
  }
}
