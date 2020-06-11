<template>
<div class="checkReportMode">
<el-collapse v-model="activeNames" @change="handleChange">
  <el-collapse-item title="" name="1">
     <template slot="title">
            <h3 class="titleText">定调价审批</h3>
          </template>
          <ul class="linkList">
            <li  v-for="(item,index) in approvalList"  :key="index">
              <span @click="toMode(item.link)">{{item.name}}</span>
              <el-button class="xuHuiBtn" @click="startCheck(item.link)" size="mini">发起审批</el-button>
              </li>
          </ul>
  </el-collapse-item>
  <el-collapse-item title="" name="2">
     <template slot="title">
            <h3 class="titleText">变更审批</h3>
          </template>
    <ul class="linkList">
            <li  v-for="(item,index) in offerFlowList"  :key="index">
              <span @click="toMode(item.link)">{{item.name}}</span>
              <el-button class="xuHuiBtn" @click="startCheck(item.link)" size="mini">发起审批</el-button>
            </li>
          </ul>
  </el-collapse-item>
  <el-collapse-item title="" name="3">
     <template slot="title">
            <h3 class="titleText">费用审批</h3>
          </template>
    <ul class="linkList">
            <li  v-for="(item,index) in costList"  :key="index">
              <span @click="toMode(item.link)">{{item.name}}</span>
              <el-button class="xuHuiBtn" @click="startCheck(item.link)" size="mini">发起审批</el-button>
              </li>
          </ul>
  </el-collapse-item>
  <el-collapse-item title="" name="4">
     <template slot="title">
            <h3 class="titleText">其他审批</h3>
          </template>
          <ul class="linkList">
            <li  v-for="(item,index) in otherList"  :key="index">
              <span @click="toMode(item.link)">{{item.name}}</span>
              <el-button class="xuHuiBtn" @click="startCheck(item.link)" size="mini">发起审批</el-button>
            </li>
          </ul>
  </el-collapse-item>
</el-collapse>
</div>
</template>

