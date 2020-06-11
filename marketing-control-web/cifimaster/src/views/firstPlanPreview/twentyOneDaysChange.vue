<template>
  <div class="twentyOneDaysChange" ref="twentyOneDaysChange">
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
        <div class="twentyOneDaysChangeinput">
          <div class="containter">
            <div class="node" id="node">
              <p class="bold">
                节点客储计划
                <!-- <el-checkbox :disabled="readonly" v-model="isCheck">变更客储计划</el-checkbox> -->
                <span class="time">数据更新日期：{{createTime}}</span>
              </p>
              <el-table
                :data="nodeData"
                border
                :header-cell-style="{background:'#F5F7FA',color:'#999'}"
                style="width: 100%"
                :span-method="mergeCol"
              >
                <el-table-column label="节点" prop="nide_name" width="160" align="center"></el-table-column>
                <el-table-column align="center" prop="node_time" width="160" label="日期"></el-table-column>
                <el-table-column align="center" prop="line_name" label></el-table-column>
                <el-table-column align="center" prop="report_num" label="报备(组)"></el-table-column>
                <el-table-column align="center" prop="visit_num" label="来访(组)"></el-table-column>
                <el-table-column align="center" prop="little_num" label="小卡(组)"></el-table-column>
                <el-table-column align="center" prop="little_per" label="小卡率(%)">
                  <template slot-scope="scope">{{scope.row.little_per + '%'}}</template>
                </el-table-column>
                <el-table-column align="center" prop="big_num" label="大卡(组)"></el-table-column>
                <el-table-column align="center" prop="big_per" label="大卡率(%)">
                  <template slot-scope="scope">{{scope.row.big_per + '%'}}</template>
                </el-table-column>
                <el-table-column align="center" prop="sub_num" label="认购(套)"></el-table-column>
                <el-table-column align="center" prop="make_per" label="成交"></el-table-column>
              </el-table>
            </div>
            <div class="come" id="come">
              <p class="bold">来访周拆分</p>
              <el-table
                :data="comeData"
                border
                :span-method="mergeSpan"
                :header-cell-style="{background:'#F5F7FA',color:'#999'}"
                style="width: 100%"
              >
                <el-table-column label="周期" width="160" prop="week" align="center"></el-table-column>
                <el-table-column align="center" width="160" prop="day_date" label="日期"></el-table-column>
                <el-table-column align="center" prop="plan_add" label="计划新增(组)">
                  <template slot-scope="scope">
                    <span v-if="scope.row.week=='完整波段'">{{allSum}}</span>
                    <span v-else>{{scope.row.plan_add}}</span>
                  </template>
                </el-table-column>
                <el-table-column align="center" prop="plan_total" label="计划累计(组)"></el-table-column>
                <el-table-column align="center" prop="plan_task_per" label="计划阶段任务占比(%)">
                  <template slot-scope="scope">{{scope.row.plan_task_per + '%'}}</template>
                </el-table-column>
                <el-table-column align="center" prop="actual_add" label="实际新增(组)">
                  <template slot-scope="scope">
                    <span v-if="scope.row.week=='完整波段'">{{allRate}}</span>
                    <span v-else>{{scope.row.actual_add}}</span>
                  </template>
                </el-table-column>
                <el-table-column align="center" prop="actual_total" label="实际累计(组)"></el-table-column>
                <el-table-column align="center" prop="actual_task_per" label="实际阶段任务占比(%)"></el-table-column>
                <el-table-column align="center" prop="bias_value" label="绝对偏差值"></el-table-column>
                <el-table-column align="center" prop="bias_per" label="偏差率"></el-table-column>
                <el-table-column align="center" prop="bias_cause" width="200" label="偏差原因">

                  <template slot-scope="scope">
                    <span
                      v-if="scope.row.isWrite==1&&scope.row.week!=='完整波段'"
                      v-text="scope.row.bias_cause"
                    ></span>
                    <span v-else>{{scope.row.bias_cause }}</span>
                  </template>
                </el-table-column>
              </el-table>
              <span style="color:red;font-size:14px;">注：因四舍五入，计划阶段任务占比会存在合计值与100%有偏差。</span>
            </div>
            <div class="node" v-show="isCheck" id="node_">
              <p class="bold">变更节点客储计划</p>
              <el-table
                :data="nodePlan"
                border
                :header-cell-style="{background:'#F5F7FA',color:'#999'}"
                style="width: 100%"
              >
                <el-table-column label="节点" prop="nide_name" width="160" align="center"></el-table-column>
                <el-table-column align="center" prop="node_time" width="160" label="日期"></el-table-column>
                <el-table-column align="center" prop="line_name" label></el-table-column>
                <el-table-column align="center" prop="report_num" label="报备(组)">
                  <template slot-scope="scope">
                    <span v-if="node_level<scope.row.node_level" v-text="scope.row.report_num"></span>
                    <span v-else>{{scope.row.report_num}}</span>
                  </template>
                </el-table-column>
                <el-table-column align="center" prop="visit_num" label="来访(组)">
                  <template slot-scope="scope">
                    <span v-if="node_level<scope.row.node_level" v-text="scope.row.visit_num"></span>
                    <span v-else>{{scope.row.visit_num}}</span>
                  </template>
                </el-table-column>
                <el-table-column align="center" prop="little_num" label="小卡(组)">
                  <template slot-scope="scope">
                    <span v-if="node_level<scope.row.node_level" v-text="scope.row.little_num"></span>
                    <span v-else>{{scope.row.little_num}}</span>
                  </template>
                </el-table-column>
                <el-table-column align="center" prop="little_per" label="小卡率(%)">
                  <template
                    slot-scope="scope"
                  >{{isNaN(scope.row.little_per)?0:scope.row.little_per + '%'}}</template>
                </el-table-column>
                <el-table-column align="center" prop="big_num" label="大卡(组)">
                  <template slot-scope="scope">
                    <span v-if="node_level<scope.row.node_level" v-text="scope.row.big_num"></span>
                    <span v-else>{{scope.row.big_num}}</span>
                  </template>
                </el-table-column>
                <el-table-column align="center" prop="big_per" label="大卡率(%)">
                  <template slot-scope="scope">{{isNaN(scope.row.big_per)?0:scope.row.big_per + '%'}}</template>
                </el-table-column>
                <el-table-column align="center" prop="sub_num" label="认购(套)">
                  <template slot-scope="scope">
                    <span v-if="node_level<scope.row.node_level" v-text="scope.row.sub_num"></span>
                    <span v-else>{{scope.row.sub_num}}</span>
                  </template>
                </el-table-column>
                <el-table-column align="center" prop="make_per" label="成交">
                  <template slot-scope="scope">{{isNaN(scope.row.make_per)?0:scope.row.make_per}}</template>
                </el-table-column>
              </el-table>
            </div>
            <div class="come" v-show="isCheck" id="come_">
              <p class="bold">变更来访周拆分</p>
              <el-table
                :data="comeDataCopy"
                :span-method="mergeSpan"
                border
                :header-cell-style="{background:'#F5F7FA',color:'#999'}"
                style="width: 100%"
              >
                <el-table-column label="周期" width="160" prop="week" align="center"></el-table-column>
                <el-table-column align="center" width="160" prop="day_date" label="日期"></el-table-column>
                <el-table-column align="center" prop="plan_add" label="计划新增(组)">
                  <template slot-scope="scope">
                    <span
                      v-if="scope.row.isWrite==1&&scope.row.week!=='完整波段'"
                      v-text="scope.row.plan_add"
                    ></span>
                    <span v-else-if="scope.row.week=='完整波段'">{{come_sum}}</span>
                    <span v-else>{{scope.row.plan_add}}</span>
                  </template>
                </el-table-column>
                <el-table-column align="center" prop="plan_total" label="计划累计(组)"></el-table-column>
                <el-table-column align="center" prop="plan_task_per" label="计划阶段任务占比(%)"></el-table-column>
              </el-table>
              <span style="color:red;font-size:14px;">注：因四舍五入，计划阶段任务占比会存在合计值与100%有偏差。</span>
            </div>
            <div class="card" id="card" v-show="isCheck">
              <p class="bold">办卡方式</p>
              <el-form class="cardForm" :model="cardForm" ref="cardForm" label-width="60px">
                <el-form-item label="小卡" prop="small">
                  <el-input
                    type="textarea"
                    show-word-limit
                    maxlength="100"
                    v-model="cardForm.little_way"
                    :readonly="true"
                  ></el-input>
                </el-form-item>
                <el-form-item label="大卡" prop="big">
                  <el-input
                    type="textarea"
                    show-word-limit
                    maxlength="100"
                    :readonly="true"
                    v-model="cardForm.big_way"
                  ></el-input>
                </el-form-item>
              </el-form>
            </div>

            <div class="list" id="list">
              <p class="bold">附件清单</p>
              <div class="operation">
                <el-table
                  :data="accessoryData"
                  :header-cell-style="{background:'#EFEFEF',color:'#999'}"
                  style="width: 100%"
                >
                  <el-table-column prop="type" label="附件名称" align="left" width="200"></el-table-column>
                  <el-table-column prop="name" label="附件">
                    <template slot-scope="scope">
                      <a v-if="!isMobile" :href="local+scope.row.url">{{scope.row.name}}</a>
                      <span v-else @click="YZ_link(scope.row)">{{scope.row.name}}</span>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </div>
          </div>
        </div>
      </el-collapse-item>
    </el-collapse>
    <div style="text-align: center;">
      <el-button type v-if="this.$route.query.isKSAP" @click="fastUpdate()">快速审批</el-button>
    </div>
    <Buttons />
  </div>
