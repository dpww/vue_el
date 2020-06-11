<template>
  <div class="app-container">
    <div
      class="container-header"
      style="position: relative;"
      v-loading="loading"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.3)"
    >
      <el-collapse v-model="activeNames" @change="handleChange" height="100px">
        <el-collapse-item title name="1">
          <div class="fold-rule">
            <div class="duoXuan">
              <span class="duoXuan_title">成交类型:</span>
              <el-checkbox-group v-model="checkList">
                <el-checkbox label="1">中介成交</el-checkbox>
                <el-checkbox label="2">自渠成交</el-checkbox>
                <el-checkbox label="3">案场成交</el-checkbox>
              </el-checkbox-group>
            </div>
            <div class="duoXuan">
              <span class="duoXuan_title">客户状态:</span>
              <el-checkbox-group v-model="checkListStatus">
                <el-checkbox label="1">报备</el-checkbox>
                <el-checkbox label="2">到访</el-checkbox>
                <el-checkbox label="3">排小卡</el-checkbox>
                <el-checkbox label="4">排大卡</el-checkbox>
                <el-checkbox label="7">认购</el-checkbox>
                <el-checkbox label="8">签约</el-checkbox>
              </el-checkbox-group>
            </div>

            <div class="duoXuan">
              <span class="duoXuan_title">意向等级:</span>
              <el-checkbox-group v-model="checkListlabel">
                <el-checkbox label="A"></el-checkbox>
                <el-checkbox label="B"></el-checkbox>
                <el-checkbox label="C"></el-checkbox>
                <el-checkbox label="D"></el-checkbox>
              </el-checkbox-group>
            </div>

            <div
              class="lastKuang"
              style="margin-bottom: 8px;margin-left: 0px;box-sizing: border-box;"
            >
              <el-select v-model="selectTime" placeholder="请选择" class="hisFirst">
                <el-option
                  v-for="item in selectTimes"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>

              <el-date-picker
                v-model="dateselect"
                type="daterange"
                value-format="yyyy-MM-dd HH:mm:ss"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              ></el-date-picker>
            </div>
          </div>
        </el-collapse-item>
      </el-collapse>

      <div class="rule-zindex">
        <el-form ref="form" :model="form" label-width="0px">
          <el-row :gutter="20">
            <el-col :span="5" class="span-style">
              <div class="grid-content bg-purple">
                <el-form-item label>
                  <el-select v-model="value" placeholder="请选择" class="hisFirst">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                      class="optionvule"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </div>
            </el-col>
            <el-col :span="5">
              <div class="grid-content bg-purple">
                <el-form-item label>
                  <el-input v-model="variableParameters"></el-input>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
        </el-form>
      </div>

      <!--搜索-->

      <div style="margin-top: 0;border-top: 8px solid #fff;background: #fff;">
        <div class="form-btn form-buttonng" style="padding-left:0; margin-top:8px;">
          <el-row>
            <el-button type="primary" @click="seach">搜索</el-button>
            <el-button type="primary" class="bgc_blue" @click="redistr">重分配</el-button>
            <el-button type="info" @click="reset" class="resit-style">重置</el-button>
          </el-row>
        </div>
      </div>

      <!-- 全量数据说明：点击全量数据后，所有符合筛选条件（不包括规则）的客户将被选择，用于重分配 -->
      <!-- <div class="rule-introduce">全量数据说明：点击全量数据后，所有符合筛选条件（不包括规则）的客户将被选择，用于重分配</div> -->
      <!--<div>
        <button class="export el-icon-bottom" style="color:#60ABDF">查询导出</button>
        <button class="export el-icon-bottom" style="color:#60ABDF">最新报表</button>
      </div>-->
      <div class="task-table-list e-el-row" :style="height">
        <el-row :gutter="20">
          <el-col :span="24">
            <div class="grid-content bg-purple">
              <el-table
                ref="multipleTable"
                :data="tableData"
                tooltip-effect="dark"
                class="etable"
                @selection-change="handleSelectionChange"
                :style="heightleft"
              >
                <el-table-column type="selection" width="55">
                  <!--<template slot-scope="scope">{{ scope.row.ProjectClueId }}</template>-->
                </el-table-column>
                <el-table-column prop="rownum" label="序号" width="50"></el-table-column>
                <el-table-column prop="reportCreateTime" label="报备时间"></el-table-column>
                <el-table-column prop="customerName" label="客户姓名"></el-table-column>
                <el-table-column prop="customerMobile" label="客户电话"></el-table-column>
                <el-table-column prop="sourceType" label="成交类型"></el-table-column>
                <el-table-column prop="reportUserName" label="报备人"></el-table-column>
                <el-table-column prop="level" label="意向等级"></el-table-column>
                <el-table-column prop="clueStatus" label="客户状态"></el-table-column>
                <el-table-column prop="expectedVisitDate" label="预计到访时间"></el-table-column>
                <el-table-column prop="reportExpireDate" label="报备失效时间"></el-table-column>
                <el-table-column prop="tokerVisitExpireDate" label="渠道失效时间"></el-table-column>
                 <el-table-column label="操作">
                  <template slot-scope="scope">
                    <el-button type="primary" @click="selectDetals(scope.$index, scope.row)">查看详情</el-button>
                  </template>
                </el-table-column>
              </el-table>
              <div class="page-submit">
                <div></div>
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
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
import { getList, currProjectInfoSelect, SelectClueConditionClue } from "@/api/table";
import { getTableDataList } from "@/api/generalpost/index";
export default {
  filters: {},
  data() {
    return {
      loading: false,
      projectId: localStorage.getItem("pojid"),
      TokerResetType: "",
      currentPage: 1,
      pageSize: 10,
      total: 10,
      variableParameters: "",
      name: "",
      cMobile: "",
      clueStatus: "",
      reportUserName: "",
      activeNames: ["0"],
      options: [
        {
          value: "客户姓名",
          label: "客户姓名"
        },
        {
          value: "客户电话",
          label: "客户电话"
        },
        {
          value: "报备人姓名",
          label: "报备人姓名"
        }
      ],
      value: "客户姓名",
      selectTime: "报备时间",
      selectTimes: [
        {
          value: "报备时间",
          label: "报备时间"
        },
        {
          value: "报备失效时间",
          label: "报备失效时间"
        },
        {
          value: "渠道失效时间",
          label: "渠道失效时间"
        },
        {
          value: "预计到访时间",
          label: "预计到访时间"
        }
      ],
      startEndDate: "",
      owner: "",
      inp: "",
      dateselect: "",
      reportTime: "", // 报备时间
      date1: "",
      date2: "",

      ouser: "",
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
      ],
      checkList: [],
      checkListStatus: [],
      checkListlabel: [],
      height: {
        height: ""
      },
      heightleft: {
        height: ""
      }
    };
  },
  created() {
    this.hh();
    this.getTableDataList();
    this.currProjectInfoSelect();
  },
  methods: {
    // 获取高度
    hh() {
      this.height.height = window.innerHeight - 194 + "px";
      this.heightleft.height = window.innerHeight - 252 + "px";
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
          clueSelect_row_selected = this.multipleSelection[i].projectClueId;
        } else {
          clueSelect_row_selected =
            clueSelect_row_selected +
            "," +
            this.multipleSelection[i].projectClueId;
        }
      }
      sessionStorage.setItem(
        "clueSelect_row_selected",
        clueSelect_row_selected
      );
    },
    reset() {
      this.variableParameters = "";
      this.name = "";
      this.cMobile = "";
      this.reportUserName = "";
      this.checkList = [];
      this.checkListStatus = [];
      this.checkListlabel = [];
      this.dateselect = "";
      this.reportTime = "";
      this.date1 = "";
      this.date2 = "";
      this.getTableDataList();
      _paq.push(['trackEvent', '点击', '重置','渠道台账筛选功能重置按钮' ]);
    },
    seach() {
      if (this.dateselect != null) {
        this.date1 = this.dateselect[0];
        this.date2 = this.dateselect[1];
      } else {
        this.date1 = "";
        this.date2 = "";
      }
      if (this.selectTime == "报备时间") {
        this.reportTime = "1";
      } else if (this.selectTime == "报备失效时间") {
        this.reportTime = "2";
      } else if (this.selectTime == "预计到访时间") {
        this.reportTime = "3";
      } else if (this.selectTime == "渠道失效时间") {
        this.reportTime = "4";
      }

      if (this.value == "客户姓名") {
        this.name = this.variableParameters;
        this.cMobile = "";
        this.reportUserName = "";
      } else if (this.value == "客户电话") {
        this.name = "";
        this.cMobile = this.variableParameters;
        this.reportUserName = "";
      } else if (this.value == "报备人姓名") {
        this.name = "";
        this.cMobile = "";
        this.reportUserName = this.variableParameters;
      }
      this.getTableDataList();
    },
    // 接收table列表
    getTableDataList() {
      this.loading = true;
      getTableDataList({
        projectId: this.projectId,
        clueStatus: this.checkListStatus.join(","),
        customerName: this.name,
        customerMobile: this.cMobile,
        reportUserName: this.reportUserName,
        level: this.checkListlabel.join(","),
        sourceType: this.checkList.join(","),
        reportTime: this.reportTime,
        date1: this.date1,
        date2: this.date2,
        size: this.pageSize,
        current: this.currentPage
      }).then(res => {
        //重新加载页面,或再次访问时,初始化所有的复选框
        sessionStorage.removeItem("clueSelect_row_selected");
        this.total = res.result.total;
        this.tableData = res.result.list;
        this.loading = false;
        _paq.push(['trackEvent', '点击', '搜索','渠道台账搜索' ]);
      });
    },
    //查看规则
    currProjectInfoSelect(){
      currProjectInfoSelect({
        projectId:this.projectId
      }).then(res => {
        this.TokerResetType = res.result.TokerResetType;
      })
    },
    //重分配
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

      SelectClueConditionClue({
        clueSelects:sessionStorage.getItem("clueSelect_row_selected"),
        isResetType: this.TokerResetType
      }).then(res => {

        if(res.result.num!=clueSelects2.length){
          this.$message({
            message: "已选客户列表中包含不满足重分配条件的客户,请检查！",
            type: "warning"
          });
          return;
        }
        this.$router.push({path: "redistributionnode", query: {tuokeOrAc: 3}});
        _paq.push(['trackEvent', '点击', '重分配','渠道台账重分配' ]);
      })

    },
    //查看详情-跳转页面
    selectDetals(index,row){
      let projectClueId = row.projectClueId;
      this.$router.push({path: "/example/cluedetails", query: {projectClueId: projectClueId}});
      _paq.push(['trackEvent', '点击', '查看详情','渠道台账查看详情' ]);
    }
  }
};
</script>
<style lang='less' scoped>
  .resit-style{
    color: #666 !important;
  }
.el-col{
  margin-bottom: 0 !important;
}
.rule-zindex{
  top: 8px !important;
}
.span-style{
  margin-left: 8px !important;
}
.el-collapse-item__wrap {
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
.fold-rule {
  padding: 10px 15px 15px 20px;
  .el-checkbox-group {
    display: inline-block;
  }
  .ipt {
    width: 100%;
    height: 100%;
  }
  .el-input {
    display: inline-block;
    width: 250px;
    margin-right: 40px;
    border: 1px solid #aaa;
  }
  .duoXuan {
    margin-top: 15px;
    .duoXuan_title {
      font-size: 14px;
      margin-right: 15px;
    }
  }
  .lastKuang {
    margin-top: 15px;
    .hisFirst {
      width: 250px;
    }
    .el-date-editor {
      margin: 0 15px;
    }
    .btn {
      display: inline-block;
    }
  }
}
</style>
<style src="@/assets/css/rules.css" scoped>
</style>
