<template>
  <div class="installment">
     <!--tabs-->
    <div class="tabs-bottom">
      <el-tabs v-model="activeNameFirst" @tab-click="handleClickTabs">
        <el-tab-pane label="政策流程" name="first">
          <el-button type="primary" @click="periodizationClick()">一揽子分期折扣政策申请</el-button>
          <!--
          <el-button type="primary" @click="discountClick()">一揽子折扣政策申请</el-button>
          -->
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="installment-top">
      <el-row :gutter="20">
        <el-form ref="themeForm" :model="themeForm" label-width="80px">
          <el-col :span="6">
            <div class="grid-content bg-purple">
              <el-form-item label="流程主题">
                <el-input v-model="title" placeholder="请输入流程主题" clearable></el-input>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-purple">
              <el-form-item label="状态">
                <el-select v-model="flow_status" placeholder="请选择申请状态" clearable>
                  <!-- <el-option label="实例被删除" value="0"></el-option> -->
                  <el-option label="未发起" value="1"></el-option>
                  <el-option label="流程草稿 " value="2"></el-option>
                  <el-option label="审批中" value="3"></el-option>
                  <el-option label="审批通过" value="4"></el-option>
                  <el-option label="驳回发起" value="5"></el-option>
                  <el-option label="撤回发起" value="6"></el-option>
                  <el-option label="流程废弃" value="7"></el-option>
                  <!-- <el-option label="流程放弃" value="7"></el-option> -->
                  <!-- <el-option label="开始专业审核" value="8"></el-option> -->
                  <!-- <el-option label="专业审核节点被撤回" value="9"></el-option> -->
                </el-select>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="9">
            <div class="grid-content bg-purple">
              <el-form-item label="发起时间">
                <el-date-picker
                  v-model="startTime"
                  format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd"
                  type="daterange"
                ></el-date-picker>
              </el-form-item>
            </div>
          </el-col>
          <el-col :span="3">
            <div class="grid-content bg-purple">
              <el-button type="primary" @click="searchTableList()">查询</el-button>
            </div>
          </el-col>
        </el-form>
      </el-row>
    </div>
    <!--列表-->
    <div class="installment-cen">
      <el-table :data="applayList" class="table-div">
        <el-table-column prop="title" label="流程主题">
          <template slot-scope="scope">
            <p class="scope-p" @click="handlePush(scope.$index, scope.row)">{{ scope.row.title }}</p>
          </template>
        </el-table-column>
        <el-table-column prop="EmployeeName" label="发起人" width="180"></el-table-column>
        <el-table-column prop="flow_status" label="状态" width="180"></el-table-column>
        <el-table-column prop="zddate" label="发起时间" width="180"></el-table-column>
      </el-table>
      <div style="float:right">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </div>
    </div>

  </div>
</template>
<script>
import { getApplayList, toHistoryUrl } from "@/api/offerFlow";

