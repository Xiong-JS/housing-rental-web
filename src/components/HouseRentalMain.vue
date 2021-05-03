<template>
  <div>
    <navigation-bar-normal>
      <el-menu-item index="/housingRental/home">首页</el-menu-item>
      <el-menu-item index="/houseRentalMain/findHouse" @click="findHouseClick"
        >找房子</el-menu-item
      >
      <el-menu-item index="/houseRentalMain/releaseHouse"
        >发布房源</el-menu-item
      >
      <el-menu-item index="/houseRentalMain/collection">收藏</el-menu-item>
      <div
        v-if="isLoginRegisterShow"
        style="float: right; margin-top: 10px; margin-right: 50px"
      >
        <el-menu-item slot="login" index="/login">登录</el-menu-item>
        <el-menu-item slot="register" index="/register">注册</el-menu-item>
      </div>
      <div v-else style="float: right; margin-right: 200px">
        <div class="personal-info">
          <img
            :src="this.$store.state.user[0].userImg"
            alt=""
            class="head-img"
            v-popover:popover
          />
          <el-popover
            ref="popover"
            placement="bottom"
            width="160"
            v-model="visible"
            trigger="hover"
            @show="getUserInfo($store.state.user[0].id)"
          >
            <div class="info-name">{{ $store.state.user[0].userName }}</div>
            <div style="margin-top: 20px">
              <i class="iconfont icon-money"></i
              ><span
                style="font-size: 15px; margin-left: 5px; cursor: pointer"
                >{{ user.userWallet }}</span
              >
            </div>
            <div class="part-line-1" style="margin-top: 10px"></div>
            <div
              class="personal-center"
              @click="personalCenter1($store.state.user[0].id)"
            >
              <i class="iconfont icon-people" style="margin-left: 10px"></i
              ><span style="margin-left: 10px">个人中心</span>
            </div>
            <div
              class="inventory-center"
              @click="inventoryInfo1($store.state.user[0].id)"
            >
              <i class="iconfont icon-inventory" style="margin-left: 10px"></i
              ><span style="margin-left: 10px">订单信息</span>
            </div>
            <div
              class="inventory-center"
              @click="myHouseInfo1($store.state.user[0].id)"
            >
              <i class="iconfont icon-house" style="margin-left: 10px"></i
              ><span style="margin-left: 10px">我的房源</span>
            </div>
            <div
              class="inventory-center"
              @click="myRentalInfo1($store.state.user[0].id)"
            >
              <i class="iconfont icon-rental" style="margin-left: 10px"></i
              ><span style="margin-left: 10px">租赁信息</span>
            </div>
            <div class="part-line-1"></div>
            <div class="exit" @click="exit">
              <i class="iconfont icon-exit" style="margin-left: 10px"></i
              ><span style="margin-left: 10px">退出</span>
            </div>
          </el-popover>
          <!-- {{ userName }} -->
          <!-- <span style="margin-left:10px;color:">{{ this.$store.state.user[0].userName }}</span>  -->
        </div>
      </div>
    </navigation-bar-normal>
    <router-view></router-view>
  </div>
</template>

<script>
import request from "../network/request";
import NavigationBarNormal from "../components/NavigationBarNormal";
import * as types from "../store/mutations-type-string";
export default {
  data() {
    return {
      isLoginRegisterShow: this.$store.state.user.length == 0, //localStorage.getItem("uToken") == null,
      userName: localStorage.getItem("name"),
      img: localStorage.getItem("img"),
      visible: false,
      user: {},
    };
  },
  components: {
    NavigationBarNormal,
  },
  methods: {
    findHouseClick() {
      this.$store.commit(types.SETROUTERTYPE, 0);
    },
    getUserInfo(val) {
      request({
        url: "/user/user-id",
        params: {
          id: localStorage.getItem("id"),
        },
      }).then((res) => {
        this.user = res.data.data;
        console.log(res.data.data);
      });
    },
    personalCenter1(val) {
      this.$router.push({
        path: "/personCenter",
        query: {
          id: val,
        },
      });
      console.log(val);
    },
    inventoryInfo1(val) {
      this.$router.push({
        path: "/inventory",
        query: {
          id: val,
        },
      });
    },
    myHouseInfo1(val) {
      this.$router.push({
        path: "/myReleaseHouseInfo",
        query: {
          id: val,
        },
      });
    },
    myRentalInfo1(val) {
      this.$router.push({
        path: "/myRentalSituation",
        query: {
          id: val,
        },
      });
    },
    exit(){
      this.$router.push('/login')
    }
  },
  created() {
    // localStorage.removeItem("uToken")
    // let uToken = null;
    // let cookies = document.cookie;
    // let cookieArr = cookies.split(";");
    // uToken = cookieArr[0].split("=")[1];
    // if(uToken != '' && uToken != null){
    //   this.isLoginRegisterShow = false;
    // }else{
    //   this.isLoginRegisterShow = true;
    // }
  },
};
</script>

<style>
@import url("../assets/img/icon/iconfont.css");
@import url("../assets/css/common.css");
.personal-info {
  cursor: pointer;
}
.head-img {
  height: 50px;
  width: 50px;
  border-radius: 50%;
  -webkit-border-radius: 50%;
  -moz-border-radius: 50%;
  margin-top: 15px;
}
.info-name {
  text-align: center;
  font-weight: bold;
  border-left: 2px solid #ed2553;
}
.personal-center {
  padding: 5px 0 5px 0;
}
.personal-center:hover {
  background-color: #f2f2f2;
  cursor: pointer;
}
.inventory-center {
  padding: 5px 0 5px 0;
}
.inventory-center:hover {
  background-color: #f2f2f2;
  cursor: pointer;
}
.exit {
  padding: 5px 0 5px 0;
}
.exit:hover {
  background-color: #f2f2f2;
  cursor: pointer;
}
</style>