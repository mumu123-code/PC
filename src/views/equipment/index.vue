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
    <el-table :data="tableData" max-height="250" border style="width: 100%">
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

    <div class="tableTitle">企业生产状态统计图</div>
    <!-- 颜色提示 s -->
    <div class="boxColor">
      <div class="left"></div>
      <label>离线</label>
      <div class="left"></div>
      <label>闲置</label>
      <div class="left"></div>
      <label>烤漆</label>
      <div class="left"></div>
      <label>喷漆</label>
    </div>
    <!-- 颜色提示 e -->

    <div class="charts-box">
      <div class="line">
        <div
          v-for="index in 96"
          :key="index"
          :class="['line-item', 'br', 'offline']"
        ></div>
        <!-- <div
          v-for="(item, index) in productionStatusArr"
          :key="index"
          :class="[
            'line-item',
            'br',
            {
              offline: item.operativeStatus == 3,
              idle: item.operativeStatus == 0,
              varnish: item.operativeStatus == 1,
              paint: item.operativeStatus == 2,
            },
          ]"
        ></div> -->
      </div>
    </div>
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
      productionStatusArr: [
        {
          operativeStatus: 3,
        },
        {
          operativeStatus: 2,
        },
        {
          operativeStatus: 1,
        },
        {
          operativeStatus: 0,
        },
      ], // 设备生产状态数据
    };
  },
  mounted() {
    this.getDeviceList();
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row);
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
  // 颜色
  .boxColor {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 48px;
    .left {
      margin: 0 14px 0 28px;
      width: 42px;
      height: 14px;
      border-radius: 14px;
      background-color: red;
    }
    .left:nth-of-type(2) {
      // 闲置
      background-color: #cccccc;
    }
    .left:nth-of-type(3) {
      // 烤漆
      background-color: #18bc37;
    }
    .left:nth-of-type(4) {
      // 喷漆
      background-color: #1890ff;
    }
    label {
      font-size: 14px;
      color: #333333;
    }
  }
  .charts-box {
    width: 100%;
    height: 112px;
    margin: 28px 0;
    overflow-y: auto;
    white-space: nowrap;
    .line {
      width: 100%;
      .line-item {
        display: inline-block;
        width: 48px;
        height: 20px;
      }
      .br {
        position: relative;
        border-right: 1px solid #cccccc;
      }
      .br:nth-of-type(1) {
        margin-left: 40px;
        border-left: 1px solid #cccccc;
      }
      .br:nth-of-type(5n) {
        border-right: 1px solid #18bc37;
      }
      .mr {
        margin-left: -20px;
      }
      .mr:nth-of-type(n) {
        color: #18bc37;
      }
      .offline {
        // 离线
        background-color: red;
      }
      .idle {
        // 闲置
        background-color: #cccccc;
      }
      .varnish {
        // 烤漆
        background-color: #18bc37;
      }
      .paint {
        // 喷漆
        background-color: #1890ff;
      }
    }
  }
}
</style>
