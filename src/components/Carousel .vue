<template>
  <div>
    <el-carousel :interval="4000" type="card" height="350px" >
      <el-carousel-item
        v-for="item in imgData"
        :key="item.id"
      >
        <div>
          <el-image :src="item.imgUrl" style="object-fit: contain;">
          </el-image>
        </div>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
import request from "../network/request";
export default {
  data() {
    return {
      imgData: [],
    };
  },
  methods: {},
  created() {
    request({
      url: "/carousel/all",
    })
      .then((res) => {
        this.imgData = res.data.data;
      })
      .catch((err) => {});
  },
};
</script>

<style>
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
.banner {
  object-fit: contain;
  background-image: url();
}
</style>