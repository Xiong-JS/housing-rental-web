<template>
  <div>
    <el-menu
      :default-active="activePath"
      mode="horizontal"
      @select="handleSelect"
      :router="isRouter"
    >
      <slot></slot>
      
      <slot name="login"></slot>
      <slot name="register"></slot>
    </el-menu>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activePath: this.$route.path,
      isRouter: true,
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
  },
};
</script>

<style>
.logo {
  float: left;
  padding: 2px 10px 0 38px;
  margin-right: 30px;
}
/* .nav {
  margin-left: 20px;
} */
.el-menu-item {
  float: left;
  height: 45px;
  line-height: 45px;
  margin: 0px;
}
.el-menu--horizontal > .el-menu-item.is-active {
  border-bottom: 2px solid #ed2553;
}
</style>