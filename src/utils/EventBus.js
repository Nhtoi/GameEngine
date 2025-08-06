export default class EventBus {
  constructor() {
    this.events = {};
  }

  on(eventName, callBack) {
    if (typeof callBack !== "function") {
      throw new Error("callback is not a function");
    }
    if (!this.events[eventName]) this.events[eventName] = [];
    this.events[eventName].push(callBack);
  }
  off(eventName, callback) {
    if (!this.events[eventName]) return;
    this.events[eventName] = this.events[eventName].filter(
      (cb) => cb !== callback
    );
  }
  emit(eventName, payload) {
    if (!this.events[eventName]) {
      console.warn("event does not exist");
      return;
    }
    this.events[eventName].forEach((callBack) => callBack(payload));
  }
  once(eventName, callback) {
    const wrapper = (payload) => {
      callback(payload);
      this.off(eventName, wrapper);
    };
    this.on(eventName, wrapper);
  }

  clear(eventName) {
    if (eventName) {
      if (this.events[eventName]) {
        delete this.events[eventName];
      }
    } else {
      this.events = {};
    }
  }
}
