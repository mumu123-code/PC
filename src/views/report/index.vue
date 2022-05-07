<template>
  <div class="report">
    <div class="reportTitle">
      诊断报告
    </div>
    <div class="selectRow">
      <el-row >
         <el-col :span="6">
          选择日期：<el-date-picker v-model="selectTime" type="date" size="small" placeholder="选择日期" value-format="yyyy-MM-dd"></el-date-picker> 
        </el-col>
        <el-col :span="6">
          选择状态：<el-select v-model="listFromInfo.rectificationStatus" filterable placeholder="请选择" size="small"> 
                      <el-option v-for="item in stateData" :key="item.value" :label="item.name" :value="item.value"> </el-option>
                  </el-select>
        </el-col>
        <el-col :span="2">
           <el-button type="primary" size="small" @click="selectFunc">查询</el-button>
        </el-col>
      </el-row>
    </div>
    <div class="reportContent">
      <el-table :data="reportData" style="width: 100%,margon-top:20px" :header-cell-style="{'background':'#F5F3F2'}">
        <el-table-column prop="reportData.roomName" label="房间名称" width="140">
           <template slot-scope="scope">
              {{ scope.row.alarmCountRectificationList[0].bakingRoom }}
            </template>
        </el-table-column>
        
         <el-table-column prop="reportData.alarmType" label="报警类型" width="400">
          <template slot-scope="scope">
            {{ isType(scope.row.alarmCountRectificationList[0].alarmType) }}
          </template>
        </el-table-column>
         <el-table-column prop="reportData.roomName" label="报警次数 " width="120">
          <template slot-scope="scope">
            {{ scope.row.alarmCountRectificationList[0].alarmCount }}
          </template>
        </el-table-column>
        <el-table-column prop="reportData.roomName" label="安装位置 " width="140">
          <template slot-scope="scope">
            {{ isSize(scope.row.alarmCountRectificationList[0].installationLocation) }}
          </template>
        </el-table-column> -->
        <el-table-column prop="reportData.rectificationStatus" label="整改内容">
          <template slot-scope="scope">
            {{ scope.row.rectificationContent }}
          </template>
        </el-table-column>
        <el-table-column prop="reportData.rectificationStatus" label="整改状态">
          <template slot-scope="scope">
            {{ scope.row.rectificationStatus == 0 ? "未整改"  : scope.row.rectificationStatus == 1 ? "整改中" : "整改完成" }}
          </template>
        </el-table-column>
        <el-table-column prop="reportData.rectificationMan" label="整改人" width="100"></el-table-column>
        <el-table-column prop="reportData.phone" label="联系电话" width="180">
             <template slot-scope="scope">
              {{ scope.row.phone }}
            </template>
        </el-table-column>
        <el-table-column prop="reportData.updateTime" label="通知时间">
            <template slot-scope="scope">
            {{ scope.row.updateTime }}
          </template>
        </el-table-column>
        <el-table-column prop="reportData.detail" label="查看详情" align="center">
           <template slot-scope="scope">
             <!-- .id,scope.row.rectificationStatus -->
             <span @click="showDetail(scope.row)" style="font-size:28px;"><i class="el-icon-view"></i></span>
          </template>
        </el-table-column>
      </el-table>
       <el-row class="paging">
          <el-pagination
            background  @current-change="selectPage"
            layout="prev, pager, next"
            :total="total">
          </el-pagination>
      </el-row> 
    </div>
    <!-- 弹出框s -->
        <el-dialog title="报告详情" :visible.sync="detailModel" @close="hideModel">
          <el-row>
            <el-col :span="3">通知时间：</el-col>
            <el-col :span="9">
              <!-- {{ detailInfo != {} ? detailInfo.reportData[0].noticeTime : "" }} -->123
            </el-col>
            <el-col :span="3">通知内容：</el-col>
            <el-col :span="9">
               您的企业本周产生了123<!-- {{ detailInfo != {} ? isSize(detailInfo.reportData[0].rectificationContent) : "" }} -->次异常行为，具体如下
            </el-col>
          </el-row>
          <div class="roomDetail">

          </div>
        </el-dialog>
   
    <!-- 弹出框e -->
  </div>
</template>

<script>
import isType from '../../../static/js/isType'
import { getDiagnoseReportList,editReportState } from '../../assets/js/common'
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
        selectTime:"",
        gridData:[],
        stateData:[
          {value:"",name:"请选择"},
          {value:0,name:"未整改"},
          {value:1,name:"整改中"},
          {value:2,name:"整改完成"},
        ],
         total:0,
         detailModel:false,
        reportData:[
          	{
              "companyId": 0,
              "id": 0,
              "createTime": "2022-4-7 00:00:00",
              "rectificationResult": "",
              "rectificationMan": "",
              "updateTime": "2022-4-7 00:00:00",
              "phone": "188888888888",
              "rectificationPicture": "",
              "rectificationStatus": 1,
              "rectificationContent": "",
              "noticeTime": "2022-4-7 00:00:00",
              "completionTime": "2022-4-7 00:00:00",
              "viewTime": "2022-4-7 00:00:00",
              "alarmCountRectificationList": [
                {
                  "deviceId": 0,
                  "bakingRoom": "第三号烤漆房",
                  "roomName": "",
                  "installationLocation": 1,
                  "alarmType": 9,
                  "alarmCount": 0
                }
              ]
            } 
        ],
        listFromInfo:{
          startDate:"",
          endDate:"",
          pageSize:20,
          pageNum:0,
          rectificationStatus:"",
        },
        editStateId:"",
        detailInfo:{},
    };
  },
  created(){
    this.typeData = isType.typeData();
    this.roomData = isType.roomData();
    // this.getList();
  },
  methods:{
    //判断类型
    isType(type){
      return isType.isAlarmType(type);
    },
    //安装位置
    isSize(type){
      return isType.isInstallationPosition(type);
    },
    selectFunc(){
        this.listFromInfo.startDate = this.selectTime + " 00:00:00";
        this.listFromInfo.endDate = this.selectTime + " 23:59:59";
        this.getList();
    },
    //显示详情
    showDetail(val){
      console.log(val)
      this.detailModel = true;
      this.editStateId = "";
      if(val.state == 0){
          // this.editState(val.id);
          this.editStateId = val.id;
      }
    },
    
    async editState(id){
      await editReportState({rid:id});
    },
    hideModel(){
        this.getList();
    },
    //分页
    selectPage(val){
      this.listFromInfo.pageNum = val - 1;
      this.getList();
    },
    //获取列表
    async getList(){
      const res = await getDiagnoseReportList(this.listFromInfo);
      if(res?.code == "1"){
        this.reportData = res.data.list;
        this.total = res.data.total;
      }
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
    width: 1280px;
    margin-top: 20px;
  }
  .paging{
    margin-top: 20px;
  }
}

.selectType /deep/.el-select{
    width: 70%;
}
.reportContent{
  margin-top: 20px;
  .el-table{
    box-shadow: 0px 2px 2px 3px rgba(15, 15, 15, 0.08);
  }
}
/deep/.el-pagination{
  float: right;
}

</style>
