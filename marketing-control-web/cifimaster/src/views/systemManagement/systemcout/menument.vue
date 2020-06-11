<template>
  <div class="app-container">
    <div class="container-header" >
      <!-- search -->
      <div class="search-top">
        <div class="search-top-left">
        </div>
        <div class="search-top-right">
          <el-button type="primary" style="margin-left: 16px;" @click="addClick()">+新增菜单</el-button>
        </div>
      </div>
      <!-- 搜索下边 -->
      <el-row :gutter="20" class="e-el-row" :style="height">
        <el-col :span="5" class="height-span">
          <div class="grid-content bg-purple bg-purple-left" :style="heightleft">
            <el-tree
              ref="menuTree"
              :data="data"
              :props="defaultProps"
              node-key="id"
              :default-expanded-keys="defaultExpandedKeys"
              @node-click="handleNodeClick"
              :highlight-current="highlight"
            />
          </div>
        </el-col>
        <el-col :span="19">
          <div class="grid-content bg-purple bg-purple-right">
            <el-table :data="tableData" class="etable" :style="heightleft">
              <!-- <el-table-column type="selection" width="55"></el-table-column> -->
              <el-table-column label="显示名称">
                <template slot-scope="scope">
                  <el-popover trigger="hover" placement="top">
                    <p>显示名称: {{ scope.row.menuName }}</p>
                    <!-- <p>住址: {{ scope.row.address }}</p> -->
                    <div slot="reference" class="name-wrapper">
                      <!-- 显示的名字 -->
                      <el-tag size="medium">{{ scope.row.menuName }}</el-tag>
                    </div>
                  </el-popover>
                </template>
              </el-table-column>
              <!-- 管理名称-->
              <el-table-column label="管理名称">
                <template slot-scope="scope">
                  <span>{{ scope.row.menuSysName }}</span>
                </template>
              </el-table-column>
              <!-- 菜单地址 -->
              <el-table-column label="菜单地址">
                <template slot-scope="scope">
                  <span>{{ scope.row.url }}</span>
                </template>
              </el-table-column>
              <!-- 排序号 -->
              <el-table-column label="排序号" width="70">
                <template slot-scope="scope">
                  <span>{{ scope.row.listIndex }}</span>
                </template>
              </el-table-column>
              <!-- 默认页 -->
              <el-table-column label="默认页" width="70">
                <template slot-scope="scope">
                  <span>{{ scope.row.isHomePage==0?'否':'是' }}</span>
                </template>
              </el-table-column>
              <!-- 是否显示 -->
              <el-table-column label="是否显示" width="80">
                <template slot-scope="scope">
                  <span>{{ scope.row.isShow==0?'否':'是' }}</span>
                </template>
              </el-table-column>
              <!-- 是否末级 -->
              <el-table-column label="是否末级" width="80">
                <template slot-scope="scope">
                  <span>{{ scope.row.isLast==0?'否':'是' }}</span>
                </template>
              </el-table-column>
              <!-- 状态 -->
              <el-table-column label="状态" width="60">
                <template slot-scope="scope">
                  <span>{{ scope.row.status==1?'启用':'禁用' }}</span>
                </template>
              </el-table-column>
              <!-- 操作 -->
              <el-table-column label="操作" width="100px;">
                <template slot-scope="scope">
                  <i class="el-icon-edit" @click="handleEdit(scope.$index, scope.row)" />
                  <i class="el-icon-delete" @click="delCurrent(scope.$index, scope.row)" />
                  <!--<i
                    type="danger"
                    class="el-icon-delete"
                    @click="handleDelete(scope.$index, scope.row)"
                  />-->
                </template>
              </el-table-column>
            </el-table>
          </div>
         <div class="page-submit">

         <!-- 保存取消 -->
        <div class="form-btn">
          <!-- <el-row>
            <el-button type="primary" @click="updateRule">保存</el-button>
            <el-button type="info" plain>取消</el-button>
          </el-row> -->
        </div>
          <!-- 分页 -->
          <div class="block">
            <el-pagination
              :current-page="pageIndex"
              :page-sizes="[10, 20, 30, 40]"
              :page-size="pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
            />
          </div>

      </div>
        </el-col>
      </el-row>

      <!-- 新增菜单 -->
      <el-drawer
        :title=title
        :visible.sync="drawer"
        :direction="direction"
        :before-close="handleClose"
        class="input-drawer"
        @open="handleClear"
      >
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="显示名称" prop="name">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
          <el-form-item label="管理名称" prop="title">
            <el-input v-model="ruleForm.title"></el-input>
          </el-form-item>
          <el-form-item label="菜单连接" prop="menuurl">
            <el-input v-model="ruleForm.menuurl"></el-input>
          </el-form-item>
        <!--  <el-form-item label="菜单连接" prop="menuurl">
            <el-input v-model="ruleForm.menuurl"></el-input>
          </el-form-item>-->
          <el-form-item label="组件路径" prop="component">
            <el-input v-model="ruleForm.component"></el-input>
          </el-form-item>
          <el-form-item label="重定向路径" prop="redirect">
            <el-input v-model="ruleForm.redirect"></el-input>
          </el-form-item>
          <el-form-item label="菜单图标" prop="imgurl">
            <el-input v-model="ruleForm.imgurl"></el-input>
          </el-form-item>


          <el-form-item label="排序号">
            <el-input-number v-model="ruleForm.ids"  :min="1" :max="99" label="排序号"></el-input-number>
          </el-form-item>

          <el-form-item label="菜单类型" prop="menusType" width="60">
            <el-select v-model="ruleForm.menusType">
              <el-option label="菜单" value="1"></el-option>
              <el-option label="功能" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="状态" prop="region" width="60">
            <el-select v-model="ruleForm.region">
              <el-option label="启用" value="1"></el-option>
              <el-option label="禁用" value="0"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="是否需要授权" prop="isLast" width="60">
            <el-select v-model="ruleForm.isLast">
              <el-option label="是" value="1"></el-option>
              <el-option label="否" value="0"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
            <el-button @click="drawer = false">取消</el-button>
          </el-form-item>
        </el-form>
      </el-drawer>
    </div>
  </div>
