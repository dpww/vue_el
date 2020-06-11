<template>
  <div class="allPeopleBrokerage">
    <div class="header">
      <div>
        <checkProject @reload="reload" :mainData="mainData" />
      </div>
      <div>
        <el-tabs v-model="activeName" @tab-click="tabChange">
          <el-tab-pane label="待核算" name="commissionAwait"></el-tab-pane>
          <el-tab-pane label="佣金核算单" name="commissionSettlement"></el-tab-pane>
          <el-tab-pane label="佣金付款单" name="commissionPayment"></el-tab-pane>
          <el-tab-pane label="不结佣库" name="commissionNoPay"></el-tab-pane>
        </el-tabs>
      </div>
    </div>
    <div class="component">
      <component
        :mainData="mainData"
        @noPayGrant="noPayGrant"
        @startBrokerage="startBrokerage"
        :is="activeName"
        :ref="activeName"
        @reload="reload"
        :nowRouteName="nowRouteName"
        :nowRouteNameNum="nowRouteNameNum"
      ></component>
    </div>
    <el-drawer
      class="drawer"
      :title="mainData.drawerTitle[mainData.drawerName]"
      :visible.sync="mainData.openDrawer"
      direction="rtl"
      size="40%"
      ref="drawer"
    >
      <component
        :mainData="mainData"
        @relevanceSearch="relevanceSearch"
        :is="mainData.drawerName"
        :nowRouteNameNum="nowRouteNameNum"
        @randerFileList="randerFileList"
      ></component>
      <div class="demo-drawer__footer">
        <el-button type="primary" @click="drawerSubmit">确 定</el-button>
        <el-button @click="$refs.drawer.closeDrawer()">取 消</el-button>
      </div>
    </el-drawer>
    <el-dialog
      class="dialog"
      :title="mainData.dialogTitle[mainData.dialogName]"
      :visible.sync="mainData.openDialog"
      :width="mainData.dialogWidth"
      close-on-click-modal
      close-on-press-escape
      :show-close="false"
      center
    >
      <template slot="title">
        <div class="dialog_title">
          <span class="dialogTitle">{{mainData.dialogTitle[mainData.dialogName]}}</span>
          <div class="dialog_btns" v-show="mainData.dialogName=='settlementDetail'">
            <el-button @click="mainData.dialogHeightSearchFlag=!mainData.dialogHeightSearchFlag">
              高级筛选
              <i
                :class="{ 'el-icon-arrow-up' : mainData.dialogHeightSearchFlag,'el-icon-arrow-down' : !mainData.dialogHeightSearchFlag,}"
              ></i>
            </el-button>
            <el-button @click="toLead">导入</el-button>
            <el-button @click="settlementDetailOutExcel">导出明细</el-button>
            <el-button @click="relevancePaymentDrawer">关联付款单</el-button>
            <el-button type="primary" @click="creatPayment">创建付款单</el-button>
          </div>
          <div class="dialog_btns" v-show="mainData.dialogName=='paymentDetail'">
            <div class="searchInput">
              <el-select class="searchType" v-model="mainData.paymentForm.type" placeholder="请选择">
                <el-option
                  v-for="item in paymentTypeOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
              <el-input
                placeholder="请输入"
                v-model="mainData.paymentSearch"
                class="input-with-select"
              >
                <el-button class="searchIcon" slot="append" icon="el-icon-search"></el-button>
              </el-input>
            </div>
            <el-form
              ref="dialogForm"
              class="dialogForm"
              :inline="true"
              :model="mainData.dialogForm"
              label-width="80px"
            >
              <el-form-item label="人工复核风险">
                <el-select v-model="mainData.dialogForm.manRisk" placeholder="请选择活动区域">
                  <el-option label="全部" value="all"></el-option>
                  <el-option label="其他" value="else"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="系统提示风险">
                <el-select v-model="mainData.dialogForm.systemRisk" placeholder="请选择活动区域">
                  <el-option label="全部" value="all"></el-option>
                  <el-option label="其他" value="else"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-button class="skyblueBtn" @click="toleadPayment">导入</el-button>
                <el-button class="skyblueBtn" @click="outPaymentExcal">导出明细</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </template>
      <component
        :mainData="mainData"
        @settlementDialogReload="settlementDialogReload"
        :is="mainData.dialogName"
        @randerRelevancePolicy="randerRelevancePolicy"
        @randerPaymentDetail="randerPaymentDetail"
        @viewPolicyRander="viewPolicyRander"
      ></component>
      <span slot="footer" class="dialog-footer">
        <el-button @click="mainData.openDialog = false">取 消</el-button>
        <el-button
          v-if="mainData.dialogName=='settlementAudit'"
          type="primary"
          @click="applyStart"
        >确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="导入数据" :visible.sync="mainData.importFile">
      <el-upload
        class="upload_demo"
        drag
        accept=".xls, .xlsx"
        :on-success="uploadSuccess"
        :action="mainData.action"
        :data="mainData.actionData"
        multiple
        center
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">
          将文件拖到此处，或
          <em>点击上传</em>
        </div>
        <div class="el-upload__tip" slot="tip">只能上传.xls/.xlsx文件</div>
      </el-upload>
    </el-dialog>
  </div>
