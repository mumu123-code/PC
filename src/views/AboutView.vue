<template>
  <div class="about">
    <el-container>
      <el-header>VOCs数智哨兵系统(企业版)</el-header>
      <div class="title-exit">
        <div class="title">( {{companyName}} )</div>
        <el-button class="exit" type="primary" icon="el-icon-user" size="mini" @click.native="loginOut">退出</el-button>
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
import { loginGetOut } from "../assets/js/Login";

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
    async loginOut(){
      const res = await loginGetOut();
      if (res.code == "1") {
        sessionStorage.removeItem("userInfo", JSON.stringify(res.data))
        this.$router.push('/')
      }
    }
  }
};
</script>

<style lang="less" scoped>
.about {
  color: #333;
  .el-header {
    background-color: #fff;
    text-align: center;
    height: 60px;
    line-height: 60px;
    font-weight: bold;
    font-size: 20px;
    letter-spacing: 2px;
  }
  .title-exit{
    display: flex;
    .exit{
      margin-right: 20px;
    }
  }
  .title{
    width: 100%;
    text-align: center;
  }
  .el-aside {
    background-color: #fff;
    height: 90vh;
  }
  .el-main {
    width: calc(100% - 200px);
    background-color: #fff;
    height: 90vh;
  }
}
</style>
