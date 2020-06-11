<template>
  <div class="app-container operationLog-box">
    <div class="top">
      <div class="relatedProjects clearinnder">
        <span>用户名称:</span>
       <!-- <el-input v-model="search.userName" placeholder="请输入用户名称" style="width: 200px" />-->
        <el-input
          style="width: 276px"
          placeholder="请输入公司名称"
          v-model="search.userName"
          clearable
          @change="clear1"
        >
        </el-input>
      </div>

      <!--<el-date-picker
        v-model="search.date"
        type="daterange"
        align="right"
        unlink-panels
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        :picker-options="pickerOptions">
      </el-date-picker>-->
      <el-date-picker
        v-model="search.date"
        type="datetimerange"
        align="right"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        :default-time="['12:00:00', '08:00:00']"
        :clearable="clear"
      >
      </el-date-picker>

      <el-button class="btn bgc_blue" type="primary" @click="searchLog">搜索</el-button>
    </div>

    <!-- 操作日志表单 -->
    <div class="e-el-row" :style="height">
      <el-row :gutter="20">
        <el-col :span="24">
          <div class="grid-content bg-purple">
            <el-table :data="logTableData" class="etable" :style="heightleft">
              <el-table-column label="序号" type="index" width="50" />
              <el-table-column prop="username" label="操作用户" />
              <el-table-column prop="description" label="操作说明" />
              <el-table-column prop="logTypeDesc" label="操作状态" />
              <el-table-column prop="time" label="操作用时(毫秒)" />
              <el-table-column prop="IP" label="IP地址" />
              <el-table-column prop="createTime"  :formatter="dataFormat2" label="操作时间" width="160" />
            </el-table>
          </div>
        </el-col>
      </el-row>

      <div class="juspan">
        <div></div>
        <div>
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
    </div>
  </div>
</template>

<script>
  import {
    getAllProject,
    queryLogInfo
  } from "@/api/log";

  export default {
  data() {
    return {
      height: {
        height: ""
      },
      heightleft: {
        height: ""
      },
      // 分页
      currentPage: 1,
      pageSize: 10,
      clear: true,
      total: 0,
      input: "",
      // 时间
      value: "",
      value1: "",
      // 操作日志表单
      logTableData: [
        {
        }
      ],
      search:{
        userName: "",
        date: ""
      },
    };
  },
  create() {
    //初始化数据
    this.hh();

    this.queryLogInfos();

  },
  methods: {
    // 获取高度
    hh() {
      this.height.height = window.innerHeight - 140 + "px";
      this.heightleft.height = window.innerHeight - 206 + "px";
      // console.log(this.height.height)
    },
    //时间格式化2
    dataFormat2:function(row,column){
      var t=new Date(row.createTime);//row 表示一行数据, updateTime 表示要格式化的字段名称
      var year=t.getFullYear(),
        month=t.getMonth()+1,
        day=t.getDate(),
        hour=t.getHours(),
        min=t.getMinutes(),
        sec=t.getSeconds();
      var newTime=year+'-'+
        (month<10?'0'+month:month)+'-'+
        (day<10?'0'+day:day)+' '+
        (hour<10?'0'+hour:hour)+':'+
        (min<10?'0'+min:min)+':'+
        (sec<10?'0'+sec:sec);
      return newTime;
    },
    // 搜索
    searchLog() {
      this.pageSize=10;
      this.currentPage=1;
      this.queryLogInfos();
    },
    // 搜索
    clear1() {
      this.pageSize=10;
      this.currentPage=1;
      this.queryLogInfos();
    },
    queryLogInfos(){
      queryLogInfo({
        pageIndex: this.currentPage,
        pageSize: this.pageSize,
        date: this.search.date,
        userName: this.search.userName
      }).then(res=>{
        this.logTableData=res.result.list;
        this.total=parseInt(res.result.total);
      })
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageSize=val;
      this.queryLogInfos();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage=val;
      this.queryLogInfos();
    }
  },
  mounted() {
    this.hh();
    this.queryLogInfos();
  }
};
</script>

<style lang='less' scoped>
.etable {
  width: 100%;
  border: 1px solid #f0f0f0;
  border-bottom: none;
}
.operationLog-box {
  .top {
    padding: 8px;
    border-radius: 4px;
    background-color: #fff;
    box-shadow: 0 0 8px #ebeef5;
    border: 1px solid #f0f0f0;
    .relatedProjects {
      border-radius: 4px;
      display: inline-block;
      background: #fff;
      margin-right: 15px;
      border: 1px solid #dcdfe6 !important;
      border: none;
      padding-left: 10px;
      .el-select{
        width: auto !important;
      }
      > span {
        font-size: 14px;
      }
      .el-input__inner {
        border: 1px solid transparent;
      }
    }
    .date {
      margin-left: 15px;
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
}
.juspan {
  justify-content: space-between;
  display: flex;
}
</style>