<script>
 import {
    sendJSON,get
} from "@/api/request";
export default {
data() {
      return {
        activeNames: ['1',"2","3","4"],
        costList:[
          {name:"年度预算调整(支付口径)",link:"yearPay"},
          {name:"年度预算调整(合同口径)",link:"yearReport"},
          {name:"电商管理费支出发起",link:"businessPayment"},
          {name:"电商收入项目挪腾发起",link:"businessIncome"},
          {name:"费用采购方案发起",link:"costPurchase"},
          // {name:"费用立项申请",link:"costProject"},
          // {name:"费用立项变更",link:"costRevocation"},
          // {name:"费用立项变更单发起",link:"costChange"},
          {name:"费用合同审批发起",link:"costExamine"},
          {name:"费用合同审批发起(法务可见)",link:"costExamineLegal"},
          {name:"费用付款申请发起",link:"costPay"},
          {name:"表外费用录入审批发起",link:"costEntering"}
          ],
        offerFlowList:[
          {name:"认购后更名",link:"offerRename"},
          {name:"认购后员工购房",link:"staffByHouse"},
          {name:"认购后非公开折扣",link:"offerDiscount"},
          {name:"认购后延期签约",link:"delaySigning"},
          {name:"认购后换房",link:"offerChangeHouse"},
          {name:"认购后退订",link:"offerUnsubscribe"},
          {name:"认购后分期付款",link:"offerInstallment"},
          {name:"认购后特殊审批",link:"offerSpecial"},
          {name:"签约后更名",link:"signingRearRenamed"},
          {name:"签约后退房",link:"signingRearCheckOut"},
          {name:"签约后换房",link:"signingRearRoomChange"},
          {name:"签约后变更付款方式",link:"paymentMethod"},
          {name:"签约后变更延期付款",link:"installmentPay"},
          {name:"签约后变更按揭银行",link:"MortgageBank"},
        ],
        approvalList:[
          {name:"定调价流程",link:"floatingPriceMy"},
          {name:"定调价审批页手机端与PC端",link:"floatingPriceApproval"},
          {name:"一揽子分期折扣审批",link:"agingAndDiscount"},
        ],
        otherList:[
          {name:"周上报审批",link:"uploadVue"}
        ],
        startDataList:{
          floatingPriceMy:{
            "Result": "{\"code\":\"1\",\"msg\":\"发起成功\"}",
            "Data": [
              "My_Sales",
              "My_Sales_PriceZD",
              "2f84a15a-c2fa-e911-80bb-005056a37afa",
              "<DATA xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\"><TITLE>运河悦章（杭州）</TITLE><BUName>浙江事业部</BUName><BUCode>ZJSYB</BUCode><IsPartnerProj /><ProjGUID>b344d9b9-0495-43f0-bde1-c83bac4faf71</ProjGUID><ProjName>运河悦章（杭州）</ProjName><Zdr>杨彦召</Zdr><ZdDate>2019-10-30</ZdDate><Remark>&lt;p&gt;测试&lt;/p&gt;</Remark><DTjType>调价</DTjType><TjType>底价调高</TjType><SpType>价格上调</SpType><SpTypeColor>green</SpTypeColor><TpDate>2019-10-31</TpDate><DJTDRoom /><Rate>0.00</Rate><NetProfit>0.00</NetProfit><SingleValue>0.81</SingleValue><FullValue>0.81</FullValue><PriceConclude><Item><TjPlanGUID>2f84a15a-c2fa-e911-80bb-005056a37afa</TjPlanGUID><Name>车位-地下人防-毛坯-可售-常规</Name><BldNum>1</BldNum><DSAmountSY>-9449208.64</DSAmountSY><ZDF>-0.16</ZDF></Item></PriceConclude><PriceHzInfo><Item><HzAmountBefore>1279812439.00</HzAmountBefore><HzAmountAfter>1270392318.36</HzAmountAfter></Item></PriceHzInfo><PriceDetail><Item><Name>车位-地下人防-毛坯-可售-常规</Name><BldFullName>运河悦章全期（杭州）-车位</BldFullName><BldType>整栋</BldType><RoomCount>26</RoomCount><SumArea>26.00</SumArea><BeforeDjTotalPriceAve>75000.00</BeforeDjTotalPriceAve><AfterDjTotalPriceAve>85000.00</AfterDjTotalPriceAve><DjAdjustDiff>10000.00</DjAdjustDiff><DjAdjustFD>0.13</DjAdjustFD><BeforeDjTotalPrice>1950000.00</BeforeDjTotalPrice><AfterDjTotalPrice>2210000.00</AfterDjTotalPrice><HZSYE>260000.00</HZSYE><TotalAdjustFD>0.13</TotalAdjustFD><DetailUrl>http://sales-test.cifi.com.cn:9060/PubPlatform/Nav/Login/SSO/Login.aspx?UserCode=admin&amp;Password=4076f862096d1536b6cac6866e386685&amp;PageUrl=http%3a%2f%2fsales-test.cifi.com.cn%3a9060%2fstd%2f00110401%2f93086aa5-05fb-11e6-828d-7427ea1e696a.aspx%3f_mp%3dblank%26mode%3d2%26auditStatusEnum%3d0%26oid%3d2f84a15a-c2fa-e911-80bb-005056a37afa%26bldGUID%3d146f5827-80a9-4d4f-b53d-c6c67bdd7379%26projGUID%3de21734f7-7b99-4f84-be58-312ce75da099%26IsFromBPM%3d1</DetailUrl></Item></PriceDetail><AdjustInfoDetails><Item><AdjustObject>车位</AdjustObject><AdjustNum>222.00</AdjustNum><AvgPrice>112.00</AvgPrice><ApplyAvgPrice>123.00</ApplyAvgPrice><PriceCe>11.00</PriceCe><PriceCeColor>green</PriceCeColor><BeforeAdjustAmount>234.00</BeforeAdjustAmount><AfterAdjustAmount>345.00</AfterAdjustAmount><AdjustCe>111.00</AdjustCe><AdjustCeColor>green</AdjustCeColor></Item></AdjustInfoDetails><JyInfoDetails><Item><VersionName>投资版</VersionName><NetProfit>0.00</NetProfit><NetProfitColor>black</NetProfitColor><Rate>0.00</Rate><RateColor>black</RateColor><IRRValue>0.00</IRRValue><IRRColor>black</IRRColor><Cycle>0.00</Cycle><CycleColor>black</CycleColor></Item><Item><VersionName>战规版</VersionName><NetProfit>0.00</NetProfit><NetProfitColor>black</NetProfitColor><Rate>0.00</Rate><RateColor>black</RateColor><IRRValue>0.00</IRRValue><IRRColor>black</IRRColor><Cycle>0.00</Cycle><CycleColor>black</CycleColor></Item><Item><VersionName>动态版</VersionName><NetProfit>0.00</NetProfit><NetProfitColor>black</NetProfitColor><Rate>0.00</Rate><RateColor>black</RateColor><IRRValue>0.00</IRRValue><IRRColor>black</IRRColor><Cycle>0.00</Cycle><CycleColor>black</CycleColor></Item><Item><VersionName>调整后预计</VersionName><NetProfit>0.00</NetProfit><NetProfitColor>black</NetProfitColor><Rate>0.00</Rate><RateColor>black</RateColor><IRRValue>0.00</IRRValue><IRRColor>black</IRRColor><Cycle>0.00</Cycle><CycleColor>black</CycleColor></Item><Item><VersionName>调整后差值(对比战规版)</VersionName><NetProfit>0.00</NetProfit><NetProfitColor>green</NetProfitColor><Rate>0.00</Rate><RateColor>green</RateColor><IRRValue>0.00</IRRValue><IRRColor>green</IRRColor><Cycle>0.00</Cycle><CycleColor>green</CycleColor></Item></JyInfoDetails><JyInfo2Details><Item><VersionName>本批次定调价房源</VersionName><NetProfit>0.00</NetProfit><NetProfitColor>black</NetProfitColor><Rate>0.00</Rate><RateColor>black</RateColor></Item><Item><VersionName>累计已售部分房源</VersionName><NetProfit>0.00</NetProfit><NetProfitColor>black</NetProfitColor><Rate>0.00</Rate><RateColor>black</RateColor></Item></JyInfo2Details><JyProfitChangeDetails><Item><VersionName>投资版</VersionName><FullProfit>0.00</FullProfit><FullProfitColor>black</FullProfitColor><Profit0>0.00</Profit0><Profit0Color>black</Profit0Color><Profit1>0.00</Profit1><Profit1Color>black</Profit1Color><Profit2>0.00</Profit2><Profit2Color>black</Profit2Color><Profit3>0.00</Profit3><Profit3Color>black</Profit3Color><Profit4>0.00</Profit4><Profit4Color>black</Profit4Color></Item><Item><VersionName>战规版</VersionName><FullProfit>0.00</FullProfit><FullProfitColor>black</FullProfitColor><Profit0>0.00</Profit0><Profit0Color>black</Profit0Color><Profit1>0.00</Profit1><Profit1Color>black</Profit1Color><Profit2>0.00</Profit2><Profit2Color>black</Profit2Color><Profit3>0.00</Profit3><Profit3Color>black</Profit3Color><Profit4>0.00</Profit4><Profit4Color>black</Profit4Color></Item><Item><VersionName>年度预算版</VersionName><FullProfit>0.00</FullProfit><FullProfitColor>black</FullProfitColor><Profit0>0.00</Profit0><Profit0Color>black</Profit0Color><Profit1>0.00</Profit1><Profit1Color>black</Profit1Color><Profit2>0.00</Profit2><Profit2Color>black</Profit2Color><Profit3>0.00</Profit3><Profit3Color>black</Profit3Color><Profit4>0.00</Profit4><Profit4Color>black</Profit4Color></Item><Item><VersionName>调整后预计</VersionName><FullProfit>0.00</FullProfit><FullProfitColor>black</FullProfitColor><Profit0>0.00</Profit0><Profit0Color>black</Profit0Color><Profit1>0.00</Profit1><Profit1Color>black</Profit1Color><Profit2>0.00</Profit2><Profit2Color>black</Profit2Color><Profit3>0.00</Profit3><Profit3Color>black</Profit3Color><Profit4>0.00</Profit4><Profit4Color>black</Profit4Color></Item><Item><VersionName>调整后差值(对比战规版)</VersionName><FullProfit>0.00</FullProfit><FullProfitColor>green</FullProfitColor><Profit0>0.00</Profit0><Profit0Color>green</Profit0Color><Profit1>0.00</Profit1><Profit1Color>green</Profit1Color><Profit2>0.00</Profit2><Profit2Color>green</Profit2Color><Profit3>0.00</Profit3><Profit3Color>green</Profit3Color><Profit4>0.00</Profit4><Profit4Color>green</Profit4Color></Item></JyProfitChangeDetails><PriceInfoDetails><Item><ProductType>车位-地下人防-毛坯-可售-常规</ProductType><ZpRate>96.74</ZpRate><MinPrice>85000.00</MinPrice><MinAmount>85000.00</MinAmount><MaxPrice>85000.00</MaxPrice><MaxAmount>85000.00</MaxAmount></Item></PriceInfoDetails><PriceChangeInfoDetails><Item><ProductType>车位-地下人防-毛坯-可售-常规</ProductType><PcAvgPrice>85000.00</PcAvgPrice><AfterAdjustAvgPrice>0.00</AfterAdjustAvgPrice><ZgAvgPrice>0.00</ZgAvgPrice><AvgPriceCe>0.00</AvgPriceCe><AvgPriceCeColor>green</AvgPriceCeColor><AvgPriceRate>0.00</AvgPriceRate><AvgPriceRateColor>green</AvgPriceRateColor></Item></PriceChangeInfoDetails><PayFormInfoDetails><Item><PayFormName>一次性付款</PayFormName><BgnDate /><EndDate /><Scope>整个项目</Scope><LoanOption>无贷款</LoanOption><DetailUrl>http://sales-test.cifi.com.cn:9060/PubPlatform/Nav/Login/SSO/Login.aspx?UserCode=admin&amp;Password=4076f862096d1536b6cac6866e386685&amp;PageUrl=http%3a%2f%2fsales-test.cifi.com.cn%3a9060%2fstd%2f00110403%2fe6c8935c-f640-11e5-9be5-001500cb9bce.aspx%3fmode%3d3%26_mp%3dcrumbs%26oid%3d39D00433-C9D4-4570-9290-B488B68F6494%26projectFilter%3dE21734F7-7B99-4F84-BE58-312CE75DA099%26title%3d%e4%bb%98%e6%ac%be%e6%96%b9%e5%bc%8f%26_ms%3d1539677038318%26_t%3d1539677040450%26_tFields%3dBUGUID%252CPROJGUID%26BUGUID%3d8FFA344C-3699-E711-80BB-005056A27FB0%26ProjGUID%3dE21734F7-7B99-4F84-BE58-312CE75DA099</DetailUrl></Item><Item><PayFormName>全款分期付款</PayFormName><BgnDate /><EndDate /><Scope>整个项目</Scope><LoanOption>无贷款</LoanOption><DetailUrl>http://sales-test.cifi.com.cn:9060/PubPlatform/Nav/Login/SSO/Login.aspx?UserCode=admin&amp;Password=4076f862096d1536b6cac6866e386685&amp;PageUrl=http%3a%2f%2fsales-test.cifi.com.cn%3a9060%2fstd%2f00110403%2fe6c8935c-f640-11e5-9be5-001500cb9bce.aspx%3fmode%3d3%26_mp%3dcrumbs%26oid%3d07B31189-E4F8-4CD2-9282-ACC01D6B7070%26projectFilter%3dE21734F7-7B99-4F84-BE58-312CE75DA099%26title%3d%e4%bb%98%e6%ac%be%e6%96%b9%e5%bc%8f%26_ms%3d1539677038318%26_t%3d1539677040450%26_tFields%3dBUGUID%252CPROJGUID%26BUGUID%3d8FFA344C-3699-E711-80BB-005056A27FB0%26ProjGUID%3dE21734F7-7B99-4F84-BE58-312CE75DA099</DetailUrl></Item><Item><PayFormName>首付分期付款</PayFormName><BgnDate /><EndDate /><Scope>整个项目</Scope><LoanOption>商业贷款</LoanOption><DetailUrl>http://sales-test.cifi.com.cn:9060/PubPlatform/Nav/Login/SSO/Login.aspx?UserCode=admin&amp;Password=4076f862096d1536b6cac6866e386685&amp;PageUrl=http%3a%2f%2fsales-test.cifi.com.cn%3a9060%2fstd%2f00110403%2fe6c8935c-f640-11e5-9be5-001500cb9bce.aspx%3fmode%3d3%26_mp%3dcrumbs%26oid%3d12157B98-249C-E711-80B9-005056A21B76%26projectFilter%3dE21734F7-7B99-4F84-BE58-312CE75DA099%26title%3d%e4%bb%98%e6%ac%be%e6%96%b9%e5%bc%8f%26_ms%3d1539677038318%26_t%3d1539677040450%26_tFields%3dBUGUID%252CPROJGUID%26BUGUID%3d8FFA344C-3699-E711-80BB-005056A27FB0%26ProjGUID%3dE21734F7-7B99-4F84-BE58-312CE75DA099</DetailUrl></Item></PayFormInfoDetails><PriceDiscountInfo><Item><AppScenariosEnum>非公开折扣</AppScenariosEnum><DiscountDetailName>总经理优惠</DiscountDetailName><CalMethodEnum>总价优惠</CalMethodEnum><PreferentialPrice>10000.00</PreferentialPrice><DiscountVlue>0.00</DiscountVlue><RoomInfo /><DetailUrl>http://sales-test.cifi.com.cn:9060/PubPlatform/Nav/Login/SSO/Login.aspx?UserCode=admin&amp;Password=4076f862096d1536b6cac6866e386685&amp;PageUrl=http%3a%2f%2fsales-test.cifi.com.cn%3a9060%2fstd%2f00110402%2fd9f90c57-f0d6-11e5-9bcd-4437e6cc9502.aspx%3fmode%3d3%26_mp%3dcrumbs%26oid%3d712D2B59-98A1-E711-80BB-005056A27FB0%26projectFilter%3dE21734F7-7B99-4F84-BE58-312CE75DA099%26title%3d%e6%8a%98%e6%89%a3%e6%96%b9%e6%a1%88%26_ms%3d1539675001601%26_t%3d1539675006148%26_tFields%3dBUGUID%252CPROJGUID%26BUGUID%3d8FFA344C-3699-E711-80BB-005056A27FB0%26ProjGUID%3dE21734F7-7B99-4F84-BE58-312CE75DA099</DetailUrl></Item></PriceDiscountInfo><PriceCompareDetails><Item><VersionName>本批次定调价均价</VersionName><Price>0.00</Price><PriceColor>black</PriceColor></Item><Item><VersionName>同业态年度累计已售均价</VersionName><Price>0.00</Price><PriceColor>black</PriceColor></Item><Item><VersionName>同业态待售库存均价</VersionName><Price>0.00</Price><PriceColor>black</PriceColor></Item><Item><VersionName>同业态年度累计已售均价浮动</VersionName><Price>0.00</Price><PriceColor>black</PriceColor></Item><Item><VersionName>同业态待售库存均价浮动</VersionName><Price>0.00</Price><PriceColor>black</PriceColor></Item></PriceCompareDetails><HzBalanceDetails><Item><VersionName>投资版（万元）</VersionName><FullValue>123.00</FullValue><FullValueColor>black</FullValueColor><SingleValue>123.00</SingleValue><SingleValueColor>black</SingleValueColor></Item><Item><VersionName>战规版（万元）</VersionName><FullValue>123.00</FullValue><FullValueColor>black</FullValueColor><SingleValue>123.00</SingleValue><SingleValueColor>black</SingleValueColor></Item><Item><VersionName>动态版（万元）</VersionName><FullValue>123.00</FullValue><FullValueColor>black</FullValueColor><SingleValue>123.00</SingleValue><SingleValueColor>black</SingleValueColor></Item><Item><VersionName>调整后预计（万元）</VersionName><FullValue>124.00</FullValue><FullValueColor>black</FullValueColor><SingleValue>124.00</SingleValue><SingleValueColor>black</SingleValueColor></Item><Item><VersionName>调整后损益额（万元）（对比战规版）</VersionName><FullValue>1.00</FullValue><FullValueColor>black</FullValueColor><SingleValue>1.00</SingleValue><SingleValueColor>black</SingleValueColor></Item><Item><VersionName>调整后损益率（%）（对比战规版）</VersionName><FullValue>0.81</FullValue><FullValueColor>black</FullValueColor><SingleValue>0.81</SingleValue><SingleValueColor>black</SingleValueColor></Item></HzBalanceDetails><ATTACHMENTS /><KdBUCode>B-571B-001</KdBUCode><KdProjCode>A20130521011HZ</KdProjCode><FBpmProjectCode></FBpmProjectCode></DATA>",
              "",
              "yangmin"
            ],
            "Handled": true,
            "EventName": null
          },
          signingRearCheckOut:{
            	"Result": "{\"code\":\"1\",\"msg\":\"发起成功\"}",
              "Data": [
                "My_Sales",
                "My_Sales_ContractCheckOutTF",
                "1880f5bc-14fd-e911-80bb-005056a37afa",
                "<DATA xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\"><TITLE>旭辉绿地旭辉城全期（杭州）-绿地旭辉大厦-1611陈曾姗</TITLE><BName>浙江事业部</BName><BUCode>ZJSYB</BUCode><IsPartnerProj /><ProjectFullName>绿地旭辉城（杭州）-绿地旭辉城全期（杭州）【A201.00】</ProjectFullName><UserName>杨彦召</UserName><ApplyDate>2019-11-02</ApplyDate><AlterType>法院判决类</AlterType><AlterReason>退房-法院判决</AlterReason><CstName>陈曾姗</CstName><RoomInfo>旭辉绿地旭辉城全期（杭州）-绿地旭辉大厦-1611</RoomInfo><BldArea>59.97</BldArea><CjBldPrice>28347.51</CjBldPrice><CjRmbTotal>1700000.00</CjRmbTotal><QSDate>2017-04-16</QSDate><FkState>足额首付</FkState><GetAmount>1698866.00</GetAmount><DiscntRemark>公寓当天认购优惠总价优惠100000.00；按时签约打折；总价优惠-2216.00。</DiscntRemark><Zygw>俞胜孝</Zygw><ProjGUID>3539f081-9238-4ba1-9fa1-4e313274afc2</ProjGUID><HandCharge>0.00</HandCharge><HandChargeRate>0.00</HandChargeRate><Reason>测试</Reason><ATTACHMENTS /><KdBUCode>B-571B-003</KdBUCode><KdProjCode>A20130521010HZ</KdProjCode><FBpmProjectCode></FBpmProjectCode></DATA>",
                "",
                "yangmin"
              ],
              "Handled": true,
              "EventName": null
          },
          installmentPay:{
            "Result": "{\"code\":\"1\",\"msg\":\"发起成功\"}",
            "Data": [
              "My_Sales",
              "My_Sales_ContractFkChange",
              "2cf3926b-18fd-e911-80bb-005056a37afa",
              "<DATA xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\"><TITLE>旭辉绿地旭辉城全期（杭州）-绿地旭辉大厦-416陈启祥;王宁</TITLE><BUName>浙江事业部</BUName><BUCode>ZJSYB</BUCode><IsPartnerProj /><ProjectName>绿地旭辉城（杭州）-绿地旭辉城全期（杭州）【A201.00】</ProjectName><Sponsor>杨彦召</Sponsor><SponsorTime>2019-11-02</SponsorTime><StageType>首付分期</StageType><FqType>全款分期且在事业部回款周期内，首付不低于10%</FqType><StageClass>超出以上两项规定</StageClass><CstName>陈启祥;王宁</CstName><Room>旭辉绿地旭辉城全期（杭州）-绿地旭辉大厦-416</Room><SigningTime>2017-05-07</SigningTime><SigningAmount>1840000.00</SigningAmount><SigningArea>71.16</SigningArea><SigningPrice>25857.22</SigningPrice><SumSigningAmount>1840000.00</SumSigningAmount><IsDiscount>是</IsDiscount><DiscountInfo>0.99</DiscountInfo><ChangeReason>其他原因</ChangeReason><ChangeRemark>测试说明</ChangeRemark><ChangeClass>超出以上两项规定</ChangeClass><ChangeType>首期\\全款分期</ChangeType><Adviser>张啸天</Adviser><ChangeDesc>测试说明</ChangeDesc><ProjectGUID>3539f081-9238-4ba1-9fa1-4e313274afc2</ProjectGUID><StageCycle>2</StageCycle><SumStageAmount>1840000.00</SumStageAmount><StageDays>911</StageDays><x_IsApplyPolicy>否</x_IsApplyPolicy><x_PolicyRangeText /><x_PolicyApplyNumber /><x_PolicyChgTotalNumber /><x_IsPolicyBreak /><x_PolicyType>2</x_PolicyType><ContractFkChangeDetails><Item><StagePlan>第1期</StagePlan><PayTime>2019-11-01</PayTime><ItemName>楼款</ItemName><Amount>1640000.00</Amount></Item><Item><StagePlan>第2期</StagePlan><PayTime>2019-11-04</PayTime><ItemName>楼款</ItemName><Amount>200000.00</Amount></Item></ContractFkChangeDetails><ATTACHMENTS /><KdBUCode>B-571B-003</KdBUCode><KdProjCode>A20130521010HZ</KdProjCode><FBpmProjectCode></FBpmProjectCode></DATA>",
              "",
              "yangmin"
            ],
            "Handled": true,
            "EventName": null
          },
          signingRearRoomChange:{
            "Result": "{\"code\":\"1\",\"msg\":\"发起成功\"}",
            "Data": [
              "My_Sales",
              "My_Sales_ContractHf",
              "ee9ed633-19fd-e911-80bb-005056a37afa",
              "<DATA xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\"><TITLE>旭辉绿地旭辉城（杭州）-旭辉绿地旭辉城全期（杭州）-地下车位-1单元-2-233陈启祥;王宁</TITLE><BName>浙江事业部</BName><BUCode>ZJSYB</BUCode><ProjectFullName>绿地旭辉城（杭州）-绿地旭辉城全期（杭州）【A201.00】</ProjectFullName><UserName>杨彦召</UserName><ApplyDate>2019-11-02</ApplyDate><HfAlterType>高总价换低总价</HfAlterType><AlterType>签约换房</AlterType><CstName>陈启祥;王宁</CstName><RoomInfo>旭辉绿地旭辉城全期（杭州）-绿地旭辉大厦-416</RoomInfo><BldArea>71.16</BldArea><CjRmbTotal>1840000.00</CjRmbTotal><CjBldPrice>25857.22</CjBldPrice><QSDate>2017-05-07</QSDate><FkState>足额首付</FkState><GetAmount>1840000.00</GetAmount><Zygw>张啸天</Zygw><ProjGUID>3539f081-9238-4ba1-9fa1-4e313274afc2</ProjGUID><NewRoomInfo>旭辉绿地旭辉城（杭州）-旭辉绿地旭辉城全期（杭州）-地下车位-1单元-2-233</NewRoomInfo><NewBldArea>10.00</NewBldArea><NewCjBldPrice>20500.00</NewCjBldPrice><NewCjRmbTotal>205000.00</NewCjRmbTotal><AlterReason>其他原因</AlterReason><Reason>测试说明</Reason><IsPartnerProj /><ATTACHMENTS /><KdBUCode>B-571B-003</KdBUCode><KdProjCode>A20130521010HZ</KdProjCode><FBpmProjectCode></FBpmProjectCode></DATA>",
              "",
              "yangmin"
            ],
            "Handled": true,
            "EventName": null
          },
          MortgageBank:{
            	"Result": "{\"code\":\"1\",\"msg\":\"发起成功\"}",
              "Data": [
                "My_Sales",
                "My_Sales_ContractAjBankChange",
                "868e961b-1afd-e911-80bb-005056a37afa",
                "<DATA xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\"><TITLE>旭辉绿地旭辉城全期（杭州）-绿地旭辉大厦-416陈启祥;王宁</TITLE><BUName>浙江事业部</BUName><BUCode>ZJSYB</BUCode><IsPartnerProj /><ProjectName>绿地旭辉城（杭州）-绿地旭辉城全期（杭州）【A201.00】</ProjectName><Sponsor>杨彦召</Sponsor><SponsorTime>2019-11-02</SponsorTime><CstName>陈启祥;王宁</CstName><Room>旭辉绿地旭辉城全期（杭州）-绿地旭辉大厦-416</Room><Adviser>张啸天</Adviser><SigningTime>2017-05-07</SigningTime><SigningArea>71.16</SigningArea><SumSigningTArea>1840000.00</SumSigningTArea><SigningPrice>25857.22</SigningPrice><IsDiscount>是</IsDiscount><DiscountInfo>0.99</DiscountInfo><ChangeReason>其他原因</ChangeReason><ChangeRemark>测试说明</ChangeRemark><ChangeClass>按揭银行变更</ChangeClass><ChangeType>按揭银行变更</ChangeType><OldBank /><NewBank>中国银行杭州庆春支行</NewBank><ProjectGUID>3539f081-9238-4ba1-9fa1-4e313274afc2</ProjectGUID><ATTACHMENTS /><KdBUCode>B-571B-003</KdBUCode><KdProjCode>A20130521010HZ</KdProjCode><FBpmProjectCode></FBpmProjectCode></DATA>",
                "",
                "yangmin"
              ],
              "Handled": true,
              "EventName": null
          },
          paymentMethod:{
            "Result": "{\"code\":\"1\",\"msg\":\"发起成功\"}",
            "Data": [
              "My_Sales",
              "My_Sales_PayFormChange",
              "53897677-1bfd-e911-80bb-005056a37afa",
              "<DATA xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\"><TITLE>旭辉绿地旭辉城全期（杭州）-绿地旭辉大厦-1510沈小飞</TITLE><BUName>浙江事业部</BUName><BUCode>ZJSYB</BUCode><IsPartnerProj /><ProjectName>绿地旭辉城（杭州）-绿地旭辉城全期（杭州）【A201.00】</ProjectName><Sponsor>杨彦召</Sponsor><SponsorTime>2019-11-02</SponsorTime><CstName>沈小飞</CstName><Room>旭辉绿地旭辉城全期（杭州）-绿地旭辉大厦-1510</Room><Adviser>赵锐晓</Adviser><SigningTime>2017-03-08</SigningTime><SigningArea>59.97</SigningArea><SumSigningAmount>1590000.00</SumSigningAmount><SigningPrice>26513.25</SigningPrice><IsDiscount>是</IsDiscount><DiscountInfo>0.90</DiscountInfo><ChangeReason>其他原因</ChangeReason><ChangeRemark>原因说明</ChangeRemark><ChangeClass>全款变按揭</ChangeClass><ChangeType>付款方式变更</ChangeType><OldPayType>一次性</OldPayType><NewPayType>分期付款</NewPayType><OldAjBank /><NewAjBank /><OldAjAmount>0.00</OldAjAmount><NewAjAmount>0.00</NewAjAmount><OldAjYears>0</OldAjYears><NewAjYears>0</NewAjYears><OldGjjBank /><NewGjjBank /><OldGjjAmount>0.00</OldGjjAmount><NewGjjAmount>0.00</NewGjjAmount><OldGjjYears>0</OldGjjYears><NewGjjYears>0</NewGjjYears><IsOldDiscount>是</IsOldDiscount><ProjectGUID>3539f081-9238-4ba1-9fa1-4e313274afc2</ProjectGUID><ATTACHMENTS /><KdBUCode>B-571B-003</KdBUCode><KdProjCode>A20130521010HZ</KdProjCode><FBpmProjectCode></FBpmProjectCode></DATA>",
              "",
              "yangmin"
            ],
            "Handled": true,
            "EventName": null
          },
          signingRearRenamed:{
            	"Result": "{\"code\":\"1\",\"msg\":\"发起成功\"}",
              "Data": [
                "My_Sales",
                "My_Sales_ContractOriginatorChanges",
                "bfec1800-befa-e911-80bb-005056a37afa",
                "<DATA xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\"><TITLE>旭辉绿地旭辉城全期（杭州）-2#-3单元-4002林逸君</TITLE><BName>浙江事业部</BName><BUCode>ZJSYB</BUCode><IsPartnerProj /><BGUID>8ffa344c-3699-e711-80bb-005056a27fb0</BGUID><ProjectFullName>绿地旭辉城（杭州）-绿地旭辉城全期（杭州）【A201.00】</ProjectFullName><UserName>杨彦召</UserName><ApplyDate>2019-10-30</ApplyDate><AlterType>直系亲属间更名</AlterType><CstName>林逸君</CstName><RoomInfo>旭辉绿地旭辉城全期（杭州）-2#-3单元-4002</RoomInfo><BldArea>87.69</BldArea><CjBldPrice>27889.12</CjBldPrice><CjRmbTotal>2445597.00</CjRmbTotal><QSDate>2015-12-31</QSDate><FkState>足额首付</FkState><GetAmount>2412966.00</GetAmount><DiscntRemark>总价优惠30100.00。</DiscntRemark><Zygw>熊苏樱</Zygw><ProjGUID>3539f081-9238-4ba1-9fa1-4e313274afc2</ProjGUID><AlterReason>更名-其他原因</AlterReason><OldName>林逸君 </OldName><NewName>林逸君 测试 </NewName><Reason>测试说明</Reason><ATTACHMENTS /><KdBUCode>B-571B-003</KdBUCode><KdProjCode>A20130521010HZ</KdProjCode><FBpmProjectCode></FBpmProjectCode></DATA>",
                "",
                "yangmin"
              ],
              "Handled": true,
              "EventName": null
          },
          offerRename:{
            "Result": "{\"code\":\"1\",\"msg\":\"发起成功\"}",
            "Data": [
              "My_Sales",
              "My_Sales_OrderOriginatorChanges",
              "359b81b3-1cfd-e911-80bb-005056a37afa",
              "<DATA xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\"><TITLE>旭辉绿地旭辉城（杭州）-旭辉绿地旭辉城全期（杭州）-地下车位-1单元-2-161陆毅</TITLE><BName>浙江事业部</BName><BUCode>ZJSYB</BUCode><IsPartnerProj /><BGUID>8ffa344c-3699-e711-80bb-005056a27fb0</BGUID><ProjectFullName>绿地旭辉城（杭州）-绿地旭辉城全期（杭州）【A201.00】</ProjectFullName><UserName>杨彦召</UserName><ApplyDate>2019-11-02</ApplyDate><AlterType>非直系亲属更名</AlterType><CstName>陆毅</CstName><RoomInfo>旭辉绿地旭辉城（杭州）-旭辉绿地旭辉城全期（杭州）-地下车位-1单元-2-161</RoomInfo><BldArea>10.00</BldArea><CjRmbTotal>225000.00</CjRmbTotal><CjBldPrice>22500.00</CjBldPrice><IsSetYgCjAmount>否</IsSetYgCjAmount><ZkInfo>1.00</ZkInfo><QSDate>2019-10-11</QSDate><Zygw>系统管理员</Zygw><ProjGUID>3539f081-9238-4ba1-9fa1-4e313274afc2</ProjGUID><AlterReason>其他原因</AlterReason><OldName>陆毅 </OldName><NewName>陆毅 浙江爱仕达电器股份有限公司 </NewName><Reason>更名为公司</Reason><ATTACHMENTS /><KdBUCode>B-571B-003</KdBUCode><KdProjCode>A20130521010HZ</KdProjCode><FBpmProjectCode></FBpmProjectCode></DATA>",
              "",
              "yangmin"
            ],
            "Handled": true,
            "EventName": null
          },
          offerDiscount:{
            "Result": "{\"code\":\"1\",\"msg\":\"发起成功\"}",
            "Data": [
              "My_Sales",
              "My_Sales_OrderPriceChanges",
              "177096da-1ffd-e911-80bb-005056a37afa",
              "<DATA xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\"><TITLE>旭辉绿地旭辉城（杭州）-旭辉绿地旭辉城全期（杭州）-地下车位-1单元-2-161陆毅</TITLE><BName>浙江事业部</BName><BUCode>ZJSYB</BUCode><IsPartnerProj /><BGUID>8ffa344c-3699-e711-80bb-005056a27fb0</BGUID><ProjectFullName>绿地旭辉城（杭州）-绿地旭辉城全期（杭州）【A201.00】</ProjectFullName><UserName>杨彦召</UserName><ApplyDate>2019-11-02</ApplyDate><CstName>陆毅</CstName><RoomInfo>旭辉绿地旭辉城（杭州）-旭辉绿地旭辉城全期（杭州）-地下车位-1单元-2-161</RoomInfo><CjRmbTotal>225000.00</CjRmbTotal><DjTotal>225000.00</DjTotal><BldArea>10.00</BldArea><CjBldPrice>22500.00</CjBldPrice><YqyDate>2019-10-17</YqyDate><Zygw>系统管理员</Zygw><ProjGUID>3539f081-9238-4ba1-9fa1-4e313274afc2</ProjGUID><AlterReason>其他原因</AlterReason><AfterRoomTotal>175000.00</AfterRoomTotal><Reason>原因说明</Reason><IsPd>是</IsPd><PdRate>22.22</PdRate><Pdzk>77.78%</Pdzk><PdAmount>50000.00</PdAmount><Pdj>175,000.00</Pdj><SpType>破底大于1%小于等于5%</SpType><ZkhPrice>17500.00</ZkhPrice><x_IsApplyPolicy>否</x_IsApplyPolicy><x_PolicyRangeText /><x_PolicyApplyNumber /><x_PolicyChgTotalNumber /><x_IsPolicyBreak /><x_PolicyType>1</x_PolicyType><AlterTypeDtl>非公开折扣</AlterTypeDtl><AlterType>认购非公开折扣</AlterType><OrderPriceChangesDtl><Item><DiscntName>车位优惠</DiscntName><AppScenariosEnum>公开折扣</AppScenariosEnum><CalMethodEnum>总价优惠</CalMethodEnum><DiscntValue>0.00</DiscntValue><PreferentialPrice>50000.00</PreferentialPrice></Item></OrderPriceChangesDtl><ATTACHMENTS /><KdBUCode>B-571B-003</KdBUCode><KdProjCode>A20130521010HZ</KdProjCode><FBpmProjectCode></FBpmProjectCode></DATA>",
              "",
              "yangmin"
            ],
            "Handled": true,
            "EventName": null
          },
          delaySigning:{
            "Result": "{\"code\":\"1\",\"msg\":\"发起成功\"}",
            "Data": [
              "My_Sales",
              "My_Sales_OrderDelaySign",
              "dfce9a5a-22fd-e911-80bb-005056a37afa",
              "<DATA xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\"><TITLE>旭辉绿地旭辉城（杭州）-旭辉绿地旭辉城全期（杭州）-地下车位-1单元-2-161陆毅</TITLE><CstName>陆毅</CstName><Room>旭辉绿地旭辉城（杭州）-旭辉绿地旭辉城全期（杭州）-地下车位-1单元-2-161</Room><OrderArea>10.00</OrderArea><SumOrderArea>225000.00</SumOrderArea><OrderPrice>22500.00</OrderPrice><IsDiscount>否</IsDiscount><DiscountInfo>1.00</DiscountInfo><OrderTime>2019-10-11</OrderTime><Adviser>系统管理员</Adviser><ProjectGUID>3539f081-9238-4ba1-9fa1-4e313274afc2</ProjectGUID><ChangeReason>其他原因</ChangeReason><IsKeepDiscount>是</IsKeepDiscount><SigningTime>2019-10-17</SigningTime><DelayDays>7</DelayDays><ApplySigningTime>2019-10-24</ApplySigningTime><ChangeRemark>原因说明</ChangeRemark><BUName>浙江事业部</BUName><BUCode>ZJSYB</BUCode><IsPartnerProj /><BUGUID>8ffa344c-3699-e711-80bb-005056a27fb0</BUGUID><ProjectName>绿地旭辉城（杭州）-绿地旭辉城全期（杭州）【A201.00】</ProjectName><Sponsor>杨彦召</Sponsor><SponsorTime>2019-11-02</SponsorTime><DelayType>30天以内</DelayType><ATTACHMENTS /><KdBUCode>B-571B-003</KdBUCode><KdProjCode>A20130521010HZ</KdProjCode><FBpmProjectCode></FBpmProjectCode></DATA>",
              "",
              "yangmin"
            ],
            "Handled": true,
            "EventName": null
          },
          offerChangeHouse:{
            "Result": "{\"code\":\"1\",\"msg\":\"发起成功\"}",
            "Data": [
              "My_Sales",
              "My_Sales_OrderHf",
              "fad8c3b6-22fd-e911-80bb-005056a37afa",
              "<DATA xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\"><TITLE>旭辉绿地旭辉城（杭州）-旭辉绿地旭辉城全期（杭州）-地下车位-1单元-2-235陆毅</TITLE><BName>浙江事业部</BName><BUCode>ZJSYB</BUCode><ProjectFullName>绿地旭辉城（杭州）-绿地旭辉城全期（杭州）【A201.00】</ProjectFullName><UserName>杨彦召</UserName><ApplyDate>2019-11-02</ApplyDate><CstName>陆毅</CstName><RoomInfo>旭辉绿地旭辉城（杭州）-旭辉绿地旭辉城全期（杭州）-地下车位-1单元-2-161</RoomInfo><BldArea>10.00</BldArea><CjRmbTotal>225000.00</CjRmbTotal><CjBldPrice>22500.00</CjBldPrice><QSDate>2019-10-11</QSDate><Zygw>系统管理员</Zygw><ProjGUID>3539f081-9238-4ba1-9fa1-4e313274afc2</ProjGUID><NewRoomInfo>旭辉绿地旭辉城（杭州）-旭辉绿地旭辉城全期（杭州）-地下车位-1单元-2-235</NewRoomInfo><NewBldArea>10.00</NewBldArea><NewCjBldPrice>20500.00</NewCjBldPrice><NewCjRmbTotal>205000.00</NewCjRmbTotal><AlterReason>其他原因</AlterReason><Reason>说明原因</Reason><IsPartnerProj /><HfAlterType>高总价换低总价</HfAlterType><AlterType>认购换房</AlterType><ATTACHMENTS /><KdBUCode>B-571B-003</KdBUCode><KdProjCode>A20130521010HZ</KdProjCode><FBpmProjectCode></FBpmProjectCode></DATA>",
              "",
              "yangmin"
            ],
            "Handled": true,
            "EventName": null
          },
          offerUnsubscribe:{
            "Result": "{\"code\":\"1\",\"msg\":\"发起成功\"}",
            "Data": [
              "My_Sales",
              "My_Sales_OrderTf",
              "ef1d5c12-23fd-e911-80bb-005056a37afa",
              "<DATA xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\"><TITLE>旭辉绿地旭辉城（杭州）-旭辉绿地旭辉城全期（杭州）-地下车位-1单元-2-161陆毅</TITLE><BName>浙江事业部</BName><BUCode>ZJSYB</BUCode><IsPartnerProj /><BGUID>8ffa344c-3699-e711-80bb-005056a27fb0</BGUID><ProjectFullName>绿地旭辉城（杭州）-绿地旭辉城全期（杭州）【A201.00】</ProjectFullName><UserName>杨彦召</UserName><ApplyDate>2019-11-02</ApplyDate><AlterType>非挞定</AlterType><CstName>陆毅</CstName><RoomInfo>旭辉绿地旭辉城（杭州）-旭辉绿地旭辉城全期（杭州）-地下车位-1单元-2-161</RoomInfo><BldArea>10.00</BldArea><CjRmbTotal>225000.00</CjRmbTotal><CjBldPrice>22500.00</CjBldPrice><IsSetYgCjAmount>否</IsSetYgCjAmount><ZkInfo>1.00</ZkInfo><QSDate>2019-10-11</QSDate><Zygw>系统管理员</Zygw><ProjGUID>3539f081-9238-4ba1-9fa1-4e313274afc2</ProjGUID><AlterReason>其他原因</AlterReason><GetAmount>0.00</GetAmount><HandCharge>10000.00</HandCharge><HandChargeRate>2.00</HandChargeRate><Reason>原因说明</Reason><ATTACHMENTS /><KdBUCode>B-571B-003</KdBUCode><KdProjCode>A20130521010HZ</KdProjCode><FBpmProjectCode></FBpmProjectCode></DATA>",
              "",
              "yangmin"
            ],
            "Handled": true,
            "EventName": null
          },
          offerInstallment:{
            "Result": "{\"code\":\"1\",\"msg\":\"发起成功\"}",
            "Data": [
              "My_Sales",
              "My_Sales_OrderFk",
              "444a3bbf-23fd-e911-80bb-005056a37afa",
              "<DATA xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\"><TITLE>旭辉绿地旭辉城（杭州）-旭辉绿地旭辉城全期（杭州）-地下车位-1单元-2-102首付分期俞昊辰</TITLE><BName>浙江事业部</BName><BUCode>ZJSYB</BUCode><IsPartnerProj /><ProjectFullName>绿地旭辉城（杭州）-绿地旭辉城全期（杭州）【A201.00】</ProjectFullName><UserName>杨彦召</UserName><ApplyDate>2019-11-02</ApplyDate><CstName>俞昊辰</CstName><RoomInfo>旭辉绿地旭辉城（杭州）-旭辉绿地旭辉城全期（杭州）-地下车位-1单元-2-102</RoomInfo><FkType>首付分期</FkType><AlterType>30天以上</AlterType><QSDate>2019-04-24</QSDate><CjRmbTotal>200000.00</CjRmbTotal><PublicYgCjAmount>15000.00</PublicYgCjAmount><YgCjAmount>150000.00</YgCjAmount><YqyDate>2019-04-30</YqyDate><Yjyhfd>50000.00</Yjyhfd><Zkds>25.00</Zkds><Zygw>赵锐晓</Zygw><Reason>原因</Reason><ProjGUID>3539f081-9238-4ba1-9fa1-4e313274afc2</ProjGUID><DtlCount>2</DtlCount><SumFkAmount>150000.00</SumFkAmount><FqNum>180</FqNum><x_IsApplyPolicy>否</x_IsApplyPolicy><x_PolicyRangeText /><x_PolicyApplyNumber /><x_PolicyChgTotalNumber /><x_IsPolicyBreak /><x_PolicyType>2</x_PolicyType><FkDetails><Item><IndexName>第1期</IndexName><FkDate>2019-10-02</FkDate><ItemName>楼款</ItemName><FkAmount>10000.00</FkAmount></Item><Item><IndexName>第2期</IndexName><FkDate>2019-10-27</FkDate><ItemName>楼款</ItemName><FkAmount>140000.00</FkAmount></Item></FkDetails><ATTACHMENTS /><KdBUCode>B-571B-003</KdBUCode><KdProjCode>A20130521010HZ</KdProjCode><FBpmProjectCode></FBpmProjectCode></DATA>",
              "",
              "yangmin"
            ],
            "Handled": true,
            "EventName": null

          },
          staffByHouse:{
            "Result": "{\"code\":\"1\",\"msg\":\"发起成功\"}",
            "Data": [
              "My_Sales",
              "My_Sales_EmployeeBuyChanges",
              "f4452f24-25fd-e911-80bb-005056a37afa",
              "<DATA xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\"><TITLE>运河悦章全期（杭州）-街道商铺-1单元-1822何广谦</TITLE><BName>浙江事业部</BName><BUCode>ZJSYB</BUCode><IsPartnerProj /><BGUID>8ffa344c-3699-e711-80bb-005056a27fb0</BGUID><ProjectFullName>运河悦章（杭州）-运河悦章全期（杭州）【A20130521011HZ.00】</ProjectFullName><UserName>杨彦召</UserName><ApplyDate>2019-11-02</ApplyDate><CstName>何广谦</CstName><RoomInfo>运河悦章全期（杭州）-街道商铺-1单元-1822</RoomInfo><CjRmbTotal>811325.00</CjRmbTotal><DjTotal>786985.00</DjTotal><BldArea>57.80</BldArea><CjBldPrice>14036.76</CjBldPrice><YqyDate>2019-03-28</YqyDate><Zygw>公共客户</Zygw><ProjGUID>e21734f7-7b99-4f84-be58-312ce75da099</ProjGUID><AlterReason>其他原因</AlterReason><AfterRoomTotal>786985.00</AfterRoomTotal><Reason>原因说明</Reason><IsPd>否</IsPd><PdRate>0.00</PdRate><Pdzk>97.00%</Pdzk><PdAmount>0.00</PdAmount><Pdj /><ZkhPrice>13615.66</ZkhPrice><x_IsApplyPolicy>否</x_IsApplyPolicy><x_PolicyRangeText /><x_PolicyApplyNumber /><x_PolicyChgTotalNumber /><x_IsPolicyBreak /><x_PolicyType>1</x_PolicyType><x_IsEmployeeBuyPolicy>是</x_IsEmployeeBuyPolicy><x_EmployeeName>李李</x_EmployeeName><x_EmployeeRanks>5</x_EmployeeRanks><x_EmployeeBuyerRelation>夫妻</x_EmployeeBuyerRelation><x_FistPayRate>10.00</x_FistPayRate><x_FirstPayMoney>81132.50</x_FirstPayMoney><x_FirstPayDate>2019-11-02</x_FirstPayDate><AlterTypeDtl>高管人员及其关联人购房</AlterTypeDtl><AlterType>认购员工购房</AlterType><PayFormName>一次性付款</PayFormName><SpType>普通员工购房</SpType><EmployeeBuyChangesDtl><Item><DiscntName>运河悦章商铺折扣</DiscntName><AppScenariosEnum>公开折扣</AppScenariosEnum><CalMethodEnum>打折</CalMethodEnum><DiscntValue>97.00</DiscntValue><PreferentialPrice>0.00</PreferentialPrice></Item></EmployeeBuyChangesDtl><ATTACHMENTS /><KdBUCode>B-571B-001</KdBUCode><KdProjCode>A20130521011HZ</KdProjCode><FBpmProjectCode></FBpmProjectCode></DATA>",
              "",
              "yangmin"
            ],
            "Handled": true,
            "EventName": null
          },
          yearReport:{
              "Result": null,
              "Data": [
                "MY_FYs",
                "MY_FYs_YsAdjustHt",
                "f80ff066-1610-ea11-80bc-20677cdc303c",
                "<?xml version=\"1.0\" encoding=\"utf-8\"?><DATA>    <Subject>中麓府项目物业费预算调整-合同口径</Subject>    <Adjuster>孔荣</Adjuster>    <AdjustDate>2019-11-26</AdjustDate>    <AdjustAmount>0.00</AdjustAmount>    <AdjustReason>济南事业部中麓府项目接访大使费用归属物业，占用费用导致合同口径物业费用不足，现根据费用需求对全年预算进行调剂，调剂后总预算不变：  &lt;br/&gt;1、  销售推广费-大众广告费科目合同口径11月调出0.6万，调剂后2019年度大众广告费合同口径预算73.10万;    &lt;br/&gt;2、  销售现场运营费-物业服务费科目合同口径11月调入0.6万，调剂后2019年度物业服务费合同口径预算190.51万。  &lt;br/&gt;  以上预算调剂后项目整体合同口径预算1847.35万，总预算保持不变。</AdjustReason>    <Year>2019</Year>    <BUName>山东旭辉银盛泰平台</BUName>    <AdjustInAmount>6000.00</AdjustInAmount>    <AdjustWay>单项目调整</AdjustWay>    <IsPartnerProj />    <BUCODE>QDSYB</BUCODE>    <YearBeginGoalRate>2.19</YearBeginGoalRate>    <YsAdjustRate>2.59</YsAdjustRate>    <YsAdjustCyRate>18.26</YsAdjustCyRate>    <IsCrossCityAdjust />    <AdjustInInfo>        <Item>            <AdjustInNum>1</AdjustInNum>            <AdjustInDept>中麓府（济南）</AdjustInDept>            <AdjustInProceed>日常费用</AdjustInProceed>            <AdjustInCost>销售现场运营费-物业费-物业服务费</AdjustInCost>            <AdjustInMonth>11</AdjustInMonth>            <AdjustInPlanAmount>0.00</AdjustInPlanAmount>            <AdjustInZxPlanAmount>0.00</AdjustInZxPlanAmount>            <AdjustInAmount>6000.00</AdjustInAmount>            <AdjustInAfterAmount>6000.00</AdjustInAfterAmount>            <AdjustInRemark />        </Item>    </AdjustInInfo>    <AdjustOutInfo>        <Item>            <AdjustOutNum>1</AdjustOutNum>            <AdjustOutDept>中麓府（济南）</AdjustOutDept>            <AdjustOutProceed>日常费用</AdjustOutProceed>            <AdjustOutCost>销售推广费-大众广告费-互联网广告费</AdjustOutCost>            <AdjustOutMonth>11</AdjustOutMonth>            <AdjustOutPlanAmount>80000.00</AdjustOutPlanAmount>            <AdjustOutZxPlanAmount>0.00</AdjustOutZxPlanAmount>            <AdjustOutAmount>-6000.00</AdjustOutAmount>            <AdjustOutAfterAmount>74000.00</AdjustOutAfterAmount>            <AdjustOutRemark />        </Item>    </AdjustOutInfo>    <DeptAdjustDtlInfo>        <Item>            <TNum>1</TNum>            <YsProjName>中麓府（济南）</YsProjName>            <CostName>销售现场运营费</CostName>            <Month>11</Month>            <OldMonthPlanAmount>0.00</OldMonthPlanAmount>            <AdjustMonthPlanAmount>6000.00</AdjustMonthPlanAmount>            <NewMonthPlanAmount>6000.00</NewMonthPlanAmount>            <PlanAdjustRemark>#x20;</PlanAdjustRemark>            <OldYearPlanAmount>1899066.59</OldYearPlanAmount>            <NewYearPlanAmount>1905066.59</NewYearPlanAmount>        </Item>        <Item>            <TNum>2</TNum>            <YsProjName>中麓府（济南）</YsProjName>            <CostName>销售推广费</CostName>            <Month>11</Month>            <OldMonthPlanAmount>40000.00</OldMonthPlanAmount>            <AdjustMonthPlanAmount>-6000.00</AdjustMonthPlanAmount>            <NewMonthPlanAmount>34000.00</NewMonthPlanAmount>            <PlanAdjustRemark>#x20;</PlanAdjustRemark>            <OldYearPlanAmount>3073835.00</OldYearPlanAmount>            <NewYearPlanAmount>3067835.00</NewYearPlanAmount>        </Item>    </DeptAdjustDtlInfo>    <ATTACHMENTS>        <Item>            <FILENUMBER>5b375179-1610-ea11-80bc-20677cdc303c</FILENUMBER>            <FILENAME>中麓府2019年半年预算上线版.xlsx</FILENAME>            <FILESIZE>0</FILESIZE>            <URL>http://sales.cifi.com.cn:9020/UpFiles/201911/中麓府2019年半年预算上线版2019_11_26(14_32_12_42)233784576.xlsx</URL>        </Item>    </ATTACHMENTS></DATA>",
                "",
                "lijingc"
              ],
              "Handled": true,
              "EventName": null
          },
          costExamineLegal:{
              "Result": null,
              "Data": [
                "MY_FYs",
                "MY_FYs_YsAdjustHt",
                "f80ff066-1610-ea11-80bc-20677cdc303c",
                "<?xml version=\"1.0\" encoding=\"utf-8\"?><DATA>    <Subject>中麓府项目物业费预算调整-合同口径</Subject>    <Adjuster>孔荣</Adjuster>    <AdjustDate>2019-11-26</AdjustDate>    <AdjustAmount>0.00</AdjustAmount>    <AdjustReason>济南事业部中麓府项目接访大使费用归属物业，占用费用导致合同口径物业费用不足，现根据费用需求对全年预算进行调剂，调剂后总预算不变：  &lt;br/&gt;1、  销售推广费-大众广告费科目合同口径11月调出0.6万，调剂后2019年度大众广告费合同口径预算73.10万;    &lt;br/&gt;2、  销售现场运营费-物业服务费科目合同口径11月调入0.6万，调剂后2019年度物业服务费合同口径预算190.51万。  &lt;br/&gt;  以上预算调剂后项目整体合同口径预算1847.35万，总预算保持不变。</AdjustReason>    <Year>2019</Year>    <BUName>山东旭辉银盛泰平台</BUName>    <AdjustInAmount>6000.00</AdjustInAmount>    <AdjustWay>单项目调整</AdjustWay>    <IsPartnerProj />    <BUCODE>QDSYB</BUCODE>    <YearBeginGoalRate>2.19</YearBeginGoalRate>    <YsAdjustRate>2.59</YsAdjustRate>    <YsAdjustCyRate>18.26</YsAdjustCyRate>    <IsCrossCityAdjust />    <AdjustInInfo>        <Item>            <AdjustInNum>1</AdjustInNum>            <AdjustInDept>中麓府（济南）</AdjustInDept>            <AdjustInProceed>日常费用</AdjustInProceed>            <AdjustInCost>销售现场运营费-物业费-物业服务费</AdjustInCost>            <AdjustInMonth>11</AdjustInMonth>            <AdjustInPlanAmount>0.00</AdjustInPlanAmount>            <AdjustInZxPlanAmount>0.00</AdjustInZxPlanAmount>            <AdjustInAmount>6000.00</AdjustInAmount>            <AdjustInAfterAmount>6000.00</AdjustInAfterAmount>            <AdjustInRemark />        </Item>    </AdjustInInfo>    <AdjustOutInfo>        <Item>            <AdjustOutNum>1</AdjustOutNum>            <AdjustOutDept>中麓府（济南）</AdjustOutDept>            <AdjustOutProceed>日常费用</AdjustOutProceed>            <AdjustOutCost>销售推广费-大众广告费-互联网广告费</AdjustOutCost>            <AdjustOutMonth>11</AdjustOutMonth>            <AdjustOutPlanAmount>80000.00</AdjustOutPlanAmount>            <AdjustOutZxPlanAmount>0.00</AdjustOutZxPlanAmount>            <AdjustOutAmount>-6000.00</AdjustOutAmount>            <AdjustOutAfterAmount>74000.00</AdjustOutAfterAmount>            <AdjustOutRemark />        </Item>    </AdjustOutInfo>    <DeptAdjustDtlInfo>        <Item>            <TNum>1</TNum>            <YsProjName>中麓府（济南）</YsProjName>            <CostName>销售现场运营费</CostName>            <Month>11</Month>            <OldMonthPlanAmount>0.00</OldMonthPlanAmount>            <AdjustMonthPlanAmount>6000.00</AdjustMonthPlanAmount>            <NewMonthPlanAmount>6000.00</NewMonthPlanAmount>            <PlanAdjustRemark>#x20;</PlanAdjustRemark>            <OldYearPlanAmount>1899066.59</OldYearPlanAmount>            <NewYearPlanAmount>1905066.59</NewYearPlanAmount>        </Item>        <Item>            <TNum>2</TNum>            <YsProjName>中麓府（济南）</YsProjName>            <CostName>销售推广费</CostName>            <Month>11</Month>            <OldMonthPlanAmount>40000.00</OldMonthPlanAmount>            <AdjustMonthPlanAmount>-6000.00</AdjustMonthPlanAmount>            <NewMonthPlanAmount>34000.00</NewMonthPlanAmount>            <PlanAdjustRemark>#x20;</PlanAdjustRemark>            <OldYearPlanAmount>3073835.00</OldYearPlanAmount>            <NewYearPlanAmount>3067835.00</NewYearPlanAmount>        </Item>    </DeptAdjustDtlInfo>    <ATTACHMENTS>        <Item>            <FILENUMBER>5b375179-1610-ea11-80bc-20677cdc303c</FILENUMBER>            <FILENAME>中麓府2019年半年预算上线版.xlsx</FILENAME>            <FILESIZE>0</FILESIZE>            <URL>http://sales.cifi.com.cn:9020/UpFiles/201911/中麓府2019年半年预算上线版2019_11_26(14_32_12_42)233784576.xlsx</URL>        </Item>    </ATTACHMENTS></DATA>",
                "",
                "lijingc"
              ],
              "Handled": true,
              "EventName": null
          },
          yearPay:  {
              "Result": null,
              "Data": [
                "MY_FYs",
                "MY_FYs_YsAdjustPay",
                "fb0cb102-e410-ea11-80bc-20677cdc303c",
                "<?xml version=\"1.0\" encoding=\"utf-8\"?><DATA>    <Subject>0</Subject>    <Adjuster>龚四玲</Adjuster>    <AdjustDate>2019-11-27</AdjustDate>    <AdjustAmount>0.00</AdjustAmount>    <AdjustReason>0</AdjustReason>    <Year>2019</Year>    <BUName>长沙事业部</BUName>    <AdjustInAmount>100000.00</AdjustInAmount>    <AdjustWay>同科目跨项目调整（股权比例不变，或从股权高至股权低）</AdjustWay>    <IsPartnerProj />    <BUCODE>CSSYB</BUCODE>    <YearBeginGoalRate>2.21</YearBeginGoalRate>    <YsAdjustRate>2.21</YsAdjustRate>    <YsAdjustCyRate>0.00</YsAdjustCyRate>    <AdjustInInfo>        <Item>            <AdjustInNum>1</AdjustInNum>            <AdjustInDept>都会山（长沙）</AdjustInDept>            <AdjustInProceed>日常费用</AdjustInProceed>            <AdjustInCost>营销类日常管理费-职工薪酬（非渠道专员）-固薪</AdjustInCost>            <AdjustInMonth>11</AdjustInMonth>            <AdjustInPlanAmount>0.00</AdjustInPlanAmount>            <AdjustInZxPlanAmount>0.00</AdjustInZxPlanAmount>            <AdjustInAmount>100000.00</AdjustInAmount>            <AdjustInAfterAmount>100000.00</AdjustInAfterAmount>            <AdjustInRemark />        </Item>    </AdjustInInfo>    <AdjustOutInfo>        <Item>            <AdjustOutNum>1</AdjustOutNum>            <AdjustOutDept>都会山（长沙）</AdjustOutDept>            <AdjustOutProceed>日常费用</AdjustOutProceed>            <AdjustOutCost>营销类日常管理费-职工薪酬（非渠道专员）-固薪</AdjustOutCost>            <AdjustOutMonth>10</AdjustOutMonth>            <AdjustOutPlanAmount>1200000.00</AdjustOutPlanAmount>            <AdjustOutZxPlanAmount>0.00</AdjustOutZxPlanAmount>            <AdjustOutAmount>-100000.00</AdjustOutAmount>            <AdjustOutAfterAmount>1100000.00</AdjustOutAfterAmount>            <AdjustOutRemark />        </Item>    </AdjustOutInfo>    <DeptAdjustDtlInfo>        <Item>            <TNum>1</TNum>            <YsProjName>都会山（长沙）</YsProjName>            <CostName>营销类日常管理费</CostName>            <Month>10</Month>            <OldMonthPlanAmount>156353.57</OldMonthPlanAmount>            <AdjustMonthPlanAmount>-100000.00</AdjustMonthPlanAmount>            <NewMonthPlanAmount>56353.57</NewMonthPlanAmount>            <PlanAdjustRemark>#x20;</PlanAdjustRemark>            <OldYearPlanAmount>226908.16</OldYearPlanAmount>            <NewYearPlanAmount>126908.16</NewYearPlanAmount>        </Item>        <Item>            <TNum>2</TNum>            <YsProjName>都会山（长沙）</YsProjName>            <CostName>营销类日常管理费</CostName>            <Month>11</Month>            <OldMonthPlanAmount>70554.59</OldMonthPlanAmount>            <AdjustMonthPlanAmount>100000.00</AdjustMonthPlanAmount>            <NewMonthPlanAmount>170554.59</NewMonthPlanAmount>            <PlanAdjustRemark>#x20;</PlanAdjustRemark>            <OldYearPlanAmount>226908.16</OldYearPlanAmount>            <NewYearPlanAmount>326908.16</NewYearPlanAmount>        </Item>    </DeptAdjustDtlInfo>    <ATTACHMENTS /></DATA>",
                "",
                "lijingc"
              ],
              "Handled": true,
              "EventName": null
            },
          costEntering:{
            "Result": null,
            "Data": [
              "MY_FYs",
              "MY_FYs_OtherFee",
              "6dc6cb9d-3610-ea11-80bc-20677cdc303c",
              "<DATA><TITLE>壹号院（江门）珠海怡生乐居信息科技有限公司</TITLE><OtherCostFeeApproveGUID>6dc6cb9d-3610-ea11-80bc-20677cdc303c</OtherCostFeeApproveGUID><DsNames>珠海怡生乐居信息科技有限公司</DsNames><YwDate>2019-11-26</YwDate><DSAmount>20000.00</DSAmount><DSInAmount>18400.00</DSInAmount><UserName>吴子城</UserName><DeptName>深圳江门壹号院</DeptName><JbDate>2019-11-26</JbDate><ApproveType>已退房</ApproveType><ProjGUID>33d7f542-88aa-e811-80bb-005056a21b76</ProjGUID><ProjName>壹号院（江门）</ProjName><BUGUID>7cd98cd5-fc92-e711-80b9-005056a21b76</BUGUID><BUName>深圳事业部</BUName><IsPartnerProj /><BUCODE>SZSYB</BUCODE><DSManageFee>1600.00</DSManageFee><OtherFeeDtl><Item><OtherCostFeeGUID>ac87b16c-7bdf-e911-80bc-20677cdc303c</OtherCostFeeGUID><ApproveState>已审核</ApproveState><ApproveByName>苏琼珍</ApproveByName><ApproveDate>2019-11-12</ApproveDate><strMonth>9</strMonth><DSName>珠海怡生乐居信息科技有限公司</DSName><DSAmount>20000.00</DSAmount><DSInAmount>18400.00</DSInAmount><JbrByName>吴子城</JbrByName><JbDate>2019-09-25</JbDate><SpState>已签约</SpState><DSManageFee>1600.00</DSManageFee><RoomInfo>壹号院（江门）-壹号院三期（江门）-66-67#-66#01-1201</RoomInfo></Item></OtherFeeDtl><ATTACHMENTS /><KdBUCode>B-755B-005</KdBUCode><KdProjCode>A20150630015BJ</KdProjCode><FBpmProjectCode></FBpmProjectCode></DATA>",
              "",
              "lijingc"
            ],
            "Handled": true,
            "EventName": null
          },
          businessIncome:{
            "Result": null,
            "Data": [
              "MY_FYs",
              "MY_FYs_YsAdjustOtherFee",
              "05de4835-5b12-ea11-80bc-20677cdc303c",
              "<?xml version=\"1.0\" encoding=\"utf-8\"?><DATA>    <TITLE>测试2</TITLE>    <Subject>测试2</Subject>    <Adjuster>系统管理员</Adjuster>    <AdjustDate>2019-11-29</AdjustDate>    <AdjustReason>测试2</AdjustReason>    <BUName>皖赣区域集团</BUName>    <IsPartnerProj />    <BUCODE>hfsyb</BUCODE>    <OtherFeeAdjustDtl>        <Item>            <Dept2DeptAdjustDtlGUID>6087a642-5b12-ea11-80bc-20677cdc303c</Dept2DeptAdjustDtlGUID>            <YsProjName>宸悦江语院（南昌）</YsProjName>            <PlanAmount>0.00</PlanAmount>            <AdjustAmount>10.00</AdjustAmount>            <AdjustedAmount>10.00</AdjustedAmount>            <Remarks />        </Item>        <Item>            <Dept2DeptAdjustDtlGUID>6187a642-5b12-ea11-80bc-20677cdc303c</Dept2DeptAdjustDtlGUID>            <YsProjName>陶冲湖别院（合肥）</YsProjName>            <PlanAmount>358455.90</PlanAmount>            <AdjustAmount>-10.00</AdjustAmount>            <AdjustedAmount>358445.90</AdjustedAmount>            <Remarks />        </Item>    </OtherFeeAdjustDtl>    <ATTACHMENTS /></DATA>",
              "",
              "lijingc"
            ],
            "Handled": true,
            "EventName": null
          },
          businessPayment:{
            "Result": null,
            "Data": [
              "MY_FYs",
              "MY_FYs_OtherFee",
              "70c891d1-7312-ea11-80bc-20677cdc303c",
              "<DATA><TITLE>旭辉26街区（北京）旭辉26街区10万减20万</TITLE><OtherCostFeeApproveGUID>70c891d1-7312-ea11-80bc-20677cdc303c</OtherCostFeeApproveGUID><DsNames>旭辉26街区10万减20万</DsNames><YwDate>2019-11-29</YwDate><DSAmount>100000.00</DSAmount><DSInAmount>92000.00</DSInAmount><UserName>马桂婷</UserName><DeptName>旭辉26街区</DeptName><JbDate>2019-11-29</JbDate><ApproveType>已签约</ApproveType><ProjGUID>c447ab6e-d082-42d8-9ace-94e91af009ed</ProjGUID><ProjName>旭辉26街区（北京）</ProjName><BUGUID>1d6a9ddb-04be-e711-80bb-005056a27fb0</BUGUID><BUName>北京事业部</BUName><IsPartnerProj /><BUCODE>BJSYB</BUCODE><DSManageFee>8000.00</DSManageFee><OtherFeeDtl><Item><OtherCostFeeGUID>65529e48-c811-ea11-80bc-20677cdc303c</OtherCostFeeGUID><ApproveState>已审核</ApproveState><ApproveByName>张智华</ApproveByName><ApproveDate>2019-11-29</ApproveDate><strMonth>11</strMonth><DSName>旭辉26街区10万减20万</DSName><DSAmount>100000.00</DSAmount><DSInAmount>92000.00</DSInAmount><JbrByName>马桂婷</JbrByName><JbDate>2019-11-28</JbDate><SpState>未审批</SpState><DSManageFee>8000.00</DSManageFee><RoomInfo>旭辉26街区四期（北京）-11#底商-112</RoomInfo></Item></OtherFeeDtl><ATTACHMENTS /><KdBUCode>B-010B-019</KdBUCode><KdProjCode>A20150630015BJ</KdProjCode><FBpmProjectCode></FBpmProjectCode></DATA>",
              "",
              "lijingc"
            ],
            "Handled": true,
            "EventName": null
          },
          costPay:{
            "Result": null,
            "Data": [
              "MY_FYs",
              "MY_FYs_HTFKSP",
              "8a371127-6f0e-ea11-80bc-20677cdc303c",
              "<DATA><TITLE>湖山赋（长沙）湖山赋8月房天下广告投放付款</TITLE><Subject>湖山赋8月房天下广告投放付款</Subject><ApplyCode>CSFK20191124001</ApplyCode><ApplyDate>2019-11-28</ApplyDate><ContractCode>CSHT20190815002</ContractCode><ContractName>湖山赋8月房天下广告投放</ContractName><HtAmount>150000.00</HtAmount><HtAmountDX>壹拾伍万元整</HtAmountDX><FundType>销售推广类</FundType><FundName>销售推广类</FundName><PayProviderName>长沙恒高房地产开发有限公司</PayProviderName><ReceiveProviderName>北京怡然居客科技发展有限公司长沙分公司</ReceiveProviderName><BankName /><ApplyType>计划内</ApplyType><ApplyAmount>150000.00</ApplyAmount><ApplyAmount_Bz>150000.00</ApplyAmount_Bz><DfdkAmount>0.00</DfdkAmount><YfAmount>150000.00</YfAmount><YfAmountDX>壹拾伍万元整</YfAmountDX><BankAccounts /><HtAmount_Bz>150000.00</HtAmount_Bz><YfWfAmount>0.00</YfWfAmount><SumPayAmount>0.00</SumPayAmount><SumPayAmountDX>零</SumPayAmountDX><PayAmountRate>0.00</PayAmountRate><JsBxAmount>0.00</JsBxAmount><AppliedByName>江思思</AppliedByName><DeptName>湖山赋项目</DeptName><BalanceAmount>0.00</BalanceAmount><JsAmount>0.00</JsAmount><SumScheduleAmount>0.00</SumScheduleAmount><SumScheduleAmountDX>零</SumScheduleAmountDX><SumApplyAmount>0.00</SumApplyAmount><MonthContractRemainAmount>0.00</MonthContractRemainAmount><ScheduleConsultAmount>150000.00</ScheduleConsultAmount><MonthContractPlanAmount>0.00</MonthContractPlanAmount><MonthContractSPAmount>0.00</MonthContractSPAmount><MonthContractApplyAmount>0.00</MonthContractApplyAmount><MonthPersonPlanAmount>0.00</MonthPersonPlanAmount><MonthPersonSpAmount>0.00</MonthPersonSpAmount><MonthPersonApplyAmount>0.00</MonthPersonApplyAmount><MonthPersonRemainAmount>0.00</MonthPersonRemainAmount><MonthDeptPlanAmount>0.00</MonthDeptPlanAmount><MonthDeptSpAmount>0.00</MonthDeptSpAmount><MonthDeptApplyAmount>0.00</MonthDeptApplyAmount><MonthDeptRemainAmount>0.00</MonthDeptRemainAmount><ApplyRemarks>验收合格，申请付款。</ApplyRemarks><HTFKApplyGUID>8a371127-6f0e-ea11-80bc-20677cdc303c</HTFKApplyGUID><FKBUName>长沙事业部</FKBUName><IsSpecialFlow>0</IsSpecialFlow><IsSpeedEqualHT /><CurrencyName>人民币</CurrencyName><Rate>1.00</Rate><SumPayAmountBz>0.00</SumPayAmountBz><JsAmount_Bz>0.00</JsAmount_Bz><MinGHYL>0.00</MinGHYL><YfWfAmountBz>0.00</YfWfAmountBz><SumWfAmount>150000.00</SumWfAmount><SumWfAmountBz>0.00</SumWfAmountBz><SumHtAmount_Bz>150000.00</SumHtAmount_Bz><HYGH /><ZJKM /><IsExecution>0</IsExecution><BusinessOrderGUID>8a371127-6f0e-ea11-80bc-20677cdc303c</BusinessOrderGUID><ProjectGUID>647f5e31-3f94-e711-80b9-005056a21b76</ProjectGUID><ProjName>湖山赋（长沙）</ProjName><BUGUID>c2867da4-fb91-e711-80bb-005056a27fb0</BUGUID><BUName>长沙事业部</BUName><ReceiveUserGUID /><UserName /><IsUseOtherFee>否</IsUseOtherFee><IsCwCp>是</IsCwCp><IsZjApply>否</IsZjApply><AgencyRoomInfo /><AgencyPercent /><AgencyAmount /><BxLx /><IsPartnerProj /><PayTypeName>建行银企互联（付款）</PayTypeName><BUCODE>CSSYB</BUCODE><ContractLinkUrl>http://sales.cifi.com.cn:9020/Product/Interface/SSO/Login.aspx?Password=4076F862096D1536B6CAC6866E386685&amp;PageUrl=http%3a%2f%2fsales.cifi.com.cn%3a9020%2fFygl%2fHTDL%2fContract_Edit.aspx%3fmode%3d3%26MoudleName%3d%e4%bb%98%e6%ac%be%e4%bf%a1%e6%81%af%26funcid%3d02060303%26oid%3dec2e5d38-22bf-e911-80bb-20677cdc303c</ContractLinkUrl><YwLx /><BudgetList /><StockCostList /><DeptCostList><Item><ZrrName>江思思</ZrrName><DeptName>2019年-湖山赋（长沙）</DeptName><DeptCostName>销售推广费-大众广告费-互联网广告费(C.01.01.05)</DeptCostName><ProceedingName>日常费用</ProceedingName><FtAmount>150000.00</FtAmount><DeptCostUseDtlGUID>40716133-d511-ea11-80bc-20677cdc303c</DeptCostUseDtlGUID><YsProjGUID>d420df46-ade0-e811-80bf-005056a24f09</YsProjGUID><CostGUID>f25217cf-ecdf-e811-80bf-005056a24f09</CostGUID><JkCostName>网络媒体广告</JkCostName><JkCostCode>6601.01.04</JkCostCode></Item></DeptCostList><HTFKApplyList /><ExecutionInfo /><TaxList /><AgencyRoomList /><ATTACHMENTS><Item><FILENUMBER>05d07b7b-700e-ea11-80bc-20677cdc303c</FILENUMBER><FILENAME>房天下8月合同.pdf</FILENAME><FILESIZE>0</FILESIZE><URL>http://sales.cifi.com.cn:9020/UpFiles/201911/房天下8月合同2019_11_24(12_11_33_91)97394304.pdf</URL></Item><Item><FILENUMBER>5826f7a9-d411-ea11-80bc-20677cdc303c</FILENUMBER><FILENAME>发票（8月10月合开30万）.jpg</FILENAME><FILESIZE>0</FILESIZE><URL>http://sales.cifi.com.cn:9020/UpFiles/201911/发票（8月10月合开30万）2019_11_28(19_46_14_50)1536207232.jpg</URL></Item><Item><FILENUMBER>5a26f7a9-d411-ea11-80bc-20677cdc303c</FILENUMBER><FILENAME>8月验收报告.pdf</FILENAME><FILESIZE>0</FILESIZE><URL>http://sales.cifi.com.cn:9020/UpFiles/201911/8月验收报告2019_11_28(19_46_15_75)973056384.pdf</URL></Item><Item><FILENUMBER>5b26f7a9-d411-ea11-80bc-20677cdc303c</FILENUMBER><FILENAME>房天下8月合同.pdf</FILENAME><FILESIZE>0</FILESIZE><URL>http://sales.cifi.com.cn:9020/UpFiles/201911/房天下8月合同2019_11_28(19_46_18_00)1152933120.pdf</URL></Item><Item><FILENUMBER>478095d2-d411-ea11-80bc-20677cdc303c</FILENUMBER><FILENAME>长沙房天下2019.8服务报告.doc</FILENAME><FILESIZE>0</FILESIZE><URL>http://sales.cifi.com.cn:9020/UpFiles/201911/长沙房天下2019.8服务报告2019_11_28(19_47_17_47)542532864.doc</URL></Item></ATTACHMENTS><KdBUCode>B-731B-011</KdBUCode><KdProjCode>A20150630015BJ</KdProjCode><FBpmProjectCode></FBpmProjectCode></DATA>",
              "",
              "lijingc"
            ],
            "Handled": true,
            "EventName": null
          },
          costExamine:{
            "Result": null,
            "Data": [
              "MY_FYs",
              "MY_FYs_CONTRACTSP",
              "2f74fb18-d111-ea11-80bc-20677cdc303c",
              "<DATA><TITLE>M-city（嘉兴）姚庄梦想城万国美食节活动-立项</TITLE><ContractCode>SHHT20191128003</ContractCode><ContractName>姚庄梦想城万国美食节活动-立项</ContractName><HtTypeName>营销合同-销售推广类</HtTypeName><HtKind>其他类</HtKind><CurrencyName>人民币</CurrencyName><Rate>1.00</Rate><HtClass>预计合同</HtClass><TotalAmount>157500.00</TotalAmount><TotalAmountDx>壹拾伍万柒仟伍佰元整</TotalAmountDx><HtAmount_Bz>157500.00</HtAmount_Bz><InputTaxAmount_Bz>0.00</InputTaxAmount_Bz><ExcludingTaxHtAmount_Bz>0.00</ExcludingTaxHtAmount_Bz><AverageTaxRate>0.00</AverageTaxRate><HtAmount_BzDx>壹拾伍万柒仟伍佰元整</HtAmount_BzDx><HtAmount>157500.00</HtAmount><HtAmountDx>壹拾伍万柒仟伍佰元整</HtAmountDx><SignDate>2019-11-28</SignDate><Jbr>高磊</Jbr><DeptName>M-city项目（梦想城）</DeptName><HtProperty>直接合同</HtProperty><JfProviderName>嘉善盛诚置业有限公司</JfProviderName><JfCorporation>方轶群</JfCorporation><YfProviderName>上海谷尼广告有限公司</YfProviderName><YfCorporation>周晓川</YfCorporation><BfProviderName /><BfCorporation /><ProjectNameList /><SignMode>招标</SignMode><CostProperty>完全确定</CostProperty><MainContractName /><BeginDate /><EndDate /><WorkPeriod>0</WorkPeriod><BxAmount>0.00</BxAmount><BxAmountDx>零</BxAmountDx><BxLimit /><PerformBail>0.00</PerformBail><PerformBailDx>零</PerformBailDx><ContractBound /><PayMode /><QualityRequest /><BXAssumpsit /><BreachRemarks /><ProjType>无项目</ProjType><ContractGUID>2f74fb18-d111-ea11-80bc-20677cdc303c</ContractGUID><YwdGUID>2f74fb18-d111-ea11-80bc-20677cdc303c</YwdGUID><TermRemarks /><CgPlanName /><LandRemarks /><LandSource /><LandUseLimit /><LandProperty /><LandUse /><TechnicRemarks /><PerformRemarks /><RewardRemarks /><BuildArea>0.00</BuildArea><EffectsLayoutSpare>0.00</EffectsLayoutSpare><Fktj /><Hygh /><Zjkm /><Bmfy /><ApplyGUID>f5b01c8d-11b0-11ea-80be-005056a21b76</ApplyGUID><ApplySubject>姚庄梦想城万国美食节活动-立项</ApplySubject><ApplyDate>2019-11-28</ApplyDate><ApplyAmount>157500.00</ApplyAmount><ProjGUID>8567ebca-ffd8-e711-80bb-005056a27fb0</ProjGUID><ProjName>M-city（嘉兴）</ProjName><BUGUID>dd15a61d-d3b1-e711-80b9-005056a21b76</BUGUID><BUName>上海区域集团</BUName><YfUserGUID /><UserName /><IsUseOtherFee>否</IsUseOtherFee><PlanMode>单项采购</PlanMode><IsPartnerProj /><IsUseBZContract>是</IsUseBZContract><IsLinkTrade>否</IsLinkTrade><IsChangePlanWay>否</IsChangePlanWay><BUCODE>SHSYB</BUCODE><ApplyLinkUrl>http://sales.cifi.com.cn:9020/Product/Interface/SSO/Login.aspx?Password=4076F862096D1536B6CAC6866E386685&amp;PageUrl=http%3a%2f%2fsales.cifi.com.cn%3a9020%2ffygl%2fApply%2fApply_Edit.aspx%3fmode%3d3%26viewtype%3dworkflow%26view%3dreadonly%26funcid%3d02060312%26oid%3df5b01c8d-11b0-11ea-80be-005056a21b76</ApplyLinkUrl><YwLx /><DeptInfo><Item><Zrrname>高磊</Zrrname><Deptname>2019年-M-city（嘉兴）</Deptname><CostFullName>销售推广费-活动费-销售活动费(C.01.03.01)</CostFullName><Budgetamount>157500.00</Budgetamount><ProceedingName>日常费用</ProceedingName><DeptCost2ContractGUID>3174fb18-d111-ea11-80bc-20677cdc303c</DeptCost2ContractGUID></Item></DeptInfo><StockInfo /><ContractBudgeInfo /><PayInfo><Item><RowNum>1</RowNum><FKType>销售推广类</FKType><FKRate>1.00</FKRate><FKAmount>157500.00</FKAmount><FKCondition /><FkDate>2019-12-31</FkDate><HTFKConditionGUID>ea450f73-d211-ea11-80bc-20677cdc303c</HTFKConditionGUID></Item></PayInfo><AmountInfo /><ATTACHMENTS><Item><FILENUMBER>c87766a7-d211-ea11-80bc-20677cdc303c</FILENUMBER><FILENAME>合同-梦想城万国美食节合同.docx</FILENAME><FILESIZE>0</FILESIZE><URL>http://sales.cifi.com.cn:9020/UpFiles/201911/合同登记2019_11_28(19_31_50_95)1503265152.docx</URL></Item></ATTACHMENTS><KdBUCode>B-021B-080</KdBUCode><KdProjCode>A20150630015BJ</KdProjCode><FBpmProjectCode></FBpmProjectCode></DATA>",
              "",
              "lijingc"
            ],
            "Handled": true,
            "EventName": null
          }

        }
      };
    },
    methods: {
      handleChange(val) {
        console.log(val);
      },
      toMode(link){
        this.$router.push("/"+link)
      },
      startCheck(link){
        if(!this.startDataList[link]){
          this.$message.error("该审批暂不支持模拟发起")
        }else{
          let data=this.startDataList[link]
           sendJSON("/api/public/writedatatobpm", data).then(res => {
           if(res.code==200){
                  get(`/Workflow/MTStart2.aspx?BSID=My_Sales&BTID=${res.Data[1]}&BOID=${res.Data[2]}&UserID=${res.Data[5]}&LoginKey=${res.Data[4]}`).then(res=>{
                    if(res.code==200||res.result.code==200){
                      window.top.location.href=res.data||res.result.data;
                    }
                    else{
                      this.$message.error(res.messages||res.result.messages);
                    }
            })
          }else if(res.code==0){
            this.$message.error("发起失败")
          }
        })
        }
        // console.log(this.startDataList[link]);
        // return
        // let data = {
        //   "Result": "{\"code\":\"1\",\"msg\":\"发起成功\"}",
        //   "Data": ["My_Sales", "My_Sales_EmployeeBuyChanges", "f4452f24-25fd-e911-80bb-005056a37afa",
        //     `<DATA xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\"><TITLE>运河悦章全期（杭州）-街道商铺-1单元-1822何广谦</TITLE><BName>浙江事业部</BName><BUCode>ZJSYB</BUCode><IsPartnerProj /><BGUID>8ffa344c-3699-e711-80bb-005056a27fb0</BGUID><ProjectFullName>运河悦章（杭州）-运河悦章全期（杭州）【A20130521011HZ.00】</ProjectFullName><UserName>杨彦召</UserName><ApplyDate>2019-11-02</ApplyDate><CstName>何广谦</CstName><RoomInfo>运河悦章全期（杭州）-街道商铺-1单元-1822</RoomInfo><CjRmbTotal>811325.00</CjRmbTotal><DjTotal>786985.00</DjTotal><BldArea>57.80</BldArea><CjBldPrice>14036.76</CjBldPrice><YqyDate>2019-03-28</YqyDate><Zygw>公共客户</Zygw><ProjGUID>e21734f7-7b99-4f84-be58-312ce75da099</ProjGUID><AlterReason>其他原因</AlterReason><AfterRoomTotal>786985.00</AfterRoomTotal><Reason>原因说明</Reason><IsPd>否</IsPd><PdRate>0.00</PdRate><Pdzk>97.00%</Pdzk><PdAmount>0.00</PdAmount><Pdj /><ZkhPrice>13615.66</ZkhPrice><x_IsApplyPolicy>否</x_IsApplyPolicy><x_PolicyRangeText /><x_PolicyApplyNumber /><x_PolicyChgTotalNumber /><x_IsPolicyBreak /><x_PolicyType>1</x_PolicyType><x_IsEmployeeBuyPolicy>是</x_IsEmployeeBuyPolicy><x_EmployeeName>李李</x_EmployeeName><x_EmployeeRanks>5</x_EmployeeRanks><x_EmployeeBuyerRelation>夫妻</x_EmployeeBuyerRelation><x_FistPayRate>10.00</x_FistPayRate><x_FirstPayMoney>81132.50</x_FirstPayMoney><x_FirstPayDate>2019-11-02</x_FirstPayDate><AlterTypeDtl>高管人员及其关联人购房</AlterTypeDtl><AlterType>认购员工购房</AlterType><PayFormName>一次性付款</PayFormName><SpType>普通员工购房</SpType><EmployeeBuyChangesDtl><Item><DiscntName>运河悦章商铺折扣</DiscntName><AppScenariosEnum>公开折扣</AppScenariosEnum><CalMethodEnum>打折</CalMethodEnum><DiscntValue>97.00</DiscntValue><PreferentialPrice>0.00</PreferentialPrice></Item></EmployeeBuyChangesDtl><ATTACHMENTS /><KdBUCode>B-571B-001</KdBUCode><KdProjCode>A20130521011HZ</KdProjCode><FBpmProjectCode></FBpmProjectCode></DATA>`,
        //     "", "yangmin"
        //   ],
        //   "Handled": true,
        //   "EventName": null
        // }
      }
    }
}
</script>

<style lang="less">
.checkReportMode {
  padding: 10px;
  background-color: #fff;
  .titleText{
      border-left: 3px solid #2661ff;
      height: 20px;
      line-height: 20px;
      font-size: 16px;
      text-indent: 1em;
    }
    .el-collapse-item{
      padding: 15px;
      padding-top: 0px;
    }
    .linkList{
      list-style: none;
      display: flex;
      flex-wrap: wrap;
      // text-align: center;
      li{
        width: 33.33%;
        color: #2661ff;
        cursor: pointer;
        padding-left: 16px;
        margin-bottom: 10px;
        .el-button{
          // color: #fff;
          float: right;
          margin-right: 5px;
        }
      }
    }
}
</style>
