export default class InputManager {
  constructor(eventBus) {
    this.enabled = true;
    this.eventBus = eventBus;
    this.pressedKeys = new Set();
    this._onKeyDown = this._onKeyDown.bind(this);
    this._onKeyUp = this._onKeyUp.bind(this);
    this.addListeners();
  }
  addListeners() {
    window.addEventListener("keydown", this._onKeyDown);
    window.addEventListener("keyup", this._onKeyUp);
  }

  removeListeners() {
    window.removeEventListener("keydown", this._onKeyDown);
    window.removeEventListener("keyup", this._onKeyUp);
  }

  _onKeyDown(event) {
    if (!this.enabled) return;
    const key = event.key;
    if (!this.pressedKeys.has(key)) {
      this.pressedKeys.add(key);
      this.eventBus.emit("keydown", key);
    }
  }

  _onKeyUp(event) {
    if (!this.enabled) return;
    const key = event.key;
    this.pressedKeys.delete(key);
    this.eventBus.emit("keyup", key);
  }

  disable() {
    this.enabled = false;
  }

  enable() {
    this.enabled = true;
  }

  destroy() {
    this.removeListeners();
    this.pressedKeys.clear();
  }
}
