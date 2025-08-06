import Engine from "./src/engine/GameEngine.js";
import Entity from "./src/utils/Entities.js";
import InputManager from "./src/utils/InputManager.js";
import EventBus from "./src/utils/EventBus.js";

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

  app.engine.events.on("collision", ({ player, enemy }) => {
    console.log("collision detected");
  });

  const enemy = createDrawableObject({ type: "text", text: "hello" });
  enemy.setCollision({
    collisionShape: "box",
    width: 50,
    height: 50,
    offsetX: -35,
    offsetY: 35,
  });

  const changeAnimation = document.getElementById("animation-select");
  changeAnimation.addEventListener("change", () => {
    player.animation = changeAnimation.value || "idle";
  });

  player.setCollision({
    collisionShape: "circle",
    radius: 235,
    offsetX: 0,
    offsetY: 25,
  });

  // player.setCollision({
  //   collisionShape: "box",
  //   width: spriteWidth - 100,
  //   height: spriteHeight - 78,
  //   offsetX: 0,
  //   offsetY: 35,
  // });
  enemy.showDebugCollision = true;
  player.showDebugCollision = true;
  // text.showDebugCollision = true;
  app.engine.addEntity(player);
  app.engine.addEntity(enemy);
  // app.engine.addEntity(text);
  // app.engine.addEntity(background);
});
