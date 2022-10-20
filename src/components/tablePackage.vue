<template>
  <div class="wasteTable">
    <el-table :data="dataArr" height="550" maxHeight="550" style="width: 100%" :header-cell-style="{'background':'#F5F3F2'}">
      <template v-for="item in tableArr">
        <el-table-column
          :key="item.prop"
          :prop="item.prop"
          :label="item.name"
          :width="item.width"
          align="center"
        >
          <el-table-column
            v-for="val in item.children"
            :key="val.prop"
            :prop="val.prop"
            :label="val.name"
            :width="val.width"
            align="center"
          >
          </el-table-column>
        </el-table-column>
      </template>
    </el-table>
  </div>
</template>

<script>
export default {
  props: {
    tableArr: {
      type: Array,
      require: true,
    },
    dataArr: {
      type: Array,
      require: true,
    },
  },
  created(){
    console.log(this.tableArr, 'tableArr');
  },
  data() {
    return {
      
    }
  },
  methods: {
    
  },
}
</script>

<style lang="less" scoped>

</style>