<template>
  <div class="historyChart">
    <div class="historyTitle">历史材料台账</div>

     <div class="historyType">
       <el-form :inline="true">
          <el-row type="flex">
            <el-col :span="4"></el-col>
            <el-col :span="7">
              <el-form-item label="台账类型：">
                <el-radio-group v-model="ledgerType.id">
                  <el-radio :label="1">原辅料台账</el-radio>
                  <el-radio :label="2">耗材台账</el-radio>
                </el-radio-group>
                
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="时间段：">
                <el-date-picker v-model="val" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-button type="primary" @click="queryForm">查询</el-button>
            </el-col>
          </el-row>
       </el-form>

        <div v-if="ledgerType.id ==1" class="materialType">
          <div class="typeTitle">原辅料台账</div>

          <div class="typeContent">
              <el-table :data="vocsData" style="width: 100%" :header-cell-style="{'background':'#F5F3F2'}">
                <el-table-column prop="materialName" label="含VOCs材料名称" width="200"></el-table-column>
                <el-table-column prop="purchaseQuantity" label="采购量(kg)" width="200"></el-table-column>
                <el-table-column prop="usageThisWeek" label="本周使用量(kg)" width="200"></el-table-column>
                <el-table-column prop="inventoryThisWeek" label="剩余库存量(kg)" width="200"></el-table-column>
                <el-table-column prop="vocsContent" label="VOCs含量(%)" width="200"></el-table-column>
                <el-table-column prop="recoverType" label="回收方式" width="200"></el-table-column>
                <el-table-column prop="recoverAmount" label="回收量"></el-table-column>
              </el-table>
          </div>

        </div>
        <div v-if="ledgerType.id != 1">
          <div class="typeTitle">耗材台账</div>

          <div class="typeContent">
            <el-table :data="consumablesData" style="width: 100%,margon-top:20px" :header-cell-style="{'background':'#F5F3F2'}">
              <el-table-column prop="consumablesType" label="耗材种类" width="260"></el-table-column>
              <el-table-column prop="replacementAmount" label="更换量(kg)" width="260"></el-table-column>
              <el-table-column prop="replacementTime" label="更换时间" width="260"></el-table-column>
              <el-table-column prop="handleType" label="处置情况" width="260"></el-table-column>
              <el-table-column prop="handleTime" label="处置时间"></el-table-column>
            </el-table>
          </div>
        </div>

     </div>

  </div>
</template>

<script>

import { getHistoryMaterial} from "../../assets/js/standing";


export default {
  name: "historyChart",
  data() {
    return {
      ledgerType:{
        id: 1
      },
      val:['',''],
      vocsData: [
        {
          id:1,materialName: '',purchaseQuantity: '',usageThisWeek: '',
          inventoryThisWeek:'', vocsContent:'',recoverType:'',recoverAmount:''
        }
      ],
      consumablesData:[
        {id:1,consumablesType:'',replacementAmount:'',replacementTime:'',handleType:'',handleTime:''}
      ],
      vocsInfo: {
          ledgerType: 1,
          pageNum: 1,
          ledgerStatus: 2,
          pageSize: 10,
          startDate: "",
          endDate: ""
        }
    };
  },
  created(){
    this.getMaterial();
  },
  methods: {
    //查询
    queryForm(){
      if(this.val.length == 0){
        this.vocsInfo.startDate=""
        this.vocsInfo.endDate=""
      }else{
        this.vocsInfo.startDate=this.val[0]+" 00:00:00"
        this.vocsInfo.endDate=this.val[1]+" 23:59:59"
      }
      this.getMaterial()
    },


    //获取原辅材料
    async getMaterial(){
      const res = await getHistoryMaterial(this.vocsInfo);
      if(res.code == '1'){
        let list = res.data.list
        if(list.length != 0){
          this.vocsData = list
        }
        list.forEach((el) => {
          el.ledgerDetailList.forEach((val)=>{
            this.vocsData.push(val)
          })
        });
      }
    }
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
    .typeTitle{
      text-align: center;
      font-size: 15px;
      font-weight: bold;
      letter-spacing:5px;
    }
    .el-table{
      margin-top: 20px;
      box-shadow: 0px 2px 2px 3px rgba(15, 15, 15, 0.08);
    }
  }
}
</style>
