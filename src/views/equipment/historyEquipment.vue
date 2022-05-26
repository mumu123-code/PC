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
    <div class="tableTitle">企业智能车间</div>
    <div id="main"></div>
    <div id="main1"></div>

    <!-- 颜色提示 s -->
    <div class="boxColor">
      <div class="left"></div>
      <label>离线</label>
      <div class="left"></div>
      <label>在线</label>
    </div>
    <!-- 颜色提示 e -->
    <!-- <div class="charts-box">
      <div class="line">
        <div
          v-for="(item, index) in productionStatusArr"
          :key="index"
          :class="[
            'line-item',
            'br2',
            {
              offline: !item,
              varnish: item,
            },
          ]"
        ></div>
      </div>
    </div> -->
    
    <div id="roundMain"></div>

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
        pageSize: 1440,
      },
      dateArr: [], // 存放xaxis轴得时间刻度
      roomVocsArr: [], // 房间内Vocs值
      ductVocsArr: [], // 风管内Vocs值
      roomTemArr: [], // 房间内温度
      ductTemArr: [], // 风管内温度
      options: {
        legend: [
          {
            top: "0%",
            right: "8%",
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
          },
          {
            top: "0%",
            left: "8%",
            textStyle: {
              fontSize: 12, // 字体大小
              color: "#", // 字体颜色（图例与图例文字配色保持一致）
            },
            data: [
              {
                name: "房间内VOCs值",
              },
              {
                name: "风管内VOCs值"
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
            name: "VOCs值",
            nameTextStyle: {
              padding: [0,0,0,0]
            },
            splitNumber: 6, // 设置坐标轴的分割段数
            min: 0,
            max: 100,
            interval: 100 / 6,
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
            max: 100,
            interval: 100 / 6,
            axisLabel: {
              formatter: function(v) {
                return v.toFixed(1)
              }
            },
          }
        ],
        series: [
          {
            name: '房间内VOCs值',
            type: "line",
            color: ["#1890FF"],
            symbol: 'none',
            smooth: true,
            data: [],
          },
          {
            name: '风管内VOCs值',
            type: "line",
            color: ["#91CB74"],
            symbol: 'none',
            smooth: true,
            data: [],
          },
          {
            name: '房间内温度',
            type: "line",
            color: ["#FAC858"],
            symbol: 'none',
            smooth: true,
            yAxisIndex: 1,
            data: [],
          },
          {
            name: '风管内温度',
            type: "line",
            color: ["#EE6666"],
            symbol: 'none',
            smooth: true,
            yAxisIndex: 1,
            data: [],
          },
        ],
      },
      options1: {
        legend: [
          {
            top: "0%",
            right: "8%",
            textStyle: {
              fontSize: 12, // 字体大小
              color: "#", // 字体颜色（图例与图例文字配色保持一致）
            },
            data: [
              {
                name: "风速值",
              }
            ]
          },
          {
            top: "0%",
            left: "8%",
            textStyle: {
              fontSize: 12, // 字体大小
              color: "#", // 字体颜色（图例与图例文字配色保持一致）
            },
            data: [
              {
                name: "湿度值",
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
            name: "湿度值",
            nameTextStyle: {
              padding: [0,0,0,0]
            },
            splitNumber: 6, // 设置坐标轴的分割段数
            min: 0,
            max: 100,
            interval: 100 / 6,
            axisLabel: {
              formatter: function(v) {
                return v.toFixed(1)
              }
            },
          },
          {
            type: 'value',
            name: "风速值",
            nameTextStyle: {
              padding: [0,0,0,0]
            },
            splitNumber: 6, // 设置坐标轴的分割段数
            min: 0,
            max: 100,
            interval: 100 / 6,
            axisLabel: {
              formatter: function(v) {
                return v.toFixed(1)
              }
            },
          }
        ],
        series: [
          {
            name: '湿度值',
            type: "line",
            color: ["#1890FF"],
            symbol: 'none',
            smooth: true,
            data: [],
          },
          {
            name: '风速值',
            type: "line",
            color: ["#91CB74"],
            symbol: 'none',
            smooth: true,
            data: [],
            yAxisIndex: 1,
          }
        ],
      },
      windArr: [], // 企业治污措施风速数据
      humidityArr: [], // 企业治污措施湿度数据
      productionStatusArr: [], // 企业治污措施数据
      roundOp: {
        series: [ // 时钟外圈颜色状态
          { 
            type: "pie",
            name: 'pie',
            radius: ["70%", "85%"],
            center: ["50%", "50%"],
            hoverAnimation: true,
            z: 10,
            itemStyle: {
              normal: {
                borderWidth: 1,
                borderColor: "#c3c3c3"
              }
            },
            label: {
              show: false
            },
            data: [],
            labelLine: {
              show: false
            }
          },
          { ///大表盘时针
            name: '小时',
            type: 'gauge',
            radius: '70%', //仪表盘半径
            min: 0,
            max: 24,
            startAngle: 90,
            endAngle: -269.9999,
            splitNumber: 24,
            animation: 0,
            pointer: { //仪表盘指针
              length: '0%',
              width: '0%'
            },
            itemStyle: { //仪表盘指针样式
              normal: {
                color: '#fff',
                shadowColor: 'rgba(0, 0, 0, 0.5)',
                shadowBlur: 10,
                shadowOffsetX: 2,
                shadowOffsetY: 2
              }
            },
            axisLine: { //仪表盘轴线样式
              lineStyle: {
                width: 1,
              }
            },
            axisTick: { //仪表盘刻度样式
              distance: 0,
              length: '3%',
              splitNumber: 4, //分隔线之间分割的刻度数
              lineStyle: {
                color: '#ccc',
                width: 1
              }
            },
            splitLine: { //分割线样式
              distance: 0,
              length: '5%',
              lineStyle: {
                color: '#ccc',
                width: 5
              }
            },
            axisLabel: {
              show: true,
              formatter: function(param) {
                if (param !== 0) {
                  return param
                } else {
                  return null
                }
              },
              color: '#333',
              fontSize: 18,
              distance: 5,
            },
            title: {
              show: 0
            }, //仪表盘标题
            detail: {
              show: 0
            }, //仪表盘显示数据
            data: [{
              value: null
            }]
          }, 
          { ///大表盘分针
            name: '分钟',
            type: 'gauge',
            radius: '0%', //仪表盘半径
            min: 0,
            max: 60,
            startAngle: 90,
            endAngle: -269.9999,
            splitNumber: 12,
            animation: 0,
            pointer: { //仪表盘指针
              length: '85%',
              width: '3%'
            },
            itemStyle: { //仪表盘指针样式
              normal: {
                color: '#fff',
                shadowColor: 'rgba(0, 0, 0, 0.5)',
                shadowBlur: 10,
                shadowOffsetX: 2,
                shadowOffsetY: 2
              }
            },
            axisLine: { //仪表盘轴线样式
              lineStyle: {
                width: 1,
              }
            },
            splitLine: { //分割线样式
              show: false,
            },
            axisTick: { //仪表盘刻度样式
              show: false,
 
            },
            axisLabel: {
              show: false,
            }, //刻度标签
            title: {
              show: 0
            }, //仪表盘标题
            detail: {
              show: 0
            }, //仪表盘显示数据
            data: [{
              value: null
            }]
          },
          { //指针内环
            type: 'pie',
            hoverAnimation: false,
            legendHoverLink: false,
            radius: ['0%', '5%'],
            z: 10,
            label: {
              normal: {
                show: false
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: [{
              value: 10,
              itemStyle: {
                normal: {
                  color: "#FFFFFF"
                }
              }
            }]
          }
        ]
      }
    }
  },
  async mounted(){
    this.time = moment(new Date()).subtract(1, 'd').format('YYYY-MM-DD');
    // 获取id
    this.formInfo.deviceId = this.$route.query.id;
    await this.getHistoryData();
  },
  methods: {
    // 获取日期分类
    getTime() {
      let arr = [];
      for (let i = 0; i < 24; i++) {
        for (let k = 0; k < 60; k++) {
          let a,b;
          i < 10 ? (a = `0${i}`) : (a = i);
          k < 10 ? (b = `0${k}`) : (b = k);
          arr.push(`${a}:${b}`);
        }
      }
      arr.push('23:59');
      return arr;
    },

    // 获取最大值方法
    calMax(arr) {
      var max = Math.max.apply(Math, arr); // 获取最大值方法
      var maxint = Math.ceil(max / 5); // 向上以5的倍数取整
      var maxval = maxint * 5 + 5; // 最终设置的最大值
      return maxval; // 输出最大值
    },
    // 初始化图表
    initChart() {
      // 获取最大值
      let VocsMax;
      const { calMax } = this;

      if(calMax(this.roomVocsArr) > calMax(this.ductVocsArr)) {
        VocsMax = calMax(this.roomVocsArr);
      } else {
        VocsMax = calMax(this.ductVocsArr);
      }

      // 设置最大值和每个间隔代表的数
      this.$set(this.options.yAxis[0], 'max', VocsMax);
      this.$set(this.options.yAxis[0], 'interval', (VocsMax / 6));


      // 企业治污措施图表
      const humidityMax = calMax(this.humidityArr);
      const windMax = calMax(this.windArr);

      this.$set(this.options1.yAxis[0], 'max', humidityMax);
      this.$set(this.options1.yAxis[0], 'interval', (humidityMax / 6));
      this.$set(this.options1.yAxis[1], 'max', windMax);
      this.$set(this.options1.yAxis[1], 'interval', (windMax / 6));


      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById('main'));
      var myChart1 = echarts.init(document.getElementById('main1'));

      // 绘制图表
      myChart.setOption(this.options);
      myChart1.setOption(this.options1);
    },
    // 获取设备信息
    async getHistoryData() {
      if(this.time) {
        this.formInfo.startDate = `${this.time} 00:00:00`;
        this.formInfo.endDate = `${this.time} 23:59:59`;
      }

      // 清空数据
      this.roomVocsArr = [];
      this.ductVocsArr = [];
      this.roomTemArr = [];
      this.ductTemArr = [];
      this.productionStatusArr = [];
      this.temperatureArr = [];
      this.windArr = [];
      this.humidityArr = [];

      // 开启loading
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });

      const res = await getReportDetail(this.formInfo);
      if(res.code == '1') {
        /** 获取当前时间，每分钟一条 */
        var minutes = moment().format('m');
        var hours_24 = moment().format('H');
        var year = moment().format('YYYY-MM-DD');

        res.data.list.map((item,index) => {
          if(!item) {
            const obj = res.data.list[index - 1];
            if(!obj) {
              item = {
                gvocs: 0, 
                nvocs: 0, 
                gtemperature: 0, 
                ntemperature: 0, 
                gwindspeed: 0,
                ghumidity: 0
              }
            } else {
              const { gvocs, nvocs, gtemperature, ntemperature, gwindspeed, ghumidity } = obj;
              item = {
                gvocs, 
                nvocs, 
                gtemperature, 
                ntemperature, 
                gwindspeed,
                ghumidity
              }
            }
          }

          const {  gvocs, nvocs, gtemperature, ntemperature, gwindspeed, ghumidity } = item;

          this.roomVocsArr.push(nvocs);
          this.ductVocsArr.push(gvocs);
          this.roomTemArr.push(ntemperature);
          this.ductTemArr.push(gtemperature);
          this.windArr.push(gwindspeed);
          this.humidityArr.push(ghumidity);
          /**
           * 每个小时取4个点
           */
          const indexNum = index % 15;
          if(!indexNum) {
            if(gwindspeed > 0.05) {
              this.productionStatusArr.push(0);
            } else {
              this.productionStatusArr.push(1);
            }
          }
        });

        if(this.time == year) {
          const num = hours_24 * 60 + minutes * 1;
          this.roomVocsArr = this.roomVocsArr.splice(0, num);
          this.ductVocsArr = this.ductVocsArr.splice(0, num);
          this.roomTemArr = this.roomTemArr.splice(0, num);
          this.ductTemArr = this.ductTemArr.splice(0, num);
          this.windArr = this.windArr.splice(0, num);
          this.productionStatusArr = this.productionStatusArr.splice(0, num);
        }

        // 设置图表数据
        const { series } = this.options;
        this.$set(series[0], 'data', this.roomVocsArr);
        this.$set(series[1], 'data', this.ductVocsArr);
        this.$set(series[2], 'data', this.roomTemArr);
        this.$set(series[3], 'data', this.ductTemArr);
        this.$set(this.options.xAxis, 'data', this.getTime());

        // 设置企业治污图表数据
        const { series: series1 } = this.options1;
        this.$set(series1[0], 'data', this.ductTemArr);
        this.$set(series1[1], 'data', this.windArr);
        this.$set(this.options1.xAxis, 'data', this.getTime());

        // 关闭loading
        loading.close();
        this.initChart(); 
        this.drawClockChart();
      }
    },
    // 绘画时钟
    drawClockChart() {
      var datetime = new Date();
      var h = datetime.getHours();
      var m = datetime.getMinutes();
      var s = datetime.getSeconds();
      var minutes = m + s / 60;
      var hours_24 = h + m / 60;
      var hours_12;
      if (hours_24 > 12) {
        hours_12 = hours_24 - 12;
      } else {
        hours_12 = hours_24;
      }
      var gethour = (hours_12).toFixed(2);
      var getminutes = (minutes).toFixed(2);
      var dataType = []
      const arr = ['#18bc37', 'red', '#fff'];

      for (let i = 0; i < 96; i++) {
        if(this.productionStatusArr[i] === undefined) {
          this.productionStatusArr[i] = {operativeStatus: 2}
        }
        dataType.push({
          name: i,
          value: 1,
          trueValue: i,
          itemStyle: {
            normal: {
              color: arr[this.productionStatusArr[i]]
            }
          }
        })
      }

      console.log(this.productionStatusArr, 'productionStatusArr');
      
      this.$set(this.roundOp.series[0], 'data', dataType);
      this.$set(this.roundOp.series[1].data[0],'value', gethour);
      this.$set(this.roundOp.series[2].data[0],'value', getminutes);
      
      var myChart = echarts.init(document.getElementById('roundMain'));
      myChart.setOption(this.roundOp);
    }
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
}
#main, #main1 {
  width: 1060px;
  height: 300px;
}
#roundMain {
  margin: 0 auto;
  width: 580px;
  height: 580px;
}

.tableTitle {
  margin: 28px 0 14px 0;
  padding-left: 14px;
  line-height: 32px;
  font-size: 20px;
  font-weight: bold;
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
    // 烤漆
    background-color: #18bc37;
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
      width: 14px;
      height: 20px;
    }
    .br2 {
      position: relative;
      border-right: 1px solid #cccccc;
    }
    .br2:nth-of-type(1) {
      margin-left: 40px;
      border-left: 1px solid #cccccc;
    }
    .br2:nth-of-type(6n) {
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

</style>