<template>
  <div>
    <div
      v-for="item in datas"
      :key="item"
      @mouseover="deleteVisble = item"
      @mouseleave="deleteVisble = -1"
    >
      <div class="inventory-info-detail">
        <div style="background-color: #f5f5f5">
          <div style="padding: 10px 0 10px 10px">
            <span>2021-04-24 15:23:42</span>
            <span style="margin-left: 20px">订单号:</span>
            <span class="inventory-number" @click="inventoryDetail(item)">169825768332</span>
            <span
              style="float: right; margin-right: 20px; cursor: pointer"
              v-show="deleteVisble == item"
              @click="deleteInventory(item)"
              ><i class="el-icon-delete" title="删除"></i
            ></span>
          </div>
        </div>
        <div style="border: 2px solid #f5f5f5">
          <el-row>
            <el-col :span="12">
              <div style="border-right: 2px solid #f5f5f5;height: 83px">
                <el-row>
                  <el-col :span="6">
                    <img src="../../assets/img/3.jpg" alt="" />
                  </el-col>
                  <el-col :span="12" style="padding-top: 10px">
                    重庆 - 南岸 - 南坪东路 - 碧家国际社区（南滨路店）
                  </el-col>
                  <el-col
                    :span="6"
                    style="text-align: center; padding-top: 10px"
                  >
                    2个月
                  </el-col>
                </el-row>
              </div>
            </el-col>
            <el-col :span="3">
              <div style="border-right: 2px solid #f5f5f5; height: 83px">
                <div style="text-align: center; padding-top: 30px">
                  熊劲松<i class="iconfont icon-people"></i>
                </div>
              </div>
            </el-col>
            <el-col :span="3">
              <div
                style="
                  border-right: 2px solid #f5f5f5;
                  text-align: center;
                  padding: 0 10px 0 10px;
                  height: 83px;
                "
              >
                <div style="padding-top: 15px; margin-bottom: 10px">￥7600</div>
                <div class="part-line-1"></div>
                <div style="margin-top: 10px">在线支付</div>
              </div>
            </el-col>
            <el-col :span="3">
              <div
                style="
                  border-right: 2px solid #f5f5f5;
                  height: 83px;
                  text-align: center;
                "
              >
                <div style="padding-top: 15px; margin-bottom: 10px">已取消</div>
                <div @click="inventoryDetail(item)" class="inventory-detail">
                  订单详情
                </div>
              </div>
            </el-col>
            <el-col :span="3">
              <div style="text-align: center">
                <div
                  style="color: #ed2553; cursor: pointer; margin-top: 15px"
                  @click="rightNowBuy"
                >
                  <i class="iconfont icon-rightnow-buy"></i> 立即购买
                </div>
                <div
                  style="color: #666666; cursor: pointer; margin-top: 10px"
                  @click="chancelInventory"
                >
                  <i class="iconfont icon-chancel"></i> 点击取消
                </div>
              </div>
            </el-col>
          </el-row>
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      deleteVisble: -1,
      currentPage: 1,
    };
  },
  methods: {
    inventoryDetail(val) {
      this.$router.push({
        path: "/inventoryDone",
        query: {
          inventory: val,
        },
      });
    },
    deleteInventory(val) {
      console.log(val);
    },
    rightNowBuy() {
      window.alert("立即购买");
    },
    chancelInventory() {
      window.alert("取消");
    },
    handleCurrentChange(val) {},
  },
  props: {
    datas: {
      type: Array,
      default() {
        return [1, 2];
      },
    },
  },
};
</script>

<style>
@import url("../../assets/img/icon/iconfont.css");
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
.inventory-detail,
.inventory-number {
  color: #666666;
  cursor: pointer;
}
.inventory-detail:hover,
.inventory-number:hover {
  color: #ed2553;
}
</style>