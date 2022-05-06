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
    <!-- 搜索 e -->

    <!-- 图表 s -->
    <div id="main"></div>
    <!-- 图表 e -->

  </div>
</template>

<script>
import * as echarts from 'echarts';

export default {
  name: "historyEquipment",
  data() {
    return {
      time: "", // 日期
      butShow: false, // loading
    };
  },
  mounted(){
    this.initChart();
  },
  methods: {
    getHistoryData() {
      console.log(this.time);
    },
    // 初始化图表
    initChart() {
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById('main'));
      // 绘制图表
      myChart.setOption({
        legend: [
          {
            top: "0%",
            right: "0%",
            textStyle: {
              fontSize: 12, // 字体大小
              color: "#", // 字体颜色（图例与图例文字配色保持一致）
            },
            data: [
              {
                name: "房间内Vocs值",
              },
              {
                name: "风管内Vocs值"
              }
            ]
          },
          {
            top: "0%",
            left: "0%",
            textStyle: {
              fontSize: 12, // 字体大小
              color: "#", // 字体颜色（图例与图例文字配色保持一致）
            },
            data: [
              {
                name: "房间内温度",
              },
              {
                name: "风管内温度"
              }
            ]
          }
        ],
        xAxis: {
          type: 'category',
          data: ['00:00', '00:15', '00:30', '00:45', '01:00']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: 'line',
            smooth: true
          }
        ]
      });
    }
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
#main {
  width: 960px;
  height: 300px;
}

</style>