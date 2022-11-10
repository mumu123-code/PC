<template>
  <div class="disposalUnit">
    <div class="title">处置单位信息</div>
    <el-card>
      <div class="card-title">处置单位信息列表</div>
      <div class="btn">
        <el-button type="primary" size="mini" @click.native="showModelFunc">添加</el-button>
      </div>
        <div class="table">
          <el-table :data="tableList" style="width: 100%" :header-cell-style="{ background: '#F5F3F2' }">
            <el-table-column prop="receivingUnitType" label="接收单位类型"></el-table-column>
            <el-table-column prop="name" label="委外单位名称"></el-table-column>
            <el-table-column prop="licenseCode" label="危险废物经营许可证编码"></el-table-column>
            <el-table-column prop="licenseExpirationTime" label="经营单位许可证到期时间"></el-table-column>
            <el-table-column prop="agreementExpirationTime" label="利用/处置协议到期时间"></el-table-column>
            <el-table-column prop="receivingUnitProvince" label="处置单位所在省市">
              <template slot-scope="scope">
                <div>
                  {{ scope.row.receivingUnitProvince }}{{ scope.row.receivingUnitCity }}
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="recoverAmount" label="操作" width="80">
                <template slot-scope="scope">
                    <el-button type="primary" size="mini" @click.native="editInfo(scope.row)">修改</el-button>
                </template>
            </el-table-column>
          </el-table>
        </div>
    </el-card>
    <el-dialog title="处置单位信息" :visible.sync="showModel" width="1000px" :before-close="hideModel">
      <div class="main">
        <el-row class="list">
          <el-col :span="5" class="main-title">接收单位类型：</el-col>
          <el-col :span="7">
            <el-select v-model="fromInfo.receivingUnitType" placeholder="请选择" size="small" style="width:100%">
              <el-option v-for="item in typeData" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select> 
          </el-col>
          <el-col :span="5" class="main-title">委外单位名称：</el-col>
          <el-col :span="7">
              <el-input size="small" v-model="fromInfo.name" style="width:100%" ></el-input>    
          </el-col>
        </el-row>
        <el-row class="list">
          <el-col :span="5" class="main-title">危险废物经营许可证编码：</el-col>
          <el-col :span="19">
              <el-input size="small" v-model="fromInfo.licenseCode" style="width:100%"></el-input>    
          </el-col>
        </el-row>
        <el-row class="list">
          <el-col :span="5" class="main-title">经营单位许可证到期时间：</el-col>
          <el-col :span="7">
            <el-date-picker v-model="fromInfo.licenseExpirationTime" type="date" size="small" style="width:100%" value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期"></el-date-picker>
          </el-col>
          <el-col :span="5" class="main-title">利用/处置协议到期时间：</el-col>
          <el-col :span="7">
              <!-- <el-input size="small" style="width:100%" ></el-input>     -->
              <el-date-picker v-model="fromInfo.agreementExpirationTime" type="date" size="small" style="width:100%" value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期"></el-date-picker>
          </el-col>
        </el-row>
        <el-row class="list">
          <el-col :span="5" class="main-title">处置单位所在省市：</el-col>
          <el-col :span="19">
              <!-- <el-input size="small" style="width:100%"></el-input>     -->
              <el-cascader size="small" :options="options" style="width:100%"  v-model="selectedOptions"  @change="handleChange"></el-cascader>
          </el-col>
        </el-row>
        <el-row class="m-top">
          <el-col :span="2" :offset="11">
            <el-button type="primary" style="width:100%" size="small" @click.native="addStorage">保存</el-button>
          </el-col>
        </el-row>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { provinceAndCityData,CodeToText,TextToCode } from 'element-china-area-data';
import { getDisposalUnit,addDisposalUnit,editDisposalUnit } from '../../../assets/js/common'
export default {
  name: "disposalUnit",
  data() {
    return {
      fromInfo:{
        receivingUnitType:"",
        agreementExpirationTime:"",
        // address:"",
        name:"",
        licenseCode:"",
        licenseExpirationTime:"",
        receivingUnitProvince:"",
        receivingUnitCity:"",
      },
      typeData:[
        {value:"危险废物经营许可证持有单位",label:"危险废物经营许可证持有单位"},
        {value:"危险废物利用处置环节豁免管理单位",label:"危险废物利用处置环节豁免管理单位"},
        {value:"中华人民共和国境外的危险废物利用处置单位",label:"中华人民共和国境外的危险废物利用处置单位"},
      ],
      showModel:false,
      selectedOptions:[],
      options: provinceAndCityData,
      tableList:[],
      isAdd:true,
    }
  },
  mounted(){
    this.getList();
  },
  methods: {
    showModelFunc(){
      this.isAdd = true;
      this.showModel = true;
      this.fromInfo = {
        receivingUnitType:"",
        agreementExpirationTime:"",
        // address:"",
        name:"",
        licenseCode:"",
        licenseExpirationTime:"",
        receivingUnitProvince:"",
        receivingUnitCity:"",
      };
      this.selectedOptions = [];
    },
    hideModel(){
      this.showModel = false;
    },
    //也可以这样写
    handleChange () {
      var loc = [];
        for (let i = 0; i < this.selectedOptions.length; i++) {
            loc.push(CodeToText[this.selectedOptions[i]]);
        }
        // this.fromInfo.address = loc;
        // console.log(loc);//打印区域码所对应的属性值即中文地址
        this.fromInfo.receivingUnitProvince = loc[0];
        this.fromInfo.receivingUnitCity = loc[1];
    },
    async addStorage(){
      // this.tableList.push(this.fromInfo);
      // this.showModel = false;
      let res = "";
      console.log(this.isAdd)
      this.isAdd == true ? res = await addDisposalUnit(this.fromInfo) : res = await editDisposalUnit(this.fromInfo);
      if(res?.code == "1"){
        this.showModel = false;
        this.getList();
      }else{
        this.$message.error(res.msg);
      }
    },
    async getList(){
      const res = await getDisposalUnit();
      if(res?.code == "1"){
        this.tableList = res.data;
      }
    },
    editInfo(val){
      this.showModelFunc();
      let province = TextToCode[val.receivingUnitProvince].code;
      let city = TextToCode[val.receivingUnitProvince][val.receivingUnitCity].code;
      this.selectedOptions = [province,city];
      this.isAdd = false;
      this.fromInfo = val;
    },
  }
}
</script>

<style lang="less" scoped>
.title{
  text-align: center;
  font-size: 16px;
  font-weight: bold;
  letter-spacing: 5px;
  margin-bottom: 30px;
}
.el-card {
    margin-top: 30px;
    .card-title {
        color: rgb(131, 130, 130);
        border-bottom: 2px solid #eee;
    }
    
    .table-info{
        margin-top: 10px;
    }
    .main{
        margin-top: 20px;
        .main-title{
            text-align: right;
            color: #313131;
            font-size: 15px;
            line-height: 34px;
        }
        .m-top{
            margin-top: 15px;
        }
    }
    .table{
        margin-top: 15px;
    }
}
.info-title{
    line-height: 30px;
    text-align: right;
    font-size: 14px;
}
.model-list{
    margin-bottom: 20px;
}
.list{
    margin-top: 10px;
}
.dialog-footer{
    display: block;
    text-align: center !important;
}
.btn{
  text-align: right;
}
.main-title{
  text-align: right;
  color: #313131;
  font-size: 15px;
  line-height: 34px;
}
</style>