</template>

<script>
import {
  selectCommission,
  initCommissionNo,
  selectCommissionNo,
  updateGrant,
  createChecklist,
  getChecklistListPage,
  relatedChecklist,
  checklistApprove,
  initReceipt,
  selectReceipt,
  getCurrentRole,
  initReceiptDetail,
  createNegativeChecklist,
  relatedPolicy,
  getPaymentStatus,
  getFileList,
  getChannelName
} from "@/api/brokerage";
import { downLoad } from "@/api/request";
export default {
  components: {
    // 待核算组件
    commissionAwait: () =>
      import("@/views/brokerage/components/commissionAwait"),
    // 不结佣库组件
    commissionNoPay: () =>
      import("@/views/brokerage/components/commissionNoPay"),
    // 付款单组件
    commissionPayment: () =>
      import("@/views/brokerage/components/commissionPayment"),
    // 核算单组件
    commissionSettlement: () =>
      import("@/views/brokerage/components/commissionSettlement"),
    // 项目切换组件
    checkProject: () => import("@/views/brokerage/components/checkProject"),
    // 创建核算单抽屉组件
    createAccounts: () =>
      import("@/views/brokerage/components/drawer/createAccounts"),
    // 关联核算单抽屉组件
    relevanceAccounts: () =>
      import("@/views/brokerage/components/drawer/relevanceAccounts"),
    // 创建负核算单抽屉组件
    createMinusAccounts: () =>
      import("@/views/brokerage/components/drawer/createMinusAccounts"),
    // 关联付款单抽屉组件
    relevancePayment: () =>
      import("@/views/brokerage/components/drawer/relevancePayment"),
    //核算单终止结佣抽屉组件
    stopAccounts: () =>
      import("@/views/brokerage/components/drawer/stopAccounts"),
    //核算单上传附件抽屉组件
    awaitUpload: () =>
      import("@/views/brokerage/components/drawer/awaitUpload"),
    //核算单审核dialog组件
    settlementAudit: () =>
      import("@/views/brokerage/components/dialog/settlementAudit"),
    //核算单查看dialog组件
    settlementDetail: () =>
      import("@/views/brokerage/components/dialog/settlementDetail"),
    //付款单查看dialog组件
    paymentDetail: () =>
      import("@/views/brokerage/components/dialog/paymentDetail"),
    //核算单查看政策组件
    viewPolicy: () => import("@/views/brokerage/components/dialog/viewPolicy"),
    //核算单关联政策组件
    relevancePolicy: () =>
      import("@/views/brokerage/components/dialog/relevancePolicy"),
    //添加政策抽屉
    addPolicy: () => import("@/views/brokerage/components/drawer/addPolicy")
  },
  data() {
    return {
      //动态组件名称
      activeName: "commissionAwait",
      paymentTypeOptions: [],
      //公用数据
      mainData: {
        //当前用户
        employeeName: "",
        //当前项目id
        project_id: "",
        //附件dialog
        importFile: false,
        //上传地址
        action: "",
        //上传数据
        actionData: {},
        //dialog是否显示
        openDialog: false,
        //dialog所占宽度
        dialogWidth: "50%",
        //dialog内组件名称
        dialogName: "",
        //dialog内组件对应标题
        dialogTitle: {
          settlementAudit: "",
          settlementDetail: "核算单明细",
          paymentDetail: "付款单明细",
          viewPolicy: "查看政策",
          relevancePolicy: "关联政策"
        },
        //左边抽屉是否显示
        openDrawer: false,
        //抽屉内组件名称
        drawerName: "",
        //抽屉内组件对应标题
        drawerTitle: {
          createAccounts: "创建核算单",
          relevanceAccounts: "关联核算单",
          stopAccounts: "终止结佣",
          awaitUpload: "上传附件",
          relevancePayment: "关联付款单",
          createMinusAccounts: "创建负核算单",
          addPolicy: "添加政策"
        },
        // 创建核算单搜索
        createAccountsSeach: "",
        //添加政策搜索
        addPolicySearch: "",
        //添加政策表格
        addPolicyTable: [],
        //当前页数
        currentPage: {
          awaitPage: 1,
          awaitDetailPage: 1,
          settlementPage: 1,
          settlementDetailPage: 1,
          paymentPage: 1,
          noPayPage: 1,
          relevancePaymentPage: 1,
          viewPolicyPage: 1,
          relevancePolicyPage: 1,
          paymentDetailPage: 1
        },
        //分页总数
        pageTotal: {
          awaitTotal: 0,
          awaitDetailTotal: 0,
          settlementTotal: 0,
          settlementDetailTotal: 0,
          paymentTotal: 0,
          noPayTotal: 0,
          relevancePaymentTotal: 0,
          viewPolicyTotal: 0,
          relevancePolicyTotal: 0,
          paymentDetailTotal: 0
        },
        //每页个数
        pageSize: {
          awaitSize: 10,
          awaitDetailSize: 10,
          settlementSize: 10,
          settlementDetailSize: 10,
          paymentSize: 10,
          noPaySize: 10,
          relevancePaymentSize: 10,
          viewPolicySize: 10,
          relevancePolicySize: 10,
          paymentDetailSize: 10
        },
        //当前区域
        nowArea: "",
        //当前城市
        nowCity: "",
        //当前项目
        nowProject: "",
        //项目搜索框
        searchVal: "",
        //树状项目数据
        treeData: [],
        //待核算搜索框
        awaitSeach: "",
        // 待核算表格复选框list
        checkedList: [],
        // 不结佣表格复选框list
        noPaycheckedList: [],
        //佣金核算单表格复选框选中
        settlementChecklist: [],
        //佣金核算单dialog表格复选框选中
        settlementDetailChecklist: [],
        //付款单明细表格勾选
        paymentDetailCheckeds: [],
        //创建付款单表格复选框选中
        CreateMinusAccountsChecked: [],
        //关联政策表格复选框选中
        relevancePolicyCheckeds: [],
        //付款单表格复选框选中
        paymentCheckedList: [],
        //添加政策
        addPolicyCheckList: [],
        //关联核算单表格复选框选中
        relevanceChecked: [],
        //关联付款单表格复选框选中
        relevancePaymentChecked: [],
        //当前选择id
        nowCheckedId: "",
        //当前选择核算单审批id
        nowApproveId: "",
        //当前选择付款单审批
        nowPaymentId: "",
        //当前选择政策id
        nowPolicyId: "",
        //当前选择查看政策id
        viewPolicyChecked:"",
        //查看附件id
        paymentUploadID: "",
        //待核算过滤框
        awaitForm: {
          type: "",
          name: "",
          date: "",
          status: "全部",
          person: "",
          returnRateStart: "",
          returnRateEnd: "",
          moneyRateStart: "",
          moneyRateEnd: "",
          subDate: "",
          signDate: ""
        },
        //待核算数据表格
        awaitTable: [],
        //待核算创建核算单数据表格
        createAccountsTable: [
          {
            num: "123123",
            name: "南京璟悦名邸-链家-金额 南京璟悦名邸",
            address: "数据"
          },
          {
            num: "123123",
            name: "南京璟悦名邸-链家-金额 南京璟悦名邸",
            address: "数据"
          },
          {
            num: "123123",
            name: "南京璟悦名邸-链家-金额 南京璟悦名邸",
            address: "数据"
          },
          {
            num: "123123",
            name: "南京璟悦名邸-链家-金额 南京璟悦名邸",
            address: "数据"
          }
        ],
        CreateAccountsChecked: [],
        //待核算关联核算单搜索框
        relevanceSearch: "",
        //待核算关联核算单数据表格
        relevanceAccounts: [
          {
            num: "123123",
            name: "南京璟悦名邸-链家-金额 南京璟悦名邸",
            address: "数据"
          },
          {
            num: "123123",
            name: "南京璟悦名邸-链家-金额 南京璟悦名邸",
            address: "数据"
          },
          {
            num: "123123",
            name: "南京璟悦名邸-链家-金额 南京璟悦名邸",
            address: "数据"
          },
          {
            num: "123123",
            name: "南京璟悦名邸-链家-金额 南京璟悦名邸",
            address: "数据"
          }
        ],
        //终止结佣备注
        stopAccountsRemark: "",
        //终止结佣方式下拉框
        stopAccountsSelect: "",
        //待核算附件列表
        awaitUploadList: [
          {
            name: "附件",
            address: "123"
          },
          {
            name: "附件",
            address: "123"
          },
          {
            name: "附件",
            address: "123"
          }
        ],
        //核算单搜索
        settlementSeach: "",
        //佣金核算单表格数据
        settlementTable: [
          {
            name: "南京璟悦名邸-链家-金额 南京璟悦名邸",
            num: "123123123",
            address: "数据"
          },
          {
            name: "南京璟悦名邸-链家-金额 南京璟悦名邸",
            num: "123123123",
            address: "数据"
          },
          {
            name: "南京璟悦名邸-链家-金额 南京璟悦名邸",
            num: "123123123",
            address: "数据"
          },
          {
            name: "南京璟悦名邸-链家-金额 南京璟悦名邸",
            num: "123123123",
            address: "数据"
          }
        ],

        //佣金核算单高级筛选表单
        settlementForm: {
          code: "全部",
          name: "全部",
          time: "",
          type: "",
          channelName: ""
        },
        //佣金核算单是否高级筛选
        heightSearchFlag: false,
        //dialog内佣金核算单是否高级筛选
        dialogHeightSearchFlag: false,
        //是否审核通过
        // auditRadio: "",
        //dialog内佣金核算单高级筛选表单
        settlementDialogForm: {
          rateStart: "",
          rateEnd: "",
          assginTime: "",
          applyTime: "",
          detailTypeTwo: "回款比例",
          isSettle: "全部",
          searchDetail: "",
          detailTypeOne: "",
          moneyStart: "",
          moneyEnd: ""
        },
        //dialog佣金核算单表格数据
        settlementDialogTable: [],
        //付款单搜索
        paymentSearch: "",
        //创建负核算单表格
        createMinusAccountsTable: [],
        //关联付款单搜索
        relevancePaymentSearch: "",
        //关联付款单表格
        relevancePaymentTable: [],
        //查看政策表格
        viewPolicyTable: [],
        //关联政策表格
        relevancePolicyTable: [],
        //付款单是否高级查询
        paymentHeightSearch: false,
        // 佣金付款单高级筛选表单
        paymentForm: {
          type: "",
          name: "",
          time: "",
          status: ""
        },
        //渠道名称
        channelOptions: [],
        //核算单渠道名称
        channelNameOptions: [],
        //佣金付款单表格数据
        paymentTable: [
          {
            name: "南京璟悦名邸-链家-金额 南京璟悦名邸",
            num: "1231231678123",
            address: "数据"
          },
          {
            name: "南京璟悦名邸-链家-金额 南京璟悦名邸",
            num: "12312567563123",
            address: "数据3"
          },
          {
            name: "南京璟悦名邸-链家-金额 南京璟悦名邸",
            num: "1567123",
            address: "数据"
          },
          {
            name: "南京璟悦名邸-链家-金额 南京璟悦名邸",
            num: "567",
            address: "数据1"
          }
        ],
        //佣金付款单查看dialog内筛选框
        dialogForm: {
          systemRisk: "",
          manRisk: ""
        },
        //dialog佣金付款单表格数据
        paymentDialogTable: [
          {
            name: "南京璟悦名邸",
            num: "6546345",
            address: "数据"
          },
          {
            name: "南京璟悦名邸-链家-金额 南京璟悦名邸",
            num: "3453451",
            address: "数据"
          },
          {
            name: "南京璟悦名邸-链家-金额 南京璟悦名邸",
            num: "1231",
            address: "数据"
          },
          {
            name: "南京璟悦名邸-链家-金额 南京璟悦名邸",
            num: "9084363490",
            address: "数据"
          }
        ],
        //不结佣库搜索值
        noPaySearch: "",
        //不结佣库是否高价筛选
        noPayHeightSearch: false,
        //不结佣库筛选表单
        noPayForm: {
          type: "",
          rateStart: "",
          rateEnd: "",
          applyTime: "",
          assignTime: "",
          money: "全部",
          person: "",
          isPost: "全部"
        },
        noPayTable: []
      }
    };
  },
  computed: {
    employeeName() {
      this.mainData.employeeName = this.$store.state.user.userInfo.employeeName;
      return this.$store.state.user.userInfo.employeeName;
    },
    nowRouteName() {
      if (this.$route.name == "allPeopleBrokerage") {
        return "全民经纪人";
      } else if (this.$route.name == "intermediaryAgent") {
        return "中介成交";
      } else if (this.$route.name == "outerChannelBrokerage") {
        return "自渠成交";
      }
    },
    nowRouteNameNum() {
      if (this.$route.name == "allPeopleBrokerage") {
        return "1";
      } else if (this.$route.name == "intermediaryAgent") {
        return "2";
      } else if (this.$route.name == "outerChannelBrokerage") {
        return "3";
      }
    }
  },
  methods: {
    //切换动态组件
    tabChange(tab, event) {
      console.log(this.activeName);
      //清空所以复选框被选中的数组
      this.mainData.checkedList = [];
      this.mainData.noPaycheckedList = [];
      this.mainData.settlementChecklist = [];
      this.mainData.relevanceChecked = [];
      this.mainData.settlementDetailChecklist = [];
      this.mainData.CreateMinusAccountsChecked = [];
      this.mainData.relevancePolicyCheckeds = [];
      this.mainData.addPolicyCheckList = [];
      this.mainData.paymentCheckedList = [];
      this.mainData.paymentDetailCheckeds = [];
      this.mainData.nowCheckedId = "";
      this.mainData.nowApproveId = "";
      this.mainData.nowPaymentId = "";
      this.mainData.paymentUploadID = "";
      this.mainData.viewPolicyChecked=""
      this.$nextTick(() => {
        this.reload();
      });
    },
    //渲染当前页面
    reload() {
      // 待核算页面刷新
      if (this.activeName == "commissionAwait") {
        let subscription_date_start = this.mainData.awaitForm.subDate[0] || "";
        let subscription_date_end = this.mainData.awaitForm.subDate[1] || "";
        let signing_date_start = this.mainData.awaitForm.signDate[0] || "";
        let signing_date_end = this.mainData.awaitForm.signDate[1] || "";
        selectCommission({
          project_id: this.mainData.project_id,
          source_type_desc: this.nowRouteNameNum,
          pageIndex: this.mainData.currentPage.awaitPage,
          pageSize: this.mainData.pageSize.awaitSize,
          keyType: this.mainData.awaitForm.type,
          value: this.mainData.awaitSeach,
          transaction_status: this.mainData.awaitForm.status,
          collection_proportion_start: this.mainData.awaitForm.returnRateStart,
          collection_proportion_end: this.mainData.awaitForm.returnRateEnd,
          subscription_date_start,
          subscription_date_end,
          signing_date_start,
          signing_date_end,
          current_role: this.mainData.awaitForm.person.join("','")
        }).then(res => {
          console.log(res);
          if (res.code == 200) {
            if (res.data) {
              this.mainData.awaitTable = res.data.list;
              this.mainData.pageTotal.awaitTotal = res.data.total;
            }
          }
        });
      } else if (this.activeName == "commissionNoPay") {
        let subscription_date_start =
          this.mainData.noPayForm.applyTime[0] || "";
        let subscription_date_end = this.mainData.noPayForm.applyTime[1] || "";
        let signing_date_start = this.mainData.noPayForm.assignTime[0] || "";
        let signing_date_end = this.mainData.noPayForm.assignTime[1] || "";
        selectCommissionNo({
          project_id: this.mainData.project_id,
          source_type_desc: this.nowRouteNameNum,
          pageIndex: this.mainData.currentPage.noPayPage,
          pageSize: this.mainData.pageSize.noPaySize,
          commission_type: this.mainData.noPayForm.money,
          grant_status: this.mainData.noPayForm.isPost,
          keyType: this.mainData.noPayForm.type,
          value: this.mainData.noPaySearch,
          collection_proportion_start: this.mainData.noPayForm.rateStart,
          collection_proportion_end: this.mainData.noPayForm.rateEnd,
          subscription_date_start,
          subscription_date_end,
          signing_date_start,
          signing_date_end
        }).then(res => {
          if (res.code == 200) {
            if (res.data) {
              this.mainData.noPayTable = res.data.list;
              this.mainData.pageTotal.noPayTotal = res.data.total;
            }
          }
        });
      } else if (this.activeName == "commissionSettlement") {
        //全民营销时不需要渠道名称
        if (this.nowRouteNameNum != 1) {
          //获取核算单的渠道名称
          getChannelName({
            projectId: this.mainData.project_id
          }).then(res => {
            console.log(res);
            if (res.code == 200) {
              this.mainData.channelNameOptions=res.data
            }
          });
        }
        let startTime = this.mainData.settlementForm.time[0] || "";
        let endTime = this.mainData.settlementForm.time[1] || "";
        let reqObj = {
          currentPage: this.mainData.currentPage.settlementPage,
          pageSize: this.mainData.pageSize.settlementSize,
          keyWord: this.mainData.settlementSeach,
          keyWordType: this.mainData.settlementForm.type,
          projectStatus: this.mainData.settlementForm.code,
          isSettle: this.mainData.settlementForm.name,
          cityCompany: this.mainData.nowCity,
          projectName: this.mainData.nowProject,
          dealType: this.nowRouteName
        };
        if (startTime) reqObj.startTime = startTime;
        if (endTime) reqObj.endTime = endTime;
        getChecklistListPage(reqObj).then(res => {
          console.log(res);
          if (res.code == 200) {
            this.mainData.settlementTable = res.data.records;
            this.mainData.pageTotal.settlementTotal = res.data.total;
          }
        });
      } else if (this.activeName == "commissionPayment") {
        let create_time_start = this.mainData.paymentForm.time[0] || "";
        let create_time_end = this.mainData.paymentForm.time[1] || "";
        selectReceipt({
          pageIndex: this.mainData.currentPage.paymentPage,
          pageSize: this.mainData.pageSize.paymentSize,
          cityCompany: this.mainData.nowCity,
          projectName: this.mainData.nowProject,
          source_type_desc: this.nowRouteNameNum,
          keyType: this.mainData.paymentForm.type,
          value: this.mainData.paymentSearch,
          create_time_start,
          create_time_end,
          payment_status: this.mainData.paymentForm.status,
          project_id: this.mainData.project_id,
          channel_name: this.mainData.paymentForm.name
        }).then(res => {
          console.log(res);
          if (res.code == 200) {
            this.mainData.paymentTable = res.data.list;
            this.mainData.pageTotal.paymentTotal = res.data.total;
          }
        });
      }
    },
    // 提交
    drawerSubmit() {
      // 终止结佣操作
      if (this.mainData.drawerName == "stopAccounts") {
        if (this.mainData.checkedList.length == 0) {
          this.$message("请勾选要终止结佣的待核算订单!");
          return;
        }
        initCommissionNo({
          is_commission: "0",
          remarks: this.mainData.stopAccountsRemark,
          list: this.mainData.checkedList,
          commission_type: this.mainData.stopAccountsSelect
        }).then(res => {
          if (res.code == 200) {
            this.$message.success(res.messages);
            this.mainData.stopAccountsRemark = "";
            this.mainData.stopAccountsSelect = "";
            this.$refs.drawer.closeDrawer();
            this.reload();
          }
        });
      } else if (this.mainData.drawerName == "createAccounts") {
        // 创建核算单操作
        console.log(this.mainData.checkedList.map(item => item.id).join(","));
        if (this.mainData.checkedList.length == 0) {
          this.$message("请勾选要创建的待核算订单!");
          this.$refs.drawer.closeDrawer();
          return;
        }
        createChecklist({
          mainDataProjectId: this.mainData.project_id,
          division: this.mainData.nowArea,
          cityCompany: this.mainData.nowCity,
          projectName: this.mainData.nowProject,
          commissionIds: this.mainData.checkedList
            .map(item => item.id)
            .join(","),
          policyIds: "1,2,3",
          dealType: this.nowRouteName
        }).then(res => {
          console.log(res);
          if (res.code == 200) {
            this.$refs.drawer.closeDrawer();
            this.$message.success("创建成功!");
            this.reload();
          } else {
            this.$message.error(res.messages);
          }
        });
      } else if (this.mainData.drawerName == "relevanceAccounts") {
        // 关联核算单操作
        if (this.mainData.checkedList.length == 0) {
          this.$message("请勾选要关联的待核算订单!");
          this.$refs.drawer.closeDrawer();
          return;
        }
        if (this.mainData.relevanceChecked.length == 0) {
          this.$message("请勾选要关联的核算单!");
          return;
        }
        if (this.mainData.relevanceChecked.length > 1) {
          this.$message("关联的核算单数量只能为1!");
          return;
        }
        relatedChecklist({
          checklistIds: this.mainData.relevanceChecked
            .map(item => item.id)
            .join(","),
          commissionIds: this.mainData.checkedList
            .map(item => item.id)
            .join(",")
        }).then(res => {
          console.log(res);
          if (res.code == 200) {
            this.$message.success("关联成功");
            this.$refs.drawer.closeDrawer();
          }
        });
      } else if (this.mainData.drawerName == "relevancePayment") {
        if (this.mainData.relevancePaymentChecked.length == 0) {
          this.$message("请勾选要关联的付款单!");
          return;
        }
        if (this.mainData.relevancePaymentChecked.length > 1) {
          this.$message("关联的付款单数量只能为1!");
          return;
        }
        if (this.mainData.settlementDetailChecklist.length == 0) {
          this.$message("请勾选要关联的核算单!");
          this.$refs.drawer.closeDrawer();
          return;
        }
        initReceiptDetail({
          uuid: this.mainData.relevancePaymentChecked
            .map(item => item.id)
            .join(","),
          list: this.mainData.settlementDetailChecklist
        }).then(res => {
          console.log(res);
          if (res.code == 200) {
            this.$refs.drawer.closeDrawer();
            this.mainData.relevancePaymentChecked = "";
            this.mainData.settlementDetailChecklist = "";
          }
        });
      } else if (this.mainData.drawerName == "createMinusAccounts") {
        if (this.mainData.CreateMinusAccountsChecked.length == 0) {
          this.$message("请勾选要创建负核算单的的核算单明细!");
          return;
        }
        createNegativeChecklist({
          checklistId: this.mainData.settlementChecklist
            .map(item => item.id)
            .join(),
          checklistDetailIds: this.mainData.CreateMinusAccountsChecked.map(
            item => item.id
          ).join(",")
        }).then(res => {
          console.log(res);
          if (res.code == 200) {
            this.mainData.CreateMinusAccountsChecked = "";
            this.$refs.drawer.closeDrawer();
            this.reload();
          }
        });
      } else if (this.mainData.drawerName == "addPolicy") {
        if (this.mainData.addPolicyCheckList.length == 0) {
          this.$message("请勾选要添加的的政策单!");
          return;
        }
        relatedPolicy({
          checklistId: this.mainData.nowPolicyId,
          policyIds: this.mainData.addPolicyCheckList
            .map(item => item.id)
            .join(",")
        }).then(res => {
          console.log(res);
          if (res.code == 200) {
            this.$refs.drawer.closeDrawer();
            this.mainData.openDialog = false;
            this.$message("添加政策成功!");
            this.reload();
          }
        });
      }
    },
    // 不结佣转结佣
    startBrokerage() {
      initCommissionNo({
        is_commission: "1",
        list: this.mainData.noPaycheckedList,
        commission_type: ""
      }).then(res => {
        if (res.code == 200) {
          this.$message.success(res.messages);
          this.$refs.drawer.closeDrawer();
          this.reload();
        }
      });
    },
    // 不结佣发放
    noPayGrant() {
      updateGrant({
        list: this.mainData.noPaycheckedList.map(item => item.id)
      }).then(res => {
        console.log(res);
        if (res.code == 200) {
          this.$message.success(res.messages);
          this.reload();
        }
      });
    },
    //刷新附件列表
    randerFileList() {
      getFileList({
        id: this.mainData.paymentUploadID
      }).then(res => {
        console.log(res);
        if (res.code == 200) {
          this.mainData.awaitUploadList = res.data;
        }
      });
    },
    //上传成功
    uploadSuccess(res, file, fileList) {
      if (res.code == 200 || res.result.code == 200) {
        this.mainData.importFile = false;
        if (this.mainData.dialogName == "settlementDetail") {
          this.settlementDialogReload();
        } else if (this.mainData.dialogName == "paymentDetail") {
          //是否付款单明细上传附件
          if (
            this.mainData.drawerName == "awaitUpload" &&
            this.mainData.openDrawer
          ) {
            //上传成功后刷新对应附件列表
            this.randerFileList();
            return;
          }
          this.randerPaymentDetail(this.mainData.nowPaymentId);
        }
      }
      this.$message(res.messages || res.result.messages);
    },
    //结算单dialog表格刷新
    settlementDialogReload() {
      this.$refs[this.activeName].randerDetail({
        id: this.mainData.nowCheckedId
      });
    },
    //关联结算单表格刷新
    relevanceSearch() {
      this.$refs[this.activeName].randerRelevance();
    },
    //核算单明细表格导出
    settlementDetailOutExcel() {
      if (this.mainData.settlementDetailChecklist.length == 0) {
        this.$message("请勾选要导出的核算单明细!");
        return;
      }
      let href = downLoad("/checklist/exportChecklistDetail", {
        ids: this.mainData.settlementDetailChecklist
          .map(item => item.id)
          .join(",")
      });
      window.open(href);
    },
    //发起审批
    applyStart() {
      checklistApprove({
        checklistId: this.mainData.nowApproveId
      }).then(res => {
        console.log(res);
        if (res.code == 200) {
          this.mainData.openDialog = false;
          this.reload();
          this.$message.success("审核成功");
        }
      });
    },
    //创建付款单
    creatPayment() {
      if (this.mainData.settlementDetailChecklist.length == 0) {
        this.$message("请勾选要创建付款单的核算单明细!");
        return;
      }
      if (!this.mainData.nowCheckedId) {
        this.$message("未获取到核算单id!");
        return;
      }
      getPaymentStatus({
        ids: this.mainData.settlementDetailChecklist
          .map(item => item.id)
          .join("','")
      }).then(res => {
        console.log(res);
        if (res.code == 200) {
          if (res.data > 0) {
            this.$confirm("是否创建付款单?", "提示", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning"
            })
              .then(() => {
                initReceipt({
                  id: this.mainData.nowCheckedId,
                  list: this.mainData.settlementDetailChecklist,
                  username: localStorage.getItem("username")
                }).then(res => {
                  if (res.code == 200) {
                    this.mainData.openDialog = false;
                    this.$message.success(res.messages);
                    this.reload();
                  }
                });
              })
              .catch(() => {
                this.$message({
                  type: "info",
                  message: "已取消删除"
                });
              });
          } else {
            this.$message(res.messages + "付款审批中，不可创建付款单");
          }
        }
      });
    },
    //关联付款单渲染
    relevancePaymentTableRander() {
      selectReceipt({
        pageIndex: this.mainData.currentPage.relevancePaymentPage,
        pageSize: this.mainData.pageSize.relevancePaymentSize,
        cityCompany: this.mainData.nowCity,
        projectName: this.mainData.nowProject,
        source_type_desc: this.nowRouteNameNum,
        keyType: "receipt_code",
        value: this.mainData.relevancePaymentSearch,
        project_id: this.mainData.project_id,
        checklist_id: this.mainData.nowCheckedId
      }).then(res => {
        console.log(res);
        if (res.code == 200) {
          this.mainData.relevancePaymentTable = res.data.list;
          this.mainData.pageTotal.relevancePaymentTotal = res.data.tptal;
        }
      });
    },
    //关联付款单
    relevancePaymentDrawer() {
      this.relevancePaymentTableRander();
      this.mainData.drawerName = "relevancePayment";
      this.mainData.openDrawer = true;
    },
    //获取渠道名称
    getChannelOptions() {
      getCurrentRole({}).then(res => {
        console.log(res);
        this.mainData.channelOptions = res.data.map(item => {
          item.value = item.current_role;
          item.label = item.current_role;
          return item;
        });
      });
    },
    //渲染关联政策表格
    randerRelevancePolicy(id) {
      console.log(id);
      this.$refs[this.activeName].randerPolicyTable({ id });
    },
    toLead() {
      this.mainData.importFile = true;
      this.mainData.action =
        process.env.VUE_APP_BASE_API + "/checklist/importChecklistDetail";
      this.mainData.actionData = {
        dealType: this.nowRouteName
      };
    },
    toleadPayment() {
      this.mainData.importFile = true;
      this.mainData.action =
        process.env.VUE_APP_BASE_API + "/Receipt/receiptDetailImport";
      this.mainData.actionData = {
        dealType: this.nowRouteName
      };
    },
    viewPolicyRander(){
      this.$refs[this.activeName].randerViewPolicyTable({ checklist_id:this.mainData.viewPolicyChecked });
    },
    randerPaymentDetail(id) {
      this.$refs[this.activeName].randerPaymentTable({ id });
    },
    outPaymentExcal() {
      if (this.mainData.paymentDetailCheckeds.length == 0) {
        this.$message("请勾选要导出的付款单明细");
        return;
      }
      let href = downLoad("/Receipt/ReceiptDetailExcel", {
        ids: this.mainData.paymentDetailCheckeds
          .map(item => item.id)
          .join("','")
      });
      window.open(href);
    }
  },
  created() {
    console.log(process.env.VUE_APP_BASE_API);
    //获取渠道名称列表
    this.getChannelOptions();
  }
};
</script>

