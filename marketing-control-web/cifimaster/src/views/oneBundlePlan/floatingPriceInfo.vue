<template>
  <div ref="DingTiaoJiaSP" :class="{'fontColorGreen':typeColor(),'fontColorRed':!typeColor()}">
    <codeAndName :codeAndName="codeAndName" />
    <process-form
      @updated="changeHeight"
      :default-open-tree="list.map((item,i)=>i)"
      :formlist="list"
      :labelwidth="'120px'"
      :label-position="'left'"
      :value.sync="value"
      :readonly="true"
    ></process-form>
    <div class="buttonBox" v-if="buttonflag">
      <el-button type="primary" v-if="isShowDiscard" @click="discard">废弃</el-button>
      <el-button type="primary" @click="preview">查看审批</el-button>
    </div>
  </div>
</template>
<script>
//window.onresize=()=>{location.reload()}
let width = document.body.offsetWidth;
// function validForm() {
//   var status = v_view.marketPlan.status;
//   let url =
//     "http://sales-test.cifi.com.cn:9020/service/Mysoft.Fygl.Services.BPMWorkflowServices.BPMWorkflow/SendApproveCheck.aspx";
//是否有采购事项被关联
//  var isHasUserd = v_view.marketPlan.isHasUserd;
//  if(status != null && status==2 && isHasUserd){
//   var params = {type: 'validForm', state:false};//state：true或false
//   window.cifioa.sendMessage(params);
//   alert("已有采购事项被关联");
//   return false;
//  }else{
//   var params = {type: 'validForm', state:true};//state：true或false
//   window.cifioa.sendMessage(params);
//   return true;
//  }
// }
import { sendJSON, get } from "@/api/request.js";
import { PJZ, toHistoryUrl, queryFlowId } from "@/api/offerFlow.js";
import $ from "jquery";
const toStr = Object.prototype.toString;
export default {
  components: {
    codeAndName: () => import("@/views/offerFlow/component/codeAndName"),
    processForm: () => import("@/views/component/formV2.vue")
  },
  data() {
    let _self = this;
    let isMobile = width <= 1024;
    let numbers = isMobile ? 1 : 3;
    let DingTiaoJiaRes = isMobile
      ? [
          {
            mode: "custom",
            component: "floatingPriceChange",
            level: 2.2,
            numbers: 1,
            pricingType: "1"
          }
        ]
      : [
          {
            label: "价格调整对象",
            type: "text",
            name: "priceAdObject",
            level: 2.2,
            pricingType: "1"
          },
          {
            label: "调整货量(㎡)",
            type: "text",
            name: "priceAdCargo",
            level: 2.2,
            pricingType: "1"
          },
          {
            label:
              _self.pricingType == "定调价"
                ? "当前均价（元/㎡）"
                : "楼栋均价（元/㎡）",
            type: "text",
            name: "priceAdAvg",
            level: 2.2,
            width: 100,
            pricingType: "1"
          },
          {
            label: "申请均价(元/㎡)",
            type: "text",
            name: "priceAdsqAvg",
            level: 2.2,
            width: 100,
            pricingType: "1"
          },
          {
            label: "调整前货值(万元)",
            type: "text",
            name: "priceAdbeforeCargo",
            level: 2.2,
            pricingType: "1"
          },
          {
            label: "调整后货值(万元)",
            type: "text",
            name: "priceAdafterCargo",
            level: 2.2,
            pricingType: "1"
          },
          {
            label: "货值差异(万元)",
            type: "computed",
            name: "priceAdDiff",
            level: 2.2,
            computed(params) {
              let { value } = params;
              return (
                value.priceAdafterCargo - value.priceAdbeforeCargo
              ).toFixed(2);
            },
            pricingType: "1"
          }
        ];
    return {
      codeAndName: [],
      buttonflag: false,
      isShowDiscard: true,
      isMobile: width <= 1024,
      labelPosition: width <= 1024 ? "top" : "right",
      value: {},
      pricingType: "",
      flow_id: "",
      width: width + "px",
      userID: localStorage.getItem("username"),
      btns: [
        {
          name: "test",
          callback(v, l) {
            console.log(v);
          }
        }
      ],
      list: [
        {
          title: "审批信息",
          mode: "vertical",
          subtitle: [
            false,
            "一、货值、利润率对标",
            false,
            "二、经营数据变化",
            "三、价格对比",
            false,
            "四、定调价结果",
            "五、规划货值压力测算",
            "六、项目情况",
            "七、当前销售背景简述",
            "八、价格调整策略简述"
            // "八、经营测算"
          ],
          //PriceInfoDetails价格提示---pricingResult定调价结果--PayFormInfoDetails付款方式--PriceDiscountInfo折扣方案
          //PriceDetail一房一价表
          dataName: [
            "pricingResult",
            "PriceInfoDetails",
            "PriceDiscountInfo",
            "PayFormInfoDetails",
            "PriceDetail"
          ],
          numbers: numbers,
          inputList: [
            // {
            //   label: "定价/调价类型",
            //   level: 0,
            //   name: "pricingType",
            //   type: "select",
            //   mode: "transverse",
            //   labelWidth: "110px",
            //   options: [
            //     { value: 0, label: "该业态的定价低于战规定价" },
            //     { value: 1, label: "该业态的定价高于战规定价" },
            //     { value: 2, label: "价格下调(下调后整盘低于战规均价)" },
            //     { value: 3, label: "价格下调(下调后整盘高于战规均价)" },
            //     { value: 4, label: "价格上调" }
            //   ],
            // },
            {
              label: "定调价审批类型",
              level: 0,
              name: "pricingTypeCode",
              type: "info",
              labelWidth: "110px",
              mode: "transverse",
              options: [
                { value: 0, label: "该业态的定价低于战规定价" },
                { value: 1, label: "该业态的定价高于战规定价" },
                { value: 2, label: "价格下调(下调后整盘低于战规均价)" },
                { value: 3, label: "价格下调(下调后整盘高于战规均价)" },
                { value: 4, label: "价格上调" }
              ],
              pricingType: "1"
            },
            {
              label: "预计推盘日期",
              type: "info",
              name: "anticipatedDate",
              level: 0,
              mode: "transverse",
              labelWidth: "110px",
              placeholder: "请选择"
            },
            {
              label: "",
              type: "longTextarea",
              name: "content",
              numbers: 1,
              level: 0,
              mode: "transverse",
              pricingType: "1"
            },

            {
              mode: "custom",
              component: "management",
              level: 0.2,
              numbers: 1
            },
            {
              label: "结论",
              type: "longTextarea",
              name: "conclusion",
              numbers: 1,
              level: 0.3,
              mode: "transverse",
              placeholder: "偏差大需说明理由，同时说明清楚利润率计算口径",
              emptyNotShow: true
            },
            /* {
              mode:'custom',
              component:"floatingPriceChange",
              level:0.4
            }, */
            /* 经营数据变化*/
            {
              mode: "custom",
              component: "changeData",
              level: 0.5,
              numbers: 1
            },
            {
              level: 2,
              mode: "custom",
              component: "priceDiff",
              numbers: 1
            },
            {
              label: "结论",
              type: "longTextarea",
              name: "priceconConclusion",
              mode: "transverse",
              level: 2.1,
              numbers: 1,
              emptyNotShow: true
            },
            ...DingTiaoJiaRes,
            {
              mode: "custom",
              component: "valueStress",
              level: 2.5,
              numbers: 1
            },
            {
              mode: "custom",
              component: isMobile ? "projectStatusMoblie" : "projectStatus",
              level: 3,
              numbers: 1,
              pricingType: "1"
            },
            {
              label: "1、项目当前面临情况",
              type: "longTextarea",
              name: "thisSalesFacecase",
              mode: "transverse",
              level: 4,
              numbers: 1,
              labelWidth: "10em"
            },
            {
              label: "2、风险预估",
              mode: "transverse",
              type: "longTextarea",
              name: "thisSalesEstimate",
              level: 4,
              numbers: 1
            },
            {
              label: "其他",
              type: "longTextarea",
              mode: "transverse",
              name: "thisSalesQt",
              level: 4,
              numbers: 1,
              emptyNotShow: true
            },
            //level5
            {
              label: "1、定调价标的及去化情况简述",
              type: "longTextarea",
              name: "priceMixSelling",
              mode: "transverse",
              level: 5,
              numbers: 1,
              pricingType: "1"
            },
            {
              label: "2、定调价营销折扣释放口径",
              mode: "transverse",
              type: "longTextarea",
              name: "priceMixDis",
              level: 5,
              numbers: 1,
              pricingType: "1"
            },
            {
              label: "3、定调价策略简述",
              type: "longTextarea",
              mode: "transverse",
              name: "priceMixStrategy",
              level: 5,
              numbers: 1,
              pricingType: "1"
            },
            {
              label: "4、流量保障策略简述",
              mode: "transverse",
              type: "longTextarea",
              name: "priceMixSafeguard",
              level: 5,
              numbers: 1
            },
            {
              label: "其他",
              type: "longTextarea",
              mode: "transverse",
              name: "priceMixQt",
              level: 5,
              numbers: 1,
              emptyNotShow: true,
              pricingType: "1"
            },
            //level6
            // {
            //   label: "",
            //   mode: "transverse",
            //   type: "longTextarea",
            //   name: "overallProfitMargin",
            //   level: 6,
            //   numbers: 1
            // },
            {
              mode: "custom",
              level: 7,
              component: "foldTable",
              numbers: 1,
              comEvent() {
                _self.$nextTick(() => {
                  if (window.cifioa) {
                    window.cifioa.sendMessage({
                      type: "height",
                      height: _self.$refs.DingTiaoJiaSP.offsetHeight
                    });
                  } else {
                    console.warn("缺少cifioa插件");
                  }
                });
              },
              pricingType: "1"
            }
          ]
        },
        {
          title: "附件",
          mode: "transverse",
          numbers: 1,
          inputList: [
            {
              name: "files",
              type: "upFile",
              label: "",
              action: "aa",
              fileList: "fileList",
              btnInfo: "上传",
              labelWidth: "0px",
              width: "100%",
              click(file) {
                if (isMobile) {
                  var isTest = ["salesmgt-uat", "salesmgt-test"].some(function(
                    item
                  ) {
                    return window.location.href.indexOf(item) !== -1;
                  });
                  let wm = {
                    htmlTitle: "定调价",
                    wmContent: _self.userID || "旭辉集团",
                    wmSize: 10,
                    wmFont: "microsoft yahei",
                    wmColor: 7,
                    isDelSrc: 1
                  };
                  // let resquestUrl=isTest?`${location.origin}/dcs.web/onlinefile`:`${location.origin}/dcs.web/onlinefile`
                  let resquestUrl = `https://oadoc.cifi.com.cn/dcs.web/onlinefile`;
                  let requrl = file.url.split("?n=")[0];
                  let end = requrl.split(".")[requrl.split(".").length - 1];
                  let convertType;
                  if (end == "pdf") {
                    convertType = "20";
                  } else if (end == "tif") {
                    convertType = "17";
                  } else {
                    convertType = "0";
                  }
                  // var tempwindow=window.open('about:blank');
                  $.ajax({
                    url: resquestUrl,
                    data: {
                      ...wm,
                      downloadUrl: location.origin + requrl,
                      convertType
                    },
                    dataType: "json",
                    async: false,
                    type: "post",
                    success: function(data) {
                      if (data.result == 0) {
                        if (parent) {
                          parent.window.location.href = data.data[0];
                        } else {
                          window.location.href = data.data[0];
                        }
                      } else {
                        _self.$message.error("转换失败");
                      }
                    },
                    error: function(data) {
                      alert("报错:" + JSON.stringify(data));
                      open(file.url);
                    }
                  });
                } else {
                  let requrl = file.url.split("?")[0];
                  open(file.url);
                }
              }
            }
          ]
        }
      ]
    };
  },
  created() {
    queryFlowId({}, this.$route.query.BOID).then(res => {
      if (res.code == 200) {
         this.codeAndName=[res.data]

        if (this.$route.query.taskId) {
          this.buttonflag = true;
          if (res.data.flow_status == 7) {
            this.isShowDiscard = false;
          }
          this.flow_id = res.data.flow_id;
        }
      }
    });
    if (
      this.$route.query.action === "modify" &&
      localStorage.getItem("username")
    ) {
      this.$router.push({
        path: "/floatingPriceMy",
        query: {
          LoginKey: "action=modify",
          BOID: this.$route.query.BOID,
          UserID: localStorage.getItem("username")
        }
      });
    }
    if (width > 1024) {
      this.list.unshift({
        title: "基础信息",
        mode: "transverse",
        numbers: 3,
        inputList: [
          {
            label: "项目名称",
            type: "input",
            name: "projectName",
            numbers: 1
          },
          {
            label: "申请人",
            type: "input",
            name: "applicantName"
          },
          {
            label: "申请人部门",
            type: "input",
            name: "departmentName"
          },
          {
            label: "申请日期",
            type: "date",
            name: "applicantTime"
          }
        ]
      });
    }
    sendJSON("/pricing/getApplyData", {
      BSID: "My_Sales",
      BTID: "My_Sales_PayFormChange",
      BOID: this.$route.query.BOID,
      UserID: this.$route.query.UserID,
      LoginKey: this.$route.query.LoginKey
    }).then(res => {
      if (res.result.code == 200) {
        let data = { ...res.result.data };
        if (this.$route.query.action === "modify") {
          this.$router.push({
            path: "/floatingPriceMy",
            query: {
              LoginKey: "action=modify",
              BOID: this.$route.query.BOID,
              UserID: data.username || localStorage.getItem("username")
            }
          });
        }
        const convert = key => {
          if (data[key]) {
            data[key] =
              toStr.call(data[key]) === "[object Array]"
                ? data[key]
                : [data[key]];
          }
        };
        [
          "PayFormInfoDetails",
          "PriceDetail",
          "PriceDiscountInfo",
          "PriceInfoDetails",
          "pricingResult"
        ].forEach(item => convert(item));
        this.value = data;
        this.pricingType = res.result.data.TjPlanType;
        console.log(this.value, "list");

        if (this.pricingType != "定调价") {
          if (this.isMobile) {
            this.list[0].subtitle = [
              false,

              "一、定调价结果",

              "二、项目情况",
              // "三、当前销售背景简述",
              "三、价格调整策略简述"
            ];
            this.list[0].dataName = [
              "pricingResult",
              "PriceInfoDetails",
              "PriceDiscountInfo",
              "PayFormInfoDetails",
              "PriceDetail"
            ];
            this.list[0].inputList = this.list[0].inputList.filter(
              item => item.pricingType == "1" && item.level != 2.2
            );

            let temparr = [
              {
                label: "价格调整对象",
                type: "info",
                name: "priceAdObject",
                level: 2.2,
                pricingType: "1"
              },
              {
                label: "调整货量（㎡）",
                type: "info",
                name: "priceAdCargo",
                level: 2.2,
                pricingType: "1"
              },
              {
                label: "当前底均价（元/㎡）",
                type: "info",
                name: "CurrentBottomAveragePrice",
                level: 2.2,
                pricingType: "1"
              },
              {
                label: "当前表均价（元/㎡）",
                type: "info",
                name: "CurrentTableAveragePrice",
                level: 2.2,
                pricingType: "1"
              },
              {
                label: "申请表均价（元/㎡）",
                type: "info",
                name: "ApplyTableAveragePrice",
                level: 2.2,
                pricingType: "1"
              },
              {
                label: "调整前底表价关系",
                type: "info",
                name: "AdjustBeforeRelation",
                level: 2.2,
                pricingType: "1"
              },
              {
                label: "调整后底表价关系",
                type: "info",
                name: "AdjustAfterRelation",
                level: 2.2,
                pricingType: "1"
              },
              {
                label: "表均价差异（元/㎡）",
                // type: "computed",
                type: "info",
                name: "TableAveragePriceDifference",
                level: 2.2,
                // computed(params) {
                //   let { value } = params;
                //   if (
                //     (value.priceAdafterCargo - value.priceAdbeforeCargo).toFixed(
                //       2
                //     ) == "NaN"
                //   ) {
                //     return 0.0;
                //   } else {
                //     return (
                //       value.priceAdafterCargo - value.priceAdbeforeCargo
                //     ).toFixed(2);
                //   }
                // },
                pricingType: "1"
              }
            ];
            this.list[0].inputList.unshift(...temparr);
            console.log(this.list[0], "1123123213123");
          } else {
            this.list[1].subtitle = [
              false,
              "一、定调价结果",
              "二、项目情况",
              // "三、当前销售背景简述",
              "三、价格调整策略简述"
            ];
            this.list[1].dataName = [
              "pricingResult",
              "PriceInfoDetails",
              "PriceDiscountInfo",
              "PayFormInfoDetails",
              "PriceDetail"
            ];
            this.list[1].inputList = this.list[1].inputList.filter(
              item => item.pricingType == "1" && item.level != 2.2
            );

            let temparr = [
              {
                label: "价格调整对象",
                type: "info",
                name: "priceAdObject",
                level: 2.2,
                pricingType: "1"
              },
              {
                label: "调整货量（㎡）",
                type: "info",
                name: "priceAdCargo",
                level: 2.2,
                pricingType: "1"
              },
              {
                label: "当前底均价（元/㎡）",
                type: "info",
                name: "CurrentBottomAveragePrice",
                level: 2.2,
                pricingType: "1"
              },
              {
                label: "当前表均价（元/㎡）",
                type: "info",
                name: "CurrentTableAveragePrice",
                level: 2.2,
                pricingType: "1"
              },
              {
                label: "申请表均价（元/㎡）",
                type: "info",
                name: "ApplyTableAveragePrice",
                level: 2.2,
                pricingType: "1"
              },
              {
                label: "调整前底表价关系",
                type: "info",
                name: "AdjustBeforeRelation",
                level: 2.2,
                pricingType: "1"
              },
              {
                label: "调整后底表价关系",
                type: "info",
                name: "AdjustAfterRelation",
                level: 2.2,
                pricingType: "1"
              },
              {
                label: "表均价差异（元/㎡）",
                // type: "computed",
                type: "info",
                name: "TableAveragePriceDifference",
                level: 2.2,
                // computed(params) {
                //   let { value } = params;
                //   if (
                //     (value.priceAdafterCargo - value.priceAdbeforeCargo).toFixed(
                //       2
                //     ) == "NaN"
                //   ) {
                //     return 0.0;
                //   } else {
                //     return (
                //       value.priceAdafterCargo - value.priceAdbeforeCargo
                //     ).toFixed(2);
                //   }
                // },
                pricingType: "1"
              }
            ];
            this.list[1].inputList.unshift(...temparr);
            console.log(this.list[0], "1123123213123");
          }
        }
        this.value.pricingTypeCode = this.pricingType;
      } else {
        this.$message.error(res.result.messages || "请求失败，请联系管理员");
      }

      console.log(this.list[1], "this.list[1].inputList");
    });
  },
  updated() {
    this.$nextTick(() => {
      if (window.cifioa) {
        window.cifioa.sendMessage({
          type: "height",
          height: this.$refs.DingTiaoJiaSP.offsetHeight
        });
      } else {
        console.warn("缺少cifioa插件");
      }
    });
  },

  methods: {
    discard() {
      get(`/WorkflowChoose/end?instanceId=${this.flow_id}`).then(res => {
        console.log(res);
        if (res.code == 200) {
          this.isShowDiscard = false;
          this.$message.error(res.messages);
        }
      });
    },
    preview() {
      toHistoryUrl({
        proInstId: this.flow_id
      }).then(res => {
        console.log(res);
        location.href = res.data;
      });
    },
    typeColor() {
      return (
        this.value.pricingTypeCode &&
        this.value.pricingTypeCode.indexOf("低于") == -1
      );
    },
    changeHeight() {
      this.timer && clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.$nextTick(() => {
          if (window.cifioa) {
            window.cifioa.sendMessage({
              type: "height",
              height: this.$refs.DingTiaoJiaSP.offsetHeight
            });
          } else {
            console.warn("缺少cifioa插件");
          }
        });
      }, 210);
    }
  }
};
</script>

