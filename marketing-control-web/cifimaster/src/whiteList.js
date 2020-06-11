
export function white() {
  const firstPlan = ['/planControl', '/firstPlanPreview', "/getLandInfo", "/setFirstInfo", "/setSecondInfo", "/threeMonthInfo", "/twoMonthInfo", "/sevenAndTwentyOnePostpone", "/twentyOneDaysChange", "/sevenDaysOpening", "/openingDayInfo", "/openingTomorrowInfo", "/afterAMonthInfo"]

  //费用
  const costList = ["/yearPay", "/yearReport", "/costExamineLegal", "/businessIncome", "/businessPayment", "/costEntering", "/costExamine", "/costPay", "/costPurchase", "/business", "/costExamineLink", "/costPayPoint"]

  // 销售审批
  const offerFlowList = ["/offerRename", "/staffByHouse", "/offerDiscount", "/delaySigning", "/offerChangeHouse", "/offerUnsubscribe", "/offerInstallment", "/offerSpecial", "/signingRearRenamed", "/signingRearCheckOut", "/signingRearRoomChange", "/paymentMethod", "/MortgageBank", "/installmentPay", "/uploadVue", "/riskControlInfo", "/chargeback", "/paymentRequest",'/discountPage']

  const approvalList = ['/periodizationInfo', '/discountInfo', '/floatingPriceMy', "/floatingPriceInfo", "/floatingPriceMobile", "/floatingPriceApproval", "/approvalStart", "/agingAndDiscount"];

  const white = [...approvalList, ...offerFlowList, ...costList, ...firstPlan]; // no redirect whitelist

  return white
}
export const routerJson =
{
  /* 一揽子分期*/
  periodizationInfo: {
    pid: 'oneBundlePlan',
    name: 'periodizationInfo'
  },
  // 签约退房
  signingRearCheckOut: {
    pid: 'changeProcessAfterSigning',
    name: 'signingRearCheckOut'
  },
  //一揽子
  approvalStart: {
    pid: 'oneBundlePlan',
    name: 'approvalStart'
  },
  // /*一揽子折扣 */

  discountInfo: {
    pid: 'oneBundlePlan',
    name: 'discountInfo'
  },
  // /*定调价流程 */
  floatingPriceMy: {
    pid: 'oneBundlePlan',
    name: 'floatingPrice'
  },
  // /* 定调价审批页手机端与PC端*/
  floatingPriceApproval: {
    pid: 'oneBundlePlan',
    name: 'floatingPriceInfo'
  },
  // /*定调价手机端详细静态页 */
  floatingPriceInfo: {
    pid: 'oneBundlePlan',
    name: 'floatingPriceMobileInfo'
  },
  // /*定调价手机端静态页*/
  floatingPriceMobile: {
    pid: 'oneBundlePlan',
    name: 'floatingMobile'
  },
  // /*认购后更名*/
  floatingPriceMobile: {
    pid: 'offerFlow',
    name: 'offerRename'
  },
  // /*认购后员工购房*/
  staffByHouse: {
    pid: 'offerFlow',
    name: 'staffByHouse'
  },
  // /*认购后非公开折扣*/
  offerDiscount: {
    pid: 'offerFlow',
    name: 'offerDiscount'
  },
  // /*认购后延期签约*/
  delaySigning: {
    pid: 'offerFlow',
    name: 'delaySigning'
  },
  // /*认购后换房*/

  offerChangeHouse: {
    pid: 'offerFlow',
    name: 'offerChangeHouse'
  },
  // /*认购后退订*/
  offerUnsubscribe: {
    pid: 'offerFlow',
    name: 'offerUnsubscribe'
  },
  // /*认购后分期付款*/
  offerInstallment: {
    pid: 'offerFlow',
    name: 'offerInstallment'
  },
  // /*认购后特殊审批*/
  offerSpecial: {
    pid: 'offerFlow',
    name: 'offerSpecial'
  },
  // /*签约后更名*/
  signingRearRenamed: {
    pid: 'changeProcessAfterSigning',
    name: 'signingRearRenamed'
  },
  // /*签约后换房*/
  signingRearRoomChange: {
    pid: 'changeProcessAfterSigning',
    name: 'signingRearRoomChange'
  },
  // /*签约后变更付款方式*/

  paymentMethod: {
    pid: 'changeProcessAfterSigning',
    name: 'paymentMethod'
  },
  // /*签约后变更按揭银行*/

  MortgageBank: {
    pid: 'changeProcessAfterSigning',
    name: 'MortgageBank'
  },
  // /*签约后变更分期付款*/

  installmentPay: {
    pid: 'changeProcessAfterSigning',
    name: 'installmentPay'
  },
  // // 周上报审批

  uploadVue: {
    pid: 'oneBundlePlan',
    name: 'uploadVue'
  },
  // // 年度预算调整(支付口径)
  yearPay: {
    pid: 'offerFlow',
    name: 'yearPay'
  },
  // // 年度预算调整(合同口径)

  yearReport: {
    pid: 'offerFlow',
    name: 'yearReport'
  },
  // // 电商合并

  business: {
    pid: 'offerFlow',
    name: 'business'
  },
  // // 电商管理费支出发起

  businessPayment: {
    pid: 'offerFlow',
    name: 'businessPayment'
  },
  // // 电商收入项目挪腾发起

  businessIncome: {
    pid: 'offerFlow',
    name: 'businessIncome'
  },
  // // 费用采购方案发起

  costPurchase: {
    pid: 'offerFlow',
    name: 'costPurchase'
  },
  // // 费用合同审批发起

  costExamine: {
    pid: 'offerFlow',
    name: 'costExamine'
  },
  // // 费用合同审批发起
  costExamineLegal: {
    pid: 'offerFlow',
    name: 'yearReport'
  },
  // // 费用付款申请发起
  costPay: {
    pid: 'offerFlow',
    name: 'costPay'
  },
  // // 表外费用录入审批发起

  costEntering: {
    pid: 'offerFlow',
    name: 'costEntering'
  },
  // // 风控详情

  riskControlInfo: {
    pid: 'riskControl',
    name: 'riskControlInfo'
  },
  // // 一揽子分期折扣编制

  agingAndDiscount: {
    pid: 'oneBundlePlan',
    name: 'agingAndDiscount'
  },
  // // 首开总预览
  firstPlanPreview: {
    pid: 'firstPlanPreview',
    name: 'index'
  },
  // // 费用合同是否关联交易

  costExamineLink: {
    pid: 'offerFlow',
    name: 'costExamineLink'
  },
  // // 首开拿地后

  getLandInfo: {
    pid: 'firstPlanPreview',
    name: 'getLandInfo'
  },
  // // 首开顶设1

  setFirstInfo: {
    pid: 'firstPlanPreview',
    name: 'setFirstInfo'
  },
  // // 首开顶设2

  setSecondInfo: {
    pid: 'firstPlanPreview',
    name: 'setSecondInfo'
  },
  // // 首开三个月

  threeMonthInfo: {
    pid: 'firstPlanPreview',
    name: 'threeMonthInfo'
  },
  // // 首开两个月

  twoMonthInfo: {
    pid: 'firstPlanPreview',
    name: 'twoMonthInfo'
  },
  // // 21天和7天延期申请

  sevenAndTwentyOnePostpone: {
    pid: 'firstPlanPreview',
    name: 'sevenAndTwentyOnePostpone'
  },
  // // 首开21天变更客储

  twentyOneDaysChange: {
    pid: 'firstPlanPreview',
    name: 'twentyOneDaysChange'
  },
  // // 首开7天开盘申请

  sevenDaysOpening: {
    pid: 'firstPlanPreview',
    name: 'sevenDaysOpening'
  },
  // // 首开开盘当日

  openingDayInfo: {
    pid: 'firstPlanPreview',
    name: 'openingDayInfo'
  },
  // // 首开开盘次日

  openingTomorrowInfo: {
    pid: 'firstPlanPreview',
    name: 'openingTomorrowInfo'
  },
  // // 首开开盘后一个月

  afterAMonthInfo: {
    pid: 'firstPlanPreview',
    name: 'afterAMonthInfo'
  },
  // // 首开监控首页

  planControl: {
    pid: 'firstPlanPreview',
    name: 'planControl'
  },
  // // 付款申请

  paymentRequest: {
    pid: 'offerFlow',
    name: 'paymentRequest'
  },
  // // 退卡流程

  chargeback: {
    pid: 'offerFlow',
    name: 'chargeback'
  },
  // // 付款申请打印

  costPayPoint: {
    pid: 'offerFlow',
    name: 'costPayPoint'
  },
}
