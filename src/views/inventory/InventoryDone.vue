 <template>
  <div style="background-color: #f5f5f5">
    <div class="inventory-done">
      <inventory-navgation-bar></inventory-navgation-bar>
      <div class="inventory-done-crumbs">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/inventory' }"
            >订单中心</el-breadcrumb-item
          >
          <el-breadcrumb-item>订单：169825768332</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="inventory-state">
        <el-row>
          <el-col
            :span="8"
            style="border-right: 2px solid #f5f5f5; height: 300px"
          >
            <div style="text-align: center">
              <div style="margin-top: 20px">订单号：169825768332</div>
              <h3>已取消</h3>
              <div>
                <button class="pay-button">立即购买</button>
              </div>
            </div>
          </el-col>
          <el-col :span="16">
            <div style="margin: 20px 0 0 20px">订单流程</div>
            <div style="margin: 80px 0 0 20px">
              <el-row>
                <el-col :span="2"
                  ><div style="text-align: center">
                    <i class="iconfont icon-inventory-apply"></i>
                    <div
                      style="color: #666666; font-size: 14px; margin-top: 20px"
                    >
                      提交申请
                    </div>
                  </div>
                </el-col>
                <el-col :span="9">
                  <div class="inventory-process"></div>
                </el-col>
                <el-col :span="2"
                  ><div style="text-align: center">
                    <i class="iconfont icon-inventory-deal"></i>
                    <div
                      style="color: #666666; font-size: 14px; margin-top: 20px"
                    >
                      系统申请
                    </div>
                  </div>
                </el-col>
                <el-col :span="9">
                  <div class="inventory-process"></div>
                </el-col>
                <el-col :span="2"
                  ><div style="text-align: center">
                    <i class="iconfont icon-inventory-finished"></i>
                    <div
                      style="color: #666666; font-size: 14px; margin-top: 20px"
                    >
                      完成
                    </div>
                  </div>
                </el-col>
              </el-row>
              <i></i>
              <i></i>
            </div>
          </el-col>
        </el-row>
        <div></div>
      </div>
      <div class="inventory-info">
        <el-row>
          <el-col :span="8">
            <div style="padding:20px 20px 20px 30px">
              <div style="border-right:1px solid #f1f1f1">
                <div style="font-size:14px">订单信息</div>
                <div style="margin-top:10px">
                  <span>支付方式:</span>
                  <span style="margin-left:50px">在线支付</span>
                </div>
                <div style="margin-top:10px">
                  <span>取消时间:</span>
                  <span style="margin-left:50px">2021-04-24 15:53:44</span>
                </div>
                <div style="margin-top:10px">
                  <span>取消原因:</span>
                  <span style="margin-left:50px">过期未付款</span>
                </div>
              </div>
              
            </div>
          </el-col>
          <el-col :span="8"></el-col>
          <el-col :span="8"></el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
import InventoryNavgationBar from "../../components/InventoryNavgationBar.vue";
export default {
  data() {
    return {};
  },
  components: { InventoryNavgationBar },
};
</script>

<style>
@import url("../../assets/img/icon/iconfont.css");
.inventory-done {
  margin: 0 auto;
  width: 1200px;
}
.inventory-done-crumbs {
  padding: 20px 0 20px 0;
  font-size: 12px;
  color: #666666;
}
.inventory-state {
  margin-top: 20px;
  border-top: 3px solid #71b247;
  background-color: #ffffff;
  color: #aaa;
  font-size: 13px;
  border-bottom: 1px solid #f5f5f5;
}
.inventory-state h3 {
  color: #71b247;
  font-size: 25px;
}
.pay-button {
  width: 100px;
  height: 36px;
  cursor: pointer;
  background-color: #fff;
  color: #ed2553;
  font-weight: bolder;
  border: 1px solid #ed2553;
  margin-bottom: 10px;
}
.pay-button:hover {
  background-color: #ed2553;
  color: #fff;
}
.inventory-process {
  width: 310px;
  height: 12px;
  background: url(//misc.360buyimg.com/user/order/0.0.1/css/i/proce-icons04.png)
    0 0;
  margin-top: 10px;
}
.inventory-info{
  margin-top: 20px;
  background-color: #fff;
  box-shadow: -1px -1px 5px #666666;
  font-size: 13px;
  color: #666666;
}
</style>