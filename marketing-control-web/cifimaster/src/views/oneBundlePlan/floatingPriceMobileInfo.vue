<template>
<div class="mobileInfo">
  <process-form title="【营销定调价】浙江区域集团杭州旭辉时代城车位定价申请" :formlist="list" :labelwidth="'120px'" :label-position="'left'" :value.sync="value" :readonly="true" ></process-form>
</div>
</template>
<script>
  window.onresize=()=>{location.reload()}
  let width=document.body.offsetWidth;
  import {sendJSON} from "@/api/request.js";
  const toStr=Object.prototype.toString;
  export default {
    components: {
      processForm:()=>import("@/views/component/formV2.vue")
    },
    created(){
      this.value={"dtbIrr":72.71,"departmentId":"ZJSYB","overallProfitMargin5":98,"PriceInfoDetails":[{"ZpRate":96.74,"MinAmount":85000,"ProductType":"车位-地下人防-毛坯-可售-常规","MaxPrice":85000,"MinPrice":85000,"MaxAmount":85000}],"surplusProfitMargin":0,"priceMixQt":"其他中有数据审批页面就显示该值，若没有就不显示","ismerge":2,"cityPeriod":12,"priceMixDis":"表价=底价+2万元 折扣：车位优惠2万元\n释放口径：不做释放，为保证尾盘滞重去化速度，预留价格空间","actProfitMargin":25.34,"id":"decbe52a-3add-410a-963b-ec6d77799113","tzbJths":18.49,"fileList":[{"name":"调用的接口整理.xlsx","id":"9e4d1caa-ab54-417a-9685-d46d2c7da572","SaveUrl":"/WorkSapce/Java/%e6%97%ad%e8%be%89%e9%9b%86%e5%9b%a2/Java/marketing-control-api/cifimaster/visolink-sales-api/target/classes/Uploads/pricing"},{"name":"旭辉售楼费用-工作流业务域模板(1).xlsx","id":"2184c577-191a-4f3c-9873-0f5044d76fb8","SaveUrl":"Uploads/pricing/2019-11-24 00:28:31旭辉售楼费用-工作流业务域模板(1).xlsx"},{"name":"index.js","id":"1d4dbca3-6655-446c-8d71-59271e637b4b","SaveUrl":"Uploads/pricing/2019-11-26 15:59:27index.js"},{"name":"index.js","id":"c5ca0e4c-7ba2-450c-90d0-953eba414682","SaveUrl":"Uploads/pricing/2019-11-26 16:10:29index.js"},{"name":"index.js","id":"fda784c2-5c40-4cac-8fe3-e8b3785fa42d","SaveUrl":"Uploads/pricing/2019-11-26 16:35:15index.js"}],"departmentName":"浙江事业部","thisPricingProfitPrice":127,"messageArray":[],"quietValue":124907,"priceconConclusion":"车位均价147857元/个VS上一版车位均价149773元/个VS车位整盘均价141303元/个","cityLevel":1,"applicantName":"杨彦召","PriceDetail":[{"BeforeDjTotalPriceAve":75000,"BeforeDjTotalPrice":1950000,"DjAdjustDiff":10000,"DjAdjustFD":0.13,"DetailUrl":"http://sales-test.cifi.com.cn:9060/PubPlatform/Nav/Login/SSO/Login.aspx?UserCode=admin&Password=4076f862096d1536b6cac6866e386685&PageUrl=http%3a%2f%2fsales-test.cifi.com.cn%3a9060%2fstd%2f00110401%2f93086aa5-05fb-11e6-828d-7427ea1e696a.aspx%3f_mp%3dblank%26mode%3d2%26auditStatusEnum%3d0%26oid%3d2f84a15a-c2fa-e911-80bb-005056a37afa%26bldGUID%3d146f5827-80a9-4d4f-b53d-c6c67bdd7379%26projGUID%3de21734f7-7b99-4f84-be58-312ce75da099%26IsFromBPM%3d1","HZSYE":260000,"TotalAdjustFD":0.13,"BldFullName":"运河悦章全期（杭州）-车位","Name":"车位-地下人防-毛坯-可售-常规","RoomCount":26,"SumArea":26,"BldType":"整栋","AfterDjTotalPriceAve":85000,"AfterDjTotalPrice":2210000}],"thisSalesQt":"其他中有数据审批页面就显示该值，若没有就不显示","dtbJths":15.02,"stockPer":100,"zgbProfit":12.13,"addSignValue":171353,"actProfitPrice":39653,"thisSalesEstimate":"（1）地面临时停车位收费低（5元/天）\n（2）车位二手市场成交价（约14-15万元）略低于待推售车位均价","pricingTypeCode":"该业态的定价低于战规均价","priceMixSelling":"车位均价147857元/个VS上一版车位均价149773元/个VS车位整盘均价141303元/个","marketingExplain":"项目已交付，处于尾盘阶段，无营销费用计划","projectName":"首创旭辉城","stockIdea":34,"projectId":"b344d9b9-0495-43f0-bde1-c83bac4faf71","tzhIrr":72.94,"priceMixStrategy":"（1）参考二手车位成交价（14-15万）\n（2）结合该批次车位所处位置及不利因素做相应价格调整","islimitExplain":"销售均价不高于20000元/㎡，且毛坯销售最高单价不高于22000元/㎡，精装标准不高于3000元/㎡，车位销售总价不高于房屋单价10.5","anticipatedDate":"2019-11-29","surplusActProfitMargin":0,"theprojectedQuietProfitMargin":13.23,"tzhJths":15.02,"thisPricingQuietProfitMargin":21.49,"actValue":171352,"zgbJths":15.99,"theprojectedProfitPrice":39781,"pricingResult":[{"priceAdCargo":28,"priceAdafterCargo":414,"priceAdsqAvg":"147857","priceAdObject":"车位","priceAdbeforeCargo":0,"priceAdDiff":414,"priceAdAvg":0}],"addSignActProfitMargin":0,"theprojectedValue":171766,"content":"尊敬的各位领导： \n       杭州旭辉时代城项目需对车位业态进行价格调整申请，(项目所属杭州城北运河新城板块，目前项目已交付)。申请具体方案如下","addSignQuietProfitMargin":13.21,"conclusion":"当批次定调价利润率高于累计已签约部分利润率及战规版整盘利润率。","tzhProfit":25.36,"dtbProfit":25.34,"overallProfitMargin":"按当批次定价拉通全盘，全盘利润率为25.36%","addSignProfitPrice":39653,"priceComparison":[{"commercial":"车位","jpjgAvgPrice":138932,"jpjgPriceTraffic":28,"priceVersion":"首开定价","jpjgPriceDiff":89,"ghbfAvgPriect":160000,"ghbfTraffic":0,"zgzpTrafficDiff":56,"zgskAvgPrice":160000,"ghbfTrafficDiff":56,"conclusion":"当批房源次定价后整盘利润率与战规版利润率几乎持平，利润额远高于战规版利润额。本批次定价利润率均远低于动态版利润率与战规版利润率，是由于实际面价减少1234㎡，导致货值减少，利润率降低。","zgzpAvgPrice":75078,"zgskPriceFd":160000,"zgskTrafficDiff":9,"price":147857,"ghbfPriceFd":56,"jpjgPriceFd":67,"zgskTraffic":0,"targetTraffic":100,"zgzpTraffic":0,"zgzpPriceFd":45}],"thisPricingProfitMargin":33.62,"theprojectedProfitMargin":25.36,"zgbIrr":65.7,"soldPer":100,"PriceDiscountInfo":[{"PreferentialPrice":10000,"DiscountDetailName":"总经理优惠","CalMethodEnum":"总价优惠","RoomInfo":"","DetailUrl":"http://sales-test.cifi.com.cn:9060/PubPlatform/Nav/Login/SSO/Login.aspx?UserCode=admin&Password=4076f862096d1536b6cac6866e386685&PageUrl=http%3a%2f%2fsales-test.cifi.com.cn%3a9060%2fstd%2f00110402%2fd9f90c57-f0d6-11e5-9bcd-4437e6cc9502.aspx%3fmode%3d3%26_mp%3dcrumbs%26oid%3d712D2B59-98A1-E711-80BB-005056A27FB0%26projectFilter%3dE21734F7-7B99-4F84-BE58-312CE75DA099%26title%3d%e6%8a%98%e6%89%a3%e6%96%b9%e6%a1%88%26_ms%3d1539675001601%26_t%3d1539675006148%26_tFields%3dBUGUID%252CPROJGUID%26BUGUID%3d8FFA344C-3699-E711-80BB-005056A27FB0%26ProjGUID%3dE21734F7-7B99-4F84-BE58-312CE75DA099","AppScenariosEnum":"非公开折扣","DiscountVlue":0}],"PayFormInfoDetails":[{"PayFormName":"一次性付款","Scope":"整个项目","DetailUrl":"http://sales-test.cifi.com.cn:9060/PubPlatform/Nav/Login/SSO/Login.aspx?UserCode=admin&Password=4076f862096d1536b6cac6866e386685&PageUrl=http%3a%2f%2fsales-test.cifi.com.cn%3a9060%2fstd%2f00110403%2fe6c8935c-f640-11e5-9be5-001500cb9bce.aspx%3fmode%3d3%26_mp%3dcrumbs%26oid%3d39D00433-C9D4-4570-9290-B488B68F6494%26projectFilter%3dE21734F7-7B99-4F84-BE58-312CE75DA099%26title%3d%e4%bb%98%e6%ac%be%e6%96%b9%e5%bc%8f%26_ms%3d1539677038318%26_t%3d1539677040450%26_tFields%3dBUGUID%252CPROJGUID%26BUGUID%3d8FFA344C-3699-E711-80BB-005056A27FB0%26ProjGUID%3dE21734F7-7B99-4F84-BE58-312CE75DA099","BgnDate":"","EndDate":"","LoanOption":"无贷款"},{"PayFormName":"全款分期付款","Scope":"整个项目","DetailUrl":"http://sales-test.cifi.com.cn:9060/PubPlatform/Nav/Login/SSO/Login.aspx?UserCode=admin&Password=4076f862096d1536b6cac6866e386685&PageUrl=http%3a%2f%2fsales-test.cifi.com.cn%3a9060%2fstd%2f00110403%2fe6c8935c-f640-11e5-9be5-001500cb9bce.aspx%3fmode%3d3%26_mp%3dcrumbs%26oid%3d07B31189-E4F8-4CD2-9282-ACC01D6B7070%26projectFilter%3dE21734F7-7B99-4F84-BE58-312CE75DA099%26title%3d%e4%bb%98%e6%ac%be%e6%96%b9%e5%bc%8f%26_ms%3d1539677038318%26_t%3d1539677040450%26_tFields%3dBUGUID%252CPROJGUID%26BUGUID%3d8FFA344C-3699-E711-80BB-005056A27FB0%26ProjGUID%3dE21734F7-7B99-4F84-BE58-312CE75DA099","BgnDate":"","EndDate":"","LoanOption":"无贷款"},{"PayFormName":"首付分期付款","Scope":"整个项目","DetailUrl":"http://sales-test.cifi.com.cn:9060/PubPlatform/Nav/Login/SSO/Login.aspx?UserCode=admin&Password=4076f862096d1536b6cac6866e386685&PageUrl=http%3a%2f%2fsales-test.cifi.com.cn%3a9060%2fstd%2f00110403%2fe6c8935c-f640-11e5-9be5-001500cb9bce.aspx%3fmode%3d3%26_mp%3dcrumbs%26oid%3d12157B98-249C-E711-80B9-005056A21B76%26projectFilter%3dE21734F7-7B99-4F84-BE58-312CE75DA099%26title%3d%e4%bb%98%e6%ac%be%e6%96%b9%e5%bc%8f%26_ms%3d1539677038318%26_t%3d1539677040450%26_tFields%3dBUGUID%252CPROJGUID%26BUGUID%3d8FFA344C-3699-E711-80BB-005056A27FB0%26ProjGUID%3dE21734F7-7B99-4F84-BE58-312CE75DA099","BgnDate":"","EndDate":"","LoanOption":"商业贷款"}],"soldNum":1330,"plateStock":73,"applicantTime":"2019-11-19 21:43:10","platePeriod":14,"theprojectedActProfitMargin":0.02,"thisSalesFacecase":"项目于2019年8月末已全盘交付，目前处于装修入住阶段","surplusValue":0,"quietProfitPrice":15146,"tzbProfit":12.03,"surplusProfitPrice":0,"priceMixSafeguard":"（1）通过可以银行按揭方式降低客户资金压力，相对二手车位更具优势\n（2）做到业主通知全覆盖，短蓄短爆，营造成交氛围\n（3）打通物业，推进提高地面车位收费标准\n（4）发展物业管家、外部中介作为场外经纪人，推荐成交给予相应奖励","thisPricingActProfitMargin":8.28,"tzbIrr":44.91,"islimitPrice":1,"quietProfitMargin":12.13,"projectScale":17.83,"thisPricingValue":413,"addSignProfitMargin":25.34,"surplusQuietProfitMargin":0,"pricingType":"定价"};
    },
    data() {
      let isMobile=width<=1024;
      let numbers=isMobile?1:3;
      let DingTiaoJiaRes=isMobile?[{
              mode:'custom',
              component:'floatingPriceChange',
              level:2.2,
              numbers:1
            }]:[{
              label:"价格调整对象",
              type:"text",
              name:'priceAdObject',
              level:2.2,
            },
            {
              label:"调整货量(㎡)",
              type:"text",
              name:'priceAdCargo',
              level:2.2,
            },
            {
              label:"当前均价(元/㎡)",
              type:"text",
              name:'priceAdAvg',
              level:2.2,
              width:100
            },
            {
              label:"申请均价(元/㎡)",
              type:"text",
              name:'priceAdsqAvg',
              level:2.2,
              width:100
            },
            {
              label:"调整前货值(万元)",
              type:"text",
              name:'priceAdbeforeCargo',
              level:2.2,
            },
            {
              label:"调整后货值(万元)",
              type:"text",
              name:'priceAdafterCargo',
              level:2.2,
            },
            {
              label:"货值差异(万元)",
              type:"computed",
              name:'priceAdDiff',
              level:2.2,
              computed(){

              }
            }];
      return {
        labelPosition:width<=1024?"top":'right',
        value: {},
        width:width+'px',
        btns:[
          {name:"test",callback(v,l){
            console.log(v);
          }},
        ],
        list: [{
          title: "审批信息",
          mode: 'vertical',
          subtitle: [false,"一、经营对标",false,"二、经营数据变化", "三、价格对比",false,"四、定调价结果" ,"五、项目情况", "六、当前销售简述", "七、价格策略简述", "八、经营测算"],
          //PriceInfoDetails价格提示---pricingResult定调价结果--PayFormInfoDetails付款方式--PriceDiscountInfo折扣方案
          //PriceDetail一房一价表
          dataName:["pricingResult","PriceInfoDetails","PriceDiscountInfo","PayFormInfoDetails",'PriceDetail'],
          //subtitleIcon:["cir","cir","cir","cir","cir","cir","cir","cir","cir","cir","cir"],
          numbers:numbers,
          inputList: [
            {
              label:'定价/调价类型',
              level:0,
              name:'pricingType',
              type:'select',
              mode: "transverse",
              labelWidth:'110px',
              options:[
                {value:0,label:'该业态的定价低于战规定价'},
                {value:1,label:'该业态的定价高于战规定价'},
                {value:2,label:'价格下调(下调后整盘低于战规均价)'},
                {value:3,label:'价格下调(下调后整盘高于战规均价)'},
                {value:4,label:'价格上调'},
              ],
            },
            {
              label:'定调价审批类型',
              level:0,
              name:'pricingTypeCode',
              type:'select',
              color:'red',
              labelWidth:'110px',
              mode: "transverse",
              options:[
                {value:0,label:'该业态的定价低于战规定价'},
                {value:1,label:'该业态的定价高于战规定价'},
                {value:2,label:'价格下调(下调后整盘低于战规均价)'},
                {value:3,label:'价格下调(下调后整盘高于战规均价)'},
                {value:4,label:'价格上调'},
              ],
            },
            {
              label: '预计推盘日期',
              type: "date",
              name: "anticipatedDate",
              level: 0,
              mode: "transverse",
              labelWidth:'110px',
              placeholder:"请选择"
            },
            {
              label: '',
              type: "longTextarea",
              name: "content",
              numbers: 1,
              level: 0,
              mode: "transverse"
            },

            {
              mode:'custom',
              component:'management',
              level:0.2,
              numbers:1
            },

            {
              label: '结论',
              type: "longTextarea",
              name: "conclusion",
              numbers: 1,
              level: 0.3,
              mode: "transverse",
              placeholder:"偏差大需说明理由，同时说明清楚利润率计算口径"
            },
            /* {
              mode:'custom',
              component:"floatingPriceChange",
              level:0.4
            }, */
            /* 经营数据变化*/
            {
              mode:'custom',
              component:'changeData',
              level:0.5,
              numbers:1
            },
            {
              level: 2,
              mode:'custom',
              component:'priceDiff',
              numbers:1
            },
            {
              label:"结论",
              type:"longTextarea",
              name:'priceconConclusion',
              mode:'transverse',
              level:2.1,
              numbers:1
            },
            ...DingTiaoJiaRes,
            {
              mode:'custom',
              component:isMobile?'projectStatusMoblie':'projectStatus',
              level:3,
              numbers:1
            },
            {
              label: '1、项目当前面临情况',
              type: "longTextarea",
              name: "thisSalesFacecase",
              mode:'transverse',
              level:4,
              numbers:1,
              labelWidth:"10em"
            },{
              label: '2、风险评估',
              mode:'transverse',
              type: "longTextarea",
              name: "thisSalesEstimate",
              level:4,
              numbers:1
            },{
              label: '3、其他',
              type: "longTextarea",
              mode:'transverse',
              name: "thisSalesQt",
              level:4,
              numbers:1
            },
             //level5
            {
              label: '1、定调价标的及去化情况简述',
              type: "longTextarea",
              name: "priceMixSelling",
              mode:'transverse',
              level:5,
              numbers:1,
            },{
              label: '2、定调价营销折扣释放口径',
              mode:'transverse',
              type: "longTextarea",
              name: "priceMixDis",
              level:5,
              numbers:1,
            },
            {
              label: '3、定调价策略简述',
              type: "longTextarea",
              mode:'transverse',
              name: "priceMixStrategy",
              level:5,
              numbers:1,
            },{
              label: '4、流量保障策略简述',
              mode:'transverse',
              type: "longTextarea",
              name: "priceMixSafeguard",
              level:5,
              numbers:1,
            },{
              label: '5、其他',
              type: "longTextarea",
              mode:'transverse',
              name: "priceMixQt",
              level:5,
              numbers:1,
            },
            //level6
            {
              label: '',
              mode:'transverse',
              type: "longTextarea",
              name: "overallProfitMargin",
              level:6,
              numbers:1            ,
            },
            {
              mode:'custom',
              level:7,
              component:'foldTable',
              numbers:1
            }
          ]
        },
        {
          title:'附件',
          mode:'transverse',
          numbers:1,
          inputList:[{
            name:'files',
            type:'upFile',
            label:'附件',
            action:'aa',
            fileList:[{name:'一房一价表.xlsx',url:''}],
            btnInfo:'上传'
          }]
        }
        ]
      }
    },
    methods: {

    }
  }
