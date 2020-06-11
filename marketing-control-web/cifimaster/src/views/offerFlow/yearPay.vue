<template>
  <div class="yearPay" ref="yearPay">
    <div class="container">
      <codeAndName :codeAndName="codeAndName"/>
      <el-collapse v-model="openList" @change="openChange">
      <el-collapse-item title="基础信息" name="1">
        <template slot="title">
          <h3 class="titleText">基础信息</h3>
        </template>
        <ul class="baseInfo">
          <!-- <li>
            <el-row>
              <el-col style="text-align:right;" :span="8">项目名称 :</el-col>
              <el-col style="padding-left:16px;" :span="16"></el-col>
            </el-row>
          </li>-->
          <li>
            <el-row>
              <el-col style="text-align:right;" :span="8">申请人部门 :</el-col>
              <el-col style="padding-left:16px;" :span="16">{{value.BUName}}</el-col>
            </el-row>
          </li>
          <li>
            <el-row>
              <el-col style="text-align:right;" :span="8">申请时间 :</el-col>
              <el-col style="padding-left:16px;" :span="16">{{value.AdjustDate}}</el-col>
            </el-row>
          </li>
          <li>
            <el-row>
              <el-col style="text-align:right;" :span="8">申请人 :</el-col>
              <el-col style="padding-left:16px;" :span="16">{{value.Adjuster}}</el-col>
            </el-row>
          </li>
        </ul>
      </el-collapse-item>
      <!-- <el-collapse-item title="审批要点" name="2">
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
      </el-collapse-item>-->
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
    return {
      codeAndName:[],
      defaultOpen: [0, 1, 2, 3, 4, 5],
      openList: ["1", "2", "3"],
      buttonflag: false,
      isShowDiscard: true,
      value: {
        Subject: "",
        Adjuster: "",
        AdjustDate: "",
        AdjustAmount: "",
        AdjustReason: "",
        Year: "",
        flow_id: "",

        BUName: "",
        BUCODE: "",
        AdjustInAmount: "",
        AdjustWay: "",
        IsPartnerProj: "",
        AdjustInNum: "",
        DeptAdjustDtlInfo: [],
        AdjustInInfo: [],
        AdjustOutInfo: [],
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
        ],
        roomPriceList: [
          {
            index: "建筑单价(元/㎡)",
            originalPriceInfo: "0",
            newPriceInfo: "0",
            priceSpread: "0.00"
          },
          {
            index: "套内单价(元/㎡)",
            originalPriceInfo: "0",
            newPriceInfo: "0",
            priceSpread: "0.00"
          },
          {
            index: "标准总价(元)",
            originalPriceInfo: "0",
            newPriceInfo: "0",
            priceSpread: "0.00"
          }
        ]
      },
      list: [
        {
          title: "基本信息",
          mode: "transverse",
          numbers: 3,
          inputList: [
            {
              label: "主题",
              type: "date",
              name: "Subject"
            },
            {
              label: "调整日期",
              type: "date",
              name: "AdjustDate"
            },
            {
              label: "本次调整总金额",
              type: "date",
              name: "AdjustAmount"
            },

            {
              label: "所属年度",
              type: "date",
              name: "Year"
            },
            {
              label: "公司名称",
              type: "date",
              name: "BUName"
            },
            {
              label: "公司编码",
              type: "date",
              name: "BUCODE"
            },
            {
              label: "调入总金额",
              type: "date",
              name: "AdjustInAmount"
            },
            // {
            //   label: "合作方参与审批",
            //   type: "date",
            //   name: "IsPartnerProj "
            // },
            {
              label: "预算调整方式",
              type: "date",
              name: "AdjustWay"
            },
            {
              label: "调整原因",
              type: "date",
              name: "AdjustReason",
              numbers: 1
            }
          ]
        },
        {
          title: "调入部门调整明细",
          mode: "vertical",
          dataName: ["AdjustInInfo"],
          numbers: 10,
          inputList: [
            {
              label: "调入序号",
              type: "date",
              name: "AdjustInNum"
            },
            {
              label: "调入预算部门",
              type: "date",
              name: "AdjustInDept"
            },
            {
              label: "调入事项名称",
              type: "date",
              name: "AdjustInProceed"
            },
            {
              label: "调入科目名称",
              type: "date",
              name: "AdjustInCost"
            },
            {
              label: "调入月份",
              type: "date",
              name: "AdjustInMonth"
            },
            {
              label: "调入预算",
              type: "date",
              name: "AdjustInPlanAmount"
            },
            {
              label: "调入预算执行差额",
              type: "date",
              name: "AdjustInZxPlanAmount"
            },
            {
              label: "调入金额",
              type: "date",
              name: "AdjustInAmount"
            },
            {
              label: "调入后",
              type: "date",
              name: "AdjustInAfterAmount"
            },
            {
              label: "调入原因",
              type: "date",
              name: "AdjustInRemark"
            }
          ]
        },
        {
          title: "调出部门调整明细",
          mode: "vertical",
          dataName: ["AdjustOutInfo"],
          numbers: 10,
          inputList: [
            {
              label: "调出序号",
              type: "date",
              name: "AdjustOutNum"
            },
            {
              label: "调出预算部门",
              type: "date",
              name: "AdjustOutDept"
            },
            {
              label: "调出事项名称",
              type: "date",
              name: "AdjustOutProceed"
            },
            {
              label: "调出科目名称",
              type: "date",
              name: "AdjustOutCost"
            },
            {
              label: "调出月份",
              type: "date",
              name: "AdjustOutMonth"
            },
            {
              label: "调出预算",
              type: "date",
              name: "AdjustOutPlanAmount"
            },
            {
              label: "调出预算执行差额",
              type: "date",
              name: "AdjustOutZxPlanAmount"
            },
            {
              label: "调出金额",
              type: "date",
              name: "AdjustOutAmount"
            },
            {
              label: "调出后",
              type: "date",
              name: "AdjustOutAfterAmount"
            },
            {
              label: "调出原因",
              type: "date",
              name: "AdjustOutRemark"
            }
          ]
        },
        {
          title: "年度费用预算调整明细",
          mode: "vertical",
          numbers: 10,
          dataName: ["DeptAdjustDtlInfo"],
          inputList: [
            {
              label: "序号",
              type: "date",
              name: "TNum"
            },
            {
              label: "预算项目",
              type: "date",
              name: "YsProjName"
            },
            {
              label: "科目名称",
              type: "date",
              name: "CostName"
            },
            {
              label: "月份",
              type: "date",
              name: "Month"
            },
            {
              label: "原预算(月度)",
              type: "date",
              name: "OldMonthPlanAmount"
            },
            {
              label: "调整金额(月度)",
              type: "date",
              name: "AdjustMonthPlanAmount"
            },
            {
              label: "调整后预算(月度)",
              type: "date",
              name: "NewMonthPlanAmount"
            },
            {
              label: "预算调整原因",
              type: "date",
              name: "PlanAdjustRemark"
            },
            {
              label: "原预算(年度)",
              type: "date",
              name: "OldYearPlanAmount"
            },
            {
              label: "调整后预算(年度)",
              type: "date",
              name: "NewYearPlanAmount"
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
      costInfo({
        json_id: this.$route.query.BOID
        // json_id: "fb0cb102-e410-ea11-80bc-20677cdc303c"
      }).then(res => {
          this.codeAndName=res.result
        let json = JSON.parse(res.result[0].flow_json);
        console.log(JSON.parse(res.result[0].flow_json));
        this.TITLE = "【年度预算调整（支付口径）发起页面】";
        this.value.Subject = json.Subject;
        this.value.Adjuster = json.Adjuster;
        this.value.AdjustDate = json.AdjustDate;
        this.value.AdjustAmount = json.AdjustAmount;
        this.value.AdjustReason = json.AdjustReason;
        this.value.Year = json.Year;
        this.value.BUName = json.BUName;
        this.value.BUCODE = json.BUCODE;
        this.value.AdjustInAmount = json.AdjustInAmount;
        this.value.AdjustWay = json.AdjustWay;
        this.value.IsPartnerProj = json.IsPartnerProj;
        if (json.AdjustOutInfo) {
          if (
            Object.prototype.toString.call(json.AdjustOutInfo.Item) ==
            "[object Array]"
          ) {
            json.AdjustOutInfo.Item.forEach(item => {
              this.value.AdjustOutInfo.push({
                AdjustOutAfterAmount: item.AdjustOutAfterAmount,
                AdjustOutAmount: item.AdjustOutAmount,
                AdjustOutCost: item.AdjustOutCost,
                AdjustOutDept: item.AdjustOutDept,
                AdjustOutMonth: item.AdjustOutMonth,
                AdjustOutNum: item.AdjustOutNum,
                AdjustOutPlanAmount: item.AdjustOutPlanAmount,
                AdjustOutProceed: item.AdjustOutProceed,
                AdjustOutRemark: item.AdjustOutRemark,
                AdjustOutZxPlanAmount: item.AdjustOutZxPlanAmount
              });
            });
          } else {
            this.value.AdjustOutInfo = [json.AdjustOutInfo.Item];
          }
        }

        console.log(this.value.AdjustOutInfo);
        if (json.AdjustInInfo) {
          if (
            Object.prototype.toString.call(json.AdjustInInfo.Item) ==
            "[object Array]"
          ) {
            json.AdjustInInfo.Item.forEach(item => {
              this.value.AdjustInInfo.push({
                AdjustInAfterAmount: item.AdjustInAfterAmount,
                AdjustInAmount: item.AdjustInAmount,
                AdjustInCost: item.AdjustInCost,
                AdjustInDept: item.AdjustInDept,
                AdjustInMonth: item.AdjustInMonth,
                AdjustInNum: item.AdjustInNum,
                AdjustInPlanAmount: item.AdjustInPlanAmount,
                AdjustInProceed: item.AdjustInProceed,
                AdjustInRemark: item.AdjustInRemark,
                AdjustInZxPlanAmount: item.AdjustInZxPlanAmount
              });
            });
          } else {
            this.value.AdjustInInfo = [json.AdjustInInfo.Item];
          }
        }

        if (json.DeptAdjustDtlInfo) {
          if (
            Object.prototype.toString.call(json.DeptAdjustDtlInfo.Item) ==
            "[object Array]"
          ) {
            json.DeptAdjustDtlInfo.Item.forEach(item => {
              this.value.DeptAdjustDtlInfo.push({
                AdjustMonthPlanAmount: item.AdjustMonthPlanAmount,
                CostName: item.CostName,
                Month: item.Month,
                NewMonthPlanAmount: item.NewMonthPlanAmount,
                NewYearPlanAmount: item.NewYearPlanAmount,
                OldMonthPlanAmount: item.OldMonthPlanAmount,
                OldYearPlanAmount: item.OldYearPlanAmount,
                PlanAdjustRemark: item.PlanAdjustRemark,
                TNum: item.TNum,
                YsProjName: item.YsProjName
              });
            });
          } else {
            this.value.DeptAdjustDtlInfo = [json.DeptAdjustDtlInfo.Item];
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
        console.log(this.$refs.yearPay.offsetHeight);
        window.cifioa.sendMessage({
          type: "height",
          height: this.$refs.yearPay.offsetHeight
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
        console.log(this.$refs.yearPay.offsetHeight);
        window.cifioa.sendMessage({
          type: "height",
          height: this.$refs.yearPay.offsetHeight
        });
      } else {
        console.warn("缺少cifioa插件");
      }
      clearTimeout(timeid);
    }, 700);
  }
};
</script>


<style lang="less" >
.yearPay {
  padding-bottom: 60px !important;
   .container {
    position: relative;
    z-index: 1997;
  }
  .titleText {
    border-left: 3px solid #2661ff;
    height: 20px;
    line-height: 20px;
    text-indent: 1em;
    font-size: 16px;
    margin-left: 5px;
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
