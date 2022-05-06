<template>
  <div class="home">
    <div class="home-content">
      <!-- <img src="../assets/images/homeBg.png" alt="背景图" class="homeBg" /> -->
      <div class="home-four">
        <div class="box">
          <div class="box-show" @click="go">
            <img src="../assets/images/3.png" alt="气" />
            <div>气</div>
          </div>
        </div>
        <div class="box">
          <div class="box-show">
            <img src="../assets/images/1.png" alt="固" />
            <div>固</div>
          </div>
        </div>
        <div class="box">
          <div class="box-show">
            <img src="../assets/images/4.png" alt="水" />
            <div>水</div>
          </div>
        </div>
        <div class="box">
          <div class="box-show">
            <img src="../assets/images/2.png" alt="环保管家" />
            <div>环保管家</div>
          </div>
        </div>
      </div>
    </div>
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
  methods: {
    go() {
      this.$router.push({
        path: "/about",
      });
    },
  },
};
</script>

<style lang="less" scoped>
.home {
  display: flex;
  align-items: center;
  justify-content: space-around;
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
  .home-content {
    // margin: 0 auto;
    // width: 60vw;
    // .homeBg {
    //   // width: 100%;
    //   height: 360px; // 加了高度有些许变形
    // }
    .home-four {
      display: flex;
      flex-wrap: wrap;
      width: 80%;
      margin: 0 auto;
      padding-bottom: 28px;
      .box {
        width: 48%;
        text-align: center;
        font-size: 20px;
        font-weight: bold;
        color: #a7a8bd;
        .box-show {
          margin: 0 auto;
          padding: 28px;
          width: 280px;
          height: 280px;
          border-radius: 6px;
          box-shadow: 1px 2px 6px 2px #a7a8bd;
          cursor: pointer;
          div {
            line-height: 42px;
          }
        }
      }
      .box:nth-of-type(2) {
        .box-show {
          padding-top: 32px;
        }
      }
      .box:nth-of-type(3), .box:nth-of-type(4) {
        margin-top: 46px;
      }
    }
  }
}
</style>
