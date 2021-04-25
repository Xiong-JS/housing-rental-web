<template>
  <div class="inventory-mian">
    <div class="inventory-list">
      <inventory-navgation-bar></inventory-navgation-bar>
      <div class="inventory-title">我的订单</div>
      <div style="background-color: #f5f5f5; height: 100%">
        <div class="inventory-info-list">
          <el-tabs type="border-card">
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
                          <el-dropdown-item command="0"
                            >全部状态</el-dropdown-item
                          >
                          <el-dropdown-item command="1"
                            >等待付款</el-dropdown-item
                          >
                          <el-dropdown-item command="2"
                            >已完成</el-dropdown-item
                          >
                          <el-dropdown-item command="3"
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
              <inventory-card :datas="inventoryAllDatas"></inventory-card>
            </el-tab-pane>
            <el-tab-pane label="待付款">
              <div class="inventory-status-bar">
                <el-row>
                  <el-col :span="4"
                    ><span style="margin-left: 20px" class="status-bar-text">日期</span></el-col
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
                :datas="inventoryUnFinishedDatas"
              ></inventory-card>
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
                          <el-dropdown-item command="0"
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
              <inventory-card :datas="invnetoryFinishedDatas"></inventory-card>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import InventoryNavgationBar from '../../components/InventoryNavgationBar.vue';
import InventoryCard from "./InventoryCard.vue";
export default {
  data() {
    return {
      userName: localStorage.getItem("name"),
      allDateCommandText: "全部",
      finishedDateCommandText:'全部',
      allStateCommandText: "全部状态",
      finishedStateCommandText:'全部状态',
      deleteVisble: "",
      inventoryAllDatas: [1, 2],
      inventoryUnFinishedDatas: [1],
      invnetoryFinishedDatas: [1],
    };
  },
  methods: {
    allInventoryDateCommand(command) {
      if (command == 0) {
        this.allDateCommandText = "全部";
      } else if (command == 1) {
        this.allDateCommandText = "近三个月";
      } else if (command == 2) {
        this.allDateCommandText = "近一年";
      }
    },
    finishedInventoryDateCommand(command){
      if (command == 0) {
        this.finishedDateCommandText = "全部";
      } else if (command == 1) {
        this.finishedDateCommandText = "近三个月";
      } else if (command == 2) {
        this.finishedDateCommandText = "近一年";
      }
    },

    allInventoryStateCommand(command) {
      if (command == 0) {
        this.allStateCommandText = "全部状态";
      } else if (command == 1) {
        this.allStateCommandText = "等待付款";
      } else if (command == 2) {
        this.allStateCommandText = "已完成";
      } else {
        this.allStateCommandText = "已取消";
      }
    },
    finishedInventoryStateCommand(command){
      if (command == 0) {
        this.finishedStateCommandText = "全部状态";
      } else if (command == 1) {
        this.finishedStateCommandText = "已完成";
      } else {
        this.finishedStateCommandText = "已取消";
      }
    }
  },
  components: {
    InventoryCard,
    InventoryNavgationBar,
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