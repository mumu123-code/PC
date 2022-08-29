<template>
    <div class="addInfoCon">
        <div class="title">标签配置信息</div>
        <el-card>
            <div class="card-title">标签信息填写</div>
            <div class="info-list">
                <el-row class="info-detail">
                    <el-col :span="3" class="info-title">电子秤类型：</el-col>
                    <el-col :span="10">
                        <el-select v-model="addInfoForm.scalesType" placeholder="请选择" size="small" style="width:100%">
                            <el-option v-for="item in scalesData" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                    </el-col>
                </el-row>
                <el-row class="info-detail">
                    <el-col :span="3" class="info-title">废物代码和废物名称：</el-col>
                    <el-col :span="10">
                        <el-input size="small" v-model="addInfoForm.wasteCode"></el-input>
                    </el-col>
                </el-row>
                <el-row class="info-detail">
                    <el-col :span="3" class="info-title">危废协议生效时间：</el-col>
                    <el-col :span="10">
                        <el-date-picker v-model="addInfoForm.effectiveTime" size="small" style="width:100%" type="date" value-format="yyyy-MM-dd 00:00:00" placeholder="选择日期"></el-date-picker>
                        <!-- <el-input size="small" v-model="addInfoForm.chemicalComposition"></el-input> -->
                    </el-col>
                </el-row>
                <el-row class="info-detail">
                    <el-col :span="3" class="info-title">主要成分：</el-col>
                    <el-col :span="10">
                        <el-input size="small" v-model="addInfoForm.mainComponents"></el-input>
                    </el-col>
                </el-row>
                <el-row class="info-detail">
                    <el-col :span="3" class="info-title">危险情况：</el-col>
                    <el-col :span="18" style="padding-top:5px;">
                        <el-checkbox-group v-model="dangerousSituation">
                            <el-checkbox v-for="(item,i) in multData" :key="i" :label="item.text" name="type"></el-checkbox> 
                        </el-checkbox-group>
                    </el-col>
                </el-row>
                <el-row class="info-detail">
                    <el-col :span="3" class="info-title">安全措施：</el-col>
                    <el-col :span="10">
                        <el-input size="small" v-model="addInfoForm.safetyMeasures"></el-input>
                    </el-col>
                </el-row>
                <el-row class="m-top">
                    <el-button type="primary" size="small" @click.native="addInfo">保存</el-button>
                </el-row>
            </div>
        </el-card>
        <el-card>
            <div class="card-title">标签信息列表</div>
            <div class="info-list">
                <el-row class="table">
                    <el-table :data="addInfoTableData" style="width: 100%" :header-cell-style="{ background: '#F5F3F2' }">
                        <el-table-column prop="scalesType" label="电子秤类型" width="230">
                            <template slot-scope="scope">
                                {{ scope.row.scalesType == 0 ? "标准秤" : scope.row.scalesType == 1 ? "累加秤" : "液位秤"  }}
                            </template>
                        </el-table-column>
                        <el-table-column prop="wasteCode" label="废物代码和废物名称" width="230"></el-table-column>
                        <el-table-column prop="companyName" label="企业名称" width="300"></el-table-column>
                        <el-table-column prop="effectiveTime" label="危废协议生效时间" width="200"></el-table-column>
                        <el-table-column prop="mainComponents" label="主要成分" width="200"></el-table-column>
                        <el-table-column prop="wasteCode" label="化学成分" width="200"></el-table-column>
                        <el-table-column prop="dangerousSituation" label="危险情况" width="300"></el-table-column>
                        <el-table-column prop="safetyMeasures" label="安全措施" width="200"></el-table-column>
                        <el-table-column prop="managerName" label="联系人" width="100"></el-table-column>
                        <el-table-column prop="phone" label="电话" width="200"></el-table-column>
                        <el-table-column prop="recoverAmount" label="修改" width="80">
                            <template slot-scope="scope">
                                <el-button type="primary" size="small" @click.native="editInfo(scope.row)">修改</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <el-pagination background layout="prev, pager, next" :total="total" @current-change="selectPage"></el-pagination>
                </el-row>

            </div>
        </el-card>

        <!-- 编辑弹框 -->
        <el-dialog title="修改标签信息" :visible.sync="showModel" width="50%" :before-close="hideModel">
            <div class="model-con">
                <el-row class="model-list">
                    <el-col :span="4" class="info-title">电子秤类型：</el-col>
                    <el-col :span="18">
                        <el-select v-model="editInfoForm.scalesType" placeholder="请选择" size="small" style="width:100%">
                            <el-option v-for="item in scalesData" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </el-col>
                </el-row>
                <el-row class="model-list">
                    <el-col :span="4" class="info-title">废物代码和废物名称：</el-col>
                    <el-col :span="18"><el-input size="small" v-model="editInfoForm.wasteCode"></el-input></el-col>
                </el-row>
                <el-row class="model-list">
                    <el-col :span="4" class="info-title">危废协议生效时间：</el-col>
                    <el-col :span="18">
                        <el-date-picker v-model="editInfoForm.effectiveTime" size="small" style="width:100%" type="date" value-format="yyyy-MM-dd 00:00:00" placeholder="选择日期"></el-date-picker>
                    </el-col>
                </el-row>
                <el-row class="model-list">
                    <el-col :span="4" class="info-title">主要成分：</el-col>
                    <el-col :span="18"><el-input size="small" v-model="editInfoForm.mainComponents"></el-input></el-col> 
                </el-row>
                <el-row class="model-list">
                    <el-col :span="4" class="info-title">危险情况：</el-col>
                    <el-col :span="18">
                        <el-checkbox-group v-model="editDangerousSituation">
                            <el-checkbox v-for="(item,i) in multData" :key="i" :label="item.text" name="type"></el-checkbox>
                        </el-checkbox-group>
                    </el-col>
                </el-row>
                <el-row class="model-list">
                    <el-col :span="4" class="info-title">安全措施：</el-col>
                    <el-col :span="18"><el-input size="small" v-model="editInfoForm.safetyMeasures"></el-input></el-col>
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
import { getConfigurationInfoList,editConfigurationInfo } from '../../../assets/js/common'
export default {
    name: "addInfoCon",
    data() {
        return {
            addInfoForm: {
                scalesType:0,
                wasteCode:"",
                effectiveTime:"",
                mainComponents:"",
                dangerousSituation:"",
                safetyMeasures:"",
            }, //提交信息
            idx: 0,
            addInfoTableData: [{ id: 0, companyName: "名称" }], //信息列表
            showModel:false,
            editDangerousSituation:[],
            editInfoForm:{},
            total:0,
            fromInfo:{
                pageNum:1,
                pageSize:10,
            },
            scalesData:[
                { value: 0, label: "标准秤" },
                { value: 1, label: "累加秤" },
                { value: 2, label: "液位秤" },
            ],
            dangerousSituation:[], //选中危险情况
            multData:[              //危险情况类型
                {val:"爆炸性",text:"爆炸性"},
                {val:"有毒",text:"有毒"},
                {val:"易燃",text:"易燃"},
                {val:"有害",text:"有害"},
                {val:"助燃",text:"助燃"},
                {val:"腐蚀性",text:"腐蚀性"},
                {val:"刺激性",text:"刺激性"},
                {val:"石棉",text:"石棉"},
            ]
        };
    },
    mounted(){
        this.getList();
    },
    methods: {
        //添加一条
        addInfoList() {
            this.idx = this.idx++;
            this.addInfoForm.push({ idx: this.idx ,name:""});
        },
        
        //保存信息
        async addInfo(){ 
            if(this.dangerousSituation.length != 0){
                let str = "";
                this.dangerousSituation.forEach((item) => {
                    str += item + ",";
                })
                this.addInfoForm.dangerousSituation = str.substring(0, str.length - 1);;
            }
            if(!this.isFormValNull(this.addInfoForm)){
                return;
            };
            const res = await editConfigurationInfo(this.addInfoForm);
            if(res?.code == "1"){
                this.$message.success("添加成功");
                this.addInfoForm = {
                    scalesType:0,
                    wasteCode:"",
                    effectiveTime:"",
                    mainComponents:"",
                    chemicalComposition:"",
                    safetyMeasures:"",
                } 
                this.dangerousSituation = [];
                this.fromInfo.pageNum = 1;
                this.getList();
            }else{
                this.$message.error(res.msg);
            }
        },

        //表格下一页
        selectPage(val){
            this.fromInfo.pageNum = val;
            this.getList();
        },
        //获取信息列表
        async getList(){
            const res = await getConfigurationInfoList(this.fromInfo);
            if(res?.code == "1"){
                this.addInfoTableData = res.data.list;
                this.total = res.data.total;
            }else{
                this.$message.error(res.msg);
            }
        },

        //修改信息
        editInfo(val) {
            this.editInfoForm = val;
            this.editDangerousSituation = val.dangerousSituation.split(",");
            this.showModel = true;
        },

        //判断属性值是否为空
        isFormValNull(state){
            if(state.wasteCode == ""){
                this.$message.error("废物代码和废物名称不能为空");
                return false;
            }
            if(state.effectiveTime == ""){
                this.$message.error("危废协议生效时间不能为空");
                return false;
            }
            if(state.mainComponents == ""){
                this.$message.error("主要成分不能为空");
                return false;
            }
            if(state.dangerousSituation == ""){
                this.$message.error("请选择危险情况");
                return false;
            }
            if(state.safetyMeasures == ""){
                this.$message.error("安全措施不能为空");
                return false;
            }
            return true;
        },

        //保存修改信息
        async addEditInfo(){ 
            if(this.editDangerousSituation.length != 0){
                let str = "";
                this.editDangerousSituation.forEach((item) => {
                    str += item + ",";
                })
                this.editInfoForm.dangerousSituation = str.substring(0, str.length - 1);;
            }
            if(!this.isFormValNull(this.editInfoForm)){
                return;
            };
            const res = await editConfigurationInfo(this.editInfoForm);
            if(res?.code == "1"){
                this.$message.success("修改成功");
                this.hideModel();
            }
        },

        //关闭模态框
        hideModel(){
            this.showModel = false;
        },
    },
};
</script>

<style lang="less" scoped>
.addInfoCon {
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
        .info-list {
            padding-top: 10px;
        }
        .addBtn {
            margin-bottom: 10px;
        }
    }
    .info-detail{
        margin-top: 20px;
        .info-title{
            line-height: 30px;
            text-align: right;
            font-size: 14px;
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
    .m-top{
        margin-top: 20px;
        padding-left: 30%;
        // text-align: center;
        .el-button{
            width: 100px;
            font-size: 14px;
        }
    }
}
// 滚动条的宽度
/deep/ .el-table__body-wrapper::-webkit-scrollbar {
    width: 16px; // 横向滚动条
    height: 16px; // 纵向滚动条 必写
}
/deep/ .el-dialog__header{
    border-bottom: 1px solid #eee;
    text-align: center;
}
/deep/ .el-dialog__footer{
    text-align: center;
    .el-button{
        width: 150px;
    }
}
.el-pagination{
    text-align: right;
}
</style>