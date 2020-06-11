<template>
  <div class="table1">
    <el-row style="margin-bottom: 15px;text-align: right;">
      <!-- <el-button type="primary" v-if="$store.state.user.userPower.includes('表一导出模板')" class="xuHuiBtn secondary"><a :href="exportTemp()" @click="bury"  download="download">导出数据</a></el-button> -->
      <el-upload
        v-if="$store.state.user.userPower.includes('表一导入数据')&&status==0&&onlyRead"
        @click="loadMatomo"
        class="upload-demo intodata"
        :before-upload="loading"
        :action="importData('/import/projectMonthlyPlanImport.action')"
        :show-file-list="false"
        :on-success="reload"
        :on-error="closeLoading"
        :data="{month:$route.query.months}"
      >
        <el-button type="primary" class="xuHuiBtn secondary">导入数据</el-button>
      </el-upload>
      <el-link
        v-if="$store.state.user.userPower.includes('表一导出模板')"
        :href="exportTemp()"
        style="color:#fff;"
        class="outdata xuHuiBtn main"
        @click="bury"
        type="primary"
      >导出数据</el-link>
    </el-row>
    <el-table
      :data="tableData"
      style="width: 100%;margin-bottom: 20px;margin-top:0"
      row-key="business_id"
      default-expand-all
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
      class="etable"
      :border="false"
      lazy
      :load="load"
      :height="tableHeight"
    >
      <el-table-column
        label="项目"
        header-align="center"
        align="left"
        width="210"
        style="text-align: left;"
        fixed
      >
        <template slot-scope="scope">
          <span :title="scope.row.business_name">{{ scope.row.business_name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="供货情况" header-align="center" width="600" align="center" fixed>
        <el-table-column label="库存可售" header-align="center" align="center">
          <el-table-column
            prop="reserve_can_sell_set"
            label="套"
            width="80"
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
            width="80"
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
        <el-table-column label="合计可售" header-align="center" width="80" align="center">
          <el-table-column prop="total_reserve_set" label="套" header-align="center" align="center"></el-table-column>
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
        <el-table-column
          prop="year_plan_sign"
          width="120"
          label="金额"
          header-align="center"
          align="right"
      ></el-table-column>-->
      <!-- </el-table-column> -->
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
        <el-table-column
          prop="year_grand_total_sign"
          width="120"
          label="金额"
          header-align="center"
          align="right"
        ></el-table-column>
      </el-table-column>
      <el-table-column label="历史签约金额" header-align="center" align="right">
        <el-table-column label="前三月月均签约" header-align="center" align="center">
          <el-table-column
            prop="top_three_month_average_sign_set"
            width="80"
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
            width="80"
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
      </el-table-column>
      <el-table-column label="计划签约" header-align="center" align="center">
        <el-table-column label="库存签约" header-align="center" align="center">
          <el-table-column label="套" header-align="center" width="80" align="center">
            <template slot-scope="scope">
              <el-input
                v-if="!readonly&&onlyRead"
                :maxlength="10"
                v-model="scope.row.reserve_sign_set"
                @input="validateDecimal(scope.row,'reserve_sign_set')"
                :disabled="scope.row.children !=undefined && scope.row.children.length>0"
                placeholder
              ></el-input>
              <span v-else>{{scope.row.reserve_sign_set}}</span>
            </template>
          </el-table-column>
          <el-table-column label="金额" header-align="center" align="right" width="160">
            <template slot-scope="scope">
              <el-input
                v-if="!readonly&&onlyRead&&(!scope.row.children || scope.row.children.length==0)"
                :maxlength="10"
                v-model="scope.row.reserve_sign_funds"
                @blur="validateDecimal(scope.row,'reserve_sign_funds')"
                placeholder
                class="amount"
              ></el-input>
              <span v-else>{{scope.row.reserve_sign_funds | fixed}}</span>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column label="新增签约" header-align="center" align="center">
          <el-table-column label="套" header-align="center" width="80" align="center">
            <template slot-scope="scope">
              <el-input
                v-if="!readonly&&onlyRead"
                :maxlength="10"
                v-model="scope.row.new_sign_set"
                @input="validateDecimal(scope.row,'new_sign_set')"
                :disabled="scope.row.children !=undefined && scope.row.children.length>0"
                placeholder
              ></el-input>
              <span v-else>{{scope.row.new_sign_set}}</span>
            </template>
          </el-table-column>
          <el-table-column label="金额" header-align="center" align="right" width="160">
            <template slot-scope="scope">
              <el-input
                v-if="!readonly&&onlyRead&&(!scope.row.children || scope.row.children.length==0)"
                :maxlength="10"
                v-model="scope.row.new_sign_funds"
                @blur="validateDecimal(scope.row,'new_sign_funds')"
                placeholder
                class="amount"
              ></el-input>
              <span v-else>{{scope.row.new_sign_funds | fixed}}</span>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column label="合计签约" header-align="center" align="center">
          <el-table-column label="套" header-align="center" width="80" align="center">
            <template slot-scope="scope">
              <el-input
                v-if="!readonly&&onlyRead"
                :maxlength="10"
                :value="(scope.row.reserve_sign_set-0)+(scope.row.new_sign_set-0)"
                disabled
                placeholder
              ></el-input>
              <span v-else>{{(scope.row.reserve_sign_set-0)+(scope.row.new_sign_set-0)}}</span>
            </template>
          </el-table-column>
          <el-table-column label="金额" header-align="center" align="right" width="160">
            <template slot-scope="scope">

              <span>{{(scope.row.reserve_sign_funds-0)+(scope.row.new_sign_funds-0) | fixed}}</span>
            </template>
          </el-table-column>
        </el-table-column>
      </el-table-column>
      <el-table-column label="认购计划" header-align="center" align="center">
        <el-table-column label="套" header-align="center" width="80" align="center">
          <template slot-scope="scope">
            <el-input
              v-if="!readonly&&onlyRead"
              :maxlength="10"
              v-model.number="scope.row.plan_subscription_set"
              @input="validateDecimal(scope.row,'plan_subscription_set')"
              :disabled="scope.row.children !=undefined && scope.row.children.length>0"
              placeholder
            ></el-input>
            <span v-else>{{scope.row.plan_subscription_set}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="plan_subscription_funds"
          label="金额"
          header-align="center"
          align="right"
          width="160"
        >
          <template slot-scope="scope">
            <el-input
              v-if="!readonly&&onlyRead&&(!scope.row.children || scope.row.children.length==0)"
              :maxlength="10"
              v-model="scope.row.plan_subscription_funds"
              @blur="validateDecimal(scope.row,'plan_subscription_funds')"
              placeholder
              class="amount"
            ></el-input>
            <span v-else>{{scope.row.plan_subscription_funds | fixed}}</span>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column label="成交率" header-align="center" align="center">
        <el-table-column label="前三个月均成交率" header-align="center" width="90" align="center">
          <template slot-scope="scope">
            <span v-if="scope.$index==0">{{scope.row.top_three_month_average_turnover_rate}}%</span>
          </template>
        </el-table-column>
        <el-table-column label="上个月成交率" header-align="center" width="90" align="center">
          <template slot-scope="scope">
            <span v-if="scope.$index==0">{{scope.row.last_month_turnover_rate}}%</span>
          </template>
        </el-table-column>
        <el-table-column label="计划成交率" header-align="center" width="90" align="center">
          <template slot-scope="scope">
            <span v-if="scope.$index==0">{{scope.row.plan_turnover_rate}}%</span>
          </template>
        </el-table-column>
      </el-table-column>
    </el-table>
    <el-row class="el-row-button">
      <el-button
        type="primary"
        v-if="status==0&&$store.state.user.userPower.includes('表一上报')&&onlyRead"
        @click="listOneStatus"
        class="xuHuiBtn main"
      >上报</el-button>
      <el-button
        type="primary"
        v-if="status==0&&$store.state.user.userPower.includes('表一暂存')&&onlyRead"
        @click="listOneupdate"
        class="xuHuiBtn secondary"
      >暂存</el-button>
      <el-button
        type="primary"
        v-if="status==1&&$store.state.user.userPower.includes('表一通过')"
        @click="Approval([{business_id:$route.query.projectId,months:$route.query.months,'plan_status':2,'preparedByLevel':3,region_org_id:tableData[0].region_org_id}])"
        class="xuHuiBtn main"
      >通过</el-button>
      <!--
        && isPush < 2
       -->
      <el-button
        type="primary"
        v-if="status>=1&&$store.state.user.userPower.includes('表一驳回') && isPush != 2 && isPush != 3"
        @click="Approval([{business_id:$route.query.projectId,months:$route.query.months,'plan_status':0,'preparedByLevel':3,region_org_id:tableData[0].region_org_id}])"
        class="xuHuiBtn secondary"
      >驳回</el-button>
      <el-button type="primary" @click="$router.back(-1)" class="xuHuiBtn secondary">返回</el-button>
    </el-row>
  </div>
</template>
<script>
import { updateMonthlyPlan, updatePlanStatus } from "@/api/ProjectMonthlyPlan";
import { sendFile, sendJSON, downLoad, upFile } from "@/api/request";
import { sortList, total } from "@/utils/methods";
import { number, tableFixed } from "@/utils/filter";
export default {
  name: "table1",
  props: {
    name: String
  },
  filters:{
    fixed(data){
       if (!data) {
        return 0;
      }else if(isNaN(data)){
        return 0;
      }
      return data.toFixed(4);
    }
  },
  computed: {
    readonly() {
      return this.$store.state.settings.projectReadonly;
    },
    status() {
      return this.$store.state.settings.projectStatus;
    },
    isAdmin() {
      return this.$store.state.user.userJobType == "admin";
    },
    isRegion() {
      return this.$store.state.settings.regionItem;
    }
  },
  created() {
    this.reload();
  },
  methods: {
    reload(upfileRes) {
      sendJSON("/group/getProjectMessages", this.$route.query).then(res => {
        console.log(res.result[0].groupStatus, "groupStatus");[]
        this.isPush = res.result[0].fatherstatus
        console.log('/////////////////////',this.isPush)
        if (res.result[0].groupStatus == "编制完成") {
          this.showBTN = true;
          this.$emit("showBTN", this.showBTN);
        } else {
          this.showBTN = false;
          this.$emit("showBTN", this.showBTN);
        }
        if (upfileRes) {
          this.$message.success("导入成功");
          this.closeLoading();
        }
        if (res.result.length == 0) {
          this.$message.warning("暂无数据");
          return;
        }
        var tableData = [];
        tableData.push(
          ...sortList(res.result, "business_unit_id", "father_id", "type", true)
        );
        //将项目名传给父组件。
        this.$emit(
          "projectName",
          tableData[0].business_name +
            new Date(tableData[0].months).getAppointedFormatTime("MM月计划")
        );
        this.tableData = JSON.parse(JSON.stringify(tableData));

        this.$store.dispatch("settings/changeSetting", {
          key: "projectStatus",
          value: this.tableData[0].plan_status
        });
        if (
          this.tableData[0].plan_status == 0 &&
          this.$store.state.user.userPower.includes("表一上报")
        ) {
          this.$store.dispatch("settings/changeSetting", {
            key: "projectReadonly",
            value: false
          });
        } else {
          this.$store.dispatch("settings/changeSetting", {
            key: "projectReadonly",
            value: true
          });
        }
        console.log(this.tableData, "tableData");
      });
    },
    importData(url) {
      return upFile(url);
    },
    loadMatomo() {
      _paq.push(["trackEvent", "点击", "导入", "集团指标编制数据导入"]);
    },
    exportTemp() {
      let { months, projectId } = this.$route.query;
      return downLoad("/Export/projectMonthlyPlanExport.action", {
        month: months,
        businessId: projectId
      });
    },
    loading() {
      this.loadObj = this.$loading({
        lock: true,
        text: "上传中，请稍后",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.8)"
      });
    },
    closeLoading() {
      this.loadObj.close();
    },
    bury() {
      //_paq.push(['trackEvent', '点击', '导出', '区域上报指标数据导出']);
      _paq.push(["setDownloadExtensions", "xlsx"]);
    },
    validateNumber(obj, key) {
      this.timer || clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        obj[key] = number(obj[key]);
      }, 1000);
    },
    validateDecimal(obj, key) {
      // if (this.timer) {
      //   clearTimeout(this.timer);
      // }
      //   this.timer = setTimeout(() => {
          // obj[key] = tableFixed(obj[key]);
          this.$set(obj,key,tableFixed(obj[key]))
          total(this.tableData, [key]);
        // }, 3000);
    },
    // change() {
    //   total(this.tableData, ['reserve_sign_set', 'reserve_sign_funds', 'new_sign_set', 'new_sign_funds',
    //     'plan_subscription_set', 'plan_subscription_funds']);
    // },
    signSetChange() {
      total(this.tableData, ["reserve_sign_set"]);
      console.log("reserve_sign_set");
    },
    signFundsChange() {
      total(this.tableData, ["reserve_sign_funds"]);
      console.log("reserve_sign_funds");
    },
    newsignSetChange() {
      total(this.tableData, ["new_sign_set"]);
      console.log("new_sign_set");
    },
    newsignFundsChange() {
      total(this.tableData, ["new_sign_funds"]);
      console.log("new_sign_funds");
    },
    subscriptionSetChange() {
      console.log("plan_subscription_set");
      total(this.tableData, ["plan_subscription_set"]);
    },
    subscriptionFundsChange() {
      total(this.tableData, ["plan_subscription_funds"]);
      console.log("plan_subscription_funds");
    },

    load(tree, treeNode, reslove) {
      console.log(tree, treeNode);
    },

    /*
       更新表一项目费用暂存
       */
    listOneupdate() {
      _paq.push(["trackEvent", "点击", "暂存", "项目月度计划表一项目费用暂存"]);
      updateMonthlyPlan(JSON.stringify(this.$data.tableData)).then(res => {
        this.$message.success("暂存成功");
      });
    },
    findC_flag(obj) {
      for (let i = 0; i < obj.length; i++) {
        // if (obj[i].reserve_sign_set > obj[i].reserve_can_sell_set) {
        //   this.flagInfo =
        //     "计划签约中库存签约的套数不得大于供货情况中库存可售的套数";
        //   this.upFlag = false;
        //   return;
        // }
        // else
        if (obj[i].reserve_sign_funds > obj[i].reserve_can_sell_funds) {
          this.flagInfo =
            "计划签约中库存签约的金额不得大于供货情况中库存可售的金额";
          this.upFlag = false;
          return;
        }
        // else if((obj[i].reserve_sign_set==0&&obj[i].reserve_sign_funds!=0)||(obj[i].reserve_sign_funds==0&&obj[i].reserve_sign_set!=0)){
        //   this.flagInfo="计划签约中库存签约的金额和套数其一为0时,另一个也为0"
        //   this.upFlag=false
        //   return
        // }
        // else
        //  if (obj[i].new_sign_set > obj[i].new_reserve_set) {
        //   this.flagInfo =
        //     "计划签约中新增签约的套数不得大于供货情况中新增可售的套数";
        //   this.upFlag = false;
        //   return;
        // }
        else if (obj[i].new_sign_funds > obj[i].new_reserve_funds) {
          this.flagInfo =
            "计划签约中新增签约的金额不得大于供货情况中新增可售的金额";
          this.upFlag = false;
          return;
        }
        // else if((obj[i].new_sign_set==0&&obj[i].new_sign_funds!=0)||(obj[i].new_sign_funds==0&&obj[i].new_sign_set!=0)){
        //   this.flagInfo="计划签约中新增签约的金额和套数其一为0时,另一个也为0"
        //   this.upFlag=false
        //   return
        // }
        else if (
          Number(obj[i].new_sign_set) + Number(obj[i].reserve_sign_set) >
          obj[i].plan_subscription_set
        ) {
          this.flagInfo = "认购计划的套数不得小于计划签约中合计签约的套数";
          this.upFlag = false;
          return;
        } else if (
          (Number(obj[i].new_sign_funds) + Number(obj[i].reserve_sign_funds))*10000 >
          (obj[i].plan_subscription_funds*10000)
        ) {
          this.flagInfo = "认购计划的金额不得小于计划签约中合计签约的金额";
          this.upFlag = false;
          return;
        } else if (
          Number(obj[i].reserve_sign_funds) + Number(obj[i].new_sign_funds) >
          (obj[i].total_reserve_funds > 0 ? obj[i].total_reserve_funds : 0)
        ) {
          this.flagInfo = "计划签约的合计签约金额不能大于合计可售金额";
          this.upFlag = false;
          return;
        }
        if (obj[i].children) {
          this.findC_flag(obj[i].children);
        }
        console.log(
          Number(obj[i].reserve_sign_funds) + Number(obj[i].new_sign_funds)
        );
      }
    },
    /*
       更新表一项目费用上报
       */
    listOneStatus() {
      //Promise.all()
      this.$confirm("确认上报吗？")
        .then(() => {
          this.findC_flag(this.$data.tableData);
          if (!this.upFlag) {
            this.$confirm(`${this.flagInfo}`)
              .then(() => {
                this.upFlag = true;
                return;
              })
              .catch(() => {
                this.upFlag = true;
                return;
              });
          } else {
            updateMonthlyPlan(JSON.stringify(this.$data.tableData)).then(
              res => {
                _paq.push([
                  "trackEvent",
                  "点击",
                  "上报",
                  "项目月度计划表一项目费用上报"
                ]);
                updatePlanStatus(
                  JSON.stringify(
                    this.$data.tableData.map(item => ({
                      plan_status: 1,
                      months: item.months,
                      business_id: item.business_id,
                      prepared_by_level: item.prepared_by_level
                    }))
                  )
                ).then(res => {
                  this.$message.success("上报成功");
                  this.$store.dispatch("settings/changeSetting", {
                    key: "projectStatus",
                    value: 1
                  });
                  this.$router.push({
                    name: "item"
                  });
                });
              }
            );
          }
        })
        .catch(() => {
          this.$message("已取消");
        });
    },
    Approval(params) {
      this.$confirm(`确认${params[0].plan_status == 0 ? "驳回" : "通过"}吗?`)
        .then(() => {
          _paq.push([
            "trackEvent",
            "点击",
            params[0].plan_status == 0 ? "驳回" : "通过",
            (params[0].plan_status == 0 ? "驳回" : "通过") + "项目月度计划"
          ]);
          sendJSON("/group/updatePlanEffective", params).then(res => {
            this.$message.success(
              `${params[0].plan_status == 0 ? "驳回成功" : "已通过"}`
            );
            this.$router.push({ name: "item" });
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消"
          });
        });
    }
  },
  data() {
    return {
      isPush:null,
      input: "",
      loadObj: null,
      deleteData: {
        a: 10
      },
      tableHeight: window.outerHeight - 360,
      // tableHeight: document.body.clientHeight - 260,
      postId: localStorage.getItem("CommonJobID"),
      timer: null,
      tableData: [],
      upFlag: true,
      flagInfo: "",
      showBTN: false,
      onlyRead: this.$route.query.regionStatus > 1 ? false : true
    };
  },
  watch:{
    'isPush':function(val){
      console.log('fatherStatus为???',val)
    }
  }
};
</script>
<style scoped src="@/assets/css/style.css"></style>
<style lang="scss">
.el-input.is-disabled .el-input__inner {
  border: none;
  background-color: transparent;
  outline: none;
  color: #333;
  cursor: initial;
}
.table1 .amount .el-input__inner {
  text-align: right;
}
</style>
<style lang="less">
// .el-table {
//   .el-table__fixed {
//     height:auto !important; // 此处的important表示优先于element.style
//     bottom:17px; // 改为自动高度后，设置与父容器的底部距离，则高度会动态改变
//   }
// }
.outdata {
  float: right;
  margin-right: 10px;
}
.intodata {
  float: right;
}
</style>
