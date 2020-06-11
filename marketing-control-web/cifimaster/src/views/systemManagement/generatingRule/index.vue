<template>
    <div class="generatingRule">
        <div class="generatingRule-top">
            <p>周报生成规则</p>
            <el-button @click="edit('add')" type="primary">新增</el-button>
        </div>
        <div class="generatingRule-cen">
            <el-table :data="tableDataList" class="table-div">
            <el-table-column type="index" label="序号" width="50"></el-table-column>
              <el-table-column prop="start_time" label="周报取数开始时间" width="165"></el-table-column>
              <el-table-column prop="end_time" label="周报取数结束时间" width="165"></el-table-column>
              <el-table-column prop="year_month" label="周报取数年月"></el-table-column>
              <el-table-column prop="plan_week" label="自然周"></el-table-column>
              <el-table-column prop="how_week" label="本系统周"></el-table-column>
              <el-table-column prop="this_time" label="周报生成时间" width="200"></el-table-column>
               <el-table-column prop="windows_start" label="窗口开始时间" width="165"></el-table-column>
                <el-table-column prop="windows_end" label="窗口结束时间" width="165"></el-table-column>
              <el-table-column fixed="right" label="操作" width="160">
                <template slot-scope="scope">
                  <el-button @click="edit(scope.row)" type="text" size="small">编辑</el-button>
                  <el-button @click="del({index:scope.$index,id:scope.row.id})" type="text" size="small">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
              <div>
                <el-pagination
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  :current-page="currentPage"
                  :page-sizes="[10, 20, 30, 40]"
                  :page-size="pageSize"
                  layout="total, sizes, prev, pager, next, jumper"
                  :total="total">
                </el-pagination>
              </div>
        </div>
        <!--编辑 新增-->
    <el-dialog :title="addtrue?'编辑':'新增'" :visible.sync="dialogFormVisible" :close-on-click-modal="false" width="40%">
     <el-form :model="editor" :rules="rules" ref="editor" label-width="140px" class="demo-editor">
        <el-form-item label="周报取数开始时间" prop="start_time">
          <el-date-picker
            v-model="editor.start_time"
            type="datetime"
            placeholder="选择日期时间"
            default-time="12:00:00">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="周报取数结束时间" prop="end_time">
          <el-date-picker
            v-model="editor.end_time"
            type="datetime"
            placeholder="选择日期时间"
            default-time="12:00:00">
          </el-date-picker>
        </el-form-item>
         <el-form-item label="明源周" prop="plan_week">
        <!--onkeyup="value=value.replace(/[^\d]/g,'') "onbeforepaste="clipboardData.setData('text',clipboardData.getData('text').replace(/[^\d]/g,''))"-->
          <el-input v-model="editor.plan_week" @keyup.native="proving2"></el-input>
        </el-form-item>
        <el-form-item label="本系统周" prop="how_week">
          <el-input v-model="editor.how_week" @keyup.native="proving1" maxlength="2"></el-input>
        </el-form-item>
        <el-form-item label="周报取数年月" prop="year_month">
         <el-date-picker
          v-model="editor.year_month"
          type="month"
          placeholder="选择月">
        </el-date-picker>
        </el-form-item>
        <el-form-item label="周报生成时间" prop="this_time">
          <el-date-picker
            v-model="editor.this_time"
            type="datetime"
            placeholder="选择日期时间"
            default-time="12:00:00">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="窗口开始时间" prop="windows_start">
         <el-date-picker
            v-model="editor.windows_start"
            type="datetime"
            placeholder="选择日期时间"
            default-time="12:00:00">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="窗口结束时间" prop="windows_end">
          <el-date-picker
            v-model="editor.windows_end"
            type="datetime"
            placeholder="选择日期时间"
            default-time="12:00:00">
          </el-date-picker>
        </el-form-item>
        <!--
        <el-form-item>
          <el-button type="primary" @click="submitForm('editor')">立即创建</el-button>
          <el-button @click="resetForm('editor')">重置</el-button>
        </el-form-item>
        -->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogForm">取 消</el-button>
        <el-button type="primary" v-if="addtrue" @click="submitModify">确 定</el-button>
        <el-button type="primary" v-else @click="add">新 增</el-button>
      </div>
    </el-dialog>
    </div>
