<template>
  <div>
    <img
      src="../../assets/img/createhouse_img.png"
      alt="发布房源"
      class="img"
    />
    <h1 class="title-release">填写您的基本信息，后台工作人员会尽快审核处理</h1>

    <div v-if="loginVisble">
      <div class="processBar">
        <el-steps :active="active" finish-status="success">
          <el-step title="提交基本信息"></el-step>
          <el-step title="提交详细信息"></el-step>
        </el-steps>
      </div>
      <!-- 填写房屋基本信息 -->
      <div v-show="active === 0" class="write-houseInfo">
        <el-form
          ref="baseHouseInfo"
          :model="baseHouseInfo"
          label-width="100px"
          :rules="rules1"
        >
          <el-form-item label="姓名" prop="releaseName">
            <el-input v-model="baseHouseInfo.releaseName"></el-input>
          </el-form-item>
          <el-form-item label="电话" prop="releasePhone">
            <el-input v-model="baseHouseInfo.releasePhone"></el-input>
          </el-form-item>
          <el-form-item label="城市" prop="countryId">
            <el-select
              v-model="baseHouseInfo.countryId"
              placeholder="请选择城市"
              @change="countryChange"
              @visible-change="getAllCountries"
              style="width: 400px"
            >
              <el-option
                v-for="item in countries"
                :key="item.countryId"
                :label="item.countryName"
                :value="item.countryId"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="地区" prop="netherlandsId">
            <el-select
              v-model="baseHouseInfo.netherlandsId"
              clearable
              placeholder="请选择地区"
              @change="netherlandsChange"
              style="width: 400px"
            >
              <el-option
                v-for="item in netherlands"
                :key="item.netherlandsId"
                :label="item.netherlandsName"
                :value="item.netherlandsId"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="详细地区" prop="detailNetherlandsId">
            <el-select
              v-model="baseHouseInfo.detailNetherlandsId"
              clearable
              placeholder="请选择详细地区"
              @change="detailNetherlandsChange"
              style="width: 400px"
            >
              <el-option
                v-for="item in detailNetherlands"
                :key="item.detailNetherlandsId"
                :label="item.detailNetherlandsName"
                :value="item.detailNetherlandsId"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="小区" prop="communityId">
            <el-select
              v-model="baseHouseInfo.communityId"
              clearable
              placeholder="请选择小区"
              style="width: 400px"
            >
              <el-option
                v-for="item in communities"
                :key="item.communityId"
                :label="item.communityName"
                :value="item.communityId"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="具体门牌号" prop="houseNumber">
            <el-input v-model="baseHouseInfo.houseNumber"></el-input>
          </el-form-item>
          <el-form-item>
            <el-row>
              <el-col :span="8"
                ><el-radio v-model="baseHouseInfo.rentalType" label="2" border
                  >整租房源</el-radio
                ></el-col
              >
              <el-col :span="8"
                ><el-radio v-model="baseHouseInfo.rentalType" label="1" border
                  >合租房源</el-radio
                ></el-col
              >
              <el-col :span="8"
                ><el-radio v-model="baseHouseInfo.rentalType" label="3" border
                  >公寓房源</el-radio
                ></el-col
              >
            </el-row>
          </el-form-item>

          <el-form-item>
            <div style="text-align: center">
              <el-button
                type="danger"
                style="width: 200px; margin-top: 20px"
                @click="BaseNext('baseHouseInfo')"
                >下一步</el-button
              >
            </div>
          </el-form-item>
        </el-form>
      </div>
      <!-- 填写房屋详细信息 -->
      <div v-show="active === 1" class="write-houseInfo">
        <el-form
          ref="houseInfo"
          :model="houseInfo"
          label-width="100px"
          :rules="rules2"
        >
          <el-form-item label="报价" prop="quote">
            <el-input
              controls-position="right"
              v-model="houseInfo.quote"
              auto-complete="off"
              style="width: 400px"
              :min="0"
            >
              <template slot="append">元/月</template></el-input
            >
          </el-form-item>
          <el-form-item label="押金" prop="cashPledge">
            <el-input
              controls-position="right"
              v-model="houseInfo.cashPledge"
              auto-complete="off"
              style="width: 400px"
              :min="0"
            >
              <template slot="append">元</template></el-input
            >
          </el-form-item>
          <el-form-item label="整租面积" prop="area">
            <el-input v-model="houseInfo.area" auto-complete="off" :min="0"
              ><template slot="append">M²</template></el-input
            >
          </el-form-item>
          <el-form-item label="室" prop="room">
            <el-input-number
              :min="0"
              v-model="houseInfo.room"
              auto-complete="off"
            ></el-input-number>
          </el-form-item>
          <el-form-item label="厅" prop="hall">
            <el-input-number
              :min="0"
              v-model="houseInfo.hall"
              auto-complete="off"
            ></el-input-number>
          </el-form-item>
          <el-form-item label="卫" prop="toilet">
            <el-input-number
              :min="0"
              v-model="houseInfo.toilet"
              auto-complete="off"
            ></el-input-number>
          </el-form-item>
          <el-form-item label="楼层" prop="floor">
            <el-input-number
              :min="0"
              v-model="houseInfo.floor"
              auto-complete="off"
            ></el-input-number>
          </el-form-item>
          <el-form-item label="总楼层" prop="totalFloor">
            <el-input-number
              :min="0"
              v-model="houseInfo.totalFloor"
              auto-complete="off"
            ></el-input-number>
          </el-form-item>
          <el-form-item label="房子类型" prop="houseType">
            <el-select
              v-model="houseInfo.houseType"
              clearable
              placeholder="请选择房子类型"
              style="width: 400px"
            >
              <el-option label="楼梯房" value="0"></el-option>
              <el-option label="电梯房" value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="特色">
            <el-checkbox-group v-model="houseInfo.characters">
              <el-checkbox label="月付" name="character"></el-checkbox>
              <el-checkbox label="精装修" name="character"></el-checkbox>
              <el-checkbox label="带阳台" name="character"></el-checkbox>
              <el-checkbox label="家电齐全" name="character"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="房屋图片">
            <el-upload
              class="avatar-uploader"
              :action="uploadUrl"
              :show-file-list="false"
              :on-success="handleImgAvatarSuccess"
              :before-upload="beforeAvatarUpload"
              :headers="headers"
              :data="imgData"
            >
              <img
                v-if="houseInfo.img"
                :src="houseInfo.img"
                class="avatar"
                style="width: 100px; height: 100px"
              />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="描述">
            <el-input
              type="textarea"
              :rows="2"
              placeholder="请输入内容"
              v-model="houseInfo.description"
            >
            </el-input>
          </el-form-item>
        </el-form>
        <el-form :inline="true" style="text-align: center">
          <el-form-item>
            <div>
              <el-button type="primary" style="width: 100px" @click="pre"
                >上一步</el-button
              >
              <el-button
                type="info"
                style="width: 100px"
                @click="quit('baseHouseInfo', 'houseInfo')"
              >
                取消
              </el-button>
              <el-button
                type="danger"
                style="width: 100px"
                @click="submit('houseInfo')"
                >提交</el-button
              >
            </div>
          </el-form-item>
        </el-form>
      </div>
      <div v-show="active === 2">
        <h1 class="title-release">提交成功,等待审核!</h1>
        <el-form>
          <el-form-item>
            <div style="text-align: center">
              <el-button
                type="primary"
                style="width: 200px; margin-top: 50px"
                @click="quit('baseHouseInfo', 'houseInfo')"
                >继续填写</el-button
              >
            </div>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div v-else>
      <div style="margin-top: 100px; text-align: center;padding-bottom:100px">
        <el-button
          type="danger"
          plain
          style="width: 300px; height: 60px;"
          @click="login"
          >请登录</el-button
        >
      </div>
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
          v-if="houseInfo.certificateImg"
          :src="houseInfo.certificateImg"
          class="avatar"
          style="width: 100px; height: 100px"
        />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
      <span slot="footer" class="dialog-footer">
        <el-button @click="certificateVisble = false">取 消</el-button>
        <el-button type="primary" @click="upHouseInfos('houseInfo')"
          >上 传</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import request from "../../network/request";
