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
      <el-menu-item index="/houseRentalMain/other">其他</el-menu-item>
      <div
        v-if="isLoginRegisterShow"
        style="margin-left: 1300px; margin-top: 10px"
      >
        <el-menu-item slot="login" index="/login">登录</el-menu-item>
        <el-menu-item slot="register" index="/register">注册</el-menu-item>
      </div>
      <div v-else style="margin-left: 1300px; margin-top: 20px">
        {{ $store.state.user[0].userName }}
      </div>
    </navigation-bar-normal>
    <keep-alive><router-view></router-view></keep-alive>
  </div>
</template>

<script>
import NavigationBarNormal from "../components/NavigationBarNormal";
import * as types from '../store/mutations-type-string'
export default {
  data(){
    return{
      isLoginRegisterShow: this.$store.state.user.length == 0,
    }
  },
  components: {
    NavigationBarNormal,
  },
  methods: {
    findHouseClick() {
      this.$store.commit(types.SETROUTERTYPE,0)
    },
  },
};
</script>

<style>
</style>