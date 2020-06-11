<template>
  <div class="setSecond">
    <navbarLink></navbarLink>
    <div class="containter">
      <div class="headerFixed">
        <div class="top" v-if="isType != 'view'">
          <div class="right-btn">
            <el-button class="blankBtn" @click="$router.push({ path: '/planWrite' })">返回列表</el-button>
            <el-button v-show="readonly" type @click="toPreview">查看审批</el-button>
            <el-button
              v-show="showCreatVersion"
              v-if="!$route.query.disabled"
              type="primary"
              @click="newVersion"
            >创建版本</el-button>
          </div>
          <el-form ref="form" label-width="80px">
            <el-form-item label="选择版本:">
              <el-select v-model="versions" @change="changeVersion" placeholder="请选择版本">
                <el-option
                  v-for="(item, index) in versionsList"
                  :key="index"
                  :label="item.node_name"
                  :value="item.plan_node_id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </div>
        <div class="tabsFlxed" :class="{ isViewFixed: $route.query.type == 'view' }">
          <el-tabs v-model="activeTab" @tab-click="changeTab" class="topTabs">
            <el-tab-pane label="货值产品" name="changeProduct"></el-tab-pane>
            <el-tab-pane label="核心指标" name="coreStandard"></el-tab-pane>
            <el-tab-pane label="全盘量价规划" name="overallPlan"></el-tab-pane>
            <el-tab-pane label="楼栋大定价" name="housePricing"></el-tab-pane>
            <el-tab-pane label="首开前费用计划" name="beforeCost"></el-tab-pane>
            <el-tab-pane label="客储计划" name="clientStorage"></el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </div>
    <div style="height:140px" v-if="isType == 'view'"></div>
    <div style="height:100px" v-else></div>
    <div class="content">
      <!-- <div style="height:70px"></div> -->
      <el-tabs v-model="activeTab" lazy>
        <el-tab-pane v-bind:versions="versions" label="货值产品" name="changeProduct">
          <changeProduct
            v-show="activeTab == 'changeProduct'"
            v-bind:versions="versions"
            v-bind:flowId="flowId"
            ref="changeProduct"
            v-bind:readonly="readonly"
          ></changeProduct>
        </el-tab-pane>
        <el-tab-pane label="核心指标" name="coreStandard">
          <coreStandard
            ref="coreStandard"
            v-show="activeTab == 'coreStandard'"
            @isshowversion="isshowversion"
            v-bind:versions="versions"
            v-bind:beforeAct="beforeAct"
            v-bind:readonly="readonly"
          ></coreStandard>
        </el-tab-pane>
        <el-tab-pane label="全盘量价规划" name="overallPlan">
          <overallPlan
            v-show="activeTab == 'overallPlan'"
            ref="overallPlan"
            v-bind:beforeAct="beforeAct"
            v-bind:versions="versions"
            v-bind:readonly="readonly"
          ></overallPlan>
        </el-tab-pane>
        <el-tab-pane label="楼栋大定价" name="housePricing">
          <housePricing
            v-show="activeTab == 'housePricing'"
            v-bind:versions="versions"
            ref="housePricing"
            v-bind:readonly="readonly"
          ></housePricing>
        </el-tab-pane>
        <el-tab-pane label="首开前费用计划" name="beforeCost">
          <beforeCost
            v-show="activeTab == 'beforeCost'"
            v-bind:versions="versions"
            ref="beforeCost"
            v-bind:readonly="readonly"
          ></beforeCost>
        </el-tab-pane>
        <el-tab-pane v-bind:versions="versions" label="客储计划" name="clientStorage">
          <clientStorage
            v-show="activeTab == 'clientStorage'"
            v-bind:versions="versions"
            v-bind:beforeAct="beforeAct"
            v-bind:flowId="flowId"
            ref="clientStorage"
            v-bind:readonly="readonly"
          ></clientStorage>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="null"></div>
    <div class="bottom" v-if="isType != 'view'">
      <el-button
        type="primary"
        v-show="$store.state.user.userPower.includes('提交审批')"
        v-if="!readonly"
        @click="update(activeTab, '1')"
      >提交审批</el-button>
      <el-button v-if="!readonly" type @click="update(activeTab, '0')">保存</el-button>
      <el-button type v-if="isShowKS" @click="update(activeTab, '1', true)">快速审批</el-button>
    </div>
  </div>
