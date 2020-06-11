<template>
  <div class="app-container postAuthorization-box"
       >
    <div class="title clearfix title-right">
      <el-button type="primary" style="float: right" @click="handleAdd" class="bgc_blue">新增组织</el-button>
    </div>
    <el-row :gutter="24" class="content e-el-row" :style="height">
      <el-col :span="5">
        <div class="content-left" :style="heightleft">
          <!-- 树状图 -->
          <el-tree
            :data="treeData"
            :props="defaultProps"
            node-key="id"
            :default-expanded-keys="defaultExpandedKeys"
            @node-click="handleNodeClick"
            :highlight-current="highlight"
          />
        </div>
      </el-col>
      <el-col :span="19">
        <el-table :data="tableData" class="etable" :style="heightleft" >
          <el-table-column prop="orgName" label="组织名称"/>
          <el-table-column prop="orgShortName" label="简称"/>
          <el-table-column prop="pname" label="所属组织"/>
          <el-table-column prop="listIndex" label="排序号" width="80"/>
          <el-table-column prop="status" label="状态" width="60">
            <template slot-scope="scope">
              <span v-if="scope.row.status===1">启用</span>
              <span v-else>禁用</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="100">
            <template slot-scope="scope">
              <i class="el-icon-edit" @click="editClick(scope.row)"/>
              <i
                class="el-icon-setting"
                :icon="scope.row.status ? 'el-icon-video-pause' : 'el-icon-video-play'"
                circle
                size="mini"
                @click="editState(scope.$index)"
              />
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页 -->
        <!-- <div class="block">
          <el-pagination
            :current-page="currentPage1"
            :page-sizes="[100, 200, 300, 400]"
            :page-size="100"
            layout="total, sizes, prev, pager, next, jumper"
            :total="20"
            style="margin-top: 20px"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </div>-->
        <div class="block" style="margin-top:10px;float:right;">
          <el-pagination
            @size-change="handleSizeChange"
            :current-page="currentPage"
            @current-change="handleCurrentChange"
            :page-sizes="[5, 10, 20, 30]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="count"
            style="float:right;margin-top:10px;"
          />
        </div>
      </el-col>
    </el-row>

    <!-- 新增组织弹窗 -->
    <el-drawer
      ref="drawer"
      :title="optTitle"
      :visible.sync="dialog"
      direction="rtl"
      custom-class="demo-drawer"
      @open="handleClear"
    >
      <el-form
        ref="ruleForm"
        :model="ruleForm"
        :rules="rules"
        label-width="80px"
        class="demo-ruleForm"
      >

        <el-form-item label="所属组织">
          <el-input v-model="pnames" :disabled="readonly"/>
        </el-form-item>
        <el-form-item label="组织名称" prop="orgName">
          <el-input v-model="ruleForm.orgName" placeholder="请输入组织名称"/>
        </el-form-item>
        <el-form-item label="简称" prop="orgShortName">
          <el-input v-model="ruleForm.orgShortName" placeholder="请输入简称"/>
        </el-form-item>
        <el-form-item label="组织类型" width="100%" prop="orgCategory">
          <el-select v-model="ruleForm.orgCategory" @change="orgChange" placeholder="请选择类型">
            <el-option label="集团" :value="1"/>
            <el-option label="区域" :value="2"/>
            <el-option label="公司" :value="3"/>
            <el-option label="项目" :value="4"/>
            <el-option label="部门" :value="5"/>
            <el-option label="渠道团队" :value="6"/>
            <el-option label="中介团队" :value="7"/>
            <el-option label="内场团队" :value="8"/>
          </el-select>
        </el-form-item>
        <el-form-item v-if="resultType==7" label="中介公司" prop="orgName">
          <div>
            <el-select
              v-model="ruleForm.orgCompanyId"
              @change="setpojid"
              filterable
              default-first-option
              placeholder="请选择公司"
            >
              <el-option
                v-for="item in options"
                :key="item.ID"
                :label="item.companyName"
                :value="item.ID"
              ></el-option>
            </el-select>
          </div>

        </el-form-item>
  <!--     <el-form-item label="排序号" prop="listIndex">
          <el-input
            v-model.number="ruleForm.listIndex"
            min="0"
            max="99"
            type="number"
            placeholder="请输入[排序号(0-100)"
          />
        </el-form-item>-->
        <el-form-item label="排序号">
          <el-input-number v-model="ruleForm.listIndex"  :min="1" :max="99" label="排序号"></el-input-number>
        </el-form-item>
        <div class="demo-drawer__footer">
          <el-button @click="dialog = false">取 消</el-button>
          <el-button type="primary"  @click="handleSubmit">确定</el-button>
        </div>
      </el-form>
    </el-drawer>
  </div>
