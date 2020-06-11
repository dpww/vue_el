<template>
  <div class="relevanceAccounts">
    <div class="relevanceAccounts_top">
      <div class="searchInput">
        <el-input placeholder="请输入" v-model="mainData.relevanceSearch" class="input-with-select">
          <el-button class="searchIcon" slot="append" icon="el-icon-search" @click="relevanceSearch"></el-button>
        </el-input>
      </div>
    </div>
    <div class="relevanceAccounts_bottom">
      <el-table
        ref="multipleTable"
        :data="mainData.relevanceAccounts"
        tooltip-effect="dark"
        style="width: 100%"
        :header-cell-style="{'background-color':'#FAFAFA'}"
        @selection-change="relevanceCheckSelection"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column type="index" label="序号" width="55"></el-table-column>
        <el-table-column prop="checklist_code" label="核算单编号" show-overflow-tooltip></el-table-column>
        <el-table-column label="立项状态" show-overflow-tooltip>
          <template slot-scope="scope">
            <span v-if="scope.row.project_status==1">草稿</span>
            <span v-else-if="scope.row.project_status==2">已审核</span>
            <span v-else-if="scope.row.project_status==3">已立项</span>
            <span v-else-if="scope.row.project_status==4">立项通过</span>
            <span v-else-if="scope.row.project_status==5">立项驳回</span>
            <span v-else-if="scope.row.project_status==6">立项撤销</span>
          </template>
        </el-table-column>
        <el-table-column v-if="nowRouteNameNum>1" prop="channel_name" label="报备人" show-overflow-tooltip></el-table-column>
      </el-table>
      <el-pagination
      @size-change="pageDetailSizeChange"
      @current-change="currentDetailPageChange"
      :current-page="mainData.currentPage.awaitDetailPage"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="mainData.pageSize.awaitDetailSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="mainData.pageTotal.awaitDetailTotal"
    ></el-pagination>
    </div>

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
  methods: {
    relevanceCheckSelection(val) {
      console.log(val);
      this.mainData.relevanceChecked=val
    },
    // 分页个数改变
    pageDetailSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.mainData.pageSize.awaitDetailSize=val
      this.$emit('relevanceSearch')

    },
    //切换分页
    currentDetailPageChange(val) {
      this.mainData.currentPage.awaitDetailPage=val
      console.log(`当前页: ${val}`);
      this.$emit('relevanceSearch')

    },
    relevanceSearch(){
      this.$emit('relevanceSearch')
    }
  }
};
</script>

<style lang="less" scoped>
.relevanceAccounts {
  box-shadow: rgba(0, 0, 0, 0.1) 0 0 5px;

  .relevanceAccounts_top {
    padding: 10px;
    background: #fff;
    position: relative;
    height: 50px;
  }
  .searchInput {
    width: 210px;
    height: 30px;
    position: absolute;
    top: 10px;
    right: 10px;
    .searchIcon {
      height: 30px;
      width: 35px;
      background-color: #ebebeb;
      padding: 0;
      text-align: center;
      box-sizing: border-box;
    }
    ::v-deep .el-input-group__append {
      height: 30px;
      width: 35px;
      padding: 0;
    }
    ::v-deep .el-input-group__append .el-button {
      margin: 0;
    }
    ::v-deep .el-input__inner {
      height: 32px;
      line-height: 32px;
    }
    ::v-deep .el-icon-search {
      margin: 0;
      color: #999;
    }
  }
  .relevanceAccounts_bottom {
    background-color: #fff;
    padding: 0 10px 25px;
  }
    .el-pagination {
    text-align: right;
  }
}
</style>
