import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import iview from "iview";
import "../node_modules/iview/dist/styles/iview.css";
import "styles/common.css";
import "@/assets/icons/iconfont.css";
Vue.use(iview);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
