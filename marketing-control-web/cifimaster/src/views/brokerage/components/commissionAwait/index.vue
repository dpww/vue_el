<template>
  <div class="commissionAwait">
    <div class="navbar">
      <el-select class="searchType" v-model="mainData.awaitForm.type" placeholder="请选择">
        <el-option
          v-for="item in typeOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <div class="searchInput">
        <el-input placeholder="请输入" v-model="mainData.awaitSeach" class="input-with-select">
          <el-button class="searchIcon" @click="emitReload" slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </div>
      <div class="btns">
        <el-button class="w75" @click="outExcel">导出</el-button>
        <el-button class="w80" @click="stopAccounts">终止结佣</el-button>
        <el-button class="w80" @click="relevanceAccounts">关联核算单</el-button>
        <el-button class="w80 createApplyBtn" @click="createAccounts" type="primary">创建核算单</el-button>
      </div>
    </div>
    <div class="filterBox">
      <el-form ref="form" :model="mainData.awaitForm" :rules="rules" label-width="90px">
        <el-form-item label="经纪人身份" prop="person">
          <el-select
            class="killClose"
            multiple
            v-model="mainData.awaitForm.person"
            placeholder="请选择"
          >
            <el-option
              v-for="item in personOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="交易状态" prop="status">
          <el-select v-model="mainData.awaitForm.status" placeholder="请选择">
            <el-option
              v-for="item in statusOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="回款比例" prop="rate">
          <div class="rateBox">
            <div>
              <el-input class="rateInput" v-model="mainData.awaitForm.returnRateStart">
                <template slot="append">%</template>
              </el-input>
            </div>
            <div class="rateText">至</div>
            <div>
              <el-input class="rateInput" v-model="mainData.awaitForm.returnRateEnd">
                <template slot="append">%</template>
              </el-input>
            </div>
          </div>
        </el-form-item>

        <el-form-item label="认购时间" prop="subDate">
          <el-date-picker
            v-model="mainData.awaitForm.subDate"
            type="daterange"
            range-separator="至"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="签约时间" prop="signDate">
          <el-date-picker
            v-model="mainData.awaitForm.signDate"
            type="daterange"
            range-separator="至"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </el-form-item>
      </el-form>
      <div class="refilter">
        <el-button @click="emitReload">确定</el-button>
        <el-button @click="resetField('form')">重置</el-button>
      </div>
    </div>
    <div class="valueTable">
      <el-table
        ref="await_Table"
        :data="mainData.awaitTable"
        tooltip-effect="dark"
        style="width: 100%"
        :header-cell-style="{'background-color':'#FAFAFA'}"
        @selection-change="checkSelection"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column type="index" label="序号" width="55"></el-table-column>
        <el-table-column prop="business_unit_name" label="事业部" width="120" show-overflow-tooltip></el-table-column>
        <el-table-column prop="project_name" label="项目名称" width="150" show-overflow-tooltip></el-table-column>
        <el-table-column prop="room_name" label="房间信息" width="150" show-overflow-tooltip></el-table-column>
        <el-table-column prop="customer_name" label="客户姓名" width="100" show-overflow-tooltip></el-table-column>
        <el-table-column prop="gain_by" label="报备人" width="100" show-overflow-tooltip></el-table-column>
        <el-table-column prop="source_type_desc" label="成交类型" width="120" show-overflow-tooltip></el-table-column>
        <el-table-column prop="current_role" label="经纪人身份" width="120" show-overflow-tooltip></el-table-column>
        <el-table-column prop="transaction_status" label="交易状态" show-overflow-tooltip></el-table-column>
        <el-table-column prop="subscription_date" label="认购时间" width="190" show-overflow-tooltip></el-table-column>
        <el-table-column prop="signing_date" label="签约时间" width="190" show-overflow-tooltip></el-table-column>
        <el-table-column prop="now_price" label="成交金额" show-overflow-tooltip></el-table-column>
        <el-table-column prop="back_price" label="已回款" show-overflow-tooltip></el-table-column>
        <el-table-column prop="collection_proportion" label="回款比例" show-overflow-tooltip></el-table-column>
        <el-table-column prop="employee_name" label="置业顾问" show-overflow-tooltip></el-table-column>
        <el-table-column prop="customer_mobile" label="客户电话" width="120" show-overflow-tooltip></el-table-column>
        <el-table-column prop="report_mobile" label="报备人电话" width="120" show-overflow-tooltip></el-table-column>
        <el-table-column label="经办人" show-overflow-tooltip>
          <template slot-scope="scope">
            {{
            scope.row.creator
            }}
          </template>
        </el-table-column>
        <!-- <el-table-column prop="remarks" label="备注" width="140" show-overflow-tooltip></el-table-column> -->
      </el-table>
    </div>
    <el-pagination
      @size-change="pageSizeChange"
      @current-change="currentPageChange"
      :current-page="mainData.currentPage.awaitPage"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="mainData.pageSize.awaitSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="mainData.pageTotal.awaitTotal"
    ></el-pagination>
  </div>
