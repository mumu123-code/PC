<template>
  <div class="consumablesChart">
    <div class="consumablesTitle">耗材台账页面</div>

    <div class="consumablesContent">
      <el-button class="addBtn" type="primary" @click="addConsumables">添加</el-button>

      <div class="creatTime">创建时间：{{ time }}</div>

      <el-table :data="consumablesData" stripe style="width: 100%,margon-top:20px" :header-cell-style="{'background':'#F5F3F2'}">
          <el-table-column prop="consumablesType" label="耗材种类" width="200">
            <template slot-scope="scope">
              <el-input v-model="scope.row.consumablesType" placeholder="请输入"></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="replacementAmount" label="更换量(kg)" width="200">
            <template slot-scope="scope">
              <el-input v-model="scope.row.replacementAmount" placeholder="请输入"></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="replacementTime" label="更换时间" width="260">
            <template slot-scope="scope">
              <el-date-picker v-model="scope.row.replacementTime" type="date" placeholder="选择日期"></el-date-picker>
            </template>
          </el-table-column>
          <el-table-column prop="handleType" label="处置情况" width="200">
            <template scope="scope">
              <el-radio label="1" v-model="radio" @change.native="getCurrentRow(scope.row)">危废间暂存</el-radio>
              <el-radio label="2" v-model="radio" @change.native="getCurrentRow(scope.row)">委外处置</el-radio>
            </template>
          </el-table-column>
          <el-table-column prop="handleTime" label="处置时间">
            <template slot-scope="scope">
              <el-date-picker v-model="scope.row.handleTime" type="date" placeholder="选择日期"></el-date-picker>
            </template>
          </el-table-column>
      </el-table>
    </div>

    <div class="btn-box">
      <el-button class="stagingBtn" type="primary">暂存</el-button>
      <el-button class="submitBtn" type="success">提交</el-button>
    </div>

  </div>
</template>

<script>
export default {
  name: "consumablesChart",
  data() {
    return {
      time:'2022/4/29',
      consumablesData:[
        {key:0,ledgerType:'',consumablesType:'',replacementAmount:'',replacementTime:'',handleType:'',handleTime:''}
      ],
      radio:'0',
      value1:'',
      add:0,
    };
  },
  methods:{
    getCurrentRow(){
    },
    addConsumables(){
      if(this.consumablesData == undefined){
        this.consumablesData = new Array();
      }
        let obj = {key:0,ledgerType:1,consumablesType:'',replacementAmount:'',replacementTime:'',handleType:'',handleTime:''};
        this.consumablesData.push(obj)
    }
  }
};
</script>

<style lang="less" scoped>
.consumablesChart {
  .consumablesTitle{
    text-align: center;
    font-size: 16px;
    font-weight: bold;
    letter-spacing: 5px;
  }
  .consumablesContent{
    width: 75vw;
    margin: 0 auto;
    .addBtn{
    float: right;
    }
    .creatTime{
    line-height: 40px;
    }
    .el-table{
      margin-top: 20px;
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
