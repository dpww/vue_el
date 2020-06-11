<template>
  <div>

    <div class="echarts-title" style="margin-top: 15px;">最近3个月各通路的历史费效比</div>
    <div class="echarts-div">
      <div class="echarts2" style='border-right: 1px solid #E7E7EB'>
        <div id="myChart" :style="{width:'580px',height: '480px',}">
        </div>
      </div>
      <div class="echarts2">
        <div id="myeCharts" :style="{width:'580px',height: '480px'}"></div>
      </div>
    </div>
    <!-- ==== -->
      <span style="color:red">注: 费用超过十万或成交率超过100%该数据不显示</span>

    <div class="project-div">
      <div class="project-title">项目销售指标</div>
      <div class="project-container">
        <span class="project-sale-point"><strong>认购套数</strong>:{{$parent.$parent.$parent.$parent.table2.subscription_number}}套</span>
        <span class="project-sale-point"><strong>认购金额</strong>:{{$parent.$parent.$parent.$parent.table2.subscription_funds}}万元</span>
        <span class="project-sale-point"><strong>来人量</strong>:{{$parent.$parent.$parent.$parent.table2.come_client_quantity}}组</span>
        <span class="project-sale-point"><strong>平台下发合同口径费用</strong>:{{$parent.$parent.$parent.$parent.table2.marketing_promotion_cost}}万元</span>
        <!-- <span class="project-sale-point"><strong>合同口径费用</strong>:{{$parent.$parent.$parent.$parent.table2}}万元</span> -->
        <span class="project-sale-point"><strong>权责口径费用</strong>:{{$parent.$parent.$parent.$parent.table2.cost}}万元</span>
        <span class="project-sale-point"><strong>成交成本</strong>:{{Math.round($parent.$parent.$parent.$parent.table2.cost*10000/(Number($parent.$parent.$parent.$parent.table2.subscription_number)||1)*100)/100}}元/套</span>
        <span class="project-sale-point"><strong>来人成本</strong>:{{($parent.$parent.$parent.$parent.table2.cost*10000/(Number($parent.$parent.$parent.$parent.table2.come_client_quantity)||1)).toFixed(2)}}元/人</span>
      </div>
    </div>
    <!-- ==== -->
      <span style="color:red">注：认购套数不含车位/储藏室</span>
    <el-row style="text-align: right;">
      <el-button type="primary" v-if="$store.state.user.userPower.includes('表三导出模板')" class="xuHuiBtn secondary"><a :href="exportTemp()" @click="bury" download="download">导出数据</a></el-button>
      <el-upload  v-if="$store.state.user.userPower.includes('表三导入数据')" @click="loadMatomo" class="upload-demo" :before-upload="loading" :action="importData('/import/listThreePlanImport.action')"
                  :show-file-list="false" :on-success="reload" :on-error="closeLoading" :data="{month:$route.query.months,businessId:$route.query.projectId}">
        <el-button type="primary" class="xuHuiBtn secondary">导入数据</el-button>
      </el-upload>
    </el-row>
    <!-- <el-table :data="list" style="width: 100%;margin-bottom: 20px;margin-top:0" row-key="id" default-expand-all
	  :tree-props="{children: 'children', hasChildren: 'hasChildren'}" class="etable" :border="false" lazy :load="load"> -->
    <el-table :data="list" class="etable center" :span-method="sum" row-key="business_id">
      <el-table-column label="基础信息" align="center" width="210" fixed="left">
        <el-table-column label="事项" align="center" width="90"  >
          <template slot-scope="scope">
            <span style>{{ scope.row.matter }}</span>
          </template>
        </el-table-column>
        <el-table-column label="动作" align="center" width="120" >
          <template slot-scope="scope">
            <span :title="scope.row.action">{{ scope.row.action }}</span>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column label="" align="center" width="205" fixed="left">
        <el-table-column label="认购套数"  width="85" align="center" >
          <template slot-scope="scope">
            <span v-if="scope.$index==0">{{total('subscription_number')}}</span>
            <el-input :maxlength="10" v-else-if="!readonly&&!talbe4Status" v-model="scope.row.subscription_number" @input="validateNumber(scope.row,'subscription_number')"></el-input>
            <span v-else>{{scope.row.subscription_number}}</span>
          </template>
        </el-table-column>
        <el-table-column label="认购金额" width="120" header-align="center" align="right" >
          <template slot-scope="scope">
            <span v-if="scope.$index==0">{{total('subscription_amount').toFixed(4)}}</span>
            <el-input :maxlength="10" v-else-if="!readonly&&!talbe4Status" class="amount" v-model="scope.row.subscription_amount" @input="validateDecimal(scope.row,'subscription_amount')"></el-input>
            <span v-else>{{scope.row.subscription_amount}}</span>
          </template>
        </el-table-column>
      </el-table-column>

      <el-table-column label="月度指标计划" align="center" >
        <el-table-column label="前三月月均认购套数" width="100px" align="center">
          <template slot-scope="scope">
            <span v-if="scope.$index==0">{{total('first_three_months_average_monthly_sets')}}</span>
            <span v-else>{{scope.row.first_three_months_average_monthly_sets}}</span>
          </template>
        </el-table-column>
        <el-table-column label="成交占比" align="center">
          <template slot-scope="scope">
            <span v-if="scope.$index!=0">{{Math.round((proport(scope.row.subscription_number,"subscription_number")||0)*10000)/100}}%</span>
            <span v-else>100%</span>
          </template>
        </el-table-column>
        <el-table-column label="来人量" width="85" align="center">
          <template slot-scope="scope">
            <span v-if="scope.$index==0">{{total("come_client_quantity")}}</span>
            <el-input :maxlength="10" v-else-if="!readonly&&!talbe4Status" v-model="scope.row.come_client_quantity" @input="validateNumber(scope.row,'come_client_quantity')"></el-input>
            <span v-else>{{scope.row.come_client_quantity}}</span>
          </template>
        </el-table-column>
        <el-table-column label="前三月月均来人量" width="80px" align="center">
          <template slot-scope="scope">
            <span v-if="scope.$index==0">{{total("first_three_months_monthly_average_monthly_coming_amount")}}</span>
            <span v-else>{{ scope.row.first_three_months_monthly_average_monthly_coming_amount }}</span>
          </template>
        </el-table-column>

        <el-table-column label="来人占比" align="center">
          <template slot-scope="scope">
            <span v-if="scope.$index!=0">{{Math.round(proport(scope.row.come_client_quantity,"come_client_quantity")*10000||0)/100}}%</span>
            <span v-else>100%</span>
          </template>
        </el-table-column>

        <el-table-column label="前三月月均成交率" width="80px" align="center">
          <template slot-scope="scope">
            <span v-if="scope.$index==0">{{ Math.round(total('first_three_months_average_monthly_sets')/(total("first_three_months_monthly_average_monthly_coming_amount")||1)*10000)/100}}%</span>
            <span v-else>{{ scope.row.first_three_months_monthly_average_turnover_rate}}%</span>
          </template>
        </el-table-column>
        <el-table-column label="成交率" align="center">
          <template slot-scope="scope">
            <span v-if="scope.$index==0">{{Math.round(total('subscription_number')/(total("come_client_quantity")||1)*10000)/100}}%</span>
            <span v-else>{{scope.row.come_client_quantity!=0?Math.round((scope.row.subscription_number/(scope.row.come_client_quantity||1))*10000)/100:0}}%</span>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column label="月度费用计划" align="center">
        <el-table-column label="合同口径" align="center">
          <el-table-column label="合同金额" header-align='center' align="right" width="120">
            <template slot-scope="scope">
              <span v-if="scope.$index==0">{{total("contract_amount").toFixed(4)}}</span>
              <el-input  :maxlength="10" v-else-if="!readonly&&!talbe4Status"  class="amount" v-model="scope.row.contract_amount" @input="validateDecimal(scope.row,'contract_amount')" style='text-align:right'></el-input>
              <span v-else>{{scope.row.contract_amount}}</span>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column label="权责口径" align="center">
          <el-table-column label="金额" header-align='center' align="right" width="120">
            <template slot-scope="scope">
              <span v-if="scope.$index==0">{{total("right_responsibility_amount").toFixed(4)}}</span>
              <el-input :maxlength="10" v-else-if="!readonly&&!talbe4Status"  class="amount" v-model="scope.row.right_responsibility_amount" @blur="initChart" @input="validateDecimal(scope.row,'right_responsibility_amount')"></el-input>
              <span v-else>{{scope.row.right_responsibility_amount}}</span>
            </template>
          </el-table-column>
          <el-table-column label="前三月月均成交成本" width="100px" header-align='center' align="right">
            <template slot-scope="scope">
              <span v-if="scope.$index==0">{{Math.round((total("first_three_months_average_monthly_transaction_cost")/(list.length-1))/100)/100}}</span>
              <span v-else>{{ Math.round(scope.row.first_three_months_average_monthly_transaction_cost/100)/100 }}</span>
            </template>
          </el-table-column>
          <el-table-column label="成交成本" header-align='center' align="right" width="120">
            <template slot-scope="scope">
              <!-- 保留两位小数的成交成本=权责金额（元）总合/各个事项/10000（得出万元）*100并四舍五入再/100-->
              <span v-if="scope.$index==0">{{Math.round(total('right_responsibility_amount')/(total("subscription_number")||1)*100)/100}}</span>
              <span v-else>{{scope.row.transaction_cost= Math.round(scope.row.right_responsibility_amount/(scope.row.subscription_number||1)*100)/100}}</span>
            </template>
          </el-table-column>
          <el-table-column label="前三月月均来人成本" width="100px" header-align='center' align="right">
            <template slot-scope="scope">
              <span v-if="scope.$index==0">{{Math.round((total('first_three_months_monthly_average_coming_cost')/(list.length-1))/100)/100}}</span>
              <span v-else>{{ Math.round(scope.row.first_three_months_monthly_average_coming_cost/100)/100}}</span>
            </template>
          </el-table-column>
          <el-table-column label="来人成本" header-align='center' align="right" width="120">
            <template slot-scope="scope">
              <span v-if="scope.$index==0">{{Math.round((total('right_responsibility_amount')/(total("come_client_quantity")||1))*100)/100}}</span>
              <span v-else>{{ scope.row.coming_cost=Math.round(scope.row.right_responsibility_amount/(scope.row.come_client_quantity||1)*100)/100}}</span>
            </template>
          </el-table-column>
        </el-table-column>
      </el-table-column>
    </el-table>
    <div class="discount">
      <div id="myeChart2" :style="{width:'1000px',height: '500px',margin:'auto',border: '1px solid #E7E7EB'}" style='padding-bottom: 20px;'></div>
    </div>
  
    <el-row class="el-row-button">
      <template v-if="notSubmit">
        <!-- <el-button type="primary" v-if="(!readonly&&!talbe4Status)&&status" @click="channelEffective" class="xuHuiBtn main">上报</el-button> -->
        <el-button type="primary" v-if="(!readonly&&!talbe4Status)&&$store.state.user.userPower.includes('表三暂存')" @click="updateChannel" class="xuHuiBtn secondary">暂存</el-button>
      </template>
      <el-button type='primary' @click='$router.back(-1)' class="xuHuiBtn secondary">返回</el-button>
    </el-row>
    <!-- ====== -->

  </div>
