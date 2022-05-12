<template>
    <div class="wasteList">
          <el-container>
            <el-header>连微数字哨兵产品分布图</el-header>
            <div class="title">( {{ companyName }} )</div>
            <el-container>
                <el-aside width="260px">
                    <el-menu :default-active="$route.path" class="el-menu-vertical-demo" @select="handleSelect" @open="handleOpen" >
                        <el-menu-item index="/wasteParameter">
                            <span slot="title">台账记录</span>
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
export default{
    name: "wasteList",
     data() {
        return {
            companyName:"",
        };
    },
    created(){
        this.companyName = JSON.parse(sessionStorage.getItem('userInfo')).companyName;
        this.handleSelect("/wasteParameter");
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
        background-color: #fff;
        text-align: center;
        height: 10vh;
        line-height: 10vh;
        font-weight: bold;
        font-size: 20px;
        letter-spacing: 2px;
    }
    .title{
        text-align: center;
    }
    .el-aside {
        background-color: #fff;
        height: 90vh;
    }
    .el-main {
        background-color: #fff;
        height: 90vh;
    }
}

</style>