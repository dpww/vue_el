<template>
  <div class="app-container">
    <div class="container-header" style="position: relative;" v-loading="loading" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.3)">
      <el-collapse v-model="activeNames" @change="handleChange" height="100px">
        <el-collapse-item title name="1">

          <div class="fold-rule">

            <div class="duoXuan">
              <span class="duoXuan_title">意向等级: </span>
              <el-checkbox-group v-model="checkListlabel">
                <el-checkbox label="A"></el-checkbox>
                <el-checkbox label="B"></el-checkbox>
                <el-checkbox label="C"></el-checkbox>
                <el-checkbox label="D"></el-checkbox>
              </el-checkbox-group>
            </div>
            <div class="duoXuan">
              <span class="duoXuan_title">客户状态: </span>
              <el-checkbox-group v-model="checkListStatus">
                <el-checkbox label="2">到访</el-checkbox>
                <el-checkbox label="3">排小卡</el-checkbox>
                <el-checkbox label="4">排大卡</el-checkbox>
                <!--<el-checkbox label="5">订房</el-checkbox>
                <el-checkbox label="6">认筹</el-checkbox>-->
                <el-checkbox label="7">认购</el-checkbox>
                <el-checkbox label="8">签约</el-checkbox>
              </el-checkbox-group>
            </div>

            <div class="lastKuang" style="margin-bottom: 8px;margin-left: 0px;box-sizing: border-box;">
              <el-select v-model="selectTime" placeholder="请选择" class="hisFirst">
                <el-option
                  v-for="item in selectTimes"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>

              <el-date-picker
                v-model="dateselect"
                type="daterange"
                value-format="yyyy-MM-dd HH:mm:ss"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
              </el-date-picker>
            </div>
          </div>
        </el-collapse-item>
      </el-collapse>

      <div class="rule-zindex">
        <el-form ref="form" :model="form" label-width="0px">
          <el-row :gutter="20">
            <el-col :span="5">
              <div class="grid-content bg-purple">
                <el-form-item label="">
                  <el-input  v-model="name" placeholder="客户姓名"></el-input>
                </el-form-item>
              </div>

            </el-col>
            <el-col :span="5">
              <div class="grid-content bg-purple">
                <el-form-item label="">
                  <el-input  v-model="cMobile" placeholder="客户电话"></el-input>
                </el-form-item>
              </div>

            </el-col>
            <el-col :span="5">
              <div class="grid-content bg-purple">
                <el-form-item label="">
                  <el-input  v-model="SalesAttributionName" placeholder="置业顾问姓名"></el-input>
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
            <el-button type="primary" style="margin-left:15px;" @click="seach">搜索</el-button>
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
                <el-table-column prop="customerName" label="客户姓名"></el-table-column>
                <el-table-column prop="customerMobile" label="客户电话"></el-table-column>
                <el-table-column prop="salesAttributionName" label="置业顾问"></el-table-column>
                <el-table-column prop="clueStatus" label="客户状态"></el-table-column>
                <el-table-column prop="level" label="意向级别"></el-table-column>
                <el-table-column prop="sourceTypeDesc" label="成交类型"></el-table-column>
                <el-table-column prop="salesTheLatestFollowDate" label="最近跟进时间"></el-table-column>
                <el-table-column prop="theFirstVisitDate" label="首访时间"></el-table-column>
                <el-table-column prop="salesVisitExpireDate" label="失效时间"></el-table-column>
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
import { courtCase, currProjectInfoSelect, SelectClueConditionAC } from "@/api/table";
export default {
  filters: {},
  data() {
    return {
      loading: false,
      AnChangResetType: "",
      height: {
        height: ""
      },
      heightleft: {
        heightleft: ""
      },
      projectId: localStorage.getItem("pojid"),
      name: "",
      cMobile: "",
      clueStatus: "",
      SalesAttributionName:"", // 置业顾问
      variableParameters: "",
      currentPage: 1,
      pageSize: 10,
      total: 10,
      activeNames: ["0"],
      selectTime: "首访时间",
      dateselect:"",
      timeStatus:"",
      date1: "",
      date2: "",
      selectTimes: [
        {
          value: "首访时间",
          label: "首访时间"
        },{
          value: "最近跟进日期",
          label: "最近跟进日期"
        },{
          value: "失效时间",
          label: "失效时间"
        },{
          value: "报备时间",
          label: "报备时间"
        }
      ],
      checkList: [],
      checkListStatus: [],
      checkListlabel: [],
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
      value1: "",
      owner: "",
      input: "",
      inp: "",

      inputy: "",

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
      ]
    };
  },
  created() {
    this.hh();
    this.getTableDataList();
    this.currProjectInfoSelect();
  },
  methods: {
    hh() {
      this.height.height = window.innerHeight - 200 + "px";
      this.heightleft.height = window.innerHeight - 260 + "px";
      // console.log(this.height.height)
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
      console.log(this.multipleSelection);
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
      sessionStorage.setItem("clueSelect_row_selected", clueSelect_row_selected);
    },
    reset(){
      this.name = "";
      this.cMobile = "";
      this.SalesAttributionName = "";
      this.checkList = [];
      this.checkListStatus=[];
      this.checkListlabel=[];
      this.dateselect = "";
      this.timeStatus = "";
      this.date1 = "";
      this.date2 = "";
      this.getTableDataList();
    },
    seach(){
      this.date1 = this.dateselect[0];
      this.date2 = this.dateselect[1];
      if(this.selectTime=="首访时间"){
        this.timeStatus = "1";
      }else if(this.selectTime=="最近跟进日期"){
        this.timeStatus = "2";
      }else if(this.selectTime=="失效时间"){
        this.timeStatus = "3";
      }
      else if(this.selectTime=="报备时间"){
        this.timeStatus = "4";
      }
      this.getTableDataList();
      _paq.push(['trackEvent', '点击', '搜索','案场管理--机会台账搜索' ]);

    },
    // 接收table列表
    getTableDataList() {
      this.loading = true;
      courtCase({
        projectId: this.projectId,
        customerName: this.name,
        customerMobile: this.cMobile,
        salesAttributionName: this.SalesAttributionName,
        clueStatus: this.checkListStatus.join(","),
        level:this.checkListlabel.join(","),
        sourceType:this.checkList.join(","),
        reportTime:this.timeStatus,
        date1:this.date1,
        date2:this.date2,
        size: this.pageSize,
        current: this.currentPage
      }).then(res => {
        console.log(res);
        //重新加载页面,或再次访问时,初始化所有的复选框
        sessionStorage.removeItem("clueSelect_row_selected");
        this.total = res.result.total;
        this.tableData = res.result.list;
        this.loading=false;
      });
    },
    //查看规则
    currProjectInfoSelect(){
      currProjectInfoSelect({
        projectId:this.projectId
      }).then(res => {
        this.AnChangResetType = res.result.AnChangResetType;
      })
    },
    redistr() {
      let clueSelects = sessionStorage.getItem("clueSelect_row_selected");
      let clueSelects2 = clueSelects && clueSelects.split(",");
      console.log(clueSelects)
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

      SelectClueConditionAC({
        clueSelects:sessionStorage.getItem("clueSelect_row_selected"),
        isResetType: this.AnChangResetType
      }).then(res => {
        if(res.result.num!=clueSelects2.length){
          this.$message({
            message: "已选客户列表中包含不满足重分配条件的客户,请检查！",
            type: "warning"
          });
          return;
        }
        this.$router.push({path: "redistributionnode", query: {tuokeOrAc: 4}});
        _paq.push(['trackEvent', '点击', '重分配','案场管理--机会台账重分配' ]);
      })

    },
    //查看详情-跳转页面
    selectDetals(index,row){
      let projectClueId = row.projectClueId;
      let opportunityClueId = row.opportunityClueId;
      this.$router.push({path: "/theFieldManagement/redirectHistorydetails", query: {projectClueId: projectClueId,opportunityClueId:opportunityClueId}});
      _paq.push(['trackEvent', '点击', '重分配','案场管理--机会台账查看详情' ]);
    }
  }
};
</script>
<style  lang='less' scoped>
  .resit-style{
    color: #666 !important;
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
.fold-rule{
  padding: 10px 15px 15px 20px;
  .el-checkbox-group{
    display: inline-block;
  }
  .ipt{
    width: 100%;
    height: 100%;
  }
  .el-input{
    display: inline-block;
    width: 250px;
    margin-right:40px;
    border: 1px solid #aaa;
  }
  .duoXuan{
    margin-top: 15px;
    .duoXuan_title{
      font-size: 14px;
      margin-right: 15px;
    }
  }
  .lastKuang{
    margin-top: 15px;
    .hisFirst{
      width: 250px;
    }
    .el-date-editor{
      margin: 0 15px;
    }
    .btn{
      display: inline-block;
    }
  }
}
</style>
<style src="@/assets/css/rules.css" scoped>
</style>
