<template>
  <div>
    <div
      v-for="item in datas"
      :key="item.inventoryId"
      @mouseover="deleteVisble = item.inventoryId"
      @mouseleave="deleteVisble = -1"
    >
      <div class="inventory-info-detail">
        <div style="background-color: #f5f5f5">
          <div style="padding: 10px 0 10px 10px">
            <span>{{ item.createTime }}</span>
            <span style="margin-left: 20px">订单号:</span>
            <span
              class="inventory-number"
              @click="inventoryDetail(item)"
              >{{ item.inventoryId }}</span
            >
            <span
              style="float: right; margin-right: 20px; cursor: pointer"
              v-show="deleteVisble == item.inventoryId"
              @click="deleteInventory(item.inventoryId)"
              ><i class="el-icon-delete" title="删除"></i
            ></span>
          </div>
        </div>
        <div style="border: 2px solid #f5f5f5">
          <el-row>
            <el-col :span="12">
              <div style="border-right: 2px solid #f5f5f5; height: 83px">
                <el-row>
                  <el-col :span="6">
                    <img :src="item.img" alt="" />
                  </el-col>
                  <el-col :span="12" style="padding-top: 10px">
                    {{ item.country }} - {{ item.netherlands }} -
                    {{ item.detailNetherlands }} - {{ item.community }}
                    {{ item.houseNumber }} 共{{ item.totalFloor }}层
                  </el-col>
                  <el-col
                    :span="6"
                    style="text-align: center; padding-top: 10px"
                  >
                    {{ item.rentalTime }}个月
                  </el-col>
                </el-row>
              </div>
            </el-col>
            <el-col :span="3">
              <div style="border-right: 2px solid #f5f5f5; height: 83px">
                <div style="text-align: center; padding-top: 30px">
                  {{ item.rentalName }}<i class="iconfont icon-people"></i>
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
                <div style="padding-top: 15px; margin-bottom: 10px">
                  ￥{{ item.totalMoney }}
                </div>
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
                <div style="padding-top: 15px; margin-bottom: 10px">
                  <span v-show="item.state == 2 || item.state == 3"
                    >已取消</span
                  >
                  <span v-show="item.state == 1">已完成</span>
                  <span v-show="item.state == 0">代付款</span>
                </div>
                <div @click="inventoryDetail(item)" class="inventory-detail">
                  订单详情
                </div>
              </div>
            </el-col>
            <el-col :span="3">
              <div style="text-align: center">
                <div
                  style="color: #ed2553; margin-top: 30px"
                  v-show="item.state != 0"
                >
                  <span
                    style="cursor: pointer"
                    @click="rightNowRental(item.houseId)"
                    ><i class="iconfont icon-rightnow-buy"></i> 立即租赁</span
                  >
                </div>
                <div
                  style="color: #666666; margin-top: 30px"
                  v-show="item.state == 0"
                >
                  <span
                    style="cursor: pointer"
                    @click="chancelIndent(item.inventoryId, item.houseId)"
                    ><i class="iconfont icon-chancel"></i> 点击取消</span
                  >
                </div>
              </div>
            </el-col>
          </el-row>
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
      deleteVisble: -1,
      minutes: 0,
      seconds: 0,
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
    rightNowRental(houseId) {
      this.$router.push({
        path: "/inventoryUnDone",
        query: {
          id: houseId,
        },
      });
    },
    chancelIndent(inventoryId, houseId) {
      this.$confirm("该操作将导致订单取消, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        request({
          url: "/indent/indent-cancel",
          method: "post",
          data: {
            inventoryId: inventoryId,
            houseId: houseId,
          },
        }).then((res) => {
          if (res.data.code == 200) this.$message.success("取消成功");
        });
      });
    },
  },
  props: {
    datas: {
      type: Array,
      default() {
        return [1, 2];
      },
    },
  },
  created() {
    setInterval(() => {}, 1000);
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