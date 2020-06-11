<template>
  <div class="createAccounts">
    <div class="createAccounts_top">
      <div>
        <div class="key">政策:</div>
        <div class="val">1,2,3</div>
      </div>
    </div>
    <div class="createAccounts_bottom">

       <div class="searchInput">
        <el-input placeholder="请输入" v-model="mainData.createAccountsSeach" class="input-with-select">
          <el-button class="searchIcon" slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </div>
      <div class="valueTable">
           <el-table
        ref="createAccountsTable"
        :data="mainData.createAccountsTable"
        tooltip-effect="dark"
        style="width: 100%"
        :header-cell-style="{'background-color':'#FAFAFA'}"
        @selection-change="checkCreateAccounts"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column type="index" label="序号" width="55"></el-table-column>
        <el-table-column prop="address" label="政策编号" width="120" show-overflow-tooltip></el-table-column>
        <el-table-column prop="address" label="政策名称" width="150" show-overflow-tooltip></el-table-column>
        <el-table-column prop="address" label="政策类型" width="150" show-overflow-tooltip></el-table-column>
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
    checkCreateAccounts(val){
      console.log(val);
      this.mainData.CreateAccountsChecked=val
    }
  }
};
</script>

<style lang='less' scoped>
.createAccounts {
  .createAccounts_top {
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
  .createAccounts_bottom {
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
