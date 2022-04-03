export default {
  addFavorite({ state }, record) {
    return new Promise((resolve, reject) => {
      const duplicate = state.data.favorites.filter((element) => element.id === record.id);
      if (duplicate.length === 0) {
        state.data.favorites.push(record);
        resolve();
      } else {
        reject();
      }
    });
  },
  removeFavorite({ state }, record) {
    return new Promise((resolve) => {
      const res = state.data.favorites.filter((element) => element.id !== record.id);
      state.data.favorites = res;
      resolve();
    });
  },
  addIgnore({ state }, record) {
    return new Promise((resolve, reject) => {
      const duplicate = state.data.ignoreList.filter((element) => element.id === record.id);
      if (duplicate.length === 0) {
        state.data.ignoreList.push(record);
        resolve();
      } else {
        reject();
      }
    });
  },
  removeIgnore({ state }, record) {
    return new Promise((resolve) => {
      const res = state.data.ignoreList.filter((element) => element.id !== record.id);
      state.data.ignoreList = res;
      resolve();
    });
  },
};
