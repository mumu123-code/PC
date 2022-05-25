<template>
    <div class="activatedCarbon">
        <div class="carbonTitle">
            活性炭吸附设施运行维护台账
        </div>
        <el-row class="m-t">
            <el-col :span="5">选择日期：
                <el-date-picker v-model="selectTime" type="date" value-format="yyyy-MM-dd" placeholder="选择日期" size="small"></el-date-picker>
            </el-col>
            <el-col :span="17">
                <el-button type="primary" size="small">查询</el-button>
            </el-col>
        </el-row>
        <el-row class="tabCon">
            <el-table :data="activatedCarbonData" style="width: 100%" :header-cell-style="{'background':'#F5F3F2'}">
                <el-table-column prop="date" label="开启时间" width="200"></el-table-column>
                <el-table-column prop="date" label="关闭时间" width="200"></el-table-column>
                <el-table-column prop="updateTime" label="更换时间" width="240">
                    <template slot-scope="scope">
                        <el-date-picker v-model="scope.row.updateTime" type="date" placeholder="选择日期" size="small"></el-date-picker>
                    </template>
                </el-table-column>
                <el-table-column prop="recoverType" label="活性炭种类">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.recoverType" placeholder="请输入" size="small"></el-input>
                    </template>
                </el-table-column>
                <el-table-column prop="recoverAmount" label="装填数量(kg)">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.recoverAmount" placeholder="请输入" size="small"></el-input>
                    </template>
                </el-table-column>
            </el-table>
        </el-row>
    </div>
</template>
<script>
import { getActivatedCarbon,addActivatedCarbon } from '../../assets/js/common';
export default{
    name:"activatedCarbon",
    data(){
        return{
            selectTime:new Date(),
            activatedCarbonData:[
                {"startTime":"","endTime":""}
            ]
        }
    },
    created(){
        let date = new Date();
        this.time = date.getFullYear() + "-" + (date.getMonth() + 1) + date.getDay();
        // this.getList();
    },
    methods:{
        //获取列表
        async getList(){
            const res = await getActivatedCarbon({time:this.selectTime});
            if(res?.code == "1"){
                this.activatedCarbonData = res.data;
            }
        },

        //获取暂存数据
        // async getStaging(){
        //     const res = await getActivatedCarbonStaging();
        //     if(res?.code == "1"){
        //         this.activatedCarbonData = res.data;
        //     }
        // },

        //保存活性炭数据
        async addList(){
            const res = await addActivatedCarbon();
            if(res?.code == "1"){
                console.log()
            }
        },
    }
}
</script>
<style lang="less" scoped>
    .m-t{
        margin-top: 30px;
    }
    .carbonTitle{
        text-align: center;
        font-size: 16px;
        font-weight: bold;
        letter-spacing:5px;
    }
    .tabCon{
        margin-top: 30px;
        box-shadow: 0px 2px 2px 3px rgba(15, 15, 15, 0.08);
    }
</style>