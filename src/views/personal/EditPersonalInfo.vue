<template>
  <div class="edit-mian">
    <div class="gray-back">
      <div class="person-info">
        <div>
          <i
            class="iconfont icon-back"
            style="cursor: pointer"
            @click="$router.go(-1)"
          ></i>
        </div>
        <div class="part-line-2" style="margin-top: 10px"></div>
        <div>
          <el-tabs tab-position="left" style="height: 100%">
            <el-tab-pane label="账号信息">
              <div class="account-info">
                <div class="account-title">账号信息</div>
                <div class="part-line-1"></div>
                <div class="line-format">
                  <i class="iconfont icon-success"></i>
                  <span class="title-list">账号</span>
                  <strong>{{ user.userAccount }}</strong>
                </div>
                <div class="part-line-1"></div>
                <div class="line-format">
                  <i class="iconfont icon-success"></i
                  ><span class="title-list">姓名</span>
                  <strong>{{ user.userName }}</strong>
                  <span class="edit" @click="editNameVisble = true">修改</span>
                  <div v-show="editNameVisble">
                    <div style="margin-left: 150px">
                      <div>
                        <el-form
                          :model="editUser"
                          class="demo-ruleForm"
                          label-width="100px"
                        >
                          <el-form-item
                            prop="userName"
                            label="姓名"
                            style="width: 300px"
                          >
                            <el-input
                              v-model="editUser.userName"
                              require
                            ></el-input>
                          </el-form-item>
                          <el-form-item>
                            <el-button type="primary" @click="confirmEditName()"
                              >确定</el-button
                            >
                            <el-button type="info" plain @click="quitName"
                              >取消</el-button
                            >
                          </el-form-item>
                        </el-form>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="part-line-1"></div>
                <div class="line-format">
                  <i class="iconfont icon-success"></i
                  ><span class="title-list">密码</span>
                  <strong>*********</strong>
                  <span class="edit" @click="editPasswordVisble = true"
                    >修改</span
                  >
                  <div v-show="editPasswordVisble">
                    <el-form
                      :model="editUser"
                      status-icon
                      :rules="rules"
                      ref="editUser"
                      label-width="100px"
                      class="demo-ruleForm"
                      style="margin-left: 150px"
                    >
                      <el-form-item label="密码" prop="userPassword">
                        <el-input
                          type="password"
                          v-model="editUser.userPassword"
                          auto-complete="off"
                          style="width: 300px"
                        ></el-input>
                      </el-form-item>
                      <el-form-item label="确认密码" prop="checkPassword">
                        <el-input
                          type="password"
                          v-model="editUser.checkPassword"
                          auto-complete="off"
                          style="width: 300px"
                        ></el-input>
                      </el-form-item>
                      <el-form-item>
                        <el-button
                          type="primary"
                          @click="confirmEditPassword('editUser')"
                          >提交</el-button
                        >
                        <el-button type="info" plain @click="quitPassword"
                          >取消</el-button
                        >
                      </el-form-item>
                    </el-form>
                  </div>
                </div>
                <div class="part-line-1"></div>
                <div class="line-format">
                  <i class="iconfont icon-success"></i
                  ><span class="title-list">头像</span>
                  <el-upload
                    class="avatar-uploader"
                    :action="uploadUrl"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload"
                    :headers="headers"
                    :data="imgData"
                    style="display: inline"
                  >
                    <img
                      v-if="user.userImg"
                      :src="user.userImg"
                      class="avatar"
                    />
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  </el-upload>
                </div>
                <div class="part-line-1"></div>
                <div class="line-format">
                  <i class="iconfont icon-success"></i
                  ><span class="title-list">注册时间</span>
                  <strong>{{ user.userRegisterTime }}</strong>
                </div>
                <div class="part-line-1"></div>
                <div class="line-format">
                  <i class="iconfont icon-success"></i
                  ><span class="title-list">零钱</span>
                  <strong>{{ user.userWallet }}</strong>
                  <span class="edit" @click="recharge">充值</span>
                </div>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </div>
    <el-dialog title="充值" :visible.sync="rechargeVisble" width="30%" center>
      <el-input-number
        v-model="wallet"
        placeholder="请输入充值金额"
      ></el-input-number>
      <span slot="footer" class="dialog-footer">
        <el-button @click="rechargeVisble = false">取 消</el-button>
        <el-button type="primary" @click="confirmRecharge">充 值</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import request from "../../network/request";
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.editUser.checkPass !== "") {
          this.$refs.editUser.validateField("checkPassword");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.editUser.userPassword) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      user: {},
      uploadUrl: "http://localhost:8080/imgUpload",
      headers: { "u-token": sessionStorage.getItem("uToken") },
      imgData: {
        path: "bishe/house",
      },
      editNameVisble: false,
      editPasswordVisble: false,
      editUser: {
        userImg: "",
        userName: "",
        userPassword: "",
        checkPassword: "",
      },
      rules: {
        userName: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        userPassword: [{ validator: validatePass, trigger: "blur" }],
        checkPassword: [{ validator: validatePass2, trigger: "blur" }],
      },
      rechargeVisble: false,
      wallet: 0,
    };
  },
  methods: {
    getUserInfo(val) {
      request({
        url: "/user/user-id",
        params: {
          id: val,
        },
      }).then((res) => {
        this.user = res.data.data;
      });
    },
    handleAvatarSuccess(res, file) {
      if (res.data.msg == "NoUser" || res.data.code == "000004") {
        this.$message.error("未登录,请登录!");
      } else {
        this.user.userImg = res.data;
        this.editUserInfo();
        sessionStorage.setItem('img',this.user.userImg)
      }
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      return isJPG;
    },
    editUserInfo() {
      request({
        url: "/user/userEdit",
        method: "post",
        data: {
          id: this.user.id,
          userAccount: this.user.userAccount,
          userPassword: this.user.userPassword,
          userName: this.user.userName,
          userImg: this.user.userImg,
          userRegisterTime: this.user.userRegisterTime,
          userWallet: this.user.userWallet,
        },
      }).then((res) => {
        this.user = res.data.data;
      });
    },
    quitName() {
      this.editUser.userName = "";
      this.editNameVisble = false;
    },
    confirmEditName() {
      if (this.editUser.userName == "") {
        this.$message.error("姓名未填写!");
        return;
      }
      this.user.userName = this.editUser.userName;
      this.editUserInfo();
      this.editNameVisble = false;
      this.$message.success("提交成功!");
    },
    confirmEditPassword(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.user.userPassword = this.editUser.userPassword;
          this.editUserInfo();
          this.editPasswordVisble = false;
          this.$message.success("修改成功!");
          sessionStorage.removeItem('id')
          sessionStorage.removeItem('img')
          sessionStorage.removeItem('uToken')
          sessionStorage.removeItem('name')
          this.$router.push("/login");
        } else {
          return false;
        }
      });
    },
    quitPassword() {
      this.editUser.userPassword = "";
      this.editPasswordVisble = false;
    },
    recharge() {
      this.rechargeVisble = true;
      this.wallet = 0;
    },
    confirmRecharge() {
      request({
        url: "/user/user-recharge",
        method: "post",
        data: {
          userWallet: this.wallet,
          id: sessionStorage.getItem("id"),
        },
      }).then((res) => {
        this.rechargeVisble = false;
        this.$message.success("充值成功!");
        this.getUserInfo(this.$route.query.id);
      });
    },
  },
  created() {
    this.getUserInfo(this.$route.query.id);
  },
};
</script>

<style>
@import url("../../assets/img/icon/iconfont.css");
@import url("../../assets/css/common.css");
.edit-mian {
  background-color: #f3f3f3;
  height: 100%;
  width: 100%;
  position: absolute;
}
.gray-back {
  background-color: #f3f3f3;
}
.person-info {
  margin: 0 auto;
  width: 1200px;
  margin-top: 20px;
  background-color: white;
}
.account-info {
  padding: 20px 30px 10px 10px;
}
.account-title {
  color: #666666;
  font-size: 25px;
  padding-bottom: 10px;
}
.line-format {
  padding: 20px 0 20px 0;
}

.title-list {
  color: #333333;
  font-size: 18px;
  display: inline-block;
  width: 150px;
  margin-left: 10px;
}
.edit {
  color: #ed2553;
  float: right;
  cursor: pointer;
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