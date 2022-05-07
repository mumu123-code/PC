<template>
  <div class="equipment">
    <!-- 搜索 s -->
    <div class="equipment-search">
      <span>日期：</span>
      <el-date-picker
        v-model="time"
        type="date"
        :editable="false"
        :clearable="false"
        value-format="yyyy-MM-dd"
        placeholder="选择日期">
      </el-date-picker>
      <el-button type="primary" :loading="butShow" class="searchBut" @click="getHistoryData"
        >查询</el-button
      >
    </div>
    <!-- 搜索 e -->

    <!-- 图表 s -->
    <div class="tableTitle">企业生产车间</div>
    <div id="main"></div>
    <!-- 图表 e -->

  </div>
</template>

<script>
import * as echarts from 'echarts';
import moment from "moment";

import { getReportDetail } from '../../assets/js/equipment';

export default {
  name: "historyEquipment",
  data() {
    return {
      time: '', // 日期
      butShow: false, // loading
      formInfo: {
        deviceId: 0, // 设备id
        startDate: '', // 开始时间
        endDate: '', // 结束时间
        pageNum: 1,
        pageSize: 1000,
      },
      dateArr: [], // 存放xaxis轴得时间刻度
      roomVocsArr: [], // 房间内Vocs值
      ductVocsArr: [], // 风管内Vocs值
      roomTemArr: [], // 房间内温度
      ductTemArr: [], // 风管内温度
      seriesData: [
        {
            name: '房间内Vocs值',
            type: "line",
            color: ["#1890FF"],
            symbol: 'none',
            smooth: false,
            data: [],
          },
          {
            name: '风管内Vocs值',
            type: "line",
            color: ["#91CB74"],
            symbol: 'none',
            smooth: false,
            data: [],
          },
          {
            name: '房间内温度',
            type: "line",
            color: ["#FAC858"],
            symbol: 'none',
            smooth: false,
            data: [],
          },
          {
            name: '风管内温度',
            type: "line",
            color: ["#EE6666"],
            symbol: 'none',
            smooth: false,
            data: [],
          }
      ],
      options: {
        legend: [
          {
            top: "0%",
            left: "0%",
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
            right: "0%",
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
        tooltip: {
          trigger: 'axis'
        },
        xAxis: {
          name: '时间',
          type: 'category',
          data: [],
          nameTextStyle: {
            padding: [0,0,20,50]
          },
          axisLabel: {
            interval: 59
          }
        },
        yAxis: [
          {
            type: 'value',
            name: "Vocs值",
            nameTextStyle: {
              padding: [0,0,0,0]
            },
            splitNumber: 6, // 设置坐标轴的分割段数
            min: 0,
            max: 10,
            interval: (10 - 0) / 6,
            axisLabel: {
              formatter: function(v) {
                return v.toFixed(1)
              }
            },
          },
          {
            type: 'value',
            name: "温度值",
            nameTextStyle: {
              padding: [0,0,0,0]
            },
            splitNumber: 6, // 设置坐标轴的分割段数
            min: 0,
            max: 30,
            interval: (30 - 0) / 6,
            axisLabel: {
              formatter: function(v) {
                return v.toFixed(1)
              }
            },
          }
        ],
        series: []
      }
    };
  },
  async mounted(){
    this.time = moment(new Date()).format('YYYY-MM-DD');
    // 获取id
    this.formInfo.deviceId = this.$route.query.id;
    await this.getHistoryData();
  },
  methods: {
    // 获取最大值方法
    calMax(arr) {
      var max = Math.max.apply(null, arr); // 获取最大值方法
      var maxint = Math.ceil(max / 5); // 向上以5的倍数取整
      var maxval = maxint * 5 + 5; // 最终设置的最大值
      return maxval; // 输出最大值
    },
    // 获取最小值方法
    // calMin(arr) {
    //   var min = Math.min.apply(null, arr); // 获取最小值方法
    //   var minint = Math.floor(min / 1); // 向下以1的倍数取整
    //   var minval = minint * 1 - 5; // 最终设置的最小值
    //   return minval; // 输出最小值
    // },
    // getXaxis() {
    //   let Arr = [];
    //   for (let i = 0; i < 24; i++) {
    //     for (let k = 0; k < 60; k++) {
    //       let mm,dd;
    //       i < 10 ? (mm = `0${i}`) : (mm = i);
    //       k < 10 ? (dd = `0${k}`) : (dd = k);
    //       Arr.push(`${mm}:${dd}`);
    //     }
    //   }
    //   Arr.push('23:59');
    //   return Arr;
    // },
    // 初始化图表
    initChart() {
      // 调用方法获取数据的最大值
      // const dataMaxGv = this.calMax(this.roomVocsArr); // Vocs最大值
      // const dataMaxNv = this.calMax(this.ductVocsArr);
      // const dataMaxGt = this.calMax(this.roomTemArr); // 温度最大值
      // const dataMaxNt = this.calMax(this.ductTemArr);

      // let maxV,maxT;
      // dataMaxGv > dataMaxNv ? (maxV = dataMaxGv) : (maxV = dataMaxNv);
      // dataMaxGt > dataMaxNt ? (maxT = dataMaxGt) : (maxT = dataMaxNt);

      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById('main'));
      // 绘制图表
      console.log(this.options, 'options');
      console.log(this.seriesData, 'seriesData');
      myChart.setOption(this.options);
    },
    // 获取设备信息
    async getHistoryData() {
      if(this.time) {
        this.formInfo.startDate = `${this.time} 00:00:00`;
        this.formInfo.endDate = `${this.time} 23:59:59`;
      }

      const res = await getReportDetail(this.formInfo);
      if(res.code == '1') {
        res.data.list.map(item => {
          // 取出需要的值
          const { createTime, gvocs, nvocs, gtemperature, ntemperature } = item;
          const date = createTime.split(' ');
          if(!this.dateArr.length) {
            this.dateArr.push(date[1]);
            this.roomVocsArr.push(gvocs);
            this.ductVocsArr.push(nvocs);
            this.roomTemArr.push(gtemperature);
            this.ductTemArr.push(ntemperature);
          } else {
            // 如果数组的最后一位与本次循环时间不相同，添加本次时间进去
            if(this.dateArr[this.dateArr.length] !== date[1]) {
              this.dateArr.push(date[1]);
              this.roomVocsArr.push(gvocs);
              this.ductVocsArr.push(nvocs);
              this.roomTemArr.push(gtemperature);
              this.ductTemArr.push(ntemperature);
            }
          }
        })
      }
      if(res.data.pages > res.data.pageNum) {
        this.getHistoryData();
      } else {
          this.$set(this.seriesData[0],'data',this.roomVocsArr);
          this.$set(this.seriesData[1],'data',this.ductVocsArr);
          this.$set(this.seriesData[2],'data',this.roomTemArr);
          this.$set(this.seriesData[3],'data',this.ductTemArr);
          this.$set(this.options.xAxis,'data', this.dateArr);
          this.$set(this.options,'series',this.seriesData);
          this.initChart();          
      }
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
  width: 1260px;
  height: 300px;
}

.tableTitle {
    margin: 28px 0 14px 0;
    padding-left: 14px;
    line-height: 32px;
    font-size: 20px;
    font-weight: bold;
  }

</style>