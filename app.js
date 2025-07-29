import Engine from "./src/engine/GameEngine.js";
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

async function getAnimationData(url) {
  const response = await fetch(url);
  const data = await response.json();
  return data.Animations;
}

window.addEventListener("DOMContentLoaded", async function load() {
  app.engine = createGame();
  app.engine.changeCanvasSize({ width: 600, height: 600 });
  app.engine.gameStart();

  const background = createDrawableObject({
    x: 0,
    y: 0,
    type: "background",
    spritePath: "./images/white.jpg",
  });

  const spriteWidth = 575;
  const spriteHeight = 523;
  const playerAnimationInfo = "./src/game/data/playerAnimation.json";

  const playerAnimations = await getAnimationData(playerAnimationInfo);

  const state = "idle";
  const player = createDrawableObject({
    type: "player",
    x: 0,
    y: 0,
    frameX: 0,
    frameY: 0,
    spriteHeight,
    spriteWidth,
    spritePath: "./images/good-sprite.png",
    animationStates: playerAnimations,
    state,
  });

  const changeState = document.getElementById("state-select");
  changeState.addEventListener("change", () => {
    player.state = changeState.value || "idle";
  });
  app.engine.addEntity(player);
  app.engine.addEntity(background);

  function logThisOnce() {
    console.log("only once");
  }
  function logThisMultipleTimes() {
    console.log("a lot of times");
  }

  // player.events.on("test", logThis);
  player.events.on("healthZero", app.engine.gameEnd);

  // player.events.on("test", logThis);
  player.events.once("testOnce", logThisOnce);
  player.events.emit("testOnce");
  player.events.emit("testOnce");
  player.events.emit("testOnce");

  player.events.on("testMultiple", logThisMultipleTimes);
  player.events.emit("testMultiple");
  player.events.emit("testMultiple");
  player.events.emit("testMultiple");

  // player.events.clear("test")
});
