import iView from "iview";
import localStore from "api/localStore";
export default function(router) {
  router.beforeEach((to, from, next) => {
    iView.LoadingBar.start();
    if (to.query.token) {
      localStore.setToken(to.query.token);
      delete to.query.token;
      next({
        name: to.name,
        query: to.query,
        params: to.params
      });
      return;
    }
    let token = localStore.getToken();
    if (token) {
      console.log(to);
      next();
    } else {
      if (["login", "logout", "404"].includes(to.name)) {
        next();
      } else {
        next({
          name: "login"
        });
      }
    }
  });
}
