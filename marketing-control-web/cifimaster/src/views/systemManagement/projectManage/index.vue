<template>
  <div class="app-container">
    <div class="container-header">
      <!-- search -->
      <div class="search-top">
        <div class="search-top-left">
          <div>
            <el-input placeholder="请输入项目名称" v-model="projectNameSearch" clearable @change="clear"></el-input>
          </div>&nbsp;
          <el-select v-model="traderType" placeholder="请选择操盘方式">
            <el-option label="独立操盘" value="0" />
            <el-option label="联合操盘" value="1" />
            <el-option label="非操盘" value="2" />
          </el-select>&nbsp;
          <el-select v-model="projectStage" placeholder="请选择项目阶段">
            <el-option label="首开阶段" value="0" />
            <el-option label="续销阶段" value="1" />
            <el-option label="尾盘阶段" value="2" />
          </el-select>&nbsp;
          <el-select v-model="salesMasterType" placeholder="是否营销主操">
            <el-option label="是" value="1" />
            <el-option label="否" value="0" />
          </el-select>&nbsp;
          <el-select v-model="cifiAssumeMoney" placeholder="是否旭辉承担营销费用">
            <el-option label="是" value="1" />
            <el-option label="否" value="0" />
          </el-select>&nbsp;
          <el-select v-model="tenementWpProject" placeholder="是否物业尾盘去化项目">
            <el-option label="是" value="1" />
            <el-option label="否" value="0" />
          </el-select>

          <!-- <button @click="searchHandler">搜索</button> -->
          <div style="margin-left: 15px;">
            <el-date-picker
              v-model="time"
              type="month"
              v-if="$store.state.user.userPower.includes('生成月度计划')"
              placeholder="选择日期"
            ></el-date-picker>
          </div>

          <el-button type="primary" @click="searchHandler">搜索</el-button>
          <el-button
            type="primary"
            @click="createData(currtId, currtName)"
            v-if="$store.state.user.userPower.includes('生成月度计划')"
          >生成月度计划</el-button>
          <!-- <button @click="projectIn">引入项目</button> -->
          <el-button
            type="primary"
            @click="syncData(currtId, monthNum)"
            v-if="$store.state.user.userPower.includes('单项目同步供销存')"
          >同步供销存</el-button>

         <el-button type="primary" v-if="$store.state.user.userPower.includes('导出')" @click="exportFile">导出</el-button>
        </div>
      </div>
      <div class="e-el-row" :style="height">
        <el-row :gutter="20">
          <el-col :span="24">
            <div class="grid-content bg-purple">
              <el-table
                :data="tableData"
                class="etable"
                :style="heightleft"
                @selection-change="setRequest"
                highlight-current-row
                @current-change="isCurrt"
              >
                <el-table-column label="序号">
                  <template slot-scope="scope">
                    <input type="radio" name="is" class="defualtAdd" @click="isChecked" />
                    <span>
                      {{
                      tableData.findIndex(item => item == scope.row) + 1
                      }}
                    </span>
                  </template>
                </el-table-column>
                <el-table-column label="项目名称">
                  <template slot-scope="scope">
                    <el-popover trigger="hover" placement="top">
                      <p>{{ scope.row.ProjectName }}</p>
                      <div slot="reference" class="name-wrapper">
                        <el-tag size="medium">
                          {{
                          scope.row.ProjectName
                          }}
                        </el-tag>
                      </div>
                    </el-popover>
                  </template>
                </el-table-column>

                <el-table-column label="是否到面积段">
                  <template slot-scope="scope">
                    <span>{{ scope.row.flag == 1 ? "是" : "否" }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="是否月计划项目">
                  <template slot-scope="scope">
                    <span>{{ scope.row.monthlyType == 1 ? "是" : "否" }}</span>
                    <!-- <span>{{formLabelAlign.monthlyType}}</span> -->
                    <!-- <span>{{scope.row.monthlyType}}</span> -->
                  </template>
                </el-table-column>
                <el-table-column label="操盘方式">
                  <template slot-scope="scope">
                    <span>{{ scope.row.trader_type }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="项目阶段">
                  <template slot-scope="scope">
                    <span>{{ scope.row.project_stage }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="是否营销主操">
                  <template slot-scope="scope">
                    <span>{{ scope.row.sales_master_type }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="是否旭辉承担营销费用">
                  <template slot-scope="scope">
                    <span>{{ scope.row.cifi_assume_money }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="是否物业尾盘去化项目">
                  <template slot-scope="scope">
                    <span>{{ scope.row.tenement_wp_project }}</span>
                  </template>
                </el-table-column>
                <!--       <el-table-column label="是否周计划项目">
                  <template slot-scope="scope">
                    <span>{{ scope.row.monthlyType==1?'是':'否' }}</span>
                  </template>
                </el-table-column>-->
                <!--        <el-table-column label="是否首开计划项目">
                  <template slot-scope="scope">
                    <span>{{ scope.row.firstPlanType==1?'是':'否' }}</span>
                  </template>
                </el-table-column>-->
                <!-- 操作 -->
                <el-table-column
                  v-if="$store.state.user.userPower.includes('项目操作权限')"
                  label="操作"
                  width="180"
                >
                  <template slot-scope="scope">
                    <i class="el-icon-edit" @click="handleEdit(scope.$index, scope.row)" />
                    <i
                      type="danger"
                      class="el-icon-delete"
                      @click="handleDelete(scope.$index, scope.row)"
                    />
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </el-col>
        </el-row>

        <div class="block" style="margin-top:10px;float:right;">
          <el-pagination
            :current-page="currentPage"
            :page-sizes="[10, 20, 30, 50, 100]"
            :pager-count="5"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </div>
      </div>
      <!-- 项目列表 -->
      <el-drawer
        ref="YRdrawer"
        title="引入项目"
        :visible.sync="YRDrawer"
        direction="rtl"
        custom-class="demo-functionDrawer"
        size="70%"
      >
        <el-tree
          ref="YRtree"
          :data="YRtableData"
          show-checkbox
          node-key="ID"
          :props="YRdefaultProps"
        ></el-tree>
        <div class="btn" style="margin-left: 15px;margin-top: 15px;text-align: center;">
          <el-button type="primary" class="bgc_blue" @click="saveYR">保存</el-button>
        </div>
      </el-drawer>
      <!-- 弹窗编辑 -->
      <el-drawer
        title="项目属性"
        :visible.sync="drawer"
        :direction="direction"
        size="46%"
        style="font-size: 16px"
      >
        <el-form
          ref="formLabelAlign"
          :model="formLabelAlign"
          :rules="rules"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="项目名称" prop="ProjectName">
            <el-input :disabled="true" :value="formLabelAlign.ProjectName" />
          </el-form-item>
          <el-form-item label="是否到面积段" prop="flag">
            <el-select v-model="formLabelAlign.flag">
              <el-option label="是" value="1" />
              <el-option label="否" value="0" />
            </el-select>
          </el-form-item>
          <el-form-item label="项目阶段" prop="project_stage">
            <el-select v-model="formLabelAlign.project_stage">
              <el-option label="首开阶段" value="0" />
              <el-option label="续销阶段" value="1" />
              <el-option label="尾盘阶段" value="2" />
            </el-select>
          </el-form-item>
          <!--         <el-form-item label="操盘方式" prop="trader_type">
            <el-select v-model="formLabelAlign.trader_type">
              <el-option label="联合操盘" value="1" />
              <el-option label="独立操盘" value="0" />
              <el-option label="非操盘" value="2" />
            </el-select>
          </el-form-item>-->
          <el-form-item
            label="是否营销主操"
            v-if="formLabelAlign.trader_type == '联合操盘'"
            prop="sales_master_type"
          >
            <el-select v-model="formLabelAlign.sales_master_type">
              <el-option label="是" value="1" />
              <el-option label="否" value="0" />
            </el-select>
          </el-form-item>
          <el-form-item label="是否旭辉承担营销费用" prop="cifi_assume_money">
            <el-select v-model="formLabelAlign.cifi_assume_money">
              <el-option label="是" value="1" />
              <el-option label="否" value="0" />
            </el-select>
          </el-form-item>
          <el-form-item label="是否物业尾盘去化项目" prop="tenement_wp_project">
            <el-select v-model="formLabelAlign.tenement_wp_project">
              <el-option label="是" value="1" />
              <el-option label="否" value="0" />
            </el-select>
          </el-form-item>
          <!--     <el-form-item label="是否月计划项目" prop="monthlyType">
            <el-select v-model="formLabelAlign.monthlyType">
              <el-option label="是" value="1" />
              <el-option label="否" value="2" />
            </el-select>
          </el-form-item>-->
          <el-row style="margin-top: 15px">
            <el-button plain @click="drawer = false">取消</el-button>
            <el-button type="primary" plain @click="sureSave">确定</el-button>
          </el-row>
        </el-form>
      </el-drawer>
    </div>
  </div>
</template>

<script>
import {
  projectListSelect,
  projectDeleteUpdate,
  getTreeList,
  getTreeList2,
  updateProject,
  getWglProject,
  addGlProject
} from "@/api/table";
import { post, get,downLoad  } from "@/api/request";
import axios from "axios";
import $ from "jquery";
export default {
  filters: {},
  data() {
    return {
      currtRadio: "",
      monthNum: "",
      currtName: "",
      currtId: null,
      radio: "1",
      YRdefaultProps: {
        children: "children",
        label: "ProjectName"
      },
      YRDrawer: false,
      YRtableData: [],
      time: "",
      OrgNameID: "",
      treectrl: {
        children: "children",
        label: "OrgName"
      },
      treectrl2: {
        children: "children",
        label: "OrgName"
      },
      ////loading: true,
      datatree: [],
      datatree2: [],
      defaultProps: {
        children: "children",
        label: "label"
      },
      // 属性节点结束
      treeexit: false,
      treeexit2: false,
      title: "",
      creater: "wuyaoguang",
      projectNameSearch: "",
      traderType: "",
      projectStage: "",
      salesMasterType: "",
      cifiAssumeMoney: "",
      tenementWpProject: "",
      updateId: "",
      // 列表
      tableData: [],
      //   分页
      currentPage: 1,
      pageSize: 10,
      total: 0,
      //   弹窗
      drawer: false,
      direction: "rtl",
      drawer1: false,
      direction1: "rtl",
      //   新增用户
      labelPosition: "top",
      formLabelAlign: {
        ID: "",
        flag: "",
        monthlyType: "",
        ProjectName: "",

        name: "",
        region: "",
        type: "",
        ProjectNum: "",
        ProjectOrgID: "",
        Status: "",
        IsPrintStatus: "",
        projectId: "",
        AuthCompanyName: "",
        AuthCompanyId: "",
        // trader_type: "",
        project_stage: "",
        sales_master_type: "",
        cifi_assume_money: "",
        tenement_wp_project: ""
      },
      options: [
        {
          value: "选项1",
          label: "启用"
        },
        {
          value: "选项2",
          label: "禁用"
        }
      ],
      rules: {
        name: [{ required: true, message: "请输入名称", trigger: "change" }],
        ProjectOrgID: [
          { required: true, message: "请输入组织", trigger: "change" }
        ],
        /*  ProjectNum: [
          { required: true, message: "请输入编号", trigger: "change" }
        ],*/
        type: [{ required: true, message: "请选择状态", trigger: "change" }],
        Status: [{ required: true, message: "请选择", trigger: "change" }],
        IsPrintStatus: [
          { required: true, message: "请选择", trigger: "change" }
        ]
      },
      value: "",
      // 多选框
      checkList: [],
      checkList1: [],
      // 省市级
      mapJson: "map.json",
      province: "",
      sheng: "",
      shi: "",
      shi1: [],
      qu: "",
      qu1: [],
      city: "",
      block: "",
      height: {
        height: ""
      },
      heightleft: {
        height: ""
      },
      defaultExpandedKeys: [], // 默认展开二级菜单
      OrgNameID: ""
    };
  },
  created() {
    this.getTreeList1();
    this.getTreeList2();
    this.hh();
    this.getList();
  },
  methods: {
    exportFile(FileName, id, val, route) {
      let obj = {
        ProjectName: this.projectNameSearch,
        trader_type: this.traderType,
        project_stage: this.projectStage,
        sales_master_type: this.salesMasterType,
        cifi_assume_money: this.cifiAssumeMoney,
        tenement_wp_project: this.tenementWpProject
      };
      let _path = downLoad("/manager/exportProject", obj);
      window.location = _path;
    },
    isChecked(event) {},
    setRequest(val) {
      if (val) {
        val.forEach((item, index) => {
          this.isNeedId = item.project_id;
        });
        console.log(this.isNeedId);
      } else {
      }
    },
    isCurrt(currentRow) {
      if (!currentRow) {
        return;
      }
      console.log(currentRow);
      this.monthNum = currentRow.monthlyType;
      if (currentRow.ProjectName) {
        this.currtName = currentRow.ProjectName;
      }
      this.currtId = currentRow.project_id;
    },
    createData(id, projectName) {
      if (!this.time) {
        this.$message.error("请选择生成数据的日期");
        return;
      } else {
        let time = new Date(this.time).getAppointedFormatTime("yyyy-MM-dd");
        this.$confirm(`是否初始化月度计划的数据`).then(() => {
          get("/datainterface/yuezhibiao", { time: time }).then(res => {
            console.log(res);
            this.$message.success("初始化成功");
          });
        });
      }
    },

    gettreemsg(data) {
      if (data.children == "" || data.children == undefined) {
        if (data.OrgCategory == "4") {
          this.formLabelAlign.ProjectOrgName = data.OrgName;
          this.OrgNameID = data.ID;
          this.treeexit = false;
        }
      }
    },

    gettreemsg2(data) {
      if (data.OrgCategory == "1" || data.OrgCategory == "2") {
        this.formLabelAlign.AuthCompanyName = data.OrgName;
        this.formLabelAlign.AuthCompanyID = data.ID;
        this.treeexit2 = false;
      }
      // }
    },
    getTreeList1() {
      getTreeList({}).then(res => {
        this.datatree = res.data.content;
      });
    },
    getTreeList2() {
      getTreeList2({}).then(res => {
        this.datatree2 = res.data.content;
      });
    },
    handleNodeClick(data) {
      console.log(data);
    },

    focusHandler() {
      // console.log(234)
      this.treeexit = true;
    },
    focusHandler2() {
      this.treeexit2 = true;
    },
    // 获取高度
    hh() {
      this.height.height = window.innerHeight - 144 + "px";
      this.heightleft.height = window.innerHeight - 206 + "px";
      console.log(this.height.height);
    },

    sureSave() {
      this.$confirm(
        "是否确定修改项目【" + this.formLabelAlign.ProjectName + "】?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(() => {
          updateProject({
            ...this.formLabelAlign
          }).then(res => {
            this.drawer = false;
            console.log(res);
            _paq.push(["trackEvent", "点击", "保存", "编辑项目信息"]);

            this.$message.success(res.result.messages);
            this.getList();
          });
        })
        .catch(() => {
          this.drawer = false;
        });
    },
    statusChange() {
      console.log(this.checkList);
    },
    handleEdit(index, row) {
      this.drawer = true;
      this.formLabelAlign.ID = row.ID;
      this.formLabelAlign.ProjectName = row.ProjectName;
      this.formLabelAlign.trader_type = row.trader_type;
      this.formLabelAlign.project_stage = row.project_stage;
      this.formLabelAlign.sales_master_type = row.sales_master_type;
      this.formLabelAlign.cifi_assume_money = row.cifi_assume_money;
      this.formLabelAlign.tenement_wp_project = row.tenement_wp_project;
      this.formLabelAlign.flag = row.flag || "0";
      this.formLabelAlign.monthlyType = row.monthlyType || "2";
    },

    /* 删除通用岗位*/
    handleDelete(index, row) {
      this.$confirm(
        "是否确定将项目【" + row.ProjectName + "】永久删除?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      ).then(() => {
        console.log(row);
        projectDeleteUpdate({
          ID: row.ID
        }).then(res => {
          if (res.result == 1) {
            this.getList();
            _paq.push(["trackEvent", "点击", "删除", "删除项目"]);
          }
        });
      });
    },
    searchHandler() {
      this.currentPage = 1;
      this.getList();
      _paq.push(["trackEvent", "点击", "搜索", "搜索项目"]);
    },
    clear() {
      this.currentPage = 1;
      this.getList();
      _paq.push(["trackEvent", "点击", "搜索", "搜索项目"]);
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.getList();
    },
    handleCurrentChange(val, el) {
      document.querySelectorAll(".defualtAdd").forEach(item => {
        if (!item.checked) {
          return;
        } else {
          item.checked = false;
        }
      });
      console.log(`当前页: ${val}`);
      this.currentPage = val;
      this.getList();
    },
    // 弹窗关闭
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    getList() {
      projectListSelect({
        UserID: localStorage.getItem("id"),
        ProjectStatus: "",
        Status: "2",
        ProjectName: this.projectNameSearch,
        pageIndex: this.currentPage,
        pageSize: this.pageSize,
        trader_type: this.traderType,
        project_stage: this.projectStage,
        sales_master_type: this.salesMasterType,
        cifi_assume_money: this.cifiAssumeMoney,
        tenement_wp_project: this.tenementWpProject
      }).then(res => {
        console.log(res.result.total);
        this.total = res.result.total;
        this.tableData = res.result.list;
        this.loading = false;
      });
    },
    projectIn() {
      this.YRDrawer = true;
      getWglProject({}).then(res => {
        console.log(res);
        this.YRtableData = res.result;
      });
    },
    syncData(id, value) {
      // console.log('//////////////////////////',id)
      if (!id) {
        this.$message.error("请选择月度计划项目");
        return;
      }
      if (value != "1") {
        this.$message.error("该项目不是月度计划项目无法进行同步");
        return;
      }
      if (id && value == "1") {
        let time = new Date(this.time).getAppointedFormatTime("yyyy-MM-dd");
        console.log(time);
        this.$confirm(`是否同步${this.currtName}的数据`).then(() => {
          let href = process.env.VUE_APP_BASE_API;
          let load = this.$loading({
            // 声明一个loading对象
            lock: true, // 是否锁屏
            text: "正在加载...", // 加载动画的文字
            spinner: "el-icon-loading", // 引入的loading图标
            background: "rgba(0, 0, 0, 0.5)", // 背景颜色
            body: false,
            customClass: "mask" // 遮罩层新增类名
          });
          $.ajax({
            url: `${href}/datainterface/jituanByproject`,
            type: "post",
            dataType: "json",
            async: true,
            data: JSON.stringify({ projectId: id }),
            contentType: "application/json",
            timeout: 3600000,
            success: function(data) {
              load.close();
              alert("初始化成功");
              console.log(data);
            },
            error: function(e) {
              load.close();
              alert(JSON.stringify(e));
            }
          });
          // post("/datainterface/jituanByproject", {
          //   projectId: id
          // }).then(res => {
          //   this.$message.success("初始化成功");
          //   console.log(res);
          // });
        });
      }
    },
    saveYR() {
      this.$confirm("是否确定添加选中项目?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let projectList = this.$refs.YRtree.getCheckedNodes();
          if (projectList.length == 0) {
            this.YRDrawer = false;
            return;
          }
          addGlProject({
            projectList
          }).then(res => {
            this.YRDrawer = false;
            console.log(res);
            _paq.push(["trackEvent", "点击", "引入", "引入项目"]);
            this.$message.success("引入成功");
            this.getList();
          });
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  mounted() {}
};
</script>
<style lang="less" scoped>
.el-button--primary.is-plain {
  background: #2761ff !important;
  color: #fff !important;
}
.el-form-item.is-error .el-input__inner,
.el-form-item.is-error .el-input__inner:focus,
.el-form-item.is-error .el-textarea__inner,
.el-form-item.is-error .el-textarea__inner:focus,
.el-message-box__input input.invalid,
.el-message-box__input input.invalid:focus {
  border-color: 1px solid #f0f0f0;
}
.mask {
  z-index: 9999;
}
.tree-exit {
  width: 100%;
  position: relative;
}
.tree-div {
  position: absolute;
  z-index: 9999;
  border: 1px solid #f0f0f0;
  box-shadow: 0 0 8px #ebeef5;
  border-radius: 4px;
  width: 100%;
}
el-form-item__label {
  font-weight: normal;
}
.selectKang {
  .lr20 {
    margin: 0 20px;
  }
}
.el-drawer__body {
  padding: 0 20px;
}

.textRadio {
  margin-top: 15px;
  margin-bottom: 10px;
  h3 {
    font-weight: normal;
  }
  .oneRadio {
    margin-top: 10px;
    span {
      font-size: 14px;
    }
  }
}
</style>
<style src="@/assets/css/generalpost.less" lang="less" scoped></style>
