//TODO: CLEAN UP THIS CLASS

export default class Entity {
  constructor(
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
  ) {
    this.events = null;
    this.ctx;
    this.text = text;
    this.spritePath = spritePath;
    this.type = type;
    this.xpos = x;
    this.ypos = y;
    this.width = w;
    this.height = h;

    this.collisionWidth = w * 0.8;
    this.collisionHeight = h * 0.8;
    this.collisionOffsetX = 0;
    this.collisionOffsetY = 0;
    this.collisionLevel = 0;

    this.frameCount = 0;
    this.currentFrame = 0;
    this.frameThreshold = 400;
    this.type = type;
    this.delta = 0;
    this.animation = animation;
    this.frameX = frameX;
    this.frameY = frameY;
    this.spriteWidth = spriteWidth;
    this.spriteHeight = spriteHeight;
    this.animationStates = animationStates;
    this.spriteAnimations = {};
    this.sprite = new Image();
    this.populateAnimations();
    this.sprite.src = spritePath;
    this.allowedTypes = [
      "player",
      "hud",
      "background",
      "text",
      "enemy",
      "entity",
    ];
    if (!this.allowedTypes.includes(this.type)) {
      console.warn(
        `You have set Type to ${this.type} 
        This is not a valid type choose from: ${this.allowedTypes.join(" ")}
        Defaulting to entity type`
      );
      this.type = "entity";
    }
  }

  populateAnimations() {
    if (Array.isArray(this.animationStates)) {
      this.animationStates.forEach((animation, index) => {
        let frames = { loc: [] };
        for (let i = 0; i < animation.frames; i++) {
          let positionX = i * this.spriteWidth;
          let positionY = index * this.spriteHeight;
          frames.loc.push({ x: positionX, y: positionY });
        }
        this.spriteAnimations[animation.name] = frames;
      });
    }
  }

  render({
    ctx = this.ctx,
    x = this.xpos,
    y = this.ypos,
    w = this.width,
    h = this.height,
    type = this.type,
    spritePath = this.spritePath,
    text = this.text,
    frameX = this.frameX,
    frameY = this.frameY,
    spriteWidth = this.spriteWidth,
    spriteHeight = this.spriteHeight,
    frameCounter,
    animation = this.animation,
  } = {}) {
    switch (type) {
      case "player":
        this.renderPlayer({
          ctx: ctx,
          spritePath: spritePath,
          x: x,
          y: y,
          w: w,
          h: h,
          frameX: frameX,
          frameY: frameY,
          spriteWidth: spriteWidth,
          spriteHeight: spriteHeight,
          frameCounter: frameCounter,
          animation: animation,
        });
        break;
      //probably redundant
      case "enemy":
        break;
      //TODO: MORE ABSTRACTION
      case "text":
        this.renderText({ ctx: ctx, x: x, y: y, w: w, h: h, text: text });
        break;
      //inventory, menu, healthbar, etc...
      case "hud":
        break;
      case "background":
        this.renderBackground({
          ctx: ctx,
          x: x,
          y: y,
          w: w,
          h: h,
          spritePath: spritePath,
        });
        break;

      default:
        this.type = "entity";
        break;
    }
    if (this.showDebugCollision) {
      this.debugDrawCollisionBox({ ctx, color: "lightblue" });
    }
  }

  renderText({
    ctx = this.ctx,
    x = this.x,
    y = this.y,
    w = this.w,
    h = this.h,
    text = "Sample Text",
  }) {
    ctx.save();
    ctx.font = "24px Arial";
    ctx.fillStyle = "black";
    ctx.fillText(text, x + 10, y + h - 10);
    ctx.restore();
  }

  renderBackground({
    ctx = this.ctx,
    x = this.x,
    y = this.y,
    w = this.w,
    h = this.h,
    spritePath = null,
  }) {
    if (!this.sprite) return;
    ctx.drawImage(this.sprite, x, y, w, h);
  }

  renderHud() {}