<style lang="less">
// #vue-watermark-directive{
//   display: none!important;
// }
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
.form-list {
  padding-bottom: 60px !important;
}
</style>
<style lang="scss">
$fontSize: 13px;
.fullWidth {
  width: 100%;
  overflow: auto;
}
.parojectStatus.table {
  min-width: 900px;
  text-align: center;
}
.title {
  font-size: 18px;
  margin-bottom: 10px;
}
.lamp {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  display: inline-block;
  vertical-align: middle;
  margin-bottom: 3px;
}
// .fontColorGreen {
//   .el-collapse-item:nth-child(2) {
//     .topMar.el-row > .el-row:nth-child(1) > .el-col:nth-child(2) .y_input span {
//       // color: green;
//     }
//   }
// }
.fontColorRed {
  .el-collapse-item:nth-child(2) {
    .topMar.el-row > .el-row:nth-child(1) > .el-col:nth-child(2) .y_input span {
      color: red;
    }
  }
}
.green {
  background-color: #00ff00;
  border: 1px solid #00bb00;
}
.red {
  background-color: red;
  border: 1px solid #bb0000;
}
.y_input {
  span {
    font-size: $fontSize;
  }
}
.cir {
  display: inline-block;
  width: 15px;
  height: 15px;
  border: 2px #2661ff solid;
  border-radius: 50%;
  vertical-align: middle;
}