export default {
  data() {
    return {
      applayList: [],
      themeForm: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },

      title: "",
      flow_status: "",
      startTime: "",
      endTime: "",
      // valueData:[],
      activeNameFirst: "first",
      pageSize: 10,
      total: 0,
      currentPage: 1,
      startTime: "",
      endTime: ""
    };
  },
  created() {
    this.getApplayList();
  },
  methods: {
    // 跳转
    periodizationClick() {
      this.$router.push({ path: "/discount/agingAndDiscount" });
    },
    discountClick() {
      this.$router.push({ path: "/discount/discount" });
    },
    handlePush(index, row) {
      //跳转到编制页面-继续编辑数据
      if (
        row.flow_statusCode == 2 ||
        row.flow_statusCode == 1 ||
        row.flow_statusCode == 5 ||
        row.flow_statusCode == 6||
        row.flow_statusCode == 7
      ) {
        this.$router.push({
          path: "/discount/agingAndDiscount",
          query: {
            json_id: row.json_id
          }
        });
        //审批中--跳转oa查看审批页面
      } else if (row.flow_statusCode == 3) {
        toHistoryUrl({
          proInstId: row.flow_id
        }).then(res => {
          window.open(res.data);
        });
      } else if (row.flow_statusCode == 4) {
        toHistoryUrl({
          proInstId: row.flow_id
        }).then(res => {
          window.open(res.data);
        });
      } else {
        this.$alert("此流程已结束或已删除,可重新发起!", "系统提示", {
          confirmButtonText: "确定"
        });
      }

      // 一揽子分期
      /*    if (this.tableData[index].flow_code === "My_Package_Stage") {

                    if (this.tableData[index].flowStatus === "流程草稿" || this.tableData[index].flowStatus === "未发起" || this.tableData[index].flowStatus === "撤回发起" || this.tableData[index].flowStatus === "驳回发起") {
                        // 编制
                        // console.log('分期流程草稿')
                        this.$router.push({
                            path: '/discount/periodization',
                            query: {BOID: this.tableData[index].jsonId}
                        })
                    } else {
                        // 流程渲染
                        console.log('分期流程预览')
                        this.$router.push({path: '/periodizationInfo', query: {BOID: this.tableData[index].jsonId}})
                    }
                } else {
                    if (this.tableData[index].flowStatus === "流程草稿" || this.tableData[index].flowStatus === "未发起" || this.tableData[index].flowStatus === "撤回发起" || this.tableData[index].flowStatus === "驳回发起") {
                        // 编制
                        console.log('折扣流程草稿编制')
                        this.$router.push({path: '/discount/discount', query: {BOID: this.tableData[index].jsonId}})
                    } else {
                        // 流程渲染
                        console.log('折扣流程预览')
                        this.$router.push({path: '/discountInfo', query: {BOID: this.tableData[index].jsonId}})
                    }
                }*/
      // alert(this.tableData[index].jsonId)
    },
    //   下边tabs页
    handleClickTabs(tab, event) {
      // console.log(tab, event);
    },
    //   分页
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.getApplayList();
    },
    handleCurrentChange(val) {
      //   console.log(`当前页: ${val}`);
      this.currentPage = val;
      this.getApplayList();
    },
    //   查询接口
    searchTableList() {
      this.getApplayList();
    },
    getApplayList() {
      getApplayList({
        flow_status: this.flow_status,
        pageIndex: this.currentPage,
        pageSize: this.pageSize,
        title: this.title,
        startTime: this.startTime
      }).then(res => {
        this.applayList = res.result.applayList;
        this.total = res.result.applayCount;
      });
    },
    getNow() {
      var date = new Date();
      var y = date.getFullYear();
      var m = date.getMonth() + 1;
      var d = date.getDate();
      var hour = date.getHours();
      var minute = date.getMinutes();
      var second = date.getSeconds();
      m = m < 10 ? "0" + m : m;
      d = d < 10 ? "0" + d : d;
      hour = hour < 10 ? "0" + hour : hour;
      minute = minute < 10 ? "0" + minute : minute;
      second = second < 10 ? "0" + second : second;
      return y + "-" + m + "-" + d;
    }
  },
  computed: {
    valueData: {
      get() {
        if (this.startTime && this.endTime) {
          return [this.startTime, this.endTime];
        } else {
          return "";
        }
      },

      set(t) {
        this.startTime = t[0];
        this.endTime = t[1];
      }
    }
  }
};
</script>
<style scoped lang="less">
.installment {
  padding: 12px;

  .installment-top {
    padding: 12px;
    background: #fff;
    border-radius: 4px;
    box-shadow: 0 0 8px #f1f1f1;
  }

  .installment-cen {
    padding: 12px;
    background: #fff;
    border-radius: 4px;
    width: 100%;
    float: left;
    margin-bottom: 12px;

    .table-div {
      border: 1px solid #f1f1f1;
      border-bottom: 0;
      width: 100%;

      .scope-p {
        color: #2761ff;
        cursor: pointer;
      }
    }
  }

  .tabs-bottom {
    width: 100%;
    clear: both;
    padding: 12px;
    background: #fff;
  }
}
</style>
