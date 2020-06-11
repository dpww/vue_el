<template>
  <div class="businessPayment" ref="businessPayment">
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
              <el-col style="padding-left:16px;" :span="16">{{value.SpecialUnitName}}</el-col>
            </el-row>
          </li>
          <li>
            <el-row>
              <el-col style="text-align:right;" :span="8">申请人部门 :</el-col>
              <el-col style="padding-left:16px;" :span="16">{{value.BUName}}</el-col>
            </el-row>
          </li>
          <li>
            <el-row>
              <el-col style="text-align:right;" :span="8">申请时间 :</el-col>
              <el-col style="padding-left:16px;" :span="16">{{value.JbDate}}</el-col>
            </el-row>
          </li>
          <li>
            <el-row>
              <el-col style="text-align:right;" :span="8">申请人 :</el-col>
              <el-col style="padding-left:16px;" :span="16">{{value.UserName}}</el-col>
            </el-row>
          </li>
        </ul>
      </el-collapse-item>
      <el-collapse-item title="审批信息" name="2">
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
  <!-- <process-form :title="TITLE" :formlist="list" :default-open-tree="defaultOpen" :value="value" labelwidth="210px" :readonly="true"></process-form> -->
</template>
<script>
import { costInfo } from "@/api/offerFlow";
import { toHistoryUrl, queryFlowId } from "@/api/offerFlow.js";
import { get } from "@/api/request.js";
import { appSetToken } from "@/utils/util";
export default {
  name: "businessPayment",
  components: {
    codeAndName:()=>import("@/views/offerFlow/component/codeAndName"),
    processForm:()=>import('@/views/component/formV2.vue'),
    Buttons:()=>import('../../views/offerFlow/component/index')

  },
  data() {
    return {
      buttonflag: false,
      isShowDiscard: true,
      flow_id:"",
      defaultOpen: [0, 1, 2],
      openList: ["1", "2"],
      codeAndName:[],
      value: {
        BUName: "",
        JbDate: "",
        DSManageOutFee: "",
        UserName: "",
        CompanyName: "",
        SpecialUnitName: "",
        DSManageFeeOutDtl: [],
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
              label: "所属项目名称",
              type: "date",
              name: "SpecialUnitName"
            },
            {
              label: "电商管理费支出总额",
              type: "date",
              name: "DSManageOutFee"
            },
            {
              label: "经办人",
              type: "date",
              name: "UserName"
            },
            {
              label: "经办部门",
              type: "date",
              name: "BUName"
            },
            {
              label: "经办日期",
              type: "date",
              name: "JbDate"
            }
          ]
        },
        {
          title: "表单明细",
          mode: "vertical",
          dataName: ["DSManageFeeOutDtl"],
          numbers: 7,
          inputList: [
            {
              label: "电商名称",
              type: "date",
              name: "DSName"
            },
            {
              label: "电商管理费",
              type: "date",
              name: "DSManageFee"
            },
            {
              label: "电商金额",
              type: "date",
              name: "DSAmount"
            },
            {
              label: "经办人",
              type: "date",
              name: "JbrByName"
            },
            {
              label: "经办日期",
              type: "date",
              name: "JbDate"
            },
            {
              label: "表外收入审批状态",
              type: "date",
              name: "SpState"
            },
            {
              label: "电商管理费支出审批状态",
              type: "date",
              name: "DsManageFeeOutSpState"
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

        this.TITLE = "【电商管理费支出发起页面】";
        this.value.JbDate = json.JbDate;
        this.value.DSManageOutFee = json.DSManageOutFee;
        this.value.UserName = json.UserName;
        this.value.CompanyName = json.CompanyName;
        this.value.SpecialUnitName = json.SpecialUnitName;
        this.value.BUName = json.BUName;
        if (json.DSManageFeeOutDtl) {
          if (
            Object.prototype.toString.call(json.DSManageFeeOutDtl.Item) ==
            "[object Array]"
          ) {
            json.DSManageFeeOutDtl.Item.forEach(item => {
              this.value.DSManageFeeOutDtl.push({
                DSAmount: item.DSAmount,
                DSManageFee: item.DSManageFee,
                DSName: item.DSName,
                DsManageFeeOutSpState: item.DsManageFeeOutSpState,
                JbDate: item.JbDate,
                JbrByName: item.JbrByName,
                OtherCostFeeGUID: item.OtherCostFeeGUID,
                SpState: item.SpState
              });
            });
          } else {
            this.value.DSManageFeeOutDtl = [json.DSManageFeeOutDtl.Item];
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
        window.open(res.data)
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
        console.log(this.$refs.businessPayment.offsetHeight);
        window.cifioa.sendMessage({
          type: "height",
          height: this.$refs.businessPayment.offsetHeight
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
        console.log(this.$refs.businessPayment.offsetHeight);
        window.cifioa.sendMessage({
          type: "height",
          height: this.$refs.businessPayment.offsetHeight
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
.businessPayment {
  padding-bottom: 60px !important;

  .container{
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
