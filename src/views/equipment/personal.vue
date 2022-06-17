<template>
  <div class="personal">
    <!-- 顶部编号、历史数据查看 s -->
    <div class="personal-top">
      <div class="personalTop-name">房间名：
        <!-- {{roomName}} -->
        <el-select v-model="activeId" placeholder="请选择" size="small">
          <el-option
            v-for="(item,i) in roomData"
            :key="i"
            :label="item.roomName"
            :value="item.id"
          >
          </el-option>
        </el-select>
        </div>
      <el-button type="info" size="mini" round @click="toGo">
        历史数据查看 <i class="el-icon-arrow-right"></i>
      </el-button>
    </div>
    <!-- 顶部编号、历史数据查看 e -->

    <!-- 生产车间、治污措施 s -->
    <div class="personal-content">
      <div class="personalCon-production">
        <span class="title">生产车间</span>
        <div class="personalConPro-content">
          <span>
            <img
              src="https://zjlianweihoss.oss-cn-hangzhou.aliyuncs.com/file/1649909506953-temperature.png"
            />
            {{ (productionObj.ntemperature ? productionObj.ntemperature : '0') || "-" }} °C
          </span>
          <span>
            <img
              src="https://zjlianweihoss.oss-cn-hangzhou.aliyuncs.com/file/1649909507008-water.png"
            />
            {{ (productionObj.nhumidity ? productionObj.nhumidity : '0') || "-" }} %
          </span>
          <span>
            <img
              src="https://zjlianweihoss.oss-cn-hangzhou.aliyuncs.com/file/1649909506887-oxygen.png"
            />
            {{ (productionObj.no2 ? productionObj.no2 : '0') || "-" }} %
          </span>
          <span>
            <img
              src="https://zjlianweihoss.oss-cn-hangzhou.aliyuncs.com/file/1649909506764-cloud.png"
            />
            {{ (productionObj.nvocs ? productionObj.nvocs : '0') || "-" }} mg/m³
          </span>
          <span>
            <img
              src="https://zjlianweihoss.oss-cn-hangzhou.aliyuncs.com/file/1649909506601-arrow.png"
            />
            {{ isType(productionObj.nmicropressure) }}
          </span>
        </div>
        <div class="personalConPro-bottom">
          <div v-for="(item,index) in doorArr" :key="index">
            <span v-if="item != 127">
              门{{index + 1}}:
              <img
                src="https://zjlianweihoss.oss-cn-hangzhou.aliyuncs.com/file/1649909506806-door-close.png"
                v-if="[1,22].includes(item)"
              />
              <img
                src="https://zjlianweihoss.oss-cn-hangzhou.aliyuncs.com/file/1649909506837-door-open.png"
                v-else
              />
            </span>
          </div>
        </div>
      </div>
      <div class="personalCon-measure">
        <span class="title">治污措施</span>
        <div class="personalConPro-content">
          <span>
            <img
              src="https://zjlianweihoss.oss-cn-hangzhou.aliyuncs.com/file/1649909506953-temperature.png"
            />
            {{ (productionObj.gtemperature ? productionObj.gtemperature : '0') || "-" }} °C
          </span>
          <span>
            <img
              src="https://zjlianweihoss.oss-cn-hangzhou.aliyuncs.com/file/1649909507008-water.png"
            />
            {{ (productionObj.ghumidity ? productionObj.ghumidity : '0') || "-" }} %
          </span>
          <span>
            <img
              src="https://zjlianweihoss.oss-cn-hangzhou.aliyuncs.com/file/1649909506887-oxygen.png"
            />
            {{ (productionObj.go2 ? productionObj.go2 : '0') || "-" }} %
          </span>
          <span>
            <img
              src="https://zjlianweihoss.oss-cn-hangzhou.aliyuncs.com/file/1649909506764-cloud.png"
            />
            {{ (productionObj.gvocs ? productionObj.gvocs : '0') || "-" }} mg/m³
          </span>
          <span>
            <img
              src="https://zjlianweihoss.oss-cn-hangzhou.aliyuncs.com/file/1649909506601-arrow.png"
            />
            {{ (productionObj.gwindpressure ? productionObj.gwindpressure : '0') || "-" }} kPa
          </span>
          <span>
            <img
              src="../../../static/images/feng.png"
            />
            {{ (productionObj.gwindspeed > 0.02 ? productionObj.gwindspeed : '0') || "-" }} m/s
          </span>
          <!--  -->
        </div>
      </div>
    </div>
    <!-- 生产车间、治污措施 e -->

    <div class="tableTitle">企业生产状态统计图</div>
    <!-- 日期选择 s -->
    <el-date-picker
      v-model="time"
      type="date"
      value-format="yyyy-MM-dd"
      placeholder="选择日期"
      @change="getProductStatus"
      :clearable="false"
    >
    </el-date-picker>
    <!-- 日期选择 e -->

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
    <div class="mainBg">
      <div id="main"></div>
    </div>
    
  
  </div>
</template>

<script>
import * as echarts from 'echarts';
import {
  getProductionStatus,
  getReport,
  deviceList,
} from "../../assets/js/equipment";

import { getNowTime } from "./isType";

