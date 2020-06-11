<template>
  <div class="app-container companyManagement-box" >
    <div class="top">

     <!-- <el-input v-model="input" placeholder="公司名称" style="width: 276px"/>-->
      <el-input
        style="width: 276px"
        placeholder="请输入公司名称"
        v-model="input"
        clearable
        @change="clear1"
      >
      </el-input>
      <div class="relatedProjects relse" style="border-radius:4px;">


        <el-select
          v-model="value"
          filterable
          default-first-option
          placeholder="请选择关联项目"
          clearable
          @change="clear2"
          class="relatedProjects_text clearinnder"

        >
          <el-option
            v-for="item in options"
            :key="item.projectId"
            :label="item.label"
            :value="item.projectName"
          ></el-option>
        </el-select>
      </div>

    <el-date-picker
        v-model="value1"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        class="date"
        style=" height: 38px !important;"
        clearable>
      </el-date-picker>


      <el-button class="btn bgc_blue style-el-button" type="primary" @click="search">搜索</el-button>
    </div>
    <div class="button-btn">
      <el-button
        type="primary"
        class="bgc_blue fr"
        style=" padding: 10px 20px"
        @click="dialog = true"
      >+新增
      </el-button>
    </div>

    <!-- 公司表单 -->
    <div class="e-el-row" :style="height">
      <el-row :gutter="20">
        <el-col :span="24">
          <div class="grid-content bg-purple">
            <el-table :data="companyTableData" :style="heightleft" class="etable">
              <el-table-column label="序号" type="index" width="50"/>
              <el-table-column prop="companyName" label="公司名称" width="180"/>
              <el-table-column prop="companyCode" label="公司代码" width="180"/>
              <el-table-column prop="StartTime" label="有效开始日期"/>
              <el-table-column prop="EndTime" label="有效结束日期"/>
              <el-table-column prop="StatusDesc" label="是否启用"/>
              <el-table-column prop="EmployeeName" label="创建人"/>
              <el-table-column prop="CreateTime" label="创建时间" width="160"/>
              <el-table-column prop="EditTime" label="更新时间" width="160"/>
              <el-table-column prop="ProjectNames" label="关联项目" width="250"/>
              <el-table-column prop="operation" label="操作" width="100">
                <template slot-scope="scope">
                  <i class="el-icon-edit" @click="editClick(scope.row)"/>
                  <i class="el-icon-delete" @click="delCurrent(scope.row)"/>
                  <!-- <el-button class="delBorder" icon="el-icon-edit" circle size="mini" @click="editClick(scope.row)" />
                  <el-button class="delBorder" icon="el-icon-delete" circle size="mini" @click="delCurrent(scope.row)" />-->
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-col>
      </el-row>

      <div style="display:flex;justify-content:space-between;">
        <div></div>
        <div>
          <el-pagination
            class="fr"
            style="margin-top: 10px"
            :current-page="currentPage1"
            :page-sizes="[10, 20,30, 40]"
            @size-change="handleSizeChange"
            :page-size="10"
            @current-change="handleCurrentChange"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
          />
        </div>
      </div>
    </div>

    <!-- 新增公司弹窗 -->
    <el-drawer title="新增公司" :visible.sync="dialog" direction="rtl">
      <div class="demo-drawer__content content-style">
        <el-form :model="addCompanyForm"
                 class="add-el-form-item-style"
                 ref="addCompanyForm"
                 :rules="rules">
          <el-form-item label="公司名称" :label-width="formLabelWidth" placeholder="请输入公司名称" prop="name">
            <el-input v-model="addCompanyForm.name" autocomplete="off"/>
          </el-form-item>
          <el-form-item label="有效开始时间" :label-width="formLabelWidth" prop="StartDate">
            <el-date-picker v-model="value2" type="date" placeholder="选择日期" style="width: 100%"/>
          </el-form-item>
          <el-form-item label="有效结束时间" :label-width="formLabelWidth" prop="EndDate">
            <el-date-picker v-model="value3" type="date" placeholder="选择日期" style="width:100%"/>
          </el-form-item>
          <el-form-item label="是否启用" :label-width="formLabelWidth" v-model="radio1">
            <el-radio v-model="radio1" label="1" aria-checked="true">启用</el-radio>
            <el-radio v-model="radio1" label="2">禁用</el-radio>
          </el-form-item>
        </el-form>
        <div class="demo-drawer__footer">
          <el-button @click="dialog = false">取 消</el-button>
          <el-button type="primary"  @click="addDialog">确定</el-button>
        </div>
      </div>
    </el-drawer>
    <!-- 编辑公司 -->
    <el-drawer title="公司详情" :visible.sync="editDialog" direction="rtl">
      <div class="demo-drawer__content" style="width:100%">
        <el-form :model="editCompanyInfo">
          <el-form-item label="公司名称" :label-width="formLabelWidth">
            <el-input v-model="editCompanyInfo.companyName" autocomplete="off"/>
          </el-form-item>
          <el-form-item label="有效开始时间" :label-width="formLabelWidth">
            <el-date-picker
              v-model="editCompanyInfo.StartTime"

              type="date"
              placeholder="选择日期"
              style="width: 100%"
            />
          </el-form-item>
          <el-form-item label="有效结束时间" :label-width="formLabelWidth">
            <el-date-picker
              v-model="editCompanyInfo.EndTime"
              type="date"

              placeholder="选择日期"
              style="width:100%"
            />
          </el-form-item>
          <el-form-item label="是否启用" :label-width="formLabelWidth">
            <el-radio-group v-model="editCompanyInfo.Status">
              <el-radio :label=1>启用</el-radio>
              <el-radio :label="2">禁用</el-radio>
            </el-radio-group>

          </el-form-item>
        </el-form>

        <el-table :data="relatedProjectsData" border style="width: 100%">
          <el-table-column label="序号" type="index" width="50"/>
          <el-table-column prop="ProjectName" label="关联项目"/>
          <el-table-column prop="orgName" label="团队名称"/>
          <el-table-column prop="OrgTypeDesc" label="团队类型"/>
        </el-table>

        <el-pagination
          style="margin-top: 10px"
          :current-page="currentPage2"
          :page-sizes="[10, 20, 30, 40]"
          @size-change="handleSizeChange2"
          :page-size="100"
          @current-change="handleCurrentChange2"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total2"
        />

        <div class="demo-drawer__footer" style="margin-top:15px">
          <el-button @click="editDialog = false">取 消</el-button>
          <el-button type="primary" :loading="loading" @click="editCompany">确定</el-button>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script>
  import {
    getCompanyList,
    saveCompany,
    getAllProject,
    getRelProject,
    queryAssInforData,
    updateCompanyById,
    deleteCompanyById
  } from "@/api/company";

  export default {
    data() {
      return {
        height: {
          height: ""
        },
        heightleft: {
          height: ""
        },
        input: "",
        totalCount: 0,
        options: [],
        companyCode: "",
        value: "",
        // 时间
        value1: "",
        // 新增弹窗
        dialog: false,
        ////loading: true,
        addCompanyForm: {
          name: "",
          region: "",
          date1: "",
          date2: "",
          delivery: false,
          type: [],
          resource: "",
          desc: ""
        },

        // 表格校验
        rules: {
          name: [
            {required: true, message: "公司名称不能为空", trigger: "blur"}
          ]
          //StartDate: [
          //   {required: true, message: "请选择有效开始日期", trigger: "change"}
          // ],
          // EndDate: [
          //   {required: true, message: "请选择有效结束日期", trigger: "change"}
          // ]
        },

        formLabelWidth: "100px",
        total2: 0,
        // 单选框
        radio: "1",
        radio1: "1",
        value2: "",
        value3: "",
        // 公司表格
        companyTableData: [],
        // 编辑公司
        editDialog: false,
        // 关联项目
        relatedProjectsData: [],
        // 分页
        currentPage1: 1,
        currentPage2: 10,
        customerListData: [],
        editCompanyInfo: [],
        total: 0
      };
    },
    created() {
      this.hh();
      this.getAllProject();
      this.getCompanyList(null, null, null, this.currentPage2, this.currentPage1);
      
    },
    methods: {
      // 获取高度
      hh() {
        this.height.height = window.innerHeight - 210 + "px";
        this.heightleft.height = window.innerHeight - 276 + "px";
        console.log(this.height.height);
      },
      getCompanyList(keyword, date, projectName, pageSize, pageNum) {
        console.log(this.creater);
        getCompanyList({
          pageSize: pageSize,
          pageIndex: pageNum,
          companyName: keyword,
          date: date,
          projectName: projectName
        }).then(res => {
          this.total = res.result.total;
          this.companyTableData = res.result.list;
          console.log(this.companyTableData);
          _paq.push(['trackEvent', '点击', '搜索', '查询公司']);

        });
      },
      //新增公司
      saveCompany(data) {
        saveCompany({
          companyName: this.addCompanyForm.name,
          companyCode: this.companyCode,
          startTime: this.value2,
          endTime: this.value3,
          Status: this.radio1,
          companyAttr: 2,
          userId: localStorage.getItem("id")
        }).then(res => {
          _paq.push(['trackEvent', '点击', '新增', '新增中介']);
        });
      },

      //修改公司信息
      updateCompany(data) {
        updateCompanyById({
          companyName: this.editCompanyInfo.companyName,
          startTime: this.editCompanyInfo.StartTime,
          endTime: this.editCompanyInfo.EndTime,
          Status: this.editCompanyInfo.Status,
          companyId: this.editCompanyInfo.ID,
          //companyAttr: 2,
          userId: localStorage.getItem("id")
        }).then(res => {
          _paq.push(['trackEvent', '点击', '编辑', '编辑（修改）中介信息']);
          console.log(res);
        });
      },

      queryAssInforData(data) {
        queryAssInforData({
          pageSize: this.currentPage2,
          pageIndex: this.currentPage1,
          companyId: this.editCompanyInfo.ID
        }).then(res => {
          this.relatedProjectsData = res.result.list;
          this.total2 = res.result.total;
        });
      },

      //获取所有项目
      getAllProject() {
        getAllProject({}).then(res => {
          this.options = res.result;
        });
      },
      // 搜索
      search() {
        this.getCompanyList(
          this.input,
          this.value1,
          this.value,
          this.currentPage2,
          this.currentPage1
        );
      },   // 搜索
      clear1() {
        this.getCompanyList(
          this.input,
          this.value1,
          this.value,
          this.currentPage2,
          this.currentPage1
        );
      },
      clear2() {
        this.getCompanyList(
          this.input,
          this.value1,
          this.value,
          this.currentPage2,
          this.currentPage1
        );
      },

      // 新增公司确定按钮事件
      addDialog() {
        this.$refs.addCompanyForm.validate(valid => {
          if (valid) {
            this.saveCompany();
            this.getCompanyList(null, null, null, this.currentPage2, this.currentPage1);
            this.dialog = false;
            this.addCompanyForm = {};
            this.value2 = "";
            this.value3 = "";
          } else {
            return false;
          }
        })
      },
      // 编辑公司确定按钮事件
      editCompany() {

        this.editDialog = false;
        //this.loading = true;
        this.updateCompany();
        this.getCompanyList(null, null, null, this.currentPage2, this.currentPage1);
      },
      // 显示新增弹窗
      // 编辑
      editClick(companyInfo) {
        this.editCompanyInfo = companyInfo;
        this.editDialog = true;
        this.queryAssInforData();
      },
      // 删除
      delCurrent(row) {

        this.$confirm("确认删除该公司吗?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            deleteCompanyById({
              companyId: row.ID
            }).then(res => {
                if (res.result == 1) {

                  this.getCompanyList(null, null, null, this.currentPage2, this.currentPage1);
                  _paq.push(['trackEvent', '点击', '删除', '删除中介信息']);
                } else {
                  this.$message({
                    type: "success",
                    message: "删除失败!"
                  });
                  _paq.push(['trackEvent', '错误', '删除失败', '删除中介信息失败']);
                }
              }
            )
            this.$message({
              type: "success",
              message: "删除成功!"
            });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除"
            });
          });
      },
      handleSizeChange(val) {
        this.currentPage2 = val;
        this.getCompanyList(
          null,
          null,
          null,
          this.currentPage2,
          this.currentPage1
        );
      },
      handleSizeChange2(val) {
        this.currentPage2 = val;
        this.queryAssInforData(
          null,
          null,
          null,
          this.currentPage2,
          this.currentPage1
        );
      },
      handleCurrentChange(val) {
        this.currentPage1 = val;
        this.getCompanyList(
          null,
          null,
          null,
          this.currentPage2,
          this.currentPage1
        );
      },
      handleCurrentChange2(val) {
        this.currentPage1 = val;
        this.queryAssInforData(
          null,
          null,
          null,
          this.currentPage2,
          this.currentPage1
        );
      }
    }
  };
