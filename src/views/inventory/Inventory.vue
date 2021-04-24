<template>
  <div class="inventory-mian">
    <div class="inventory-list">
      <div>
        <el-row>
          <el-col :span="12"
            ><div>
              <img
                src="../../assets/logo2018.png"
                alt=""
                class="logo-img"
              /></div
          ></el-col>
          <el-col :span="12">
            <div class="nav-bar">
              <span class="inventory-name">{{ userName }}</span
              >| <span class="inventory-home" @click="homeClick">首页</span>|
              <span class="inventory-mine" @click="myInventory">我的订单</span>
            </div></el-col
          >
        </el-row>
      </div>
      <div class="inventory-title">我的订单</div>
      <div class="inventory-info-list">
        <el-tabs type="border-card">
          <el-tab-pane label="全部订单">
            <div class="all-inventory-status-bar">
              <el-row>
                <el-col :span="4" 
                  ><el-dropdown @command="allInventoryDateCommand" size="small" style="margin-left:20px">
                    <span class="el-dropdown-link">
                      {{ allDateCommandText
                      }}<i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item command="0">全部</el-dropdown-item>
                      <el-dropdown-item command="1">近三个月</el-dropdown-item>
                      <el-dropdown-item command="2">近一年</el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown></el-col
                >
                <el-col :span="8" style="text-align: center;"
                  ><span class="status-bar-text">订单详情</span></el-col
                >
                <el-col :span="3" style="text-align: center;"
                  ><span class="status-bar-text">租赁人</span></el-col
                >
                <el-col :span="3" style="text-align: center;"
                  ><span class="status-bar-text">金额</span></el-col
                >
                <el-col :span="3" style="text-align: center;"
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
                        <el-dropdown-item command="2">已完成</el-dropdown-item>
                        <el-dropdown-item command="3">已取消</el-dropdown-item>
                      </el-dropdown-menu>
                    </el-dropdown></span
                  ></el-col
                >
                <el-col :span="3" style="text-align: center;"
                  ><span class="status-bar-text">操作</span></el-col
                >
              </el-row>
            </div>
            <div v-for="item in 2" :key="item">
              <div class="inventory-info-detail">
                <div style="background-color: #f5f5f5;">
                  <div style="padding: 10px 0 10px 10px">
                    <span>2021-04-24 15:23:42</span>
                    <span style="margin-left: 20px">订单号:</span>
                    <span style="margin-left: 10px; color: black"
                      >169825768332</span
                    >
                  </div>
                </div>
                <div style="border:2px solid #f5f5f5">
                  <el-row>
                    <el-col :span="12">
                      <div style="border-right:2px solid #f5f5f5">11</div>
                    </el-col>
                    <el-col :span="3">
                      <div style="border-right:2px solid #f5f5f5">1</div>
                    </el-col>
                    <el-col :span="3">
                      <div style="border-right:2px solid #f5f5f5">1</div>
                    </el-col>
                    <el-col :span="3">
                      <div style="border-right:2px solid #f5f5f5">1</div>
                    </el-col>
                    <el-col :span="3">
                      <div>1</div>
                    </el-col>
                  </el-row>
                </div>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="待付款">
            <div class="unfinish-inventory-status-bar">待付款</div>
          </el-tab-pane>
          <el-tab-pane label="已完成">
            <div class="finished-inventory-status-bar">已完成</div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userName: localStorage.getItem("name"),
      allDateCommandText: "全部",
      allStateCommandText: "全部状态",
    };
  },
  methods: {
    homeClick() {
      this.$router.push("/");
    },
    myInventory() {
      this.$router.push("/inventory");
    },
    allInventoryDateCommand(command) {
      if (command == 0) {
        this.allDateCommandText = "全部";
      } else if (command == 1) {
        this.allDateCommandText = "近三个月";
      } else if (command == 2) {
        this.allDateCommandText = "近一年";
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
.all-inventory-status-bar {
  padding: 10px 10px 10px 20px;
  background-color: #f5f5f5;
}
.unfinish-inventory-status-bar {
  padding: 10px 10px 10px 20px;
  background-color: #f5f5f5;
}
.finished-inventory-status-bar {
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

</style>