<template>
  <div class="app-container homePage-box">
    <div class="top">
      <el-date-picker v-model="value1" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" />
      <el-button class="bgc_blue" type="primary" style="margin-left: 15px" @click="search">搜索</el-button>
    </div>
    <!-- 表单 -->
    <el-table :data="companyTableData" style="width: 100%; margin-top: 20px;border:1px solid #f0f0f0;border-bottom:none;">
      <el-table-column label="序号" type="index" width="50" />
      <el-table-column prop="companyName" label="报备日期" />
      <el-table-column prop="validStartDate" label="中介报备" />
      <el-table-column prop="validEndDate" label="中介到访" />
      <el-table-column prop="ifStart" label="中介认购" />
      <el-table-column prop="creatperson" label="贝壳树报备" />
      <el-table-column prop="createTime" label="贝壳树到访" />
      <el-table-column prop="createTime" label="贝壳树认购" />
      <el-table-column prop="createTime" label="案场报备" />
      <el-table-column prop="createTime" label="案场成交" />
      <el-table-column prop="createTime" label="自渠报备" />
      <el-table-column prop="createTime" label="自渠到访" />
      <el-table-column prop="createTime" label="自渠成交" />
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value1: '',
      companyTableData: [{
        companyName: '1',
        validStartDate: '2',
        validEndDate: '3',
        ifStart: '4',
        creatperson: '5',
        createTime: '6'
      }]
    }
  },
  methods: {
    // 搜索
    search() {

    }
  }
}
</script>

<style lang='less'>
.homePage-box{
  .top{
    padding: 8px;
    border: 1px solid #f0f0f0;
    background: #fcfcfc;
    border-radius: 4px;
  }
}
</style>
