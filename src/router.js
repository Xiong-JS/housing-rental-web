import Vue from 'vue'
import Router from 'vue-router'

const Home = () => import('./views/home/Home.vue')
const Login = () => import('./views/login.vue')
const Rgister = () => import('./views/Register.vue')
const HousingRental = () => import('./components/HousingRental.vue')
const FindHouse = () => import('./views/findhouse/FindHouse.vue')
const ReleaseHouse = () => import('./views/releasehouse/ReleaseHouse.vue')
const Other = () => import('./views/other/Other.vue')
const HouseRentalMain = () => import('./components/HouseRentalMain.vue')
const FindHouseByZone = ()=>import('./views/findhouse/FindHouseByZone.vue')
const DetailHouse = ()=>import('./views/findhouse/DetailHouse.vue')

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [{
      path: '/',
      redirect: '/housingRental/home'
    }, {
      path: '/housingRental',
      component: HousingRental,
      children: [{
        path: '',
        redirect: 'home'
      }, {
        path: 'home',
        component: Home
      }]
    }, {
      path: '/login',
      component: Login
    }, {
      path: '/register',
      component: Rgister
    },
    {
      path: '/houseRentalMain',
      component: HouseRentalMain,
      children: [{
        path: 'findHouse',
        component: FindHouse,
        children:[
          {
            path:'/',
            redirect:'findHouseByZone'
          },
          {
            path:'findHouseByZone',
            component:FindHouseByZone,
            meta: {keepAlive: true, rootPath: '/houseRentalMain/findHouse'}
          }
        ]
      }, {
        path: 'releaseHouse',
        component: ReleaseHouse,
        meta: {keepAlive: true, rootPath: '/houseRentalMain/releaseHouse'}
      }, {
        path: 'other',
        component: Other,
        meta: {keepAlive: true, rootPath: '/houseRentalMain/other'}
      },{
        path:'detailHouse',
        component:DetailHouse,
      }]
    }
  ]
})