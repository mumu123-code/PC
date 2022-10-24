<template>
    <div class="con">
        <div class="title">
            台账记录
        </div>
        <el-card>
            <div class="card-title">台账统计</div> 
            <div class="con-list">
                <div class="searchList">
                    <div class="list">
                        <div class="list-left write-title">废物代码：</div>
                        <div class="list-right">
                            <el-select v-model="from.wasteCode" placeholder="请选择" size="mini" class="w-100">
                                <el-option v-for="(item,i) in wasteList" :key="i"
                                :label="item.wasteCode" :value="item.wasteCode">
                                </el-option>
                            </el-select>
                        </div>
                    </div>
                    <div class="list">
                        <div class="list-left write-title">台账类型：</div>
                        <div class="list-right">
                            <el-select v-model="from.wasteType" placeholder="请选择" size="mini" class="w-100">
                                <el-option v-for="(item,i) in wasteTypeList" :key="i"
                                :label="item.label" :value="item.value">
                                </el-option>
                            </el-select>
                        </div>
                    </div>
                    <div class="dateSelect">
                        <div class="list-left write-title">选择日期：</div>
                        <div class="list-right">
                            <el-date-picker v-model="rangeTime" type="daterange" range-separator="至"
                                start-placeholder="开始日期" end-placeholder="结束日期" size="mini"></el-date-picker>
                        </div>
                    </div>
                    <div class="list" style="margin-left:14px">
                        <el-button type="primary" @click="selectTable" size="mini">查询</el-button>
                        <el-button type="primary" @click="downWordFile" size="mini">导出查询数据</el-button>
                        <el-button type="primary" @click="downWordFile('all')" size="mini">导出所有</el-button>    
                    </div>
                </div>
                <div class="tableList" style="margin-top:14px">
                    <TablePackage :dataArr="productionData" :tableArr="productionArr" v-if="from.wasteType == '危废产生环节记录表'"></TablePackage>
                    <TablePackage :dataArr="inStorageData" :tableArr="inStorageArr" v-else-if="from.wasteType == '危险废物入库环节记录表'"></TablePackage>
                    <TablePackage :dataArr="outboundData" :tableArr="outboundArr" v-else-if="from.wasteType == '危险废物出库环节记录表'"></TablePackage>
                    <TablePackage :dataArr="useData" :tableArr="useArr" v-else-if="from.wasteType == '危险废物自行利用/处置环节记录表'"></TablePackage>
                    <TablePackage :dataArr="outsourcingData" :tableArr="outsourcingArr" v-else></TablePackage>
                </div>
                <!-- <el-tabs type="border-card" v-model="activeTab" @tab-click="switchTab">
                    <el-tab-pane label="月台账统计" name="month">
                        <el-row>
                            <el-form ref="form" label-width="100px">
                            <el-col :md="2" :xl="2" class="write-title">废物代码：</el-col>
                            <el-col :md="2" :xl="3">
                                <el-form-item label="废物代码：">
                                    <el-input v-model="fromInfo.wasteCode" size="small"></el-input>
                                </el-form-item>
                                <el-select v-model="fromInfo.wasteCode" placeholder="请选择" size="mini" class="w-100">
                                    <el-option
                                    v-for="(item,i) in wasteList"
                                    :key="i"
                                    :label="item.wasteCode"
                                    :value="item.wasteCode">
                                    </el-option>
                                </el-select>
                            </el-col>
                            <el-col :md="2" :xl="2" class="write-title">台账类型：</el-col>
                            <el-col :md="3" :xl="3">
                                <el-form-item label="废物代码：">
                                    <el-input v-model="fromInfo.wasteCode" size="small"></el-input>
                                </el-form-item>
                                <el-select v-model="fromInfo.wasteType" placeholder="请选择"  size="mini" class="w-100">
                                    <el-option
                                    v-for="(item,i) in wasteTypeList"
                                    :key="i"
                                    :label="item.wasteType"
                                    :value="item.wasteType">
                                    </el-option>
                                </el-select>
                            </el-col>
                            </el-form>
                            <el-col :span="2" class="write-title">选择日期：</el-col>
                            <el-col :md="9" :xl="6">
                                <el-date-picker v-model="rangeTime" type="daterange" range-separator="至"
                                start-placeholder="开始日期" end-placeholder="结束日期" size="mini">
                                </el-date-picker>
                                <el-date-picker v-model="fromInfo.startTime" type="month" size="small" placeholder="选择月" value-format="yyyy-MM-dd HH:mm:ss" :clearable="false"></el-date-picker>
                            </el-col>
                            <el-col :md="3" :xl="1" style="padding-top:3px;">
                                <el-button type="primary" @click="selectTable" size="small">查询</el-button>    
                            </el-col>
                            <el-col :md="3" :xl="2" style="padding-top:3px;">
                                <el-button type="primary" @click="selectTable" size="small">导出查询数据</el-button>    
                            </el-col>
                            <el-col :md="3" :xl="2" style="padding-top:3px;">
                                <el-button type="primary" @click="selectTable" size="small">导出所有</el-button>    
                            </el-col>
                            <el-col :span="2" style="padding-top:3px;padding-left:20px;">
                                <div class="out">
                                    <template>
                                        <download-excel class="export-excel-wrapper" :data="exportMonthList" :fields="parameterXLS" name="月台账.xls" >
                                            <el-button type="success" size="small">导出台账</el-button>
                                        </download-excel>
                                    </template>
                                </div>
                            </el-col>
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
                        <el-pagination background layout="prev, pager, next" :total="total" @current-change="selectPage"></el-pagination> 
                    </el-tab-pane>
                    <el-tab-pane label="历史台账下载" name="years">
                        <div style="min-height:650px">
                            <div class="nav-type nav-two">全部危废台账</div>
                            <div class="out">
                                <el-row class="m-top">
                                    <el-col :span="24" :offset="1">
                                        <template>
                                            <download-excel class="export-excel-wrapper" :data="allDetailData" :fields="parameterYsersXLS" name="全部危废台账.xls" >
                                                <el-button type="primary" style="width:200px;" size="small" @click.native="getAllParameter">导出全部危废台账</el-button>
                                            </download-excel>
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
                </el-tabs>     -->
            </div>
        </el-card>   
    </div>
