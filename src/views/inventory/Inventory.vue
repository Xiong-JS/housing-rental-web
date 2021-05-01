<template>
  <div class="inventory-mian">
    <div class="inventory-list">
      <inventory-navgation-bar></inventory-navgation-bar>
      <div class="inventory-title">我的订单</div>
      <div style="background-color: #f5f5f5; height: 100%">
        <div class="inventory-info-list">
          <el-tabs type="border-card" @tab-click="stateClick">
            <el-tab-pane label="全部订单">
              <div class="inventory-status-bar">
                <el-row>
                  <el-col :span="4"
                    ><el-dropdown
                      @command="allInventoryDateCommand"
                      size="small"
                      style="margin-left: 20px"
                    >
                      <span class="el-dropdown-link">
                        {{ allDateCommandText
                        }}<i class="el-icon-arrow-down el-icon--right"></i>
                      </span>
                      <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="0">全部</el-dropdown-item>
                        <el-dropdown-item command="1"
                          >近三个月</el-dropdown-item
                        >
                        <el-dropdown-item command="2">近一年</el-dropdown-item>
                      </el-dropdown-menu>
                    </el-dropdown></el-col
                  >
                  <el-col :span="8" style="text-align: center"
                    ><span class="status-bar-text">订单详情</span></el-col
                  >
                  <el-col :span="3" style="text-align: center"
                    ><span class="status-bar-text">租赁人</span></el-col
                  >
                  <el-col :span="3" style="text-align: center"
                    ><span class="status-bar-text">金额</span></el-col
                  >
                  <el-col :span="3" style="text-align: center"
                    ><span class="status-bar-text"
                      ><el-dropdown
                        @command="allInventoryStateCommand"
                        size="small"
                      >
                        <span class="el-dropdown-link">
                          {{ allStateCommandText
                          }}<i class="el-icon-arrow-down el-icon--right"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                          <el-dropdown-item command="4"
                            >全部状态</el-dropdown-item
                          >
                          <el-dropdown-item command="0"
                            >等待付款</el-dropdown-item
                          >
                          <el-dropdown-item command="1"
                            >已完成</el-dropdown-item
                          >
                          <el-dropdown-item command="2"
                            >已取消</el-dropdown-item
                          >
                        </el-dropdown-menu>
                      </el-dropdown></span
                    ></el-col
                  >
                  <el-col :span="3" style="text-align: center"
                    ><span class="status-bar-text">操作</span></el-col
                  >
                </el-row>
              </div>
              <inventory-card :datas="inventoryInfosVo"></inventory-card>
              <div style="float: right">
                <el-pagination
                  @current-change="handleCurrentChange"
                  :current-page.sync="currentPage"
                  :page-size="2"
                  layout="total, prev, pager, next"
                  :total="total"
                  background
                  style="margin-top: 10px"
                >
                </el-pagination>
              </div>
            </el-tab-pane>
            <el-tab-pane label="待付款">
              <div class="inventory-status-bar">
                <el-row>
                  <el-col :span="4"
                    ><span style="margin-left: 20px" class="status-bar-text"
                      >日期</span
                    ></el-col
                  >
                  <el-col :span="8" style="text-align: center"
                    ><span class="status-bar-text">订单详情</span></el-col
                  >
                  <el-col :span="3" style="text-align: center"
                    ><span class="status-bar-text">租赁人</span></el-col
                  >
                  <el-col :span="3" style="text-align: center"
                    ><span class="status-bar-text">金额</span></el-col
                  >
                  <el-col :span="3" style="text-align: center"
                    ><span class="status-bar-text"> 状态 </span></el-col
                  >
                  <el-col :span="3" style="text-align: center"
                    ><span class="status-bar-text">操作</span></el-col
                  >
                </el-row>
              </div>
              <inventory-card
                :datas="inventoryInfosVo"
              ></inventory-card>
              <div style="float: right">
                <el-pagination
                  @current-change="handleCurrentChange"
                  :current-page.sync="currentPage"
                  :page-size="2"
                  layout="total, prev, pager, next"
                  :total="total"
                  background
                  style="margin-top: 10px"
                >
                </el-pagination>
              </div>
            </el-tab-pane>
            <el-tab-pane label="已完成">
              <div class="inventory-status-bar">
                <el-row>
                  <el-col :span="4"
                    ><el-dropdown
                      @command="finishedInventoryDateCommand"
                      size="small"
                      style="margin-left: 20px"
                    >
                      <span class="el-dropdown-link">
                        {{ finishedDateCommandText
                        }}<i class="el-icon-arrow-down el-icon--right"></i>
                      </span>
                      <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="0">全部</el-dropdown-item>
                        <el-dropdown-item command="1"
                          >近三个月</el-dropdown-item
                        >
                        <el-dropdown-item command="2">近一年</el-dropdown-item>
                      </el-dropdown-menu>
                    </el-dropdown></el-col
                  >
                  <el-col :span="8" style="text-align: center"
                    ><span class="status-bar-text">订单详情</span></el-col
                  >
                  <el-col :span="3" style="text-align: center"
                    ><span class="status-bar-text">租赁人</span></el-col
                  >
                  <el-col :span="3" style="text-align: center"
                    ><span class="status-bar-text">金额</span></el-col
                  >
                  <el-col :span="3" style="text-align: center"
                    ><span class="status-bar-text"
                      ><el-dropdown
                        @command="finishedInventoryStateCommand"
                        size="small"
                      >
                        <span class="el-dropdown-link">
                          {{ finishedStateCommandText
                          }}<i class="el-icon-arrow-down el-icon--right"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                          <el-dropdown-item command="4"
                            >全部状态</el-dropdown-item
                          >
                          <el-dropdown-item command="1"
                            >已完成</el-dropdown-item
                          >
                          <el-dropdown-item command="2"
                            >已取消</el-dropdown-item
                          >
                        </el-dropdown-menu>
                      </el-dropdown></span
                    ></el-col
                  >
                  <el-col :span="3" style="text-align: center"
                    ><span class="status-bar-text">操作</span></el-col
                  >
                </el-row>
              </div>
              <inventory-card :datas="inventoryInfosVo"></inventory-card>
              <div style="float: right">
                <el-pagination
                  @current-change="handleCurrentChange"
                  :current-page.sync="currentPage"
                  :page-size="2"
                  layout="total, prev, pager, next"
                  :total="total"
                  background
                  style="margin-top: 10px"
                >
                </el-pagination>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import InventoryNavgationBar from "../../components/InventoryNavgationBar.vue";
