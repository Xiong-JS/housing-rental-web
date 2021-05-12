import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import mutations from './mutations'
import getters from './getters'

Vue.use(Vuex)

const state = {
  user:[],
  token:'',
  houseInfos:[],
  routerType:0,//0-表示使用导航栏的index进行路游跳转，1-表示使用代码手动跳转
  total:0,
  currentPage:0
}

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
  modules:{
    
  }

})
