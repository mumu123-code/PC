<template>
  <div class="about">
    <el-container>
      <el-header>
        VOCs数智哨兵系统(企业版)
      </el-header>
      <div class="title-exit">
        <div class="title">( {{companyName}} )</div>
        <div class="exit">
          <el-button type="primary" size="mini" @click.native="loginHome">首页</el-button>
          <el-button type="primary" icon="el-icon-user" size="mini" @click.native="loginOut">退出</el-button>
        </div>
      </div>

      <el-container>
        <el-aside width="200px">
          <NavMenu />
        </el-aside>
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import NavMenu from "../components/Navmenu/NavMenu.vue";
// import { loginGetOut } from "../assets/js/Login";

export default {
  name: "AboutView",
  data() {
    return {
      companyName:"",
    };
  },
  created(){
    this.companyName = JSON.parse(sessionStorage.getItem('userInfo')).companyName
  },
  components: {
    NavMenu,
  },
  methods:{
    loginOut(){
      sessionStorage.removeItem("userInfo");
      this.$router.push('/');
    },
    loginHome() {
      // 登录成功跳转到首页
      this.$router.push({
        path: "/home",
      });
    }
  }
};
</script>

<style lang="less" scoped>
.about {
  color: #333;
  .el-header {
    // background-color: #fff;
    color: #f0f0f0;
    text-align: center;
    height: 40px !important;
    line-height: 52px;
    font-weight: bold;
    font-size: 20px;
    letter-spacing: 2px;
    text-align: left;
    // 背景颜色
    background: #242F41;
  }
  .title-exit{
    display: flex;
    background: #242F41;
    color: #F0F0F0;
    .exit{
      position: fixed;
      top: 20px;
      right: 32px;
      margin-right: 20px;
    }
  }
  .title{
    margin-left: 32px;
    margin-bottom: 14px;
    width: 100%;
    text-align: left;
  }
  .el-aside {
    background-color: #324158;
    height: calc(100vh - 80px);
  }
  .el-main {
    width: calc(100% - 200px);
    background-color: #fff;
    height: 90vh;
    overflow-x: hidden;
    background-color: #F0F0F0;
  }
}
</style>