import InventoryCard from "./InventoryCard.vue";
import request from "../../network/request";
export default {
  data() {
    return {
      userName: localStorage.getItem("name"),
      allDateCommandText: "全部",
      finishedDateCommandText: "全部",
      allStateCommandText: "全部状态",
      finishedStateCommandText: "全部状态",
      deleteVisble: "",
      inventoryInfosVo: [],
      dateStatus: 0,
      indentStatus: 4,
      state: 4,
      total: 0,
      currentPage: 0,
    };
  },
  methods: {
    allInventoryDateCommand(command) {
      if (command == 0) {
        this.dateStatus = 0
        this.allDateCommandText = "全部";
        this.getInventoryInfosVo(1);
      } else if (command == 1) {
        this.dateStatus = 1
        this.allDateCommandText = "近三个月";
        this.getInventoryInfosVo(1)
      } else if (command == 2) {
        this.dateStatus = 2
        this.allDateCommandText = "近一年";
        this.getInventoryInfosVo(1)
      }
    },
    finishedInventoryDateCommand(command) {
      if (command == 0) {
        this.finishedDateCommandText = "全部";
        this.dateStatus = 0
        this.getInventoryInfosVo(1);
      } else if (command == 1) {
        this.finishedDateCommandText = "近三个月";
        this.dateStatus = 1
        this.getInventoryInfosVo(1);
      } else if (command == 2) {
        this.finishedDateCommandText = "近一年";
        this.dateStatus = 2
        this.getInventoryInfosVo(1);
      }
    },

    allInventoryStateCommand(command) {
      this.indentStatus = command
      if (command == 4) {
        this.allStateCommandText = "全部状态";
        this.getInventoryInfosVo(1)
      } else if (command == 0) {
        this.allStateCommandText = "等待付款";
        this.getInventoryInfosVo(1)
      } else if (command == 1) {
        this.allStateCommandText = "已完成";
        this.getInventoryInfosVo(1)
      } else {
        this.allStateCommandText = "已取消";
        this.getInventoryInfosVo(1)
      }
    },
    finishedInventoryStateCommand(command) {
      this.indentStatus = command
      if (command == 4) {
        this.finishedStateCommandText = "全部状态";
        this.getInventoryInfosVo(1)
      } else if (command == 1) {
        this.finishedStateCommandText = "已完成";
        this.getInventoryInfosVo(1)
      } else {
        this.finishedStateCommandText = "已取消";
        this.getInventoryInfosVo(1)
      }
    },
    getInventoryInfosVo(page) {
      request({
        url: "/indent/getInventoryInfos",
        params: {
          dateStatus: this.dateStatus,
          indentStatus: this.indentStatus,
          state: this.state,
          page: page,
          pageSize: 2,
        },
      }).then((res) => {
        this.inventoryInfosVo = res.data.data;
        this.total = res.data.total;
        this.currentPage = res.data.currentPage;
      });
    },
    stateClick(val) {
      if (val.index == 0) {
        this.state = 4;
        this.allDateCommandText = "全部";
        this.allStateCommandText = "全部状态";
        this.indentStatus = 4;
        this.dateStatus = 0;
        this.getInventoryInfosVo(1);
      } else if (val.index == 1) {
        this.state = 0;
        this.indentStatus = 4;
        this.dateStatus = 0;
        this.getInventoryInfosVo(1);
      } else {
        this.state = 1;
        this.finishedDateCommandText = "全部";
        this.finishedStateCommandText = "全部状态";
        this.indentStatus = 4;
        this.dateStatus = 0;
        this.getInventoryInfosVo(1);
      }
    },
    handleCurrentChange(val){
      this.getInventoryInfosVo(val)
    }
  },
  components: {
    InventoryCard,
    InventoryNavgationBar,
  },
  created() {
    this.getInventoryInfosVo(1);
  },
};
</script>

<style>
@import url("../../assets/img/icon/iconfont.css");
@import url("../../assets/css/common.css");
.inventory-mian {
  background-color: #f5f5f5;
  height: 100%;
  width: 100%;
  position: absolute;
}
.inventory-list {
  margin: 0 auto;
  width: 1200px;
}

.inventory-title {
  margin-top: 20px;
  padding: 20px 0 20px 20px;
  font-size: 12px;
  font-weight: bolder;
  background-color: white;
}
.inventory-info-list {
  background-color: white;
  padding: 20px 20px 20px 20px;
  margin-top: 20px;
}
.inventory-status-bar {
  padding: 10px 10px 10px 20px;
  background-color: #f5f5f5;
}
.el-dropdown-link {
  cursor: pointer;
  font-size: 13px;
  color: #666666;
}
.status-bar-text {
  font-size: 13px;
  color: #666666;
}
.inventory-info-detail {
  margin-top: 20px;
  font-size: 13px;
  color: #aaaaaa;
}
.inventory-info-detail img {
  width: 60px;
  height: 60px;
  padding: 10px 0 10px 30px;
}
.inventory-detail {
  color: #666666;
  cursor: pointer;
}
.inventory-detail:hover {
  color: #ed2553;
}
</style>