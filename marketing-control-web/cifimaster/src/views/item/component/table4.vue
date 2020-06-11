<template>
  <div>
    <div class="organization">
      <div>月度指标详情</div>
    </div>
    <div class="form">
      <el-row :gutter="40">
        <el-col :span="12">
          <span>风险点</span>
          <el-input
            type="textarea"
            rows="4"
            show-word-limit
            resize="none"
            :disabled="readonly"
            v-model="form.risk_point"
            maxlength="500"
          ></el-input>
        </el-col>
        <el-col :span="12">
          <span>对策</span>
          <el-input
            type="textarea"
            rows="4"
            show-word-limit
            resize="none"
            :disabled="readonly"
            v-model="form.countermeasures"
            maxlength="500"
          ></el-input>
        </el-col>
      </el-row>
      <el-row :gutter="40">
        <el-col :span="12">
          <span>政策申请</span>
          <el-input
            type="textarea"
            rows="4"
            show-word-limit
            resize="none"
            :disabled="readonly"
            v-model="form.policy_use"
            maxlength="500"
          ></el-input>
        </el-col>
        <el-col :span="12">
          <span>核心动作</span>
          <el-input
            type="textarea"
            rows="4"
            show-word-limit
            resize="none"
            :disabled="readonly"
            v-model="form.core_action"
            maxlength="500"
          ></el-input>
        </el-col>
      </el-row>
    </div>
    <div class="project-div">
      <div class="project-title">项目销售指标</div>
      <div class="project-container">
        <span class="project-sale-point">
          <strong>来人量</strong>
          :{{$parent.$parent.$parent.$parent.table2.come_client_quantity}}组
        </span>
        <span class="project-sale-point">
          <strong>小卡</strong>
          :{{$parent.$parent.$parent.$parent.table2.small_card}}组
        </span>
        <span class="project-sale-point">
          <strong>大卡</strong>
          :{{$parent.$parent.$parent.$parent.table2.big_card}}组
        </span>
        <span class="project-sale-point">
          <strong>认购套数</strong>
          :{{$parent.$parent.$parent.$parent.table2.subscription_number}}套
        </span>
        <span class="project-sale-point">
          <strong>签约套数</strong>
          :{{$parent.$parent.$parent.$parent.table2.sign_number_set}}套
        </span>
        <span class="project-sale-point">
          <strong>签约金额</strong>
          :{{$parent.$parent.$parent.$parent.table2.sign_funds}}万元
        </span>
      </div>
    
    </div>
        <span style="display:inline-block;color:red">注：认购套数不含车位/储藏室</span>

    <div class="organization">
      <div>周度指标详情</div>
      <el-row style="text-align: right;">
        <el-button
          type="primary"
          v-if="$store.state.user.userPower.includes('表四导出模版')"
          class="xuHuiBtn secondary"
        >
          <a :href="exportTemp()" @click="bury" download="download">导出数据</a>
        </el-button>
      </el-row>
    </div>
    <div style="display:flex;padding-bottom:40px;">
      <!-- 日历选择器 -->
      <el-calendar v-model="queryMonth" :style="{'width':'35%','height':planTable_H}"></el-calendar>

      <el-table
        class="etable"
        ref="planTable"
        style="width:65%;"
        :span-method="sum"
        :data="weekPlan"
      >
        <el-table-column label="周" width="100px">
          <template slot-scope="scope">
            <span>{{ scope.row.howWeek }}</span>
          </template>
        </el-table-column>
        <el-table-column label="来访量" width="100px">
          <template slot-scope="scope">
            <span v-if="scope.$index==0">{{total['visit_quantity']}}</span>
            <el-input
              :maxlength="10"
              v-else-if="!readonly"
              @blur="callEcharts"
              @input="validateNumber(scope.row,'visit_quantity')"
              v-model="scope.row.visit_quantity"
              placeholder
            ></el-input>
            <span v-else>{{scope.row.visit_quantity}}</span>
          </template>
        </el-table-column>
        <el-table-column label="小卡" width="100px">
          <template slot-scope="scope">
            <span v-if="scope.$index==0">{{total['small_card']}}</span>
            <el-input
              :maxlength="10"
              v-else-if="!readonly"
              @input="validateNumber(scope.row,'small_card')"
              v-model="scope.row.small_card"
              placeholder
            ></el-input>
            <span v-else>{{scope.row.small_card}}</span>
          </template>
        </el-table-column>
        <el-table-column label="大卡" width="100px">
          <template slot-scope="scope">
            <span v-if="scope.$index==0">{{total['big_card']}}</span>
            <el-input
              :maxlength="10"
              v-else-if="!readonly"
              @input="validateNumber(scope.row,'big_card')"
              v-model="scope.row.big_card"
              placeholder
            ></el-input>
            <span v-else>{{scope.row.big_card}}</span>
          </template>
        </el-table-column>
        <el-table-column label="认购套数" width="100px">
          <template slot-scope="scope">
            <span v-if="scope.$index==0">{{total['subscription_number_set']}}</span>
            <el-input
              :maxlength="10"
              v-else-if="!readonly"
              @blur="callEcharts"
              @input="validateNumber(scope.row,'subscription_number_set')"
              v-model="scope.row.subscription_number_set"
              placeholder
            ></el-input>
            <span v-else>{{scope.row.subscription_number_set}}</span>
          </template>
        </el-table-column>
        <el-table-column label="签约套数" width="100px">
          <template slot-scope="scope">
            <span v-if="scope.$index==0">{{total['sign_number_set']}}</span>
            <el-input
              :maxlength="10"
              v-else-if="!readonly"
              @blur="callEcharts"
              @input="validateNumber(scope.row,'sign_number_set')"
              v-model="scope.row.sign_number_set"
              placeholder
            ></el-input>
            <span v-else>{{scope.row.sign_number_set}}</span>
          </template>
        </el-table-column>
        <el-table-column label="签约目标" width="100px" header-align="center" align="right">
          <template slot-scope="scope">
            <span v-if="scope.$index==0">{{total['sign_target']}}</span>
            <el-input
              :maxlength="10"
              v-else-if="!readonly"
              @blur="callEcharts"
              @input="validateNumber(scope.row,'sign_target')"
              v-model="scope.row.sign_target"
              placeholder
            ></el-input>
            <span v-else>{{scope.row.sign_target}}</span>
          </template>
        </el-table-column>
        <el-table-column label="动作分解">
          <template slot-scope="scope">
            <el-input
              class="core_action"
              type="textarea"
              :maxlength="50"
              v-if="!readonly&&scope.$index!=0"
              v-model="scope.row.core_action"
              placeholder
              :title="scope.row.core_action"
              show-word-limit
            ></el-input>
            <span v-else>{{scope.row.core_action}}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div class="discount">
      <div id="myeChart3" :style="{width:'400px',height: '400px',display: 'inline-block'}"></div>
      <div id="myeChart4" :style="{width:'400px',height: '400px',display: 'inline-block'}"></div>
      <div id="myeChart5" :style="{width:'400px',height: '400px',display: 'inline-block'}"></div>
    </div>
    <el-row class="el-row-button">
      <template v-if="status&&upStatus==0">
        <el-button
          type="primary"
          v-if="$store.state.user.userPower.includes('表四上报')"
          @click="IsEffective"
          class="xuHuiBtn main"
        >上报</el-button>
        <el-button
          type="primary"
          v-if="$store.state.user.userPower.includes('表四暂存')"
          @click="updateWeekly"
          class="xuHuiBtn secondary"
        >暂存</el-button>
      </template>
      <template v-if="status1">
        <el-button
          type="primary"
          v-if="upStatus!=2&&notSubmit&&$store.state.user.userPower.includes('表四通过')"
          @click="pass({projectId:$route.query.projectId,months:$route.query.months,'isEffective':2})"
          class="xuHuiBtn main"
        >通过</el-button>
        <el-button
          type="primary"
          v-if="upStatus>0&&$store.state.user.userPower.includes('表四驳回')"
          @click="turnDown({projectId:$route.query.projectId,months:$route.query.months,'isEffective':0})"
          class="xuHuiBtn secondary"
        >驳回</el-button>
      </template>
      <el-button type="primary" @click="$router.back(-1)" class="xuHuiBtn secondary">返回</el-button>
    </el-row>
  </div>
