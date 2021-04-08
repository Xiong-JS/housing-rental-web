<template>
  <div class="detail">
    <div>
      <img :src="houseInfos.img" alt="" class="houseImg"/>
    </div>
  </div>
</template>

<script>
import request from "../../network/request";
export default {
  data() {
    return {
      houseInfos: {},
    };
  },
  created() {
    request({
      url: "/house/by-houseId",
      params: {
        houseId: this.$route.query.houseId,
      },
    }).then((res) => {
      this.houseInfos = res.data.data;
    });
  },
};
</script>

<style>
.detail {
  width: 1200px;
  margin: 0 auto;
  background-color: black;
}
.houseImg {
  border: none 0;
  width: 700px;
  height: 400px;
}
</style>