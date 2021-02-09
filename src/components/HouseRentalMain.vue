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
    </navigation-bar-normal>
    <keep-alive><router-view></router-view></keep-alive>
  </div>
</template>

<script>
import NavigationBarNormal from "../components/NavigationBarNormal";
import * as types from '../store/mutations-type-string'
export default {
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