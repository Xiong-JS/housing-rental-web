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
        <inventory-navgation-bar></inventory-navgation-bar>
      </div>
      <div style="margin-top: 20px" v-if="inventoryDoingVisble">
        <el-row>
          <el-col :span="16">
            <div>
              订单提交成功，请尽早支付！订单号：{{ inventoryVo.inventoryId }}
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
                  >{{ inventoryVo.totalMoney }}</span
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
            租赁人: <span>{{ inventoryVo.rentalName }}</span>
            <span style="margin-left: 20px">{{ inventoryVo.rentalPhone }}</span>
          </div>
          <div style="margin-top: 10px; padding-bottom: 20px">
            房源信息:{{ inventoryVo.country }}-{{ inventoryVo.netherlands }} -
            {{ inventoryVo.detailNetherlands }} - {{ inventoryVo.community }}
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
              >{{ inventoryVo.userWallet }}</span
            >元
          </div>
          <div class="part-line-2" style="margin-top: 100px"></div>
          <div style="margin-top: 20px">
            <div>
              房源信息:{{ inventoryVo.country }}-{{ inventoryVo.netherlands }} -
              {{ inventoryVo.detailNetherlands }} - {{ inventoryVo.community }}
              <span
                style="margin-left: 100px; color: #ed2553; font-weight: bolder"
                >{{ inventoryVo.rentalTime }}个月</span
              >
              <span style="float: right"
                >应付:
                <span
                  style="color: #ed2553; font-size: 25px; font-weight: bolder"
                  >{{ inventoryVo.totalMoney }}</span
                >
                元</span
              >
            </div>
            <div>
              <button class="pay-button" @click="payInventory">立即支付</button>
            </div>
          </div>
        </div>
      </div>
      <div v-else-if="inventoryOutTimeVisble">
        <div class="inventory-chancel">
          <div>
            <i class="iconfont icon-inventory-outtime"></i>
            <div style="margin-top: 20px">该订单因超时已取消</div>
          </div>
        </div>
      </div>
      <div v-else>
        <div class="inventory-chancel">
          <div>
            <i class="iconfont icon-inventory-success"></i>
            <div style="margin-top: 20px">订单支付成功！</div>
            <div style="margin-top: 10px">
              <span class="rental-info" @click="rentalInfo">租赁信息</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import InventoryNavgationBar from "../../components/InventoryNavgationBar.vue";
import request from "../../network/request";
export default {
  components: { InventoryNavgationBar },
  data() {
    return {
      inventoryVo: {},
      minutes: "",
      seconds: "",
      radioType: "1",
      inventoryDoingVisble: true,
      isShow: "展开",
      inventoryDetailVisble: false,
      inventoryOutTimeVisble: false,
      continueState:0
    };
  },
  methods: {
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
    payInventory() {
      if (
        parseFloat(this.inventoryVo.userWallet) <
        parseFloat(this.inventoryVo.totalMoney)
      ) {
        this.$message.error("余额不足!请前往个人中心充值");
        return;
      }
      request({
        url: "/indent/payment",
        method: "post",
        data: {
          inventoryId: this.inventoryVo.inventoryId,
          continueState:this.continueState,
          rentalSituationId:this.$route.query.rentalSituationId
        },
      }).then((res) => {
        this.$message.success("支付成功!");
        this.inventoryDoingVisble = false;
        this.inventoryOutTimeVisble = false;
      });
    },
    rentalInfo(){
       this.$router.push({
        path: "/myRentalSituation",
        query: {
          id: sessionStorage.getItem('id'),
        },
      });
    }
  },
  created() {
    if(this.$route.query.continueState == 1){
      this.continueState = 1
    }
    request({
      url: "/indent",
      params: {
        inventoryId: this.$route.query.inventoryId,
      },
    }).then((res) => {
      this.inventoryVo = res.data.data;
      let times = this.inventoryVo.countTime;
      setInterval(() => {
        times -= 1;
        this.minutes = parseInt(times / 60);
        this.seconds = parseInt(times % 60);
        //倒计时结束
        if (this.minutes == 0 && this.seconds == 0) {
          this.inventoryDoingVisble = false;
          this.inventoryOutTimeVisble = true;
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
    });
  },
};
</script>

<style>
@import url("../../assets/css/common.css");
@import url("../../assets/img/icon/iconfont.css");
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
.rental-info {
  cursor: pointer;
  border-bottom: 1px solid #ed2553;
  color: #ed2553;
}
</style>