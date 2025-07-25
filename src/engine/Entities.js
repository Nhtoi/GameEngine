export default class Entity {
  constructor(x, y, w, h, sprite) {
    this.sprite = sprite;
    this.ctx;
    this.xpos = x;
    this.ypos = y;
    this.width = w;
    this.height = h;
    this.frameCount = 0;
    this.currentFrame = 0;
    this.frameThreshold = 400;

    //!TEST PARAMETERS
    this.firstSentence = "1";
    this.secondSentence = "2";
    this.thirdSentence = "3";
    if (!this.frameCount) this.frameCount = 0;
    if (!this.currentSentence) this.currentSentence = 0;
    this.sentences = [
      this.firstSentence,
      this.secondSentence,
      this.thirdSentence,
    ];
  }
  //TODO: ALLOW TO CHOSE WHAT KIND OF RENDERING, TEXT, SPITE, BACKGROUND, PLATFORMS ETC...
  render({
    ctx = this.ctx,
    x = this.xpos,
    y = this.ypos,
    w = this.width,
    h = this.height,
  } = {}) {
    ctx.globalCompositeOperation = "destination-over";
    ctx.font = "48px serif";
    ctx.fillText(this.sentences[this.currentSentence], x, y + h);
    ctx.save();
  }
  //TODO: ALLOW FOR MORE CONTROL OVER THE UPDATE, HEALTH, POSITION (FOR NOW)
  update(delta) {
    this.frameCount += delta;
    if (this.frameCount >= this.frameThreshold) {
      this.frameCount = 0;
      this.currentSentence = (this.currentSentence + 1) % this.sentences.length;
    }
  }
}
