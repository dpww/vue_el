<template>
  <div class="riskControlList">
    <!-- <h3 style="margin:20px 10px;color:#2761ff;font-size:20px">中介成交量</h3> -->
    <el-row class="searchNav">
      <el-form label-width="100px">
        <el-col :span="6">
          <el-form-item label-width="115px" label="区域集团/事业部">
            <el-select v-model="filterForm.business_unit_id">
              <el-option label="全部" value=""></el-option>
              <el-option v-for="item in areaList" :label="item.business_unit_name" v-model="item.business_unit_id" :key="item.business_unit_id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label-width="115px"  label="业务归属时间">
            <el-col :span="11">
              <el-date-picker
                placeholder="选择开始时间"
                v-model="filterForm.startTime"
                style="width: 100%;"
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd"
              ></el-date-picker>
            </el-col>
            <el-col class="line" :span="2">-</el-col>
            <el-col :span="11">
              <el-date-picker
                placeholder="选择结束时间"
                v-model="filterForm.endTime"
                style="width: 100%;"
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd"
              ></el-date-picker>
            </el-col>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label-width="110px" label="成交类型">
            <el-select v-model="filterForm.channel">
              <el-option label="全部" value=""></el-option>
              <el-option label="自渠" value="1"></el-option>
              <el-option label="中介" value="2"></el-option>
              <el-option label="全民营销" value="3"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-col :span="12" style="text-align:center">
            <el-button @click="searchBTN" class="xuHuiBtn main" type="primary">搜索</el-button>
          </el-col>
          <el-col :span="12" style="text-align:center;">
            <el-link :href="outHref()" style="color:#fff;" class="xuHuiBtn main" @click="outData" type="primary">导出</el-link>
          </el-col>
        </el-col>
      </el-form>
    </el-row>
    <el-table :data="tableData" :cell-style="cellStyle" :header-cell-style="headerStyle" style="width: 100%" :span-method="mergeRow" @sort-change="sortChange" lazy :height="table_H">
      <el-table-column fixed prop="area_name" label="区域集团/事业部" width="150"></el-table-column>
      <el-table-column fixed prop="project_name" label="项目名称" width="120"></el-table-column>
      <el-table-column prop="trader" label="操盘手" width="120"></el-table-column>
      <el-table-column prop="project_code" label="项目编码" width="180"></el-table-column>
      <el-table-column prop="opening_time" label="启用时间" width="180"></el-table-column>
      <el-table-column prop="deal_total" label="成交量合计" sortable="custom" width="120">
          <template slot-scope="scope">
              <el-link style="color:#2761FF"  @click="toInfo(scope.row,'deal_total')">{{scope.row.deal_total}}</el-link>
            </template>
      </el-table-column>
      <el-table-column prop="channel_volume_total" label="渠道成交量合计" sortable="custom"  width="150">
          <template slot-scope="scope">
              <el-link style="color:#2761FF" @click="toInfo(scope.row,'channel_volume_total')">{{scope.row.channel_volume_total}}</el-link>
            </template>
      </el-table-column>
      <el-table-column prop="channel_volume_per" label="渠道成交总占比" sortable="custom" width="180">
        <template slot="header" slot-scope="scope">
            <a href="javascript:;" style="color:#909399;cursor:default;" title="渠道成交量/成交量合计">{{"渠道成交总占比(%)"}}</a>
        </template>
      </el-table-column>
      <el-table-column prop="agency_volume_per" label="中介成交占比" sortable="custom" width="160">
          <template slot="header" slot-scope="scope">
            <a href="javascript:;" style="color:#909399;cursor:default;" title="中介成交量/成交量合计">{{"中介成交占比(%)"}}</a>
        </template>
      </el-table-column>
      <el-table-column prop="agochannel_volume_per" label="自渠成交占比" sortable="custom" width="160">
        <template slot="header" slot-scope="scope">
            <a href="javascript:;" style="color:#909399;cursor:default;" title="自渠成交量/成交量合计">{{"自渠成交占比(%)"}}</a>
        </template>
      </el-table-column>
      <el-table-column prop="own_volume_per" label="全民营销成交占比" sortable="custom" width="190">
        <template slot="header" slot-scope="scope">
            <a href="javascript:;" style="color:#909399;cursor:default;" title="全民营销成交量/成交量合计">{{"全民营销成交占比(%)"}}</a>
        </template>
      </el-table-column>
      <el-table-column prop="risk_rate" label="系统提示风险占比" sortable="custom" width="190">
        <template slot="header" slot-scope="scope">
            <a href="javascript:;" style="color:#909399;cursor:default;" title="系统提示风险/成交量合计">{{"系统提示风险占比(%)"}}</a>
        </template>
      </el-table-column>
      <el-table-column prop="risk_check_rate" label="系统提示风险人工复核为正常占比" sortable="custom" width="190">
        <template slot="header" slot-scope="scope">
          <div style="padding-right:34px;">
            <a href="javascript:;" style="color:#909399;cursor:default;white-space:normal;" title="系统提示风险复核为正常/成交量合计">{{"系统提示风险人工复核为正常占比(%)"}}</a>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="risk_nocheck_rate" label="人工未复核占比" sortable="custom" width="170">
        <template slot="header" slot-scope="scope">
            <a href="javascript:;" style="color:#909399;cursor:default;" title="未复核/(系统提示风险+系统提示正常)">{{"人工未复核占比(%)"}}</a>
        </template>
      </el-table-column>
      <el-table-column prop="unknown_brush_rate" label="系统提示未知占比" sortable="custom" width="190">
        <template slot="header" slot-scope="scope">
            <a href="javascript:;" style="color:#909399;cursor:default;" title="系统提示未知/已刷证">{{"系统提示未知占比(%)"}}</a>
        </template>
      </el-table-column>
      <el-table-column prop="channel_nocard_rate" label="渠道未刷证占比" sortable="custom" width="170">
         <template slot="header" slot-scope="scope">
            <a href="javascript:;" style="color:#909399;cursor:default;" title="渠道未刷证/成交量合计">{{"渠道未刷证占比(%)"}}</a>
        </template>
      </el-table-column>
      <el-table-column prop="deal_nocard_rate" label="成交未刷证占比" sortable="custom" width="170">
        <template slot="header" slot-scope="scope">
            <a href="javascript:;" style="color:#909399;cursor:default;" title="成交未刷证/成交量合计">{{"成交未刷证占比(%)"}}</a>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="已刷证" width="120">
        <el-table-column prop="brush_card_total" label="合计" sortable="custom" width="120">
           <template slot-scope="scope">
              <el-link style="color:skyblue;" @click="toInfo(scope.row,'brush_card_total')">{{scope.row.brush_card_total}}</el-link>
            </template>
        </el-table-column>
        <el-table-column prop="name" label="系统提示风险" width="120">
          <el-table-column prop="risk_risk_total" label="合计" sortable="custom" width="120">
            <template slot-scope="scope">
              <el-link style="color:skyblue;" @click="toInfo(scope.row,'risk_risk_total')">{{scope.row.risk_risk_total}}</el-link>
            </template>
          </el-table-column>
          <el-table-column prop="risk_check_fly_alone" label="复核为飞单" sortable="custom" width="120">
            <template slot-scope="scope">
              <el-link style="color:#2761FF" @click="toInfo(scope.row,'risk_check_fly_alone')">{{scope.row.risk_check_fly_alone}}</el-link>
            </template>
          </el-table-column>
          <el-table-column prop="risk_check_normal" label="复核为正常" sortable="custom" width="120">
            <template slot-scope="scope">
              <el-link style="color:#2761FF" @click="toInfo(scope.row,'risk_check_normal')">{{scope.row.risk_check_normal}}</el-link>
            </template>
          </el-table-column>
          <el-table-column prop="risk_nocheck" label="未复核" sortable="custom" width="120">
            <template slot-scope="scope">
              <el-link style="color:#2761FF" @click="toInfo(scope.row,'risk_nocheck')">{{scope.row.risk_nocheck}}</el-link>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column prop="name" label="系统提示正常" width="120">
          <el-table-column prop="normal_normal_total" label="合计" sortable="custom" width="120">
            <template slot-scope="scope">
              <el-link style="color:skyblue;" @click="toInfo(scope.row,'normal_normal_total')">{{scope.row.normal_normal_total}}</el-link>
            </template>
          </el-table-column>
          <el-table-column prop="normal_check_fly_alone" label="复核为飞单" sortable="custom" width="120">
            <template slot-scope="scope">
              <el-link style="color:#2761FF" @click="toInfo(scope.row,'normal_check_fly_alone')">{{scope.row.normal_check_fly_alone}}</el-link>
            </template>
          </el-table-column>
          <el-table-column prop="normal_check_normal" label="复核为正常" sortable="custom" width="120">
            <template slot-scope="scope">
              <el-link style="color:#2761FF" @click="toInfo(scope.row,'normal_check_normal')">{{scope.row.normal_check_normal}}</el-link>
            </template>
          </el-table-column>
          <el-table-column prop="normal_nocheck" label="未复核" sortable="custom" width="120">
            <template slot-scope="scope">
              <el-link style="color:#2761FF" @click="toInfo(scope.row,'normal_nocheck')">{{scope.row.normal_nocheck}}</el-link>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column prop="name" label="系统提示未知" width="120">
          <el-table-column prop="unknown_total" label="合计" sortable="custom" width="120">
            <template slot-scope="scope">
              <el-link style="color:skyblue;" @click="toInfo(scope.row,'unknown_total')">{{scope.row.unknown_total}}</el-link>
            </template>
          </el-table-column>
          <el-table-column prop="no_report_time" label="未导入报备时间" sortable="custom" width="150">
            <template slot-scope="scope">
              <el-link style="color:#2761FF" @click="toInfo(scope.row,'no_report_time')">{{scope.row.no_report_time}}</el-link>
            </template>
          </el-table-column>
          <el-table-column prop="no_frist_snap" label="无首次抓拍时间" sortable="custom" width="150">
            <template slot-scope="scope">
              <el-link style="color:#2761FF" @click="toInfo(scope.row,'no_frist_snap')">{{scope.row.no_frist_snap}}</el-link>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column prop="brush_card_nosnap" label="已刷证无抓拍" sortable="custom" width="150">
          <template slot-scope="scope">
            <el-link style="color:skyblue;" @click="toInfo(scope.row,'brush_card_nosnap')">{{scope.row.brush_card_nosnap}}</el-link>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column prop="channel_nocard_total" label="渠道未刷证" sortable="custom" width="120">
        <template slot-scope="scope">
          <el-link style="color:#2761FF" @click="toInfo(scope.row,'channel_nocard_total')">{{scope.row.channel_nocard_total}}</el-link>
        </template>
      </el-table-column>
      <el-table-column prop="deal_nocard_total" label="成交未刷证" sortable="custom" width="120">
         <template slot-scope="scope">
          <el-link style="color:#2761FF" @click="toInfo(scope.row,'deal_nocard_total')">{{scope.row.deal_nocard_total}}</el-link>
        </template>
      </el-table-column>
      <!-- <el-table-column  label="操作" width="120">
        <template slot-scope="scope">
          <el-button @click="toInfo(scope.row)">详情</el-button>
        </template>
      </el-table-column> -->
    </el-table>
    <div style="margin: 0 auto;float:right;padding-right:30px;">
      <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageNum"
      :page-sizes="[ 10, 20, 50,100]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
    </div>

  </div>