</template>

<script>
import coreStandard from "./coreStandard";
import overallPlan from "./overallPlan";
import housePricing from "./housePricing";
import clientStorage from "./clientStorage";
import beforeCost from "./beforeCost";
import changeProduct from "./changeProduct";
import { toHistoryUrl, queryFlowId } from "@/api/offerFlow.js";
import {
  updateCodeIndex,
  updateAllPlan,
  updateStorageNodePlan,
  updateDesignTwoAll,
  selectTwoNode,
  forMtstart,
  get
} from "@/api/firstPlan";
export default {
  data() {
    return {
      isType: "",
      plan_node_id: this.versions || this.$route.query.plan_node_id,
      readonly: false,
      versions: "",
      isShowKS: location.origin.includes("uat"),
      activeTab: "changeProduct",
      versionsList: [],
      plan_id: this.$route.query.plan_id,
      beforeAct: "",
      flowId: "",
      showCreatVersion: false,
      isKSAP: false
    };
  },
  components: {
    navbarLink: () => import("../components/navbarLink"),
    coreStandard,
    overallPlan,
    housePricing,
    clientStorage,
    beforeCost,
    changeProduct
  },
  watch: {
    activeTab(a, b) {
      this.beforeAct = b;
      this.update(b, "change");
    }
  },
  computed: {
    local() {
      let host;
      if (location.origin.includes("test")) {
        host = "https://salesmgt-test.cifi.com.cn";
      } else if (location.origin.includes("uat")) {
        host = "https://salesmgt-uat.cifi.com.cn";
      } else {
        host = "https://salesmgt.cifi.com.cn";
      }
      return host;
    }
  },
  methods: {
    newVersion() {
      this.versions = "";
      this.readonly = false;
      this.showCreatVersion = false;
    },
    changeFlowId() {
      queryFlowId({}, this.versions).then(res => {
        if (res.code == 200 && res.data) {
          this.flow_id = res.data.flow_id;
        }
      });
    },
    changeVersion() {
      this.getversion();
      // this.changeFlowId();
    },
    getversion(type) {
      let id;
      //监控进入只查看
      if (this.$route.query.type != null && this.$route.query.type == "view") {
        this.isType = this.$route.query.type;
        id = this.$route.query.plan_node_id;
      } else {
        id = this.versions;
      }
      selectTwoNode({
        plan_node_id: id,
        plan_id: this.$route.query.plan_id,
        node_level: this.$route.query.node_level
      }).then(res => {
        if (res.code == 0) {
          this.versionsList = res.result;
          if (res.result[0] && res.result[0].plan_approval) {
            this.readonly =
              res.result[0].plan_approval == 4 ||
              res.result[0].plan_approval == 3
                ? true
                : false;
          } else {
            this.readonly = false;
          }
          // if (
          //   res.result[0].plan_approval == 10
          // ) {
          //   this.readonly = false;
          // }

          this.versions = res.result[0].plan_node_id;
        }
        if (this.$route.query.disabled) {
          this.readonly = true;
        }
        if (type == "submit") {
          this.approve();
        }
      });
    },
    isshowversion(data) {
      this.showCreatVersion = data > 0 ? true : false;
    },
    changeTab(tab, event) {
      // event.toElement.style.color="red"
      if (tab.name == "beforeCost") {
        this.update("coreStandard", "0");
        this.$refs.beforeCost.reload();
      }
    },
    toPreview() {
      queryFlowId({}, this.versions).then(res => {
        if (res.code == 200 && res.data) {
          this.flow_id = res.data.flow_id;
          toHistoryUrl({
            proInstId: res.data.flow_id
          }).then(res => {
            window.open(res.data);
          });
        }
      });
    },
    ksap() {
      //快速审批
      // forMtstart({
      //   plan_node_id: this.versions
      // }).then(res => {
      var hht =
        this.local +
        "/#/firstPlanPreview?BOID=" +
        res.result.result.codeBOID +
        "&t=1585017217401&isKSAP=1";
      window.open(hht);
      // })
    },
    update(key, isUpdate, isksap = false) {
      if (this.$route.query.disabled) {
        return;
      }
      if (isksap) {
        this.isKSAP = isksap;
      }
      let index = this.$refs.coreStandard.numberTable;
      index.price = this.$refs.coreStandard.priceTable;
      index.time = this.$refs.coreStandard.coreForm;
      index.plan_id = this.$route.query.plan_id;
      index.plan_node_id = this.versions;
      index.isUpdate = isUpdate;
      index.node_level = this.$route.query.node_level;
      index.browse_num = this.$refs.coreStandard.meetingNum;

      let plan = {
        big: this.$refs.overallPlan.versionsTable,
        plan: this.$refs.overallPlan.prodTable,
        plan_id: this.$route.query.plan_id,
        plan_node_id: this.versions,
        isUpdate: isUpdate,
        node_level: this.$route.query.node_level
      };
      let nodeplan = {
        NodePlan: this.$refs.clientStorage.nodeDataCopy,
        Week: this.$refs.clientStorage.comeDataCopy,
        plan_id: this.$route.query.plan_id,
        plan_node_id: this.versions,
        isUpdate: isUpdate,
        node_level: this.$route.query.node_level,
        fileList: this.$refs.clientStorage.accessoryData
      };

      if (nodeplan.NodePlan.length > 0) {
        nodeplan.NodePlan[0].big_way = this.$refs.clientStorage.cardForm.big_way;
        nodeplan.NodePlan[0].little_way = this.$refs.clientStorage.cardForm.little_way;
      }
      if (this.$refs.clientStorage.flow_id) {
        nodeplan.flow_id = this.$refs.clientStorage.flow_id;
      }
      // 提交必填项校验
      if (isUpdate == 1) {
        let warning = "";
        let checkFlag = true;
        // 时间节点
        let timeTempList = [
          "delisting_time",
          "designone_time",
          "designtwo_time",
          "model_open_time",
          "open_time",
          "sales_time",
          "sample_open_time"
        ];
        timeTempList.forEach((item, idx) => {
          if (!index.time[item] && checkFlag) {
            warning += "时间节点";
            checkFlag = false;
            return;
          }
        });

        // 核心指标
        let standardList = [
          "cost_designtwo_all_sales_per",
          "cost_designtwo_open_year_per",
          "cost_invest_all_sales_per",
          "cost_invest_open_year_per",
          "cost_open_sales_price",
          "cost_rules_all_sales_per",
          "cost_rules_open_year_per",
          "cost_sales_generalize_price",
          "designtwo_all_per",
          "designtwo_create_per",
          "designtwo_irr",
          "designtwo_payback",
          "designtwo_push_num",
          "designtwo_push_value",
          "designtwo_selling_num",
          "designtwo_selling_value",
          "designtwo_take_card_num",
          "designtwo_take_card_value",
          "invest_all_per",
          "invest_create_per",
          "invest_irr",
          "invest_payback",
          "invest_push_num",
          "invest_push_value",
          "invest_selling_num",
          "invest_selling_value",
          "invest_take_card_num",
          "invest_take_card_value",
          "rules_all_per",
          "rules_create_per",
          "rules_irr",
          "rules_payback",
          "rules_push_num",
          "rules_push_value",
          "rules_selling_num",
          "rules_selling_value",
          "rules_take_card_num",
          "rules_take_card_value",
          "rules_time",
          "rules_take_card_time",
          "invest_time",
          "invest_take_card_time",
          "designtwo_time",
          "designtwo_take_card_time"
        ];
        if (checkFlag) {
          standardList.forEach((item, idx) => {
            if (!index[item] && index[item] !== 0 && checkFlag) {
              warning += "核心指标";
              checkFlag = false;
              return;
            }
          });
        }
        // 核心指标-价
        if (checkFlag) {
          index.price.forEach(item => {
            if (checkFlag) {
              if (
                (!item.designtwo_open_avg_price &&
                  item.designtwo_open_avg_price !== 0) ||
                (!item.invest_open_avg_price &&
                  item.invest_open_avg_price !== 0) ||
                (!item.rules_open_avg_price && item.rules_open_avg_price !== 0)
              ) {
                warning += "核心指标-价";
                checkFlag = false;
                return;
              }
            }
          });
        }
        // 过会次数
        if (checkFlag) {
          if (!index.browse_num && index.browse_num !== 0) {
            warning += "过会次数";
            checkFlag = false;
          }
        }
        // 全盘量价规划
        plan.plan.forEach(lv1 => {
          lv1.product.forEach(lv2 => {
            if (checkFlag) {
              if (
                (!lv2.all_big_avg_price && lv2.all_big_avg_price !== 0) ||
                (!lv2.all_big_value_price && lv2.all_big_value_price !== 0) ||
                (!lv2.all_rules_avg_price && lv2.all_rules_avg_price !== 0) ||
                (!lv2.all_rules_value_price && lv2.all_rules_value_price !== 0)
              ) {
                warning += "大定价全盘量价规划";
                checkFlag = false;
              }
            }
            if (checkFlag) {
              lv2.child.forEach(lv3 => {
                if (
                  (!lv3.oneyear_avg_price && lv3.oneyear_avg_price !== 0) ||
                  (!lv3.oneyear_sell && lv3.oneyear_sell !== 0) ||
                  (!lv3.oneyear_supply && lv3.oneyear_supply !== 0)
                ) {
                  warning += "大定价全盘量价规划";
                  checkFlag = false;
                }
              });
            }
          });
        });
        // 循环业态
        let is_eq = true;
        let is_LE = true;
        let flagProd = "";
        let flagOpera = "";
        plan.plan.map(item => {
          // 循坏产品类型
          item.product.map(i => {
            if (i.child.length) {
              let all_big_value_price = Number(i.all_big_value_price);
              let oneyear_supply = 0;
              let oneyear_sell = 0;
              i.child.map(c => {
                oneyear_supply += Number(c.oneyear_supply);
                oneyear_sell += Number(c.oneyear_sell);
              });
              if (oneyear_supply.toFixed(2) != all_big_value_price.toFixed(2)) {
                is_eq = false;
                flagProd = i.product_type;
                flagOpera = i.operation_type;
              }
              if (+oneyear_sell.toFixed(2) > +oneyear_supply.toFixed(2)) {
                is_LE = false;
                flagProd = i.product_type;
                flagOpera = i.operation_type;
              }
            }
          });
        });
        if (!is_eq) {
          this.$message({
            type: "error",
            message:
              "大定价全盘量价规划" +
              "/" +
              flagOpera +
              "/" +
              flagProd +
              "整体年份“供”各业态累计需要分别等于“整盘(大定价)货值(万元)”"
          });
          return;
        }
        if (!is_LE) {
          this.$message({
            type: "error",
            message:
              "大定价全盘量价规划" +
              "/" +
              flagOpera +
              "/" +
              flagProd +
              "整体年份“销”不得大于“供”"
          });
          return;
        }
        //首开前费用计划
        let costTempData = [
          "activity_price",
          "channel_price",
          "datum_price",
          "government_price",
          "maintenance_price",
          "make_price",
          "payroll_price",
          "property_price",
          "property_qt_price",
          "public_price",
          "sales_agency_price",
          "sales_place_price",
          "sales_qt",
          "serve_price",
          "traffic_price",
          "travel_price",
          "work_price"
        ];
        this.$refs.beforeCost.costData.forEach(lv1 => {
          if (checkFlag) {
            lv1.list.forEach(lv2 => {
              if (checkFlag) {
                costTempData.forEach(lv3 => {
                  if (!lv2[lv3] && lv2[lv3] !== 0 && checkFlag) {
                    warning += "首开前费用计划";
                    checkFlag = false;
                  }
                });
              }
            });
          }
        });
        // 节点客储计划
        let NodeTempPlan = [
          "big_num",
          "little_num",
          "report_num",
          "sub_num",
          "visit_num"
        ];
        nodeplan.NodePlan.forEach(item => {
          NodeTempPlan.forEach(name => {
            if (!item[name] && item[name] !== 0 && checkFlag) {
              warning += "节点客储计划";
              checkFlag = false;
            }
          });
        });
        // 来访周拆分
        nodeplan.Week.forEach(item => {
          if (item.week != "完整波段") {
            if (!item.plan_add && item.plan_add !== 0 && checkFlag) {
              warning += "来访周拆分";
              checkFlag = false;
            }
          }
        });
        let costARR = [...this.$refs.beforeCost.costData][0];
        let costNameARR = [
          "public_price",
          "make_price",
          "datum_price",
          "channel_price",
          "activity_price"
        ];
        let costSUM = 0;
        costARR.list.forEach(item => {
          costNameARR.forEach(name => {
            if (!isNaN(Number(item[name]))) {
              costSUM += Number(item[name]);
            }
          });
        });
        if (
          index.cost_sales_generalize_price.toFixed(2) != costSUM.toFixed(2)
        ) {
          this.$message.error(
            "顶设2核心指标销售推广费须与首开费用计划中销售推广费中各项合计累计值相等。"
          );
          return;
        }
        //费用合计比较
        let costAllSum = 0;
        this.$refs.beforeCost.costData[0].list.forEach(item => {
          if (item.allsum) {
            costAllSum += Number(item.allsum);
          }
        });
        if (index.cost_open_sales_price.toFixed(2) != costAllSum.toFixed(2)) {
          this.$message.error(
            "首开前总费用须与核心指标中顶设2首开前营销费用数值相等。"
          );
          return;
        }

        //附件
        nodeplan.fileList.forEach(item => {
          if (item.handle != "其他上传") {
            if (!item.name && checkFlag) {
              warning += "附件";
              checkFlag = false;
            }
          }
        });

        if (!checkFlag) {
          this.$message.error(warning + "必填项未填写!");
          return;
        }
        if (this.$refs.housePricing.tableData.length == 0) {
          this.$message.error("楼栋大定价必填项未填写");
          return;
        }
      }
      if (key == "coreStandard") {
        updateCodeIndex(index).then(res => {
          if (res.code == 0) {
            if (isUpdate == "0") {
              this.$message.success("保存草稿成功");
              this.getversion("save");
            } else if (isUpdate == "1") {
              this.$message.success("提交审批成功");
              // this.approve(this.versions)
              this.getversion("submit");
              // this.$router.push("planWrite");
            }
          }
        });
      } else if (key == "overallPlan") {
        updateAllPlan(plan).then(res => {
          if (res.code == 0) {
            if (isUpdate == "0") {
              this.$message.success("保存草稿成功");
              this.getversion("save");
            } else if (isUpdate == "1") {
              this.$message.success("提交审批成功");
              this.getversion("submit");
              // this.$router.push("planWrite");
            }
          }
        });
      } else if (key == "clientStorage") {
        updateStorageNodePlan(nodeplan).then(res => {
          if (res.code == 0) {
            this.flowId = res.result[0].flow_id;
            if (isUpdate == "0") {
              this.getversion("save");
              this.$message.success("保存草稿成功");
            } else if (isUpdate == "1") {
              this.$message.success("提交审批成功");

              this.getversion("submit");
              // this.$router.push("planWrite");
            }
          }
        });
      } else if (key == "housePricing") {
        this.$refs.housePricing.update(isUpdate);
        if (isUpdate == "0") {
          this.getversion("save");
        } else if (isUpdate == "1") {
          this.getversion("submit");
        }
      } else if (key == "beforeCost") {
        this.$refs.beforeCost.update(isUpdate);
        if (isUpdate == "0") {
          this.getversion("save");
        } else if (isUpdate == "1") {
          this.getversion("submit");
        }
      } else if (key == "changeProduct") {
        this.$refs.changeProduct.update(isUpdate);

        if (isUpdate == "0") {
          this.getversion("save");
        } else if (isUpdate == "1") {
          this.getversion("submit");
        }
        //  if(isUpdate=="change"){
        //    console.log('coreStandard');

        //   this.$refs.coreStandard.reload()
        //    console.log('overallPlan');

        //   this.$refs.overallPlan.reload()
        // }
      } else if (key == "all") {
        updateDesignTwoAll({
          index,
          plan,
          nodeplan,
          plan_id: this.plan_id,
          plan_node_id: this.plan_node_id
        }).then(res => {
          if (res.code == 0) {
            if (isUpdate == "0") {
              this.getversion("save");

              this.$message.success("保存草稿成功");
            } else if (isUpdate == "1") {
              this.$message.success("提交审批成功");
              this.getversion("submit");
              // this.$router.push("planWrite");
            }
          }
        });
      }
    },
    approve() {
      forMtstart({
        plan_node_id: this.versions
      }).then(res => {
        //提交审批并调整预览页面
        if (this.isKSAP) {
          this.update(this.activeTab, "0");
          var hht =
            this.local +
            "/#/firstPlanPreview?BOID=" +
            res.result.result.codeBOID +
            "&t=1585017217401&isKSAP=1";
          window.open(hht);
          this.$router.push("planWrite");
        } else {
          get(
            `/Workflow/MTStart2.aspx?BSID=FP&BTID=${res.result.result.BTID}&BOID=${res.result.result.codeBOID}&UserID=${res.result.result.bkUserID}&LoginKey=${res.result.result.loginKey}`
          ).then(res => {
            if (res.code == 200 || res.result.code == 200) {
              window.open(res.data);
            } else {
              this.$message.error(res.messages || res.result.messages);
            }
            this.$router.push("planWrite");
          });
        }
      });
    }
  },
  created() {
    if (this.$route.query.disabled) {
      this.readonly = true;
    }
    this.getversion();
    // this.changeFlowId();
  }
};
</script>

