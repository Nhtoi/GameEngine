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
    state
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
    this.frameCount = 0;
    this.currentFrame = 0;
    this.frameThreshold = 400;
    this.type = type;
    this.delta = 0;
    //image, source-x, source-y, source-w, source-h, destination-x, destination-y, destination-w, destination-h
    this.state = state;
    this.frameX = frameX;
    this.frameY = frameY;
    this.spriteWidth = spriteWidth;
    this.spriteHeight = spriteHeight;
    this.animationStates = animationStates;
    this.spriteAnimations = {};
    this.sprite = new Image();
    this.populateState();
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
    }
  }
  populateState() {
    if (Array.isArray(this.animationStates)) {
      this.animationStates.forEach((state, index) => {
        let frames = { loc: [] };
        for (let i = 0; i < state.frames; i++) {
          let positionX = i * this.spriteWidth;
          let positionY = index * this.spriteHeight;
          frames.loc.push({ x: positionX, y: positionY });
        }
        this.spriteAnimations[state.name] = frames;
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
    state = this.state,
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
          state: state,
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
  }

  renderText({
    ctx = this.ctx,
    x = this.x,
    y = this.y,
    w = this.w,
    h = this.h,
    text = null,
  }) {
    ctx.globalCompositeOperation = "destination-over";
    ctx.font = "48px serif";
    ctx.fillText(text, x + 10, y + h);
    ctx.save();
  }

  renderBackground({
    ctx = this.ctx,
    x = this.x,
    y = this.y,
    w = this.w,
    h = this.h,
    spritePath = null,
  }) {
    const sprite = new Image();
    ctx.globalCompositeOperation = "destination-over";
    sprite.src = spritePath;
    ctx.drawImage(sprite, x, y);
    ctx.save();
  }

  renderHud() {}

  renderPlayer({
    ctx = this.ctx,
    x = this.xpos,
    y = this.ypos,
    w = this.width,
    h = this.height,
    frameCounter = 0,
    state = this.state,
  } = {}) {
    const framesPerSecond = 5;
    const frameDuration = 60 / framesPerSecond;
    const position =
      Math.floor(frameCounter / frameDuration) %
      this.spriteAnimations[state].loc.length;
    const sx = this.spriteWidth * position;
    //console.log(state);
    const sy = this.spriteAnimations[state].loc[position].y;
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
    this.frameCount = frameCounter; // or this.frameCount++ if independent
  }
}
