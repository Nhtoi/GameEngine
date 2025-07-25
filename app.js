import Engine from "./src/engine/Game.js";

window.app = {};
function createDrawableObject({
  canvas = document.getElementById("canvas"),
  x = 10,
  y = 10,
  w = 150,
  h = 100,
} = {}) {
  return new Engine(canvas, x, y, w, h);
}

window.addEventListener("DOMContentLoaded", function load() {
  //if you want to change the defaults pass them as arguments in the line below
  //as in {attributeName : newValue} example, "{y : 100}"
  app.engine = createDrawableObject();
  app.engine.changeCanvasSize();
  app.engine.gameLoop();
});
