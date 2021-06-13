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
            <img src="../../assets/img/logo1.png" alt="" class="logo-img" /></div
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
      <el-tabs type="border-card" @tab-click="statusClick">
        <el-tab-pane label="进行中">
          <div
            v-for="item in rentalSituationVos"
            :key="item.houseId"
            style="margin-top: 20px"
          >
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
                  <div @click="houseDetail(item.houseId)">
                    <el-row>
                      <el-col :span="5">
                        <img
                          :src="item.img"
                          alt=""
                          style="padding: 10px; width: 120px; height: 70px"
                        />
                      </el-col>
                      <el-col :span="19" style="padding-top: 30px">
                        {{ item.country }} - {{ item.netherlands }} -
                        {{ item.detailNetherlands }} - {{ item.community
                        }}{{ item.houseNumber }} 共{{ item.totalFloor }}层
                      </el-col>
                    </el-row>
                  </div>
                </el-col>
                <el-col :span="4" style="text-align: center">
                  <div>
                    <button
                      class="quit-rental"
                      @click="
                        surrender(
                          item.houseId,
                          item.rentalSituationId,
                          item.inventoryId
                        )
                      "
                    >
                      退租
                    </button>
                  </div>
                  <div>
                    <button
                      class="continue-rental"
                      @click="continueRental(item.houseId,item.rentalSituationId)"
                    >
                      续租
                    </button>
                  </div>
                </el-col>
              </el-row>
            </div>
          </div>
          <div
            style="margin-top: 20px; text-align: center"
            v-show="rentalSituationVos.length == 0"
          >
            <span style="color: #666; font-size: 13px">暂无数据</span>
          </div>
          <div style="float: right">
            <el-pagination
              @current-change="handleCurrentChange"
              background
              layout="prev, pager, next"
              :current-page.sync="currentPage"
              :total="total"
              style="margin-top: 20px"
              :page-size="pageSize"
            >
            </el-pagination>
          </div>
        </el-tab-pane>
        <el-tab-pane label="已完成">
          <div
            v-for="item in rentalSituationVos"
            :key="item.houseId"
            style="margin-top: 20px"
          >
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
                  <div @click="houseDetail(item.houseId)">
                    <el-row>
                      <el-col :span="5">
                        <img
                          :src="item.img"
                          alt=""
                          style="padding: 10px; width: 120px; height: 70px"
                        />
                      </el-col>
                      <el-col :span="19" style="padding-top: 30px">
                        {{ item.country }} - {{ item.netherlands }} -
                        {{ item.detailNetherlands }} - {{ item.community
                        }}{{ item.houseNumber }} 共{{ item.totalFloor }}层
                      </el-col>
                    </el-row>
                  </div>
                </el-col>
                <el-col :span="4" style="text-align: center">
                  <div style="color: #ed2553; margin-top: 30px">
                    <span
                      style="cursor: pointer"
                      @click="rentalRightNow(item.houseId)"
                      ><i class="iconfont icon-rightnow-buy"></i> 立即租赁</span
                    >
                  </div>
                  <div style="margin-top: 10px">
                    <span
                      style="cursor: pointer; color: rgb(253, 168, 30)"
                      @click="comment(item.houseId)"
                    >
                      <i class="iconfont icon-comment"></i>
                      评价</span
                    >
                  </div>
                </el-col>
              </el-row>
            </div>
          </div>
          <div
            style="margin-top: 20px; text-align: center"
            v-show="rentalSituationVos.length == 0"
          >
            <span style="color: #666; font-size: 13px">暂无数据</span>
          </div>
          <div style="float: right">
            <el-pagination
              background
              @current-change="handleCurrentChange"
              layout="prev, pager, next"
              :current-page.sync="currentPage"
              :total="total"
              style="margin-top: 20px"
              :page-size="pageSize"
            >
            </el-pagination>
          </div>
          <el-dialog
            title="评价"
            :visible.sync="commentVisible"
            width="30%"
            center
          >
            <div>
              <el-row>
                <el-col :span="6"><span>体验分数:</span></el-col>
                <el-col :span="18"
                  ><el-rate
                    v-model="experienceScore"
                    :colors="['#99A9BF', '#F7BA2A', '#FF9900']"
                    show-text
                  >
                  </el-rate
                ></el-col>
              </el-row>
            </div>
            <div style="margin-top: 10px">
              <el-row>
                <el-col :span="6"><span>服务分数:</span></el-col>
                <el-col :span="18"
                  ><el-rate
                    v-model="serviceScore"
                    :colors="['#99A9BF', '#F7BA2A', '#FF9900']"
                    show-text
                  >
                  </el-rate
                ></el-col>
              </el-row>
            </div>
            <el-input
              type="textarea"
              :autosize="{ minRows: 2, maxRows: 4 }"
              placeholder="可从多角度评论，方便给想租赁的用户更好的帮助"
              v-model="commentText"
              style="margin-top: 10px"
            >
            </el-input>
            <span slot="footer" class="dialog-footer">
              <el-button @click="commentVisible = false">取 消</el-button>
              <el-button type="primary" @click="confirmComment"
                >确 定</el-button
              >
            </span>
          </el-dialog>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import request from "../../network/request";
