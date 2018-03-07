import * as types from './mutation-types'

export default {
  showLoading({ commit }) {
    commit(types.SHOW_LOADING)
  },
  hideLoading({ commit }) {
    commit(types.HIDE_LOADING)
  },
  initProjectId({ commit },id) {
    commit(types.INIT_PROJECT_ID,id)
  }
};
