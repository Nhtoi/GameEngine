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
  type = null,
  spritePath = null,
  text = null,
  spriteHeight = 0,
  spriteWidth = 0,
  frameX = 0,
  frameY = 0,
  animationStates = null,
  state = null,
} = {}) {
  return new Entity(
    x,
    y,
    w,
    h,
    type,
    spritePath,
    text,
    spriteHeight,
    spriteWidth,
    frameX,
    frameY,
    animationStates,
    state
  );
}

window.addEventListener("DOMContentLoaded", function load() {
  app.engine = createGame();
  app.engine.changeCanvasSize({ width: 600, height: 600 });

  var background = (app.entity = createDrawableObject({
    x: 0,
    y: 0,
    type: "background",
    spritePath: "./images/white.jpg",
  }));

  //sheet height: 360 px width: 867 px

  const spriteWidth = 575;
  const spriteHeight = 523;

  var test1 = [
    {
      name: "idle",
      frames: 7,
    },
    {
      name: "jump",
      frames: 7,
    },
  ];

  var state = "idle";
  var player = (app.entity = createDrawableObject({
    type: "player",
    x: 0,
    y: 0,
    frameX: 0,
    frameY: 0,
    spriteHeight,
    spriteWidth,
    spritePath: "./images/good-sprite.png",
    animationStates: test1,
    state,
  }));

  const changeState = document.getElementById("state-select");
  //console.log(changeState);
  changeState.addEventListener("change", () => {
    state = changeState.value || "idle";
    player.state = state;
  });

  app.engine.addEntity(player);
  app.engine.addEntity(background);
  app.engine.gameStart();
});
