<template>
  <div class="app-container reportForm">
    <el-row class="container" style="text-align: right;">
      <el-button @click="edit" class="xuHuiBtn main">新增</el-button>
      <el-button @click="back" class="xuHuiBtn secondary" v-if="pid!=-1">返回</el-button>
    </el-row>
    <div class="e-el-row">
      <el-row :gutter="20">
        <el-col :span="24">
          <div class="grid-content bg-purple">
            <el-table :data="tableData" class="etable">
              <el-table-column label="序号" align="center" header-align="center">
                <template slot-scope="scope">
                  <span>{{(currentPage-1)*pageSize+scope.$index+1}}</span>
                </template>
              </el-table-column>
              <el-table-column label="标题" align="center" header-align="center" prop="title">
                <template slot-scope="scope">
                  <span @click="getChildList(scope.row.id)" :style="pid===-1?{color:'blue',cursor:'pointer'}:{}">{{scope.row.title}}</span>
                </template>
              </el-table-column>
              <el-table-column label="地址" align="center" v-if="pid!=-1" header-align="center">
                <template slot-scope="scope">
                  <span>{{ scope.row.url }}</span>
                </template>
              </el-table-column>
              <el-table-column label="类型" align="center" header-align="center">
                <template slot-scope="scope">
                  <span>{{ scope.row.typename }}</span>
                </template>
              </el-table-column>
               <el-table-column label="排序号" align="center" header-align="center">
                <template slot-scope="scope">
                  <span>{{ scope.row.orderIndex }}</span>
                </template>
              </el-table-column>

              <el-table-column label="操作" align="center" header-align="center">
                <template slot-scope="scope">
                  <el-button type="text" @click="edit({index:scope.$index,id:scope.row.id})">编辑</el-button>
                  <el-button type="text" @click="del({index:scope.$index,id:scope.row.id})">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-col>
      </el-row>
      <div class="block" style="margin-top:10px;float:right;">
        <el-pagination
          :current-page="currentPage"
          :page-sizes="[10, 20, 30, 50,100]"
          :pager-count="5"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>
    <!--编辑 -->
    <el-dialog :title="index>=0?'编辑':'新增'" :visible.sync="dialogFormVisible" :close-on-click-modal="false">
      <el-form :rules="rules" :model="editor">
        <el-form-item label="标题" prop="title">
          <el-input class="inputModel" v-model="editor.title" ></el-input>
        </el-form-item>
        <el-form-item label="地址" prop="url" v-if="pid!=-1">
          <el-input class="inputModel" v-model="editor.url" ></el-input>
        </el-form-item>
        <el-form-item label="类型" prop="type">
          <el-select class="inputModel" v-model="editor.type">
            <el-option  label="明源" :value="1"></el-option>
            <el-option label="帆软" :value="2"></el-option>
          </el-select>
        </el-form-item>
         <el-form-item label="排序号" prop="orderIndex">
           <el-input class="inputModel" type="number" v-model="editor.orderIndex"></el-input>
        </el-form-item>

        <el-form-item label="父级" prop="parentId" v-if="pid!=-1">
          <el-select class="inputModel" v-model="editor.parentId" placeholder="请选择父级">
            <el-option v-for="(item,key) in parents" :label="item.title" :value="item.id" :key="key"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" v-if="index>=0" @click="submitModify">确 定</el-button>
        <el-button type="primary" v-else @click="add">新 增</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {sendJSON,render} from "@/api/request.js";
