<template>
  <div class="report">
      <div class="reportTitle">诊断报告</div>
      <div class="select-row">
       日期选择： <el-date-picker v-model="selectTime" type="date" size="small" placeholder="选择日期">
    </el-date-picker>
      </div>
  </div>
</template>

<script>
import isType from '../../../static/js/isType'
export default {
  name: "diagnosticReport",
  data() {
    return {
        fromInfo:{
            pageNum:0,
            startDate:"",
            endDate:"",
            pageSize:20,
            alarmType:"",
            installationLocation:"",
        },
        selectTime:"",
        typeData:[],
    };
  },
  created(){
    this.typeData = isType.typeData();
    console.log(this.typeData);
  },
  methods:{
    isType(type){
      return isType.isAlarmType(type);
    },

  }
};
</script>

<style lang="less" scoped>
.report {
  .reportTitle{
    text-align: center;
    font-size: 16px;
    font-weight: bold;
    letter-spacing:5px;
  }
  .select-row{
    margin-top: 20px;
  }
}
</style>
