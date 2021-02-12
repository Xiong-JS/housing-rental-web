<template>
  <div class="main1">
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
      <div>
        <div class="pageLink-unit">
          <router-link
            :to="{
              path: '/houseRentalMain/findHouse',
              query: { rentalType: 1 },
            }"
            @click="getHouseInfoByConditions(1, '不限')"
          >
            <img src="../../assets/img/icon1.png" alt="合租" />
            <div class="pageLink-unit-word">合租</div>
          </router-link>
        </div>
        <div class="pageLink-unit">
          <router-link
            :to="{
              path: '/houseRentalMain/findHouse',
              query: { rentalType: 2 },
            }"
            @click="getHouseInfoByConditions(2, '不限')"
          >
            <img src="../../assets/img/icon2.png" alt="整租" />
            <div class="pageLink-unit-word">整租</div>
          </router-link>
        </div>
        <div class="pageLink-unit">
          <router-link
            :to="{
              path: '/houseRentalMain/findHouse',
              query: { rentalType: 3 },
            }"
            @click="getHouseInfoByConditions(3, '不限')"
          >
            <img src="../../assets/img/icon3.png" alt="公寓" />
            <div class="pageLink-unit-word">公寓</div>
          </router-link>
        </div>
      </div>
    </type-button>
    <div>
      <type-show-panle>
        <div class="main-index out">
          <div class="list-index">
            <div class="list-index-title list-index-red">
              <div>
                <img src="../../assets/img/icon5.png" class="innerImg" />
                <div>
                  <h2>快乐合租</h2>
                  <p class="title-desc">百万兔宝儿的快乐合租公寓</p>
                </div>
              </div>
              <router-link
                :to="{
                  path: '/houseRentalMain/findHouse',
                  query: { rentalType: 1 },
                }"
                @click="getHouseInfoByConditions(1, '不限')"
                class="more"
                >More>></router-link
              >
            </div>
            <div style="margin-left:100px">
              <el-col
                :span="5"
                v-for="item in $store.state.houseInfos"
                :key="item.HouseId"
                style="margin-left: 40px; float: left; margin-top: 20px"
              >
                <el-card :body-style="{ padding: '0px', height: '300px' }">
                  <div>
                    <router-link to="">
                      <img :src="item.img" class="home-img-card" />
                    </router-link>
                    <div style="padding: 0px">
                      <div>
                        <h3 style="font-size: 18px" class="div-line">
                          {{ item.community }} {{ item.floor }}楼
                        </h3>
                        <span
                          style="color: red; font-size: 20px; text-align: right"
                          class="div-line"
                          >{{ item.quote }}元</span
                        >
                      </div>

                      <p style="font-size: 14px; color: #979798">
                        {{ item.netherlands }}-{{ item.detailNetherlands }} |
                        {{ rentalTypeConvert(item.rentalType) }} |
                        {{ item.room }}室{{ item.hall }}厅{{ item.toilet }}卫 |
                        {{ item.area }}M²
                      </p>
                      <div>
                        <el-tag type="info" v-show="item.toilet == 1"
                          >独卫</el-tag
                        >
                        <el-tag type="info" v-show="item.balcony == 1"
                          >带阳台</el-tag
                        >
                        <el-tag type="info" v-show="item.houseType == 1"
                          >电梯房</el-tag
                        >
                        <el-tag type="info" v-show="item.monthPay == 1"
                          >月付</el-tag
                        >
                        <el-tag type="info" v-show="item.hardback == 1"
                          >精装修</el-tag
                        >
                        <el-tag type="info" v-show="item.homeAppliances == 1"
                          >家电齐全</el-tag
                        >
                      </div>
                    </div>
                  </div>
                </el-card>
              </el-col>
            </div>
          </div>
          <div class="list-index">
            <div class="list-index-title list-index-green">
              <div>
                <img src="../../assets/img/icon6.png" class="innerImg" />
                <div>
                  <h2 class="title-zhengzu">轻松整租</h2>
                  <p class="title-desc">整套出租的单身公寓</p>
                </div>
              </div>
              <router-link
                :to="{
                  path: '/houseRentalMain/findHouse',
                  query: { rentalType: 2 },
                }"
                @click="getHouseInfoByConditions(2, '不限')"
                class="more"
                >More>></router-link
              >
            </div>
          </div>
          <div class="list-index" style="padding-bottom: 10px">
            <div class="list-index-title list-index-blue">
              <div>
                <img src="../../assets/img/icon7.png" class="innerImg" />
                <div>
                  <h2 class="title-gongyu">品质公寓</h2>
                  <p class="title-desc">高品质的独栋青年公寓</p>
                </div>
              </div>
              <router-link
                :to="{
                  path: '/houseRentalMain/findHouse',
                  query: { rentalType: 3 },
                }"
                @click="getHouseInfoByConditions(3, '不限')"
                class="more"
                >More>></router-link
              >
            </div>
          </div>
        </div>
      </type-show-panle>
    </div>
    <div class="foot">
      <footer>
        <div class="nav_tab" style="margin-left: 150px">
          <div class="city_nav">
            <div class="nav_title">推荐区域租房</div>
            <ul>
              <li>
                <router-link
                  :to="{
                    path: '/houseRentalMain/findHouse',
                    query: { area: 1 },
                  }"
                  @click="getHouseInfoByConditions(0, '九龙坡')"
                  class="router-font-color"
                  >九龙坡</router-link
                >
              </li>
              <li>
                <router-link
                  :to="{
                    path: '/houseRentalMain/findHouse',
                    query: { area: 2 },
                  }"
                  @click="getHouseInfoByConditions(0, '北碚')"
                  class="router-font-color"
                  >北碚</router-link
                >
              </li>
              <li>
                <router-link
                  :to="{
                    path: '/houseRentalMain/findHouse',
                    query: { area: 3 },
                  }"
                  @click="getHouseInfoByConditions(0, '南岸')"
                  class="router-font-color"
                  >南岸</router-link
                >
              </li>
              <li>
                <router-link
                  :to="{
                    path: '/houseRentalMain/findHouse',
                    query: { area: 4 },
                  }"
                  @click="getHouseInfoByConditions(0, '巴南')"
                  class="router-font-color"
                  >巴南</router-link
                >
              </li>
              <li>
                <router-link
                  :to="{
                    path: '/houseRentalMain/findHouse',
                    query: { area: 5 },
                  }"
                  @click="getHouseInfoByConditions(0, '渝北')"
                  class="router-font-color"
                  >渝北</router-link
                >
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  </div>
</template>

