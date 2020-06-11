<template>
  <div class="app-container menuAdministrator-box">
    <div class="title clearfix">
      <h3>菜单/功能</h3>
      <el-button type="primary" style="float: right" @click="dialog = true">新增菜单</el-button>
    </div>

    <!-- 新增菜单  -->
    <el-drawer ref="drawer" title="添加菜单" :before-close="handleClose" :visible.sync="dialog" direction="rtl" custom-class="demo-drawer" size="50%">
      <el-form ref="ruleForm" :model="addRuleForm" :rules="rules" style="margin: 0 20px" label-width="100px" class="demo-ruleForm">
        <el-form-item label="显示名称" prop="organisation">
          <el-input v-model="addRuleForm.showName" placeholder="旭辉集团" width="100px" />
        </el-form-item>
        <el-form-item label="管理名称" prop="organisationName" :label-width="formLabelWidth">
          <el-input v-model="addRuleForm.guanLiName" placeholder="请输入项目/组织名称" />
        </el-form-item>
        <el-form-item label="菜单链接" prop="abbreviation">
          <el-input v-model="addRuleForm.menuLink" placeholder="请输入简称" />
        </el-form-item>
        <el-form-item label="图片链接" prop="abbreviation">
          <el-input v-model="addRuleForm.imgLink" placeholder="请输入简称" />
        </el-form-item>
        <el-form-item label="图标样式" prop="abbreviation">
          <el-input v-model="addRuleForm.iconStyle" placeholder="请输入简称" />
        </el-form-item>
        <el-form-item label="排序号" prop="abbreviation">
          <el-input v-model="addRuleForm.sortNumber" placeholder="0-255的数字" />
        </el-form-item>
        <el-form-item label="是否显示" prop="classify" :label-width="formLabelWidth">
          <el-select v-model="addRuleForm.ifShow" placeholder="项目">
            <el-option label="是" value="shanghai" />
            <el-option label="否" value="beijing" />
          </el-select>
        </el-form-item>
        <el-form-item label="是否为默认页" prop="classify" :label-width="formLabelWidth">
          <el-select v-model="addRuleForm.ifDefault" placeholder="项目">
            <el-option label="是" value="shanghai" />
            <el-option label="否" value="beijing" />
          </el-select>
        </el-form-item>
        <el-form-item label="是否为末级菜单" prop="classify" :label-width="formLabelWidth">
          <el-select v-model="addRuleForm.ifMenu" placeholder="项目">
            <el-option label="是" value="shanghai" />
            <el-option label="否" value="beijing" />
          </el-select>
        </el-form-item>
        <el-form-item label="状态" prop="classify" :label-width="formLabelWidth" width="60">
          <el-select v-model="addRuleForm.state" placeholder="项目">
            <el-option label="是" value="shanghai" />
            <el-option label="否" value="beijing" />
          </el-select>
        </el-form-item>
        <div class="demo-drawer__footer">
          <el-button @click="dialog = false">取 消</el-button>
          <el-button type="primary"  @click="$refs.drawer.closeDrawer()">{{ loading ? '提交中 ...' : '确 定' }}</el-button>
        </div>
      </el-form>
    </el-drawer>
    <el-row :gutter="24" class="content">
      <el-col :span="5">
        <div class="content-left">
          <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick" />
        </div>
      </el-col>
      <el-col :span="19">
        <div class="content-right">
          <el-table :data="tableData" border style="width: 100%">
            <el-table-column prop="name" label="组织名称" />
            <el-table-column prop="abbreviation" label="简称" />
            <el-table-column prop="organisation" label="所属组织" />
            <el-table-column prop="sequence" label="排序号" />
            <el-table-column prop="state" label="状态" width="60" />
            <el-table-column prop="ifDele" label="是否删除" />
            <el-table-column label="操作" width="100">
              <template slot-scope="scope">
                <el-button type="text" icon="el-icon-edit" circle size="mini" @click="editClick(scope.row)" />
                <el-button type="text" icon="el-icon-delete" circle size="mini" @click="delCurrent" />
              </template>
            </el-table-column>
          </el-table>
         <!-- <el-pagination
            style="margin-top: 20px"
            :current-page="currentPage4"
            :page-sizes="[20, 40, 60, 800,100]"
            :page-size="50"
            layout="total, sizes, prev, pager, next, jumper"
            :total="1"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />-->
        </div>
      </el-col>
    </el-row>

    <!-- 编辑菜单 -->
    <el-dialog title="编辑菜单" :visible.sync="editFormVisible">
      <el-form :model="editForm" label-width="80px">
        <el-form-item label="显示名称" prop="organisation" :label-width="formLabelWidth">
          <el-input v-model="editForm.showName1" placeholder="旭辉集团" />
        </el-form-item>
        <el-form-item label="管理名称" prop="organisationName" :label-width="formLabelWidth">
          <el-input v-model="editForm.guanLiName1" placeholder="请输入项目/组织名称" />
        </el-form-item>
        <el-form-item label="菜单链接" prop="abbreviation" :label-width="formLabelWidth">
          <el-input v-model="editForm.menuLink1" placeholder="请输入简称" />
        </el-form-item>
        <el-form-item label="图片链接" prop="abbreviation" :label-width="formLabelWidth">
          <el-input v-model="editForm.imgLink1" placeholder="请输入简称" />
        </el-form-item>
        <el-form-item label="图标样式" prop="abbreviation" :label-width="formLabelWidth">
          <el-input v-model="editForm.iconStyle1" placeholder="请输入简称" />
        </el-form-item>
        <el-form-item label="排序号" prop="abbreviation" :label-width="formLabelWidth">
          <el-input v-model="editForm.sortNumber1" placeholder="请输入简称" />
        </el-form-item>
        <el-form-item label="是否显示" prop="classify" :label-width="formLabelWidth">
          <el-select v-model="editForm.ifShow1" placeholder="项目">
            <el-option label="是" value="shanghai" />
            <el-option label="否" value="beijing" />
          </el-select>
        </el-form-item>
        <el-form-item label="是否为默认页" prop="classify" :label-width="formLabelWidth">
          <el-select v-model="editForm.ifDefault1" placeholder="项目">
            <el-option label="是" value="shanghai" />
            <el-option label="否" value="beijing" />
          </el-select>
        </el-form-item>
        <el-form-item label="是否为末级菜单" prop="classify" :label-width="formLabelWidth">
          <el-select v-model="editForm.ifMenu1" placeholder="项目">
            <el-option label="是" value="shanghai" />
            <el-option label="否" value="beijing" />
          </el-select>
        </el-form-item>
        <el-form-item label="状态" prop="classify" :label-width="formLabelWidth" width="60">
          <el-select v-model="editForm.state1" placeholder="项目">
            <el-option label="启用" value="shanghai" />
            <el-option label="禁用" value="beijing" />
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="editFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script src='./menuAdministrator.js'></script>

<style lang='less' src='./index.less'></style>
