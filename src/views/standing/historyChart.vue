<template>
  <div class="historyChart">
    <div class="historyTitle">历史材料台账</div>

     <div class="historyType">
       <el-form>
          <el-row>
            <el-col :span="8">
              <el-form-item label="台账类型：">
                <el-radio-group v-model="listInfo.ledgerType" @change="selectType()">
                  <el-radio :label="1">原辅料台账</el-radio>
                  <el-radio :label="2">耗材台账</el-radio>
                  <el-radio :label="3">活性炭台账</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="时间选择：">
                <!-- <el-date-picker v-if="listInfo.ledgerType == 3" style="width:60%" v-model="fromInfo.startDate" type="date" placeholder="选择日期" size="small" value-format="yyyy-MM-dd"></el-date-picker> -->
                <el-date-picker v-model="val" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd" size="small"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="1" style="padding-top:3px;">
              <el-button type="primary" @click="queryForm('search')" size="small">查询</el-button>    
            </el-col>
             <el-col :span="2" style="padding-top:3px;padding-left:20px;">
               <div class="out" v-if="listInfo.ledgerType == 1">
                      <template>
                          <download-excel class="export-excel-wrapper" :data="vocsData" :fields="material" name="原辅料台账.xls" >
                              <!-- 上面可以自定义自己的样式，还可以引用其他组件button -->
                              <el-button type="success" size="small">导出台账</el-button>
                          </download-excel>
                      </template>
                </div>
                <div class="out" v-if="listInfo.ledgerType == 2">
                    <template>
                        <download-excel class="export-excel-wrapper" :data="vocsData" :fields="consumption" name="耗材台账.xls" >
                            <!-- 上面可以自定义自己的样式，还可以引用其他组件button -->
                            <el-button type="success" size="small">导出台账</el-button>
                        </download-excel>
                    </template>
                </div>
                <div class="out" v-if="listInfo.ledgerType == 3">
                    <template>
                        <download-excel class="export-excel-wrapper" :data="activatedCarbonData" :fields="activatedCarbon" name="活性炭吸附设施运行维护台账.xls" >
                            <!-- 上面可以自定义自己的样式，还可以引用其他组件button -->
                            <el-button type="success" size="small">导出台账</el-button>
                        </download-excel>
                    </template>
                </div>
             </el-col>
          </el-row>
        </el-form>
      </div>

      <div class="materialType">
          <div class="typeContent">
            <!-- 原辅料台账 -->
            <el-table v-if="listInfo.ledgerType == 1" :data="vocsData" style="width: 100%" max-height="750" :header-cell-style="{'background':'#F5F3F2'}">
              <el-table-column prop="materialName" label="含VOCs材料名称" width="200"></el-table-column>
              <el-table-column prop="purchaseQuantity" label="采购量(kg)" width="200"></el-table-column>
              <el-table-column prop="usageThisWeek" label="本周使用量(kg)" width="200"></el-table-column>
              <el-table-column prop="inventoryThisWeek" label="剩余库存量(kg)" width="200"></el-table-column>
              <el-table-column prop="vocsContent" label="VOCs含量(%)" width="200"></el-table-column>
              <el-table-column prop="recoverType" label="回收方式" width="200"></el-table-column>
              <el-table-column prop="recoverAmount" label="回收量"></el-table-column>
              <el-table-column prop="createTime" label="日期"></el-table-column>
            </el-table>

            <!-- 耗材台账 -->
            <el-table v-if="listInfo.ledgerType == 2" :data="vocsData" style="width: 100%,margon-top:20px" max-height="750" :header-cell-style="{'background':'#F5F3F2'}">
              <el-table-column prop="consumablesType" label="耗材种类" width="260"></el-table-column>
              <el-table-column prop="replacementAmount" label="更换量(kg)" width="260"></el-table-column>
              <el-table-column prop="replacementTime" label="更换时间" width="260"></el-table-column>
              <el-table-column prop="handleType" label="处置情况" width="260"></el-table-column>
              <el-table-column prop="handleTime" label="处置时间"></el-table-column>
            </el-table>

            <!-- 活性炭台账 -->
            <el-table v-if="listInfo.ledgerType == 3" :data="activatedCarbonData" style="width: 100%" max-height="750" :header-cell-style="{'background':'#F5F3F2'}">
              <el-table-column prop="openStartTime" label="开启时间">
                <template slot-scope="scope">
                  {{ scope.row.openStartTime }} ~ {{ scope.row.openEndTime }}
                </template>
              </el-table-column>
              <el-table-column prop="handleTime" label="关停时间">
                <template slot-scope="scope">
                  {{ scope.row.shutdownStartTime }} ~ {{ scope.row.shutdownEndTime }}
                </template>
              </el-table-column>
              <el-table-column prop="handleTime" label="更换时间"></el-table-column>
              <el-table-column prop="handleTime" label="活性炭种类"></el-table-column>
              <el-table-column prop="handleTime" label="装填数量(kg)"></el-table-column>
            </el-table>
            <!-- 分页 -->
            <el-pagination background layout="prev, pager, next" :total="total" @current-change="selectPage" v-if="listInfo.ledgerType != 3"></el-pagination>
          </div>
        </div>
  </div>
