<template>
  <div class="commissionPayment">
    <div class="searchBox">
      <el-select class="searchType" v-model="mainData.paymentForm.type" placeholder="请选择">
        <el-option
          v-for="item in typeOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <div class="searchInput">
        <el-input placeholder="请输入" v-model="mainData.paymentSearch" class="input-with-select">
          <el-button class="searchIcon" slot="append" @click="emitReload" icon="el-icon-search"></el-button>
        </el-input>
      </div>
      <div class="searchBox_btns">
        <el-button class="w80" @click="mainData.paymentHeightSearch=!mainData.paymentHeightSearch">
          高级筛选
          <i
            :class="{ 'el-icon-arrow-up' : mainData.paymentHeightSearch,'el-icon-arrow-down' : !mainData.paymentHeightSearch,}"
          ></i>
        </el-button>
        <el-button class="w75 export" type="primary" @click="outExcel">导出</el-button>
      </div>
    </div>
    <el-form
      v-show="mainData.paymentHeightSearch"
      class="heightSearch"
      ref="paymentSearch"
      :model="mainData.paymentForm"
      :rules="rules"
      label-width="110px"
    >
      <el-form-item label="创建时间" prop="time">
        <el-date-picker
          v-model="mainData.paymentForm.time"
          type="daterange"
          range-separator="至"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="付款单审批状态" prop="status">
        <el-select v-model="mainData.paymentForm.status" placeholder="请选择">
          <el-option
            v-for="item in paymentOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="渠道名称" prop="name" v-if="nowRouteNameNum!=1">
        <el-select v-model="mainData.paymentForm.name" placeholder="请选择">
          <el-option
            v-for="item in mainData.channelOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <div class="form-bottom_btn">
        <el-button type="primary" @click="emitReload">确定</el-button>
        <el-button @click="resetField('paymentSearch')">重置</el-button>
      </div>
    </el-form>
    <div class="valueTable">
      <el-table
        ref="multipleTable"
        :data="mainData.paymentTable"
        tooltip-effect="dark"
        style="width: 100%"
        :header-cell-style="{'background-color':'#FAFAFA'}"
        @selection-change="settlementcheckSelection"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column type="index" label="序号" width="55"></el-table-column>
        <el-table-column prop="business_unit_name" label="事业部" show-overflow-tooltip width="150"></el-table-column>
        <el-table-column prop="project_name" label="项目名称" show-overflow-tooltip width="150"></el-table-column>
        <el-table-column prop="receipt_code" label="付款单编号" show-overflow-tooltip width="150"></el-table-column>
        <el-table-column prop="payment_amount" label="付款金额(元)" show-overflow-tooltip></el-table-column>
        <el-table-column prop="paymentStatus" label="付款审批状态" show-overflow-tooltip></el-table-column>
        <el-table-column prop="payment_code" label="付款申请编号" show-overflow-tooltip></el-table-column>
        <el-table-column prop="project_code" label="立项编号" show-overflow-tooltip></el-table-column>
        <el-table-column prop="checklist_code" label="核算单编号" show-overflow-tooltip width="150"></el-table-column>
        <el-table-column prop="creator" label="创建人" show-overflow-tooltip></el-table-column>
        <el-table-column prop="create_time" label="创建时间" show-overflow-tooltip></el-table-column>
        <el-table-column label="操作" fixed="right" width="360">
          <template slot-scope="scope">
            <el-button type="text" @click="paymentDetail(scope.row)">查看</el-button>
            <el-button type="text" @click="viewPolicyDetail(scope.row)">查看政策</el-button>
               <el-button
              type="text"
              v-if="scope.row.payment_status==1||scope.row.payment_status==5"
              @click="startApply(scope.row)"
            >审核</el-button>
            <el-button
              type="text"
              v-if="scope.row.payment_status==1||scope.row.payment_status==5"
              @click="delPayment(scope.row.id)"
            >删除</el-button>
            <el-button
              type="text"
              @click="backApply(scope.row)"
              v-if="scope.row.payment_status==2"
            >撤回</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-pagination
      @size-change="pageSizeChange"
      @current-change="currentPageChange"
      :current-page="mainData.currentPage.paymentPage"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="mainData.pageSize.paymentSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="mainData.pageTotal.paymentTotal"
    ></el-pagination>
  </div>
</template>

