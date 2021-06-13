<template>
  <div class="inventory-main">
    <div style="width: 1200px; margin: 0 auto">
      <div v-if="!isLogin">
        <div style="padding-top: 10px; padding-bottom: 10px">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item class="el-icon-location"
              >我的</el-breadcrumb-item
            >
            <el-breadcrumb-item>收藏</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <div class="tab-card">
          <div class="tab-text">房源收藏</div>
        </div>
        <div>
          <div style="margin-top: 20px">
            <el-col
              :span="6"
              v-for="item in houseInfos"
              :key="item.houseId"
              style="margin-left: 40px; float: left; margin-top: 20px"
            >
              <el-card :body-style="{ padding: '0px', height: '330px' }">
                <div v-popover:popover>
                  <router-link
                    :to="{
                      path: '/houseRentalMain/detailHouse',
                      query: { houseId: item.houseId },
                    }"
                  >
                    <img :src="item.img" class="home-img-card" />
                  </router-link>
                  <div style="padding: 0px">
                    <div>
                      <h3 style="font-size: 18px" class="div-line txt">
                        {{ item.community }} {{ item.floor }}楼
                      </h3>
                      <span
                        style="
                          color: red;
                          font-size: 20px;
                          display: inline-block;
                        "
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
                      <i
                        style="float: right; color: red; font-size: 25px;cursor: pointer;"
                        class="el-icon-delete"
                        @click="deleteCollection(item.houseId)"
                      ></i>
                    </div>
                  </div>
                </div>
              </el-card>
            </el-col>
          </div>
        </div>
      </div>
      <div v-else>
        <div style="padding-top: 10px; padding-bottom: 10px">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item class="el-icon-location"
              >我的</el-breadcrumb-item
            >
            <el-breadcrumb-item>收藏</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <div class="tab-card">
          <div class="tab-text">房源收藏</div>
        </div>
        <div style="margin-top: 200px; text-align: center">
          <el-button
            type="danger"
            plain
            style="width: 300px; height: 60px"
            @click="login"
            >请登录</el-button
          >
        </div>
        <div style="height: 250px"></div>
      </div>
    </div>
    
  </div>
</template>

<script>
import request from "../../network/request";
export default {
  data() {
    return {
      houseInfos: {},
      isLogin: sessionStorage.getItem('uToken') == null,
      visible: false,
    };
  },
  methods: {
     getUserInfo(val) {
      request({
        url: "/user/user-id",
        params: {
          id: val,
        },
      }).then((res) => {
         if (res.data.msg == "NoUser" || res.data.code == "000004") {
           this.isLogin = true
           return
         }
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
    login() {
      this.$router.push("/login");
    },
    deleteCollection(val) {
      this.$confirm("是否删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          request({
            url: "/collection",
            method: "delete",
            data: {
              houseId: val,
            },
          }).then((res) => {
            this.$message({
              type: "success",
              message: "删除成功!",
            });
            this.getCollection();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    getCollection() {
      request({
        url: "/collection",
        params: {
          userId: sessionStorage.getItem("id"),
        },
      }).then((res) => {
        this.houseInfos = res.data.data;
      });
    },
  },
  created() {
    this.getCollection();
    this.getUserInfo(sessionStorage.getItem('id'))
  },
};
</script>

<style>
@import url("../../assets/img/icon/iconfont.css");
@import url("../../assets/css/home.css");
.inventory-main {
  background-color: #f2f2f2;
}
.tab-card {
  margin-top: 20px;
  background-color: white;
  border-bottom: 2px solid #ee3843;
}
.tab-text {
  width: 100px;
  font-size: 18px;
  text-align: center;
  background-color: #ee3843;
  color: white;
  padding-top: 10px;
  padding-bottom: 10px;
}
</style>