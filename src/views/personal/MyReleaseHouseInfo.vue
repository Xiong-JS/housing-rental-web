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
            <img
              src="../../assets/img/logo1.png"
              alt=""
              class="logo-img"
            /></div
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
        <el-tab-pane label="审核中">
          <div
            class="my-releaseHouse-list"
            v-for="item in houseInfos"
            :key="item.houseId"
            @mouseover="soldOutVisble = item.houseId"
            @mouseleave="soldOutVisble = -1"
          >
            <div style="margin-top: 20px">
              <div>
                <div class="my-releaseHouse-status">
                  <el-row>
                    <el-col :span="9" style="text-align: center">
                      <span>房源信息</span>
                    </el-col>
                    <el-col :span="2" style="text-align: center">
                      <span>类型</span>
                    </el-col>
                    <el-col :span="2" style="text-align: center">
                      <span>发布人</span>
                    </el-col>
                    <el-col :span="2" style="text-align: center">
                      <span>价格</span>
                    </el-col>
                    <el-col :span="3" style="text-align: center">
                      <span>时间</span>
                    </el-col>
                    <el-col :span="3" style="text-align: center">
                      <span>状态</span>
                    </el-col>
                    <el-col :span="3" style="text-align: center">
                      <span>操作</span>
                    </el-col>
                  </el-row>
                </div>
                <div class="my-releaseHouse-info">
                  <el-row>
                    <el-col :span="9" style="border-right: 1px solid #f5f5f5">
                      <div>
                        <el-row>
                          <el-col :span="6">
                            <img :src="item.img" alt="" />
                          </el-col>
                          <el-col :span="18" style="padding-top: 10px">
                            <div>
                              {{ item.country }} - {{ item.netherlands }} -
                              {{ item.detailNetherlands }} -
                              {{ item.community }} {{ item.houseNumber }} 共{{
                                item.totalFloor
                              }}层
                            </div>
                            <div style="margin-top: 10px">
                              <span
                                v-show="item.toilet == 1"
                                style="padding: 2px"
                                >独卫</span
                              >
                              <span
                                v-show="item.balcony == 1"
                                style="padding: 2px"
                                >带阳台</span
                              >
                              <span
                                v-show="item.houseType == 1"
                                style="padding: 2px"
                                >电梯房</span
                              >
                              <span
                                v-show="item.monthPay == 1"
                                style="padding: 2px"
                                >月付</span
                              >
                              <span
                                v-show="item.hardback == 1"
                                style="padding: 2px"
                                >精装修</span
                              >
                              <span
                                v-show="item.homeAppliances == 1"
                                style="padding: 2px"
                                >家电齐全</span
                              >
                            </div>
                            <div style="margin-top: 10px">
                              {{ item.room }}室{{ item.hall }}厅{{
                                item.toilet
                              }}卫
                            </div>
                          </el-col>
                        </el-row>
                      </div>
                    </el-col>
                    <el-col
                      :span="2"
                      style="
                        text-align: center;
                        padding-top: 30px;
                        border-right: 1px solid #f5f5f5;
                        height: 81px;
                      "
                    >
                      <span v-show="item.rentalType == 2">整租</span>
                      <span v-show="item.rentalType == 1">合租</span>
                    </el-col>
                    <el-col
                      :span="2"
                      style="
                        text-align: center;
                        height: 81px;
                        border-right: 1px solid #f5f5f5;
                        padding-top: 30px;
                      "
                    >
                      <span>{{ item.releaseName }}</span>
                    </el-col>
                    <el-col
                      :span="2"
                      style="
                        text-align: center;
                        height: 81px;
                        padding-top: 20px;
                        border-right: 1px solid #f5f5f5;
                      "
                    >
                      <div>租金:￥{{ item.quote }}/月</div>
                      <div style="margin-top: 5px">
                        押金:￥{{ item.cashPledge }}
                      </div>
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
                      <span>无</span>
                    </el-col>
                    <el-col :span="3" style="text-align: center">
                      <div style="margin-top: 30px">
                        <span v-show="item.auditState == 0">审核中</span>
                        <span v-show="item.auditState == 1">未通过</span>
                      </div>
                    </el-col>
                    <el-col :span="3" style="text-align: center">
                      <div style="margin-top: 30px">
                        <div
                          style="cursor: pointer; color: #ed2553"
                          @click="submit(item.houseId)"
                          v-show="item.auditState == 1"
                        >
                          提交房产证
                        </div>
                        <div
                          @click="look(item.certificateImg)"
                          style="cursor: pointer; margin-top: 10px"
                        >
                          查看房产证
                        </div>
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
              :page-size="2"
              layout="total, prev, pager, next"
              :total="total"
              background
              style="margin-top: 10px"
            >
            </el-pagination>
          </div>
        </el-tab-pane>
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
                    @change="charatersChange"
                    fill="#ed2553"
                    ><el-checkbox-button label="月付">月付</el-checkbox-button
                    ><el-checkbox-button label="家电齐全"
                      >家电齐全</el-checkbox-button
                    ><el-checkbox-button label="精装修"
                      >精装修</el-checkbox-button
                    ><el-checkbox-button label="带阳台"
                      >有阳台</el-checkbox-button
                    >
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
                  ><el-radio-group
                    v-model="room"
                    size="small"
                    fill="#ed2553"
                    @change="roomChange"
                  >
                    <el-radio-button label="0">不限</el-radio-button>
                    <el-radio-button label="1">1室</el-radio-button
                    ><el-radio-button label="2">2室</el-radio-button
                    ><el-radio-button label="3">3室</el-radio-button>
                  </el-radio-group></el-col
                >
              </el-row>
            </el-col>
          </el-row>
          <div
            class="my-releaseHouse-list"
            v-for="item in houseInfos"
            :key="item.houseId"
            @mouseover="soldOutVisble = item.houseId"
            @mouseleave="soldOutVisble = -1"
          >
            <div style="margin-top: 20px">
              <div>
                <el-row>
                  <el-col>
                    <div
                      style="float: right"
                      v-show="soldOutVisble == item.houseId"
                      @click="downRental(item.houseId)"
                    >
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
                            <img :src="item.img" alt="" />
                          </el-col>
                          <el-col :span="18" style="padding-top: 10px">
                            <div>
                              {{ item.country }} - {{ item.netherlands }} -
                              {{ item.detailNetherlands }} -
                              {{ item.community }} {{ item.houseNumber }} 共{{
                                item.totalFloor
                              }}层
                            </div>
                            <div style="margin-top: 10px">
                              <span
                                v-show="item.toilet == 1"
                                style="padding: 2px"
                                >独卫</span
                              >
                              <span
                                v-show="item.balcony == 1"
                                style="padding: 2px"
                                >带阳台</span
                              >
                              <span
                                v-show="item.houseType == 1"
                                style="padding: 2px"
                                >电梯房</span
                              >
                              <span
                                v-show="item.monthPay == 1"
                                style="padding: 2px"
                                >月付</span
                              >
                              <span
                                v-show="item.hardback == 1"
                                style="padding: 2px"
                                >精装修</span
                              >
                              <span
                                v-show="item.homeAppliances == 1"
                                style="padding: 2px"
                                >家电齐全</span
                              >
                            </div>
                            <div style="margin-top: 10px">
                              {{ item.room }}室{{ item.hall }}厅{{
                                item.toilet
                              }}卫
                            </div>
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
                      <span v-show="item.rentalType == 2">整租</span>
                      <span v-show="item.rentalType == 1">合租</span>
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
                      <span>{{ item.releaseName }}</span>
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
                      <div>租金:￥{{ item.quote }}/月</div>
                      <div style="margin-top: 5px">
                        押金:￥{{ item.cashPledge }}
                      </div>
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
                      <div>上架时间:{{ item.releaseTime }}</div>
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
              :page-size="2"
              layout="total, prev, pager, next"
              :total="total"
              background
              style="margin-top: 10px"
            >
            </el-pagination>
          </div>
        </el-tab-pane>
        <el-tab-pane label="已下架">
          <div
            class="my-releaseHouse-list"
            v-for="item in houseInfos"
            :key="item.hosueId"
            @mouseover="soldOutVisble = item.houseId"
            @mouseleave="soldOutVisble = -1"
          >
            <div style="margin-top: 20px">
              <div>
                <el-row>
                  <el-col>
                    <div
                      style="float: right"
                      v-show="soldOutVisble == item.houseId"
                      @click="upRental(item.houseId)"
                    >
                      <i
                        class="iconfont icon-upline"
                        title="上架"
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
                            <img :src="item.img" alt="" />
                          </el-col>
                          <el-col :span="18" style="padding-top: 10px">
                            <div>
                              {{ item.country }} - {{ item.netherlands }} -
                              {{ item.detailNetherlands }} -
                              {{ item.community }} {{ item.houseNumber }} 共{{
                                item.totalFloor
                              }}层
                            </div>
                            <div style="margin-top: 10px">
                              <span
                                v-show="item.toilet == 1"
                                style="padding: 2px"
                                >独卫</span
                              >
                              <span
                                v-show="item.balcony == 1"
                                style="padding: 2px"
                                >带阳台,</span
                              >
                              <span
                                v-show="item.houseType == 1"
                                style="padding: 2px"
                                >电梯房,</span
                              >
                              <span
                                v-show="item.monthPay == 1"
                                style="padding: 2px"
                                >月付,</span
                              >
                              <span
                                v-show="item.hardback == 1"
                                style="padding: 2px"
                                >精装修</span
                              >
                              <span
                                v-show="item.homeAppliances == 1"
                                style="padding: 2px"
                                >家电齐全</span
                              >
                            </div>
                            <div style="margin-top: 10px">
                              {{ item.room }}室{{ item.hall }}厅{{
                                item.toilet
                              }}卫
                            </div>
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
                      <span v-show="item.rentalType == 2">整租</span>
                      <span v-show="item.rentalType == 1">合租</span>
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
                      <span>{{ item.releaseName }}</span>
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
                      <div>租金:￥{{ item.quote }}/月</div>
                      <div style="margin-top: 5px">
                        押金:￥{{ item.cashPledge }}
                      </div>
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
                      <div>上架时间:{{ item.releaseTime }}</div>
                      <div style="margin-top: 5px">
                        下架时间:{{ item.downTime }}
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
    <el-dialog
      title="上传房产证"
      :visible.sync="certificateVisble"
      width="30%"
      center
    >
      <el-upload
        class="avatar-uploader"
        :action="uploadUrl"
        :show-file-list="false"
        :on-success="handleCertificateAvatarSuccess"
        :before-upload="beforeAvatarUpload"
        :headers="headers"
        :data="imgData"
      >
        <img
          v-if="certificateImg"
          :src="certificateImg"
          class="avatar"
          style="width: 100px; height: 100px"
        />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
      <span slot="footer" class="dialog-footer">
        <el-button @click="certificateVisble = false">取 消</el-button>
        <el-button type="primary" @click="up">上 传</el-button>
      </span>
    </el-dialog>
    <el-dialog title="房产证" :visible.sync="lookVisble" width="30%">
      <img
        v-if="certificateImg"
        :src="certificateImg"
        class="avatar"
        style="width: 350px; height: 300px; margin-left: 20px"
      />
    </el-dialog>
  </div>
