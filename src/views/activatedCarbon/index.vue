<template>
    <div class="activatedCarbon">
        <div class="carbonTitle">
            活性炭吸附设施运行维护台账
        </div>
        <el-row>
            <el-col :span="18" :offset="3">
                <el-card class="box-card">
                     <div class="card-title">
                         台账填写
                     </div>
                     <div class="card-con">
                        <div class="list-title">更换时间：</div>
                        <div class="list-time">
                            <el-date-picker style="width:100%" v-model="fromInfo.replacementTime" type="date" placeholder="选择日期" size="small" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
                        </div>
                     </div>
                     <div class="card-con">
                        <div class="list-title">活性炭种类：</div>
                        <div class="list-time">
                            <el-input v-model="fromInfo.recoverType" placeholder="请输入" size="small"></el-input>
                        </div>
                     </div>
                     <div class="card-con">
                        <div class="list-title">装填数量(kg)：</div>
                        <div class="list-time">
                            <el-input v-model="fromInfo.loadQuantity" placeholder="请输入" size="small"></el-input>
                        </div>
                     </div>
                    <div class="btn">
                        <el-button type="primary" class="btn-submit" size="small" @click.native="addList">提交</el-button>
                    </div>
                </el-card>
            </el-col>
        </el-row> 
    </div>
</template>
<script>
import { addActivatedCarbon } from '../../assets/js/common';
export default{
    name:"activatedCarbon",
    data(){
        return{
            fromInfo:{
                replacementTime:"",
                recoverType:"",
                loadQuantity:"",
            }
        }
    },
    created(){
        let date = new Date();
        this.time = date.getFullYear() + "-" + (date.getMonth() + 1) + date.getDay();
    },
    methods:{
        //保存活性炭数据
        async addList(){
            if(this.fromInfo.replacementTime == ""){
                this.$message({
                    showClose: true,
                    message: '请选择更换时间',
                    type: 'error'
                });
                return;
            }
            if(this.fromInfo.recoverType == ""){
                this.$message({
                    showClose: true,
                    message: '请填写活性炭种类',
                    type: 'error'
                });
                return;
            }
            if(this.fromInfo.loadQuantity == ""){
                this.$message({
                    showClose: true,
                    message: '请填写装填数量',
                    type: 'error'
                });
                return;
            }
            const res = await addActivatedCarbon(this.fromInfo);
            if(res?.code == "1"){
                this.fromInfo.recoverType = "";
                this.fromInfo.loadQuantity = "";
                this.fromInfo.replacementTime = "";
                console.log("提交成功")
            }else{
                 this.$message({
                    showClose: true,
                    message: res.msg,
                    type: 'error'
                });
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
    .box-card{
        margin-top: 80px;
    }
    .card-title{
        margin-top: 10px;
        font-size: 20px;
        font-weight: bold;
        letter-spacing: 4px;
        text-align: center;
    }
    .card-con{
        margin-top: 30px;
        width: 100%;
        height: 30px;
        .list-title{
            width: 150px;
            text-align: right;
            margin-left: 20%;
            line-height: 30px;
            float: left;
        }
        .list-time{
            width: 500px;
            float: left;
        }
    }
    .btn{
        width: 100%;
        margin-top: 30px;
        margin-bottom: 30px;
        text-align: center;
        .btn-submit{
            letter-spacing: 4px;
        }
    }
</style>