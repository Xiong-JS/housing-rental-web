<template>
<div class="edit-mian">
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
          <el-tab-pane label="未完成订单">
           
          </el-tab-pane>
          <el-tab-pane label="已完成订单">
           
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
  
</template>

<script>
export default {
  
}
</script>

<style>
@import url("../../assets/img/icon/iconfont.css");
@import url("../../assets/css/common.css");
.edit-mian {
  background-color: #f3f3f3;
  height: 100%;
  width: 100%;
  /* position: absolute; */
}

</style>