</template> 

<script>
import { getHistory } from "../../assets/js/standing";
import { getActivatedCarbon } from '../../assets/js/common';
export default {
  name: "historyChart",
  data() {
    return {
      val:['',''],
      vocsData: [],
      activatedCarbonData:[],
      listInfo: {
          ledgerType: 1,
          pageNum: 0,
          ledgerStatus: 2,
          pageSize: 10,
          startDate: "",
          endDate: ""
      },
      fromInfo:{
        startDate: "",
        endDate: "",
        // pageNum: 0,
        // pageSize: 10,
      },
      //原辅料
      material: {
        "含VOCs材料名称":'materialName',
        "采购量(kg)":'purchaseQuantity',
        "本周使用量(kg)":'usageThisWeek',
        "剩余库存量(kg)":'inventoryThisWeek',
        "VOCs含量(%)":'vocsContent',
        "回收方式":'recoverType',
        "回收量":'recoverAmount', 
      },

      //耗材
      consumption:{
        "耗材种类":'consumablesType',
        "更换量(kg)":'replacementAmount',
        "更换时间":'replacementTime',
        "处置情况":'handleType',
        "处置时间":'handleTime', 
      },

      //活性炭
      activatedCarbon:{
        "开启开始时间":"openStartTime",
        "开启结束时间":"openEndTime",
        "关停开始时间":"shutdownStartTime",
        "关停结束时间":"shutdownEndTime",
        "更换时间":"replacementTime",
        "活性炭种类":"activatedCarbonType",
        "装填数量(kg)":"loadQuantity",
      },
      total:0,
    };
  },
  created(){
    this.getMaterial();
  },
  methods: {
    //查询
    queryForm(state){
      if(state == "search"){
        this.listInfo.pageNum = 0;
        // this.fromInfo.pageNum = 0;
      }
      if(this.val.length == 0){
        this.listInfo.startDate="";
        this.listInfo.endDate="";
      }else{ 
        this.listInfo.startDate = this.val[0] + " 00:00:00";
        this.listInfo.endDate = this.val[1] + " 23:59:59";
      }
      // this.getMaterial()
      if(this.listInfo.ledgerType == 3){
        console.log(this.fromInfo)
        this.fromInfo.startDate = this.val[0] + " 00:00:00";
        this.fromInfo.endDate = this.val[1] + " 23:59:59";
        this.getActivatedCarbonList();
        return;
      }
      this.getMaterial();
    },
    selectPage(val){
      if(this.listInfo.ledgerType != 3){
        this.listInfo.pageNum = val - 1;
      }else{
        // this.fromInfo.pageNum = val - 1;
      }
      this.queryForm('page');
    },
    //类型筛选
    selectType(){
      this.vocsData = [];
      this.activatedCarbonData = [];
      this.vocsData.length = 0;
      this.listInfo.pageNum = 0;
      if(this.listInfo.ledgerType == 3){
        this.getActivatedCarbonList();
        return;
      }
      this.getMaterial();
    },
    //获取原辅材料和耗材台账
    async getMaterial(){
      this.total = 0;
      const res = await getHistory(this.listInfo);
      if(res?.code == '1'){
        this.total = res.data.total;
        let list = res.data.list;
        if(list == undefined){return}
        if(list.length != 0 ){
          list.forEach((el) => {
            el.ledgerDetailList.forEach((val)=>{
              const createTime = el.createTime.split(' ')[0];
              val.createTime = createTime;
              this.vocsData.push(val);
            })
          });
        } else {
          this.vocsData = [];
        }
      }
    },
    //获取活性炭台账
    async getActivatedCarbonList(){
      const res = await getActivatedCarbon(this.fromInfo);
      if(res?.code == "1"){
        this.activatedCarbonData = res.data;
        console.log(this.activatedCarbonData)
      }
    },
  },
};
</script>

<style lang="less" scoped>
.historyChart {
  .historyTitle{
    text-align: center;
    font-size: 18px;
    font-weight: bold;
    letter-spacing:5px;
  }
  .historyType{
    width: 1280px;
    .el-form{
      margin-top: 20px;
    }  
  }
  .el-table{
      margin-top: 20px;
      box-shadow: 0px 2px 2px 3px rgba(15, 15, 15, 0.08);
    }
  .el-pagination{
      margin-top: 20px;
      float: right;
    }
}
</style>