@media (min-width: 769px) {
  .el-form > .el-collapse {
    & > .el-collapse-item:first-child > div[role="tab"] {
      display: none;
    }
    & > .el-collapse-item:nth-child(2) > div[role="tab"] {
      display: none;
    }
  }
}
@media (max-width: 1024px) {
  .el-form > .el-collapse {
    & > .el-collapse-item:first-child > div[role="tab"] {
      display: none;
    }
  }
  .el-collapse-item:first-child .el-collapse-item__wrap {
    .el-collapse-item__content > .el-row:first-child > .el-row:nth-child(4) {
      margin-top: 10px;
    }
  }
  // .fontColorGreen {
  //   .el-collapse-item:nth-child(1) {
  //     .topMar.el-row:first-child
  //       > .el-row:nth-child(2)
  //       > .el-col:nth-child(1)
  //       .y_input
  //       span {
  //       // color: green;
  //     }
  //   }
  // }
  .fontColorRed {
    .el-collapse-item:nth-child(1) {
      .topMar.el-row:first-child
        > .el-row:nth-child(2)
        > .el-col:nth-child(1)
        .y_input
        span {
        color: red;
      }
    }
  }
  .form-container .form_item {
    box-shadow: 0 0 5px #e0e0e0;
  }
  strong {
    font-weight: 400 !important;
    font-size: 13px !important;
  }
  .el-form-item__label,
  strong {
    color: #303133 !important;
    font-size: $fontSize;
  }
  .parojectStatus.table tbody td {
    padding: 0 !important;
  }
  td,
  th {
    font-size: 12px;
  }
  .el-collapse-item__content {
    font-size: $fontSize;
  }
}
</style>
