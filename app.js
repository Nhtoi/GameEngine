import Engine from "./src/engine/Game.js";
import Entity from "./src/engine/Entities.js";

window.app = {};
function createGame({ gameArea = document.getElementById("canvas") } = {}) {
  return new Engine(gameArea);
}
function createDrawableObject({
  x = 10,
  y = 10,
  w = 150,
  h = 100,
  sprite = null,
} = {}) {
  return new Entity(x, y, w, h, sprite);
}

window.addEventListener("DOMContentLoaded", function load() {
  app.engine = createGame();
  app.engine.changeCanvasSize();
  app.entity = createDrawableObject();
  app.engine.addEntity(app.entity);
  app.engine.gameLoop();
});
