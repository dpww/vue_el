<template>
  <process-form title="【营销定调价】湘湖悦章1#3#叠墅首开价格定价方案" :formlist="list" :labelwidth="'120px'" :label-position="'left'" :value.sync="value" :readonly="true" ></process-form>
</template>
<script>
  let width=document.body.offsetWidth;
  import {sendJSON} from "@/api/request.js";
  const toStr=Object.prototype.toString;
  export default {
    components: {
      processForm:()=>import("@/views/component/formV2.vue")
    },
    created(){
      if(width>1024){
        this.list.unshift({
          title: "基础信息",
          mode: 'transverse',
          numbers: 3,
          inputList:[{
              label: '项目名称',
              type: "input",
              name: "projectName",
              numbers: 1
            },
            {
              label: '申请人',
              type: "input",
              name: "applicantName"
            },
            {
              label: '申请人部门',
              type: "input",
              name: "departmentName"
            },
            {
              label: '申请日期',
              type: "date",
              name: "applicantTime"
            }
          ]
        })
      }
      /* sendJSON('/pricing/getApplyData',{
        "BSID":"My_Sales",
        "BTID":"My_Sales_PayFormChange",
        "BOID":this.$route.query.BOID||"652a90f3-970f-ea11-80bb-005056a37afa",
        "UserID":"yangyz01",
        "LoginKey":"78de2530d0bb5d75483ca15da921a5d9"
      }).then(res=>{
        if(res.result.code==200){
          let data=res.result.data;
          const convert=(key)=>{
            data[key]=toStr.call(data[key])==="[object Array]"?data[key]:[data[key]];
          }
          ["PayFormInfoDetails","PriceDetail","PriceDiscountInfo","PriceInfoDetails","pricingResult"].forEach(item=>convert(item));
          this.value=data;
          console.log(JSON.stringify(data));
        }else{
          this.$message.error(res.result.messages||"请求失败，请联系管理员");
        }
      }); */
      this.value={"stockPartner":"融信","dtbIrr":4.88,"departmentId":"BJSYB","PriceInfoDetails":[{"ZpRate":96.74,"MinAmount":85000,"ProductType":"车位-地下人防-毛坯-可售-常规","MaxPrice":85000,"MinPrice":85000,"MaxAmount":85000}],"surplusProfitMargin":11.41,"priceMixQt":"无","ismerge":2,"cityPeriod":12,"priceMixDis":"无折扣","actProfitMargin":8.38,"id":"e516087e-a1a4-4f4c-9553-feff0df7b59a","tzbJths":31,"fileList":[],"departmentName":"北京事业部","thisPricingProfitPrice":7439,"messageArray":[{"thisPricingValue":"对标战规版本批次货值减损10405万元，本批次货值折损率为13.57%；本批次货值折损≥5%时，系统将红灯预警"},{"theprojectedValue":"对标战规版整盘货值减损 69949万元，整盘货值折损率为8.39%；整盘货值折损≥2%时，系统将红灯预警"},{"theprojectedProfitPrice":"对标战规版整盘利润额折损 48129万元，对标战规版整盘利润折损额≥3000万，系统将红灯预警"},{"theprojectedQuietProfitMargin":"对标战规版整盘净利率折损≥3%时系统将红灯预警"}],"quietValue":833700,"priceconConclusion":"因版块内现无在售叠墅产品，现以联排价格为参考竞品","cityLevel":3,"applicantName":"杨彦召","PriceDetail":[{"BeforeDjTotalPriceAve":75000,"BeforeDjTotalPrice":1950000,"DjAdjustDiff":10000,"DjAdjustFD":0.13,"DetailUrl":"http://sales-test.cifi.com.cn:9060/PubPlatform/Nav/Login/SSO/Login.aspx?UserCode=admin&Password=4076f862096d1536b6cac6866e386685&PageUrl=http%3a%2f%2fsales-test.cifi.com.cn%3a9060%2fstd%2f00110401%2f93086aa5-05fb-11e6-828d-7427ea1e696a.aspx%3f_mp%3dblank%26mode%3d2%26auditStatusEnum%3d0%26oid%3d2f84a15a-c2fa-e911-80bb-005056a37afa%26bldGUID%3d146f5827-80a9-4d4f-b53d-c6c67bdd7379%26projGUID%3de21734f7-7b99-4f84-be58-312ce75da099%26IsFromBPM%3d1","HZSYE":260000,"TotalAdjustFD":0.13,"BldFullName":"运河悦章全期（杭州）-车位","Name":"车位-地下人防-毛坯-可售-常规","RoomCount":26,"SumArea":26,"BldType":"整栋","AfterDjTotalPriceAve":85000,"AfterDjTotalPrice":2210000}],"thisSalesQt":"目前项目加推楼栋预计11月份达到预售条件，计划19年11月底取证加推，以抢收客户","dtbJths":41.2,"stockPer":18,"zgbProfit":13.15,"addSignValue":179743,"actProfitPrice":59552,"thisSalesEstimate":"项目周边同类型产品排屋均价在毛坯均价4.2万，首开精装叠墅和毛坯排屋差价在4500元/㎡，价差小，会形成一定的竞争，预计价格实现有一定难度","pricingTypeCode":"该业态的定价低于战规均价","priceMixSelling":"此次调价为湘湖悦章1#3#首开叠墅调价，其中1#房源紧靠南四路并且南面紧挨着高压线和变电站，位置较差，客户接受度低，此次整体均价36745 元/㎡，3#位置想对较好，但是花园面积普遍较小，3#均价为38245 元/㎡，此次首开为周边首个精装修叠墅，较周边排屋价格相差4500元/㎡，并且叠墅下叠不赠送地下室，而且叠墅架空层不装修，预估客户对于精装修的抗性较大，预计整体首开去化30%","marketingExplain":"2%","projectName":"旭辉望馨商业中心（北京）","tzhIrr":4.81,"priceMixStrategy":"结合客户目前对项目以及市场的价格接受度，基于市场限价毛坯33500元/㎡，精装修37500元/㎡的限价条件下，针对首开房源按照精装修37500元/㎡定价，预估后期其他楼幢按照33500元/㎡定价，以保证一标段的去化速度，保证流量","islimitExplain":"叠墅限价毛坯33500元/㎡ ，精装限价37500元/㎡","anticipatedDate":"2019-11-10","surplusActProfitMargin":3.03,"theprojectedQuietProfitMargin":-5.8,"tzhJths":31.2,"thisPricingQuietProfitMargin":-0.92,"actValue":774156,"zgbJths":27,"theprojectedProfitPrice":51536,"pricingResult":[{"priceAdCargo":5141.27,"priceAdafterCargo":19279.76,"priceAdsqAvg":"37500","priceAdObject":"1#3#叠墅","priceAdbeforeCargo":19761.2,"priceAdDiff":-481.44,"priceAdAvg":38436}],"addSignActProfitMargin":-14.22,"theprojectedValue":763751,"content":"尊敬的各位领导： \n       湘湖悦章项目需对叠墅业态进行价格调整申请。目前萧山南部卧城竞争较大，版块内其他项目以排屋为主，本项目周边无配套，整体建面较差，又为周边首个叠墅产品，战规价格为毛坯40000元/㎡，因精装修存在一定的隐性交付风险，湘湖悦章叠墅原计划是按照毛坯限价33500元/㎡出售，现因合作方融信要求以精装销售，以实现部分溢价，且后续物业、法务、客服均为合作方融信，故双方约定以1#3#号楼精装均价37500元/㎡销售检测市场接受程度，后续精装或者毛坯，视市场接受程度决策，现本次后面叠墅其他楼幢仍按照均价毛坯33500元/㎡测算；申请具体方案如下：","addSignQuietProfitMargin":-18.99,"conclusion":"无","tzhProfit":7.35,"dtbProfit":8.38,"overallProfitMargin":"(1)按当批次定价拉通全盘，全盘利润率为7.35%；\r\n(2)按照当前价格年度5%涨幅计算，全盘利润率为7.6%","addSignProfitPrice":-9630,"priceComparison":[{"commercial":"叠墅","jpjgAvgPrice":42000,"jpjgPriceTraffic":6400,"priceVersion":"首开定价","jpjgPriceDiff":1122,"ghbfAvgPriect":40000,"zgzpTrafficDiff":1155,"zgskAvgPrice":40000,"ghbfTrafficDiff":1166,"conclusion":"当批房源次定价后整盘利润率与战规版利润率几乎持平，利润额远高于战规版利润额。本批次定价利润率均远低于动态版利润率与战规版利润率，是由于实际面价减少1234㎡，导致货值减少，利润率降低。","zgzpAvgPrice":40000,"zgskPriceFd":40000,"zgskTrafficDiff":1111,"price":37500,"ghbfPriceFd":21857,"jpjgPriceFd":-34618,"targetTraffic":5783,"zgzpPriceFd":-2053}],"thisPricingProfitMargin":12.23,"theprojectedProfitMargin":7.35,"zgbIrr":10.75,"soldPer":29.75,"PriceDiscountInfo":[{"PreferentialPrice":10000,"DiscountDetailName":"总经理优惠","CalMethodEnum":"总价优惠","RoomInfo":"","DetailUrl":"http://sales-test.cifi.com.cn:9060/PubPlatform/Nav/Login/SSO/Login.aspx?UserCode=admin&Password=4076f862096d1536b6cac6866e386685&PageUrl=http%3a%2f%2fsales-test.cifi.com.cn%3a9060%2fstd%2f00110402%2fd9f90c57-f0d6-11e5-9bcd-4437e6cc9502.aspx%3fmode%3d3%26_mp%3dcrumbs%26oid%3d712D2B59-98A1-E711-80BB-005056A27FB0%26projectFilter%3dE21734F7-7B99-4F84-BE58-312CE75DA099%26title%3d%e6%8a%98%e6%89%a3%e6%96%b9%e6%a1%88%26_ms%3d1539675001601%26_t%3d1539675006148%26_tFields%3dBUGUID%252CPROJGUID%26BUGUID%3d8FFA344C-3699-E711-80BB-005056A27FB0%26ProjGUID%3dE21734F7-7B99-4F84-BE58-312CE75DA099","AppScenariosEnum":"非公开折扣","DiscountVlue":0}],"PayFormInfoDetails":[{"PayFormName":"一次性付款","Scope":"整个项目","DetailUrl":"http://sales-test.cifi.com.cn:9060/PubPlatform/Nav/Login/SSO/Login.aspx?UserCode=admin&Password=4076f862096d1536b6cac6866e386685&PageUrl=http%3a%2f%2fsales-test.cifi.com.cn%3a9060%2fstd%2f00110403%2fe6c8935c-f640-11e5-9be5-001500cb9bce.aspx%3fmode%3d3%26_mp%3dcrumbs%26oid%3d39D00433-C9D4-4570-9290-B488B68F6494%26projectFilter%3dE21734F7-7B99-4F84-BE58-312CE75DA099%26title%3d%e4%bb%98%e6%ac%be%e6%96%b9%e5%bc%8f%26_ms%3d1539677038318%26_t%3d1539677040450%26_tFields%3dBUGUID%252CPROJGUID%26BUGUID%3d8FFA344C-3699-E711-80BB-005056A27FB0%26ProjGUID%3dE21734F7-7B99-4F84-BE58-312CE75DA099","BgnDate":"","EndDate":"","LoanOption":"无贷款"},{"PayFormName":"全款分期付款","Scope":"整个项目","DetailUrl":"http://sales-test.cifi.com.cn:9060/PubPlatform/Nav/Login/SSO/Login.aspx?UserCode=admin&Password=4076f862096d1536b6cac6866e386685&PageUrl=http%3a%2f%2fsales-test.cifi.com.cn%3a9060%2fstd%2f00110403%2fe6c8935c-f640-11e5-9be5-001500cb9bce.aspx%3fmode%3d3%26_mp%3dcrumbs%26oid%3d07B31189-E4F8-4CD2-9282-ACC01D6B7070%26projectFilter%3dE21734F7-7B99-4F84-BE58-312CE75DA099%26title%3d%e4%bb%98%e6%ac%be%e6%96%b9%e5%bc%8f%26_ms%3d1539677038318%26_t%3d1539677040450%26_tFields%3dBUGUID%252CPROJGUID%26BUGUID%3d8FFA344C-3699-E711-80BB-005056A27FB0%26ProjGUID%3dE21734F7-7B99-4F84-BE58-312CE75DA099","BgnDate":"","EndDate":"","LoanOption":"无贷款"},{"PayFormName":"首付分期付款","Scope":"整个项目","DetailUrl":"http://sales-test.cifi.com.cn:9060/PubPlatform/Nav/Login/SSO/Login.aspx?UserCode=admin&Password=4076f862096d1536b6cac6866e386685&PageUrl=http%3a%2f%2fsales-test.cifi.com.cn%3a9060%2fstd%2f00110403%2fe6c8935c-f640-11e5-9be5-001500cb9bce.aspx%3fmode%3d3%26_mp%3dcrumbs%26oid%3d12157B98-249C-E711-80B9-005056A21B76%26projectFilter%3dE21734F7-7B99-4F84-BE58-312CE75DA099%26title%3d%e4%bb%98%e6%ac%be%e6%96%b9%e5%bc%8f%26_ms%3d1539677038318%26_t%3d1539677040450%26_tFields%3dBUGUID%252CPROJGUID%26BUGUID%3d8FFA344C-3699-E711-80BB-005056A27FB0%26ProjGUID%3dE21734F7-7B99-4F84-BE58-312CE75DA099","BgnDate":"","EndDate":"","LoanOption":"商业贷款"}],"soldNum":626,"plateStock":1.28,"applicantTime":"2019-11-25 00:00:00","platePeriod":5,"theprojectedActProfitMargin":-1.03,"thisSalesFacecase":"本项目地处杭州南部卧城板块，板块累计库存约1.28万，去化周期约5个月，版块内竞品众多，产品同质化严重，并且竞品以毛坯排屋为主，均价在4.2万-4.3万，本案预计11月中下旬开盘，竞品纷纷开盘对项目已有蓄客会产生分流，增加了加推高去化难度","surplusValue":584008,"quietProfitPrice":99665,"tzbProfit":13.15,"surplusProfitPrice":61166,"priceMixSafeguard":"目前1#3#叠墅为精装修交付，但是存在架空赠送面积的交付风险问题，看市场反映之后后期其他楼幢按照335000元/㎡定价，以保证叠墅的去化速度，保证流量","thisPricingActProfitMargin":3.85,"tzbIrr":7.96,"islimitPrice":1,"quietProfitMargin":13.15,"projectScale":25,"thisPricingValue":66279,"addSignProfitMargin":-5.84,"surplusQuietProfitMargin":-1.74,"pricingType":"定价"};
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
              type:"text",
              name:'priceAdDiff',
              level:2.2,
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
