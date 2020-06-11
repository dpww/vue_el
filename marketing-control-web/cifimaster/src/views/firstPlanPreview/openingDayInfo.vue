<template>
  <div class="openingDayInfo" ref="openingDayInfo">
    <el-collapse v-model="openList" @change="openChange">
      <el-collapse-item title="基础信息" name="1">
        <template slot="title">
          <h3 class="titleText">基础信息</h3>
        </template>
        <ul class="baseInfo">
          <li>
            <el-row>
              <el-col style="text-align:right;" :span="8">项目名称 :</el-col>
              <el-col style="padding-left:16px;" :span="16">{{resultData.projectName}}</el-col>
            </el-row>
          </li>
          <li>
            <el-row>
              <el-col style="text-align:right;" :span="8">申请人部门 :</el-col>
              <el-col style="padding-left:16px;" :span="16">{{resultData.post_name}}</el-col>
            </el-row>
          </li>
          <li>
            <el-row>
              <el-col style="text-align:right;" :span="8">申请时间 :</el-col>
              <el-col style="padding-left:16px;" :span="16">{{resultData.zddate}}</el-col>
            </el-row>
          </li>
          <li>
            <el-row>
              <el-col style="text-align:right;" :span="8">申请人 :</el-col>
              <el-col style="padding-left:16px;" :span="16">{{resultData.EmployeeName}}</el-col>
            </el-row>
          </li>
        </ul>
      </el-collapse-item>
      <el-collapse-item title="审批信息" name="2">
        <template slot="title">
          <h3 class="titleText">审批信息</h3>
        </template>
        <div class="openingDayInfoinput">
          <div class="firstReport" id="firstReport">
            <p class="bold">首开当日播报表</p>
            <p>项目总监:{{resultData.project_duty}}</p>
            <el-table
              :data="firstReportData"
              border
              :header-cell-style="{background:'#F5F7FA',color:'#999'}"
              style="width:  100%"
            >
              <el-table-column label="取证情况" align="center">
                <template slot-scope="scope">
                  <div class="db_cell">
                    <div>{{scope.row.name1}}</div>
                    <el-tooltip
                      v-if="scope.row.val1=='take_card_type' || scope.row.val1 == 'take_num'"
                      :content="resultData[scope.row.val1]"
                      :disabled="!resultData[scope.row.val1]"
                      placement="bottom"
                      effect="light"
                    >
                      <div>{{resultData[scope.row.val1]}}</div>
                    </el-tooltip>
                    <div v-else>{{resultData[scope.row.val1]}}</div>
                  </div>
                </template>
              </el-table-column>
              <el-table-column align="center" label="销售情况">
                <template slot-scope="scope">
                  <div class="db_cell">
                    <div>{{scope.row.name2}}</div>
                    <el-tooltip
                      v-if="scope.row.val2=='push_real_type' || scope.row.val2 == 'push_num'"
                      :content="resultData[scope.row.val2]"
                      :disabled="!resultData[scope.row.val2]"
                      placement="bottom"
                      effect="light"
                    >
                      <div>{{resultData[scope.row.val2]}}</div>
                    </el-tooltip>
                    <div v-else>{{resultData[scope.row.val2]}}</div>
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="selling" id="selling">
            <p class="bold">去化情况</p>
            <div class="sellingTable">
              <div class="t_head">
                <div class="t_col" style="min-width:400px"></div>
                <div class="t_col">目标(顶设)</div>
                <div class="t_col">实际</div>
                <div class="t_col">偏差</div>
                <div class="t_col">偏差率</div>
              </div>
              <div>
                <div class="t_col" style="min-width:400px">去化套数</div>
                <div class="t_col">{{resultData.designtwo_selling_num}}</div>
                <div class="t_col">{{resultData.actual_selling_num}}</div>
                <div class="t_col">{{resultData.bias_selling_num}}</div>
                <div class="t_col">{{resultData.biasper_selling_num}}</div>
              </div>
              <div>
                <div class="t_col" style="min-width:400px">去化货值(万)</div>
                <div class="t_col">{{resultData.designtwo_selling_value}}</div>
                <div class="t_col">{{resultData.actual_selling_value }}</div>
                <div class="t_col">{{resultData.bias_selling_value }}</div>
                <div class="t_col">{{resultData.biasper_selling_value}}</div>
              </div>
              <div
                v-if="resultData.avg&&resultData.avg.length>0"
                :style="{'height':resultData.avg.length*40+'px'}"
              >
                <div
                  :style="{'line-height':resultData.avg.length*40+'px','height':resultData.avg.length*40+'px','min-width': '400px'}"
                  class="t_col_l"
                >
                  <div v-if="resultData.avg&&resultData.avg.length>0">去化均价(元/㎡)</div>
                  <div>
                    <el-tooltip
                      class="t_col_cell"
                      v-for="(item,index) in resultData.avg"
                      :key="index"
                      :content="item.product_type"
                      :disabled="!item.product_type"
                      placement="bottom"
                      effect="light"
                    >
                      <div>{{item.product_type}}</div>
                    </el-tooltip>
                  </div>
                </div>
                <div class="t_col">
                  <div v-for="(item,index) in resultData.avg" :key="index">{{item.targ_avg | fixed}}</div>
                </div>
                <div class="t_col">
                  <div v-for="(item,index) in resultData.avg" :key="index">{{item.actual_avg | fixed}}</div>
                </div>
                <div class="t_col">
                  <div v-for="(item,index) in resultData.avg" :key="index">{{item.bias_price | fixed}}</div>
                </div>
                <div class="t_col">
                  <div v-for="(item,index) in resultData.avg" :key="index">{{item.bias_per | fixed}}</div>
                </div>
              </div>
              <div>
                <div class="t_col" style="min-width:400px">取证货值去化率</div>
                <div class="t_col">{{resultData.designtwo_selling_takeper}}</div>
                <div class="t_col">{{resultData.actual_selling_takeper}}</div>
                <div class="t_col">{{resultData.bias_selling_takeper}}</div>
                <div class="t_col">{{resultData.biasper_selling_takeper}}</div>
              </div>
              <div>
                <div class="t_col" style="min-width:400px">累计来访(组)</div>
                <div class="t_col">{{resultData.designtwo_add_visit}}</div>
                <div class="t_col">{{resultData.actual_add_visit}}</div>
                <div class="t_col">{{resultData.bias_add_visit}}</div>
                <div class="t_col">{{resultData.biasper_add_visit}}</div>
              </div>
              <div>
                <div class="t_col" style="min-width:400px">累计大卡(组)</div>
                <div class="t_col">{{resultData.designtwo_add_big}}</div>
                <div class="t_col">{{resultData.actual_add_big}}</div>
                <div class="t_col">{{resultData.bias_add_big}}</div>
                <div class="t_col">{{resultData.biasper_add_big}}</div>
              </div>
              <div>
                <div class="t_col" style="min-width:400px">大卡转化率</div>
                <div class="t_col">{{resultData.designtwo_add_big_per}}</div>
                <div class="t_col">{{resultData.actual_add_big_per}}</div>
                <div class="t_col">{{resultData.bias_add_big_per}}</div>
                <div class="t_col">{{resultData.biasper_add_big_per}}</div>
              </div>
              <div>
                <div class="t_col" style="min-width:400px">当天到场客户量(组)</div>
                <div class="t_col">{{resultData.designtwo_this_client}}</div>
                <div class="t_col">{{resultData.actual_this_client}}</div>
                <div class="t_col">{{resultData.bias_this_client}}</div>
                <div class="t_col">{{resultData.biasper_this_client}}</div>
              </div>
              <div>
                <div class="t_col" style="min-width:400px">当天到场客户转化率</div>
                <div class="t_col">{{resultData.designtwo_this_clientper}}</div>
                <div class="t_col">{{resultData.actual_this_clientper}}</div>
                <div class="t_col">{{resultData.bias_this_clientper}}</div>
                <div class="t_col">{{resultData.biasper_this_clientper}}</div>
              </div>
              <div>
                <div class="t_col" style="min-width:400px">成交率</div>
                <div class="t_col">{{resultData.designtwo_finish}}</div>
                <div class="t_col">{{resultData.actual_finish}}</div>
                <div class="t_col">{{resultData.bias_finish}}</div>
                <div class="t_col">{{resultData.biasper_finish}}</div>
              </div>
            </div>
          </div>
        </div>
      </el-collapse-item>
    </el-collapse>
    <div style="text-align: center;">
      <el-button type v-if="this.$route.query.isKSAP" @click="approveOpenNodeInfo()">快速审批</el-button>
    </div>
    <Buttons/>
  </div>