export default {
  data() {
    let validatePhone = (rule, value, callback) => {
      if (String(value) === "") {
        callback(new Error("请输入电话号码"));
      } else if (String(value).length != 11) {
        callback(new Error("请输入正确的电话号码"));
      } else {
        callback();
      }
    };
    return {
      active: 0,
      countries: [],
      netherlands: [],
      detailNetherlands: [],
      communities: [],
      uploadUrl: "http://localhost:8080/imgUpload",
      headers: { "u-token": sessionStorage.getItem("uToken") },
      certificateVisble: false,
      imgData: {
        path: "bishe/house",
      },
      picture: "",
      baseHouseInfo: {
        releaseName: "",
        releasePhone: "",
        countryId: "",
        netherlandsId: "",
        detailNetherlandsId: "",
        communityId: "",
        houseNumber: "",
        rentalType: "2",
      },
      houseInfo: {
        releaseName: "",
        releasePhone: "",
        countryId: "",
        netherlandsId: "",
        detailNetherlandsId: "",
        releaseTime: "",
        communityId: "",
        houseNumber: "",
        rentalType: "2",
        quote: "",
        area: "",
        room: "",
        hall: "",
        toilet: "",
        floor: "",
        totalFloor: "",
        houseType: "",
        description: "",
        characters: [],
        img: "",
        certificateImg: "",
        cashPledge: "",
      },
      rules1: {
        releaseName: [
          { required: true, message: "请输入姓名", trigger: "blur" },
        ],
        releasePhone: [
          { required: true, validator: validatePhone, trigger: "blur" },
        ],
        countryId: [
          { required: true, message: "请输入城市", trigger: "change" },
        ],
        netherlandsId: [
          { required: true, message: "请输入地区", trigger: "change" },
        ],
        detailNetherlandsId: [
          { required: true, message: "请输入详细地区", trigger: "change" },
        ],
        communityId: [
          { required: true, message: "请输入小区", trigger: "change" },
        ],
        houseNumber: [
          { required: true, message: "请输入门牌号", trigger: "blur" },
        ],
      },
      rules2: {
        quote: [{ required: true, message: "请输入报价", trigger: "blur" }],
        cashPledge: [
          { required: true, message: "请输入押金", trigger: "blur" },
        ],
        area: [{ required: true, message: "请输入整租面积", trigger: "blur" }],
        room: [{ required: true, message: "请输入室", trigger: "blur" }],
        hall: [{ required: true, message: "请输入厅", trigger: "blur" }],
        toilet: [{ required: true, message: "请输入卫", trigger: "blur" }],
        floor: [{ required: true, message: "请输入楼层", trigger: "blur" }],
        totalFloor: [
          { required: true, message: "请输入总楼层", trigger: "blur" },
        ],
        houseType: [
          { required: true, message: "请输入房屋类型", trigger: "change" },
        ],
        releaseTime: [
          {
            required: true,
            message: "请输入发布时间",
            trigger: "change",
          },
        ],
      },
      loginVisble: false,
    };
  },
  methods: {
    login() {
      this.$router.push("/login");
    },
    getUserInfo(val) {
      request({
        url: "/user/user-id",
        params: {
          id: val,
        },
      }).then((res) => {
        if (res.data.msg == "NoUser" || res.data.code == "000004") {
          this.loginVisble = false;
          return;
        }else{
          this.loginVisble = true
        }
      });
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      return isJPG;
    },
    handleImgAvatarSuccess(res, file) {
      if (res.msg == "NoUser" || res.code == "000004") {
        this.$message.error("未登录,请登录!");
      } else {
        this.houseInfo.img = res.data;
        this.$message.success("上传成功");
      }
    },
    handleCertificateAvatarSuccess(res, file) {
      if (res.msg == "NoUser" || res.code == "000004") {
        this.$message.error("未登录,请登录!");
      } else {
        this.houseInfo.certificateImg = res.data;
        this.$message.success("上传成功");
      }
    },
    quit(formName1, formName2) {
      this.$refs[formName1].resetFields();
      this.$refs[formName2].resetFields();
      this.active = 0;
    },
    BaseNext(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.active++;
        } else {
          this.$message.error("未填写正确");
          return false;
        }
      });
    },
    submit() {
      this.certificateVisble = true;
      this.imgData.path = "bishe/certificate";
    },
    upHouseInfos(formName) {
      this.certificateVisble = false;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          request({
            url: "/house",
            method: "POST",
            data: {
              releaseName: this.baseHouseInfo.releaseName,
              releasePhone: this.baseHouseInfo.releasePhone,
              countryId: this.baseHouseInfo.countryId,
              netherlandsId: this.baseHouseInfo.netherlandsId,
              detailNetherlandsId: this.baseHouseInfo.detailNetherlandsId,
              communityId: this.baseHouseInfo.communityId,
              houseNumber: this.baseHouseInfo.houseNumber,
              rentalType: this.baseHouseInfo.rentalType,
              quote: this.houseInfo.quote,
              area: this.houseInfo.area,
              room: this.houseInfo.room,
              hall: this.houseInfo.hall,
              toilet: this.houseInfo.toilet,
              floor: this.houseInfo.floor,
              totalFloor: this.houseInfo.totalFloor,
              houseType: this.houseInfo.houseType,
              description: this.houseInfo.description,
              characters: this.houseInfo.characters.toString(),
              img: this.houseInfo.img,
              userId: sessionStorage.getItem("id"),
              cashPledge: this.houseInfo.cashPledge,
              certificateImg: this.houseInfo.certificateImg,
            },
          }).then((res) => {
            this.active++;
            this.$message.success("提交成功!");
          });
        } else {
          this.$message.error("未填写正确");
          return false;
        }
      });
    },
    pre() {
      this.active--;
    },
    getAllCountries() {
      request({
        url: "/house/countries",
      }).then((res) => {
        console.log(res);
        if (res.data.msg == "NoUser") {
          this.$message.error("未登录，请登录!");
          setTimeout(() => {
            this.$router.push("/login");
          }, 3000);
        } else {
          this.countries = res.data.data;
        }
      });
    },
    countryChange(val) {
      request({
        url: "/house/netherlands",
        params: {
          countryId: val,
        },
      }).then((res) => {
        this.netherlands = res.data.data;
      });
    },
    netherlandsChange(val) {
      request({
        url: "/house/detailNetherlands",
        params: {
          countryId: this.baseHouseInfo.countryId,
          netherlandsId: val,
        },
      }).then((res) => {
        this.detailNetherlands = res.data.data;
      });
    },
    detailNetherlandsChange(val) {
      request({
        url: "/house/communities",
        params: {
          countryId: this.baseHouseInfo.countryId,
          netherlandsId: this.baseHouseInfo.netherlandsId,
          detailNetherlandsId: val,
        },
      }).then((res) => {
        this.communities = res.data.data;
      });
    },
  },
  created() {
    this.getUserInfo(sessionStorage.getItem("id"));
  },
};
</script>

<style>
@import url("../../assets/css/common.css");
.img {
  width: 100%;
  border: none;
  vertical-align: middle;
}
.title-release {
  font-weight: bold;
  font-size: 28px;
  text-align: center;
  color: #000;
}
.processBar {
  width: 700px;
  margin-left: 28.5%;
}
.write-houseInfo {
  margin-top: 20px;
  margin-left: 30%;
  width: 500px;
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