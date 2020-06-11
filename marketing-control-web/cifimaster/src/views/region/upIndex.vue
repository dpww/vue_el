<template>
  <div class="app-container">
    <div class="organization">
      <div>
        项目指标详情
        <small style="font-size: 80%; color: #999;">(金额单位:万元)</small>
      </div>
      <el-row>
        <el-button
          type="primary"
          v-if="$store.state.user.userPower.includes('导出模板')"
          class="xuHuiBtn secondary"
        >
          <a :href="exportTemp()" @click="bury" download="download">导出数据</a>
        </el-button>
      </el-row>
    </div>
    <!-- 表格 -->
    <el-row class="container">
      <el-table
        :data="tableData"
        style="width: 100%;margin-bottom: 20px;margin-top:0"
        row-key="business_id"
        default-expand-all
        :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
        class="etable"
        :height="700"
      >
        <el-table-column label="区域集团/事业部" header-align="center" align="left" width="210" fixed>
          <template slot-scope="scope">
            <span
              size="mini"
              v-if="scope.row.type==3"
              :title="scope.row.business_name"
              style="color:#6600FF "
              @click="ProjectDetails(scope.row.plan_status,{projectId:scope.row.business_id,months:scope.row.months,'is_effective':0})"
            >{{ scope.row.business_name }}</span>
            <span
              size="mini"
              v-if="scope.row.type!=3"
              :title="scope.row.business_name"
            >{{ scope.row.business_name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="供货情况" header-align="center" align="center">
          <el-table-column label="库存可售" header-align="center" align="center">
            <el-table-column
              prop="reserve_can_sell_set"
              width="120"
              label="套"
              header-align="center"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="reserve_can_sell_funds"
              width="120"
              label="金额"
              header-align="center"
              align="right"
            ></el-table-column>
          </el-table-column>
          <el-table-column label="新增可售" header-align="center" align="center">
            <el-table-column
              prop="new_reserve_set"
              label="套"
              width="120"
              header-align="center"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="new_reserve_funds"
              label="金额"
              width="120"
              header-align="center"
              align="right"
            ></el-table-column>
          </el-table-column>
          <el-table-column label="合计可售" header-align="center" align="center">
            <el-table-column
              prop="total_reserve_set"
              label="套"
              width="120"
              header-align="center"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="total_reserve_funds"
              label="金额"
              width="120"
              header-align="center"
              align="right"
            ></el-table-column>
          </el-table-column>
        </el-table-column>
        <!-- <el-table-column label="年度计划签约" header-align="center" align="center">
          <el-table-column prop="year_plan_sign" label="金额" header-align="center" align="right" width="120"></el-table-column>
        </el-table-column>-->
        <!-- statr -->

        <!-- <el-table-column label="年度考核签约目标" header-align="center" align="center">
          <el-table-column
            prop="year_check_funds"
            label="金额"
            header-align="center"
            align="right"
            width="160"
          ></el-table-column>
        </el-table-column>
        <el-table-column
          label="年度考核版指标完成率(%)"
          prop="year_check_funds_per"
          header-align="center"
          align="center"
        ></el-table-column>
        <el-table-column label="月度累计考核签约指标" header-align="center" align="center">
          <el-table-column
            prop="months_check_funds"
            label="金额"
            header-align="center"
            align="center"
            width="160"
          ></el-table-column>
        </el-table-column>
        <el-table-column
          label="月度累计考核签约指标完成率(%)"
          prop="months_check_funds_per"
          header-align="center"
          align="center"
        ></el-table-column> -->

        <!-- end -->
        <el-table-column label="年度累计签约" header-align="center" align="center">
          <el-table-column
            prop="year_grand_total_sign"
            label="金额"
            header-align="center"
            align="right"
            width="120"
          ></el-table-column>
        </el-table-column>
        <el-table-column label="前三月月均签约" header-align="center" align="center">
          <el-table-column
            prop="top_three_month_average_sign_set"
            width="120"
            label="套"
            header-align="center"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="top_three_month_average_sign_funds"
            width="120"
            label="金额"
            header-align="center"
            align="right"
          ></el-table-column>
        </el-table-column>
        <el-table-column prop="toptree2" label="上月签约" header-align="center" align="center">
          <el-table-column
            prop="upper_moon_sign_set"
            label="套"
            width="120"
            header-align="center"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="upper_moon_sign_funds"
            label="金额"
            width="120"
            header-align="center"
            align="right"
          ></el-table-column>
        </el-table-column>
        <el-table-column label="计划签约" header-align="center" align="center">
          <!-- <el-table-column prop="stock" label="库存签约" header-align="center" align="center"></el-table-column> -->
          <el-table-column label="库存签约" header-align="center" align="center">
            <el-table-column label="金额" header-align="center" width="120" align="right">
              <template slot-scope="scope">{{scope.row.reserve_sign_funds}}</template>
            </el-table-column>
          </el-table-column>
          <!-- <el-table-column prop="add" label="新增签约" header-align="center" align="center"></el-table-column> -->
          <el-table-column label="新增签约" header-align="center" align="center">
            <el-table-column label="金额" header-align="center" width="120" align="right">
              <template slot-scope="scope">{{scope.row.new_sign_funds}}</template>
            </el-table-column>
          </el-table-column>
          <el-table-column label="合计签约" header-align="center" align="center">
            <el-table-column label="金额" header-align="center" width="120" align="right">
              <template slot-scope="scope">{{scope.row.total_sign_funds}}</template>
            </el-table-column>
          </el-table-column>
          <!-- <el-table-column prop="total" label="合计签约" header-align="center" align="center"></el-table-column> -->
        </el-table-column>

        <el-table-column label="认购计划" header-align="center" align="center">
          <el-table-column label="计划认购" header-align="center" align="center">
            <el-table-column label="套" prop="plan_subscription_set" width="120" align="center"></el-table-column>
            <el-table-column label="金额" prop="plan_subscription_funds" width="120" align="right"></el-table-column>
          </el-table-column>
        </el-table-column>
        <el-table-column label="成交率" header-align="center" align="center">
          <el-table-column
            label="前三月平均成交率"
            width="120"
            prop="top_three_month_average_turnover_rate"
            header-align="center"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="last_month_turnover_rate"
            width="120"
            label="上月成交率"
            header-align="center"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="plan_turnover_rate"
            width="120"
            label="计划成交率(%)"
            header-align="center"
            align="center"
          ></el-table-column>
        </el-table-column>
        <el-table-column label="营销推广费用" header-align="center" align="center">
          <el-table-column
            label="金额"
            width="120"
            prop="marketing_promotion_cost"
            header-align="center"
            align="right"
          ></el-table-column>
        </el-table-column>
      </el-table>
    </el-row>
    <el-row class="el-row-button">
      <!-- <el-button type="primary" @click="FundsUpdate">暂存</el-button> -->
      <el-button
        type="primary"
        v-if="(readonly||status||$store.state.user.userJobType=='admin')&&onlyRead"
        @click="FundsEffective"
        class="xuHuiBtn main"
      >上报</el-button>
      <el-button type="primary" @click="$router.back(-1)" class="xuHuiBtn secondary">返回</el-button>
    </el-row>
  </div>
</template>

<script>
import {
  /*
     区域查看区域查看  项目上报
     */
  regionReportSelect,

  /*
     区域查看项目上报合计
     */
  regionFundsSelect,
  /*
     修改区域项目合計
     */
  regionFundsUpdate,
  /*
      区域项目合計上报
      */
  regionFundsEffective
} from "@/api/businessManager";

import { sendJSON, restful, downLoad } from "@/api/request";

import { sortList } from "@/utils/methods";

export default {
  data() {
    return {
      //   表格
      tableData: [],
      tableHeight: document.body.clientHeight - 220,
      readonly:
        localStorage.getItem("CommonJobID") !==
        "f344fe8d-e379-11e9-8c08-00163e05721e",
      status: false,
      onlyRead: this.$route.query.planStatus > 1 ? false : true
    };
  },
  created() {
    //console.log(this.$route.query);
    restful("/areadetail/regionReportSelect", [
      this.$route.query.regionOrgId,
      this.$route.query.months
    ]).then(res => {
      this.status = res.result[0].is_effective == 0;
      this.$data.tableData.push(
        ...sortList(res.result, "business_unit_id", "father_id", "type", true)
      );
    });
  },
  methods: {
    ProjectDetails(status, params) {
      if (status == 0) {
        this.$message.error("该项目未上报");
        return;
      }
      this.$router.push({
        name: "planInput",
        query: params
      });
    },
    bury() {
      //_paq.push(['trackEvent', '点击', '导出', '区域上报指标数据导出']);
      _paq.push(["setDownloadExtensions", "xlsx"]);
      _paq.push(["trackEvent", "点击", "导出", "区域月度下发指标数据导出"]);
    },
    exportTemp() {
      let { months, regionOrgId } = this.$route.query;
      return downLoad("/Export/regionMonthlyUpExport.action", {
        month: months,
        businessId: regionOrgId
      });
    },
    FundsEffective() {
      this.$confirm("确认上报吗？")
        .then(() => {
          regionFundsUpdate(JSON.stringify(this.$route.query)).then(res => {
            regionFundsEffective(
              JSON.stringify({
                regionOrgId: this.$route.query.regionOrgId,
                months: this.$route.query.months,
                isEffective: 1,
                planStatus: 2
              })
            ).then(res => {
              this.$message.success("上报成功");
              this.$router.push({ name: "regionalmanagement" });
            });
          });
        })
        .catch(() => {
          this.message("已取消");
        });
    },
    //   表格
    load(tree, treeNode, resolve) {
      setTimeout(() => {
        resolve([
          {
            id: 31,
            date: "2016-05-01",
            name: "王小虎",
            address: "上海市普陀区金沙江路 1519 弄"
          },
          {
            id: 32,
            date: "2016-05-01",
            name: "王小虎",
            address: "上海市普陀区金沙江路 1519 弄"
          }
        ]);
      }, 1000);
    }
  }
};
</script>
<style scoped src="@/assets/css/style.css"></style>
<style lang="scss">
@import "@/styles/form.scss";
</style>
