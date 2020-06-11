<template>
  <div class="commissionNoPay">
    <div class="searchBox">
      <el-select class="searchType" v-model="mainData.noPayForm.type" placeholder="请选择">
        <el-option
          v-for="item in typeOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <div class="searchInput">
        <el-input placeholder="请输入" v-model="mainData.noPaySearch" class="input-with-select">
          <el-button class="searchIcon" @click="emitReload" slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </div>
      <div class="searchBox_btns">
        <el-button class="w80" @click="mainData.noPayHeightSearch=!mainData.noPayHeightSearch">
          高级筛选
          <i
            :class="{ 'el-icon-arrow-up' : mainData.noPayHeightSearch,'el-icon-arrow-down' : !mainData.noPayHeightSearch,}"
          ></i>
        </el-button>
        <el-button class="w75" @click="updateGrant">发放</el-button>
        <el-button class="w75" @click="startBrokerage">结佣</el-button>
        <el-button class="w75 export" type="primary">导出</el-button>
      </div>
    </div>
    <el-form
      v-show="mainData.noPayHeightSearch"
      class="heightSearch"
      ref="noPayHeightSearch"
      :model="mainData.noPayForm"
      :rules="rules"
      label-width="110px"
    >
      <el-form-item label="回款比例" prop="rateStart">
        <div class="rateBox">
          <div>
            <el-input class="rateInput" v-model="mainData.noPayForm.rateStart">
              <template slot="append">%</template>
            </el-input>
          </div>
          <div class="rateText">至</div>
          <div>
            <el-input class="rateInput" v-model="mainData.noPayForm.rateEnd">
              <template slot="append">%</template>
            </el-input>
          </div>
        </div>
      </el-form-item>
      <el-form-item label="认购时间" prop="applyTime">
        <el-date-picker
          v-model="mainData.noPayForm.applyTime"
          type="daterange"
          range-separator="至"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="签约时间" prop="assignTime">
        <el-date-picker
          v-model="mainData.noPayForm.assignTime"
          type="daterange"
          range-separator="至"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="结佣类型" prop="money" class="form_status">
        <el-select v-model="mainData.noPayForm.money" placeholder="请选择">
          <el-option
            v-for="item in statusOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="是否发放" prop="isPost" class="form_status">
        <el-select v-model="mainData.noPayForm.isPost" placeholder="请选择">
          <el-option label="是" value="是"></el-option>
          <el-option label="否" value="否"></el-option>
          <el-option label="全部" value="全部"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="经纪人身份" prop="person" class="form_status">
        <el-select class="killClose" multiple v-model="mainData.noPayForm.person" placeholder="请选择">
          <el-option
            v-for="item in peopleOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <div class="form-bottom_btn">
        <el-button @click="emitReload" type="primary">确定</el-button>
        <el-button @click="resetField('noPayHeightSearch')">重置</el-button>
      </div>
    </el-form>
    <div class="valueTable">
      <el-table
        ref="multipleTable"
        :data="mainData.noPayTable"
        tooltip-effect="dark"
        style="width: 100%"
        :header-cell-style="{'background-color':'#FAFAFA'}"
        @selection-change="noPaycheckSelection"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column type="index" label="序号" width="55"></el-table-column>
        <el-table-column prop="business_unit_name" label="事业部" width="120" show-overflow-tooltip></el-table-column>
        <el-table-column prop="project_name" label="项目名称" width="120" show-overflow-tooltip></el-table-column>
        <el-table-column prop="room_name" label="房间信息" width="120" show-overflow-tooltip></el-table-column>
        <el-table-column prop="customer_name" label="客户姓名" width="120" show-overflow-tooltip></el-table-column>
        <el-table-column prop="gain_by" label="报备人" width="120" show-overflow-tooltip></el-table-column>
        <el-table-column prop="source_type_desc" label="成交类型" width="120" show-overflow-tooltip></el-table-column>
        <el-table-column prop="current_role" label="经纪人身份" width="120" show-overflow-tooltip></el-table-column>
        <el-table-column prop="transaction_status" label="交易状态" show-overflow-tooltip></el-table-column>
        <el-table-column prop="subscription_date" label="认购时间" width="190" show-overflow-tooltip></el-table-column>
        <el-table-column prop="signing_date" label="签约时间" width="190" show-overflow-tooltip></el-table-column>
        <el-table-column prop="now_price" label="成交金额(元)" show-overflow-tooltip></el-table-column>
        <el-table-column prop="back_price" label="已回款金额(元)" show-overflow-tooltip></el-table-column>
        <el-table-column prop="collection_proportion" label="回款比例" show-overflow-tooltip></el-table-column>
        <el-table-column prop="employee_name" label="置业顾问" show-overflow-tooltip></el-table-column>
        <el-table-column prop="customer_mobile" label="客户电话" width="140" show-overflow-tooltip></el-table-column>
        <el-table-column prop="report_mobile" label="报备人电话" width="140" show-overflow-tooltip></el-table-column>
        <el-table-column prop="address" label="经办人" show-overflow-tooltip>
          <template slot-scope="scope">{{scope.row.creator}}</template>
        </el-table-column>
        <el-table-column prop="create_time" label="终止结佣时间" width="140" show-overflow-tooltip></el-table-column>
        <el-table-column prop="commission_type" label="结佣类型" width="140" show-overflow-tooltip></el-table-column>
        <el-table-column prop="no_remarks" label="备注" width="140" show-overflow-tooltip></el-table-column>
        <el-table-column prop="grant_status" label="发放状态" width="140" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="grant_time" label="发放时间" width="190" show-overflow-tooltip></el-table-column>
      </el-table>
    </div>
    <el-pagination
      @size-change="pageSizeChange"
      @current-change="currentPageChange"
      :current-page="mainData.currentPage.noPayPage"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="mainData.pageSize.noPaySize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="mainData.pageTotal.noPayTotal"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  created() {
    console.log("commissionNoPay created");
  },
  data() {
    return {
      channelOptions: [
        {
          value: "1",
          label: "我爱我家"
        },
        {
          value: "2",
          label: "其他"
        }
      ],
      typeOptions: [
        {
          value: "room_name",
          label: "房间信息"
        },
        {
          value: "employee_name",
          label: "置业顾问"
        },
        {
          value: "customer_name",
          label: "客户姓名"
        },
        {
          value: "gain_by",
          label: "报备人"
        },
        {
          value: "bank_num",
          label: "银行卡号"
        },
        {
          value: "reportIdCard",
          label: "身份证号"
        }
      ],
      statusOptions: [
        {
          value: "物质形式结佣-物业费",
          label: "物质形式结佣-物业费"
        },
        {
          value: "物质形式结佣-购物卡",
          label: "物质形式结佣-购物卡"
        },
        {
          value: "物质形式结佣-积分",
          label: "物质形式结佣-积分"
        },
        {
          value: "物质形式结佣-礼品",
          label: "物质形式结佣-礼品"
        },
        {
          value: "其他",
          label: "其他"
        },
        {
          value: "历史数据",
          label: "历史数据"
        },
        {
          value: "全部",
          label: "全部"
        }
      ],
      peopleOptions: [
        {
          value: "业主",
          label: "业主"
        },
        {
          value: "公司员工",
          label: "公司员工"
        },
        {
          value: "普通经纪人",
          label: "普通经纪人"
        }
      ],
      rules: {}
    };
  },
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
  methods: {
    noPaycheckSelection(val) {
      console.log(val);
      this.mainData.noPaycheckedList = val;
    },
    resetField(name) {
      this.$refs[name].resetFields();
      this.mainData.noPayForm.rateEnd = "";
      this.mainData.noPayForm.isPost = "";
      this.mainData.noPayForm.money = "";
      this.mainData.noPayForm.type = "";
      this.mainData.noPaySearch = "";
    },
    // 分页个数改变
    pageSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.mainData.pageSize.pageTotal = val;
      this.$emit("reload");
    },
    //切换分页
    currentPageChange(val) {
      console.log(`当前页: ${val}`);
      this.mainData.currentPage.noPayPage = val;
      this.$emit("reload");
    },
    //结佣
    startBrokerage() {
      if (this.mainData.noPaycheckedList.length == 0) {
        this.$message.warning("请选择需要转结佣的交易");
        return;
      }
      let arr = this.mainData.noPaycheckedList.filter(item => item.grant_time);
      console.log(arr);
      if (arr.length > 0) {
        this.$message.warning("包含已发放的交易，不可转结佣!");
        return;
      }
      this.$confirm("确认结佣？")
        .then(_ => {
          this.$emit("startBrokerage");

          done();
        })
        .catch(_ => {});
    },
    //发放
    updateGrant() {
      if (this.mainData.noPaycheckedList.length == 0) {
        this.$message.warning("请选择需要发放的交易");
        return;
      }
      let arr = this.mainData.noPaycheckedList.filter(item => item.grant_time);
      console.log(arr);
      if (arr.length > 0) {
        this.$message.warning("包含已发放的交易，不可再次发放!");
        return;
      }
      this.$confirm("确认发放？")
        .then(_ => {
          this.$emit("noPayGrant");
          done();
        })
        .catch(_ => {});
    },
    //渲染
    emitReload() {
      this.$emit("reload");
    }
  }
};
</script>

