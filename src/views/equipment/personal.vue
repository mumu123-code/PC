<template>
  <div class="personal">
    <!-- 顶部编号、历史数据查看 s -->
    <div class="personal-top">
      <div class="personalTop-name">房间名：{{roomName}}</div>
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
            {{ productionObj.ntemperature || "-" }} °C
          </span>
          <span>
            <img
              src="https://zjlianweihoss.oss-cn-hangzhou.aliyuncs.com/file/1649909507008-water.png"
            />
            {{ productionObj.nhumidity || "-" }} %
          </span>
          <span>
            <img
              src="https://zjlianweihoss.oss-cn-hangzhou.aliyuncs.com/file/1649909506887-oxygen.png"
            />
            {{ productionObj.no2 || "-" }} %
          </span>
          <span>
            <img
              src="https://zjlianweihoss.oss-cn-hangzhou.aliyuncs.com/file/1649909506764-cloud.png"
            />
            {{ productionObj.nhumidity || "-" }} mg/m³
          </span>
          <span>
            <img
              src="https://zjlianweihoss.oss-cn-hangzhou.aliyuncs.com/file/1649909506601-arrow.png"
            />
            {{ productionObj.nmicropressure || "-" }} kPa
          </span>
        </div>
        <div class="personalConPro-bottom">
          <span>
            门1:
            <img
              src="https://zjlianweihoss.oss-cn-hangzhou.aliyuncs.com/file/1649909506806-door-close.png"
              v-if="productionObj.door1Value == 1"
            />
            <img
              src="https://zjlianweihoss.oss-cn-hangzhou.aliyuncs.com/file/1649909506837-door-open.png"
              v-else
            />
          </span>
          <span>
            门2:
            <img
              src="https://zjlianweihoss.oss-cn-hangzhou.aliyuncs.com/file/1649909506806-door-close.png"
              v-if="productionObj.door2Value == 1"
            />
            <img
              src="https://zjlianweihoss.oss-cn-hangzhou.aliyuncs.com/file/1649909506837-door-open.png"
              v-else
            />
          </span>
          <span>
            门3:
            <img
              src="https://zjlianweihoss.oss-cn-hangzhou.aliyuncs.com/file/1649909506806-door-close.png"
              v-if="productionObj.door3Value == 1"
            />
            <img
              src="https://zjlianweihoss.oss-cn-hangzhou.aliyuncs.com/file/1649909506837-door-open.png"
              v-else
            />
          </span>
          <span>
            门4:
            <img
              src="https://zjlianweihoss.oss-cn-hangzhou.aliyuncs.com/file/1649909506806-door-close.png"
              v-if="productionObj.door4Value == 1"
            />
            <img
              src="https://zjlianweihoss.oss-cn-hangzhou.aliyuncs.com/file/1649909506837-door-open.png"
              v-else
            />
          </span>
          <span>
            门5:
            <img
              src="https://zjlianweihoss.oss-cn-hangzhou.aliyuncs.com/file/1649909506806-door-close.png"
              v-if="productionObj.door5Value == 1"
            />
            <img
              src="https://zjlianweihoss.oss-cn-hangzhou.aliyuncs.com/file/1649909506837-door-open.png"
              v-else
            />
          </span>
        </div>
      </div>
      <div class="personalCon-measure">
        <span class="title">治污措施</span>
        <div class="personalConPro-content">
          <span>
            <img
              src="https://zjlianweihoss.oss-cn-hangzhou.aliyuncs.com/file/1649909506953-temperature.png"
            />
            {{ productionObj.gtemperature || "-" }} °C
          </span>
          <span>
            <img
              src="https://zjlianweihoss.oss-cn-hangzhou.aliyuncs.com/file/1649909507008-water.png"
            />
            {{ productionObj.ghumidity || "-" }} %
          </span>
          <span>
            <img
              src="https://zjlianweihoss.oss-cn-hangzhou.aliyuncs.com/file/1649909506887-oxygen.png"
            />
            {{ productionObj.go2 || "-" }} %
          </span>
          <span>
            <img
              src="https://zjlianweihoss.oss-cn-hangzhou.aliyuncs.com/file/1649909506764-cloud.png"
            />
            {{ productionObj.ghumidity || "-" }} mg/m³
          </span>
          <span>
            <img
              src="https://zjlianweihoss.oss-cn-hangzhou.aliyuncs.com/file/1649909506601-arrow.png"
            />
            {{ productionObj.nmicropressure || "-" }} kPa
          </span>
          <span>
            <img
              src="../../../static/images/feng.png"
            />
            {{ productionObj.gwindspeed || "-" }} m/s
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

    <div class="charts-box">
      <div class="line">
        <div
          v-for="(item, index) in productionStatusArr"
          :key="index"
          :class="[
            'line-item',
            'br',
            {
              offline: item.operativeStatus == 3,
              idle: item.operativeStatus == 0,
              varnish: item.operativeStatus == 1,
              paint: item.operativeStatus == 2,
            },
          ]"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getProductionStatus,
  getReportDetail,
} from "../../assets/js/equipment";

import { getNowTime } from "./isType";

export default {
  name: "personalView",
  data() {
    return {
      productionStatusArr: [], // 设备生产状态数据
      time: "",
      activeId: 0, // 设备id
      roomName: '', // 房间名称
      productionObj: {}, // 设备信息数据
    };
  },
  mounted() {
    // 上个页面传值下来的id
    this.activeId = this.$route.query.id;
    this.roomName = this.$route.query.roomName;
    // 设置当天日期
    this.time = getNowTime();
    // 获取设备生产状态
    this.getProductStatus();
    // 获取设备信息
    this.getReportDetail();
  },
  methods: {
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
      }
    },
    // 获取生产状态，治污措施数据
    async getReportDetail() {
      let formInfo = {
        deviceId: this.activeId,
        pageNum: 1,
        pageSize: 1,
      };

      const res = await getReportDetail(formInfo);
      if (res.code == "1") {
        this.productionObj = res.data.list[0];
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
</style>
