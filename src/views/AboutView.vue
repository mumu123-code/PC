<template>
  <div class="about">
    <el-container>
      <el-header>VOCs数智哨兵系统(企业版)</el-header>
      <div class="title">( {{companyName}} )</div>
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
};
</script>

<style lang="less" scoped>
.about {
  color: #333;
  .el-header {
    background-color: #fff;
    text-align: center;
    height: 10vh;
    line-height: 10vh;
    font-weight: bold;
    font-size: 20px;
    letter-spacing: 2px;
  }
  .title{
    text-align: center;
  }
  .el-aside {
    background-color: #fff;
    height: 90vh;
  }
  .el-main {
    background-color: #fff;
    height: 90vh;
  }
}
</style>
