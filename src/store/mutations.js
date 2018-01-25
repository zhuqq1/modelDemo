import * as types from './mutation-types'

export default {
    [types.GET_PROJECT_ID](state, id) {
        state.projectId = id
    },
    // [types.MODELDATA](state, obj) {
    //     state.modelData = obj
    // },
    // [types.USER_INFO](state, obj) {
    //     state.userInfo = obj
    // }
};