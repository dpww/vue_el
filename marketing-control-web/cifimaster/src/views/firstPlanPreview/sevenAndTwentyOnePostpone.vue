<template>
  <div class="sevenAndTwentyOnePostpone" ref="sevenAndTwentyOnePostpone">
    <el-collapse v-model="openList" @change="openChange">
      <el-collapse-item title="基础信息" name="1">
        <template slot="title">
          <h3 class="titleText">基础信息</h3>
        </template>
        <ul class="baseInfo">
          <li>
            <el-row>
              <el-col style="text-align:right;" :span="8">项目名称 :</el-col>
              <el-col style="padding-left:16px;" :span="16">{{getAppllayDataInfo.projectName}}</el-col>
            </el-row>
          </li>
          <li>
            <el-row>
              <el-col style="text-align:right;" :span="8">申请人部门 :</el-col>
              <el-col style="padding-left:16px;" :span="16">{{getAppllayDataInfo.postName}}</el-col>
            </el-row>
          </li>
          <li>
            <el-row>
              <el-col style="text-align:right;" :span="8">申请时间 :</el-col>
              <el-col style="padding-left:16px;" :span="16">{{getAppllayDataInfo.zddate}}</el-col>
            </el-row>
          </li>
          <li>
            <el-row>
              <el-col style="text-align:right;" :span="8">申请人 :</el-col>
              <el-col style="padding-left:16px;" :span="16">{{getAppllayDataInfo.employeeName}}</el-col>
            </el-row>
          </li>
        </ul>
      </el-collapse-item>
      <el-collapse-item title="审批信息" name="2">
        <template slot="title">
          <h3 class="titleText">审批信息</h3>
        </template>
        <div class="sevenDays">
          <div class="containter">
            <div class="open" id="open">
              <p class="bold">延期开盘申请表</p>
              <div class="table">
                <div class="table_top">
                  <div class="left">日期调整</div>
                  <div>
                    <div :key="index" class="_cell" v-for="(item,index) in dateList">{{item.type}}</div>
                  </div>
                  <div>
                    <div :key="index" class="_cell" v-for="(item,index) in dateList">
                      <span v-if="index!=4">{{openApplyData[item.date]}}</span>
                      <span
                        v-else-if="index==4&&approval_stuat!=4&&approval_stuat!=3"
                      >{{openApplyData.new_first_time}}</span>
                      <span v-else>{{openApplyData.new_first_time}}</span>
                    </div>
                  </div>
                </div>
                <div class="table_bottom">
                  <div class="left">延期原因</div>
                  <div>
                    <el-input
                      type="textarea"
                      v-if="approval_stuat!=4&&approval_stuat!=3"
                      v-model="openApplyData.delay_reasons"
                      :readonly="true"
                    ></el-input>
                    <span v-else>{{openApplyData.delay_reasons}}</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="rate" id="rate">
              <p class="bold">客储达成进度</p>
              <el-table
                :data="firstReportData"
                :header-cell-style="{background:'#F5F7FA',color:'#999'}"
                :span-method="mergeRow"
                border
                style="width: 100%"
              >
                <el-table-column label prop="type" width="180">
                  <template slot-scope="scope">
                    <div class="db_cell">{{scope.row.type}}</div>
                  </template>
                </el-table-column>
                <el-table-column label prop="name" width="100">
                  <template slot-scope="scope">
                    <div class="db_cell">{{scope.row.name1}}</div>
                  </template>
                </el-table-column>
                <el-table-column label="时间段" width="200" prop="num">
                  <template slot-scope="scope">
                    <div class="db_cell">{{openApplyData[scope.row.val1]}}</div>
                  </template>
                </el-table-column>
                <el-table-column label="来访" prop="num">
                  <template slot-scope="scope">
                    <div class="db_cell">
                      <div
                        v-if="scope.$index!=2"
                      >{{isNaN(openApplyData[scope.row.val2])?0:openApplyData[scope.row.val2]}}</div>
                      <span
                        v-else-if="scope.$index==2&&approval_stuat!=4&&approval_stuat!=3"
                        v-text="openApplyData[scope.row.val2]"
                      ></span>
                      <span
                        v-else
                      >{{isNaN(openApplyData[scope.row.val2])?0:openApplyData[scope.row.val2]}}</span>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column label="小卡" prop="num">
                  <template slot-scope="scope">
                    <div class="db_cell">
                      <div
                        v-if="scope.$index!=2"
                      >{{isNaN(openApplyData[scope.row.val3])?0:openApplyData[scope.row.val3]}}</div>
                      <span
                        v-else-if="scope.$index==2&&approval_stuat!=4&&approval_stuat!=3"
                        v-text="openApplyData[scope.row.val3]"
                      ></span>
                      <span
                        v-else
                      >{{isNaN(openApplyData[scope.row.val3])?0:openApplyData[scope.row.val3]}}</span>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column label="小卡率(%)" prop="num">
                  <template slot-scope="scope">
                    <div
                      class="db_cell"
                    >{{isNaN(openApplyData[scope.row.val4])?0:openApplyData[scope.row.val4]}}</div>
                  </template>
                </el-table-column>

                <el-table-column label="大卡" prop="num">
                  <template slot-scope="scope">
                    <div class="db_cell">
                      <div
                        v-if="scope.$index!=2"
                      >{{isNaN(openApplyData[scope.row.val5])?0:openApplyData[scope.row.val5]}}</div>
                      <span
                        v-else-if="scope.$index==2&&approval_stuat!=4&&approval_stuat!=3"
                        v-text="openApplyData[scope.row.val5]"
                      ></span>
                      <span
                        v-else
                      >{{isNaN(openApplyData[scope.row.val5])?0:openApplyData[scope.row.val5]}}</span>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column label="大卡率(%)" prop="num">
                  <template slot-scope="scope">
                    <div class="db_cell">
                      <div>{{isNaN(openApplyData[scope.row.val6])?0:openApplyData[scope.row.val6]}}</div>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column label="认购" prop="num">
                  <template slot-scope="scope">
                    <div class="db_cell">
                      <div
                        v-if="scope.$index!=2"
                      >{{isNaN(openApplyData[scope.row.val7])?0:openApplyData[scope.row.val7]}}</div>
                      <span
                        v-else-if="scope.$index==2&&approval_stuat!=4&&approval_stuat!=3"
                        v-text="openApplyData[scope.row.val7]"
                      ></span>
                      <span
                        v-else
                      >{{isNaN(openApplyData[scope.row.val7])?0:openApplyData[scope.row.val7]}}</span>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column label="成交率(%)" prop="num">
                  <template slot-scope="scope">
                    <div class="db_cell">{{openApplyData[scope.row.val8]}}</div>
                  </template>
                </el-table-column>
              </el-table>
            </div>
            <div class="node" id="node_">
              <p class="bold">变更节点客储计划</p>
              <el-table
                :data="customerNodeStorage"
                :header-cell-style="{background:'#F5F7FA',color:'#999'}"
                border
                style="width: 100%"
              >
                <el-table-column align="center" label="节点" prop="node_name" width="160"></el-table-column>
                <el-table-column align="center" label="日期" prop="node_time" width="160"></el-table-column>
                <el-table-column align="center" label prop="line_name"></el-table-column>

                <el-table-column align="center" label="来访(组)" prop="visit_num">
                  <template slot-scope="scope">
                    <span
                      v-if="1==1&&approval_stuat!=4&&approval_stuat!=3"
                      v-text="scope.row.visit_num"
                    ></span>
                    <span v-else>{{scope.row.visit_num}}</span>
                  </template>
                </el-table-column>
                <el-table-column align="center" label="小卡(组)" prop="little_num">
                  <template slot-scope="scope">
                    <span
                      v-if="1==1&&approval_stuat!=4&&approval_stuat!=3"
                      v-text="scope.row.little_num"
                    ></span>
                    <span v-else>{{scope.row.little_num}}</span>
                  </template>
                </el-table-column>
                <el-table-column align="center" label="小卡率(%)" prop="little_per">
                  <template
                    slot-scope="scope"
                  >{{isNaN(scope.row.little_per)?0:scope.row.little_per}}</template>
                </el-table-column>
                <el-table-column align="center" label="大卡(组)" prop="big_num">
                  <template slot-scope="scope">
                    <span
                      v-if="1==1&&approval_stuat!=4&&approval_stuat!=3"
                      v-text="scope.row.big_num"
                    ></span>
                    <span v-else>{{scope.row.big_num}}</span>
                  </template>
                </el-table-column>
                <el-table-column align="center" label="大卡率(%)" prop="big_per">
                  <template slot-scope="scope">{{isNaN(scope.row.big_per)?0:scope.row.big_per}}</template>
                </el-table-column>
                <el-table-column align="center" label="认购(套)" prop="sub_num">
                  <template slot-scope="scope">
                    <span
                      v-if="1==1&&approval_stuat!=4&&approval_stuat!=3"
                      v-text="scope.row.sub_num"
                    ></span>
                    <span v-else>{{scope.row.sub_num}}</span>
                  </template>
                </el-table-column>
                <el-table-column align="center" label="成交率(%)" prop="make_per">
                  <template slot-scope="scope">{{isNaN(scope.row.make_per)?0:scope.row.make_per}}</template>
                </el-table-column>
              </el-table>
            </div>
            <div class="card" id="card_2">
              <p class="bold">办卡方式</p>
              <el-form :model="cardForm" class="cardForm" label-width="60px" ref="cardForm">
                <el-form-item label="小卡" prop="small">
                  <el-input
                    maxlength="100"
                    show-word-limit
                    type="textarea"
                    :readonly="true"
                    v-model="openApplyData.little_model"
                  ></el-input>
                </el-form-item>
                <el-form-item label="大卡" prop="big">
                  <el-input
                    maxlength="100"
                    show-word-limit
                    type="textarea"
                    :readonly="true"
                    v-model="openApplyData.big_model"
                  ></el-input>
                </el-form-item>
              </el-form>
            </div>
            <div class="come" id="come_2">
              <p class="bold">变更来访周拆分</p>
              <el-table
                :data="comeDataCopy_2"
                :header-cell-style="{background:'#F5F7FA',color:'#999'}"
                :span-method="mergeSpan"
                border
                style="width: 100%"
              >
                <el-table-column align="center" label="周期" prop="week" width="160"></el-table-column>
                <el-table-column align="center" label="日期" prop="day_date" width="300"></el-table-column>
                <el-table-column align="center" label="计划新增(组)" prop="plan_add">
                  <template slot-scope="scope">
                    <span
                      v-if="scope.row.week!=='完整波段'&&approval_stuat!=4&&approval_stuat!=3"
                      v-text="scope.row.plan_add"
                    ></span>
                    <span v-else-if="scope.row.week=='完整波段'">{{come_sum_2}}</span>
                    <span v-else>{{scope.row.plan_add}}</span>
                  </template>
                </el-table-column>
                <el-table-column align="center" label="计划累计(组)" prop="plan_total"></el-table-column>
                <el-table-column align="center" label="计划阶段任务占比(%)" prop="plan_task_per">
                  <template slot-scope="scope">
                    <span>{{scope.row.plan_task_per}}</span>
                  </template>
                </el-table-column>
              </el-table>
              <div class="lists" id="lists">
                <p class="bold">附件清单</p>
                <div class="accessory">
                  <el-table
                    :data="thataccessoryData"
                    style="width: 100%"
                    :header-cell-style="{background:'#F5F7FA',color:'#999'}"
                  >
                    <el-table-column prop="name" label="附件" align="left">
                      <template slot-scope="scope">
                        <a v-if="!isMobile" :href="local+scope.row.url">{{scope.row.name}}</a>
                        <span v-else @click="YZ_link(scope.row)">{{scope.row.name}}</span>
                      </template>
                    </el-table-column>
                  </el-table>
                </div>
              </div>
              <div style="text-align: center;">
                <el-button @click="update()" type="primary" v-if="this.$route.query.isKSAP">快速审批</el-button>
              </div>
            </div>
          </div>
        </div>
      </el-collapse-item>
    </el-collapse>
    <Buttons/>
  </div>
