<template>
  <div class="app-container">
    <!-- 搜索 -->
    <!--区域 0 未下发  1已下发 2 已上报-->
    <el-row class="container">
      <el-form ref="form">
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <div class="block">
              <el-form-item label="区域/事业部:">
                <el-input v-model="input" placeholder='请输入'></el-input>
              </el-form-item>
            </div>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <div class="block">
              <el-form-item label="年度:">
                <el-date-picker v-model="year" type="year" placeholder="选择年度"></el-date-picker>
              </el-form-item>
            </div>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <div class="block">
              <el-form-item label="">
                <el-button type="primary" style="float:right" class="main xuHuiBtn" @click='search'>搜索</el-button>
              </el-form-item>
            </div>
          </div>
        </el-col>
      </el-form>
    </el-row>
    <!-- 表格 -->
    <el-row class="container">
      <el-table :data="tableData" class="etable" style="width: 100%">
        <el-table-column  header-align="center" align="center" label="序号" width="80">
          <template slot-scope="scope">
            <span>{{ scope.$index+1}}</span>
          </template>
        </el-table-column>
        <el-table-column  header-align="center" align="center" label="区域/事业部">
          <template slot-scope="scope">
            {{ scope.row.businessName }}
          </template>
        </el-table-column>
        <el-table-column  header-align="center" width="120" align="center" label="年月">
          <template slot-scope="scope">
            <span>{{ scope.row.months |getMonth}}</span>
          </template>
        </el-table-column>
        <el-table-column  header-align="center" align="center" label="状态">
          <template slot-scope="scope">
            <span :style="{color:scope.row.plan_status_code>0?'green':'red'}">{{ scope.row.planStatus }}</span>
          </template>
        </el-table-column>
        <el-table-column  header-align="center" align="center" label="集团下发指标（万元）">
          <template slot-scope="scope">
            <router-link v-if="$store.state.user.userPower.includes('集团下发指标')" :to="{name:'downRegionIndexDetail',query:{'id':scope.row.business_id,months:scope.row.months,region:true}}">{{ scope.row.groups }}</router-link>
            <span v-else>{{ scope.row.groups }}</span>
          </template>
        </el-table-column>
        <el-table-column  header-align="center" align="center" label="区域/事业部下发指标（万元）">
          <template slot-scope="scope">
            <router-link v-if="scope.row.plan_status_code!=0&&$store.state.user.userPower.includes('区域/事业部下发指标')" :to="{name:'regionDownIndex',query:{'id':scope.row.business_id,months:scope.row.months}}">{{ scope.row.region }}</router-link>
            <span v-else>{{ scope.row.region }}</span>
          </template>
        </el-table-column>
        <el-table-column  header-align="center" align="center" label="项目上报指标(万元)">
          <template slot-scope="scope">
            <router-link v-if="scope.row.report_project_quantity!=0&&$store.state.user.userPower.includes('项目上报指标')" :to="{name:'regionUpIndex',query:{'regionOrgId':scope.row.business_id,months:scope.row.months,'planStatus':scope.row.plan_status_code}}">{{ scope.row.project }}</router-link>
            <span v-else>{{ scope.row.project }}</span>
          </template>
        </el-table-column>
        <el-table-column  header-align="center" align="center" label="操作">
          <template slot-scope="scope">
            <el-button type="text" v-if="$store.state.user.userPower.includes('编制')&&scope.row.plan_status_code<=1"  @click="handleEdit(scope.row.business_id,scope.row.months,scope.row.plan_status_code,scope.row.groupStatus)">编制</el-button>
            <el-button type="text" v-if="$store.state.user.userPower.includes('驳回')&&scope.row.plan_status_code==2&&scope.row.groupStatus<=1" @click="groupReject(scope.row.business_id,scope.row.months)">驳回</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
  </div>
</template>
<script>
  import {
    render,
    post,
    sendJSON
  } from "@/api/request";

  export default {
    data() {
      return {
        statusOptions: [{
            value: '',
            label: "全部"
          },
          {
            value: '0',
            label: "区域未下发"
          },
          {
            value: '1',
            label: "区域已下发"
          },
          {
            value: '2',
            label: "区域已上报"
          }
        ],
        status: '',
        //   表格
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
        pickerOptions: {},
        value1: "",
        year: new Date().getAppointedFormatTime("YYYY"),
        options: [{
          value: "选项1",
          label: "全部"
        }],
        value: "",
        areaData: [
          {
            value: '全部',
            label: "全部"
          },
          {
            value: '上海事业部',
            label: "上海事业部"
          },
          {
            value: '北京事业部',
            label: "北京事业部"
          }
        ],
        status1: '全部',
        input: '',
        isArea:localStorage.getItem('CommonJobID')==='f344fe8d-e379-11e9-8c08-00163e05721e'
      }
    },
    filters:{
      getMonth(value){
        return new Date(value).getAppointedFormatTime('yyyy-MM');
      }
    },
    created() {
      this.$store.dispatch("app/trackPageView","区域月度计划列表页");
      render("/group/getRegionalMonthPlans", {
        "months": this.$data.year,
        "userId":  localStorage.getItem("id")
      }, this.$data.tableData);
    },
    methods: {
      // 获取列表
      getList() {
        getList({
          id: '11',
          project: ''
        }).then(res => {
          console.log(res);
          this.tableData = res.content
        })
      },
      groupReject(id,month){
        sendJSON("/areadetail/regionFundsEffective",{regionOrgId:id,months:month,"isEffective": 0,"planStatus": 1}).then(res=>{
          this.$message.success("驳回成功");
          render("/group/getRegionalMonthPlans", {
            "months": this.$data.year,
            "userId":  localStorage.getItem("id")
          }, this.$data.tableData,true);
        });
      },
      //   表格
      handleEdit(id,month,planStatus,groupStatus) {
        this.$router.push({
          name: 'regionItemIndexFormation',
          query: {
            id: id,
            month: month,
            is_effective: '0',
            planStatus:planStatus,
            groupStatus
          }
        })
      },
      handleDelete(index, row) {
        console.log(index, row);
      },
      // 搜索
      search(){
        _paq.push(['trackEvent', '点击', '搜索','区域月度计划管理搜索']);
        sendJSON("/group/getRegionalMonthPlans", {
          "months": new Date(this.$data.year).getAppointedFormatTime("YYYY") ,
          "userId":  localStorage.getItem("id"),
          "planStatus":this.status,
          "businessName": this.input
        }).then(res => {
          this.tableData = res.result
        });
      }
    },
    watch:{
    }
  };
</script>
<style >
.el-input{
  width: auto;
}
</style>
<style lang="scss">
  @import "@/styles/main.scss";
  @import "@/styles/list.scss";
</style>
