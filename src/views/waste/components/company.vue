<template>
    <div class="companyCon">
        <div class="title">企业信息</div>
        <el-card>
            <div class="card-title">企业信息</div>
            <div class="edit-btn">
                <el-button type="primary" size="small" @click.native="editBtn"> {{ showDetail ? "修改" : "返回查看" }} </el-button>
            </div>
            <div class="info-list" v-if="showDetail">
                <el-row class="list">
                    <el-col :span="7" class="info-title">社会信用代码：</el-col>
                    <el-col :span="13" class="info-detail">
                        {{ companyInfo.socialCredit }}
                    </el-col>
                </el-row>
                <el-row class="list">
                    <el-col :span="7" class="info-title">产生部门经办人：</el-col>
                    <el-col :span="13" class="info-detail">
                        {{ companyInfo.generationDepartmentHandlers }}
                    </el-col>
                </el-row>
                <el-row class="list">
                    <el-col :span="7" class="info-title">运送部门经办人：</el-col>
                    <el-col :span="13" class="info-detail">
                        {{ companyInfo.transportDepartmentHandlers }}
                    </el-col>
                </el-row>
                <el-row class="list">
                    <el-col :span="7" class="info-title">贮存部门经办人：</el-col>
                    <el-col :span="13" class="info-detail">
                        {{ companyInfo.storageDepartmentHandlers }}
                    </el-col>
                </el-row>
                <el-row class="list">
                    <el-col :span="7" class="info-title">贮存部门经办人电话：</el-col>
                    <el-col :span="13" class="info-detail">
                        {{ companyInfo.storageDepartmentHandlersPhone }}
                    </el-col>
                </el-row>
                <el-row class="list">
                    <el-col :span="7" class="info-title">全国固体废物管理信息系统账号：</el-col>
                    <el-col :span="13" class="info-detail">
                        {{ companyInfo.wasteAccount }}
                    </el-col>
                </el-row>
                <el-row class="list">
                    <el-col :span="7" class="info-title">全国固体废物管理信息系统密码：</el-col>
                    <el-col :span="13" class="info-detail">
                        {{ companyInfo.wastePassword }}
                    </el-col>
                </el-row>
                <el-row class="list">
                    <el-col :span="7" class="info-title">浙里办账号：</el-col>
                    <el-col :span="13" class="info-detail">
                        {{ companyInfo.wasteZlbAccount }}
                    </el-col>
                </el-row>
                <el-row class="list">
                    <el-col :span="7" class="info-title">浙里办密码：</el-col>
                    <el-col :span="13" class="info-detail">
                        {{ companyInfo.wasteZlbPassword }}
                    </el-col>
                </el-row>
                <el-row class="list">
                    <el-col :span="7" class="info-title">企业联系人姓名：</el-col>
                    <el-col :span="13" class="info-detail">
                        {{ companyInfo.managerName }}
                    </el-col>
                </el-row>
                <el-row class="list">
                    <el-col :span="7" class="info-title">企业联系人电话：</el-col>
                    <el-col :span="13" class="info-detail">
                        {{ companyInfo.phone }}
                    </el-col>
                </el-row>
                <el-row class="list">
                    <el-col :span="7" class="info-title">固废管理联系人姓名：</el-col>
                    <el-col :span="13" class="info-detail">
                        {{ companyInfo.wasteLink }}
                    </el-col>
                </el-row>
                <el-row class="list">
                    <el-col :span="7" class="info-title">固废管理联系人电话：</el-col>
                    <el-col :span="13" class="info-detail">
                        {{ companyInfo.wastePhone }} 
                    </el-col>
                </el-row>
                <el-row class="list">
                    <el-col :span="7" class="info-title">临平区平台账号：</el-col>
                    <el-col :span="13" class="info-detail">
                        {{ companyInfo.linpingquAccount }}
                    </el-col>
                </el-row>
                <el-row class="list">
                    <el-col :span="7" class="info-title">临平区平台密码：</el-col>
                    <el-col :span="13" class="info-detail">
                        {{ companyInfo.linpingquPassword }}
                    </el-col>
                </el-row>
                <el-row class="list">
                    <el-col :span="7" class="info-title">企业地址：</el-col>
                    <el-col :span="13" class="info-detail">
                        {{ companyInfo.address }}
                    </el-col>
                </el-row>
            </div>
            <div class="main" v-if="!showDetail">
                <el-row class="list">
                    <el-col :span="7" class="info-title">社会信用代码：</el-col>
                    <el-col :span="8">
                        <el-input size="small" v-model="companyInfo.socialCredit"></el-input>
                    </el-col>
                </el-row>
                <el-row class="list">
                    <el-col :span="7" class="info-title">产生部门经办人：</el-col><!--字段名没改-->
                    <el-col :span="8">
                        <el-input size="small" v-model="companyInfo.generationDepartmentHandlers"></el-input>
                    </el-col>
                </el-row>
                <el-row class="list">
                    <el-col :span="7" class="info-title">运送部门经办人：</el-col><!--字段名没改-->
                    <el-col :span="8">
                        <el-input size="small" v-model="companyInfo.transportDepartmentHandlers"></el-input>
                    </el-col>
                </el-row>
                <el-row class="list">
                    <el-col :span="7" class="info-title">贮存部门经办人：</el-col><!--字段名没改-->
                    <el-col :span="8">
                        <el-input size="small" v-model="companyInfo.storageDepartmentHandlers"></el-input>
                    </el-col>
                </el-row>
                <el-row class="list">
                    <el-col :span="7" class="info-title">贮存部门经办人电话：</el-col><!--字段名没改-->
                    <el-col :span="8">
                        <el-input size="small" v-model="companyInfo.storageDepartmentHandlersPhone"></el-input>
                    </el-col>
                </el-row>
                <el-row class="list">
                    <el-col :span="7" class="info-title">全国固体废物管理信息系统账号：</el-col>
                    <el-col :span="8">
                        <el-input size="small" v-model="companyInfo.wasteAccount"></el-input>
                    </el-col>
                </el-row>
                <el-row class="list">
                    <el-col :span="7" class="info-title">全国固体废物管理信息系统密码：</el-col>
                    <el-col :span="8">
                        <el-input size="small" v-model="companyInfo.wastePassword"></el-input>
                    </el-col>
                </el-row>
                <el-row class="list">
                    <el-col :span="7" class="info-title">企业联系人姓名：</el-col>
                    <el-col :span="8">
                        <el-input size="small" v-model="companyInfo.managerName"></el-input>
                    </el-col>
                </el-row>
                <el-row class="list">
                    <el-col :span="7" class="info-title">浙里办账号：</el-col>
                    <el-col :span="8" class="info-detail">
                        <el-input size="small" v-model="companyInfo.wasteZlbAccount"></el-input>
                    </el-col>
                </el-row>
                <el-row class="list">
                    <el-col :span="7" class="info-title">浙里办密码：</el-col>
                    <el-col :span="8" class="info-detail">
                        <el-input size="small" v-model="companyInfo.wasteZlbPassword"></el-input>
                    </el-col>
                </el-row>
                <el-row class="list">
                    <el-col :span="7" class="info-title">企业联系人电话：</el-col>
                    <el-col :span="8">
                        <el-input size="small" v-model="companyInfo.phone"></el-input>
                    </el-col>
                </el-row>
                <el-row class="list">
                    <el-col :span="7" class="info-title">固废管理联系人姓名：</el-col>
                    <el-col :span="8">
                        <el-input size="small" v-model="companyInfo.wasteLink"></el-input>
                    </el-col>
                </el-row>
                <el-row class="list">
                    <el-col :span="7" class="info-title">固废管理联系人电话：</el-col>
                    <el-col :span="8">
                        <el-input size="small" v-model="companyInfo.wastePhone"></el-input>
                    </el-col>
                </el-row>
                <el-row class="list">
                    <el-col :span="7" class="info-title">临平区平台账号：</el-col>
                    <el-col :span="8">
                        <el-input size="small" v-model="companyInfo.linpingquAccount"></el-input>
                    </el-col>
                </el-row>
                <el-row class="list">
                    <el-col :span="7" class="info-title">临平区平台密码：</el-col>
                    <el-col :span="8">
                        <el-input size="small" v-model="companyInfo.linpingquPassword"></el-input>
                    </el-col>
                </el-row>
                <el-row class="list">
                    <el-col :span="7" class="info-title">企业地址：</el-col>
                    <el-col :span="8">
                        <el-input size="small" v-model="companyInfo.address"></el-input>
                    </el-col>
                </el-row>
                <el-row class="list sub-btn">
                    <el-button type="primary" size="small" @click="editInfo">保存信息</el-button>
                </el-row>
            </div>
        </el-card>
    </div>
