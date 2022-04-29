<template>
  <div class="equipment">
    <!-- 搜索 s -->
    <div class="equipment-search">
      <span>设备名称：</span>
      <el-select v-model="value" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      <el-button type="primary" :loading="butShow" class="searchBut"
        >查询</el-button
      >
    </div>
    <!-- 搜索 e -->

    <!-- 设备table s -->
    <div class="tableTitle">总设备列表</div>
    <el-table :data="tableData" max-height="350" border style="width: 100%">
      <el-table-column prop="deviceNumber" label="设备编号" align="center">
      </el-table-column>
      <el-table-column prop="nvocs" label="Vocs值" align="center">
      </el-table-column>
      <el-table-column
        prop="gvocs"
        label="gVocs值"
        align="center"
      ></el-table-column>
      <el-table-column label="工作状态" align="center">
        <template slot-scope="scope">
          {{ workingState(scope.row.operativeStatus) }}
        </template>
      </el-table-column>
      <el-table-column
        prop="todayAlarmSum"
        label="今日报警数"
        width="180"
        align="center"
      ></el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="success"
            plain
            @click="handleEdit(scope.$index, scope.row)"
            >查看</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 设备table e -->
    <!-- 分页 s -->
    <!-- <div class="pagination">
      <el-pagination layout="prev, pager, next" :background="true" :total="totalNum">
      </el-pagination>
    </div> -->
    <!-- 分页 e -->
  </div>
</template>

<script>
import { deviceList } from "../../assets/js/equipment";

export default {
  name: "equipmentView",
  data() {
    return {
      options: [
        {
          value: "1",
          label: "生产设备1",
        },
        {
          value: "2",
          label: "生产设备2",
        },
        {
          value: "3",
          label: "生产设备3",
        },
        {
          value: "4",
          label: "生产设备4",
        },
      ],
      value: "",
      butShow: false, // 按钮的loading
      tableData: [
        {
          id: 1,
          deviceNumber: 20220,
          nvocs: 1.2,
          gvocs: 2.0,
          operativeStatus: 1,
          todayAlarmSum: 20,
        },
        {
          id: 1,
          deviceNumber: 20220,
          nvocs: 1.2,
          gvocs: 2.0,
          operativeStatus: 1,
          todayAlarmSum: 20,
        },
        {
          id: 2,
          deviceNumber: 20222,
          nvocs: 1.2,
          gvocs: 2.0,
          operativeStatus: 1,
          todayAlarmSum: 20,
        },
        {
          id: 3,
          deviceNumber: 20223,
          nvocs: 1.2,
          gvocs: 2.0,
          operativeStatus: 1,
          todayAlarmSum: 20,
        },
        {
          id: 4,
          deviceNumber: 20224,
          nvocs: 1.2,
          gvocs: 2.0,
          operativeStatus: 1,
          todayAlarmSum: 20,
        },
        {
          id: 5,
          deviceNumber: 20225,
          nvocs: 1.2,
          gvocs: 2.0,
          operativeStatus: 1,
          todayAlarmSum: 20,
        },
        {
          id: 6,
          deviceNumber: 20226,
          nvocs: 1.2,
          gvocs: 2.0,
          operativeStatus: 1,
          todayAlarmSum: 20,
        },
        {
          id: 7,
          deviceNumber: 20227,
          nvocs: 1.2,
          gvocs: 2.0,
          operativeStatus: 1,
          todayAlarmSum: 20,
        },
      ],
      // tableNum: 5
    };
  },
  mounted() {
    this.getDeviceList();
  },
  methods: {
    handleEdit(index, row) {
      this.$router.push({
        name: "personal",
        query: {
          id: row.id,
        },
      });
    },
    workingState(index) {
      const stateArr = ["闲置", "烤漆", "喷漆"];
      return stateArr[index];
    },
    // 获取总设备列表
    async getDeviceList() {
      const res = await deviceList();
      if (res.code == "1" && res.data.length > 0) {
        this.tableData = res.data;
      }
    },
  },
};
</script>

<style lang="less" scoped>
@import "../../../static/css/number.css";

.equipment {
  .equipment-search {
    padding: 0 28px;
    .searchBut {
      margin-left: 14px;
    }
  }
  .tableTitle {
    margin: 28px 0 14px 0;
    padding-left: 14px;
    line-height: 32px;
    font-size: 20px;
    font-weight: bold;
  }
  .pagination {
    margin: 24px 0;
    width: 100%;
    text-align: center;
  }
}
</style>