</template>
<script>
  import { weekPlanSort } from "@/utils/methods";
  import { number, tableFixed } from "@/utils/filter";
  import {
    /*
       查找月度计划明细到表四
       */
    allMouthPlanSelect,

    /*
      通过项目ID和月份来查找周计划
       */
    allWeeklyPlanSelect,

    /*
      通过项目ID和月份来决定周计划生效状态
       */
    weeklyPlanIsEffective,
    /*
       通过项目ID和月份来跟新周计划
       */
    updateWeeklyPlan,
    /*
       通过项目ID和月份来设置表 四（月度计划明细）里面的风险
       */
    mouthPlanUpdateRisk
    //获取周计划
    // getMonthBiao
  } from "@/api/ProjectMonthlyPlan.js";
  import { restful, downLoad } from "@/api/request";
  export default {
    created() {
      this.reload();
    },
    mounted() {
      //根据窗口的大小变动图表
      window.onresize = function() {
        // myChartOne.resize();
        // myChartTwo.resize();
        // myChartThree.resize();
      };
      console.log(
        this.$refs.planTable.$el.offsetHeight,
        "this.$refs.planTable.offsetHeight"
      );
      this.planTable_H = this.$refs.planTable.$el.offsetHeight;
    },
    computed: {
      total() {
        let totals = {};
        this.weekPlan.forEach(item => {
          Object.keys(item).forEach(key => {
            totals[key] = totals[key] || 0;
            totals[key] += Number(item[key]);
          });
        });
        return totals;
      },
      status() {
        return this.$store.state.settings.projectStatus == 2;
      },
      status1() {
        return this.$store.state.settings.projectStatus >= 3;
      },
      state() {
        return this.$store.state.settings.projectStatus;
      },
      isAdmin() {
        return this.$store.state.user.userJobType == "admin";
      },
      isRegion() {
        return this.$store.state.settings.regionItem;
      }
    },
    data() {
      return {
        loadObj: null,
        weekPlan: [],
        readonly: false,
        postId:
          localStorage.getItem("CommonJobID") ===
          "1c1d3cf6-e37a-11e9-8c08-00163e05721e",
        postId1:
          localStorage.getItem("CommonJobID") ===
          "f344fe8d-e379-11e9-8c08-00163e05721e",
        notSubmit: true,
        form: {
          risk_point: "",
          countermeasures: "",
          policy_use: "",
          core_action: "",
          projectId: this.$route.query.projectId,
          months: this.$route.query.months
        },
        input: "",
        upStatus: 1,
        value2: "",
        prevData: [],
        currentData: [],
        dataTime: "",
        queryMonth: new Date(this.$route.query.months),
        planTable_H: 0
      };
    },
    methods: {
      exportTemp() {
        let { months, projectId } = this.$route.query;
        return downLoad("/Export/listFourExport.action", {
          month: months,
          businessId: projectId
        });
      },
      bury() {
        _paq.push(["setDownloadExtensions", "xlsx"]);
      },
      /* 数字验证*/
      validateNumber(obj, key) {
        console.log(obj);
        if(this.timer){
          clearTimeout(this.timer);
        }
        this.timer = setTimeout(() => {
          obj[key] = tableFixed(obj[key]);
        }, 3000);
      },
      /* 数据刷新*/
      reload(res) {
        if (res) this.closeLoading();
        // 本月数据
        this.getList();
        if (this.$store.state.user.userPower.includes("表四暂存")) {
          this.readonly = false;
        }
        allMouthPlanSelect(this.$route.query).then(res => {
          this.$data.form.risk_point = res.result.risk_point;
          this.$data.form.countermeasures = res.result.countermeasures;
          this.$data.form.policy_use = res.result.policy_use;
          this.$data.form.core_action = res.result.core_action;
        });
      },

    /* 验证数字*/
    validateDecimal(obj, key) {
        if(this.timer ){
          clearTimeout(this.timer)
        }
      setTimeout(() => {
        obj[key] = tableFixed(obj[key]);
      }, 3000);
    },
    /* 暂存*/
    updateWeekly() {
      _paq.push(["trackEvent", "点击", "暂存", "项目月度计划管理表四暂报"]);
      let data = JSON.parse(JSON.stringify(this.$data.weekPlan));
      data.shift();
      updateWeeklyPlan(
        JSON.stringify({
          data: data,
          form: this.$data.form
        })
      ).then(res => {
        this.$message.success("暂存成功");
      });
    },
    // 上报
    IsEffective() {
      _paq.push(["trackEvent", "点击", "上报", "项目月度计划管理表四上报"]);
      let data = JSON.parse(JSON.stringify(this.$data.weekPlan));
      data.shift();
      updateWeeklyPlan(
        JSON.stringify({
          data: data,
          form: this.$data.form,
          state: 1,
          upProject: {
            projectId: this.$route.query.projectId,
            months: this.$route.query.months,
            is_effective: 1,
            userId: localStorage.getItem("id")
          }
        })
      ).then(res => {
        this.$confirm("确认上报吗？")
          .then(() => {
            weeklyPlanIsEffective({
              projectId: this.$route.query.projectId,
              months: this.$route.query.months,
              is_effective: 1,
              userId: localStorage.getItem("id")
            })
          })}
        ).then(res => {
          this.$confirm("确认上报吗？")
            .then(() => {
              weeklyPlanIsEffective({
                projectId: this.$route.query.projectId,
                months: this.$route.query.months,
                is_effective: 1
              }).then(res => {
                this.reload();
                /* 修改全局的状态*/
                this.$store.dispatch("settings/changeSetting", {
                  key: "projectStatus",
                  value: 3
                });

                this.notSubmit = false;
                this.$message.success("上报成功");
              });
            })
            .catch(() => {
              this.$message("已取消");
            });
        })



      },
      /* 单元格合并*/
      sum({ row, column, rowIndex, columnIndex }) {
        // if (columnIndex == 0 && rowIndex == 0) return [1, 1];
        // else if (columnIndex <= 2 && rowIndex == 0) {
        //   return [0, 0];
        // }
      },
      // //获取周规则
      //   getHowWeek(){
      //     getMonthBiao({"thisTime":this.$route.query.months}).then(res=>{
      //       console.log(res,222);
      //     })
      //   },
      // 本月数据
      getList() {
        let week = weekPlanSort(this.$route.query.months);
        var res = allWeeklyPlanSelect(this.$route.query).then(res => {
          this.currentData = res.result;
          //修改上报的状态
          this.upStatus = res.result[0].is_effective;
          let data = res.result;
          this.readonly =
            res.result[0].is_effective > 0 ||
            !this.$store.state.user.userPower.includes("表四暂存");
          if (this.$store.state.user.userPower.includes("表四暂存")) {
            this.readonly = false;
          }
          this.projectStatus = res.result[0].is_effective;
          week.forEach((item, index) => {
            Object.keys(data[index]).forEach(key => {
              item[key] = data[index][key];
            });
          });
          // console.log(res.result,"11111");
          this.$data.weekPlan.splice(0, this.weekPlan.length, ...res.result);
          this.$data.weekPlan.unshift([]);
          this.$data.weekPlan.forEach(item => {
            if (item.timelist) {
              item.week = item.howWeek;
            }
          });
        });

        /* 上月数据 */
        var prev = restful("/projectmanager/frontselectWeeklyPlan", [
          this.$route.query.projectId,
          this.$route.query.months,
          this.$route.query.is_effective
        ]).then(res => {
          this.prevData = res.result;
        });
        Promise.all([res, prev])
          .then(() => {
            let currentQuantityData = [],
              currentSubscriptionData = [],
              currentSignData = [];
            this.currentData.forEach(item => {
              currentQuantityData.push(item.visit_quantity);
              currentSubscriptionData.push(item.subscription_number_set);
              currentSignData.push(item.sign_target);
            });
            let prevQuantityData = [],
              prevSubscriptionData = [],
              prevSignData = [];
            this.prevData.forEach(item => {
              prevQuantityData.push(item.visit_quantity);
              prevSubscriptionData.push(item.subscription_number_set);
              prevSignData.push(item.sign_target);
            });
            this.discount(
              currentQuantityData,
              prevQuantityData,
              "myeChart3",
              "上月同周计划来人对比"
            );
            this.discount(
              currentSubscriptionData,
              prevSubscriptionData,
              "myeChart4",
              "上月同周计划认购对比"
            );
            this.discount(
              currentSignData,
              prevSignData,
              "myeChart5",
              "上月同周计划签约对比"
            );
          })
          .catch(() => {
            this.callEcharts();
          });
        console.log(this.$data.weekPlan, "weekPlan");
      },

      // input框 失焦事件
      callEcharts() {
        let prevQuantityData = [],
          prevSubscriptionData = [],
          prevSignData = [];
        this.prevData.forEach(item => {
          prevQuantityData.push(item.visit_quantity);
          prevSubscriptionData.push(item.subscription_number_set);
          prevSignData.push(item.sign_target);
        });
        let quantityData = [],
          subscriptionData = [],
          signData = [];
        let currentData = JSON.parse(JSON.stringify(this.weekPlan));
        currentData.shift();
        currentData.forEach(item => {
          quantityData.push(item.visit_quantity);
          subscriptionData.push(item.subscription_number_set);
          signData.push(item.sign_target);
        });
        this.discount(
          quantityData,
          prevQuantityData,
          "myeChart3",
          "上月同周计划来人对比"
        );
        this.discount(
          subscriptionData,
          prevSubscriptionData,
          "myeChart4",
          "上月同周计划认购对比"
        );
        this.discount(
          signData,
          prevSignData,
          "myeChart5",
          "上月同周计划签约对比"
        );
      },

      // 通过
      pass() {
        this.$confirm("确认通过吗？")
          .then(() => {
            _paq.push(["trackEvent", "点击", "通过", "项目月度计划管理表四通过"]);
            let data = JSON.parse(JSON.stringify(this.$data.weekPlan));
            data.shift();
            weeklyPlanIsEffective({
              projectId: this.$route.query.projectId,
              months: this.$route.query.months,
              is_effective: 2
            }).then(res => {
              this.notSubmit = false;
              this.$message.success("通过成功");
            });
          })
          .catch(() => {
            this.$message("已取消");
          });
      },
      // 驳回
      turnDown() {
        this.$confirm("确认驳回吗？")
          .then(() => {
            _paq.push(["trackEvent", "点击", "驳回", "项目月度计划管理表四驳回"]);
            let data = JSON.parse(JSON.stringify(this.$data.weekPlan));
            data.shift();
            weeklyPlanIsEffective({
              projectId: this.$route.query.projectId,
              months: this.$route.query.months,
              is_effective: 0
            }).then(res => {
              this.notSubmit = false;
              this.$message.success("驳回成功");
            });
          })
          .catch(() => {
            this.$message("已取消");
          });
      },
      /*  save() {
            let sendObj = {
              a: JSON.stringify(this.$data.list)
            }
            saveList(sendObj);
          }, */
      // 上月同周计划来人对比
      discount(arrData, lastMonthData, id, title) {
        // 基于准备好的dom，初始化echarts实例
        let myChartOne = this.$echarts.init(document.getElementById(id));
        let weeks = JSON.parse(JSON.stringify(this.weekPlan));
        weeks.shift();
        // 绘制图表
        myChartOne.setOption({
          title: {
            text: title,
            textStyle: {
              fontSize: 14
            }
          },
          tooltip: {
            trigger: "axis"
          },
          legend: {
            data: ["本月", "上月"],
            left: "50%"
          },
          grid: {
            left: "5%",
            right: "5%",
            bottom: "3%",
            containLabel: true
          },
          toolbox: {
            feature: {}
          },
          xAxis: {
            type: "category",
            boundaryGap: false,
            data: weeks.map(item => item.week)
          },
          yAxis: {
            type: "value"
          },
          series: [
            {
              name: "本月",
              type: "line",
              data: arrData
            },
            {
              name: "上月",
              type: "line",
              data: lastMonthData
            }
          ]
        });
      },

    // 通过
    pass() {
      this.$confirm("确认通过吗？")
        .then(() => {
          _paq.push(["trackEvent", "点击", "通过", "项目月度计划管理表四通过"]);
          let data = JSON.parse(JSON.stringify(this.$data.weekPlan));
          data.shift();
          weeklyPlanIsEffective({
            projectId: this.$route.query.projectId,
            months: this.$route.query.months,
            is_effective: 2
          }).then(res => {
            this.notSubmit = false;
            this.$message.success("通过成功");
          });
        })
        .catch(() => {
          this.$message("已取消");
        });
    },
    // 驳回
    turnDown() {
      this.$confirm("确认驳回吗？")
        .then(() => {
          _paq.push(["trackEvent", "点击", "驳回", "项目月度计划管理表四驳回"]);
          let data = JSON.parse(JSON.stringify(this.$data.weekPlan));
          data.shift();
          weeklyPlanIsEffective({
            projectId: this.$route.query.projectId,
            months: this.$route.query.months,
            is_effective: 0
          }).then(res => {
            this.notSubmit = false;
            this.$message.success("驳回成功");
          });
        })
        .catch(() => {
          this.$message("已取消");
        });
    },
    /*  save() {
          let sendObj = {
            a: JSON.stringify(this.$data.list)
          }
          saveList(sendObj);
        }, */
    // 上月同周计划来人对比
    discount(arrData, lastMonthData, id, title) {
      // 基于准备好的dom，初始化echarts实例
      let myChartOne = this.$echarts.init(document.getElementById(id));
      let weeks = JSON.parse(JSON.stringify(this.weekPlan));
      weeks.shift();
      // 绘制图表
      myChartOne.setOption({
        title: {
          text: title,
          textStyle: {
            fontSize: 14
          }
        },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: ["本月", "上月"],
          left: "50%"
        },
        grid: {
          left: "5%",
          right: "5%",
          bottom: "3%",
          containLabel: true
        },
        toolbox: {
          feature: {}
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: weeks.map(item => item.week)
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            name: "本月",
            type: "line",
            data: arrData
          },
          {
            name: "上月",
            type: "line",
            data: lastMonthData
          }
        ]
      });
    },

  }
};
</script>
<style lang="scss">
  .form {
    span {
      display: inline-block;
      font-weight: 400;
      margin: 10px 0;
    }
  }
  .project-div {
    margin-top: 15px;
  }
  .el-date-editor--datetimerange.el-input,
  .el-date-editor--datetimerange.el-input__inner {
    width: 170px !important;
  }
  .el-date-editor .el-range__icon {
    display: none;
  }
  .el-calendar__header {
    border: none;
    .el-button-group {
      display: none;
    }
  }
  .el-calendar-table .el-calendar-day {
    height: 33px !important;
  }
  .el-calendar__body {
    transform: translateY(-10px);
  }
  .core_action >textarea{
    min-height: 20px!important;
    max-height: 29px !important;
    overflow: hidden !important;
    resize:none
  }
  .core_action >textarea:focus{
    height: 100px !important;
    max-height: 100px !important;
    line-height: 29px !important;
    overflow: auto !important;
    resize:none
  }
  .core_action .el-input__count{
    display: none;
  }
.el-calendar-table .el-calendar-day {
  height: 33px !important;
}
.el-calendar__body {
  transform: translateY(-10px);
}
.core_action >textarea{
  min-height: 20px!important;
  max-height: 29px !important;
  overflow: hidden !important;
  resize:none
}
.core_action >textarea:focus{
  height: 100px !important;
  max-height: 100px !important;
  line-height: 29px !important;
  overflow: auto !important;
  resize:none
}
.core_action .el-input__count{
  display: none;
}
.core_action >textarea:focus + .el-input__count{
  display: inline;
}
</style>
