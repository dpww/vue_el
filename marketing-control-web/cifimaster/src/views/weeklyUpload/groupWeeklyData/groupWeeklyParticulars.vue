<template>
  <div class="groupWeeklyData app-container">
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
      <div class="marketingForm">
        <h3 class="weekTitle">
          {{weekStart|getYear}}{{weekStart|getMonthDay}}-{{weekEnd|getMonthDay}}周报
          <span>金额单位: (万元)</span>
        </h3>
        <el-table
          :data="marketingData"
          row-key="id"
          :height="tableHeight"
          style="width: 100%;min-height:200px;"
          lazy
          :load="load"
          :tree-props="{children: 'children', hasChildren: 'hasChildren2'}"
        >
          <el-table-column
            prop="project_name"
            fixed
            label="事业部/项目"
            align="left"
            width="200"
            header-align="center"
          >
            <template slot-scope="scope">
              <a
                href="javascript:void(0);"
                style="color:#333"
                :title="scope.row.project_name"
              >{{scope.row.project_name}}</a>
            </template>
          </el-table-column>

          <el-table-column label="状态" fixed align="center" width="120" class="Color">
            <template slot-scope="scope">
              <span v-if="scope.row.plan_status==-1&&scope.row.type==2" style="color:red">已驳回</span>
              <span v-if="scope.row.plan_status==0&&scope.row.type==2" style="color:red">未上报</span>
              <span v-if="scope.row.plan_status==1&&scope.row.type==2" style="color:green">已上报</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="report_time"
            label="上报时间"
            align="center"
            width="100"
            class="Color"
          ></el-table-column>
          <el-table-column label="项目信息" align="center" class="Color">
            <el-table-column label="项目编码" align="center" width="180">
              <template slot-scope="scope">
                <a
                  href="javascript:void(0);"
                  style="color:#333"
                  :title="scope.row.project_code"
                >{{scope.row.project_code}}</a>
              </template>
            </el-table-column>
            <el-table-column
              prop="trader_name"
              label="操盘手"
              align="center"
              width="100"
              class="Color"
            ></el-table-column>
            <el-table-column prop="islast" label="是否尾盘" align="center" width="80" class="Color"></el-table-column>
            <el-table-column
              prop="issales_trade"
              label="是否我方营销操盘"
              align="center"
              width="140"
              class="Color"
            ></el-table-column>
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
              <el-table-column
                prop="target_month_sign"
                label="签约金额"
                header-align="center"
                align="center"
                width="100"
              ></el-table-column>
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
            <el-table-column :label="nowWeek+'目标占比'" align="center">
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
            <el-table-column prop="fact_month_bearer_per" label="月度来人完成率" align="center" width="80"></el-table-column>
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
              width="80"
            ></el-table-column>
            <el-table-column
              prop="fact_month_sign"
              label="月度签约金额(系统签约)"
              header-align="center"
              align="center"
              width="130"
            ></el-table-column>
            <el-table-column prop="fact_month_sign_per" label="月度签约完成率" align="center" width="80"></el-table-column>
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
              width="110"
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
              prop="plan_reserve"
              label="线下锁定未进系统，且本月可签金额"
              header-align="center"
              align="center"
              width="150"
            ></el-table-column>
            <el-table-column
              prop="plan_signed"
              label="系统大定未签，且可签金额"
              header-align="center"
              align="center"
              width="150"
            ></el-table-column>
            <el-table-column
              prop="plan_month_lock_price"
              label="本月锁定金额"
              header-align="center"
              align="center"
              width="120"
            ></el-table-column>
            <el-table-column prop="plan_month_lock_per" label="本月锁定率" align="center" width="120"></el-table-column>
            <el-table-column
              prop="plan_month_newsign"
              label="本月预估新增签约金额"
              header-align="center"
              align="center"
              width="140"
            ></el-table-column>
            <el-table-column
              prop="plan_month_sign"
              label="本月预估签约金额"
              header-align="center"
              align="center"
              width="140"
            ></el-table-column>
            <el-table-column prop="plan_week_bearer_gap" label="周度来人缺口" align="center" width="110"></el-table-column>
            <el-table-column
              prop="plan_week_sign_gap"
              label="周度签约缺口"
              header-align="center"
              align="center"
              width="110"
            ></el-table-column>
            <el-table-column
              prop="plan_month_sign_gap"
              label="本月预估签约缺口"
              header-align="center"
              align="center"
              width="140"
            ></el-table-column>
          </el-table-column>
          <el-table-column label="缺口原因说明" align="center">
            <el-table-column prop="gap_cause" label="预计缺口主要原因" align="center" width="100"></el-table-column>
            <el-table-column label="主要原因详情说明" align="center" width="200">
              <template slot-scope="scope">
                <a
                  href="javascript:void(0);"
                  style="color:#333"
                  :title="scope.row.cause_details"
                >{{scope.row.cause_details}}</a>
              </template>
            </el-table-column>
            <el-table-column prop="minor_details" label="预计缺口次要原因" align="center" width="100"></el-table-column>
            <el-table-column label="次要原因详情说明" align="center" width="200">
              <template slot-scope="scope">
                <a
                  href="javascript:void(0);"
                  style="color:#333"
                  :title="scope.row.detailed_description"
                >{{scope.row.detailed_description}}</a>
              </template>
            </el-table-column>
          </el-table-column>
          <el-table-column label="达成月度目标需要的支持政策及政策使用情况" align="center" width="200">
            <template slot-scope="scope">
              <a
                href="javascript:void(0);"
                style="color:#333"
                :title="scope.row.policy_for_target"
              >{{scope.row.policy_for_target}}</a>
            </template>
          </el-table-column>
          <el-table-column label="备注" align="center" width="200">
            <template slot-scope="scope">
              <a
                href="javascript:void(0);"
                style="color:#333"
                :title="scope.row.remarks"
              >{{scope.row.remarks}}</a>
            </template>
          </el-table-column>
          <el-table-column align="center" label="操作" width="200">
            <template slot-scope="scope">
              <el-button
                type="text"
                v-if="scope.row.plan_status == 1&&scope.row.type==2&&$store.state.user.userPower.includes('驳回')"
                @click="handleEdit({'project_id':scope.row.project_id,'how_week':scope.row.how_week,'this_time':scope.row.this_time,'area_id':scope.row.area_id, 'is_effective': -1,'type':scope.row.type},scope.row)"
              >驳回</el-button>
              <div
                class="checkedBox"
                v-if="scope.row.type==2&&$store.state.user.userPower.includes('复核')"
              >
                <el-checkbox
                  @change="checkedStatus( scope.row )"
                  label="复核"
                  name="checkeds"
                  :checked="scope.row.checkeds==1"
                ></el-checkbox>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-row>

    <el-row type="flex" justify="center">
      <el-button type="primary" class="xuHuiBtn" @click="$router.back(-1)">返回</el-button>
    </el-row>
  </div>
