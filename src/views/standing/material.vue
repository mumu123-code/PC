<template>
  <div class="material">
    <div class="materialTitle">原辅材料填报</div>

    <el-button class="addSubmit" @click="addVocs" type="primary" size="small">添加</el-button>

    <div class="creationTime">创建时间：{{ time }}</div>

    <div class="materialContent">
      <el-table :data="vocsData" style="width: 100%" :header-cell-style="{'background':'#F5F3F2'}">
        <el-table-column prop="materialName" label="含VOCs材料名称" width="200">
            <template slot-scope="scope">
              <el-select
              v-model="scope.row.materialName"
              filterable
              allow-create
              default-first-option
              placeholder="请选择文章标签">
              <el-option
                v-for="item in materialNameArr"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column prop="purchaseQuantity" label="采购量(kg)" width="200">
          <template slot-scope="scope">
            <el-input v-model="scope.row.purchaseQuantity" placeholder="请输入"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="usageThisWeek" label="本周使用量(kg)" width="200">
          <template slot-scope="scope">
            <el-input v-model="scope.row.usageThisWeek" placeholder="请输入"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="inventoryThisWeek" label="剩余库存量(kg)" width="200">
          <template slot-scope="scope">
            <el-input v-model="scope.row.inventoryThisWeek" placeholder="请输入"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="vocsContent" label="VOCs含量(%)" width="200">
          <template slot-scope="scope">
            <el-input v-model="scope.row.vocsContent" placeholder="请输入"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="recoverType" label="回收方式" width="200">
          <template slot-scope="scope">
            <el-input v-model="scope.row.recoverType" placeholder="请输入"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="recoverAmount" label="回收量">
          <template slot-scope="scope">
            <el-input v-model="scope.row.recoverAmount" placeholder="请输入"></el-input>
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
// import导入日期格式化
import moment from "moment";
import { getStaging,addParameter,getLedgerName } from "../../assets/js/standing";

export default {
  name: "materialChart",
  data() {
    return {
      time:'',
      vocsData: [{
        ledgerType:1,materialName: '',purchaseQuantity: '',usageThisWeek: '',
        inventoryThisWeek:'', vocsContent:'',recoverType:'',recoverAmount:''}],
      add:0,
      listInfo: {
        ledgerType: 1,
        ledgerStatus: 0,
        ledgerDetail:[],
        createTime: moment().format("YYYY-MM-DD"),
      },
      materialNameArr: [],
    };
  },
  created(){
    this.getStagingMaterial();
    let day = new Date();
    let month = day.getMonth() + 1;
    this.time = day.getFullYear() + "年" + month + "月" + day.getDate() + "日";
    // 获取台账名称列表
    this.getLedgerName();
  },
  methods:{
    addVocs(){
      if(this.vocsData == undefined){
        this.vocsData = new Array();
      }
        let obj = { key:0,ledgerType:1,materialName: '',purchaseQuantity: '',usageThisWeek: '',
        inventoryThisWeek:'', vocsContent:'',recoverType:'',recoverAmount:''};
        this.vocsData.push(obj);
    },
    stagingBtn(){
      this.listInfo.ledgerStatus = 1;
      this.listInfo.ledgerDetail = this.vocsData;
      this.addFunc();
    },
    submitBtn(){
      this.listInfo.ledgerStatus = 2;
      this.listInfo.ledgerDetail = this.vocsData;
      this.addFunc();
    },
    // 获取台账名称列表
    async getLedgerName() {
      // 清空数据
      this.materialNameArr = [];
      const res = await getLedgerName();
      if(res?.code == "1") {
        res.data.map(val => {
          this.materialNameArr.push({
            value: val,
            label: val
          })
        });
      }
    },
    // 添加台账
    async addFunc(){
      const res = await addParameter(this.listInfo);
      if (res?.code == "1") {
        this.$message.success(res.msg);
      }
    },

    // 获取暂存的原辅料台账
    async getStagingMaterial(){
      const res = await getStaging({'ledgerType':1});
      if(res?.code=="1"){
        this.vocsData = res.data.ledgerDetail;
      }
    }
  }
};
</script>

<style lang="less" scoped>
.material {
  .materialTitle{
    text-align: center;
    font-size: 18px;
    font-weight: bold;
    letter-spacing:5px;

  }
  .materialContent{
    margin-top: 30px;
    box-shadow: 0px 2px 2px 3px rgba(15, 15, 15, 0.08);
  }
  .addSubmit{
    float: right;
  }
  .creationTime{
    // margin-top: 40px;
    line-height: 32px;
  }
  .btn-box{
    margin-top: 20px;
    display: flex;
    justify-content: center;
  }
  .stagingBtn,
  .submitBtn{
    width: 120px;
    letter-spacing:5px;
  }
}
</style>
