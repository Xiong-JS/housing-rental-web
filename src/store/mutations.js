import * as types from './mutations-type-string'

export default{
  [types.SETUSER](state,payload){
    state.user = payload
  },
  [types.SETTOKEN](state,payload){
    state.token = payload
  }

}