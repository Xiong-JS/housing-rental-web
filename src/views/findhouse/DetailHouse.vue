<template>
  <div class="detail">
    <div>
      <div style="float: left">
        <img :src="houseInfos.img" alt="" class="houseImg" />
        <div>
          <p style="border-left: 5px solid #ed2553">&nbsp;独立设施</p>
          <el-row>
            <el-col :span="4">
              <div style="float: left; text-align: center">
                <p class="iconfont icon-chuang"></p>
                <span>床</span>
              </div>
            </el-col>
            <el-col :span="4">
              <div style="float: left; text-align: center">
                <p class="iconfont icon-duwei"></p>
                <span>卫生间</span>
              </div>
            </el-col>
            <el-col :span="4">
              <div style="float: left; text-align: center">
                <p class="iconfont icon-matong"></p>
                <span>坐式马桶</span>
              </div>
            </el-col>
            <el-col :span="4">
              <div style="float: left; text-align: center">
                <p class="iconfont icon-reshuiqi"></p>
                <span>热水器</span>
              </div>
            </el-col>
            <el-col :span="4">
              <div style="float: left; text-align: center">
                <p class="iconfont icon-shafa"></p>
                <span>沙发</span>
              </div>
            </el-col>
            <el-col :span="4">
              <div style="float: left; text-align: center">
                <p class="iconfont icon-bingxiang"></p>
                <span>冰箱</span>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
      <div style="float: left">
        <div class="simple-infos">
          <h2>{{ houseInfos.community }}</h2>
          <p>{{ houseInfos.hall }}室户房型</p>
          <div>
            <el-tag type="success" v-show="houseInfos.toilet == 1">独卫</el-tag>
            <el-tag type="info" v-show="houseInfos.balcony == 1">带阳台</el-tag>
            <el-tag type="warning" v-show="houseInfos.houseType == 1"
              >电梯房</el-tag
            >
            <el-tag type="info" v-show="houseInfos.monthPay == 1">月付</el-tag>
            <el-tag type="danger" v-show="houseInfos.hardback == 1"
              >精装修</el-tag
            >
            <el-tag v-show="houseInfos.homeAppliances == 1">家电齐全</el-tag>
          </div>
          <div class="house-text">
            <ul>
              <li>
                <span style="color: red; font-size: 25px">{{
                  houseInfos.quote
                }}</span>
                <span>元起/月</span>
              </li>
              <li class="cent">
                <span style="font-size: 25px">{{ houseInfos.area }}</span>
                <span>M²</span>
              </li>
            </ul>
          </div>
          <div class="house-text-detail">
            <el-form label-position="left" inline>
              <el-form-item label="门牌号:">
                <input
                  :value="houseInfos.houseNumber"
                  readonly
                  style="border: 0px; width: 100px; font-size: 15px"
                />
              </el-form-item>
              <el-form-item label="住房类型:" style="margin-left: 60px">
                <span>{{ rentalTypeConvert(houseInfos.rentalType) }}</span>
              </el-form-item>
            </el-form>
            <el-form label-position="left" inline>
              <el-form-item label="联系电话:">
                <input
                  :value="houseInfos.releasePhone"
                  readonly
                  style="border: 0px; width: 100px; font-size: 15px"
                />
              </el-form-item>
              <el-form-item label="联系人:" style="margin-left: 50px">
                <span>{{ houseInfos.releaseName }}</span>
              </el-form-item>
            </el-form>
            <el-form label-position="left" inline>
              <el-form-item label="房屋类型:">
                <input
                  v-if="houseInfos.houseType == 0"
                  style="width: 85px; border: 0px; font-size: 15px"
                  value="楼梯房"
                  readonly
                />
                <input
                  v-if="houseInfos.houseType == 1"
                  style="width: 85px; border: 0px; font-size: 15px"
                  value="电梯房"
                  readonly
                />
              </el-form-item>
              <el-form-item label="发布时间:" style="margin-left: 60px">
                <span>{{ houseInfos.releaseTime }}</span>
              </el-form-item>
            </el-form>
            <el-form label-position="left" inline>
              <el-form-item label="区域:">
                <input
                  style="width: 120px; border: 0px; font-size: 15px"
                  :value="area"
                />
              </el-form-item>
              <el-form-item label="楼层:" style="margin-left: 55px">
                <span
                  >{{ houseInfos.floor }}层/共{{
                    houseInfos.totalFloor
                  }}层</span
                >
              </el-form-item>
            </el-form>
          </div>
          <div style="margin-top: 30px">
            <el-row>
              <el-col :span="12" style="text-align: center">
                <el-button type="danger" plain>预约支付</el-button>
              </el-col>
              <el-col :span="12" style="text-align: center">
                <el-button type="danger" plain>加入清单</el-button>
              </el-col>
            </el-row>
          </div>
        </div>
      </div>
    </div>
    <div style="margin-top: 50px; float: left">
      <div id="demo" style="width: 1200px; height: 400px"></div>
    </div>
  </div>
</template>

<script>
import request from "../../network/request";
export default {
  data() {
    return {
      houseInfos: {},
    };
  },
  computed: {
    area() {
      return (
        this.houseInfos.netherlands + " - " + this.houseInfos.detailNetherlands
      );
    },
  },
  methods: {
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
    request({
      url: "/house/by-houseId",
      params: {
        houseId: this.$route.query.houseId,
      },
    }).then((res) => {
      this.houseInfos = res.data.data;
    });
  },
  mounted() {
    var map = new AMap.Map("demo", {
      zoom: 12,
      center: [106.53,29.49],
    });
    AMap.plugin(["AMap.ToolBar", "AMap.Scale"], function () {
      var toolbar = new AMap.ToolBar();
      map.addControl(toolbar);
      var scale = new AMap.Scale();
      map.addControl(scale);
    });
    var marker = new AMap.Marker({
      position: new AMap.LngLat(106.53,29.49),
      title: "北京",
      offset: new AMap.Pixel(-13, -30),
    });
    map.add(marker);
  },
};
</script>

<style>
@import url("../../assets/css/common.css");
@import url("../../assets/img/icon/iconfont.css");
.detail {
  width: 1200px;
  margin: 0 auto;
}
.houseImg {
  width: 700px;
  height: 400px;
}
.simple-infos {
  border-left: 2px solid #eeeeee;
  margin-left: 10px;
  height: 560px;
  padding: 10px;
}
.house-text {
  padding: 5px 0;
  border: #ededed solid 1px;
  border-width: 1px 0;
  margin-top: 10px;
  position: relative;
}
.house-text .cent {
  width: 28%;
  border-left: #ededed solid 1px;
  border-width: 0px 1px;
  margin-left: 20px;
  padding: 10px;
}
.house-text-detail {
  padding: 5px 0;
  border-bottom: #ededed solid 1px;
}
ul li {
  list-style-type: none;
  display: inline;
}
</style>