<template>
  <div class="equipment">
    <!-- 搜索 s -->
    <div class="equipment-search">
      <span>日期：</span>
      <el-date-picker
        v-model="time"
        value-format="yyyy-MM-dd HH:mm:ss"
        type="datetimerange"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        @change="getHistoryData"
      >
      </el-date-picker>
      <el-button type="primary" :loading="butShow" class="searchBut"
        >查询</el-button
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "historyEquipment",
  data() {
    return {
      time: "", // 日期
      butShow: false, // loading
    };
  },
  methods: {
    getHistoryData() {
      console.log(this.time);
    },
  },
};
</script>

<style lang="less" scoped>
.equipment {
  .equipment-search {
    padding: 0 28px;
    .searchBut {
      margin-left: 14px;
    }
  }
}
</style>