</template>

<script>
import { getOrgTree,getChildeMenus,updateMenuStatus, addMenu,updateMenu,delMenu} from "@/api/org";

export default {
  filters: {},
  data() {
    return {
      heightleft:{
        height:''
      },
      height:{
        height:''
      },
      data: [],
      title: "添加菜单",
      defaultProps: {
        children: "children",
        label: "menuName",
        id: "id"
      },
      // 默认展开
      defaultExpandedKeys: [],
      // 列表
      tableData: [],
      parData: [],
      menuPid:"",
      level:"",
      //   弹窗
      drawer: false,
      pageIndex: 1,
      pageSize: 10,
      total: 0,
      id: "",
      direction: "rtl",
      //   新增用户
      labelPosition: "top",

      //   表格
      currentPage: 4,
      level : "",
      // 弹窗e-form
      ruleForm: {
        name: "",
        region: "1",
        ids: "1",
        title:"",
        desc: "",
        imgurl:"",
        menusType:"1",
        component:"",
        redirect:"",
        id:"",
        menuurl:"",
        isLast: "1"

      },
      highlight: false,
      loading: false,
      rules: {
        name: [
          { required: true, message: "请输入菜单名称！", trigger: "blur" },
          // { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],

        title: [
          { required: true, message: "请输入管理名称！", trigger: "blur" },
          // { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        menusType: [
          { required: true, message: "请选择菜单类型！", trigger: "change" },
          // { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        region: [
          { required: true, message: "请选择菜单状态！", trigger: "change" }
        ],
        component: [
          { required: true, message: "请输入组件路径！", trigger: "blur" }
        ],
        ids: [
            { required: true, message: "请输入排序号！", trigger: "blur" }
          ],
       menuurl: [
          { required: true, message: "请输入菜单链接！", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.handleNodeLoad();
    this.hh()
  },
  methods: {
      // 获取高度
    hh() {
      this.height.height = window.innerHeight - 144 + "px";
      this.heightleft.height = window.innerHeight - 206 + "px";
      console.log(this.height.height)
    },
    // 左侧tree树形数据渲染
    handleNodeLoad: function() {
      getOrgTree({}).then(res => {
        this.data = res.result.content;
        this.id=res.result.content[0].id;
        this.defaultExpandedKeys = [res.result.content[0].id];
        this.getChildeMenus();
        this.$nextTick(function() {
          this.$refs.menuTree.setCurrentKey(res.result.content[0].id);
        });
        this.level=res.result.content[0].levels;
        //this.loading=false;
      });
    },  // 左侧tree树形数据渲染
    handleNodeLoads() {
      getOrgTree({}).then(res => {
        this.data = res.result.content;
        this.getChildeMenus();
      });
    },
    handleClear() {
      if (!this.$refs.ruleForm) return;
      this.$refs.ruleForm.clearValidate(); // 移除该表单项的的校验结果
      this.$refs.ruleForm.resetFields(); // 对表单项 进行重置
    },
    addClick(){

     this.ruleForm={
       region: "1",
       ids: "1",
       menusType: "1",
       isLast: "1"
     };
      this.title="添加菜单";
      this.drawer = true
    },
    getChildeMenus(){
      getChildeMenus({
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
        id: this.id,
      }).then(res=>{
        this.tableData =res.result.list;
        this.total=res.result.total;
      })
    },
    // 删除
    delCurrent(index, row) {
      this.ruleForm.id = row.id;
      this.$confirm("确认删除该菜单吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
        this.delMenu();

          _paq.push(['trackEvent', '点击', '删除', '菜单管理---删除菜单']);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    //   tree左侧树形
    handleNodeClick(data) {
      this.id=data.id;
      this.level=data.levels;
      this.getChildeMenus();
    },

    // 表格
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageSize=val;
      this.getChildeMenus();
    },
    handleCurrentChange(val) {
      this.pageIndex=val;
      console.log(`当前页: ${val}`);
      this.getChildeMenus();
    },
    handleEdit(index, row) {
      this.ruleForm.name = row.menuName;
      this.ruleForm.title = row.menuSysName;
      this.ruleForm.menuurl = row.url;
      this.ruleForm.imgurl = row.imageUrl;
      this.ruleForm.iconurl = row.iconClass;
      this.ruleForm.ids = row.listIndex;
      this.ruleForm.id = row.id;
      this.ruleForm.redirect=row.redirect;
      this.ruleForm.component=row.component;
      this.ruleForm.isLast=row.isLast+"";

      if(row.status==1){
        this.ruleForm.region = '启用';
      }else {
        this.ruleForm.region = '禁用';
      }
      this.title = '编辑菜单';

      this.drawer = true;
    },
    handleDelete(index, row) {
      console.log(row);
      var tableList = this.tableData;
      tableList.splice(index, 1);
    },
    handleProhibit(index, row) {
      let status = null;
      let statusType = null;
      if(row.status==1){
        status=0;
        statusType="禁用";
      }else {
        status=1;
        statusType="启用";
      }
      this.$confirm('是否确定将参数【'+row.menuSysName+'】设为『'+statusType+'』?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        updateMenuStatus({
          "ID":row.id,
          "status":status
        }).then(res => {
          console.log(res);
          if (res.result == 0) {
            this.handleNodeLoads();
            this.defaultExpandedKeys=[this.id];
            this.highlight=true;
          }
        })
      })
    },
    addMenu(){
      addMenu({
        Url: this.ruleForm.menuurl,
        MenuSysName: this.ruleForm.title,
        component: this.ruleForm.component,
        redirect: this.ruleForm.redirect,
        MenuName: this.ruleForm.name,
        ImageUrl: this.ruleForm.imgurl,
        menusType: this.ruleForm.menusType,
        Status: this.ruleForm.region,
        pid: this.id,
        level: this.level + 1,
        userId: localStorage.getItem("id"),
        ids: this.ruleForm.ids,
        isLast: this.ruleForm.isLast
      }).then(res => {
        if(res.code==0){
          this.drawer = false;
          this.handleNodeLoads();
          this.defaultExpandedKeys=[this.id];
          this.highlight=true;
          this.$message({
            type: "success",
            message: "保存成功!"
          });
          this.ruleForm={ name: "",
            region: "1",
            ids: 1,
            title:"",
            desc: "",
            imgurl:"",
            menusType:"1",
            component:"",
            redirect:"",
            id:""};
          _paq.push(['trackEvent', '点击', '新增', '菜单管理---添加菜单']);
        }
      });
    },
    updateMenu(){
      updateMenu({
        Url: this.ruleForm.menuurl,
        MenuSysName: this.ruleForm.title,
        component: this.ruleForm.component,
        redirect: this.ruleForm.redirect,
        MenuName: this.ruleForm.name,
        ImageUrl: this.ruleForm.imgurl,
        menusType: this.ruleForm.menusType,
        Status: this.ruleForm.region,
        userId: localStorage.getItem("id"),
        ids: this.ruleForm.ids,
        ID: this.ruleForm.id
      }).then(res => {
        if(res.code==0){
          this.drawer = false;
          this.handleNodeLoads();
          this.defaultExpandedKeys=[this.id];
          this.highlight=true;
          this.$message({
            type: "success",
            message: "保存成功!"
          });
          this.ruleForm={ name: "",
            region: "1",
            ids: 1,
            title:"",
            desc: "",
            imgurl:"",
            menusType:"1",
            component:"",
            redirect:"",
            id:"",
            isLast: "1"
          };
          _paq.push(['trackEvent', '点击', '编辑', '菜单管理---修改菜单']);

        }
      });
    },
    delMenu(){
      delMenu({
          ID: this.ruleForm.id
        }).then(res => {
          if(res.code==0){
            this.handleNodeLoads();
            this.defaultExpandedKeys=[this.id];
            this.highlight=true;
            this.$message({
              type: "success",
              message: "保存成功!"
            });
            _paq.push(['trackEvent', '点击', '删除', '菜单管理---删除菜单']);

          }
        });

    },
    // 弹窗关闭
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    // 弹窗eform
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if(this.title=="添加菜单"){
            this.addMenu()
          }else if(this.title=='编辑菜单'){
            this.updateMenu()
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style src="@/assets/css/generalpost.less" lang="less" scoped>
</style>
