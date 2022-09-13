<template>
    <div class="con">
        <div class="title">
            台账记录
        </div>  
        <div class="con-list">
            <el-tabs type="border-card" v-model="activeTab" @tab-click="switchTab">
                <el-tab-pane label="月台账统计" name="month">
                    <el-row>
                        <!-- <el-form ref="form" label-width="100px"> -->
                        <el-col :md="3" :xl="2" class="write-title">废物代码：</el-col>
                        <el-col :md="5" :xl="3">
                            <!-- <el-form-item label="废物代码：">
                                <el-input v-model="fromInfo.wasteCode" size="small"></el-input>
                            </el-form-item> -->
                            <el-select v-model="fromInfo.wasteCode" placeholder="请选择" size="small" class="w-100">
                                <el-option
                                v-for="(item,i) in wasteList"
                                :key="i"
                                :label="item.wasteCode"
                                :value="item.wasteCode">
                                </el-option>
                            </el-select>
                        </el-col>
                        <!-- </el-form> -->
                        <el-col :span="2" class="write-title">选择月份：</el-col>
                        <el-col :md="5" :xl="4">
                            <el-date-picker v-model="fromInfo.startTime" type="month" size="small" placeholder="选择月" value-format="yyyy-MM-dd HH:mm:ss" :clearable="false"></el-date-picker>
                        </el-col>
                        <el-col :md="3" :xl="2" style="padding-top:3px;">
                            <el-button type="primary" @click="selectTable" size="small">查询</el-button>    
                        </el-col>
                        <!-- <el-col :span="2" style="padding-top:3px;padding-left:20px;">
                            <div class="out">
                                <template>
                                    <download-excel class="export-excel-wrapper" :data="exportMonthList" :fields="parameterXLS" name="月台账.xls" >
                                        <el-button type="success" size="small">导出台账</el-button>
                                    </download-excel>
                                </template>
                            </div>
                        </el-col> -->
                    </el-row>
                    <div class="table" style="margin-top:20px">
                        <el-table :data="data" style="width: 100%;" height="550" maxHeight="550" :header-cell-style="{'background':'#F5F3F2'}">
                            <el-table-column prop="companyName" label="企业名称" width="350"></el-table-column>
                            <el-table-column prop="operationTime" label="台账时间" width="200"></el-table-column>
                            <el-table-column prop="codeName" label="废物代码和名称" width="200"></el-table-column>
                            <el-table-column prop="inboundWeight" label="入库数量(kg)" width="200"></el-table-column>
                            <el-table-column prop="outboundWeight" label="出库数量(kg)" width="200"></el-table-column>
                            <el-table-column prop="disposalDestination" label="危废处置类型" width="200">
                                <template slot-scope="scope">
                                    {{ isType(scope.row.disposalDestination) }}
                                </template>
                            </el-table-column>
                            <el-table-column prop="destination" label="危废处置去向" width="200">
                                <template slot-scope="scope">
                                    {{ isUnit(scope.row.destination) }}
                                </template>
                            </el-table-column>
                            <el-table-column prop="destinationUnit" label="危废处置去向单位" width="350"></el-table-column>
                            <el-table-column prop="cumulativeWeight" label="累计贮存数量(kg)" width="200"></el-table-column>
                            <el-table-column prop="personnelName" label="出库人"></el-table-column>
                            <el-table-column prop="remarks" label="备注" width="400"></el-table-column>
                        </el-table>
                    </div>
                    <!-- <el-pagination background layout="prev, pager, next" :total="total" @current-change="selectPage"></el-pagination> -->
                </el-tab-pane>
                <el-tab-pane label="历史台账下载" name="years">
                    <div style="min-height:650px">
                        <div class="nav-type nav-two">全部危废台账</div>
                        <div class="out">
                            <el-row class="m-top">
                                <el-col :span="24" :offset="1">
                                    <template>
                                        <!-- <download-excel class="export-excel-wrapper" :data="allDetailData" :fields="parameterYsersXLS" name="全部危废台账.xls" > -->
                                            <el-button type="primary" style="width:200px;" size="small" @click.native="getAllParameter">导出全部危废台账</el-button>
                                        <!-- </download-excel> -->
                                    </template>
                                </el-col>
                            </el-row>
                        </div>
                        <div class="nav-type nav-two">选定危废台账</div>
                        <div class="attachment">
                            <el-row class="m-top">
                                <el-col :span="3" class="write-title">1、请选择废物代码：</el-col>
                                <el-col :span="4">
                                    <el-select v-model="attachmentInfo.wasteCode" placeholder="请选择" size="small" class="w-100">
                                        <el-option
                                        v-for="(item,i) in wasteList"
                                        :key="i"
                                        :label="item.wasteCode"
                                        :value="item.wasteCode">
                                        </el-option>
                                    </el-select>
                                </el-col>
                            </el-row>
                            <el-row class="m-top">
                                <el-col :span="3" class="write-title">2、请选择年/月时间：</el-col>
                                <el-col :span="4">
                                    <el-date-picker size="small" style="width:100%"
                                    v-model="attachmentInfo.preTime"
                                    type="month" value-format="yyyy-MM-dd 00:00:00"
                                    placeholder="选择时间" @change="selectTime">
                                    </el-date-picker>
                                </el-col>
                            </el-row>
                            <el-row class="m-top">
                                <el-col :span="24" :offset="1">
                                    <el-button type="primary" @click.native="downFile('record')" size="small" style="width:200px;">导出所选危废月台账记录</el-button>
                                </el-col>
                            </el-row>
                            <el-row class="m-top">
                                <el-col :span="24" :offset="1">
                                    <el-button type="primary" @click.native="downFile('num')" size="small" style="width:200px;">导出所选危废年汇总台账记录</el-button>
                                </el-col>
                            </el-row>
                        </div>
                    </div>
                </el-tab-pane> 
            </el-tabs>
            
        </div>  
    </div>
