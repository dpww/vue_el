<template>
  <div class="costPurchase" ref="costPurchase">
    <div class="container">
      <codeAndName :codeAndName="codeAndName"/>
      <process-form
      :title="TITLE"
      :formlist="list"
      :value="value"
      :default-open-tree="defaultOpen"
      labelwidth="210px"
      :readonly="true"
    ></process-form>
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
    return {
      defaultOpen: [0, 1, 2, 3, 4],
      buttonflag: false,
      isShowDiscard: true,
       codeAndName:[],
      flow_id: "",
      value: {
        lovelyTips: "",
        RWProvider: [],
        PlanCode: "",
        PlanName: "",
        BUName: "",
        ProjName: "",
        Year: "",
        ApproveState: "",
        PlanDate: "",
        YGAmount: "",
        PlanMode: "",
        ZYGS: "",
        PlanWay: "",
        BidRate: "",
        SWBRate: "",
        JSBRate: "",
        Jbr: "",
        JBBM: "",
        DBYZ: "",
        BidContent: "",
        MonthYSAmount: "",
        MonthYSUseAmount: "",
        IsPartnerProj: "",
        Partner: "",
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
          title: "提示信息",
          mode: "transverse",
          numbers: 1,
          inputList: [
            {
              label: "温馨提示",
              type: "date",
              name: "lovelyTips"
            }
          ]
        },
        {
          title: "基本信息",
          mode: "transverse",
          numbers: 2,
          inputList: [
            {
              label: "采购方案编号",
              type: "date",
              name: "PlanCode"
            },
            {
              label: "采购方案名称",
              type: "date",
              name: "PlanName"
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
              label: "年份",
              type: "date",
              name: "Year"
            },
            {
              label: "审核状态",
              type: "date",
              name: "ApproveState"
            },
            {
              label: "申请日期",
              type: "date",
              name: "PlanDate"
            },
            {
              label: "预估金额",
              type: "date",
              name: "YGAmount"
            },
            {
              label: "采购模式",
              type: "date",
              name: "PlanMode"
            },
            {
              label: "专业归属",
              type: "date",
              name: "ZYGS"
            },
            {
              label: "采购方式",
              type: "date",
              name: "PlanWay"
            },
            {
              label: "中标率",
              type: "date",
              name: "BidRate"
            },
            {
              label: "商务标比例",
              type: "date",
              name: "SWBRate"
            },
            {
              label: "技术标比例",
              type: "date",
              name: "JSBRate"
            },
            {
              label: "经办人",
              type: "date",
              name: "Jbr"
            },
            {
              label: "经办部门",
              type: "date",
              name: "JBBM"
            },
            {
              label: "招标内容",
              type: "date",
              name: "BidContent",
              numbers: 1
            },
            {
              label: "定标原则",
              type: "date",
              name: "DBYZ",
              numbers: 1
            }
          ]
        },
        {
          title: "参考信息",
          mode: "transverse",
          dataName: ["OtherFeeAdjustDtl"],
          numbers: 2,
          inputList: [
            {
              label: "月度推广额度",
              type: "date",
              name: "MonthYSAmount"
            },
            {
              label: "已使用",
              type: "date",
              name: "MonthYSUseAmount"
            },
            {
              label: "是否存在关联关系",
              type: "date",
              name: "Partner"
            },
            {
              label: "合作方参与审批",
              type: "date",
              name: "IsPartnerProj"
            }
          ]
        },
        {
          title: "参考信息",
          mode: "vertical",
          dataName: ["RWProvider"],
          numbers: 4,
          inputList: [
            {
              label: "供应商名称",
              type: "date",
              name: "ProviderName"
            },
            {
              label: "对接人",
              type: "date",
              name: "Djr"
            },
            {
              label: "对接人电话",
              type: "date",
              name: "DJRPhone"
            },
            {
              label: "入围理由",
              type: "date",
              name: "RWContent"
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
        this.value.lovelyTips =
          "本流程涉及到'区域集团相关营销条线负责人',流程推演中,请用户自行选择业务相关人员,如有疑问请咨询系统支持人员.";
        this.TITLE = "【费用采购方案发起页面 】";
        this.value.PlanCode = json.PlanCode;
        this.value.PlanName = json.PlanName;
        this.value.BUName = json.BUName;
        this.value.ProjName = json.ProjName;
        this.value.Year = json.Year;
        this.value.ApproveState = json.ApproveState;
        this.value.PlanDate = json.PlanDate;
        this.value.YGAmount = json.YGAmount;
        this.value.PlanMode = json.PlanMode;
        this.value.ZYGS = json.ZYGS;
        this.value.PlanWay = json.PlanWay;
        this.value.BidRate = json.BidRate;
        this.value.SWBRate = json.SWBRate;
        this.value.JSBRate = json.JSBRate;
        this.value.Jbr = json.Jbr;
        this.value.JBBM = json.JBBM;
        this.value.DBYZ = json.DBYZ;
        this.value.BidContent = `${json.BidContent}`;
        this.value.MonthYSAmount = json.MonthYSAmount;
        this.value.MonthYSUseAmount = json.MonthYSUseAmount;
        this.value.IsPartnerProj = json.IsPartnerProj;
        this.value.Partner = json.Partner;
        if (
          Object.prototype.toString.call(json.RWProvider.Item) ==
          "[object Array]"
        ) {
          json.RWProvider.Item.forEach(item => {
            this.value.RWProvider.push({
              CGPlan2RWProviderGUID: item.CGPlan2RWProviderGUID,
              DJRPhone: item.DJRPhone,
              Djr: item.Djr,
              ProviderName: item.ProviderName,
              RWContent: item.RWContent
            });
          });
        } else {
          this.value.RWProvider = [json.RWProvider.Item];
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
        console.log(this.$refs.costPurchase.offsetHeight);
        window.cifioa.sendMessage({
          type: "height",
          height: this.$refs.costPurchase.offsetHeight
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
        console.log(this.$refs.costPurchase.offsetHeight);
        window.cifioa.sendMessage({
          type: "height",
          height: this.$refs.costPurchase.offsetHeight
        });
      } else {
        console.warn("缺少cifioa插件");
      }
      clearTimeout(timeid);
    }, 700);
  }
};
</script>

<style lang='less' >
.costPurchase {
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
}
</style>