</template>

<script>
import { getCompanyInfo,editCompanyInfo } from '../../../assets/js/common'
export default {
  name: "companyCon",
  data() {
    return {
        companyInfo:{},
        showDetail:true,
    }
  },
  created(){
    this.getCompanyDetail();
  },
  methods: {
    //修改企业详情
    editBtn(){
        if(this.showDetail){
            this.showDetail = false;
            return;
        }
        this.showDetail = true;
    },

    //获取企业详情
    async getCompanyDetail(){
        const res = await getCompanyInfo();
        if(res?.code == "1"){
            this.companyInfo = res.data;
        }
    },

    //修改企业信息
    async editInfo(){
        const res = await editCompanyInfo(this.companyInfo);
        if(res?.code == "1"){
            this.$message.success("修改成功");
            this.showDetail = true;
        }else{
            this.$message.error(res.msg)
        }
    }
  }
}
</script>

<style lang="less" scoped>
.companyCon{
    .title{
        text-align: center;
        font-size: 16px;
        font-weight: bold;
        letter-spacing: 7px;
        margin-bottom: 30px;
    }
    .card-title {
        color: rgb(131, 130, 130);
        border-bottom: 2px solid #eee;
    }
    .edit-btn{
        margin-top: 10px;
        text-align: right;
    }
    .list{
        margin-top: 10px;
    }
    .info-title{
        line-height: 30px;
        text-align: right;
        font-size: 16px;
        color: #6e6b6b;
    }
    .info-detail{
        line-height: 30px;
        color: #6e6b6b;
    }
    .sub-btn{
        margin-top: 20px;
        padding-left: 30%;
        .el-button{
            width: 100px;
        }
    }
}
</style>