</template>
<script>
import {getTableList,delTableList,editTableList,insertTableList} from "@/api/commentpublic";
export default {
   data() {
      return {
        // 分页
        pageSize:10,
        total: 0,
        currentPage: 1,
        startTime:'',
        endTime:'',
        // 弹框
        addtrue:true,
        dialogFormVisible:false,
        index:0,
        userName:localStorage.getItem('username'),
         editor: {
          plan_week: '',
          how_week: '',
          start_time: '',
          end_time: '',
          year_month:'',
          this_time:''
        },
        rules: {
          plan_week: [
            { required: true, message: '请输入明源周', trigger: 'blur' }
          ],
          how_week: [
             { required: true, message: '请输入本系统周', trigger: 'blur' }
          ],
          start_time: [
            { type: 'date', required: true, message: '请选择周报取数开始时间', trigger: 'change' }
          ],
          end_time: [
            { type: 'date', required: true, message: '请选择周报取数结束时间', trigger: 'change' }
          ],
          year_month: [
            { type: 'date', required: true, message: '请选择周报年月', trigger: 'change' }
          ],
           this_time: [
            { type: 'date', required: true, message: '请选择周报生成的时间', trigger: 'change' }
          ]
        },
        //
        tableDataList: [{
          start_time: '',
          end_time: '',
          year_month: '',
          plan_week: '',
          how_week: '',
          this_time: '',
          id:''
        }]
      }
    },
  created() {
    this.getTableLists();
  },
   methods: {
     proving2(){
        if(this.editor.plan_week.length == 1){
          this.editor.plan_week= this.editor.plan_week.replace(/[^1-9]/g, '')
       }else{
        this.editor.plan_week=this.editor.plan_week.replace(/[^\.\d]/g,'');
        this.editor.plan_week=this.editor.plan_week.replace('.','');
       }
     },
     proving1(){
      //  console.log(this.editor.how_week.length)
       if(this.editor.how_week.length == 1){
          this.editor.how_week= this.editor.how_week.replace(/[^1-9]/g, '');
       }else{
        this.editor.how_week=this.editor.how_week.replace(/[^\.\d]/g,'');
        this.editor.how_week=this.editor.how_week.replace('.','');
       }

      },
     dialogForm(){
       this.dialogFormVisible=false;
     },
       //   分页
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.pageSize=val;
      this.getTableLists();
    },
    handleCurrentChange(val) {
    //   console.log(`当前页: ${val}`);
      this.currentPage = val;
      this.getTableLists();
    },
      // 获取列表
      getTableLists(){
        getTableList( {
          pageNum:this.currentPage,
          pageSize:this.pageSize
       }).then(res=>{
         this.tableDataList=res.result.data.list
         this.total=res.result.data.total
        })
      },
       /* 编辑*/
      edit(row){
        if(row=='add'){
          this.addtrue=false;
          this.editor={
          plan_week: '',
          how_week: '',
          start_time: '',
          end_time: '',
          year_month:'',
          this_time:'',
          id:'',
          windows_start:'',
          windows_end:''
        }
        }else{
          this.addtrue=true;
          this.editor={...row};
        }
        this.dialogFormVisible=true;
      },
      /* 删除列表单条数据*/
      del(params){
        this.$confirm("确认删除么？").then(()=>{
           delTableList(
            {
              id:this.tableDataList[params.index].id,
              start_time:this.tableDataList[params.index].start_time,
              end_time:this.tableDataList[params.index].end_time,
              year_month:this.tableDataList[params.index].year_month,
              plan_week:this.tableDataList[params.index].plan_week,
              how_week:this.tableDataList[params.index].how_week,
              this_time:this.tableDataList[params.index].this_time,
              windows_start:this.tableDataList[params.index].windows_start,
              windows_end:this.tableDataList[params.index].windows_end

            }).then(res=>{
              console.log(res)
            if(res.result==1){
              this.$message.success("删除成功");
              this.tableDataList.splice(params.index,1);
              this.getTableLists();
            }
          });
        }).catch(()=>{
          this.$message.info("已取消");
        })
      },
      add(){
        // console.log(this.editor)
        if(!this.validate())return;
         insertTableList(
           {
              id:this.editor.id,
              start_time:this.editor.start_time,
              end_time:this.editor.end_time,
              year_month:this.editor.year_month,
              plan_week:this.editor.plan_week,
              how_week:this.editor.how_week,
              this_time:this.editor.this_time,
              windows_start:this.editor.windows_start,
              windows_end:this.editor.windows_end
           }
         ).then(res=>{
           if(res.data==1){
             this.$message.success("添加成功");
              this.dialogFormVisible=false;
              /* 重新渲染数据*/
              this.getTableLists();
           }
           console.log(res)
         })
      },
       submitModify(row){
         if(!this.validate())
         {
          return;
         }else{
        editTableList(
            {
              id:this.editor.id,
              start_time:this.editor.start_time,
              end_time:this.editor.end_time,
              year_month:this.editor.year_month,
              plan_week:this.editor.plan_week,
              how_week:this.editor.how_week,
              this_time:this.editor.this_time,
              windows_start:this.editor.windows_start,
              windows_end:this.editor.windows_end
            }
          ).then(res=>{
            if(res.data==1){
              this.$message.success("保存成功");
              this.tableDataList.splice(this.index,1,this.editor);
              this.dialogFormVisible=false;
              this.getTableLists();
            }
          })
         }
      },
       /* 验证提交的数据*/
    validate(){
      if(!this.editor.start_time){
        this.$message.error("请选择周报取数开始时间");
        return false;
      }else if(!this.editor.end_time){
        this.$message.error("请选择周报取数结束时间");
        return false;
      }else if(!this.editor.plan_week){
          this.$message.error("请输入明源周");
        return false;
      }else if(!this.editor.how_week){
        this.$message.error("请输入本系统周");
        return false;
      }else if(!this.editor.this_time){
        this.$message.error("请选择周报取数年月");
        return false;
      } else if(!this.editor.this_time){
        this.$message.error("请选择周报生成时间");
        return false;
      }
      return true;
    }
    }

}
</script>
<style scoped lang="less">
.generatingRule{
    padding:12px;
    .generatingRule-top{
        padding:12px;
        background:#fff;
        margin-bottom:12px;
        border-radius:4px;
        box-shadow: 0 0 8px #f1f1f1;
        float:left;
        width:100%;
        justify-content:space-between;
        display:flex;
        p{
          line-height:36px;
          font-size:16px;
          color:#2761ff;
        }
        .el-button{
            padding:10px 20px;
        }
    }
    .generatingRule-cen{
        clear:both;
        padding:12px;
        background:#fff;
        border-radius:4px;
        width:100%;
        .table-div{
            border:1px solid #f1f1f1;
            border-bottom:0;
            width:100%;
        }
    }
}
</style>
