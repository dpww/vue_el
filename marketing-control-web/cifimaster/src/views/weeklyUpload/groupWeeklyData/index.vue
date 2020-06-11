
<template>
  <div class="app-container">
    <!-- 搜索 -->
    <el-row class="container navInput">
      <el-form ref="form">
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <div class="block">
              <el-form-item label="年月:">
                <el-date-picker v-model="year" type="month" placeholder="选择日期"></el-date-picker>
              </el-form-item>
            </div>
          </div>
        </el-col>
        <el-col :span="8" :offset="8">
          <div class="grid-content bg-purple">
            <div class="block">
              <el-form-item label="周度:">
                <el-select v-model="status">
                  <el-option
                    v-for="item in statusOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
                <el-button
                  type="primary"
                  style="float:right"
                  class="xuHuiBtn main"
                  @click="search"
                >搜索</el-button>
              </el-form-item>
            </div>
          </div>
        </el-col>
      </el-form>
    </el-row>
    <!-- 表格 -->
    <el-row class="container">
      <el-table :data="tableData" class="etable" style="width: 100%">
        <el-table-column header-align="center" align="center" label="序号" width="80">
          <template slot-scope="scope">
            <span>{{ scope.$index+1}}</span>
          </template>
        </el-table-column>
        <el-table-column header-align="center" align="center" label="集团名称">
          <template slot-scope="scope">{{scope.row.project_name}}</template>
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
        <el-table-column header-align="center" align="center" label="日期">
          <template slot-scope="scope">
            <span>{{scope.row.start_time|getMonthDay}}</span>-
            <span>{{scope.row.end_time|getMonthDay}}</span>
          </template>
        </el-table-column>
        <el-table-column header-align="center" align="center" label="操作" width="150">
          <template slot-scope="scope">
            <el-button
              v-if="$store.state.user.userPower.includes('查看')&&$store.state.user.userPower.includes('查看')"
              type="text"
              @click="handleEdit(scope.row.this_time,scope.row.project_id,scope.row.how_week,scope.row.start_time,scope.row.end_time,scope.row.type,scope.row.business_unit_id)"
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
      //   表格
      statusOptions: [
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
      value: ""
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
    //   windowPhase({}).then(res => {
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
          "/weeklyMarketing/groupSelectWeekly",
          {
            type: 1,
            this_time: new Date(this.$data.year).getAppointedFormatTime(
              "YYYY-MM"
            ),
            how_week: this.status,
            userId: localStorage.getItem("id")
          },
          this.$data.tableData
        );
  },
  methods: {
    //   表格
    handleEdit(this_time, id, week, start, end, type, business_unit_id) {
      _paq.push(["trackEvent", "点击", "查看", "查看集团周计划详情"]);
      this.$router.push({
        name: "groupWeeklyParticulars",
        query: {
          project_id: id,
          how_week: week,
          this_time: this_time,
          start: start,
          end: end,
          type,
          business_unit_id
        }
      });
    },
    handleDelete(index, row) {
      console.log(index, row);
    },

    //  搜索
    search() {
      if (this.year == 1970) {
        this.year = new Date(this.$data.year).getAppointedFormatTime("YYYY-MM");
      }
      sendJSON("/weeklyMarketing/groupSelectWeekly", {
        type: 1,
        this_time: new Date(this.$data.year).getAppointedFormatTime("YYYY-MM"),
        how_week: this.status,
        userId: localStorage.getItem("id")
      }).then(res => {
        _paq.push(["trackEvent", "点击", "搜索", "搜索集团周计划列表"]);
        console.log(
          new Date(this.$data.year).getAppointedFormatTime("YYYY-MM")
        );
        this.tableData = res.result;
      });
    }
  }
};
</script>
<style lang="less">
.navInput {
  line-height: 40px !important;
  vertical-align: middle;
  .el-form-item__label {
    line-height: 40px !important;
  }
}
</style>
<style lang="scss">
@import "@/styles/main.scss";
@import "@/styles/list.scss";
</style>
