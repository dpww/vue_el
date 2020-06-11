<template>
  <div class="app-container">
    <div class="container-header"
         v-loading="loading" element-loading-spinner="el-icon-loading"
         element-loading-background="rgba(0, 0, 0, 0.3)">
      <div class="fold-rule">
        <div>
          <el-form :model="form" label-width="170px">
            <el-row :gutter="20">
              <el-col :span="5" class="bg-purple-input">
                <div class="grid-content bg-purple">
                  <el-form-item label="重分配原因:">
                    <el-select v-model="Reason" placeholder>
                      <el-option
                        v-for="item in categorys"
                        :key="item.value"
                        :label="item.DictName"
                        :value="item.DictCode"
                        class="optionvule"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="6">
                <div class="grid-content bg-purple rule-span">
                  <!--<span>新指派的人员：</span>-->
                  <el-form-item label="新指派的人员:">
                    <div style="justify-content: space-between;display: flex;">
                      <el-input v-model="accoutName" disabled="disabled"/>
                      <el-input v-model="newPeopleid" disabled="disabled" style="display: none;"/>
                      <el-input v-model="newPeoplePid" disabled="disabled" style="display: none;"/>
                      <el-button @click="choosePeople" type="primary">选择</el-button>
                    </div>
                  </el-form-item>
                </div>
              </el-col>
              <el-col :span="4" class="bg-purple-input">
                <el-form ref="form" :model="form" label-width="90px">
                  <el-form-item label="成交类型：">
                    <el-select v-model="channel" placeholder="非必填选项">
                      <el-option
                        v-for="item in chooseChannel"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                        class="optionvule"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-form>
              </el-col>
              <el-col :span="5" class="bg-purple-input">
                <el-form ref="form" :model="form" label-width="80px">
                  <el-form-item label="备注：">
                    <el-input v-model="remark"></el-input>
                  </el-form-item>
                </el-form>
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
                <el-table-column prop="rownum" label="序号" width="50"></el-table-column>
                <el-table-column prop="customerName" label="客户姓名"></el-table-column>
                <el-table-column prop="customerMobile" label="客户手机"></el-table-column>
                <el-table-column prop="clueStatus" label="客户状态"></el-table-column>
                <el-table-column prop="reportCreateTime" label="报备时间"></el-table-column>
                <el-table-column prop="theFirstVisitDate" label="到访时间"></el-table-column>
                <el-table-column prop="Card_Id" label="最近跟进时间"></el-table-column>
                <el-table-column prop="salesAttributionName===''?'wu':'yao' " label="原置业顾问"></el-table-column>
                <el-table-column prop="SalesAttributionTeamName" label="原销售团队"></el-table-column>
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
                <el-input v-model="inputName" placeholder="请输入内容"></el-input>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple">
                <el-button type="primary" @click="seachOnePeople">搜索</el-button>
              </div>
            </el-col>
          </el-row>

          <el-tree
            ref="peopleTree"
            highlight-current
            :data="functionData"
            node-key="ID"
            :default-expand-all="true"
            :props="functionDefaultProps"
          />

          <div class="input-bottom">
            <el-button type="primary" @click="submisssion">确认选择</el-button>
            <el-button type="info" @click="drawer = false">取消选择</el-button>
          </div>
        </div>
      </el-drawer>
    </div>
  </div>
</template>

<script>
import { getList, courtCase, selectAllPublic } from "@/api/table";
import { getTableDataList, redistribution, selectMan, getClueResetCause } from "@/api/generalpost/index";

