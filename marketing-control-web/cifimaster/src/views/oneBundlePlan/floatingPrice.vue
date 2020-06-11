<template>
  <div ref="DingTiaoJia" class="DingTiaoJia">
    <process-form
      :title.sync="title"
      @updated="changeHeight"
      :default-open-tree="list.map((item,i)=>i)"
      :formlist="list"
      :value.sync="value"
      :btns="btns"
    ></process-form>
  </div>
</template>
<script>
import {
  sendJSON,
  sendJSONAllPath,
  get,
  getAllStatistics
} from "@/api/request.js";
import { number, decimal } from "@/utils/filter.js";
const toStr = Object.prototype.toString;
const validateDecimal = () => {
  let timer = null;
  return (item, value) => {
    timer && clearTimeout(timer);
    timer = setTimeout(() => {
      value[item.name] = decimal(value[item.name]);
    }, 1000);
  };
};
const blurEvent = (item, value) => {
  value[item.name] = value[item.name].toFixed(2);
};
const inputEvent = validateDecimal();
export default {
  components: {
    processForm:()=>import("@/views/component/formV2.vue")
  },
  created() {
    if (
      localStorage.getItem("expiration") &&
      new Date().getTime() > localStorage.getItem("expiration")
    ) {
      //跳单点
      window.localStorage.removeItem("token");
    }

    sendJSON("/pricing/getApplyData", {
      BSID: "My_Sales",
      BTID: "My_Sales_PayFormChange",
      BOID: this.$route.query.BOID,
      UserID: "yangyz01",
      LoginKey: "78de2530d0bb5d75483ca15da921a5d9"
    }).then(res => {
      if (res.result.code == 200) {
        let data = res.result.data;
        const convert = key => {
          if (data[key])
            data[key] =
              toStr.call(data[key]) === "[object Array]"
                ? data[key]
                : [data[key]];
        };
        [
          "PayFormInfoDetails",
          "PriceDetail",
          "PriceDiscountInfo",
          "PriceInfoDetails"
        ].forEach(item => convert(item));
        this.pricingType = res.result.data.TjPlanType;
        //项目主题默认值
        data.examineTitle =
          data.examineTitle || `【营销${this.pricingType}】` + data.projectName;
        this.title = `【营销${this.pricingType}】`;
        this.value = Object.assign({}, this.value, data);
        // if (!this.value.deviationExplain) {
        //   this.value.deviationExplain = {
        //     deviation_reason: "",
        //     sales_target: "",
        //     follow_up_action: ""
        //   };
        // }
        if (this.pricingType != "定调价") {
          this.list[1].subtitle = [
            false,
            "一、定调价结果",
            "二、项目情况",
            // "三、当前销售背景简述",
            "三、价格调整策略简述",
            "四、价格提示",
            "五、折扣方案",
            "六、付款方式",
            "七、一房一价表"
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
          console.log(this.list[1], "this.list[1]this.list[1]");

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
        }

        let load = this.$loading({
          // 声明一个loading对象
          lock: true, // 是否锁屏
          text: "正在加载...", // 加载动画的文字
          spinner: "el-icon-loading", // 引入的loading图标
          background: "rgba(0, 0, 0, 0.5)", // 背景颜色
          body: false,
          customClass: "mask" // 遮罩层新增类名
        });
        getAllStatistics({
          TjPlanGUID: this.$route.query.BOID,
          projectId: res.result.data.project_id,
          isPricing: this.pricingType == "定调价" ? "0" : "1"
        }).then(res => {
          if (res.code == 0 || res.code == 200) {
            if (res.data) {
              let data = res.data;
              let checkObj=Object.assign({},res.data,res.data.businessIndicatorsValue)
              checkObj=JSON.parse(JSON.stringify(checkObj))
              if (
                data.priceAdjustmentResult &&
                data.priceAdjustmentResult.length > 0
              ) {
                data.pricingResult = data.priceAdjustmentResult;
              }
              if (
                data.pressureMeasurement &&
                data.pressureMeasurement.length > 0
              ) {
                data.pressureCompute = data.pressureMeasurement;
              }
              if (
                data.priceComparisonData &&
                data.priceComparisonData.length > 0
              ) {
                data.priceComparison = Object.assign(
                  [],
                  data.priceComparison,
                  data.priceComparisonData
                );
              }
              if (data.businessIndicatorsValue) {
                for (let key in data.businessIndicatorsValue) {
                  if (
                    data.businessIndicatorsValue[key] ||
                    data.businessIndicatorsValue[key] === 0
                  ) {
                    this.value[key] = data.businessIndicatorsValue[key];
                  }
                }
              }
              this.value = Object.assign({}, this.value, data,{checkObj});
                console.log(this.value, "value123123123");

              this.value.pricingTypeCode = this.pricingType;
            }
          }
          load.close();
        });
      } else
        this.$message.error(res.result.messages || "请求失败，请联系管理员");
    });
  },
  updated() {
  },
  data() {
    let _self = this;
    let username = this.$route.query.UserID || localStorage.getItem("username");
    return {
      timer: null,
      title: "",
      value: {
        tzhIrr: "",
        tzhJths: "",
        tzhProfit: "",
        tzbJths: "",
        zgbProfit: "",
        zgbIrr: "",
        zgbJths: "",
        dtbProfit: "",
        dtbIrr: "",
        dtbJths: "",
        tzbIrr: "",
        tzbProfit: "",
        surplusProfitMargin: "",
        surplusProfitPrice: "",
        surplusValue: "",
        addSignProfitMargin: "",
        addSignProfitPrice: "",
        addSignValue: "",
        theprojectedProfitMargin: "",
        theprojectedProfitPrice: "",
        theprojectedValue: "",
        thisPricingProfitMargin: "",
        thisPricingProfitPrice: "",
        thisPricingValue: "",
        dpcZgbValue: "",
        actProfitMargin: "",
        actProfitPrice: "",
        actValue: "",
        quietProfitMargin: "",
        quietProfitPrice: "",
        quietValue: "",
        dpcZgbValue: "",
        priceComparison: [],
        pricingTypeCode: "",
        anticipatedDate: "",
        content: "",
        conclusion: "",
        priceconConclusion: "",
        thisSalesFacecase: "",
        thisSalesEstimate: "",
        thisSalesQt: "",
        priceMixSelling: "",
        priceMixDis: "",
        priceMixStrategy: "",
        priceMixSafeguard: "",
        priceMixQt: "",
        overallProfitMargin: "",
        pricingResult: [],
        PriceInfoDetails: [],
        PriceDiscountInfo: [],
        PayFormInfoDetails: [],
        PriceDetail: []
      },
      btns: [
        {
          name: "提交审核",
          callback(v, l) {
            console.log(JSON.parse(JSON.stringify(v)));
            let excessList;
            let noTestName;
            console.log(l);
            console.log(this.pricingType);

            if (this.pricingType == "定调价") {
              /* 额外的校检列表*/
              excessList = [
                { title: "整盘(战规版)货值", name: "quietValue" },
                { title: "整盘(战规版)利润额", name: "quietProfitPrice" },
                { title: "整盘(战规版)利润率", name: "quietProfitMargin" },
                { title: "整盘定价前(动态版)货值", name: "actValue" },
                { title: "整盘定价前(动态版)利润额", name: "actProfitPrice" },
                { title: "整盘定价前(动态版)利润率", name: "actProfitMargin" },
                { title: "单批次(战规版)货值", name: "dpcZgbValue" },
                { title: "当批次定调价货值", name: "thisPricingValue" },
                {
                  title: "当批次定调价创造利润额",
                  name: "thisPricingProfitPrice"
                },
                {
                  title: "当批次定调价创造利润率",
                  name: "thisPricingProfitMargin"
                },
                { title: "整盘预计实现货值", name: "theprojectedValue" },
                {
                  title: "整盘预计实现创造利润额",
                  name: "theprojectedProfitPrice"
                },
                {
                  title: "整盘预计实现创造利润率",
                  name: "theprojectedProfitMargin"
                },
                { title: "累计已签约部分货值", name: "addSignValue" },
                {
                  title: "累计已签约部分创造利润额",
                  name: "addSignProfitPrice"
                },
                {
                  title: "累计已签约部分创造利润率",
                  name: "addSignProfitMargin"
                },
                { title: "项目剩余货值部分货值", name: "surplusValue" },
                {
                  title: "项目剩余货值部分创造利润额",
                  name: "surplusProfitPrice"
                },
                {
                  title: "项目剩余货值部分创造利润率",
                  name: "surplusProfitMargin"
                },
                { title: "投资版净利润率", name: "tzbProfit" },
                { title: "投资版IRR", name: "tzbIrr" },
                { title: "投资版静态回收周期", name: "tzbJths" },
                { title: "战规版净利润率", name: "zgbProfit" },
                { title: "战规版IRR", name: "zgbIrr" },
                { title: "战规版静态回收周期", name: "zgbJths" },
                { title: "动态版净利润率", name: "dtbProfit" },
                { title: "动态版IRR", name: "dtbIrr" },
                { title: "动态版静态回收周期", name: "dtbJths" },
                { title: "调整后预计净利润率", name: "tzhProfit" },
                { title: "调整后预计IRR", name: "tzhIrr" },
                { title: "调整后预计静态回收周期", name: "tzhJths" }
              ];

            } else {

              excessList = [];
            }
              noTestName = [
                "cityLevel",
                "projectScale",
                "cityPeriod",
                "plateStock",
                "platePeriod",
                "soldNum",
                "soldPer",
                "islimitPrice",
                "islimitExplain",
                "ismerge",
                "marketingExplain",
                "stockPer",
                "stockPartner",
                "stockIdea",
                "stockIdea",
                "PriceDiscountInfo",
                "PayFormInfoDetails",
                "PriceDetail",
                "PriceInfoDetails",
                'pricingResult'
              ];
            // [{name:'priceComparison',title:"价格对比"}]
            v.validate(l, [{}], noTestName, excessList)
              .then(() => {
                _paq.push(["trackEvent", "点击", "提交审核", `定调价提交审核`]);
                // _paq.push(['trackEvent', '点击', '提交审核', `定调价提交审核,工作流接口参数：BSID=My_Sales&BTID=My_Sales_PriceZD2&BOID=${this.$route.query.BOID}&UserID=${this.$route.query.UserID}&LoginKey=${this.$route.query.LoginKey}`]);
                console.log("验证成功");
                v.toChar();
                // let flag=false
                // v.pricingResult.forEach((item,index)=>{
                //   if( item.priceAdAvg=== ""&&
                //       item.priceAdCargo=== ""&&
                //       item.priceAdDiff=== ""&&
                //       item.priceAdObject=== ""&&
                //       item.priceAdafterCargo=== ""&&
                //       item.priceAdbeforeCargo=== ""&&
                //       item.priceAdsqAvg=== ""){
                //         this.$message.error("定调价结果中第"+(index+1)+"条数据为空,请删除后重新暂存")
                //         flag=true
                //   }
                // })
                // if(flag)return
                sendJSON("/pricing/pricingAuthorizedStrength", {
                  ...v,
                  username,
                  json_id:
                    this.$route.query.BOID ||
                    "dfce9a5a-22fd-e911-80bb-005056a37add"
                }).then(res => {
                  if (res.result.code == 200) {
                    get(
                      `/Workflow/MTStart2.aspx?BSID=My_Sales&BTID=My_Sales_PriceZD2&BOID=${this.$route.query.BOID}&UserID=${username}&LoginKey=${this.$route.query.LoginKey}`
                    ).then(res => {
                      if (res.code == 200 || res.result.code == 200) {
                        window.top.location.href = res.data || res.result.data;
                      } else {
                        this.$message.error(
                          res.messages || res.result.messages
                        );
                      }
                    });
                  }
                });
              })
              .catch(e => {
                //console.log(e);
                _self.$message.error(e);
              });
          }
        },
        {
          name: "暂存",
          callback(v, l) {
            console.log(v);
            v.toChar();
            _paq.push(["trackEvent", "点击", "暂存", "定调价数据暂存"]);
            // console.log(v,"vvvv");
            let flag = false;
            v.pricingResult.forEach((item, index) => {
              if (
                item.priceAdAvg === "" &&
                item.priceAdCargo === "" &&
                item.priceAdDiff === "" &&
                item.priceAdObject === "" &&
                item.priceAdafterCargo === "" &&
                item.priceAdbeforeCargo === "" &&
                item.priceAdsqAvg === ""
              ) {
                this.$message.error(
                  "定调价结果中第" +
                    (index + 1) +
                    "条数据为空,请正确填写或删除后重新暂存"
                );
                flag = true;
              }
            });
            if (flag) return;
            sendJSON("/pricing/pricingAuthorizedStrength", {
              ...v,
              isTS: 1,
              username,
              json_id: this.$route.query.BOID
            }).then(res => {
              if (res.result.code == 200) {
                this.$message.success("暂存成功");
              } else {
                this.$message.error(
                  res.result.messages || res.messages || "暂存失败"
                );
              }
            });
          }
        }
      ],
      list: [
        {
          title: "基础信息",
          mode: "transverse",
          numbers: 3,
          inputList: [
            {
              label: "流程主题",
              type: "input",
              name: "examineTitle",
              numbers: 1,
              width: "300px"
            },
            {
              label: "申请人",
              type: "input",
              name: "applicantName",
              disable: true
            },
            {
              label: "申请人部门",
              type: "input",
              disable: true,
              name: "departmentName"
            },
            {
              label: "申请日期",
              type: "date",
              name: "applicantTime",
              disable: true
            },
            {
              label: "项目名称",
              type: "input",
              name: "projectName",
              numbers: 1,
              disable: true
            }
          ]
        },
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
            "八、价格调整策略简述",
            "九、价格提示",
            "十、折扣方案",
            "十一、付款方式",
            "十二、一房一价表"
          ],
          dataName: [
            "pricingResult",
            "PriceInfoDetails",
            "PriceDiscountInfo",
            "PayFormInfoDetails",
            "PriceDetail"
          ],
          btns: [
            [
              // {
              //   name: "新增",
              //   callback(keys, list) {
              //     console.log(list);
              //     list.push(keys);
              //   }
              // }
            ]
          ],
          inputList: [
            {
              label: "定调价审批类型",
              level: 0,
              name: "pricingTypeCode",
              type: "info",
              mode: "transverse",
              // options: [
              // {
              //   value: "该业态的定价低于战规定价",
              //   label: "该业态的定价低于战规定价"
              // },
              // {
              //   value: "该业态的定价高于战规定价",
              //   label: "该业态的定价高于战规定价"
              // },
              // {
              //   value: "价格下调(下调后整盘低于战规均价)",
              //   label: "价格下调(下调后整盘低于战规均价)"
              // },
              // {
              //   value: "价格下调(下调后整盘高于战规均价)",
              //   label: "价格下调(下调后整盘高于战规均价)"
              // },
              // { value: "价格上调", label: "价格上调" },
              //   { value: "定调价", label: "定调价" },
              //   { value: "价格上调", label: "价格上调" },
              // ],
              numbers: 2,
              pricingType: "1"
            },
            {
              label: "预计开盘日期",
              type: "date",
              name: "anticipatedDate",
              numbers: 2,
              level: 0,
              mode: "transverse",
              placeholder: "请选择"
            },
            {
              label: "申请正文",
              type: "longTextarea",
              name: "content",
              numbers: 1,
              level: 0,
              mode: "transverse",
              pricingType: "1"
            },
            //货值，利用率对标
            {
              mode: "custom",
              component: "management",
              level: 0.2
            },
            {
              label: "结论",
              type: "longTextarea",
              name: "conclusion",
              numbers: 1,
              level: 0.3,
              mode: "transverse",
              noTest: true,
              placeholder: "偏差大需说明理由，同时说明清楚利润率计算口径"
            },
            /* 经营数据变化*/
            {
              mode: "custom",
              component: "changeData",
              level: 0.5
            },
            // 价格对比
            {
              level: 2,
              mode: "custom",
              component: "priceDiff",
              dataKey: "priceComparison",
              attributes: [
                { name: "priceVersion" },
                { name: "commercial" },
                { name: "price" },
                { name: "targetTraffic" },
                { name: "zgzpAvgPrice" },
                { name: "zgzpTraffic" },
                { name: "zgzpPriceFd" },
                { name: "zgzpTrafficDiff" },
                { name: "tytthreeAvgprice" }
              ]
            },
            {
              label: "结论",
              type: "longTextarea",
              name: "priceconConclusion",
              mode: "transverse",
              level: 2.1,
              numbers: 1,
              noTest: true
            },
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
              label: "当前均价（元/㎡）",
              type: "info",
              name: "priceAdAvg",
              level: 2.2,

              pricingType: "1"
            },
            {
              label: "申请均价（元/㎡）",
              type: "info",
              name: "priceAdsqAvg",
              level: 2.2,

              pricingType: "1"
            },
            {
              label: "调整前货值（万元）",
              type: "info",
              name: "priceAdbeforeCargo",
              level: 2.2,
              inputEvent,

              pricingType: "1"
            },
            {
              label: "调整后货值（万元）",
              type: "info",
              name: "priceAdafterCargo",
              level: 2.2,
              pricingType: "1"
            },
            {
              label: "货值差异（万元）",
              type: "computed",
              name: "priceAdDiff",
              level: 2.2,
              computed(params) {
                let { value } = params;
                if (
                  (value.priceAdafterCargo - value.priceAdbeforeCargo).toFixed(
                    2
                  ) == "NaN"
                ) {
                  return 0.0;
                } else {
                  return (
                    value.priceAdafterCargo - value.priceAdbeforeCargo
                  ).toFixed(2);
                }
              },
              pricingType: "1"
            },
            // {
            //   label: "操作",
            //   type: "button",
            //   btns: [
            //     {
            //       name: "删除",
            //       callback(params) {
            //         let { index, data } = params;
            //         data.splice(index, 1);
            //       }
            //     }
            //   ],
            //   level: 2.2,
            //   pricingType: "1"
            // },
            {
              mode: "custom",
              component: "valueStress",
              level: 2.5
            },
            {
              mode: "custom",
              component: "projectStatus",
              level: 3,
              pricingType: "1"
            },

            {
              label: "1、项目当前面临情况",
              type: "longTextarea",
              name: "thisSalesFacecase",
              mode: "transverse",
              level: 4,
              numbers: 1,
              labelWidth: "10em",
              noTest: true,
              // pricingType: "1"
            },
            {
              label: "2、风险预估",
              mode: "transverse",
              type: "longTextarea",
              name: "thisSalesEstimate",
              level: 4,
              numbers: 1,
              noTest: true,
              // pricingType: "1"
            },
            {
              label: "其他",
              type: "longTextarea",
              mode: "transverse",
              name: "thisSalesQt",
              level: 4,
              numbers: 1,
              noTest: true,
              // pricingType: "1"
            },
            //价格调整策略简述
            {
              label: "1、定调价标的及去化情况简述",
              type: "longTextarea",
              name: "priceMixSelling",
              mode: "transverse",
              level: 5,
              numbers: 1,
              noTest: true,
              pricingType: "1"
            },
            {
              label: "2、定调价营销折扣释放口径",
              mode: "transverse",
              type: "longTextarea",
              name: "priceMixDis",
              level: 5,
              numbers: 1,
              noTest: true,
              pricingType: "1"
            },
            {
              label: "3、定调价策略简述",
              type: "longTextarea",
              mode: "transverse",
              name: "priceMixStrategy",
              level: 5,
              numbers: 1,
              noTest: true,
              pricingType: "1"
            },
            {
              label: "4、流量保障策略简述",
              mode: "transverse",
              type: "longTextarea",
              name: "priceMixSafeguard",
              level: 5,
              numbers: 1,
              noTest: true
            },
            {
              label: `其他`,
              type: "longTextarea",
              mode: "transverse",
              name: "priceMixQt",
              level: 5,
              numbers: 1,
              noTest: true,
              pricingType: "1"
            },

            //价格提示
            {
              label: "产品类型",
              type: "info",
              level: 7,
              name: "ProductType",
              pricingType: "1"
            },
            {
              label: "整盘去化率（按金额）",
              type: "info",
              level: 7,
              name: "ZpRate",
              pricingType: "1"
            },
            {
              label: "本次定价最低单价（元/㎡）",
              type: "info",
              level: 7,
              name: "MinPrice",
              pricingType: "1"
            },
            {
              label: "本次定价最高单价（元）",
              type: "info",
              level: 7,
              name: "MaxPrice",
              pricingType: "1"
            },
            {
              label: "最低总价（元/㎡）",
              type: "info",
              level: 7,
              name: "MinAmount",
              pricingType: "1"
            },
            {
              label: "最高总价（元）",
              type: "info",
              level: 7,
              name: "MaxAmount",
              pricingType: "1"
            },
            //竖向表格
            {
              label: "折扣类型",
              type: "info",
              name: "DiscountType",
              level: 8,
              pricingType: "1"
            },
            {
              label: "折扣分类",
              type: "info",
              name: "AppScenariosEnum",
              level: 8,
              pricingType: "1"
            },
            {
              label: "折扣项名称",
              type: "info",
              name: "DiscountDetailName",
              level: 8,
              pricingType: "1"
            },
            {
              label: "计算方法",
              type: "info",
              name: "CalMethodEnum",
              level: 8,
              pricingType: "1"
            },
            {
              label: "折扣(%)",
              type: "info",
              name: "DiscountVlue",
              level: 8,
              pricingType: "1"
            },
            {
              label: "折扣金额",
              type: "info",
              name: "PreferentialPrice",
              level: 8,
              pricingType: "1"
            },
            {
              label: "指定房间",
              type: "info",
              name: "RoomInfo",
              level: 8,
              pricingType: "1"
            },
            {
              label: "详细",
              type: "button",
              name: "applicantTime",
              btns: [
                {
                  name: "查看详情",
                  callback(params) {
                    window.top.open(params.value.DetailUrl);
                  },
                  classes: "detail"
                }
              ],
              level: 8,
              pricingType: "1"
            },
            //付款方式
            {
              label: "付款方式名称",
              type: "info",
              name: "PayFormName",
              level: 9,
              pricingType: "1"
            },
            {
              label: "生效日期",
              type: "info",
              name: "BgnDate",
              level: 9,
              pricingType: "1"
            },
            {
              label: "失效日期",
              type: "info",
              name: "EndDate",
              level: 9,
              pricingType: "1"
            },
            {
              label: "应用范围",
              type: "info",
              name: "Scope",
              level: 9,
              pricingType: "1"
            },
            {
              label: "贷款选项",
              type: "info",
              name: "LoanOption",
              level: 9,
              pricingType: "1"
            },
            {
              label: "详细",
              type: "button",
              name: "applicantTime",
              btns: [
                {
                  name: "查看详情",
                  callback(params) {
                    window.top.open(params.value.DetailUrl);
                  },
                  classes: "detail"
                }
              ],
              level: 9,
              pricingType: "1"
            },
            //一房一价表
            {
              label: "业态名称",
              type: "info",
              name: "BldFullName",
              level: 10,
              pricingType: "1"
            },
            {
              label: "楼栋名称",
              type: "info",
              name: "BldType",
              level: 10,
              pricingType: "1"
            },
            {
              label: "详细",
              type: "button",
              name: "applicantTime",
              btns: [
                {
                  name: "查看详情",
                  callback(params) {
                    window.top.open(params.value.DetailUrl);
                  },
                  classes: "detail"
                }
              ],
              level: 10,
              pricingType: "1"
            }
          ]
        },
        {
          title: "附件",
          mode: "transverse",
          inputList: [
            {
              name: "files",
              type: "upFile",
              label: "附件",
              action:
                process.env.VUE_APP_BASE_API + "/pricing/uploadAttachment",
              fileList: "fileList",
              btnInfo: "上传",
              numbers: 1,
              preview(file) {
                window.open(file.url);
              },
              width: "100%",
              info:
                "定价为：定价说明、楼栋系数表、一房一价表（含定价系数）、盈利分析、说明战略意图指导书</br>调价为：楼栋系数表、一房一价表（含定价系数）、盈利分析、销控表、总平图等"
            }
          ]
        }
      ]
    };
  },
  methods: {
    changeHeight() {
      this.timer && clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.$nextTick(() => {
          if (window.cifioa) {
            window.cifioa.sendMessage({
              type: "height",
              height: this.$refs.DingTiaoJia.offsetHeight
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
.DingTiaoJia {
  padding-bottom: 45px;
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
.green {
  background-color: #00ff00;
  border: 1px solid #00bb00;
}
.red {
  background-color: red;
  border: 1px solid #bb0000;
}
.mask {
  z-index: 99999;
}
</style>