<style lang="less" scoped>
@import url("../../../assets/css/GlobalBtn.less");

.setSecond {
  ::v-deep .el-tabs__active-bar {
    background: #2761ff !important;
    width: 26px !important;
    height: 0px !important;
  }

  // margin-top: 100px;
  .navbarLink {
    background: #fff;
    margin-top: 5px;
  }
  ::v-deep .el-tabs__active-bar {
    background: transparent;
  }
  ::v-deep input::-webkit-outer-spin-button,
  ::v-deep input::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }

  ::v-deep input[type="number"] {
    -moz-appearance: "textfield";
  }
  .containter {
    overflow: hidden;
    ::v-deep .el-collapse-item__header {
      font-weight: 700;
    }
    ::v-deep .el-tabs {
      padding: 0 10px;
      // background: #fff;
    }
    .top {
      // background: #fff;
      ::v-deep .el-form {
        width: 40%;
        .el-input__inner {
          width: 210px !important;
        }
      }
      // background: red;
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
      .right-btn {
        position: fixed;
        right: 0;
        top: 40px;
        z-index: 10;
        .blankBtn {
          .generalBtn(#333333, 500, 12px);
        }
      }
    }
    .headerFixed {
      width: 100%;
      position: fixed;
      height: 100px;
      background: #fff;
      // position: fixed;
      top: 40px;
      // width: 100
      z-index: 10;
      .tabsFlxed {
        display: inline-block;
        position: fixed;
        top: 90px;
        z-index: 10;
        background: #fff;
        margin-left: 2px;
        ::v-deep .is-active::after {
          content: "";
          display: block;
          position: absolute;
          width: 26px;
          background: #2761ff;
          bottom: 1px;
          left: 50%;
          height: 3px;
          transform: translateX(-50%);
        }
        ::v-deep .is-active {
          font-weight: 700;
        }
      }
    }
  }
  ::v-deep .el-tabs__nav-wrap::after {
    background: #fff;
  }
  ::v-deep .el-tabs__item.is-active {
    color: #2761ff;
  }
  .content {
    margin: 15px;
    ::v-deep .el-tabs__header {
      display: none;
    }
  }
  .bottom {
    position: fixed;
    bottom: 0;
    width: 100%;
    left: 50%;
    transform: translateX(-50%);
    text-align: center;
    height: 50px;
    background: #fff;
    margin: 0 15px;
    padding: 15px 0;
    font-size: 0;
    z-index: 6;
    .el-button {
      height: 30px;
      margin-bottom: 4px;
    }
  }
  .null {
    height: 50px;
  }
  .content {
    // background: rgba(255, 255, 255, 1);
    // box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.05);
    border-radius: 6px;
    padding-bottom: 10px;
    // border: 1px solid rgba(216, 216, 216, 0.34);
    margin: 10px 15px;
  }
  ::v-deep .el-tabs__nav-scroll {
    ::v-deep.el-tabs__header .is-active::after {
      content: "";
      display: block;
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      width: 26px;
      height: 3px;
      background: #2761ff;
    }
  }
  ::v-deep .is-active {
    color: #2761ff;
  }
  ::v-deep .el-input__inner {
    color: #333333 !important;
    font-size: 14px !important;
  }
}
</style>
