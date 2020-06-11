<template>
  <div class="app-container">
    <!-- 搜索 -->
    <!-- 0 项目未上报  1项目已上报（已审核） 2 项目已上报（未审核）-->
    <el-row class="container">
      <el-form ref="form" class="flexBox" label-width="80px">
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
            <el-form-item label="年度:">
              <el-date-picker v-model="year" type="year" placeholder="选择年度" style="width: auto;"></el-date-picker>
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
          <el-form-item label="上报时间:">
            <el-date-picker
              v-model="report_time"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              type="daterange"
            ></el-date-picker>
          </el-form-item>
        </div>
        <div class="grid-content bg-purple">
          <el-form-item label="审核时间:">
            <el-date-picker
              v-model="toexamine_time"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              type="daterange"
            ></el-date-picker>
          </el-form-item>
        </div>
        <div class="grid-content bg-purple searchBtn">
          <el-form-item>
            <el-button type="primary" class="xuHuiBtn main" @click="search">搜索</el-button>
          </el-form-item>
        </div>
      </el-form>
    </el-row>
    <!-- 表格 -->
    <el-row class="container">
      <el-table
        :data="tableData"
        class="etable"
        style="width: 100%"
        @current-change="handleCurrentChange"
      >
        >
        <el-table-column label="序号" width="80">
          <template slot-scope="scope">
            <span>{{ scope.$index+1}}</span>
          </template>
        </el-table-column>
        <el-table-column header-align="center" align="left" label="项目">
          <template slot-scope="scope">
            <span :title="scope.row.business_name">{{ scope.row.business_name }}</span>
          </template>
        </el-table-column>
        <el-table-column header-align="center" width="120" align="left" label="年月">
          <template slot-scope="scope">
            <span>{{ scope.row.months |getMonth}}</span>
          </template>
        </el-table-column>
        <el-table-column header-align="center" align="center" label="状态">
          <template slot-scope="scope">
            <span
              :title="scope.row.plan_status"
              :style="{color:scope.row.plan_status_code==4?'green':'red',}"
            >{{ scope.row.plan_status }}</span>
          </template>
        </el-table-column>
        <el-table-column header-align="center" width="160" align="left" label="表一上报时间">
          <template slot-scope="scope">
            <span>{{ scope.row.report_time}}</span>
          </template>
        </el-table-column>
        <el-table-column header-align="center" width="160" align="left" label="表一审核时间">
          <template slot-scope="scope">
            <span>{{ scope.row.toexamine_time}}</span>
          </template>
        </el-table-column>
        <el-table-column header-align="center" align="center" label="区域/事业部下发指标（万元）" width="130">
          <template slot-scope="scope">
            <router-link
              v-if="$store.state.user.userPower.includes('区域/事业部下发指标')"
              :to="{name:'regionDownIndex',query:{'id':scope.row.business_id,months:scope.row.months,item:true}}"
            >{{ scope.row.region }}</router-link>
          </template>
        </el-table-column>
        <el-table-column width="180" header-align="center" align="center" label="项目上报指标(万元)">
          <template slot-scope="scope">
            <router-link
              v-if="scope.row.plan_status_code!=0&&$store.state.user.userPower.includes('项目上报指标')"
              :to="{name:'planInput',query:{'projectId':scope.row.business_id,months:scope.row.months,is_effective:0}}"
            >{{ scope.row.project }}</router-link>
            <span v-else>{{ scope.row.project }}</span>
          </template>
        </el-table-column>
        <el-table-column header-align="center" align="center" label="操作" width="280">
          <template slot-scope="scope">
            <!-- 状态为0可以编制-->
            <el-button
              type="text"
              v-if="$store.state.user.userPower.includes('编制')&&scope.row.is_manage==1&&(scope.row.plan_status_code==0||scope.row.plan_status_code==2)"
              @click="handleEdit({projectId:scope.row.business_id,months:scope.row.months,'is_effective':0,projectName:scope.row.business_name,'regionStatus':scope.row.regionStatus})"
            >编制</el-button>
            <!-- 状态为1或3时 可以审核-->
            <el-button
              type="text"
              v-if="($store.state.user.userPower.includes('审核')&&(scope.row.plan_status_code>0))"
              @click="handleEdit({projectId:scope.row.business_id,months:scope.row.months,'is_effective':0,projectName:scope.row.business_name,'regionStatus':scope.row.regionStatus})"
            >审核</el-button>
            <el-button
              @click="syncData(scope.row.business_id)"
              v-if="$store.state.user.userPower.includes('单项目同步供销存')"
              style="float:right"
              type="text"
              class="Btns"
            >同步供销存</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
  </div>
