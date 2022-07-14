<template>
    <div class="storageTankCon">
        <div class="title">储罐配置信息</div>  
        <el-card>
            <div class="card-title">储罐信息填写</div>
            <div class="card-info">
                <el-row class="info-detail">
                    <el-col :md="4" :lg="3" :xl="2" class="info-title">设备：</el-col>
                    <el-col :span="8">
                        <el-select v-model="fromInfo.deviceId" placeholder="请选择" class="w-100" size="small">
                            <el-option v-for="(item,i) in deviceData" :key="i" :label="item.id" :value="item.id"></el-option>
                        </el-select>
                    </el-col>
                </el-row>
                <el-row class="info-detail">
                    <el-col :md="4" :lg="3" :xl="2" class="info-title">储罐号：</el-col>
                    <el-col :span="8">
                        <el-input size="small" v-model="fromInfo.storageTankNumber"></el-input>
                    </el-col>
                </el-row>
                <el-row class="info-detail">
                    <el-col :md="4" :lg="3" :xl="2" class="info-title">危废代码和名称：</el-col>
                    <el-col :span="8">
                        <el-input size="small" v-model="fromInfo.wasteCode"></el-input>
                    </el-col>
                </el-row>
                <el-row class="info-detail">
                    <el-col :md="4" :lg="3" :xl="2" class="info-title">密度：</el-col>
                    <el-col :span="8">
                        <el-input size="small" v-model="fromInfo.density">
                            <template slot="append">kg/m³</template>
                        </el-input>
                    </el-col>
                </el-row>
            </div>
            <div class="btn">
                <el-button type="primary" class="submit-btn" size="small" @click="submitFunc">保存</el-button>
            </div>
        </el-card>
        <el-card>
            <div class="card-title">储罐信息列表</div>
            <div class="table-info">
                <!-- <div class="search-info">
                    设备：
                    <el-select v-model="tableFromInfo.deviceId" placeholder="请选择" size="small">
                        <el-option v-for="(item,i) in deviceData" :key="i" :label="item.id" :value="item.id"></el-option>
                    </el-select>
                    <el-button size="small" type="primary" class="search-btn" v-if="emptySearchBtn == false" @click.native="searchBtn">查询</el-button>
                    <el-button size="small" type="info" class="search-btn" v-if="emptySearchBtn == true" @click.native="searchBtn">清空</el-button>
                </div> -->
                <el-table :data="tableData" style="width: 100%" :header-cell-style="{ background: '#F5F3F2' }" maxHeight="400">
                    <el-table-column prop="deviceId" label="设备"></el-table-column>
                    <el-table-column prop="storageTankNumber" label="储罐号"></el-table-column>
                    <el-table-column prop="wasteCode" label="废物代码和废物名称"></el-table-column>
                    <el-table-column prop="density" label="密度(kg/m³)"></el-table-column>
                    <el-table-column prop="recoverAmount" label="修改" align="center" width="80">
                        <template slot-scope="scope">
                            <el-button type="success" size="small" @click.native="editInfo(scope.row)">修改</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </el-card>
        <!-- 修改信息模态框 -->
         <el-dialog title="修改储罐信息" :visible.sync="showModel" width="50%" :before-close="hideModel">
            <div class="model-con">
                <el-row class="model-list">
                    <el-col :md="11" :lg="10" :xl="8" class="info-title">设备：</el-col>
                    <el-col :span="8">
                        <el-select v-model="editFromInfo.deviceId" placeholder="请选择" class="w-100" size="small">
                            <el-option v-for="(item,i) in deviceData" :key="i" :label="item.id" :value="item.id"></el-option>
                        </el-select>
                    </el-col>
                </el-row>
                <el-row class="model-list">
                    <el-col :md="11" :lg="10" :xl="8" class="info-title">储罐号：</el-col>
                    <el-col :span="8">
                        <el-input size="small" v-model="editFromInfo.storageTankNumber"></el-input>
                    </el-col>
                </el-row>
                <el-row class="model-list">
                    <el-col :md="11" :lg="10" :xl="8" class="info-title">危废代码和名称：</el-col>
                    <el-col :span="8">
                        <el-input size="small" v-model="editFromInfo.wasteCode"></el-input>
                    </el-col>
                </el-row>
                <el-row class="model-list">
                    <el-col :md="11" :lg="10" :xl="8" class="info-title">密度：</el-col>
                    <el-col :span="8">
                        <el-input size="small" v-model="editFromInfo.density">
                            <template slot="append">kg/m³</template>
                        </el-input>
                    </el-col>
                </el-row>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="info" @click="hideModel" size="small">取 消</el-button>
                <el-button type="primary" @click="addEditInfo" size="small">确 定</el-button>
            </span>
         </el-dialog>
    </div>
