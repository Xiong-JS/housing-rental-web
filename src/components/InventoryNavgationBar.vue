<template>
  <div>
    <el-row>
      <el-col :span="12"
        ><div>
          <img src="../assets/logo2018.png" alt="" class="logo-img" /></div
      ></el-col>
      <el-col :span="12">
        <div class="nav-bar">
          <span class="inventory-name">{{ userName }}</span
          >| <span class="inventory-home" @click="homeClick">首页</span>|
          <span class="inventory-mine" @click="myInventory">我的订单</span>
        </div></el-col
      >
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userName: localStorage.getItem("name"),
    };
  },
  methods: {
    homeClick() {
      this.$router.push("/");
    },
    myInventory() {
      this.$router.push("/inventory");
    },
  },
};
</script>

<style>
.logo-img {
  width: 120px;
  height: 70px;
  vertical-align: middle;
}
.nav-bar {
  float: right;
  font-size: 13px;
  color: #666666;
}
.inventory-home {
  margin: 0 10px 0 10px;
  cursor: pointer;
}
.inventory-home:hover,
.inventory-name:hover,
.inventory-mine:hover {
  color: #ed2553;
}
.inventory-name {
  margin-right: 10px;
  cursor: pointer;
}
.inventory-mine {
  margin: 0 10px 0 10px;
  cursor: pointer;
}
</style>