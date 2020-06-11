<template>
  <div class="app-container">
    <div class="container-header" v-loading="loading" element-loading-spinner="el-icon-loading"
         element-loading-background="rgba(0, 0, 0, 0.3)">
      <div class="fold-rule">
        <div class="grid-content bg-purple fold-rules">
          <el-button type="text" class="collapse-btn" @click="collapseHandler">{{activeNames === '0' ? '展开' : '隐藏'}}</el-button>
          <el-collapse v-model="activeNames" @change="handleChange" height="100px">
            <el-collapse-item title name="1">
              <div>
                <el-form ref="form" :model="form" label-width="170px">
                  <el-row :gutter="20">
                    <!--<el-col :span="7">
                      <div class="grid-content bg-purple">
                        <el-form-item label="渠道归属人:">
                          <el-input v-model="input" placeholder="渠道归属人"></el-input>
                        </el-form-item>
                      </div>
                    </el-col>
                    <el-col :span="7">
                      <div class="grid-content bg-purple">
                        <el-form-item label="案场归属人:">
                          <el-input v-model="inputy" placeholder="案场归属人"></el-input>
                        </el-form-item>
                      </div>
                    </el-col>-->

                  </el-row>
                </el-form>
              </div>
            </el-collapse-item>
          </el-collapse>
        </div>

        <div class="rule-zindex" style="">
          <el-form ref="form" :model="form" label-width="0px">
            <el-row :gutter="20">
              <el-col :span="4" style="margin-left:15px">
                <div class="grid-content bg-purple">
                  <el-form-item label="">
                    <el-input v-model="name" placeholder="客户姓名"></el-input>
                  </el-form-item>
                </div>

              </el-col>
              <el-col :span="4">
                <div class="grid-content bg-purple">
                  <el-form-item label="">
                    <el-input v-model="cMobile" placeholder="客户电话"></el-input>
                  </el-form-item>
                </div>

              </el-col>
              <el-col :span="4">
                <div class="grid-content bg-purple">
                  <el-form-item label="">
                    <el-input  v-model="reportUserName" placeholder="报备人姓名"></el-input>
                  </el-form-item>
                </div>

              </el-col>

            </el-row>
          </el-form>

        </div>

        <div>
          <div class="form-btn form-buttonng" style="padding-left:0; margin-top:8px;">
            <el-row>
              <el-button type="primary" @click="seach">搜索</el-button>
              <el-button type="primary" class="bgc_blue" @click="redistr">重分配</el-button>
              <el-button type="info" class="bgc_blue resit-style" @click="reset">重置</el-button>
            </el-row>
          </div>
      </div>
      <div class="task-table-list">
        <el-table
          ref="multipleTable"
          :data="tableData"
          tooltip-effect="dark"
          class="etable"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55">
            <!--<template slot-scope="scope">{{ scope.row.ProjectClueId }}</template>-->
          </el-table-column>
          <el-table-column prop="customerName" label="客户姓名"></el-table-column>
          <el-table-column prop="customerMobile" label="客户手机"></el-table-column>
          <el-table-column prop="clueStatus" label="客户状态"></el-table-column>
          <el-table-column prop="operationTime" label="加入公共池时间"></el-table-column>
          <el-table-column prop="reason" label="加入公共池原因"></el-table-column>
          <el-table-column prop="reportUserName" label="报备人员"></el-table-column>
          <el-table-column prop="reportTime" label="报备时间"></el-table-column>
          <el-table-column prop="salesAttributionName" label="原案场归属人"></el-table-column>
          <el-table-column prop="salesAttributionTime" label="原案场归属时间"></el-table-column>
        </el-table>
      </div>
      <div class="page-submit">
        <!-- 分页 -->
        <div class="block">
          <el-pagination
            :current-page="currentPage"
            :page-sizes="[10, 20, 50, 100]"
            :page-size="10"
            :pager-count="3"
            :total="total"
            layout="total, sizes, prev, pager, next, jumper"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </div>
      </div>
    </div>
    
  </div>
  </div>
</template>