<script>
import Carousel from "../../components/Carousel ";
import TypeButton from "./TypeButton.vue";
import TypeShowPanle from "./TypeShowPanle.vue";
import Footer from "./Footer.vue";
import * as types from "../../store/mutations-type-string";
import request from "../../network/request";

export default {
  components: {
    Carousel,
    TypeButton,
    TypeShowPanle,
    Footer,
  },
  data() {
    return {
      searchForm: {
        content: "",
        type: "0",
      },
    };
  },
  methods: {
    search() {
      this.getHouseInfoByContent(this.searchForm.content, this.searchForm.type);
      this.$store.commit(types.SETROUTERTYPE, 1);
      this.$router.push("/houseRentalMain/findHouse");
    },
    getHouseInfoByContent(content, type) {
      request({
        url: "/house/content",
        params: {
          content,
          type,
          page: 1,
          limit: 5,
        },
      }).then((res) => {
        this.$store.commit(types.SETHOUSEINFOS, res.data.data);
        console.log(res);
      });
    },
    getHouseInfoByConditions(rentalType, netherlands) {
      request({
        url: "/house",
        params: {
          netherlands: netherlands,
          quote: 0,
          rentalType: rentalType,
          room: 0,
          characters: "",
          page: 1,
          limit: 4,
        },
      }).then((res) => {
        console.log(res.data);
        this.$store.commit(types.SETHOUSEINFOS, res.data.data);
        console.log(this.houseInfo);
      });
    },
    rentalTypeConvert(val) {
      let type = "合租";
      switch (val) {
        case 1:
          type = "合租";
          break;
        case 2:
          type = "整租";
          break;
        case 3:
          type = "公寓";
          break;
      }
      return type;
    },
  },
  created() {
    this.getHouseInfoByConditions(0, 0);
  },
};
</script>

<style>
@import url("../../assets/css/home.css");
@import url("../../assets/css/common.css");
</style>