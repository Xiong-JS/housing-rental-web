<template>
  <div
    style="
      background-color: #f5f5f5;
      position: absolute;
      height: 100%;
      width: 100%;
    "
  >
    <div class="rental-situation">
      <el-row>
        <el-col :span="12"
          ><div>
            <img src="../../assets/logo2018.png" alt="" class="logo-img" /></div
        ></el-col>
        <el-col :span="12">
          <div class="nav-bar">
            <span class="inventory-name">{{ userName }}</span
            >| <span class="inventory-home" @click="homeClick">首页</span>
          </div></el-col
        >
      </el-row>
      <div class="my-rental-situation-title">租赁情况</div>
      <el-breadcrumb
        separator-class="el-icon-arrow-right"
        style="padding: 20px 0 20px 0"
      >
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>租赁情况</el-breadcrumb-item>
      </el-breadcrumb>
      <el-tabs type="border-card">
        <el-tab-pane label="进行中">
          <div v-for="item in 2" :key="item" style="margin-top:20px">
            <el-row class="rental-situation-status">
              <el-col :span="20">
                <div>房源信息</div>
              </el-col>
              <el-col :span="4">
                <div>操作</div>
              </el-col>
            </el-row>
            <div
              class="rental-situation-info"
              style="border: 1px solid #f5f5f5"
            >
              <el-row>
                <el-col
                  :span="20"
                  style="
                    border-right: 1px solid #f5f5f5;
                    cursor: pointer;
                    height: 102px;
                  "
                >
                  <div @click="houseDetail(1)">
                    <el-row>
                      <el-col :span="5">
                        <img
                          src="../../assets/img/3.jpg"
                          alt=""
                          style="padding: 10px; width: 120px; height: 70px"
                        />
                      </el-col>
                      <el-col :span="19" style="padding-top: 30px">
                        重庆 - 南岸 - 南坪东路 - 碧家国际社区（南滨路店）15-2
                        共30层
                      </el-col>
                    </el-row>
                  </div>
                </el-col>
                <el-col :span="4" style="text-align: center">
                  <div>
                    <button class="quit-rental">退租</button>
                  </div>
                  <div>
                    <button class="continue-rental">续租</button>
                  </div>
                </el-col>
              </el-row>
            </div>
          </div>
          <div style="float: right">
            <el-pagination
              background
              layout="prev, pager, next"
              :total="1000"
              style="margin-top: 20px"
              :page-size="100"
            >
            </el-pagination>
          </div>
        </el-tab-pane>
        <el-tab-pane label="已完成">
          <div v-for="item in 2" :key="item" style="margin-top:20px">
            <el-row class="rental-situation-status">
              <el-col :span="20">
                <div>房源信息</div>
              </el-col>
              <el-col :span="4">
                <div>操作</div>
              </el-col>
            </el-row>
            <div
              class="rental-situation-info"
              style="border: 1px solid #f5f5f5"
            >
              <el-row>
                <el-col
                  :span="20"
                  style="
                    border-right: 1px solid #f5f5f5;
                    cursor: pointer;
                    height: 102px;
                  "
                >
                  <div @click="houseDetail(1)">
                    <el-row>
                      <el-col :span="5">
                        <img
                          src="../../assets/img/3.jpg"
                          alt=""
                          style="padding: 10px; width: 120px; height: 70px"
                        />
                      </el-col>
                      <el-col :span="19" style="padding-top: 30px">
                        重庆 - 南岸 - 南坪东路 - 碧家国际社区（南滨路店）15-2
                        共30层
                      </el-col>
                    </el-row>
                  </div>
                </el-col>
                <el-col :span="4" style="text-align: center">
                  <div style="color: #ed2553;  margin-top: 20px">
                    <span style="cursor: pointer;"><i class="iconfont icon-rightnow-buy"></i> 立即租赁</span>
                  </div>
                  <div>
                    <button class="continue-rental">续租</button>
                  </div>
                </el-col>
              </el-row>
            </div>
          </div>
          <div style="float: right">
            <el-pagination
              background
              layout="prev, pager, next"
              :total="1000"
              style="margin-top: 20px"
              :page-size="100"
            >
            </el-pagination>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userName: localStorage.getItem("name"),
    };
  },
  methods: {
    homeClick() {
      this.$router.push("/");
    },
    houseDetail(val) {
      this.$router.push({
        path: "/houseRentalMain/detailHouse",
        query: {
          houseId: val,
        },
      });
    },
  },
};
</script>

<style>
@import url("../../assets/img/icon/iconfont.css");
.rental-situation {
  margin: 0 auto;
  width: 1200px;
}
.my-rental-situation-title {
  margin-top: 20px;
  padding: 20px 0 20px 20px;
  font-size: 12px;
  font-weight: bolder;
  background-color: white;
}
.logo-img {
  width: 120px;
  height: 70px;
  vertical-align: middle;
}
.nav-bar {
  float: right;
  font-size: 13px;
  color: #666666;
}
.inventory-home {
  margin: 0 10px 0 10px;
  cursor: pointer;
}
.inventory-home:hover,
.inventory-name:hover {
  color: #ed2553;
}
.inventory-name {
  margin-right: 10px;
  cursor: pointer;
}
.rental-situation-status {
  background-color: #f5f5f5;
  font-size: 13px;
  padding: 10px;
  text-align: center;
}
.rental-situation-info {
  color: #666666;
  font-size: 13px;
}
.quit-rental {
  width: 80px;
  height: 26px;
  font-size: 13px;
  cursor: pointer;
  background-color: #fff;
  color: #ed2553;
  font-weight: bolder;
  border: 1px solid #ed2553;
  margin-bottom: 10px;
  margin-top: 20px;
}
.quit-rental:hover {
  background-color: #ed2553;
  color: #fff;
}
.continue-rental {
  width: 80px;
  height: 26px;
  font-size: 13px;
  cursor: pointer;
  background-color: #fff;
  color: #71b247;
  font-weight: bolder;
  border: 1px solid #71b247;
  margin-bottom: 10px;
  margin-top: 10px;
}
.continue-rental:hover {
  background-color: #71b247;
  color: #fff;
}
</style>