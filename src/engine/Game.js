export default class Game {
  constructor(canvas, x, y, w, h) {
    this.domCanvas = canvas;
    this.checkCompatible(this.domCanvas);
    this.ctx = this.domCanvas.getContext("2d");
    this.xpos = x;
    this.ypos = y;
    this.width = w;
    this.height = h;
    this.isRunning = false;
    this.firstSentence = "1";
    this.secondSentence = "2";
    this.thirdSentence = "3";
    this.frameCount = 0;
    this.currentFrame = 0;

    if (!this.frameCount) this.frameCount = 0;
    if (!this.currentSentence) this.currentSentence = 0;
    if (!this.sentences)
      this.sentences = [
        this.firstSentence,
        this.secondSentence,
        this.thirdSentence,
      ];
  }

  init() {
    window.requestAnimationFrame(this.draw.bind(this));
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
  changeCanvasSize({
    canvas = this.domCanvas,
    height = 250,
    width = 400,
  } = {}) {
    canvas.setAttribute("width", width);
    canvas.setAttribute("height", height);
  }
  // ! quick prototype to check functionality
  //TODO: method handles both frame timing and rendering pass this to another class/object
  //TODO: Avoid Binding in Every Frame
  draw({
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
    this.frameCount++;
    if (this.frameCount >= 120) {
      this.frameCount = 0;
      this.currentSentence = (this.currentSentence + 1) % this.sentences.length;
    }
    ctx.save();
    window.requestAnimationFrame(this.draw.bind(this));
  }
  //TODO: Implement Function
  clearCanvas() {}

  //TODO: Implement Function
  gameStart() {}

  //TODO: Implement Function
  gameEnd() {}

  //TODO: Implement Function
  gameRunning() {
    while (this.isRunning) {
      //loop
    }
  }
}
