<template>
  <div class="electronicFile">
    <div class="electronicTitle">电子档案</div>
    <div v-for="(item,i) in listData" :key="i" class="electronicFile-item">
      <div class="list-title">{{item.name}}</div>
      <el-upload class="upload-up" action="https://api.elianwei.com/company/base/aly/oss/upload" multiple :limit="5" 
        :on-exceed="handleExceed" :on-success="handleAvatarSuccess" :before-upload="()=>{beforeUpload(item.type)}" :show-file-list="false">
        <el-button size="small" type="primary" :loading="loading == item.type" @click="selectFileType(item.type)">点击上传</el-button>
      </el-upload>
      <div class="fileList" v-for="val in item.fileUrlList" :key="val.fileUrl" @click="viewFile(val.fileUrl)">{{val.fileName}}</div>
    </div>
  </div>
</template>

<script>
import { addArchives,getFile } from '../../assets/js/common';
import { openFile } from '../../../static/js/isType';
export default {
  name: "electronicFile",
  data() {
    return {
      listData:[
        {
          name: '环评报告',
          type: 1,
          fileUrlList: []
        },
        {
          name: '环评批复',
          type: 2,
          fileUrlList: []
        },
        {
          name: '环评验收材料',
          type: 3,
          fileUrlList: []
        },
        {
          name: '应急预案及备案意见',
          type: 4,
          fileUrlList: []
        },
        {
          name: '排污许可证',
          type: 5,
          fileUrlList: []
        },
        {
          name: '日常检测报告',
          type: 6,
          fileUrlList: []
        },
        {
          name: '排污许可执行报告',
          type: 7,
          fileUrlList: []
        },
        {
          name: '整治提升材料',
          type: 8,
          fileUrlList: []
        },
        {
          name: '污染治理设施设计方案',
          type: 9,
          fileUrlList: []
        },
      ],
      fileType:0,
      loading: 0,
    };
  },
  created() {
    this.viewDetail();
  },
  methods: {
    beforeUpload(type) {
      this.loading = type;
    },
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
          // this.$message({
          //   message: '上传成功',
          //   type: 'success'
          // });
          this.loading = 0;
          this.viewDetail();
      }else{
          this.$message({
          showClose: true,
          message: res.msg,
          type: 'error'
        });
      }
    },
    //查看文件列表
    async viewDetail(electronicFileType){
      const res = await getFile({electronicFileType});
      if(res?.code == '1') {
        res.data.forEach(item => {
          const { electronicFileType, fileUrlList } = item;
          if(fileUrlList) {
            this.$set(this.listData[electronicFileType-1], 'fileUrlList', fileUrlList);
          }
        });
      }
    },
    viewFile(url){
      return openFile(url);
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
    .list-title {
      font-size: 24px;
      font-weight: 600;
    }
    .fileList {
      margin: 0 auto;
      width: 90%;
      padding: 14px;
      line-height: 0;
      cursor: pointer;
    }
    .fileList::after {
      content: '√';
      margin-left: 28px;
      font-size: 24px;
      font-weight: 600;
      color: rgb(0, 255, 64);
    }
  }
}
</style>
