<template>
  <div class="home">
    <el-button type="primary">主要按钮</el-button>
  </div>
</template>

<script>
// import导入日期格式化
import moment from "moment";
// import 引入 lodash
import * as _ from "lodash"; // 引入 lodash 方法

export default {
  name: "HomeView",
  data() {
    return {};
  },
  created() {
    console.log(moment().format("dddd"));
    console.log(_.range(10)); // 生成元素为0到9的数组
  },
};
</script>

<style lang="less" scoped>
.home {
}
</style>
