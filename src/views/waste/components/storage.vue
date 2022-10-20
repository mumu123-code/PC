<template>
  <div class="storageContainer">
    <div class="title">仓库信息</div>
    <el-card>
        <div class="card-title">仓库信息填写</div>
        <div class="main">
            <el-row class="list">
                <el-col :span="2" class="main-title">仓库名称：</el-col>
                <el-col :span="10">
                    <el-input size="small" style="width:100%" v-model="fromInfo.name"></el-input>    
                </el-col>
                <el-col :span="2" class="main-title">仓库面积：</el-col>
                <el-col :span="10">
                    <el-input size="small" style="width:100%" v-model="fromInfo.area"  @keyup.native="oninput()"></el-input>    
                </el-col>
            </el-row>
            <el-row class="list">
                <el-col :span="2" class="main-title">仓库地址：</el-col>
                <el-col :span="22">
                    <el-input size="small" type="textarea" style="width:100%" v-model="fromInfo.address"></el-input>    
                </el-col>
            </el-row>
            <el-row class="list">
                <el-col :span="2" class="main-title">贮存设施序号：</el-col>
                <el-col :span="10">
                    <el-select v-model="fromInfo.num" placeholder="请选择" size="small" style="width:100%">
                        <el-option v-for="item in facilitiesData" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select> 
                </el-col>
                <el-col :span="2" class="main-title">贮存设施名称：</el-col>
                <el-col :span="10">
                    <el-input size="small" style="width:100%" v-model="fromInfo.name"></el-input>    
                </el-col>
            </el-row>
            <el-row class="list">
                <el-col :span="2" class="info-title">贮存设施类型：</el-col>
                <el-col :span="10">
                    <el-select v-model="fromInfo.type" placeholder="请选择" size="small" style="width:100%">
                        <el-option v-for="item in facilitiesType" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select> 
                </el-col>
            </el-row>
            <el-row class="m-top">
                <el-col :span="2" :offset="11">
                    <el-button type="primary" style="width:100%" size="small" @click.native="addStorage">添加</el-button>
                </el-col>
            </el-row>
        </div>
        
    </el-card>
    <el-card>
        <div class="card-title">仓库信息列表</div>
        <div class="table">
            <el-table :data="list" style="width: 100%" :header-cell-style="{ background: '#F5F3F2' }">
                <el-table-column prop="name" label="仓库名称"></el-table-column>
                <el-table-column prop="name" label="仓库面积"></el-table-column>
                <el-table-column prop="name" label="贮存设施序号"></el-table-column>
                <el-table-column prop="name" label="贮存设施名称"></el-table-column>
                <el-table-column prop="name" label="仓库地址"></el-table-column>
                <el-table-column prop="recoverAmount" label="修改" width="80">
                    <template slot-scope="scope">
                        <el-button type="primary" size="small" @click.native="editInfo(scope.row)">修改</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </el-card>

    <!-- 修改仓库信息 -->
    <el-dialog title="修改仓库信息" :visible.sync="showModel" width="50%" :before-close="hideModel">
        <div class="model-con">
            <el-row class="model-list">
                <el-col :span="4" class="info-title">仓库名称：</el-col>
                <el-col :span="8">
                   <el-input size="small" style="width:100%" v-model="editForm.name"></el-input>    
                </el-col>
                <el-col :span="4" class="info-title">仓库面积：</el-col>
                <el-col :span="8">
                    <el-input size="small" style="width:100%" v-model="fromInfo.area"></el-input>    
                </el-col>
            </el-row>
            <el-row class="list">
                <el-col :span="4" class="info-title">仓库地址：</el-col>
                <el-col :span="20">
                    <el-input size="small" style="width:100%" v-model="fromInfo.address"></el-input>    
                </el-col>
            </el-row>
            <el-row class="list">
                <el-col :span="4" class="info-title">贮存设施序号：</el-col>
                <el-col :span="8">
                    <el-select v-model="fromInfo.num" placeholder="请选择" size="small" style="width:100%">
                        <el-option v-for="item in facilitiesData" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select> 
                </el-col>
                <el-col :span="4" class="info-title">贮存设施名称：</el-col>
                <el-col :span="8">
                    <el-input size="small" style="width:100%" v-model="fromInfo.name"></el-input>    
                </el-col>
            </el-row>
            <el-row class="list">
                <el-col :span="4" class="info-title">贮存设施类型：</el-col>
                <el-col :span="8">
                    <el-select v-model="fromInfo.type" placeholder="请选择" size="small" style="width:100%">
                        <el-option v-for="item in facilitiesType" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select> 
                </el-col>
            </el-row>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button type="info" @click="hideModel" size="small">取 消</el-button>
            <el-button type="primary" @click="setEditInfo" size="small">确 定</el-button>
        </span>
    </el-dialog>
  </div>
</template>

<script>
import { addStorageInfo,getStorageList,editStorageInfo } from "../../../assets/js/common"
export default {
  name: "storageContainer",
  data() {
    return {
        fromInfo:{
            name:"",
            area:'',
            num:'',
            address:"",
            type:"",
        },
        list:[],
        editForm:{},
        showModel:false,
        facilitiesData:[],
        facilitiesType:[
            {value:"贮存库",label:"贮存库"},
            {value:"贮存场",label:"贮存场"},
            {value:"贮存池",label:"贮存池"},
            {value:"贮存罐区",label:"贮存罐区"},
        ],
    }
  },
  created(){
    this.getList();
    for(let i = 1;i <= 20; i++){
        this.facilitiesData.push({value:i,label:i});
    }
  },
  methods: {
    //添加仓库
    async addStorage(){
        const res = await addStorageInfo(this.fromInfo);
        if(res?.code == "1"){
            this.$message.success("添加成功")
            this.fromInfo.name = "";
            this.getList();
        }else{
            this.$message.error("添加失败")
        }
    },
    
    //获取仓库列表
    async getList(){
        const res = await getStorageList();
        if(res?.code == "1"){
            this.list = res.data;
        }
    },

    //修改仓库信息
    editInfo(row){
        this.editForm = row;
        this.showModel = true;
    },

    async setEditInfo(){
        const res = await editStorageInfo(this.editForm);
        if(res?.code == "1"){
            this.showModel = false;
            this.$message.success("修改成功");
        }
    },
    //小数点校验
    oninput() {
       let v =  this.fromInfo.area;
       let o = v.split(".");
       if(o.length == 2){
        let p = o[1].slice(0,4);
        this.fromInfo.area = o[0]+"."+p;
       }
    },
    //隐藏模态框
    hideModel(){
        this.showModel = false;
    }
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
</style>        