<template>
  <div class="app-container">
    <div class="organization">
      <div>
        区域指标编制
        <small style="font-size: 80%; color: #999;">(金额单位:万元)</small>
      </div>
      <div>
        <el-row>
          <!-- <el-button type="primary" v-if="$store.state.user.userPower.includes('导出模板')" class="xuHuiBtn secondary"><a :href="exportTemp()" @click="bury" download="download">导出模板</a></el-button> -->
          <el-upload
            class="upload intodata"
            v-if="$store.state.user.userPower.includes('导入数据')&&onlyRead"
            :before-upload="loading"
            @click="importMatomo"
            :on-error="closeLoading"
            :action="importData('/import/regionMonthlyPlanImport.action')"
            :on-success="reload"
            :show-file-list="false"
          >
            <el-button type="primary" class="xuHuiBtn secondary">导入数据</el-button>
          </el-upload>
          <el-link
            v-if="$store.state.user.userPower.includes('导出模板')"
            :href="exportTemp()"
            style="color:#fff;"
            class="outdata xuHuiBtn main"
            @click="bury"
            type="primary"
          >导出数据</el-link>
        </el-row>
      </div>
    </div>
    <!-- 表格 -->
    <el-row class="container">
      <el-table
        :data="tableData"
        style="width: 100%;margin-bottom: 20px;margin-top:0"
        row-key="business_unit_id"
        default-expand-all
        :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
        class="etable"
        :border="false"
        lazy
        :load="load"
        :height="tableHeight"
      >
        <el-table-column label="项目" header-align="center" align="left" width="210" fixed>
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
              align="center"
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
              align="center"
            ></el-table-column>
          </el-table-column>
          <el-table-column label="合计可售" header-align="center" align="center">
            <el-table-column
              prop="total_reserve_set"
              label="套"
              width="80"
              header-align="center"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="total_reserve_funds"
              label="金额"
              width="120"
              header-align="center"
              align="center"
            ></el-table-column>
          </el-table-column>
        </el-table-column>
        <!-- <el-table-column label="年度计划签约" header-align="center" align="center">
          <el-table-column prop="year_plan_sign" label="金额" header-align="center" align="center" width="120"></el-table-column>
        </el-table-column>-->
        <!-- start -->
           <!-- <el-table-column label="年度考核签约目标" header-align="center" align="center">
          <el-table-column
            prop="year_check_funds"
            label="金额"
            header-align="center"
            align="right"
            width="160"
          >
          <template slot-scope="scope">
            <span>{{scope.row.year_check_funds | fixed}}</span>
          </template>
          </el-table-column>
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
            width="180"
          >
          <template slot-scope="scope">
            <span>{{scope.row.months_check_funds | fixed}}</span>
          </template>
          </el-table-column>
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
            align="center"
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
        <el-table-column label="计划签约" header-align="center" align="center">
          <!-- <el-table-column prop="stock" label="库存签约" header-align="center" align="center"></el-table-column> -->
          <el-table-column label="库存签约" header-align="center" width="120" align="center">
            <el-table-column
              label="金额"
              header-align="center"
              align="center"
              width="120"
              prop="reserve_sign_funds"
            >
              <template slot-scope="scope">
                <el-input
                  v-if="!readonly&&scope.row.type==3&&onlyRead"
                  :maxlength="8"
                  @blur="tableSetChange('reserve_sign_funds',scope.row)"
                  @input="validateDecimal(scope.row,'plan_subscription_set')"
                  v-model="scope.row.reserve_sign_funds"
                  :disabled="scope.row.children !=undefined && scope.row.children.length>0"
                  placeholder
                  class="amount"
                ></el-input>
                <span v-else>{{scope.row.reserve_sign_funds | fixed}}</span>
              </template>
            </el-table-column>
          </el-table-column>
          <!-- <el-table-column prop="add" label="新增签约" header-align="center" align="center"></el-table-column> -->
          <el-table-column label="新增签约" header-align="center" align="center">
            <el-table-column
              label="金额"
              header-align="center"
              width="120"
              align="center"
              prop="new_sign_funds"
            >
              <template slot-scope="scope">
                <el-input
                  v-if="!readonly&&scope.row.type==3&&onlyRead"
                  @blur="tableSetChange('new_sign_funds',scope.row)"
                  :maxlength="8"
                  @input="validateDecimal(scope.row,'new_sign_funds')"
                  v-model="scope.row.new_sign_funds"
                  :disabled="scope.row.children !=undefined && scope.row.children.length>0"
                  placeholder
                  class="amount"
                ></el-input>
                <span v-else>{{scope.row.new_sign_funds | fixed}}</span>
              </template>
            </el-table-column>
          </el-table-column>
          <el-table-column label="合计签约" header-align="center" align="center">
            <el-table-column
              label="金额"
              header-align="center"
              width="120"
              align="center"
              prop="total_sign_funds"
            >
              <template slot-scope="scope">
                {{Number(scope.row.total_sign_funds) | fixed}}
              </template>
            </el-table-column>
          </el-table-column>
          <!-- <el-table-column prop="total" label="合计签约" header-align="center" align="center"></el-table-column> -->
        </el-table-column>
        <el-table-column
          label="营销推广费"
          header-align="center"
          align="center"
          width="100"
          prop="marketing_promotion_cost"
        >
          <template slot-scope="scope">
            <el-input
              v-if="!readonly&&scope.row.type==3&&onlyRead"
              @blur="tableSetChange('marketing_promotion_cost',scope.row)"
              :maxlength="8"
              @input="validateDecimal(scope.row,'marketing_promotion_cost')"
              v-model="scope.row.marketing_promotion_cost"
              :disabled="scope.row.children !=undefined && scope.row.children.length>0"
              placeholder
              class="amount"
            ></el-input>
            <span v-else>{{scope.row.marketing_promotion_cost}}</span>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <el-row class="el-row-button">
      <el-button
        type="primary"
        v-if="$store.state.user.userPower.includes('下达')&&onlyRead"
        class="xuHuiBtn main"
        @click="requestHandle({'planStatus': '1' , 'months' : $route.query.month ,'businessId' : $route.query.id , 'preparedByLevel' : '2' })"
      >下达</el-button>
      <el-button
        type="primary"
        v-if="$store.state.user.userPower.includes('暂存')&&onlyRead"
        class="xuHuiBtn secondary"
        @click="requestHandle({'planStatus': '0' , 'months' : $route.query.month ,'businessId' : $route.query.id , 'preparedByLevel' : '2' })"
      >暂存</el-button>
      <el-button type="primary" class="xuHuiBtn secondary" @click="$router.back(-1)">返回</el-button>
    </el-row>
  </div>
