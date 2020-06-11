<template>
  <div class="costPay" ref="costPay">
    <div class="container">
      <codeAndName :codeAndName="codeAndName"/>
      <el-collapse v-model="openList" @change="openChange">
      <el-collapse-item title="基础信息" name="1">
        <template slot="title">
          <h3 class="titleText">基础信息</h3>
          <div class="logo">
      <!-- <img src="../../assets/images/XH_logo.jpg" alt /> -->
      <el-button round @click.stop="toPoint"> <i style="color:skyblue;font-size:18px;" class="el-icon-printer"></i> 打印付款申请书</el-button>
    </div>
        </template>
        <ul class="baseInfo">
          <li>
            <el-row>
              <el-col style="text-align:right;" :span="8">项目名称 :</el-col>
              <el-col style="padding-left:16px;" :span="16">{{value.ProjName}}</el-col>
            </el-row>
          </li>
          <li>
            <el-row>
              <el-col style="text-align:right;" :span="8">申请人部门 :</el-col>
              <el-col style="padding-left:16px;" :span="16">{{value.DeptName}}</el-col>
            </el-row>
          </li>
          <li>
            <el-row>
              <el-col style="text-align:right;" :span="8">申请时间 :</el-col>
              <el-col style="padding-left:16px;" :span="16">{{value.ApplyDate}}</el-col>
            </el-row>
          </li>
          <li>
            <el-row>
              <el-col style="text-align:right;" :span="8">申请人 :</el-col>
              <el-col style="padding-left:16px;" :span="16">{{value.AppliedByName}}</el-col>
            </el-row>
          </li>
        </ul>
      </el-collapse-item>
      <el-collapse-item title="审批信息" name="3">
        <template slot="title">
          <h3 class="titleText">审批信息</h3>
        </template>
        <div class="inputForm">
          <process-form
            :formlist="list"
            :value="value"
            :default-open-tree="defaultOpen"
            labelwidth="210px"
            :readonly="true"
          ></process-form>
        </div>
      </el-collapse-item>
    </el-collapse>
    <!-- <div class="buttonBox" v-if="buttonflag">
      <el-button type="primary" v-if="isShowDiscard" @click="discard">废弃</el-button>
      <el-button type="primary" @click="preview">查看审批</el-button>
    </div> -->
    <Buttons/>

    </div>

  </div>
