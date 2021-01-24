<template>
  <div style="background-color: white">
    <carousel></carousel>
    <div>
      <el-form
        :inline="true"
        :model="searchForm"
        class="demo-form-inline search"
      >
        <el-form-item style="width: 100px">
          <el-select v-model="searchForm.type">
            <el-option label="全部" value="0"></el-option>
            <el-option label="合租" value="1"></el-option>
            <el-option label="整租" value="2"></el-option>
            <el-option label="公寓" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-input
            v-model="searchForm.content"
            placeholder="输入区域、小区名"
            style="width: 300px"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search" icon="el-icon-search"
            >查询</el-button
          >
        </el-form-item>
      </el-form>
    </div>
    <type-button>
      <div class="pageLink-unit">
        <router-link to="/housingRental/findHousing">
          <img src="../../assets/img/icon1.png" alt="合租" />
          <div class="pageLink-unit-word">合租</div>
        </router-link>
      </div>
      <div class="pageLink-unit">
        <router-link to="/housingRental/findHousing">
          <img src="../../assets/img/icon2.png" alt="整租" />
          <div class="pageLink-unit-word">整租</div>
        </router-link>
      </div>
      <div class="pageLink-unit">
        <router-link to="/housingRental/findHousing">
          <img src="../../assets/img/icon3.png" alt="公寓" />
          <div class="pageLink-unit-word">公寓</div>
        </router-link>
      </div>
    </type-button>
    <type-show-panle>
      <div>
        
      </div>
    </type-show-panle>
  </div>
</template>

<script>
import Carousel from "../../components/Carousel ";
import TypeButton from "./TypeButton.vue";
import TypeShowPanle from "./TypeShowPanle.vue";

export default {
  components: {
    Carousel,
    TypeButton,
    TypeShowPanle,
  },
  data() {
    TypeButton;
    return {
      searchForm: {
        content: "",
        type: "0",
      },
    };
  },
  methods: {
    search() {},
  },
  activated() {},
};
</script>

<style>
.search {
  text-align: center;
}
.pageLink-unit {
  float: left;
  margin-left: 5%;
  width: 25%;
  overflow: hidden;
}
.pageLink-unit-word {
  color: black;
  font-size: 28px;
  margin-top: 20px;
  margin-bottom: 30px;
}
a {
  text-decoration: none;
}
.router-link-active {
  text-decoration: none;
}
</style>