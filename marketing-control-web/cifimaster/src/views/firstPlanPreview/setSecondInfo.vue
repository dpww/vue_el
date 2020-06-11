<template>
  <div class="setSecondInfo" ref="setSecondInfo">
    <el-collapse v-model="openList" @change="openChange">
      <el-collapse-item title="基础信息" name="1">
        <template slot="title">
          <h3 class="titleText">基础信息</h3>
        </template>
        <ul class="baseInfo">
          <li>
            <el-row>
              <el-col style="text-align:right;" :span="8">项目名称 :</el-col>
              <el-col style="padding-left:16px;" :span="16">{{projectInfo.projectName}}</el-col>
            </el-row>
          </li>
          <li>
            <el-row>
              <el-col style="text-align:right;" :span="8">申请人部门 :</el-col>
              <el-col style="padding-left:16px;" :span="16">{{projectInfo.post_name}}</el-col>
            </el-row>
          </li>
          <li>
            <el-row>
              <el-col style="text-align:right;" :span="8">申请时间 :</el-col>
              <el-col style="padding-left:16px;" :span="16">{{projectInfo.zddate}}</el-col>
            </el-row>
          </li>
          <li>
            <el-row>
              <el-col style="text-align:right;" :span="8">申请人 :</el-col>
              <el-col style="padding-left:16px;" :span="16">{{projectInfo.EmployeeName}}</el-col>
            </el-row>
          </li>
        </ul>
      </el-collapse-item>
      <el-collapse-item title="审批信息" name="2">
        <template slot="title">
          <h3 class="titleText">审批信息</h3>
        </template>
        <div class="setSecondInfoinput">
          <div class="containter">
            <div class="content">
              <changeProduct ref="changeProduct" v-bind:versions="versions"></changeProduct>
              <coreStandard ref="coreStandard" v-bind:versions="versions"></coreStandard>
              <overallPlan ref="overallPlan" v-bind:versions="versions"></overallPlan>
              <housePricing v-bind:versions="versions" ref="housePricing"></housePricing>
              <beforeCost v-bind:versions="versions" ref="beforeCost"></beforeCost>
              <clientStorage
                v-bind:versions="versions"
                v-bind:beforeAct="beforeAct"
                v-bind:flowId="flowId"
                ref="clientStorage"
              ></clientStorage>
            </div>
          </div>
        </div>
      </el-collapse-item>
      <Buttons />
    </el-collapse>
    <div style="text-align: center;">
      <el-button type v-if="this.$route.query.isKSAP" @click="fastUpdate()">快速审批</el-button>
    </div>
  </div>
</template>
<script>
import Buttons from "../../views/offerFlow/component/index";
import coreStandard from "../firstPlan/setSecond/coreStandard";
import overallPlan from "../firstPlan/setSecond/overallPlan";
import housePricing from "../firstPlan/setSecond/housePricing";
import clientStorage from "../firstPlan/setSecond/clientStorage";
import beforeCost from "../firstPlan/setSecond/beforeCost";
import changeProduct from "../firstPlan/setSecond/changeProduct";
import {
  updateCodeIndex,
  updateAllPlan,
  updateStorageNodePlan,
  updateDesignTwoAll,
  selectTwoNode,
  fastUpdate
} from "@/api/firstPlan";

export default {
  name: "setSecondInfo",
  mounted() {
    let timeid = setTimeout(() => {
      if (window.cifioa) {
        console.log(this.$refs.setSecondInfo.offsetHeight);
        window.cifioa.sendMessage({
          type: "height",
          height: this.$refs.setSecondInfo.offsetHeight
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
        console.log(this.$refs.setSecondInfo.offsetHeight);
        window.cifioa.sendMessage({
          type: "height",
          height: this.$refs.setSecondInfo.offsetHeight
        });
      } else {
        console.warn("缺少cifioa插件");
      }
      clearTimeout(timeid);
    }, 700);

  },
  data() {
    return {
      projectInfo: "",
      versions: "",
      isShowKS: localStorage.getItem("employeeName") == "管理员",
      activeTab: "coreStandard",
      versionsList: [],
      plan_id: this.$route.query.plan_id,
      beforeAct: "",
      flowId: "",
      iscreatVersion: false,
      openList: ["1", "2"]
    };
  },
  components: {
    coreStandard,
    overallPlan,
    housePricing,
    clientStorage,
    beforeCost,
    Buttons,
    changeProduct
  },
  watch: {
    activeTab(a, b) {
      this.beforeAct = b;
      console.log(this.beforeAct);
      this.update(b);
    }
  },
  computed: {},
  methods: {
    openChange(val) {
      console.log(val);
    },
    fastUpdate() {
      //快速审批
      fastUpdate({
        plan_node_id: this.$route.query.BOID,
        orgName: "fp_designtwo",
        node_level: "3"
      }).then(res => {
        window.close();
      });
    },
    isShowVersion(data) {
      this.iscreatVersion = data > 0 ? true : false;
    },
    changeTab(tab, event) {}
  },
  created() {
    selectTwoNode({
      plan_node_id: this.$route.query.plan_node_id || this.$route.query.BOID,
      plan_id: this.$route.query.plan_id,
      node_level: this.$route.query.node_level
    }).then(res => {
      console.log(res);
      if (res.code == 0) {
        this.projectInfo = res.result[0];
        this.versionsList = res.result;
        this.$refs.coreStandard.reload();
        this.$refs.overallPlan.reload();
        this.$refs.clientStorage.reload();
        this.$refs.housePricing.reload();
        this.$refs.beforeCost.reload();
        this.$refs.changeProduct.reload();
        // console.log(this.$refs.coreStandard.reload(),"???????");
      }
    });
  }
};
</script>
<style lang="less" scoped>
.setSecondInfo {
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
  ::v-deep .form_item_title {
    border: none !important;
  }
  ::v-deep .form-container .form_item {
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
    ::v-deep .el-form-item__label {
      width: 120px !important;
    }
    ::v-deep .el-form-item__content {
      margin-left: 120px !important;
    }

    ::v-deep .inputForm .el-col-8 {
      width: 100% !important;
    }
  }
}
.setSecondInfoinput {
  ::v-deep input::-webkit-outer-spin-button,
  ::v-deep input::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }

  ::v-deep input[type="number"] {
    -moz-appearance: "textfield";
  }
  .containter {
    ::v-deep .el-collapse-item__header {
      font-weight: 700;
    }
    ::v-deep .el-tabs {
      padding: 0 10px;
    }
    .top {
      background: #fff;
      color: #333;
      font-size: 14px;
      height: 50px;
      ::v-deep .el-button {
        height: 30px;
        float: right;
        margin-left: 10px;
        margin-top: 10px;
      }
      ::v-deep .el-button:first-child {
        margin-right: 15px;
      }
    }
    .content {
      margin: 15px;
      background: #fff;
    }
  }
  ::v-deep .el-tabs__nav-wrap::after {
    background: #fff;
  }
  ::v-deep .el-tabs__item.is-active {
    color: #2761ff;
  }
  // .el-tabs__active-bar {
  // }
  .bottom {
    text-align: center;
    height: 60px;
    line-height: 60px;
    background: #fff;
    margin: 0 15px;
    ::v-deep .el-button {
      height: 30px;
    }
  }
}
</style>
