<template>
  <div class="app-container">
    <div class="container-header">
      <div class="fold-rule">
        <div>
          <el-form :model="form" label-width="170px">
            <el-row :gutter="20">
              <el-col :span="7" class="bg-purple-input">
                <div class="grid-content bg-purple">
                  <el-form-item label="重分配原因:">
                    <el-select v-model="owner" placeholder>
                      <el-option
                        v-for="item in categorys"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                        class="optionvule"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="10">
                <div class="grid-content bg-purple rule-span">
                  <span>新指派的人员：</span>
                  <span>未选择</span>
                  <el-button @click="choosePeople" type="primary" style="margin-left: 16px;">选择</el-button>
                </div>
              </el-col>
            </el-row>
          </el-form>

        </div>
      </div>

      <div class="task-table-list e-el-row" :style="height">
        <div class="rule-introduce" style="margin-bottom:0;">被分配客户列表</div>
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
                <el-table-column prop="customerName" label="客户姓名"></el-table-column>
                <el-table-column prop="customerMobile" label="客户手机"></el-table-column>
                <el-table-column prop="clueStatus" label="客户状态"></el-table-column>
                <el-table-column prop="reportCreateTime" label="报备时间"></el-table-column>
                <el-table-column prop="theFirstVisitDate" label="到访时间"></el-table-column>
                <el-table-column prop="Card_Id" label="最近跟进时间"></el-table-column>
                <el-table-column prop="tokerAttributionName" label="原置业顾问"></el-table-column>
                <el-table-column prop="TokerAttributionTeamName" label="原销售团队"></el-table-column>
              </el-table>
            </div>
          </el-col>
          <!-- 保存取消 -->
          <div class="paddge-submit" style="padding-left:10px;">
            <div class="form-btn">
              <el-row>
                <el-button type="primary" @click="confirmRedis">确定</el-button>
                <el-button type="info" class="bgc_blue" @click="cancel">取消</el-button>
              </el-row>
            </div>
            <!-- 这里加分页 -->
          </div>
        </el-row>
      </div>

      <!-- 弹窗 -->
      <el-drawer
        title="选择人员"
        :visible.sync="drawer"
        :direction="direction"
        :before-close="handleClose"
      >
        <div class="input-mask">
          <el-row :gutter="20">
            <el-col :span="15">
              <div class="grid-content bg-purple">
                <el-input v-model="input" placeholder="请输入内容"></el-input>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple">
                <el-button type="primary">搜索</el-button>
              </div>
            </el-col>
          </el-row>

          <el-tree
            :data="functionData"
            node-key="ID"
            :default-expand-all="true"
            :props="functionDefaultProps"
          />

          <div class="input-bottom">
            <el-button type="primary" @click="submisssion">确认提交</el-button>
            <el-button type="primary" @click="drawer = false">取消提交</el-button>
          </div>
        </div>
      </el-drawer>
    </div>
  </div>
</template>

<script>
import { getList } from "@/api/table";
import { getTableDataList, redistribution, selectMan } from "@/api/generalpost/index";

export default {
  filters: {},
  data() {
    return {
      height: {
        height: ""
      },
      heightleft: {
        height: ""
      },
      projectId: localStorage.getItem("pojid"),
      customID: sessionStorage.getItem("clueSelect_row_selected"),
      employeeName: localStorage.getItem("employeeName"),
      userid: localStorage.getItem("id"),
      functionData: [],
      functionDefaultProps: {
        children: 'children',
        label: 'EmployeeName'
      },


      remark: "无",
      Reason: "1002",
      accoutName:"吴耀光",
      activeNames: ["1"],
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
      ],
      drawer: false,
      direction: "rtl",
      data: [
        {
          label: "",
          children: [
            {
              label: "",
              children: [
                {
                  label: ""
                }
              ]
            }
          ]
        }
      ],
      defaultProps: {
        children: "children",
        label: "label"
      }
    };
  },
  created() {
    this.hh()
    this.reassignPersonnel();
  },
  methods: {
    // 获取高度
    hh() {
      this.height.height = window.innerHeight - 146 + "px";
      this.heightleft.height = window.innerHeight - 272 + "px";
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
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    handleCheckChange(data, checked, indeterminate){
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
    },
    handleClose(done) {
      done();
    },
    handleNodeClick(data) {
      console.log(data);
    },
    reassignPersonnel() {
      getTableDataList({
        projectId: this.projectId,
        clueStatus: "",
        redistributionId: sessionStorage.getItem("clueSelect_row_selected"),
        size: 1000,
        current: 1
      }).then(res => {
        console.log(res);
        this.total = res.result.total;
        this.tableData = res.result.list;
      });
    },
    confirmRedis() {
      redistribution({
        tuokeOrAc: "4",
        Reason: this.Reason,
        SaleID: "123546",
        accoutName: this.accoutName,
        DoDesc: this.remark,
        ClueID: this.customID,
        UserID: this.userid,
        userName: this.employeeName,
        ProjectID: this.projectId,
        selectUserParent: "1"
      }).then(res => {
        if (res.result.code == -1) {
          this.$message({
            message: res.result.errmsg,
            type: "warning"
          });
        } else {
          this.$confirm(res.result.errmsg, "提示", {
            confirmButtonText: "确定",
            type: "success"
          }).then(() => {
            this.$router.push("redistribution");
          });
        }
      });
    },
    choosePeople(){
      this.drawer = true;
      selectMan({
        projectId:this.projectId,
        orgCategory:"8"
      }).then(res => {
        console.log(res);
        if(res.result!==null && res.result!==""){
          this.functionData = res.result.content;
        }
      });
    },
    cancel(){
      this.$router.push("clientManage");
    },
    submisssion(res){
      alert(this.$refs.tree.getCheckedKeys());
    }
  }
};
</script>
<style scoped>
.el-form-item {
  margin-bottom: 0 !important;
}
.fold-rule {
  padding: 8px 8px 0 8px;
  box-sizing: border-box;
}
.el-row {
  margin-bottom: 0;
}
.fenpei {
  justify-content: space-between;
  display: flex;
}
</style>

<style src="@/assets/css/rules.css" scoped>
</style>
