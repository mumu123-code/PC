<template>
    <div class="addInfoCon">
        <div class="title">标签配置信息</div>
        <el-card>
            <div class="card-title">标签信息填写</div>
            <div class="info-list">
                <el-row class="info-detail">
                    <el-col :span="2" class="info-title">危废代码：</el-col>
                    <el-col :span="10" class="con">
                        <el-input size="small" v-model="addInfoForm.wasteCode" @input="searchCode"></el-input>
                        <div class="select-list" v-if="isShowSelect">
                            <div class="lists" v-for="(item,i) in retrieveCodeData" :key="i" @click="selectCode(item.code)">
                                {{item.code}}
                            </div>
                        </div>
                    </el-col>
                     <el-col :span="3" class="info-title">危废名称：</el-col>
                    <el-col :span="9">
                        <el-input size="small" v-model="addInfoForm.wasteName"></el-input>
                    </el-col>
                    <!-- <el-col :span="2" class="info-title">废物代码和名称：</el-col>
                    <el-col :span="10" class="con">
                        <el-input size="small" v-model="addInfoForm.wasteCode"></el-input>
                        <div class="select-list" v-if="isShowSelect">
                            <div class="lists" v-for="(item,i) in wasteList" :key="i" @click="selectCode(item.wasteCode)">
                                {{item.wasteCode}}
                            </div>
                        </div>
                    </el-col> -->
                </el-row>
                <el-row class="info-detail">
                    <el-col :span="2" class="info-title">包装方式：</el-col>
                    <el-col :span="10">
                        <!-- <el-input size="small" v-model="addInfoForm.hwDictCode"></el-input> -->
                        <el-select v-model="addInfoForm.wastePackaging" placeholder="请选择" size="small" style="width:100%">
                            <el-option v-for="item in unitData" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </el-col>
                    <el-col :span="3" class="info-title">主要成分：</el-col>
                    <el-col :span="9">
                        <el-input size="small" v-model="addInfoForm.mainComponents"></el-input>
                    </el-col>
                    <!-- <el-col :span="3" class="info-title">危废协议到期时间：</el-col>
                    <el-col :span="9">
                        <el-date-picker v-model="addInfoForm.effectiveTime" size="small" style="width:100%" type="date" value-format="yyyy-MM-dd 00:00:00" placeholder="选择日期"></el-date-picker>
                    </el-col> -->
                </el-row>
                <el-row class="info-detail">
                    <el-col :span="2" class="info-title">安全措施：</el-col>
                    <el-col :span="10">
                        <el-select v-model="addInfoForm.safetyMeasures" placeholder="请选择" size="small" style="width:100%">
                            <el-option v-for="item in securityMeasuresData" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </el-col>
                    <el-col :span="3" class="info-title">去向：</el-col>
                    <el-col :span="9">
                        <el-select v-model="addInfoForm.type" placeholder="请选择" size="small" style="width:100%">
                            <el-option v-for="item in whereData" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </el-col>
                </el-row>
                <el-row class="info-detail" v-if="addInfoForm.type == '自行处置' || addInfoForm.type == '自行利用'">
                    <el-col :span="2" class="info-title">部门经办人：</el-col>
                    <el-col :span="6">
                        <el-input size="small" v-model="addInfoForm.internalDepartmentHandlers"></el-input>
                    </el-col>
                    <el-col :span="2" class="info-title">设施编码：</el-col>
                    <el-col :span="6">
                        <el-input size="small" v-model="addInfoForm.internalFacilityCode"></el-input>
                    </el-col>
                    <el-col :span="2" class="info-title">自行利用处置方式：</el-col>
                    <el-col :span="6" v-if="addInfoForm.type == '自行处置' || addInfoForm.type == '委外处置'">
                        <el-select v-model="addInfoForm.externalWayCode" placeholder="请选择" size="small" style="width:100%">
                            <el-option v-for="item in disposalData" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </el-col>
                    <el-col :span="6" v-if="addInfoForm.type == '自行利用' || addInfoForm.type == '委外利用'">
                        <el-select v-model="addInfoForm.externalWayCode" placeholder="请选择" size="small" style="width:100%">
                            <el-option v-for="item in disposalList" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </el-col>
                </el-row>
                <el-row class="info-detail" v-if="addInfoForm.type == '委外处置' || addInfoForm.type == '委外利用'">
                    <el-col :span="2" class="info-title">委外单位：</el-col>
                    <el-col :span="6">
                        <el-select v-model="addInfoForm.externalUnitInfoIds" placeholder="请选择" size="small" style="width:100%" :multiple="true">
                            <el-option v-for="item in companyData" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </el-col>
                    <el-col :span="2" class="info-title">利用/处置费用：</el-col>
                    <el-col :span="6">
                        <el-input size="small" v-model="addInfoForm.externalCost"></el-input>
                    </el-col>
                    <el-col :span="2" class="info-title">委外处置方式：</el-col>
                    <el-col :span="6" v-if="addInfoForm.type == '自行处置' || addInfoForm.type == '委外处置'">
                        <el-select v-model="addInfoForm.externalWayCode" placeholder="请选择" size="small" style="width:100%">
                            <el-option v-for="item in disposalData" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </el-col>
                    <el-col :span="6" v-if="addInfoForm.type == '自行利用' || addInfoForm.type == '委外利用'">
                        <el-select v-model="addInfoForm.externalWayCode" placeholder="请选择" size="small" style="width:100%">
                            <el-option v-for="item in disposalList" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </el-col>
                </el-row>
                <el-row class="info-detail">
                    <el-col :span="2" class="info-title">电子秤类型：</el-col>
                    <el-col :span="9" style="padding-top:5px;">
                        <el-checkbox-group v-model="selectScalesList">
                            <el-checkbox v-for="(item,i) in scalesData" :key="i" :label="item.value" name="type">{{item.label}}</el-checkbox> 
                        </el-checkbox-group>
                        <!-- <el-select v-model="addInfoForm.scalesType" placeholder="请选择" size="small" style="width:100%">
                            <el-option v-for="item in scalesData" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select> -->
                    </el-col>
                </el-row>
                <el-row class="info-detail">
                    <el-col :span="2" class="info-title">危险情况：</el-col>
                    <el-col :span="11" style="padding-top:5px;">
                        <el-checkbox-group v-model="dangerousSituation">
                            <el-checkbox v-for="(item,i) in multData" :key="i" :label="item.text" name="type"></el-checkbox> 
                        </el-checkbox-group>
                    </el-col> 
                </el-row>
                <el-row class="info-detail">
                    <el-col :span="2" class="info-title">选择贮存设施：</el-col>
                    <el-col :span="22" style="padding-top:5px;">
                        <el-checkbox-group v-model="storage">
                            <el-checkbox v-for="(item,i) in storageList" :key="i" :label="item.id" name="type">{{item.name}}</el-checkbox> 
                        </el-checkbox-group>
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
                        <!-- <el-table-column prop="scalesTypes" label="电子秤类型" width="230">
                            <template slot-scope="scope">
                                {{ disposeType(scope.row.scalesTypes) }}
                            </template>
                        </el-table-column> -->
                        <el-table-column prop="wasteCode" label="危废代码和名称" width="230">
                            <template slot-scope="scope">
                                <div>
                                    {{scope.row.wasteCode}}{{scope.row.wasteName}}
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column prop="wastePackaging" label="包装方式" width="100"></el-table-column>
                        <el-table-column prop="warehouses" label="仓库" width="230">
                            <template slot-scope="scope">
                                {{ disposeStorage(scope.row.hwStorageFacilityInfoIds) }}
                            </template>
                        </el-table-column>
                        <el-table-column prop="type" label="去向" width="200"></el-table-column>
                        <el-table-column prop="internalDepartmentHandlers" label="自行利用/处置部门经办人" width="200"></el-table-column>
                        <el-table-column prop="internalFacilityCode" label="设施编码" width="200"></el-table-column>
                        <el-table-column prop="internalWayCode" label="自行处置方式" width="200">
                            <template slot-scope="scope">
                                <div>
                                    {{disposeInternalWayCode(scope.row.internalWayCode)}}
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column prop="externalCost" label="委外单位" width="200">
                            <template slot-scope="scope">
                                <div>
                                    {{disposeUnitName(scope.row.hwExternalUnitInfoEntities)}}
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column prop="externalCost" label="利用/处置费用" width="200"></el-table-column>
                        <el-table-column prop="externalWayCode" label="委外处置方式" width="200">
                            <template slot-scope="scope">
                                <div>
                                    {{disposeExternalWayCode(scope.row.externalWayCode)}}
                                </div>
                            </template>
                        </el-table-column>
                        <!-- <el-table-column prop="companyName" label="企业名称" width="300"></el-table-column> -->
                        <!-- <el-table-column prop="effectiveTime" label="危废协议到期时间" width="200"></el-table-column> -->
                        <el-table-column prop="mainComponents" label="主要成分" width="200"></el-table-column>
                        <el-table-column prop="wasteCode" label="化学成分" width="200"></el-table-column>
                        <el-table-column prop="dangerousSituation" label="危险情况" width="300"></el-table-column>
                        <el-table-column prop="safetyMeasures" label="安全措施" width="200"></el-table-column>
                        <!-- <el-table-column prop="managerName" label="联系人" width="100"></el-table-column>
                        <el-table-column prop="phone" label="电话" width="200"></el-table-column> -->
                        <el-table-column prop="recoverAmount" label="操作" width="80" fixed="right">
                            <template slot-scope="scope">
                                <el-button type="primary" size="mini" @click.native="editInfo(scope.row)">修改</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <!-- <el-pagination background layout="prev, pager, next" :total="total" @current-change="selectPage"></el-pagination> -->
                </el-row>

            </div>
        </el-card>

        <!-- 编辑弹框 -->
        <el-dialog title="修改标签信息" :visible.sync="showModel" width="800px" :before-close="hideModel">
            <div class="model-con">
                <el-row class="model-list">
                    <el-col :span="4" class="info-title">电子秤类型：</el-col>
                    <el-col :span="18" style="padding-top:5px;">
                        <el-checkbox-group v-model="editInfoForm.scalesTypes">
                            <el-checkbox v-for="(item,i) in scalesData" :key="i" :label="item.value" name="type">{{item.label}}</el-checkbox> 
                        </el-checkbox-group>
                        <!-- <el-select v-model="editInfoForm.scalesType" placeholder="请选择" size="small" style="width:100%">
                            <el-option v-for="item in scalesData" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select> -->
                    </el-col>
                </el-row>
                <el-row class="model-list">
                    <el-col :span="4" class="info-title">危废代码：</el-col>
                    <el-col :span="18" class="con">
                        <el-input size="small" v-model="editInfoForm.wasteCode" @input="editSearchCode"></el-input>
                        <div class="select-list" v-if="isShowEditSelect">
                            <div class="lists" v-for="(item,i) in retrieveCodeData" :key="i" @click="editSelectCode(item.code)">
                                {{item.code}}
                            </div>
                        </div>
                    </el-col>
                </el-row>
                <el-row class="model-list">
                    <el-col :span="4" class="info-title">危废名称：</el-col>
                    <el-col :span="18"><el-input size="small" v-model="editInfoForm.wasteName"></el-input></el-col>
                </el-row>
                <el-row class="model-list">
                    <el-col :span="4" class="info-title">包装方式：</el-col>
                    <el-col :span="18">
                        <el-select v-model="editInfoForm.wastePackaging" placeholder="请选择" size="small" style="width:100%">
                            <el-option v-for="item in unitData" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </el-col>
                </el-row>
                <el-row class="model-list">
                    <el-col :span="4" class="info-title">去向：</el-col>
                    <el-col :span="18">
                        <el-select v-model="editInfoForm.type" placeholder="请选择" size="small" style="width:100%">
                            <el-option v-for="item in whereData" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </el-col>
                </el-row>
                <div v-if="editInfoForm.type == '自行处置' || editInfoForm.type == '自行利用'">
                    <el-row class="model-list">
                        <el-col :span="4" class="info-title">部门经办人：</el-col>
                        <el-col :span="18">
                            <el-input size="small" v-model="editInfoForm.internalDepartmentHandlers"></el-input>
                        </el-col>
                    </el-row>
                    <el-row class="model-list">
                        <el-col :span="4" class="info-title">设施编码：</el-col>
                        <el-col :span="18">
                            <el-input size="small" v-model="editInfoForm.internalFacilityCode"></el-input>
                        </el-col>
                    </el-row>
                    <el-row class="model-list">
                        <el-col :span="4" class="info-title">自行利用处置方式：</el-col>
                        <el-col :span="18" v-if="editInfoForm.type == '自行处置' || editInfoForm.type == '委外处置'">
                            <el-select v-model="editInfoForm.internalWayCode" placeholder="请选择" size="small" style="width:100%">
                                <el-option v-for="item in disposalData" :key="item.value" :label="item.label" :value="item.value"></el-option>
                            </el-select>
                        </el-col>
                        <el-col :span="18" v-if="editInfoForm.type == '自行利用' || editInfoForm.type == '委外利用'">
                            <el-select v-model="editInfoForm.internalWayCode" placeholder="请选择" size="small" style="width:100%">
                                <el-option v-for="item in disposalList" :key="item.value" :label="item.label" :value="item.value"></el-option>
                            </el-select>
                        </el-col>
                    </el-row>
                </div>
                <div v-if="editInfoForm.type == '委外处置' || editInfoForm.type == '委外利用'">
                    <el-row class="model-list">
                        <el-col :span="4" class="info-title">委外单位：</el-col>
                        <el-col :span="18">
                            <el-select v-model="editInfoForm.externalUnitInfoIds" placeholder="请选择" size="small" style="width:100%" :multiple="true">
                                <el-option v-for="item in companyData" :key="item.value" :label="item.label" :value="item.value"></el-option>
                            </el-select>
                        </el-col>
                    </el-row>
                    <el-row class="model-list">
                        <el-col :span="4" class="info-title">利用/处置费用：</el-col>
                        <el-col :span="18">
                            <el-input size="small" v-model="editInfoForm.externalCost"></el-input>
                        </el-col>
                    </el-row>
                    <el-row class="model-list">
                        <el-col :span="4" class="info-title">委外处置方式：</el-col>
                        <el-col :span="18" v-if="editInfoForm.type == '自行处置' || editInfoForm.type == '委外处置'">
                            <el-select v-model="editInfoForm.externalWayCode" placeholder="请选择" size="small" style="width:100%">
                                <el-option v-for="item in disposalData" :key="item.value" :label="item.label" :value="item.value"></el-option>
                            </el-select>
                        </el-col>
                        <el-col :span="18" v-if="editInfoForm.type == '自行利用' || editInfoForm.type == '委外利用'">
                            <el-select v-model="editInfoForm.externalWayCode" placeholder="请选择" size="small" style="width:100%">
                                <el-option v-for="item in disposalList" :key="item.value" :label="item.label" :value="item.value"></el-option>
                            </el-select>
                        </el-col>
                    </el-row>
                </div>
                <!-- <el-row class="model-list">
                    <el-col :span="4" class="info-title">危废协议到期时间：</el-col>
                    <el-col :span="18">
                        <el-date-picker v-model="editInfoForm.effectiveTime" size="small" style="width:100%" type="date" value-format="yyyy-MM-dd 00:00:00" placeholder="选择日期"></el-date-picker>
                    </el-col>
                </el-row> -->
                <el-row class="model-list">
                    <el-col :span="4" class="info-title">主要成分：</el-col>
                    <el-col :span="18"><el-input size="small" v-model="editInfoForm.mainComponents"></el-input></el-col> 
                </el-row>
                <el-row class="model-list">
                    <el-col :span="4" class="info-title">安全措施：</el-col>
                    <el-col :span="18">
                        <el-select v-model="editInfoForm.safetyMeasures" placeholder="请选择" size="small" style="width:100%">
                            <el-option v-for="item in securityMeasuresData" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </el-col>
                </el-row>
                <el-row class="model-list">
                    <el-col :span="4" class="info-title">危险情况：</el-col>
                    <el-col :span="18" style="padding-top:5px;">
                        <el-checkbox-group v-model="editDangerousSituation">
                            <el-checkbox v-for="(item,i) in multData" :key="i" :label="item.text" name="type"></el-checkbox>
                        </el-checkbox-group>
                    </el-col>
                </el-row>
                <el-row class="model-list">
                    <el-col :span="4" class="info-title">选择贮存设施：</el-col>
                    <el-col :span="18" style="padding-top:5px;">
                        <el-checkbox-group v-model="editStorage">
                            <el-checkbox v-for="(item,i) in storageList" :key="i" :label="item.id" name="type">{{item.name}}</el-checkbox> 
                        </el-checkbox-group>
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
import { addConfigurationInfo,getConfigurationInfoList,editConfigurationInfo,getStorageList,getHwDictList,getDisposalUnit,getVoluntarilyDisposal } from '../../../assets/js/common'
export default {
    name: "addInfoCon",
    data() {
        return {
            addInfoForm: {
                // scalesType:0,
                scalesTypes:[],
                wasteCode:"",
                externalUnitInfoIds:[],
                // hwDictCode:"",
                wasteName:"",
                wastePackaging:"袋",
                // effectiveTime:"",
                mainComponents:"",
                dangerousSituation:"",
                safetyMeasures:"",
                hwStorageFacilityInfoPOS:[],
                type:'',
                internalWayCode:'',
                internalFacilityCode:"",
                internalDepartmentHandlers:"",
                externalCost:"",
                externalWayCode:"",
            }, //提交信息
            idx: 0,
            addInfoTableData: [], //信息列表
            showModel:false,
            editDangerousSituation:[],
            editInfoForm:{},
            total:0,
            selectScalesList:[],//选择称
            scalesData:[
                { value: 0, label: "标准秤" },
                { value: 1, label: "累加秤" },
                // { value: 2, label: "液位秤" },
            ],
            unitData:[
                { value: "袋", text: "袋" },
                { value: "桶", text: "桶" },
                { value: "罐", text: "罐" },
                { value: "箱", text: "箱" },
            ],
            dangerousSituation:[], //选中危险情况
            multData:[              //危险情况类型
                // { text: '毒性',val: "毒性" },
                // { text: '腐蚀性',val: "腐蚀性" },
                // { text: '易燃性',val: "易燃性" },
                // { text: '反应性',val: "反应性" },
                // { text: '感染性',val: "感染性" },
                {val:"爆炸性",text:"爆炸性"},
                {val:"有毒",text:"有毒"},
                {val:"易燃",text:"易燃"},
                {val:"有害",text:"有害"},
                {val:"助燃",text:"助燃"},
                {val:"腐蚀性",text:"腐蚀性"},
                {val:"刺激性",text:"刺激性"},
                {val:"石棉",text:"石棉"},
            ],
            securityMeasuresData:[
                {value:"放置在阴凉通风处，远离明火，密封保存",label:"放置在阴凉通风处，远离明火，密封保存"},
                {value:"防腐、防渗吨袋",label:"防腐、防渗吨袋"},
                {value:"防腐、防渗密闭容器",label:"防腐、防渗密闭容器"},
                {value:"防腐、防渗密闭吨桶",label:"防腐、防渗密闭吨桶"},
                {value:"不锈钢储罐",label:"不锈钢储罐"},
                {value:"PP储罐",label:"PP储罐"},
                {value:"切勿放近易燃物质",label:"切勿放近易燃物质"},
            ],
            whereData:[
                {value:"委外处置",label:"委外处置"},
                {value:"委外利用",label:"委外利用"},
                {value:"自行处置",label:"自行处置"},
                {value:"自行利用",label:"自行利用"},
            ],
            disposalData:[], //委外处置类型
            disposalList:[],    //自行利用处置类型
            companyData:[],//委外处置委外单位
            storage:[],
            storageList:[],
            editStorage:[],
            isShowSelect:false,
            wasteList:[],
            retrieveCodeData:[],
            isShowEditSelect:false,
        };
    },
    mounted(){
        this.getStorage();
        this.getList();
        this.getCodeList();
        this.getUnit();
        this.getVoluntarilyDisposalList(true);
        this.getVoluntarilyDisposalList(false);
    },
    methods: {
        //获取委外单位
        async getUnit(){
            const res = await getDisposalUnit();
            if(res?.code == "1"){
                if(res.data.length != 0){
                    res.data.forEach(item => {
                        this.companyData.push({value:item.id,label:item.name})
                    })
                }
            }
        },
        //获取自行处置方式
        async getVoluntarilyDisposalList(state){
            this.disposalData.length = 0;
            this.disposalList.length = 0;
            const res = await getVoluntarilyDisposal({use:state});
            if(res.code == "1"){
                res.data.forEach(item => {
                    state ? this.disposalList.push({value:item.code,label:item.name}) : this.disposalData.push({value:item.code,label:item.name});
                })
            }
        },
        disposeUnitName(val){
            let str = "";
            // val != null ? str = val.name : "";
            if(val.length != 0){
                val.forEach(item=>{
                    str += item.name+","
                })
            }
            return str;
        },
        disposeInternalWayCode(val){
            let str = "";
            let list = this.disposalData.concat(this.disposalList);
            list.forEach(item =>{
                if(item.value == val){
                    str = item.label;
                }
            })
            return str;
        },
        disposeExternalWayCode(val){
            let str = "";
            let list = this.disposalData.concat(this.disposalList);
            list.forEach(item =>{
                if(item.value == val){
                    str = item.label;
                }
            })
            return str;
        },
        selectCode(val){ 
            this.isShowSelect = false;
            this.addInfoForm.wasteCode = val;
        },
        editSelectCode(val){
            this.isShowEditSelect = false;
            this.editInfoForm.wasteCode = val;
        },
        //搜索代码和名称
        searchCode(){
            if(this.addInfoForm.wasteCode.length <= 3){
                this.isShowSelect = false;
            }
            if(this.addInfoForm.wasteCode.length >= 3){
                this.retrieveCodeData.length = 0;
                this.retrieveCode("add");
            }
        },
        editSearchCode(){
            if(this.editInfoForm.wasteCode.length <= 3){
                this.isShowEditSelect = false;
            }
            if(this.editInfoForm.wasteCode.length >= 3){
                this.retrieveCodeData.length = 0;
                this.retrieveCode("model");
            }
        },

        
        //查询用户输入code数据
        retrieveCode(type){
            this.wasteList.forEach(item => {
                if(type == "add"){
                    if(item.code.indexOf(this.addInfoForm.wasteCode) != -1){
                        this.isShowSelect = true;
                        this.retrieveCodeData.push(item)
                    }
                    return
                }
                if(item.code.indexOf(this.editInfoForm.wasteCode) != -1){
                    this.isShowEditSelect = true;
                    this.retrieveCodeData.push(item)
                }
            })
        },

        // 获取国标危废代码字典
        async getCodeList(){
            const res = await getHwDictList();
            if(res?.code == "1"){
                this.wasteList = res.data;
            }
        },
        
        //添加一条
        addInfoList() {
            this.idx = this.idx++;
            this.addInfoForm.push({ idx: this.idx ,name:""});
        },
        
        //获取仓库列表
        async getStorage(){
            const res = await getStorageList();
            if(res?.code == "1"){
                this.storageList = res.data;
            }
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
            this.addInfoForm.scalesTypes = this.selectScalesList;
            if(!this.isFormValNull(this.addInfoForm)){
                return;
            };
            if(this.storage.length == 0){
                this.$message.error("请选择仓库");
                return false;
            }
            this.storage.forEach((item)=>{
                this.addInfoForm.hwStorageFacilityInfoPOS.push({id:item});
            })
            const res = await addConfigurationInfo(this.addInfoForm);
            if(res?.code == "1"){
                this.$message.success("添加成功");
                this.addInfoForm = {
                    scalesTypes:[],
                    wasteCode:"",
                    externalUnitInfoIds:[],
                    // hwDictCode:"",
                    wasteName:"",
                    wastePackaging:"袋",
                    // effectiveTime:"",
                    mainComponents:"",
                    dangerousSituation:"",
                    safetyMeasures:"",
                    hwStorageFacilityInfoPOS:[],
                    type:'',
                    internalWayCode:'',
                    internalFacilityCode:"",
                    internalDepartmentHandlers:"",
                    externalCost:"",
                    externalWayCode:"",
                } 
                this.selectScalesList = [];
                this.storage = [];
                this.dangerousSituation = [];
                this.addInfoForm.scalesTypes = [];
                this.addInfoForm.hwStorageFacilityInfoPOS = [];
                this.getList();
            }else{
                this.$message.error(res.msg);
            }
        },

        // //表格下一页
        // selectPage(val){
        //     this.getList();
        // },
        //获取信息列表
        async getList(){
            const res = await getConfigurationInfoList();
            if(res?.code == "1"){
                this.addInfoTableData = res.data;
                // this.total = res.data.total;
            }else{
                this.$message.error(res.msg);
            }
        },

        //修改信息
        editInfo(val) {
            this.editInfoForm = val;
            console.log(val,'val');
            this.editDangerousSituation = val.dangerousSituation.split(",");
            console.log(val.hwStorageFacilityInfoIds)
            if(val.hwStorageFacilityInfoIds.length!=0){
                val.hwStorageFacilityInfoIds.forEach(item =>{
                    this.editStorage.push(item);
                })
            }
            this.showModel = true;
        },
        
        //处理称类型
        disposeType(val){
            console.log(val)
            let str = "";
            val.forEach(item=>{
                switch(item){
                    case 0:
                        str += "标准称,";
                    break;
                    case 1:
                        str += "累加称,";
                    break;
                    case 2:
                        str += "液位称,";
                    break;
                }
            })
            return str;
        },
        
        //处理仓库名称
        disposeStorage(val){
            let str = "";
            val.forEach(item => {
                this.storageList.forEach((val)=>{
                    if(item == val.id){
                        str += val.name + ",";
                    }
                })
            })
            return str;
        },

        //判断属性值是否为空
        isFormValNull(state){
            // if(state.wasteCode == ""){
            //     this.$message.error("废物代码和废物名称不能为空");
            //     return false;
            // }
            if(state.wasteCode == ""){
                this.$message.error("废物代码不能为空");
                return false;
            }
            if(state.wasteName == ""){
                this.$message.error("废物名称不能为空");
                return false;
            }
            // if(state.effectiveTime == ""){
            //     this.$message.error("危废协议到期时间不能为空");
            //     return false;
            // }
            if(state.mainComponents == ""){
                this.$message.error("主要成分不能为空");
                return false;
            }
            if(state.safetyMeasures == ""){
                this.$message.error("安全措施不能为空");
                return false;
            }
            if(state.scalesTypes.length == 0){
                this.$message.error("请选择称的类型")
                return;
            }
            if(state.dangerousSituation == ""){
                this.$message.error("请选择危险情况");
                return false;
            }
           
            return true;
        },

        //保存修改信息
        async addEditInfo(){ 
            if(this.editStorage.length == 0){
                this.$message.error("请选择仓库");
                return false;
            }
            // console.log(this.editInfoForm.hwStorageFacilityInfoPOS)
            this.editInfoForm.hwStorageFacilityInfoPOS = [];
            this.editStorage.forEach((item)=>{
                this.editInfoForm.hwStorageFacilityInfoPOS.push({id:item});
                console.log( this.editInfoForm.hwStorageFacilityInfoPOS)
            })
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
            if (this.editInfoForm.type == '自行处置' || this.editInfoForm.type == '自行利用'){
                this.editInfoForm.externalUnitInfoIds = [];
                this.editInfoForm.externalWayCode = '';
                this.editInfoForm.externalCost = "";
            }
            if (this.editInfoForm.type == '委外处置' || this.editInfoForm.type == '委外利用'){
                this.editInfoForm.internalDepartmentHandlers = '';
                this.editInfoForm.internalFacilityCode = '';
                this.editInfoForm.internalWayCode = '';
            }
            const res = await editConfigurationInfo(this.editInfoForm);
            if(res?.code == "1"){
                this.$message.success("修改成功");
                this.getList();
                this.editStorage.length = 0;
                this.hideModel();
            }else{
                this.$message.error(res.msg)
            }
        },

        //关闭模态框
        hideModel(){
            this.editStorage.length = 0;
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
.con{
    position: relative;
    .select-list{
        position: absolute;
        top: 30px;
        width: 100%;
        border: 1px solid #eee;
        z-index: 100;
        background: #fff;
        max-height: 200px;
        overflow: hidden;
        overflow-y: auto;
        .lists{
            line-height: 28px;
            padding: 3px 15px;
            font-size: 14px;
        }
        .lists:nth-child(even){
            background-color: #eee;
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