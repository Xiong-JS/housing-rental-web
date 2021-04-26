<template>
  <div
    style="
      background-color: #f5f5f5;
      position: absolute;
      height: 100%;
      width: 100%;
    "
  >
    <div class="my-releaseHouse-main">
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
      <div class="my-release-house-title">我的房源</div>
      <el-breadcrumb
        separator-class="el-icon-arrow-right"
        style="padding: 20px 0 20px 0"
      >
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>我的房源</el-breadcrumb-item>
      </el-breadcrumb>
      <el-tabs type="border-card" @tab-click="handTabClick">
        <el-tab-pane label="已上架">
          <el-row style="font-size: 13px; color: #666">
            <el-col :span="12">
              <el-row>
                <el-col :span="2"
                  ><div style="margin-top: 5px">特点:</div></el-col
                >
                <el-col :span="22"
                  ><el-checkbox-group
                    v-model="charaters"
                    size="small"
                    :max="3"
                    fill="#ed2553"
                    ><el-checkbox-button label="1">月付</el-checkbox-button
                    ><el-checkbox-button label="2">家电齐全</el-checkbox-button
                    ><el-checkbox-button label="3">精装修</el-checkbox-button
                    ><el-checkbox-button label="4">有阳台</el-checkbox-button>
                  </el-checkbox-group></el-col
                >
              </el-row>
            </el-col>
            <el-col :span="12">
              <el-row>
                <el-col :span="2"
                  ><div style="margin-top: 5px">室：</div></el-col
                >
                <el-col :span="22"
                  ><el-checkbox-group
                    v-model="room"
                    size="small"
                    fill="#ed2553"
                  >
                    <el-checkbox-button label="1">1室</el-checkbox-button
                    ><el-checkbox-button label="2">2室</el-checkbox-button
                    ><el-checkbox-button label="3">3室</el-checkbox-button>
                  </el-checkbox-group></el-col
                >
              </el-row>
            </el-col>
          </el-row>
          <div
            class="my-releaseHouse-list"
            v-for="item in 2"
            :key="item"
            @mouseover="soldOutVisble = item"
            @mouseleave="soldOutVisble = -1"
          >
            <div style="margin-top: 20px">
              <div>
                <el-row>
                  <el-col>
                    <div style="float: right" v-show="soldOutVisble == item">
                      <i
                        class="iconfont icon-sold-out"
                        title="下架"
                        style="cursor: pointer"
                      ></i>
                    </div>
                  </el-col>
                </el-row>
                <div class="my-releaseHouse-status">
                  <el-row>
                    <el-col :span="9" style="text-align: center">
                      <span>房源信息</span>
                    </el-col>
                    <el-col :span="3" style="text-align: center">
                      <span>类型</span>
                    </el-col>
                    <el-col :span="3" style="text-align: center">
                      <span>发布人</span>
                    </el-col>
                    <el-col :span="3" style="text-align: center">
                      <span>价格</span>
                    </el-col>
                    <el-col :span="3" style="text-align: center">
                      <span>时间</span>
                    </el-col>
                    <el-col :span="3" style="text-align: center">
                      <span>状态</span>
                    </el-col>
                  </el-row>
                </div>
                <div class="my-releaseHouse-info">
                  <el-row>
                    <el-col :span="9" style="border-right: 1px solid #f5f5f5">
                      <div>
                        <el-row>
                          <el-col :span="6">
                            <img src="../../assets/img/3.jpg" alt="" />
                          </el-col>
                          <el-col :span="18" style="padding-top: 10px">
                            <div>
                              重庆 - 南岸 - 南坪东路 - 碧家国际社区（南滨路店）
                            </div>
                            <div style="margin-top: 10px">
                              月付，家电齐全，精装修，有阳台，电梯房
                            </div>
                            <div style="margin-top: 10px">1室1厅1卫</div>
                          </el-col>
                        </el-row>
                      </div>
                    </el-col>
                    <el-col
                      :span="3"
                      style="
                        text-align: center;
                        padding-top: 30px;
                        border-right: 1px solid #f5f5f5;
                        height: 81px;
                      "
                    >
                      <span>整租</span>
                    </el-col>
                    <el-col
                      :span="3"
                      style="
                        text-align: center;
                        height: 81px;
                        border-right: 1px solid #f5f5f5;
                        padding-top: 30px;
                      "
                    >
                      <span>熊劲松</span>
                    </el-col>
                    <el-col
                      :span="3"
                      style="
                        text-align: center;
                        height: 81px;
                        padding-top: 20px;
                        border-right: 1px solid #f5f5f5;
                      "
                    >
                      <div>租金:￥2800/月</div>
                      <div style="margin-top: 5px">押金:￥100</div>
                    </el-col>
                    <el-col
                      :span="3"
                      style="
                        text-align: center;
                        height: 81px;
                        padding-top: 20px;
                        border-right: 1px solid #f5f5f5;
                      "
                    >
                      <div>上架时间:2021-04-24 15:23:42</div>
                      <div style="margin-top: 5px">
                        下架时间:2021-04-24 15:23:42
                      </div>
                    </el-col>
                    <el-col :span="3" style="text-align: center">
                      <div style="margin-top: 30px">
                        <i class="iconfont icon-online"></i>正在出租
                      </div>
                    </el-col>
                  </el-row>
                </div>
              </div>
            </div>
          </div>
          <div style="float: right">
            <el-pagination
              @current-change="handleCurrentChange"
              :current-page.sync="currentPage"
              :page-size="100"
              layout="total, prev, pager, next"
              :total="1000"
              background
              style="margin-top: 10px"
            >
            </el-pagination>
          </div>
        </el-tab-pane>
        <el-tab-pane label="已下架">
          <div
            class="my-releaseHouse-list"
            v-for="item in 2"
            :key="item"
            @mouseover="soldOutVisble = item"
            @mouseleave="soldOutVisble = -1"
          >
            <div style="margin-top: 20px">
              <div>
                <div class="my-releaseHouse-status">
                  <el-row>
                    <el-col :span="9" style="text-align: center">
                      <span>房源信息</span>
                    </el-col>
                    <el-col :span="3" style="text-align: center">
                      <span>类型</span>
                    </el-col>
                    <el-col :span="3" style="text-align: center">
                      <span>发布人</span>
                    </el-col>
                    <el-col :span="3" style="text-align: center">
                      <span>价格</span>
                    </el-col>
                    <el-col :span="3" style="text-align: center">
                      <span>时间</span>
                    </el-col>
                    <el-col :span="3" style="text-align: center">
                      <span>状态</span>
                    </el-col>
                  </el-row>
                </div>
                <div class="my-releaseHouse-info">
                  <el-row>
                    <el-col :span="9" style="border-right: 1px solid #f5f5f5">
                      <div>
                        <el-row>
                          <el-col :span="6">
                            <img src="../../assets/img/3.jpg" alt="" />
                          </el-col>
                          <el-col :span="18" style="padding-top: 10px">
                            <div>
                              重庆 - 南岸 - 南坪东路 - 碧家国际社区（南滨路店）
                            </div>
                            <div style="margin-top: 10px">
                              月付，家电齐全，精装修，有阳台，电梯房
                            </div>
                            <div style="margin-top: 10px">1室1厅1卫</div>
                          </el-col>
                        </el-row>
                      </div>
                    </el-col>
                    <el-col
                      :span="3"
                      style="
                        text-align: center;
                        padding-top: 30px;
                        border-right: 1px solid #f5f5f5;
                        height: 81px;
                      "
                    >
                      <span>整租</span>
                    </el-col>
                    <el-col
                      :span="3"
                      style="
                        text-align: center;
                        height: 81px;
                        border-right: 1px solid #f5f5f5;
                        padding-top: 30px;
                      "
                    >
                      <span>熊劲松</span>
                    </el-col>
                    <el-col
                      :span="3"
                      style="
                        text-align: center;
                        height: 81px;
                        padding-top: 20px;
                        border-right: 1px solid #f5f5f5;
                      "
                    >
                      <div>租金:￥2800/月</div>
                      <div style="margin-top: 5px">押金:￥100</div>
                    </el-col>
                    <el-col
                      :span="3"
                      style="
                        text-align: center;
                        height: 81px;
                        padding-top: 20px;
                        border-right: 1px solid #f5f5f5;
                      "
                    >
                      <div>上架时间:2021-04-24 15:23:42</div>
                      <div style="margin-top: 5px">
                        下架时间:2021-04-24 15:23:42
                      </div>
                    </el-col>
                    <el-col :span="3" style="text-align: center">
                      <div style="margin-top: 20px">
                        <i class="iconfont icon-sold-outed"></i>
                      </div>
                    </el-col>
                  </el-row>
                </div>
              </div>
            </div>
          </div>
          <div style="float: right">
            <el-pagination
              @current-change="handleCurrentChange"
              :current-page.sync="currentPage"
              :page-size="100"
              layout="total, prev, pager, next"
              :total="1000"
              background
              style="margin-top: 10px"
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
      charaters: [],
      room: [],
      soldOutVisble: -1,
      currentPage: 1,
    };
  },
  methods: {
    homeClick() {
      this.$router.push("/");
    },
    handleCurrentChange(val) {},
    handTabClick(val) {
      console.log(val.index);
    },
  },
};
</script>

<style>
@import url("../../assets/img/icon/iconfont.css");
.my-releaseHouse-main {
  margin: 0 auto;
  width: 1200px;
}
.my-release-house-title {
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
.my-releaseHouse-list {
  margin-top: 10px;
  background-color: #fff;
  border: 1px solid #e9e9e9;
  font-size: 13px;
  color: #666;
}
.my-releaseHouse-status {
  background-color: #f5f5f5;
  padding: 10px;
  color: #aaaaaa;
  margin-top: 5px;
}
.my-releaseHouse-info {
  padding: 10px;
  color: #666;
}
.my-releaseHouse-info img {
  width: 60px;
  height: 60px;
  padding: 10px 0 10px 20px;
}
</style>