</script>

<style lang="scss">
  $fontSize:13px;
  .mobileInfo{
    width: 100%!important;
  }
  .fullWidth {
    width: 100%;
    overflow: auto;
  }
  .parojectStatus.table{
    min-width: 900px;
    text-align: center;
  }
  .title {
    font-size: 18px;
    margin-bottom: 10px;
  }
  .lamp{
    width: 16px;
    height: 16px;
    border-radius:50% ;
    display: inline-block;
    vertical-align: middle;
    margin-bottom: 3px;
  }
  .green{
    background-color:#00ff00;
    border: 1px solid #00bb00;
  }
  .red{
    background-color: red;
    border: 1px solid #bb0000;
  }
  .y_input{
    span{
      font-size: $fontSize;
    }
  }
  .cir{
    display: inline-block;
    width: 15px;
    height: 15px;
    border: 2px #2661FF solid;
    border-radius:50% ;
    vertical-align: middle;
  }
  @media (max-width:1024px) {
    .el-collapse-item:first-child .el-collapse-item__wrap{
      .el-collapse-item__content>.el-row:first-child>.el-row:nth-child(4){
        margin-top: 10px;
      }
    }
    strong{
      font-weight: 400!important;
      font-size: 13px!important;
    }
    .el-form-item__label,strong{
      color: #303133!important;
      font-size: $fontSize;
    }
    .parojectStatus.table tbody td{
      padding: 0 !important;
    }
    td,th{
      font-size: 12px;
    }
    .el-collapse-item__content{
      font-size: $fontSize;
    }
  }
</style>
