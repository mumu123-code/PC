<template>
  <div class="navMenu">
    <el-menu
      :default-active="$route.path"
      class="el-menu-vertical-demo"
      @select="handleSelect"
      @open="handleOpen"
    >
      <el-submenu index="/equipment">
        <template slot="title">
          <span>总设备</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/historyEquipment">历史数据</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-menu-item index="/abnormal">
        <span slot="title">异常行为</span>
      </el-menu-item>
      <el-menu-item index="/report">
        <span slot="title">诊断报告</span>
      </el-menu-item>
      <el-submenu index="/standing">
        <template slot="title">
          <span>台账报表</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/material">原辅材料台账</el-menu-item>
          <el-menu-item index="/consumablesChart">耗材台账</el-menu-item>
          <el-menu-item index="/historyChart">历史台账</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-menu-item index="electronicFile">
        <span slot="title">电子档案</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  data() {
    return {
      defaultIndex: "",
    };
  },
  methods: {
    handleOpen(key) {
      this.$router.push({
        path: key,
      });
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath, "handleSelect");
      this.$router.push({
        path: key,
      });
    },
  },
};
</script>