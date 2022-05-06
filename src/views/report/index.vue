<template>
  <div class="report">
    <div class="reportTitle">
      诊断报告
    </div>
    <div class="selectRow">
      <el-row>
         <el-col :span="5">
          选择日期：<el-date-picker v-model="selectTime" type="date" size="small" placeholder="选择日期"></el-date-picker> 
        </el-col>
        <el-col :span="5">
          选择状态：<el-select v-model="fromInfo.installationLocation" filterable placeholder="请选择" size="small"> 
                      <el-option v-for="item in stateData" :key="item.value" :label="item.name" :value="item.value"> </el-option>
                  </el-select>
        </el-col>
        <el-col :span="7">
           <el-button type="primary" size="small" @click="selectFunc">查询</el-button>
        </el-col>
      </el-row>
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
        stateData:[
          {value:"",name:"请选择"},
          {value:0,name:"未整改"},
          {value:1,name:"整改中"},
          {value:2,name:"整改完成"},
        ],
    };
  },
  created(){
    this.typeData = isType.typeData();
    this.roomData = isType.roomData();
    console.log(this.typeData);
  },
  methods:{
    isType(type){
      return isType.isAlarmType(type);
    },
    selectFunc(){

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
  .selectRow{
    margin-top: 20px;
   
  }
}
.selectType /deep/.el-select{
    width: 70%;
}
</style>
