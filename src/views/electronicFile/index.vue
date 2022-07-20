<template>
  <div class="electronicFile">
    <div class="electronicTitle">电子档案</div>
    <div v-for="(item,i) in listData" :key="i" class="electronicFile-item">
      <div class="list-title">{{item.name}}</div>
      <el-upload class="upload-up" action="https://api.elianwei.com/company/base/aly/oss/upload" multiple :limit="9" 
        :on-exceed="handleExceed" :on-success="handleAvatarSuccess" :on-preview="onPreview">
        <el-button size="small" type="primary"  @click="selectFileType(item.type)">点击上传</el-button>
      </el-upload>
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
      listData:[
        {
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
    handleAvatarSuccess(response, file, fileList){
      let fileUrlList = [];
      fileList.forEach(el => {
        if(el.response) {
          fileUrlList.push({
            fileName: el.name,
            fileUrl: el.response.data
          })
        }
      });
      this.addElectronicFile(fileUrlList);
    },
    selectFileType(state){
      this.fileType = state;
    },
    handleExceed(){
      this.$message({
        showClose: true,
        message: '上传超过了限制!',
        type: 'error'
      });
    },
    //添加电子档案
    async addElectronicFile(fileUrlList){ 
      const res = await addArchives({electronicFileType:this.fileType,fileUrlList});
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
    async viewDetail(electronicFileType){
      const res = await getFileDetail({electronicFileType});
      if(res?.code != "1"){
        this.$message({
          showClose: true,
          message: '请先上传文件',
          type: 'error'
        });
        return;
      }

      // this.viewFile(fileData[0]);
    },
    viewFile(url){
      return openFile(url);
    },
    onPreview(file) {
      console.log(file, 'file');
    }
  }
  }
</script>

<style lang="less" scoped>
.electronicFile {
  width: 100%;
  .electronicTitle{
    text-align: center;
    font-size: 18px;
    font-weight: bold;
    letter-spacing:5px;
  }
  .electronicFile-item {
    float: left;
    margin: 20px;
    width: 30%;
    height: 26vh;
    line-height: 5vh;
    text-align: center;
    min-height: 150px;
    box-shadow: 0px 1px 4px rgba(0,0,0,0.3),
                  0px 0px 20px rgba(0,0,0,0.1) inset;
    .upload-up {
      margin: 0 auto;
      width: 60%;
    }
    .list-title {
      font-size: 24px;
      font-weight: 600;
    }
  }
}
</style>