</template>
<script>
import { costInfo, SendApproveCheck } from "@/api/offerFlow";
import { toHistoryUrl, queryFlowId } from "@/api/offerFlow.js";
import { get } from "@/api/request.js";
import { appSetToken } from "@/utils/util";
export default {
  components: {
    codeAndName:()=>import("@/views/offerFlow/component/codeAndName"),
    processForm:()=>import('@/views/component/formV2.vue'),
    Buttons:()=>import('../../views/offerFlow/component/index')

  },
  data() {
    window["$routeName"] = this.$route.query.BOID;
    return {
      defaultOpen: [0, 1, 2, 3, 4],
      openList: ["1", "2", "3"],
        codeAndName:[],
      flow_id: "",
      buttonflag: false,
      isShowDiscard: true,
      value: {
        ContractName: "",
        ContractCode: "",
        BUName: "",
        ProjName: "",
        Subject: "",
        TaxableCategory: "",
        TaxRate: "",
        ApplyAmount_Bz: "",
        ExcludingApplyAmount_Bz: "",
        InputApplyAmount_Bz: "",
        Remark: "",
        ApplyCode: "",
        ApplyDate: "",
        ApplyType: "",
        AppliedByName: "",
        ApplyAmount: "",
        PayProviderName: "",
        FKBUName: "",
        ApplyRemarks: "",
        ReceiveProviderName: "",
        UserName: "",
        BankAccounts: "",
        BankName: "",
        FundType: "",
        FundName: "",
        DfdkAmount: "",
        BalanceAmount: "",
        JsAmount: "",
        HtAmount: "",
        SumHtAmount_Bz: "",
        YfWfAmount: "",
        ScheduleConsultAmount: "",
        YfAmount: "",
        SumPayAmount: "",
        IsExecution: "",
        IsSpecialFlow: "",
        IsSpeedEqualHT: "",
        IsPartnerProj: "",
        IsUseOtherFee: "",
        PayInfo: [],
        DeptCostList: [],
        TaxList: [],
        DeptName: "",
        BxLx: "",
        PayTypeName: "",
        ATTACHMENTS: [
          // {
          //   name: "测试附件",
          //   url:
          //     "http://sales.cifi.com.cn:9020/UpFiles/201911/中麓府2019年半年预算上线版2019_11_26(14_32_12_42)233784576.xlsx"
          // },
          // {
          //   name: "测试附件",
          //   url:
          //     "http://sales.cifi.com.cn:9020/UpFiles/201911/中麓府2019年半年预算上线版2019_11_26(14_32_12_42)233784576.xlsx"
          // },
          // {
          //   name: "测试附件",
          //   url:
          //     "http://sales.cifi.com.cn:9020/UpFiles/201911/中麓府2019年半年预算上线版2019_11_26(14_32_12_42)233784576.xlsx"
          // },
          // {
          //   name: "测试附件",
          //   url:
          //     "http://sales.cifi.com.cn:9020/UpFiles/201911/中麓府2019年半年预算上线版2019_11_26(14_32_12_42)233784576.xlsx"
          // }
        ]
      },
      list: [
        {
          title: "付款基本信息",
          mode: "transverse",
          numbers: 3,
          inputList: [
            {
              label: "合同名称",
              type: "info",
              name: "ContractName"
            },
            {
              label: "合同编号",
              type: "info",
              name: "ContractCode"
            },
            {
              label: "所属公司",
              type: "info",
              name: "BUName"
            },
            {
              label: "所属项目",
              type: "info",
              name: "ProjName"
            },
            {
              label: "申请主题",
              type: "info",
              name: "Subject"
            },
            {
              label: "申请编号",
              type: "info",
              name: "ApplyCode"
            },
            /*{
              label: "申请日期",
              type: "info",
              name: "ApplyDate"
            },*/
            {
              label: "申请类型",
              type: "info",
              name: "ApplyType"
            },

            {
              label: "申请人",
              type: "info",
              name: "AppliedByName"
            },
            {
              label: "申请部门",
              type: "info",
              name: "DeptName"
            },
            {
              label: "申请金额",
              type: "info",
              name: "ApplyAmount"
            },
            {
              label: "付款单位",
              type: "info",
              name: "PayProviderName"
            },
            {
              label: "付款申请公司名称",
              type: "info",
              name: "FKBUName"
            },
            {
              label: "付款说明",
              type: "info",
              name: "ApplyRemarks",
              numbers: 1
            },
            {
              label: "收款单位",
              type: "info",
              name: "ReceiveProviderName"
            },
            {
              label: "员工",
              type: "info",
              name: "UserName"
            },
            {
              label: "银行账号",
              type: "info",
              name: "BankAccounts"
            },
            {
              label: "开户银行",
              type: "info",
              name: "BankName"
            },
            {
              label: "款项类型",
              type: "info",
              name: "FundType"
            },
            {
              label: "款项名称",
              type: "info",
              name: "FundName"
            },
            {
              label: "代付代扣",
              type: "info",
              name: "DfdkAmount"
            },
            {
              label: "冲账金额",
              type: "info",
              name: "BalanceAmount"
            },
            {
              label: "结账金额",
              type: "info",
              name: "JsAmount"
            },
            {
              label: "合同有效签约金额",
              type: "info",
              name: "HtAmount"
            },
            {
              label: "合同签约总价",
              type: "info",
              name: "SumHtAmount_Bz"
            },
            {
              label: "应付未付金额",
              type: "info",
              name: "YfWfAmount"
            },
            {
              label: "本次应付参考金额",
              type: "info",
              name: "ScheduleConsultAmount"
            },
            {
              label: "本次应付金额",
              type: "info",
              name: "YfAmount"
            },
            {
              label: "累计已付金额",
              type: "info",
              name: "SumPayAmount"
            },
            {
              label: "是否关联执行单",
              type: "info",
              name: "IsExecution"
            },
            {
              label: "是否特殊流程审批",
              type: "info",
              name: "IsSpecialFlow"
            },
            {
              label: "进度是否符合合同",
              type: "info",
              name: "IsSpeedEqualHT"
            },
            {
              label: "是否使用表外",
              type: "info",
              name: "IsUseOtherFee"
            },
            {
              label: "报销类型",
              type: "info",
              name: "BxLx"
            },
            {
              label: "结算方式",
              type: "info",
              name: "PayTypeName"
            }
          ]
        },
        {
          title: "部门费用列表",
          mode: "vertical",
          dataName: ["DeptCostList"],
          numbers: 2,
          inputList: [
            {
              label: "责任人",
              type: "info",
              name: "ZrrName"
            },
            {
              label: "责任部门",
              type: "info",
              name: "DeptName"
            },
            {
              label: "部门费用科目名称",
              type: "info",
              name: "DeptCostName"
            },
            {
              label: "事项",
              type: "info",
              name: "ProceedingName"
            },
            {
              label: "会计科目",
              type: "info",
              name: "JkCostName"
            },
            {
              label: "部门费用对应金额",
              type: "info",
              name: "FtAmount"
            }
          ]
        },
        {
          title: "税目明细列表",
          mode: "vertical",
          dataName: ["TaxList"],
          numbers: 9,
          inputList: [
            {
              label: "应税类别",
              type: "info",
              name: "TaxableCategory"
            },
            {
              label: "税率",
              type: "info",
              name: "TaxRate"
            },
            {
              label: "申请金额(含税)",
              type: "info",
              name: "ApplyAmount_Bz"
            },

            {
              label: "申请金额(不含税)",
              type: "info",
              name: "ExcludingApplyAmount_Bz"
            },
            {
              label: "进项税额",
              type: "info",
              name: "InputApplyAmount_Bz"
            },
            {
              label: "备注",
              type: "info",
              name: "Remark"
            }
          ]
        },
        {
          title: "附件",
          mode: "transverse",
          numbers: 4,
          inputList: [
            {
              label: "",
              type: "fileList",
              name: "index",
              numbers: 1,
              fileList: "ATTACHMENTS"
            }
          ]
        }
      ],
      TITLE: ""
    };
  },
  computed:{
    local() {
      let host;
      if (location.origin.includes("test")) {
        host = "https://salesmgt-test.cifi.com.cn";
      } else if (location.origin.includes("uat")) {
        host = "https://salesmgt-uat.cifi.com.cn";
      } else {
        host = "https://salesmgt.cifi.com.cn";
      }
      return host;
    },
  },
  methods: {
    toPoint(){
      // paymentRequestPoint
      var open = this.local+"/#/costPayPoint?BOID=" +
              this.$route.query.BOID;
            window.open(open);
    },
    useInfo() {
      costInfo({ json_id: this.$route.query.BOID }).then(res => {
            this.codeAndName=res.result
        let json = JSON.parse(res.result[0].flow_json);
        let str = res.result[0].flow_json;
        let bankStr = str
          .split('BankAccounts"')[1]
          .split(',"')[0]
          .split(":")[1];
        console.log(json);
        this.value.BankAccounts = bankStr;
        this.TITLE = "【费用付款申请发起页面】";
        this.value.ContractName = json.ContractName;
        this.value.ContractCode = json.ContractCode;
        this.value.BUName = json.BUName;
        this.value.ProjName = json.ProjName;
        this.value.Subject = json.Subject;
        this.value.ApplyCode = json.ApplyCode;
        this.value.ApplyDate = json.ApplyDate;
        this.value.ApplyType = json.ApplyType;
        this.value.AppliedByName = json.AppliedByName;
        this.value.ApplyAmount = json.ApplyAmount;
        this.value.PayProviderName = json.PayProviderName;
        this.value.FKBUName = json.FKBUName;
        this.value.PayTypeName = json.PayTypeName;
        this.value.BxLx = json.BxLx;
        this.value.ApplyRemarks = json.ApplyRemarks;
        this.value.ReceiveProviderName = json.ReceiveProviderName;
        this.value.UserName = json.UserName;

        this.value.BankName = json.BankName;
        this.value.FundType = json.FundType;
        this.value.FundName = json.FundName;
        this.value.DfdkAmount = json.DfdkAmount;
        this.value.BalanceAmount = json.BalanceAmount;
        this.value.JsAmount = json.JsAmount;
        this.value.HtAmount = json.HtAmount;
        this.value.SumHtAmount_Bz = json.SumHtAmount_Bz;
        this.value.YfWfAmount = json.YfWfAmount;
        this.value.ScheduleConsultAmount = json.ScheduleConsultAmount;
        this.value.YfAmount = json.YfAmount;
        this.value.SumPayAmount = json.SumPayAmount;
        this.value.IsExecution = json.IsExecution;
        this.value.IsSpecialFlow = json.IsSpecialFlow;
        this.value.IsSpeedEqualHT = json.IsSpeedEqualHT;
        this.value.IsPartnerProj = json.IsPartnerProj;
        this.value.IsUseOtherFee = json.IsUseOtherFee;
        this.value.DeptName = json.DeptName;
        if (json.DeptCostList) {
          if (
            Object.prototype.toString.call(json.DeptCostList.Item) ==
            "[object Array]"
          ) {
            json.DeptCostList.Item.forEach(item => {
              this.value.DeptCostList.push({
                CostGUID: item.CostGUID,
                DeptCostName: item.DeptCostName,
                DeptCostUseDtlGUID: item.DeptCostUseDtlGUID,
                DeptName: item.DeptName,
                FtAmount: item.FtAmount,
                JkCostCode: item.JkCostCode,
                JkCostName: item.JkCostName,
                ProceedingName: item.ProceedingName,
                YsProjGUID: item.YsProjGUID,
                ZrrName: item.ZrrName
              });
            });
          } else {
            this.value.DeptCostList = [json.DeptCostList.Item];
          }
        }
        if (json.TaxList) {
          if (
            Object.prototype.toString.call(json.TaxList.Item) ==
            "[object Array]"
          ) {
            json.TaxList.Item.forEach(item => {
              this.value.TaxList.push({
                HTFKApply2TaxGUID: item.HTFKApply2TaxGUID,
                TaxableCategory: item.TaxableCategory,
                TaxRate: item.TaxRate,
                ApplyAmount_Bz: item.ApplyAmount_Bz,
                ExcludingApplyAmount_Bz: item.ExcludingApplyAmount_Bz,
                InputApplyAmount_Bz: item.InputApplyAmount_Bz,
                Remark: item.Remark
              });
            });
          } else {
            this.value.TaxList = [json.TaxList.Item];
          }
        }
        if (json.ATTACHMENTS) {
          if (
            Object.prototype.toString.call(json.ATTACHMENTS.Item) ==
            "[object Array]"
          ) {
            json.ATTACHMENTS.Item.forEach(item => {
              this.value.ATTACHMENTS.push({
                name: item.FILENAME,
                url: item.URL
              });
            });
          } else {
            let obj = {
              url: json.ATTACHMENTS.Item.URL,
              name: json.ATTACHMENTS.Item.FILENAME
            };
            this.value.ATTACHMENTS = [obj];
          }
        }
      });
    },
    openChange(val) {
      console.log(val);
    },
    discard() {
      this.$confirm("此操作将废弃该流程,若还需重复发起该流程请勿进行此操作, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          get(`/WorkflowChoose/end?instanceId=${this.flow_id}`).then(res => {
            console.log(res);
            if (res.code == 200) {
              this.isShowDiscard = false;
              this.$message.success(res.messages);
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
    preview() {
      toHistoryUrl({
        proInstId: this.flow_id
      }).then(res => {
        console.log(res);
        // location.href = res.data;
        window.open(res.data);
      });
    }
  },
  created() {
    if (
      localStorage.getItem("expiration") &&
      new Date().getTime() > localStorage.getItem("expiration")
    ) {
      //跳单点
      window.localStorage.removeItem("token");
    }
    if (this.$route.query.taskId) {
      this.buttonflag = true;
      queryFlowId({}, this.$route.query.BOID).then(res => {
        if (res.code == 200) {
          if (res.data.flow_status == 7) {
            this.isShowDiscard = false;
          }
          this.flow_id = res.data.flow_id;
        }
        console.log(res)
      });
    }
    appSetToken()
    this.useInfo();
  },
  mounted() {
    let timeid = setTimeout(() => {
      if (window.cifioa) {
        console.log(this.$refs.costPay.offsetHeight);
        window.cifioa.sendMessage({
          type: "height",
          height: this.$refs.costPay.offsetHeight
        });
      } else {
        console.warn("缺少cifioa插件");
      }
      clearTimeout(timeid);
    }, 700);
  },
  updated() {
    let timeid = setTimeout(() => {
      if (window.cifioa) {
        console.log(this.$refs.costPay.offsetHeight);
        window.cifioa.sendMessage({
          type: "height",
          height: this.$refs.costPay.offsetHeight
        });
      } else {
        console.warn("缺少cifioa插件");
      }
      clearTimeout(timeid);
    }, 700);
  }
};
var flag = true;
window["validForm"] = function() {
  if (flag) {
    flag = false;
    var status = false;
    SendApproveCheck({
      BusinessGUID: window.$routeName,
      BTID: "MY_FYs_HTFKSP"
    }).then(res => {
      console.log(res);
      if (res.code == 200) {
        if (res.data == "true") {
          status = true;
          var params = { type: "validForm", state: true }; //state：true或false
          window.cifioa.sendMessage(params);
          return true;
        } else {
          var params = { type: "validForm", state: false }; //state：true或false
          window.cifioa.sendMessage(params);
          alert(res.messages);
          return false;
        }
      }
    });
  }
};
</script>

<style lang='less' scoped>
</style>

<style lang="less" >
.costPay {
    .container {
    position: relative;
    z-index: 1997;
  }
  .logo {
    height: 100px;
    padding: 0 40px;
    line-height: 100px;
    img {
      height: 40px;
      width: 200px;
      vertical-align: middle;
    }
  }
  .el-button.is-round{
  padding:0 15px;
  border:1px solid skyblue;
  color: skyblue;
}
  padding-bottom: 60px !important;
  .buttonBox {
    height: 60px;
    line-height: 60px;
    text-align: center;
    position: fixed;
    width: 100%;
    bottom: 0;
    background-color: #fff;
    z-index: 100;
  }
  .titleText {
    border-left: 3px solid #2661ff;
    height: 20px;
    line-height: 20px;
    text-indent: 1em;
    font-size: 16px;
    margin-left: 5px;
  }
  .lightFather {
    height: 20px;
    line-height: 20px;
    padding-left: 10px;
    .light {
      height: 16px;
      width: 16px;
      border-radius: 50%;
      // background-color: red;
      float: left;
      margin-top: 2px;
    }
    span {
      padding-left: 10px;
    }
  }
  .green {
    background-color: green;
  }
  .red {
    background-color: red;
  }
  .baseInfo {
    list-style: none;
    display: flex;
    flex-wrap: wrap;
    li {
      width: 33.33%;
      padding-left: 10px;
    }
  }
  .form_item_title {
    border: none !important;
  }
  .form-container .form_item {
    padding: 0px;
    margin-top: 0px;
  }
  @media (max-width: 1024px) {
    .baseInfo {
      list-style: none;
      display: flex;
      flex-wrap: wrap;
      li {
        width: 100%;
        padding-left: 10px;
      }
    }
    .el-form-item__label {
      width: 120px !important;
    }
    .el-form-item__content {
      margin-left: 120px !important;
    }

    .inputForm .el-col-8 {
      width: 100% !important;
    }
  }
}
</style>
