<template>
  <div class="createMinusAccounts">
    <div class="createMinusAccounts_bottom">
      <div class="valueTable">
           <el-table
        ref="createMinusAccountsTable"
        :data="mainData.createMinusAccountsTable"
        tooltip-effect="dark"
        style="width: 100%"
        :header-cell-style="{'background-color':'#FAFAFA'}"
        @selection-change="checkCreateMinus"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column type="index" label="序号" width="55"></el-table-column>
        <el-table-column prop="room_name" label="房间信息" width="220" show-overflow-tooltip></el-table-column>
        <el-table-column prop="project_amount" label="佣金立项金额(元)" width="150" show-overflow-tooltip></el-table-column>
        <el-table-column prop="amount_paid" label="已付金额(元)" width="150" show-overflow-tooltip></el-table-column>
        <el-table-column prop="unpaid_amount" label="未付金额(元)" width="150" show-overflow-tooltip></el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    mainData: {
      type: Object,
      dafault: {}
    }
  },
  watch: {
    mainData: {
      handler(newv) {},
      deep: true
    }
  },
  methods:{
    checkCreateMinus(val){
      console.log(val);
      this.mainData.CreateMinusAccountsChecked=val
    }
  }
};
</script>

<style lang='less' scoped>
.createMinusAccounts {
  .createMinusAccounts_top {
    padding: 20px;
    box-shadow: rgba(0, 0, 0, 0.1) 0 0 5px;
    background: #fff;
    margin-bottom: 10px;
    > div {
      display: flex;
      height: 37px;
      line-height: 37px;
      .val {
        flex: 1;
      }
      .key {
        width: 85px;
        text-align: right;
        padding-right: 10px;
        font-size: 14px;
        color: #333;
      }
    }
  }
  .createMinusAccounts_bottom {
    padding: 20px;
    box-shadow: rgba(0, 0, 0, 0.1) 0 0 5px;
    background: #fff;
     .searchInput {
      width: 210px;
      height: 30px;
      margin: 0 auto 15px;
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
  }
}
</style>