</script>

<style lang='less' scoped>
  .content-style {
    width: 80%;
    margin: auto;
  }

  .relse .el-select {
    width: auto !important;
  }

  .add-el-form-item-style .el-form-item {
    margin-bottom: 22px !important;
  }

  .relse .el-input__inner {
    border: 1px solid transparent;
  }

  .etable {
    width: 100%;
    border: 1px solid #f0f0f0;
    border-bottom: none;
  }

  .companyManagement-box {
    .top {
      padding: 8px;
      border-radius: 4px;
      background-color: #fff;
      border: 1px solid #f0f0f0;
      box-shadow: 0 0 8px #ebeef5;

      .relatedProjects {
        display: inline-block;
        margin-right: 15px;
        border: 1px solid #dcdfe6 !important;
        border: none;
        padding-left: 10px;

        > span {
          font-size: 14px;
        }

        .el-input__inner {
          border: none;
        }
      }

      .date {
        // margin-left: 15px;
        .el-range-separator {
          width: 7%;
        }
      }

      .btn {
        // margin-top: 10px;
        margin-left: 20px;
        // padding: 12px 30px;
      }
    }

    .el-drawer {
      .el-drawer__header {
        font-size: 14px;
      }

      .el-drawer__body {
        padding: 0 20px;
        width: 80% !important;
        margin: auto;

        .el-form-item {
          margin-bottom: 22px !important;
        }
      }
    }
  }

  .button-btn {
    width: 100%;
    padding: 8px;
    border: 1px solid #f0f0f0;
    box-shadow: 0 0 8px #ebeef5;
    background: #fff;
    border-radius: 4px;
    float: left;
    margin: 12px 0;
  }

  .button-btn button {
    float: right;
  }
</style>