</template>

<script>
let width = document.body.offsetWidth;
import {
  updateNodePlan,
  viewdelayOpenApplay,
  switchVersion,
  savelayOpenApplay,
  updatePlanTime,
  viewOpenBeforeSevenDayOpenApplay,
  getWeeklyResolution,
  saveOpenBeforeSevenDayOpenApplay,
  switchVersionSevenDayOpenApplay,
  applyAdoptTell
} from "@/api/firstPlan";
import $ from "jquery";
export default {
  components:{
    Buttons:()=>import('../../views/offerFlow/component/index')

  },
  mounted() {
    let timeid = setTimeout(() => {
      if (window.cifioa) {
        window.cifioa.sendMessage({
          type: "height",
          height: this.$refs.sevenAndTwentyOnePostpone.offsetHeight
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
        console.log(this.$refs.sevenAndTwentyOnePostpone.offsetHeight);
        window.cifioa.sendMessage({
          type: "height",
          height: this.$refs.sevenAndTwentyOnePostpone.offsetHeight
        });
      } else {
        console.warn("缺少cifioa插件");
      }
      clearTimeout(timeid);
    }, 700);
  },
  data() {
    let isMobile = width <= 1024;
    return {
      isMobile: width <= 1024,
      openList: ["1", "2"],
      isShowKS: localStorage.getItem("employeeName") == "管理员",
      isType: "",
      formLabelWidth: "120px",
      dialogFormVisible: false,
      activeTab: "1",
      isCheck: false,
      newVersionFlag: false,
      cardForm: {
        big_way: "",
        little_way: ""
      },
      priceList: [{}],
      applay_status: "0",
      firstOpenAvgData: [],

      fromData: {
        product_project: "",
        first_opentime: "",
        take_money: "",
        month_avg_flow: "",
        avg_price_product: ""
      },
      allSum: 0,
      allSum_2: 0,
      fileList__: [],
      fileList: [],
      isShowVersion: false,
      form: {},
      node_level: this.$route.query.node_level,
      comeData: [],
      customerStorageNode: [],
      NodePlanWrite: [],
      listData: [{ type: "开盘前三个月清项清单" }],
      come_Data: [],
      versionsList: [],
      versionData: [],
      thisVserion: "",
      customerNodeStorage: [],
      approval_stuat: "",
      weekData: [
        {
          id: "",
          week: "",
          start_time: "",
          end_time: "",
          day_date: "",
          plan_add: "",
          plan_total: "",
          plan_task_per: "",
          actual_add: "",
          actual_total: "",
          plan_task_per: ""
        }
      ],
      firstReportData: [
        {
          type: "顶设2客储计划与达成",
          name1: "计划",
          val1: "reach_plan_time",
          val2: "reach_plan_visit_num",
          val3: "reach_plan_little_num",
          val4: "reach_plan_little_per",
          val5: "reach_plan_big_num",
          val6: "reach_plan_big_per",
          val7: "reach_plan_sub_num",
          val8: "reach_plan_take_per"
        },
        {
          type: "顶设2客储计划与达成",
          name1: "实际",
          val1: "reach_actual_time",
          val2: "reach_actual_visit_num",
          val3: "reach_actual_littel_num",
          val4: "reach_actual_littel_per",
          val5: "reach_actual_big_num",
          val6: "reach_actual_big_per",
          val7: "reach_actual_sub_num",
          val8: "reach_actual_take_per"
        },
        {
          type: "延期开盘后新增客储预估",
          name1: "计划",
          val1: "estimate_plan_time",
          val2: "estimate_plan_visit_num",
          val3: "estimate_plan_little_num",
          val4: "estimate_plan_little_per",
          val5: "estimate_plan_big_num",
          val6: "estimate_plan_big_per",
          val7: "estimate_plan_sub_num",
          val8: "estimate_plan_take_per"
        },
        {
          type: "延期开盘后合计客储",
          name1: "",
          val1: "sum_time",
          val2: "sum_visit_num",
          val3: "sum_little_num",
          val4: "sum_little_per",
          val5: "sum_big_num",
          val6: "sum_big_per",
          val7: "sum_sub_num",
          val8: "sum_take_per"
        }
      ],
      openApplyData: {
        id: "",
        rules_time: "",
        designtwo_time: "",
        new_first_time: "",
        plan_id: "",
        plan_node_id: "",
        delay_daynum: "",
        delay_reasons: "",
        level: "",
        approval_stuat: "",
        big_model: "",
        little_model: "",
        version: "",
        reach_plan_time: "",
        reach_plan_visit_num: "",
        reach_plan_little_num: "",
        reach_plan_big_num: "",
        reach_plan_big_per: "",
        reach_plan_little_per: "",
        reach_plan_sub_num: "",
        reach_plan_take_per: "",
        reach_actual_time: "",
        reach_actual_visit_num: "",
        reach_actual_littel_num: "",
        reach_actual_littel_per: "",
        reach_actual_big_num: "",
        reach_actual_big_per: "",
        reach_actual_sub_num: "",
        reach_actual_take_per: "",
        estimate_plan_time: "",
        estimate_plan_visit_num: "",
        estimate_plan_little_num: "",
        estimate_plan_little_per: "",
        estimate_plan_big_per: "",
        estimate_plan_big_num: "",
        estimate_plan_take_per: "",
        estimate_plan_sub_num: "",
        sum_time: "",
        sum_visit_num: "",
        sum_little_num: "",
        sum_little_per: "",
        sum_big_num: "",
        sum_big_per: "",
        sum_sub_num: "",
        sum_take_per: ""
      },
      getAppllayDataInfo: {},
      dateList: [
        {
          type: "战规版开盘日期",
          date: "rules_time"
        },
        {
          type: "顶设2开盘日期",
          date: "designtwo_time"
        },
        {
          type: "新申请开盘前21天",
          date: "new_applay_21time"
        },
        {
          type: "新申请开盘前7天",
          date: "new_applay_7time"
        },
        {
          type: "新申请开盘日期",
          date: "new_first_time"
        },
        {
          type: "延期天数",
          date: "delay_daynum"
        }
      ],
      clientRateData: [
        {
          type: "顶设2客储计划与达成",
          name: "计划"
        },
        {
          type: "顶设2客储计划与达成",
          name: "实际"
        },
        {
          type: "延期开盘后新增客储预估",
          name: "计划"
        },
        {
          type: "延期开盘后合计客储",
          name: ""
        }
      ],
      thataccessoryData: [],
      clientInfoList: [
        {
          type: "来访",
          val1: "come_customer_target",
          val2: "come_customer_actual",
          val3: "come_customer_per"
        },
        {
          type: "小卡",
          val1: "lesser_customer_target",
          val2: "lesser_customer_actual",
          val3: "lesser_customer_per"
        },
        {
          type: "大卡",
          val1: "big_customer_target",
          val2: "big_customer_actual",
          val3: "big_customer_per"
        }
      ],
      openDayObj: {
        type1: "当天到访量（组）",
        type2: "当天转化率（%）",
        type3: "认购套数",
        type4: "成交率（%）",
        num: "123"
      },
      firstOpenVlaue: {
        num: "123",
        type1: "首开节点",
        type2: "产品类型",
        type3: "首开取证货值（万元）",
        type4: "首开推售货值（万元）",
        type5: "首开去化货值（万元",
        type6: "不同业态差价",
        type7: "当期利润率",
        type8: "整盘利润率",
        type9: "非融IRR",
        type10: "静态投资回收期（月）",
        list1: [
          { type: "首开均价", name: "高层(19-34层）", num: "123" },
          { type: "首开均价", name: "小高层(9-11层）", num: "123" },
          { type: "首开均价", name: "车位", num: "123" }
        ],
        list2: [
          { type: "不同业态差价", num: "123" },
          { type: "不同业态差价", num: "123" }
        ]
      }
    };
  },
  created() {
    if (this.$route.query.type != null && this.$route.query.type == "view") {
      this.isType = this.$route.query.type;
    }
    this.reload();
  },
  filters: {
    fixed: function(data) {
      if (!data) {
        return '0.0000';
      }
      return data.toFixed(2);
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
    },
    action() {
      let href = process.env.VUE_APP_BASE_API;
      return href + "/Upload/uploadFile_2";
    },
    allRate() {
      return this.come_Data[this.come_Data.length - 1].actual_total;
    },
    nodePlan() {
      return this.NodePlanWrite.filter(item => item.level == 1);
    },
    come_sum() {
      let sum = 0;
      let mylist = [...this.come_Data].concat();
      mylist.splice(0, 1);
      mylist.forEach(item => {
        sum += Number(item.plan_add);
      });
      return sum;
    },
    come_sum_2() {
      let sum = 0;
      let mylist = [...this.weekData].concat();
      mylist.splice(0, 1);
      mylist.forEach(item => {
        sum += isNaN(Number(item.plan_add)) ? 0 : Number(item.plan_add);
      });
      return sum;
    },
    comeDataCopy_2() {
      let arr = [...this.weekData];
      arr.forEach((item, index) => {
        if (index == 1) {
          if (isNaN(Number(item.plan_add))) {
            item.plan_total = 0;
          } else {
            item.plan_total = Number(item.plan_add);
          }
        }
        if (index > 1) {
          if (isNaN(Number(item.plan_add))) {
            item.plan_total = 0;
          } else {
            item.plan_total =
              Number(item.plan_add) +
              Number(this.weekData[index - 1].plan_total);
          }
        }
      });
      arr.forEach(item => {
        let plan_task_per = 0;
        if (Number(this.allSum_2)) {
          plan_task_per = isNaN(
            (Number(item.plan_add) / Number(this.allSum_2)) * 100
          )
            ? 0
            : (Number(item.plan_add) / Number(this.allSum_2)) * 100;
        }
        item.plan_task_per = plan_task_per.toFixed(0);
      });
      return arr;
    }
  },
  watch: {
    come_Data: {
      handler(a, b) {
        let sum = 0;
        a.forEach(item => {
          if (item.plan_add) {
            sum += Number(item.plan_add);
          }
        });
        this.allSum = sum;
      },
      deep: true
    },
    weekData: {
      handler(a, b) {
        let sum = 0;
        a.forEach(item => {
          if (item.plan_add) {
            sum += isNaN(Number(item.plan_add)) ? 0 : Number(item.plan_add);
          }
        });
        this.allSum_2 = sum;
      },
      deep: true
    }
  },
  methods: {
    openChange(val) {
    },
    spanCurrage({ row, column, rowIndex, columnIndex }) {
      if (columnIndex == 4) {
        if (rowIndex == 0) {
          return [3, 1];
        } else {
          return [0, 0];
        }
      }
    },
    switchVersionSevenDayOpenApplay() {
      let id = this.$route.query.thisVersion;
      if (this.$route.query.BOID) {
        id = this.$route.query.BOID;
      }
      switchVersionSevenDayOpenApplay({
        id: id,
        plan_id: this.$route.query.plan_id,
        plan_node_id: this.$route.query.plan_node_id,
        node_level: this.$route.query.node_level
      }).then(res => {
        this.applay_status = res.result.openApplayMainData.approval_stuat;
        this.openApplayMainData = res.result.openApplayMainData;
        this.priceList = res.result.firstOpenAvgData;
        if (res.result.competingpPoducts) {
          this.competingpPoducts = res.result.competingpPoducts;
        } else {
          this.competingpPoducts = [];
        }
        if (res.result.openApplayMainData.new_first_time) {
          this.countDate(res.result.openApplayMainData.new_first_time);
        }
        this.customerStorageNode = res.result.customerStorageNode;
        this.come_Data = res.result.weekStroageData;
        this.firstOpenAvgData = res.result.firstOpenAvgData;
      });
    },
    tabClick(tab, event) {},

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
    countDate(date) {
      var aDate, oDate1, oDate2, iDays;
      aDate = date.split("-");
      oDate1 = new Date(aDate[1] + "-" + aDate[2] + "-" + aDate[0]); //转换为02-05-2018格式
      aDate = this.openApplyData.designtwo_time.split("-");
      oDate2 = new Date(aDate[1] + "-" + aDate[2] + "-" + aDate[0]);
      iDays = parseInt(Math.abs(oDate1 - oDate2) / 1000 / 60 / 60 / 24); //把相差的毫秒数转换为天数
      this.openApplyData.delay_daynum = iDays;

      this.customerNodeStorage = [];
      var rules_time = this.openApplyData.rules_time;
      var asd = +new Date(date) - 6 * 86400000;
      var node_time1 = this.FomartDate(new Date(asd));
      var qwe = +new Date(date) - 20 * 86400000;
      var node_time2 = this.FomartDate(new Date(qwe));
      this.openApplyData.new_applay_7time = node_time1;
      this.openApplyData.new_applay_21time = node_time2;
      this.customerNodeStorage.push({
        node_name: "首开前21天",
        node_time: node_time2,
        line_name: "计划",
        level: "1",
        node_level: "6"
      });
      this.customerNodeStorage.push({
        node_name: "首开前7天",
        node_time: node_time1,
        line_name: "计划",
        level: "1",
        node_level: "7"
      });
      this.customerNodeStorage.push({
        node_name: "首开",
        node_time: date,
        line_name: "计划",
        level: "1",
        node_level: "8"
      });

      if (this.openApplyData.designtwo_time) {
        var time = this.openApplyData.designtwo_time.split("-");
        var time2 = date.split("-");
        var s = time[0] + "." + time[1] + "." + time[2];
        var s2 = time2[0] + "." + time2[1] + "." + time2[2];
        this.openApplyData.estimate_plan_time = s + "-" + s2;
      }

      if (this.openApplyData.open_time) {
        var time = this.openApplyData.open_time.split("-");
        var time2 = date.split("-");
        var s = time[0] + "." + time[1] + "." + time[2];
        var s2 = time2[0] + "." + time2[1] + "." + time2[2];
        this.openApplyData.sum_time = s + "-" + s2;
      }

      this.getWeeklyResolution(date);
    },

    //延期看盘申请--获取周拆分数据

    getWeeklyResolution(new_first_time) {
      getWeeklyResolution({
        start_time: this.openApplyData.rules_time,
        end_time: new_first_time
      }).then(res => {
        if (res.code != 200) {
          this.functionDrawer = false;
          this.weekData = [];
          this.openApplyData.new_first_time = "";
          this.$message({
            type: "error",
            message: res.message
          });
        } else {
          this.weekData = res.result;
        }
      });
    },

    toFloat(value) {
      value = Math.round(parseFloat(value) * 100) / 100;

      if (value.toString().indexOf(".") < 0) {
        value = value.toString() + ".00";
      }

      return value;
    },

    //延期看盘申请--切换数据
    switchVersionByVersionID() {
      let id = this.$route.query.thisVersion;
      if (this.$route.query.BOID) {
        id = this.$route.query.BOID;
      }
      switchVersion({
        id: id,
        plan_id: this.$route.query.plan_id,
        plan_node_id: this.$route.query.plan_node_id,
        node_level: "7"
      }).then(res => {
        (this.openApplyData = res.result.openApplyData),
          (this.approval_stuat = res.result.approval_stuat),
          (this.approval_stuat = res.result.openApplyData.approval_stuat),
          (this.customerNodeStorage = res.result.customerNodeStorage);
        if (res.result.weekData) {
          this.weekData = res.result.weekData;
        } else {
          this.weekData = [];
        }
        this.getAppllayDataInfo = res.result.getAppllayDataInfo;
        if (res.result.fileList) {
          this.thataccessoryData = res.result.fileList;
        } else {
          this.thataccessoryData = [];
        }
      });
    },
    viewdelayOpenApplay() {
      viewdelayOpenApplay({
        plan_id: this.$route.query.plan_id,
        plan_node_id: this.$route.query.plan_node_id,
        node_level: "7",
        project_id: this.$route.query.project_id
      }).then(res => {
        this.versionData = res.result.versionData;
        if (res.result.versionData) {
          this.thisVserion = res.result.versionData[0].id;
        } else {
          this.thisVserion = "";
        }
        (this.approval_stuat = res.result.openApplyData.approval_stuat),
          (this.openApplyData = res.result.openApplyData),
          (this.customerNodeStorage = res.result.customerNodeStorage);
        if (res.result.weekData) {
          this.weekData = res.result.weekData;
        } else {
          this.weekData = [];
        }
      });
    },
    fileSuccess(res, file, fileList) {
      this.fileList.push(res.data);
    },
    exceed(files, fileList) {
      this.$message.warning(`当前限制选择1个文件`);
    },
    reload(num) {
      this.approval_stuat = 1;
      this.switchVersionByVersionID();
    },
    scrollLink(id) {
      document.getElementById(id).scrollIntoView();
    },
    saveOpenBeforeSevenDayOpenApplay(button) {
      saveOpenBeforeSevenDayOpenApplay({
        plan_id: this.$route.query.plan_id,
        plan_node_id: this.$route.query.plan_node_id,
        node_level: "7",
        button: button,
        project_id: this.$route.query.project_id,
        thisVersion: this.thisVserion,
        openApplayMainData: this.openApplayMainData,
        firstOpenAvgData: this.firstOpenAvgData,
        competingpPoducts: this.competingpPoducts,
        customerStorageNode: this.customerStorageNode,
        weekStroageData: this.come_Data,
        firstOpenAvgData: this.firstOpenAvgData
      }).then(res => {
        if (res.code == 200) {
          this.$message({
            type: "success",
            message: res.messages
          });
          if (this.thisVserion == "") {
            this.viewOpenBeforeSevenDayOpenApplay("");
          } else {
            this.switchVersionSevenDayOpenApplay();
          }
        } else {
          this.$message({
            type: "error",
            message: res.messages
          });
        }
      });
    },
    mergeSpan({ row, column, rowIndex, columnIndex }) {
      if (rowIndex == 0) {
        if ((columnIndex - 2) % 3 === 0 && columnIndex - 2 < 6) {
          return {
            rowspan: 1,
            colspan: 3
          };
        } else if (columnIndex < 2 || columnIndex - 2 > 6) {
          return {
            rowspan: 1,
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
    mergeRow({ row, column, rowIndex, columnIndex }) {
      if (columnIndex == 0) {
        if (rowIndex == 0) {
          return [2, 1];
        } else if (rowIndex == 1) {
          return [0, 0];
        }
      }
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
    update() {
      applyAdoptTell({
        businesskey: this.$route.query.BOID,
        eventType: "4",
        //延期开盘申请
        orgName: "fp_open_twentyone_off"
      }).then(res => {
        window.close();
      });
    },
    YZ_link(file) {
      console.log(this.isMobile);
      if (this.isMobile) {
        var isTest = ["salesmgt-uat", "salesmgt-test"].some(function(item) {
          return window.location.href.indexOf(item) !== -1;
        });
        let wm = {
          htmlTitle: "拿地后",
          wmContent: this.userID || "旭辉集团",
          wmSize: 10,
          wmFont: "microsoft yahei",
          wmColor: 7,
          isDelSrc: 1
        };
        // let resquestUrl=isTest?`${location.origin}/dcs.web/onlinefile`:`${location.origin}/dcs.web/onlinefile`
        let resquestUrl = `https://oadoc.cifi.com.cn/dcs.web/onlinefile`;
        let requrl = file.url.split("?n=")[0];
        let end = requrl.split(".")[requrl.split(".").length - 1];
        let convertType;
        if (end == "pdf") {
          convertType = "20";
        } else if (end == "tif") {
          convertType = "17";
        } else {
          convertType = "0";
        }
        // var tempwindow=window.open('about:blank');
        $.ajax({
          url: resquestUrl,
          data: {
            ...wm,
            downloadUrl: location.origin + requrl,
            convertType
          },
          dataType: "json",
          async: false,
          type: "post",
          success: function(data) {
            if (data.result == 0) {
              if (parent) {
                parent.window.location.href = data.data[0];
              } else {
                window.location.href = data.data[0];
              }
            } else {
              this.$message.error("转换失败");
            }
          },
          error: function(data) {
            alert("报错:" + JSON.stringify(data));
            open(file.url);
          }
        });
      } else {
        let requrl = file.url.split("?")[0];
        open(file.url);
      }
    }
  }
};
</script>

<style lang="less" scoped>
.sevenAndTwentyOnePostpone {
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

.sevenDays {
  .navbarLink {
    background: #fff;
    margin-top: 5px;
  }
 ::v-deep input::-webkit-outer-spin-button,
::v-deep  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }

 ::v-deep .el-date-editor.span,
 ::v-deep .el-date-editor.span__inner {
    width: 100%;
  }

 ::v-deep .span__inner {
    text-align: center;
  }

 ::v-deep .span--prefix .span__inner {
    padding-left: 0;
  }

::v-deep  .span--prefix .span__inner {
    padding-right: 0;
  }

 ::v-deep .el-icon-date:before {
    display: none;
  }

 ::v-deep input[type="number"] {
    -moz-appearance: "textfield";
  }

 ::v-deep .el-form {
    width: 40%;
  }

  .top {
    background: #fff;
    color: #333;
    font-size: 14px;
    height: 50px;

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

  .containter {
    margin: 10px;
    background-color: #fff;

  ::v-deep  .el-tabs {
      padding: 0 15px;
    }

    .come {
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
    }

    .node {
      padding: 0 15px;
      margin-bottom: 15px;

      p {
        height: 30px;
        line-height: 30px;
        color: #333;
        font-size: 14px;
        position: relative;

      ::v-deep  .el-checkbox {
          position: absolute;
          top: 50%;
          right: 30px;
          transform: translateY(-50%);
          color: #333;
        }

       ::v-deep .el-checkbox__label {
          font-size: 12px;
        }

        .time {
          position: absolute;
          top: 50%;
          right: 200px;
          transform: translateY(-50%);
          color: #999;
          font-size: 12px;
          font-weight: normal;
        }
      }

      .bold {
        font-weight: 700;
      }
    }

    .list {
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
    }

    .card {
      padding: 0 15px;
      margin-bottom: 15px;

      .cardForm {
        width: 100%;
      }

      p {
        height: 30px;
        line-height: 30px;
        color: #333;
        font-size: 14px;
      }

      .bold {
        font-weight: 700;
      }

    ::v-deep  .el-textarea__inner {
        height: 100px;
      }

     ::v-deep .el-form-item__content {
        margin-bottom: 10px;
      }
    }

    .rate {
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

    .open {
      overflow-x: auto;
      p {
        height: 30px;
        line-height: 30px;
        color: #333;
        font-size: 14px;
      }

      .bold {
        font-weight: 700;
      }

      .table {
        min-width: 800px;
        border: 1px solid #ebeef5;
      }

      .table_top {
        height: 240px;
        display: flex;

        > div {
          flex: 1;
        }

        .left {
          min-width: 300px;
          max-width: 300px;
          line-height: 160px;
          text-align: center;
          border-right: 1px solid #ebeef5;
          border-bottom: 1px solid #ebeef5;
          color: #909399;
          background-color: #f5f7fa;
        }

        > div:nth-child(2) {
          ._cell {
            background-color: #f5f7fa;
          }
        }

        ._cell {
          height: 40px;
          line-height: 40px;
          text-align: center;
          border-right: 1px solid #ebeef5;
          border-bottom: 1px solid #ebeef5;
          color: #909399;
        }
      }

    ::v-deep  .el-date-editor.span {
        width: 100% !important;
      }

      .table_bottom {
        height: 160px;
        display: flex;

        > div {
          flex: 1;
        }

        .left {
          min-width: 300px;
          max-width: 300px;
          line-height: 160px;
          text-align: center;
          flex: 1;
          border-right: 1px solid #ebeef5;
          color: #909399;
          background-color: #f5f7fa;
        }

        > div:last-child {
          padding: 20px;
        }

      ::v-deep  .el-textarea {
          height: 100%;
        }

       ::v-deep .el-textarea__inner {
          height: 100% !important;
        }
      }
    }

    .firstOpen {
      p {
        height: 30px;
        line-height: 30px;
        color: #333;
        font-size: 14px;
      }

      .bold {
        font-weight: 700;
      }

      .table {
        border-left: 0.5px solid #e6e6e6;
        border-top: 0.5px solid #e6e6e6;
        font-size: 14px;
        font-weight: normal;

        > .el-row:first-child {
          background: #f5f7fa;
          color: #999;
        }
      }

     ::v-deep .el-col {
        text-align: center;
        height: 40px;
        line-height: 40px;
        border-right: 0.5px solid #e6e6e6;
        border-bottom: 0.5px solid #e6e6e6;
      }

      .averagePrice {
        text-align: center;
        height: 120px;
      }

      .diffPrice {
        text-align: center;
        height: 80px;
      }
    }

    .goodsInfo {
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

    .clientInfo {
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

    .openDay {
      p {
        height: 30px;
        line-height: 30px;
        color: #333;
        font-size: 14px;
      }

      .bold {
        font-weight: 700;
      }

     ::v-deep .el-row {
        border-top: 1px solid #e6e6e6;

      ::v-deep  .el-col:first-child {
          border-left: 1px solid #e6e6e6;
          background: #f5f7fa;
        }

      ::v-deep  .el-col:nth-child(3) {
          background: #f5f7fa;
        }
      }

    ::v-deep  .el-col {
        text-align: center;
        height: 40px;
        line-height: 40px;
        border-bottom: 1px solid #e6e6e6;
        border-right: 1px solid #e6e6e6;
      }
    }

    .prognosis {
      p {
        height: 30px;
        line-height: 30px;
        color: #333;
        font-size: 14px;
      }

      .bold {
        font-weight: 700;
      }

      .table {
        height: 200px;
        padding: 20px;

       ::v-deep .el-textarea {
          width: 100%;
          height: 100%;
        }

       ::v-deep .el-textarea__inner {
          width: 100%;
          height: 100%;
        }
      }
    }
  }

  .bottom {
    text-align: center;
    height: 60px;
    line-height: 60px;
    background: #fff;
    margin: 0 15px;

  ::v-deep  .el-button {
      height: 30px;
    }
  }
}
</style>
