import * as types from './mutations-type-string'

export default{
  [types.SETUSER](state,payload){
    state.user = payload
  },
  [types.SETTOKEN](state,payload){
    state.token = payload
  },
  [types.SETHOUSEINFOS](state,payload){
    state.houseInfos = payload
  },
  [types.SETROUTERTYPE](state,payload){
    state.routerType = payload
  },
  [types.SETTOTAL](state,payload){
    state.total = payload
  },
  [types.SETCURRENTPAGE](state,payload){
    state.currentPage = payload
  }

}