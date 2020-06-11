<template>
  <div class="viewPolicy">
    <div class="viewPolicy_top">
       <el-table
        ref="multipleTable"
        :data="mainData.viewPolicyTable"
        tooltip-effect="dark"
        style="width: 100%"
        :header-cell-style="{'background-color':'#FAFAFA'}"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column type="index" label="序号" width="55"></el-table-column>
         <el-table-column prop="policy_code" label="政策编号" ></el-table-column>
        <el-table-column prop="policy_name" label="政策名称" ></el-table-column>
        <el-table-column prop="policy_type" label="政策类型" >
          <template slot-scope="scope">
            <span v-if="scope.row.policy_type==0">全民经纪人政策</span>
            <span v-else-if="scope.row.policy_type==1">中介政策</span>
          </template>
        </el-table-column>
       </el-table>
    </div>
    <el-pagination
      @size-change="pageSizeChange"
      @current-change="currentPageChange"
      :current-page="mainData.currentPage.viewPolicyPage"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="mainData.pageSize.viewPolicySize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="mainData.pageTotal.viewPolicyTotal"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  props: {
    mainData: {
      type: Object,
      dafault: {}
    },
    nowRouteNameNum:{
        type: String,
      dafault: ""
    }
  },
  watch: {
    mainData: {
      handler(newv) {},
      deep: true
    }
  },
  methods:{
     // 分页个数改变
    pageSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.mainData.pageSize.viewPolicySize = val;
      this.$emit('viewPolicyRander')
    },
    //切换分页
    currentPageChange(val) {
      console.log(`当前页: ${val}`);
      this.mainData.currentPage.viewPolicyPage = val;
      this.$emit('viewPolicyRander')
    },
  }
}
</script>

<style>
  .el-pagination {
    text-align: right;
  }
</style>
