/**
 * store metrics
 *
 * @class
 * */
class metricsStore {
  state: Map<any | string, any>;

  constructor() {
    this.state = new Map<any | string, any>();
  }

  set(key: any | string, value: any) {
    this.state.set(key, value);
  }

  get(key: any | string): any {
    return this.state.get(key);
  }

  has(key: any | string): boolean {
    return this.state.has(key);
  }

  clear() {
    this.state.clear();
  }

  getValues(): any {
    return Array.from(this.state).reduce((obj, [key, value]) => {
      obj[key] = value;
      return obj;
    }, {});
  }
}

export default metricsStore;
