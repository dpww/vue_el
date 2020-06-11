<template>
  <process-form :title="TITLE" :formlist="list" :default-open-tree="defaultOpen" :value="value" labelwidth="210px" :readonly="false"></process-form>
</template>
<script>
// import { costInfo } from "@/api/offerFlow";
export default {
  components: {
    processForm:()=>import( "@/views/component/formV2.vue")
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
        weekAmount:"fff"
      },
      list: [
        {
          title: "基本信息",
          mode: "transverse",
          numbers: 3,
          inputList: [
            {
              label: "申请人",
              type: "info",
              name: "proposer"
            },
            {
              label: "申请部门",
              type: "info",
              name: "department"
            },
            {
              label: "申请时间",
              type: "info",
              name: "applytime"
            },
            {
              label: "项目名称",
              type: "info",
              name: "ProjName"
            }
          ]
        },
        {
          title: "项目信息",
          mode: "transverse",
          numbers: 3,
          inputList: [
            {
              label: "项目地块名",
              type: "info",
              name: "ZrrName"
            },
            {
              label: "项目状态",
              type: "info",
              name: "DeptName"
            },
            {
              label: "项目编号",
              type: "info",
              name: "DeptCostName"
            },
            {
              label: "示范区计划开工日期",
              type: "info",
              name: "DeptCostName"
            },
            {
              label: "项目计划开盘日期",
              type: "info",
              name: "DeptCostName"
            },
            {
              label: "首开阶段",
              type: "info",
              name: "DeptCostName"
            }
          ]
        },
        {
          title: "售楼处情况",
          mode: "transverse",
          numbers: 3,
          inputList: [
            {
              label: "售楼处开放时间",
              type: "info",
              name: "DeptName",
              numbers: 1,

            },
            {
              label: "售楼处面积",
              numbers: 1,
              type: "info",
              name: "CostCodes"
            },
            {
              label: "主要功能",
              numbers: 1,
              type: "info",
              name: "ProceedingNames"
            },
          ]
        },
         {
          title: "样板房情况",
          mode: "transverse",
          numbers: 3,
          inputList: [
            {
              label: "样板房开放时间",
              type: "info",
              name: "DeptName",
              numbers: 1,

            },
            {
              label: "户型",
              numbers: 1,
              type: "info",
              name: "CostCodes"
            },
            {
              label: "主要功能",
              numbers: 1,
              type: "info",
              name: "ProceedingNames"
            },
          ]
        },
         {
          title: "示范区情况",
          mode: "transverse",
          numbers: 3,
          inputList: [
            {
              label: "售楼处开放时间",
              type: "info",
              name: "DeptName",
              numbers: 1,
            },
            {
              label: "规模",
              numbers: 1,
              type: "info",
              name: "CostCodes"
            },
            {
              label: "主要特点",
              numbers: 1,
              type: "info",
              name: "ProceedingNames"
            },
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
      TITLE: "三大件流程审批"
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
