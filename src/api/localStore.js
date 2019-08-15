import localStore from "store";
export default {
  setToken(val) {
    localStore.set("token", val);
  },
  rmToken() {
    localStore.remove("token");
  }
};
