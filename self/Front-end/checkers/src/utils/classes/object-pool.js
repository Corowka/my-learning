export class ObjectPool {
  constructor(createPrefab) {
    this.pool = [];
    this.createPrefab = createPrefab;
  }

  get() {
    if (this.pool.length) {
      const object = this.pool.shift();
      console.log("return old marker");
      return object;
    }
    const object = this.createPrefab();
    console.log("return new marker");
    return object;
  }

  put(object) {
    this.pool.push(object);
  }
}
