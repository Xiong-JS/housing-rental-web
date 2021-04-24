<template>
  <div
    style="
      background-color: #f2f2f2;
      width: 100%;
      height: 100%;
      position: absolute;
    "
  >
    <div class="inventory-pay-main">
      <div class="pay-head">
        <el-row>
          <el-col :span="12"
            ><div>
              <img src="../../assets/logo2018.png" alt="" class="logo-img" />
              <span class="inventory-pay-title">收银台</span>
            </div></el-col
          >
          <el-col :span="12">
            <div class="nav-bar">
              <span class="inventory-name">{{ userName }}</span
              >|
              <span class="inventory-home" @click="homeClick">首页</span>|
              <span class="inventory-mine" @click="myInventory">我的订单</span>
            </div></el-col
          >
        </el-row>
      </div>
      <div style="margin-top: 20px" v-if="inventoryDoingVisble">
        <el-row>
          <el-col :span="16">
            <div>
              订单提交成功，请尽早支付！订单号：{{ inventory.inventoryId }}
            </div>
            <div style="font-size: 13px">
              请您在
              <span style="color: #ed2553">{{ minutes }}分{{ seconds }}秒</span>
              内完成支付否则该订单将被取消!
            </div>
          </el-col>
          <el-col :span="8">
            <div style="float: right">
              <div style="font-size: 13px">
                应付金额:
                <span
                  style="color: #ed2553; font-size: 20px; font-weight: bolder"
                  >{{ inventory.totalMoney }}</span
                >元
              </div>
              <div style="font-size: 13px">
                订单详情
                <span class="show-inventory" @click="showInventory">
                  {{ isShow }}
                </span>
              </div>
            </div>
          </el-col>
        </el-row>
        <div class="part-line-2" style="margin-top: 10px"></div>
        <div
          style="margin-top: 20px; font-size: 13px; color: #666666"
          v-show="inventoryDetailVisble"
        >
          <div>
            租赁人: <span>{{ inventory.rentalName }}</span>
            <span style="margin-left: 20px">{{ inventory.rentalPhone }}</span>
          </div>
          <div style="margin-top: 10px; padding-bottom: 20px">
            房源信息:{{ houseInfo.country }}-{{ houseInfo.netherlands }} -
            {{ houseInfo.detailNetherlands }} - {{ houseInfo.community }}
          </div>
        </div>
        <div class="pay-money">
          <div>
            <span>支付方式:</span>
            <el-radio-group
              v-model="radioType"
              size="small"
              style="margin-left: 20px"
              fill="#ed2553"
            >
              <el-radio-button label="1" border>零钱</el-radio-button>
            </el-radio-group>
          </div>
          <div style="float: right; margin-right: 20px">
            剩余零钱:
            <span
              style="font-size: 25px; font-weight: bolder; color: #ed2553"
              >{{ user.userWallet }}</span
            >元
          </div>
          <div class="part-line-2" style="margin-top: 100px"></div>
          <div style="margin-top: 20px">
            <div>
              房源信息:{{ houseInfo.country }}-{{ houseInfo.netherlands }} -
              {{ houseInfo.detailNetherlands }} - {{ houseInfo.community }}
              <span
                style="margin-left: 100px; color: #ed2553; font-weight: bolder"
                >{{ inventory.rentalTime }}个月</span
              >
              <span style="float: right"
                >应付:
                <span
                  style="color: #ed2553; font-size: 25px; font-weight: bolder"
                  >{{ inventory.totalMoney }}</span
                > 元</span
              >
            </div>
            <div>
              <button class="pay-button" @click="payInventory">立即支付</button>
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <div class="inventory-chancel">
          <div>
            <i class="iconfont icon-inventory-outtime"></i>
          <div style="margin-top:20px">该订单因超时已取消</div>
          </div>
          
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import request from "../../network/request";
export default {
  data() {
    return {
      user: {},
      houseInfo: {},
      inventory: {},
      userName: localStorage.getItem("name"),
      countTimeL: "",
      minutes: "",
      seconds: "",
      radioType: "1",
      inventoryDoingVisble: true,
      isShow: "展开",
      inventoryDetailVisble: false,
    };
  },
  methods: {
    //randomLen订单号长度
    random_No(randomLen) {
      var random_no = "";
      for (var i = 0; i < randomLen; i++) {
        random_no += Math.floor(Math.random() * 10);
      }
      random_no = new Date().getTime() + random_no;
      return random_no;
    },
    homeClick() {
      this.$router.push("/");
    },
    myInventory() {
      this.$router.push("/inventory");
    },
    getCountTime() {},
    showInventory() {
      if (this.isShow == "收起") {
        this.isShow = "展开";
      } else {
        this.isShow = "收起";
      }
      if (this.inventoryDetailVisble) {
        this.inventoryDetailVisble = false;
      } else {
        this.inventoryDetailVisble = true;
      }
    },
    getUserInfo() {
      request({
        url: "/user/user-id",
        params: {
          id: localStorage.getItem("id"),
        },
      }).then((res) => {
        this.user = res.data.data;
      });
    },
    payInventory() {},
  },
  created() {
    this.getUserInfo();
    this.inventory = this.$route.query.inventory;
    this.houseInfo = this.$route.query.houseInfo;
    this.inventory.inventoryId = this.random_No(6);
    let times = 3600;
    setInterval(() => {
      times -= 1;
      this.minutes = parseInt(times / 60);
      this.seconds = parseInt(times % 60);
      //倒计时结束
      if (this.minutes == 0 && this.seconds == 0) {
        this.inventoryDoingVisble = false;
      } else if (this.seconds == 0) {
        this.seconds == "00";
      } else if (this.minutes == 0) {
        this.minutes = "00";
      }
      if (this.minutes < 10 && this.minutes != 0) {
        this.minutes = "0" + this.minutes;
      }
      if (this.seconds < 10 && this.seconds != 0) {
        this.seconds = "0" + this.seconds;
      }
    }, 1000);
  },
};
</script>

