<template>
  <div class="app-container">
    <el-row class="container">
      <el-row class="unit">
        <el-button class="projectAllWeek" @click="outlink" type="primary" style="margin-right:20px;">{{"项目全盘全周期签约计划"}}</el-button>
        <span>{{projectName}}  金额单位：万元</span>
      </el-row>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="表一" name="first">
          <table1 ref="table1" @showBTN="showBTN" @projectName="getName"></table1>
        </el-tab-pane>
        <el-tab-pane label="表二" name="second" v-if='status||["表四上报","表四通过"].some(item=>$store.state.user.userPower.includes(item)) '>
          <table2 ref="table2" @tabledata="getData"></table2>
        </el-tab-pane>
        <el-tab-pane label="表三" name="third" v-if='status||["表四上报","表四通过"].some(item=>$store.state.user.userPower.includes(item)) '>
          <table3 ref="table3"></table3>
        </el-tab-pane>
        <el-tab-pane label="表四" name="fourth" v-if='status||["表四上报","表四通过"].some(item=>$store.state.user.userPower.includes(item)) '>
          <table4 ref="table4"></table4>
        </el-tab-pane>
        <el-tab-pane label="附件" name="upFile">
          <upFile></upFile>
        </el-tab-pane>
      </el-tabs>
    </el-row>
  </div>
</template>
<script>
  import table1 from './component/table1.vue';
  import table2 from './component/table2.vue';
  import table3 from './component/table3.vue';
  import table4 from './component/table4.vue';
  import upFile from './component/upFile.vue';
  import {projectAllWeek} from "@/api/request";

  export default {
    name: 'Index',
    components: {
      table1,
      table2,
      table3,
      table4,
      upFile
    },
    created() {
      this.$store.dispatch("app/trackPageView","项目月度计划编制");
    },
    computed: {
      status(){
        return this.$store.state.settings.projectStatus>=3;
      },
      isRegion(){
        return this.$store.state.settings.regionItem
      }
    },
    data() {
      let projectName=(this.$route.params.projectName&&this.$route.params.projectName+new Date(this.$route.params.months).getAppointedFormatTime("MM月计划"))||(this.$route.query.projectName&&this.$route.query.projectName+new Date(this.$route.query.months).getAppointedFormatTime("MM月计划"));
      return {
        activeName: 'first',
        prev:'first',
        //   表格
        input: '',
        // 日期
        value1: '',
        projectName:projectName,
        value2: '',
        isProject:localStorage.getItem("CommonJobID")==='1c1d3cf6-e37a-11e9-8c08-00163e05721e',
        table2:{},
        isShowBTN:false
      };
    },
    beforeRouteLeave(to,from,next){
      this.handleClick();
      next();
    },
    methods: {
      getName(value){
        this.projectName=value;
      },
      getData(data){
        this.table2=data;
      },
      showBTN(data){
        this.isShowBTN=data

      },
      handleClick() {
        if(!this.status&&(this.$store.state.user.userPower.includes("表一上报"))&&this.$refs.table4.weekPlan[1].is_effective==0){
          switch(this.prev){
            case "first":
            if(this.$store.state.settings.projectStatus==0)
            this.$refs.table1.listOneupdate();
            break;
            case "second":
            this.$refs.table2.PlanUpdate();
            break;
            case "third":
            this.$refs.table3.updateChannel();
            break;
            case "fourth":
            this.$refs.table4.updateWeekly();
            break;
          }
        }
        this.prev=this.activeName;
      },
      // 表四表格
      handleEdit(index, row) {
        console.log(index, row);
      },
      handleDelete(index, row) {
        console.log(index, row);
      },
      outlink(){
        // console.log(this.$route.query.projectId);
          console.log(location.origin);
          let host
          if(location.origin.includes("test")){
            host="https://mars-uat.cifi.com.cn"
          }else if(location.origin.includes("uat")){
            host="https://mars-uat.cifi.com.cn"
          }else{
            host="https://mars.cifi.com.cn"
          }
        projectAllWeek({projectId:this.$route.query.projectId}).then(res=>{
          if(res.code==200){
          open(`${host}/#/OperatingPlan/ContractPlan/EntireProject/${res.result.quyuId}/${res.result.cityId}/${this.$route.query.projectId}`)
          }else{
            this.$message.error(res.message)
          }
        })
      }
    }
  };
</script>
<style scoped src="@/assets/css/style.css"></style>
<style lang="scss">
  @import "@/styles/main.scss";
</style>
<style lang="less">
.projectAllWeek{
  position: relative;
  z-index: 99;
}
</style>
