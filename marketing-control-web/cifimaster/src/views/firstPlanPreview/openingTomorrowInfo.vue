<template>
  <div class="openingTomorrowInfo" ref="openingTomorrowInfo">
    <el-collapse v-model="openList" @change="openChange">
      <el-collapse-item title="基础信息" name="1">
        <template slot="title">
          <h3 class="titleText">基础信息</h3>
        </template>
        <ul class="baseInfo">
          <li>
            <el-row>
              <el-col style="text-align:right;" :span="8">项目名称 :</el-col>
              <el-col style="padding-left:16px;" :span="16">{{resultDataCR.projectName}}</el-col>
            </el-row>
          </li>
          <li>
            <el-row>
              <el-col style="text-align:right;" :span="8">申请人部门 :</el-col>
              <el-col style="padding-left:16px;" :span="16">{{resultDataCR.post_name}}</el-col>
            </el-row>
          </li>
          <li>
            <el-row>
              <el-col style="text-align:right;" :span="8">申请时间 :</el-col>
              <el-col style="padding-left:16px;" :span="16">{{resultDataCR.zddate}}</el-col>
            </el-row>
          </li>
          <li>
            <el-row>
              <el-col style="text-align:right;" :span="8">申请人 :</el-col>
              <el-col style="padding-left:16px;" :span="16">{{resultDataCR.EmployeeName}}</el-col>
            </el-row>
          </li>
        </ul>
      </el-collapse-item>
      <el-collapse-item title="审批信息" name="2">
        <template slot="title">
          <h3 class="titleText">审批信息</h3>
        </template>
        <div class="openingTomorrowInfoinput">
          <div class="secondReport" id="secondReport">
            <p class="bold">首开次日播报表</p>
            <div class="secondReportTable">
              <div class="t_head">
                <div class="t_col" style="min-width:400px"></div>
                <div class="t_col">投资版</div>
                <div class="t_col">战规版</div>
                <div class="t_col">首开前七天预估版</div>
                <div class="t_col">兑现版</div>
                <div class="t_col">偏差</div>
                <div class="t_col">偏差率</div>
              </div>
              <div>
                <div class="t_col" style="min-width:400px">首开节点</div>
                <div class="t_col">{{resultDataCR.invest_open_node}}</div>
                <div class="t_col">{{resultDataCR.rules_open_node}}</div>
                <div class="t_col">{{resultDataCR.estimate_open_node}}</div>
                <div class="t_col" v-if="apstatus!=4 && apstatus!=3">
                  <span>{{resultDataCR.cash_open_node}}</span>
                </div>
                <div class="t_col" v-if="apstatus==4 || apstatus==3">{{resultDataCR.cash_open_node}}</div>
                <div class="t_col">{{resultDataCR.bias_open_node}}</div>
                <div
                  class="t_col"
                >{{isNaN(resultDataCR.biasper_open_node)?0:resultDataCR.biasper_open_node}}</div>
              </div>
              <div>
                <div class="t_col" style="min-width:400px">首开物业类型</div>
                <el-tooltip
                  class="t_col"
                  :content="resultDataCR.invest_xreal_type"
                  :disabled="!resultDataCR.invest_xreal_type"
                  placement="bottom"
                  effect="light"
                >
                  <div>{{resultDataCR.invest_xreal_type}}</div>
                </el-tooltip>
                <el-tooltip
                  class="t_col"
                  :content="resultDataCR.rules_xreal_type"
                  :disabled="!resultDataCR.rules_xreal_type"
                  placement="bottom"
                  effect="light"
                >
                  <div>{{resultDataCR.rules_xreal_type}}</div>
                </el-tooltip>
                <el-tooltip
                  class="t_col"
                  :content="resultDataCR.estimate_xreal_type"
                  :disabled="!resultDataCR.estimate_xreal_type"
                  placement="bottom"
                  effect="light"
                >
                  <div>{{resultDataCR.estimate_xreal_type}}</div>
                </el-tooltip>
                <el-tooltip
                  class="t_col"
                  :content="resultDataCR.cash_xreal_type"
                  :disabled="!resultDataCR.cash_xreal_type"
                  placement="bottom"
                  effect="light"
                >
                  <div>{{resultDataCR.cash_xreal_type}}</div>
                </el-tooltip>
                <div class="t_col">--</div>
                <div class="t_col">--</div>
              </div>
              <div>
                <div class="t_col" style="min-width:400px">首开取证货值(万元)</div>
                <div class="t_col">{{resultDataCR.invest_take_card_value}}</div>
                <div class="t_col">{{resultDataCR.rules_take_card_value}}</div>
                <div class="t_col">{{resultDataCR.estimate_take_card_value}}</div>
                <div class="t_col" v-if="apstatus!=4 && apstatus!=3">
                  <span v-text="resultDataCR.cash_take_card_value"></span>
                </div>
                <div
                  class="t_col"
                  v-if="apstatus==4 || apstatus==3"
                >{{resultDataCR.cash_take_card_value}}</div>
                <div class="t_col">{{resultDataCR.bias_take_card_value}}</div>
                <div class="t_col">{{resultDataCR.biasper_take_card_value}}</div>
              </div>

              <div>
                <div class="t_col" style="min-width:400px">首开推售货值(万元)</div>
                <div class="t_col">{{resultDataCR.invest_push_value}}</div>
                <div class="t_col">{{resultDataCR.rules_push_value}}</div>
                <div class="t_col">{{resultDataCR.estimate_push_value}}</div>
                <div class="t_col" v-if="apstatus!=4 && apstatus!=3">
                  <span v-text="resultDataCR.cash_push_value"></span>
                </div>
                <div
                  class="t_col"
                  v-if="apstatus==4 || apstatus==3"
                >{{resultDataCR.cash_push_value}}</div>
                <div class="t_col">{{resultDataCR.bias_push_value}}</div>
                <div class="t_col">{{resultDataCR.biasper_push_value}}</div>
              </div>
              <div>
                <div class="t_col" style="min-width:400px">首开去化货值(万元)</div>
                <div class="t_col">{{resultDataCR.invest_selling_value}}</div>
                <div class="t_col">{{resultDataCR.rules_selling_value}}</div>
                <div class="t_col">{{resultDataCR.estimate_selling_value}}</div>
                <div class="t_col" v-if="apstatus!=4 && apstatus!=3">
                  <span v-text="resultDataCR.cash_selling_value"></span>
                </div>
                <div
                  class="t_col"
                  v-if="apstatus==4 || apstatus==3"
                >{{resultDataCR.cash_selling_value}}</div>
                <div class="t_col">{{resultDataCR.bias_selling_value}}</div>
                <div class="t_col">{{resultDataCR.biasper_selling_value}}</div>
              </div>
              <div
                v-if="resultDataCR.avg!=null && resultDataCR.avg.length>0"
                :style="{'height':resultDataCR.avg.length*40+'px'}"
              >
                <div
                  :style="{'line-height':resultDataCR.avg.length*40+'px','height':resultDataCR.avg.length*40+'px','min-width': '400px'}"
                  class="t_col_l"
                >
                  <div>首开均价(元/㎡)</div>
                  <div>
                    <div
                      class="t_col_cell"
                      v-for="(item,index) in resultDataCR.avg"
                      :key="index"
                    >{{item.product_type}}</div>
                  </div>
                </div>

                <div class="t_col">
                  <div v-for="(item,index) in resultDataCR.avg" :key="index">{{item.invest_avg | fixed}}</div>
                </div>
                <div class="t_col">
                  <div v-for="(item,index) in resultDataCR.avg" :key="index">{{item.rules_avg | fixed}}</div>
                </div>
                <div class="t_col">
                  <div v-for="(item,index) in resultDataCR.avg" :key="index">{{item.estimate_price | fixed}}</div>
                </div>
                <div class="t_col" v-if="apstatus!=4 && apstatus!=3">
                  <div v-for="(item,index) in resultDataCR.avg" :key="index">
                    <span>{{item.cash_price | fixed}}</span>
                  </div>
                </div>
                <div class="t_col">
                  <div v-for="(item,index) in resultDataCR.avg" :key="index">{{item.bias_price | fixed}}</div>
                </div>
                <div class="t_col">
                  <div v-for="(item,index) in resultDataCR.avg" :key="index">{{item.bias_per | fixed}}</div>
                </div>
              </div>

              <div>
                <div class="t_col" style="min-width:400px">首开取证货值去化率</div>
                <div class="t_col">{{resultDataCR.invest_take_card_per}}</div>
                <div class="t_col">{{resultDataCR.rules_take_card_per}}</div>
                <div class="t_col">{{resultDataCR.estimate_take_card_per}}</div>
                <div class="t_col" v-if="apstatus!=4 && apstatus!=3">
                  <span v-text="resultDataCR.cash_take_card_per"></span>
                </div>
                <div
                  class="t_col"
                  v-if="apstatus==4 || apstatus==3"
                >{{resultDataCR.cash_take_card_per}}</div>
                <div class="t_col">{{resultDataCR.bias_take_card_per}}</div>
                <div class="t_col">{{resultDataCR.biasper_take_card_per}}</div>
              </div>

              <div>
                <div class="t_col" style="min-width:400px">创造利润率</div>
                <div class="t_col">{{resultDataCR.invest_create_per}}</div>
                <div class="t_col">{{resultDataCR.rules_create_per}}</div>
                <div class="t_col">{{resultDataCR.estimate_create_per}}</div>
                <div class="t_col" v-if="apstatus!=4 && apstatus!=3">
                  <span v-text="resultDataCR.cash_create_per"></span>
                </div>
                <div
                  class="t_col"
                  v-if="apstatus==4 || apstatus==3"
                >{{resultDataCR.cash_create_per}}</div>
                <div class="t_col">{{resultDataCR.bias_create_per}}</div>
                <div class="t_col">{{resultDataCR.biasper_create_per}}</div>
              </div>

              <div>
                <div class="t_col" style="min-width:400px">整盘利润率</div>
                <div class="t_col">{{resultDataCR.invest_all_per}}</div>
                <div class="t_col">{{resultDataCR.rules_all_per}}</div>
                <div class="t_col">{{resultDataCR.estimate_all_per}}</div>
                <div class="t_col" v-if="apstatus!=4 && apstatus!=3">
                  <span v-text="resultDataCR.cash_all_per"></span>
                </div>
                <div class="t_col" v-if="apstatus==4 || apstatus==3">{{resultDataCR.cash_all_per}}</div>
                <div class="t_col">{{resultDataCR.bias_all_per}}</div>
                <div class="t_col">{{resultDataCR.biasper_all_per}}</div>
              </div>

              <div>
                <div class="t_col" style="min-width:400px">非融IRR</div>
                <div class="t_col">{{resultDataCR.invest_irr}}</div>
                <div class="t_col">{{resultDataCR.rules_irr}}</div>
                <div class="t_col">{{resultDataCR.estimate_irr}}</div>
                <div class="t_col" v-if="apstatus!=4 && apstatus!=3">
                  <span v-text="resultDataCR.cash_irr"></span>
                </div>
                <div class="t_col" v-if="apstatus==4 || apstatus==3">{{resultDataCR.cash_irr}}</div>
                <div class="t_col">{{resultDataCR.bias_irr}}</div>
                <div class="t_col">{{resultDataCR.biasper_irr}}</div>
              </div>

              <div>
                <div class="t_col" style="min-width:400px">静态投资回收期(月)</div>
                <div class="t_col">{{resultDataCR.invest_payback}}</div>
                <div class="t_col">{{resultDataCR.rules_payback}}</div>
                <div class="t_col">{{resultDataCR.estimate_payback}}</div>
                <div class="t_col" v-if="apstatus!=4 && apstatus!=3">
                  <span v-text="resultDataCR.cash_payback"></span>
                </div>
                <div class="t_col" v-if="apstatus==4 || apstatus==3">{{resultDataCR.cash_payback}}</div>
                <div class="t_col">{{resultDataCR.bias_payback}}</div>

                <div class="t_col">{{resultDataCR.biasper_payback}}</div>
              </div>
            </div>
          </div>
          <div class="reason" id="reason">
            <p class="bold">核心偏差原因说明</p>
            <el-form :model="reasonForm" ref="reasonForm" label-width="60px">
              <el-form-item label="市场" prop="market">
                <el-input
                  type="textarea"
                  show-word-limit
                  maxlength="100"
                  :readonly="true"
                  v-model="resultDataCR.content_bazaar"
                ></el-input>
              </el-form-item>
              <el-form-item label="团队" prop="team">
                <el-input
                  type="textarea"
                  show-word-limit
                  maxlength="100"
                  :readonly="true"
                  v-model="resultDataCR.content_team"
                ></el-input>
              </el-form-item>
              <el-form-item label="产品" prop="prod">
                <el-input
                  type="textarea"
                  show-word-limit
                  :readonly="true"
                  maxlength="100"
                  v-model="resultDataCR.content_product"
                ></el-input>
              </el-form-item>
              <el-form-item label="政策" prop="desc">
                <el-input
                  type="textarea"
                  show-word-limit
                  maxlength="100"
                  :readonly="true"
                  v-model="resultDataCR.content_policy"
                ></el-input>
              </el-form-item>
            </el-form>
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
import { getOpenVersionById, approveOpenNodeInfo } from "@/api/firstPlan";
export default {
  components:{
    Buttons:()=>import('../../views/offerFlow/component/index')

  },
  data() {
    return {
      form: {
        versions: "开盘v1-20200620"
      },
      isShowKS:
        localStorage.getItem("employeeName")
      =='管理员',
      apstatus: 10,
      reasonForm: {
        market: "111",
        team: "222",
        prod: "333",
        desc: "444"
      },
      openList: ["1", "2"],
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
  mounted() {
    let timeid = setTimeout(() => {
      if (window.cifioa) {
        console.log(this.$refs.openingTomorrowInfo.offsetHeight);
        window.cifioa.sendMessage({
          type: "height",
          height: 1210
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
        console.log(this.$refs.openingTomorrowInfo.offsetHeight);
        window.cifioa.sendMessage({
          type: "height",
          height: 1210
        });
      } else {
        console.warn("缺少cifioa插件");
      }
      clearTimeout(timeid);
    }, 700);
  },
  methods: {
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
      this.getOpenVersionById();
    },
    //渲染次日播报数据
    getOpenVersionById() {
      getOpenVersionById({
        id: this.$route.query.BOID
      }).then(res => {
        this.resultDataCR = res.result.info;
      });
    },
    approveOpenNodeInfo() {
      approveOpenNodeInfo({
        businesskey: this.$route.query.BOID,
        orgName: "fp_open_morrow"
      }).then(res => {
        window.close();
      });
    },
    openChange(val) {
      console.log(val);
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
.openingTomorrowInfo {
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
::v-deep  .form_item_title {
    border: none !important;
  }
::v-deep  .form-container .form_item {
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
  ::v-deep  .el-form-item__label {
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

.openingTomorrowInfoinput {
  div {
    box-sizing: border-box;
  }
  .top {
    background: #fff;
    color: #333;
    font-size: 14px;
    height: 50px;
  ::v-deep  .el-form {
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
      > div {
        height: 40px;
        display: flex;
        > .t_col {
          flex: 1;
          line-height: 40px;
          text-align: center;
          border-right: 0.5px solid #e6e6e6;
          border-bottom: 0.5px solid #e6e6e6;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          > div {
            border-bottom: 0.5px solid #e6e6e6;
          }
          > div:last-child {
            border-bottom: none;
          }
        }
        .t_col_l {
          width: 400px;
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
          }
        }
      }
    }
  }

  .secondReport {
    margin-bottom: 15px;
    padding: 0 15px;

    p {
      height: 30px;
      line-height: 30px;
      color: #333;
      font-size: 14px;
    }

    .bold {
      font-weight: 700;
    }
    .secondReportTable {
      overflow-x: auto;
      border: 0.5px solid #e6e6e6;
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
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          > div {
            border-bottom: 0.5px solid #e6e6e6;
          }
          > div:last-child {
            border-bottom: none;
          }
        }
        .t_col_l {
          width: 400px;
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
          }
        }
      }
    }
  }

  .reason {
    margin-bottom: 15px;
    padding: 0 15px;

    p {
      height: 30px;
      line-height: 30px;
      color: #333;
      font-size: 14px;
    }

    .bold {
      font-weight: 700;
    }

   ::v-deep .el-textarea__inner {
      height: 90px;
    }

   ::v-deep .el-form-item__content {
      margin-bottom: 10px;
    }
  }

  .come {
    margin-bottom: 15px;
    padding: 0 15px;

    p {
      height: 30px;
      line-height: 30px;
      color: #333;
      font-size: 14px;
    }

    .bold {
      font-weight: 700;
    }
  }

  .node {
    margin-bottom: 15px;
    padding: 0 15px;

    p {
      height: 30px;
      line-height: 30px;
      color: #333;
      font-size: 14px;
    }

    .bold {
      font-weight: 700;
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