</template>
<script>
// getYearsWasteParameter,
// import { getMonthWasteParameter,getWasteInfo,getFileParameter,getFileRecord,getWasteAllDetail } from '../../../assets/js/common'
import TablePackage from '../../../components/tablePackage.vue'
export default{
    name: "ParameterTable",
    components: { TablePackage },
    data() {
        return {
            from:{
                wasteCode:'',
                wasteType:'危废产生环节记录表',
            },
            //危废产生环节记录表
            productionData: [
                {
                    index:1,
                    batchCode:'HWCS20221024001',
                    time:'2022/10/24 10:00:00',
                    unitInternalName:'污泥',
                    nationalListName:'表面处理废物',
                    category:'HW17',
                    code:'336-064-17',
                    production:'0.5',
                    unit:'吨',
                    containerCode:'T1',
                    containerNumber:'1',
                    containerType:'桶',
                    facilityCode:'MF0001',
                    departmentHandlers:'李阳',
                    whereabouts:'危废仓库1',
                },
                {
                    index:2,
                    batchCode:'HWCS20221024002',
                    time:'2022/10/24 11:00:00',
                    unitInternalName:'磷化槽脚',
                    nationalListName:'表面处理废物',
                    category:'HW17',
                    code:'336-064-17',
                    production:'0.6',
                    unit:'吨',
                    containerCode:'T2',
                    containerNumber:'1',
                    containerType:'桶',
                    facilityCode:'MF0002',
                    departmentHandlers:'李阳',
                    whereabouts:'危废仓库1',
                }
            ],
            productionArr:[
                { name: "序号", prop: "index" },
                { name: "产生批次编码",width:'120px', prop: "batchCode" },
                { name: "产生时间",width:'120px', prop: "time" },
                { name: "危险废物名称",children:[
                    { name: '行业俗称/单位内部名称',prop:'unitInternalName',width:"200px" },
                    { name: '国家危险废物名录名称',prop:'nationalListName',width:"200px" },
                ] },
                { name: "危险废物类别", prop: "category",width:"150px" },
                { name: "危险废物代码", prop: "code",width:"150px" },
                { name: "容器/包装编码", prop: "containerCode",width:"120px" },
                { name: "容器/包装数量", prop: "containerNumber",width:"120px" },
                { name: "容器/包装类型", prop: "containerType",width:"120px" },
                { name: "产生部门经办人", prop: "departmentHandlers",width:"120px" },
                { name: "产生危险废物设施编码", prop: "facilityCode",width:"200px" },
                { name: "产生量", prop: "production" },
                { name: "计量单位", prop: "unit" },
                { name: "去向", prop: "whereabouts" },
            ],
            //危险废物入库环节记录表
            inStorageData:[
                {
                    index:1,
                    batchCode:'HWRK20221024001',
                    time:'2022/10/24 13:00:00',
                    unitInternalName:'污泥',
                    nationalListName:'表面处理废物',
                    category:'HW17',
                    code:'336-064-17',
                    production:'0.5',
                    unit:'吨',
                    containerCode:'T1',
                    containerNumber:'1',
                    containerType:'桶',
                    facilityCode:'TS001',
                    facilityType:'贮存库',
                    transportDepartmentHandlers:'赵龙',
                    departmentHandlers:'李阳',
                    hwGenerationBatchCode:'HWCS20221024001'
                },
                {
                    index:2,
                    batchCode:'HWRK20221024002',
                    time:'2022/10/24 14:00:00',
                    unitInternalName:'磷化槽脚',
                    nationalListName:'表面处理废物',
                    category:'HW17',
                    code:'336-064-17',
                    production:'0.6',
                    unit:'吨',
                    containerCode:'T2',
                    containerNumber:'1',
                    containerType:'桶',
                    facilityCode:'TS001',
                    facilityType:'贮存库',
                    transportDepartmentHandlers:'赵龙',
                    departmentHandlers:'李阳',
                    hwGenerationBatchCode:'HWCS20221024002'
                },
            ],
            inStorageArr:[
                { name: "序号", prop: "index" },
                { name: "入库批次编码",width:'120px', prop: "batchCode" },
                { name: "入库时间",width:'120px', prop: "time" },
                { name: "容器/包装编码", prop: "containerCode",width:"120px" },
                { name: "容器/包装数量", prop: "containerNumber",width:"120px" },
                { name: "容器/包装类型", prop: "containerType",width:"120px" },
                { name: "危险废物名称",children:[
                    { name: '行业俗称/单位内部名称',prop:'unitInternalName',width:"200px" },
                    { name: '国家危险废物名录名称',prop:'nationalListName',width:"200px" },
                ] },
                { name: "危险废物类别", prop: "category",width:"150px" },
                { name: "危险废物代码", prop: "code",width:"150px" },
                { name: "入库量", prop: "production" },
                { name: "计量单位", prop: "unit" },
                { name: "贮存设施编码", prop: "facilityCode",width:"150px" },
                { name: "贮存设施类型", prop: "facilityType",width:"150px" },
                { name: "运送部门经办人", prop: "transportDepartmentHandlers",width:"120px" },
                { name: "贮存部门经办人", prop: "departmentHandlers",width:"120px" },
                { name: "产生批次编码",width:'120px', prop: "hwGenerationBatchCode" },
            ],
            //危险废物出库环节记录表
            outboundData:[
                {
                    index:1,
                    batchCode:'HWRK20221024001',
                    time:'2022/10/25 13:00:00',
                    unitInternalName:'污泥',
                    nationalListName:'表面处理废物',
                    category:'HW17',
                    code:'336-064-17',
                    production:'0.5',
                    unit:'吨',
                    containerCode:'T1',
                    containerNumber:'1',
                    containerType:'桶',
                    facilityCode:'TS001',
                    facilityType:'贮存库',
                    transportDepartmentHandlers:'赵龙',
                    departmentHandlers:'李阳',
                    hwStorageInBatchCode:'HWRK20221024001',
                    whereabouts:'委外处置',
                },
                {
                    index:1,
                    batchCode:'HWCK20221025002',
                    time:'2022/10/25 15:00:00',
                    unitInternalName:'磷化槽脚',
                    nationalListName:'表面处理废物',
                    category:'HW17',
                    code:'336-064-17',
                    production:'0.6',
                    unit:'吨',
                    containerCode:'T2',
                    containerNumber:'1',
                    containerType:'桶',
                    facilityCode:'TS001',
                    facilityType:'贮存库',
                    transportDepartmentHandlers:'赵龙',
                    departmentHandlers:'李阳',
                    hwStorageInBatchCode:'HWRK20221024002',
                    whereabouts:'自行处置',
                }
            ],
            outboundArr:[
                { name: "序号", prop: "index" },
                { name: "出库批次编码",width:'120px', prop: "batchCode" },
                { name: "出库时间",width:'120px', prop: "time" },
                { name: "容器/包装编码", prop: "containerCode",width:"120px" },
                { name: "容器/包装数量", prop: "containerNumber",width:"120px" },
                { name: "容器/包装类型", prop: "containerType",width:"120px" },
                { name: "危险废物名称",children:[
                    { name: '行业俗称/单位内部名称',prop:'unitInternalName',width:"200px" },
                    { name: '国家危险废物名录名称',prop:'nationalListName',width:"200px" },
                ] },
                { name: "危险废物类别", prop: "category",width:"150px" },
                { name: "危险废物代码", prop: "code",width:"150px" },
                { name: "出库量", prop: "production" },
                { name: "计量单位", prop: "unit" },
                { name: "贮存设施编码", prop: "facilityCode",width:"150px" },
                { name: "贮存设施类型", prop: "facilityType",width:"150px" },
                { name: "出库部门经办人", prop: "transportDepartmentHandlers",width:"120px" },
                { name: "运送部门经办人", prop: "departmentHandlers",width:"120px" },
                { name: "入库批次编码",width:'120px', prop: "hwStorageInBatchCode" },
                { name: "去向",prop: "whereabouts" },
            ],
            //危险废物自行利用/处置环节记录表
            useData:[
                {
                    index:1,
                    batchCode:'HWZXCZ20221024001',
                    time:'2022/10/25 17:00:00',
                    unitInternalName:'磷化槽脚',
                    nationalListName:'表面处理废物',
                    category:'HW17',
                    code:'336-064-17',
                    production:'0.6',
                    unit:'吨',
                    containerCode:'T2',
                    containerNumber:'1',
                    containerType:'桶',
                    facilityCode:'TS002',
                    way:'填埋',
                    completionTime:'2022/10/25 17:00:00',
                    departmentHandlers:'李阳立',
                    hwStorageOutBatchCode:'HWCK20221025002'
                },
            ],
            useArr:[
                { name: "序号", prop: "index" },
                { name: "自行利用/处置批次编码", prop: "batchCode",width:'180px' },
                { name: "自行利用/处置时间", prop: "time",width:'160px' },
                { name: "容器/包装编码", prop: "containerCode",width:"120px" },
                { name: "容器/包装数量", prop: "containerNumber",width:"120px" },
                { name: "容器/包装类型", prop: "containerType",width:"120px" },
                { name: "危险废物名称",children:[
                    { name: '行业俗称/单位内部名称',prop:'unitInternalName',width:"200px" },
                    { name: '国家危险废物名录名称',prop:'nationalListName',width:"200px" },
                ] },
                { name: "危险废物类别", prop: "category",width:"150px" },
                { name: "危险废物代码", prop: "code",width:"150px" },
                { name: "自行利用/处置量", prop: "production",width:"150px" },
                { name: "计量单位", prop: "unit" },
                { name: "自行利用/处置设施编码", prop: "facilityCode",width:"180px" },
                { name: "自行利用/处置方式", prop: "way",width:"150px" },
                { name: "自行利用/处置完毕时间", prop: "completionTime",width:"180px" },
                { name: "自行利用/处置部门经办人", prop: "departmentHandlers",width:"180px" },
                { name: "产生批次编码/出库批次编码", prop: "hwStorageOutBatchCode",width:"200px" },
            ],
            //危险废物委外利用/处置记录表
            outsourcingData:[
                {
                    index: 1,
                    batchCode:'HWWWCZ20221024001',
                    time:'2022/10/25 14:00:00',
                    unitInternalName:'污泥',
                    nationalListName:'表面处理废物',
                    category:'HW17',
                    code:'336-064-17',
                    production:'0.5',
                    unit:'吨',
                    containerCode:'T1',
                    containerNumber:'1',
                    containerType:'桶',
                    way:'填埋',
                    receivingUnitType:'危险废物经营许可证持有单位',
                    unitName:'杭州赐翔环保科技有限公司',
                    licenseCode:'3301000210',
                    exemptManagementUnitName:'',
                    overseasUnitName:'',
                    overseasUnitExportApprovalNoticeNumber:'',
                    hwStorageOutBatchCode:'HWCK20221025001'
                }
            ],
            outsourcingArr:[
                { name: "序号", prop: "index" },
                { name: "委外利用/处置批次编码", prop: "batchCode",width:'180px' },
                { name: "出厂时间", prop: "time",width:'160px' },
                { name: "容器/包装编码", prop: "containerCode",width:"120px" },
                { name: "容器/包装数量", prop: "containerNumber",width:"120px" },
                { name: "容器/包装类型", prop: "containerType",width:"120px" },
                { name: "危险废物名称",children:[
                    { name: '行业俗称/单位内部名称',prop:'unitInternalName',width:"200px" },
                    { name: '国家危险废物名录名称',prop:'nationalListName',width:"200px" },
                ] },
                { name: "危险废物类别", prop: "category",width:"150px" },
                { name: "危险废物代码", prop: "code",width:"150px" },
                { name: "委外利用/处置量", prop: "production",width:"150px" },
                { name: "计量单位", prop: "unit" },
                { name: "利用/处置方式", prop: "way",width:"150px" },
                { name: "接收单位类型", prop: "receivingUnitType",width:"180px" },
                { name: "危险废物经营许可证持有单位", children:[
                    {name: "单位名称", prop: "unitName",width:"150px"},
                    {name: "许可证编码", prop: "licenseCode",width:"150px"},
                ]},
                {name: "单位名称", prop: "exemptManagementUnitName"},
                { name: "中华人民共和国境外的危险废物利用处置单位", children:[
                    {name: "单位名称", prop: "overseasUnitName",width:"150px"},
                    {name: "出口核准通知单编号", prop: "overseasUnitExportApprovalNoticeNumber",width:"180px"},
                ]},
                { name: "产生批次编码/出库批次编码", prop: "hwStorageOutBatchCode",width:"200px" },
            ],
            yearsList: [],
            allDetailData: [],
            exportMonthList: [],
            numData: [],
            rangeTime: [],
            // parameterXLS: {
            //     "企业名称": "companyName",
            //     "台账时间": "time",
            //     "废物代码": "wasteCode",
            //     // "危废类别":'hazardousWasteCategory',
            //     "入库数量(kg)": "inQuantity",
            //     "出库数量(kg)": "outQuantity",
            //     "危废处置类型": "disposalDestination",
            //     "危废处置去向": "destination",
            //     "危废处置去向单位": "destinationUnit",
            //     "累计贮存数量(kg)": "storageQuantity",
            //     "出库人": "preparerOut",
            //     "备注": "remarks",
            // },
            // parameterYsersXLS: {
            //     "企业名称": "companyName",
            //     "台账时间": "operationTime",
            //     "废物代码": "codeName",
            //     // "危废类别":'hazardousWasteCategory',
            //     "入库数量(kg)": "inboundWeight",
            //     "出库数量(kg)": "outboundWeight",
            //     "危废处置类型": "disposalDestination",
            //     "危废处置去向": "destination",
            //     "危废处置去向单位": "destinationUnit",
            //     "累计贮存数量(kg)": "cumulativeWeight",
            //     // "入库人":'preparerIn',
            //     // "出库人":'preparerOut',
            //     //  "备注":'remarks',
            // },
            // fromInfo: {
                // preTime:"",
                // pageNum:0,
                // pageSize:20,
                // wasteCode: "",
                // startTime: "",
                // endTime: "",
                // wasteType: "",
            // },
            yearsTime: [],
            fromYearsInfo: {
                startDate: "",
                endDate: "",
                // pageNum:0,
                // pageSize:20,
                wasteCode: "",
            },
            preMonthTime: "",
            preYearTime: "",
            activeTab: "month",
            total: 0,
            yearsTotal: 0,
            attachmentInfo: {
                wasteCode: "",
                preTime: "",
                // pageNum:0,
                // pageSize:1000000,
            },
            wasteList: [],
            wasteTypeList: [
                { value: "危废产生环节记录表", label: "危废产生环节记录表" },
                { value: "危险废物入库环节记录表", label: "危险废物入库环节记录表" },
                { value: "危险废物出库环节记录表", label: "危险废物出库环节记录表" },
                { value: "危险废物自行利用/处置环节记录表", label: "危险废物自行利用/处置环节记录表" },
                { value: "危险废物委外利用/处置记录表", label: "危险废物委外利用/处置记录表" },
            ]
        };
    },
    created() {
        let time = new Date();
        let month = (time.getMonth() + 1) >= 10 ? (time.getMonth() + 1) : "0" + (time.getMonth() + 1);
        this.preMonthTime = time.getFullYear() + "-" + month + "-01 00:00:00";
        // this.fromInfo.startTime = this.preMonthTime;
        this.preYearTime = time.getFullYear() + "-01-01 00:00:00";
        // this.fromYearsInfo.preTime = this.preYearTime;
        // this.getExportMonthList();
        // this.getExportYearsList();
        // this.getList();
        // this.getWasteList("");
    },
    methods: {
        selectTable() {
            this.fromYearsInfo.pageNum = 0;
            this.from.pageNum = 0;
            if (this.activeTab == "years") {
                this.getAllParameter();
                return;
            }
            ;
            if (this.from.wasteCode == "请选择") {
                this.from.wasteCode = "";
            }
            // this.getList();
        },
        isType(type) {
            let state = "";
            switch (type) {
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
        isUnit(type) {
            let state = "";
            switch (type) {
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
        selectPage(val) {
            if (this.activeTab == "years") {
                this.fromYearsInfo.pageNum = val - 1;
                this.getAllParameter();
                return;
            }
            ;
            this.from.pageNum = val - 1;
            // this.getList();
        },
        //tab切换
        // switchTab() {
        //     this.total = 0;
        //     this.yearsTotal = 0;
        //     this.fromInfo.preTime = "";
        //     this.fromInfo.wasteCode = "";
        //     if (this.activeTab == "years") {
        //         // this.getAllParameter();
        //         return;
        //     }
        //     ;
        //     this.getList();
        // },
        //获取全部危废台账
        // async getAllParameter() {
        //     const res = await getWasteAllDetail({ wasteCode: "" });
        //     if (res?.code == "1") {
        //         // this.allDetailData = res.data;
        //         this.downWordFile(res.data, "all");
        //     }
        // },
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
        // async getList() {
        //     this.fromInfo.endTime = this.fromInfo.startTime;
        //     const res = await getMonthWasteParameter(this.fromInfo);
        //     if (res?.code == "1") {
        //         this.data = res.data;
        //         // this.total = res.data.total;
        //     }
        // },
        //获取导出月台账数据
        // async getExportMonthList(){
        //     const res = await getMonthWasteParameter({pageNum:0,pageSize:100000,preTime:this.preMonthTime});
        //     if(res?.code == "1"){
        //         this.exportMonthList = res.data.list;
        //     }
        // },
        //获取危废列表
        // async getWasteList(val) {
        //     const res = await getWasteInfo(val);
        //     if (res?.code == "1") {
        //         this.wasteList = res.data;
        //         this.wasteList.unshift({ wasteCode: "请选择" });
        //         // if(res.data.length != 0){
        //         //     res.data.forEach(item => {
        //         //         this.wasteList.push({value:item.wasteCode,text:item.wasteCode})
        //         //     })
        //         // }
        //     }
        // },
        //选择日期
        selectYearsTime() {
            // console.log(this.fromYearsInfo.preTime)
            if (this.fromYearsInfo.preTime == null) {
                this.fromYearsInfo.preTime = "";
            }
        },
        selectTime() {
            console.log(123);
        },
        //下载附件
        // async downFile(type) {
        //     if (this.attachmentInfo.wasteCode == "") {
        //         this.$message({
        //             message: "请选择废物代码",
        //             type: "error"
        //         });
        //         return;
        //     }
        //     if (this.attachmentInfo.preTime == "") {
        //         this.$message({
        //             message: "请选择日期",
        //             type: "error"
        //         });
        //         return;
        //     }
        //     if (type == "num") {
        //         const resList = await getFileParameter(this.attachmentInfo);
        //         if (resList?.code == "1") {
        //             this.downWordFile(resList.data, type);
        //         }
        //         else {
        //             this.$message({
        //                 message: resList.msg,
        //                 type: "error"
        //             });
        //         }
        //     }
        //     else {
        //         const resa = await getFileRecord(this.attachmentInfo);
        //         if (resa?.code == "1") {
        //             this.downWordFile(resa.data, type);
        //         }
        //         else {
        //             this.$message({
        //                 message: resa.msg,
        //                 type: "error"
        //             });
        //         }
        //     }
        // },
        //下载Word文件
        downWordFile(type) {
            const arr1 = ['危废产生环节记录表', '危险废物入库环节记录表', '危险废物出库环节记录表', '危险废物自行利用/处置环节记录表', '危险废物委外利用/处置记录表'];
            const urlArr = [
                'https://zjlianweihoss.oss-cn-hangzhou.aliyuncs.com/file/1666600200686-产生环节.xlsx',
                'https://zjlianweihoss.oss-cn-hangzhou.aliyuncs.com/file/1666600239835-入库环节.xlsx',
                'https://zjlianweihoss.oss-cn-hangzhou.aliyuncs.com/file/1666600260546-出库环节.xlsx',
                'https://zjlianweihoss.oss-cn-hangzhou.aliyuncs.com/file/1666600314477-自行利用环节.xlsx',
                'https://zjlianweihoss.oss-cn-hangzhou.aliyuncs.com/file/1666600289328-委外处置环节.xlsx'
            ];

            if (!type){
                window.open(urlArr[arr1.indexOf(this.from.wasteType)]);
            } else {
                window.open('https://zjlianweihoss.oss-cn-hangzhou.aliyuncs.com/file/1666600200686-产生环节.xlsx');
                window.open('https://zjlianweihoss.oss-cn-hangzhou.aliyuncs.com/file/1666600239835-入库环节.xlsx');
                window.open('https://zjlianweihoss.oss-cn-hangzhou.aliyuncs.com/file/1666600260546-出库环节.xlsx');
                window.open('https://zjlianweihoss.oss-cn-hangzhou.aliyuncs.com/file/1666600314477-自行利用环节.xlsx');
                window.open('https://zjlianweihoss.oss-cn-hangzhou.aliyuncs.com/file/1666600289328-委外处置环节.xlsx');
                console.log('执行了')
                urlArr.forEach(url => {
                    const iframe = document.createElement("iframe");
                    iframe.style.display = "none"; // 防止影响页面
                    iframe.style.height = 0; // 防止影响页面
                    iframe.src = url; 
                    document.body.appendChild(iframe); // 这一行必须，iframe挂在到dom树上才会发请求
                    // 5分钟之后删除（onload方法对于下载链接不起作用，就先抠脚一下吧）
                    setTimeout(()=>{
                        iframe.remove();
                    }, 5 * 60 * 1000);
                });
            }

            
            
            // console.log(arr1.indexOf(this.from.wasteType));
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
    },
    
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
    .card-title {
        color: rgb(131, 130, 130);
        border-bottom: 2px solid #eee;
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
    .searchList{
        display: flex;
        min-width: 1200px;
        .list{
            width: 20%;
            display: flex;
        }
        .list-left{
            width: 35%;
            line-height: 30px;
        }
        .dateSelect{
            width: 35%;
            display: flex;
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