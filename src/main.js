import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import VueAMap from 'vue-amap'


Vue.use(ElementUI)
// Vue.use(VueAMap)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

// VueAMap.initAMapApiLoader({
//   key: '8b80557c07b0b9ea2b2cb73b19bc5021',
//   plugin: ['AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PlaceSearch', 'AMap.Geolocation', 'AMap.Geocoder'],
//   v: '1.4.4',
//   uiVersion: '1.0'
// })
