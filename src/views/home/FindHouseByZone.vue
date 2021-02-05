<template>
  <div>
    <div class="filter">
      <el-form ref="form" label-width="80px">
        <el-form-item label="区域：">
          <el-radio-group v-model="area" @change="areaChange">
            <el-radio :label="0">不限</el-radio>
            <el-radio :label="1">九龙坡</el-radio>
            <el-radio :label="2">北碚</el-radio>
            <el-radio :label="3">南岸</el-radio>
            <el-radio :label="4">巴南</el-radio>
            <el-radio :label="5">渝北</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="租金：">
          <el-radio-group v-model="quote" @change="quoteChange">
            <el-radio :label="0">不限</el-radio>
            <el-radio :label="1">1500元以下</el-radio>
            <el-radio :label="2">1500-2000元</el-radio>
            <el-radio :label="3">2000-3000元</el-radio>
            <el-radio :label="4">2000-3000元</el-radio>
            <el-radio :label="5">4000-5000元</el-radio>
            <el-radio :label="6">5000元以上</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="类型：">
          <el-radio-group v-model="type" @change="typeChange">
            <el-radio label="0">不限</el-radio>
            <el-radio label="1">合租</el-radio>
            <el-radio label="2">整租</el-radio>
            <el-radio label="3">公寓</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="户型：">
          <el-radio-group v-model="rentalType" @change="rentalTypeChange">
            <el-radio :label="0">不限</el-radio>
            <el-radio :label="1">一室</el-radio>
            <el-radio :label="2">二室</el-radio>
            <el-radio :label="3">三室</el-radio>
            <el-radio :label="4">三室以上</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="特色：">
          <el-checkbox-group
            v-model="chracter"
            :max="maxCheck"
            :min="minCheck"
            @change="chracterChange"
          >
            <el-checkbox label="独卫" name="chracter"></el-checkbox>
            <el-checkbox label="月付" name="chracter"></el-checkbox>
            <el-checkbox label="带阳台" name="chracter"></el-checkbox>
            <el-checkbox label="精装修" name="chracter"></el-checkbox>
            <el-checkbox label="全网底价" name="chracter"></el-checkbox>
            <el-checkbox label="家电齐全" name="chracter"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
    </div>
    <div class="part-line-5"></div>
    <div>
      <el-row >
        <el-col
          :span="18"
          v-for="(o) in 3"
          :key="o"
          :offset="3"

        >
          <el-card :body-style="{ padding: '0px',height:'200px'}">

            <!-- <img src="../../assets/img/1.jpg" class="image"/>
            <div style="padding: 14px">
              <span>好吃的汉堡</span>
              <div>
                <time class="time">{{ currentDate }}</time>
                <el-button type="text" class="button">操作按钮</el-button>
              </div>
            </div> -->
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      quote: 0,
      type: this.$route.query.type,
      rentalType: 0,
      chracter: [],
      minCheck: 0,
      maxCheck: 4,
      area: 0,
      currentDate: new Date(),
    };
  },
  methods: {
    quoteChange(val) {
      console.log(val);
    },
    typeChange(val) {
      console.log(val);
    },
    rentalTypeChange(val) {
      console.log(val);
    },
    chracterChange(val) {
      console.log(this.chracter);
    },
    areaChange(val) {
      console.log(val);
    },
  },
};
</script>

<style>
@import url("../../assets/css/common.css");
@import url("../../assets/css/findHouseByZone.css");
.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}

.image {
  width: 100%;
  display: block;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}
</style>