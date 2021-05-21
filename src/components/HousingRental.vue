<template>
  <div>
    <navigation-bar>
      <el-menu-item index="/housingRental/home">首页</el-menu-item>
      <el-menu-item index="/houseRentalMain/findHouse">找房子</el-menu-item>
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
      <div
        v-else
        style="float: right; margin-right: 200px"
        class="personal-info"
      >
        <img
          :src="img"
          alt=""
          class="head_img_1"
          v-popover:popover
        />
        <el-popover
          ref="popover"
          placement="bottom"
          width="160"
          v-model="visible"
          trigger="hover"
          @show="getUserInfo()"
        >
          <div class="info-name">{{ userName }}</div>
          <div style="margin-top: 20px">
            <i class="iconfont icon-money"></i
            ><span style="font-size: 15px; margin-left: 5px; cursor: pointer">{{
              user.userWallet
            }}</span>
          </div>
          <div class="part-line-1" style="margin-top: 10px"></div>
          <div
            class="personal-center"
            @click="personalCenter(userId)"
          >
            <i class="iconfont icon-people" style="margin-left: 10px"></i
            ><span style="margin-left: 10px">个人中心</span>
          </div>
          <div
            class="inventory-center"
            @click="inventoryInfo(userId)"
          >
            <i class="iconfont icon-inventory" style="margin-left: 10px"></i
            ><span style="margin-left: 10px">订单信息</span>
          </div>
          <div
            class="inventory-center"
            @click="myHouseInfo(userId)"
          >
            <i class="iconfont icon-house" style="margin-left: 10px"></i
            ><span style="margin-left: 10px">我的房源</span>
          </div>
          <div
            class="inventory-center"
            @click="myRentalInfo(userId)"
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
      </div>
    </navigation-bar>
    <keep-alive><router-view></router-view></keep-alive>
  </div>
</template>

<script>
import NavigationBar from "../components/NavigationBar.vue";
import * as types from "../store/mutations-type-string";
import request from "../network/request";
export default {
  data() {
    return {
      isLoginRegisterShow: sessionStorage.getItem("uToken") == null,
      userName: sessionStorage.getItem("name"),
      img: sessionStorage.getItem("img"),
      utoken: sessionStorage.getItem("uToken"),
      visible: false,
      user: {},
      userId:sessionStorage.getItem("id")
    };
  },
  components: {
    NavigationBar,
  },
  methods: {
    findHouseClick() {
      this.$store.commit(types.SETROUTERTYPE, 0);
    },
    getUserInfo() {
      request({
        url: "/user/user-id",
        params: {
          id: sessionStorage.getItem("id"),
        },
      }).then((res) => {
        if (res.data.msg == "NoUser" || res.data.code == "000004") {
          this.$message.error("未登录,请登录!");
          setTimeout(() => {
            this.$router.push("/login");
          }, 1000);
          
        }
        this.user = res.data.data;
      });
    },
    personalCenter(val) {
      this.$router.push({
        path: "/personCenter",
        query: {
          id: val,
        },
      });
      console.log(val);
    },
    inventoryInfo(val) {
      this.$router.push({
        path: "/inventory",
        query: {
          id: val,
        },
      });
    },
    myHouseInfo(val) {
      this.$router.push({
        path: "/myReleaseHouseInfo",
        query: {
          id: val,
        },
      });
    },
    myRentalInfo(val) {
      this.$router.push({
        path: "/myRentalSituation",
        query: {
          id: val,
        },
      });
    },
    exit() {
      request({
        url: "/exit",
        params: {
          tokenKey: sessionStorage.getItem("uToken").split(":")[0],
        },
      }).then((res) => {
        if (res.data.code == 200){
          sessionStorage.removeItem("uToken")
          sessionStorage.removeItem("img")
          sessionStorage.removeItem("name")
          sessionStorage.removeItem("id")
          this.$router.push("/login");
        } 
      });
    },
  },
  created() {
  },
};
</script>

<style>
@import url("../assets/img/icon/iconfont.css");
@import url("../assets/css/common.css");
.personal-info {
  cursor: pointer;
}
.head_img_1 {
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