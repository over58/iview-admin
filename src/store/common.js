export const state = {
  historyStackLimit: 30,
  historyStack: [],
  isCollapsed: false
};

export const getters = {};

export const actions = {};

export const mutations = {
  pushHistory(state, newHis) {
    if (state.historyStack.length >= state.historyStackLimit) {
      state.historyStack.shift();
      state.historyStack.push(newHis);
    } else {
      state.historyStack.push(newHis);
    }
  },
  popHistory(state) {
    state.historyStack.pop();
  },
  setCollapsed(state, val) {
    state.isCollapsed = val;
  }
};
