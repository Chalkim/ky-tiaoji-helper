import { createStore } from 'vuex';

export default createStore({
  state: {
    list: null,
    favorities: null,
  },
  getters: {
    getList(state) {
      return state.list;
    },
    getFavorities(state) {
      return state.favorities;
    },
  },
  mutations: {
    setList(state, list) {
      state.list = list;
    },
    setFavorities(state, favorities) {
      state.favorities = favorities;
    },
  },
  actions: {
  },
  modules: {
  },
});
