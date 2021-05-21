<template>
  <div class="detail">
    <div>
      <el-row>
        <el-col :span="12">
          <div>
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
          </div></el-col
        >
        <el-col :span="12"
          ><div>
            <div class="simple-infos">
              <h2>{{ houseInfos.community }}</h2>
              <p>{{ houseInfos.hall }}室户房型</p>
              <div style="float: left">
                <el-tag type="success" v-show="houseInfos.toilet == 1"
                  >独卫</el-tag
                >
                <el-tag type="info" v-show="houseInfos.balcony == 1"
                  >带阳台</el-tag
                >
                <el-tag type="warning" v-show="houseInfos.houseType == 1"
                  >电梯房</el-tag
                >
                <el-tag type="info" v-show="houseInfos.monthPay == 1"
                  >月付</el-tag
                >
                <el-tag type="danger" v-show="houseInfos.hardback == 1"
                  >精装修</el-tag
                >
                <el-tag v-show="houseInfos.homeAppliances == 1"
                  >家电齐全</el-tag
                >
              </div>
              <div style="margin-left: 300px">
                <el-rate
                  v-model="houseInfos.score"
                  score-template="{value}"
                  disabled
                  show-score
                  text-color="#ff9900"
                  style="line-height: 0"
                >
                </el-rate>
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
                    <el-button type="danger" plain @click="pay"
                      >支付房源</el-button
                    >
                  </el-col>
                  <el-col :span="12" style="text-align: center">
                    <el-button type="danger" plain @click="addInventory"
                      >收藏房源</el-button
                    >
                  </el-col>
                </el-row>
              </div>
            </div>
          </div></el-col
        >
      </el-row>
    </div>
    <div style="margin-top: 50px">
      <el-tabs type="border-card">
        <div style="width: 100%">
          <div style="float: left">
            当前位置：
            <el-breadcrumb separator="/" style="margin-left: 65px">
              <el-breadcrumb-item>{{ houseInfos.country }}</el-breadcrumb-item>
              <el-breadcrumb-item>{{
                houseInfos.netherlands
              }}</el-breadcrumb-item>
              <el-breadcrumb-item>{{
                houseInfos.detailNetherlands
              }}</el-breadcrumb-item>
              <el-breadcrumb-item>{{
                houseInfos.community
              }}</el-breadcrumb-item>
            </el-breadcrumb>
          </div>
          <div style="float: left; margin-left: 50px">
            <span
              >天气: <span id="city"></span> -
              <span id="temperature">temperature</span>℃-
              <span id="weather"></span
            ></span>
            湿度: <span id="humidity"> </span>%
          </div>
          <div
            style="
              float: right;
              line-height: 30px;
              border: 1px solid #dedfe0;
              border-radius: 3px;
              margin-right: 20px;
              padding-right: 5px;
              cursor: pointer;
            "
            @click="refresh()"
          >
            <i class="iconfont icon-weizhi" style="vertical-align: middle"></i>
            <span style="vertical-align: middle">定位当前房源</span>
          </div>
        </div>
        <el-tab-pane>
          <span slot="label"><i class="el-icon-location"></i> 公寓地图</span>
          <div
            id="demo"
            style="width: 1200px; height: 400px; margin-top: 10px"
          ></div>
        </el-tab-pane>
      </el-tabs>
    </div>

    <div style="margin-top: 20px">
      <span style="border-left: 3px solid #ed2553; padding-left: 10px"
        >评论</span
      >
      <div style="width: 700px; padding-bottom: 20px">
        <div v-for="item in comments" :key="item">
          <el-row>
            <el-col :span="3">
              <img :src="item.commentMainVo.userImg" alt="" class="head-img" />
            </el-col>
            <el-col :span="21" style="border-bottom: 1px solid #e2e2e2">
              <div>
                <div style="margin-top: 20px; color: #6d757a; font-size: 13px">
                  {{ item.commentMainVo.userName }}
                </div>
                <div>
                  {{ item.commentMainVo.content }}
                </div>
                <div
                  style="
                    color: #aaa;
                    padding: 10px 10px 10px 0;
                    font-size: 13px;
                  "
                >
                  <span>{{ item.commentMainVo.createTime }}</span>
                  <span
                    style="margin-left: 20px; cursor: pointer"
                    @click="comment(item.commentMainVo.userName,
                            item.commentMainVo.userId,
                            item.commentMainVo.id)"
                    >回复</span
                  >
                </div>
              </div>
              <!-- 评论回复 -->
              <div v-for="item in item.commentDeputyVos" :key="item">
                <el-row>
                  <el-col :span="2">
                    <img :src="item.userImg" alt="" class="head-img-small" />
                  </el-col>
                  <el-col :span="22">
                    <div
                      style="margin-top: 5px; color: #6d757a; font-size: 13px"
                    >
                      {{ item.userName }}
                      <span style="margin-left: 10px">回复:</span
                      ><span style="margin-left: 10px">{{
                        item.replyName
                      }}</span>
                    </div>
                    <div>{{ item.content }}</div>
                    <div
                      style="
                        color: #aaa;
                        padding: 10px 10px 10px 0;
                        font-size: 13px;
                      "
                    >
                      <span>{{ item.createTime }}</span>
                      <span
                        style="margin-left: 20px; cursor: pointer"
                        @click="
                          comment(
                            item.userName,
                            item.userId,
                            item.mainId,
                          )
                        "
                        >回复</span
                      >
                    </div>
                  </el-col>
                </el-row>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>
    <el-dialog title="评论" :visible.sync="commentVisble" width="30%" center>
      <el-input
        type="textarea"
        :autosize="{ minRows: 2, maxRows: 4 }"
        :placeholder="placeText"
        v-model="commentContent"
      >
      </el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="commentVisble = false">取 消</el-button>
        <el-button type="primary" @click="releaseComment">发 布</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import request from "../../network/request";
