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
          <span class="rental-user-name"
            ><i class="iconfont icon-done" style="margin-right: 10px"></i
            >{{ user.userName }}</span
          >
          <div
            class="div-line rental-user-info"
            @mouseover="retalInfoVisble = true"
            @mouseleave="retalInfoVisble = false"
          >
            <span>{{ user.userName }}</span
            ><span style="margin-left: 20px">{{ user.userPhone }}</span>
            <div class="div-line edit-user-info">
              <span v-show="retalInfoVisble" class="edit">修改</span>
            </div>
          </div>
        </div>
        <div class="part-line-1" style="margin-top: 20px"></div>
        <h3>支付方式</h3>
        <div style="margin-left: 20px; padding: 10px 0 10px 0">
          <span class="rental-user-name"
            ><i class="iconfont icon-done" style="margin-right: 10px"></i
            >在线支付</span
          >
        </div>
        <div class="part-line-1" style="margin-top:20px"></div>
        <h3>房源清单</h3>
        <div style="margin-left: 20px; padding: 10px 0 10px 0">
          <div class="rental-time">

          </div>
          <div class="house-list div-line">

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
      houseInfo: {},
      user: {},
      retalInfoVisble: false,
      inventory: {
        inventoryId: "",
        rentalName: localStorage.getItem("name"),
        userId: localStorage.getItem("id"),
        payType: "1",
        houseId: this.$route.query.id,
        rentalMoney: "",
        cashPledge: "",
        totalMoney: "",
        rentalPhone: "",
      },
    };
  },
  computed:{
    getTotalMoney(){
      return parseInt(this.houseInfo.quote)  + parseInt(this.houseInfo.cashPledge) 
    }
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
          id: localStorage.getItem("id"),
        },
      }).then((res) => {
        this.user = res.data.data;
      });
    },
  },
  created() {
    this.getUserInfo();
    this.getHouseInfoById(this.$route.query.id);
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
  padding-left: 700px;
  margin-right: 10px;
}
.edit:hover {
  color: #ed2553;
}
.rental-time{
  width: 350px;
  padding: 10px;
  background-color: #f2f2f2;
}
.house-list{
  width: 600px;
  padding: 10px;
  background-color: #f3fbfe;
}
</style>