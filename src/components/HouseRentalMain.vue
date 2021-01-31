<template>
  <div>
    <navigation-bar-normal>
       <el-menu-item index="/housingRental/home">首页</el-menu-item>
      <el-menu-item index="/houseRentalMain/findHouse">找房子</el-menu-item>
      <el-menu-item index="/houseRentalMain/releaseHouse">发布房源</el-menu-item>
      <el-menu-item index="/houseRentalMain/other">其他</el-menu-item>
    </navigation-bar-normal>
    <keep-alive><router-view></router-view></keep-alive>
  </div>
</template>

<script>
import NavigationBarNormal from '../components/NavigationBarNormal'
export default {
  components:{
    NavigationBarNormal
  },
  
}
</script>

<style>

</style>