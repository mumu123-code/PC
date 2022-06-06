<template>
  <div class="charts">
    <div id="main"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts';

export default {
  name: 'chartsView',
  data() {
    return {
      data: [
        {
          name: '离线',
          itemStyle: {
            color: 'red'
          },
          label: {
            fontSize: 20,
            fongWeight: 'bold'
          },
          children: [
            {
              name: '1',
              value: 1,
              itemStyle: {
                color: 'red'
              }
            },
            {
              name: '2',
              value: 1,
              itemStyle: {
                color: 'red'
              }
            },
            {
              name: '3',
              value: 1,
              itemStyle: {
                color: 'red'
              }
            },
            {
              name: '4',
              value: 1,
              itemStyle: {
                color: 'red'
              }
            },
            {
              name: '5',
              value: 1,
              itemStyle: {
                color: 'red'
              }
            },
            {
              name: '6',
              value: 1,
              itemStyle: {
                color: 'red'
              }
            },
          ]
        },
        {
          name: '闲置',
          itemStyle: {
            color: '#ccc'
          },
          label: {
            fontSize: 20,
            fongWeight: 'bold'
          },
          children: [
            {
              name: '7',
              value: 1,
              itemStyle: {
                color: '#ccc'
              }
            },
            {
              name: '8',
              value: 1,
              itemStyle: {
                color: '#ccc'
              }
            },
            {
              name: '9',
              value: 1,
              itemStyle: {
                color: '#ccc'
              }
            },
            {
              name: '10',
              value: 1,
              itemStyle: {
                color: '#ccc'
              }
            },
            {
              name: '11',
              value: 1,
              itemStyle: {
                color: '#ccc'
              }
            },
            {
              name: '12',
              value: 1,
              itemStyle: {
                color: '#ccc'
              }
            },
          ]
        },
        {
          name: '烤漆',
          itemStyle: {
            color: '#18bc37'
          },
          label: {
            fontSize: 20,
            fongWeight: 'bold'
          },
          children: [
            {
              name: '13',
              value: 1,
              itemStyle: {
                color: '#18bc37'
              }
            },
            {
              name: '14',
              value: 1,
              itemStyle: {
                color: '#18bc37'
              }
            },
            {
              name: '15',
              value: 1,
              itemStyle: {
                color: '#18bc37'
              }
            },
            {
              name: '16',
              value: 1,
              itemStyle: {
                color: '#18bc37'
              }
            },
            {
              name: '17',
              value: 1,
              itemStyle: {
                color: '#18bc37'
              }
            },
            {
              name: '18',
              value: 1,
              itemStyle: {
                color: '#18bc37'
              }
            },
          ]
        },
        {
          name: '喷漆',
          itemStyle: {
            color: '#1890ff'
          },
          label: {
            fontSize: 20,
            fongWeight: 'bold'
          },
          children: [
            {
              name: '19',
              value: 1,
              itemStyle: {
                color: '#1890ff'
              }
            },
            {
              name: '20',
              value: 1,
              itemStyle: {
                color: '#1890ff'
              }
            },
            {
              name: '21',
              value: 1,
              itemStyle: {
                color: '#1890ff'
              }
            },
            {
              name: '22',
              value: 1,
              itemStyle: {
                color: '#1890ff'
              }
            },
            {
              name: '23',
              value: 1,
              itemStyle: {
                color: '#1890ff'
              }
            },
            {
              name: '24',
              value: 1,
              itemStyle: {
                color: '#1890ff'
              }
            },
          ]
        }
      ],
      option: {
        legend: {
          selectedMode: false,
        },
        series: {
          type: 'sunburst',
          clickable: false,
          data: [],
          radius: [0, "100%"],
          sort: null,
          levels: [
            {},
            {
              r0: "7%",
              r: "31%",
              itemStyle: {
                borderWidth: 3,
              },
              label: {
                rotate: 'tangential'
              },
              emphasis: {
                focus: 'none',
              }
            },
            {
              r0: "33%",
              r: "90%",
              label: {
                align: 'right'
              },
              emphasis: {
                focus: 'none',
              }
            },
          ]
        }
      },
      timeArr: [],
      num: 0,
      start: 0,
      end: 0
    }
  },
  mounted(){
    this.drawClockChart();
    this.dataArr();
  },
  methods: {
    init() {
      var myChart = echarts.init(document.getElementById('main'));
      this.$set(this.option.series, 'data', this.data);
      myChart.setOption(this.option);
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
      for (let i = 0; i < 48; i++) { // 虚拟数据
        var color
        if (i > 44) {
          color = "#072a70"
        } else if (i == 10) {
          color = "#f8dd1d"
        } else if (i == 16) {
          color = "#ffa901"
        } else if (i == 15) {
          color = "#ab0000"
        } else {
          color = '#64c127'
        }
        dataType.push({
          name: i,
          value: 1,
          trueValue: i,
          itemStyle: {
            normal: {
              color: color
            }
          },
        })
      }
      var option = {
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
              borderColor: "#003359"
            }
          },
          label: {
            show: false
          },
          data: dataType,
          labelLine: {
            show: false
          }
        },
          { ///大表盘时针
            name: '小时',
            type: 'gauge',
            radius: '70%', //仪表盘半径
            min: 0,
            max: 12,
            startAngle: 90,
            endAngle: -269.9999,
            splitNumber: 12,
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
              splitNumber: 5, //分隔线之间分割的刻度数
              lineStyle: {
                color: '#ccc',
                width: 2
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
              value: gethour
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
              value: getminutes
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
      };
      var myChart = echarts.init(document.getElementById('main'));
      myChart.setOption(option);
    },
    dataArr() {
      for (let i = 0; i < 60; i++) {
        if(i%2 == 0 || i%5 == 0) {
          this.timeArr.push({
            createdTime: i,
            num: 0,
          });
        } else {
          this.timeArr.push({
            createdTime: i,
            num: 1,
          })
        }
      }
      this.screening(); 
    }
  }
}
</script>

<style lang="less" scoped>
#main {
  width: 960px;
  height: 600px;
  background: #fff;
}
</style>