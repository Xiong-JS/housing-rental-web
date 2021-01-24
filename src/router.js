import Vue from 'vue'
import Router from 'vue-router'

const Home = () => import('./views/home/Home.vue')
const Login = () => import('./views/login.vue')
const Rgister = () => import('./views/Register.vue')
const HousingRental = () => import('./components/HousingRental.vue')
const FindHouse = ()=>import('./views/findhouse/FindHouse.vue')
const ReleaseHouse = ()=>import('./views/releasehouse/ReleaseHouse.vue')
const Other = ()=>import('./views/other/Other.vue')

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [{
    path: '/',
    redirect: '/login'
  }, {
    path: '/housingRental',
    component: HousingRental,
    children: [
      {
        path:'',
        redirect:'home'
      },{
        path: 'home',
        component: Home
      },{
        path: 'findHouse',
        component: FindHouse
      },{
        path: 'releaseHouse',
        component: ReleaseHouse
      },{
        path: 'other',
        component: Other
      }
    ]
  }, {
    path: '/login',
    component: Login
  }, {
    path: '/register',
    component: Rgister
  }]
})