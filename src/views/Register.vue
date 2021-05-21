<template>
<div>
  <div class="main"></div>
  <div class="materialContainer">
    <div class="box">
      <div class="title">注册</div>
      <div class="input" @click="inputClick">
        <label for="regname">用户名</label>
        <input type="text" v-model="regname" id="regname" />
        <span class="spin"></span>
      </div>
      <div class="input" @click="inputClick">
        <label for="regpass">密码</label>
        <input type="password" v-model="regpass" id="regpass" />
        <span class="spin"></span>
      </div>
      <div class="input" @click="inputClick">
        <label for="reregpass">确认密码</label>
        <input type="password" v-model="reregpass" id="reregpass" />
        <span class="spin"></span>
      </div>
      <div class="button login" >
        <button @click="registerBtn">
          <span>注册</span>
        </button>
      </div>
      <a href="javascript:" class="pass-forgot" @click="login">已有账号</a>
    </div>
  </div>
</div>
  
</template>

<script>
import request from "../network/request";
export default {
  data() {
    return {
      regname: "",
      regpass: "",
      reregpass: "",
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
    registerBtn() {
      if(this.regpass != this.reregpass){
        this.$message.error("两次输入密码不同!")
        return
      }
      if(this.regpass == '' || this.reregpass == ''||this.userAccount == ''){
        this.$message.error("用户名或密码不能为空")
        return
      }
      request({
        url: "/user/user-register",
        method: "post",
        data: {
          userAccount: this.regname,
          userPassword: this.reregpass,
        },
      }).then((res) => {
        if (res.data.code == "200") {
          this.$message.success("注册成功!现在跳转到登录界面!");
          setTimeout(() => {
            this.login();
          }, 1000);
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    login() {
      this.$router.push({
        path:'/login',
        query:{
          type:'login'
        }
      });
    },
  },
};
</script>

<style>
@import url("../assets/css/style.css");
.main {
  height: 730px;
  background-image: url("../assets/img/3.jpg");
  filter: blur(10px);
}
</style>