<template>
  <div class="addInfoCon">
    <div class="title">
        配置信息
    </div>
    <el-card>
        <div class="card-title">
            配置信息填写
        </div>
    </el-card>
     <el-card>
        <div class="card-title">
            配置信息列表
        </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "addInfoCon",
  data() {
    return {}
  },
  methods: {}
}
</script>

<style lang="less" scoped>
.addInfoCon{
    .title{
        text-align: center;
        font-size: 16px;
        font-weight: bold;
        letter-spacing:5px;
        margin-bottom: 30px;
    }
    .card-title{
        color: rgb(131, 130, 130);
        border-bottom: 2px solid #eee;
    }
}
</style>