</template>

<script>
let width = document.body.offsetWidth;
import $ from "jquery";
import {
  selectNodePlan,
  updateNodePlan,
  viewdelayOpenApplay,
  switchVersion,
  savelayOpenApplay,
  getWeeklyResolution,
  delFile,
  fastUpdate
} from "@/api/firstPlan";
export default {
  components: {
    Buttons: () => import("../../views/offerFlow/component/index")
  },
  mounted() {
    let timeid = setTimeout(() => {
      if (window.cifioa) {
        console.log(this.$refs.twentyOneDaysChange.offsetHeight);
        window.cifioa.sendMessage({
          type: "height",
          height: this.$refs.twentyOneDaysChange.offsetHeight
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
        console.log(this.$refs.twentyOneDaysChange.offsetHeight);
        window.cifioa.sendMessage({
          type: "height",
          height: this.$refs.twentyOneDaysChange.offsetHeight
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
      openList: ["1", "2"],
      isType: "",
      isMobile: width <= 1024,
      createTime: "",
      fileHeight: 1,
      isShowKS: localStorage.getItem("employeeName") == "管理员",
      accessoryData: [
        {
          type: "开盘前21天",
          handle: "上传"
        },
        {
          type: "",
          handle: "其他上传"
        }
      ],
      activeTab: "1",
      isCheck: false,
      newVersionFlag: false,
      cardForm: {
        big_way: "",
        little_way: ""
      },
      allSum: 0,
      allSum_2: 0,
      fileList__: [],
      fileList: [],
      isShowVersion: false,
      form: {},
      node_level: this.$route.query.node_level,
      comeData: [],
      nodeData: [],
      NodePlanWrite: [],
      listData: [],
      projectInfo: {},
      come_Data: [],
      versionsList: [],
      versionData: [],
      create_time: "",
      thisVserion: "",
      customerNodeStorage: [],
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
        sum_take_per: "",
        new_applay_21time: "",
        new_applay_7time: ""
      },
      approval_stuat: "0",
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
      ]
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
      return data.toFixed(0);
    }
  },
  computed: {
    action() {
      let href = process.env.VUE_APP_BASE_API;
      return href + "/Upload/uploadFile_2";
    },
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
    allRate() {
      return this.comeData[this.comeData.length - 1].actual_total;
    },
    nodePlan() {
      return this.NodePlanWrite.filter(item => item.level == 1);
    },
    come_sum() {
      let sum = 0;
      let mylist = [...this.come_Data].concat();
      mylist.splice(0, 1);
      mylist.forEach(item => {});
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
    comeDataCopy() {
      let arr = [...this.come_Data];
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
              Number(this.come_Data[index - 1].plan_total);
          }
        }
      });
      // let sum =arr[arr.length-1].plan_total
      arr.forEach(item => {
        let plan_task_per = 0;
        if (Number(this.allSum)) {
          plan_task_per = isNaN(
            (Number(item.plan_add) / Number(this.allSum)) * 100
          )
            ? 0
            : (Number(item.plan_add) / Number(this.allSum)) * 100;
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
    openChange(val) {},
    fastUpdate() {
      //快速审批
      fastUpdate({
        flow_id: this.$route.query.BOID,
        node_level: "6",
        orgName: "fp_open_twentyone_node"
      }).then(res => {
        window.close();
      });
    },
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
    countDate: function(date) {
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
    deleteFile(index, obj) {
      delFile({
        id: obj.id
      }).then(res => {
        this.fileList.splice(index, 1);
      });
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

    viewdelayOpenApplay() {
      viewdelayOpenApplay({
        plan_id: this.$route.query.plan_id,
        plan_node_id: this.$route.query.plan_node_id,
        node_level: "6",
        project_id: this.$route.query.project_id
      }).then(res => {
        this.versionData = res.result.versionData;
        if (res.result.versionData) {
          this.thisVserion = res.result.versionData[0].id;
        } else {
          this.thisVserion = "";
        }
        if (res.result.fileList) {
          this.accessoryData = res.result.fileList;
        }
        (this.openApplyData = res.result.openApplyData),
          (this.approval_stuat = res.result.openApplyData.approval_stuat),
          (this.customerNodeStorage = res.result.customerNodeStorage);
        if (res.result.weekData) {
          this.weekData = res.result.weekData;
        } else {
          this.weekData = [];
        }
      });
    },
    reload(num) {
      let obj = {
        plan_id: this.$route.query.plan_id,
        node_level: this.$route.query.node_level,
        plan_node_id: this.$route.query.plan_node_id
      };
      if (num) {
        obj.newVersion = num;
      }
      if (this.$route.query.BOID) {
        obj.flow_id = this.$route.query.BOID;
      }
      selectNodePlan(obj).then(res => {
        if (res.code == 0) {
          this.projectInfo = res.result.flow[0];
          this.isShowVersion = res.result.judgeVersion == 1 ? true : false;
          this.comeData = res.result.Week.concat();
          this.come_Data = [...res.result.WeekWrite].concat();
          this.nodeData = res.result.NodePlan.concat();
          this.NodePlanWrite = res.result.NodePlanWrite.concat();
          this.versionsList = res.result.flow.concat();
          if (res.result.flow.length > 0) {
            this.form.versions = res.result.flow[0].flow_id;
          }
          if (res.result.fileList) {
            let arr5 = res.result.fileList;
            this.accessoryData = [
              {
                type: "",
                handle: "其他上传"
              }
            ];
            if (arr5.length > 0) {
              let temp = this.accessoryData.pop();
              arr5.forEach((item, index) => {
                this.accessoryData.push({
                  type: "其他上传",
                  handle: "上传",
                  id: item.id,
                  name: item.name,
                  url: item.url,
                  orderIndex: item.orderIndex
                });
              });
              this.accessoryData.push(temp);
            }
          }
          this.isCheck = res.result.change == 1 ? true : false;
          this.cardForm = {
            big_way: this.nodeData[0].big_way,
            little_way: this.nodeData[0].little_way
          };
          if (this.nodeData.length > 1) {
            this.createTime = this.nodeData[1].create_time;
          }
        }
      });
    },
    scrollLink(id) {
      document.getElementById(id).scrollIntoView();
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
.twentyOneDaysChange {
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

.twentyOneDaysChangeinput {
  .navbarLink {
    background: #fff;
    margin-top: 5px;
  }
  ::v-deep input::-webkit-outer-spin-button,
  ::v-deep input::-webkit-inner-spin-button {
    -webkit-appearance: none;
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

  .containter {
    margin: 10px;
    background-color: #fff;

    ::v-deep .el-tabs {
      padding: 0 15px;
    }

    .lists {
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

        ::v-deep .el-checkbox {
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

      ::v-deep .el-textarea__inner {
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

      ::v-deep .el-date-editor.span {
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

        ::v-deep .el-textarea {
          height: 100%;
        }

        ::v-deep .el-textarea__inner {
          height: 100% !important;
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

    ::v-deep .el-button {
      height: 30px;
    }
  }
}
</style>