</template>

<script>
import { render, sendJSON, downLoad } from "@/api/request";
import { sortList } from "@/utils/methods";
import { changeChecked } from "@/api/weekly";
export default {
  name: "groupWeeklyParticulars",
  data() {
    return {
      marketingData: [],
      tableHeight: 460,
      weekStart: "",
      weekEnd: "",
      groupId: "",
      nowWeek: "",
      checkIdList: []
    };
  },
  mounted() {
  },
  filters: {
    getMonthDay(value) {
      return new Date(value).getAppointedFormatTime("MM月dd日");
    },
    getYear(value) {
      return new Date(value).getAppointedFormatTime("yyyy年");
    },
    // 保留两位小数四舍五入
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
  created() {
    this.reload();
    this.getHeight();
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
    // 高度
    getHeight() {
      this.tableHeight = window.innerHeight - 288;
    },
    // 重新渲染
    reload() {
      sendJSON("/weeklyMarketing/ProjectExamineWeekly", {
        this_time: this.$route.query.this_time,
        project_id: this.$route.query.project_id,
        how_week: this.$route.query.how_week,
        type: this.$route.query.type,
        is_effective: 1,
        userId: "6d445313-3554-11e7-a3f8-5254007b6f02",
        business_unit_id: this.$route.query.business_unit_id
      }).then(res => {
        res.result.pop();
        this.groupId = res.result[res.result.length - 1].id;
        this.marketingData.splice(
          0,
          this.marketingData.length,
          ...sortList(res.result, "business_unit_id", "father_id", "type", true)
        );
        let cheList = res.result.filter(item => item.type == 2);
        cheList.forEach(item => {
          item.hasChildren2 = true;
          if (item.checkeds == 1) {
            this.checkIdList.push(item.id);
          }
        });
      });
    },

    // 表格
    load(tree, treeNode, resolve) {
      console.log(tree);
      sendJSON("/weeklyMarketing/ProjectExamineWeekly", {
        project_id: tree.project_id,
        this_time: this.$route.query.this_time,
        how_week: this.$route.query.how_week,
        userId: "6d445313-3554-11e7-a3f8-5254007b6f02",
        type: 2,
        business_unit_id: tree.business_unit_id
      }).then(res => {
        res.result.pop();
        if (res.result.length == 0) {
          this.$alert("该区域暂未上报");
        }
        resolve(res.result);
      });
    },
    // 导出数据
    exportTemp() {
      let { this_time, how_week, project_id } = this.$route.query;
      return downLoad("/weeklyMarketing/groupWeeklyDataExport", {
        this_time: this_time,
        how_week: how_week,
        projectId: project_id
      });
    },
    exportMatomo() {
      _paq.push(["trackEvent", "点击", "导出", "项目查看周报数据导出"]);
    },
    checkedStatus(row) {
      let status;
      if (this.checkIdList.findIndex(item => item == row.id) != -1) {
        this.checkIdList = this.checkIdList.filter(item => item != row.id);
        status = 0;
      } else {
        this.checkIdList.push(row.id);
        status = 1;
      }
      row.checkeds = status;
      changeChecked([
        {
          ...row
        }
      ]).then(res => {});
    },
    handleEdit(query, row) {
      this.$confirm("确认驳回吗？").then(() => {
        sendJSON("/weeklyMarketing/weekMarketingPlanEffective", {
          ...query,
          plan_status: -1,
          is_effective: 0
        }).then(res => {
          _paq.push(["trackEvent", "点击", "驳回", "集团周度计划管理驳回"]);
          this.reload();
          this.$message.success("驳回成功");
        });
      });
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
</style>

<style lang='less' scoped>
.groupWeeklyData {
  .checkedBox {
    float: right;
    height: 36px;
    line-height: 36px;
    margin-right: 20px;
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
}
</style>