</template>

<script>
  import {
    /*
    表三数据查找
    */
    allChannelDetail,
    /*
     暂存表三
     */
    updateChannelDetail,
    /*
     上报表三
     */
    channelDetailEffective

  } from '@/api/ProjectMonthlyPlan';
  import {
    number,
    tableFixed
  } from "@/utils/filter";
  import {
    getList,
    saveList
  } from '@/api/fillincout';
  import {
    total
  } from "@/utils/methods";
  import ecStat from 'echarts-stat';
  import {
    sendJSON,
    upFile,
    restful,
    downLoad
  } from '@/api/request';
  export default {
    mounted() {
      console.log(this.$parent.$parent.$parent.$parent.table2)
    },
    computed: {
      status(){
        return this.$store.state.settings.projectStatus==2;
      },
      talbe4Status(){
        return this.$store.state.settings.projectStatus>=3
      },
      isRegion(){
        return this.$store.state.settings.regionItem
      },
      isAdmin(){
        return this.$store.state.user.userJobType=='admin';
      }
    },
    data() {
      return {
        loadObj: null,
        list: [],
        projectStatus: '0',
        readonly: false,
        charts: '',
        notSubmit:true,
        // 饼状图
        cylinderOpinionData:[
          {itemStyle: { color: '#2B94FF' }},
          {itemStyle: { color: '#606EFE' }},
          {itemStyle: { color: '#FD7949' }},
          {itemStyle: { color: '#FFBC49' }},
          {itemStyle: { color: '#FBEB19' }},
          {itemStyle: { color: '#37E1FD' }},
          {itemStyle: { color: '#acdf82' }},
          {itemStyle: { color: '#fbdb5a' }},
          {itemStyle: { color: '#4ecb73' }},
          {itemStyle: { color: '#edb58d' }},
          {itemStyle: { color: '#f2637b' }},
          {itemStyle: { color: '#e297da' }},
          {itemStyle: { color: '#88d1ea' }},
          {itemStyle: { color: '#36cbcb' }},
          {itemStyle: { color: '#82dfbe' }},
          {itemStyle: { color: '#5254cf' }},
          {itemStyle: { color: '#435188' }},
          {itemStyle: { color: '#94d8f6' }},
          {itemStyle: { color: '#ff7f27' }},],
        chartList:[],
      }
    },
    created() {
      this.reload();
    },
    methods: {
      reload(upfileRes){
        /*
        表三数据查找
        */
        allChannelDetail(this.$route.query).then(res => {
          if(upfileRes){
            this.$message.success("导入成功");
            this.closeLoading();
          }
          // 散点图
          let data=[];
          let nameList=[];
          res.result.forEach(item=>{
            if(item.action==0){
              return;
            }
            data.push([item.first_three_months_monthly_average_turnover_rate,item.first_three_months_average_monthly_transaction_cost]);
            nameList.push(item.action);
          });
          this.drawLine(data,nameList);
          res.result.unshift(res.result.pop());
          this.$data.list=res.result;
          console.log(res.result,"ffff");

          this.projectStatus = res.result[0].is_effective;
          this.readonly =this.$store.state.settings.projectStatus > 2||res.result[0].is_effective > 0||!this.$store.state.user.userPower.includes('表三暂存');
          if(this.$store.state.user.userPower.includes('表三暂存')){
            this.readonly=false;
          }
          // 饼状图
          let cylinderOpinionNameList = [];
          let dataList=[];
          res.result.forEach((item,index) => {
            dataList.push({name:item.action,value: item.sumAction,itemStyle:this.cylinderOpinionData[index]&&this.cylinderOpinionData[index].itemStyle})
            cylinderOpinionNameList.push(item.action)
          })
          dataList.shift()
          this.cylinder(cylinderOpinionNameList,dataList);
        });
        // 柱状图
        restful('/projectmanager/columnSelect', [
          this.$route.query.projectId, this.$route.query.months,this.$route.query.is_effective
        ]).then(res => {
          let chartListName = []
          res.result.map( item => {
            this.chartList.push({
              name: item.matter_name,
              threeSummatter: item.threeSummatter, // 前三个月金额
              twoSumMatter: item.twoSummatter,
              oneSumMatter: item.oneSumMatter,
              threeSumrate: item.threeSumrate,  // 前三个月成交率
              twoSumrate: item.twoSumrate,
              oneSumrate: item.oneSumrate,
              currentSummatter: item.currentSummatter, // 本月权责金额
              currentSumrate: item.currentSumrate, // 本月成交率
            })
            chartListName.push(item.matter_name)
          })
          let chartName = chartListName.slice(0,5)
          this.discount(chartName,this.chartList)
        });
      },
      importData(url) {
        return upFile(url);
      },
      loadMatomo(){
        _paq.push(['trackEvent', '点击', '导入数据', '集团指标编制数据导入']);
      },
      exportTemp() {
        let {
          months,
          projectId
        } = this.$route.query;
        return downLoad("/Export/listThreeExport.action", {
          month: months,
          businessId: projectId
        });
      },
      loading() {
        this.loadObj = this.$loading({
          lock: true,
          text: '上传中，请稍后',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.8)'
        });
      },
      closeLoading() {
        this.loadObj.close();
      },
      bury() {
        _paq.push(['setDownloadExtensions', "xlsx"]);
      },
      validateNumber(obj, key) {
        this.timer || clearTimeout(this.timer);
        this.timer = setTimeout(() => {
          obj[key] = number(obj[key]);
        }, 1000)
      },
      validateDecimal(obj, key) {
        if(this.timer ){
          clearTimeout(this.timer)
        }
        this.timer = setTimeout(() => {
          obj[key] = tableFixed(obj[key]);
        }, 3000)
      },
      initChart(){
        this.list.forEach((item,index)=>{
          this.chartList[index].currentSumrate=item.right_responsibility_amount;
        });
        this.discount(this.chartList);
      },
      /*
      更新表三项目费用暂存
      */
      updateChannel() {
        _paq.push(['trackEvent', '点击', '暂存', '项目月度计划管理表三暂存']);
        updateChannelDetail(JSON.stringify(this.$data.list)).then(res => {
          this.$message.success("暂存成功");
        });
      },

      /*
       上报表三项目费用生效状态，生效之前先暂存
       */
      channelEffective() {
        this.$confirm("确认上报吗？").then(()=>{
          _paq.push(['trackEvent', '点击', '上报', '项目月度计划管理表三上报']);
          updateChannelDetail(JSON.stringify(this.$data.list)).then(res => {
            channelDetailEffective({
              ...this.$route.query,
              "is_effective": 1
            }).then(res => {
              this.notSubmit=false;
              this.$message.success("上报成功");
            });
          });
        }).catch(() => {
          this.$message("已取消")
        })
      },
      /* 求和*/
      total(key) {
        let sum = 0;
        this.$data.list.forEach((item,index) => {
          if(index==0)return;
          sum += Number(item[key]) * 100;
        });
        return sum / 100;
      },
      /* 求百分比*/
      proport(value, key) {
        return Number(value) / (this.total(key) || 1);
      },
      sum({
            row,
            column,
            rowIndex,
            columnIndex
          }) {
        if (columnIndex == 0 && rowIndex == 0)
          return [1, 2];
        else if (columnIndex == 1 && rowIndex == 0) {
          return [0, 0];
        }
        if ((rowIndex == 1 || rowIndex == 7) && columnIndex == 0) {
          return [6, 1];
        } else if (rowIndex == 13 && columnIndex == 0) {
          return [4, 1];
        } else if (rowIndex == 17 && columnIndex == 0) {
          return [3, 1];
        }else if (rowIndex == 20 && columnIndex == 0) {
          return [4, 1];
        } else if (columnIndex == 0) {
          return [0, 0];
        }
      },
      // Echarts
      //
      // 柱状图+折线图
      discount(chartName,discountDataList) {
        let colors=['#c5b5e5','#7bc1f2','#1cc7ca','#fa4434','#58d2d4'];
        console.log(discountDataList,">>>>>>>>");

        discountDataList.forEach((item,index)=>{
          item.color=colors[index]||"transparent";
          item.type=index<5?"bar":'line';
          item.stack=index<5&&"总量";
          item.data=[item.threeSummatter,item.twoSumMatter, item.oneSumMatter, item.currentSummatter];
          //item.data1=[item.threeSumrate,item.twoSumrate,item.oneSumrate,item.currentSumrate]
          item.barWidth =60;
          if(index == 5){
            item.yAxisIndex = 1;
            item.data = [item.threeSumrate*100,item.twoSumrate*100,item.oneSumrate*100,item.currentSumrate*100]
          };
        })
        let maxONE=0
        let maxTWO=0
        let maxTHREE=0
        let maxFOUR=0
        discountDataList.forEach((item,index)=>{
          if(index<5){
            maxONE+=Number(item.data[0])
            maxTWO+=Number(item.data[1])
            maxTHREE+=Number(item.data[2])
            maxFOUR+=Number(item.data[3])
          }
        })
        let sortArr=[maxONE,maxTWO,maxTHREE,maxFOUR]
        sortArr.sort((a,b)=>a-b)
        let max=sortArr[sortArr.length-1]>100?sortArr[sortArr.length-1]:100
        // 基于准备好的dom，初始化echarts实例
        var myChart = this.$echarts.init(document.getElementById('myeChart2'));
        // 绘制图表
        myChart.setOption({
          title: {
            text: '各渠道费用组合与成交率对比',
            x: 'center'
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross'
            },
            formatter:function(obj){
              let name=obj[0].axisValueLabel;
              let objList = obj.reverse()
              let str='';
              objList.forEach(item=>{
                str+="<span style='margin-right:10px;width:10px;height:10px;border-radius:50%;display:inline-block;background:"+item.color+"'></span>"
                  +item.seriesName+':'+(item.seriesIndex==5?item.value:item.value)+ (item.seriesIndex==5?"%":'')+'<br/>'
              });
              return '<div style="border-bottom: 1px solid rgba(255,255,255,.3); font-size: 18px;padding-bottom: 7px;margin-bottom: 7px">'
                + name
                + '</div>'
                + str
            }
          },
          legend: {
            bottom: 0,
            textStyle: { // 图例文字的样式
              color: '#333',
              fontSize: 14,
            },
            data: chartName,
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '8%',
            containLabel: true
          },
          toolbox: {
            feature: {
            }
          },
          xAxis: {
            type: 'category',
            data: ['前三个月费用', '前两个月费用', '前一个月费用', '本月费用'],
            axisLine: {
              show: false
            }
          },
          yAxis: [{
            type: 'value',
            // name: '万元',
            axisLine: {
              show: false
            }
          },
            {
              type: 'value',
              min: 0,
              max:max,
              interval: max/5,
              axisLabel: {
                formatter: '{value} %',
                textStyle: {
                  color: '#000'
                }
              },
              axisLine: {
                lineStyle: {
                  color: '#ccc'
                }
              }
            }
          ],
          series:  discountDataList

        });
      },
      // 饼状图
      cylinder(cylinderOpinionNameList,data) {
        // 基于准备好的dom，初始化echarts实例
        var myChart = this.$echarts.init(document.getElementById('myeCharts'));
        // 绘制图表
        myChart.setOption({
          title: {
            text: '各通路历史费用占比',
           // subtext: '最近6个月各通路的历史费效比',
            x: '50%',
          },
          tooltip: {
            trigger: 'item',
            formatter: "{b}: {c} ({d}%)"
          },
          // 右侧提示 图标的标注
          legend: {
            orient: 'vertical', // 分布方式，水平：'horizontal'，垂直：'vertical'
            x: 'left',
            data: cylinderOpinionNameList
          },
          series: [{
            name: '占比',
            type: 'pie',
            radius: ['50%', '70%'], // 设置环形饼状图， 第一个百分数设置内圈大小，第二个百分数设置外圈大小
            center: ['65%', '50%'], // 设置饼状图位置，第一个百分数调水平位置，第二个百分数调垂直位置
            avoidLabelOverlap: false, // 防止标签重叠
            legendHoverLink: true, //是否启用图例 hover 时的联动高亮。
            label: { //图形上的文本标签，可用于说明图形的一些数据信息，比如值，名称等，
              normal: {
                show: false,
                position: 'center', // 让饼状图百分百在区域内显示
              },
              emphasis: {
                // 移入是否显示文字
                show: true,
                // 文字类型
                textStyle: {
                  fontSize: '30',
                  fontWeight: 'bold'
                }
              }
            },
            // 是否显示连接线
            labelLine: {
              normal: {
                show: false,
              },
            },
            // 每一个饼状图的信息
            data: data
          }]
        });
      },
      // 散点图
      drawLine(data,nameList) {
        var colorList =['#2B94FF','#606EFE','#FD7949','#FFBC49','#FBEB19','#37E1FD','#acdf82','#4ecb73','#edb58d','#f2637b'
          ,'#e297da','#88d1ea','#36cbcb','#82dfbe','#5254cf','#435188','#94d8f6','#ff7f27','#2761ff'];
        let series=[];
        data.forEach((item,index)=>{
          series.push({
            name:nameList[index],
            symbolSize: 10, // 控制散点的大小
            type: 'scatter', // 表明就是散点图
            data: [item], // 连接数据
          })
        });
        series.forEach((item,idx)=>{
          if(item.data[0][0]>100||item.data[0][1]>100000){
            series.splice(idx,1)
          }
        })
        console.log(series,"seriesseriesseriesseriesseriesseries");

        var option = {
          // legend:{
          //   data:nameList,
          //   y:'bottom',
          // },
          grid:{
            y2:'15%',
          },
          title: {
            text: '各通路历史费效比',
            // subtext: 'By ecStat.hierarchicalKMeans',
            left: 'center'
          },
          xAxis:{
            offset: -175,
            nameGap: 0,
            max:100,
            splitLine: {
              show: false
            },
            type: 'value'
          },
          yAxis:{
            type: 'value',
            offset: -230,
            nameGap: 0,
            max:100000,
            splitLine: {
              show: false
            }
          },
          series,
          color:colorList,
          tooltip: {
            padding: 10,
            backgroundColor: '#222',
            borderColor: '#777',
            borderWidth: 1,
            formatter: function (obj) {
              var value = obj.value;
              return '<div style="border-bottom: 1px solid rgba(255,255,255,.3); font-size: 18px;padding-bottom: 7px;margin-bottom: 7px">'+obj.seriesName +'</div>'
                + '</div>'
                + '前三月成交率'+ '：' + value[0] + '%' + '<br>'
                + '前三月月均成交成本' + '：' + value[1]+ '<br>'
            }
          }
        }
        // 基于准备好的dom，初始化echarts实例
        var myChart = this.$echarts.init(document.getElementById('myChart'));
        // 绘制图表
        myChart.setOption(option);
      },
      bury(){
        _paq.push(['setDownloadExtensions', "xlsx"]);
      }
    }
  }
</script>

<style lang='less'>

  #myeCharts {
    width: 800px;
    height: 400px;
  }
  .el-input{
    text-align: right;
  }
  .echarts-div{
    padding: 0 20px;
    margin-bottom: 10px;
    border: 1px solid #E7E7EB;
  }
  .echarts-title{
    height: 40px;
    line-height: 40px;
    padding: 0 20px;
    border: 1px solid #E7E7EB;
    background-color: #F4F5F9;
  }
  .project-div{
    margin-bottom: 10px;
    border: 1px solid #E7E7EB;
    .project-title{
      height: 40px;
      line-height: 40px;
      padding: 0 20px;
      border-bottom: 1px solid #E7E7EB;
      background-color: #F4F5F9;
    }
    .project-container{
      padding: 10px 20px;
      .project-sale-point{
        line-height: 20px;
        margin-right: 5px;
      }
    }
  }
  .table1 .amount .el-input__inner{
    text-align: right;
  }
</style>
<style lang="less" scoped>

::v-deep .el-table__body-wrapper{
  padding-bottom: 20px;
}
</style>
