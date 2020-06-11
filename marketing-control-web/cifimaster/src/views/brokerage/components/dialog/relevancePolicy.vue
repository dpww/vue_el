<template>
  <div class="relevancePolicy">
    <div class="relevancePolicy_top">
      <div class="addApply" >
        <el-button type="text" @click="openAddPolicy">添加政策</el-button>
      </div>
      <el-table
        ref="multipleTable"
        :data="mainData.relevancePolicyTable"
        tooltip-effect="dark"
        style="width: 100%"
        :header-cell-style="{'background-color':'#FAFAFA'}"
        @selection-change="relevancePolicySelection"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column type="index" label="序号"></el-table-column>
        <el-table-column prop="policy_code" label="政策编号" ></el-table-column>
        <el-table-column prop="policy_name" label="政策名称" ></el-table-column>
        <el-table-column prop="policy_type" label="政策类型" >
                <template slot-scope="scope">
            <span v-if="scope.row.policy_type==0">全民经纪人政策</span>
            <span v-else-if="scope.row.policy_type==1">中介政策</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180">
          <template slot-scope="scope">
            <el-button type="text">查看</el-button>
            <el-button  type="text" @click="delPolicy(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div>
      <el-pagination
        @size-change="pageSizeChange"
        @current-change="currentPageChange"
        :current-page="mainData.currentPage.relevancePolicyPage"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="mainData.pageSize.relevancePolicySize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="mainData.pageTotal.relevancePolicyTotal"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import {getPolicy,removePolicy} from "@/api/brokerage"
export default {
  props: {
    mainData: {
      type: Object,
      dafault: {}
    },
    nowRouteNameNum: {
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
  methods: {
    // 分页个数改变
    pageSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.mainData.pageSize.relevancePolicySize = val;
    },
    //切换分页
    currentPageChange(val) {
      console.log(`当前页: ${val}`);
      this.mainData.currentPage.relevancePolicyPage = val;
          this.$emit('randerRelevancePolicy',this.mainData.nowPolicyId)

    },
    //勾选框
    relevancePolicySelection(val){
      this.mainData.relevancePolicyCheckeds=val
          this.$emit('randerRelevancePolicy',this.mainData.nowPolicyId)

    },
    //打开添加政策
    openAddPolicy(){
      getPolicy({
        // "政策类型 传1 查询中介政策 传0查询全民营销政策",
        policy_type: this.nowRouteNameNum == 1 ? 0 : 1,
        pageNum: this.mainData.currentPage.relevancePolicyPage,
        pageSize: this.mainData.pageSize.relevancePolicySize,
        project_id: this.mainData.project_id
      }).then(res => {
        console.log(res);
        if (res.code == 200) {
          this.mainData.addPolicyTable=res.data.list
        }
      });
       this.mainData.drawerName = "addPolicy";
      this.mainData.openDrawer = true;
    },
    delPolicy(id){
      removePolicy({
        "checklistId":this.mainData.nowPolicyId ,
        "policyIds":id
        }).then(res=>{
        console.log(res);
        if(res.code==200){
          this.$emit('randerRelevancePolicy',this.mainData.nowPolicyId)
        }
      })

    }
  }
};
</script>

<style lang="less" scoped>
.relevancePolicy{
  .relevancePolicy_top{
      padding-right: 15px;
      padding-bottom: 15px;
    .addApply{
      text-align: right!important;
    }
  }
  .el-pagination {
  text-align: right;
}
}

</style>
