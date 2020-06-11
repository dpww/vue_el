<template>
  <div class="app-container">
    <div class="container-header">
      <!-- search -->
      <div class="search-top">
        <div class="search-top-left">
          <div>
            <el-input placeholder="请输入岗位名称" v-model="searchname" clearable @change="clear"></el-input>
          </div>
          <button @click="searchHandler">搜索</button>
        </div>
        <div class="search-top-right">
          <el-button
            type="primary"
            style="padding:10px 20px;height:36px;"
            @click="IDMAuthorization"
          >+新增IDM岗位</el-button>
          <!-- <el-button
            type="primary"
            style="padding:10px 20px;height:36px;"
            @click="formClick"
          >报表授权
          </el-button>-->
          <el-button type="primary" class="bgc_blue" @click="formAuthorization">报表授权</el-button>

          <el-button
            type="info"
            style="color:#666;border:1px solid #f0f0f0;padding:10px 20px;height:36px;"
            @click="functionAuthorization"
          >功能授权</el-button>
        </div>
      </div>
      <div class="e-el-row" :style="height">
        <el-row :gutter="20">
          <el-col :span="24">
            <div class="grid-content bg-purple">
              <el-table
                ref="postTable"
                :data="tableData"
                class="etable postTable"
                @select="handleSelected"
                :style="heightleft"
              >
                <el-table-column type="selection" width="55" />
                <el-table-column label="岗位名称">
                  <template slot-scope="scope">
                    <el-popover trigger="hover" placement="top">
                      <p>岗位名称: {{ scope.row.jobName }}</p>
                      <!-- <p>住址: {{ scope.row.address }}</p> -->
                      <div slot="reference" class="name-wrapper">
                        <!-- 显示的名字 -->
                        <el-tag size="medium">{{ scope.row.jobName }}</el-tag>
                      </div>
                    </el-popover>
                  </template>
                </el-table-column>
                <!-- 岗位描述 -->
                <el-table-column label="岗位描述">
                  <template slot-scope="scope">
                    <span>{{ scope.row.jobDesc }}</span>
                  </template>
                </el-table-column>
                <!-- 状态 -->
                <el-table-column label="状态" width="60">
                  <template slot-scope="scope">
                    <span>{{ scope.row.status==true?'启用':'禁用' }}</span>
                  </template>
                </el-table-column>
                <!-- 操作 -->
                <!-- <el-table-column label="操作" width="100">
                  <template slot-scope="scope">
                    <i class="el-icon-edit" @click="handleEdit(scope.$index, scope.row)"/>
                    <i
                      type="warning"
                      class="el-icon-setting"
                      @click="handleProhibit(scope.$index, scope.row)"
                    />
                    <i
                      type="danger"
                      class="el-icon-delete"
                      @click="handleDelete(scope.$index, scope.row)"
                    />
                  </template>
                </el-table-column>-->
              </el-table>
            </div>
          </el-col>
        </el-row>

        <div style="justify-content: space-between;display: flex;">
          <div></div>
          <div>
            <div class="block" style="margin-top:10px;">
              <el-pagination
                :current-page="currentPage"
                :page-sizes="[10, 20, 50, 100]"
                :pager-count="5"
                :page-size="pageSize"
                layout="total, prev, pager, next, jumper"
                :total="total"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- 弹窗新增加通用岗位 -->
      <el-drawer
        :title="title"
        :visible.sync="drawer"
        :direction="direction"
        :before-close="handleClose"
        @open="handleClear"
      >
        <!-- input-mask -->
        <el-form
          ref="formLabelAlign"
          :model="formLabelAlign"
          :rules="rules"
          label-width="80px"
          class="demo-ruleForm"
        >
          <el-form-item label="岗位名称" prop="name">
            <el-input v-model="formLabelAlign.name" />
          </el-form-item>
          <el-form-item label="岗位编码" prop="jobCode">
            <el-input v-model="formLabelAlign.jobCode" :disabled="readonly" />
          </el-form-item>
          <el-form-item label="岗位描述" prop="region">
            <el-input v-model="formLabelAlign.region" />
          </el-form-item>
          <el-form-item label="状态" prop="type" width="60">
            <el-select v-model="formLabelAlign.type" placeholder="启用">
              <el-option label="启用" value="1" />
              <el-option label="禁用" value="0" />
            </el-select>
          </el-form-item>
        </el-form>
        <el-row style="margin-top:20px;width:80%;margin:auto;">
          <el-button type="primary" plain @click="insertJobsOrUpdate">确定</el-button>
          <el-button plain @click="drawer = false">取消</el-button>
        </el-row>
      </el-drawer>
      <!-- 弹窗功能授权 -->
      <!--<el-drawer-->
      <!--title="功能授权"-->
      <!--:visible.sync="drawer1"-->
      <!--:direction="direction1"-->
      <!--:before-close="handleClose1"-->
      <!--&gt;-->
      <!--<el-row style="margin-top:20px;width:80%;margin:auto;">-->
      <!--<el-button type="primary" plain>确定</el-button>-->
      <!--<el-button plain>取消</el-button>-->
      <!--</el-row>-->
      <!--</el-drawer>-->
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
          @check-change="formCheckChange"
        />
        <div class="btn">
          <el-button type="primary" class="bgc_blue" @click="seveReportForm">保存</el-button>
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
          <el-button type="primary" class="bgc_blue" @click="saveCommonJobMenus">保存</el-button>
        </div>
      </el-drawer>
      <el-drawer
        ref="IDMdrawer"
        title="新增IDM岗位"
        :visible.sync="IDMDrawer"
        direction="rtl"
        custom-class="demo-functionDrawer"
        size="70%"
      >
        <div style="width: 40%;margin: 15px 0;margin-left: 33px;">
          <el-input placeholder="请输入搜索内容" v-model="searchIDM"></el-input>
        </div>

        <div style="overflow-y: auto;" :style="{height:IDMHeight}">
          <el-tree
            ref="IDMTree"
            :data="filterIDM"
            show-checkbox
            node-key="jobDefinitionsId"
            :default-expand-all="true"
            :default-checked-keys="IDMdefaultCheckeds"
            :props="IDMDefaultProps"
            @check-change="IDMhandleCheckChange"
            :check-strictly="true"
          />
        </div>
        <div class="btn" style="margin-left: 15px;margin-top: 15px;text-align: center;">
          <el-button type="primary" class="bgc_blue" @click="saveIDM">保存</el-button>
        </div>
      </el-drawer>
    </div>
  </div>
