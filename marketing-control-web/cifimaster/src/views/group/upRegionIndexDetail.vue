·<template>
  <div class="app-container">
    <div class="organization">
      <div>
        区域指标详情
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
        :default-expand-all="false"
        :data="tableData"
        ref="multipleTable"
        style="width: 100%;margin-bottom: 20px;margin-top:0"
        row-key="business_id"
        :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
        class="etable"
        :height="700"
        :cell-style="cellStyle"
        @selection-change="SelectionChange"
      >
        <!-- <el-table-column label="全选" header-align="center" align="center" width="80" fixed></el-table-column> -->
        <!-- <el-table-column header-align="center" align="center" width="80" fixed type="selection"></el-table-column> -->
        <el-table-column
          label="全选"
          header-align="center"
          align="center"
          width="80"
          fixed
          type="selection"
        >
        </el-table-column>

        <el-table-column label="项目" header-align="center" align="left" width="210" fixed>
          <template slot-scope="scope">
            <span
              size="mini"
              v-if="scope.row.type==3"
              :title="scope.row.business_name "
              style="color:#6600FF "
              @click="ProjectDetails(scope.row.plan_status,{projectId:scope.row.business_id,months:scope.row.months,'is_effective':0})"
            >{{ scope.row.business_name }}</span>
            <span size="mini" v-else :title="scope.row.business_name ">{{ scope.row.business_name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="状态" header-align="center" align="center" width="150" fixed>
          <template slot-scope="scope">
            <span v-if="scope.row.plan_status==0&&scope.row.type!==3" style="color:red">未上报</span>
            <span v-if="scope.row.plan_status==1&&scope.row.type!==3" style="color:green">已下发</span>
            <span v-if="scope.row.plan_status==2&&scope.row.type!==3" style="color:green">已上报</span>
            <span v-if="scope.row.plan_status==3&&scope.row.type!==3" style="color:green">已推送</span>
            <!-- <el-button
              @click="rejects({'regionOrgId':scope.row.business_id,'months':$router.currentRoute.query.months})"
              type="primary"
              class="xuHuiBtn secondary reject"
              v-if="scope.row.plan_status==3&&scope.row.type!==3&&$store.state.user.userPower.includes('撤销推送')"
            >驳回</el-button>-->
          </template>
        </el-table-column>
        <el-table-column label="供货情况" header-align="center" align="center">
          <el-table-column label="库存可售" header-align="center" align="center">
            <el-table-column
              prop="reserve_can_sell_set"
              label="套"
              header-align="center"
              width="120"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="reserve_can_sell_funds"
              label="金额"
              header-align="center"
              width="120"
              align="center"
            ></el-table-column>
          </el-table-column>
          <el-table-column label="新增可售" header-align="center" align="center">
            <el-table-column
              prop="new_reserve_set"
              label="套"
              header-align="center"
              width="120"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="new_reserve_funds"
              label="金额"
              header-align="center"
              width="120"
              align="center"
            ></el-table-column>
          </el-table-column>
          <el-table-column label="合计可售" header-align="center" align="center">
            <el-table-column
              prop="total_reserve_set"
              label="套"
              header-align="center"
              width="120"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="total_reserve_funds"
              label="金额"
              header-align="center"
              width="120"
              align="center"
            ></el-table-column>
          </el-table-column>
        </el-table-column>
        <!-- <el-table-column label="年度计划签约" header-align="center" align="center">
          <el-table-column
            prop="year_plan_sign"
            label="金额"
            header-align="center"
            width="120"
            align="center"
          ></el-table-column>
        </el-table-column>-->
        <!-- start -->
        <el-table-column label="年度考核签约目标" header-align="center" align="center">
          <el-table-column
            prop="year_check_funds"
            label="金额"
            header-align="center"
            align="center"
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
            width="160"
            align="center"
          ></el-table-column>
        </el-table-column>
        <el-table-column
          label="月度累计考核签约指标完成率(%)"
          prop="months_check_funds_per"
          header-align="center"
          align="center"
        ></el-table-column>
        <!-- end -->
        <el-table-column label="年度累计签约" header-align="center" align="center">
          <el-table-column
            prop="year_grand_total_sign"
            label="金额"
            header-align="center"
            width="120"
            align="center"
          ></el-table-column>
        </el-table-column>
        <el-table-column label="前三月月均签约" header-align="center" align="center">
          <el-table-column
            prop="top_three_month_average_sign_set"
            label="套"
            header-align="center"
            width="120"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="top_three_month_average_sign_funds"
            label="金额"
            header-align="center"
            width="120"
            align="center"
          ></el-table-column>
        </el-table-column>
        <el-table-column prop="toptree2" label="上月签约" header-align="center" align="center">
          <el-table-column
            prop="upper_moon_sign_set"
            label="套"
            header-align="center"
            width="120"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="upper_moon_sign_funds"
            label="金额"
            header-align="center"
            width="120"
            align="center"
          ></el-table-column>
        </el-table-column>
        <el-table-column label="签约计划" header-align="center" align="center">
          <!-- <el-table-column prop="stock" label="库存签约" header-align="center" align="center"></el-table-column> -->
          <el-table-column label="库存签约" header-align="center" align="center">
            <el-table-column label="金额" header-align="center" width="120" align="center">
              <template slot-scope="scope">{{scope.row.reserve_sign_funds}}</template>
            </el-table-column>
          </el-table-column>
          <!-- <el-table-column prop="add" label="新增签约" header-align="center" align="center"></el-table-column> -->
          <el-table-column label="新增签约" header-align="center" align="center">
            <el-table-column label="金额" header-align="center" width="120" align="center">
              <template slot-scope="scope">{{scope.row.new_sign_funds}}</template>
            </el-table-column>
          </el-table-column>
          <el-table-column label="合计签约" header-align="center" align="center">
            <el-table-column label="金额" header-align="center" width="120" align="center">
              <template slot-scope="scope">{{scope.row.total_sign_funds}}</template>
            </el-table-column>
          </el-table-column>
          <!-- <el-table-column prop="total" label="合计签约" header-align="center" align="center"></el-table-column> -->
        </el-table-column>
        <el-table-column label="认购计划" header-align="center" align="center">
          <el-table-column label="计划认购" header-align="center" align="center">
            <el-table-column label="套" prop="plan_subscription_set" width="120" align="center"></el-table-column>
            <el-table-column label="金额" prop="plan_subscription_funds" width="120" align="center"></el-table-column>
          </el-table-column>
        </el-table-column>
        <el-table-column label="成交率" header-align="center" align="center">
          <el-table-column
            label="前三月平均成交率"
            prop="top_three_month_average_turnover_rate"
            width="120"
            header-align="center"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="last_month_turnover_rate"
            label="上月成交率"
            header-align="center"
            width="120"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="plan_turnover_rate"
            label="计划成交率(%)"
            header-align="center"
            width="120"
            align="center"
          ></el-table-column>
        </el-table-column>
        <el-table-column label="营销推广费用" header-align="center" align="center">
          <el-table-column
            label="金额"
            prop="marketing_promotion_cost"
            header-align="center"
            align="center"
            width="120"
          ></el-table-column>
        </el-table-column>
      </el-table>
    </el-row>
    <el-row class="el-row-button">
      <el-button
        v-if="$store.state.user.userPower.includes('撤销推送')"
       @click="rejects(backDown)" type="primary" class="xuHuiBtn secondary reject">
        撤回推送供销存数据
        <!--
          v-if="scope.row.plan_status==3&&scope.row.type!==3&&$store.state.user.userPower.includes('撤销推送')"
            {'regionOrgId':scope.row.business_id,'months':$router.currentRoute.query.months}
        -->
      </el-button>
      <el-button
        type="primary"
        v-if="$store.state.user.userPower.includes('集团确认')&&isPush"
        @click="GroupReport"
        class="xuHuiBtn main"
      >集团确认</el-button>
      <!-- <el-button
        type="primary"
        @click="GroupReport"
        class="xuHuiBtn main"
      >集团确认</el-button>-->
      <el-button
        size="small"
        type="primary"
        v-if="$store.state.user.userPower.includes('驳回')&&reject&&confirm"
        class="xuHuiBtn secondary"
      >驳回</el-button>
      <el-button type="primary" @click="$router.back(-1)" class="xuHuiBtn secondary">返回</el-button>
    </el-row>
  </div>
</template>
<script>
import {
  businessDepartSelect,
  businessTotalSelect,
  businessFundsUpdate
} from "@/api/businessManager";
import {
  sendJSON,
  sendJSONGet,
  downLoad,
  upFile,
  get,
  restful
} from "@/api/request";
import { businessFundsEffective } from "@/api/group";
import { sortList } from "@/utils/methods";
import { post } from "@/api/request";
export default {
  data() {
    return {
      //   表格
      // isPush:false,
      backDown: [],
      tableData: [],
      tableHeight: document.body.clientHeight - 220,
      reject: this.$route.query.plan_status == "编制完成" ? true : false,
      areaIdList: [],
      allChecked: false,
      isPush: false,
      confirm: false
    };
  },
  created() {
    this.$store.dispatch("app/trackPageView", "上报区域指标详情");

    /*
      事业部列表
      */
    console.time("sortlist");
    this.reload();
    // businessFundsUpdate(JSON.stringify(this.$route.query));
    console.timeEnd("sortlist");
  },
  methods: {
    rejects(vals) {
      if (!vals[0]) {
        this.$message.error("无法撤回请选择已推送区域集团");
        return;
      }
        let res = []
        let regionOrgId ;
        let months ;
        vals.forEach((item,index) => {
          regionOrgId = item.business_id
          months = item.months
          res[index] = {regionOrgId,months,isEffective:0,  planStatus:1}
        })
        post("/areadetail/regionFundsAllUpdate", res).then(res => {
          this.$message.success("驳回成功");
          this.tableData=[]
          this.reload()
        });
    },
    reload() {
      restful("/areadetail/businessDepartSelect", [
        this.$route.query.months
      ]).then(res => {
        let group = res.result[0];
        res.result[0].type = 2;

        this.$data.tableData.push(
          ...sortList(res.result, "business_unit_id", "father_id", "type", true)
        );
        this.confirm = this.$data.tableData[0].plan_status == 2;
        let flag = false;
        console.log(this.tableData,"/////////////");
        this.tableData.forEach((item, index) => {
          if (!flag) {
              console.log(item.father_id);
            if (item.plan_status == 2 &&item.father_id!=-1) {
              flag = true;
            }
          }
        });
        this.isPush = flag;
      });
    },
    GroupReport() {
      this.$confirm("确认推送吗")
        .then(() => {
          console.log(this.areaIdList);
          businessFundsEffective({
            areaIds: this.areaIdList,
            months: this.$route.query.months
          }).then(res => {
            console.log(res);
            if (res.code == 0) {
              this.$message.success("推送成功");
              this.tableData = [];
              this.reload();
            } else {
              this.$message.error("推送失败");
            }
          });
        })
        .catch(() => {
          this.message("已取消");
        });
    },
    /* 埋点*/
    bury() {
      //_paq.push(['trackEvent', '点击', '导出', '区域上报指标数据导出']);
      _paq.push(["setDownloadExtensions", "xlsx"]);
    },
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
    exportTemp() {
      let { months, id } = this.$route.query;
      return downLoad("/Export/groupMonthlyUpExport.action", {
        month: months,
        businessId: id
      });
    },
    cellStyle({ row, column, rowIndex, columnIndex }) {
      if (
        (row.type != 2 ||
          row.plan_status < 2 ||

          row.business_id == "00000001") &&
        columnIndex == 0
      ) {
        return { opacity: "0", "z-index": "-1" };
      } else
       if (columnIndex == 0) {
        return { "border-top": "1px solid #f0f0f0" };
      } else if ((row.type != 2 || row.plan_status == 3) && columnIndex == 1) {
        return { "border-left": "1px solid #f0f0f0" };
      }
    },
    SelectionChange(val) {
        // business_id,
        //   months,
        //   isEffectiv : 0,
        //   planStatus : 1

      let list = [];
      let needItem = [];
      let obj = {}
      if (val == []) {
        this.areaIdList = [];
      } else {
        val.forEach((item,index) => {
          if (item.plan_status == 2) {
            list.push(item.business_id);
          }
          if (item.plan_status == 3) {
            console.log('1232222222222',item)
            // obj.business_id = item.business_id
            // obj.months = item.months
            // obj.isEffectiv = 0
            // obj.planStatus = 1
            // obj.business_name = item.business_name
            needItem.push(item)
          }
        });
        this.backDown = needItem;
        this.areaIdList = list;
        if (this.areaIdList.findIndex(item => item == "00000001") != -1) {
          let idx = this.areaIdList.findIndex(item => item == "00000001");
          this.areaIdList.splice(idx, 1);
        }
      }
    }
  }
};
</script>
<style lang="less" >
.container .el-checkbox__inner {
  border: 1px solid skyblue !important;
}
.reject {
  margin: 0 !important;
  width: 120px !important;
  display: inline-block !important;
}
</style>
<style scoped src="@/assets/css/style.css"></style>
