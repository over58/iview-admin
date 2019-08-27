export default class HistoryRouter {
  constructor() {
    this.routes = {};
    this.listenPopState();
    this.listenLink();
  }

  listenPopState() {
    window.addEventListener("popstate", e => {
      let state = e.state || {};
      let path = state.path || "";
      this.handler(path);
    });
  }

  listenLink() {
    window.addEventListener("click", e => {
      let ev = e.target;
      if (ev.tagName === "A" && ev.getAttribute("href")) {
        // 阻止默认事件
        e.preventDefault();
        this.refreshURL(ev.getAttribute("href"));
      }
    });
  }

  index(cb) {
    this.routes["/"] = cb;
  }

  notFound(cb) {
    this.routes["notFound"] = cb;
  }

  error(cb) {
    this.routes["error"] = cb;
  }

  refreshURL(path) {
    history.pushState({ path }, null, path);
    this.handler(path);
  }

  register(path, cb) {
    this.routes[path] = cb;
  }
  // 通用处理函数
  handler(path) {
    let cb;
    if (this.routes[path]) {
      cb = this.routes[path];
    } else {
      cb = this.routes["notFound"];
    }
    cb.call(this);
  }
}
