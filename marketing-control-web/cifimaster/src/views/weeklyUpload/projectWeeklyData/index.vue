
<template>
  <div class="app-container">
    <!-- 搜索 -->
    <el-row class="container navInput">
      <el-form ref="form" class="flexbox" label-width="80px">
          <div class="grid-content bg-purple">
            <div class="block">
              <el-form-item label="项目:">
                <!-- <el-select v-model='status1'>
                  <el-option v-for='item in projectData' :key='item.value' :label="item.label" :value='item.value'></el-option>
                </el-select>-->
                <el-input v-model="input" placeholder="请输入"></el-input>
              </el-form-item>
            </div>
          </div>
          <div class="grid-content bg-purple">
            <div class="block">
              <el-form-item label="年月:">
                <el-date-picker v-model="year" type="month" placeholder="选择日期"></el-date-picker>
              </el-form-item>
            </div>
          </div>
          <div class="grid-content bg-purple">
            <div class="block">
              <el-form-item label="周度:">
                <el-select v-model="how_week">
                  <el-option
                    v-for="item in weeklyOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </div>
          </div>
          <div class="grid-content bg-purple">
            <div class="block">
              <el-form-item label="状态:">
                <el-select v-model="status">
                  <el-option
                    v-for="item in statusOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </div>
          </div>
          <div class="grid-content bg-purple">
               <div class="block">
                  <el-form-item label="上报时间:">
                  <el-date-picker
                    v-model="report_time"
                    format="yyyy-MM-dd"
                    value-format="yyyy-MM-dd"
                    type="daterange"
                  ></el-date-picker>
                </el-form-item>
               </div>
          </div>
          <div class="grid-content bg-purple">
              <el-form-item label="审批时间:">
                <el-date-picker
                  v-model="toexamine_time"
                  format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd"
                  type="daterange"
                ></el-date-picker>
                <el-button
                  type="primary"
                  class="xuHuiBtn main"
                  @click="search"
                >搜索</el-button>
              </el-form-item>
          </div>

      </el-form>
    </el-row>
    <!-- 表格 -->
    <el-row class="container">
      <el-table :data="tableData" class="etable" style="width: 100%">
        <el-table-column header-align="center" align="center" label="序号" width="50">
          <template slot-scope="scope">
            <span>{{ scope.$index+1}}</span>
          </template>
        </el-table-column>
        <el-table-column header-align="center" align="center" label="项目名称">
          <template slot-scope="scope">
            <span :title="scope.row.project_name">{{ scope.row.project_name }}</span>
          </template>
        </el-table-column>
        <el-table-column header-align="center" align="center" label="年月">
          <template slot-scope="scope">
            <span>{{ scope.row.this_time|getMonth}}</span>
          </template>
        </el-table-column>
        <el-table-column header-align="center" align="center" label="周度">
          <template slot-scope="scope">
            <span>{{ scope.row.weeklyname}}</span>
          </template>
        </el-table-column>
        <el-table-column header-align="center" align="center" width="160" label="日期">
          <template slot-scope="scope">
            <div :title="scope.row.start_time+'-'+scope.row.end_time">
              <span>{{scope.row.start_time|getMonthDay}}</span>-
            <span>{{scope.row.end_time|getMonthDay}}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column header-align="center" align="center" label="状态">
          <template slot-scope="scope">
            <!-- {{scope.row.plan_status}} -->
            <span v-if="scope.row.plan_status==0" :style="{color:'red'}">未上报</span>
            <span v-if="scope.row.plan_status==1" :style="{color:'green'}">已上报</span>
            <!-- <span v-if='scope.row.plan_status==2'  :style="{color:'green'}">区域已上报</span> -->
            <span v-if="scope.row.plan_status==2" :style="{color:'green'}">已上报</span>
            <span v-if="scope.row.plan_status==-1" :style="{color:'red'}">已驳回</span>
          </template>
        </el-table-column>
        <el-table-column header-align="center" align="center" width="160" label="更新时间">
          <template slot-scope="scope">
            <span :title="scope.row.create_time">{{scope.row.create_time}}</span>
          </template>
        </el-table-column>
        <el-table-column header-align="center" align="center"  width="160" label="上报时间">
        <template slot-scope="scope">
          <span :title="scope.row.report_time">{{scope.row.report_time}}</span>
        </template>
      </el-table-column>
        <el-table-column header-align="center" align="center"  width="160" label="审核时间">
          <template slot-scope="scope">
            <span :title="scope.row.toexamine_time">{{scope.row.toexamine_time}}</span>
          </template>
        </el-table-column>
        <el-table-column header-align="center" align="center" label="操作" width="100">
          <template slot-scope="scope">
            <!-- {{scope.row.is_self_write}} -->
            <el-button
              type="text"
              v-show="scope.row.is_effective==0&&$store.state.user.userPower.includes('编制')"
              @click="handleEdit(scope.row.this_time,scope.row.project_id,scope.row.how_week,scope.row.is_effective,scope.row.area_id,scope.row.start_time,scope.row.end_time,scope.row.type)"
            >编制</el-button>
            <el-button
              type="text"
              v-show="scope.row.is_effective==1&&$store.state.user.userPower.includes('查看')"
              @click="handleEdit(scope.row.this_time,scope.row.project_id,scope.row.how_week,scope.row.is_effective,scope.row.area_id,scope.row.start_time,scope.row.end_time,scope.row.type)"
            >查看</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
  </div>
