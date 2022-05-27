<template>
  <div class="electronicFile">
    <div class="electronicTitle">电子档案</div>
    <div> 
      <el-row :gutter="80">
        <el-col :span="8" v-for="(item,i) in listData" :key="i" class="list">
          <div class="grid-content bg-purple">
            <div class="list-title">{{item.name}}</div>
            <el-row>
              <el-col :span="6" :offset="6">
                 <el-upload class="upload-up" action="https://api.elianwei.com/company/base/aly/oss/upload" :limit="1" :on-exceed="handleExceed" :on-success="handleAvatarSuccess">
                  <el-button size="small" type="primary"  @click="selectFileType(item.type)">点击上传</el-button>
                </el-upload>
              </el-col>
              <el-col :span="6">
                <el-button size="small" type="primary" class="detail-btn"  @click="viewDetail(item.type)">查看详情</el-button>
              </el-col>
            </el-row>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { addArchives,getFileDetail } from '../../assets/js/common'
import { openFile } from '../../../static/js/isType'
export default {
  name: "electronicFile",
  data() {
    return {
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
        fileType:0,
      };
    },
    methods: {
      handleAvatarSuccess(res){
        this.addElectronicFile(res.data);
      },
      selectFileType(state){
        this.fileType = state;
      },
     
      handleExceed(){
        this.$message({
          showClose: true,
          message: '只能选择一个上传文件',
          type: 'error'
        });
      },
      //添加电子档案
      async addElectronicFile(url){ 
        const res = await addArchives({electronicFileType:this.fileType,fileUrl:url});
        if(res?.code == "1"){
           this.$message({
              message: '上传成功',
              type: 'success'
            });
        }else{
           this.$message({
            showClose: true,
            message: res.msg,
            type: 'error'
          });
        }
      },
      //查看详情
      async viewDetail(state){
        const res = await getFileDetail();
        if(res?.code != "1"){
          this.$message({
            showClose: true,
            message: '请先上传文件',
            type: 'error'
          });
          return;
        }
        let fileData = [];
        res.data.forEach((el) => {
          if(el.electronicFileType == state){
            fileData.push(el.fileUrl)
          }
        });
        this.viewFile(fileData[0]);
      },
      viewFile(url){
        return openFile(url);
      },
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
    .list-title{
      padding: 20px;
      text-align: center;
      font-size: 24px;
      margin-bottom: 30px;
    }
  }
}
.el-row {
    margin-top: 20px;
    padding-bottom: 40px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple {
    background-color: #f9fafc;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 150px;
  }
  .upload-up,.detail-btn{
    margin: auto;
    text-align: center;
  }
  .detail-btn{
    display: block;
  }
</style>
