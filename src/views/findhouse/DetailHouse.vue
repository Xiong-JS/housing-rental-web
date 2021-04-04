<template>
  <div>
    <div style="detail">
      <img src="" alt="">
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  created(){
    console.log(this.$route.query.houseId);
  }
};
</script>

<style>
.detail{
  width: 900px;
  float: left;
}
</style>