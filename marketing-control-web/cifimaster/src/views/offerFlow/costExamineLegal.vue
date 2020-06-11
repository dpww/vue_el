<template>
  <!-- <process-form :title="TITLE" :formlist="list" :default-open-tree="defaultOpen" :value="value" labelwidth="210px" :readonly="true"></process-form> -->
  <div class="costExamine" ref="costExamine">
    <div class="container">
      <codeAndName :codeAndName="codeAndName"/>
      <el-collapse v-model="openList" @change="openChange">
      <el-collapse-item title="基础信息" name="1">
        <template slot="title">
          <h3 class="titleText">基础信息</h3>
        </template>
        <ul class="baseInfo">
          <li>
            <el-row>
              <el-col style="text-align:right;" :span="8">项目名称 :</el-col>
              <el-col style="padding-left:16px;" :span="16">旭辉集团-皖赣区域集团-营销管理部</el-col>
            </el-row>
          </li>
          <li>
            <el-row>
              <el-col style="text-align:right;" :span="8">申请人职位 :</el-col>
              <el-col style="padding-left:16px;" :span="16">综管经理</el-col>
            </el-row>
          </li>
          <li>
            <el-row>
              <el-col style="text-align:right;" :span="8">申请时间 :</el-col>
              <el-col style="padding-left:16px;" :span="16">2019-03-18</el-col>
            </el-row>
          </li>
          <li>
            <el-row>
              <el-col style="text-align:right;" :span="8">申请人 :</el-col>
              <el-col style="padding-left:16px;" :span="16">张婕</el-col>
            </el-row>
          </li>
        </ul>
      </el-collapse-item>
      <el-collapse-item title="审批要点" name="2">
        <template slot="title">
          <h3 class="titleText">审批要点</h3>
        </template>
        <p class="lightFather">
          <i class="light red"></i>
          <span>跨科目调/同科目跨项目/同科目同项目</span>
        </p>
        <p class="lightFather">
          <i class="light green"></i>
          <span>同城市/跨城市</span>
        </p>
        <p class="lightFather">
          <i class="light green"></i>
          <span>调增/减预算调整/事业部年初目标费率调增/减 /调增/减预算调整(事业部年初目标费率调增/减≥10%)</span>
        </p>
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
import { costInfo } from "@/api/offerFlow";
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
      openList: ["1", "2", "3"],
      defaultOpen: [0, 1, 2, 3, 4, 5, 6],
      buttonflag: false,
      isShowDiscard: true,
        codeAndName:[],
      flow_id: "",
      value: {
        ContractName: "",
        ContractCode: "",
        BUName: "",
        ProjName: "",
        HtTypeName: "",
        HtProperty: "",
        JfProviderName: "",
        JfCorporation: "",
        YfCorporation: "",
        YfProviderName: "",
        UserName: "",
        BfProviderName: "",
        BfCorporation: "",
        ContractName: "",
        TotalAmount: "",
        HtAmount: "",
        SignDate: "",
        ApplySubject: "",
        ApplyDate: "",
        ApplyAmount: "",
        PlanMode: "",
        IsUseBZContract: "",
        IsLinkTrade: "",
        IsPartnerProj: "",
        SignMode: "",
        CostProperty: "",
        CgPlanName: "",
        HtClass: "",
        IsChangePlanWay: "",
        PayInfo: [],
        DeptInfo: [],
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
          title: "基本信息",
          mode: "transverse",
          numbers: 3,
          inputList: [
            {
              label: "合同名称",
              type: "date",
              name: "ContractName"
            },
            {
              label: "合同编码",
              type: "date",
              name: "ContractCode"
            },
            {
              label: "所属公司名称",
              type: "date",
              name: "BUName"
            },
            {
              label: "所属项目名称",
              type: "date",
              name: "ProjName"
            },
            {
              label: "合同类别",
              type: "date",
              name: "HtTypeName"
            },
            {
              label: "合同性质",
              type: "date",
              name: "HtProperty"
            },
            {
              label: "甲方单位",
              type: "date",
              name: "JfProviderName"
            },
            {
              label: "甲方单位签字人",
              type: "date",
              name: "JfCorporation"
            },

            {
              label: "乙方单位",
              type: "date",
              name: "YfProviderName"
            },
            {
              label: "乙方单位签字人",
              type: "date",
              name: "YfCorporation"
            },
            {
              label: "员工",
              type: "date",
              name: "UserName"
            },
            {
              label: "丙方单位",
              type: "date",
              name: "BfProviderName"
            },
            {
              label: "丙方单位签字人",
              type: "date",
              name: "BfCorporation"
            },
            {
              label: "主合同名称",
              type: "date",
              name: "ContractName"
            },
            {
              label: "合同金额",
              type: "date",
              name: "TotalAmount"
            },
            {
              label: "有效签约金额",
              type: "date",
              name: "HtAmount"
            },
            {
              label: "合同签约日期",
              type: "date",
              name: "SignDate"
            },
            {
              label: "申请单主题",
              type: "date",
              name: "ApplySubject"
            },
            {
              label: "申请日期",
              type: "date",
              name: "ApplyDate"
            },
            {
              label: "申请金额",
              type: "date",
              name: "ApplyAmount"
            },
            {
              label: "采购模式",
              type: "info",
              name: "PlanMode"
            },
            {
              label: "是否改变采购模式",
              type: "info",
              name: "IsChangePlanWay"
            },
            {
              label: "是否使用标准合同",
              type: "info",
              name: "IsUseBZContract"
            },
            {
              label: "是否关连交易",
              type: "info",
              name: "IsLinkTrade"
            }
          ]
        },
        {
          title: "其他信息",
          mode: "transverse",
          numbers: 3,
          inputList: [
            {
              label: "形成方式",
              type: "date",
              name: "SignMode"
            },
            {
              label: "造价性质",
              type: "date",
              name: "CostProperty"
            },
            {
              label: "对应采购计划事项",
              type: "date",
              name: "CgPlanName"
            },
            {
              label: "合同性质",
              type: "date",
              name: "HtClass"
            },
            {
              label: "经办人",
              type: "date",
              name: "HtProperty"
            },
            {
              label: "经办部门",
              type: "date",
              name: "BUName"
            }
          ]
        },
        {
          title: "部门费用列表",
          mode: "vertical",
          numbers: 2,
          dataName: ["DeptInfo"],
          inputList: [
            {
              label: "责任人",
              type: "date",
              name: "Zrrname"
            },
            {
              label: "责任部门",
              type: "date",
              name: "Deptname"
            },
            {
              label: "部门费用科目名称",
              type: "date",
              name: "CostFullName"
            },
            {
              label: "部门费用对应金额",
              type: "date",
              name: "Budgetamount"
            },
            {
              label: "事项",
              type: "date",
              name: "ProceedingName"
            }
          ]
        },
        {
          title: "合同付款条件列表",
          mode: "vertical",
          numbers: 5,
          dataName: ["PayInfo"],
          inputList: [
            {
              label: "序号",
              type: "date",
              name: "RowNum"
            },
            {
              label: "付款类型",
              type: "date",
              name: "FKType"
            },
            {
              label: "付款比例",
              type: "date",
              name: "FKRate"
            },
            {
              label: "付款金额",
              type: "date",
              name: "FKAmount"
            },
            {
              label: "付款说明",
              type: "date",
              name: "FKCondition"
            },
            {
              label: "付款日期",
              type: "date",
              name: "FkDate"
            }
          ]
        },
        {
          title: "税目明细列表",
          mode: "vertical",
          dataName: ["ApplyShare"],
          numbers: 9,
          inputList: [
            {
              label: "应税类别",
              type: "date",
              name: "DeptName"
            },
            {
              label: "金额(含税)",
              type: "date",
              name: "ProceedingNames"
            },
            {
              label: "税率",
              type: "date",
              name: "CostCodes"
            },
            {
              label: "金额(不含税)",
              type: "date",
              name: "CostShortName"
            },
            {
              label: "进项税额",
              type: "date",
              name: "FtAmount"
            },
            {
              label: "备注",
              type: "date",
              name: "FtYear"
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
  methods: {
    useInfo() {
      costInfo({ json_id: this.$route.query.BOID }).then(res => {
        this.codeAndName=res.result
        let json = JSON.parse(res.result[0].flow_json);
        console.log(json);
        this.TITLE = "【费用合同审批发起页】";
        this.value.ContractName = json.ContractName;
        this.value.ContractCode = json.ContractCode;
        this.value.BUName = json.BUName;
        this.value.ProjName = json.ProjName;
        this.value.HtTypeName = json.HtTypeName;
        this.value.HtProperty = json.HtProperty;
        this.value.JfProviderName = json.JfProviderName;
        this.value.JfCorporation = json.JfCorporation;
        this.value.YfProviderName = json.YfProviderName;
        this.value.YfCorporation = json.YfCorporation;
        this.value.UserName = json.UserName;
        this.value.BfCorporation = json.BfCorporation;
        this.value.BfProviderName = json.BfProviderName;
        this.value.ContractName = json.ContractName;
        this.value.TotalAmount = json.TotalAmount;
        this.value.HtAmount = json.HtAmount;
        this.value.SignDate = json.SignDate;
        this.value.ApplySubject = json.ApplySubject;
        this.value.ApplyDate = json.ApplyDate;
        this.value.ApplyAmount = json.ApplyAmount;
        this.value.PlanMode = json.PlanMode;
        this.value.IsUseBZContract = json.IsUseBZContract;
        this.value.IsLinkTrade = json.IsLinkTrade;
        this.value.IsPartnerProj = json.IsPartnerProj;
        this.value.SignMode = json.SignMode;
        this.value.CostProperty = json.CostProperty;
        this.value.CgPlanName = json.CgPlanName;
        this.value.HtClass = json.HtClass;
        this.value.IsChangePlanWay = json.IsChangePlanWay;

        if (
          Object.prototype.toString.call(json.DeptInfo.Item) == "[object Array]"
        ) {
          json.DeptInfo.Item.forEach(item => {
            this.value.DeptInfo.push({
              Budgetamount: item.Budgetamount,
              CostFullName: item.CostFullName,
              DeptCost2ContractGUID: item.DeptCost2ContractGUID,
              Deptname: item.Deptname,
              ProceedingName: item.ProceedingName,
              Zrrname: item.Zrrname
            });
          });
        } else {
          this.value.DeptInfo = [json.DeptInfo.Item];
        }
        if (
          Object.prototype.toString.call(json.PayInfo.Item) == "[object Array]"
        ) {
          json.PayInfo.Item.forEach(item => {
            this.value.PayInfo.push({
              FKAmount: item.FKAmount,
              FKCondition: item.FKCondition,
              FKRate: item.FKRate,
              FKType: item.FKType,
              FkDate: item.FkDate,
              HTFKConditionGUID: item.HTFKConditionGUID,
              RowNum: item.RowNum
            });
          });
        } else {
          this.value.PayInfo = [json.PayInfo.Item];
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
              this.$message.error(res.messages);
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
      });
    }
    appSetToken()
    this.useInfo();
  },
  mounted() {
    let timeid = setTimeout(() => {
      if (window.cifioa) {
        console.log(this.$refs.costExamine.offsetHeight);
        window.cifioa.sendMessage({
          type: "height",
          height: this.$refs.costExamine.offsetHeight
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
        console.log(this.$refs.costExamine.offsetHeight);
        window.cifioa.sendMessage({
          type: "height",
          height: this.$refs.costExamine.offsetHeight
        });
      } else {
        console.warn("缺少cifioa插件");
      }
      clearTimeout(timeid);
    }, 700);
  }
};
</script>

<style lang='less' scoped>
</style>

<style lang="less" >
.costExamine {
  padding-bottom: 60px !important;
  .container {
    position: relative;
    z-index: 1997;
  }

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

