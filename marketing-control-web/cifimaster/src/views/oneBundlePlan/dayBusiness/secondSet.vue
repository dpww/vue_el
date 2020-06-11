<template>
  <process-form :title="TITLE" :formlist="list" :default-open-tree="defaultOpen" :value="value" labelwidth="210px" :readonly="false"></process-form>
</template>
<script>
// import { costInfo } from "@/api/offerFlow";
export default {
  components: {
    processForm:()=>import("@/views/component/formV2.vue")
  },
  data() {
    return {
      defaultOpen:[0,1,2,3,4,5],
      value: {
        proposer:"111",
        department:"222",
        applytime:"333",
        ProjName:"444",
        ZrrName:"555",
        DeptName:"666",
        DeptCostName:"777",
        DeptName:"888",
        CostCodes:"999",
        ProceedingNames:"000",
        CostShortName:"aaa",
        FtAmount:"bbb",
        FtYear:"ccc",
        skAmount:"ddd",
        Yeartarget:"eee",
        weekAmount:"fff",
        ApplyShare:[
          {ZrrName:"利润率",DeptName:"1",DeptCostName:"1"},
          {ZrrName:"整盘均价",DeptName:"1",DeptCostName:"1"},
          {ZrrName:"整盘货值",DeptName:"1",DeptCostName:"1"},
          {ZrrName:"整盘费率",DeptName:"1",DeptCostName:"1"},
          {ZrrName:"开盘时间",DeptName:"1",DeptCostName:"1"},
          {ZrrName:"销售周期",DeptName:"1",DeptCostName:"1"},
          {ZrrName:"当年费率",DeptName:"1",DeptCostName:"1"},
        ]
      },
      list: [
        {
          title: "基本信息",
          mode: "transverse",
          numbers: 2,
          inputList: [
            {
              label: "事业部",
              type: "info",
              name: "proposer"
            },
            {
              label: "项目名称",
              type: "info",
              name: "department"
            },
            {
              label: "发起人",
              type: "info",
              name: "applytime"
            },
            {
              label: "发起日期",
              type: "info",
              name: "ProjName"
            },
            {
              label: "版本",
              type: "info",
              name: "ProjName"
            },
            {
              label: "产品线",
              type: "info",
              name: "ProjName"
            }
          ]
        },
        {
          title: "整盘目标",
          mode: "vertical",
          dataName: ["ApplyShare"],
          numbers: 3,
          inputList: [
            {
              label: "指标",
              type: "info",
              name: "ZrrName"
            },
            {
              label: "考核版",
              type: "info",
              name: "DeptName"
            },
            {
              label: "内部挑战版",
              type: "info",
              name: "DeptCostName"
            }
          ]
        },
        {
          title: "附件",
          mode: "transverse",
          numbers: 4,
          inputList: [
            {
              label: "法院传票和客户起诉书",
              type: "fileList",
              numbers: 1,
              fileList: "myList"
            },
            {
              label: "公司发送的催签函和解约没收定金函.pd",
              type: "fileList",
              numbers: 1,
              fileList: "myList"
            },
            {
              label:
                "定金合同（定金收据、付款承诺书、定金收据及支付凭证、购房人身份证、购房折扣确认单等）.pdf",
              type: "fileList",
              name: "aaa",
              numbers: 1,
              fileList: "myList"
            },
            {
              label: "客户要求公司退还定金以及在杭州七院的诊断证明.pdf",
              type: "fileList",
              name: "aaa",
              numbers: 1,
              fileList: "myList"
            }
          ]
        }
      ],
      TITLE: "顶设二流程审批"
    };
  },
  methods: {
    useInfo() {
    }
  },
  created() {
    this.useInfo();
  }
};
</script>

<style lang='less' scoped>
</style>
