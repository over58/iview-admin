import Vue from "vue";
import Vuex from "vuex";
import { mutations, state, actions, getters } from "./common";

// 引入各个模块的store

Vue.use(Vuex);

export default new Vuex.Store({
  modules: [],
  state: state,
  getters: getters,
  mutations: mutations,
  actions: actions
});
