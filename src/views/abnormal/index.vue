<template>
  <div class="abnormal">
    <div class="abnormalTitle">
      异常行为
    </div>
    <div class="selectRow">
      <el-row :gutter="10">
        <el-col :span="1" class="font14 l-h-32 text-right">类型筛选:</el-col>
        <el-col :span="5" class="selectType">
            <el-select class="w-100" v-model="alarmTypeArr" multiple placeholder="请选择" size="small">
            <el-option
              v-for="(item,index) in typeData"
              :key="item.value"
              :label="(index !== 0 ? index +'、' : '') +item.name"
              :value="item.value">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="1" class="font14 l-h-32 text-right">选择日期:</el-col>
        <el-col :span="4">
          <el-date-picker class="w-100" v-model="selectTime" type="date" size="small" placeholder="选择日期" value-format="yyyy-MM-dd" :clearable="false"></el-date-picker> 
        </el-col>
        <el-col :span="1" class="font14 l-h-32 text-right">房间筛选:</el-col>
        <el-col :span="4">
          <el-select class="w-100" v-model="fromInfo.installationLocation" filterable placeholder="请选择" size="small"> 
              <el-option v-for="item in roomData" :key="item.value" :label="item.name" :value="item.value"> </el-option>
          </el-select>
        </el-col>
        <el-col :span="1">
           <el-button type="primary" size="small" @click="selectFunc('查询')">查询</el-button>
        </el-col>
      </el-row>
    </div>
    <div class="list">
      <el-table :data="tableData" style="width: 100%" :header-cell-style="{'background':'#F5F3F2'}" :max-height="430">
        <el-table-column prop="installationLocation" label="安装位置">
            <template slot-scope="scope">
              {{ isInstallationPosition(scope.row.installationLocation) }}
            </template>
        </el-table-column>
        <el-table-column prop="alarmType" label="行为类型">
            <template slot-scope="scope">
              {{ isType(scope.row.alarmType) }}
            </template>
        </el-table-column>
        <el-table-column prop="alarmType" label="行为建议">
            <template slot-scope="scope">
              {{ isAdvice(scope.row.alarmType) }}
            </template>
        </el-table-column> 
        <el-table-column prop="createTime" label="创建时间"> </el-table-column>
      </el-table>
      <el-row class="paging">
          <el-pagination
            background  @current-change="selectPage"
            layout="prev, pager, next"
            :total="total">
          </el-pagination>
      </el-row> 
    </div>
  </div>
</template>

<script>
import isType from '../../../static/js/isType';
import { getAbnormalList } from '../../assets/js/common';
export default {
  name: "diagnosticReport",
  data() {
    return {
        fromInfo:{
            pageNum:0,
            startDate:"",
            endDate:"",
            pageSize:10,
            alarmType:"",
            installationLocation:"",
        },
        alarmTypeArr: [],
        selectTime:"",
        typeData:[],
        roomData:[],
        tableData:[],
        total:0,
    };
  },
  created(){
    this.typeData = isType.typeData();
    this.typeData.unshift({value:"",name:"请选择"});
    this.roomData = isType.roomData();
    this.roomData.unshift({value:"",name:"请选择"});
    this.selectFunc();
  },
  methods:{
    isType(type){
      return isType.isAlarmType(type);
    },
    isInstallationPosition(type){
      return isType.isInstallationPosition(type);
    },
    isAdvice(type){
      return isType.isAdvice(type);
    },
    async selectFunc(type){
      if(type == '查询') this.fromInfo.pageNum = 1;

      if(this.selectTime != ""){
        this.fromInfo.startDate = this.selectTime + " 00:00:00";
        this.fromInfo.endDate = this.selectTime + " 23:59:59";
      }
      console.log(this.fromInfo.alarmType)
      this.fromInfo.alarmType = this.alarmTypeArr && this.alarmTypeArr.join(',');
      const res = await getAbnormalList(this.fromInfo);
      if(res?.code == "1"){
        this.tableData = res.data.list;
        this.total = res.data.total;
      }
    },
    selectPage(val){
      this.fromInfo.pageNum = val - 1;
      this.selectFunc();
    },
  }
};
</script>

<style lang="less" scoped>
.abnormal {
  .abnormalTitle{
    text-align: center;
    font-size: 16px;
    font-weight: bold;
    letter-spacing:5px;
  }
  .selectRow{
    margin-top: 20px;
  }
  .list{
    margin-top:30px;
    .el-table{
      box-shadow: 0px 2px 2px 3px rgba(15, 15, 15, 0.08);
    }
  }
  .paging{
    margin-top: 20px;
  }
}
.selectType /deep/.el-select{
    width: 70%;
}
/deep/.el-pagination{
  float: right;
}
/deep/ .el-date-editor--date, /deep/ .el-select--small {
  width: 130px;
}

.text-right {
  min-width: 74px;
}
</style>
