 <template>
  <div style="background-color: #f5f5f5">
    <div class="inventory-done">
      <inventory-navgation-bar></inventory-navgation-bar>
      <div class="inventory-done-crumbs">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/inventory' }"
            >订单中心</el-breadcrumb-item
          >
          <el-breadcrumb-item
            >订单：{{ inventoryInfos.inventoryId }}</el-breadcrumb-item
          >
        </el-breadcrumb>
      </div>
      <div class="inventory-state">
        <el-row>
          <el-col
            :span="8"
            style="border-right: 2px solid #f5f5f5; height: 300px"
          >
            <div style="text-align: center">
              <div style="margin-top: 20px">
                订单号：{{ inventoryInfos.inventoryId }}
              </div>
              <h3
                v-show="inventoryInfos.state == 2 || inventoryInfos.state == 3"
              >
                已取消
              </h3>
              <h3 v-show="inventoryInfos.state == 0">代付款</h3>
              <h3 v-show="inventoryInfos.state == 1">已完成</h3>
              <div v-show="inventoryInfos.state == 0">
                {{ minutes }}:{{ seconds }}后取消该订单
              </div>
              <div>
                <button
                  class="pay-button"
                  v-show="inventoryInfos.state != 0"
                  @click="rightNowRental"
                >
                  立即购买
                </button>
                <div v-show="inventoryInfos.state == 0">
                  <button
                    class="pay-button"
                    style="margin-top: 10px"
                    @click="cancelIndent"
                  >
                    点击取消
                  </button>
                  <button
                    class="pay-button"
                    style="margin-top: 10px"
                    @click="pay"
                  >
                    点击支付
                  </button>
                </div>
              </div>
            </div>
          </el-col>
          <el-col :span="16">
            <div style="margin: 20px 0 0 20px">订单流程</div>
            <div style="margin: 80px 0 0 20px">
              <el-row>
                <el-col :span="2"
                  ><div style="text-align: center">
                    <i class="iconfont icon-inventory-apply"></i>
                    <div
                      style="color: #666666; font-size: 14px; margin-top: 20px"
                    >
                      提交申请
                    </div>
                  </div>
                </el-col>
                <el-col :span="9">
                  <div class="inventory-process"></div>
                </el-col>
                <el-col :span="2"
                  ><div style="text-align: center">
                    <i class="iconfont icon-inventory-deal"></i>
                    <div
                      style="color: #666666; font-size: 14px; margin-top: 20px"
                    >
                      系统处理
                    </div>
                  </div>
                </el-col>
                <el-col :span="9">
                  <div
                    class="inventory-process"
                    v-show="inventoryInfos.state != 0"
                  ></div>
                </el-col>
                <el-col :span="2"
                  ><div
                    style="text-align: center"
                    v-show="inventoryInfos.state != 0"
                  >
                    <i class="iconfont icon-inventory-finished"></i>
                    <div
                      style="color: #666666; font-size: 14px; margin-top: 20px"
                    >
                      完成
                    </div>
                  </div>
                </el-col>
              </el-row>
              <i></i>
              <i></i>
            </div>
          </el-col>
        </el-row>
        <div></div>
      </div>
      <div class="inventory-info">
        <el-row>
          <el-col :span="8">
            <div style="padding: 20px 20px 20px 30px">
              <div style="border-right: 1px solid #f1f1f1; height: 300px">
                <div style="font-size: 14px">订单信息</div>
                <div style="margin-top: 10px">
                  <span>支付方式:</span>
                  <span style="margin-left: 50px">在线支付</span>
                </div>
                <div
                  v-show="
                    inventoryInfos.state == 2 || inventoryInfos.state == 3
                  "
                >
                  <div style="margin-top: 10px">
                    <span>订单状态:</span>
                    <span style="margin-left: 50px">已取消</span>
                  </div>
                  <div style="margin-top: 10px">
                    <span>取消原因:</span>
                    <span
                      style="margin-left: 50px"
                      v-show="inventoryInfos.state == 2"
                      >过期未付款</span
                    >
                    <span
                      style="margin-left: 50px"
                      v-show="inventoryInfos.state == 3"
                      >用户自己取消</span
                    >
                  </div>
                </div>
              </div>
            </div>
          </el-col>
          <el-col :span="8">
            <div style="padding: 20px 20px 20px 30px">
              <div style="border-right: 1px solid #f1f1f1; height: 280px">
                <div style="font-size: 14px">支付信息</div>
                <div style="margin-top: 10px">
                  <span>付款类型:</span>
                  <span
                    style="margin-left: 50px"
                    v-show="inventoryInfos.state == 1"
                    >零钱支付</span
                  >
                  <span
                    style="margin-left: 50px"
                    v-show="inventoryInfos.state != 1"
                    >无</span
                  >
                </div>
              </div>
            </div>
          </el-col>
          <el-col :span="8">
            <div style="padding: 20px 20px 20px 30px">
              <div>
                <div style="font-size: 14px">温馨提示</div>
                <div style="margin-top: 10px">
                  <i
                    class="iconfont icon-inventory-attention"
                    title="温馨提示"
                  ></i>
                  <span style="color: #aaaaaa">
                    用户对所生成的订单一经支付，该系统暂不支持退款服务，需租满租赁日期!
                  </span>
                </div>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="inventory-house">
        <div>
          <div class="inventory-info-detail">
            <div style="background-color: #f5f5f5">
              <div style="padding: 10px 0 10px 10px; text-align: center">
                <el-row>
                  <el-col :span="12">
                    <span>商品</span>
                  </el-col>
                  <el-col :span="3">
                    <span>商品编号</span>
                  </el-col>
                  <el-col :span="3">
                    <span>价格</span>
                  </el-col>
                  <el-col :span="3">
                    <span>租赁日期</span>
                  </el-col>
                  <el-col :span="3">
                    <span>操作</span>
                  </el-col>
                </el-row>
              </div>
            </div>
            <div style="border: 2px solid #f5f5f5">
              <el-row>
                <el-col :span="12">
                  <div style="border-right: 2px solid #f5f5f5">
                    <el-row>
                      <el-col :span="6">
                        <img :src="inventoryInfos.img" alt="" />
                      </el-col>
                      <el-col :span="12" style="padding-top: 10px">
                        {{ inventoryInfos.country }} -
                        {{ inventoryInfos.netherlands }} -
                        {{ inventoryInfos.detailNetherlands }} -
                        {{ inventoryInfos.community }}
                        {{ inventoryInfos.houseNumber }} 共{{
                          inventoryInfos.totalFloor
                        }}层
                      </el-col>
                    </el-row>
                  </div>
                </el-col>
                <el-col :span="3">
                  <div style="border-right: 2px solid #f5f5f5; height: 83px">
                    <div style="text-align: center; padding-top: 30px">
                      {{ inventoryInfos.houseId }}
                    </div>
                  </div>
                </el-col>
                <el-col :span="3">
                  <div style="text-align: center; padding-top: 30px">
                    ￥{{ inventoryInfos.quote }}
                  </div>
                </el-col>
                <el-col :span="3">
                  <div style="text-align: center; padding-top: 30px">
                    {{ inventoryInfos.rentalTime }}个月
                  </div>
                </el-col>
                <el-col :span="3">
                  <div style="text-align: center">
                    <div
                      style="color: #ed2553; cursor: pointer; margin-top: 30px"
                      @click="rightNowRental"
                    >
                      <i class="iconfont icon-rightnow-buy"></i> 立即租赁
                    </div>
                  </div>
                </el-col>
              </el-row>
            </div>
          </div>
          <div style="height: 1px; background0color: #f5f5f5"></div>
          <el-row>
            <el-col :span="18">
              <!-- 占位 -->
              <div style="height: 1px"></div>
            </el-col>
            <el-col :span="6">
              <div style="padding: 20px 20px 0 0">
                <div>
                  <el-row>
                    <el-col :span="12"
                      ><span style="float: right">房价总额:</span></el-col
                    >
                    <el-col :span="12"
                      ><span style="float: right"
                        >￥{{ inventoryInfos.quote }}</span
                      ></el-col
                    >
                  </el-row>
                </div>
                <div style="margin-top: 10px">
                  <el-row>
                    <el-col :span="12"
                      ><span style="float: right">押金:</span></el-col
                    >
                    <el-col :span="12"
                      ><span style="float: right"
                        >+￥{{ inventoryInfos.cashPledge }}</span
                      ></el-col
                    >
                  </el-row>
                </div>
                <div style="margin-top: 10px; color: #ed2553">
                  <el-row>
                    <el-col :span="12" style="vertical-align: middle"
                      ><span style="float: right">应付款:</span></el-col
                    >
                    <el-col :span="12"
                      ><span
                        style="
                          float: right;
                          font-size: 20px;
                          font-weight: bolder;
                        "
                        >￥{{ inventoryInfos.totalMoney }}</span
                      ></el-col
                    >
                  </el-row>
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import InventoryNavgationBar from "../../components/InventoryNavgationBar.vue";
import request from "../../network/request";
import * as types from "../../store/mutations-type-string";
export default {
  data() {
    return {
      inventoryInfos: {},
      minutes: "",
      seconds: "",
      houseInfos: {},
    };
  },
  methods: {
    getHouseByHouseId(houseId) {
      request({
        url: "/house/by-houseId",
        params: {
          houseId: houseId,
        },
      }).then((res) => {
        this.houseInfos = res.data.data;
        if (this.houseInfos.houseId == 0 || this.houseInfos.indentState == 1) {
          this.$messge.error("该房源已停止租赁,请浏览其他房源!");
          return;
        }
      });
    },
    rightNowRental() {
      this.getHouseByHouseId(this.inventoryInfos.houseId);
      this.$router.push({
        path: "/inventoryUnDone",
        query: {
          id: this.inventoryInfos.houseId,
        },
      });
    },
    getInventoryById(id) {
      request({
        url: "/indent/indent-inventoryId",
        params: {
          inventoryId: id,
        },
      }).then((res) => {
        this.inventoryInfos = res.data.data;
        let times = this.inventoryInfos.countTime;
        setInterval(() => {
          times -= 1;
          this.minutes = parseInt(times / 60);
          this.seconds = parseInt(times % 60);
          //倒计时结束
          if (this.minutes == 0 && this.seconds == 0) {
            this.getInventoryById(this.inventoryInfos.inventoryId);
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
    cancelIndent() {
      {
        this.$confirm("该操作将导致订单取消, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }).then(() => {
          request({
            url: "/indent/indent-cancel",
            method: "post",
            data: {
              inventoryId: this.inventoryInfos.inventoryId,
              houseId: this.inventoryInfos.houseId,
              state: 3,
            },
          }).then((res) => {
            if (res.data.code == 200) this.$message.success("取消成功");
            this.getInventoryById(this.inventoryInfos.inventoryId);
            this.$store.commit(types.SETCONTINUESTATE, 0);
            this.$store.commit(types.SETRENTALID, 0);
          });
        });
      }
    },
    pay() {
      if (
        parseFloat(this.inventoryInfos.userWallet) <
        parseFloat(this.inventoryInfos.totalMoney)
      ) {
        this.$message.error("余额不足!请前往个人中心充值");
        return;
      }
      console.log("continueState" + this.$store.state.continueState);
      console.log("rentalId" + this.$store.state.rentalId);
      request({
        url: "/house/by-houseId",
        params: {
          houseId: this.inventoryInfos.houseId,
        },
      }).then((res) => {
        if (res.data.data.state == 0 && this.$store.state.continueState != 1) {
          this.$message.error("该房源已下架!不可支付");
          return;
        }
        request({
          url: "/indent/payment",
          method: "post",
          data: {
            inventoryId: this.inventoryInfos.inventoryId,
            continueState: this.$store.state.continueState,
            rentalSituationId: this.$store.state.rentalId,
          },
        }).then((res) => {
          this.$message.success("支付成功!");
          this.$store.commit(types.SETCONTINUESTATE, 0);
          this.$store.commit(types.SETRENTALID, 0);
          console.log("continueState" + this.$store.state.continueState);
          console.log("rentalId" + this.$store.state.rentalId);
          this.getInventoryById(this.inventoryInfos.inventoryId);
        });
      });
    },
  },
  created() {
    this.getInventoryById(this.$route.query.inventoryId);
    console.log(this.inventoryInfos);
  },
  components: { InventoryNavgationBar },
};
</script>

<style>
@import url("../../assets/img/icon/iconfont.css");
@import url("../../assets/css/common.css");
.inventory-done {
  margin: 0 auto;
  width: 1200px;
  padding-bottom: 20px;
}
.inventory-done-crumbs {
  padding: 20px 0 20px 0;
  font-size: 12px;
  color: #666666;
}
.inventory-state {
  margin-top: 20px;
  border-top: 3px solid #71b247;
  background-color: #ffffff;
  color: #aaa;
  font-size: 13px;
  border-bottom: 1px solid #f5f5f5;
}
.inventory-state h3 {
  color: #71b247;
  font-size: 25px;
}
.pay-button {
  width: 100px;
  height: 36px;
  cursor: pointer;
  background-color: #fff;
  color: #ed2553;
  font-weight: bolder;
  border: 1px solid #ed2553;
  margin-bottom: 10px;
}
.pay-button:hover {
  background-color: #ed2553;
  color: #fff;
}
.inventory-process {
  width: 310px;
  height: 12px;
  background: url(//misc.360buyimg.com/user/order/0.0.1/css/i/proce-icons04.png)
    0 0;
  margin-top: 10px;
}
.inventory-info {
  margin-top: 20px;
  background-color: #fff;
  box-shadow: -1px -1px 5px #666666;
  font-size: 13px;
  color: #666666;
}
.inventory-house {
  margin-top: 20px;
  font-size: 13px;
  border: 1px solid #e9e9e9;
  background-color: #fff;
  padding-bottom: 20px;
}
.inventory-info-detail {
  color: #666666;
}
.inventory-info-detail img {
  width: 60px;
  height: 60px;
  padding: 10px 0 10px 30px;
}
</style>