export default {
  filters: {},
  data() {
    return {
      loading:false,
      height: {
        height: ""
      },
      heightleft: {
        height: ""
      },
      projectId: localStorage.getItem("pojid"),
      clueSelect_row_selected: sessionStorage.getItem("clueSelect_row_selected"),
      customID: sessionStorage.getItem("clueSelect_row_selected"),
      employeeName: localStorage.getItem("employeeName"),
      userid: localStorage.getItem("id"),
      tuokeOrAc: this.$route.query.tuokeOrAc,
      inputName:"",
      newPeopleid:"",
      newPeoplePid:"",
      Pname:"",
      functionData: [],
      functionDefaultProps: {
        children: 'children',
        label: 'EmployeeName'
      },


      chooseChannel:[
        {
          value:"3",
          label:"案场成交"
        }
      ],
      remark: "",
      channel:"", //成交类型
      Reason: "", // 重分配原因
      accoutName:"未选择",
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
      categorys: [],
      drawer: false,
      direction: "rtl",
      data: [
        {
          label: "",
          children: [
            {
              label: " ",
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
    console.log(this.clueSelect_row_selected)
    this.hh();
    this.getClueResetCause();
    if(this.tuokeOrAc=="3"){
      this.reassignPersonnel();
    }else if(this.tuokeOrAc=="4"){
      this.reassignPersonnel2();
    }else if(this.tuokeOrAc=="2"){
      this.reassignPersonnelpublic();
    }
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
    // 查询线索的数据
    reassignPersonnel() {
      getTableDataList({
        projectId: this.projectId,
        clueStatus: "",
        redistributionId: this.clueSelect_row_selected,
        size: 1000,
        current: 1
      }).then(res => {
        this.total = res.result.total;
        this.tableData = res.result.list;
      });
    },
    // 查询机会的数据
    // 接收table列表
    reassignPersonnel2() {
      courtCase({
        projectId: this.projectId,
        clueStatus: "",
        redistributionId: this.clueSelect_row_selected,
        size: 1000,
        current: 1
      }).then(res => {
        this.total = res.result.total;
        this.tableData = res.result.list;
      });
    },
    //公共池数据
    reassignPersonnelpublic(){
      selectAllPublic({
        projectId: this.projectId,
        clueStatus: "",
        redistributionId: this.clueSelect_row_selected,
        size: 1000,
        current: 1
      }).then(res => {
        this.total = res.result.total;
        this.tableData = res.result.list;
      });
    },
    // 点击重分配确定
    confirmRedis() {
      if(this.Reason===""){
        this.$message({
          message: '请选择重分配原因！',
          type: 'warning'
        });
        return;
      }
      if(this.accoutName==="未选择" || this.accoutName==="" ){
        this.$message({
          message: '请选择人员！',
          type: 'warning'
        });
        return;
      }
      if(this.remark===""){
        this.$message({
          message: '请填写备注！',
          type: 'warning'
        });
        return;
      }
      this.loading = true;
      redistribution({
        tuokeOrAc: this.tuokeOrAc,
        Reason: this.Reason,
        SaleID: this.newPeopleid,
        accoutName: this.accoutName,
        DoDesc: this.remark,
        ClueID: this.customID,
        UserID: this.userid,
        userName: this.employeeName,
        ProjectID: this.projectId,
        selectUserParent: this.newPeoplePid,
        Pname: this.Pname,
        channel:this.channel
      }).then(res => {
        this.loading = false;
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
            if(this.tuokeOrAc==3){
              this.$router.push("/example/redistribution");
            }else {
              this.$router.push("/theFieldManagement/redirectHistory");
            }

          });
        }
      });
    },
    //重分配原因
    getClueResetCause(){
      getClueResetCause({
        projectId: this.projectId
      }).then(res => {
        console.log(res.result)
        this.categorys = res.result;
      })
    },
    choosePeople(){
      let orgCategory = null;
      let JobCode = null;
      if(this.tuokeOrAc==3){
        orgCategory = 6;
        JobCode = 'nqgw';
      }else if(this.tuokeOrAc==4 || this.tuokeOrAc==2){
        orgCategory = 8;
        JobCode = 'zygw';
      }
      this.drawer = true;
      selectMan({
        projectId:this.projectId,
        orgCategory: orgCategory,
        employeeName: this.inputName,
        JobCode: JobCode
      }).then(res => {
        console.log(res);
        if(res.result!==null && res.result!==""){
          this.functionData = res.result.content;
        }
      });
    },
    // 查询单一的人
    seachOnePeople(){
      this.choosePeople();
    },
    // 返回上一步
    cancel(){
      this.$router.go(-1);
    },
    submisssion(){
      console.log(this.$refs.peopleTree.getCurrentNode());
      let levels = this.$refs.peopleTree.getCurrentNode().Levels;
      let size = this.$refs.peopleTree.getCurrentNode().children.length;
      let EmployeeName = this.$refs.peopleTree.getCurrentNode().EmployeeName;
      let id = this.$refs.peopleTree.getCurrentNode().ID;
      let pid = this.$refs.peopleTree.getCurrentNode().PID;
      if(levels==999 && size==0){
        this.accoutName = EmployeeName;
        this.newPeopleid = id;
        this.newPeoplePid = pid;
        this.drawer = false;
      }else {
        this.$message({
          message: '请选择人员',
          type: 'warning'
        });
      }

    }
  }
};
</script>
<style scoped>
  .el-form-item__content{
    margin-left: 0 !important;
  }
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