</template>

<script>
  import {
    getList,
    getChommenJobs,
    insertJobs,
    deleteJobs,
    updateJobs,
    systemCommonJobUpdate
  } from "@/api/table";
  import {getCommonAllMenus, saveCommonJobMenus,getReportForm,seveReportForm,seveReport__Form,getReport__Form} from "@/api/jobAuthorization";
  import {sendJSON,get} from "@/api/request";
  export default {
    filters: {},
    data() {
      return {
        heightleft: {
          height: ''
        },
        height: {
          height: ''
        },
        IDMHeight:window.innerHeight-200+'px',
        searchIDM:'',
        //loading: true,
        title: "新增通用岗位",
        creater: "",
        readonly: false,
        searchname: "",
        updateId: "",
        // 列表
        tableData: [],
        checkeds: true,
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
          name: "",
          region: "",
          type: "1",
          jobCode: ""
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
        // 表格校验
        rules: {
          name: [
            {required: true, message: "岗位名称不能为空", trigger: "blur"}
          ],
          jobCode: [
            {required: true, message: "岗位编码不能为空", trigger: "blur"}
          ],
          region: [
            {required: true, message: "岗位描述不能为空", trigger: "change"}
          ],
          /*type: [
            {required: true, message: "请输入项目", trigger: "change"}
          ],*/
        },
        value: "",
        // 功能授权
        functionDrawer: false,
        functionData: [],
        defaultCheckeds: [],
        functionDefaultProps: {
          children: "children",
          label: "NAME"
        },
        jobId: "",
        IDMDrawer: false,
        IDMData: [],
        defaultCheckeds: [],
        IDMdefaultCheckeds:[],
        IDMDefaultProps: {
          children: "children",
          label: "name"
        },
        formDrawer:false,
        formDefaultCheckeds:[],
        formDefaultProps:{
        children: 'children',
        label: 'NAME'
        },
        formData:[]

      };
    },
    computed:{
      filterIDM(){
        return this.IDMData.filter(item=>item.name.indexOf(this.searchIDM)!=-1);
      }
    },
    created() {
      this.getCommonJobs();
      this.hh()
    },
    methods: {
      renderContent(h, { node, data, store }){
        return (`<span class="custom-tree-node">
                    <span>{node.belongDepFullName}</span>
                    <span>{node.jobDefinitionsName}</span>
                  </span>`);
      },

      addcontent() {
        this.formLabelAlign = {
          name: "",
          region: "",
          type: "1",
          jobCode: ""
        };
        this.title = "新增通用岗位";
        this.drawer = true;
      },
      // 获取高度
      hh() {
        this.height.height = window.innerHeight - 144 + "px";
        this.heightleft.height = window.innerHeight - 206 + "px";
        console.log(this.height.height)
      },
      // 选择表格行
      handleSelected(_list, item) {

        var bol = !!_list.length;
        this.$refs.postTable.clearSelection();
        this.$refs.postTable.toggleRowSelection(item, bol);
        if (bol) {
          this.jobId = item.id;
        } else {
          this.jobId = "";
        }
      },
      // 编辑通用岗位
      handleEdit(index, row) {
        this.drawer = true;
        this.formLabelAlign.name = row.jobName;
        this.formLabelAlign.region = row.jobDesc;
        this.formLabelAlign.jobCode = row.jobCode;
        this.formLabelAlign.type = row.status == true ? "启用" : "禁用";
        this.updateId = row.id;
        this.readonly = true;
        this.title = "编辑通用岗位";
      },


      /* 删除通用岗位*/
      handleDelete(index, row) {
        this.$confirm("是否确定将岗位【" + row.jobName + "】永久删除?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          deleteJobs({
            id: row.id
          }).then(res => {
            console.log(res);
            if (res.result == 0) {
              this.getCommonJobs();
              _paq.push(['trackEvent', '点击', '删除', '删除岗位']);
            }
          });
        });
      },
      // 获取所有菜单
      getCommonAllMenus(data) {
        getCommonAllMenus({
          jobId: data
        }).then(res => {
          console.log(res.data);
          this.functionData = res.data.content;
          // this.defaultCheckeds = res.data.jobRelMenu.map(res => res.ID);
        });
      },
      handleProhibit(index, row) {
        console.log(row);
        let status = null;
        let statusType = null;
        if (row.status == true) {
          status = 0;
          statusType = "禁用";
        } else {
          status = 1;
          statusType = "启用";
        }
        this.$confirm(
          "是否确定将岗位【" +
          row.jobName +
          "】的状态修改为『" +
          statusType +
          "』?",
          "提示",
          {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          }
        ).then(() => {
          console.log(status);
          updateJobs({
            status: status,
            id: row.id
          }).then(res => {
            console.log(res);
            if (res.result == 0) {
              _paq.push(['trackEvent', '点击', '编辑', '修改岗位状态']);
              this.getCommonJobs();
            }
          });
        });
      },
      searchHandler() {
        this.currentPage = 1;
        this.getCommonJobs();
      },
      clear() {
        this.getCommonJobs();
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.pageSize = val;
        this.getCommonJobs();
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.currentPage = val;
        this.getCommonJobs();
      },
      // 弹窗关闭
      handleClose(done) {
        this.$confirm("确认关闭？")
          .then(_ => {
            done();
          })
          .catch(_ => {
          });
      },
      getCommonJobs() {
        console.log(this.pageSize);
        getChommenJobs({
          authCompanyId: "ede1b679-3546-11e7-a3f8-5254007b6f02",
          productId: "ee3b2466-3546-11e7-a3f8-5254007b6f02",
          jobName: this.searchname,
          size: this.pageSize,
          current: this.currentPage
        }).then(res => {
          this.total = res.result.total;
          this.tableData = res.result.list;
          this.jobId = res.result.productId;
          //this.loading = false;
        });
      },

      insertJobss() {
        insertJobs({
          authCompanyId: "ede1b679-3546-11e7-a3f8-5254007b6f02",
          productId: "ee3b2466-3546-11e7-a3f8-5254007b6f02",
          jobName: this.formLabelAlign.name,
          jobDesc: this.formLabelAlign.region,
          status: this.formLabelAlign.type,
          creator: JSON.parse(localStorage.userInfo).id,
          jobCode: this.formLabelAlign.jobCode
        }).then(res => {
          this.getCommonJobs();
          this.drawer = false;
          this.formLabelAlign.name = "";
          this.formLabelAlign.region = "";
          this.formLabelAlign.type = "1";
          this.formLabelAlign.jobCode = "";
          //this.loading = false;
          _paq.push(['trackEvent', '点击', '保存', '添加工作岗位']);
        });
      },

      handleClear() {
        if (!this.$refs.formLabelAlign) return;
        this.$refs.formLabelAlign.clearValidate(); // 移除该表单项的的校验结果
        this.$refs.formLabelAlign.resetFields(); // 对表单项 进行重置
      },
      insertJobsOrUpdate() {
        this.$refs.formLabelAlign.validate(valid => {
          if (valid) {
            //this.loading = true;
            let status = null;
            if (this.formLabelAlign.type == "启用" || this.formLabelAlign.type == 1) {
              status = 1;
            } else {
              status = 0;
            }
            if (this.title == "新增通用岗位") {
              console.log('add')
              this.insertJobss();
            } else {
              console.log('else');
              systemCommonJobUpdate({
                jobName: this.formLabelAlign.name,
                jobDesc: this.formLabelAlign.region,
                status: status,
                creator: this.creater,
                jobCode: this.formLabelAlign.jobCode,
                id: this.updateId
              }).then(res => {
                _paq.push(['trackEvent', '点击', '编辑', '修改工作岗位']);
                this.getCommonJobs();
                //this.loading = false;
                this.drawer = false;

              });
            }
          } else {
            return false;
          }

        })
      },
      //保存岗位
      saveCommonJobMenus(data) {
        saveCommonJobMenus({
          jobList: this.$refs.postTree.getCheckedNodes().map(res => res.ID),
          isLast: this.$refs.postTree.getCheckedNodes().map(res => res.IsLast),
          jobId: this.jobId
        }).then(res => {
          if (res.code == 200) {
            this.functionDrawer = false;
            this.$message({
              type: "success",
              message: "保存成功!"
            });
            _paq.push(['trackEvent', '点击', '保存', '保存岗位']);
          }
        });
        this.formLabelAlign.name = "";
        this.formLabelAlign.region = "";
        this.formLabelAlign.type = "1";
        this.formLabelAlign.jobCode = "";
      },
      addClick() {
        this.title = "新增通用岗位";
        this.formLabelAlign = {
          type: "1"
        }
        this.readonly = false;
        this.drawer = true;
      },
      // 功能授权
      functionAuthorization() {
        if (!this.jobId) {
          this.$alert("请选择岗位", {
            confirmButtonText: "确定"
          });
        } else {
          this.getCommonAllMenus(this.jobId);
          this.functionDrawer = true;
        }
      },
      handleCheckChange(data, checked, indeterminate) {
        console.log(data, checked, indeterminate);
      },
      /* 新增IDM岗位*/
      IDMAuthorization() {
        if(this.IDMData.length==0){
          get("/idmSelect/selectSysPostOrg").then(res=>{
            // this.IDMdefaultCheckeds= res.result.filter(item=>item.checks>0).map(item=>item.checks);
            this.IDMData=res.result.map(item=>({...item,name:item.belongDepFullName+"-----"+item.jobDefinitionsName}));
            this.IDMDrawer = true;
            _paq.push(['trackEvent', '点击', '新增IDM岗位', '新增IDM岗位']);
          });
        }else this.IDMDrawer = true;
        //this.getCommonAllMenus(this.jobId);
      },
      /* 保存IDM岗位*/
      saveIDM(){
        let ids=this.$refs.IDMTree.getCheckedKeys();
        sendJSON("/idmSelect/addSysPostOrg",{ids:ids}).then(res=>{
          this.$message.success("保存成功");
          this.IDMDrawer = false;
          _paq.push(['trackEvent', '点击', '保存', '保存IDM岗位']);
        })

      },
      formAuthorization(){
        if (!this.jobId) {
          this.$alert('请选择岗位', {
            confirmButtonText: '确定'
          })
        } else {
          this.getReportForm(this.jobId);
          this.formDrawer = true
        }
      },
      getReportForm(id){
      getReport__Form({jobId:id}).then(res=>{
        this.formData=res.data.content;
        this.formDefaultCheckeds = res.data.jobRelMenu.map(res => res.ID);
      });
    },
    formCheckChange(){

    },
     /*保存报表授权*/
    seveReportForm(){
      seveReport__Form({jobId:this.jobId,jobList:[
        ...this.$refs.formTree.getCheckedNodes().map(res => res.ID),
        ...this.$refs.formTree.getHalfCheckedNodes().map(res => res.ID)
      ]}).then(res=>{
        this.formDrawer=false;
        this.$message({
          type: 'success',
          message: '保存成功！'
        })
        _paq.push(['trackEvent', '点击', '保存', '保存报表授权']);
      })
    },
    IDMhandleCheckChange(data, checked, indeterminate){
       // console.log(data);
      // console.log(checked);
      // console.log(indeterminate);
      let index=this.IDMData.findIndex(item=>item.jobDefinitionsId===data.jobDefinitionsId)
      // console.log(this.IDMData.findIndex(item=>item.jobDefinitionsId===data.jobDefinitionsId));
      if(this.IDMData[index].checks=="0"){
        this.IDMData[index].checks="1"
      }else{
        this.IDMData[index].checks="0"
      }
      this.IDMdefaultCheckeds=this.IDMData.filter(item=>parseInt(item.checks)>0).map(item=>item.jobDefinitionsId)

    }
    }
  };
</script>
<style scoped>
el-form-item__label {
  font-weight: normal;
}
</style>
<style src="@/assets/css/generalpost.less" lang="less" scoped>
</style>
<style lang="less">
// .postTable thead {
//   tr > th:first-child {
//     .el-checkbox {
//       display: none;
//     }
//   }
// }
.postTable thead {
  tr > th:first-child {
    .el-checkbox {
      display: none !important;
      visibility: hidden !important;
    }
  }
}
</style>
