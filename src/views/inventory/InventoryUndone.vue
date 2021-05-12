<template>
  <div class="settle-accounts-main">
    <i
      class="iconfont icon-back2 settle-accounts-back"
      title="返回"
      @click="$router.go(-1)"
    ></i>
    <div style="margin-top: 20px">
      <div style="float: left">
        <img src="../../assets/logo2018.png" alt="" class="logo-img" />
        <span class="settle-accounts-title">结算页</span>
      </div>
      <div style="float: right">
        <el-steps
          :active="1"
          style="width: 400px"
          align-center
          finish-status="success"
        >
          <el-step title="1.填写核对订单信息"></el-step>
          <el-step title="2.成功提交订单"></el-step>
        </el-steps>
      </div>
    </div>
    <div style="margin-top: 120px">
      <div style="font-size: 16px">填写并核对订单信息</div>
      <div class="settle-accounts-list">
        <h3>租赁人信息</h3>
        <div style="margin-left: 20px; padding: 10px 0 10px 0">
          <el-row>
            <el-col :span="4"
              ><span class="rental-user-name"
                ><i class="iconfont icon-done" style="margin-right: 10px"></i
                >{{ user.userName }}</span
              ></el-col
            >
            <el-col :span="20" class="rental-user-info"
              ><div
                @mouseover="retalInfoVisble = true"
                @mouseleave="retalInfoVisble = false"
              >
                <el-row>
                  <el-col :span="2"
                    ><span>{{ user.userName }}</span></el-col
                  >
                  <el-col :span="20"
                    ><span style="margin-left: 20px">{{
                      user.userPhone
                    }}</span></el-col
                  >
                  <el-col :span="2">
                    <div class="edit-user-info">
                      <span
                        v-show="retalInfoVisble"
                        class="edit"
                        @click="editInfoVisble = true"
                        >修改</span
                      >
                    </div></el-col
                  >
                </el-row>
              </div></el-col
            >
          </el-row>
        </div>
        <div class="part-line-1" style="margin-top: 20px"></div>
        <h3>支付方式</h3>
        <div style="margin-left: 20px; padding: 10px 0 10px 0">
          <span class="rental-user-name"
            ><i class="iconfont icon-done" style="margin-right: 10px"></i
            >在线支付</span
          >
        </div>
        <div class="part-line-1" style="margin-top: 20px"></div>
        <h3>房源清单</h3>
        <div style="margin-left: 20px; padding: 10px 0 10px 0">
          <el-row>
            <el-col :span="8"
              ><div class="rental-time">
                <span style="color: #666; font-size: 13px; font-weight: bolder"
                  >租赁天数(单位:月)</span
                >
                <el-radio-group
                  v-model="inventory.rentalTime"
                  fill="#ed2553"
                  style="margin-top: 10px"
                >
                  <el-row :gutter="20">
                    <el-col :span="6"
                      ><el-radio-button label="1">一月</el-radio-button></el-col
                    >
                    <el-col :span="6"
                      ><el-radio-button label="2">二月</el-radio-button></el-col
                    >
                    <el-col :span="6"
                      ><el-radio-button label="3">三月</el-radio-button></el-col
                    >
                    <el-col :span="6"
                      ><el-radio-button label="6">半年</el-radio-button></el-col
                    >
                    <el-col>
                      <el-radio-button label="12">一年</el-radio-button>
                    </el-col>
                  </el-row>
                </el-radio-group>
                <div class="part-line-2" style="margin-top: 20px"></div>
                <div style="margin-top: 10px">
                  <span
                    style="color: #666; font-size: 13px; font-weight: bolder"
                    >天数:</span
                  >
                  <span
                    style="
                      margin-left: 20px;
                      color: #666;
                      font-size: 13px;
                      font-weight: bolder;
                    "
                    >{{ inventory.rentalTime }}月</span
                  >
                </div>
              </div></el-col
            >
            <el-col :span="16"
              ><div class="house-list">
                <span style="color: #666; font-size: 13px; font-weight: bolder"
                  >房源信息</span
                >
                <div style="margin-top: 10px">
                  <el-row>
                    <el-col :span="6"
                      ><div>
                        <img
                          style="height: 100px; width: 150px"
                          :src="houseInfo.img"
                          :alt="houseInfo.community"
                        /></div
                    ></el-col>
                    <el-col :span="18">
                      <el-row>
                        <el-col :span="16">
                          <div>
                            <span
                              style="font-size:13px;font-weight:boldercolor: #666"
                              >{{ houseInfo.netherlands }}-{{
                                houseInfo.detailNetherlands
                              }}-{{ houseInfo.community }}</span
                            >
                          </div>
                          <div
                            style="font-size:13px;font-weight:boldercolor: #666;margin-top:20px"
                          >
                            特色:
                            <span type="info" v-show="houseInfo.balcony == 1"
                              >带阳台,</span
                            >
                            <span type="info" v-show="houseInfo.houseType == 1"
                              >电梯房,</span
                            >
                            <span type="info" v-show="houseInfo.monthPay == 1"
                              >月付,</span
                            >
                            <span type="info" v-show="houseInfo.hardback == 1"
                              >精装修,</span
                            >
                            <span
                              type="info"
                              v-show="houseInfo.homeAppliances == 1"
                              >家电齐全</span
                            >
                          </div>
                        </el-col>
                        <el-col :span="4">
                          <div>
                            <span
                              style="
                                font-size: 13px;
                                font-weight: bolder;
                                color: #ed2553;
                              "
                              >￥{{ houseInfo.quote }}</span
                            >
                          </div>
                        </el-col>
                        <el-col :span="4">
                          <div>
                            <span
                              style="
                                font-size: 13px;
                                font-weight: bolder;
                                color: #666;
                              "
                              >1月</span
                            >
                          </div>
                        </el-col>
                      </el-row>
                    </el-col>
                  </el-row>
                </div>
              </div></el-col
            >
          </el-row>
        </div>
      </div>
      <div style="margin-top: 20px; float: right">
        <div>
          <span style="color: #666; font-size: 13px"
            >租赁<span style="color: #ed2553; margin-left: 10px">{{
              inventory.rentalTime
            }}</span
            >月 ，总金额:
            <span style="color: #ed2553; margin-left: 10px"
              >￥{{ getQuoteMoney }}</span
            >
          </span>
        </div>

        <div style="font-size: 13px; margin-top: 10px; float: right">
          <span style="color: #666">押金:</span>
          <span style="color: #ed2553; margin-left: 10px"
            >￥{{ this.houseInfo.cashPledge }}</span
          >
        </div>
      </div>
      <div class="pay-total-money">
        <el-row>
          <el-col :span="20">
            <div style="height: 1px"></div>
          </el-col>
          <el-col :span="4">
            <div style="font-size: 13px; margin-top: 10px">
              <span style="color: #666">应付金额:</span>
              <span
                style="
                  margin-left: 20px;
                  color: #ed2553;
                  font-weight: bolder;
                  font-size: 20px;
                "
              >
                ￥{{ getTotalMoney }}
              </span>
            </div>
          </el-col>
        </el-row>
      </div>
      <button class="submit-button" @click="submitInventory">提交订单</button>
    </div>
    <el-dialog title="修改" :visible.sync="editInfoVisble" width="40%" center>
      <span>
        <el-form
          :inline="true"
          :model="inventory"
          class="demo-form-inline"
          :rules="rules"
          ref="inventory"
        >
          <el-form-item label="姓名">
            <el-input
              v-model="inventory.rentalName"
              placeholder="姓名"
            ></el-input>
          </el-form-item>
          <el-form-item label="电话" prop="rentalPhone">
            <el-input
              v-model="inventory.rentalPhone"
              placeholder="电话"
            ></el-input>
          </el-form-item>
        </el-form>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editInfoVisble = false">取 消</el-button>
        <el-button type="primary" @click="confirmEdit('inventory')"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import request from "../../network/request";
