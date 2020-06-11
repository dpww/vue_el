<template>
  <div class="projectWeeklyData app-container">
    <el-row class="container">
      <div class="top">
        <div class="top_l fl">营销周计划详情</div>
        <div class="top_r fr" v-if="$store.state.user.userPower.includes('导出数据')">
          <el-link
            class="outData"
            :href="exportTemp()"
            @click.prevent="exportMatomo"
            download="download"
          >导出数据</el-link>
        </div>
      </div>
    </el-row>
    <el-row class="container">
      <div class="projectWeeklyForm">
        <h3 class="weekTitle">
          {{weekStart|getYear}}{{weekStart|getMonthDay}}-{{weekEnd|getMonthDay}}周报
          <span>金额单位: (万元)</span>
        </h3>
        <el-table
          :data="projectWeeklyData"
          row-key="id"
          style="width: 100%;min-height:200px;"
          :height="tableHeight"
        >
          <el-table-column prop="project_name" fixed label="事业部/项目" align="center" width="200"></el-table-column>
          <el-table-column label="项目信息" align="center">
            <el-table-column label="项目编码" align="center" width="180">
              <template slot-scope="scope">
                <a
                  href="javascript:void(0);"
                  style="color:#333"
                  :title="scope.row.project_code"
                >{{scope.row.project_code}}</a>
              </template>
            </el-table-column>
            <el-table-column prop="trader_name" label="操盘手" align="center" width="100"></el-table-column>
            <el-table-column prop="islast" label="是否尾盘" align="center" width="80"></el-table-column>
            <el-table-column prop="issales_trade" label="是否我方营销操盘" align="center" width="140"></el-table-column>
          </el-table-column>
          <el-table-column
            prop="subscribe_price"
            label="上月未转签约的认购金额"
            header-align="center"
            align="center"
            width="110"
          ></el-table-column>
          <el-table-column label="目标" align="center">
            <el-table-column label="月度目标" align="center">
              <el-table-column prop="target_month_bearer" label="来人(组)" align="center" width="100"></el-table-column>
              <el-table-column prop="target_month_sign" label="签约金额" align="center" width="100"></el-table-column>
            </el-table-column>
            <el-table-column :label="nowWeek+'目标'" align="center">
              <el-table-column prop="target_week_bearer" label="来人(组)" align="center" width="100"></el-table-column>
              <el-table-column
                prop="target_week_sign"
                label="签约金额"
                header-align="center"
                align="center"
                width="100"
              ></el-table-column>
            </el-table-column>
            <el-table-column prop="city" :label="nowWeek+'目标占比'" align="center">
              <el-table-column
                prop="target_week_bearer_per"
                label="来人占比"
                align="center"
                width="100"
              ></el-table-column>
              <el-table-column prop="target_week_sign_per" label="签约占比" align="center" width="80"></el-table-column>
            </el-table-column>
          </el-table-column>

          <el-table-column label="完成情况" align="center">
            <el-table-column
              prop="fact_month_bearer_total"
              label="月度累计来人(组)"
              align="center"
              width="100"
            ></el-table-column>
            <el-table-column
              prop="fact_month_bearer_per"
              label="月度来人完成率"
              align="center"
              width="100"
            ></el-table-column>
            <el-table-column
              prop="fact_week_bearer"
              :label="nowWeek+'来人(组)'"
              align="center"
              width="80"
            ></el-table-column>
            <el-table-column
              prop="fact_week_bearer_per"
              :label="nowWeek+'来人完成率'"
              align="center"
              width="100"
            ></el-table-column>
            <el-table-column
              prop="fact_month_sign"
              label="月度签约金额(系统签约)"
              header-align="center"
              align="center"
              width="130"
            >
              <template slot-scope="scope">
                <span>{{scope.row.fact_month_sign}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="fact_month_sign_per" label="月度签约完成率" align="center" width="100"></el-table-column>
            <el-table-column
              prop="fact_week_sign"
              :label="nowWeek+'签约金额'"
              header-align="center"
              align="center"
              width="130"
            ></el-table-column>
            <el-table-column
              prop="fact_week_sign_per"
              :label="nowWeek+'签约完成率'"
              align="center"
              width="100"
            ></el-table-column>
            <el-table-column
              prop="fact_signed"
              label="系统大定未签金额"
              header-align="center"
              align="center"
              width="100"
            ></el-table-column>
          </el-table-column>
          <el-table-column label="预估情况" align="center">
            <el-table-column
              label="线下锁定未进系统，且本月可签金额"
              header-align="center"
              align="center"
              width="150"
            >
              <template slot-scope="scope">
                <el-input
                  type="number"
                  v-if="readonly == 0"
                  @keyup.native="
                scope.row.plan_signed=scope.row.plan_signed.replace(/[^\d.]/g,'');
                scope.row.plan_signed =scope.row.plan_signed.replace(/\.{2,}/g,'.');
                scope.row.plan_signed =scope.row.plan_signed.replace(/^\./g,'');
                scope.row.plan_signed =scope.row.plan_signed.replace('.','$#$').replace(/\./g,'').replace('$#$','.');
                scope.row.plan_signed =scope.row.plan_signed.replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3');
                "
                  v-model.trim="scope.row.plan_reserve"
                ></el-input>
                <span v-else>{{scope.row.plan_reserve}}</span>
              </template>
            </el-table-column>
            <el-table-column label="系统大定未签，且可签金额" header-align="center" align="center" width="150">
              <template slot-scope="scope">
                <el-input
                  v-if="readonly == 0"
                  @keyup.native="
                  scope.row.plan_signed=scope.row.plan_signed.replace(/[^\d.]/g,'');
                  scope.row.plan_signed =scope.row.plan_signed.replace(/\.{2,}/g,'.');
                  scope.row.plan_signed =scope.row.plan_signed.replace(/^\./g,'');
                  scope.row.plan_signed =scope.row.plan_signed.replace('.','$#$').replace(/\./g,'').replace('$#$','.');
                  scope.row.plan_signed =scope.row.plan_signed.replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3');
                  scope.row.plan_signed =Number(scope.row.plan_signed)>Number(scope.row.fact_signed)?scope.row.fact_signed:scope.row.plan_signed;
                "
                  v-model.trim="scope.row.plan_signed"
                ></el-input>
                <span v-else>{{scope.row.plan_signed}}</span>
              </template>
            </el-table-column>
            <el-table-column label="本月锁定金额" header-align="center" align="center" width="120">
              <template
                slot-scope="scope"
              >{{Number(scope.row.fact_month_sign)+Number(scope.row.plan_reserve)+Number(scope.row.plan_signed) | numFilter}}</template>
            </el-table-column>
            <el-table-column prop="plan_month_lock_per" label="本月锁定率" align="center" width="120">
              <template slot-scope="scope">
                <span
                  v-if="Number(scope.row.target_month_sign)==0"
                >{{scope.row.fact_month_sign*100 | numFilter}}%</span>
                <span
                  v-if="Number(scope.row.target_month_sign)!=0"
                >{{ ((Number(scope.row.fact_month_sign)+Number(scope.row.plan_reserve)+Number(scope.row.plan_signed))/Number(scope.row.target_month_sign))*100 | numFilter}}%</span>
              </template>
            </el-table-column>
            <el-table-column label="本月预估新增签约金额" header-align="center" align="center" width="140">
              <template slot-scope="scope">
                <el-input
                  v-if="readonly == 0"
                  type="number"
                  @keyup.native="
                scope.row.plan_signed=scope.row.plan_signed.replace(/[^\d.]/g,'');
                scope.row.plan_signed =scope.row.plan_signed.replace(/\.{2,}/g,'.');
                scope.row.plan_signed =scope.row.plan_signed.replace(/^\./g,'');
                scope.row.plan_signed =scope.row.plan_signed.replace('.','$#$').replace(/\./g,'').replace('$#$','.');
                scope.row.plan_signed =scope.row.plan_signed.replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3');
                "
                  v-model.trim="scope.row.plan_month_newsign"
                ></el-input>
                <span v-else>{{scope.row.plan_month_newsign}}</span>
              </template>
            </el-table-column>
            <el-table-column label="本月预估签约金额" header-align="center" align="center" width="140">
              <template slot-scope="scope">
                <!-- <el-input v-if="readonly == 0" type="number" v-model.number="scope.row.plan_month_sign"></el-input>
                <span v-else>{{scope.row.plan_month_sign}}</span>-->
                {{Number(scope.row.fact_month_sign)+Number(scope.row.plan_reserve)+Number(scope.row.plan_signed)+Number(scope.row.plan_month_newsign) | numFilter}}
              </template>
            </el-table-column>
            <el-table-column prop="plan_week_bearer_gap" label="周度来人缺口" align="center" width="110"></el-table-column>
            <el-table-column prop="plan_week_sign_gap" label="周度签约缺口" align="center" width="110"></el-table-column>
            <el-table-column
              prop="plan_month_sign_gap"
              label="本月预估签约缺口"
              header-align="center"
              align="center"
              width="140"
            >
              <template
                slot-scope="scope"
              >{{Number(scope.row.fact_month_sign)+Number(scope.row.plan_reserve)+Number(scope.row.plan_signed)+Number(scope.row.plan_month_newsign)-scope.row.target_month_sign/1 | numFilter}}</template>
            </el-table-column>
            <!-- <el-table-column label="缺口原因说明(3类接口存在均需说明)" align="center" width="250">
              <template slot-scope="scope">
                <el-input v-if="readonly == 0" v-model="scope.row.gap_cause"></el-input>
                <span v-else>{{scope.row.gap_cause}}</span>
              </template>
            </el-table-column>-->
          </el-table-column>
        </el-table>
      </div>
      <div class="editText">
        <el-row>
          <el-col :span="24">
            <div class="grid-content cause bg-purple-dark">缺口原因说明</div>
          </el-col>
        </el-row>
        <el-row>
          <!-- // detailed_description:areaText2,
        // cause_details:areaText1,
        // minor_details:selectData2,
          // gap_cause:selectData1-->
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form label-width="140px">
                <el-form-item label="预估缺口主要原因">
                  <el-select v-model="selectData1" :disabled="readonly == 1" placeholder="请选择主要原因">
                    <el-option
                      :label="item.DictName"
                      v-for="(item,index) in filterOption1"
                      :key="index"
                      :value="item.DictName"
                    >{{item.DictName}}</el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="主要原因详细说明">
                  <el-input
                    :disabled="readonly == 1"
                    @input="textLength1"
                    maxlength="500"
                    type="textarea"
                    class="areaText"
                    v-model="areaText1"
                  ></el-input>
                </el-form-item>
              </el-form>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple-light">
              <el-form label-width="140px">
                <el-form-item label="预估缺口次要原因">
                  <el-select v-model="selectData2" :disabled="readonly == 1" placeholder="请选择次要原因">
                    <el-option
                      :label="item.DictName"
                      v-for="(item,index) in filterOption2"
                      :key="index"
                      :value="item.DictName"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="次要原因详细说明">
                  <el-input
                    @input="textLength2"
                    :disabled="readonly == 1"
                    type="textarea"
                    class="areaText"
                    maxlength="500"
                    v-model="areaText2"
                  ></el-input>
                </el-form-item>
              </el-form>
            </div>
          </el-col>
        </el-row>
        <el-row style="margin-top:10px">
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form label-width="140px">
                <el-form-item label="达成月度目标需要的支持政策及政策使用情况">
                  <el-input
                    @input="textLength3"
                    :disabled="readonly == 1"
                    maxlength="500"
                    type="textarea"
                    v-model="areaText3"
                    class="areaThree"
                  ></el-input>
                </el-form-item>
              </el-form>
            </div>
          </el-col>

          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form label-width="140px">
                <el-form-item label="备注">
                  <el-input
                    :disabled="readonly == 1"
                    @input="textLength4"
                    maxlength="500"
                    type="textarea"
                    v-model="areaText4"
                    class="areaThree"
                  ></el-input>
                </el-form-item>
              </el-form>
            </div>
          </el-col>
        </el-row>
      </div>
      <el-row class="el-row-button">
        <el-button
          type="primary"
          v-if="readonly == 0&&$store.state.user.userPower.includes('上报')"
          class="xuHuiBtn main"
          @click="reported(projectWeeklyData)"
        >上报</el-button>
        <el-button
          type="primary"
          v-if="readonly == 0&&$store.state.user.userPower.includes('暂存')"
          class="xuHuiBtn main"
          @click="hold(projectWeeklyData)"
        >暂存</el-button>
        <el-button type="primary" class="xuHuiBtn main" @click="$router.back(-1)">返回</el-button>
      </el-row>
      <el-row class="annotation">注：周报在每周末晚18点30分将自动刷新从售楼系统中获取的本月和本周实际完成情况，你需要尽快填写预估情况</el-row>
    </el-row>
  </div>
</template>

<script>
import { render, sendJSON, downLoad } from "@/api/request";
import { sortList } from "@/utils/methods";
import { total } from "@/utils/methods";
export default {
  name: "projectWeeklyParticulars",
  data() {
    return {
      projectWeeklyData: [
        {
          id: 1,
          date: "北京事业部",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        }
      ],
      tableHeight: 200,
      readonly: this.$route.query.is_effective,
      selectData1: "",
      selectData2: "",
      areaText2: "",
      areaText1: "",
      optionList: [],
      weekStart: "",
      weekEnd: "",
      areaText3: "",
      nowWeek: "",
      areaText4: ""
    };
  },
  mounted() {
  },
  computed: {
    inputMoney() {
      return +this.inputCeLue + +this.inputBig + +this.fact_week_sign;
    },
    filterOption1() {
      return this.optionList;
    },
    filterOption2() {
      return this.optionList;
    }
  },
  filters: {
    getMonthDay(value) {
      return new Date(value).getAppointedFormatTime("MM月dd日");
    },
    getYear(value) {
      return new Date(value).getAppointedFormatTime("yyyy年");
    },
    //保留两位小数四舍五入
    numFilter(value) {
      let realVal = "";
      if (value) {
        realVal = parseFloat(value).toFixed(2);
      } else {
        realVal = "0.00";
      }
      return realVal;
    }
  },
  watch: {},
  created() {
    this.reload();
    this.weekStart = this.$route.query.start;
    this.weekEnd = this.$route.query.end;
    this.nowWeek =
      this.$route.query.start.split("-")[
        this.$route.query.start.split("-").length - 1
      ] +
      "-" +
      this.$route.query.end.split("-")[
        this.$route.query.end.split("-").length - 1
      ] +
      "号";
  },
  methods: {
    reload() {
      sendJSON("/weeklyMarketing/ProjectExamineWeekly", {
        project_id: this.$route.query.project_id,
        this_time: this.$route.query.this_time,
        how_week: this.$route.query.how_week,
        is_effective: this.$route.query.is_effective,
        type: this.$route.query.type,
        userId: "6d445313-3554-11e7-a3f8-5254007b6f02"
      }).then(res => {
        this.optionList = res.result[res.result.length - 1].gap;
        res.result.pop();
        this.$data.projectWeeklyData.splice(
          0,
          this.$data.projectWeeklyData.length,
          ...sortList(res.result, "business_unit_id", "father_id", "type", true)
        );
        this.selectData1 = res.result[0].gap_cause || "";
        this.selectData2 = res.result[0].minor_details || "";
        this.areaText2 = res.result[0].detailed_description || "";
        this.areaText1 = res.result[0].cause_details || "";
        this.areaText3 = res.result[0].policy_for_target || "";
        this.areaText4 = res.result[0].remarks || "";
      });
    },

    // 表格
    load(tree, treeNode, resolve) {
      sendJSON("/weeklyMarketing/ProjectExamineWeekly", {
        project_id: this.$route.query.project_id,
        this_time: this.$route.query.this_time,
        how_week: this.$route.query.how_week,
        is_effective: this.$route.query.is_effective,
        userId: "6d445313-3554-11e7-a3f8-5254007b6f02"
      }).then(res => {
        res.result.forEach(item => {
          if (item.father_count > 0) {
            item.hasChildren = true;
          }
        });
        resolve(res.result);
      });
    },
    // 暂存
    hold(primary) {
      (primary[0].detailed_description = this.areaText2),
        (primary[0].cause_details = this.areaText1),
        (primary[0].minor_details = this.selectData2),
        (primary[0].gap_cause = this.selectData1);
      primary[0].policy_for_target = this.areaText3;
      primary[0].remarks = this.areaText4;
      primary[0].plan_month_lock_per = parseFloat(
        ((Number(primary[0].fact_month_sign) +
          Number(primary[0].plan_reserve) +
          Number(primary[0].plan_signed)) /
          Number(primary[0].target_month_sign)) *
          100
      ).toFixed(2);
      primary[0].plan_month_lock_price = parseFloat(
        Number(primary[0].fact_month_sign) +
          Number(primary[0].plan_reserve) +
          Number(primary[0].plan_signed)
      ).toFixed(2);
      primary[0].plan_month_sign = parseFloat(
        Number(primary[0].fact_month_sign) +
          Number(primary[0].plan_reserve) +
          Number(primary[0].plan_signed) +
          Number(primary[0].plan_month_newsign)
      ).toFixed(2);
      primary[0].plan_month_sign_gap = parseFloat(
        Number(primary[0].fact_month_sign) +
          Number(primary[0].plan_reserve) +
          Number(primary[0].plan_signed) +
          Number(primary[0].plan_month_newsign) -
          primary[0].target_month_sign / 1
      ).toFixed(2);

      sendJSON("/weeklyMarketing/weekMarketingPlanUpdate", {
        ...primary
      }).then(res => {
        _paq.push(["trackEvent", "点击", "暂存", "项目月度计划管理暂存"]);

        this.$message.success("暂存成功");
      });
    },
    // 上报
    reported(primary) {
      console.log(primary[0].type);
      (primary[0].detailed_description = this.areaText2),
        (primary[0].cause_details = this.areaText1),
        (primary[0].minor_details = this.selectData2),
        (primary[0].gap_cause = this.selectData1);
      primary[0].policy_for_target = this.areaText3;
      primary[0].remarks = this.areaText4;
      if (primary[0].target_month_sign == 0) {
        primary[0].target_month_sign = 1;
      }
      primary[0].plan_month_lock_per = parseFloat(
        ((Number(primary[0].fact_month_sign) +
          Number(primary[0].plan_reserve) +
          Number(primary[0].plan_signed)) /
          Number(primary[0].target_month_sign)) *
          100
      ).toFixed(2);
      primary[0].plan_month_lock_price = parseFloat(
        Number(primary[0].fact_month_sign) +
          Number(primary[0].plan_reserve) +
          Number(primary[0].plan_signed)
      ).toFixed(2);
      primary[0].plan_month_sign = parseFloat(
        Number(primary[0].fact_month_sign) +
          Number(primary[0].plan_reserve) +
          Number(primary[0].plan_signed) +
          Number(primary[0].plan_month_newsign)
      ).toFixed(2);
      primary[0].plan_month_sign_gap = parseFloat(
        Number(primary[0].fact_month_sign) +
          Number(primary[0].plan_reserve) +
          Number(primary[0].plan_signed) +
          Number(primary[0].plan_month_newsign) -
          primary[0].target_month_sign / 1
      ).toFixed(2);

      this.$confirm("确认上报吗？")
        .then(() => {
          sendJSON("/weeklyMarketing/weekMarketingPlanUpdate", {
            ...primary
          }).then(res => {
            sendJSON("/weeklyMarketing/weekMarketingPlanEffective", {
              ...this.$route.query,
              is_effective: 1,
              type: primary[0].type,
              plan_status: 1
            }).then(res => {
              _paq.push(["trackEvent", "点击", "上报", "项目周度计划管理上报"]);

              this.$message.success("上报成功");
              this.$router.back(-1);
            });
          });
        })
        .catch(() => {
          this.$message("已取消");
        });
    },
    // 导出数据
    exportTemp() {
      let { this_time, how_week, project_id } = this.$route.query;
      return downLoad("/weeklyMarketing/projectWeeklyDataExport", {
        this_time: this_time,
        how_week: how_week,
        projectId: project_id
      });
    },
    exportMatomo() {
      _paq.push(["trackEvent", "点击", "导出", "项目周报数据导出"]);
    },
    //  文本长度不超过五百
    textLength1() {
      console.log(this.areaText2, this.areaText1);
      if (this.areaText1.length >= 500) {
        this.$message.error("文本长度不能超过500字");
      }
    },
    //  文本长度不超过五百
    textLength2() {
      console.log(this.areaText2, this.areaText1);
      if (this.areaText2.length >= 500) {
        this.$message.error("文本长度不能超过500字");
      }
    },
    //  文本长度不超过五百
    textLength3() {
      console.log(this.areaText2, this.areaText1);
      if (this.areaText3.length >= 500) {
        this.$message.error("文本长度不能超过500字");
      }
    },
    textLength4() {
      console.log(this.areaText2, this.areaText1);
      if (this.areaText4.length >= 500) {
        this.$message.error("文本长度不能超过500字");
      }
    }
  }
};
</script>
<style lang="scss">
@import "@/styles/form.scss";
</style>
<style lang="less">
.outData {
  display: block;
  width: 100px;
  height: 30px;
  background-color: #2761ff;
  line-height: 30px;
  text-align: center;
  color: #fff !important;
  border-radius: 4px;
}
.outData:hover {
  color: #fff;
  background-color: #023bd8 !important;
}
.areaText {
  .el-textarea__inner {
    height: 140px;
  }
}
.el-form-item__label {
  // color: red !important;
  line-height: 20px;
}
.areaThree {
  .el-textarea__inner {
    height: 140px;
  }
}
 ::v-deep input::-webkit-outer-spin-button,
 ::v-deep input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}

input[type="number"] {
  -moz-appearance: textfield;
}
.cause {
  height: 30px;
  font-size: 18px;
  color: #000;
  font-weight: 700;
  line-height: 30px;
  text-indent: 1em;
}
.annotation {
  margin-top: 10px;
  font-size: 12px;
  color: #999;
  text-align: center;
}
textarea {
  resize: none !important;
}
</style>
<style lang='less' scoped>
.projectWeeklyData {
  .targetTitle {
    text-indent: 2em;
    font-size: 12px;
    color: #606266;
    padding: 5px 0;
  }
  .weekTitle {
    text-align: center;
    font-size: 18px;
    margin-bottom: 10px;
    span {
      float: right;
      font-size: 12px;
      color: #999;
      margin-top: 4px;
    }
  }
  .top {
    height: 50px;
    line-height: 50px;
    background-color: #fff;
    .top_l {
      color: #2761ff;
    }
  }
  .projectWeeklyForm {
    margin-top: 10px;
  }
  .editText {
    height: 450px;
  }
}
</style>
