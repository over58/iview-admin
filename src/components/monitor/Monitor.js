class Monitor {
  constructor(timeout = 1000) {
    this.performance = window.performance;
    this.timeout = timeout;
  }

  getLoadComsume() {
    const [{ domComplete }] = performance.getEntriesByType("navigation");
    return domComplete;
  }

  geturlConsume() {
    const resource = this.performance.getEntriesByType("resource");
    let result = resource.reduce((res, cur) => {
      let { startTime, responseEnd } = cur;
      res[cur.name] = responseEnd - startTime;
      return res;
    }, {});
    return result;
  }

  getTimeoutURL() {
    console.log(this.performance.getEntriesByType("resource"));
    return performance.getEntriesByType("resource").filter(item => {
      let { startTime, responseEnd } = item;
      console.log(responseEnd - startTime > this.timeout);
      return responseEnd - startTime >= this.timeout;
    });
  }
}

var monitor = new Monitor();
console.log(monitor.getLoadComsume());
console.log(monitor.geturlConsume());
console.log(monitor.getTimeoutURL());
