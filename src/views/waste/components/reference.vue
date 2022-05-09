<template>
    <div class="con">
        <div class="title">
            物联网计量设备参考性能要求
        </div>    
        <div class="con-list">
            （1）通讯要求<br/>
               &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 通讯方式为蓝牙，通过蓝牙连接到终端后，最终通过无线网、4G/5G上传至杭州市生态智卫“无废场景”系统。<br/>
            （2）性能指标要求<br/>
               &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 终端必须满足如下性能指标:<br/>
               &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 数据采集误差: ≤10克<br/>
               &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 平均无故障运行时间:1440h 以上<br/>
               &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 绝缘阻抗: >20MΩ <br/>
               &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 外壳防护等级: IPX5 <br/>
            <div class="con-title">
                打印机技术规格要求
            </div>
            <div class="con-img">
                <img src="https://zjlianweihoss.oss-cn-hangzhou.aliyuncs.com/file/1651223246673-1.png" alt="">
            </div>
        </div>
    </div>
</template>
<script>
export default{
    name:"referenceDetail"
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
    .con-title{
		color: #313131;
		font-size: 30rpx;
        font-weight: bold;
		text-align: center;
        margin-top: 20px;
	}
    .con-img img{
        display: block;
        margin:30px auto;
    }
    .con-list{
        margin-top: 20px;
    }
}

</style>