</template>
<script>
import {
  updateCommission,
  CommissionImport,
  getChecklistListPage
} from "@/api/brokerage";

import { downLoad } from "@/api/request";

export default {
  data() {
    return {
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
          value: "bank_name",
          label: "开户行"
        }
      ],
      statusOptions: [
        { value: "全部", label: "全部" },
        { value: "认购", label: "认购" },
        { value: "签约", label: "签约" },
        { value: "付款后退房", label: "付款后退房" }
      ],
      personOptions: [
        { value: "业主", label: "业主" },
        { value: "公司员工", label: "公司员工" },
        { value: "普通经纪人", label: "普通经纪人" }
      ],
      rules: {},
      dataChanged: false
    };
  },
  created() {
    console.log("commissionAwait created");
  },
  props: {
    mainData: {
      type: Object,
      dafault: {}
    },
    nowRouteName: {
      type: String,
      dafault: ""
    }
  },
  watch: {
    mainData: {
      handler(newv) {
        // this.getValue(newv);
      },
      deep: true
    }
  },
  methods: {
    //表格复选框
    checkSelection(val) {
      this.mainData.checkedList = val;
      console.log(this.mainData.checkedList);
    },
    //重置过滤框
    resetField(name) {
      this.$refs[name].resetFields();
      this.mainData.awaitForm.returnRateStart = "";
      this.mainData.awaitForm.returnRateEnd = "";
      this.mainData.awaitForm.moneyRateStart = "";
      this.mainData.awaitForm.moneyRateEnd = "";
      this.mainData.awaitForm.status = "";
      this.mainData.awaitForm.type = "";
      this.mainData.awaitSeach="";

    },
    //创建核算单
    createAccounts() {
      this.mainData.drawerName = "createAccounts";
      this.mainData.openDrawer = true;
    },
    //关联核算单
    relevanceAccounts() {
      this.randerRelevance();
      this.mainData.drawerName = "relevanceAccounts";
      this.mainData.openDrawer = true;
    },
    //管理表格渲染
    randerRelevance() {
      getChecklistListPage({
        dealType: this.nowRouteName,
        currentPage: this.mainData.currentPage.awaitDetailPage,
        pageSize: this.mainData.pageSize.awaitDetailSize,
        checklistCode: this.mainData.relevanceSearch || "",
        projectStatus: "1,5",
        cityCompany: this.mainData.nowCity,
        projectName: this.mainData.nowProject
      }).then(res => {
        console.log(res);
        if (res.code == 200) {
          this.mainData.relevanceAccounts = res.data.records;
          this.mainData.pageTotal.awaitDetailTotal = res.data.total;
        }
      });
    },
    //终止核算单
    stopAccounts() {
      this.mainData.drawerName = "stopAccounts";
      this.mainData.openDrawer = true;
    },

    // 分页个数改变
    pageSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.mainData.pageSize.awaitSize = val;
      this.$emit("reload");
    },
    //切换分页
    currentPageChange(val) {
      console.log(`当前页: ${val}`);
      this.mainData.currentPage.awaitPage = val;
      this.$emit("reload");
    },
    // 导出
    outExcel() {
      if (this.mainData.checkedList.length == 0) {
        this.$message("请勾选要导出的待结佣订单!");
        return;
      }

      let href = downLoad("/Commission/CommissionExcel", {
        ids: this.mainData.checkedList.map(item => item.id).join(",")
      });
      window.open(href);
    },
    //校验失去焦点前是否有值改变
    ischange() {
      this.dataChanged = true;
    },

    //失去焦点更新表格数据
    blurUpdate(row) {
      if (!this.dataChanged) {
        return;
      }
      let { commission_money, commission_percentage, id } = row;
      updateCommission({
        commission_money,
        commission_percentage,
        id
      }).then(res => {
        this.dataChanged = false;
      });
    },
    emitReload() {
      this.$emit("reload");
    }
  }
};
</script>

