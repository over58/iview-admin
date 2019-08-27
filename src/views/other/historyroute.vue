<template>
  <div>
    <Card dis-hover title="history模式">
      <a href="/page1">page1</a>
      <a href="/page2">page2</a>
      <a href="/page3">page3</a>
      <div ref="container2" class="container"></div>
      <p>
        history 依赖 H5的popstate事件和history.pushState()
        、history.replaceState()实现
      </p>
      <p>优势： 路径美观</p>
      <p>劣势： 依赖H5, 兼容性差</p>
      <Divider>demo源码</Divider>
      <pre style="background:rgba(0,0,0,.8);color:white">
        class HistoryRouter {
          constructor() {
            this.routes = {};
            this.listenPopState();
            this.listenLink();
          }

          // 监听history api导致的跳转
          listenPopState() {
            window.addEventListener("popstate", e => {
              let state = e.state || {};
              let path = state.path || "";
              this.handler(path);
            });
          }

          // 监听a链接导致的跳转 
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
      </pre>
    </Card>
  </div>
</template>

<script>
import HistoryRouter from "./route/history";
export default {
  methods: {
    handleRoute(e) {
      e.preventDefault();
    }
  },
  mounted() {
    // history mode
    let historyRouter = new HistoryRouter();
    let container2 = this.$refs.container2;

    historyRouter.register("/page1", () => {
      container2.innerHTML = "page1";
    });

    historyRouter.register("/page2", () => {
      container2.innerHTML = "page2";
    });
    historyRouter.register("/page3", () => {
      container2.innerHTML = "page3";
    });

    historyRouter.notFound(() => {
      container2.innerHTML = "路由不存在";
    });

    historyRouter.index(() => {
      container2.innerHTML = "这是首页";
    });

    historyRouter.handler();
  }
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