var city = "";
var weather = "";
var humidity = "";
var temperature = "";
var map = "";
export default {
  data() {
    return {
      houseInfos: {},
      commentVisble: false,
      placeText: "",
      commentContent: "",
      comments: [],
      replyId: "",
      mainId: "",
      index: "",
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
    refresh() {
      map.setZoomAndCenter(16, [
        this.houseInfos.longitude,
        this.houseInfos.dimensionality,
      ]);
    },
    pay() {
      if (sessionStorage.getItem('uToken') == null) {
        this.$message.error("未登录!现跳转到登录界面!");
        setTimeout(() => {
          this.$router.push("/login");
        }, 3000);
        return;
      }
      if(this.houseInfos.state == 0 || this.houseInfos.indentState == 1){
        this.$message.error("该房源已停止租赁,请浏览其他房源!");
        return;
      }
      this.$router.push({
        path: "/inventoryUnDone",
        query: {
          id: this.houseInfos.houseId,
        },
      });
    },
    //加入收藏
    addInventory() {
      if (sessionStorage.getItem("uToken") == null) {
        this.$message.error("未登录!现跳转到登录界面!");
        setTimeout(() => {
          this.$router.push("/login");
        }, 3000);
        return;
      }
      request({
        url: "/collection",
        method: "post",
        data: {
          userId: sessionStorage.getItem("id"),
          houseId: this.houseInfos.houseId,
        },
      }).then((res) => {
        this.$message.success(res.data.msg);
        console.log(res.data);
      });
    },
    comment(userName, userId, mainId, index) {
      this.commentVisble = true;
      this.placeText = "@" + userName;
      this.commentContent = "";
      this.replyId = userId;
      this.mainId = mainId;
      this.index = index;
    },
    releaseComment() {
      this.commentVisble = false;
      request({
        url: "/comment/comment-deputy",
        method: "post",
        data: {
          mainId: this.mainId,
          userId: sessionStorage.getItem("id"),
          content: this.commentContent,
          replyId: this.replyId,
        },
      }).then((res) => {
        request({
          url: "/comment",
          params: {
            houseId: this.houseInfos.houseId,
          },
        }).then((res) => {
          this.comments = res.data.data;
        });
      });
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
      let options = [this.houseInfos.longitude, this.houseInfos.dimensionality];
      map = new AMap.Map("demo", {
        zoom: 16,
        center: options,
      });
      AMap.plugin(["AMap.ToolBar", "AMap.Scale"], function () {
        var toolbar = new AMap.ToolBar();
        map.addControl(toolbar);
        var scale = new AMap.Scale();
        map.addControl(scale);
      });
      var marker = new AMap.Marker({
        position: new AMap.LngLat(
          this.houseInfos.longitude,
          this.houseInfos.dimensionality
        ),
        title: this.houseInfos.community,
        offset: new AMap.Pixel(-13, -30),
      });
      map.add(marker);
      request({
        url: "/comment",
        params: {
          houseId: this.houseInfos.houseId,
        },
      }).then((res) => {
        this.comments = res.data.data;
        console.log(this.comments);
      });
    });
    AMap.plugin("AMap.Weather", function () {
      var Aweather = new AMap.Weather();
      //执行实时天气信息查询
      Aweather.getLive("重庆市", function (err, data) {
        city = data.city;
        humidity = data.humidity;
        temperature = data.temperature;
        weather = data.weather;
        document.getElementById("city").innerHTML = city;
        document.getElementById("humidity").innerHTML = humidity;
        document.getElementById("temperature").innerHTML = temperature;
        document.getElementById("weather").innerHTML = weather;
      });
    });
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
  width: 100%;
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
  margin-top: 20px;
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
.head-img {
  height: 50px;
  width: 50px;
  border-radius: 50%;
  -webkit-border-radius: 50%;
  -moz-border-radius: 50%;
  margin-top: 15px;
}
.head-img-small {
  height: 25px;
  width: 25px;
  border-radius: 50%;
  -webkit-border-radius: 50%;
  -moz-border-radius: 50%;
  margin-top: 5px;
}
</style>