</template>

<script>
import { getStorageDeviceList,addAndEditStorageInfo,getStorageInfoList } from '../../../assets/js/common'
export default {
  name: "storageTankCon",
  data() {
    return {
        fromInfo:{
            deviceId:"",
            storageTankNumber:"",
            wasteCode:"",
            density:""
        },
        tableData:[],
        showModel:false,
        total:0,
        tableFromInfo:{
            deviceId:"",
        },
        emptySearchBtn:false,
        deviceData:[],
        editFromInfo:{}
    }
  },
  mounted(){
    this.getDeviceList();
    this.getList();
  },
  methods: {
    //添加储罐信息
    async submitFunc(){
        const res = await addAndEditStorageInfo(this.fromInfo);
        if(res?.code == "1"){
            this.$message.success("添加成功");
            this.fromInfo.deviceId = "";
            this.fromInfo.storageTankNumber = "";
            this.fromInfo.wasteCode = "";
            this.fromInfo.density = ""; 
            this.getList();
        }else{
            this.$message.error("添加失败");
        }
    },

    //搜索条件
    searchBtn(){
        if(this.emptySearchBtn){
            this.tableFromInfo.deviceId = "";
            this.getList();
            this.emptySearchBtn = false;
            return;
        }
        this.getList();
        this.emptySearchBtn = true;
    },

    //获取储罐列表
    async getList(){
        const res = await getStorageInfoList(this.tableFromInfo);
        if(res?.code == "1"){
            this.tableData = res.data;
        }
    },

    //修改信息
    async addEditInfo(){
        const res = await addAndEditStorageInfo(this.editFromInfo);
        if(res?.code == "1"){
            this.$message.success("修改成功");
            this.showModel = false;
        }else{
            this.$message.error("修改失败")
        }
    },

    //修改储罐信息
    editInfo(val){
        this.editFromInfo = val;
        this.showModel = true;
    },

    //关闭模态框
    hideModel(){
        this.showModel = false;
    },

    //获取设备列表
    async getDeviceList(){
        const res = await getStorageDeviceList();
        if(res?.code == "1"){
            this.deviceData = res.data;
        }
    },
  }
}
</script>

<style lang="less" scoped>
.title {
    text-align: center;
    font-size: 16px;
    font-weight: bold;
    letter-spacing: 5px;
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
}
.info-detail{
    margin-top: 20px;
}
.info-title{
    line-height: 30px;
    text-align: right;
    font-size: 14px;
}
.search-info{
    padding: 10px;
    font-size: 14px;
}
.m-top{
    margin-top: 20px;
    text-align: center;
    .el-button{
        width: 100px;
        font-size: 14px;
    }
}
.model-list{
    margin-bottom: 20px;
}
.btn{
    margin-top:20px;
    padding-left: 20%;
    .submit-btn{
        width: 150px;
    }
}
.search-btn{
    margin-left: 20px;
}
.w-100{
    width: 100%;
}
/deep/ .el-pagination{
    margin-top: 10px;
    text-align: right;
}
//模态框样式
/deep/.el-dialog__header{
    text-align: center;
    border-bottom: 1px solid #eee;
}
/deep/.el-dialog__footer{
    text-align: center;
    border-top: 1px solid #eee;
    .el-button{
        width: 150px;
    }
}
</style>