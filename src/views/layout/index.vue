<template>
  <div class="about">
    <el-container>
      <el-header>企业PC系统</el-header>
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
import NavMenu from "../../components/Navmenu/NavMenu.vue";

export default {
  name: "AboutView",
  data() {
    return {};
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
    line-height: 8vh;
    font-weight: bold;
    font-size: 20px;
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
