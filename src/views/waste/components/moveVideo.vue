<template>
    <div class="moveVideoCon">
        <!-- 视频教程 -->
        <div class="title">
            视频教程
        </div>  
        <div class="list">
            <!-- muted="muted" //设置默认静音属性 -->
            <video ref="myVideo" controls="true" :src="videoUrl" class="move"></video>
        </div>
    </div>
</template>

<script>
export default {
  name: "moveVideoCon",
  data() {
    return {
        videoUrl:"https://zjlianweihoss.oss-cn-hangzhou.aliyuncs.com/file/1656063184346-tutorial.mp4"
    }
  },
  methods: {}
}
</script>

<style lang="less" scoped>
.title{
    text-align: center;
    font-size: 16px;
    font-weight: bold;
    letter-spacing:5px;
}
.move{
    // height: 80vh;
    width: 22vw;
    margin-top: 30px;
    margin-left: 37%;
}
</style>