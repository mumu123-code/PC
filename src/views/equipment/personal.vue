<template>
  <div class="personal">单个数据页面</div>
</template>

<script>
export default {
  name: "personalView",
  data() {
    return {};
  },
  created() {
    console.log(this.$route.query, "query");
  },
};
</script>

<style lang="less" scoped>
.personal {
}
</style>