</template>

<script>
import { getOpenThisDayInfo, approveOpenNodeInfo } from "@/api/firstPlan";
export default {
  components:{
    Buttons:()=>import('../../views/offerFlow/component/index')
  },
  data() {
    return {
      form: {
        versions: "开盘v1-20200620"
      },
      openList: ["1", "2"],

      apstatus: 10,
      isShowKS:
        localStorage.getItem("employeeName")
      =='管理员',
      reasonForm: {
        market: "111",
        team: "222",
        prod: "333",
        desc: "444"
      },
      thisDayVersion: [
        {
          id: "",
          name: ""
        }
      ],
      thisVersion: "",
      activeTab: "1",
      isSave: 0,
      //当日
      resultData: {
        project_duty: "",
        take_card_time: "",
        open_time: "",
        take_card_type: "",
        push_real_type: "",
        take_num: "",
        push_num: "",
        take_value: "",
        push_value: "",
        take_avg_price: "",
        push_avg_price: "",
        designtwo_selling_num: "",
        designtwo_selling_value: "",
        designtwo_selling_avg_price: "",
        designtwo_selling_takeper: "",
        designtwo_add_visit: "",
        designtwo_add_big: "",
        designtwo_add_big_per: "",
        designtwo_this_client: "",
        designtwo_this_clientper: "",
        designtwo_finish: "",
        actual_selling_num: "",
        actual_selling_value: "",
        actual_selling_avg_price: "",
        actual_selling_takeper: "",
        actual_add_visit: "",
        actual_add_big: "",
        actual_add_big_per: "",
        actual_this_client: "",
        actual_this_clientper: "",
        actual_finish: "",
        bias_selling_num: "",
        bias_selling_value: "",
        bias_selling_avg_price: "",
        bias_selling_takeper: "",
        bias_add_visit: "",
        bias_add_big: "",
        bias_add_big_per: "",
        bias_this_client: "",
        bias_this_clientper: "",
        bias_finish: "",
        biasper_selling_num: "",
        biasper_selling_value: "",
        biasper_selling_avg_price: "",
        biasper_selling_takeper: "",
        biasper_add_visit: "",
        biasper_add_big: "",
        biasper_add_big_per: "",
        biasper_this_client: "",
        biasper_this_clientper: "",
        biasper_finish: ""
      },
      firstReportData: [
        {
          name1: "取证时间",
          val1: "take_card_time",
          name2: "首开时间",
          val2: "open_time"
        },
        {
          name1: "取证业务类型",
          val1: "take_card_type",
          name2: "推售业务类型",
          val2: "push_real_type"
        },
        {
          name1: "取证楼栋/套数",
          val1: "take_num",
          name2: "推售楼栋/套数",
          val2: "push_num"
        },
        {
          name1: "取证货值(万元)",
          val1: "take_value",
          name2: "推售货值(万元)",
          val2: "push_value"
        },
        {
          name1: "取证均价(元/㎡)",
          val1: "take_avg_price",
          name2: "推售均价(元/㎡)",
          val2: "push_avg_price"
        }
      ],
      sellingData: [
        {
          name: "去化套数(套)",
          designtwo: "designtwo_selling_num",
          actual: "actual_selling_num",
          bias: "bias_selling_num",
          biasper: "biasper_selling_num"
        },
        {
          name: "去化货值(万)",
          designtwo: "designtwo_selling_value",
          actual: "actual_selling_value",
          bias: "bias_selling_value",
          biasper: "biasper_selling_value"
        },
        {
          name: "去化均价(元/㎡)",
          designtwo: "designtwo_selling_avg_price",
          actual: "actual_selling_avg_price",
          bias: "bias_selling_avg_price",
          biasper: "biasper_selling_avg_price"
        },
        {
          name: "取证货值去化率",
          designtwo: "designtwo_selling_takeper",
          actual: "actual_selling_takeper",
          bias: "bias_selling_takeper",
          biasper: "biasper_selling_takeper"
        },
        {
          name: "累计来访(组)",
          designtwo: "designtwo_add_visit",
          actual: "actual_add_visit",
          bias: "bias_add_visit",
          biasper: "biasper_add_visit"
        },
        {
          name: "累计大卡(组)",
          designtwo: "designtwo_add_big",
          actual: "actual_add_big",
          bias: "bias_add_big",
          biasper: "biasper_add_big"
        },
        {
          name: "大卡转化率",
          designtwo: "designtwo_add_big_per",
          actual: "actual_add_big_per",
          bias: "bias_add_big_per",
          biasper: "biasper_add_big_per"
        },
        {
          name: "当天到场客户量(组)",
          designtwo: "designtwo_this_client",
          actual: "actual_this_client",
          bias: "bias_this_client",
          biasper: "biasper_this_client"
        },
        {
          name: "当天到场客户转化率",
          designtwo: "designtwo_this_clientper",
          actual: "actual_this_clientper",
          bias: "bias_this_clientper",
          biasper: "biasper_this_clientper"
        },
        {
          name: "成交率",
          designtwo: "designtwo_finish",
          actual: "actual_finish",
          bias: "bias_finish",
          biasper: "biasper_finish"
        }
      ],

      //次日
      resultDataCR: {
        invest_xreal_type: "",
        invest_take_card_value: "",
        invest_open_node: "",
        invest_push_value: "",
        invest_selling_value: "",
        invest_take_card_per: "",
        invest_open_avg_price: "",
        invest_create_per: "",
        invest_all_per: "",
        invest_irr: "",
        invest_payback: "",
        rules_xreal_type: "",
        rules_take_card_value: "",
        rules_open_node: "",
        rules_push_value: "",
        rules_selling_value: "",
        rules_take_card_per: "",
        rules_open_avg_price: "",
        rules_create_per: "",
        rules_all_per: "",
        rules_irr: "",
        rules_payback: "",
        estimate_xreal_type: "",
        estimate_take_card_value: "",
        estimate_open_node: "",
        estimate_push_value: "",
        estimate_selling_value: "",
        estimate_take_card_per: "",
        estimate_open_avg_price: "",
        estimate_create_per: "",
        estimate_all_per: "",
        estimate_irr: "",
        estimate_payback: "",
        cash_xreal_type: "",
        cash_take_card_value: "",
        cash_open_node: "",
        cash_push_value: "",
        cash_selling_value: "",
        cash_take_card_per: "",
        cash_open_avg_price: "",
        cash_create_per: "",
        cash_all_per: "",
        cash_irr: "",
        cash_payback: "",
        bias_xreal_type: "",
        bias_take_card_value: "",
        bias_open_node: "",
        bias_push_value: "",
        bias_selling_value: "",
        bias_take_card_per: "",
        bias_open_avg_price: "",
        bias_create_per2: "",
        bias_create_per: "",
        bias_all_per: "",
        bias_irr: "",
        bias_payback: "",
        biasper_xreal_type: "",
        biasper_take_card_value: "",
        biasper_open_node: "",
        biasper_push_value: "",
        biasper_selling_value: "",
        biasper_take_card_per: "",
        biasper_open_avg_price: "",
        biasper_create_per: "",
        biasper_all_per: "",
        biasper_irr: "",
        biasper_payback: "",
        content_bazaar: "",
        content_team: "",
        content_product: "",
        content_policy: ""
      },
      secondReportData: [
        {
          name: "首开节点",
          invest: "invest_open_node",
          rules: "rules_open_node",
          estimate: "estimate_open_node",
          bias: "bias_open_node",
          biasper: "biasper_open_node",
          cash: "cash_open_node"
        },
        {
          name: "首开物业类型",
          invest: "invest_xreal_type",
          rules: "rules_xreal_type",
          estimate: "estimate_xreal_type",
          bias: "bias_xreal_type",
          biasper: "biasper_xreal_type",
          cash: "cash_xreal_type"
        },
        {
          name: "首开取证货值(万元)",
          invest: "invest_take_card_value",
          rules: "rules_take_card_value",
          estimate: "estimate_take_card_value",
          bias: "bias_take_card_value",
          cash: "cash_take_card_value"
        },
        {
          name: "首开推售货值(万元)",
          invest: "invest_push_value",
          rules: "rules_push_value",
          estimate: "estimate_push_value",
          bias: "bias_push_value",
          biasper: "biasper_push_value",
          cash: "cash_push_value"
        },
        {
          name: "首开去化货值(万元)",
          invest: "invest_selling_value",
          rules: "rules_selling_value",
          estimate: "estimate_selling_value",
          bias: "bias_selling_value",
          biasper: "biasper_selling_value",
          cash: "cash_selling_value"
        },
        {
          name: "首开均价(元/㎡)",
          invest: "invest_open_avg_price",
          rules: "rules_open_avg_price",
          estimate: "estimate_open_avg_price",
          bias: "bias_open_avg_price",
          biasper: "biasper_open_avg_price",
          cash: "cash_open_avg_price"
        },
        {
          name: "首开取证货值去化率",
          invest: "invest_take_card_per",
          rules: "rules_take_card_per",
          estimate: "estimate_take_card_per",
          bias: "bias_take_card_per",
          biasper: "biasper_take_card_per",
          cash: "cash_take_card_per"
        },
        {
          name: "创造利润率",
          invest: "invest_create_per",
          rules: "rules_create_per",
          estimate: "estimate_create_per",
          bias: "bias_create_per",
          biasper: "biasper_create_per",
          cash: "cash_create_per"
        },
        {
          name: "整盘利润率",
          invest: "invest_all_per",
          rules: "rules_all_per",
          estimate: "estimate_all_per",
          bias: "bias_all_per",
          biasper: "biasper_all_per",
          cash: "cash_all_per"
        },
        {
          name: "非融IRR",
          invest: "invest_irr",
          rules: "rules_irr",
          estimate: "estimate_irr",
          bias: "bias_irr",
          biasper: "biasper_irr",
          cash: "cash_irr"
        },
        {
          name: "静态投资回收期(月)",
          invest: "invest_payback",
          rules: "rules_payback",
          estimate: "estimate_payback",
          bias: "bias_payback",
          biasper: "biasper_payback",
          cash: "cash_payback"
        }
      ],
      flow_id: "",
      comeData: [
        {
          week: "",
          //日期
          day_date: "",
          //计划新增
          plan_add: "",
          //计划累计
          plan_total: "",
          plan_task_per: "",
          actual_add: "",
          actual_task_per: "",
          bias_value: "",
          bias_per: "",
          week_bais_value: "",
          bias_cause: ""
        }
      ],
      nodeData: [
        {
          nide_name: "",
          plan_node_id: "",
          node_level: "",
          level: "",
          //报备
          report_num: "",
          //日期
          node_time: "",
          //计划/实际/偏差率
          line_name: "",
          id: "",
          //来访
          visit_num: "",
          plan_id: "",
          //小卡
          little_num: "",
          //小卡率
          little_per: "",
          //大卡组
          big_num: "",
          //大卡率
          big_per: "",
          //认购套
          sub_num: "",
          //成交率
          make_per: ""
        }
      ],
      thisMorrowDayVersion: ""
    };
  },
  filters: {
    fixed(data){
      if(!data){
        return 0.00
      }
      return data.toFixed(2)
    }
  },
  mounted() {
    let timeid = setTimeout(() => {
      if (window.cifioa) {
        console.log(this.$refs.openingDayInfo.offsetHeight);
        window.cifioa.sendMessage({
          type: "height",
          height: this.$refs.openingDayInfo.offsetHeight
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
        console.log(this.$refs.openingDayInfo.offsetHeight);
        window.cifioa.sendMessage({
          type: "height",
          height: this.$refs.openingDayInfo.offsetHeight
        });
      } else {
        console.warn("缺少cifioa插件");
      }
      clearTimeout(timeid);
    }, 700);
  },
  methods: {
    openChange(val) {},
    FomartDate(date) {
      var y = date.getFullYear();
      var m = date.getMonth() + 1;
      var d = date.getDate();
      var H = date.getHours();
      var M = date.getMinutes();
      var S = date.getSeconds();
      function Covering(num) {
        return num >= 10 ? num : "0" + num;
      }
      return y + "-" + Covering(m) + "-" + Covering(d);
    },
    reload() {
      this.getOpenThisDayInfo();
    },
    //渲染当日播报数据
    getOpenThisDayInfo() {
      getOpenThisDayInfo({
        plan_node_id: this.$route.query.BOID
      }).then(res => {
        if (res.result != null) {
          this.resultData = res.result;
        } else {
          this.resultData = {};
        }
      });
    },
    approveOpenNodeInfo() {
      approveOpenNodeInfo({
        businesskey: this.$route.query.BOID,
        orgName: "fp_open",
        plan_id: this.resultData.plan_id
      }).then(res => {
        window.close();
      });
    },
    mergeCol({ row, column, rowIndex, columnIndex }) {
      if (columnIndex < 2) {
        if (rowIndex % 3 === 0) {
          return {
            rowspan: 3,
            colspan: 1
          };
        } else {
          return {
            rowspan: 0,
            colspan: 0
          };
        }
      }
    },
    scrollLink(id) {
      document.getElementById(id).scrollIntoView();
    },
    changeValue(value, type) {
      this.$set(this.resultData, type, value);
    },
    timestampToTime(cjsj) {
      if (!cjsj) {
        //时间戳为10位需*1000，时间戳为13位的话不需乘1000
        return "";
      }
      var date = new Date(cjsj);
      var Y = date.getFullYear() + "-";
      var M =
        (date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1) + "-";
      var D = date.getDate() + " ";
      var h = date.getHours() + ":";
      var m = date.getMinutes() + ":";
      var s = date.getSeconds();
      return Y + M + D;
    }
  },
  created() {
    this.reload();
  }
};
</script>

<style lang="less" scoped>
.openingDayInfo {
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
  ::v-deep  .el-form-item__content {
      margin-left: 120px !important;
    }

  ::v-deep  .inputForm .el-col-8 {
      width: 100% !important;
    }
  }
}

.openingDayInfoinput {
  div {
    box-sizing: border-box;
  }
  .top {
    background: #fff;
    color: #333;
    font-size: 14px;
    height: 50px;
   ::v-deep .el-form {
      width: 40%;
    }
  ::v-deep  .el-button {
      height: 30px;
      float: right;
      margin-left: 10px;
      margin-top: 10px;
    }
  ::v-deep  .el-button:first-child {
      margin-right: 15px;
    }
  }
 ::v-deep .el-tabs__nav-wrap::after {
    display: none;
  }
 ::v-deep .el-tabs__active-bar {
    display: none;
  }
  .selling {
    padding: 0 15px;
    margin-bottom: 15px;

    p {
      height: 30px;
      line-height: 30px;
      color: #333;
      font-size: 14px;
    }

    .bold {
      font-weight: 700;
    }

    .sellingTable {
      // background: pink;
      border: 0.5px solid #e6e6e6;
      overflow-x: auto;
      > div {
        height: 40px;
        display: flex;
        &.t_head {
          background: rgb(245, 247, 250);
          color: rgb(153, 153, 153);
        }
        > .t_col {
          min-width: 100px;
          flex: 1;
          line-height: 40px;
          text-align: center;
          border-right: 0.5px solid #e6e6e6;
          border-bottom: 0.5px solid #e6e6e6;
          > div {
            border-bottom: 0.5px solid #e6e6e6;
          }
          > div:last-child {
            border-bottom: none;
          }
        }
        .t_col_l {
          // width: 400px;
          border-right: 0.5px solid #e6e6e6;
          border-bottom: 0.5px solid #e6e6e6;
          text-align: center !important;
          line-height: 40px;
          height: 40px;
          display: flex;
          > div {
            width: 50%;
            border-right: 0.5px solid #e6e6e6;
          }
          .t_col_cell {
            height: 40px;
            border-bottom: 0.5px solid #e6e6e6;
            line-height: 40px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }
      }
    }
  }
  .firstReport {
    padding: 0 15px;
    margin-bottom: 15px;

    p {
      height: 30px;
      line-height: 30px;
      color: #333;
      font-size: 14px;
    }

    .bold {
      font-weight: 700;
    }

    .db_cell {
      display: flex;
      width: 100%;
      color: #666;

      > div {
        flex: 1;
        text-align: center;
      }

      > div:first-child {
        // background: #000;
        width: 140px;
        flex: 0 1 auto;
        height: 35px;
        border-right: 1px solid #e6e6e6;
        line-height: 35px;
      }

      > div:nth-child(2) {
        // background: #000;
        // border-right:1px solid #999;
        padding: 0 15px;
        line-height: 35px;
      }
    }
  }
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
  .targetTime {
    width: 200px;
  }
}
</style>