</template>
<script>
  import {
    getGroupList,
    queryChildsOrg,
    update,
    addDate,
    updateStatus,
    getAllCompanys
  } from "@/api/group";

  export default {
    name: "Group",
    filters: {},
    data() {
      return {
        height: {
          height: ""
        },
        heightleft: {
          height: ""
        },
        projects: [
          {
            name: "旭辉城",
            id: "d87e9d0a-5b2a-4f10-ba9c-5bb388587e95"
          },
          {
            name: "旭辉丰禄",
            id: "d87e9d0a-5b2a-4f10-ba9c-5bb388587e95"
          }
        ],
        //loading: false,
        //loading2: false,
        options: [],
        resultType: 0,
        currentProjectId: "d87e9d0a-5b2a-4f10-ba9c-5bb388587e95",
        // 当前选中组织
        current: {},
        // 左侧树状
        defaultExpandedKeys: [], // 默认展开二级菜单
        highlight: false,
        treeData: [],
        defaultProps: {
          children: "children", // 结构
          label: "orgName", // 标题
        },

        // 表格数据
        tableData: [],
        pnames: "",
        // 分页
        currentPage: 1,
        pageSize: 10,
        total: 10,
        readonly :true,
        // 新增组织
        dialog: false,
        optTitle: "",
        projectIds: "",
        count : 0,
        ruleForm: {
          companyName: "",
          listIndex: 1,
          orgCategory: 1,
          orgCompanyId: "",
        },
        // 表格校验
        rules: {
          orgCode: [
            {required: true, message: "组织代码不能为空", trigger: "blur"}
          ],
          orgName: [
            {required: true, message: "组织名称不能为空", trigger: "blur"}
          ],
          orgShortName: [
            {required: true, message: "简称不能为空", trigger: "change"}
          ],
          orgCategory: [
            {required: true, message: "请选择组织类型", trigger: "change"}
          ],

        }
      };
    },
    created() {
      //初始化数据，加载默认展示组织架构
      this.organizationAllDate();
      this.hh();
    },
    methods: {
      handleSizeChange(val) {
        this.pageSize = val;
        this.queryChildsOrg();
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        this.currentPage = val;
        this.queryChildsOrg();
        console.log(`当前页: ${val}`);
      },
      // 获取高度
      hh() {
        this.height.height = window.innerHeight - 140 + "px";
        this.heightleft.height = window.innerHeight - 206 + "px";
        // console.log(this.height.height)
      },
      setpojid(val) {
        console.log(val)
        // this.$set(this.ruleForm, companyName, val);
      },
      //组织类型改变事件
      orgChange() {
        this.getAllCompanys();
        this.resultType = this.ruleForm.orgCategory;
      },
      // 获取中介公司
      getAllCompanys() {
        getAllCompanys({}).then(res => {
          this.options = res.data;
        });
      },
      // 组织架构所有数据
      organizationAllDate() {
        getGroupList({
          isNeedShow: "1"
        }).then(res => {
          this.treeData = res.result.content;
          this.defaultExpandedKeys = [res.result.content[0].id]; // 获取第二层的id
          this.orgId = res.result.content[0].id;
          this.current = res.result.content[0];
          this.orgName=[res.result.content[0].orgName];
          this.pnames=res.result.content[0].orgName;
          this.loading=false;

          this.queryChildsOrg();
        });
      },  //获取用户数据
      // 新增组织
      handleAdd() {
        this.resultType = 0;
        this.ruleForm = {
          listIndex: 1
        };
      /*  this.ruleForm.pname = this.pname;*/
        this.optTitle = "新增组织";
        this.dialog = true;
      },
      submitForm(formName) {
        this.$refs[formName].validate(valid => {
          if (valid) {
            alert("submit!");
          } else {
            // console.log("error submit!!");
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },

      /* handleNodeClick(data) {
         this.current = data;

         this.tableData = data.children;
       },*/

      // 左侧部门列表点击事件
      handleNodeClick(data) {
        //this.loading2=true;
        this.orgId = data.id;
        this.orgName = data.orgName;
        this.pnames=data.orgName;
        this.projectIds=data.projectID;
        this.fullPaths = data.fullPath;
        this.highlight = true;
        this.pageSize=10;
        this.currentPage=1;
        this.queryChildsOrg();
        //this.loading2=false;
      },

      //获取用户数据
      queryChildsOrg() {
        queryChildsOrg({
          id: this.orgId,
          pageSize: this.pageSize,
          pageIndex: this.currentPage
        }).then(res => {
          //数据列表
          this.tableData = res.result.list;
          this.count = res.result.total;
          //this.loading=false;
        })
      },


      organizationAllDates() {
        getGroupList({
          isNeedShow: "1"
        }).then(res => {

          this.treeData = res.result.content;
          this.queryChildsOrg();
        });
      },


      // 显示编辑组织弹框
      editClick(row) {
        //alert(JSON.stringify(row))
        this.resultType = row.orgCategory;
        if (row.orgCategory == 7) {
          this.getAllCompanys();
        }

        let ruleForm = Object.assign({}, row);
        ruleForm.orgName = row.orgName;
        this.ruleForm = Object.assign({}, ruleForm);
        this.pnames =this.orgName;
        this.optTitle = "编辑组织";
        this.dialog = true;
      },
      handleClear() {
        if (!this.$refs.ruleForm) return;
        this.$refs.ruleForm.clearValidate(); // 移除该表单项的的校验结果
        this.$refs.ruleForm.resetFields(); // 对表单项 进行重置
      },
      // 提交新增或编辑
      handleSubmit() {
        this.$refs.ruleForm.validate(valid => {
          if (valid) {
            //this.loading=true
            // console.log(this.optTitle);
            if (this.optTitle === "新增组织") {
              // console.log(this.current);
              var pData = {
                pid: this.orgId,
                projectId: this.projectIds,
                fullPath: this.fullPaths,
                levels: Number(this.current.levels) + 1,
                orgCompanyId: this.ruleForm.orgCompanyId
              };
              var params = Object.assign(pData, this.ruleForm);
              addDate(params).then(res => {
                // console.log(res);
                // this.getGroupList()
                //var len = this.treeData.indexOf(this.current);
                /*this.treeData[len].children.push(res.result);
                if(this.treeData[len].children){
                  this.treeData[len].children.push(res.result);
                }else{
                  this.treeData[len].children=res.result;
                }
                this.tableData.push(res.result);*/
                //this.$router.go(0);
                this.organizationAllDates();
                this.defaultExpandedKeys = [this.orgId];
                this.highlight = true;
                 _paq.push(['trackEvent', '点击', '新增', '新增组织']);
                this.dialog = false;
              });
            } else {
              // 编辑
              var pData = {
                orgCompanyId: this.ruleForm.orgCompanyId
              };
              var params = Object.assign(pData, this.ruleForm);
              update(params).then(res => {
                // console.log(res);
                if (res.code === 0) {
                  this.dialog = false;
                  this.$message({
                    message: "修改成功",
                    type: "success",
                    duration: 800
                  });
                  // 重新刷新以下右侧页面
                  this.organizationAllDates();
                  this.defaultExpandedKeys = [this.orgId];
                  this.highlight = true;
                  _paq.push(['trackEvent', '点击', '编辑', '修改（编辑）组织']);
                  this.dialog = false;
                }
              });
            }
          } else {
            // console.log("error submit!!");
            return false;
          }
        });
      },
      // 修改状态
      editState(index) {
        const params = {
          id: this.tableData[index].id,
          status: this.tableData[index].status ? 0 : 1
        };
        // console.log(params.status)
        let type = null;
        if (params.status == 1) {
          type = "启用";
        } else {
          type = "禁用";
        }
        // console.log(this.tableData[index].status)
        // console.log(this.tableData[index].id)
        this.$confirm("是否确定将该组织的状态改为『" + type + "』?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          updateStatus({
            id: params.id,
            status: params.status
          }).then(res => {
            // console.log(res)
            //this.organizationAllDate();
            _paq.push(['trackEvent', '点击', '编辑', '修改组织状态']);
            this.queryChildsOrg();
          });
        });
      }

    }


  };