<script>
import {
  selectReceiptDetail,
  deleteReceipt,
  getChecklistPolicyListPage,
  updateReceiptMyTrade,
  receiptAddApproval
} from "@/api/brokerage";
import { downLoad } from "@/api/request";
export default {
  created() {
    console.log("commissionPayment created");
  },
  data() {
    return {
      paymentOptions: [
        {
          value: "",
          label: "全部"
        },
        {
          value: "1",
          label: "草稿"
        },
        {
          value: "2",
          label: "已审核"
        },
        {
          value: "3",
          label: "审批中"
        },

        {
          value: "4",
          label: "付款通过"
        },

        {
          value: "5",
          label: "付款驳回"
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
        },
        {
          value: "checklist_code",
          label: "核算单编号"
        },
        {
          value: "project_code",
          label: "立项编号"
        },
        {
          value: "receipt_code",
          label: "付款单编号"
        },
        {
          value: "payment_code",
          label: "付款申请编号"
        }
      ],

      rules: {}
    };
  },
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
    //删除
    delPayment(id) {
      deleteReceipt({
        id
      }).then(res => {
        console.log(res);
        if (res.code == 200) {
          this.$emit("reload");
        }
      });
    },
    //复选框
    settlementcheckSelection(val) {
      this.mainData.paymentCheckedList = val;
      console.log(val);
    },
    //重置
    resetField(name) {
      this.$refs[name].resetFields();
      this.mainData.paymentForm.time = "";
    },
    //渲染付款单明细
    randerPaymentTable(row) {
      selectReceiptDetail({
        receipt_id: row.id,
        pageIndex: this.mainData.currentPage.paymentDetailPage,
        pageSize: this.mainData.pageSize.paymentDetailSize
      }).then(res => {
        console.log(res);
        if (res.code == 200) {
          this.mainData.paymentDialogTable = res.data.list;
          this.mainData.pageTotal.paymentDetailTotal = res.data.total;
        }
      });
    },
    //查看
    paymentDetail(row) {
      this.mainData.nowPaymentId = row.id;
      this.randerPaymentTable(row);
      this.mainData.openDialog = true;
      this.mainData.dialogName = "paymentDetail";
      this.mainData.dialogWidth = "70%";
    },
    // 分页个数改变
    pageSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.mainData.pageSize.paymentSize = val;
      this.emitReload();
    },
    //切换分页
    currentPageChange(val) {
      console.log(`当前页: ${val}`);
      this.mainData.currentPage.paymentPage = val;
      this.emitReload();
    },
    //重新渲染
    emitReload() {
      this.$emit("reload");
    },
    //导出
    outExcel() {
      if (this.mainData.paymentCheckedList.length == 0) {
        this.$message("请勾选要导出的付款单");
        return;
      }
      let href = downLoad("/Receipt/ReceiptDetailExcel", {
        rids: this.mainData.paymentCheckedList.map(item => item.id).join("','")
      });
      window.open(href);
    },
    // 查看政策表格
    randerViewPolicyTable(row) {
      getChecklistPolicyListPage({
        currentPage: this.mainData.currentPage.viewPolicyPage,
        pageSize: this.mainData.pageSize.viewPolicySize,
        checklistId: row.checklist_id
      }).then(res => {
        console.log(res);
        if (res.code == 200) {
          this.mainData.viewPolicyTable = res.data.records;
          this.mainData.pageTotal.viewPolicyTotal = res.data.total;
        }
      });
    },
    // 查看政策
    viewPolicyDetail(row) {
      this.mainData.viewPolicyChecked=row.checklist_id
      this.randerViewPolicyTable(row);
      this.mainData.openDialog = true;
      this.mainData.dialogName = "viewPolicy";
      this.mainData.dialogWidth = "70%";
    },
    //撤回
    backApply(row) {
      this.$confirm("是否撤回?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          receiptAddApproval({
            payment_status: "1",
            username: localStorage.getItem("username"),
            id: row.id
          }).then(res => {
            console.log(res);
            if (res.code == 200) {
              this.$message.success("撤回成功");
              this.$emit("reload");
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消"
          });
        });
    },
    //审核
    startApply(row) {
      console.log(row);
      updateReceiptMyTrade({
        receipt_id: row.id
      }).then(res => {
        console.log(res);
        if (res.code == 200) {
          if(res.messages=="false"){
            this.$message(res.messages)
            return
          }
          this.$confirm("是否审核?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          })
            .then(() => {
              receiptAddApproval({
                payment_status: "2",
                username: localStorage.getItem("username"),
                id: row.id
              }).then(res => {
                console.log(res);
                if (res.code == 200) {
                  this.$message.success("审核成功");
                  this.$emit("reload");
                }
              });
            })
            .catch(() => {
              this.$message({
                type: "info",
                message: "已取消审核"
              });
            });
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.commissionPayment {
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
      right: 410px;
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
      right: 190px;
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
      width: 190px;
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
    > .el-form-item {
      width: 33.33%;
      height: 35px;
      line-height: 35px;
      ::v-deep .el-form-item__label {
        color: #333;
        font-size: 14px;
      }
      ::v-deep .el-input__inner {
        height: 35px;
        line-height: 35px;
        color: #333;
        font-size: 14px;
      }
      .el-select {
        width: 200px;
      }
      .el-input {
        width: 200px;
      }
      .el-date-editor {
        width: 200px;
        color: #333;
        font-size: 14px;
        ::v-deep .el-input__icon {
          display: none;
        }
        ::v-deep .el-range-input {
          width: 80px;
        }
        ::v-deep .el-range-separator {
          line-height: 27px;
        }
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
