import Vue from "vue";
import iView from "iview";
import store from "@/store";
let vm = new Vue({ store });
export default function(router) {
  router.afterEach(to => {
    // 将访问记录推入栈中
    vm.$store.commit("pushHistory", to);
    iView.LoadingBar.finish();
  });
}
