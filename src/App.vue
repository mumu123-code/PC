<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #F0F0F0;
}
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
span,
b,
i {
  display: inline-block;
}

/* 设置滚动条的样式 */

::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

/* 滚动槽 */

::-webkit-scrollbar-track {
  -webkit-box-shadow: inset006pxrgba(0, 0, 0, 0.3);
  border-radius: 10px;
}

/* 滚动条滑块 */

::-webkit-scrollbar-thumb {
  border-radius: 10px;

  background: rgba(0, 0, 0, 0.1);

  -webkit-box-shadow: inset006pxrgba(0, 0, 0, 0.5);
}

::-webkit-scrollbar-thumb:window-inactive {
  background: rgba(255, 0, 0, 0.4);
}
.font14{
  font-size: 14px;
}
.text-right{
  text-align: right;
}
.l-h-32{
  line-height: 32px;
}
.w-100{
  width: 100% !important;
}

.noneMinute .el-scrollbar:nth-of-type(1) {
  width:100% !important;
}
.noneMinute .el-scrollbar:nth-of-type(2) {
  display: none !important;
}
.noneMinute .el-picker-panel__link-btn:nth-of-type(1)  span {
  display: none !important;
}

</style>
