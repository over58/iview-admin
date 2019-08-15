import store from "store";
export default {
  setToken(val) {
    store.set("token", val);
  },
  rmToken() {
    store.remove("token");
  },
  getToken() {
    return store.get("token");
  }
};