<script>
import { selectAllPublic } from "@/api/table";
export default {
  filters: {},
  data() {
    return {
      loading: false,
      height: {
        height: ""
      },
      heightleft: {
        heightleft: ""
      },
      projectId: localStorage.getItem("pojid"),
      currentPage: 1,
      pageSize: 10,
      total: 10,
      activeNames: "0",
      options: [
        {
          value: "选项1",
          label: "全部"
        },
        {
          value: "选项2",
          label: "未到访"
        },
        {
          value: "选项3",
          label: "已到访"
        },
        {
          value: "选项4",
          label: "已认等"
        },
        {
          value: "选项5",
          label: "已认购"
        },
        {
          value: "选项6",
          label: "已签约"
        },
        {
          value: "选项7",
          label: "交易中"
        },
        {
          value: "选项8",
          label: "看房"
        }
      ],
      value: "",
      //筛选条件
      reportUserName: "", // 报备人姓名
      cMobile: "", // 电话
      name: "", // 姓名
      input: "",

      tableData: [],
      categorys: [
        {
          value: "选项1",
          label: "报备"
        },
        {
          value: "选项2",
          label: "到访"
        }
      ]
    };
  },
  created() {
    this.hh();
    this.getTableDataList();
  },
  methods: {
    hh() {
      this.height.height = window.innerHeight - 200 + "px";
      this.heightleft.height = window.innerHeight - 260 + "px";
      // console.log(this.height.height)
    },
    collapseHandler() {
      this.activeNames = this.activeNames === '0' ? '1' : '0';
    },
    // 折叠菜单
    handleChange(val) {
      console.log(val);
    },
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.getTableDataList();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
      this.getTableDataList();
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      let clueSelect_row_selected = sessionStorage.getItem(
        "clueSelect_row_selected"
      );
      if (clueSelect_row_selected == null || clueSelect_row_selected !== "")
        clueSelect_row_selected = "";
      for (let i = 0; i < this.multipleSelection.length; i++) {
        if (clueSelect_row_selected == "") {
          clueSelect_row_selected = this.multipleSelection[i].opportunityClueId;
        } else {
          clueSelect_row_selected =
            clueSelect_row_selected +
            "," +
            this.multipleSelection[i].opportunityClueId;
        }
      }
      sessionStorage.setItem(
        "clueSelect_row_selected",
        clueSelect_row_selected
      );
    },
    // 接收table列表
    getTableDataList() {
      this.loading = true;
      selectAllPublic({
        projectId: this.projectId,
        clueStatus: "",
        name: this.name,
        reportUserName: this.reportUserName,
        customerMobile: this.cMobile,
        size: this.pageSize,
        current: this.currentPage
      }).then(res => {
        console.log(res);
        //重新加载页面,或再次访问时,初始化所有的复选框
        sessionStorage.removeItem("clueSelect_row_selected");
        this.total = res.result.total;
        this.tableData = res.result.list;
        this.loading = false;
      });
    },
    redistr() {
      let clueSelects = sessionStorage.getItem("clueSelect_row_selected");
      let clueSelects2 = clueSelects && clueSelects.split(",");
      if (clueSelects == null || clueSelects == "") {
        this.$message({
          message: "至少选择一位用户！",
          type: "warning"
        });
        return;
      }
      if(clueSelects2.length>10 ){
        this.$message({
          message: "亲，目前只支持同时重分配十人哦！",
          type: "warning"
        });
        return;
      }

      this.$router.push({path: "redistributionnode", query: {tuokeOrAc: 2}});
      _paq.push(['trackEvent', '点击', '重分配', '案场参数---公共池重分配']);
    },
    seach(){
      this.getTableDataList();
      _paq.push(['trackEvent', '点击', '搜索', '案场参数---公共池搜索']);
    },
    reset(){
      this.name = "";
      this.cMobile = "";
      this.reportUserName = "";
      this.getTableDataList();
      _paq.push(['trackEvent', '点击', '搜索', '案场参数---公共池重置']);
    },
  }
};
</script>
<style scoped>
  .resit-style{
    color: #666 !important;
  }
el-collapse-item__wrap {
  width: 80% !important;
}
.el-collapse-item__wrap {
  border-bottom: 1px dashed #f0f0f0 !important;
}
.el-collapse-item__header {
  height: 56px !important;
}
.el-form-item {
  margin-bottom: 0 !important;
}
.bgc_blue,
.el-button--primary {
  border: 1px solid #f0f0f0 !important;
}
</style>
<style src="@/assets/css/rules.css" scoped>
</style>
<style>
  .grid-content .el-collapse-item__arrow {
    display: none !important;
  }
  .grid-content .noWarp {
    white-space: nowrap;
  }
</style>
