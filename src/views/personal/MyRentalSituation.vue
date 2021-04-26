<template>
  <div
    style="
      background-color: #f5f5f5;
      position: absolute;
      height: 100%;
      width: 100%;
    "
  >
    <div class="rental-situation">
      <el-row>
        <el-col :span="12"
          ><div>
            <img src="../../assets/logo2018.png" alt="" class="logo-img" /></div
        ></el-col>
        <el-col :span="12">
          <div class="nav-bar">
            <span class="inventory-name">{{ userName }}</span
            >| <span class="inventory-home" @click="homeClick">首页</span>
          </div></el-col
        >
      </el-row>
      <div class="my-rental-situation-title">租赁情况</div>
      <el-breadcrumb
        separator-class="el-icon-arrow-right"
        style="padding: 20px 0 20px 0"
      >
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>租赁情况</el-breadcrumb-item>
      </el-breadcrumb>
      <el-tabs type="border-card">
        <el-tab-pane label="进行中">进行中</el-tab-pane>
        <el-tab-pane label="已完成">已完成</el-tab-pane>
      </el-tabs>
    </div>
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
  },
};
</script>

<style>
.rental-situation {
  margin: 0 auto;
  width: 1200px;
}
.my-rental-situation-title {
  margin-top: 20px;
  padding: 20px 0 20px 20px;
  font-size: 12px;
  font-weight: bolder;
  background-color: white;
}
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
.inventory-name:hover {
  color: #ed2553;
}
.inventory-name {
  margin-right: 10px;
  cursor: pointer;
}
</style>