<style lang="less" scoped>
.allPeopleBrokerage {
  background-color: #f5f5f5;
  height: calc(100vh - 40px);
  ::v-deep .el-tabs__active-bar {
    background: #2761ff;
  }
  ::v-deep input::-webkit-outer-spin-button,
  ::v-deep input::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
  ::v-deep input[type="number"] {
    -moz-appearance: textfield !important;
  }
  .el-tabs {
    ::v-deep .el-tabs__nav-scroll {
      height: 50px;
      background: #fff;
    }
    ::v-deep .el-tabs__header {
      margin-bottom: 0;
    }
    ::v-deep .el-tabs__item {
      height: 50px;
      line-height: 50px;
      padding: 0 20px !important;
      font-size: 16px;
      color: #333;
    }
    ::v-deep .el-tabs__nav-wrap::after {
      background-color: #f4f4f4;
    }
  }
  .header {
    display: flex;
    > div:first-child {
      width: 250px;
    }
    > div:last-child {
      padding: 0 20px 0 0;
      flex: 1;
      height: 60px;
      background-color: #fff;
    }
  }
  .component {
    margin: 10px;
    background: #fff;
    border-radius: 6px;
  }
  .upload_demo {
    position: relative;
    height: 200px;
    ::v-deep .el-upload-dragger {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
    .el-upload__tip {
      position: absolute;
      bottom: -10px;
      left: 50%;
      transform: translateX(-50%);
    }
    ::v-deep .el-upload-list {
      display: none;
    }
  }
}
.drawer {
  ::v-deep .el-drawer__header {
    background: #2761ff;
    color: #fff;
    height: 50px;
    line-height: 50px;
    padding: 0 20px;
    margin-bottom: 0;
    font-size: 14px;
    i {
      color: #fff;
      font-size: 12px;
    }
  }
  ::v-deep .el-drawer__body {
    padding: 12px 15px 0;
    background: #f5f5f5;
  }
  ::v-deep .demo-drawer__footer {
    height: 55px;
    line-height: 55px;
    position: absolute;
    bottom: 0;
    width: 100%;
    text-align: center;
    .el-button {
      height: 32px;
      width: 65px;
    }
  }
}
.dialog {
  .dialog_title {
    display: flex;
    .searchInput {
      width: 210px;
      height: 30px;
      position: absolute;
      top: 10px;
      right: 610px;
      .searchType {
        width: 110px;
        position: absolute;
        top: 0;
        right: 220px;
        ::v-deep .el-input__inner {
          height: 32px;
          line-height: 32px;
          color: #333;
          font-size: 14px;
        }
      }
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
    .dialogForm {
      position: absolute;
      top: 5px;
      right: 17px;
      ::v-deep .el-input__inner {
        width: 144px;
        height: 30px;
        line-height: 30px;
      }
      ::v-deep .el-form-item__label {
        font-size: 12px;
        color: #333;
        padding: 0 8px 0 0;
      }
      .el-form-item {
        margin-right: 0;
      }
    }
  }
  .dialog_btns {
    flex: 1;
    text-align: right;
    .el-button {
      padding: 0 5px;
      margin: 0;
    }
  }
  .skyblueBtn {
    color: #2761ff;
    border: 1px solid #2761ff;
    height: 30px;
    width: 64px;
    padding: 0;
    margin: 0;
    font-size: 12px;
  }
  .dialogTitle {
    font-weight: 700;
    font-size: 16px;
  }
}
</style>