export default{
  data(){
    return{
      currentPage:1,
      pageSize:10,
      total:20,
      tableData:[{title:'title','type':1,url:'ab'}],
      dialogFormVisible:false,
      index:0,
      userName:localStorage.getItem('username'),
      form:{
        title:'',
        url:'',
        type:'',
        parentId:'',
         orderIndex:""
      },
      editor:{},
      parentPages:{
        currentPage:1,
      },
      pid:-1,
      rules:{
        title:[{required: true, message: '请输入标题', trigger: 'blur'}],
        url:[{required: true, message: '请输入地址', trigger: 'blur'}],
        type:[{ required: true, message: '请选择活动区域', trigger: 'change' }],
        parentId:[{ required: true, message: '请选择父级', trigger: 'change' }],
         orderIndex:[{ required: true, message: '请输入排序号', trigger: 'change' }],
      }
    }
  },
  methods:{
    /* 修改每页数量*/
    handleSizeChange(size){
      this.pageSize=size;
      this.getList();
    },
    /* 改变页码*/
    handleCurrentChange(index){
      this.currentPage=index;
      this.getList();
    },
    /* 编辑*/
    edit(params){
       this.dialogFormVisible=true;
      if(params.index===undefined){
        this.index=-1;
        this.editor=JSON.parse(JSON.stringify(this.form));
        this.editor.parentId=this.pid;
        return;
      }
      /* 设置一个中间变量 */
      this.editor=JSON.parse(JSON.stringify(this.tableData[params.index]));
      this.editor.parentId=this.pid;
      this.index=params.index;
    },
    /* 获取报表列表*/
    getList(){
      let params={pageNum:this.currentPage,pageSize:this.pageSize};
      /* 如果是子级*/
      if(this.pid!==-1){
        this.parentPages.currentPage=this.currentPage;
        params.PID=this.pid;
      }
      sendJSON('/Report/selectReportMenu',params).then(res=>{
        this.total=res.result.total;
        this.tableData=res.result.list;
        if(this.pid==-1)this.parents=res.result.list;
      });
    },
    /* 获取子级信息*/
    getChildList(pid){
      if(this.pid!==-1){
        return;
      }
      this.pid=pid;
      this.currentPage=1;
      this.getList();
    },
    /* 返回时修改pid为-1,还原父页面的页码*/
    back(){
      this.pid=-1;
      this.currentPage=this.parentPages.currentPage;
      this.getList();
    },
    /* 提交修改*/
    submitModify(){
      if(!this.validate())return;
      sendJSON("/Report/updateReportMenu",{...this.editor,editor:this.userName}).then(res=>{
        if(res.result==1){
          this.$message.success("保存成功");
          this.tableData.splice(this.index,1,this.editor);
          this.dialogFormVisible=false;
          this.getList();
        }
      });
    },
    /* 新增报表*/
    add(){
      if(!this.validate())return;
      let params={...this.editor,editor:this.userName,creator:this.userName};
      if(this.pid!==-1){
        params.PID=this.pid;
      }
      sendJSON("/Report/insertReportMenu",params).then(res=>{
        if(res.result==1){
          this.$message.success("添加成功");
          this.dialogFormVisible=false;
          /* 重新渲染数据*/
          this.getList();
        }
      })
    },
    /* 删除报表*/
    del(params){
      this.$confirm("确认删除么？").then(()=>{
        sendJSON("/Report/deleteReportMenu",{id:params.id}).then(res=>{
          console.log(res)
          if(res.result==1){
            this.$message.success("删除成功");
            this.tableData.splice(params.index,1);
            this.getList();
          }
        });
      }).catch(()=>{
        this.$message.info("已取消");
      })
    },
    /* 验证提交的数据*/
    validate(){
      if(!this.editor.title){
        this.$message.error("请输入标题");
        return false;
      }else if(!this.editor.url&&this.pid!=-1){
          this.$message.error("请输入地址");
        return false;
      }else if(!this.editor.type){
        this.$message.error("请选择类型");
        return false;
      }
      return true;
    }
  },
  created(){
    this.getList();
  }
}
</script>
<style lang="scss" src="@/styles/list.scss"></style>
<style lang="scss">
 .reportForm {
   .inputModel{
     .el-input__inner{
     width: 680px;
   }
   }

   .el-input{
     width: auto;
   }
  .el-form-item__content{
      margin-bottom: 20px;
  }
  .el-form-item__error{
    left: 45px;
  }
 }
</style>
