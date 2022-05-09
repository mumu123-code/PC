<template>
  <div class="electronicFile">
    <div class="electronicTitle">电子档案</div>
    <div>
      <!-- <el-row :gutter="20" class="list">
        <el-col :span="6" class="chunk">
          <div>内容1</div>
        </el-col>
        <el-col :span="6" class="chunk">
          <div>内容2</div>
        </el-col>
        <el-col :span="6" class="chunk">
            <div>内容2</div>
        </el-col>
        <el-col :span="6" class="chunk">
            <div>内容2</div>
        </el-col>
      </el-row>
      <el-row :gutter="20" class="list">
        <el-col :span="6" class="chunk">
        <div>内容2</div>
        </el-col>
        <el-col :span="6" class="chunk">
          <div>内容2</div>
        </el-col>
        <el-col :span="6" class="chunk">
            <div>内容2</div>
        </el-col>
        <el-col :span="6" class="chunk">
            <div>内容2</div>
        </el-col>
      </el-row> -->
      <el-row :gutter="20">
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <div class="list-title">环评报告</div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <div class="list-title"></div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
               <div class="list-title"></div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
               <div class="list-title"></div>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="6">
          <div class="grid-content bg-purple">
             <div class="list-title"></div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
             <div class="list-title"></div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
             <div class="list-title"></div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
             <div class="list-title"></div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  name: "electronicFile",
  data() {
    return {
      };
    },
    methods: {
      listData:[{
						name: '环评报告',
						type: 1,
					},
					{
						name: '环评批复',
						type: 2,
					},
					{
						name: '环评验收材料',
						type: 3,
					},
					{
						name: '应急预案及备案意见',
						type: 4,
					},
					{
						name: '排污许可证',
						type: 5,
					},
					{
						name: '日常检测报告',
						type: 6,
					},
					{
						name: '排污许可执行报告',
						type: 7,
					},
					{
						name: '整治提升材料',
						type: 8,
					},
					{
						name: '污染治理设施设计方案',
						type: 9,
					},
				],
    }
  }
</script>

<style lang="less" scoped>
.electronicFile {
  .electronicTitle{
    text-align: center;
    font-size: 18px;
    font-weight: bold;
    letter-spacing:5px;
  }
  .list{
    margin-top: 20px;
    margin-bottom: 40px;
      .chunk{
          height: 80px;
          border: 1px solid #eee;
          border-radius: 4px;
        }
  }
 
}
.el-row {
    margin-top: 20px;
    margin-bottom: 40px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple {
    border:1px solid #d3dce6;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 136px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>
