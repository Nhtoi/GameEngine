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
  spritePath = null,
  type = null,
  text = null,
} = {}) {
  return new Entity(x, y, w, h, type, spritePath, text);
}

window.addEventListener("DOMContentLoaded", function load() {
  app.engine = createGame();
  app.engine.changeCanvasSize();

  var sayHello = (app.entity = createDrawableObject({
    x: 10,
    y: -60,
    type: "text",
    text: "Hello",
  }));

  var sayBye = (app.entity = createDrawableObject({
    x: 10,
    y: -10,
    type: "text",
    text: "Bye",
  }));

  var background = (app.entity = createDrawableObject({
    x: 0,
    y: 0,
    type: "background",
    spritePath: "./images/sprite1.jpg",
  }));

  app.engine.addEntity(sayHello);
  app.engine.addEntity(sayBye);
  app.engine.addEntity(background);
  app.engine.gameStart();

  // app.engine.gameLoop();
});
