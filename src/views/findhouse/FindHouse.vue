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
    <div class="part-line-2"></div>
    <div class="main">
      <div class="nav-classify">
        <div class="zone" :class="{'zone-active-bgcolor':isShow}">
          <router-link to="/HouseRentalMain/findHouse/findHouseByZone" style="margin-top:10px;position:absolute;">
          <span :class="{'zone-active-font':isShow}">区域找房</span>
        </router-link>
        </div>
        
      </div>
      <keep-alive><router-view></router-view></keep-alive>
    </div>
  </div>
</template>

<script>
import request from '../../network/request'
import * as types from "../../store/mutations-type-string"
export default {
  data() {
    return {
      searchForm: {
        content: "",
      },
      isShow:false
    };
  },
  methods: {
    search() {
      this.getHouseInfoByContent(this.searchForm.content,0)
    },
    getHouseInfoByContent(content,type){
      request({
        url:'/house/content',
        params:{
          content,
          type,
          page:1,
          limit:5
        }
      }).then(res=>{
        this.$store.commit(types.SETHOUSEINFOS,res.data.data)
        console.log(res);
      })
    },
  },
  created(){
    this.isShow = true
  }
};
</script>

<style>
@import url("../../assets/css/findHouse.css");
@import url("../../assets/css/common.css");
</style>