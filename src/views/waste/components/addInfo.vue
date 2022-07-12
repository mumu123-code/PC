<template>
    <div class="addInfoCon">
        <div class="title">标签配置信息</div>
        <el-card>
            <div class="card-title">标签信息填写</div>
            <div class="info-list">
                <el-row class="info-detail">
                    <el-col :span="3" class="info-title">废物代码和废物名称：</el-col>
                    <el-col :span="5">
                        <el-input size="small" v-model="addInfoForm.wasteCode"></el-input>
                    </el-col>
                    <el-col :span="2" class="info-title">主要成分：</el-col>
                    <el-col :span="5">
                        <el-input size="small" v-model="addInfoForm.mainComponents"></el-input>
                    </el-col>
                    <el-col :span="2" class="info-title">化学成分：</el-col>
                    <el-col :span="5">
                        <el-input size="small" v-model="addInfoForm.chemicalComposition"></el-input>
                    </el-col>
                </el-row>
                <el-row class="info-detail">
                    <el-col :span="3" class="info-title">批次：</el-col>
                    <el-col :span="5">
                        <el-input size="small" v-model="addInfoForm.batch"></el-input>
                    </el-col>
                    <el-col :span="2" class="info-title">数量：</el-col>
                    <el-col :span="5">
                        <el-input size="small" v-model="addInfoForm.quantity"></el-input>
                    </el-col>
                    <el-col :span="2" class="info-title">危险情况：</el-col>
                    <el-col :span="5">
                        <el-input size="small" v-model="addInfoForm.dangerousSituation"></el-input>
                    </el-col>
                </el-row>
                <el-row class="info-detail">
                    <el-col :span="3" class="info-title">废物产生单位：</el-col>
                    <el-col :span="5">
                        <el-input size="small" v-model="addInfoForm.generatingUnit"></el-input>
                    </el-col>
                    <el-col :span="2" class="info-title">联系人：</el-col>
                    <el-col :span="5">
                        <el-input size="small" v-model="addInfoForm.contacts"></el-input>
                    </el-col>
                    <el-col :span="2" class="info-title">电话：</el-col>
                    <el-col :span="5">
                        <el-input size="small" v-model="addInfoForm.telephone"></el-input>
                    </el-col>
                </el-row>
                <el-row class="info-detail">
                    <el-col :span="3" class="info-title">安全措施：</el-col>
                    <el-col :span="5">
                        <el-input size="small" v-model="addInfoForm.safetyMeasures"></el-input>
                    </el-col>
                    <el-col :span="2" class="info-title">出厂日期：</el-col>
                    <el-col :span="5">
                         <el-date-picker v-model="addInfoForm.productionDate" size="small" style="width:100%" type="date" value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期"></el-date-picker>
                    </el-col>
                </el-row>
                <el-row class="info-detail">
                    <el-col :span="3" class="info-title">地址：</el-col>
                    <el-col :span="19">
                        <el-input size="small" v-model="addInfoForm.address" type="textarea"></el-input>
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
                        <el-table-column prop="wasteCode" label="废物代码和废物名称" width="400"></el-table-column>
                        <el-table-column prop="companyName" label="企业名称" width="400"></el-table-column>
                        <el-table-column prop="mainComponents" label="主要成分" width="200"></el-table-column>
                        <el-table-column prop="chemicalComposition" label="化学成分" width="200"></el-table-column>
                        <el-table-column prop="dangerousSituation" label="危险情况" width="200"></el-table-column>
                        <el-table-column prop="safetyMeasures" label="安全措施" width="200"></el-table-column>
                        <el-table-column prop="generatingUnit" label="废物产生单位" width="400"></el-table-column>
                        <el-table-column prop="batch" label="批次" width="100"></el-table-column>
                        <el-table-column prop="quantity" label="数量" width="100"></el-table-column>
                        <el-table-column prop="contacts" label="联系人" width="200"></el-table-column>
                        <el-table-column prop="telephone" label="电话" width="200"></el-table-column>
                        <el-table-column prop="productionDate" label="出厂日期" width="200"></el-table-column>
                        <el-table-column prop="address" label="地址" width="400"></el-table-column>
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
        <el-dialog title="修改配置信息" :visible.sync="showModel" width="80%" :before-close="hideModel">
            <div class="model-con">
                <el-row class="model-list">
                    <el-col :span="3" class="info-title">废物代码和废物名称：</el-col>
                    <el-col :span="20"><el-input size="small" v-model="editInfoForm.wasteCode"></el-input></el-col>
                </el-row>
                <el-row class="model-list">
                    <el-col :span="2" class="info-title">主要成分：</el-col>
                    <el-col :span="9"><el-input size="small" v-model="editInfoForm.mainComponents"></el-input></el-col>
                    <el-col :span="3" class="info-title">化学成分：</el-col>
                    <el-col :span="9"><el-input size="small" v-model="editInfoForm.chemicalComposition"></el-input></el-col>
                </el-row>
                <el-row class="model-list">
                    <el-col :span="2" class="info-title">危险情况：</el-col>
                    <el-col :span="9"><el-input size="small" v-model="editInfoForm.dangerousSituation"></el-input></el-col>
                    <el-col :span="3" class="info-title">安全措施：</el-col>
                    <el-col :span="9"><el-input size="small" v-model="editInfoForm.safetyMeasures"></el-input></el-col>
                </el-row>
                <el-row class="model-list">
                    <el-col :span="2" class="info-title">批次：</el-col>
                    <el-col :span="9"><el-input size="small" v-model="editInfoForm.batch"></el-input></el-col>
                    <el-col :span="3" class="info-title">数量：</el-col>
                    <el-col :span="9"><el-input size="small" type="number" v-model="editInfoForm.quantity"></el-input></el-col>
                </el-row>
                <el-row class="model-list">
                    <el-col :span="2" class="info-title">废物产生单位：</el-col>
                    <el-col :span="9"><el-input size="small" v-model="editInfoForm.generatingUnit"></el-input></el-col>
                    <el-col :span="3" class="info-title">出厂日期：</el-col>
                    <el-col :span="9"><el-date-picker type="date" size="small" v-model="editInfoForm.productionDate" placeholder="选择日期" value-format="yyyy-MM-dd HH:mm:ss" class="w-100"></el-date-picker></el-col>
                </el-row>
                <el-row class="model-list">
                    <el-col :span="2" class="info-title">联系人：</el-col>
                    <el-col :span="9"><el-input size="small" v-model="editInfoForm.contacts"></el-input></el-col>
                    <el-col :span="3" class="info-title">电话：</el-col>
                    <el-col :span="9"><el-input size="small" v-model="editInfoForm.telephone"></el-input></el-col>
                </el-row>
                <el-row class="model-list">
                    <el-col :span="2" class="info-title">地址：</el-col>
                    <el-col :span="21"><el-input size="small" v-model="editInfoForm.address" type="textarea"></el-input></el-col>
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
                wasteCode:"",
                mainComponents:"",
                chemicalComposition:"",
                dangerousSituation:"",
                safetyMeasures:"",
                generatingUnit:"",
                telephone:"",
                contacts:"",
                address:"",
                batch:"",
                quantity:"",
                productionDate:"",
            }, //提交信息
            idx: 0,
            addInfoTableData: [{ id: 0, companyName: "名称" }], //信息列表
            showModel:false,
            editInfoForm:{},
            total:0,
            fromInfo:{
                pageNum:1,
                pageSize:10,
            }
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
            if(!this.isFormValNull(this.addInfoForm)){
                return;
            };
            const res = await editConfigurationInfo(this.addInfoForm);
            if(res?.code == "1"){
                this.$message.success("添加成功");
                this.addInfoForm = {
                    wasteCode:"",
                    mainComponents:"",
                    chemicalComposition:"",
                    dangerousSituation:"",
                    safetyMeasures:"",
                    generatingUnit:"",
                    telephone:"",
                    contacts:"",
                    address:"",
                    batch:"",
                    quantity:"",
                    productionDate:"",
                } 
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
                console.log(res)
                this.addInfoTableData = res.data.list;
                this.total = res.data.total;
            }else{
                this.$message.error(res.msg);
            }
        },

        //修改信息
        editInfo(val) {
            this.editInfoForm = val;
            this.showModel = true;
        },

        //判断属性值是否为空
        isFormValNull(state){
            if(state.wasteCode == ""){
                this.$message.error("废物代码和废物名称不能为空");
                return false;
            }
            if(state.mainComponents == ""){
                this.$message.error("主要成分不能为空");
                return false;
            }
            if(state.chemicalComposition == ""){
                this.$message.error("化学成分不能为空");
                return false;
            }
            if(state.dangerousSituation == ""){
                this.$message.error("危险情况不能为空");
                return false;
            }
            if(state.safetyMeasures == ""){
                this.$message.error("安全措施不能为空");
                return false;
            }
            if(state.batch == ""){
                this.$message.error("批次不能为空");
                return false;
            }
            if(state.quantity == ""){
                this.$message.error("数量不能为空");
                return false;
            }
            if(state.generatingUnit == ""){
                this.$message.error("废物产生单位不能为空");
                return false;
            }
            if(state.productionDate == ""){
                this.$message.error("出厂日期不能为空");
                return false;
            }
            if(state.contacts == ""){
                this.$message.error("联系人不能为空");
                return false;
            }
            if(state.telephone == ""){
                this.$message.error("电话不能为空");
                return false;
            }
            if(state.address == ""){
                this.$message.error("地址不能为空");
                return false;
            } 
            return true;
        },

        //保存修改信息
        async addEditInfo(){ 
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
        text-align: center;
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