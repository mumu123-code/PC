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

    <div class="tableTitle">企业治污措施</div>
    <!-- 颜色提示 s -->
    <div class="boxColor">
      <div class="left"></div>
      <label>离线</label>
      <div class="left"></div>
      <label>在线</label>
    </div>
    <!-- 颜色提示 e -->
    <div class="charts-box">
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
    </div>
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
        pageSize: 500,
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
                name: "房间内Vocs值",
              },
              {
                name: "风管内Vocs值"
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
          },
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
          }
        ],
        series: [
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
          },
        ],
      },
      productionStatusArr: [], // 企业治污措施数据
    };
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
      var max = Math.max.apply(null, arr); // 获取最大值方法
      var maxint = Math.ceil(max / 5); // 向上以5的倍数取整
      var maxval = maxint * 5 + 5; // 最终设置的最大值
      return maxval; // 输出最大值
    },
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

      // this.$set(this.options.yAxis[0], 'max', maxV);
      // this.$set(this.options.yAxis[0], 'interval', (maxV / 6));
      // this.$set(this.options.yAxis[1], 'max', maxT);
      // this.$set(this.options.yAxis[1], 'interval', (maxT / 6));

      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById('main'));
      // 绘制图表
      myChart.setOption(this.options);
    },
    // 获取设备信息
    async getHistoryData() {
      if(this.time) {
        this.formInfo.startDate = `${this.time} 00:00:00`;
        this.formInfo.endDate = `${this.time} 23:59:59`;
      }

      // 开启loading
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });

      const res = await getReportDetail(this.formInfo);
      if(res.code == '1') {
        res.data.list.map(item => {
          const { gvocs, nvocs, gtemperature, ntemperature, gwindspeed } = item;
          this.roomVocsArr.unshift(gvocs);
          this.ductVocsArr.unshift(nvocs);
          this.roomTemArr.unshift(gtemperature);
          this.ductTemArr.unshift(ntemperature);

          // 造假数据
          if(gwindspeed > 0.5) {
            this.productionStatusArr.unshift(true);
          } else {
            this.productionStatusArr.unshift(false);
          }
        })

        /** 先注释使用假的数据 */
        // res.data.list.map(item => {
        //   // 取出需要的值
        //   const { createTime, gvocs, nvocs, gtemperature, ntemperature } = item;

          // const date = createTime.split(' ')[1].split(':').splice(0,2);
          // const dateStr = date.join(':');
          // if(!this.dateArr.length) {
          //   this.dateArr.unshift(dateStr);
          //   this.roomVocsArr.unshift(gvocs);
          //   this.ductVocsArr.unshift(nvocs);
          //   this.roomTemArr.unshift(gtemperature);
          //   this.ductTemArr.unshift(ntemperature);
          // } else {
          //   // 如果数组的最后一位与本次循环时间不相同，添加本次时间进去
          //   if(this.dateArr[0] !== dateStr) {
          //     this.dateArr.unshift(dateStr);
          //     this.roomVocsArr.unshift(gvocs);
          //     this.ductVocsArr.unshift(nvocs);
          //     this.roomTemArr.unshift(gtemperature);
          //     this.ductTemArr.unshift(ntemperature);
          //   }
          // }
        // })
      }
      if(res.data.pageNum < res.data.pages) {
        this.formInfo.pageNum ++;
        this.getHistoryData();
      } else {
          this.formInfo.pageNum = 1;

          // 造假数据
          this.roomVocsArr = this.roomVocsArr.splice(0, 1441);
          this.ductVocsArr = this.ductVocsArr.splice(0, 1441);
          this.roomTemArr = this.roomTemArr.splice(0, 1441);
          this.ductTemArr = this.ductTemArr.splice(0, 1441);
          this.productionStatusArr = this.productionStatusArr.splice(0, 96);

          this.$set(this.options.xAxis,'data', this.getTime());
          this.$set(this.options.series[0],'data',this.roomVocsArr);
          this.$set(this.options.series[1],'data',this.ductVocsArr);
          this.$set(this.options.series[2],'data',this.roomTemArr);
          this.$set(this.options.series[3],'data',this.ductTemArr);


          // 关闭loading
          loading.close();
          this.initChart();          
      }
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