</template>
<script>
import { sendJSON, render, post } from "@/api/request";
export default {
  data() {
    return {
      syncDataId: null,
      //   表格
      statusOptions: [
        {
          value: "",
          label: "全部"
        },
        {
          value: "0",
          label: "表一项目未上报"
        },
        {
          value: "1",
          label: "表一项目已上报(未审核)"
        },
        {
          value: "2",
          label: "表二三四项目未上报"
        },
        {
          value: "3",
          label: "表二三四项目已上报(未审核)"
        },
        {
          value: "4",
          label: "全部审核 "
        }
      ],
      report_time: "",
      toexamine_time: "",
      status: "",
      tableData: [],
      business: [
        {
          value: "选项1",
          label: "吴越府"
        }
      ],
      business: "",
      year: new Date().getAppointedFormatTime("YYYY"),
      options: [
        {
          value: "选项1",
          label: "全部"
        }
      ],
      readonly:
        localStorage.getItem("CommonJobID") !==
        "1c1d3cf6-e37a-11e9-8c08-00163e05721e",
      postId:
        localStorage.getItem("CommonJobID") ==
        "f344fe8d-e379-11e9-8c08-00163e05721e",
      postId1:
        localStorage.getItem("CommonJobID") ==
        "1c1d3cf6-e37a-11e9-8c08-00163e05721e",
      projectData: [
        {
          value: "全部",
          label: "全部"
        },
        {
          value: "上海事业部",
          label: "上海事业部"
        },
        {
          value: "北京事业部",
          label: "北京事业部"
        }
      ],
      status1: "全部",
      input: ""
    };
  },
  filters: {
    getMonth(value) {
      return new Date(value).getAppointedFormatTime("yyyy-MM");
    }
  },
  created() {
    this.$store.dispatch("app/trackPageView", "项目阅读计划列表页");
    render(
      "/group/getProjectMonthPlans",
      {
        months: new Date().getAppointedFormatTime("YYYY"),
        userId: localStorage.getItem("id")
      },
      this.$data.tableData
    );
  },
  methods: {
    syncData(id) {
      // console.log('/////////////////////////////',id)
      if (!id) return;
      this.$confirm("是否同步供销存?")
        .then(() => {
          post("/datainterface/jituanByproject", { projectId: id }).then(
            res => {
              console.log(res);
              this.$message({
                type: "success",
                message: "同步成功!"
              });
            }
          );
        })
        .catch(() => {});
    },
    handleCurrentChange(currentRow) {},
    Approval(params) {
      this.$confirm(
        `确认${params[0].plan_status == 0 ? "驳回" : "提交"}吗?`,
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(() => {
          sendJSON("/group/updatePlanStatus", params).then(res => {
            this.$message.success("已驳回");
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消"
          });
        });
    },
    // 获取列表
    getList() {
      getList({
        id: "11",
        project: ""
      }).then(res => {
        console.log(res);
        this.tableData = res.content;
      });
    },
    //   表格
    handleEdit(params) {
      console.log(params);
      // return
      this.$router.push({
        name: "planInput",
        query: params,
        params
      });
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    // 搜索
    search() {
      let params = {
        businessName: this.input,
        report_time: this.report_time,
        toexamine_time: this.toexamine_time,
        months: new Date(this.$data.year).getAppointedFormatTime("YYYY"),
        planStatus: this.status,
        userId: localStorage.getItem("id")
      };
      _paq.push(["trackEvent", "点击", "搜索", "项目页搜索"]);
      sendJSON("/group/getProjectMonthPlans", params).then(res => {
        this.tableData = res.result;
      });
    }
  }
};
</script>
<style>
.el-input {
  width: auto;
}
</style>
<style lang="scss">
@import "@/styles/main.scss";
@import "@/styles/list.scss";
</style>
<style lang="less" scoped>
::v-deep .el-date-editor--daterange {
  width: 200px;
  .el-input__icon {
    line-height: 20px;
  }
  .el-range-separator {
    line-height: 20px;
  }
}
::v-deep .el-input__inner {
  width: 200px;
}
.flexBox {
  display: flex;
  flex-wrap: wrap;
  > div {
    // flex:1;
    width: 33.33%;
  }
}
::v-deep .el-button--text{
  margin-left: -15px !important;
}
</style>
