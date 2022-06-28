<template>
    <div class="wasteList">
          <el-container>
            <el-header>VOCs数智哨兵系统(企业版)</el-header>
            <!-- <div class="title">( {{ companyName }} )</div> -->
            <div class="title-exit">
                <div class="title">( {{companyName}} )</div>
                <el-button class="exit" type="primary" icon="el-icon-user" size="mini" @click.native="loginOut">退出</el-button>
            </div>
            
            <el-container>
                <el-aside width="260px">
                    <el-menu :default-active="$route.path" class="el-menu-vertical-demo" @select="handleSelect" @open="handleOpen" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b" >
                        <el-menu-item index="/statistics">
                            <span slot="title">仓库状态</span>
                        </el-menu-item>
                        <el-menu-item index="/addInfo">
                            <span slot="title">配置信息</span>
                        </el-menu-item>
                        <el-menu-item index="/wasteParameter">
                            <span slot="title">电子台账</span>
                        </el-menu-item>
                        <el-menu-item index="/moveVideo">
                            <span slot="title">视频教程</span>
                        </el-menu-item>
                        <el-submenu index="/wastePrevention">
                            <template slot="title">
                                <span>政策解读</span>
                            </template>
                            <el-menu-item-group>
                                <el-menu-item index="/wastePrevention">固体废物污染环境防治法</el-menu-item>
                                <el-menu-item index="/wasteManagement">危险废物转移管理办法</el-menu-item>
                                <el-menu-item index="/wastePlan">危险废物管理数字化建设工作方案</el-menu-item>
                                <el-menu-item index="/wasteNetIn">硬件设备入网要求</el-menu-item>
                                <el-menu-item index="/wasteReference">物联网计量设备参考性能要求</el-menu-item>
                            </el-menu-item-group>
                        </el-submenu>
                    </el-menu>
                </el-aside>
                <el-main>
                    <router-view />
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>
<script>
import { loginGetOut } from "../../assets/js/Login";
export default{
    name: "wasteList",
     data() {
        return {
            companyName:"",
        };
    },
    created(){
        this.companyName = JSON.parse(sessionStorage.getItem('userInfo')).companyName;
        this.handleSelect("/statistics");
    },
    methods:{
        handleOpen(key) {
            this.$router.push({
                path: key,
            });
        },
        handleSelect(key) {
            this.$router.push({
                path: key,
            });
        },
        async loginOut(){
            const res = await loginGetOut();
            if (res.code == "1") {
                sessionStorage.removeItem("userInfo", JSON.stringify(res.data))
                this.$router.push('/')
            }
        }
    }
}
</script>
<style lang="less" scoped>
.navMenu{
  height: 100%;
}
/deep/.el-menu{
  height: 100%;
}
.wasteList{
    color: #333;
    .el-header {
        // background-color: #fff;
        // text-align: center;
        // height: 10vh;
        // line-height: 10vh;
        // font-weight: bold;
        // font-size: 20px;
        // letter-spacing: 2px;
        color: #f0f0f0;
        text-align: center;
        height: 40px !important;
        line-height: 52px;
        font-weight: bold;
        font-size: 20px;
        letter-spacing: 2px;
        text-align: left;
        // 背景颜色
        background: #242F41;
    }
    .title-exit{
        display: flex;
        background: #242F41;
        color: #F0F0F0;
        padding-left: 30px;
        padding-bottom: 10px;
        .exit{
        position: fixed;
        top: 20px;
        right: 32px;
        margin-right: 20px;
        }
    }
    .title{
        text-align: center;

    }
    .el-aside {
        background-color: #324158;
        height: 92vh;
    }
    .el-menu{
        background: #324158;
        color: #F0F0F0;
    }
    .el-menu-item,.el-submenu__title span{
        color: #fff;
    }
    .is-active{
        color: #000;
        // background: #eee;
    }
    .el-main {
        background-color: #fff;
        height: 92vh;
    }
}

</style>