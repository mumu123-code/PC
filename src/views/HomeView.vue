<template>
  <div class="home">
    <img src="../assets/images/homeBg.png" alt="背景图" />
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
  width: 100vw;
  height: 100vh;
  background: rgba(255, 255, 255, 0.7);
  background-image: linear-gradient(
    to bottom right,
    #f3ece6,
    #e5e7eb,
    #e4f0e4,
    #f5f3e2
  );
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px);
}
</style>
