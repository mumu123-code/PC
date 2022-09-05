<template>
  <div class="statisticsCon">
    <div class="title">仓库状态</div>
    <el-row class="info-detail">
        <el-col :span="2" class="info-title">选择仓库：</el-col>
        <el-col :span="5">
            <el-select v-model="warehouseId" placeholder="请选择" size="small" style="width:100%" @change="selectStorage">
                <el-option v-for="item in storageList" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
        </el-col>
    </el-row>
    <el-row :gutter="20">
        <el-col :span="8">
            <div class="list">仓库贮存量：<span class="count">{{storageNum}}</span>&nbsp;kg</div>
        </el-col>
        <el-col :span="8">
            <div class="list">当月产生量：<span class="count">{{duringMonthNum}}</span>&nbsp;kg</div>
        </el-col>
        <el-col :span="8">
            <div class="list">年度产生量：<span class="count">{{annualNum}}</span>&nbsp;kg</div>
        </el-col>
    </el-row>
  </div>
</template>

<script>
import { getStatistical,getStorageList } from '../../../assets/js/common'
export default {
  name: "statisticsCon",
  data() {
    return {
        warehouseId:"",
        storageNum:0,
        duringMonthNum:0,
        annualNum:0,
        storageList:[],
    }
  },
  created(){
    this.getData();
    this.getList();
  },
  methods: {
    //选择仓库
    selectStorage(e){
      this.warehouseId = e;
      this.getData();
    },
    //获取仓库列表
    async getList(){
      const res = await getStorageList();
      if(res?.code == "1"){
          this.storageList = res.data;
          this.storageList.unshift({id:"",name:"请选择"})
      }
    },

    //获取仓库中数据
    async getData(){
        const res = await getStatistical({warehouseId:this.warehouseId});
        if(res?.code == "1"){
            this.storageNum = res.data.storage;
            this.duringMonthNum = res.data.monthProduction;
            this.annualNum = res.data.yearProduction;
        }
    }
  }
}
</script>

<style lang="less" scoped>
.title{
    height: 30px;
    line-height: 30px;
    font-size: 14px;
    // font-weight: bold;
    letter-spacing: 1px;
    padding-left: 10px;
    background-color: #eee;
    margin-bottom: 20px;
}
.list{
    margin-top: 20px;
    height: 90px;
    background-color: #eeeeee6e;
    line-height: 90px;
    color: 313131;
    font-size: 26px;
    padding-left: 30px;
    .count{
        color: #409eff;
        font-size: 30px;
        font-weight: bold;
    }
}
.info-detail{
    margin-top: 20px;
    .info-title{
        line-height: 30px;
        text-align: right;
        font-size: 14px;
    }
    .con{
        position: relative;
        .select-list{
            position: absolute;
            top: 30px;
            width: 100%;
            border: 1px solid #eee;
            z-index: 100;
            background: #fff;
            max-height: 200px;
            overflow: hidden;
            overflow-y: auto;
            .lists{
                line-height: 28px;
                padding: 3px 15px;
                font-size: 14px;
            }
            .lists:nth-child(even){
                background-color: #eee;
            }
        }
    }
}
</style>