<style>
@import url("../../assets/css/common.css");
@import url('../../assets/img/icon/iconfont.css');
.inventory-pay-main {
  margin: 0 auto;
  width: 1200px;
}
.pay-head {
  padding-top: 10px;
}
.inventory-pay-title {
  font-size: 22px;
  color: #666666;
  margin-left: 30px;
}
.nav-bar {
  float: right;
  font-size: 13px;
  color: #666666;
}
.logo-img {
  width: 100px;
  height: 70px;
  vertical-align: middle;
}
.inventory-home {
  margin: 0 10px 0 10px;
  cursor: pointer;
}
.inventory-home:hover,
.inventory-name:hover,
.inventory-mine:hover {
  color: #ed2553;
}
.inventory-name {
  margin-right: 10px;
  cursor: pointer;
}
.inventory-mine {
  margin: 0 10px 0 10px;
  cursor: pointer;
}
.show-inventory {
  color: #005ea7;
  margin-left: 10px;
  cursor: pointer;
}
.show-inventory:hover {
  color: #ed2553;
}
.pay-money {
  height: 300px;
  padding: 10px;
  background-color: white !important;
  border: 1px solid #fff;
  box-shadow: 5px 5px 2px #888888;
  font-size: 13px;
  color: #666666;
}
.pay-button {
  width: 150px;
  height: 36px;
  cursor: pointer;
  background-color: #ed2553;
  color: #fff;
  font-weight: bolder;
  border: 1px solid #fff;
  margin-bottom: 10px;
  margin-top: 80px;
}
.inventory-chancel {
  margin-top: 50px;
  background-color: white;
  box-shadow: 5px 5px 2px #888888;
  font-size: 15px;
  color: #666666;
  height: 200px;
  text-align: center;
  padding-top: 100px;
}
</style>