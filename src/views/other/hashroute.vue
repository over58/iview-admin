<template>
  <div>
    <Card dis-hover title="hash路由">
      <a href="#/page1">page1</a>
      <a href="#/page2">page2</a>
      <a href="#/page3">page3</a>
      <div ref="container" class="container"></div>
      <p>
        hash路由模式通过监听hashchange事件，处理不同hash对应的处理函数实现路由。
      </p>
      <p>
        优势： 各种浏览器之间的兼容性较好
      </p>
      <p>
        劣势： 路径中带有#,比较丑陋
      </p>
      <Divider>demo源码</Divider>
      <pre style="background:rgba(0,0,0,.8);color:white">
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

      </pre>
    </Card>
  </div>
</template>

<script>
import HashRouter from "./route/hash";
export default {
  methods: {},
  mounted() {
    let router = new HashRouter();
    let container = this.$refs.container;
    router.index(() => {
      container.innerHTML = "首页";
    });
    router.register("/page1", () => {
      container.innerHTML = "page1";
    });
    router.register("/page2", () => {
      container.innerHTML = "page2";
    });
    router.register("/page3", () => {
      container.innerHTML = "page3";
    });
    router.reload();
  },
  beforeDestroy() {}
};
</script>

<style lang="less" scoped>
a {
  padding: 0 8px;
  margin: 0 2px;
  background: lightblue;
}
.container {
  height: 50px;
  border: solid 1px #dfdfdf;
}
</style>