export default {
  name: "personalView",
  data() {
    return {
      roomData:[],//房间名称数组
      productionStatusArr: [], // 设备生产状态数据
      time: "",
      activeId: 0, // 设备id
      roomName: '', // 房间名称
      productionObj: {}, // 设备信息数据
      doorArr: [], // 门的数据
      data:[],
      option: {
        series: [{ // 时钟外圈颜色状态
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
          }, { ///大表盘分针
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
    };
  },
  mounted() {
    // 上个页面传值下来的id
    // this.activeId = this.$route.query.id;
    // this.roomName = this.$route.query.roomName;
    // 设置当天日期
    this.time = getNowTime();
    
    // 获取总设备列表
    this.getDeviceList();
  },
  methods: {
     // 获取总设备列表
    async getDeviceList() {
      const res = await deviceList();
      if (res.code == "1" && res.data.length > 0) {
        this.roomData = res.data;
        this.activeId = this.roomData[0].id;
        this.roomName = this.roomData[0].roomName;
        // 赋值总长度
        // this.tableNum = res.data.length;
        // 获取设备生产状态
        this.getProductStatus();
        // 获取设备信息
        this.getReportDetail();
      }
    },
    // 获取设备状态
    async getProductStatus() {
      const form = {
        startDate: `${this.time} 00:00:00`,
        endDate: `${this.time} 23:59:59`,
        deviceId: this.activeId,
      };
      const res = await getProductionStatus(form);
      if (res.code == "1") {
        this.productionStatusArr = res.data;
        // echarts 初始化
        this.drawClockChart();
      }
    },
    // 获取生产状态，治污措施数据
    async getReportDetail() {
      let formInfo = {
        deviceId: this.activeId,
      };

      const res = await getReport(formInfo);
      if (res.code == "1" && res.data.length > 0) {
        const { door1Value,door2Value,door3Value,door4Value,door5Value,door6Value,gwindspeed } = res.data[0];
        this.doorArr = [door1Value,door2Value,door3Value,door4Value,door5Value,door6Value];
        if(gwindspeed < 0.05) res.data[0].gwindspeed = 0;
        this.productionObj = res.data[0];
      }
    },
    // 跳转到历史数据查看页
    toGo() {
      this.$router.push({
        name: "historyEquipment",
        query: {
          id: this.activeId,
        },
      });
    },
    // 分辨大气压的不同类型
    isType(i) {
      const arr = ['大气压','微正压','微负压'];
      return arr[i*1];
    },
    // echarts 初始化
    init() {
      const arr = ['#ccc', '#18bc37', '#1890ff', 'red'];
      this.productionStatusArr.forEach(item => {
        const { startTime } = item;
        const timeArr = startTime.split(' ')[1].split(':');
        this.data.push({
          name: `${timeArr[0]}:${timeArr[1]}`,
          itemStyle: {
            color: arr[item.operativeStatus]
          },
          label: {
            fontSize: 20,
            fongWeight: 'bold'
          },
          value: 1
        })
      });
      
      var myChart = echarts.init(document.getElementById('main'));
      var myChart1 = echarts.init(document.getElementById('main1'));
      let option1 = Object.assign({},this.option, {});

      this.$set(this.option.series, 'data', this.data.slice(0,48));       
      myChart.setOption(this.option);
      option1 && myChart1.setOption(option1);
    },
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
      const arr = ['#ccc', '#18bc37', '#1890ff', 'red', '#fff'];

      for (let i = 0; i < 96; i++) {
        if(this.productionStatusArr[i] === undefined) {
          this.productionStatusArr[i] = {operativeStatus: 4}
        }
        dataType.push({
          name: i,
          value: 1,
          trueValue: i,
          itemStyle: {
            normal: {
              color: arr[this.productionStatusArr[i].operativeStatus]
            }
          }
        })
      }
      
      this.$set(this.option.series[0], 'data', dataType);
      this.$set(this.option.series[1].data[0],'value', gethour);
      this.$set(this.option.series[2].data[0],'value', getminutes);
      
      var myChart = echarts.init(document.getElementById('main'));
      myChart.setOption(this.option);
    }
  },
};
</script>

<style lang="less" scoped>
@import "../../../static/css/number.css";

.personal {
  .personal-top {
    display: flex;
    justify-content: space-between;
    line-height: 28px;
  }
  .personal-content {
    display: flex;
    justify-content: space-around;
    margin-top: 28px;
    .personalCon-production,
    .personalCon-measure {
      padding: 14px;
      width: 48%;
      height: 200px;
      border-radius: 14px;
      background: #f5f3f2;
      box-shadow: 1px 1px 2px 2px #eae5e3;
      .title {
        padding-left: 10px;
        width: 100%;
        line-height: 14px;
        border-left: 4px solid #ac9f8a;
        color: #ac9f8a;
      }
      .personalConPro-content {
        margin: 20px 0;
        span {
          width: 33%;
          img {
            height: 14px;
            vertical-align: 0px;
          }
        }
        span:nth-of-type(4),
        span:nth-of-type(5) {
          margin-top: 14px;
          margin-left: -2px;
        }
      }
      .personalConPro-bottom {
        display: flex;
        justify-content: space-between;
        span {
          width: 58px;
          img {
            height: 14px;
            vertical-align: -2px;
          }
        }
      }
    }
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
  .tableTitle {
    margin: 28px 0 14px 0;
    padding-left: 14px;
    line-height: 32px;
    font-size: 20px;
    font-weight: bold;
  }
}
.mainBg {
  display: flex;
  justify-content: space-around;
  pointer-events: none;
}
#main {
  width: 580px;
  height: 580px;
}
</style>