</template>

<script>
import { render, sendJSON, windowPhase } from "@/api/request";

export default {
  data() {
    return {
      readonly: false,
      //   表格
      statusOptions: [
        {
          value: "",
          label: "全部"
        },
        {
          value: "-1",
          label: "已驳回"
        },
        {
          value: "1",
          label: "已上报"
        },
        {
          value: "0",
          label: "未上报"
        }
      ],
      status: "",
      tableData: [],
      business: [
        {
          value: "选项1",
          label: "浙江事业部"
        },
        {
          value: "选项1",
          label: "苏南事业部"
        }
      ],
      business: "",
      value1: "",
      year: new Date().getAppointedFormatTime("YYYY-MM"),
      options: [
        {
          value: "选项1",
          label: "全部"
        }
      ],
      value: "",
      input: "",
      how_week: "",
      toexamine_time:"",
      report_time:"",
      weeklyOptions: [
        {
          value: "",
          label: "全部"
        },
        {
          value: "1",
          label: "第一周"
        },
        {
          value: "2",
          label: "第二周"
        },
        {
          value: "3",
          label: "第三周"
        },
        {
          value: "4",
          label: "第四周"
        },
        {
          value: "5",
          label: "第五周"
        }
      ]
    };
  },
  filters: {
    getMonth(value) {
      //debugger;
      return new Date(value).getAppointedFormatTime("yyyy-MM");
    },
    getMonthDay(value) {
      return new Date(value).getAppointedFormatTime("MM月dd日");
    }
  },
  created() {
    // 判断是否窗口期
    // if(localStorage.getItem('username')!=="admin"){
    // windowPhase({}).then(res => {
    //   let start= res.result.data.windowsStart.replace(/-/g, '/')
    //   let end= res.result.data.windowsEnd.replace(/-/g, '/')
    //   if (
    //     new Date().getTime() > new Date(start).getTime() &&
    //     new Date().getTime() < new Date(end).getTime()
    //   ) {
    //     this.$confirm(
    //       `窗口期${res.result.data.windowsStart}至${res.result.data.windowsEnd},无法查看该页面!`
    //     )
    //       .then(() => {
    //         this.$router.push("/");
    //       })
    //       .catch(() => {
    //         this.$router.push("/");
    //       });
    //   }
    // });
    // }
     // 渲染
        render(
      "/weeklyMarketing/ProjectSelectWeekly",
      {
        type: 3,
        project_name: this.input,
        this_time: new Date(this.$data.year).getAppointedFormatTime("YYYY-MM"),
        how_week: this.how_week,
        plan_status: this.status,
        userId: localStorage.getItem("id")
      },
      this.$data.tableData
    );

  },
  methods: {
    //   表格
    handleEdit(
      this_time,
      project_id,
      how_week,
      is_effective,
      area_id,
      start,
      end,
      type
    ) {
      _paq.push(["trackEvent", "点击", "查看", "查看项目周计划详情"]);

      this.$router.push({
        name: "projectWeeklyParticulars",
        query: {
          project_id: project_id,
          how_week: how_week,
          is_effective: is_effective,
          area_id: area_id,
          this_time: this_time,
          start: start,
          end: end,
          type
        }
      });
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    //   搜索
    search() {
      if (this.year == 1970) {
        this.year = new Date(this.$data.year).getAppointedFormatTime("YYYY-MM");
      }
      this.tableData = [];
      if (this.status == "") {
        render(
          "/weeklyMarketing/ProjectSelectWeekly",
          {
            type: 3,
            project_name: this.input,
            this_time: new Date(this.$data.year).getAppointedFormatTime(
              "YYYY-MM"
            ),
            how_week: this.how_week,
            plan_status: "",
            report_time:this.report_time,
            toexamine_time:this.toexamine_time,
            userId: localStorage.getItem("id")
          },
          this.tableData
        );
      } else {
        sendJSON("/weeklyMarketing/ProjectSelectWeekly", {
          type: 3,
          project_name: this.input,
          this_time: new Date(this.$data.year).getAppointedFormatTime(
            "YYYY-MM"
          ),
          how_week: this.how_week,
          userId: localStorage.getItem("id"),
          plan_status: this.status
        }).then(res => {
          _paq.push(["trackEvent", "点击", "搜索", "搜索项目周计划列表"]);
          console.log(
            new Date(this.$data.year).getAppointedFormatTime("YYYY-MM")
          );
          this.tableData = res.result;
        });
      }
    }
  }
};
</script>
<style lang="less">
.el-input {
  width: auto;
}
.navInput {
  line-height: 40px !important;
  vertical-align: middle;
  .el-form-item__label {
    line-height: 40px !important;
  }
}
.el-button + .el-button {
  margin-left: 0px;
}
</style>
<style lang="scss">
@import "@/styles/main.scss";
@import "@/styles/list.scss";
</style>
<style lang="less" scoped>
::v-deep .el-date-editor--daterange{
  width: 230px;
 .el-input__icon{
    line-height: 20px;
  }
  .el-range-separator{
    line-height: 20px;

  }
}
.flexbox{
  display: flex;
  flex-wrap: wrap;
  >div{
    width: 33.33%;}
  ::v-deep .el-date-editor{
    width: 200px;
  }
  .el-select{
    width: 200px;

  }
  ::v-deep .el-input__inner{
    width: 200px;

  }
}
</style>
