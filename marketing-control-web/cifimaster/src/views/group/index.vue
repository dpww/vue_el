<template>
  <div class="app-container">
    <!-- 搜索 -->
    <!-- 0 未下发  1已下发 2 编制完成-->
    <el-row class="container">
      <el-form ref="form">
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <div class="block">
              <el-form-item label="年度:">
                <el-date-picker v-model="year" type="year" placeholder="选择年度"></el-date-picker>
              </el-form-item>
            </div>
          </div>
        </el-col>
       <el-col :span="8" :offset="8">
          <div class="grid-content bg-purple">
            <div class="block">
              <el-form-item label="">
               <el-button type="primary" style="float:right" class="xuHuiBtn main" @click='search'>搜索</el-button>
              </el-form-item>
            </div>
          </div>
        </el-col>
      </el-form>
    </el-row>
    <!-- 表格 -->
    <el-row class="container">
      <el-table :data="tableData" class="etable" style="width: 100%" >
        <el-table-column  header-align="center" align="center" label="序号" width="80">
          <template slot-scope="scope">
            <span>{{ scope.$index+1}}</span>
          </template>
        </el-table-column>
        <el-table-column  header-align="center" align="center" label="计划名称">
          <template slot-scope="scope">
            {{ scope.row.plan_name }}
          </template>
        </el-table-column>
        <el-table-column  header-align="center" width="120" align="center" label="年月">
          <template slot-scope="scope">
            <span>{{ scope.row.months|getMonth}}</span>
          </template>
        </el-table-column>
        <el-table-column  header-align="center" align="center" label="状态">
          <template slot-scope="scope">
            <span :style="{color:scope.row.plan_status_code!=0?'green':'red'}">{{ scope.row.plan_status }}</span>
          </template>
        </el-table-column>
        <el-table-column  header-align="center" align="center" label="集团下发指标（万元）">
          <template slot-scope="scope">
            <router-link v-if="scope.row.plan_status_code!=0&&$store.state.user.userPower.includes('集团下发指标')" :to="{name:'downRegionIndexDetail',query:{'id':scope.row.business_id,months:scope.row.months}}">{{ scope.row.groups}}</router-link>
            <span v-else>{{scope.row.groups}}</span>
          </template>
        </el-table-column>
        <el-table-column  header-align="center" align="center" label="事业部上报指标（万元）">
          <template slot-scope="scope">
            <router-link v-if="scope.row.report_region_quantity!=0&&$store.state.user.userPower.includes('事业部上报指标')" :to="{name:'upRegionIndexDetail',query:{'id':scope.row.business_id,months:scope.row.months,'plan_status':scope.row.plan_status}}">{{ scope.row.project}}</router-link>
            <span v-else>{{scope.row.project}}</span>
          </template>
        </el-table-column>
        <el-table-column  header-align="center" align="center" label="操作" width="150">
          <template slot-scope="scope">
            <!-- <el-button type="text" v-show='scope.row.plan_status_code == 0||$store.state.user.userJobType=="admin"' @click="handleEdit(scope.row.months,scope.row.business_id)">编制</el-button> -->
            <el-button type="text" v-if="$store.state.user.userPower.includes('编制')&&scope.row.plan_status!='编制完成'" @click="handleEdit(scope.row.months,scope.row.business_id,scope.row.plan_status)">编制</el-button>
            <!-- <el-button type="text"  @click="handleEdit(scope.row.months,scope.row.business_id)">编制</el-button> -->
          </template>
        </el-table-column>
      </el-table>
    </el-row>
  </div>
</template>
<script>
  import {
    render,sendJSON
  } from "@/api/request";
let Loading;
  export default {
    data() {
      return {
        //   表格
        statusOptions: [{
            value: '',
            label: "全部"
          },
          {
            value: '0',
            label: "集团未下发"
          },
          {
            value: '1',
            label: "集团已下发"
          },
          {
            value: '2',
            label: "编制完成"
          }
        ],
        status: '',
        tableData: [],
        business: [{
            value: "选项1",
            label: "浙江事业部"
          },
          {
            value: "选项1",
            label: "苏南事业部"
          }
        ],
        business: "",
        value1: "",
        year: new Date().getAppointedFormatTime("YYYY"),
        options: [{
          value: "选项1",
          label: "全部"
        }],
        value: ""
      };
    },
    filters:{
      getMonth(value){
		  //debugger;
        return new Date(value).getAppointedFormatTime('yyyy-MM');

      }
    },
    created() {
      this.$store.dispatch("app/trackPageView","集团月度计划列表页");
		/**
      sendJSON('/group/getMessage', {
        "months": "2019-08-01",
        "userId": "6d445313-3554-11e7-a3f8-5254007b6f02"
      });**/
      render('/group/getGroupMonthPlans', {
        "months": this.year,
        "plan_status": "0",
        "userId":localStorage.getItem("id")
      },this.$data.tableData)
    },
    methods: {
      // 获取列表
      getList() {
		  //debugger;


        getList({
          id: '11',
          project: ''
        }).then(res => {

          this.tableData = res.content
          console.log(res.content);
          console.log(this.tableData);
          if(this.plan_status_code == '2'){

          }
        })
      },
      //   表格
      handleEdit(month,id,status) {
        this.$router.push({
          name: 'regionIndexFormation',
          query: {
            months:month,
            id:id,
            status:status
          }
        })
      },
      handleDelete(index, row) {
        console.log(index, row);
      },
      //   搜索
      search(){
        sendJSON('/group/getGroupMonthPlans',{
          'months': new Date(this.$data.year).getAppointedFormatTime("YYYY"),
          'planStatus': this.status,
          "userId":localStorage.getItem("id")
        }).then(res => {
          console.log(new Date(this.$data.year).getAppointedFormatTime("YYYY"));
          this.tableData = res.result
        });
      }
    }
  };
</script>
<style lang="scss">
  @import "@/styles/main.scss";
  @import "@/styles/list.scss";
</style>
