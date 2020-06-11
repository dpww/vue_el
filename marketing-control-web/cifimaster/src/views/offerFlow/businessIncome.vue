<template>
  <!-- <process-form :title="TITLE" :formlist="list" :default-open-tree="defaultOpen" :value="value" labelwidth="210px" :readonly="true"></process-form> -->
  <div class="businessIncome" ref="businessIncome">
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
              <el-col style="padding-left:16px;" :span="16">{{value.BUName}}</el-col>
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
</template>
<script>
import { costInfo } from "@/api/offerFlow";
import { toHistoryUrl, queryFlowId } from "@/api/offerFlow.js";
import { get } from "@/api/request.js";
import { appSetToken } from "@/utils/util";
export default {
  name: "businessIncome",
  components: {
    processForm:()=>import("@/views/component/formV2.vue"),
    Buttons:()=>import('../../views/offerFlow/component/index'),
    codeAndName:()=>import("@/views/offerFlow/component/codeAndName"),
  },
  data() {
    return {
      buttonflag: false,
      isShowDiscard: true,
      defaultOpen: [0, 1, 2],
      openList: ["1", "2"],
       codeAndName:[],
      flow_id: "",
      value: {
        IsPartnerProj: "",
        AdjustReason: "",
        AdjustDate: "",
        BUCODE: "",
        BUName: "",
        Adjuster: "",
        Subject: "",
        OtherFeeAdjustDtl: [],
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
              label: "公司名称",
              type: "date",
              name: "BUName"
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
          title: "调整明细",
          mode: "vertical",
          dataName: ["OtherFeeAdjustDtl"],
          numbers: 5,
          inputList: [
            {
              label: "预算项目",
              type: "date",
              name: "YsProjName"
            },
            {
              label: "表外余额",
              type: "date",
              name: "PlanAmount"
            },
            {
              label: "调整金额",
              type: "date",
              name: "AdjustAmount"
            },
            {
              label: "调整后表外余额",
              type: "date",
              name: "AdjustedAmount"
            },
            {
              label: "表外调整原因",
              type: "date",
              name: "Remarks"
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
        this.TITLE = "【电商收入项目间腾挪发起页面】";
        this.value.IsPartnerProj = json.IsPartnerProj;
        this.value.AdjustReason = json.AdjustReason;
        this.value.AdjustDate = json.AdjustDate;
        this.value.BUCODE = json.BUCODE;
        this.value.BUName = json.BUName;
        this.value.Adjuster = json.Adjuster;
        this.value.Subject = json.Subject;
        // this.value.ATTACHMENTS = json.ATTACHMENTS;
        if (json.OtherFeeAdjustDtl) {
          if (
            Object.prototype.toString.call(json.OtherFeeAdjustDtl.Item) ==
            "[object Array]"
          ) {
            json.OtherFeeAdjustDtl.Item.forEach(item => {
              this.value.OtherFeeAdjustDtl.push({
                AdjustAmount: item.AdjustAmount,
                AdjustedAmount: item.AdjustedAmount,
                Dept2DeptAdjustDtlGUID: item.Dept2DeptAdjustDtlGUID,
                PlanAmount: item.PlanAmount,
                Remarks: item.Remarks,
                YsProjName: item.YsProjName
              });
            });
          } else {
            this.value.OtherFeeAdjustDtl = [json.OtherFeeAdjustDtl.Item];
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
        console.log(this.$refs.businessIncome.offsetHeight);
        window.cifioa.sendMessage({
          type: "height",
          height: this.$refs.businessIncome.offsetHeight
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
        console.log(this.$refs.businessIncome.offsetHeight);
        window.cifioa.sendMessage({
          type: "height",
          height: this.$refs.businessIncome.offsetHeight
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
.businessIncome {
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
    // background-color: #fff;
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
