<template>
  <div class="historyChart">
    <div class="historyTitle">历史材料台账</div>

     <div class="historyType">
       <el-form :inline="true">
          <el-row type="flex">
            <el-col :span="6" :offset="9">
              <el-form-item label="台账类型：">
                <el-radio-group v-model="listInfo.ledgerType" @change="selectType()">
                  <el-radio :label="1">原辅料台账</el-radio>
                  <el-radio :label="2">耗材台账</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="时间段：">
                <el-date-picker v-model="val" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd" size="small"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="1" style="padding-top:3px;">
              <el-button type="primary" @click="queryForm" size="small">查询</el-button>
            </el-col>
          </el-row>
       </el-form>

        <div class="materialType">
          <div class="typeContent">
            <!-- 原辅料台账 -->
            <el-table v-if="listInfo.ledgerType == 1" :data="vocsData" style="width: 100%" :header-cell-style="{'background':'#F5F3F2'}">
              <el-table-column prop="materialName" label="含VOCs材料名称" width="200"></el-table-column>
              <el-table-column prop="purchaseQuantity" label="采购量(kg)" width="200"></el-table-column>
              <el-table-column prop="usageThisWeek" label="本周使用量(kg)" width="200"></el-table-column>
              <el-table-column prop="inventoryThisWeek" label="剩余库存量(kg)" width="200"></el-table-column>
              <el-table-column prop="vocsContent" label="VOCs含量(%)" width="200"></el-table-column>
              <el-table-column prop="recoverType" label="回收方式" width="200"></el-table-column>
              <el-table-column prop="recoverAmount" label="回收量"></el-table-column>
            </el-table>

            <!-- 耗材台账 -->
              <el-table v-if="listInfo.ledgerType != 1" :data="vocsData" style="width: 100%,margon-top:20px" :header-cell-style="{'background':'#F5F3F2'}">
              <el-table-column prop="consumablesType" label="耗材种类" width="260"></el-table-column>
              <el-table-column prop="replacementAmount" label="更换量(kg)" width="260"></el-table-column>
              <el-table-column prop="replacementTime" label="更换时间" width="260"></el-table-column>
              <el-table-column prop="handleType" label="处置情况" width="260"></el-table-column>
              <el-table-column prop="handleTime" label="处置时间"></el-table-column>
            </el-table>

            <!-- 分页 -->
            <el-pagination background layout="prev, pager, next" :total="total" @current-change="selectPage"></el-pagination>
          </div>
        </div>
     </div>
  </div>
</template>

<script>
import { getHistory } from "../../assets/js/standing";
export default {
  name: "historyChart",
  data() {
    return {
      val:['',''],
      vocsData: [],
      listInfo: {
          ledgerType: 1,
          pageNum: 0,
          ledgerStatus: 2,
          pageSize: 10,
          startDate: "",
          endDate: ""
      },
      total:0,
    };
  },
  created(){
    this.getMaterial();
  },
  methods: {
    //查询
    queryForm(){
      if(this.val.length == 0){
        this.listInfo.startDate="";
        this.listInfo.endDate="";
      }else{ 
        this.listInfo.startDate=this.val[0] + " 00:00:00";
        this.listInfo.endDate=this.val[1] + " 23:59:59";
      }
      this.getMaterial()
    },
    selectPage(val){
      this.listInfo.pageNum = val - 1;
      this.queryForm();
    },
    //类型筛选
    selectType(){
      this.vocsData.length = 0;
      this.listInfo.pageNum = 0;
      this.getMaterial();
      console.log(this.listInfo.ledgerType)
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
              this.vocsData.push(val)
            })
          });
        }
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
    width: 80vw;
    margin: 0 auto;
    .el-form{
      margin-top: 20px;
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
}
</style>
