<template>
  <div class="app-container">
    <div class="organization">
      <div>
        集团指标详情
        <small style="font-size: 80%; color: #999;">(金额单位:万元)</small>
      </div>
      <div>
        <el-row>
          <el-button
            v-if="$store.state.user.userPower.includes('导出模板')"
            type="primary"
            class="xuHuiBtn secondary"
          >
            <a :href="exportTemp()" @click="bury" download="download">导出数据</a>
          </el-button>
        </el-row>
      </div>
    </div>
    <!-- 表格 -->
    <el-row class="container">
      <el-table
        :data="tableData"
        style="width: 100%;margin-bottom: 20px;margin-top:0"
        row-key="business_id"
        :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
        class="etable"
        :border="false"
        :default-expand-all="true"
        lazy
        :load="load"
        :height="tableHeight"
      >
        <el-table-column label="事业部/项目" header-align="center" align="left" width="210" fixed>
          <template slot-scope="scope">
            <span :title="scope.row.business_name">{{ scope.row.business_name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="供货情况" header-align="center" align="center">
          <el-table-column label="库存可售" header-align="center" align="center">
            <el-table-column
              prop="reserve_can_sell_set"
              label="套"
              width="120"
              header-align="center"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="reserve_can_sell_funds"
              label="金额"
              width="120"
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
              width="160"
              header-align="center"
              align="right"
            ></el-table-column>
          </el-table-column>
        </el-table-column>

        
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
            label="套"
            width="120"
            header-align="center"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="top_three_month_average_sign_funds"
            label="金额"
            width="120"
            header-align="center"
            align="right"
          ></el-table-column>
        </el-table-column>
        <el-table-column label="上月签约" header-align="center" align="center">
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
          <el-table-column label="库存签约" header-align="center" width="120" align="center">
            <el-table-column label="金额" header-align="center" width="120" align="right">
              <template slot-scope="scope">{{Math.round(scope.row.reserve_sign_funds)}}</template>
            </el-table-column>
          </el-table-column>
          <!-- <el-table-column prop="add" label="新增签约" header-align="center" align="center"></el-table-column> -->
          <el-table-column label="新增签约" header-align="center" width="120" align="center">
            <el-table-column label="金额" header-align="center" width="120" align="right">
              <template slot-scope="scope">{{Math.round(scope.row.new_sign_funds)}}</template>
            </el-table-column>
          </el-table-column>
          <el-table-column label="合计签约" width="120" header-align="center" align="center">
            <el-table-column label="金额" width="120" header-align="center" align="right">
              <template slot-scope="scope">{{Math.round(scope.row.total_sign_funds)}}</template>
            </el-table-column>
          </el-table-column>
        </el-table-column>
      </el-table>
      <el-row class="el-row-button">
        <el-button type="primary" class="xuHuiBtn main" @click="$router.back(-1)">返回</el-button>
      </el-row>
    </el-row>
  </div>
</template>

<script>
import { sendFile, sendJSON, downLoad } from "@/api/request";
import { sortList, getLevelList } from "@/utils/methods";

export default {
  data() {
    return {
      //   表格
      tableData: [],
      tableHeight: document.body.clientHeight - 220
    };
  },
  created() {
    this.$store.dispatch("app/trackPageView", "下发区域指标详情");
    let { months, id } = this.$route.query;
    sendJSON(
      this.$route.query.region
        ? "/group/getGroupReleaseInRegional"
        : "/group/getGroupAllMessages",
      {
        months: months,
        userId: localStorage.getItem("id"),
        bussinesId: id
      }
    ).then(res => {
      console.time("渲染耗时");
      //sortList(res.result, 'business_unit_id', 'father_id', 'type', true)
      this.$data.tableData.push(
        ...sortList(res.result, "business_unit_id", "father_id", "type", true)
      );
      console.timeEnd("渲染耗时");
    });
  },
  methods: {
    //   表格
    load(tree, treeNode, resolve) {
      sendJSON("/group/getGroupChildMessages", {
        months: this.$route.query.months,
        PojectOrgId: tree.business_unit_id,
        userId: localStorage.getItem("id")
      }).then(res => {
        res.result.forEach(item => {
          if (item.father_count > 0) {
            item.hasChildren = true;
          }
        });
        resolve(res.result);
      });
    },
    bury() {
      //_paq.push(['trackEvent', '点击', '导出', '区域上报指标数据导出']);
      _paq.push(["setDownloadExtensions", "xlsx"]);
    },
    exportTemp() {
      let { months, id, region } = this.$route.query;
      return downLoad(
        region
          ? "/Export/groupMonthlyPlanExport.action"
          : "/Export/groupMonthlyPlanWriteExport.action",
        {
          month: months,
          businessId: id
        }
      );
    }
  }
};
</script>
<style scoped src="@/assets/css/style.css"></style>
