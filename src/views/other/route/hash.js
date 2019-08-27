class Router {
  constructor() {
    this.routes = {};
    window.addEventListener("hashchange", this.reload.bind(this));
  }
}
Router.prototype.index = function(callback) {
  this.routes["index"] = callback;
};
Router.prototype.register = function(hash, callback) {
  this.routes[hash] = callback;
};
Router.prototype.reload = function() {
  let callback;
  let hash = location.hash.slice(1);
  hash ? (callback = this.routes[hash]) : (callback = this.routes["index"]);
  callback.call(this);
};
Router.prototype.remove = function() {
  window.removeEventListener("hashchange", this.reload);
};

export default Router;
