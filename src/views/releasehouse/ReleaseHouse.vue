<template>
  <div>
    <img
      src="../../assets/img/createhouse_img.png"
      alt="发布房源"
      class="img"
    />
    <h1 class="title-release">填写您的基本信息，后台工作人员会尽快审核处理</h1>

    <div class="processBar">
      <el-steps :active="active" finish-status="success">
        <el-step title="提交基本信息"></el-step>
        <el-step title="提交详细信息"></el-step>
        <el-step title="提交成功"></el-step>
      </el-steps>
    </div>
    <!-- 填写房屋基本信息 -->
    <div v-show="active === 0" class="write-houseInfo">
      <el-form ref="form" :model="houseInfo" label-width="100px">
        <el-form-item label="姓名" required>
          <el-input v-model="houseInfo.releaseName"></el-input>
        </el-form-item>
        <el-form-item label="电话" required>
          <el-input v-model="houseInfo.releasePhone"></el-input>
        </el-form-item>
        <el-form-item label="城市" required>
          <el-select
            v-model="houseInfo.countryId"
            placeholder="请选择城市"
            @change="countryChange"
            @visible-change="getAllCountries"
            style="width: 400px"
          >
            <el-option
              v-for="item in countries"
              :key="item.countryId"
              :label="item.countryName"
              :value="item.countryId"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="地区" required>
          <el-select
            v-model="houseInfo.netherlandsId"
            clearable
            placeholder="请选择地区"
            @change="netherlandsChange"
            style="width: 400px"
          >
            <el-option
              v-for="item in netherlands"
              :key="item.netherlandsId"
              :label="item.netherlandsName"
              :value="item.netherlandsId"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="详细地区" required>
          <el-select
            v-model="houseInfo.detailNetherlandsId"
            clearable
            placeholder="请选择详细地区"
            @change="detailNetherlandsChange"
            style="width: 400px"
          >
            <el-option
              v-for="item in detailNetherlands"
              :key="item.detailNetherlandsId"
              :label="item.detailNetherlandsName"
              :value="item.detailNetherlandsId"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="小区" required>
          <el-select
            v-model="houseInfo.communityId"
            clearable
            placeholder="请选择小区"
            style="width: 400px"
          >
            <el-option
              v-for="item in communities"
              :key="item.communityId"
              :label="item.communityName"
              :value="item.communityId"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="具体门牌号" required>
          <el-input v-model="houseInfo.houseNumber"></el-input>
        </el-form-item>
        <el-form-item>
          <div style="text-align: center">
            <el-radio v-model="houseInfo.rentalType" label="2" border
              >整租房源</el-radio
            >
            <el-radio v-model="houseInfo.rentalType" label="1" border
              >合租房源</el-radio
            >
          </div>
        </el-form-item>

        <el-form-item>
          <div style="text-align: center">
            <el-button
              type="danger"
              style="width: 200px; margin-top: 20px"
              @click="next"
              >下一步</el-button
            >
          </div>
        </el-form-item>
      </el-form>
    </div>
    <!-- 填写房屋详细信息 -->
    <div v-show="active === 1" class="write-houseInfo">
      <el-form ref="form" :model="houseInfo" label-width="100px">
        <el-form-item label="报价">
          <el-input
            controls-position="right"
            v-model="houseInfo.quote"
            auto-complete="off"
            style="width:400px"
            :min="0"
          > <template slot="append">元/月</template></el-input>
        </el-form-item>
        <el-form-item label="整租面积">
          <el-input
            type="number"
            v-model="houseInfo.area"
            auto-complete="off"
          ><template slot="append">M²</template></el-input>
        </el-form-item>
        <el-form-item label="室">
          <el-input
            type="number"
            v-model="houseInfo.room"
            auto-complete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="厅">
          <el-input
            type="number"
            v-model="houseInfo.hall"
            auto-complete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="卫">
          <el-input
            type="number"
            v-model="houseInfo.toilet"
            auto-complete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="楼层">
          <el-input
            type="number"
            v-model="houseInfo.floor"
            auto-complete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="总楼层">
          <el-input
            type="number"
            v-model="houseInfo.totalFloor"
            auto-complete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="房子类型">
          <el-select
            v-model="houseInfo.houseType"
            clearable
            placeholder="请选择房子类型"
            style="width: 400px"
          >
            <el-option label="楼梯房" value="0"></el-option>
            <el-option label="电梯房" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="特色">
          <el-checkbox-group v-model="houseInfo.characters">
            <el-checkbox label="月付" name="character"></el-checkbox>
            <el-checkbox label="精装房" name="character"></el-checkbox>
            <el-checkbox label="有阳台" name="character"></el-checkbox>
            <el-checkbox label="家电齐全" name="character"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
      <el-form :inline="true" style="text-align: center">
        <el-form-item>
          <div>
            <el-button type="primary" style="width: 200px" @click="pre"
              >上一步</el-button
            >
            <el-button type="danger" style="width: 200px" @click="next"
              >下一步</el-button
            >
          </div>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import request from "../../network/request";
export default {
  data() {
    return {
      active: 0,
      writeBaseHouseInfo: this.active === 0,
      writeDetailHouseInfo: this.active === 1,
      checkHouseInfo: this.active === 2,
      countries: [],
      netherlands: [],
      detailNetherlands: [],
      communities: [],
      houseInfo: {
        releaseName: "",
        releasePhone: "",
        countryId: "",
        netherlandsId: "",
        detailNetherlandsId: "",
        communityId: "",
        houseNumber: "",
        rentalType: "2",
        quote: "",
        area: "",
        room: "",
        hall: "",
        toilet: "",
        floor: "",
        totalFloor: "",
        houseType: "",
        description: "",
        characters: [],
        img: "",
      },
    };
  },
  methods: {
    next() {
      this.active++;
    },
    pre() {
      this.active--;
    },
    getAllCountries() {
      request({
        url: "/house/countries",
      }).then((res) => {
        this.countries = res.data.data;
      });
    },
    countryChange(val) {
      request({
        url: "/house/netherlands",
        params: {
          countryId: val,
        },
      }).then((res) => {
        this.netherlands = res.data.data;
      });
    },
    netherlandsChange(val) {
      request({
        url: "/house/detailNetherlands",
        params: {
          countryId: this.houseInfo.countryId,
          netherlandsId: val,
        },
      }).then((res) => {
        this.detailNetherlands = res.data.data;
      });
    },
    detailNetherlandsChange(val) {
      request({
        url: "/house/communities",
        params: {
          countryId: this.houseInfo.countryId,
          netherlandsId: this.houseInfo.netherlandsId,
          detailNetherlandsId: val,
        },
      }).then((res) => {
        this.communities = res.data.data;
      });
    },
  },
};
</script>

<style>
@import url("../../assets/css/common.css");
.img {
  width: 100%;
  border: none;
  vertical-align: middle;
}
.title-release {
  font-weight: bold;
  font-size: 28px;
  text-align: center;
  color: #000;
}
.processBar {
  width: 700px;
  margin-left: 28.5%;
}
.write-houseInfo {
  margin-top: 20px;
  margin-left: 30%;
  width: 500px;
}
</style>