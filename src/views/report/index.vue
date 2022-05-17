<template>
  <div class="report">
    <div class="reportTitle">
      诊断报告
    </div>
    <div class="selectRow">
      <el-row class="w-100" type="flex" justify="start">
         <el-col :xl="5" :md="5" :lg="7">
          选择日期：<el-date-picker v-model="selectTime" type="date" size="small" placeholder="选择日期" value-format="yyyy-MM-dd"></el-date-picker> 
        </el-col>
        <el-col :xl="5" :md="5" :lg="7">
          选择状态：<el-select v-model="listFromInfo.rectificationStatus" filterable placeholder="请选择" size="small"> 
                      <el-option v-for="item in stateData" :key="item.value" :label="item.name" :value="item.value"> </el-option>
                  </el-select>
        </el-col>
        <el-col :xl="1" :md="8" :lg="2">
           <el-button type="primary" size="small" @click="selectFunc">查询</el-button>
        </el-col>
      </el-row>
    </div>
    <div class="reportContent">
      <el-table :data="reportData" style="width: 100%,margon-top:20px" :header-cell-style="{'background':'#F5F3F2'}">
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
            <el-col :span="24">通知时间：{{ detailInfo.noticeTime }} </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">通知内容：您的企业本周产生了{{ JSON.stringify(detailInfo)=='{}' ? "-" : detailInfo.alarmCountRectificationList[0].alarmCount }}次异常行为，具体如下:
            </el-col>
          </el-row>
          <div class="roomDetail" v-for="(item,i) in  list" :key="i">
            <div class="roomName">{{ item.name }}</div>
             <!-- v-for="(el,index) in item.data" :key="index" -->
            <div class="roomList">
              <el-table :data="item.data">
                 <el-table-column  type="index" label="序号"></el-table-column>
                 <el-table-column prop="el.alarmType" label="行为">
                   <template slot-scope="scope">
                     {{ isType(scope.row.alarmType) }}
                   </template>
                 </el-table-column>
                 <el-table-column prop="el.cumulativeNumber" label="累计次数" width="80" align="center">
                   <template slot-scope="scope">
                     {{ scope.row.alarmCount }}
                   </template>
                 </el-table-column>
                 <el-table-column prop="el.alarmType" label="管控建议">
                    <template slot-scope="scope">
                     {{ isAdvice(scope.row.alarmType) }}
                    </template> 
                 </el-table-column>
              </el-table>
            </div>
            </div>
            <div class="roomResult" v-if="detailInfo.rectificationResult!=''">整改结果：{{detailInfo.rectificationResult}}</div>
              <el-row :gutter="20" v-if="imgData.length != 0">
                <el-col :span="6" v-for="(item,i) in imgData" :key="i">
                  <img v-if="item != ''" :src="item" class="image" alt="">
                </el-col>
              </el-row>
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
              companyId: 0,
              id: 0,
              createTime: "2022-4-7 00:00:00",
              rectificationResult: "整改结果整改结果整改结果整改结果整改结果整改结果整改结果整改结果",
              rectificationMan: "",
              updateTime: "2022-4-7 00:00:00",
              phone: "188888888888",
              rectificationPicture: "https://zjlianweihoss.oss-cn-hangzhou.aliyuncs.com/file/1649907389625-detail-logo.png;https://zjlianweihoss.oss-cn-hangzhou.aliyuncs.com/file/1649907389625-detail-logo.png;https://zjlianweihoss.oss-cn-hangzhou.aliyuncs.com/file/1649907389625-detail-logo.png;https://zjlianweihoss.oss-cn-hangzhou.aliyuncs.com/file/1649907389625-detail-logo.png;",
              rectificationStatus: 1,
              rectificationContent: "",
              noticeTime: "2022-4-7 00:00:00",
              completionTime: "2022-4-7 00:00:00",
              viewTime: "2022-4-7 00:00:00",
              alarmCountRectificationList: [
                {
                  deviceId: 0,
                  bakingRoom: "第三号烤漆房",
                  roomName: "连微科技",
                  installationLocation: 1,
                  alarmType: 9,
                  alarmCount: 0
                },
                {
                  deviceId: 0,
                  bakingRoom: "第三号烤漆房",
                  roomName: "连微科技",
                  installationLocation: 1,
                  alarmType: 9,
                  alarmCount: 0
                },
                {
                  deviceId: 0,
                  bakingRoom: "第三号烤漆房",
                  roomName: "紫金港",
                  installationLocation: 1,
                  alarmType: 9,
                  alarmCount: 0
                }
              ]
            } 
        ],
        imgData:[],
        listFromInfo:{
          startDate:"",
          endDate:"",
          pageSize:20,
          pageNum:0,
          rectificationStatus:"",
        },
        editStateId:"",
        detailInfo:{},
        list:[],
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
    isAdvice(type){
      return isType.isAdvice(type);
    },
    selectFunc(){
        this.listFromInfo.startDate = this.selectTime + " 00:00:00";
        this.listFromInfo.endDate = this.selectTime + " 23:59:59";
        this.getList();
    },
    //显示详情
    showDetail(val){
      // console.log(val)
      this.detailInfo = val;
      this.detailModel = true;
      this.editStateId = "";
      if(val.state == 0){
          // this.editState(val.id);
          this.editStateId = val.id;
      }
      let arr = val.alarmCountRectificationList;
      if(arr.length == 0){return};
      if (val.rectificationPicture != "") {
        this.imgData=val.rectificationPicture.split(";");
        console.log(this.imgData)
      }
      
      let roomData = [];
      arr.forEach((item)=>{
          roomData.push(item.roomName);
      })
      roomData = new Set([...roomData])
      let list = [];
      roomData.forEach((item)=>{
        list.push({
          name:item,
          data:[],
        })
      })
      console.log(roomData)
      list.forEach((item)=>{
        arr.forEach((el)=>{
          if(item.name == el.roomName){
            item.data.push(el);
          }
        })
      })
      console.log(list)
      this.list = list;
      

      // console.log(this.detailInfo.alarmCountRectificationList)

      // array.forEach(el => {
      //   roomList.push(el.roomName)
      // });
      // console.log(roomList)
      
    },
    
    async editState(id){
      await editReportState({rid:id});
    },
    hideModel(){
      if(this.detailInfo.rectificationStatus == 0){
        this.getList();
      }
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
.roomDetail{
  margin-top: 20px;
  .roomName{
    font-size: 15px;
    padding-top: 20px;
    letter-spacing: 3px;
  }
  .roomList{
    margin-top: 14px;
    box-shadow: 0px 2px 2px 3px rgba(15, 15, 15, 0.08);
    
  }
  
}
.roomResult{
    margin-top: 14px;
    font-size: 15px;
  }
.image{
  width: 100%;
  height: 100%;
  padding-top: 14px;
}

/deep/ .el-dialog__body {
  height: 820px;
  overflow-y: auto;
}

</style>
