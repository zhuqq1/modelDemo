import * as types from './mutation-types'

export default {
    GET_PROJECT_ID({ commit }, id) {
        commit(types.GET_PROJECT_ID, id)
    }
};