</template>
<script>
// getYearsWasteParameter,
import { getMonthWasteParameter,getWasteInfo,getFileParameter,getFileRecord,getWasteAllDetail } from '../../../assets/js/common'
export default{
    name:"parameterTable",
    data(){
        return{ 
            data:[],
            yearsList:[],
            allDetailData:[],
            exportMonthList:[],
            numData:[],
            parameterXLS:{
                "企业名称":'companyName',
                "台账时间":'time',
                "废物代码":'wasteCode',
                // "危废类别":'hazardousWasteCategory',
                "入库数量(kg)":'inQuantity',
                "出库数量(kg)":'outQuantity',
                "危废处置类型":'disposalDestination', 
                "危废处置去向":'destination',
                "危废处置去向单位":'destinationUnit',
                "累计贮存数量(kg)":'storageQuantity',
                "出库人":'preparerOut',
                "备注":'remarks',
            },
            parameterYsersXLS:{
                "企业名称":'companyName',
                "台账时间":'operationTime',
                "废物代码":'codeName',
                // "危废类别":'hazardousWasteCategory',
                "入库数量(kg)":'inboundWeight',
                "出库数量(kg)":'outboundWeight',
                "危废处置类型":'disposalDestination', 
                "危废处置去向":'destination',
                "危废处置去向单位":'destinationUnit',
                "累计贮存数量(kg)":'cumulativeWeight',
                // "入库人":'preparerIn',
                // "出库人":'preparerOut',
                //  "备注":'remarks',
            },
            fromInfo:{ 
                // preTime:"",
                // pageNum:0,
                // pageSize:20,
                wasteCode:"",
                startTime:"",
                endTime:"",
            },
            yearsTime:[],
            fromYearsInfo:{
                startDate:"",
                endDate:"",
                // pageNum:0,
                // pageSize:20,
                wasteCode:"",
            },
            preMonthTime:"",
            preYearTime:"",
            activeTab:"month",
            total:0,
            yearsTotal:0,
            attachmentInfo:{
                wasteCode:"",
                preTime:"",
                // pageNum:0,
                // pageSize:1000000,
            },
            wasteList:[],
        }
    },
    created(){
        let time = new Date();
        let month = (time.getMonth() + 1) >= 10 ? (time.getMonth()+1) : "0" + (time.getMonth()+1);
        this.preMonthTime =  time.getFullYear() + "-" + month +"-01 00:00:00";
        this.fromInfo.startTime = this.preMonthTime;
        this.preYearTime =  time.getFullYear() +"-01-01 00:00:00";
        // this.fromYearsInfo.preTime = this.preYearTime;
        // this.getExportMonthList();
        // this.getExportYearsList();
        this.getList();
        this.getWasteList("");
    },
    methods:{
        selectTable(){ 
            this.fromYearsInfo.pageNum = 0;
            this.fromInfo.pageNum = 0;
             if(this.activeTab == "years"){
                this.getAllParameter();
                return;
            };
            if(this.fromInfo.wasteCode == "请选择"){
                this.fromInfo.wasteCode = "";
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
                    state = "委外利用";
                    break;
                case 2:
                    state = "委外处置";
                    break;
            }
            return state;
        },
        isUnit(type){
            let state = "";
            switch(type){
                case 0:
                    state = "本市";
                    break;
                case 1:
                    state = "省内";
                    break;
                case 2:
                    state = "省外";
                    break; 
            }
            return state;
        },
        selectPage(val){
             if(this.activeTab == "years"){
                this.fromYearsInfo.pageNum = val - 1;
                this.getAllParameter();
                return;
            };
            this.fromInfo.pageNum = val - 1;
            this.getList();
        },
      
        //tab切换
        switchTab(){
            this.total = 0;
            this.yearsTotal = 0;
            this.fromInfo.preTime = "";
            this.fromInfo.wasteCode = "";
            if(this.activeTab == "years"){
                // this.getAllParameter();
                return;
            };
            this.getList();
        },
        //获取全部危废台账
        async getAllParameter(){
            const res = await getWasteAllDetail({wasteCode:""});
            if(res?.code == "1"){
                // this.allDetailData = res.data;
                this.downWordFile(res.data,"all");
            }
        },

        // //获取年数据
        // async getYearsList(){
        //     if(this.yearsTime.length != 0){
        //         this.fromYearsInfo.startDate = this.yearsTime[0];
        //         this.fromYearsInfo.endDate = this.yearsTime[1];
        //     }
        //     const res = await getYearsWasteParameter(this.fromYearsInfo);
        //     if(res?.code == "1"){
        //         this.yearsList = res.data.list;
        //     }
        // },
        // //获取导出年台账数据
        // async getExportYearsList(){
        //     const res = await getYearsWasteParameter({pageNum:0,pageSize:100000,preTime:this.preYearTime});
        //     if(res?.code == "1"){
        //         this.exportYearsList = res.data.list;
        //     }
        // },
        //获取月数据
        async getList(){
            this.fromInfo.endTime = this.fromInfo.startTime;
            const res = await getMonthWasteParameter(this.fromInfo);
            if(res?.code=="1"){
                this.data = res.data;
                // this.total = res.data.total;
            }
        },
        //获取导出月台账数据
        // async getExportMonthList(){
        //     const res = await getMonthWasteParameter({pageNum:0,pageSize:100000,preTime:this.preMonthTime});
        //     if(res?.code == "1"){
        //         this.exportMonthList = res.data.list;
        //     }
        // },
        //获取危废列表
        async getWasteList(val){
            const res = await getWasteInfo(val);
            if(res?.code == "1"){
                this.wasteList = res.data;
                this.wasteList.unshift({wasteCode:"请选择"})
                // if(res.data.length != 0){
                //     res.data.forEach(item => {
                //         this.wasteList.push({value:item.wasteCode,text:item.wasteCode})
                //     })
                // }
            }
        },
        //选择日期
        selectYearsTime(){
            // console.log(this.fromYearsInfo.preTime)
            if(this.fromYearsInfo.preTime == null){
                this.fromYearsInfo.preTime = "";
            }
        },
        selectTime(){
            console.log(123);
        },
        //下载附件
        async downFile(type){
            if(this.attachmentInfo.wasteCode == ""){
                this.$message({
                    message: '请选择废物代码',
                    type: 'error'
                })
                return;
            }
            if(this.attachmentInfo.preTime == ""){
                this.$message({
                    message: '请选择日期',
                    type: 'error'
                })
                return;
            }
            if(type == "num"){
                const resList = await getFileParameter(this.attachmentInfo);
                if(resList?.code == "1"){
                   this.downWordFile(resList.data,type);
                }else{
                    this.$message({
                        message: resList.msg,
                        type: 'error'
                    })
                }
            } else {
                const resa = await getFileRecord(this.attachmentInfo);
                 if(resa?.code == "1"){
                   this.downWordFile(resa.data,type);
                }else{
                    this.$message({
                        message: resa.msg,
                        type: 'error'
                    })
                }
            }
        },
        //下载Word文件
        downWordFile(url){
            window.open(url);
            // let link = document.createElement("a");
            // link.href = url;
            // if(type == "num"){
            //    link.download = "导出所选危废年汇总台账记录.doc" //下载的文件名
            // } else if(type == "all"){
            //     link.download = "导出全部台账.doc" //下载的文件名
            // } else {
            //    link.download = "导出所选危废月台账记录.doc" //下载的文件名
            // } 
            // document.body.appendChild(link);
            // link.click();
            // document.body.removeChild(link);
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
.nav-type{
  background-color: #eee;
  width: 100%;
  margin-top: 20px;
  height: 30px;
  line-height: 30px;
  padding-left: 10px;
  font-size: 14px;
  color: rgb(143, 141, 141);
  margin-bottom: 10px;
}
.write-title{
    text-align: right;
    font-size: 14px;
    line-height: 34px;
}
.m-top{
    margin-top: 20px;
}
 /*滚动条样式*/
 // 滚动条的宽度
  /deep/ .el-table__body-wrapper::-webkit-scrollbar {
    width: 16px; // 横向滚动条
    height: 16px; // 纵向滚动条 必写
  }
</style>