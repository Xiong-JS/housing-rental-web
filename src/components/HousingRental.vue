<template>
  <div class="main">
    <navigation-bar>
      <el-menu-item index="/housingRental/home">首页</el-menu-item>
      <el-menu-item index="/housingRental/findHouse">找房子</el-menu-item>
      <el-menu-item index="/housingRental/releaseHouse">发布房源</el-menu-item>
      <el-menu-item index="/housingRental/other">其他</el-menu-item>
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
    </navigation-bar>
    <keep-alive><router-view></router-view></keep-alive>
  </div>
</template>

<script>
import NavigationBar from "../components/NavigationBar.vue";
export default {
  data() {
    return {
      isLoginRegisterShow: this.$store.state.user.length == 0
    };
  },
  components: {
    NavigationBar,
  }
};
</script>

<style>
.main {
  background-color: white;
  height: 100%;
  /* height: 900px; */
}
.login_register {
  position: relative;
  margin-right: 20px;
  display: inline;
}
</style>