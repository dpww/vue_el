<template>
  <div class="app-container">
    <div class="organization">
      <div>区域/事业部下发指标<small style="font-size: 80%; color: #999;">(金额单位:万元)</small></div>
      <div>
        <el-row>
          <el-button type="primary" v-if="$store.state.user.userPower.includes('导出模板')" class="xuHuiBtn secondary"><a :href="exportTemp()" @click="bury" download="download">导出数据</a></el-button>
        </el-row>
      </div>
    </div>
    <!-- 表格 -->
    <el-row class="container">
      <el-table :data="tableData" style="width: 100%;margin-bottom: 20px;margin-top:0" row-key="business_unit_id"
        default-expand-all :tree-props="{children: 'children', hasChildren: 'hasChildren'}" class="etable" :border="false"
        lazy :load="load" :height="tableHeight">
        <el-table-column label="事业部/项目" header-align="center" align="left" width="210" fixed>
          <template slot-scope="scope">
            <span :title="scope.row.business_name">{{ scope.row.business_name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="供货情况" header-align="center" align="center">
          <el-table-column label="库存可售" header-align="center" align="center">
            <el-table-column prop="reserve_can_sell_set" label="套" width="120" header-align="center" align="center"></el-table-column>
            <el-table-column prop="reserve_can_sell_funds" label="金额" width="120" header-align="center" align="right"></el-table-column>
          </el-table-column>
          <el-table-column label="新增可售" header-align="center" align="center">
            <el-table-column prop="new_reserve_set" label="套" header-align="center" width="120" align="center"></el-table-column>
            <el-table-column prop="new_reserve_funds" label="金额" header-align="center" width="120" align="right"></el-table-column>
          </el-table-column>
          <el-table-column label="合计可售" header-align="center" align="center">
            <el-table-column prop="total_reserve_set" label="套" header-align="center" width="120" align="center"></el-table-column>
            <el-table-column prop="total_reserve_funds" label="金额" header-align="center" width="120" align="right"></el-table-column>
          </el-table-column>
        </el-table-column>
        <!-- <el-table-column label="年度计划签约" header-align="center" align="center">
          <el-table-column prop="year_plan_sign" label="金额" header-align="center" align="right" width="120"></el-table-column>
        </el-table-column> -->
        <!-- start -->
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
          <el-table-column prop="year_grand_total_sign" label="金额" header-align="center" align="right" width="120"></el-table-column>
        </el-table-column>
        <el-table-column label="前三月月均签约" header-align="center" align="center">
          <el-table-column prop="top_three_month_average_sign_set" label="套" width="120" header-align="center" align="center"></el-table-column>
          <el-table-column prop="top_three_month_average_sign_funds" label="金额" width="120" header-align="center" align="right"></el-table-column>
        </el-table-column>
        <el-table-column prop="toptree2" label="上月签约" header-align="center" align="center">
          <el-table-column prop="upper_moon_sign_set" label="套" header-align="center" width="120" align="center"></el-table-column>
          <el-table-column prop="upper_moon_sign_funds" label="金额" header-align="center" width="120" align="right"></el-table-column>
        </el-table-column>
        <el-table-column label="计划签约" header-align="center" align="center">
          <el-table-column label="库存签约" header-align="center" align='center'>
            <el-table-column label="金额" header-align="center" align='right' width="120" prop="reserve_sign_funds">
              <template slot-scope="scope">
                {{Math.round(scope.row.reserve_sign_funds)}}
              </template>
            </el-table-column>
          </el-table-column>
          <el-table-column label="新增签约" header-align="center" align='center'>
            <el-table-column label="金额" header-align="center" align='right' width="120" prop="new_sign_funds">
              <template slot-scope="scope">
                {{Math.round(scope.row.new_sign_funds)}}
              </template>
            </el-table-column>
          </el-table-column>
          <el-table-column label="合计签约" header-align="center" align='center'>
            <el-table-column label="金额" header-align="center" width="120" align='right' prop="total_sign_funds">
              <template slot-scope="scope">
                {{Math.round(scope.row.total_sign_funds)}}
              </template>
            </el-table-column>
          </el-table-column>
          <!-- <el-table-column prop="total" label="合计签约" header-align="center" align="center"></el-table-column> -->
        </el-table-column>
        <el-table-column label="营销推广费" header-align="center" align='right' width="100" prop="marketing_promotion_cost">
          <template slot-scope="scope">
            {{scope.row.marketing_promotion_cost|decimal}}
          </template>
        </el-table-column>
      </el-table>
      <el-row class="el-row-button">
        <el-button type='primary' @click='$router.back(-1)' class="xuHuiBtn main">返回</el-button>
      </el-row>
    </el-row>
  </div>
</template>

<script>
  import {
    sendFile,
    sendJSON,
    downLoad,
    upFile
  } from "@/api/request";
  import {
    sortList,
  } from "@/utils/methods";
  import {number,decimal} from "@/utils/filter";
  export default {
    methods: {
      //   表格
      bury() {
        //_paq.push(['trackEvent', '点击', '导出', '区域上报指标数据导出']);
        _paq.push(['setDownloadExtensions', "xlsx"]);
      },
      load(tree, treeNode, resolve) {
        sendJSON('/group/getRegionChildMessages', {
          "months": this.$route.query.months,
          "projectOrgId": tree.business_unit_id,
          "userId":localStorage.getItem('id')
        }).then(res => {
          res.result.forEach(item => {
            if (item.father_count > 0) {
              item.hasChildren = true;
            }
          })
          resolve(res.result);
        });
      },
      request(id) {
        console.log(id);
      },
      exportTemp() {
        let {
          months,
          id
        } = this.$route.query;
        _paq.push(['trackEvent', '点击', '导出', '区域月度计划下发指标数据导出']);
        _paq.push(['setDownloadExtensions', "xlsx"]);
        return downLoad("/Export/regionMonthlyPlanExport.action", {
          months: months,
          businessId: id
        });
      }
    },
    data() {
      return {
        //   表格
        tableData: [],
        input: '',
        tableHeight:document.body.clientHeight-220
      }
    },
    created() {
      this.$store.dispatch("app/trackPageView","区域/事业部下发指标");
      let {id} = this.$route.query;
      // let months = this.$route.query;
      let month = this.$route.query.months;
      // let month = this.$route.query;
      sendJSON(this.$route.query.item ? "/group/getRegionalReleaseInProjects" : '/group/getGroupReleaseInRegional', {
        "regionOrgId": id,
        "months": month,
        "userId": localStorage.getItem('id'),
        "bussinesId": id
      }).then(res => {
        this.$data.tableData.push(...sortList(res.result, 'business_unit_id', 'father_id', 'type', true));
        console.log(this.$data.tableData);
      });
    },
    filters:{
      decimal
    }
  };
</script>
<style scoped src="@/assets/css/style.css"></style>
<style lang="scss">
  @import "@/styles/main.scss";
</style>
