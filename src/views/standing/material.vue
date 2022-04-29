<template>
  <div class="material">
    <div class="materialTitle">原辅材料填报</div>

    <el-button class="boxSubmit" @click="addVocs">添加</el-button>

    <div class="creationTime">创建时间：{{ time }}</div>

    <div class="materialContent" v-for="(item,i) in vocsList" :key="i">
      <el-table :data="vocsData" stripe style="width: 100%">
        <el-table-column prop="materialName" label="含VOCs材料名称" width="200">
          <template slot-scope="scope">
            <el-input v-model="scope.row.materialName" placeholder="请输入"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="purchaseQuantity" label="采购量(kg)" width="180">
          <template slot-scope="scope">
            <el-input v-model="scope.row.purchaseQuantity" placeholder="请输入"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="usageThisWeek" label="本周使用量(kg)" width="180">
          <template slot-scope="scope">
            <el-input v-model="scope.row.usageThisWeek" placeholder="请输入"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="inventoryThisWeek" label="剩余库存量(kg)" width="180">
          <template slot-scope="scope">
            <el-input v-model="scope.row.inventoryThisWeek" placeholder="请输入"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="vocsContent" label="VOCs含量(%)" width="180">
          <template slot-scope="scope">
            <el-input v-model="scope.row.vocsContent" placeholder="请输入"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="recoverType" label="回收方式" width="180">
          <template slot-scope="scope">
            <el-input v-model="scope.row.recoverType" placeholder="请输入"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="recoverAmount" label="回收量" width="180">
          <template slot-scope="scope">
            <el-input v-model="scope.row.recoverAmount" placeholder="请输入"></el-input>
          </template>
        </el-table-column>
  </el-table>
    </div>
  </div>
</template>

<script>
export default {
  name: "materialChart",
  data() {
    return {
      time:'2022/04/29',
      vocsList: [{
        key:0,ledgerType:1,materialName: '',purchaseQuantity: '',usageThisWeek: '',
        inventoryThisWeek:'', vocsContent:'',recoverType:'',recoverAmount:''}],
      vocsData: [{
        key:0,ledgerType:1,materialName: '',purchaseQuantity: '',usageThisWeek: '',
        inventoryThisWeek:'', vocsContent:'',recoverType:'',recoverAmount:''}],
      add:0,
    };
  },
  methods:{
    addVocs(){
      this.add++
      this.vocsList.unshift({
        key:this.add,ledgerType:1,materialName: '',purchaseQuantity: '',usageThisWeek: '',
        inventoryThisWeek:'', vocsContent:'',recoverType:'',recoverAmount:''})
    }
  }
};
</script>

<style lang="less" scoped>
.material {
  .materialTitle{
    text-align: center;
  }
  .materialContent{
    margin-top: 30px;
    box-shadow: 0px 2px 2px 3px rgba(15, 15, 15, 0.08);
  }
  .boxSubmit{
    float: right;
  }
  .creationTime{
    margin-top: 40px;
  }
}
</style>
