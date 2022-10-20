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
            <el-table-column prop="type" label="接收单位类型"></el-table-column>
            <el-table-column prop="name" label="委外单位名称"></el-table-column>
            <el-table-column prop="code" label="危险废物经营许可证编码"></el-table-column>
            <el-table-column prop="day" label="经营单位许可证到期时间"></el-table-column>
            <el-table-column prop="time" label="利用/处置协议到期时间"></el-table-column>
            <el-table-column prop="address" label="处置单位所在省市"></el-table-column>
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
            <el-select v-model="fromInfo.type" placeholder="请选择" size="small" style="width:100%">
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
              <el-input size="small" v-model="fromInfo.code" style="width:100%"></el-input>    
          </el-col>
        </el-row>
        <el-row class="list">
          <el-col :span="5" class="main-title">经营单位许可证到期时间：</el-col>
          <el-col :span="7">
            <el-date-picker v-model="fromInfo.day" type="date" size="small" style="width:100%" value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期"></el-date-picker>
          </el-col>
          <el-col :span="5" class="main-title">利用/处置协议到期时间：</el-col>
          <el-col :span="7">
              <!-- <el-input size="small" style="width:100%" ></el-input>     -->
              <el-date-picker v-model="fromInfo.time" type="date" size="small" style="width:100%" value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期"></el-date-picker>
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
            <el-button type="primary" style="width:100%" size="small" @click.native="addStorage">添加</el-button>
          </el-col>
        </el-row>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { provinceAndCityData, CodeToText } from 'element-china-area-data';
export default {
  name: "disposalUnit",
  data() {
    return {
      fromInfo:{
        type:"",
        time:"",
        address:"",
        name:"",
        code:"",
        day:"",
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
    }
  },
  methods: {
    showModelFunc(){
      this.showModel = true;
      this.fromInfo = {
        type:"",
        time:"",
        address:"",
        name:"",
        code:"",
        day:"",
      }
    },
    hideModel(){
      this.showModel = false;
    },
    //也可以这样写
    handleChange () {
      var loc = "";
        for (let i = 0; i < this.selectedOptions.length; i++) {
            loc += CodeToText[this.selectedOptions[i]] +",";
        }
        this.fromInfo.address = loc;
        console.log(loc);//打印区域码所对应的属性值即中文地址
    },
    addStorage(){
      this.tableList.push(this.fromInfo);
      this.showModel = false;
    },
    editInfo(val){
      this.showModelFunc();
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