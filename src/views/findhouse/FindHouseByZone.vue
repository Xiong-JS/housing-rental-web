<template>
  <div>
    <div class="filter">
      <el-form ref="form" label-width="80px">
        <el-form-item label="区域：">
          <el-radio-group v-model="area" @change="areaChange">
            <el-radio label="0">不限</el-radio>
            <el-radio v-for="item in netherlands" :key="item.netherlandsId" :label="item.netherlandsId">
              {{ item.netherlandsName }}
            </el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="租金：">
          <el-radio-group v-model="quote" @change="quoteChange">
            <el-radio :label="0">不限</el-radio>
            <el-radio :label="1">1500元以下</el-radio>
            <el-radio :label="2">1500-2000元</el-radio>
            <el-radio :label="3">2000-3000元</el-radio>
            <el-radio :label="4">3000-4000元</el-radio>
            <el-radio :label="5">4000-5000元</el-radio>
            <el-radio :label="6">5000元以上</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="类型：">
          <el-radio-group v-model="rentalType" @change="rentalTypeChange">
            <el-radio label="0">不限</el-radio>
            <el-radio label="1">合租</el-radio>
            <el-radio label="2">整租</el-radio>
            <el-radio label="3">公寓</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="户型：">
          <el-radio-group v-model="room" @change="roomChange">
            <el-radio :label="0">不限</el-radio>
            <el-radio :label="1">一室</el-radio>
            <el-radio :label="2">二室</el-radio>
            <el-radio :label="3">三室</el-radio>
            <el-radio :label="4">三室以上</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="特色：">
          <el-checkbox-group
            v-model="character"
            :max="maxCheck"
            :min="minCheck"
            @change="characterChange"
          >
            <el-checkbox label="月付" name="chracter"></el-checkbox>
            <el-checkbox label="带阳台" name="chracter"></el-checkbox>
            <el-checkbox label="精装修" name="chracter"></el-checkbox>
            <el-checkbox label="家电齐全" name="chracter"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
    </div>
    <div class="part-line-5"></div>
    <div>
      <el-row v-if="$store.state.houseInfos.length != 0">
        <el-col
          :span="18"
          v-for="item in $store.state.houseInfos"
          :key="item.houseId"
          :offset="3"
        >
          <el-card :body-style="{ padding: '0px', height: '200px' }">
            <div class="padding-18">
              <div style="float: left">
                <router-link
                  :to="{
                    path: '/houseRentalMain/detailHouse',
                    query: { houseId: item.houseId },
                  }"
                >
                  <img :src="item.img" class="img-card" />
                </router-link>
              </div>
              <div style="float: left; padding-left: 20px">
                <h3>{{ item.community }} {{ item.floor }}楼</h3>
                <p>
                  {{ item.netherlands }}-{{ item.detailNetherlands }} |
                  {{ rentalTypeConvert(item.rentalType) }} | {{ item.room }}室{{
                    item.hall
                  }}厅{{ item.toilet }}卫 | {{ item.area }}M²
                </p>
                <div>
                  <el-tag type="info" v-show="item.toilet == 1">独卫</el-tag>
                  <el-tag type="info" v-show="item.balcony == 1">带阳台</el-tag>
                  <el-tag type="info" v-show="item.houseType == 1"
                    >电梯房</el-tag
                  >
                  <el-tag type="info" v-show="item.monthPay == 1">月付</el-tag>
                  <el-tag type="info" v-show="item.hardback == 1"
                    >精装修</el-tag
                  >
                  <el-tag type="info" v-show="item.homeAppliances == 1"
                    >家电齐全</el-tag
                  >
                </div>
              </div>
              <div class="money-position">{{ item.quote }}元</div>
            </div>
          </el-card>
        </el-col>
      </el-row>
      <div v-else>暂无数据</div>
    </div>
    <div class="block" style="text-align: center">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="pageSize"
        layout="prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import request from "../../network/request";
import * as types from "../../store/mutations-type-string";
export default {
  data() {
    return {
      quote: 0,
      rentalType:
        typeof this.$route.query.rentalType === "undefined"
          ? "0"
          : this.$route.query.rentalType,
      room: 0,
      character: [],
      minCheck: 0,
      maxCheck: 4,
      currentPage: this.$store.state.currentPage,
      total: this.$store.state.total,
      pageSize: 5,
      netherlands: [],
      area:
        typeof this.$route.query.area === "undefined"
          ? "0"
          : parseInt(this.$route.query.area) ,
    };
  },
  computed: {},
  methods: {
    handleCurrentChange(val) {
      this.getHouseInfoByConditions(val)
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
    quoteChange(val) {
      this.quote = val;
      this.getHouseInfoByConditions(1);
    },
    rentalTypeChange(val) {
      this.rentalType = val;
      this.getHouseInfoByConditions(1);
    },
    roomChange(val) {
      this.room = val;
      this.getHouseInfoByConditions(1);
    },
    characterChange(val) {
      this.character = val;
      this.getHouseInfoByConditions(1);
    },
    areaChange(val) {
      this.area = val;
      this.getHouseInfoByConditions(1);
    },
    getHouseInfoByConditions(val) {
      request({
        url: "/house",
        params: {
          netherlands: this.area,
          quote: this.quote,
          rentalType: this.rentalType,
          room: this.room,
          characters: this.character.toString(),
          page: val,
          limit: 5,
        },
      }).then((res) => {
        console.log(res.data);
        this.$store.commit(types.SETHOUSEINFOS, res.data.data);
        this.total = res.data.total;
        this.currentPage = res.data.currentPage;
      });
    },
    getNetherlands() {
      request({
        url: "/house/netherlands",
        params: {
          countryId: 1,
        },
      }).then((res) => {
        this.netherlands = res.data.data;
        console.log(this.netherlands);
      });
    },
  },
  created() {
    console.log(typeof this.$route.query.area);
    this.getNetherlands();
    if (
      this.$store.state.routerType == 0 ||
      this.$store.state.houseInfos.length == 0
    )
      this.getHouseInfoByConditions(1);
  },
};
</script>

<style>
@import url("../../assets/css/common.css");
@import url("../../assets/css/findHouseByZone.css");
.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}

.image {
  width: 100%;
  display: block;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}
</style>