</template>

<script>
import { ristListInfo,findBusinessName } from "@/api/riskControlList.js"
import {  downLoad } from "@/api/request";
export default {
  data() {
    return {
      filterForm: {
        business_unit_id: "",
        endTime: "",
        startTime: "",
        channel: ""
      },
      tableData: [],
      areaList:[],
      total:0,
      pagesize:20,
      pageNum:1,
      table_H:window.outerHeight-300,
      sorting:"",
      byorder:""

    };
  },
  created(){
    this.getList()
        _paq.push(['trackEvent', '点击', '渠道风控统计列表', '进入风控列表页']);

  },
  methods:{
    getList(){
      //区域事业部列表
      console.time("请求时间1");

      findBusinessName({}).then(res=>{
        console.log(res);
        this.areaList=res.result
       console.timeEnd("请求时间1");

      })
      this.rander()


    },
    rander(){
      //表格内容
      console.time("请求时间2");
      ristListInfo({
        ...this.filterForm,
        pageNum:this.pageNum,
        pageSize:this.pagesize,
        byorder:this.byorder,
        sorting:this.sorting,
        userId:JSON.parse(localStorage.getItem("userInfo")).id
      }).then(res=>{
        console.timeEnd("请求时间2");
        console.log(res);
        this.tableData=res.result.data.list
        this.total=res.result.data.total
        this.pagesize=res.result.data.pageSize
        this.pageNum=res.result.data.pageNum
      })
    },
    headerStyle(row){
      if(row.column.property=="brush_card_total"){
      return 'text-align: center;background:#1f4e78;color:#fff;'
      }else if(row.column.property=="risk_risk_total"){
      return 'text-align: center;background:#2f75b5;color:#fff;'
      }else if(row.column.property=="normal_normal_total"){
      return 'text-align: center;background:#375623;color:#fff;'
      }else if(row.column.property=="brush_card_nosnap"){
      return 'text-align: center;background:#2f75b5;color:#fff;'
      }else if(row.column.property=="unknown_total"){
      return 'text-align: center;background:#808080;color:#fff;'
      }
      if(row.column.label=="已刷证"){
      return 'text-align: center;background:#1f4e78;color:#fff;'
      }
      if(row.column.label=="系统提示风险"){
      return 'text-align: center;background:#2f75b5;color:#fff;'
      }
      if(row.column.label=="系统提示未知"){
      return 'text-align: center;background:#808080;color:#fff;'
      }
      if(row.column.label=="系统提示正常"){
      return 'text-align: center;background:#375623;color:#fff;'
      }else{
      return 'text-align: center;'
      }
    },
    cellStyle(obj){
       if(obj.column.property=="brush_card_total"){
      return 'text-align: center;background:#1f4e78;color:#fff;'
      }else if(obj.column.property=="risk_risk_total"){
      return 'text-align: center;background:#2f75b5;color:#fff;'
      }else if(obj.column.property=="normal_normal_total"){
      return 'text-align: center;background:#375623;color:#fff;'
      }else if(obj.column.property=="brush_card_nosnap"){
      return 'text-align: center;background:#2f75b5;color:#fff;'
      }else if(obj.column.property=="unknown_total"){
      return 'text-align: center;background:#808080;color:#fff;'
      }else{
      return 'text-align: center;background:#fff;'
      }
    },
    toInfo(row,type){
      // console.log(row);
      let userId =JSON.parse(localStorage.getItem("userInfo")).id
      let {project_id} =row
      let {channel,endTime,startTime,business_unit_id}=this.filterForm
      let href = this.$router.resolve({path: "riskControlInfo", query: {'choice':type,channel,endTime,startTime,project_id,userId,business_unit_id}})
      _paq.push(["trackEvent", "点击", `跳转风控详情-${type}`, "跳转风控数据统计详情"]);
      window.open(href.href.replace('riskControl/',""), '_blank')
    },
    handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.pagesize=val
        this.rander()
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        console.log(this.pagesize);

        this.pageNum=val
        this.rander()
    },
    searchBTN(){
      _paq.push(["trackEvent", "点击", `搜索`, "渠道风控数据统计搜索"]);
      this.rander()
    },
    outData(){
      _paq.push(["trackEvent", "点击", "导出", "渠道风控数据统计列表页导出"]);

    },
    outHref(){
    return downLoad("/riskControl/riskDataExport", {
            ...this.filterForm,
            sorting:this.sorting,
            byorder:this.byorder,
            userId:JSON.parse(localStorage.getItem("userInfo")).id
    });
    },
    sortChange({ column, prop, order }){
      // console.log(column, prop, order,"column, prop, order");
      this.sorting=order
      this.byorder=prop
      this.rander()
    },
     mergeRow({ row, column, rowIndex, columnIndex }){
       if(rowIndex==0){
         if(columnIndex==0){
           return [1,2]
         }else if(columnIndex==1){
           return [0,0]
         }
       }
     }
  }
};
</script>

<style lang="less">
.searchNav {
  line-height: 40px !important;
  vertical-align: middle;
  .el-form-item__label {
    line-height: 40px !important;
    // background-color: red;
  }
}
// .el-table {
    // .el-table__fixed {
    //   height:auto !important; // 此处的important表示优先于element.style
    //   bottom:17px; // 改为自动高度后，设置与父容器的底部距离，则高度会动态改变
    // }
  // }
.caret-wrapper{
  // transform: translateY(-50%);
  // float: right;
  position: absolute!important;
  top: 50%;
  right: 5px;
  transform: translateY(-50%)
}
</style>
<style lang="less" scoped>
.searchNav {
  height: 80px;
  // line-height: 80px;
  padding-top: 15px;
  background-color: #fff;

}


</style>
