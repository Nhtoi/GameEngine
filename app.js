import Engine from "./src/engine/GameEngine.js";
import Entity from "./src/engine/Entities.js";
import InputManager from "./src/engine/InputManager.js";
import EventBus from "./src/engine/EventBus.js";

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
  animation = null,
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
    animation
  );
}

function createInputManager(eventBus) {
  return new InputManager(eventBus);
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
  const InputManager = createInputManager(app.engine.events);

  const background = createDrawableObject({
    x: 0,
    y: 0,
    w: 600,
    h: 520,
    type: "background",
    spritePath: "./images/white.jpg",
  });

  const spriteWidth = 575;
  const spriteHeight = 523;
  const playerAnimationInfo = "./src/game/data/playerAnimation.json";
  const playerAnimations = await getAnimationData(playerAnimationInfo);
  const animation = "idle";
  const text = createDrawableObject({ text: "Hello", type: "text" });

  const player = createDrawableObject({
    type: "player",
    x: 0,
    y: 0,
    w: spriteWidth,
    h: spriteHeight,
    frameX: 0,
    frameY: 0,
    spriteHeight,
    spriteWidth,
    spritePath: "./images/good-sprite.png",
    animationStates: playerAnimations,
    animation,
  });

  app.engine.events.on("keydown", (key) => {
    if (key == "w") {
      console.log("Move Forward");
    }
  });

  app.engine.events.on("keyup", (key) => {
    if (key == "w") {
      console.log("Stop moving forward");
    }
  });

  const changeAnimation = document.getElementById("animation-select");
  changeAnimation.addEventListener("change", () => {
    player.animation = changeAnimation.value || "idle";
  });

  player.setCollisionBox({
    width: spriteWidth - 50,
    height: spriteHeight - 70,
    offsetY: 35,
  });
  player.showDebugCollision = true;
  // text.showDebugCollision = true;
  app.engine.addEntity(player);
  // app.engine.addEntity(text);
  // app.engine.addEntity(background);
});
