<template>
    <div class="con">
        <div class="title">
            台账记录
        </div>  
        <div class="con-list">
            <el-row>
                <el-form ref="form" label-width="100px">
                    <el-col :span="5">
                        <el-form-item label="废物代码：">
                            <el-input v-model="fromInfo.wasteCode" size="small"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="日期选择：">
                            <el-date-picker v-model="val" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd" size="small"></el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-form>
                <el-col :span="1" style="padding-top:3px;">
                    <el-button type="primary" @click="selectTable" size="small">查询</el-button>    
                </el-col>
                <el-col :span="2" style="padding-top:3px;padding-left:20px;">
                <div class="out">
                        <template>
                            <download-excel class="export-excel-wrapper" :data="data" :fields="parameterXLS" name="台账.xls" >
                                <el-button type="success" size="small">导出台账</el-button>
                            </download-excel>
                        </template>
                    </div>
                </el-col>
             </el-row>
             <div class="table">
                <el-table :data="data" style="width: 100%" :header-cell-style="{'background':'#F5F3F2'}">
                    <el-table-column prop="companyName" label="企业名称" width="350"></el-table-column>
                    <el-table-column prop="createTime" label="出库时间" width="200"></el-table-column>
                    <el-table-column prop="wasteCode" label="废物代码" width="200"></el-table-column>
                    <el-table-column prop="hazardousWasteCategory" label="危废类别" width="200">
                        <template slot-scope="scope">
                            {{ isType(scope.row.hazardousWasteCategory) }}
                        </template>
                    </el-table-column>
                    <el-table-column prop="inQuantity" label="入库数量(kg)" width="120"></el-table-column>
                    <el-table-column prop="outQuantity" label="出库数量(kg)" width="120"></el-table-column>
                    <el-table-column prop="disposalDestination" label="危废处置去向" width="200"></el-table-column>
                    <el-table-column prop="destinationUnit" label="危废处置去向单位" width="200"></el-table-column>
                    <el-table-column prop="storageQuantity" label="累计贮存数量(kg)" width="200"></el-table-column>
                    <el-table-column prop="preparerIn" label="入库人"></el-table-column>
                    <el-table-column prop="preparerOut" label="出库人"></el-table-column>
                    <el-table-column prop="remarks" label="备注" width="400"></el-table-column>
                </el-table>
             </div>
            <el-pagination background layout="prev, pager, next" :total="total" @current-change="selectPage"></el-pagination>
        </div>  
    </div>
</template>
<script>
import { getWasteParameter } from '../../../assets/js/common'
export default{
    name:"parameterTable",
    data(){
        return{
            val:['',''],
            data:[],
            parameterXLS:{
                "企业名称":'companyName',
                "出库时间":'createTime',
                "废物代码":'wasteCode',
                "危废类别":'hazardousWasteCategory',
                "入库数量(kg)":'inQuantity',
                "出库数量(kg)":'outQuantity',
                "危废处置去向":'disposalDestination', 
                "危废处置去向单位":'destinationUnit',
                "累计贮存数量(kg)":'storageQuantity',
                "入库人":'preparerIn',
                "出库人":'preparerOut',
                 "备注":'remarks',
            },
            fromInfo:{
                startDate:"",
                endDate:"",
                pageNum:0,
                pageSize:20,
                wasteCode:"",
            },
            total:0,
        }
    },
    created(){
        this.getList();
    },
    methods:{
        selectTable(){
            if(this.val == null){
                this.val = ['',''];
            }
            this.fromInfo.startDate = "";
            this.fromInfo.endDate = "";
            if(this.val[0] != ""){
                this.fromInfo.startDate = this.val[0]+" 00:00:00";
                this.fromInfo.endDate = this.val[1]+" 23:59:59";
            }
            this.getList();
        },
        isType(type){
            let state = "";
            switch(type){
                case 0:
                    state = "自行处置";
                    break;
                case 1:
                    state = "利用";
                    break;
                case 2:
                    state = "委外处置";
                    break;
            }
            return state;
        },
        selectPage(val){
            this.fromInfo.pageNum = val - 1;
            this.getList();
        },
        async getList(){
            const res = await getWasteParameter(this.fromInfo);
            if(res?.code=="1"){
                this.data = res.data.list;
                this.total = res.data.total;
            }
        },
    }
}
</script>
<style lang="less" scoped>
.con{
    .title{
        text-align: center;
        font-size: 16px;
        font-weight: bold;
        letter-spacing:5px;
    }
    .con-list{
        margin-top: 20px;
    }
    .table{
        margin-bottom: 20px;
        .el-table{
            box-shadow: 0px 2px 2px 3px rgba(15, 15, 15, 0.02);
        }
    }
}
.el-pagination{
    float:right;
} 
</style>