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
            :to="{ path: '/houseRentalMain/findHouse', query: { rentalType: 1 } }"
          >
            <img src="../../assets/img/icon1.png" alt="合租" />
            <div class="pageLink-unit-word">合租</div>
          </router-link>
        </div>
        <div class="pageLink-unit">
          <router-link
            :to="{ path: '/houseRentalMain/findHouse', query: { rentalType: 2 } }"
          >
            <img src="../../assets/img/icon2.png" alt="整租" />
            <div class="pageLink-unit-word">整租</div>
          </router-link>
        </div>
        <div class="pageLink-unit">
          <router-link
            :to="{ path: '/houseRentalMain/findHouse', query: { rentalType: 3 } }"
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
                :to="{ path: '/houseRentalMain/findHouse', query: { rentalType: 1 } }"
                class="more"
                >More>></router-link
              >
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
                :to="{ path: '/houseRentalMain/findHouse', query: { rentalType: 2 } }"
                class="more"
                >More>></router-link
              >
            </div>
          </div>
          <div class="list-index">
            <div class="list-index-title list-index-blue">
              <div>
                <img src="../../assets/img/icon7.png" class="innerImg" />
                <div>
                  <h2 class="title-gongyu">品质公寓</h2>
                  <p class="title-desc">高品质的独栋青年公寓</p>
                </div>
              </div>
              <router-link
                :to="{ path: '/houseRentalMain/findHouse', query: { rentalType: 3 } }"
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
        <div class="out nav_tab">
          <div class="city_nav">
            <div class="nav_title">推荐区域租房</div>
            <ul>
              <li>
                <router-link
                  to="/houseRentalMain/findHouse"
                  class="router-font-color"
                  >九龙坡</router-link
                >
              </li>
              <li>
                <router-link
                  to="/houseRentalMain/findHouse"
                  class="router-font-color"
                  >北碚</router-link
                >
              </li>
              <li>
                <router-link
                  to="/houseRentalMain/findHouse"
                  class="router-font-color"
                  >南岸</router-link
                >
              </li>
              <li>
                <router-link
                  to="/houseRentalMain/findHouse"
                  class="router-font-color"
                  >巴南</router-link
                >
              </li>
              <li>
                <router-link
                  to="/houseRentalMain/findHouse"
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
    search() {},
  },
  activated() {},
};
</script>

<style>
@import url("../../assets/css/home.css");
</style>