export default {
  data() {
    let validatePhone = (rule, value, callback) => {
      if (String(value) === "") {
        callback(new Error("请输入电话号码"));
      } else if (String(value).length != 11) {
        callback(new Error("请输入正确的电话号码"));
      } else {
        callback();
      }
    };
    return {
      houseInfo: {},
      user: {},
      retalInfoVisble: false,
      inventory: {
        inventoryId: "",
        rentalName: sessionStorage.getItem("name"),
        userId: sessionStorage.getItem("id"),
        payType: "1",
        houseId: this.$route.query.id,
        rentalMoney: "",
        cashPledge: "",
        totalMoney: "",
        rentalPhone: "",
        rentalTime: "1",
        continueState:0,
      },
      editInfoVisble: false,
      rules: {
        rentalPhone: [
          { required: true, validator: validatePhone, trigger: "blur" },
        ],
      },
    };
  },
  computed: {
    getTotalMoney() {
      return (
        parseInt(this.houseInfo.quote) * parseInt(this.inventory.rentalTime) +
        parseInt(this.houseInfo.cashPledge)
      );
    },
    getQuoteMoney() {
      return (
        parseInt(this.houseInfo.quote) * parseInt(this.inventory.rentalTime)
      );
    },
  },
  methods: {
    getHouseInfoById(val) {
      request({
        url: "/house/by-houseId",
        params: {
          houseId: val,
        },
      }).then((res) => {
        this.houseInfo = res.data.data;
      });
    },
    getUserInfo() {
      request({
        url: "/user/user-id",
        params: {
          id: sessionStorage.getItem("id"),
        },
      }).then((res) => {
        this.user = res.data.data;
        this.inventory.rentalPhone = this.user.userPhone;
      });
    },
    submitInventory() {
      this.inventory.cashPledge = this.houseInfo.cashPledge;
      this.inventory.rentalMoney = this.houseInfo.quote;
      this.inventory.totalMoney =
        parseInt(this.houseInfo.quote) * parseInt(this.inventory.rentalTime) +
        parseInt(this.houseInfo.cashPledge);
      this.inventory.inventoryId = this.random_No(5); //生成订单号
      request({
        url: "/indent",
        method: "post",
        data: {
          inventoryId: this.inventory.inventoryId,
          rentalName: this.inventory.rentalName,
          userId: this.inventory.userId,
          payType: this.inventory.payType,
          houseId: this.inventory.houseId,
          rentalMoney: this.inventory.rentalMoney,
          cashPledge: this.inventory.cashPledge,
          totalMoney: this.inventory.totalMoney,
          rentalPhone: this.inventory.rentalPhone,
          rentalTime: this.inventory.rentalTime,
        },
      }).then((res) => {
        this.$router.push({
          path: "/inventoryPay",
          query: {
            inventoryId: this.inventory.inventoryId,
            continueState:this.continueState,
            rentalSituationId:this.$route.query.rentalSituationId
          },
        });
      });
    },
    random_No(randomLen) {
      var random_no = "";
      for (var i = 0; i < randomLen; i++) {
        random_no += Math.floor(Math.random() * 10);
      }
      random_no = new Date().getTime() + random_no;
      return random_no;
    },
    confirmEdit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.editInfoVisble = false;
          this.user.userName = this.inventory.rentalName;
          this.user.userPhone = this.inventory.rentalPhone;
        } else {
          this.$message.error("未填写正确");
          return false;
        }
      });
    },
  },
  created() {
    this.getUserInfo();
    this.getHouseInfoById(this.$route.query.id);
    if(this.$route.query.continueState == 1){
      this.continueState = 1;
    }
  },
};
</script>

