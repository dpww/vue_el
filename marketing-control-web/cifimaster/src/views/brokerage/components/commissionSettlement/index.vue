<template>
  <div class="commissionSettlement">
    <div class="searchBox">
      <el-select class="searchType" v-model="mainData.settlementForm.type" placeholder="请选择">
        <el-option
          v-for="item in typeOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <div class="searchInput">
        <el-input placeholder="请输入" v-model="mainData.settlementSeach" class="input-with-select">
          <el-button class="searchIcon" @click="emitReload" slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </div>
      <div class="searchBox_btns">
        <el-button class="w80" @click="mainData.heightSearchFlag=!mainData.heightSearchFlag">
          高级筛选
          <i
            :class="{ 'el-icon-arrow-up' : mainData.heightSearchFlag,'el-icon-arrow-down' : !mainData.heightSearchFlag,}"
          ></i>
        </el-button>
        <el-button class="w80" @click="createMinus">创建负核算单</el-button>
        <el-button class="w75 export" type="primary" @click="outExcel">导出</el-button>
      </div>
    </div>
    <el-form
      v-show="mainData.heightSearchFlag"
      class="heightSearch"
      ref="heightSearch"
      :model="mainData.settlementForm"
      :rules="rules"
      label-width="110px"
    >
      <el-form-item label="立项状态" prop="code">
        <el-select v-model="mainData.settlementForm.code" placeholder="请选择">
          <el-option
            v-for="item in statusOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="是否付清" prop="name">
        <el-select v-model="mainData.settlementForm.name" placeholder="请选择">
          <el-option
            v-for="item in channelOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="创建时间" prop="time">
        <el-date-picker
          v-model="mainData.settlementForm.time"
          type="daterange"
          range-separator="至"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
          value-format="yyyy-MM-dd"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="渠道名称" prop="channelName" class="form_status" v-if="nowRouteNameNum!=1">
        <el-select v-model="mainData.settlementForm.channelName" placeholder="请选择">
          <el-option
            v-for="item in mainData.channelNameOptions"
            :key="item.gain_num"
            :label="item.gain_by"
            :value="item.gain_num"
          ></el-option>
        </el-select>
      </el-form-item>
      <div class="form-bottom_btn">
        <el-button @click="emitReload" type="primary">确定</el-button>
        <el-button @click="resetField('heightSearch')">重置</el-button>
      </div>
    </el-form>
    <div class="valueTable">
      <el-table
        ref="multipleTable"
        :data="mainData.settlementTable"
        tooltip-effect="dark"
        style="width: 100%"
        :header-cell-style="{'background-color':'#FAFAFA'}"
        @selection-change="settlementcheckSelection"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column type="index" label="序号" width="55"></el-table-column>
        <el-table-column prop="division" label="事业部" width="150" show-overflow-tooltip></el-table-column>
        <el-table-column prop="project_name" label="项目名称" width="150" show-overflow-tooltip></el-table-column>
        <el-table-column prop="checklist_code" label="核算单编号" width="120" show-overflow-tooltip></el-table-column>
        <el-table-column prop="is_abnormal" label="异常标识" show-overflow-tooltip></el-table-column>
        <el-table-column prop="deal_type" label="成交类型" width="100" show-overflow-tooltip></el-table-column>
        <el-table-column prop="project_code" label="立项编号" width="120" show-overflow-tooltip></el-table-column>
        <el-table-column prop="project_status" label="立项状态" show-overflow-tooltip>
          <template slot-scope="scope">
            <span v-if="scope.row.project_status==1">草稿</span>
            <span v-else-if="scope.row.project_status==2">已审核</span>
            <span v-else-if="scope.row.project_status==3">已立项</span>
            <span v-else-if="scope.row.project_status==4">立项通过</span>
            <span v-else-if="scope.row.project_status==5">立项驳回</span>
            <span v-else-if="scope.row.project_status==6">立项撤销</span>
          </template>
        </el-table-column>
        <el-table-column prop="project_amount" label="佣金立项金额（元）" show-overflow-tooltip></el-table-column>
        <el-table-column prop="payment_closed" label="已结金额" show-overflow-tooltip></el-table-column>
        <el-table-column prop="creator" label="创建人" width="150" show-overflow-tooltip></el-table-column>
        <el-table-column prop="create_time" label="创建时间" width="150" show-overflow-tooltip></el-table-column>
        <el-table-column label="操作" width="340" fixed="right">
          <template slot-scope="scope">
            <el-button type="text" @click="settlementDetail(scope.row)">查看</el-button>
            <el-button
              v-if="scope.row.project_status!=1&&scope.row.project_status!=5"
              type="text"
              @click="viewPolicyDetail(scope.row)"
            >查看政策</el-button>
            <el-button
              v-if="scope.row.project_status==1||scope.row.project_status==5"
              type="text"
              @click="relevancePolicyDetail(scope.row)"
            >关联政策</el-button>
            <el-button
              v-if="scope.row.project_status==1||scope.row.project_status==5"
              type="text"
              @click="settlementAudit(scope.row.id)"
            >审核</el-button>
            <el-button
              v-if="scope.row.project_status==1||scope.row.project_status==5"
              type="text"
              @click="delSettlement(scope.row.id)"
            >删除</el-button>
            <el-button
              v-if="scope.row.project_status==2"
              type="text"
              @click="backApply(scope.row.id)"
            >撤回</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-pagination
      @size-change="pageSizeChange"
      @current-change="currentPageChange"
      :current-page="mainData.currentPage.settlementPage"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="mainData.pageSize.settlementSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="mainData.pageTotal.settlementTotal"
    ></el-pagination>
  </div>