  renderPlayer({
    ctx = this.ctx,
    x = this.xpos,
    y = this.ypos,
    w = this.width,
    h = this.height,
    frameCounter = 0,
    animation = this.animation,
  } = {}) {
    const framesPerSecond = 5;
    const frameDuration = 60 / framesPerSecond;
    const position =
      Math.floor(frameCounter / frameDuration) %
      this.spriteAnimations[animation].loc.length;
    const sx = this.spriteWidth * position;
    const sy = this.spriteAnimations[animation].loc[position].y;
    ctx.globalCompositeOperation = "destination-over";
    ctx.drawImage(
      this.sprite,
      sx,
      sy,
      this.spriteWidth,
      this.spriteHeight,
      x,
      y,
      this.spriteWidth,
      this.spriteHeight
    );
  }

  //TODO: ALLOW FOR MORE CONTROL OVER THE UPDATE, HEALTH, POSITION (FOR NOW)
  update(delta, frameCounter) {
    this.frameCount = frameCounter;
  }

  getCollisionBox() {
    const centerX = this.xpos + this.width / 2;
    const centerY = this.ypos + this.height / 2;

    const collisionX =
      centerX - this.collisionWidth / 2 + this.collisionOffsetX;
    const collisionY =
      centerY - this.collisionHeight / 2 + this.collisionOffsetY;

    return {
      x: collisionX,
      y: collisionY,
      width: this.collisionWidth,
      height: this.collisionHeight,
      centerX: centerX + this.collisionOffsetX,
      centerY: centerY + this.collisionOffsetY,
    };
  }

  setCollisionBox({
    width = this.collisionWidth,
    height = this.collisionHeight,
    offsetX = this.collisionOffsetX,
    offsetY = this.collisionOffsetY,
    widthPercent = null,
    heightPercent = null,
    anchorX = "center", // 'left', 'center', 'right'
    anchorY = "center", // 'top', 'center', 'bottom'
  } = {}) {
    if (widthPercent !== null) {
      width = this.width * (widthPercent / 100);
    }
    if (heightPercent !== null) {
      height = this.height * (heightPercent / 100);
    }

    if (anchorX !== "center" || anchorY !== "center") {
      switch (anchorX) {
        case "left":
          offsetX = -(this.width / 2) + width / 2;
          break;
        case "right":
          offsetX = this.width / 2 - width / 2;
          break;
        default:
          offsetX = 0;
      }

      switch (anchorY) {
        case "top":
          offsetY = -(this.height / 2) + height / 2;
          break;
        case "bottom":
          offsetY = this.height / 2 - height / 2;
          break;
        default:
          offsetY = 0;
      }
    }

    this.collisionWidth = width;
    this.collisionHeight = height;
    this.collisionOffsetX = offsetX;
    this.collisionOffsetY = offsetY;

    console.log(
      `Set Collision for ${this.type} to Width: ${this.collisionWidth}, Height: ${this.collisionHeight}, OffsetX: ${this.collisionOffsetX}, OffsetY: ${this.collisionOffsetY}`
    );
  }

  checkCollision(otherEntity) {
    const thisBox = this.getCollisionBox();
    const otherBox = otherEntity.getCollisionBox();

    return (
      thisBox.x < otherBox.x + otherBox.width &&
      thisBox.x + thisBox.width > otherBox.x &&
      thisBox.y < otherBox.y + otherBox.height &&
      thisBox.y + thisBox.height > otherBox.y
    );
  }

  debugDrawCollisionBox({ ctx = this.ctx, color = "lightblue" } = {}) {
    const box = this.getCollisionBox();
    ctx.save();
    ctx.fillStyle = color;
    ctx.lineWidth = 2;
    ctx.fillRect(box.x, box.y, box.width, box.height);
    ctx.strokeRect(box.x, box.y, box.width, box.height);
    ctx.fillStyle = color;
    ctx.fillRect(box.centerX - 2, box.centerY - 2, 4, 4);
    ctx.restore();
  }

  getCollisionLevel() {
    return { "collision-z": this.collisionLevel };
  }

  setCollisionLevel({ collisionZ = this.collisionLevel } = {}) {
    this.collisionLevel = collisionZ;
  }
}
