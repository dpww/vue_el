<template>
  <div class="settlementDetail">
    <div class="settlementDetail_top">
      <el-form
        v-show="mainData.dialogHeightSearchFlag"
        class="heightSearch"
        ref="dialogHeightSearch"
        :model="mainData.settlementDialogForm"
        :rules="rules"
        label-width="110px"
      >
        <el-form-item prop="searchDetail" class="rate_form">
          <template slot="label">
            <el-select
              class="detailSelect"
              v-model="mainData.settlementDialogForm.detailTypeOne"
              placeholder="请选择"
            >
              <el-option
                v-for="item in typeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </template>
          <el-input class="searchDetailInput" v-model="mainData.settlementDialogForm.searchDetail"></el-input>
        </el-form-item>

        <el-form-item prop="rateStart" class="rate_form">
          <template slot="label">
            <el-select
              class="detailSelect"
              v-model="mainData.settlementDialogForm.detailTypeTwo"
              placeholder="请选择"
            >
              <el-option value="回款比例" label="回款比例"></el-option>
              <el-option value="佣金点位" label="佣金点位"></el-option>
            </el-select>
          </template>
          <div class="rateBox">
            <div>
              <el-input class="rateInput" v-model="mainData.settlementDialogForm.rateStart">
                <template slot="append">%</template>
              </el-input>
            </div>
            <div class="rateText">至</div>
            <div>
              <el-input class="rateInput" v-model="mainData.settlementDialogForm.rateEnd">
                <template slot="append">%</template>
              </el-input>
            </div>
          </div>
        </el-form-item>
        <el-form-item label="签约时间" prop="assginTime">
          <el-date-picker
            v-model="mainData.settlementDialogForm.assginTime"
            type="daterange"
            range-separator="至"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="认购时间" class="transformBox" prop="applyTime">
          <el-date-picker
            v-model="mainData.settlementDialogForm.applyTime"
            type="daterange"
            range-separator="至"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </el-form-item>
        <el-form-item prop="rateStart" label="佣金立项金额" class="rate_form transformBox">
          <div class="rateBox">
            <div>
              <el-input class="rateInput" v-model="mainData.settlementDialogForm.moneyStart"></el-input>
            </div>
            <div class="rateText">至</div>
            <div>
              <el-input class="rateInput" v-model="mainData.settlementDialogForm.moneyEnd"></el-input>
            </div>
          </div>
        </el-form-item>
        <el-form-item label="是否结清" class="transformBox" prop="isSettle">
          <el-select v-model="mainData.settlementDialogForm.isSettle" placeholder="请选择">
            <el-option value="是" label="是"></el-option>
            <el-option value="否" label="否"></el-option>
            <el-option value="全部" label="全部"></el-option>
          </el-select>
        </el-form-item>
        <div class="form-bottom_btn">
          <el-button type="primary">确定</el-button>
          <el-button @click="resetField('dialogHeightSearch')">重置</el-button>
        </div>
      </el-form>
    </div>
    <div class="settlementDetail_bottom">
      <el-table
        ref="multipleTable"
        :data="mainData.settlementDialogTable"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="checkSelection"
        :header-cell-style="{'background-color':'#FAFAFA'}"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column type="index" label="序号" width="55"></el-table-column>
        <el-table-column prop="project_code" label="立项编号" show-overflow-tooltip></el-table-column>
        <el-table-column prop="business_unit_name" label="事业部" show-overflow-tooltip></el-table-column>
        <el-table-column prop="project_name" label="项目名称" show-overflow-tooltip></el-table-column>
        <el-table-column prop="room_name" label="房间信息" show-overflow-tooltip></el-table-column>
        <el-table-column prop="transaction_status" label="交易状态" show-overflow-tooltip></el-table-column>
        <el-table-column prop="now_price" label="成交金额(元)" show-overflow-tooltip></el-table-column>
        <el-table-column prop="back_price" label="已回款金额(元)" show-overflow-tooltip></el-table-column>
        <el-table-column prop="collection_proportion" label="回款比例" show-overflow-tooltip></el-table-column>
        <el-table-column prop="project_amount" label="佣金立项金额(元)">
          <template slot-scope="scope">
            <el-input
              @blur="blurUpdate(scope.row)"
              @change="ischange"
              type="number"
              v-only-number="{ precision: 0}"
              v-model="scope.row.project_amount"
            ></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="commission_point" label="佣金点位" width="100">
          <template slot-scope="scope">
            <div style="display:flex">
               <el-input
               style="flex:1"
              @blur="blurUpdate(scope.row)"
              v-only-number="{ min: 0, precision: 2 }"
              @change="ischange"
              type="number"
              v-model="scope.row.commission_point"
            ></el-input>
            <div
               style="width:14px"
            >%</div>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="amount_closed" label="已结金额(元)" show-overflow-tooltip></el-table-column>
        <el-table-column prop="outstanding_amount" label="未结金额(元)" show-overflow-tooltip></el-table-column>
        <el-table-column prop="amount_paid" label="已付金额(元)" show-overflow-tooltip></el-table-column>
        <el-table-column prop="com_payment_ratio" label="佣金付款比例" show-overflow-tooltip></el-table-column>
        <el-table-column prop="deal_type" label="成交类型" show-overflow-tooltip></el-table-column>
        <el-table-column prop="gain_by" label="报备人" show-overflow-tooltip></el-table-column>
        <el-table-column prop="current_role" label="经纪人身份" show-overflow-tooltip></el-table-column>
        <el-table-column prop="employee_name" label="置业顾问" show-overflow-tooltip></el-table-column>
        <el-table-column prop="customer_name" label="客户姓名" show-overflow-tooltip></el-table-column>
        <el-table-column prop="subscription_date" label="认购时间" show-overflow-tooltip></el-table-column>
        <el-table-column prop="signing_date" label="签约时间" show-overflow-tooltip></el-table-column>
        <el-table-column prop="bank_num" label="报备人银行卡号" show-overflow-tooltip></el-table-column>
        <el-table-column prop="bank_name" label="报备人开户行" show-overflow-tooltip></el-table-column>
        <el-table-column prop="reportIdCard" label="报备人身份证号" show-overflow-tooltip></el-table-column>
        <el-table-column prop="customer_mobile" label="客户电话" show-overflow-tooltip></el-table-column>
        <el-table-column prop="report_mobile" label="报备人电话" show-overflow-tooltip></el-table-column>
        <el-table-column label="操作" fixed="right" width="200">
          <template slot-scope="scope">
            <el-button type="text" @click="delSettlementDialogTable(scope.row)">移除</el-button>
            <el-button type="text">查看明细</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-pagination
      @size-change="pageDetailSizeChange"
      @current-change="currentDetailPageChange"
      :current-page="mainData.currentPage.settlementDetailPage"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="mainData.pageSize.settlementDetailSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="mainData.pageTotal.settlementDetailTotal"
    ></el-pagination>
  </div>