</template>

<script>
import request from "../../network/request";
export default {
  data() {
    return {
      userName: sessionStorage.getItem("name"),
      charaters: [],
      room: 0,
      soldOutVisble: -1,
      currentPage: 1,
      total: 0,
      houseInfos: [],
      certificateVisble: false,
      lookVisble: false,
      imgData: {
        path: "bishe/certificate",
      },
      uploadUrl: "http://localhost:8080/imgUpload",
      headers: { "u-token": sessionStorage.getItem("uToken") },
      houseId: "",
      certificateImg: "",
      tabState: 0,
    };
  },
  methods: {
    homeClick() {
      this.$router.push("/");
    },
    handleCurrentChange(val) {
      this.getHouseInfos(val);
    },
    handTabClick(val) {
      this.tabState = val.index;
      this.charaters = [];
      this.room = 0;
      this.getHouseInfos(1);
    },
    submit(houseId) {
      this.certificateVisble = true;
      this.imgData.path = "bishe/certificate";
      this.houseId = houseId;
    },
    look(certificateImg) {
      this.certificateImg = certificateImg;
      this.lookVisble = true;
    },
    up() {
      request({
        url: "/house/certificateImg",
        method: "post",
        data: {
          certificateImg: this.certificateImg,
          houseId: this.houseId,
        },
      }).then((res) => {
        this.$message.success("提交成功!");
        this.getHouseInfos(1);
        this.certificateVisble = false
      });
    },
    charatersChange(val) {
      this.getHouseInfos(1);
    },
    roomChange(val) {
      this.getHouseInfos(1);
    },
    handleCertificateAvatarSuccess(res, file) {
      if (res.data.msg == "NoUser" || res.data.code == "000004") {
        this.$message.error("未登录,请登录!");
      } else {
        this.certificateImg = res.data;
        this.$message.success("上传成功");
      }
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      return isJPG;
    },
    getHouseInfos(val) {
      request({
        url: "/house/releaseHouseInfos",
        params: {
          tabState: this.tabState,
          characters: this.charaters.toString(),
          room: this.room,
          page: val,
          pageSize: 2,
          userId: sessionStorage.getItem("id"),
        },
      }).then((res) => {
        this.houseInfos = res.data.data;
        this.total = res.data.total;
        this.currentPage = res.data.currentPage;
        console.log(res);
      });
    },
    downRental(houseId) {
      request({
        url: "/house/downRental",
        method: "post",
        data: {
          houseId: houseId,
          state: 0,
        },
      }).then((res) => {
        this.$message.success("下架成功!");
        this.getHouseInfos(1);
      });
    },
    upRental(houseId) {
      request({
        url: "/rental_situation/rentalSituation-houseId",
        params: {
          houseId: houseId,
        },
      }).then((res) => {
        console.log(res.data);
        if (res.data.code == "000007") {
          this.$message.error(res.data.msg);
          return;
        }
        this.certificateVisble = true;
        this.certificateImg = "";
        this.houseId = houseId;
      });
    },
  },
  created() {
    this.getHouseInfos(1);
    console.log(this.total);
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
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>