</template>
<script>
import { sendFile, sendJSON, downLoad, upFile } from "@/api/request";
import { sortList, total } from "@/utils/methods";
import { number, decimal } from "@/utils/filter";
export default {
  filters: {
    fixed: function(data) {
      if (!data) {
        return "0.00";
      } else if (isNaN(data)) {
        return "0.00";
      } else {
        return data.toFixed(2);
      }
    }
  },
  methods: {
    bury() {
      //_paq.push(['trackEvent', '点击', '导出', '区域上报指标数据导出']);
      _paq.push(["setDownloadExtensions", "xlsx"]);
    },
    importData(url) {
      return upFile(url);
    },
    importMatomo() {
      _paq.push(["trackEvent", "点击", "导入数据", "区域月度指标编制导入"]);
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
    reload(res) {
      if (!res || res.code == 200 || res.code == 0) {
        let { id, month } = this.$route.query;
        sendJSON("/group/getRegionalMessages", {
          regionOrgId: id,
          months: month,
          userId: localStorage.getItem("id")
        }).then(res => {
          if (this.loadObj) {
            this.closeLoading();
          }
          console.time("渲染计时");
          this.$data.tableData.splice(
            0,
            this.$data.tableData.length,
            ...sortList(
              res.result,
              "business_unit_id",
              "father_id",
              "type",
              true
            )
          );
          console.timeEnd("渲染计时");
          //this.$data.tableData.push(...sortList(res.result, 'business_unit_id', 'father_id', 'type', true));
        });
      } else {
        if (this.loadObj) {
          this.closeLoading();
        }
        this.$message.error(res.messages || res.message);
      }
    },
    //   表格
    load(tree, treeNode, resolve) {
      sendJSON("/group/getRegionChildMessages", {
        months: this.$route.query.month,
        projectOrgId: tree.business_unit_id,
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
    findC_flag(obj) {
      for (let i = 0; i < obj.length; i++) {
        // if(obj[i].reserve_sign_funds>obj[i].reserve_can_sell_funds){
        //   this.flagInfo="计划签约中的库存签约金额不得大于供货情况中库存可售金额"
        //   this.downFlag=false
        //   return
        // }else if(obj[i].new_sign_funds>obj[i].new_reserve_funds){
        //   this.flagInfo="计划签约中的新增签约金额不得大于供货情况中新增可售金额"
        //   this.downFlag=false
        //   return
        // }
        // else
        if (
          obj[i].total_sign_funds >
          (obj[i].total_reserve_funds > 0 ? obj[i].total_reserve_funds : 0)
        ) {
          this.flagInfo =
            "计划签约中的合计签约金额不得大于供货情况中合计可售金额";
          this.downFlag = false;
          return;
        }
        if (obj[i].children && obj[i].type <= 3) {
          this.findC_flag(obj[i].children);
        }
      }
    },
    requestHandle(params) {
      params.valuelist = this.tableData;
      console.log(params);
      if (params.planStatus == 0) {
        _paq.push(["trackEvent", "点击", "暂存", "区域月度指标编制暂存"]);
        sendJSON("/group/updatePlanStatus", params).then(res => {
          if (res.result != 0) {
            this.$message.success(`暂存成功`);
          }
        });
      } else {
        this.findC_flag(this.tableData);
        if (!this.downFlag) {
          this.$confirm(`${this.flagInfo}`)
            .then(() => {
              this.downFlag = true;
              return;
            })
            .catch(() => {
              this.downFlag = true;
              return;
            });
        } else {
          this.$confirm(`确认下达吗？`)
            .then(() => {
              _paq.push(["trackEvent", "点击", "下达", "区域月度指标编制下达"]);
              sendJSON("/group/updatePlanStatus", params).then(res => {
                // if (res.result != 0) {
                this.$message.success(`下达成功`);
                this.$router.push({
                  name: "regionalmanagement"
                });
                // } else
                //   this.$message.error("区域下发金额必须大于或等于集团下发的金额");
              });
            })
            .catch(() => {
              this.message("已取消");
            });
        }
      }
    },
    exportTemp() {
      let { month, id } = this.$route.query;
      _paq.push(["trackEvent", "点击", "导出", "区域月度计划指标编制数据导出"]);
      _paq.push(["setDownloadExtensions", "xlsx"]);
      return downLoad("/Export/regionMonthlyPlanExport.action", {
        month: month,
        businessId: id
      });
    },
    tableSetChange(key, row) {
      this.$set(
        row,
        "total_sign_funds",
        Number(row.new_sign_funds) + Number(row.reserve_sign_funds)
      );
      total(this.tableData, ["new_sign_funds"]);
      total(this.tableData, ["reserve_sign_funds"]);

      total(this.tableData, ["total_sign_funds"]);

      total(this.tableData, [key]);
    },
    validateNumber(obj, key) {
      this.timer || clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        obj[key] = number(obj[key]);
      }, 1000);
    },
    validateDecimal(obj, key) {
      if(this.floatLenght >= 4)
      if (this.timer) {
        clearTimeout(this.timer);
      }
      this.timer = setTimeout(() => {
        obj[key] = decimal(obj[key]);
      }, 3000);
    }
  },
  data() {
    return {
      //   表格
      tableData: [],
      input: "",
      loadObj: null,
      // tableHeight: document.body.clientHeight - 220,
      tableHeight: window.outerHeight - 310,
      // readonly:this.$route.query.planStatus==1,
      readonly: false,
      downFlag: true,
      onlyRead: this.$route.query.planStatus > 1 ? false : true,
      timer: null,
      flagInfo: ""
    };
  },
  created() {
    this.reload();
    this.$store.dispatch("app/trackPageView", "区域指标编制");
  }
};
</script>
<style scoped src="@/assets/css/style.css"></style>
<style lang="scss">
@import "@/styles/form.scss";
</style>
<style lang="less" scoped>
// .el-table {
//   .el-table__fixed {
//     height:auto !important; // 此处的important表示优先于element.style
//     bottom:17px; // 改为自动高度后，设置与父容器的底部距离，则高度会动态改变
//   }
// }
.outdata {
  // margin-right:10px;
  margin: 6px 10px 6px 0px;
}
// .intodata{
//   // float: right;
// }
</style>