<style lang="less" scoped>
.commissionNoPay {
  padding: 15px;
  .searchBox {
    height: 50px;
    // line-height: 50px;
    position: relative;
    border-bottom: 1px solid #f4f4f4;
    .searchType {
      width: 110px;
      position: absolute;
      top: 0;
      right: 580px;
      ::v-deep .el-input__inner {
        height: 32px;
        line-height: 32px;
        color: #333;
        font-size: 14px;
      }
    }
    .searchInput {
      width: 210px;
      height: 30px;
      position: absolute;
      top: 0;
      right: 360px;

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
        color: #333;
        font-size: 14px;
      }
      ::v-deep .el-icon-search {
        margin: 0;
        color: #999;
      }
    }
    .searchBox_btns {
      width: 360px;
      position: absolute;
      right: 0;
      height: 50px;
      // line-height: 50px;
      top: 0;
      .el-button {
        height: 30px;
        padding: 0;
        color: #333;
        font-size: 12px;
        margin-left: 8px;
        i {
          margin-right: 0;
          color: #333;
        }
      }
      .export {
        color: #fff;
      }
      .w80 {
        width: 80px;
      }
      .w75 {
        width: 75px;
      }
    }
  }
  .heightSearch {
    position: relative;
    padding-top: 10px;
    height: 177px;
    display: flex;
    flex-wrap: wrap;
    background: #f5f8fe;
    ::v-deep .el-form-item {
      width: 33.33%;
      height: 35px;
      line-height: 35px;
      color: #333;
      font-size: 14px;
      .el-form-item__label {
        color: #333;
        font-size: 14px;
      }
      .el-input__inner {
        color: #333;
        font-size: 14px;
        line-height: 35px;
      }
      .el-select {
        width: 240px;
        .el-input__inner {
          height: 35px !important;
          color: #333;
          font-size: 14px;
        }
      }
      .el-input {
        width: 240px;
      }
      .killClose {
        .el-tag__close {
          display: none;
        }
        .el-icon-close {
          display: none;
        }
        .el-tag {
          background: #fff;
          color: #333;
          font-size: 14px;
        }
      }
      .el-date-editor {
        width: 240px;
        height: 35px;

        .el-input__icon {
          display: none;
        }
        .el-range-input {
          width: 80px;
        }
        .el-range-separator {
          line-height: 27px;
        }
      }
    }

    .rateBox {
      display: flex;
      border: 1px solid #dcdfe6;
      border-radius: 4px;
      background: #fff;
      height: 35px;

      width: 240px;
      .rateInput {
        line-height: 35px;
        // vertical-align: middle;
        width: 100%;
        ::v-deep .el-input__inner {
          border: none;
          padding: 0 3px;
          color: #333;
          font-size: 14px;
        }
        ::v-deep .el-input-group__append {
          padding: 0;
          margin: 0;
          border: none;
          background: #fff;
          line-height: 32px;
          height: 32px;
        }
      }
      .rateText {
        line-height: 32px;
      }
    }
    > .form_status {
      transform: translateY(-40px);
    }
    .form-bottom_btn {
      position: absolute;
      bottom: 20px;
      left: 50%;
      transform: translateX(-50%);
      .el-button {
        height: 32px;
        width: 65px;
        padding: 0;
        margin: 0;
        color: #333;
        font-size: 12px;
      }
      .el-button:first-child {
        color: #fff;
      }
    }
  }
  .valueTable {
    margin-top: 15px;
  }
  .el-pagination {
    text-align: right;
  }
}
</style>
