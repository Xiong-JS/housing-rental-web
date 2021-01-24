<template>
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
      <div class="button login" @click="registerBtn">
        <button>
          <span>注册</span>
        </button>
      </div>
      <a href="javascript:" class="pass-forgot" @click="login">已有账号</a>
    </div>
  </div>
</template>

<script>
import request from "../network/request";
export default {
  data() {
    return {
      regpass: "",
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
      request({
        url: "/user",
        method: "post",
        data: {},
      });
      console.log("register");
      setTimeout(() => {
        this.login();
      }, 1000);
    },
    login() {
      this.$router.push("/login");
    },
  },
};
</script>

<style>
@import url("../assets/css/style.css");
</style>