<style>
@import url("../../assets/css/common.css");
@import url("../../assets/img/icon/iconfont.css");
.settle-accounts-main {
  margin: 0 auto;
  width: 1100px;
  margin-top: 20px;
}
.settle-accounts-list {
  background-color: #fff;
  padding: 0 20px;
  border: 1px solid #f0f0f0;
  margin-top: 10px;
}
.settle-accounts-list h3 {
  font-size: 14px;
}
.logo-img {
  width: 100px;
  height: 70px;
  vertical-align: middle;
}
.settle-accounts-back {
  cursor: pointer;
}
.settle-accounts-title {
  font-size: 22px;
  color: #666666;
  margin-left: 30px;
}
.rental-user-info {
  color: #666666;
  padding: 5px 0 5px 20px;
  font-size: 13px;
  cursor: pointer;
}
.rental-user-info:hover {
  background-color: #f7f0f2;
}
.rental-user-name {
  padding: 5px 40px 5px 30px;
  border: 2px solid #ed2553;
  font-size: 13px;
}
.edit-user-info {
  font-size: 13px;
  color: #005ea7;
  margin-right: 10px;
}
.edit:hover {
  color: #ed2553;
}
.rental-time {
  padding: 10px;
  background-color: #f2f2f2;
}
.house-list {
  padding: 10px;
  height: 183px;
  background-color: #f3fbfe;
}
.pay-total-money {
  background-color: #f4f4f4;
  margin-top: 100px;
  padding: 10px 0 10px 0;
  margin-bottom: 20px;
}
.submit-button {
  width: 135px;
  height: 36px;
  cursor: pointer;
  background-color: #ed2553;
  color: #fff;
  font-weight: bolder;
  border: 1px solid #fff;
  margin-bottom: 10px;
  float: right;
}
</style>