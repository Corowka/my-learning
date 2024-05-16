class ClockClass {
  constructor() {
    this.date = new Date();
    this.timer = setInterval(() => {
      this.date = new Date();
    }, 1000);
  }

  getDate() {
    return this.date;
  }
}

export const GlobalClock = new ClockClass();
