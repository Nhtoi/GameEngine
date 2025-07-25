export default class Entity {
  constructor(x, y, w, h, type, spritePath, text) {
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
  //TODO: ALLOW TO CHOSE WHAT KIND OF RENDERING, TEXT, SPITE, BACKGROUND, PLATFORMS ETC...
  render({
    ctx = this.ctx,
    x = this.xpos,
    y = this.ypos,
    w = this.width,
    h = this.height,
    type = this.type,
    spritePath = this.spritePath,
    text = this.text,
  } = {}) {
    switch (type) {
      case "player":
        // this.renderPlayer({
        //   ctx: ctx,
        //   x: x,
        //   y: y,
        //   w: w,
        //   h: h,
        //   spritePath: spritePath,
        // });
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

  renderPlayer() {}

  //TODO: ALLOW FOR MORE CONTROL OVER THE UPDATE, HEALTH, POSITION (FOR NOW)
  update(delta) {
    this.frameCount += delta;
  }
}