export default {
  data() {
    return {
      userName: sessionStorage.getItem("name"),
      commentVisible: false,
      experienceScore: null,
      serviceScore: null,
      commentText: "",
      rentalSituationVos: [],
      total: 0,
      currentPage: 1,
      pageSize: 2,
      state: 1,
      hosueId: "",
      houseInfos:{}
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
    comment(houseId) {
      this.commentVisible = true;
      this.houseId = houseId;
      this.experienceScore = null;
      this.serviceScore = null;
      this.commentText = "";
    },
    confirmComment() {
      this.commentVisible = false;
      request({
        url: "/comment",
        method: "post",
        data: {
          userId: sessionStorage.getItem("id"),
          houseId: this.houseId,
          experienceScore: this.experienceScore,
          serviceScore: this.serviceScore,
          content: this.commentText,
        },
      }).then((res) => {
        console.log();
        if (res.data.code == "200") {
          this.$message.success("评价成功!");
          this.commentVisible = false;
        }
      });
    },
    getHouseByHouseId(houseId) {
      request({
        url: "/house/by-houseId",
        params: {
          houseId: houseId,
        },
      }).then((res) => {
        this.houseInfos = res.data.data;
        if(this.houseInfos.houseId == 0 || this.houseInfos.indentState == 1){
          this.$messge.error("该房源已停止租赁,请浏览其他房源!")
          return
        }
      });
    },
    rentalRightNow(houseId) {
      this.getHouseByHouseId(houseId)
      this.$router.push({
        path: "/inventoryUnDone",
        query: {
          id: houseId,
        },
      });
    },
    getRentalSituation(state, page) {
      request({
        url: "/rental_situation",
        params: {
          id: sessionStorage.getItem("id"),
          state: state,
          page: page,
          pageSize: this.pageSize,
        },
      }).then((res) => {
        this.rentalSituationVos = res.data.data;
        this.currentPage = res.data.currentPage;
        this.total = res.data.total;
        console.log(this.rentalSituationVos);
      });
    },
    handleCurrentChange(val) {
      this.getRentalSituation(this.state, val);
    },
    statusClick(val) {
      if (val.index == 0) {
        console.log('进行中');
        this.state = 1;
        this.getRentalSituation(1, 1);
      } else {
        console.log('已完成');
        this.state = 0;
        this.getRentalSituation(0, 1);
      }
    },
    surrender(houseId, rentalSituationId, inventoryId) {
      this.$confirm(
        "用户退租时入住不满整月的费用要按整月计算, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(() => {
          request({
            url: "/rental_situation/surrender",
            method: "post",
            data: {
              userId: sessionStorage.getItem("id"),
              houseId: houseId,
              rentalSituationId: rentalSituationId,
              inventoryId: inventoryId,
              state:3
            },
          }).then((res) => {
            this.$message.success("退租成功");
            this.getRentalSituation(1, 1);
          });
        })
        .catch(() => {});
    },
    continueRental(houseId,rentalSituationId) {
      this.$router.push({
        path: "/inventoryUnDone",
        query: {
          id: houseId,
          continueState:1,
          rentalSituationId:rentalSituationId
        },
      });
    },
  },
  created() {
    this.getRentalSituation(1, 1);
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
  width: 80px;
  height: 80px;
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