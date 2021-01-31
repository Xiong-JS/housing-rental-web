<template>
  <div>
    <div style="margin-top: 10px; text-align: center">
      <el-form
        :inline="true"
        :model="searchForm"
        class="demo-form-inline search"
      >
        <el-form-item>
          <el-input
            v-model="searchForm.content"
            placeholder="输入区域、小区名"
            style="width: 500px"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="danger" @click="search" icon="el-icon-search"
            >查询</el-button
          >
        </el-form-item>
      </el-form>
    </div>
    <div class="part-line"></div>
    <div class="main">
      <div class="nav-classify">
        <ul>
          <li>
            <router-link to="/HouseRentalMain/findHouse/findHouseByZone">
              <span class="zone">区域找房</span>
            </router-link>
          </li>
        </ul>
      </div>
      <keep-alive><router-view></router-view></keep-alive>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchForm: {
        content: "",
      },
    };
  },
  methods: {
    search() {},
  },
};
</script>

<style>
@import url("../../assets/css/findHouse.css");
</style>