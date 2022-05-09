<template>
  <div class="equipment">
    <!-- 搜索 s -->
    <div class="equipment-search">
      <span>房间名称：</span>
      <el-select v-model="value" placeholder="请选择" size="small">
        <el-option
          v-for="item in tableData"
          :key="item.roomName"
          :label="item.roomName"
          :value="item.roomName"
        >
        </el-option>
      </el-select>
      <el-button type="primary" :loading="butShow" class="searchBut" size="small"
        >查询</el-button
      >
    </div>
    <!-- 搜索 e -->

    <!-- 设备table s -->
    <div class="tableTitle">总设备列表</div>
    <el-table :data="tableData" max-height="850" border style="width: 100%">
     <el-table-column prop="roomName" label="房间名称" align="center">
      </el-table-column>
      <el-table-column prop="deviceNumber" label="设备编号" align="center">
      </el-table-column>
      <el-table-column prop="nvocs" label="Vocs(LW-N)" align="center">
      </el-table-column>
      <el-table-column
        prop="gvocs"
        label="gVocs(LW-G)"
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
    <div class="pagination">
      <el-pagination layout="prev, pager, next" :background="true" :total="tableNum">
      </el-pagination>
    </div>
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
      tableData: [], // 总设备列表总数据
      tableNum: 1, // 分页总长度
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
          roomName: row.roomName
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
        // 赋值总长度
        this.tableNum = res.data.length;
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
    text-align: right;
  }
}
</style>
