import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./plugins/index.js";
import './directives'
import "iview/dist/styles/iview.css";

import "styles/index.less";
import "@/assets/icons/iconfont.css";
Vue.config.productionTip = false;
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
