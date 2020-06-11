<template>
  <div class="app-container group-box">
    <el-row :gutter="24" class="content e-el-row" :style="height" >
      <el-col :span="5">
        <div class="content-left" :style="heightleft">

          <el-tree ref="tree2"
            :data="data"
            node-key="id"
            :default-expanded-keys="defaultExpandedKeys"
            :props="defaultProps"
            :filter-node-method	="filterData"
                   :default-expand-all="b"
            highlight-current
            @node-click="handleNodeClick"
          />
        </div>
      </el-col>
      <el-col :span="19">
        <div class="content-right clearfix">
          <div class="btn btn-news">
            <el-button type="primary" class="bgc_blue" @click="getDatatreeForm">数据授权</el-button>

            <!-- <el-button type="info" class="bgc_blue" @click="addHandler">新增岗位</el-button> -->
            <el-button type="info" class="bgc_blue" @click="functionAuthorization">功能授权</el-button>
            <el-button type="primary" class="bgc_blue" @click="formAuthorization">报表授权</el-button>
          </div>
          <!-- 组织表单 -->
          <div class="earch-style" :style="heightlefttable">
          <el-table
            ref="postTable"
            :data="postTableData"
            class="etable"
            @select="handleSelected"
          >
            <el-table-column type="selection" width="55" />
            <el-table-column prop="JobName" label="岗位名称" />
            <el-table-column prop="CommonJobName" label="通用岗位" />
            <el-table-column prop="Status" label="状态" width="60" >
              <template slot-scope="scope">
              <span v-if="scope.row.Status===1">启用</span>
              <span v-else>禁用</span>
          </template>
            </el-table-column>
            <!-- <el-table-column prop="organisation" label="所属组织" />
            <el-table-column prop="sequence" label="排序号" />
            <el-table-column prop="ifDele" label="是否删除" />-->
            <el-table-column label="操作" width="100">
              <template slot-scope="scope">
                <i class="el-icon-edit" @click="editClick(scope.row)" />
                <i class="el-icon-delete" @click="delCurrent(scope.row)" />
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
          <!-- 分页 -->
          <div class="block" style="float:right;margin-bottom:12px;">
            <el-pagination
              :current-page="currentPage"
              :page-sizes="[10, 20, 30, 40]"
              :page-size="10"
              layout="total, sizes, prev, pager, next, jumper"
              :total="totalCount"
              style="margin-top: 10px"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
            />
          </div>
          </div>
          <div class="exiandiv"></div>
          <!-- 搜索框 -->
          <div class="earch-style" :style="heightlefttable">
          <div class="ser" style="clear:both;padding-top:12px;">
            <div class="ipt">
             <span>用户名称:</span>

              <el-input
                placeholder="请输入登录名/用户姓名"
                v-model="searchName"
                clearable
                @change="clear"
              >
              </el-input>
            </div>
            <el-button type="primary" class="bgc_blue" @click="userSearch">搜索</el-button>
            <!-- <div style="float: right">
              <el-button type="info" class="bgc_blue" @click="addUserShow">新增用户</el-button>
              <el-button type="primary" class="bgc_blue" @click="introduceUser">引入用户</el-button>
            </div> -->
          </div>

          <!-- 用户表单 -->
          <el-table :data="UserData" style="height:245px;" class="userMenu etable">
            <el-table-column prop="UserName" label="登录账号" width="180" />
            <el-table-column prop="EmployeeName" label="姓名" width="180" />
            <el-table-column prop="Gender" label="性别" />
            <el-table-column prop="OfficeTel" label="座机" />
            <el-table-column prop="Mobile" label="手机" />
            <el-table-column prop="OfficeMail" label="邮箱" />
            <el-table-column prop="Status" label="状态" width="60" />
            <el-table-column label="操作" width="100">
              <template slot-scope="scope">
                <i class="el-icon-edit" @click="editClickUserData(scope.row)" />
                <i class="el-icon-delete" @click="delCurrentUserData(scope.row)" />
              </template>
            </el-table-column>
          </el-table>

          <!-- 分页 -->
          <div class="block" style="float:right;margin-bottom:12px;">
            <el-pagination
              :current-page="UsercurrentPage"
              :page-sizes="[10, 20, 30, 40]"
              :page-size="10"
              layout="total, sizes, prev, pager, next, jumper"
              :total="UsertotalCount"
              style="margin-top: 10px"
              @size-change="HandleSizeChangeUser"
              @current-change="HandleCurrentChangeUser"
            />
          </div>
          </div>
        </div>
      </el-col>
    </el-row>

    <!-- 新增岗位和编辑岗位表单 -->
    <el-drawer
      ref="drawer"
      :title="optTitle"
      :visible.sync="dialog"
      direction="rtl"
      custom-class="demo-addDrawer"
      @open="handleClear1"
    >
      <el-form
        ref="addForm"
        :model="addForm"
        :rules="gangWeiRules"
        label-width="80px"
        class="demo-addForm"
      >
        <el-form-item label="岗位名称" prop="JobName">
          <el-input v-model="addForm.JobName" placeholder="请输入岗位名称" />
        </el-form-item>
        <el-form-item label="岗位描述">
          <el-input v-model="addForm.JobDesc" placeholder="请输入项目/组织名称" />
        </el-form-item>
        <el-form-item label="所属组织">
          <el-select v-model="addForm.JobOrgID" placeholder="请选择" style="width:100%">
            <el-option
              v-for="item in jobOrgList"
              :key="item.ID"
              :label="item.OrgName"
              :value="item.ID"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="通用岗位" prop="CommonJobID">
          <el-select v-model="addForm.CommonJobID" placeholder="请选择" style="width:100%">
            <el-option
              v-for="item in commonJobList"
              :key="item.ID"
              :label="item.JobDesc"
              :value="item.ID"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="上级岗位" prop="JobPID">
          <el-select v-model="addForm.JobPID" placeholder="请选择" style="width:100%">
            <el-option
              v-for="item in topJobList"
              :key="item.ID"
              :label="item.JobDesc"
              :value="item.ID"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="状态" prop="Status">
          <el-select v-model="addForm.Status" placeholder="请选择" style="width:100%">
            <el-option label="启用" value="1" />
            <el-option label="禁用" value="0" />
          </el-select>
        </el-form-item>
        <div class="demo-drawer__footer">
          <el-button @click="dialog = false">取 消</el-button>
          <el-button type="primary"  @click="saveJobInformation">确 定</el-button>
        </div>
      </el-form>
    </el-drawer>

    <!-- 新增用户和编辑用户表单 -->
    <el-drawer
      ref="drawer"
      :title="userTitle"
      :visible.sync="userDialog"
      direction="rtl"
      custom-class="demo-userDrawer"
      size="60%"
      @open="handleClearUser"
    >
      <el-form
        ref="userDrawer"
        :model="addUserForm"
        :rules="userRules"
        style="margin: 0 20px"
        label-width="100px"
        class="demo-addUserForm"
      >
        <el-form-item label="登陆账号" prop="UserName">
          <el-input v-model="addUserForm.UserName" placeholder="请输入登陆账号" width="100px" />
        </el-form-item>
        <el-form-item label="账号类型" prop="AccountType">
          <el-select v-model="addUserForm.AccountType" placeholder="项目" style="width: 100%">
            <el-option  label="Saas账号" :value="1" />
            <el-option label="普通账号" :value="2" />
          </el-select>
        </el-form-item>
        <el-form-item label="工号" prop="EmployeeCode">
          <el-input v-model="addUserForm.EmployeeCode" placeholder="请输入工号" />
        </el-form-item>
        <el-form-item label="姓名" prop="EmployeeName">
          <el-input v-model="addUserForm.EmployeeName" placeholder="请输入姓名" />
        </el-form-item>
        <el-form-item label="性别" prop="Gender">
          <el-select v-model="addUserForm.Gender" placeholder="请选择" style="width: 100%">
            <el-option label="男" :value="1" />
            <el-option label="女" :value="2" />
          </el-select>
        </el-form-item>
        <el-form-item label="办公电话" prop="OfficeTel">
          <el-input v-model="addUserForm.OfficeTel" placeholder="办公电话" />
        </el-form-item>
        <el-form-item label="移动电话" prop="Mobile">
          <el-input v-model="addUserForm.Mobile" placeholder="移动电话" />
        </el-form-item>
        <el-form-item label="邮箱" prop="OfficeMail">
          <el-input v-model="addUserForm.OfficeMail" placeholder="请输入邮箱" />
        </el-form-item>
        <el-form-item label="邮编" prop="PostCode">
          <el-input v-model="addUserForm.PostCode" placeholder="请输入邮编" />
        </el-form-item>
        <el-form-item label="状态" prop="Status">
          <el-select v-model="addUserForm.Status" placeholder="请选择" style="width: 100%">
            <el-option label="启用" :value="1" />
            <el-option label="禁用" :value="0" />
          </el-select>
        </el-form-item>
        <el-form-item label="密码" prop="Password">
          <el-input v-model="addUserForm.Password" placeholder="输入密码" type="password" />
        </el-form-item>
        <el-form-item label="地址" prop="Address">
          <el-input v-model="addUserForm.Address" placeholder="输入地址" />
        </el-form-item>
        <div class="demo-drawer__footer">
          <el-button @click="userDialog = false">取 消</el-button>
          <el-button type="primary" @click="addUser">确定</el-button>
        </div>
        <!-- <div slot="footer" class="dialog-footer">
          <el-button @click="editFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="modifyJobInfo">确 定</el-button>
        </div>-->
      </el-form>
    </el-drawer>

    <!-- 引入用户 -->
    <el-drawer
      ref="drawer"
      title="引入用户"
      :visible.sync="importUserDialog"
      direction="rtl"
      custom-class="demo-importUserDrawer"
      size="60%"
    >
      <div class="importUserTable">
        <div>
          <el-input v-model="input" placeholder="请输入登陆账号" style="width: 250px; margin-left: 20px" />
          <el-input v-model="input1" placeholder="请输入用户姓名" style="width: 250px;margin-left: 20px" />
          <el-button
            type="primary"
            class="bgc_blue"
            style="margin-left: 20px"
            @click="searchUser"
          >搜索</el-button>
        </div>

        <el-table
          ref="multipleTable"
          :data="userTableData"
          border
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55" />
          <el-table-column label="登陆账号" width="120">
            <template slot-scope="scope">{{ scope.row.alias }}</template>
          </el-table-column>
          <el-table-column prop="usercn" label="姓名" width="120" />
          <el-table-column prop="mobile" label="手机" show-overflow-tooltip />
          <el-table-column prop="status" label="状态" width="60" show-overflow-tooltip>
            <template slot-scope="scope">
              <span v-if="scope.row.status === 1 || scope.row.status === undefined">启用</span>
              <span v-else>禁用</span>
            </template>
          </el-table-column>
          <el-table-column prop="positionname" label="岗位名称" show-overflow-tooltip />
        </el-table>
        <el-pagination
          :current-page="currentPage"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="count"
          @size-change="userHandleSizeChange"
          @current-change="userHandleCurrentChange"
        />
        <div class="footer">
          <el-button @click="importUserDialog = false">取消</el-button>
          <el-button type="primary" @click="saveIntroducingUser">确定</el-button>
        </div>
      </div>
    </el-drawer>

    <!-- 功能授权 -->
    <el-drawer
      ref="drawer"
      title="功能授权"
      :visible.sync="functionDrawer"
      direction="rtl"
      custom-class="demo-functionDrawer"
      size="60%"
    >
      <el-tree
        ref="postTree"
        :data="functionData"
        show-checkbox
        node-key="ID"
        :default-expand-all="true"
        :default-checked-keys="defaultCheckeds"
        :props="functionDefaultProps"
        @check-change="handleCheckChange"
        />
      <div class="btn">
        <el-button type="primary" class="bgc_blue" @click="saveJobMenu">保存</el-button>
      </div>
    </el-drawer>
	<!-- 报表授权 -->
    <el-drawer
      ref="drawer2"
      title="报表授权"
      :visible.sync="formDrawer"
      direction="rtl"
      custom-class="demo-functionDrawer"
      size="60%"
      >
      <el-tree
        ref="formTree"
        :data="formData"
        show-checkbox
        node-key="ID"
        :default-expand-all="true"
        :default-checked-keys="formDefaultCheckeds"
        :props="formDefaultProps"
        @check-change="handleCheckChange" />
      <div class="btn">
        <el-button type="primary" class="bgc_blue" @click="seveReportForm">保存</el-button>
      </div>
    </el-drawer>
    	<!-- 数据授权 -->
    <el-drawer
      ref="dataDrawer2"
      title="数据授权"
      :visible.sync="dataDrawer"
      direction="rtl"
      custom-class="demo-functionDrawer"
      size="60%"
      >
      <el-tree
        ref="dataTree"
        :data="DataList"
        show-checkbox
        node-key="id"
        :default-expand-all="true"
        :default-checked-keys="dataDefaultCheckeds"
        :props="dataDefaultProps"
        :check-strictly="true"
        @check-change="handleCheckChange" />
      <div class="btn">
        <el-button type="primary" class="bgc_blue" @click="sevedata">保存</el-button>
      </div>
    </el-drawer>
  </div>
</template>
<script src='./index.js'>
</script>

<style lang="less" src='./index.less' scoped></style>
