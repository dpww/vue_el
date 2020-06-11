<template>
  <div class="app-container userManagement" >
    <div class="title clearfix title-hearder">
      <!-- 搜索框 -->
      <div class="ser">
        <div class="ipt">
          <span>用户名称:</span>
          <!--<el-input v-model="searchName" placeholder="登录名/用户姓名" class="ser-ipt" />-->
          <el-input
            placeholder="请输入登录名/用户姓名"
            v-model="searchName"
            clearable
            @change="clear"
          >
          </el-input>
        </div>
        <el-button class="btn bgc_blue" type="primary" @click="userSearch">搜索</el-button>
      </div>
      <!-- <el-button type="primary" style="float: right;margin-top: 20px" @click="dialog = true">新增用户</el-button> -->
    </div>
    <!-- 新增用户弹框 -->
    <el-drawer
      ref="drawer"
      title="新增用户"
      :before-close="handleClose"
      :visible.sync="dialog"
      direction="rtl"
      custom-class="demo-drawer"
      size="60%"
    >
      <el-form
        ref="ruleForm"
        :model="ruleForm"
        :rules="rules"
        style="margin: 0 20px"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="登陆账号" prop="organisation">
          <el-input v-model="ruleForm.organisation" placeholder="请输入登陆账号" width="100px" />
        </el-form-item>
        <el-form-item label="账号类型" prop="classify">
          <el-select v-model="ruleForm.organizationType" placeholder="项目">
            <el-option label="普通账号" value="shanghai" />
            <el-option label="会员账号" value="beijing" />
          </el-select>
        </el-form-item>
        <el-form-item label="账号属性" prop="classify">
          <el-select v-model="ruleForm.organizationType" placeholder="请选择">
            <el-option label="普通账号" value="shanghai" />
            <el-option label="会员账号" value="beijing" />
          </el-select>
        </el-form-item>
        <el-form-item label="所属公司" prop="classify">
          <el-select v-model="ruleForm.organizationType" placeholder="项目">
            <el-option label="区域一" value="shanghai" />
            <el-option label="区域二" value="beijing" />
          </el-select>
        </el-form-item>
        <el-form-item label="工号" prop="organisationName">
          <el-input v-model="ruleForm.organisationName" placeholder="请输入工号" />
        </el-form-item>
        <el-form-item label="姓名" prop="abbreviation">
          <el-input v-model="ruleForm.abbreviation" placeholder="请输入姓名" />
        </el-form-item>
        <el-form-item label="性别" prop="classify">
          <el-select v-model="ruleForm.organizationType" placeholder="请选择">
            <el-option label="男" value="shanghai" />
            <el-option label="女" value="beijing" />
          </el-select>
        </el-form-item>
        <el-form-item label="办公电话" prop="sortSize">
          <el-input v-model="ruleForm.sortSize" placeholder="办公电话" />
        </el-form-item>
        <el-form-item label="移动电话" prop="sortSize">
          <el-input v-model="ruleForm.sortSize" placeholder="移动电话" />
        </el-form-item>
        <el-form-item label="邮箱" prop="sortSize">
          <el-input v-model="ruleForm.sortSize" placeholder="请输入邮箱" />
        </el-form-item>
        <el-form-item label="邮编" prop="sortSize">
          <el-input v-model="ruleForm.sortSize" placeholder="请输入邮编" />
        </el-form-item>
        <el-form-item label="状态" prop="classify" width="60">
          <el-select v-model="ruleForm.organizationType" placeholder="请选择">
            <el-option label="启用" value="shanghai" />
            <el-option label="禁用" value="beijing" />
          </el-select>
        </el-form-item>
        <el-form-item label="所属组织" prop="classify">
          <el-select v-model="ruleForm.organizationType" placeholder="项目" disabled>
            <el-option label="上海旭辉集团" value="shanghai" />
          </el-select>
        </el-form-item>
        <el-form-item label="密码" prop="sortSize">
          <el-input v-model="ruleForm.sortSize" placeholder="输入密码" />
        </el-form-item>
        <div class="demo-drawer__footer">
          <el-button @click="dialog = false">取 消</el-button>
          <el-button
            type="primary"
            :loading="loading"
            @click="$refs.drawer.closeDrawer()"
          >{{ loading ? '提交中 ...' : '确 定' }}</el-button>
        </div>
      </el-form>
    </el-drawer>

    <el-row :gutter="24" class="content" :style="height">
      <el-col :span="5">
        <div class="content-left">
          <el-tree
            node-key="id"
            :data="treeData"
            :props="defaultProps"
            :default-expanded-keys="defaultExpandedKeys"
            @node-click="handleNodeClick"
            :style="heightleft"
          />
        </div>
      </el-col>
      <el-col :span="19">
        <div class="content-right">
          <el-table :data="tableData" class="etable" :style="heightleft">
            <el-table-column prop="RowNum" label="序号"/>
            <el-table-column prop="UserName" label="登录账号">
              <template slot-scope="scope">
                <span :title="scope.row.UserName">{{scope.row.UserName}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="EmployeeName" label="姓名" />
            <el-table-column prop="Mobile" label="手机">
              <template slot-scope="scope">
                <span :title="scope.row.Mobile">{{scope.row.Mobile}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="ProjectName" label="所属项目">
              <template slot-scope="scope">
                <span :title="scope.row.ProjectName">{{scope.row.ProjectName}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="JobName" label="岗位">
              <template slot-scope="scope">
                <span :title="scope.row.JobName">{{scope.row.JobName}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="OrgName" label="所属组织">
              <template slot-scope="scope">
                <span :title="scope.row.OrgName">{{scope.row.OrgName}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="Status" label="状态" width="60" />
            <el-table-column label="操作" width="100">
              <template slot-scope="scope">
                <i class="el-icon-edit" title="编辑" @click="editClick(scope.row)" />
                <i class="el-icon-delete" title="删除" @click="delCurrent(scope.row)" />
                <!-- <el-button
                  type="text"
                  icon="el-icon-edit"
                  circle
                  size="mini"
                  @click="editClick(scope.row)"
                />
                <el-button
                  type="text"
                  icon="el-icon-delete"
                  circle
                  size="mini"
                  @click="delCurrent(scope.row)"
                />-->
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            @size-change="handleSizeChange"
            :current-page="currentPage"
            @current-change="handleCurrentChange"
            :page-sizes="[10, 20, 30, 40]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="count"
            style="float:right;margin-top:10px;"
          />
        </div>
      </el-col>
    </el-row>

    <!-- 编辑菜单表单 -->
    <el-drawer title="编辑用户" :visible.sync="editFormVisible">
      <el-form :model="ruleForm" class="ruleForm-style" label-width="80px">
        <el-form-item label="登陆账号" prop="organisation" :label-width="formLabelWidth">
          <el-input v-model="ruleForm.UserName" placeholder="登陆账号" />
        </el-form-item>
        <el-form-item label="账号类型" prop="classify" :label-width="formLabelWidth">
          <el-select v-model="ruleForm.AccountType" placeholder="项目">
            <el-option label="普通账号" value="2" />
            <el-option label="Saas账号" value="1" />
          </el-select>
        </el-form-item>
        <!-- <el-form-item label="账号属性" prop="abbreviation" :label-width="formLabelWidth">
          <el-input v-model="ruleForm.AccountAttr" placeholder="请输入简称" />
        </el-form-item>-->
        <!-- <el-form-item label="所属公司" prop="abbreviation" :label-width="formLabelWidth">
          <el-input v-model="ruleForm.subordinateCompany" placeholder="请输入简称" />
        </el-form-item>-->
        <el-form-item label="工号" prop="jobNumber" :label-width="formLabelWidth">
          <el-input v-model="ruleForm.EmployeeCode" placeholder="工号" />
        </el-form-item>
        <el-form-item label="姓名" prop="userName" :label-width="formLabelWidth">
          <el-input v-model="ruleForm.EmployeeName" placeholder="姓名" />
        </el-form-item>
        <el-form-item label="性别" prop="classify" :label-width="formLabelWidth">
          <el-select v-model="ruleForm.Gender" placeholder="性别">
            <el-option label="男" value="1" />
            <el-option label="女" value="2" />
          </el-select>
        </el-form-item>
        <el-form-item label="办公电话" prop="classify" :label-width="formLabelWidth">
          <el-input v-model="ruleForm.OfficeTel" placeholder="办公电话" />
        </el-form-item>
        <el-form-item label="移动电话" prop="abbreviation" :label-width="formLabelWidth">
          <el-input v-model="ruleForm.Mobile" placeholder="移动电话" />
        </el-form-item>
        <el-form-item label="邮箱" prop="abbreviation" :label-width="formLabelWidth">
          <el-input v-model="ruleForm.OfficeMail" placeholder="邮箱" />
        </el-form-item>
        <el-form-item label="邮编" prop="abbreviation" :label-width="formLabelWidth">
          <el-input v-model="ruleForm.PostCode" placeholder="邮编" />
        </el-form-item>
        <el-form-item label="状态" prop="classify" :label-width="formLabelWidth" width="60">
          <el-select v-model="ruleForm.Status" placeholder="项目">
            <el-option label="启用" value="1" />
            <el-option label="禁用" value="0" />
          </el-select>
        </el-form-item>
        <!-- <el-form-item label="所属组织" prop="classify" :label-width="formLabelWidth">
          <el-select v-model="ruleForm.organizationType1" placeholder="项目">
            <el-option label="已离职" value="shanghai" />
            <el-option label="在职" value="beijing" />
          </el-select>
        </el-form-item>-->
        <el-form-item label="密码" prop="abbreviation" :label-width="formLabelWidth">
          <el-input v-model="ruleForm.abbreviation1" placeholder="请输入简称" />
        </el-form-item>
        <el-form-item label="地址" prop="organisation" :label-width="formLabelWidth">
          <el-input v-model="ruleForm.Address" placeholder="旭辉集团" />
        </el-form-item>
        <div style="margin-bottom: 20px;">
          <el-button @click="editFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitChange">确 定</el-button>
        </div>
      </el-form>

    </el-drawer>
  </div>
</template>

<script src='./userManagement.js'></script>
<style scoped>

</style>
<style scoped>
  .ruleForm-style{
    width: 80%;
    margin: auto;
  }
  .ruleForm-style .el-select{
    width: 100% !important;
  }
</style>
<style lang='less' src='./index.less' scoped></style>
