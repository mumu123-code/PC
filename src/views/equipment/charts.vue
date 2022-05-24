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
      }
    }
  },
  mounted(){
    this.init();
  },
  methods: {
    init() {
      var myChart = echarts.init(document.getElementById('main'));
      this.$set(this.option.series, 'data', this.data);
      myChart.setOption(this.option);
    }
  }
}
</script>

<style lang="less" scoped>
#main {
  width: 960px;
  height: 600px;
  background: #f3f3f3;
}
</style>