</template>

<script>
import { removeChecklistDetail, updateProjectAmount } from "@/api/brokerage";
export default {
  data() {
    return {
      rules: {},
      dataChanged: false,
      typeOptions: [
        {
          value: "房间信息",
          label: "房间信息"
        },
        {
          value: "置业顾问",
          label: "置业顾问"
        },
        {
          value: "客户姓名",
          label: "客户姓名"
        },
        {
          value: "报备人",
          label: "报备人"
        },
        {
          value: "银行卡号",
          label: "银行卡号"
        },
        {
          value: "身份证号",
          label: "身份证号"
        },
        {
          value: "核算单编号",
          label: "核算单编号"
        },
        {
          value: "立项编号",
          label: "立项编号"
        }
      ]
    };
  },
  methods: {
    //复选框选中
    checkSelection(val) {
      console.log(val);
      this.mainData.settlementDetailChecklist = val;
    },
    //重置
    resetField(name) {
      this.$refs[name].resetFields();
      this.mainData.settlementDialogForm.rateStart = "";
      this.mainData.settlementDialogForm.rateEnd = "";
      this.mainData.settlementDialogForm.moneyStart = "";
      this.mainData.settlementDialogForm.moneyEnd = "";
    },
    //删除
    delSettlementDialogTable(row) {
      removeChecklistDetail({ checklistDetailId: row.id }).then(res => {
        console.log(res);
        if (res.code == 200) {
          this.$emit("settlementDialogReload");
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        }
      });
    },
    // 分页个数改变
    pageDetailSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.mainData.pageSize.settlementDetailSize = val;
      this.$emit("settlementDialogReload");
    },
    //切换分页
    currentDetailPageChange(val) {
      console.log(`当前页: ${val}`);
      this.mainData.currentPage.settlementDetailPage = val;
      this.$emit("settlementDialogReload");
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
      let { project_amount, commission_point, id } = row;
      updateProjectAmount({
        id: id,
        projectAmount: project_amount || "",
        commissionPoint: commission_point || ""
      }).then(res => {
        this.dataChanged = false;
        this.$emit("settlementDialogReload");
      });
    }
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
  }
};
</script>
<style lang="less" scoped>
.settlementDetail {
  .settlementDetail_top {
    .heightSearch {
      position: relative;
      padding-top: 10px;
      height: 180px;
      display: flex;
      flex-wrap: wrap;
      background: #f5f8fe;

      > .el-form-item {
        width: 33.33%;
        height: 35px;
        line-height: 35px;

        .el-select {
          width: 200px;
        }
        .detailSelect {
          width: 100px;
          vertical-align: middle;
        }
        .el-input {
          width: 200px;
        }
        .el-date-editor {
          width: 200px;
          ::v-deep .el-input__icon {
            display: none;
          }
          ::v-deep .el-range-input {
            width: 80px;
          }
          ::v-deep .el-range-separator {
            line-height: 19px;
          }
        }
        .searchDetailInput {
          line-height: 35px;
          height: 35px;
          vertical-align: middle;
          margin-top: 4px;
        }
        .rateBox {
          display: flex;
          border: 1px solid #dcdfe6;
          border-radius: 4px;
          background: #fff;
          width: 200px;
          .rateInput {
            line-height: 35px;
            vertical-align: middle;
            width: 100%;
            ::v-deep .el-input__inner {
              border: none;
              padding: 0 3px;
            }
            ::v-deep .el-input-group__append {
              padding: 0;
              margin: 0;
              border: none;
              background: #fff;
            }
          }
          .rateText {
            line-height: 35px;
          }
        }
        ::v-deep .el-input__inner {
          line-height: 35px;
          height: 35px;
        }
        ::v-deep .el-range-separator {
          line-height: 35px !important ;
          height: 35px;
        }
      }
      .transformBox {
        transform: translateY(-30px);
      }
      ::v-deep .el-form-item__content {
        line-height: 35px !important;
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
  }

  .el-pagination {
    text-align: right;
  }
}
</style>
