import Vue from 'vue'
import Router from 'vue-router'
const Home = () => import('./views/home/Home.vue')
const Login = () => import('./views/login.vue')
const Rgister = () => import('./views/Register.vue')
const HousingRental = () => import('./components/HousingRental.vue')
const FindHouse = () => import('./views/findhouse/FindHouse.vue')
const ReleaseHouse = () => import('./views/releasehouse/ReleaseHouse.vue')
const Collection = () => import('./views/collection/Collection.vue')
const HouseRentalMain = () => import('./components/HouseRentalMain.vue')
const FindHouseByZone = () => import('./views/findhouse/FindHouseByZone.vue')
const DetailHouse = () => import('./views/findhouse/DetailHouse.vue')
const PersonCenter = () => import('./views/personal/EditPersonalInfo.vue')
const Inventory = () => import('./views/inventory/Inventory.vue')
const InventoryUnDone = () => import('./views/inventory/InventoryUndone.vue')
const InventoryDone = () => import('./views/inventory/InventoryDone.vue')
const InventoryPay = () => import('./views/inventory/InventoryPay.vue')
const MyReleaseHouseInfo = () => import('./views/personal/MyReleaseHouseInfo.vue')
const MyRentalSituation = () => import('./views/personal/MyRentalSituation.vue')

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
      path: '/personCenter',
      component: PersonCenter
    }, {
      path: '/inventory',
      component: Inventory
    },
    {
      path: '/inventoryPay',
      component: InventoryPay
    },
    {
      path: '/inventoryUnDone',
      component: InventoryUnDone
    }, {
      path: '/inventoryDone',
      component: InventoryDone
    },
    {
      path:'/myReleaseHouseInfo',
      component:MyReleaseHouseInfo
    },
    {
      path:'/myRentalSituation',
      component:MyRentalSituation
    },
    {
      path: '/houseRentalMain',
      component: HouseRentalMain,
      children: [{
        path: 'findHouse',
        component: FindHouse,
        children: [{
            path: '/',
            redirect: 'findHouseByZone'
          },
          {
            path: 'findHouseByZone',
            component: FindHouseByZone,
            meta: {
              keepAlive: true,
              rootPath: '/houseRentalMain/findHouse'
            }
          }
        ]
      }, {
        path: 'releaseHouse',
        component: ReleaseHouse,
        meta: {
          keepAlive: true,
          rootPath: '/houseRentalMain/releaseHouse'
        }
      }, {
        path: 'collection',
        component: Collection,
        meta: {
          keepAlive: true,
          rootPath: '/houseRentalMain/collection'
        }
      }, {
        path: 'detailHouse',
        component: DetailHouse,
        meta: {
          keepAlive: true,
          rootPath: '/houseRentalMain/detailHouse'
        }
      }]
    }
  ]
})