</script>
<style lang="less" scoped>
.demo-drawer .demo-ruleForm .el-form-item{
  width: 100% !important;
  margin-bottom: 22px !important;
}
  .title-right {
    padding: 8px;
    background: #fff;
    border: 1px solid #f0f0f0;
    box-shadow: 0 0 8px #ebeef5;
    border-radius: 4px;
  }

  .etable {
    width: 100%;
    margin-top: 15px;
    border: 1px solid #f0f0f0;
    border-bottom: none;
  }

  .postAuthorization-box {
    .title {
      > h3 {
        font-size: 16px;
        font-weight: normal;
      }
    }

    // 搜索框
    .ser {
      margin-top: 20px;
      font-size: 14px;
      float: left;

      .ipt {
        width: 320px;
        height: 42px;
        border: 1px solid #ccc;
        padding-left: 15px;
        font-size: 14px;
        display: inline-block;

        > span {
          font-size: 14px;
        }

        .el-input {
          width: 230px;

          > .el-input__inner {
            border: none;
          }
        }
      }

      .btn {
        width: 100px;
        height: 38px;
        margin-left: 20px;
      }
    }

    .content {
      // margin: 20px;
      margin-top: 12px;

      .content-left {
        // height: 500px;
        width: 100%;
        background: #fff;
        margin-top: 12px;
        overflow-x: auto;
        overflow-y: auto;
        border: 1px solid #f0f0f0;
      }
    }

    .el-drawer__body {
      margin: 0 20px;
    }
  }

  .demo-drawer {
    #el-drawer__title {
      font-size: 16px;
    }

    .demo-ruleForm {
      margin: 0 20px;

      .el-form-item {
        margin-bottom: 22px !important;
        width: 100%;
        .el-form-item__label {
          font-weight: normal;
        }

        .el-select {
          width: 100%;
        }
      }

      .demo-drawer__footer {
        margin-left: 50px;
      }
    }
  }
</style>
