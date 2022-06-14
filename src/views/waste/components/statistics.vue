<template>
  <div class="statisticsCon">
    <div class="title">仓库状态</div>
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
import { getStatistical } from '../../../assets/js/common'
export default {
  name: "statisticsCon",
  data() {
    return {
        storageNum:0,
        duringMonthNum:0,
        annualNum:0,
    }
  },
  created(){
    this.getData();
  },
  methods: {
    async getData(){
        const res = await getStatistical();
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
</style>