<style lang="less" scoped>
.commissionAwait {
  padding: 15px;

  .navbar {
    display: flex;
    position: relative;
    .searchType {
      width: 110px;
      position: absolute;
      top: 0;
      left: 0;
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
      left: 120px;


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
    .btns {
      flex: 1;
      text-align: right;
      .w75 {
        width: 75px;
        height: 30px;
      }
      .w80 {
        width: 80px;
        height: 30px;
      }
      .el-button {
        color: #333;
        font-size: 12px;
        text-align: center;
        padding: 0;
      }
      .createApplyBtn {
        color: #fff;
      }
    }
  }
  .filterBox {
    min-height: 60px;
    line-height: 60px;
    margin-top: 15px;
    margin-bottom: 10px;
    border-top: 1px solid #f5f5f5;
    display: flex;
    .refilter {
      width: 160px;
      padding: 10px;
      line-height: 44px;
      .el-button {
        height: 35px;
        width: 65px;
        padding: 0;
        margin: 0;
        text-align: center;
      }
    }
    .el-form {
      flex: 1;
      display: flex;
      flex-wrap: wrap;
      ::v-deep .el-form-item {
        // flex: 1;
        width: 33.33%;
        line-height: 60px;
        .el-input__inner {
          width: 240px;
          color: #333;
          font-size: 14px;
        }
        .el-date-editor {
          width: 240px !important;
          .el-input__icon {
          display: none;
        }
          .el-range-separator {
            line-height: 28px;
          }
          .el-range-input {
            color: #333;
            font-size: 14px;
          }
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
        .rateBox {
          height: 35px;
          line-height: 32px;
          width: 240px;
          background-color: #fff;
          display: inline-block;
          margin-top: 13px;
          border: 1px solid #dcdfe6;
          border-radius: 4px;
          display: flex;

          .rateInput {
            padding-right: 5px;
            .el-input__inner {
              margin: 0;
              padding: 0;
              border: none;
              height: 32px;
              line-height: 32px;
              padding: 0 2px;
              width: 100%;
            }
            .el-input-group__append {
              padding: 0;
              margin: 0;
              border: none;
              background: #fff;
              line-height: 32px;
              height: 32px;
            }
          }
          > div {
            flex: 1;
            text-align: center;
          }
          .rateText {
            max-width: 15px;
          }
        }
        .el-date-editor.el-input,
        .el-date-editor.el-input__inner {
          width: auto;
        }
      }
      ::v-deep .el-form-item__content {
        line-height: 60px !important;
      }
      ::v-deep .el-form-item__label {
        line-height: 60px !important;
        font-size: 14px;
        color: #333;
      }
      ::v-deep .el-input__inner {
        height: 35px;
        line-height: 35px;
      }
    }
  }
  .el-pagination {
    text-align: right;
  }
}
</style>
