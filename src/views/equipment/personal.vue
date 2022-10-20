<template>
  <div class="personal">
    <!-- 顶部编号、历史数据查看 s -->
    <div class="personal-top">
      <div class="personalTop-name">房间名：
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
            <el-progress type="dashboard" :percentage="productionObj.ghumidity" color="#18BC37" 
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
            <el-progress type="dashboard" :percentage="cumulativeTime" color="#FFD966" 
              :stroke-width="16" :format="(e)=>{ return e + ' 小时' }"></el-progress>
            <p class="progress-text">活性炭运行时间</p>
          </div>
          <div class="progress">
            <el-progress type="dashboard" :percentage="carbonObj.carbonLife" color="#FFD966" 
              :stroke-width="16" :format="(e)=>{ return e + ' %' }"></el-progress>
            <p class="progress-text">活性炭寿命</p>
          </div>
        </div>
      </div>
    </div>
    <!-- 治污措施 e -->

    <!-- 活性炭状态 s -->
    <div class="carbonStatus">
      <div class="carbonStatus-br"></div>
      <span>活性炭状态：</span>
      | <span>穿透
        <span class="carbonStatus-triangle" v-if="carbonObj.carbonState == 1"></span>
        </span>
      | <span>预警
        <span class="carbonStatus-triangle" v-if="carbonObj.carbonState == 2"></span>
      </span>
      | <span>饱和
        <span class="carbonStatus-triangle" v-if="carbonObj.carbonState == 3"></span>
      </span>
      | <span>失效
        <span class="carbonStatus-triangle"  v-if="carbonObj.carbonState == 4"></span>
        </span> |
    </div>
    <!-- 活性炭状态 e -->
    

  
  </div>
</template>

<script>
import {
  getProductionStatus,
  getReport,
  deviceList,
  loadCumulativeTime,
  loadCarbonObj
} from "../../assets/js/equipment";


export default {
  name: "personalView",
  data() {
    return {
      roomData:[],//房间名称数组
      productionStatusArr: [], // 设备生产状态数据
      activeId: null, // 设备id
      productionObj: {}, // 设备信息数据
      doorArr: [], // 门的数据
      data:[],
      cumulativeTime: 0,
      carbonObj:{},//活性炭寿命和状态
    };
  },
  created() {
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
        // 获取设备生产状态
        this.getProductStatus();
        // 获取设备信息
        this.getReportDetail();
        // 活性炭信息
        this.carbonInformation();
        // 活性炭运行时间
        this.loadCumulativeTime();
      }
    },
    // 获取设备状态
    async getProductStatus() {
      const form = {
        deviceId: this.activeId,
      };
      const res = await getProductionStatus(form);
      if (res.code == "1") {
        this.productionStatusArr = res.data;
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
      }else{
        console.log("无数据")
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
    // 获取台账累计时间
    async loadCumulativeTime() {
      const res = await loadCumulativeTime(this.activeId);
      if(res?.code == '1') {
        this.cumulativeTime = res.data / 60;
      }
    },
    //获取活性炭状态和寿命
    async carbonInformation() {
      const res = await loadCarbonObj(this.activeId);
      if(res?.code == '1') {
        this.carbonObj = res.data;
      }
    }
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
    margin-top: 28px;
    .personalCon-production,
    .personalCon-measure {
      margin-top: 28px;
      padding: 14px;
      width: 48%;
      min-width: 680px;
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
  position: relative;
  margin-top: 42px;
  width: 450px;
  height: 49px;
  line-height: 49px;
  font-size: 20px;
  font-weight: 600;
  border-radius: 49px;
  background: #BDD7EE;
  span {
    position: relative;
    margin: 0 4px;
  }
  span:nth-of-type(1) {
    margin-left: 28px;
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
  .carbonStatus-br {
    position: absolute;
    top: -10px;
    left: 0;
    right: 0;
    margin: auto;
    width: 90%;
    height: 2px;
    background: #006CBA;
  }
  .carbonStatus-br::after {
    content: "◉";
    position: absolute;
    top: -23px;
    left: -16px;
    font-size: 20px;
    font-weight: 600;
    color: #006CBA;
  }
  .carbonStatus-br::before {
    content: "◉";
    position: absolute;
    top: -23px;
    right: -16px;
    font-size: 20px;
    font-weight: 600;
    color: #006CBA;
  }
  .carbonStatus-triangle {
    position: absolute;
    top: -14px;
    left: -18px;
    width: 0;
    height: 0;
    border-top: 23px solid #006CBA;
    border-left: 11px solid transparent;
    border-right: 11px solid transparent;
    box-shadow: inset 0 0 10px rgba(0, 255, 0, .5);
  }
}

</style>
