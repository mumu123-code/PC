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
      
    }
  },
  mounted(){
    this.init();
  },
  methods: {
    randomData() {
      let oneDay = 24 * 3600 * 1000;
      let now = new Date(1997, 9, 3);
      now = new Date(+now + oneDay);
      let value = Math.random() * 1000;
      value = value + Math.random() * 21 - 10;
      return {
        name: now.toString(),
        value: [
          [now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'),
          Math.round(value)
        ]
      };
    },
    init() {
      var myChart = echarts.init(document.getElementById('main'), null, {
        renderer: 'canvas',
        useDirtyRect: false
      });
      
      var bgPatternImg = new Image();
      bgPatternImg.src = "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.jj20.com%2Fup%2Fallimg%2F1113%2F052420110515%2F200524110515-2-1200.jpg&refer=http%3A%2F%2Fimg.jj20.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1655023200&t=125c5be23f33b3046481fe46104cad12";
      const chartData = [
        {
          value: 520,
          name: "A",
        },
        {
          value: 280,
          name: "B",
        },
        {
          value: 100,
          name: "C",
        },
        {
          value: 100,
          name: "D",
        },
      ];
      const colorList = [
        new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: "#CA8CCA",
          },
          {
            offset: 1,
            color: "#EFA5BB",
          },
        ]),
        new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: "#BFA4E4",
          },
          {
            offset: 1,
            color: "#E29CE2",
          },
        ]),
        new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: "#A8AAE5",
          },
          {
            offset: 1,
            color: "#BEA3E3",
          },
        ]),
        new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: "#A4D37D",
          },
          {
            offset: 1,
            color: "#E5F2A7",
          },
        ]),
      ];
      const sum = chartData.reduce((per, cur) => per + cur.value, 0);
      const gap = (1 * sum) / 100;
      const pieData1 = [];
      const pieData2 = [];
      const gapData = {
        name: "",
        value: gap,
        itemStyle: {
          color: "transparent",
        },
      };

      for (let i = 0; i < chartData.length; i++) {
        pieData1.push({
          ...chartData[i],
          itemStyle: {
            borderRadius: 100,
            shadowColor: "#005AA0",
            shadowBlur: 5,
            shadowOffsetY: 0,
            shadowOffsetX: 0,
            borderColor: "#005AA0",
            borderWidth: 2,
          },
        });
        pieData1.push(gapData);

        pieData2.push({
          ...chartData[i],
          itemStyle: {
            borderRadius: 10,
            color: colorList[i],
            opacity: .4,
            shadowColor: "#fff",
            shadowBlur: 1,
            shadowOffsetY: 5,
            shadowOffsetX: 0,
          },
        });
        pieData2.push(gapData);
      }

      let option = {
        // 背景样式
        backgroundColor: {
          type: 'pattern',
          image: bgPatternImg, // 支持为 HTMLImageElement, HTMLCanvasElement，不支持路径字符串
          repeat: 'repeat' // 是否平铺，可以是 'repeat-x', 'repeat-y', 'no-repeat'
        },
        title: [
          {
            text: "7.0%",
            x: "50%",
            y: "43%",
            textAlign: "center",
            textStyle: {
              fontSize: "20",
              fontWeight: "500",
              color: "#98b5d2",
              textAlign: "center",
              textShadowColor: "#B6C8E4",
              textShadowBlur: "1",
              textShadowOffsetX: 2,
              textShadowOffsetY: 2,
            },
          },
          {
            text: "DESIGN ELEMENTS",
            left: "50%",
            top: "52%",
            textAlign: "center",
            textStyle: {
              fontSize: "12",
              fontWeight: "400",
              color: "#5c5a68",
              textAlign: "center",
              textShadowColor: "#000",
              textShadowBlur: "1",
              textShadowOffsetX: 1,
              textShadowOffsetY: 1,
            },
          },
        ],
        legend: {
          left: "10%",
          top: "35%",
          align: "left",
          itemGap: 12,
          itemWidth: 20,
          itemHeight: 20,
          shadowBlur: 20,
          shadowOffsetY: 0,
          shadowOffsetX: 0,
          borderColor: "#87A7D0",
          borderWidth: 2,
          textStyle: {
            color: "red",
            rich: {
              name: {
                verticalAlign: "right",
                align: "left",
                fontSize: 18,
                color: "red",
              },
              percent: {
                padding: [0, 0, 0, 10],
                color: "blue",
                fontSize: 18,
              },
            },
          },
          formatter: (name) => {
            const item = chartData.find((i) => {
              return i.name === name;
            });
            const p = ((item.value / sum) * 100).toFixed(0);
            return "{name|" + name + "}" + "{percent|" + p + "}" + " %";
          },
        },

        color: colorList,

        series: [
          {
            type: "pie",
            z: 3,
            roundCap: true,
            radius: ["44%", "51%"],
            center: ["50%", "51%"],
            label: {
              show: false,
            },
            labelLine: {
              show: false,
            },
            data: pieData1,
          },
          {
            type: "pie",
            z: 2,
            radius: ["39%", "56%"],
            center: ["50%", "50%"],
            label: {
              show: false,
            },
            labelLine: {
              show: false,
            },
            silent: true,
            data: pieData2,
          },
        ],
      };

      myChart.setOption(option);
        
    }
  }
}
</script>

<style lang="less" scoped>
#main {
  width: 960px;
  height: 300px;
}
</style>