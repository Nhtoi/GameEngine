export default class Game {
  constructor(canvas, x, y, w, h) {
    this.domCanvas = canvas;
    this.checkCompatible(this.domCanvas);
    this.ctx = this.domCanvas.getContext("2d");
    this.xpos = x;
    this.ypos = y;
    this.width = w;
    this.height = h;
    this.isRunning = true;
    this.firstSentence = "1";
    this.secondSentence = "2";
    this.thirdSentence = "3";
    this.frameCount = 0;
    this.currentFrame = 0;
    this.currentTime = 0;
    this.lastTime = 0;
    this.deltaTime = 0;
    this.frameThreshold = 400; //TODO: frameThreshold from constructor
    if (!this.frameCount) this.frameCount = 0;
    if (!this.currentSentence) this.currentSentence = 0;
    if (!this.sentences)
      this.sentences = [
        this.firstSentence,
        this.secondSentence,
        this.thirdSentence,
      ];
    this.gameLoop();
  }

  gameLoop() {
    this.currentTime = this.getTime();
    this.deltaTime = this.getDelta(this.currentTime, this.lastTime);
    this.lastTime = this.currentTime;
    this.update(this.deltaTime);
    this.render();
    window.requestAnimationFrame(this.gameLoop.bind(this));
  }

  getTime() {
    const date = Date.now();
    return date;
  }

  checkCompatible({ domCanvas = this.domCanvas } = {}) {
    if (domCanvas.getContext) {
      console.log("Compatible Canvas Found");
    } else {
      console.error(
        domCanvas.outerHTML,
        "Not Compatible with Canvas Operations \nPlease use tag <canvas>"
      );
      window.alert("DID NOT FIND CANVAS ");
    }
  }

  getDelta(currentTime, lastTime) {
    return currentTime - lastTime;
  }
  //TODO: Implement Function
  clearCanvas() {}

  //TODO: Implement Function
  gameEnd() {}

  changeCanvasSize({
    canvas = this.domCanvas,
    height = 250,
    width = 400,
  } = {}) {
    canvas.setAttribute("width", width);
    canvas.setAttribute("height", height);
  }

  //TODO: MAKE INTO A MODULARIZED CLASS/OBJECT -> Entities.js
  render({
    ctx = this.ctx,
    x = this.xpos,
    y = this.ypos,
    w = this.width,
    h = this.height,
  } = {}) {
    ctx.globalCompositeOperation = "destination-over";
    ctx.clearRect(0, 0, this.domCanvas.width, this.domCanvas.height);
    ctx.font = "48px serif";
    ctx.fillText(this.sentences[this.currentSentence], x, y + h);
    ctx.save();
  }
  //TODO: MAKE INTO A MODULARIZED CLASS/OBJECT -> Entities.js
  update(delta) {
    this.frameCount += delta;
    if (this.frameCount >= this.frameThreshold) {
      this.frameCount = 0;
      this.currentSentence = (this.currentSentence + 1) % this.sentences.length;
    }
  }
}
