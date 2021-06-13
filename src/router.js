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
        component: Home,
        meta: {
          hidden: true,
          title: "首页"
        },
      }]
    }, {
      path: '/login',
      component: Login,
      meta: {
        hidden: true,
        title: "登录"
      },
    }, {
      path: '/register',
      component: Rgister,
      meta: {
        hidden: true,
        title: "注册"
      },
    },
    {
      path: '/personCenter',
      component: PersonCenter,
      meta: {
        hidden: true,
        title: "个人中心"
      },
    }, {
      path: '/inventory',
      component: Inventory,
      meta: {
        hidden: true,
        title: "我的订单"
      },
    },
    {
      path: '/inventoryPay',
      component: InventoryPay,
      meta: {
        hidden: true,
        title: "支付订单"
      },
    },
    {
      path: '/inventoryUnDone',
      component: InventoryUnDone,
      meta: {
        hidden: true,
        title: "订单"
      },
    }, {
      path: '/inventoryDone',
      component: InventoryDone,
      meta: {
        hidden: true,
        title: "订单"
      },
    },
    {
      path: '/myReleaseHouseInfo',
      component: MyReleaseHouseInfo,
      meta: {
        hidden: true,
        title: "我的房源"
      },
    },
    {
      path: '/myRentalSituation',
      component: MyRentalSituation,
      meta: {
        hidden: true,
        title: "我的租赁"
      },
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
              rootPath: '/houseRentalMain/findHouse',
              hidden: true,
              title: "寻找房源"
            }
          }
        ]
      }, {
        path: 'releaseHouse',
        component: ReleaseHouse,
        meta: {
          keepAlive: true,
          rootPath: '/houseRentalMain/releaseHouse',
          hidden: true,
          title: "发布房源"
        }
      }, {
        path: 'collection',
        component: Collection,
        meta: {
          keepAlive: true,
          rootPath: '/houseRentalMain/collection',
          hidden: true,
          title: "房源收藏"
        }
      }, {
        path: 'detailHouse',
        component: DetailHouse,
        meta: {
          keepAlive: true,
          rootPath: '/houseRentalMain/detailHouse',
          hidden: true,
          title: "房源详情"
        }
      }]
    }
  ]
})