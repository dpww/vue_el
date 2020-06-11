
<template>
  <div class="app-container">
    <!-- 搜索 -->
    <!-- 0 未下发  1已下发 2 编制完成-->
    <el-row class="container navInput">
      <el-form ref="form">
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <div class="block">
              <el-form-item label="区域集团/事业部:">
                <!-- <el-select v-model="status1">
                  <el-option v-for="item in areaData" :key="item.value" :label="item.label" :value="item.value" ></el-option>
                </el-select>-->
                <el-input v-model="input" placeholder="请输入"></el-input>
              </el-form-item>
            </div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <div class="block">
              <el-form-item label="年月:">
                <el-date-picker v-model="year" type="month" placeholder="选择日期"></el-date-picker>
              </el-form-item>
            </div>
          </div>
        </el-col>
        <el-col :span="6">
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
              </el-form-item>
            </div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <div class="block">
              <el-form-item label="状态:">
                <el-select v-model="plan_status">
                  <el-option
                    v-for="item in statusOptionsStatus"
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
        <el-table-column header-align="center" align="center" label="区域名称">
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
            <span>{{scope.row.start_time|getMonthDay}}</span>-
            <span>{{scope.row.end_time|getMonthDay}}</span>
          </template>
        </el-table-column>
        <el-table-column header-align="center" align="center" width="160" label="上报时间">
          <template slot-scope="scope">
            <span :title="scope.row.report_time">{{ scope.row.report_time }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="状态" width="250">
          <template slot-scope="scope">
            <el-button type="text" v-if="scope.row.plan_status== 0" style="color: red">未上报</el-button>
            <el-button type="text" v-if="scope.row.plan_status== -1" style="color: red">已驳回</el-button>
            <el-button type="text" v-if="scope.row.plan_status== 1" style="color: green">已上报</el-button>
          </template>
        </el-table-column>
        <el-table-column header-align="center" align="center" label="操作" width="100">
          <template slot-scope="scope">
            <el-button
              type="text"
              v-if="$store.state.user.userPower.includes('查看')"
              @click="handleEdit(scope.row.this_time,scope.row.project_id,scope.row.how_week,scope.row.area_id,scope.row.start_time,scope.row.end_time,scope.row.plan_status,scope.row.is_self_write,scope.row.type)"
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
      plan_status: "",
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
      statusOptionsStatus: [
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
      powerList: []
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
    // console.log(localStorage.getItem('username')!=="admin"  );
    // if(localStorage.getItem('username')!=="admin"){
    // windowPhase({}).then(res => {
    //   let start= res.result.data.windowsStart.replace(/-/g, '/')
    //   let end= res.result.data.windowsEnd.replace(/-/g, '/')
    //   if (
    //     new Date().getTime() > new Date(start).getTime() &&
    //     new Date().getTime() < new Date(end).getTime()
    //   ) {
    //     // console.log(new Date(start).getTime(),"time")
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
      "/weeklyMarketing/regionSelectWeekly",
      {
        type: 2,
        project_name: this.input,
        this_time: new Date(this.$data.year).getAppointedFormatTime("YYYY-MM"),
        how_week: this.status,
        userId: localStorage.getItem("id")
      },
      this.$data.tableData
    );
  },
  methods: {
    //   表格
    handleEdit(
      this_time,
      id,
      week,
      area_id,
      start,
      end,
      plan_status,
      is_self_write,
      type
    ) {
      _paq.push(["trackEvent", "点击", "查看", "查看区域周计划详情"]);
      this.$router.push({
        name: "areaWeeklyParticulars",
        query: {
          project_id: id,
          how_week: week,
          area_id: area_id,
          this_time: this_time,
          start,
          end,
          plan_status,
          type
        }
      });
    },
    // getPower(datalist){
    //   console.log(datalist);

    //   for(let i=0;i<datalist.length;i++){
    //     if(datalist[i].children.length>0){
    //       this.powerList.push(datalist[i].name)
    //       this.getPower(datalist[i].children)
    //     }else{
    //       this.powerList.push(datalist[i].name)
    //     }
    //   }
    //   return this.powerList
    // },
    handleDelete(index, row) {
      console.log(index, row);
    },
    //   搜索
    search() {
      if (this.year == 1970) {
        this.year = new Date(this.$data.year).getAppointedFormatTime("YYYY-MM");
      }
      sendJSON("/weeklyMarketing/regionSelectWeekly", {
        type: 2,
        project_name: this.input,
        this_time: new Date(this.$data.year).getAppointedFormatTime("YYYY-MM"),
        how_week: this.status,
        plan_status: this.plan_status,
        userId: localStorage.getItem("id")
      }).then(res => {
        _paq.push(["trackEvent", "点击", "搜索", "搜索区域周计划列表"]);
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
</style>
<style lang="scss">
@import "@/styles/main.scss";
@import "@/styles/list.scss";
</style>
