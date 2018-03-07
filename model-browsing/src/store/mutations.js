import * as types from './mutation-types'

export default {
  [types.SHOW_LOADING] (state) {
    state.isLoading = true
  },
  [types.HIDE_LOADING] (state) {
    state.isLoading = false
  },
  [types.CHANGE_COMPANY_ID] (state,id) {
    state.companyId = id
  },
  [types.INIT_PROJECT_ID] (state,id) {
    state.projectId = id
  }
};
