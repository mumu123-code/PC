<template>
  <div class="consumablesChart">
    <div class="consumablesTitle">耗材台账页面</div>

    <div class="consumablesContent">
      <el-button class="addBtn" type="primary" @click="addConsumables" size="small">添加</el-button>

      <div class="creatTime">创建时间：{{ time }}</div>

      <el-table :data="consumablesData" style="width: 100%,margon-top:20px" :header-cell-style="{'background':'#F5F3F2'}">
        <el-table-column prop="consumablesData.consumablesType" label="耗材种类" width="200">
          <template slot-scope="scope">
            <el-input v-model="scope.row.consumablesType" placeholder="请输入"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="consumablesData.replacementAmount" label="更换量(kg)" width="220">
          <template slot-scope="scope">
            <el-input v-model="scope.row.replacementAmount" placeholder="请输入"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="consumablesData.replacementTime" label="更换时间" width="260">
          <template slot-scope="scope">
            <el-date-picker v-model="scope.row.replacementTime" type="date" value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期"></el-date-picker>
          </template>
        </el-table-column>
        <el-table-column prop="consumablesData.handleType" label="处置情况" width="300">
          <template slot-scope="scope">
            <el-radio :label="1" v-model="scope.row.handleType" @change.native="getCurrentRow(scope.row)">危废间暂存</el-radio>
            <el-radio :label="2" v-model="scope.row.handleType" @change.native="getCurrentRow(scope.row)">委外处置</el-radio>
          </template>
        </el-table-column>
        <el-table-column prop="consumablesData.handleTime" label="处置时间">
          <template slot-scope="scope">
            <el-date-picker v-model="scope.row.handleTime" value-format="yyyy-MM-dd HH:mm:ss" type="date" placeholder="选择日期"></el-date-picker>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div class="btn-box">
      <el-button class="stagingBtn" type="primary" @click="stagingBtn">暂存</el-button>
      <el-button class="submitBtn" type="success" @click="submitBtn">提交</el-button>
    </div>

  </div>
</template>

<script>

import { getStaging,addParameter } from "../../assets/js/standing";


export default {
  name: "consumablesChart",
  data() {
    return {
      time:new Date(),
      consumablesData:[
        {consumablesType:'',replacementAmount:'',replacementTime:'',handleType:'',handleTime:''}
      ],
      radio:'0',
      value1:'',
      add:0,
      listInfo: {
        ledgerType: 2,
        ledgerStatus: 0,
        ledgerDetail:[]
      },
    };
  },
  created(){
    this.getStagingMaterial();
    let day = new Date();
      let month = day.getMonth() + 1;
      this.time = day.getFullYear() + "年" + month + "月" + day.getDate() + "日";
  },
  methods:{
    getCurrentRow(){
    },
    addConsumables(){
      if(this.consumablesData == undefined){
        this.consumablesData = new Array();
      }
      let obj = {consumablesType:'',replacementAmount:'',replacementTime:'',handleType:'',handleTime:''};
      this.consumablesData.push(obj)
    },
    stagingBtn(){
      this.listInfo.ledgerStatus = 1;
      this.listInfo.ledgerDetail = this.consumablesData;
      this.addFunc();
    },
    submitBtn(){
      this.listInfo.ledgerStatus = 2;
      this.listInfo.ledgerDetail = this.consumablesData;
      this.addFunc();
    },
    //添加台账
    async addFunc(){
      const res = await addParameter(this.listInfo);
      if (res?.code) {
        console.log(res)
      }
    },

    //获取暂存的耗材台账
    async getStagingMaterial(){
      const res = await getStaging({'ledgerType':2});
        console.log(res)
        if(res?.code=="1"){
          this.consumablesData = res.data.ledgerDetail;
        }
    },
  }
};
</script>

<style lang="less" scoped>
.consumablesChart {
  .consumablesTitle{
    text-align: center;
    font-size: 18px;
    font-weight: bold;
    letter-spacing: 5px;
  }
  .consumablesContent{
    margin: 0 auto;
    .addBtn{
    float: right;
    }
    .creatTime{
    line-height: 32px;
    }
    .el-table{
      margin-top: 20px;
      box-shadow: 0px 2px 2px 3px rgba(15, 15, 15, 0.08);
    }
  }
  .btn-box{
    margin-top: 20px;
    display: flex;
    justify-content: center;
    .stagingBtn,
    .submitBtn{
    width: 120px;
    letter-spacing:5px;
    }
  }
  
}
</style>