</template>

<script>
import {
  getChecklistDetailListPage,
  deleteChecklist,
  getNegativeChecklist,
  getChecklistPolicyListPage,
  checklistWithdraw
} from "@/api/brokerage";
import { downLoad } from "@/api/request";
export default {
  created() {
    console.log("commissionSettlement created");
  },
  data() {
    return {
      channelOptions: [
        {
          value: "是",
          label: "是"
        },
        {
          value: "否",
          label: "否"
        },
        {
          value: "全部",
          label: "全部"
        }
      ],
      statusOptions: [
        {
          value: "全部",
          label: "全部"
        },
        {
          value: "已立项",
          label: "已立项"
        },
        {
          value: "草稿",
          label: "草稿"
        },
        {
          value: "立项通过",
          label: "立项通过"
        },
        {
          value: "立项驳回",
          label: "立项驳回"
        }
      ],
      nameOptions: [],
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
    //复选框选中
    settlementcheckSelection(val) {
      console.log(val);
      this.mainData.settlementChecklist = val;
    },
    //重置
    resetField(name) {
      this.$refs[name].resetFields();
      this.mainData.settlementForm.time = "";
    },
    //审核
    settlementAudit(id) {
      this.mainData.nowApproveId = id;
      this.mainData.openDialog = true;
      this.mainData.dialogName = "settlementAudit";
      this.mainData.dialogWidth = "30%";
    },
    // 查看政策表格
    randerViewPolicyTable(row) {
      getChecklistPolicyListPage({
        currentPage: this.mainData.currentPage.viewPolicyPage,
        pageSize: this.mainData.pageSize.viewPolicySize,
        checklistId: row.id
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
      this.randerViewPolicyTable(row);
      this.mainData.openDialog = true;
      this.mainData.dialogName = "viewPolicy";
      this.mainData.dialogWidth = "70%";
    },
    //渲染政策列表
    randerPolicyTable(row) {
      getChecklistPolicyListPage({
        currentPage: this.mainData.currentPage.viewPolicyPage,
        pageSize: this.mainData.pageSize.viewPolicySize,
        checklistId: row.id
      }).then(res => {
        this.mainData.relevancePolicyTable = res.data.records;
        this.mainData.pageTotal.relevancePolicyTotal = res.data.total;
      });
    },
    // 关联政策
    relevancePolicyDetail(row) {
      console.log(row);
      this.randerPolicyTable(row);
      this.mainData.nowPolicyId = row.id;
      this.mainData.dialogName = "relevancePolicy";
      this.mainData.openDialog = true;
      this.mainData.dialogWidth = "70%";
    },
    //查看
    settlementDetail(row) {
      this.mainData.nowCheckedId = row.id;
      this.randerDetail(row);
      this.mainData.openDialog = true;
      this.mainData.dialogName = "settlementDetail";
      this.mainData.dialogWidth = "70%";
    },
    //渲染明细
    randerDetail(row) {
      let startSubscribeTime =
        this.mainData.settlementDialogForm.applyTime[0] || "";
      let endSubscribeTime =
        this.mainData.settlementDialogForm.applyTime[1] || "";
      let startSignTime =
        this.mainData.settlementDialogForm.assginTime[0] || "";
      let endSignTime = this.mainData.settlementDialogForm.assginTime[1] || "";
      let startProjectAmount =
        this.mainData.settlementDialogForm.moneyStart || "";
      let endProjectAmount = this.mainData.settlementDialogForm.moneyEnd || "";
      let reqObj = {
        currentPage: this.mainData.currentPage.settlementDetailPage,
        pageSize: this.mainData.pageSize.settlementDetailSize,
        checklistId: row.id,
        keyWordType: this.mainData.settlementDialogForm.detailTypeOne,
        keyWord: this.mainData.settlementDialogForm.searchDetail,
        keyWordType2: this.mainData.settlementDialogForm.detailTypeTwo,
        startKeyWord: this.mainData.settlementDialogForm.rateStart,
        endKeyWord: this.mainData.settlementDialogForm.rateEnd,
        isSettle: this.mainData.settlementDialogForm.isSettle
      };
      if (startSubscribeTime) reqObj.startSubscribeTime = startSubscribeTime;
      if (endSubscribeTime) reqObj.endSubscribeTime = endSubscribeTime;
      if (startSignTime) reqObj.startSignTime = startSignTime;
      if (endSignTime) reqObj.endSignTime = endSignTime;
      if (startProjectAmount) reqObj.startProjectAmount = startProjectAmount;
      if (endProjectAmount) reqObj.endProjectAmount = endProjectAmount;
      getChecklistDetailListPage(reqObj).then(res => {
        console.log(res);
        if (res.code == 200) {
          this.mainData.pageTotal.settlementDetailTotal = res.data.total;
          this.mainData.settlementDialogTable = res.data.records;
        }
      });
    },
    //删除
    delSettlement(id) {
      this.$confirm("此操作将永久删除该条数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          deleteChecklist({
            ids: id
          }).then(res => {
            console.log(res);
            if (res.code == 200) {
              this.$message({
                type: "success",
                message: "删除成功!"
              });
            }
            this.$emit("reload");
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    // 分页个数改变
    pageSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.mainData.pageSize.settlementSize = val;
      this.$emit("reload");
    },
    //切换分页
    currentPageChange(val) {
      console.log(`当前页: ${val}`);
      this.mainData.currentPage.settlementPage = val;
      this.$emit("reload");
    },
    //搜索
    emitReload() {
      this.$emit("reload");
    },
    // 导出
    outExcel() {
      if (this.mainData.settlementChecklist.length == 0) {
        this.$message("请勾选要导出的核算单!");
        return;
      }
      let href = downLoad("/checklist/exportChecklist", {
        ids: this.mainData.settlementChecklist.map(item => item.id).join(",")
      });
      window.open(href);
    },
    //创建负核算单
    createMinus() {
      if (this.mainData.settlementChecklist.length == 0) {
        this.$message("请勾选需要要创建负核算单的核算单!");
        return;
      }
      if (this.mainData.settlementChecklist.length > 1) {
        this.$message("勾选核算单的数量只能为1!");
        return;
      }
      //清空之前选中的明细
      this.mainData.CreateMinusAccountsChecked = [];
      getNegativeChecklist(
        `?checklistId=${this.mainData.settlementChecklist
          .map(item => item.id)
          .join()}`
      ).then(res => {
        console.log(res);
        if (res.code == 200) {
          this.mainData.createMinusAccountsTable = res.data || [];
        }
      });
      this.mainData.drawerName = "createMinusAccounts";
      this.mainData.openDrawer = true;
    },
    //撤回
    backApply(id) {
      checklistWithdraw({
        checklistId: id
      }).then(res => {
        console.log(res);
        if (res.code == 200) {
          this.$message.success("撤回成功");
          this.$emit("reload");
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.commissionSettlement {
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
      right: 490px;
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
      right: 270px;
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
      width: 270px;
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
        color: #333;
        font-size: 14px;
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
