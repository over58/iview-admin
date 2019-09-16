export default class Monitor {
  constructor(timeout = 1000) {
    this.performance = window.performance;
    this.timeout = timeout;
  }

  getLoadComsume() {
    const [{ domComplete }] = this.performance.getEntriesByType("navigation");
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
    return performance.getEntriesByType("resource").filter(item => {
      let { startTime, responseEnd } = item;
      return responseEnd - startTime >= this.timeout;
    });
  }
}
