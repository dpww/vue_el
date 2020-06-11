<template>
  <div class="paymentDetail">
    <el-table
      ref="multipleTable"
      :data="mainData.paymentDialogTable"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="paymentSelection"
      :header-cell-style="{'background-color':'#FAFAFA'}"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column type="index" label="序号" width="55"></el-table-column>
      <el-table-column prop="receipt_id" label="立项编号" show-overflow-tooltip width="150"></el-table-column>
      <el-table-column prop="business_unit_name" label="事业部" show-overflow-tooltip width="150"></el-table-column>
      <el-table-column prop="project_name" label="项目名称" show-overflow-tooltip width="150"></el-table-column>
      <el-table-column prop="room_name" label="房间信息" show-overflow-tooltip width="150"></el-table-column>
      <el-table-column prop="transaction_status" label="交易状态" show-overflow-tooltip></el-table-column>
      <el-table-column prop="now_price" label="成交金额(元)" show-overflow-tooltip></el-table-column>
      <el-table-column prop="back_price" label="已回款金额(元)" show-overflow-tooltip></el-table-column>
      <el-table-column prop="collection_proportion" label="回款比例" show-overflow-tooltip></el-table-column>
      <el-table-column prop="project_amount" label="佣金立项金额(元)" show-overflow-tooltip></el-table-column>
      <el-table-column prop="amount_closed" label="已结金额(元)" show-overflow-tooltip></el-table-column>
      <el-table-column prop="outstanding_amount" label="未结金额(元)" show-overflow-tooltip></el-table-column>
      <el-table-column prop="payment_ratio" label="佣金付款比例" show-overflow-tooltip></el-table-column>
      <el-table-column prop="application_amount" label="付款申请金额(元)">
        <template slot-scope="scope">
          <el-input
            v-if="scope.row.my_STATUS=='激活'"
            type="number"
            @change="isUpdateNum"
            @blur="updateNum(scope.row)"
            v-model="scope.row.application_amount"
          ></el-input>
          <span v-else>{{scope.row.application_amount}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="system_risk" label="系统提示风险" show-overflow-tooltip>
        <template slot-scope="scope">
          <div class="riskbox">
            <div v-if="scope.row.system_risk=='风险'" style="background: #F5212D;" class="circle"></div>
            <div
              v-else-if="scope.row.system_risk=='未知'"
              style="background: #FAAD15;"
              class="circle"
            ></div>
            <div
              v-else-if="scope.row.system_risk=='正常'"
              style="background: #52C41A;"
              class="circle"
            ></div>
            <div v-else style="background: #000;" class="circle"></div>
            <span>{{scope.row.system_risk}}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="artificial_risk" label="人工复核风险" show-overflow-tooltip></el-table-column>
      <el-table-column prop="address" label="风险标识" show-overflow-tooltip></el-table-column>
      <el-table-column prop="customer_name" label="客户姓名" show-overflow-tooltip width="200">
        <template slot-scope="scope">
          <!-- {{scope.row.customer_name&&scope.row.customer_name.split(";")}} -->
          <div v-if="scope.row.customer_name">
            <span
              v-for="(item,index) in scope.row.customer_name.split(';')"
              style="color:#2761FF;margin:0 3px;cursor: pointer;"
              @click="toRisk(scope.row,index)"
            >{{item}}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="gain_by" label="报备人" show-overflow-tooltip></el-table-column>
      <el-table-column prop="source_type_desc" label="成交类型" show-overflow-tooltip></el-table-column>
      <el-table-column prop="current_role" label="经纪人身份" show-overflow-tooltip></el-table-column>
      <el-table-column prop="employee_name" label="置业顾问" show-overflow-tooltip></el-table-column>
      <el-table-column prop="bank_name" label="报备人开户行" show-overflow-tooltip></el-table-column>
      <el-table-column prop="bank_num" label="报备人身份证号" show-overflow-tooltip></el-table-column>
      <el-table-column prop="reportIdCard" label="报备人银行卡号" show-overflow-tooltip width="180"></el-table-column>
      <el-table-column label="操作" fixed="right" show-overflow-tooltip width="200">
        <template slot-scope="scope">
          <el-button type="text" @click="delDetail(scope.row.id)">移除</el-button>
          <el-button type="text" @click="awaitUpload(scope.row.id)">查看附件</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="pageSizeChange"
      @current-change="currentPageChange"
      :current-page="mainData.currentPage.paymentDetailPage"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="mainData.pageSize.paymentDetailSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="mainData.pageTotal.paymentDetailTotal"
    ></el-pagination>
  </div>
</template>

<script>
import {
  updateReceiptDetail,
  getFileList,
  deleteReceiptDetail
} from "@/api/brokerage";
export default {
  data() {
    return {
      isUpdateFlag: false
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
    //删除明细
    delDetail(id) {
      deleteReceiptDetail({
        id
      }).then(res => {
        console.log(res);
        if (res.code == 200) {
          this.$emit("randerPaymentDetail", this.mainData.nowPaymentId);
        }
      });
    },
    //渲染附件列表
    randerFile(id) {
      getFileList({
        id
      }).then(res => {
        console.log(res);
        if (res.code == 200) {
          this.mainData.awaitUploadList = res.data;
        }
      });
    },
    //附件上传
    awaitUpload(id) {
      this.randerFile(id);
      this.mainData.paymentUploadID = id;
      this.mainData.drawerName = "awaitUpload";
      this.mainData.openDrawer = true;
    },
    paymentSelection(val) {
      this.mainData.paymentDetailCheckeds = val;
    },
    // 分页个数改变
    pageSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.mainData.pageSize.paymentDetailSize = val;
      this.$emit("randerPaymentDetail", this.mainData.nowPaymentId);
    },
    //切换分页
    currentPageChange(val) {
      console.log(`当前页: ${val}`);
      this.mainData.currentPage.paymentDetailPage = val;
      this.$emit("randerPaymentDetail", this.mainData.nowPaymentId);
    },
    isUpdateNum() {
      this.isUpdateFlag = true;
    },
    updateNum(row) {
      if (!this.isUpdateFlag) {
        return;
      }
      let { application_amount, id } = row;
      updateReceiptDetail({
        id,
        application_amount
      }).then(res => {
        console.log(res);
        if (res.code == 200) {
          this.isUpdateFlag = false;
          this.$emit("randerPaymentDetail", this.mainData.nowPaymentId);
        }
      });
    },
    toRisk(row, index) {
      // console.log(row);
      let target;
      if (location.origin.includes("uat") || location.origin.includes("test")) {
        target = "https://face-sys-test.cifi.com.cn";
      } else {
        target = "https://face-sys.cifi.com.cn/";
      }
      let i = row.customer_code.split(";")[index];
      open(
        `${target}/#/customerDetail?id=${i}&thirdPrjId=${this.mainData.project_id}&menu=true`
      );
    }
  }
};
</script>

<style lang="less" scoped>
.paymentDetail {
  .riskbox {
    position: relative;
    padding-left: 15px;

    .circle {
      position: absolute;
      top: 50%;
      left: 5px;
      transform: translateY(-50%);
      height: 6px;
      width: 6px;
      border-radius: 50%;
    }
  }
  .el-pagination {
    text-align: right;
  }
}
</style>
