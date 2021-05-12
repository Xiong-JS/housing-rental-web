<template>
  <div>
    <div class="login-main"></div>
    <div class="materialContainer">
      <div class="box">
        <div class="title">登录</div>
        <div class="input" @click="inputClick">
          <label for="name">账号</label>
          <input type="text" name="name" id="name" v-model="account" />
          <span class="spin"></span>
        </div>
        <div class="input" @click="inputClick">
          <label for="pass">密码</label>
          <input type="password" name="pass" id="pass" v-model="password" />
          <span class="spin"></span>
        </div>
        <div class="button user-login" @click="loginBtn" style="text-align: center">
          <button>
            <span>登录</span>
            <i class="fa fa-check"></i>
          </button>
        </div>
        <a href="javascript:" class="pass-forgot" @click="register">前往注册</a>
      </div>
    </div>
  </div>
</template>
<script>
import request from "../network/request";
import * as types from "../store/mutations-type-string";
export default {
  data() {
    return {
      account: "",
      password: "",
    };
  },
  methods: {
    inputClick() {
      $(".input input")
        .focus(function () {
          $(this)
            .parent(".input")
            .each(function () {
              $("label", this).css({
                "line-height": "18px",
                "font-size": "18px",
                "font-weight": "100",
                top: "0px",
              });
              $(".spin", this).css({
                width: "100%",
              });
            });
        })
        .blur(function () {
          $(".spin").css({
            width: "0px",
          });
          if ($(this).val() == "") {
            $(this)
              .parent(".input")
              .each(function () {
                $("label", this).css({
                  "line-height": "60px",
                  "font-size": "24px",
                  "font-weight": "300",
                  top: "10px",
                });
              });
          }
        });
    },
    loginBtn() {
      if (this.account != "" && this.password != "") {
        request({
          url: "/userLogin",
          params: {
            account: this.account,
            password: this.password,
          },
        }).then((res) => {
          console.log(res);
          console.log(res.data.result.code);
          if (res.data.result.code == "000002") {
            this.$message({
              showClose: true,
              message: res.data.result.msg,
              type: "success",
            });
            sessionStorage.setItem("id", res.data.result.data[0].id);
            sessionStorage.setItem("name", res.data.result.data[0].userName);
            sessionStorage.setItem("img", res.data.result.data[0].userImg);
            this.$store.commit(types.SETUSER, res.data.result.data);
            this.$store.commit(types.SETTOKEN, res.data.uToken);
            sessionStorage.setItem("uToken", res.data.uToken);
            setTimeout(() => {
              this.$router.go(-1);
            }, 1000);
          }
        });
      } else {
        this.$message({
          showClose: true,
          message: "用户名或密码为空",
          type: "error",
        });
      }
    },
    register() {
      this.$router.push("/register");
    },
  },
};
</script>

<style>
@import url("../assets/css/style.css");
.login-main {
  height: 730px;
  background-image: url("../assets/img/3.jpg");
  filter: blur(10px);
}
.user-login {
  background-color: transparent;
  border: 3px solid rgba(0, 0, 0, 0.1);
  font-weight: 900;
  font-size: 18px;
  color: rgba(0, 0, 0, 0.2);
}
.user-login:hover{
  color: #ed2553;
  border: 3px solid #ed2553;
}
</style>