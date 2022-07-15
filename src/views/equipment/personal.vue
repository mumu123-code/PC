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

    <!-- 治污措施 s -->
    <div class="personal-content">
      <div class="personalCon-measure">
        <span class="title">治污措施</span>
        <div class="personalConPro-content">
          <div class="progress">
            <el-progress type="dashboard" :percentage="productionObj.gvocs" color="#18BC37" 
              :stroke-width="16" :format="(e)=>{ return e + ' mg/m³' }"></el-progress>
            <p class="progress-text">VOCs浓度</p>
          </div>
          <div class="progress">
            <el-progress type="dashboard" :percentage="productionObj.gwindspeed" color="#18BC37" 
              :stroke-width="16" :format="(e)=>{ return e + ' m/s' }"></el-progress>
            <p class="progress-text">风速</p>
          </div>
          <div class="progress">
            <el-progress type="dashboard" :percentage="productionObj.gtemperature" color="#18BC37" 
              :stroke-width="16" :format="(e)=>{ return e + ' °C' }"></el-progress>
            <p class="progress-text">温度</p>
          </div>
          <div class="progress">
            <el-progress type="dashboard" :percentage="50" color="#18BC37" 
              :stroke-width="16" :format="(e)=>{ return e + ' %RH' }"></el-progress>
            <p class="progress-text">湿度</p>
          </div>
          <div class="progress">
            <el-progress type="dashboard" :percentage="productionObj.gwindpressure" color="#18BC37" 
              :stroke-width="16" :format="(e)=>{ return e + ' KPa' }"></el-progress>
            <p class="progress-text">管道风压</p>
          </div>
        </div>
      </div>
      <div class="personalCon-measure">
        <span class="title">吸附过程控制APC系统</span>
        <div class="personalConPro-content">
          <div class="progress">
            <el-progress type="dashboard" :percentage="10" color="#FFD966" 
              :stroke-width="16" :format="(e)=>{ return e + ' mg/m³' }"></el-progress>
            <p class="progress-text">活性炭运行时间</p>
          </div>
          <div class="progress">
            <el-progress type="dashboard" :percentage="20" color="#FFD966" 
              :stroke-width="16" :format="(e)=>{ return e + ' m/s' }"></el-progress>
            <p class="progress-text">活性炭寿命</p>
          </div>
        </div>
      </div>
    </div>
    <!-- 治污措施 e -->

    <!-- 活性炭状态 s -->
    <div class="carbonStatus">
      <span>活性炭状态：</span>
      | <span>穿透</span>
      | <span>预警</span>
      | <span>饱和</span>
      | <span>失效</span> |
    </div>
    <!-- 活性炭状态 e -->
    

  
  </div>
</template>

<script>
import {
  getProductionStatus,
  getReport,
  deviceList,
} from "../../assets/js/equipment";


export default {
  name: "personalView",
  data() {
    return {
      roomData:[],//房间名称数组
      productionStatusArr: [], // 设备生产状态数据
      activeId: 0, // 设备id
      roomName: '', // 房间名称
      productionObj: {}, // 设备信息数据
      doorArr: [], // 门的数据
      data:[],
    };
  },
  mounted() {
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
  },
};
</script>

<style lang="less" scoped>
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
        display: flex;
        justify-content: space-around;
        padding-top: 14px;
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

}
.progress {
  position: relative;
  .progress-text {
    position: absolute;
    bottom: 0px;
    left: 0;
    right: 0;
    flex: 1;
    font-size: 16px;
    font-weight: 600;
    text-align: center;
  }
}
.carbonStatus {
  margin-top: 42px;
  padding-left: 24px;
  width: 600px;
  height: 64px;
  line-height: 64px;
  font-size: 20px;
  font-weight: 600;
  border-radius: 64px;
  background: #BDD7EE;
  span {
    margin: 0 4px;
  }
  span:nth-of-type(2) {
    color: #04B157;
  }
  span:nth-of-type(3) {
    color: yellow;
  }
  span:nth-of-type(4) {
    color: #F9C000;
  }
  span:nth-of-type(5) {
    color: #FE0000;
  }
}

</style>
