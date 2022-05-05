<template>
  <div class="report">诊断qwqe报告页面</div>
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
