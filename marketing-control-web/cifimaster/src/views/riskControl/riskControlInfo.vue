<template>
  <div class="riskControlInfo">
    <h3 style="margin:20px 10px;color:#2761ff;font-size:20px">
      {{textTitle}}
      <el-link class="xuHuiBtn main outData" @click="outDataInfo" :href="outData()" download="download">导出数据</el-link>
    </h3>
    <el-table :data="tableData" style="width: 100%" :height="table_H" :span-method="mergeRow" >
      <!-- <el-table-column type="index" width="50" fixed></el-table-column> -->
      <el-table-column fixed prop="businessUnit" label="事业部/区域集团" width="150">
      <template slot-scope="scope">
          <a href="javascript:;" style="color:#333;cursor:default;" :title="scope.row.businessUnit">{{scope.row.businessUnit}}</a>
        </template>
        </el-table-column>
      <el-table-column fixed prop="project_name" label="项目名称" width="120">
        <template slot-scope="scope">
          <a href="javascript:;" style="color:#333;cursor:default;" :title="scope.row.project_name">{{scope.row.project_name}}</a>
        </template>
      </el-table-column>
      <el-table-column prop="projectCode" label="项目编码" width="180"></el-table-column>
      <el-table-column prop="roominfo" label="房间"  width="180">
        <template slot-scope="scope">
          <!-- <div class="scrollCell" style="overflow:auto"> -->
            <a href="javascript:;" style="color:#333;cursor:default;" :title="scope.row.roominfo">{{scope.row.roominfo}}</a>
          <!-- </div> -->
        </template>
      </el-table-column>
      <el-table-column prop="ywgsDate" label="业务归属时间" width="180"></el-table-column>
      <el-table-column prop="closeReason" label="成交状态" width="120"></el-table-column>
      <el-table-column prop="counselor_name" label="置业顾问" width="120"></el-table-column>
      <el-table-column prop="channel" label="成交渠道" width="120"></el-table-column>
      <el-table-column prop="agent" label="渠道姓名" width="120"></el-table-column>
      <el-table-column prop="client_name" label="客户姓名" width="200">
        <template slot-scope="scope">
          <span v-if="scope.row.client_id" @click="clientInfo(scope.row)"  style="color:#2761ff;cursor:pointer;">{{scope.row.client_name}}</span>
          <span v-if="!scope.row.client_id" style="color:#333;cursor:pointer;">{{scope.row.client_name}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="id_number" label="身份证号码" width="300">
        <template slot-scope="scope">
          <a href="javascript:;" style="color:#333;cursor:default;" :title="scope.row.id_number">{{scope.row.id_number}}</a>
        </template>
      </el-table-column>
      <el-table-column prop="freshcard_time" label="刷证时间" width="180"></el-table-column>
      <el-table-column prop="report_time" label="报备时间" width="180"></el-table-column>
      <el-table-column prop="firstphoto_time" label="首次抓拍时间" width="180"></el-table-column>
      <el-table-column prop="import_time" label="导入时间" width="180"></el-table-column>
      <el-table-column prop="risk_time" label="系统风险提示时间" width="180"></el-table-column>
      <el-table-column prop="risk_reason" label="系统风险提示原因" width="140">
        <template slot-scope="scope">
          <a href="javascript:;" style="color:#333;cursor:default;" :title="scope.row.risk_reason">{{scope.row.risk_reason}}</a>
        </template>
      </el-table-column>
      <el-table-column prop="system_risk" label="系统风险状态" width="120"></el-table-column>
      <el-table-column prop="risk_approve_status" label="人工复核状态" width="120"></el-table-column>
      <el-table-column prop="risk_approve_time" label="人工复核时间" width="180"></el-table-column>
      <el-table-column prop="riskSpan" label="人工复核处理时长" width="180"></el-table-column>
      <el-table-column prop="risk_approve_remark" label="人工复核原因" width="120">
        <template slot-scope="scope">
          <a href="javascript:;" style="color:#333;cursor:default;" :title="scope.row.risk_approve_remark">{{scope.row.risk_approve_remark}}</a>
        </template>
      </el-table-column>
      <el-table-column prop="reject_time" label="驳回复核时间" width="180"></el-table-column>
      <el-table-column prop="reject_content" label="驳回原因" width="120">
        <template slot-scope="scope">
          <a href="javascript:;" style="color:#333;cursor:default;" :title="scope.row.reject_content">{{scope.row.reject_content}}</a>
        </template>
      </el-table-column>
      <el-table-column prop="remark" label="备注" width="120"></el-table-column>
    </el-table>
      <div style="margin: 0 auto;float:right;padding-right:30px;">
      <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageNum"
      :page-sizes="[10, 20, 50,100]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
    </div>
    <Buttons/>
  </div>
</template>

<script>
import { getRiskDetail } from "@/api/riskControlList.js";
import {  downLoad } from "@/api/request";
export default {
  components:{
    Buttons:()=>import('../../views/offerFlow/component/index')
  },
  data() {
    return {
      tableData: [
      ],
      pageNum:1,
      pagesize:100,
      total:0,
      textTitle:'',
      table_H:window.outerHeight-240,
      beforeList:[],
      afterList:[],
      afterList1:[],
      flagList:[],
    };
  },
  methods: {
    outData() {
      return downLoad("/riskControl/riskDataInsideExport", {
        ...this.$route.query
    });
    },
    outDataInfo(){
      _paq.push(["trackEvent", "点击", "导出", "风控数据统计详情导出"]);
    },
    clientInfo(row) {
      // console.log(row);
        let target
      if(location.origin.includes('uat')||location.origin.includes('test')){
        target="https://face-sys-test.cifi.com.cn"
      }else{
        target="https://face-sys.cifi.com.cn/"
      }
      console.log(`${target}/#/customerDetail?id=${row.client_id}&thirdPrjId=${this.$route.query.project_id}&menu=true`);
      open(`${target}/#/customerDetail?id=${row.client_id}&thirdPrjId=${this.$route.query.project_id}&menu=true`)
    },
    getInfo() {
          const loading = this.$loading({
          lock: true,
          text: '加载中...',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
      getRiskDetail({
        ...this.$route.query,
        pageNum:this.pageNum,
        pageSize:this.pagesize
      }).then(res => {
        this.tableData=res.result.data.list
        this.total=res.result.data.total
        this.pagesize=res.result.data.pageSize
        this.pageNum=res.result.data.pageNum
        this.beforeList=[]
        this.afterList=[]
        this.afterList1=[]
        for(let i=0;i<this.tableData.length;i++){
          if(i+3<this.tableData.length&&this.tableData[i].orderGuid==this.tableData[i+1].orderGuid&&this.tableData[i].orderGuid==this.tableData[i+2].orderGuid&&this.tableData[i].orderGuid==this.tableData[i+3].orderGuid){
            this.afterList.push(i)
            this.beforeList[i]=4
            this.beforeList[i+1]=4
            this.beforeList[i+2]=4
            this.beforeList[i+3]=4
            this.afterList1.push(i+1)
            this.afterList1.push(i+2)
            this.afterList1.push(i+3)
          }else if(i+2<this.tableData.length&&this.tableData[i].orderGuid==this.tableData[i+1].orderGuid&&this.tableData[i].orderGuid==this.tableData[i+2].orderGuid){
          if(this.beforeList[i]==undefined){
            this.afterList.push(i)
            this.beforeList[i]=3
            this.beforeList[i+1]=3
            this.beforeList[i+2]=3
            this.afterList1.push(i+1)
            this.afterList1.push(i+2)
          }
          }else
        if (i+1<this.tableData.length&&this.tableData[i].orderGuid==this.tableData[i+1].orderGuid){
          if(this.beforeList[i]==undefined){
          this.afterList1.push(i+1)
          this.afterList.push(i)
          this.beforeList[i]=2
          this.beforeList[i+1]=2
          }
        }
        }
          loading.close();
      });
    },
     handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.pagesize=val
        this.getInfo()
    },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.pageNum=val
        this.getInfo()
    },
     mergeRow({ row, column, rowIndex, columnIndex }){
       if(this.beforeList[rowIndex]!==undefined){
      if(this.afterList.findIndex(item=>item==rowIndex)!=-1){
         if([0,1,2,3,4,5,6,7,8].findIndex(item=>item==columnIndex)!=-1){
         return [this.beforeList[rowIndex],1]

         }else{
         return [1,1]
         }
       }else if(this.afterList1.findIndex(item=>item==rowIndex)!=-1){
         if([0,1,2,3,4,5,6,7,8].findIndex(item=>item==columnIndex)!=-1){
         return [0,0]

         }else{
         return [1,1]
         }
       }
       }
    }
  },
  created() {

    this.getInfo()
    // console.log(this.$route.query.choice);
    let titleStart
    switch (this.$route.query.choice) {
      case 'deal_nocard_total':
        titleStart="成交未刷证"
        break;
      case 'channel_nocard_total':
        titleStart="渠道未刷证"
        break;
      case 'brush_card_nosnap':
        titleStart="已刷证无抓拍"
        break;
      case 'no_frist_snap':
        titleStart="已刷证系统提示未知无首次抓拍时间"
        break;
      case 'no_report_time':
        titleStart="已刷证系统提示未知未导入报备时间"
        break;
      case 'unknown_total':
        titleStart="已刷证系统提示未知"
        break;
      case 'normal_nocheck':
        titleStart="已刷证系统提示正常未复核"
        break;
      case 'normal_check_normal':
        titleStart="已刷证系统提示正常复核为正常"
        break;
      case 'normal_check_fly_alone':
        titleStart="已刷证系统提示正常复核为飞单"
        break;
      case 'normal_normal_total':
        titleStart="已刷证系统提示正常"
        break;
      case 'risk_nocheck':
        titleStart="已刷证系统提示风险未复核"
        break;
      case 'risk_check_normal':
        titleStart="已刷证系统提示风险复核为正常"
        break;
      case 'risk_check_fly_alone':
        titleStart="已刷证系统提示风险复核为飞单"
        break;
      case 'risk_risk_total':
        titleStart="已刷证系统提示风险"
        break;
      case 'brush_card_total':
        titleStart="已刷证"
        break;
      case 'channel_volume_total':
        titleStart="渠道成交量"
        break;
      case 'deal_total':
        titleStart="成交量"
        break;
      default:
        break;
    }
    this.textTitle=`${titleStart}客户明细`

  },
  mounted(){

  }
};
</script>

<style lang="less">
.outData {
  float: right;
  display: block;
  width: 100px;
  height: 30px;
  background-color: #2761ff;
  line-height: 30px;
  text-align: center;
  color: #fff !important;
  border-radius: 4px;
}
.outData:hover {
  color: #fff;
  background-color: #023bd8 !important;
}
</style>
