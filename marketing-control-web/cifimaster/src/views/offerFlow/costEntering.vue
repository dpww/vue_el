<template>
  <div class="costEntering" ref="costEntering">
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
              <el-col style="padding-left:16px;" :span="16">{{value.ProjName}}</el-col>
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
              <el-col style="padding-left:16px;" :span="16">{{value.YwDate}}</el-col>
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
      defaultOpen: [0, 1, 2],
      openList: ["1", "2"],
      buttonflag: false,
      flow_id:"",
      codeAndName:[],
      isShowDiscard: true,
      value: {
        OtherFeeDtl: [],
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
        IsPartnerProj: "",
        ProjName: "",
        BUName: "",
        BUCODE: "",
        JbDate: "",
        UserName: "",
        DeptName: "",
        YwDate: "",
        DSAmount: "",
        DsNames: "",
        DSInAmount: "",
        ApproveType: "",
        DSManageFee: ""
      },
      list: [
        {
          title: "基本信息",
          mode: "transverse",
          numbers: 3,
          inputList: [
            {
              label: "电商名称",
              type: "date",
              name: "DsNames"
            },
            {
              label: "业务日期",
              type: "date",
              name: "YwDate"
            },
            {
              label: "电商管理费",
              type: "date",
              name: "DSManageFee"
            },
            {
              label: "收取客户金额",
              type: "date",
              name: "DSAmount"
            },
            {
              label: "扣除管理费后电商收入",
              type: "date",
              name: "DSInAmount"
            },
            {
              label: "经办人",
              type: "date",
              name: "UserName"
            },
            {
              label: "经办部门",
              type: "date",
              name: "DeptName"
            },
            {
              label: "经办日期",
              type: "date",
              name: "JbDate"
            },
            {
              label: "审批模式",
              type: "date",
              name: "ApproveType"
            },
            {
              label: "所属项目名称",
              type: "date",
              name: "ProjName"
            },
            {
              label: "所属公司名称",
              type: "date",
              name: "BUName"
            },
            {
              label: "公司编码",
              type: "date",
              name: "BUCODE"
            }
          ]
        },
        {
          title: "录入单明细",
          mode: "vertical",
          dataName: ["OtherFeeDtl"],
          inputList: [
            {
              label: "录入单审核状态",
              type: "date",
              name: "ApproveState"
            },
            {
              label: "录入单审核人",
              type: "date",
              name: "ApproveByName"
            },
            {
              label: "录入单审核日期",
              type: "date",
              name: "ApproveDate"
            },

            {
              label: "录入单所属月份",
              type: "date",
              name: "strMonth"
            },
            {
              label: "录入单电商名称",
              type: "date",
              name: "DSName"
            },
            {
              label: "录入单房间号",
              type: "date",
              name: "RoomInfo"
            },
            {
              label: "录入单电商金额",
              type: "date",
              name: "DSAmount"
            },
            {
              label: "录入单电商收入",
              type: "date",
              name: "DSInAmount"
            },
            {
              label: "录入单电商管理费",
              type: "date",
              name: "DSManageFee"
            },
            {
              label: "录入单经办人",
              type: "date",
              name: "JbrByName"
            },
            {
              label: "录入单经办日期",
              type: "date",
              name: "JbDate"
            },
            {
              label: "录入单审批状态",
              type: "date",
              name: "SpState"
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
        this.TITLE = "【表外费用录入审批发起页面】";
        this.value.IsPartnerProj = json.IsPartnerProj;
        this.value.ProjName = json.ProjName;
        this.value.BUName = json.BUName;
        this.value.BUCODE = json.BUCODE;
        this.value.JbDate = json.JbDate;
        this.value.UserName = json.UserName;
        this.value.DeptName = json.DeptName;
        this.value.YwDate = json.YwDate;
        this.value.DSAmount = json.DSAmount;
        this.value.DsNames = json.DsNames;
        this.value.DSInAmount = json.DSInAmount;
        this.value.ApproveType = json.ApproveType;
        this.value.DSManageFee = json.DSManageFee;
        if (json.OtherFeeDtl) {
          if (
            Object.prototype.toString.call(json.OtherFeeDtl.Item) ==
            "[object Array]"
          ) {
            json.OtherFeeDtl.Item.forEach(item => {
              this.value.OtherFeeDtl.push({
                ApproveByName: item.ApproveByName,
                ApproveDate: item.ApproveDate,
                ApproveState: item.ApproveState,
                DSAmount: item.DSAmount,
                DSInAmount: item.DSInAmount,
                DSManageFee: item.DSManageFee,
                DSName: item.DSName,
                JbDate: item.JbDate,
                JbrByName: item.JbrByName,
                OtherCostFeeGUID: item.OtherCostFeeGUID,
                RoomInfo: item.RoomInfo,
                SpState: item.SpState,
                strMonth: item.strMonth
              });
            });
          } else {
            this.value.OtherFeeDtl = [json.OtherFeeDtl.Item];
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
        console.log(this.$refs.costEntering.offsetHeight);
        window.cifioa.sendMessage({
          type: "height",
          height: this.$refs.costEntering.offsetHeight
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
        console.log(this.$refs.costEntering.offsetHeight);
        window.cifioa.sendMessage({
          type: "height",
          height: this.$refs.costEntering.offsetHeight
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
<style lang="less">
.costEntering {
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
