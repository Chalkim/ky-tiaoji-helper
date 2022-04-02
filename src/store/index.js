import Vuex from 'vuex';
import state from './state';
import mutations from './mutations';
import saveToLocalStorage from './plugin/localStorage';

const plugins = [saveToLocalStorage];

const options = {
  state,
  mutations,
  actions: {},
  plugins,
};

const store = new Vuex.Store(options);

export default store;
